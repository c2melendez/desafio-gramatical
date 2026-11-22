/** Certificación C02: oráculos de linaje calculados desde ejercicios fuente.
 * Controla claves compuestas de lectura/redacción, no la verdad académica fuente.
 * También inventaría distractores sospechosos para decisión editorial.
 */
import {coverageRows} from '../../src/lib/coverage.ts';
import {pool} from '../../scripts/inventory-items.mjs';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {execFileSync} from 'node:child_process';

const byId=new Map(),rows=coverageRows().filter(r=>r.area==='espanol'),findings=[],reviews=[],counts={rows:rows.length,items:0,derived_checked:0,unresolved_sources:0,normalized_distractors:0,source_linked:0};
for(const row of rows)for(const item of pool(row)){
 byId.set(item.id,{row,item});counts.items++;
}
const same=(a,b)=>String(a??'').normalize('NFKC').trim()===String(b??'').normalize('NFKC').trim();
const normalized=s=>String(s).normalize('NFKC').toLocaleLowerCase('es').replace(/\s+/g,' ').trim();
const source=(id)=>byId.get(id)?.item;
const add=(kind,row,item,detail,blocking=false)=>{
 const record={kind,id:item.id,topic:row.topic,subtopic:row.subtopic,mode:row.mode,level:row.level,detail};
 (blocking?findings:reviews).push(record);
};
const derive=(row,item)=>{
 const ids=item.sourceIds??[];
 if(!Array.isArray(ids)||!ids.length)return null;
 counts.source_linked++;
 const sources=ids.map(source);
 if(sources.some(s=>!s)){counts.unresolved_sources++;add('SOURCE_UNRESOLVED',row,item,ids.filter(id=>!source(id)).join(', '));return null;}
 const key=()=>item.options?.[item.answer];
 if(row.topic==='Comprensión lectora'&&row.mode==='quiz'&&item.id.startsWith('m2-reading-')){
  const [a,b]=sources;
  if(a.options?.[a.answer]===undefined||b.options?.[b.answer]===undefined)return null;
  return {expected:'Lectura A: '+a.options[a.answer]+'; lectura B: '+b.options[b.answer],actual:key(),sourceIds:ids};
 }
 if(row.topic==='Comprensión lectora'&&row.mode==='quiz'&&item.id.startsWith('m3-reading-')){
  const expected=sources.map((s,i)=>'Fuente '+('ABC'[i])+': '+s.options?.[s.answer]).join('; ');
  return {expected,actual:key(),sourceIds:ids};
 }
 if(row.topic==='Redacción'&&row.mode==='quiz'&&item.id.startsWith('m2-writing-')){
  return {expected:sources[0].connector,actual:item.connector,sourceIds:ids};
 }
 if(row.topic==='Redacción'&&row.mode==='quiz'&&item.id.startsWith('m3-writing-')){
  return {expected:sources[0].connector,actual:item.connector,sourceIds:ids};
 }
 if(row.topic==='Redacción'&&row.mode==='clasificar'&&('correctConnector' in item)&&
  (item.id.startsWith('m2-writing-')||item.id.startsWith('m3-writing-'))){
  return {expected:sources[0].correctConnector,actual:item.correctConnector,sourceIds:ids};
 }
 return null;
};
for(const row of rows)for(const item of pool(row)){
 if(Array.isArray(item.options)&&item.options.length===4){
  const raw=item.options.map(normalized);
  if(new Set(raw).size!==raw.length){
   counts.normalized_distractors++;
   add('DISTRACTOR_EQUIVALENT_NORMALIZED',row,item,item.options.join(' | '),true);
  }
  // Posible ambigüedad estilística: detección solo para revisión.
  const simplified=raw.map(s=>s.replace(/[.,;:!?¿¡\s]+/g,''));
  if(new Set(simplified).size!==simplified.length&&new Set(raw).size===raw.length)
   add('DISTRACTOR_PUNCTUATION_ONLY',row,item,item.options.join(' | '));
 }
 const d=derive(row,item);
 if(d){
  counts.derived_checked++;
  if(!same(d.expected,d.actual))add('COMPOSITE_KEY_MISMATCH',row,item,
   {derived:d.expected,stored:d.actual,sourceIds:d.sourceIds},true);
  if(row.mode==='quiz'&&Array.isArray(item.options)){
   const n=item.options.filter(option=>same(option,d.expected)).length;
   if(n!==1)add('COMPOSITE_KEY_NOT_UNIQUE',row,item,{matches:n,sourceIds:d.sourceIds},true);
  }
 }
}
const cases=[
 {name:'m2-reading',expected:'Lectura A: A; lectura B: B',actual:'Lectura A: A; lectura B: B'},
 {name:'m3-reading-mutated',expected:'Fuente A: A; Fuente B: B; Fuente C: C',actual:'Fuente A: A; Fuente B: WRONG; Fuente C: C'},
 {name:'writing-mutated',expected:'sin embargo',actual:'por tanto'}
];
const mutation={valid_accepted:same(cases[0].expected,cases[0].actual),altered_rejected:cases.slice(1).every(x=>!same(x.expected,x.actual))};
if(!mutation.valid_accepted||!mutation.altered_rejected)findings.push({kind:'SELF_TEST_FAILED',mutation});
const sha=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
const out={suite:'SPANISH_DERIVED_KEYS_AND_DISTRACTORS_V1',sha,status:findings.length?'FAIL':'PASS',counts,mutation,blocking:findings.slice(0,100),blocking_total:findings.length,editorial_review:reviews.slice(0,160),editorial_review_total:reviews.length,
 academic_certification:'PENDIENTE',limits:'Derivación desde fuentes almacenadas comprueba fidelidad de composición; no comprueba que la clave de la fuente sea correcta según guías, ni exhaustividad semántica de distractores.'};
mkdirSync('qa/certification/evidence',{recursive:true});
writeFileSync('qa/certification/evidence/semantic-lineage.json',JSON.stringify(out,null,2)+'\n');
console.log(JSON.stringify({status:out.status,counts,mutation,blocking:findings.slice(0,10),blocking_total:findings.length,review_total:reviews.length},null,2));
if(findings.length)process.exitCode=1;
