import {coverageRows,coverageTotals,CONTENT_TARGET,CONTENT_STAGE_ONE} from "../src/lib/coverage";
import {CONNECTOR_CASES} from "../src/lib/connector-cases";
import {CONNECTOR_ERROR_CASES} from "../src/lib/connector-error-cases";
import {CONNECTOR_EDITOR_CASES} from "../src/lib/connector-editor-cases";
import {WRITING_BANK,writingPool} from "../src/lib/writing";
import {READING_BANK} from "../src/lib/reading";
const levels=["principiante","intermedio","avanzado"] as const;
const target={principiante:10,intermedio:15,avanzado:20};
const rows=coverageRows(),totals=coverageTotals();
const failures:string[]=[];
for(const level of levels){
 for(const mode of ["clasificar","quiz","construir"] as const){
  const pool=writingPool(level,"Conectores",mode);
  if(pool.length!==target[level])failures.push(`Conectores/${mode}/${level}: ${pool.length} en vez de ${target[level]}`);
  if(new Set(pool.map(x=>x.id)).size!==pool.length)failures.push("IDs de conectores repetidos: "+level+"/"+mode);
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
console.log("ACADEMIA PHUMA PLAY · AUDITORÍA DE COBERTURA (contenidos, no validación psicométrica)");
console.log("Meta por juego/subtema:",JSON.stringify(CONTENT_TARGET));
console.log("Primer lote por juego/subtema:",JSON.stringify(CONTENT_STAGE_ONE));
console.log("Casillas de contenido esperadas:",totals.slots);
console.log("Registros por modalidad:",totals.available,"/",totals.target);
console.log("Casillas que alcanzan el núcleo:",totals.stageOneComplete,"/",totals.slots);
console.log("Casillas que alcanzan la meta final:",totals.complete,"/",totals.slots);
console.table(levels.map(level=>({
 nivel:level,cazador:writingPool(level,"Conectores","clasificar").length,conectoresQuiz:writingPool(level,"Conectores","quiz").length,editor:writingPool(level,"Conectores","construir").length,
 primerObjetivo:target[level],objetivoFinal:CONTENT_TARGET[level]
})));
console.log("Registros base Redacción:",WRITING_BANK.length,"Conector correcto:",CONNECTOR_CASES.length,"Cazador de errores:",CONNECTOR_ERROR_CASES.length,"Editor experto:",CONNECTOR_EDITOR_CASES.length,"Lectura:",READING_BANK.length);
console.log("Advertencia: los juegos anteriores reutilizan contextos, y los contenidos nuevos siguen sujetos a revisión editorial.");
console.log("Los módulos no implementados se mantienen en cero; los registros no representan dificultad oficial PHUMA.");
if(failures.length){console.error(failures.join("\n"));process.exitCode=1}
