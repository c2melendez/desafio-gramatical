import {GRAMMAR_ADVANCED_SENTENCES,GRAMMAR_NUCLEUS_BUILD} from "../src/lib/grammar-nucleus";
import {checkBuild} from "../src/lib/grammar";
import {coverageRows,coverageTotals,CONTENT_TARGET,CONTENT_STAGE_ONE} from "../src/lib/coverage";
import {CONNECTOR_CASES} from "../src/lib/connector-cases";
import {CONNECTOR_ERROR_CASES} from "../src/lib/connector-error-cases";
import {CONNECTOR_EDITOR_CASES} from "../src/lib/connector-editor-cases";
import {CORRECTION_ERROR_CASES} from "../src/lib/correction-error-cases";
import {CORRECTION_CHOICE_CASES} from "../src/lib/correction-choice-cases";
import {CORRECTION_EDITOR_CASES} from "../src/lib/correction-editor-cases";
import {ORGANIZATION_ERROR_CASES} from "../src/lib/organization-error-cases";
import {ORGANIZATION_CHOICE_CASES} from "../src/lib/organization-choice-cases";
import {ORGANIZATION_EDITOR_CASES} from "../src/lib/organization-editor-cases";
import {ELISION_ERROR_CASES} from "../src/lib/elision-error-cases";
import {ELISION_CHOICE_CASES} from "../src/lib/elision-choice-cases";
import {ELISION_EDITOR_CASES} from "../src/lib/elision-editor-cases";
import {GENERALIZATION_ERROR_CASES} from "../src/lib/generalization-error-cases";
import {GENERALIZATION_CHOICE_CASES} from "../src/lib/generalization-choice-cases";
import {GENERALIZATION_EDITOR_CASES} from "../src/lib/generalization-editor-cases";
import {WRITING_BANK,writingPool} from "../src/lib/writing";
import {READING_BANK,readingPool} from "../src/lib/reading";
import {MAIN_IDEA_CHOICE_CASES} from "../src/lib/main-idea-choice-cases";
import {MAIN_IDEA_DETECTIVE_CASES} from "../src/lib/main-idea-detective-cases";
import {MAIN_IDEA_RECONSTRUCT_CASES} from "../src/lib/main-idea-reconstruct-cases";
import {INFERENCE_DETECTIVE_CASES} from "../src/lib/inference-detective-cases";
import {INFERENCE_CHOICE_CASES} from "../src/lib/inference-choice-cases";
import {INFERENCE_RECONSTRUCT_CASES} from "../src/lib/inference-reconstruct-cases";
import {CRITICAL_DETECTIVE_CASES} from "../src/lib/critical-detective-cases";
import {CRITICAL_CHOICE_CASES} from "../src/lib/critical-choice-cases";
import {CRITICAL_RECONSTRUCT_CASES} from "../src/lib/critical-reconstruct-cases";
import {VOCAB_DETECTIVE_CASES,VOCAB_CHOICE_CASES,VOCAB_RECONSTRUCT_CASES} from "../src/lib/reading-vocabulary-block";
import {ANALYSIS_DETECTIVE_CASES,ANALYSIS_CHOICE_CASES,ANALYSIS_RECONSTRUCT_CASES} from "../src/lib/reading-analysis-block";
import {COMPARISON_DETECTIVE_CASES,COMPARISON_CHOICE_CASES,COMPARISON_RECONSTRUCT_CASES} from "../src/lib/reading-comparison-block";
import {FIGURATIVE_DETECTIVE_CASES,FIGURATIVE_CHOICE_CASES,FIGURATIVE_RECONSTRUCT_CASES} from "../src/lib/reading-figurative-block";
const levels=["principiante","intermedio","avanzado"] as const;
const target={principiante:30,intermedio:50,avanzado:70};
const rows=coverageRows(),totals=coverageTotals();
const failures:string[]=[];
const grammarNew=[...GRAMMAR_ADVANCED_SENTENCES,...GRAMMAR_NUCLEUS_BUILD.intermedio,...GRAMMAR_NUCLEUS_BUILD.avanzado];
if(grammarNew.length!==18||new Set(grammarNew.map(x=>x.id)).size!==18||grammarNew.some(x=>x.reviewStatus!=="editorial-draft")) failures.push("Banco gramatical nuevo inválido");
for(const item of [...GRAMMAR_NUCLEUS_BUILD.intermedio,...GRAMMAR_NUCLEUS_BUILD.avanzado]){
 const chosen=item.solutions[0].split(" ").map(w=>item.tiles.find(t=>t.w===w));
 if(chosen.some(x=>!x)||!checkBuild(item,chosen as typeof item.tiles).ok)failures.push("Construcción gramatical inválida: "+item.id);
}

