/** M1 regresión de progresión cognitiva: barrera formal, no juicio docente. */
import {MATH_TOPICS,MATH_MODES,MATH_LEVELS,MATH_LEVEL_COUNT,mathPool} from "../src/lib/math-m1.ts";
const rehabilitated=new Set([
 "Operaciones","Fracciones","Porcentajes","Proporciones","Potencias","MCD y MCM",
 "Ecuaciones","Sistemas de ecuaciones","Ecuaciones cuadráticas","Inecuaciones","Funciones","Patrones algebraicos",
 "Áreas y perímetros","Ángulos","Pitágoras","Sólidos: área y volumen","Semejanza",
 "Promedios","Probabilidad","Dispersión de datos","Tablas y gráficas","Sucesiones"
]);
const stage={principiante:1,intermedio:2,avanzado:3};
const failures=[],rows=[],ids=new Set();
for(const topic of MATH_TOPICS)for(const subtopic of topic.subtopics){
 if(!rehabilitated.has(subtopic))continue;
 for(const mode of MATH_MODES){
  const operations=[],demands=[];
  for(const level of MATH_LEVELS){
   const bank=mathPool(topic.name,subtopic,level,mode);
   if(bank.length!==MATH_LEVEL_COUNT[level])failures.push(subtopic+"/"+mode+"/"+level+": cupo incorrecto");
   const uniqueOperations=new Set();
   for(const item of bank){
    if(ids.has(item.id))failures.push(item.id+": ID duplicado");
    ids.add(item.id);
    if(item.cognitiveStage!==stage[level])failures.push(item.id+": etapa cognitiva incorrecta");
    if(!item.operation||!item.requiredEvidence?.length)failures.push(item.id+": falta evidencia/operacion");
    if(item.requiredEvidence?.length < stage[level]+1)failures.push(item.id+": demanda insuficiente para etapa");
    if(!item.modeOperation)failures.push(item.id+": falta contrato de modalidad");
    if(!item.explanation?.trim()||!item.formula?.trim())failures.push(item.id+": falta fundamentacion");
    if(item.visual?.stage && item.cognitiveStage!==1 && !item.prompt.includes("original") && !item.prompt.includes("inicial") && !item.prompt.includes("origen")) failures.push(item.id+": transformación sin referencia al diagrama original");
    if(item.visual?.stage && item.cognitiveStage!==1 && !item.explanation.includes(item.expected)) failures.push(item.id+": justificación visual omite resultado transformado");
    uniqueOperations.add(item.operation);
   }
   if(uniqueOperations.size!==1)failures.push(subtopic+"/"+mode+"/"+level+": operacion inconsistente");
   operations.push(...uniqueOperations);
   demands.push(bank[0]?.requiredEvidence?.length??0);
   rows.push({tema:topic.name,subtema:subtopic,juego:mode,nivel:level,
    registros:bank.length,etapa:stage[level],operacion:bank[0]?.operation,
    evidencias:demands.at(-1),modalidad:bank[0]?.modeOperation});
  }
  if(new Set(operations).size!==3)failures.push(subtopic+"/"+mode+": las tres dificultades repiten una operacion");
  if(!(demands[0]<demands[1]&&demands[1]<demands[2]))
   failures.push(subtopic+"/"+mode+": la evidencia no crece por nivel");
 }
}
const total=rows.reduce((s,r)=>s+r.registros,0);
if(rows.length!==198||total!==2970||ids.size!==2970)failures.push("Cobertura esperada 198 celdas / 2970 registros: "+rows.length+"/"+total+"/"+ids.size);
const report={module:"matematicas-M1",control:"regresion-progresion-cognitiva",
 status:failures.length?"FAIL":"PASS",subtopics:rehabilitated.size,cells:rows.length,records:total,
 identities:ids.size,remaining_original_subtopics:MATH_TOPICS.reduce((n,t)=>n+t.subtopics.filter(s=>!rehabilitated.has(s)).length,0),
 academic_review:"PENDIENTE_AUTORIZADA",rows,failures};
console.log(JSON.stringify(report,null,2));
if(failures.length)process.exitCode=1;
