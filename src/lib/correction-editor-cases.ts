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
      "Después, revisó si había escrito correctamente su nombre.",
      "Finalmente, entregó la hoja corregida a la maestra."
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
      "Luego, redactó una oración breve y comprensible.",
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
      "Primero, Ana escribió una carta de agradecimiento.",
      "Más tarde, comprobó los signos de puntuación.",
      "Finalmente, la entregó a la persona destinataria."
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
      "Después, consultó en el diccionario sus formas correctas.",
      "Al final, utilizó las palabras revisadas en oraciones propias."
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
      "Primero, el equipo elaboró un borrador de su exposición.",
      "Luego, buscó verbos que no concordaban con los sujetos.",
      "Por último, corrigió esos verbos antes de presentar el trabajo."
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
      "A continuación, mostró ejemplos de «qué» y «cómo».",
      "Finalmente, los estudiantes practicaron con preguntas nuevas."
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
      "Después, eliminó una repetición innecesaria de palabras.",
      "Al final, leyó el texto corregido en voz alta."
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
      "A continuación, verificó el núcleo del sujeto de cada oración.",
      "Finalmente, modificó los verbos para mantener la concordancia."
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
      "Después, identificaron el documento de donde provenía la cita.",
      "Al cerrar, añadieron una referencia verificable a ese documento."
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
      "Primero, el grupo encontró expresiones ambiguas en el folleto.",
      "Luego, precisó los antecedentes de los pronombres problemáticos.",
      "Finalmente, comprobó que cada oración tuviera un referente claro."
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
      "Después, ajustaron los verbos a esa secuencia y revisaron el resultado."
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
      "Luego, revisó cuántos casos sustentaban realmente la afirmación.",
      "Finalmente, reemplazó el cuantificador universal por una expresión limitada."
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
      "Primero, se identificaron varias oraciones demasiado extensas.",
      "Después, se separaron las proposiciones con puntuación apropiada.",
      "Al final, se comprobó que las conexiones lógicas siguieran claras."
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
      "Luego, añadió información que vinculaba la evidencia con la conclusión.",
      "Finalmente, revisó la coherencia del párrafo completo."
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
      "Después, se distinguieron las afirmaciones verificables de las valoraciones.",
      "Por último, se reformularon las frases para mostrar esa diferencia."
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
      "Finalmente, sustituyó los conectores por formas acordes al significado."
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
      "Primero, los alumnos definieron a qué público dirigían su explicación.",
      "Luego, eligieron términos que ese público pudiera comprender.",
      "Finalmente, corrigieron expresiones demasiado técnicas o imprecisas."
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
      "Después, identificaron la información novedosa de cada uno.",
      "Por último, integraron ambos párrafos sin perder los datos necesarios."
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
      "Al inicio, se revisó una tabla citada en el texto.",
      "Luego, se compararon las cifras escritas con las de la tabla.",
      "Finalmente, se corrigieron las diferencias antes de difundir el informe."
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
      "Luego, distinguió importancia práctica de significación estadística.",
      "Finalmente, reemplazó el término por una descripción compatible con la evidencia."
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
      "Primero, se detectó que «su» podía referirse a dos personas distintas.",
      "Después, se determinó qué persona era la propietaria según el contexto.",
      "Finalmente, se reescribió la frase nombrando explícitamente a la persona."
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
      "Después, matizó la conclusión para no afirmar una causalidad no demostrada."
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
      "Primero, se identificó la cadena de referencias usada en el escrito.",
      "Finalmente, se atribuyó cada afirmación a la fuente que realmente la contenía."
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
      "Después, se revisó la definición de cada indicador y su población.",
      "Al final, se redactó una comparación que explicitaba las diferencias de base."
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
      "Finalmente, la afirmación se reformuló como observación limitada a esos casos."
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
      "Después, los autores clasificaron el origen de cada afirmación.",
      "Finalmente, reestructuraron la síntesis para distinguir evidencias y valoraciones."
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
      "Luego, el equipo hizo explícitas las diferencias conceptuales.",
      "Al final, corrigió las conclusiones que comparaban indebidamente ambas medidas."
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
      "Después, los revisores contrastaron el resumen con el informe completo.",
      "Finalmente, reincorporaron los resultados omitidos y ajustaron la conclusión."
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
      "Primero, se distinguieron los datos documentados de los supuestos añadidos.",
      "Finalmente, se reescribió la conclusión según las premisas respaldadas."
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
      "Después, ajustó las expresiones modales para mantener un grado de certeza consistente."
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
      "Luego, se revisó cómo se había calculado cada cifra.",
      "Al final, se uniformaron las unidades y se aclararon las conversiones utilizadas."
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
      "Después, se evaluó si los nuevos datos justificaban cambiar de interpretación.",
      "Finalmente, se reescribió el cierre de acuerdo con las evidencias disponibles."
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
      "Finalmente, aclararon que el ejemplo era excepcional y limitaron la generalización."
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
      "Luego, se revisaron los márgenes de error de los cálculos originales.",
      "Finalmente, se comunicó la precisión adecuada a los datos disponibles."
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
      "Primero, se distinguió el recurso figurado de la descripción empírica.",
      "Por último, se incorporó una explicación basada en observaciones verificables."
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
      "Después, se verificó la cronología mediante fuentes independientes.",
      "Finalmente, se reformuló el contraste con fechas comprobables y notas de contexto."
    ],
    "explanation": "La edición de un texto histórico debe fundamentar sus referencias temporales.",
    "hint": "Reconstruye una revisión textual: diagnostica, comprueba y corrige.",
    "reviewStatus": "editorial-draft"
  }
];
