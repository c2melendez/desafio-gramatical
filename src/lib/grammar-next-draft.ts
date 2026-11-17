import {GRAMMAR_EXTRA_405} from "./grammar-extra-405";
import {GRAMMAR_EXTRA_BLOCK} from "./grammar-extra-block";
import type {Level} from "./grammar";

/** Borrador editorial; no se cuenta como contenido jugable antes de integrar la mecánica. */
export type GrammarDraft = {
 id:string; subtopic:"Sinónimos y antónimos"|"Cohesión y coherencia"|"Morfosintaxis";
 level:Level; passage:string; question:string; options:[string,string,string,string];
 answer:0|1|2|3; explanation:string; reviewStatus:"editorial-draft";
};
type Seed = [string,Level,string,string,[string,string,string,string],0|1|2|3,string];
const synonym:Seed[]=[
 ["sa-p1","principiante","El sendero era estrecho y apenas permitía pasar a una persona.","¿Qué palabra puede sustituir «estrecho» sin cambiar el sentido?",["angosto","amplio","lejano","rugoso"],0,"«Angosto» expresa poca anchura, igual que «estrecho» en este contexto."],
 ["sa-p2","principiante","El grupo inició temprano la limpieza del parque.","¿Qué palabra expresa lo contrario de «inició»?",["comenzó","terminó","organizó","adelantó"],1,"«Terminó» indica el fin de la actividad; «inició» indica su comienzo."],
 ["sa-i1","intermedio","Aunque la evidencia era escasa, el equipo presentó una conclusión provisional y prometió revisar nuevos datos.","En ese contexto, ¿cuál es el sentido más cercano de «provisional»?",["definitiva","temporal","imparcial","detallada"],1,"La conclusión puede cambiar cuando se incorporen datos; por eso es temporal y no definitiva."],
 ["sa-i2","intermedio","La alcaldía comunicó que la medida busca mitigar los efectos de las inundaciones, aunque no eliminará todo riesgo.","¿Qué verbo sustituye mejor «mitigar»?",["agravar","registrar","atenuar","ocultar"],2,"«Atenuar» significa reducir la intensidad de los efectos, sin afirmar que desaparezcan."],
 ["sa-a1","avanzado","El informe califica la propuesta de viable, siempre que se obtenga financiamiento y se cumpla el calendario.","¿Qué reformulación expresa mejor lo contrario de «viable» bajo esas condiciones?",["Que puede ejecutarse","Que no puede llevarse a cabo","Que será aceptada sin cambios","Que es necesariamente económica"],1,"«No puede llevarse a cabo» niega la posibilidad de ejecución, que es el sentido de «viable»."],
 ["sa-a2","avanzado","La investigadora fue cautelosa al interpretar la correlación: evitó afirmar que una variable causaba la otra.","En este pasaje, ¿qué expresión se opone mejor a «cautelosa»?",["prudente ante los datos","precipitada en sus conclusiones","metódica en el registro","detallada en la explicación"],1,"La cautela consiste en evitar afirmaciones no justificadas; precipitarse en la conclusión es lo opuesto aquí."],
];
const cohesion:Seed[]=[
 ["cc-p1","principiante","Ana terminó su tarea. Después, ___ guardó en su mochila.","¿Qué palabra recupera «su tarea»?",["la","le","los","les"],0,"«La» retoma el sustantivo femenino singular «tarea»."],
 ["cc-p2","principiante","El cielo se oscureció; ___, comenzó a llover.","¿Qué expresión ordena los hechos en el tiempo?",["después","sin embargo","en cambio","por ejemplo"],0,"«Después» presenta la lluvia como un hecho posterior al oscurecimiento."],
 ["cc-i1","intermedio","El equipo recogió varias muestras. No obstante, una se contaminó durante el traslado. ___, deberá repetir esa medición.","¿Qué conector completa mejor la relación?",["Por ello","Por ejemplo","En cambio","A pesar de ello"],0,"La repetición se presenta como consecuencia de la contaminación; «por ello» expresa esa relación."],
 ["cc-i2","intermedio","La biblioteca amplió su horario durante los exámenes. La medida permitió que más estudiantes consultaran libros por la tarde.","¿A qué se refiere «la medida»?",["A los exámenes","A la ampliación del horario","A la consulta de libros","A los estudiantes"],1,"«La medida» retoma la decisión de ampliar el horario, no uno de sus resultados."],
 ["cc-a1","avanzado","La comunidad solicitó reparar el puente. El municipio aprobó el presupuesto, pero aún no ha contratado la obra. Por eso, ___ sigue pendiente.","¿Qué expresión conserva con mayor precisión la continuidad del párrafo?",["la reparación del puente","la solicitud del presupuesto","la aprobación del municipio","la comunidad solicitante"],0,"Lo pendiente es ejecutar la reparación; la solicitud y la aprobación del presupuesto ya ocurrieron."],
 ["cc-a2","avanzado","El estudio encontró una asociación entre sueño y rendimiento. Sin embargo, no controló todos los factores que podían influir en ambos resultados.","¿Cuál continuación mantiene la coherencia con esa limitación?",["Por tanto, la asociación demuestra una causa única.","En consecuencia, el resultado debe interpretarse con cautela.","Por ejemplo, ningún participante durmió durante el estudio.","En cambio, se controlaron todos los factores posibles."],1,"La falta de control limita lo que puede concluirse; interpretar con cautela no convierte la asociación en causalidad."],
];
const morph:Seed[]=[
 ["ms-p1","principiante","Las niñas ___ en la biblioteca cada tarde.","¿Qué forma completa la oración con concordancia?",["estudia","estudian","estudiamos","estudio"],1,"El sujeto «Las niñas» está en tercera persona plural y concuerda con «estudian»."],
 ["ms-p2","principiante","El cuaderno y el lápiz están sobre la mesa.","¿Cuál es el núcleo verbal de la oración?",["cuaderno","lápiz","están","mesa"],2,"«Están» es la forma conjugada que expresa el estado o ubicación del sujeto."],
 ["ms-i1","intermedio","La colección de fotografías antiguas ___ en el archivo municipal.","¿Qué forma verbal concuerda con el núcleo del sujeto?",["permanecen","permanezco","permanece","permanecemos"],2,"El núcleo del sujeto es «colección», singular; «de fotografías antiguas» es su complemento."],
 ["ms-i2","intermedio","El equipo revisó los datos que envió la comunidad.","¿Qué grupo funciona como complemento directo de «revisó»?",["El equipo","los datos que envió la comunidad","la comunidad","revisó"],1,"El grupo completo «los datos que envió la comunidad» expresa lo revisado; la subordinada precisa cuáles datos."],
 ["ms-a1","avanzado","A la coordinadora le entregaron los informes los delegados.","¿Cuál es el sujeto de «entregaron»?",["A la coordinadora","le","los informes","los delegados"],3,"«Los delegados» concuerda en plural con el verbo y designa a quienes entregaron los informes; aparece después del verbo."],
 ["ms-a2","avanzado","La propuesta que presentaron las estudiantes recibió apoyo.","En la subordinada «que presentaron las estudiantes», ¿qué función cumple «que»?",["Sujeto de «presentaron»","Complemento directo de «presentaron»","Verbo principal","Complemento de «recibió»"],1,"«Que» retoma «la propuesta» y representa lo presentado; el sujeto de «presentaron» es «las estudiantes»."],
];
function create(subtopic:GrammarDraft["subtopic"],seeds:Seed[]):GrammarDraft[]{return seeds.map(([id,level,passage,question,options,answer,explanation])=>({id,subtopic,level,passage,question,options,answer,explanation,reviewStatus:"editorial-draft"}));}
export const GRAMMAR_NEXT_DRAFT:GrammarDraft[]=[...create("Sinónimos y antónimos",synonym),...create("Cohesión y coherencia",cohesion),...create("Morfosintaxis",morph),...GRAMMAR_EXTRA_BLOCK,...GRAMMAR_EXTRA_405];

export const GRAMMAR_PILOT_SUBTOPICS = ["Sinónimos y antónimos", "Cohesión y coherencia", "Morfosintaxis"] as const;
export function grammarPilotPool(subtopic:string, level:Level):GrammarDraft[]{return GRAMMAR_NEXT_DRAFT.filter(q=>q.subtopic===subtopic&&q.level===level);}
