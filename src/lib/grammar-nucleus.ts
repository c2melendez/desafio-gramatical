import type { BuildQ, Sentence } from "./grammar";

// Nuevos casos originales pendientes de revisión docente.
export const GRAMMAR_ADVANCED_SENTENCES: (Sentence & {reviewStatus: "editorial-draft"})[] = [
 {reviewStatus:"editorial-draft",id:"nucleo-clas-a1",tokens:[{t:"Quienes",c:"pronombre",sub:"relativo",exp:"«Quienes» introduce una relativa y se refiere a personas."},{t:"estudiaron",c:"verbo",exp:"Forma conjugada de estudiar."},{t:"llegaron",c:"verbo",exp:"Forma conjugada de llegar; concuerda con el sujeto plural."},{t:"temprano",c:"adverbio",exp:"Modifica a «llegaron» e indica tiempo."},{t:".",c:null}]},
 {reviewStatus:"editorial-draft",id:"nucleo-clas-a2",tokens:[{t:"Aquella",c:"determinante",sub:"demostrativo",exp:"Acompaña y señala a «propuesta»."},{t:"propuesta",c:"sustantivo",exp:"Nombra la idea presentada; es núcleo del grupo nominal."},{t:"parece",c:"verbo",exp:"Forma de parecer que enlaza el sujeto con el atributo."},{t:"poco",c:"adverbio",exp:"Cuantifica el adjetivo «clara» y no concuerda con «propuesta»."},{t:"clara",c:"adjetivo",exp:"Expresa una propiedad de la propuesta."},{t:".",c:null}]},
 {reviewStatus:"editorial-draft",id:"nucleo-clas-a3",tokens:[{t:"El",c:"determinante",exp:"Artículo que acompaña a «informe»."},{t:"informe",c:"sustantivo",exp:"Núcleo nominal del sujeto."},{t:"que",c:"pronombre",sub:"relativo",exp:"Retoma «informe» y cumple función de complemento directo de «revisaron»."},{t:"revisaron",c:"verbo",exp:"Forma conjugada de revisar."},{t:"resultó",c:"verbo",exp:"Forma conjugada de resultar."},{t:"útil",c:"adjetivo",exp:"Atributo que expresa una propiedad del informe."},{t:".",c:null}]},
];