for(const level of levels){
 for(const subtopic of ["Conectores","Corrección","Organización textual","Elisión y adición","Generalización e integración"] as const)for(const mode of ["clasificar","quiz","construir"] as const){
  const pool=writingPool(level,subtopic,mode);
  if(pool.length!==target[level])failures.push(`${subtopic}/${mode}/${level}: ${pool.length} en vez de ${target[level]}`);
  if(new Set(pool.map(x=>x.id)).size!==pool.length)failures.push("IDs repetidos: "+subtopic+"/"+level+"/"+mode);
 }
}
for(const q of CONNECTOR_CASES){
 if(q.options.length!==4||new Set(q.options).size!==4)failures.push("Opciones inválidas: "+q.id);
 if(q.options.filter(x=>x===q.connector).length!==1)failures.push("Clave incorrecta: "+q.id);
 if(q.explanation.length<40)failures.push("Explicación insuficiente: "+q.id);
 if(!q.gap.includes("___"))failures.push("Falta espacio para conector: "+q.id);
}
for(const q of CONNECTOR_ERROR_CASES){
 if(q.options.length!==4||new Set(q.options).size!==4||q.options.filter(x=>x===q.correctConnector).length!==1)failures.push("Corrección ambigua: "+q.id);
 if(!q.flawed.includes("«")||q.correctSentence===q.flawed)failures.push("Enunciado de corrección inválido: "+q.id);
 if(q.explanation.length<42)failures.push("Explicación de error insuficiente: "+q.id);
}
for(const q of CONNECTOR_EDITOR_CASES){
 if(q.steps.length!==3||new Set(q.steps).size!==3)failures.push("Secuencia inválida: "+q.id);
 if(q.steps.some(x=>x.length<36)||q.explanation.length<42)failures.push("Secuencia superficial: "+q.id);
}
for(const q of CORRECTION_ERROR_CASES){
 if(!q.flawed.includes("«")||!q.flawed.includes("»")||q.correctSentence.includes("«"))failures.push("Error señalado inválido: "+q.id);
 if(q.options.length!==4||new Set(q.options).size!==4||q.options.filter(x=>x===q.correctConnector).length!==1)failures.push("Corrección con clave no única: "+q.id);
 if(q.explanation.length<42)failures.push("Explicación insuficiente de corrección: "+q.id);
}
for(const q of CORRECTION_CHOICE_CASES){
 if(q.gap.split("___").length!==2)failures.push("Hueco de corrección inválido: "+q.id);
 if(q.options.length!==4||new Set(q.options).size!==4||q.options.filter(x=>x===q.connector).length!==1)failures.push("Selección con clave no única: "+q.id);
 if(q.explanation.length<40)failures.push("Explicación insuficiente de forma correcta: "+q.id);
}
for(const q of CORRECTION_EDITOR_CASES){
 if(q.steps.length!==3||new Set(q.steps).size!==3||q.steps.some(x=>x.length<32))failures.push("Secuencia de corrección inválida: "+q.id);
 if(q.explanation.length<45)failures.push("Explicación insuficiente en Editor de Corrección: "+q.id);
}
for(const q of ORGANIZATION_ERROR_CASES){
 if(q.options.length!==4||new Set(q.options).size!==4||q.options.filter(x=>x===q.correctConnector).length!==1)failures.push("Revisión organizativa sin clave única: "+q.id);
 if(q.flawed.length<45||q.explanation.length<50||q.correctSentence.length<30)failures.push("Revisión organizativa superficial: "+q.id);
}
for(const q of ORGANIZATION_CHOICE_CASES){
 if(q.gap.split("___").length!==2||q.options.length!==4||new Set(q.options).size!==4||q.options.filter(x=>x===q.connector).length!==1)failures.push("Continuidad textual inválida: "+q.id);
 if(q.explanation.length<50)failures.push("Explicación de continuidad insuficiente: "+q.id);
}
for(const q of ORGANIZATION_EDITOR_CASES){
 if(q.steps.length!==3||new Set(q.steps).size!==3||q.steps.some(x=>x.length<40)||q.explanation.length<50)failures.push("Organización de párrafo incompleta: "+q.id);
}
for(const q of ELISION_ERROR_CASES){
 if(q.options.length!==4||new Set(q.options).size!==4||q.options.filter(x=>x===q.correctConnector).length!==1)failures.push("Revisión elisión con opciones inválidas: "+q.id);
 if(q.flawed.length<40||q.explanation.length<40||q.correctSentence.length<20)failures.push("Elisión insuficiente: "+q.id);
}
for(const q of ELISION_CHOICE_CASES){
 if(q.gap.split("___").length!==2||q.options.length!==4||new Set(q.options).size!==4||q.options.filter(x=>x===q.connector).length!==1)failures.push("Selección de elisión inválida: "+q.id);
 if(q.explanation.length<40)failures.push("Explicación insuficiente de elisión: "+q.id);
}
for(const q of ELISION_EDITOR_CASES){
 if(q.steps.length!==3||new Set(q.steps).size!==3||q.steps.some(x=>x.length<35)||q.explanation.length<40)failures.push("Secuencia de elisión incompleta: "+q.id);
}
for(const q of GENERALIZATION_ERROR_CASES){
 if(q.options.length!==4||new Set(q.options).size!==4||q.options.filter(x=>x===q.correctConnector).length!==1)failures.push("Revisión generalización sin clave única: "+q.id);
 if(q.flawed.length<44||q.explanation.length<40||q.correctSentence.length<30)failures.push("Revisión generalización superficial: "+q.id);
}
for(const q of GENERALIZATION_CHOICE_CASES){
 if(q.gap.split("___").length!==2||q.options.length!==4||new Set(q.options).size!==4||q.options.filter(x=>x===q.connector).length!==1)failures.push("Elección de síntesis inválida: "+q.id);
 if(q.explanation.length<40)failures.push("Explicación de síntesis insuficiente: "+q.id);
}
for(const q of GENERALIZATION_EDITOR_CASES){
 if(q.steps.length!==3||new Set(q.steps).size!==3||q.steps.some(x=>x.length<35)||q.explanation.length<40)failures.push("Secuencia de integración incompleta: "+q.id);
}
for(const [level,need] of [["principiante",30],["intermedio",50],["avanzado",70]] as const){
 for(const mode of ["clasificar","quiz","construir"] as const){
  const pool=readingPool(level,"Idea principal",mode);
  if(pool.length!==need)failures.push("Idea principal/"+mode+"/"+level+": "+pool.length+" en vez de "+need);
  if(new Set(pool.map(x=>x.id)).size!==pool.length)failures.push("IDs repetidos en Idea principal/"+mode+"/"+level);
 }
}
for(const q of MAIN_IDEA_CHOICE_CASES){
 if(q.passage.length<240||q.explanation.length<45)failures.push("Lectura o explicación demasiado corta: "+q.id);
 if(q.options.length!==4||new Set(q.options).size!==4||q.answer<0||q.answer>3)failures.push("Alternativas inválidas: "+q.id);
 if(q.options[q.answer].includes("sin excepciones")||q.options[q.answer].includes("causal exclusiva"))failures.push("Clave incongruente: "+q.id);
}
for(const q of MAIN_IDEA_DETECTIVE_CASES){
 if(q.passage.length<150||q.claims.length!==3)failures.push("Detective sin texto suficiente: "+q.id);
 if(new Set(q.claims.map(c=>c.tag)).size!==3||new Set(q.claims.map(c=>c.text)).size!==3)failures.push("Detective con afirmaciones repetidas: "+q.id);
}
for(const q of MAIN_IDEA_RECONSTRUCT_CASES){
 if(q.passage.length<150||q.order.parts.length!==3||new Set(q.order.parts).size!==3)failures.push("Reconstrucción inválida: "+q.id);
 if(q.order.explanation.length<45)failures.push("Reconstrucción sin justificación: "+q.id);
}
for(const [level,expected] of [["principiante",30],["intermedio",50],["avanzado",70]] as const)
 for(const mode of ["clasificar","quiz","construir"] as const){
  const pool=readingPool(level,"Inferencias",mode);
  if(pool.length!==expected)failures.push("Inferencias/"+mode+"/"+level+": "+pool.length+" en vez de "+expected);
  if(new Set(pool.map(x=>x.id)).size!==pool.length)failures.push("IDs repetidos en Inferencias/"+mode+"/"+level);
 }
