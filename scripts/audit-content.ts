import {coverageRows,coverageTotals,CONTENT_TARGET,CONTENT_STAGE_ONE} from "../src/lib/coverage";
import {CONNECTOR_CASES} from "../src/lib/connector-cases";
import {WRITING_BANK,writingPool} from "../src/lib/writing";
import {READING_BANK} from "../src/lib/reading";
const levels=["principiante","intermedio","avanzado"] as const;
const target={principiante:10,intermedio:15,avanzado:20};
const rows=coverageRows(),totals=coverageTotals();
const failures:string[]=[];
for(const level of levels){
 const pool=writingPool(level,"Conectores","quiz");
 if(pool.length!==target[level])failures.push(`Conectores/quiz/${level}: ${pool.length} en vez de ${target[level]}`);
 const ids=new Set(pool.map(x=>x.id));
 if(ids.size!==pool.length)failures.push("IDs de conectores repetidos: "+level);
}
for(const q of CONNECTOR_CASES){
 if(q.options.length!==4||new Set(q.options).size!==4)failures.push("Opciones inválidas: "+q.id);
 if(q.options.filter(x=>x===q.connector).length!==1)failures.push("Clave incorrecta: "+q.id);
 if(q.explanation.length<40)failures.push("Explicación insuficiente: "+q.id);
 if(!q.gap.includes("___"))failures.push("Falta espacio para conector: "+q.id);
}
console.log("ACADEMIA PHUMA PLAY · AUDITORÍA DE COBERTURA (contenidos, no validación psicométrica)");
console.log("Meta por juego/subtema:",JSON.stringify(CONTENT_TARGET));
console.log("Primer lote por juego/subtema:",JSON.stringify(CONTENT_STAGE_ONE));
console.log("Casillas de contenido esperadas:",totals.slots);
console.log("Registros por modalidad:",totals.available,"/",totals.target);
console.log("Casillas que alcanzan el núcleo:",totals.stageOneComplete,"/",totals.slots);
console.log("Casillas que alcanzan la meta final:",totals.complete,"/",totals.slots);
console.table(levels.map(level=>({
 nivel:level,conectoresQuiz:writingPool(level,"Conectores","quiz").length,
 primerObjetivo:target[level],objetivoFinal:CONTENT_TARGET[level]
})));
console.log("Registros base Redacción:",WRITING_BANK.length,"Nuevos casos de conector:",CONNECTOR_CASES.length,"Lectura:",READING_BANK.length);
console.log("Advertencia: los juegos anteriores reutilizan contextos, y los contenidos nuevos siguen sujetos a revisión editorial.");
console.log("Los módulos no implementados se mantienen en cero; los registros no representan dificultad oficial PHUMA.");
if(failures.length){console.error(failures.join("\n"));process.exitCode=1}
