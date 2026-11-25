import {MATH_LEVELS,MATH_MODES,MATH_TOPICS,MATH_LEVEL_COUNT,mathPool} from "../src/lib/math-m1.ts";
import {MATH_M2_LEVEL_COUNT,mathM2Pool} from "../src/lib/math-m2.ts";
import {MATH_M3_LEVEL_COUNT,MATH_M3_NEW_PER_LEVEL,MATH_M3_TOTAL,MATH_M3_NEW_TOTAL,mathM3Pool,mathM3NewPool,mathStimulusSignature} from "../src/lib/math-m3.ts";
import {selectRotation,emptyRotation,recordRotation} from "../src/lib/rotation.ts";
import {execFileSync} from "node:child_process";
import {expectedOperationClassificationTruthCount} from "../src/lib/math-operations-classification.ts";
import {verifyMathM3Cell} from "../src/lib/math-m3-guards.ts";
const eq=(a,b)=>a.n*b.d===b.n*a.d;
const ratio=(n,d=1)=>({n,d});
function gcd(a,b){while(b){const k=a%b;a=b;b=k;}return Math.abs(a)}
function independentOracle(kind,values){
 const x=values;
 switch(kind){
 case "Operaciones":return ratio((x[0]+x[1])*x[2]);
 case "Operaciones-racionales":{const [p,d,n,m,stage]=x;return stage===3?ratio(2*p+4*n-m,2*d):ratio(p+n-m,d);}
 case "Fracciones":return ratio(x[0]*x[3]+x[2]*x[1],x[1]*x[3]);
 case "Porcentajes":return ratio(x[0]*x[1],100);
 case "Proporciones":return ratio(x[1]*x[2],x[0]);
 case "Potencias":return ratio(x[0]**x[1]);
 case "divisibilidad":return ratio(x[2]===0?gcd(x[0],x[1]):x[0]*x[1]/gcd(x[0],x[1]));
 case "Ecuaciones":return ratio(x[2]-x[1],x[0]);
 case "Sistemas de ecuaciones":return ratio(x[0]+x[1],2);
 case "Sucesiones":return ratio(x[0]+3*x[1]);
 case "Sucesiones-quinto":return ratio(x[0]+4*x[1]);
 case "Sucesiones-diferencia":return ratio(4*x[1]);
 case "Funciones":return ratio(x[0]*x[2]+x[1]);
 case "Ecuaciones cuadráticas":{const r=Math.sqrt(x[0]*x[0]-4*x[1]);return ratio((x[0]+r)/2)}
 case "Inecuaciones":return ratio(x[2]-x[1],x[0]);
 case "Patrones algebraicos":return ratio(x[0]*x[2]+x[1]);
 case "Áreas y perímetros":return ratio(x[2]?x[0]*x[1]:2*(x[0]+x[1]));
 case "Ángulos":return ratio(180-x[0]-x[1]);
 case "Pitágoras":return ratio(Math.sqrt(x[0]**2+x[1]**2));
 case "Pitágoras-perímetro":return ratio(Math.sqrt(x[0]**2+x[1]**2)+x[0]+x[1]);
 case "Sólidos: área y volumen":return ratio(x[3]?x[0]*x[1]*x[2]:2*(x[0]*x[1]+x[0]*x[2]+x[1]*x[2]));
 case "Semejanza":return ratio(x[1]*x[2],x[0]);
 case "Promedios":return ratio(x[0]+x[1]+x[2],3);
 case "Probabilidad":return ratio(x[0],x[0]+x[1]);
 case "Dispersión de datos":return ratio(x[2]-x[0]);
 case "Tablas y gráficas":return ratio(x[0]+x[1]+x[2]);
 case "bar-balance":return ratio(x[0]+x[1]-x[2]);
 default:throw new Error("oráculo independiente sin modelo "+kind);
 }
}


