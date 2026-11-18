import type {Level} from "./grammar";
export type ElisionEditorCase={id:string;level:Level;subtopic:"Elisión y adición";steps:[string,string,string];explanation:string;hint:string;reviewStatus:"editorial-draft"};
/** Secuencias originales de elisión, adición y precisión editorial. */
export const ELISION_EDITOR_CASES:ElisionEditorCase[]=[
  {
    "id": "writing-elision-editor-v1-principiante-0",
    "level": "principiante",
    "subtopic": "Elisión y adición",
    "steps": [
    "Una niña escribió: «La niña preparó una exposición».",
    "Detectó que repetía «la niña» en las oraciones siguientes.",
    "Sustituyó las repeticiones innecesarias sin perder el referente."
    ],
    "explanation": "Se identifica primero la repetición y luego se reescribe con un referente comprensible.",
    "hint": "Organiza una revisión: identifica qué sobra o falta, comprueba y redacta.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-editor-v1-principiante-1",
    "level": "principiante",
    "subtopic": "Elisión y adición",
    "steps": [
    "El estudiante redactó un anuncio sobre una jornada de limpieza.",
    "Antes de publicarlo, observó que faltaba la fecha de reunión.",
    "Añadió el día y la hora para que la invitación fuera útil."
    ],
    "explanation": "La información necesaria se incorpora después de identificar su ausencia.",
    "hint": "Organiza una revisión: identifica qué sobra o falta, comprueba y redacta.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-editor-v1-principiante-2",
    "level": "principiante",
    "subtopic": "Elisión y adición",
    "steps": [
    "La clase leyó la oración «subió hacia arriba por la escalera».",
    "Los alumnos reconocieron que «hacia arriba» repetía el sentido del verbo.",
    "Escribieron «subió por la escalera» sin perder información."
    ],
    "explanation": "La detección de redundancia antecede a su eliminación.",
    "hint": "Organiza una revisión: identifica qué sobra o falta, comprueba y redacta.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-editor-v1-principiante-3",
    "level": "principiante",
    "subtopic": "Elisión y adición",
    "steps": [
    "Ana resumió un cuento con dos párrafos muy parecidos.",
    "En la revisión comprobó qué información aparecía en ambos.",
    "Conservó una sola versión y mantuvo las ideas importantes."
    ],
    "explanation": "Se elimina contenido duplicado solo después de comprobar su redundancia.",
    "hint": "Organiza una revisión: identifica qué sobra o falta, comprueba y redacta.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-editor-v1-principiante-4",
    "level": "principiante",
    "subtopic": "Elisión y adición",
    "steps": [
      "Un aviso explicaba que la biblioteca cerraría temporalmente.",
      "La revisión encontró que faltaba decir cuándo volvería a abrir.",
      "La encargada añadió la fecha estimada y aclaró que podría cambiar."
    ],
    "explanation": "Primero se detecta la omisión y luego se añade la información disponible.",
    "hint": "Organiza una revisión: identifica qué sobra o falta, comprueba y redacta.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-editor-v1-principiante-5",
    "level": "principiante",
    "subtopic": "Elisión y adición",
    "steps": [
    "El grupo preparó instrucciones para hacer un cartel escolar.",
    "Los estudiantes encontraron que había repetido tres veces «recortar».",
    "Dejaron el verbo solo donde correspondía a una acción real."
    ],
    "explanation": "Unas instrucciones deben evitar repeticiones que no aportan pasos diferentes.",
    "hint": "Organiza una revisión: identifica qué sobra o falta, comprueba y redacta.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-editor-v1-principiante-6",
    "level": "principiante",
    "subtopic": "Elisión y adición",
    "steps": [
    "El alumno redactó una descripción de un árbol del patio.",
    "Comprobó que había omitido el lugar en que lo observó.",
    "Añadió el contexto necesario para entender su observación."
    ],
    "explanation": "La descripción mejora cuando recupera datos relevantes previamente omitidos.",
    "hint": "Organiza una revisión: identifica qué sobra o falta, comprueba y redacta.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-editor-v1-intermedio-7",
    "level": "intermedio",
    "subtopic": "Elisión y adición",
    "steps": [
    "Una reseña repetía tres veces el título de una misma obra.",
    "La editora distinguió cuándo ese título resultaba necesario para evitar confusiones.",
    "Empleó referencias claras solo cuando el lector podía identificarlas."
    ],
    "explanation": "La elisión de nombres requiere mantener la referencia inequívoca.",
    "hint": "Organiza una revisión: identifica qué sobra o falta, comprueba y redacta.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-editor-v1-intermedio-8",
    "level": "intermedio",
    "subtopic": "Elisión y adición",
    "steps": [
    "El boletín publicó «la asistencia aumentó» sin aportar cifras.",
    "La comisión buscó los valores iniciales y finales en los registros disponibles.",
    "Incorporó los datos y especificó el período al que correspondían."
    ],
    "explanation": "La adición de números y fechas convierte una afirmación vaga en una verificable.",
    "hint": "Organiza una revisión: identifica qué sobra o falta, comprueba y redacta.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-editor-v1-intermedio-9",
    "level": "intermedio",
    "subtopic": "Elisión y adición",
    "steps": [
    "El informe mencionaba a dos docentes y después utilizaba «su propuesta».",
    "La revisión detectó que no podía saberse a cuál de ellas pertenecía.",
    "Reemplazó el posesivo por el nombre de la autora correspondiente."
    ],
    "explanation": "Se reescribe el referente después de identificar la ambigüedad.",
    "hint": "Organiza una revisión: identifica qué sobra o falta, comprueba y redacta.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-editor-v1-intermedio-10",
    "level": "intermedio",
    "subtopic": "Elisión y adición",
    "steps": [
    "Una comparación escolar omitía explicar cómo se calculó el promedio.",
    "El grupo revisó los registros y definió el número de participantes incluidos.",
    "Añadió al informe el procedimiento utilizado para obtener la media."
    ],
    "explanation": "Las medidas cuantitativas necesitan información metodológica para interpretarse.",
    "hint": "Organiza una revisión: identifica qué sobra o falta, comprueba y redacta.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-editor-v1-intermedio-11",
    "level": "intermedio",
    "subtopic": "Elisión y adición",
    "steps": [
    "Dos párrafos de una propuesta repetían exactamente el mismo argumento.",
    "La revisión identificó los ejemplos nuevos del segundo párrafo.",
    "Integró esos ejemplos en uno solo sin duplicar la afirmación central."
    ],
    "explanation": "La fusión conserva aportes nuevos y elimina la reiteración conceptual.",
    "hint": "Organiza una revisión: identifica qué sobra o falta, comprueba y redacta.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-editor-v1-intermedio-12",
    "level": "intermedio",
    "subtopic": "Elisión y adición",
    "steps": [
    "El texto afirmaba «el programa fue mejor» sin nombrar un criterio.",
    "Los autores identificaron que habían evaluado tiempos de espera.",
    "Precisaron la variable y evitaron valorar otros aspectos sin pruebas."
    ],
    "explanation": "Una comparación exige determinar qué dimensión se ha medido.",
    "hint": "Organiza una revisión: identifica qué sobra o falta, comprueba y redacta.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-editor-v1-intermedio-13",
    "level": "intermedio",
    "subtopic": "Elisión y adición",
    "steps": [
    "El resumen científico mezclaba observaciones y conclusiones sin transición.",
    "Los estudiantes separaron los datos medidos de sus interpretaciones.",
    "Añadieron un enlace explicativo para mostrar cómo se relacionaban."
    ],
    "explanation": "No basta eliminar palabras; a veces hace falta añadir una relación lógica.",
    "hint": "Organiza una revisión: identifica qué sobra o falta, comprueba y redacta.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-editor-v1-intermedio-14",
    "level": "intermedio",
    "subtopic": "Elisión y adición",
    "steps": [
    "Una invitación mencionaba los premios de una competencia de lectura.",
    "El organizador observó que faltaban las condiciones de participación.",
    "Incorporó fechas y criterios sin repetir la lista de premios."
    ],
    "explanation": "La información ausente debe recuperarse antes de que el aviso permita participar.",
    "hint": "Organiza una revisión: identifica qué sobra o falta, comprueba y redacta.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-editor-v1-intermedio-15",
    "level": "intermedio",
    "subtopic": "Elisión y adición",
    "steps": [
    "La noticia incluía tres cifras de encuestas realizadas en años distintos.",
    "La editora verificó que los porcentajes tenían denominadores diferentes.",
    "Añadió una nota sobre esas bases para evitar una comparación engañosa."
    ],
    "explanation": "La precisión exige explicitar la población de referencia de cada porcentaje.",
    "hint": "Organiza una revisión: identifica qué sobra o falta, comprueba y redacta.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-editor-v1-intermedio-16",
    "level": "intermedio",
    "subtopic": "Elisión y adición",
    "steps": [
    "Un artículo citaba una fuente sin indicar su procedencia documental.",
    "La revisión localizó el título, autor y fecha de publicación originales.",
    "Agregó la referencia para que el lector pudiera comprobarla."
    ],
    "explanation": "Los datos de fuente son una adición necesaria para verificar citas.",
    "hint": "Organiza una revisión: identifica qué sobra o falta, comprueba y redacta.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-editor-v1-intermedio-17",
    "level": "intermedio",
    "subtopic": "Elisión y adición",
    "steps": [
    "Un folleto mezclaba el pronombre «ellos» entre varios grupos de visitantes.",
    "El equipo identificó a qué grupo aludía cada oración.",
    "Sustituyó los pronombres ambiguos por referencias específicas."
    ],
    "explanation": "El uso de pronombres es útil solo cuando el antecedente es inequívoco.",
    "hint": "Organiza una revisión: identifica qué sobra o falta, comprueba y redacta.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-editor-v1-intermedio-18",
    "level": "intermedio",
    "subtopic": "Elisión y adición",
    "steps": [
    "El párrafo describía una mejora y después repetía la misma observación.",
    "La autora verificó qué datos resultaban verdaderamente novedosos.",
    "Eliminó la repetición y agregó una explicación de sus límites."
    ],
    "explanation": "La síntesis integra información pertinente en lugar de duplicar observaciones.",
    "hint": "Organiza una revisión: identifica qué sobra o falta, comprueba y redacta.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-editor-v1-avanzado-19",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "steps": [
      "Una revisión afirmó resultados universales a partir de una muestra voluntaria.",
      "El equipo examinó cómo se reclutó a los participantes del estudio.",
      "La conclusión incorporó una cautela sobre generalizar fuera de la muestra."
    ],
    "explanation": "La selección voluntaria restringe el alcance de los resultados.",
    "hint": "Organiza una revisión: identifica qué sobra o falta, comprueba y redacta.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-editor-v1-avanzado-20",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "steps": [
    "El informe presentó variaciones regionales sin indicar las unidades de medida.",
    "Los analistas comprobaron la unidad y el período de cada indicador.",
    "Añadieron una tabla de equivalencias o separaron lo no comparable."
    ],
    "explanation": "La adición metodológica permite interpretar cifras con medidas diferentes.",
    "hint": "Organiza una revisión: identifica qué sobra o falta, comprueba y redacta.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-editor-v1-avanzado-21",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "steps": [
      "Un documento histórico citaba testimonios recogidos décadas después del evento.",
      "Los autores revisaron la procedencia y las condiciones de cada entrevista.",
      "La síntesis incorporó esas limitaciones sin descartar automáticamente las fuentes."
    ],
    "explanation": "Una fuente tardía requiere contextualización antes de formular conclusiones.",
    "hint": "Organiza una revisión: identifica qué sobra o falta, comprueba y redacta.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-editor-v1-avanzado-22",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "steps": [
    "Una investigación describía una asociación como si fuera una causa única.",
    "La revisión separó los datos observados de las explicaciones propuestas.",
    "Añadió posibles factores de confusión y matizó la atribución causal."
    ],
    "explanation": "La precisión requiere información sobre factores alternativos.",
    "hint": "Organiza una revisión: identifica qué sobra o falta, comprueba y redacta.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-editor-v1-avanzado-23",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "steps": [
    "Una evaluación reportó una mejora media sin distinguir resultados de subgrupos.",
    "El equipo volvió a examinar la dispersión y las diferencias internas.",
    "Añadió los resultados relevantes que el promedio había ocultado."
    ],
    "explanation": "La información desagregada evita conclusiones de homogeneidad injustificadas.",
    "hint": "Organiza una revisión: identifica qué sobra o falta, comprueba y redacta.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-editor-v1-avanzado-24",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "steps": [
    "Un metaanálisis integraba cifras de estudios con diseños diferentes.",
    "Se distinguieron experimentos, observaciones y relatos de casos.",
    "Se separaron inferencias que no podían tener idéntico alcance causal."
    ],
    "explanation": "La síntesis requiere explicitar diferencias de diseño entre las fuentes.",
    "hint": "Organiza una revisión: identifica qué sobra o falta, comprueba y redacta.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-editor-v1-avanzado-25",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "steps": [
    "La nota técnica eliminaba observaciones extremas sin justificar esa decisión.",
    "Los revisores identificaron cuántos datos se habían excluido y por qué.",
    "Incorporaron el criterio de exclusión y una evaluación de su efecto."
    ],
    "explanation": "Las exclusiones deben documentarse porque pueden modificar resultados.",
    "hint": "Organiza una revisión: identifica qué sobra o falta, comprueba y redacta.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-editor-v1-avanzado-26",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "steps": [
    "Dos fuentes discreparon sobre una fecha relevante para la interpretación.",
    "El analista comprobó las cronologías y los documentos disponibles.",
    "Conservó la discrepancia como incertidumbre explícita del informe."
    ],
    "explanation": "No puede omitirse una contradicción documental no resuelta.",
    "hint": "Organiza una revisión: identifica qué sobra o falta, comprueba y redacta.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-editor-v1-avanzado-27",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "steps": [
    "Un artículo presentó predicciones futuras como hechos ya observados.",
    "Los autores identificaron qué cifras provenían del modelo y cuáles de registros.",
    "Reorganizaron la redacción y añadieron supuestos de predicción."
    ],
    "explanation": "Una proyección condicionada es distinta de una observación.",
    "hint": "Organiza una revisión: identifica qué sobra o falta, comprueba y redacta.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-editor-v1-avanzado-28",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "steps": [
    "Una encuesta comparaba respuestas obtenidas con formularios distintos.",
    "La revisión contrastó la redacción y el orden de las preguntas.",
    "Señaló qué resultados requerían cautela por esa diferencia."
    ],
    "explanation": "La comparabilidad puede depender de la formulación de los instrumentos.",
    "hint": "Organiza una revisión: identifica qué sobra o falta, comprueba y redacta.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-editor-v1-avanzado-29",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "steps": [
    "Un texto metodológico presentó porcentajes de bases poblacionales distintas.",
    "Los investigadores reconstruyeron denominadores y definiciones de cada tasa.",
    "Añadieron advertencias para no equiparar medidas incompatibles."
    ],
    "explanation": "El denominador es información central para interpretar porcentajes.",
    "hint": "Organiza una revisión: identifica qué sobra o falta, comprueba y redacta.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-editor-v1-avanzado-30",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "steps": [
      "Una propuesta mencionaba beneficios de un programa sin sus costos.",
      "La comisión reunió datos disponibles sobre recursos y riesgos de implementación.",
      "El documento final integró las restricciones antes de recomendar la expansión."
    ],
    "explanation": "Una recomendación equilibrada necesita beneficios y limitaciones.",
    "hint": "Organiza una revisión: identifica qué sobra o falta, comprueba y redacta.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-editor-v1-avanzado-31",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "steps": [
    "Una síntesis atribuyó a una fuente primaria una frase conocida por una reseña.",
    "La editora examinó qué documento había consultado realmente el autor.",
    "Corrigió la atribución para distinguir la cita directa de la indirecta."
    ],
    "explanation": "La transparencia bibliográfica impide presentar de segunda mano una cita primaria.",
    "hint": "Organiza una revisión: identifica qué sobra o falta, comprueba y redacta.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-editor-v1-avanzado-32",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "steps": [
    "El informe incorporó una redefinición de su indicador sin avisar al lector.",
    "Los técnicos identificaron el momento y alcance del cambio conceptual.",
    "Separaron los tramos no comparables o explicaron sus ajustes."
    ],
    "explanation": "Las series temporales necesitan advertir los cambios en qué se mide.",
    "hint": "Organiza una revisión: identifica qué sobra o falta, comprueba y redacta.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-editor-v1-avanzado-33",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "steps": [
    "Una conclusión descartó hipótesis alternativas discutidas en el desarrollo.",
    "La revisión identificó cuáles seguían siendo compatibles con los resultados.",
    "Recuperó esa incertidumbre en una conclusión menos categórica."
    ],
    "explanation": "Una síntesis completa no puede eliminar alternativas pertinentes sin razones.",
    "hint": "Organiza una revisión: identifica qué sobra o falta, comprueba y redacta.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-editor-v1-avanzado-34",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "steps": [
    "El resumen incluyó solo resultados favorables e ignoró evidencias contrarias.",
    "La editora cotejó el resumen con la totalidad de los hallazgos informados.",
    "Reincorporó los resultados negativos y revisó el alcance de la tesis."
    ],
    "explanation": "La selección de resultados puede distorsionar la interpretación del estudio.",
    "hint": "Organiza una revisión: identifica qué sobra o falta, comprueba y redacta.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-editor-v1-avanzado-35",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "steps": [
    "Una comparación de gastos confundía variaciones de precios y de consumo.",
    "La revisión distinguió ambos componentes de los registros presupuestarios.",
    "Añadió esa separación al informe antes de atribuir causas al ahorro."
    ],
    "explanation": "Una variación monetaria puede obedecer a cambios de precio o de cantidad.",
    "hint": "Organiza una revisión: identifica qué sobra o falta, comprueba y redacta.",
    "reviewStatus": "editorial-draft"
  }
];
