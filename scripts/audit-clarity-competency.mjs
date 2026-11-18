/** Auditoría editorial exhaustiva de estructura y señales de ambigüedad.
 * Ninguna heurística puede certificar la interpretación o adecuación académica de 9,450 ejercicios.
 * Los hallazgos se entregan por ID para revisión y corrección editorial humana.
 */
import {coverageRows} from '../src/lib/coverage.ts';
import {pool} from './inventory-items.mjs';
import {execFileSync} from 'node:child_process';

const norm=s=>String(s??'').normalize('NFKC').toLocaleLowerCase('es').replace(/\s+/g,' ').trim();
const rowKey=r=>[r.area,r.topic,r.subtopic,r.mode,r.level].join(' / ');
const issues=[],matrix=[],idSet=new Set();
const modes=new Set(),topics=new Set(),subtopics=new Set();
const riskCounts={unclear_stem:0,excessive_density:0,order_hint:0,unclear_source_scope:0,concept_alignment_review:0,generic_explanation:0,option_similarity:0};
const flagsByPrefix={base:0,m1:0,m2:0,m3:0};
let audited=0,hard=0,risks=0;
function add(row,item,rule,severity,evidence){
 const record={cell:rowKey(row),id:item.id,rule,severity,evidence:String(evidence??'').slice(0,260)};
 issues.push(record);
 if(severity==='BLOCKER')hard++;else {risks++;riskCounts[rule]=(riskCounts[rule]??0)+1}
}
function stem(item,mode){
 if(item.kind==='classification'||item.kind==='construction')return item.prompt??'';
 if(mode==='quiz')return item.question??item.q??item.gap??'';
 if(mode==='clasificar')return item.flawed??item.question??item.prompt??item.claims?.map(x=>x.text).join(' ')??(item.tokens?.map(x=>x.t).join(' ')??'');
 return item.question??item.hint??item.prompt??item.order?.parts?.join(' ')??item.steps?.join(' ')??(item.pattern?.join(' ')??'');
}
function explanation(item){
 return [item.explanation,item.exp,item.correction,item.order?.explanation,
 ...(item.claims?.map(x=>x.explanation)??[]),...(item.items?.map(x=>x.explanation)??[]),
 ...(item.tokens?.filter(x=>x.c).map(x=>x.exp)??[])].filter(x=>typeof x==='string'&&x.trim()).join(' ');
}
const rows=coverageRows().filter(x=>x.area==='espanol');
for(const row of rows){
 let cellBlockers=0,cellRisk=0;
 modes.add(row.mode);topics.add(row.topic);subtopics.add(row.topic+'/'+row.subtopic);
 const bank=pool(row);
 if(bank.length!==row.available)add(row,{id:'[celda]'},'inventory_mismatch','BLOCKER',bank.length+' ≠ '+row.available);
 for(const item of bank){
  audited++;
  const prevHard=hard,prevRisk=risks;
  if(idSet.has(item.id))add(row,item,'duplicate_id','BLOCKER',item.id);
  idSet.add(item.id);
  const q=stem(item,row.mode),e=explanation(item);
  const options=item.options??null;
  if(!String(q).trim()&&!(row.mode==='construir'&&item.pattern))add(row,item,'unclear_stem','BLOCKER','El ejercicio no tiene una consigna o estímulo evaluable.');
  if(!e.trim())add(row,item,'missing_explanation','BLOCKER','No hay fundamento para justificar una respuesta.');
  if(options){
   const canon=options.map(norm);
   if(canon.some(v=>!v)||new Set(canon).size!==canon.length)add(row,item,'duplicated_or_blank_options','BLOCKER',canon.join(' | '));
   if(typeof item.answer==='number'&&(item.answer<0||item.answer>=options.length))add(row,item,'invalid_key','BLOCKER',String(item.answer));
   if(item.connector&&!options.includes(item.connector))add(row,item,'invalid_connector','BLOCKER',item.connector);
   if(item.correctConnector&&!options.includes(item.correctConnector))add(row,item,'invalid_correct_connector','BLOCKER',item.correctConnector);
   const pieces=options.map(x=>norm(x).replace(/[.,;:¡!¿?\s]/g,''));
   if(new Set(pieces).size!==pieces.length)add(row,item,'option_similarity','REVIEW',options.join(' | '));
  }
  if(item.kind==='classification'){
   if(!item.items?.length)add(row,item,'empty_classification','BLOCKER','No hay casos que clasificar');
   const allowed=new Set(item.labels);
   for(const child of item.items??[])if(!allowed.has(child.label))add(row,item,'unreachable_label','BLOCKER',child.id+': '+child.label);
  }
  if(item.kind==='construction'&&(!item.solutions?.length||!item.tiles?.length))add(row,item,'invalid_construction','BLOCKER','Falta solución o banco de fichas');
  if(item.claims&&row.mode==='clasificar'){
   for(const claim of item.claims)if(!['explicit','inference','unsupported'].includes(claim.tag))add(row,item,'invalid_evidence_tag','BLOCKER',claim.tag);
  }
  const allText=[q,item.passage,item.flawed,item.gap,item.title].filter(Boolean).join(' ');
  if(allText.length>2200)add(row,item,'excessive_density','REVIEW','estímulo '+allText.length+' caracteres; verificar legibilidad y carga cognitiva');
  const constructionText=(item.steps??item.order?.parts??item.tiles?.filter(t=>item.solutions?.[0]?.includes(t.id)).map(t=>t.text)??[]).map(String);
  if(row.mode==='construir'&&constructionText.length>1&&
     constructionText.some(t=>/^(primero|después|finalmente|por último|en primer lugar|en segundo lugar|en tercer lugar)[,: ]/i.test(t.trim())))
    add(row,item,'order_hint','REVIEW',constructionText.map(x=>x.slice(0,60)).join(' | '));
  if(item.sourceIds?.length>=3&&/LECTURA A|LECTURA B/.test(item.passage??'')&&!/BLOQUE A/.test(item.passage??''))
    add(row,item,'unclear_source_scope','REVIEW','Niveles de fuentes A/B anidados sin distinguir bloques');
  if((item.id.startsWith('m3-')||item.id.startsWith('m2-'))&&e.length<95)
    add(row,item,'generic_explanation','REVIEW',e);
  if(item.id.startsWith('m3-')&&row.mode==='construir'&&
    /Ordena un análisis|Ordena el proceso|organiza pruebas/i.test(q)&&
    ['Géneros literarios','Figuras retóricas','Homonimia y polisemia','Sinónimos y antónimos'].includes(row.subtopic))
    add(row,item,'concept_alignment_review','REVIEW',q);
  const group=item.id.startsWith('m3-')?'m3':item.id.startsWith('m2-')?'m2':item.id.startsWith('m1-')?'m1':'base';
  flagsByPrefix[group]++;
  cellBlockers+=hard-prevHard;cellRisk+=risks-prevRisk;
 }
 matrix.push({topic:row.topic,subtopic:row.subtopic,mode:row.mode,level:row.level,count:bank.length,blockers:cellBlockers,review_flags:cellRisk});
}
if(rows.length!==189||audited!==9450||idSet.size!==9450){hard++;issues.push({id:'[area]',cell:'espanol',rule:'coverage_invariant',severity:'BLOCKER',evidence:JSON.stringify({cells:rows.length,records:audited,ids:idSet.size})});}
const report={
 module:'espanol-claridad-competencia',version:1,
 sha:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),
 status:hard?'BLOCKED':risks?'PASS_WITH_EDITORIAL_REVIEW':'PASS',
 summary:{cells:rows.length,topics:topics.size,subtopics:subtopics.size,modes:[...modes],records_audited:audited,distinct_ids:idSet.size,blockers:hard,review_flags:risks,risk_by_rule:riskCounts,records_by_generation:flagsByPrefix},
 methodology:{automated:'Verificación de consigna, unicidad, clave, etiquetas, explicaciones, indicios de respuesta, densidad textual y correspondencia probable con subtema',human_pending:'Discernir múltiples respuestas defensibles, veracidad conceptual, pertinencia y dificultad; las heurísticas no pueden certificar lo anterior'},
 action_policy:'Cada bandera REVIEW se conserva con ID y celda. Ningún caso se considera académicamente aprobado por un resultado automático.',
 matrix,findings:issues
};
console.log(JSON.stringify(report,null,2));
if(hard)process.exitCode=1;
