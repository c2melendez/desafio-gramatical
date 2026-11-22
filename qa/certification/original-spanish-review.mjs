/** C02/C04: claves lingüísticas ancladas manualmente en reglas y triaje de distractores.
 * Los anclajes son oráculos adicionales independientes de la clave almacenada;
 * las reglas se documentan, pero no constituyen dictamen de experto externo.
 */
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {coverageRows} from '../../src/lib/coverage.ts';
import {pool} from '../../scripts/inventory-items.mjs';
const rules=JSON.parse(readFileSync('qa/certification/spanish-anchor-rules.json','utf8'));
const rows=coverageRows().filter(x=>x.area==='espanol'),index=new Map(),parentCounts=new Map();
const problems=[],queue=[],perFamily=new Map(),samples=[];
const normal=s=>String(s??'').normalize('NFKC').toLocaleLowerCase('es').replace(/\s+/g,' ').trim();
const strip=s=>normal(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[.,;:!?¿¡"'«»()\s]+/g,'');
for(const row of rows)for(const item of pool(row)){
 index.set(item.id,{row,item});
 for(const parent of item.sourceIds??[])parentCounts.set(parent,(parentCounts.get(parent)??0)+1);
}
function evaluate(anchor,item){
 const errs=[];
 if(!item)return ['ID anclado inexistente'];
 const stem=normal(item.q??item.question??'');
 if(!stem.includes(normal(anchor.stem_contains)))errs.push('enunciado anclado ya no coincide');
 if(!Array.isArray(item.options)||item.options.length!==4)errs.push('cuatro opciones obligatorias');
 else {
  const hits=item.options.filter(v=>normal(v)===normal(anchor.expected_option)).length;
  if(hits!==1)errs.push('la respuesta argumentada aparece '+hits+' veces');
  if(!Number.isInteger(item.answer)||normal(item.options[item.answer])!==normal(anchor.expected_option))
   errs.push('la clave almacenada contradice la regla del anclaje');
 }
 return errs;
}
const counts={anchors:rules.anchors.length,by_level:{},positive:0,negative_key:0,negative_duplicate:0,exam_distractor_reviews:0,original_stems:0,source_linked:0};
const anchored=new Set();
for(const anchor of rules.anchors){
 const match=index.get(anchor.id);
 if(anchored.has(anchor.id))problems.push({id:anchor.id,problem:'anclaje duplicado'});
 anchored.add(anchor.id);
 if(!match||match.row.topic!==anchor.topic||match.row.subtopic!==anchor.subtopic||match.row.mode!==anchor.mode||match.row.level!==anchor.level){
  problems.push({id:anchor.id,problem:'tema, nivel o modalidad incorrecto'});continue;
 }
 if(typeof anchor.rationale!=='string'||anchor.rationale.length<55)problems.push({id:anchor.id,problem:'falta regla justificativa original'});
 const actual=evaluate(anchor,match.item);
 if(actual.length)problems.push({id:anchor.id,problem:actual.join('; ')});
 else counts.positive++;
 counts.by_level[anchor.level]=(counts.by_level[anchor.level]??0)+1;
 const wrong=structuredClone(match.item);wrong.answer=(wrong.answer+1)%4;
 if(evaluate(anchor,wrong).some(z=>z.includes('clave almacenada')))counts.negative_key++;
 else problems.push({id:anchor.id,problem:'mutación de clave no detectada'});
 const duplicate=structuredClone(match.item);duplicate.options[(duplicate.answer+1)%4]=anchor.expected_option;
 if(evaluate(anchor,duplicate).some(z=>z.includes('aparece 2 veces')))counts.negative_duplicate++;
 else problems.push({id:anchor.id,problem:'mutación de distractor idéntico no detectada'});
}
if(counts.anchors<20||['principiante','intermedio','avanzado'].some(l=>(counts.by_level[l]??0)<5))
 problems.push({problem:'no se cumplen anclajes mínimos por nivel (20 y 5 por nivel)'});
if(counts.positive!==counts.anchors||counts.negative_key!==counts.anchors||counts.negative_duplicate!==counts.anchors)
 problems.push({problem:'cobertura de anclajes y mutaciones insuficiente'});
const ranked=['DUPLICATE_NORMALIZED','ACCENT_OR_PUNCTUATION_ONLY','HOMOGRAPHIC_NEAR_MATCH'];
for(const {row,item} of index.values()){
 if(!Array.isArray(item.options)||item.options.length!==4)continue;
 const raw=item.options.map(normal),stripped=item.options.map(strip);
 let kind=null;
 if(new Set(raw).size!==4)kind=ranked[0];
 else if(new Set(stripped).size!==4)kind=ranked[1];
 else if(item.options.some(x=>x.length>2&&item.options.some(y=>x!==y&&normal(y).includes(normal(x))&&Math.abs(y.length-x.length)<4)))
  kind=ranked[2];
 if(kind){
  const sourceImpact=parentCounts.get(item.id)??0;
  const priority=kind===ranked[0]?'BLOCKER_REVIEW':sourceImpact>0?'HIGH_EDITORIAL_REVIEW':'EDITORIAL_REVIEW';
  queue.push({id:item.id,kind,priority,sourceImpact,topic:row.topic,subtopic:row.subtopic,mode:row.mode,level:row.level,options:item.options,selected:typeof item.answer==='number'?item.options[item.answer]:item.connector??item.correctConnector??null,
   status:'REVIEW',note:'Heurística de semejanza; verificar contexto y reglas ortográficas antes de modificar respuestas'});
  const fam=row.topic+'/'+row.subtopic+'/'+row.mode;
  perFamily.set(fam,(perFamily.get(fam)??0)+1);
 }
 counts.original_stems+=!item.sourceIds?.length?1:0;
 counts.source_linked+=item.sourceIds?.length?1:0;
}
queue.sort((a,b)=>{const p=x=>x.priority==='BLOCKER_REVIEW'?0:x.priority==='HIGH_EDITORIAL_REVIEW'?1:2;return p(a)-p(b)||b.sourceImpact-a.sourceImpact||a.id.localeCompare(b.id);});
counts.exam_distractor_reviews=queue.length;
const sha=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
const report={suite:'SPANISH_ORIGINAL_RULES_AND_DISTRACTORS_V1',sha,status:problems.length?'FAIL':'PASS',
 anchors:counts.anchors,checks:counts.positive+counts.negative_key+counts.negative_duplicate,
 counts,anchor_ids:[...anchored],problems,review_total:queue.length,review_preview:queue.slice(0,60),
 family_review_counts:Object.fromEntries(perFamily),
 limitations:'24 anclajes originales con reglas redactadas explícitamente y mutaciones; no equivalen a una validación docente externa de los restantes 9.426 ejercicios de Español. Las semejanzas por ortografía y puntuación pueden ser distractores legítimos. No declarar revisión académica aprobada.'};
mkdirSync('qa/certification/evidence',{recursive:true});
writeFileSync('qa/certification/evidence/original-spanish-rules.json',JSON.stringify(report,null,2)+'\n');
writeFileSync('qa/certification/evidence/distractor-review-queue.json',JSON.stringify({sha,policy:report.limitations,cases:queue},null,2)+'\n');
console.log(JSON.stringify({status:report.status,anchor_checks:report.checks,review_total:report.review_total,priority:queue.slice(0,4).map(x=>({id:x.id,kind:x.kind,priority:x.priority})),problems},null,2));
if(problems.length)process.exitCode=1;