for(const q of INFERENCE_DETECTIVE_CASES){
 if(q.passage.length<145||q.claims.length!==3)failures.push("Inferencia detective incompleta: "+q.id);
 if(new Set(q.claims.map(c=>c.tag)).size!==3||new Set(q.claims.map(c=>c.text)).size!==3)failures.push("Afirmaciones inferenciales repetidas: "+q.id);
}
for(const q of INFERENCE_CHOICE_CASES){
 if(q.passage.length<145||q.explanation.length<45||q.options.length!==4||new Set(q.options).size!==4||q.answer<0||q.answer>3)failures.push("Inferencia elección inválida: "+q.id);
}
for(const q of INFERENCE_RECONSTRUCT_CASES){
 if(q.passage.length<145||q.order.parts.length!==3||new Set(q.order.parts).size!==3||q.order.explanation.length<45)failures.push("Inferencia secuencia incompleta: "+q.id);
}
for(const [level,expected] of [["principiante",30],["intermedio",50],["avanzado",70]] as const)
 for(const mode of ["clasificar","quiz","construir"] as const){
  const pool=readingPool(level,"Lectura crítica",mode);
  if(pool.length!==expected)failures.push("Lectura crítica/"+mode+"/"+level+": "+pool.length+" en vez de "+expected);
  if(new Set(pool.map(x=>x.id)).size!==pool.length)failures.push("IDs repetidos en Lectura crítica/"+mode+"/"+level);
 }
