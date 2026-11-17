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
const levels=["principiante","intermedio","avanzado"] as const;
const target={principiante:10,intermedio:15,avanzado:20};
const rows=coverageRows(),totals=coverageTotals();
const failures:string[]=[];
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
for(const [level,need] of [["principiante",10],["intermedio",15],["avanzado",20]] as const){
 const pool=readingPool(level,"Idea principal","quiz");
 if(pool.length!==need)failures.push("Idea principal/quiz/"+level+": "+pool.length+" en vez de "+need);
 if(new Set(pool.map(x=>x.id)).size!==pool.length)failures.push("IDs repetidos en Idea principal/quiz/"+level);
}
for(const q of MAIN_IDEA_CHOICE_CASES){
 if(q.passage.length<240||q.explanation.length<45)failures.push("Lectura o explicación demasiado corta: "+q.id);
 if(q.options.length!==4||new Set(q.options).size!==4||q.answer<0||q.answer>3)failures.push("Alternativas inválidas: "+q.id);
 if(q.options[q.answer].includes("sin excepciones")||q.options[q.answer].includes("causal exclusiva"))failures.push("Clave incongruente: "+q.id);
}
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
