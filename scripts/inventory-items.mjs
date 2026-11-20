import {M2_CATEGORY_SENTENCES,M2_CATEGORY_QUIZ,M2_CATEGORY_BUILD,M2_GRAMMAR_ACTIVITIES} from "../src/lib/m2-grammar.ts";
import {M3_CATEGORY_SENTENCES,M3_CATEGORY_QUIZ,M3_CATEGORY_BUILD,M3_GRAMMAR_ACTIVITIES} from "../src/lib/m3-grammar.ts";
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
import {GRAMMAR_M1_ACTIVITIES} from '../src/lib/grammar-m1-activities.ts';
import {M1_NEXT_ACTIVITIES} from '../src/lib/grammar-m1-next-activities.ts';
import {M1_LITERATURE_ACTIVITIES} from '../src/lib/grammar-m1-literature.ts';
import { readingPool } from '../src/lib/reading.ts';
import { writingPool } from '../src/lib/writing.ts';
import {mathM3Pool} from '../src/lib/math-m3.ts';
import {scienceM3Pool} from '../src/lib/science-m3.ts';
import {socialPool} from '../src/lib/social-m1.ts';

export function pool(row) {
  const {area,topic,subtopic,mode,level}=row;
  if(area==='matematicas')return mathM3Pool(topic,subtopic,level,mode);
  if(area==='naturales')return scienceM3Pool(topic,subtopic,level,mode);
  if(area==='sociales')return socialPool(topic,subtopic,level,mode);
  if(area!=='espanol')return [];
  if(topic==='Gramática y semántica'&&subtopic==='Categorías gramaticales'){
    if(mode==='clasificar')return [...SENTENCES[level],...EXTRA_SENTENCES[level],...(level==='avanzado'?GRAMMAR_ADVANCED_SENTENCES:[]),...M2_CATEGORY_SENTENCES[level],...M3_CATEGORY_SENTENCES[level]];
    if(mode==='quiz')return [...QUIZ[level],...EXTRA_QUIZ[level],...M2_CATEGORY_QUIZ[level],...M3_CATEGORY_QUIZ[level]];
    return [...BUILD[level],...EXTRA_BUILD[level],...GRAMMAR_NUCLEUS_BUILD[level],...M2_CATEGORY_BUILD[level],...M3_CATEGORY_BUILD[level]];
  }
  if(topic==='Gramática y semántica'&&subtopic==='Sinónimos y antónimos'&&mode==='clasificar')
    return [...SYNONYM_CLASSIFICATION.filter(x=>x.level===level),...[...M2_GRAMMAR_ACTIVITIES,...M3_GRAMMAR_ACTIVITIES].filter(x=>x.subtopic===subtopic&&x.level===level&&x.kind==="classification")];
  if(topic==='Gramática y semántica'&&subtopic==='Cohesión y coherencia'&&mode==='clasificar')
    return [...COHESION_CLASSIFICATION.filter(x=>x.level===level),...[...M2_GRAMMAR_ACTIVITIES,...M3_GRAMMAR_ACTIVITIES].filter(x=>x.subtopic===subtopic&&x.level===level&&x.kind==="classification")];
  if(topic==='Gramática y semántica'&&mode==='quiz')return grammarPilotPool(subtopic,level);
  if(topic==='Gramática y semántica')return [...GRAMMAR_M1_ACTIVITIES,...M1_NEXT_ACTIVITIES,...M2_GRAMMAR_ACTIVITIES,...M3_GRAMMAR_ACTIVITIES].filter(x=>x.subtopic===subtopic&&x.level===level&&x.kind===(mode==='construir'?'construction':'classification'));

  if(topic==='Literatura')return mode==='quiz'?grammarPilotPool(subtopic,level):[...M1_LITERATURE_ACTIVITIES,...M2_GRAMMAR_ACTIVITIES,...M3_GRAMMAR_ACTIVITIES].filter(x=>x.subtopic===subtopic&&x.level===level&&x.kind===(mode==='construir'?'construction':'classification'));
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