for(const q of CRITICAL_DETECTIVE_CASES){
 if(q.passage.length<145||q.claims.length!==3||new Set(q.claims.map(x=>x.tag)).size!==3||new Set(q.claims.map(x=>x.text)).size!==3)failures.push("Lectura crítica detective incompleta: "+q.id);
}
for(const q of CRITICAL_CHOICE_CASES){
 if(q.passage.length<145||q.options.length!==4||new Set(q.options).size!==4||q.answer<0||q.answer>3||q.explanation.length<50)failures.push("Lectura crítica elección inválida: "+q.id);
}
for(const q of CRITICAL_RECONSTRUCT_CASES){
 if(q.passage.length<145||q.order.parts.length!==3||new Set(q.order.parts).size!==3||q.order.explanation.length<50)failures.push("Lectura crítica reconstrucción incompleta: "+q.id);
}
const criticalPassages=[...CRITICAL_DETECTIVE_CASES,...CRITICAL_CHOICE_CASES,...CRITICAL_RECONSTRUCT_CASES].map(q=>q.passage);
if(new Set(criticalPassages).size!==108)failures.push("Pasajes repetidos entre juegos de Lectura crítica");
const allInferencePassages=[...INFERENCE_DETECTIVE_CASES,...INFERENCE_CHOICE_CASES,...INFERENCE_RECONSTRUCT_CASES].map(q=>q.passage);
if(new Set(allInferencePassages).size!==108)failures.push("Lecturas de Inferencias repetidas entre modalidades");
const readingTexts=[...MAIN_IDEA_CHOICE_CASES,...MAIN_IDEA_DETECTIVE_CASES,...MAIN_IDEA_RECONSTRUCT_CASES].map(q=>q.passage);
if(new Set(readingTexts).size!==108)failures.push("Hay textos repetidos entre los juegos de Idea principal");
const newBlocks=[
 ["Vocabulario en contexto",VOCAB_DETECTIVE_CASES,VOCAB_CHOICE_CASES,VOCAB_RECONSTRUCT_CASES],
 ["Análisis de textos",ANALYSIS_DETECTIVE_CASES,ANALYSIS_CHOICE_CASES,ANALYSIS_RECONSTRUCT_CASES],
 ["Lectura comparada",COMPARISON_DETECTIVE_CASES,COMPARISON_CHOICE_CASES,COMPARISON_RECONSTRUCT_CASES]
] as const;
for(const [subtopic,detectives,choices,reconstructions] of newBlocks){
 const pools=[detectives,choices,reconstructions];
 const all=pools.flatMap(p=>p);
 if(all.length!==108)failures.push("Corrida de bloques: "+subtopic+" tiene "+all.length+" registros nuevos, no 108");
 if(new Set(all.map(x=>x.passage)).size!==108)failures.push("Corrida de bloques: pasajes repetidos en "+subtopic);
 if(new Set(all.map(x=>x.id)).size!==108)failures.push("Corrida de bloques: IDs repetidos en "+subtopic);
 for(const [level,expected] of [["principiante",30],["intermedio",50],["avanzado",70]] as const)
  for(const mode of ["clasificar","quiz","construir"] as const){
   const pool=readingPool(level,subtopic,mode);
   if(pool.length!==expected)failures.push(subtopic+"/"+mode+"/"+level+": esperado "+expected+", real "+pool.length);
  }
 for(const q of detectives)if(q.passage.length<145||q.claims.length!==3||new Set(q.claims.map(c=>c.tag)).size!==3||new Set(q.claims.map(c=>c.text)).size!==3)failures.push("Clasificación inválida: "+q.id);
 for(const q of choices)if(q.passage.length<145||q.options.length!==4||new Set(q.options).size!==4||q.answer<0||q.answer>3||q.explanation.length<45)failures.push("Selección inválida: "+q.id);
 for(const q of reconstructions)if(q.passage.length<145||q.order.parts.length!==3||new Set(q.order.parts).size!==3||q.order.explanation.length<45)failures.push("Reconstrucción inválida: "+q.id);
}
if(newBlocks.flatMap(([,a,b,c])=>[...a,...b,...c]).length!==324)failures.push("Corrida actual: cantidad distinta de 324");
for(const [level,expected] of [["principiante",30],["intermedio",50],["avanzado",70]] as const)
 for(const mode of ["clasificar","quiz","construir"] as const){
  const pool=readingPool(level,"Lenguaje figurado",mode);
  if(pool.length!==expected)failures.push("Lenguaje figurado/"+mode+"/"+level+": esperado "+expected+", real "+pool.length);
  if(new Set(pool.map(x=>x.id)).size!==pool.length)failures.push("IDs repetidos en Lenguaje figurado/"+mode+"/"+level);
 }
