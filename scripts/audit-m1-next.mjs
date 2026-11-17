import {M1_NEXT_QUIZ,M1_NEXT_ACTIVITIES} from '../src/lib/grammar-m1-next-activities.ts';
import {GRAMMAR_M1_ACTIVITIES} from '../src/lib/grammar-m1-activities.ts';
import {gradeClassification,gradeConstruction,validateActivity} from '../src/lib/grammar-activities.ts';
import {coverageRows} from '../src/lib/coverage.ts';
import {execFileSync} from 'node:child_process';
const names=new Set(["Homonimia y polisemia","Hiperonimia","Adecuación y referente"]);
const all=[...M1_NEXT_QUIZ,...M1_NEXT_ACTIVITIES];
const ids=new Set(GRAMMAR_M1_ACTIVITIES.map(x=>x.id));
const issues=[],snapshots=[],seen=new Map(),footprints=new Map();
const normalize=x=>String(x??"").normalize("NFKC").toLocaleLowerCase("es").replace(/\s+/g," ").trim();
for(const item of all){
 if(ids.has(item.id))issues.push({id:item.id,rule:"ID existente reutilizado"});
 if(seen.has(item.id))issues.push({id:item.id,rule:"ID repetido"});
 seen.set(item.id,item);
 if(!names.has(item.subtopic))issues.push({id:item.id,rule:"subtema ajeno"});
 if(!item.origin||!item.family||!item.cognitiveGoal||!item.sourceLocator)issues.push({id:item.id,rule:"trazabilidad incompleta"});
 if(item.reviewStatus!=="editorial-draft")issues.push({id:item.id,rule:"promoción editorial no justificada"});
 if(item.options){
  const opts=item.options.map(normalize);
  if(opts.length!==4||new Set(opts).size!==4||!opts[item.answer])issues.push({id:item.id,rule:"opciones/clave inválidas"});
  if(!item.passage||!item.question||!item.explanation)issues.push({id:item.id,rule:"explicación/contexto vacíos"});
 }else{
  for(const error of validateActivity(item))issues.push({id:item.id,rule:error});
  if(item.kind==="classification"){
   const correct=Object.fromEntries(item.items.map(x=>[x.id,x.label]));
   if(!gradeClassification(item,correct)||gradeClassification(item,{}))issues.push({id:item.id,rule:"clasificación inválida"});
   if(item.items.map(x=>x.label).every((v,i)=>v===item.labels[i]))issues.push({id:item.id,rule:"clave filtrada por posición"});
  }else{
   if(item.tiles.length!==4||item.solutions[0]?.length!==3||
     !item.tiles.some(x=>x.id==="d")||!gradeConstruction(item,item.solutions[0])||
     gradeConstruction(item,[...item.solutions[0].slice(0,2),"d"]))
      issues.push({id:item.id,rule:"construcción/distractor inválido"});
  }
 }
 const question=normalize([item.passage,item.question||item.prompt,item.options?.join("|"),item.items?.map(x=>x.text).join("|"),item.tiles?.map(x=>x.text).join("|")].filter(Boolean).join("|"));
 const key=item.subtopic+'|'+(item.options?'quiz':item.kind)+'|'+question;
 if(footprints.has(key))issues.push({id:item.id,rule:"consigna normalizada duplicada",similar_to:footprints.get(key)});
 else footprints.set(key,item.id);
 snapshots.push({id:item.id,subtema:item.subtopic,nivel:item.level,juego:item.options?'quiz':item.kind==='construction'?'construir':'clasificar',
    estructura:'VERIFICADO',semantica:'INCONCLUSO',independencia:'INCONCLUSO',revision_docente:'PENDIENTE',family:item.family});
}
const rows=coverageRows().filter(x=>x.area==="espanol"&&x.topic==="Gramática y semántica"&&names.has(x.subtopic));
const perCell=rows.map(x=>({subtema:x.subtopic,juego:x.mode,nivel:x.level,observados:x.available,meta:x.stageOne}));
for(const r of perCell)if(r.observados!==r.meta)issues.push({...r,rule:"cuota de núcleo incompleta"});
const report={version:1,module:"espanol-M1",scope:"405 registros técnicos nuevos de tres subtemas; no representa cierre de M1 Español",
 sha:execFileSync("git",["rev-parse","HEAD"],{encoding:"utf8"}).trim(),
 status:issues.length?"FAIL":"PASS",
 totals:{records:all.length,quiz:M1_NEXT_QUIZ.length,class_or_build:M1_NEXT_ACTIVITIES.length,cells:perCell.length,issues:issues.length},
 contracts:{estructura:issues.length?"RECHAZADO":"VERIFICADO",claves_estructurales:issues.length?"RECHAZADO":"VERIFICADO",oraculo_semantico:"INCONCLUSO",
 independencia_conceptual:"INCONCLUSO",revision_docente:"PENDIENTE",publicacion:"NO_VERIFICADA"},
 warning:"Repetir un estímulo en juegos diferentes produce registros, no ejercicios independientes demostrados. No promocionar automáticamente ni declarar cierre.",
 perCell,issues,items:snapshots};
console.log(JSON.stringify(report,null,2));
if(issues.length)process.exitCode=1;
