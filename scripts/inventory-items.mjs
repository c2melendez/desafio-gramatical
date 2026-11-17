/** Inventario técnico por ID, sin atribuir calidad ni independencia. */
import { execFileSync } from 'node:child_process';
import { coverageRows } from '../src/lib/coverage.ts';
import { SENTENCES,QUIZ,BUILD } from '../src/lib/grammar.ts';
import { EXTRA_SENTENCES } from '../src/lib/extra-sentences.ts';
import { EXTRA_QUIZ } from '../src/lib/extra-quiz.ts';
import { EXTRA_BUILD } from '../src/lib/extra-build.ts';
import { GRAMMAR_ADVANCED_SENTENCES, GRAMMAR_NUCLEUS_BUILD } from '../src/lib/grammar-nucleus.ts';
import { SYNONYM_CLASSIFICATION } from '../src/lib/grammar-classify-synonyms.ts';
import { COHESION_CLASSIFICATION } from '../src/lib/grammar-classify-cohesion.ts';
import { grammarPilotPool } from '../src/lib/grammar-next-draft.ts';
import { readingPool } from '../src/lib/reading.ts';
import { writingPool } from '../src/lib/writing.ts';

function pool(row) {
  const {area,topic,subtopic,mode,level}=row;
  if(area!=='espanol')return [];
  if(topic==='Gramática y semántica'&&subtopic==='Categorías gramaticales'){
    if(mode==='clasificar')return [...SENTENCES[level],...EXTRA_SENTENCES[level],...(level==='avanzado'?GRAMMAR_ADVANCED_SENTENCES:[])];
    if(mode==='quiz')return [...QUIZ[level],...EXTRA_QUIZ[level]];
    return [...BUILD[level],...EXTRA_BUILD[level],...GRAMMAR_NUCLEUS_BUILD[level]];
  }
  if(topic==='Gramática y semántica'&&subtopic==='Sinónimos y antónimos'&&mode==='clasificar')
    return SYNONYM_CLASSIFICATION.filter(x=>x.level===level);
  if(topic==='Gramática y semántica'&&subtopic==='Cohesión y coherencia'&&mode==='clasificar')
    return COHESION_CLASSIFICATION.filter(x=>x.level===level);
  if(topic==='Gramática y semántica'&&mode==='quiz')return grammarPilotPool(subtopic,level);
  if(topic==='Comprensión lectora')return readingPool(level,subtopic,mode);
  if(topic==='Redacción')return writingPool(level,subtopic,mode);
  return [];
}
export function auditIds(items,expected){
 const ids=items.map(x=>x?.id);
 const invalid=ids.flatMap((id,i)=>typeof id==='string'&&id.trim()?[]:[i]);
 const seen=new Set(),duplicates=[];
 for(const id of ids){if(seen.has(id))duplicates.push(id);seen.add(id)}
 return {count:ids.length,expected,ids,invalid_indices:invalid,duplicated_ids:[...new Set(duplicates)],matches:ids.length===expected&&invalid.length===0&&duplicates.length===0};
}
export function inventoryItems(){
 const rows=coverageRows();
 const groups=rows.map(row=>{
  const result=auditIds(pool(row),row.available);
  return {area:row.area,tema:row.topic,subtema:row.subtopic,juego:row.mode,nivel:row.level,...result};
 });
 const failures=groups.filter(g=>!g.matches);
 const cross=new Map();
 for(const g of groups)for(const id of g.ids){
  if(typeof id!=='string')continue;
  const item=cross.get(id)||[];
  item.push([g.area,g.tema,g.subtema,g.juego,g.nivel].join('/'));
  cross.set(id,item);
 }
 const shared=[...cross].filter(([,where])=>where.length>1).map(([id,where])=>({id,where}));
 return {version:1,sha:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),
  warning:'IDs únicos por celda y conteos son controles técnicos; compartir ID entre juegos no prueba independencia. Validación docente y funcional pendientes.',
  summary:{cells:groups.length,declared:groups.reduce((n,g)=>n+g.expected,0),observed:groups.reduce((n,g)=>n+g.count,0),failed_cells:failures.length,ids_reused_between_cells:shared.length},failures,shared_ids:shared,groups};
}
if(process.argv[1]?.endsWith('inventory-items.mjs')){
 const data=inventoryItems();
 console.log(JSON.stringify(data,null,2));
 if(data.failures.length)process.exitCode=1;
}