for(const q of FIGURATIVE_DETECTIVE_CASES){
 if(q.passage.length<145||q.claims.length!==3||new Set(q.claims.map(x=>x.tag)).size!==3||new Set(q.claims.map(x=>x.text)).size!==3)
  failures.push("Lenguaje figurado detective inválido: "+q.id);
}
for(const q of FIGURATIVE_CHOICE_CASES){
 if(q.passage.length<145||q.options.length!==4||new Set(q.options).size!==4||q.answer<0||q.answer>3||q.explanation.length<45)
  failures.push("Lenguaje figurado selección inválida: "+q.id);
}
for(const q of FIGURATIVE_RECONSTRUCT_CASES){
 if(q.passage.length<145||q.order.parts.length!==3||new Set(q.order.parts).size!==3||q.order.explanation.length<45)
  failures.push("Lenguaje figurado secuencia inválida: "+q.id);
}
const figurativePassages=[...FIGURATIVE_DETECTIVE_CASES,...FIGURATIVE_CHOICE_CASES,...FIGURATIVE_RECONSTRUCT_CASES].map(q=>q.passage);
if(figurativePassages.length!==108||new Set(figurativePassages).size!==108)
 failures.push("Lenguaje figurado: deben existir 108 pasajes distintos entre modalidades");
