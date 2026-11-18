import type {AreaId} from "./phuma-catalog";
import type {Level,Mode} from "./grammar";

/** La ruta de regreso conserva la selección pedagógica completa, incluso al recargar. */
export type StudySelection={area:AreaId;tema:string;subtema:string;modo:Mode;nivel:Level};
export const DEFAULT_SELECTION:StudySelection={
 area:"espanol",tema:"Gramática y semántica",subtema:"Categorías gramaticales",
 modo:"clasificar",nivel:"principiante"
};
export const studyReturn=(tema:string,subtema:string,modo:Mode,nivel:Level,area:AreaId="espanol"):StudySelection=>
 ({area,tema,subtema,modo,nivel});

const descriptions:Record<string,string>={
 "Idea principal":"Identificar la afirmación que resume el sentido global de un texto, distinguiéndola de ejemplos y detalles secundarios.",
 "Inferencias":"Deducir conclusiones respaldadas por indicios del texto sin añadir datos que el autor no proporciona.",
 "Lectura crítica":"Evaluar evidencia, supuestos, sesgos y alcance de las afirmaciones antes de aceptarlas como conclusiones.",
 "Vocabulario en contexto":"Inferir el sentido de una palabra por sus relaciones con las ideas vecinas y el propósito del enunciado.",
 "Análisis de textos":"Reconocer estructura, intención comunicativa y relación entre afirmaciones, argumentos y ejemplos.",
 "Lectura comparada":"Contrastar varias fuentes, identificar acuerdos o diferencias y evitar atribuir una idea a la fuente equivocada.",
 "Lenguaje figurado":"Interpretar expresiones no literales según sus imágenes, contexto y efecto expresivo.",
 "Categorías gramaticales":"Reconocer la función de sustantivos, adjetivos, verbos, determinantes y otras clases de palabras dentro de una oración.",
 "Sinónimos y antónimos":"Distinguir palabras de significado semejante u opuesto, respetando el contexto y sus matices.",
 "Cohesión y coherencia":"Identificar recursos que conectan oraciones y comprobar que el texto mantenga un hilo lógico de sentido.",
 "Morfosintaxis":"Analizar cómo la forma y la función de las palabras determinan las relaciones y concordancias de una oración.",
 "Homonimia y polisemia":"Distinguir coincidencias de forma entre palabras y los distintos sentidos de una misma palabra según el contexto.",
 "Hiperonimia":"Reconocer relaciones entre términos generales y específicos sin confundir el conjunto con sus elementos.",
 "Adecuación y referente":"Identificar a quién o a qué remiten las expresiones y adaptar el mensaje a la situación comunicativa.",
 "Corrección":"Aplicar reglas de ortografía, concordancia, puntuación y precisión para justificar una corrección textual.",
 "Conectores":"Elegir enlaces discursivos por su relación lógica: causa, consecuencia, contraste, adición u orden.",
 "Organización textual":"Ordenar ideas en una secuencia coherente: presentación, desarrollo y conclusión.",
 "Elisión y adición":"Decidir qué información debe suprimirse o añadirse para ganar claridad sin alterar la idea central.",
 "Generalización e integración":"Integrar datos de diversas fuentes y formular conclusiones proporcionadas a las evidencias disponibles.",
 "Figuras retóricas":"Reconocer metáfora, comparación y otros recursos expresivos explicando su efecto en el texto.",
 "Géneros literarios":"Distinguir narrativa, lírica, drama y otros géneros a partir de rasgos formales y comunicativos."
};
const topicDescriptions:Record<string,string>={
 "Aritmética":"Reconocer cantidades y relaciones numéricas; aplicar operaciones y justificar cálculos.",
 "Álgebra":"Representar patrones y relaciones con símbolos y resolver problemas mediante equivalencias.",
 "Geometría":"Relacionar propiedades de figuras, medidas y razonamiento espacial.",
 "Estadística y probabilidad":"Interpretar datos y estimar posibilidades utilizando información cuantitativa.",
 "Biología":"Explicar estructuras, funciones e interacciones de los seres vivos.",
 "Química":"Relacionar propiedades de la materia y transformaciones con evidencia experimental.",
 "Física":"Describir fenómenos mediante magnitudes, leyes y modelos.",
 "Historia de Honduras":"Interpretar procesos históricos hondureños, causas, actores y consecuencias.",
 "Historia universal":"Comparar sociedades y transformaciones históricas mediante sus contextos.",
 "Geografía":"Analizar el espacio, los territorios y las relaciones entre sociedad y ambiente.",
 "Civismo":"Aplicar derechos, deberes y principios de convivencia ciudadana.",
 "Ciencias sociales":"Comprender hechos sociales a partir de conceptos y relaciones entre instituciones.",
 "Toma de decisiones":"Evaluar alternativas, consecuencias y criterios para tomar decisiones justificadas.",
 "Convivencia":"Identificar conductas de respeto, cooperación y resolución dialogada de conflictos.",
 "Autogestión":"Aplicar estrategias de responsabilidad y regulación personal a situaciones cotidianas."
};
export function learningDescription(area:AreaId,topic:string,subtopic:string):string{
 return descriptions[subtopic]??`${topicDescriptions[topic]??"Aplicar conceptos y procedimientos propios de esta área."} En «${subtopic}» se evaluará la capacidad de usar esos criterios en situaciones concretas.`;
}
/** Breve criterio general; no sustituye la justificación específica del ítem. */
export function conceptRule(subtopic:string):string{
 return descriptions[subtopic]??topicDescriptions[subtopic]??"La respuesta debe justificarse utilizando los datos del enunciado y el concepto evaluado.";
}