type Seed = [string, string, string[], string[], string];
// Cada pista pide una secuencia concreta; los distractores no forman parte de la solución.
const intermediate: Seed[] = [
 ["El equipo revisa cuidadosamente","Forma una oración sobre la revisión cuidadosa del equipo.",["determinante","sustantivo","verbo","adverbio"],["revisan:verbo","cuidadoso:adjetivo"],"«El equipo» es singular, por eso concuerda con «revisa»; «cuidadosamente» modifica al verbo."],
 ["Las alumnas leen atentamente","Describe a las alumnas leyendo con atención.",["determinante","sustantivo","verbo","adverbio"],["lee:verbo","atentas:adjetivo"],"El sujeto plural «Las alumnas» exige «leen»; el adverbio indica cómo leen."],
 ["Una propuesta parece viable","Expresa que una propuesta puede llevarse a cabo.",["determinante","sustantivo","verbo","adjetivo"],["parecen:verbo","viables:adjetivo"],"«Parece» concuerda con el sujeto singular y «viable» caracteriza a la propuesta."],
 ["Ellos escriben con claridad","Indica que ellos escriben de manera clara.",["pronombre","verbo","preposicion","sustantivo"],["escribe:verbo","claro:adjetivo"],"«Ellos» concuerda con «escriben»; «con claridad» expresa el modo."],
 ["La docente explicó brevemente","Indica que la docente dio una explicación breve.",["determinante","sustantivo","verbo","adverbio"],["explicaron:verbo","breve:adjetivo"],"«Explicó» concuerda con «la docente» y el adverbio modifica el verbo."],
];
const advanced: Seed[] = [
 ["Aquellas investigadoras llegaron bastante temprano","Indica que esas investigadoras llegaron con notable antelación.",["determinante","sustantivo","verbo","adverbio","adverbio"],["llegó:verbo","temprana:adjetivo"],"El sujeto plural concuerda con «llegaron»; «bastante» intensifica al adverbio «temprano»."],
 ["El informe resultó poco claro","Indica que el informe no resultó suficientemente claro.",["determinante","sustantivo","verbo","adverbio","adjetivo"],["resultaron:verbo","claros:adjetivo"],"«Poco» modifica al adjetivo «claro»; ambos se interpretan respecto del informe singular."],
 ["La propuesta parece muy razonable","Expresa que la propuesta presenta un alto grado de razonabilidad.",["determinante","sustantivo","verbo","adverbio","adjetivo"],["parecen:verbo","razonables:adjetivo"],"«Muy» intensifica el atributo «razonable»; el verbo concuerda con «propuesta»."],
 ["Esos argumentos son menos convincentes","Compara argumentos que tienen menor capacidad de convencer.",["determinante","sustantivo","verbo","adverbio","adjetivo"],["es:verbo","convincente:adjetivo"],"El sujeto plural exige «son» y concuerda con «convincentes»; «menos» expresa grado."],
 ["La explicación fue suficientemente precisa","Señala que la explicación alcanzó la precisión necesaria.",["determinante","sustantivo","verbo","adverbio","adjetivo"],["fueron:verbo","precisos:adjetivo"],"El adverbio modifica a «precisa», que concuerda con el sujeto femenino singular."],
 ["Los datos parecían poco fiables","Indica que los datos inspiraban poca confianza.",["determinante","sustantivo","verbo","adverbio","adjetivo"],["parecía:verbo","fiable:adjetivo"],"«Parecían» y «fiables» concuerdan con «datos»; «poco» modifica al adjetivo."],
 ["La respuesta quedó demasiado extensa","Señala que la respuesta resultó excesivamente larga.",["determinante","sustantivo","verbo","adverbio","adjetivo"],["quedaron:verbo","extenso:adjetivo"],"«Demasiado» intensifica «extensa»; el verbo concuerda con el sujeto singular."],
 ["Algunos resultados fueron bastante inesperados","Expresa que ciertos resultados sorprendieron en grado considerable.",["determinante","sustantivo","verbo","adverbio","adjetivo"],["fue:verbo","inesperado:adjetivo"],"El sujeto plural concuerda con «fueron» e «inesperados»; «bastante» indica grado."],
 ["Nuestra conclusión sigue siendo válida","Indica que la conclusión mantiene su validez.",["determinante","sustantivo","verbo","verbo","adjetivo"],["siguen:verbo","válidos:adjetivo"],"«Sigue siendo» expresa continuidad y «válida» concuerda con «conclusión»."],
 ["Las estudiantes trabajan siempre juntas","Indica que las estudiantes trabajan juntas en todo momento.",["determinante","sustantivo","verbo","adverbio","adjetivo"],["trabaja:verbo","junto:adjetivo"],"«Trabajan» concuerda con el sujeto plural; «juntas» concuerda con «estudiantes» y «siempre» indica frecuencia."],
];
function build(seed: Seed, id: string): BuildQ & {reviewStatus: "editorial-draft"} {
 const [solution,hint,pattern,distractors,exp]=seed;
 const words=solution.split(" ");
 return {id,reviewStatus:"editorial-draft",pattern:pattern as BuildQ["pattern"],hint,tiles:[...words.map((w,i)=>({w,c:pattern[i] as BuildQ["pattern"][number]})),...distractors.map(d=>{const [w,c]=d.split(":");return {w,c:c as BuildQ["pattern"][number]};})],solutions:[solution],exp};
}
export const GRAMMAR_NUCLEUS_BUILD = {principiante: [] as BuildQ[], intermedio:intermediate.map((x,i)=>build(x,`nucleo-build-i${i+1}`)), avanzado:advanced.map((x,i)=>build(x,`nucleo-build-a${i+1}`))};