for(const level of levels)for(const mode of ["clasificar","quiz","construir"] as const)
 if(readingPool(level,"Lenguaje figurado",mode).length!==target[level])
  failures.push("Lenguaje figurado: ampliación M2 incompleta");
console.log("ACADEMIA PHUMA PLAY · AUDITORÍA DE COBERTURA (contenidos, no validación psicométrica)");
console.log("Meta por juego/subtema:",JSON.stringify(CONTENT_TARGET));
console.log("Primer lote por juego/subtema:",JSON.stringify(CONTENT_STAGE_ONE));
console.log("Casillas de contenido esperadas:",totals.slots);
console.log("Registros por modalidad:",totals.available,"/",totals.target);
console.log("Casillas que alcanzan el núcleo:",totals.stageOneComplete,"/",totals.slots);
console.log("Casillas que alcanzan la meta final:",totals.complete,"/",totals.slots);
console.table(levels.map(level=>({
 nivel:level,cazador:writingPool(level,"Conectores","clasificar").length,conectoresQuiz:writingPool(level,"Conectores","quiz").length,editor:writingPool(level,"Conectores","construir").length,correccionCazador:writingPool(level,"Corrección","clasificar").length,correccionQuiz:writingPool(level,"Corrección","quiz").length,correccionEditor:writingPool(level,"Corrección","construir").length,organizacionCazador:writingPool(level,"Organización textual","clasificar").length,organizacionQuiz:writingPool(level,"Organización textual","quiz").length,organizacionEditor:writingPool(level,"Organización textual","construir").length,elisionCazador:writingPool(level,"Elisión y adición","clasificar").length,elisionQuiz:writingPool(level,"Elisión y adición","quiz").length,elisionEditor:writingPool(level,"Elisión y adición","construir").length,generalizacionCazador:writingPool(level,"Generalización e integración","clasificar").length,generalizacionQuiz:writingPool(level,"Generalización e integración","quiz").length,generalizacionEditor:writingPool(level,"Generalización e integración","construir").length,
 primerObjetivo:target[level],objetivoFinal:CONTENT_TARGET[level]
})));
console.log("Registros base Redacción:",WRITING_BANK.length,"Conector correcto:",CONNECTOR_CASES.length,"Cazador de errores:",CONNECTOR_ERROR_CASES.length,"Editor experto:",CONNECTOR_EDITOR_CASES.length,"Corrección Cazador:",CORRECTION_ERROR_CASES.length,"Corrección Quiz:",CORRECTION_CHOICE_CASES.length,"Corrección Editor:",CORRECTION_EDITOR_CASES.length,"Organización Cazador:",ORGANIZATION_ERROR_CASES.length,"Organización Quiz:",ORGANIZATION_CHOICE_CASES.length,"Organización Editor:",ORGANIZATION_EDITOR_CASES.length,"Elisión Cazador:",ELISION_ERROR_CASES.length,"Elisión Quiz:",ELISION_CHOICE_CASES.length,"Elisión Editor:",ELISION_EDITOR_CASES.length,"Generalización Cazador:",GENERALIZATION_ERROR_CASES.length,"Generalización Quiz:",GENERALIZATION_CHOICE_CASES.length,"Generalización Editor:",GENERALIZATION_EDITOR_CASES.length,"Lectura:",READING_BANK.length);
console.log("Advertencia: los juegos anteriores reutilizan contextos, y los contenidos nuevos siguen sujetos a revisión editorial.");
console.log("Los módulos no implementados se mantienen en cero; los registros no representan dificultad oficial PHUMA.");
if(failures.length){console.error(failures.join("\n"));process.exitCode=1}
