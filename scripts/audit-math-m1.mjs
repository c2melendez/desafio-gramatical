import {MATH_LEVEL_COUNT,MATH_LEVELS,MATH_MODES,MATH_TOPICS,mathPool,MATH_M1_TOTAL,} from "../src/lib/math-m1.ts";
import {selectRotation,emptyRotation,recordRotation} from "../src/lib/rotation.ts";
import {execFileSync} from "node:child_process";
const eq=(a,b)=>a.n*b.d===b.n*a.d;
const ratio=(n,d=1)=>({n,d});
function gcd(a,b){while(b){const k=a%b;a=b;b=k;}return Math.abs(a)}
function independentOracle(kind,values){
 const x=values;
 switch(kind){
 case "Operaciones":return ratio((x[0]+x[1])*x[2]);
 case "Fracciones":return ratio(x[0]*x[3]+x[2]*x[1],x[1]*x[3]);
 case "Porcentajes":return ratio(x[0]*x[1],100);
 case "Proporciones":return ratio(x[1]*x[2],x[0]);
 case "Potencias":return ratio(x[0]**x[1]);
 case "divisibilidad":return ratio(x[2]===0?gcd(x[0],x[1]):x[0]*x[1]/gcd(x[0],x[1]));
 case "Ecuaciones":return ratio(x[2]-x[1],x[0]);
 case "Sistemas de ecuaciones":return ratio(x[0]+x[1],2);
 case "Sucesiones":return ratio(x[0]+3*x[1]);
 case "Funciones":return ratio(x[0]*x[2]+x[1]);
 case "Ecuaciones cuadráticas":{const r=Math.sqrt(x[0]*x[0]-4*x[1]);return ratio((x[0]+r)/2)}
 case "Inecuaciones":return ratio(x[2]-x[1],x[0]);
 case "Patrones algebraicos":return ratio(x[0]*x[2]+x[1]);
 case "Áreas y perímetros":return ratio(x[2]?x[0]*x[1]:2*(x[0]+x[1]));
 case "Ángulos":return ratio(180-x[0]-x[1]);
 case "Pitágoras":return ratio(Math.sqrt(x[0]**2+x[1]**2));
 case "Sólidos: área y volumen":return ratio(x[3]?x[0]*x[1]*x[2]:2*(x[0]*x[1]+x[0]*x[2]+x[1]*x[2]));
 case "Semejanza":return ratio(x[1]*x[2],x[0]);
 case "Promedios":return ratio(x[0]+x[1]+x[2],3);
 case "Probabilidad":return ratio(x[0],x[0]+x[1]);
 case "Dispersión de datos":return ratio(x[2]-x[0]);
 case "Tablas y gráficas":return ratio(x[0]+x[1]+x[2]);
 default:throw new Error("oráculo independiente sin modelo "+kind);
 }
}
const reports=[],ids=new Set(),problems=[],allPrompts=new Set();
let count=0;let modeCounts={clasificar:0,quiz:0,construir:0};
for(const topic of MATH_TOPICS)for(const subtopic of topic.subtopics)
 for(const mode of MATH_MODES)for(const level of MATH_LEVELS){
 const bank=mathPool(topic.name,subtopic,level,mode),problemsInCell=[];
 const stems=new Set();
 for(const item of bank){
  count++;modeCounts[mode]++;
  const key=item.prompt.normalize("NFKC").toLocaleLowerCase("es").trim();
  if(ids.has(item.id))problemsInCell.push(item.id+": ID repetido");ids.add(item.id);
  if(stems.has(key))problemsInCell.push(item.id+": enunciado idéntico en la misma celda");
  stems.add(key);
  const independent=independentOracle(item.oracle.kind,item.oracle.inputs);
  if(!eq(item.oracle.answer,independent))problemsInCell.push(item.id+": resultado no coincide con oráculo independiente");
  const visibleFeedback=item.explanation+" Procedimiento comprobable: "+item.formula;
  if(!visibleFeedback.includes(item.expected)||visibleFeedback.length<85||item.explanation.length<35)problemsInCell.push(item.id+": justificación visible incompleta");
  if(item.source!=="catalogo-practica-complementaria"&&item.source!=="GUIA-PRE-U-UNAH-2026:p6")problemsInCell.push(item.id+": origen incorrecto");
  if(new Set(item.options).size!==4||item.options[item.answerIndex]!==item.expected)problemsInCell.push(item.id+": alternativas o clave inválida");
  if(item.assertions.length!==3||item.assertions.filter(x=>x.truth).length!==1||new Set(item.assertions.map(x=>x.text)).size!==3)problemsInCell.push(item.id+": clasificación incompleta");
  if(item.steps.length!==2||item.steps.some(step=>new Set(step.choices).size!==4||step.answerIndex<0||step.answerIndex>=4))problemsInCell.push(item.id+": construcción inválida");
  allPrompts.add(key);
 }
 if(bank.length!==MATH_LEVEL_COUNT[level])problemsInCell.push("celda: cantidad fuera del núcleo");
 // Prueba de selección e historial de rotación sin depender del navegador.
 let state=emptyRotation();
 const first=selectRotation(bank,state,10,()=>0.41);
 if(first.length!==10||new Set(first.map(x=>x.id)).size!==10)problemsInCell.push("partida: no alcanza 10 IDs distintos");
 for(const item of first)state=recordRotation(state,item.id,true);
 const second=selectRotation(bank,state,10,()=>0.61);
 if(second.length!==10||new Set(second.map(x=>x.id)).size!==10)problemsInCell.push("rotación: duplicados");
 if(bank.length>=15&&second.every(x=>first.some(y=>y.id===x.id)))problemsInCell.push("rotación: no prioriza preguntas inéditas");
 reports.push({topic:topic.name,subtopic,mode,level,count:bank.length,distinct_stems:stems.size,issues:problemsInCell});
 for(const issue of problemsInCell)problems.push({cell:topic.name+"/"+subtopic+"/"+mode+"/"+level,issue});
 }
const expected=MATH_TOPICS.reduce((n,t)=>n+t.subtopics.length,0)*3*(10+15+20);
if(count!==expected||count!==MATH_M1_TOTAL||ids.size!==expected)problems.push({issue:"inventario total 2970 IDs: "+count+"/"+ids.size+"/"+expected});
const report={module:"matematicas-M1",stage:"NUCLEO",status:problems.length?"FAIL":"PASS",
 sha:execFileSync("git",["rev-parse","HEAD"],{encoding:"utf8"}).trim(),
 scope:{topics:MATH_TOPICS.length,subtopics:MATH_TOPICS.reduce((n,t)=>n+t.subtopics.length,0),
 cells:reports.length,records:count,ids_unique:ids.size,distinct_prompt_strings:allPrompts.size,
 mode_counts:modeCounts,level_targets:MATH_LEVEL_COUNT},
 checks:{independent_numerical_oracle:"22 modelos, valores racionales exactos",unique_answer_options:true,
 multi_decision_one_round:true,rotation:"10 ID por sesión, preferencia inéditos",
 academic_review:"PENDIENTE (autoriza usuario)",semantic_independence:"NO CERTIFICADA",
 guideline:"GUIA-PRE-U-UNAH-2026.pdf, página 6; subtemas extendidos práctica complementaria"},
 matrix:reports,failures:problems};
console.log(JSON.stringify(report,null,2));if(problems.length)process.exitCode=1;
