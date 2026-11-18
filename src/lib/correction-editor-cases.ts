import type {Level} from "./grammar";
export type CorrectionEditorCase={
 id:string;level:Level;subtopic:"Corrección";steps:[string,string,string];
 explanation:string;hint:string;reviewStatus:"editorial-draft";
};
/** Secuencias originales sobre procedimientos de revisión textual.
 * Las fichas tienen contextos y problemas diferentes de los otros dos juegos.
 */
export const CORRECTION_EDITOR_CASES:CorrectionEditorCase[]=[
  {
    "id": "writing-correction-editor-v1-principiante-0",
    "level": "principiante",
    "subtopic": "Corrección",
    "steps": [
    "Antes de entregar la tarea, Marta leyó las instrucciones completas.",
    "Revisó si había escrito correctamente su nombre.",
    "Entregó la hoja corregida a la maestra."
    ],
    "explanation": "La revisión del encabezado y la entrega ocurren después de leer las instrucciones.",
    "hint": "Reconstruye una revisión textual: diagnostica, comprueba y corrige.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-editor-v1-principiante-1",
    "level": "principiante",
    "subtopic": "Corrección",
    "steps": [
    "Al escribir el aviso, el grupo eligió una idea principal.",
    "Redactó una oración breve y comprensible.",
    "Al terminar, corrigió las palabras con faltas de ortografía."
    ],
    "explanation": "El aviso pasa de planificación a redacción y corrección ortográfica.",
    "hint": "Reconstruye una revisión textual: diagnostica, comprueba y corrige.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-editor-v1-principiante-2",
    "level": "principiante",
    "subtopic": "Corrección",
    "steps": [
    "Ana escribió una carta de agradecimiento.",
    "Comprobó los signos de puntuación.",
    "La entregó a la persona destinataria."
    ],
    "explanation": "La revisión de los signos precede a la entrega de la carta.",
    "hint": "Reconstruye una revisión textual: diagnostica, comprueba y corrige.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-editor-v1-principiante-3",
    "level": "principiante",
    "subtopic": "Corrección",
    "steps": [
    "El alumno preparó una lista de palabras nuevas.",
    "Consultó en el diccionario sus formas correctas.",
    "Utilizó las palabras revisadas en oraciones propias."
    ],
    "explanation": "Consultar el diccionario permite emplear las palabras con mayor seguridad.",
    "hint": "Reconstruye una revisión textual: diagnostica, comprueba y corrige.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-editor-v1-principiante-4",
    "level": "principiante",
    "subtopic": "Corrección",
    "steps": [
    "El equipo elaboró un borrador de su exposición.",
    "Buscó verbos que no concordaban con los sujetos.",
    "Corrigió esos verbos antes de presentar el trabajo."
    ],
    "explanation": "La corrección sigue a la identificación del problema de concordancia.",
    "hint": "Reconstruye una revisión textual: diagnostica, comprueba y corrige.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-editor-v1-principiante-5",
    "level": "principiante",
    "subtopic": "Corrección",
    "steps": [
    "La docente explicó cómo usar las tildes en preguntas.",
    "Mostró ejemplos de «qué» y «cómo».",
    "Los estudiantes practicaron con preguntas nuevas."
    ],
    "explanation": "La explicación antecede a los ejemplos y a la práctica.",
    "hint": "Reconstruye una revisión textual: diagnostica, comprueba y corrige.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-editor-v1-principiante-6",
    "level": "principiante",
    "subtopic": "Corrección",
    "steps": [
    "Durante la clase, Julia escribió un párrafo sobre su barrio.",
    "Eliminó una repetición innecesaria de palabras.",
    "Leyó el texto corregido en voz alta."
    ],
    "explanation": "Se parte de un borrador, se elimina una redundancia y se comprueba la fluidez.",
    "hint": "Reconstruye una revisión textual: diagnostica, comprueba y corrige.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-editor-v1-intermedio-7",
    "level": "intermedio",
    "subtopic": "Corrección",
    "steps": [
    "Al comenzar, el equipo identificó errores de concordancia en el informe.",
    "Verificó el núcleo del sujeto de cada oración.",
    "Modificó los verbos para mantener la concordancia."
    ],
    "explanation": "La revisión pasa de localizar los errores a establecer la regla y aplicarla.",
    "hint": "Reconstruye una revisión textual: diagnostica, comprueba y corrige.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-editor-v1-intermedio-8",
    "level": "intermedio",
    "subtopic": "Corrección",
    "steps": [
    "Los revisores encontraron una cita sin referencia bibliográfica.",
    "Identificaron el documento de donde provenía la cita.",
    "Añadieron una referencia verificable a ese documento."
    ],
    "explanation": "Una cita sin fuente requiere rastrear su origen antes de incorporar la referencia.",
    "hint": "Reconstruye una revisión textual: diagnostica, comprueba y corrige.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-editor-v1-intermedio-9",
    "level": "intermedio",
    "subtopic": "Corrección",
    "steps": [
    "El grupo encontró expresiones ambiguas en el folleto.",
    "Precisó los antecedentes de los pronombres problemáticos.",
    "Comprobó que cada oración tuviera un referente claro."
    ],
    "explanation": "La ambigüedad de referencias se resuelve identificando antecedentes y reescribiendo.",
    "hint": "Reconstruye una revisión textual: diagnostica, comprueba y corrige.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-editor-v1-intermedio-10",
    "level": "intermedio",
    "subtopic": "Corrección",
    "steps": [
    "El informe presentaba cambios injustificados de tiempo verbal.",
    "Los autores delimitaron primero la secuencia temporal de los hechos.",
    "Ajustaron los verbos a esa secuencia y revisaron el resultado."
    ],
    "explanation": "Corregir tiempos verbales exige reconocer primero la cronología real.",
    "hint": "Reconstruye una revisión textual: diagnostica, comprueba y corrige.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-editor-v1-intermedio-11",
    "level": "intermedio",
    "subtopic": "Corrección",
    "steps": [
    "El editor detectó una conclusión que usaba «siempre» sin pruebas suficientes.",
    "Revisó cuántos casos sustentaban realmente la afirmación.",
    "Reemplazó el cuantificador universal por una expresión limitada."
    ],
    "explanation": "Se evalúa el respaldo antes de suavizar una generalización absoluta.",
    "hint": "Reconstruye una revisión textual: diagnostica, comprueba y corrige.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-editor-v1-intermedio-12",
    "level": "intermedio",
    "subtopic": "Corrección",
    "steps": [
    "Se identificaron varias oraciones demasiado extensas.",
    "Se separaron las proposiciones con puntuación apropiada.",
    "Se comprobó que las conexiones lógicas siguieran claras."
    ],
    "explanation": "La puntuación debe conservar las relaciones entre ideas al dividir oraciones.",
    "hint": "Reconstruye una revisión textual: diagnostica, comprueba y corrige.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-editor-v1-intermedio-13",
    "level": "intermedio",
    "subtopic": "Corrección",
    "steps": [
    "El grupo detectó que faltaba una idea necesaria en el argumento.",
    "Añadió información que vinculaba la evidencia con la conclusión.",
    "Revisó la coherencia del párrafo completo."
    ],
    "explanation": "La integración de una premisa corrige la discontinuidad argumentativa.",
    "hint": "Reconstruye una revisión textual: diagnostica, comprueba y corrige.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-editor-v1-intermedio-14",
    "level": "intermedio",
    "subtopic": "Corrección",
    "steps": [
    "La primera versión del aviso confundía un hecho con una opinión.",
    "Se distinguieron las afirmaciones verificables de las valoraciones.",
    "Se reformularon las frases para mostrar esa diferencia."
    ],
    "explanation": "El texto mejora cuando identifica qué se puede comprobar y qué es valoración.",
    "hint": "Reconstruye una revisión textual: diagnostica, comprueba y corrige.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-editor-v1-intermedio-15",
    "level": "intermedio",
    "subtopic": "Corrección",
    "steps": [
    "Los docentes hallaron tres conectores usados fuera de contexto.",
    "El grupo identificó si cada relación era causal, temporal o adversativa.",
    "Sustituyó los conectores por formas acordes al significado."
    ],
    "explanation": "La sustitución de enlaces requiere comprender la relación lógica previa.",
    "hint": "Reconstruye una revisión textual: diagnostica, comprueba y corrige.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-editor-v1-intermedio-16",
    "level": "intermedio",
    "subtopic": "Corrección",
    "steps": [
    "Los alumnos definieron a qué público dirigían su explicación.",
    "Eligieron términos que ese público pudiera comprender.",
    "Corrigieron expresiones demasiado técnicas o imprecisas."
    ],
    "explanation": "Una revisión adecuada adapta las elecciones léxicas a la audiencia.",
    "hint": "Reconstruye una revisión textual: diagnostica, comprueba y corrige.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-editor-v1-intermedio-17",
    "level": "intermedio",
    "subtopic": "Corrección",
    "steps": [
    "Los redactores encontraron que dos párrafos repetían el mismo argumento.",
    "Identificaron la información novedosa de cada uno.",
    "Integraron ambos párrafos sin perder los datos necesarios."
    ],
    "explanation": "Una integración coherente reduce redundancias y mantiene información relevante.",
    "hint": "Reconstruye una revisión textual: diagnostica, comprueba y corrige.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-editor-v1-intermedio-18",
    "level": "intermedio",
    "subtopic": "Corrección",
    "steps": [
    "Se revisó una tabla citada en el texto.",
    "Se compararon las cifras escritas con las de la tabla.",
    "Se corrigieron las diferencias antes de difundir el informe."
    ],
    "explanation": "La edición de datos exige verificar cifras antes de aprobar una versión final.",
    "hint": "Reconstruye una revisión textual: diagnostica, comprueba y corrige.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-editor-v1-avanzado-19",
    "level": "avanzado",
    "subtopic": "Corrección",
    "steps": [
    "Una revisión detectó que el informe usaba «significativo» sin análisis estadístico.",
    "Distinguió importancia práctica de significación estadística.",
    "Reemplazó el término por una descripción compatible con la evidencia."
    ],
    "explanation": "La precisión exige evitar atribuir propiedades estadísticas sin mediciones suficientes.",
    "hint": "Reconstruye una revisión textual: diagnostica, comprueba y corrige.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-editor-v1-avanzado-20",
    "level": "avanzado",
    "subtopic": "Corrección",
    "steps": [
    "Se detectó que «su» podía referirse a dos personas distintas.",
    "Se determinó qué persona era la propietaria según el contexto.",
    "Se reescribió la frase nombrando explícitamente a la persona."
    ],
    "explanation": "Una corrección de referencia elimina la ambigüedad con un antecedente explícito.",
    "hint": "Reconstruye una revisión textual: diagnostica, comprueba y corrige.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-editor-v1-avanzado-21",
    "level": "avanzado",
    "subtopic": "Corrección",
    "steps": [
    "El texto presentó una diferencia entre grupos como si fuera una causa demostrada.",
    "La editora examinó qué controles ofrecía el estudio descrito.",
    "Matizó la conclusión para no afirmar una causalidad no demostrada."
    ],
    "explanation": "El grado de certeza causal debe ser proporcional al diseño y los datos disponibles.",
    "hint": "Reconstruye una revisión textual: diagnostica, comprueba y corrige.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-editor-v1-avanzado-22",
    "level": "avanzado",
    "subtopic": "Corrección",
    "steps": [
    "Se encontró una cita secundaria tratada erróneamente como fuente primaria.",
    "Se identificó la cadena de referencias usada en el escrito.",
    "Se atribuyó cada afirmación a la fuente que realmente la contenía."
    ],
    "explanation": "La atribución correcta exige rastrear procedencia antes de citar.",
    "hint": "Reconstruye una revisión textual: diagnostica, comprueba y corrige.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-editor-v1-avanzado-23",
    "level": "avanzado",
    "subtopic": "Corrección",
    "steps": [
    "La síntesis comparaba porcentajes construidos con denominadores diferentes.",
    "Se revisó la definición de cada indicador y su población.",
    "Se redactó una comparación que explicitaba las diferencias de base."
    ],
    "explanation": "Los denominadores deben examinarse antes de comparar porcentajes.",
    "hint": "Reconstruye una revisión textual: diagnostica, comprueba y corrige.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-editor-v1-avanzado-24",
    "level": "avanzado",
    "subtopic": "Corrección",
    "steps": [
    "Una afirmación universal se apoyaba solo en dos entrevistas.",
    "La revisión evaluó la cobertura y el contexto de esas entrevistas.",
    "La afirmación se reformuló como observación limitada a esos casos."
    ],
    "explanation": "Las evidencias de pocos casos no justifican una conclusión universal.",
    "hint": "Reconstruye una revisión textual: diagnostica, comprueba y corrige.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-editor-v1-avanzado-25",
    "level": "avanzado",
    "subtopic": "Corrección",
    "steps": [
    "Un artículo mezclaba hallazgos experimentales con opiniones sin diferenciarlos.",
    "Los autores clasificaron el origen de cada afirmación.",
    "Reestructuraron la síntesis para distinguir evidencias y valoraciones."
    ],
    "explanation": "La integración rigurosa separa los tipos de evidencia antes de sintetizar.",
    "hint": "Reconstruye una revisión textual: diagnostica, comprueba y corrige.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-editor-v1-avanzado-26",
    "level": "avanzado",
    "subtopic": "Corrección",
    "steps": [
    "Se descubrió que dos capítulos empleaban definiciones incompatibles de «eficacia».",
    "El equipo hizo explícitas las diferencias conceptuales.",
    "Corrigió las conclusiones que comparaban indebidamente ambas medidas."
    ],
    "explanation": "Comparar exige comprobar previamente la compatibilidad de definiciones.",
    "hint": "Reconstruye una revisión textual: diagnostica, comprueba y corrige.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-editor-v1-avanzado-27",
    "level": "avanzado",
    "subtopic": "Corrección",
    "steps": [
    "Un resumen omitía los resultados negativos del estudio original.",
    "Los revisores contrastaron el resumen con el informe completo.",
    "Reincorporaron los resultados omitidos y ajustaron la conclusión."
    ],
    "explanation": "La fidelidad de un resumen requiere reflejar resultados positivos y negativos.",
    "hint": "Reconstruye una revisión textual: diagnostica, comprueba y corrige.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-editor-v1-avanzado-28",
    "level": "avanzado",
    "subtopic": "Corrección",
    "steps": [
    "La argumentación incluía una conclusión que no se derivaba de las premisas.",
    "Se distinguieron los datos documentados de los supuestos añadidos.",
    "Se reescribió la conclusión según las premisas respaldadas."
    ],
    "explanation": "La validez argumentativa se comprueba identificando las premisas sustentadas.",
    "hint": "Reconstruye una revisión textual: diagnostica, comprueba y corrige.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-editor-v1-avanzado-29",
    "level": "avanzado",
    "subtopic": "Corrección",
    "steps": [
    "Un documento alternaba lenguaje hipotético y afirmaciones definitivas sin justificación.",
    "La editora señaló cada transición de certeza no respaldada.",
    "Ajustó las expresiones modales para mantener un grado de certeza consistente."
    ],
    "explanation": "La edición crítica evita cambios injustificados del grado de seguridad.",
    "hint": "Reconstruye una revisión textual: diagnostica, comprueba y corrige.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-editor-v1-avanzado-30",
    "level": "avanzado",
    "subtopic": "Corrección",
    "steps": [
    "Dos apartados describían el mismo indicador mediante unidades incompatibles.",
    "Se revisó cómo se había calculado cada cifra.",
    "Se uniformaron las unidades y se aclararon las conversiones utilizadas."
    ],
    "explanation": "Antes de comparar cantidades debe verificarse la coherencia de unidades.",
    "hint": "Reconstruye una revisión textual: diagnostica, comprueba y corrige.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-editor-v1-avanzado-31",
    "level": "avanzado",
    "subtopic": "Corrección",
    "steps": [
    "Se detectó una contradicción entre la hipótesis y el cierre del informe.",
    "Se evaluó si los nuevos datos justificaban cambiar de interpretación.",
    "Se reescribió el cierre de acuerdo con las evidencias disponibles."
    ],
    "explanation": "Un cambio de conclusión requiere razones explícitas y datos suficientes.",
    "hint": "Reconstruye una revisión textual: diagnostica, comprueba y corrige.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-editor-v1-avanzado-32",
    "level": "avanzado",
    "subtopic": "Corrección",
    "steps": [
    "La discusión presentó un caso extraordinario como ejemplo típico de toda la población.",
    "Los revisores buscaron información sobre la frecuencia del caso observado.",
    "Aclararon que el ejemplo era excepcional y limitaron la generalización."
    ],
    "explanation": "La elección de ejemplos debe reflejar su representatividad real.",
    "hint": "Reconstruye una revisión textual: diagnostica, comprueba y corrige.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-editor-v1-avanzado-33",
    "level": "avanzado",
    "subtopic": "Corrección",
    "steps": [
    "El texto ocultó la incertidumbre al presentar cifras redondeadas como exactas.",
    "Se revisaron los márgenes de error de los cálculos originales.",
    "Se comunicó la precisión adecuada a los datos disponibles."
    ],
    "explanation": "La redacción cuantitativa no debe aparentar una precisión mayor que la medida.",
    "hint": "Reconstruye una revisión textual: diagnostica, comprueba y corrige.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-editor-v1-avanzado-34",
    "level": "avanzado",
    "subtopic": "Corrección",
    "steps": [
    "Un artículo usó una metáfora como si fuera evidencia literal de un fenómeno.",
    "Se distinguió el recurso figurado de la descripción empírica.",
    "Se incorporó una explicación basada en observaciones verificables."
    ],
    "explanation": "La corrección separa el valor expresivo de una metáfora y las pruebas de un hecho.",
    "hint": "Reconstruye una revisión textual: diagnostica, comprueba y corrige.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-editor-v1-avanzado-35",
    "level": "avanzado",
    "subtopic": "Corrección",
    "steps": [
    "Se identificó una comparación histórica sin referencias sobre las fechas clave.",
    "Se verificó la cronología mediante fuentes independientes.",
    "Se reformuló el contraste con fechas comprobables y notas de contexto."
    ],
    "explanation": "La edición de un texto histórico debe fundamentar sus referencias temporales.",
    "hint": "Reconstruye una revisión textual: diagnostica, comprueba y corrige.",
    "reviewStatus": "editorial-draft"
  }
];