const issues=[],rows=[],globalIds=new Set(),stage={principiante:1,intermedio:2,avanzado:3};
let coreCount=0,newCount=0;
for(const topic of MATH_TOPICS)for(const subtopic of topic.subtopics)
 for(const mode of MATH_MODES)for(const level of MATH_LEVELS){
 const core=mathM2Pool(topic.name,subtopic,level,mode),fresh=mathM3NewPool(topic.name,subtopic,level,mode);
 const bank=mathM3Pool(topic.name,subtopic,level,mode);
 const cell=topic.name+"/"+subtopic+"/"+mode+"/"+level,issuesBefore=issues.length;
 for(const issue of verifyMathM3Cell(bank,level))issues.push(cell+": structural guard "+issue);
 if(core.length!==MATH_M2_LEVEL_COUNT[level]||fresh.length!==MATH_M3_NEW_PER_LEVEL[level]||bank.length!==MATH_M3_LEVEL_COUNT[level])
  issues.push(cell+": wrong quota");
 for(let i=0;i<core.length;i++)if(bank[i].id!==core[i].id)issues.push(cell+": M2 ID changed");
 const localKeys=new Set(),operations=new Set();
 for(const item of bank){
  if(globalIds.has(item.id))issues.push(cell+": repeated ID "+item.id);
  globalIds.add(item.id);
  const signature=mathStimulusSignature(item);
  if(localKeys.has(signature))issues.push(cell+": duplicate stimulus "+item.id);
  localKeys.add(signature);
  const oracle=independentOracle(item.oracle.kind,item.oracle.inputs);
  if(!eq(item.oracle.answer,oracle)||!eq(item.oracle.answer,(()=>{const p=item.expected.split("/").map(Number);return ratio(p[0],p[1]??1)})()))
   issues.push(cell+": invalid independent oracle "+item.id);
  if(item.options.length!==4||new Set(item.options).size!==4||item.options[item.answerIndex]!==item.expected)
   issues.push(cell+": invalid quiz answer "+item.id);
  if(item.assertions.length!==3||item.assertions.filter(a=>a.truth).length!==expectedOperationClassificationTruthCount(item)||new Set(item.assertions.map(a=>a.text)).size!==3)
   issues.push(cell+": invalid classification "+item.id);
  if(item.steps.length!==2||item.steps.some(st=>st.choices.length!==4||new Set(st.choices).size!==4||st.answerIndex<0||st.answerIndex>=4))
   issues.push(cell+": invalid construction "+item.id);
  if(!item.explanation.includes(item.expected)||item.explanation.length<40||!item.formula)
   issues.push(cell+": incomplete learning feedback "+item.id);
  if(item.cognitiveStage!==stage[level]||!item.operation||!item.requiredEvidence?.length||!item.modeOperation)
   issues.push(cell+": invalid cognitive metadata "+item.id);
  if(!["GUIA-PRE-U-UNAH-2026:p6","catalogo-practica-complementaria"].includes(item.source))
   issues.push(cell+": invalid source "+item.id);
  if(item.visual && item.visualRequirement!=="essential")issues.push(cell+": graphic not required "+item.id);
  if(item.requiredEvidence && item.requiredEvidence.length<stage[level]+1)issues.push(cell+": deficient cognitive evidence "+item.id);
  if(item.reviewStatus!=="editorial-draft")issues.push(cell+": invalid review status "+item.id);
  operations.add(item.operation);
 }
 // v7.8.1 requires actual curricular breadth, not one numerical template per cell.
 // Exception is exact and limited to the 3 corrective OP-04 records in each middle/advanced Operaciones cell.
 if(subtopic==="Operaciones"&&level!=="principiante"){
  const old=level==="intermedio"?"modificar-parentesis-y-factor":"distributiva-y-cancelacion";
  const added=level==="intermedio"?"raiz-racionales-signos":"raiz-producto-racionales-combinados";
  if(operations.size!==2||!operations.has(old)||!operations.has(added)||bank.filter(x=>x.operation===added&&x.oracle.kind==="Operaciones-racionales").length!==3)
   issues.push(cell+": invalid OP-04 coverage");
 }else if(operations.size!==1)issues.push(cell+": mixed cognitive operation");
 const first=selectRotation(bank,emptyRotation(),10,()=>0.42);
 let history=emptyRotation();for(const x of first)history=recordRotation(history,x.id,true);
 const second=selectRotation(bank,history,10,()=>0.57);
 if(first.length!==10||second.length!==10||new Set(first.map(x=>x.id)).size!==10||new Set(second.map(x=>x.id)).size!==10)
  issues.push(cell+": failed 10-round rotation");
 if(second.every(x=>first.some(y=>y.id===x.id)))issues.push(cell+": rotation did not prefer unseen IDs");
 coreCount+=core.length;newCount+=fresh.length;
 rows.push({topic:topic.name,subtopic,mode,level,before:core.length,added:fresh.length,after:bank.length,
  target:MATH_M2_LEVEL_COUNT[level],distinct_stimuli:localKeys.size,operation:[...operations][0],
  issues:issues.length-issuesBefore});
 }
if(rows.length!==198||coreCount!==6600||newCount!==MATH_M3_NEW_TOTAL||coreCount+newCount!==MATH_M3_TOTAL||globalIds.size!==MATH_M3_TOTAL)
 issues.push("Global totals inconsistent: "+JSON.stringify({cells:rows.length,coreCount,newCount,ids:globalIds.size}));
const report={module:"matematicas-M3",status:issues.length?"FAIL":"PASS",
 sha:execFileSync("git",["rev-parse","HEAD"],{encoding:"utf8"}).trim(),counts:{cells:rows.length,before:coreCount,added:newCount,after:coreCount+newCount,unique_ids:globalIds.size},
 targets:MATH_M3_LEVEL_COUNT,review:"AUTOMATICA_ESTRUCTURAL; DOCENTE_PENDIENTE; INDEPENDENCIA_CONCEPTUAL_NO_CERTIFICADA",
 rows,issues};
console.log(JSON.stringify(report,null,2));if(issues.length)process.exitCode=1;
