import type {Level} from "./grammar";
export type ElisionChoiceCase={id:string;level:Level;subtopic:"Elisión y adición";gap:string;connector:string;options:[string,string,string,string];explanation:string;reviewStatus:"editorial-draft"};
/** Elegir una reformulación o completar información omitida, con cuatro
 * alternativas distintas por pregunta. Revisión docente pendiente. */
export const ELISION_CHOICE_CASES:ElisionChoiceCase[]=[
  {
    "id": "writing-elision-choice-v1-principiante-0",
    "level": "principiante",
    "subtopic": "Elisión y adición",
    "gap": "«Subió hacia arriba» contiene una repetición. La mejor alternativa es ___.",
    "connector": "Subió.",
    "options": [
      "Subió.",
      "Subió hacia arriba otra vez.",
      "Subió arriba ascendiendo.",
      "Subió hacia lo alto arriba."
    ],
    "explanation": "El verbo «subir» ya indica movimiento ascendente y no requiere repetir esa dirección.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-choice-v1-principiante-1",
    "level": "principiante",
    "subtopic": "Elisión y adición",
    "gap": "La frase «entró adentro de la habitación» puede simplificarse como ___.",
    "connector": "Entró en la habitación.",
    "options": [
      "Entró adentro en el interior.",
      "Entró hacia dentro adentro.",
      "Entró en el interior adentro otra vez.",
      "Entró en la habitación."
    ],
    "explanation": "La preposición de destino basta; «adentro» duplica el sentido de «entrar».",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-choice-v1-principiante-2",
    "level": "principiante",
    "subtopic": "Elisión y adición",
    "gap": "Para evitar repetir «María» en «María leyó y María escribió», se puede decir ___.",
    "connector": "María leyó y escribió.",
    "options": [
      "María escribió y María escribió.",
      "María leyó porque María y escribió.",
      "María leyó y escribió.",
      "María leyó y María leyó y escribió."
    ],
    "explanation": "El sujeto se comparte entre los dos verbos y no hace falta repetirlo.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-choice-v1-principiante-3",
    "level": "principiante",
    "subtopic": "Elisión y adición",
    "gap": "En «La biblioteca regaló un libro gratis», basta escribir ___.",
    "connector": "La biblioteca regaló un libro.",
    "options": [
      "La biblioteca vendió un regalo de pago.",
      "La biblioteca regaló un libro.",
      "La biblioteca regaló un libro gratis sin pagar.",
      "La biblioteca regaló gratuitamente sin cobrar gratis."
    ],
    "explanation": "El verbo «regalar» ya expresa entrega gratuita, por lo que «gratis» sobra.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-choice-v1-principiante-4",
    "level": "principiante",
    "subtopic": "Elisión y adición",
    "gap": "En «Los estudiantes reunidos se juntaron juntos», la forma más clara es ___.",
    "connector": "Los estudiantes se reunieron.",
    "options": [
      "Los estudiantes se reunieron.",
      "Los estudiantes se juntaron juntos reunidos.",
      "Los estudiantes se agruparon juntos y reunidos.",
      "Los estudiantes se reunieron reuniéndose."
    ],
    "explanation": "«Se reunieron» expresa el encuentro sin duplicar el mismo significado.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-choice-v1-principiante-5",
    "level": "principiante",
    "subtopic": "Elisión y adición",
    "gap": "Para evitar la repetición en «La niña dibujó una flor. La niña la coloreó», se puede usar ___.",
    "connector": "La niña dibujó una flor y la coloreó.",
    "options": [
      "La niña dibujó una flor y la niña coloreó la flor.",
      "La flor coloreó a la niña que dibujó la niña.",
      "La niña dibujó y la flor dibujó a la niña.",
      "La niña dibujó una flor y la coloreó."
    ],
    "explanation": "Unir las dos acciones conserva el objeto y evita repetir «la niña».",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-choice-v1-principiante-6",
    "level": "principiante",
    "subtopic": "Elisión y adición",
    "gap": "«Volver a regresar de nuevo» puede resumirse correctamente como ___.",
    "connector": "Regresar.",
    "options": [
      "Regresar otra vez de regreso.",
      "Reiterar la vuelta de regreso de nuevo.",
      "Regresar.",
      "Volver a regresar de nuevo otra vez."
    ],
    "explanation": "«Regresar» ya significa volver y permite eliminar palabras equivalentes.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-choice-v1-intermedio-7",
    "level": "intermedio",
    "subtopic": "Elisión y adición",
    "gap": "La oración «El informe mostró una mejora. El informe explicó sus límites» se integra como ___.",
    "connector": "El informe mostró una mejora y explicó sus límites.",
    "options": [
      "Los límites mostraron un informe y una mejora.",
      "El informe mostró una mejora y explicó sus límites.",
      "El informe mostró una mejora y el informe mostró una mejora.",
      "El informe explicó una mejora sin mencionar límites."
    ],
    "explanation": "La coordinación evita repetir el sujeto sin perder los dos contenidos relevantes.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-choice-v1-intermedio-8",
    "level": "intermedio",
    "subtopic": "Elisión y adición",
    "gap": "En «Los alumnos revisaron los datos. Esto fue útil», la referencia más precisa es ___.",
    "connector": "La revisión de los datos resultó útil.",
    "options": [
      "La revisión de los datos resultó útil.",
      "Eso sobre los alumnos fue útil para esto.",
      "Aquello fue útil porque eso lo era.",
      "Los datos fueron útiles de una forma no determinada."
    ],
    "explanation": "Nombrar la actividad concreta elimina la ambigüedad del pronombre «esto».",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-choice-v1-intermedio-9",
    "level": "intermedio",
    "subtopic": "Elisión y adición",
    "gap": "El texto dice «las ventas aumentaron», pero omite el período. Es necesario agregar ___.",
    "connector": "el intervalo temporal al que corresponde el aumento.",
    "options": [
      "una opinión ajena a la cifra registrada.",
      "la afirmación de que las ventas siempre crecerán.",
      "otro adjetivo elogioso sin datos de respaldo.",
      "el intervalo temporal al que corresponde el aumento."
    ],
    "explanation": "Una variación cuantitativa necesita indicar el período de comparación.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-choice-v1-intermedio-10",
    "level": "intermedio",
    "subtopic": "Elisión y adición",
    "gap": "Una comparación declara que A fue mejor que B sin explicar la medida. Debe añadirse ___.",
    "connector": "el indicador común utilizado para comparar A y B.",
    "options": [
      "una conclusión definitiva sin datos medidos.",
      "la repetición de que A era mejor que B.",
      "el indicador común utilizado para comparar A y B.",
      "una preferencia personal por cualquiera de los grupos."
    ],
    "explanation": "El indicador compartido da sentido a la evaluación comparativa.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-choice-v1-intermedio-11",
    "level": "intermedio",
    "subtopic": "Elisión y adición",
    "gap": "En «El museo exhibe mapas. El museo conserva fotografías», la síntesis adecuada es ___.",
    "connector": "El museo exhibe mapas y conserva fotografías.",
    "options": [
      "Los mapas conservan el museo y las fotografías.",
      "El museo exhibe mapas y conserva fotografías.",
      "El museo exhibe mapas y el museo exhibe mapas.",
      "El museo presenta dos museos en dos mapas."
    ],
    "explanation": "El sujeto puede omitirse en el segundo predicado sin cambiar la información.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-choice-v1-intermedio-12",
    "level": "intermedio",
    "subtopic": "Elisión y adición",
    "gap": "El informe comunica una cifra de 25 pero no identifica qué mide. Se debe incorporar ___.",
    "connector": "la variable y la unidad de medida de esa cifra.",
    "options": [
      "la variable y la unidad de medida de esa cifra.",
      "otro número sin explicar su procedencia.",
      "un comentario sobre el diseño gráfico del informe.",
      "la seguridad de que la cifra demuestra cualquier hipótesis."
    ],
    "explanation": "Un número aislado no permite comprender el indicador que representa.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-choice-v1-intermedio-13",
    "level": "intermedio",
    "subtopic": "Elisión y adición",
    "gap": "En la frase «La autora afirmó su versión», el posesivo es confuso porque hay dos autoras. Conviene ___.",
    "connector": "nombrar explícitamente a la autora correspondiente.",
    "options": [
      "repetir «su versión» más veces.",
      "eliminar el nombre de las dos autoras.",
      "usar únicamente «ella» sin antecedente claro.",
      "nombrar explícitamente a la autora correspondiente."
    ],
    "explanation": "Identificar el referente evita atribuciones ambiguas entre personas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-choice-v1-intermedio-14",
    "level": "intermedio",
    "subtopic": "Elisión y adición",
    "gap": "«La comisión examinó el caso. La comisión redactó una respuesta» se puede integrar como ___.",
    "connector": "La comisión examinó el caso y redactó una respuesta.",
    "options": [
      "El caso redactó una comisión sobre la respuesta.",
      "La comisión redactó y redactó un caso y una comisión.",
      "La comisión examinó el caso y redactó una respuesta.",
      "La comisión examinó la comisión y el caso."
    ],
    "explanation": "La elisión del segundo sujeto conserva coherencia y reduce repetición.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-choice-v1-intermedio-15",
    "level": "intermedio",
    "subtopic": "Elisión y adición",
    "gap": "Un reporte dice «hubo una disminución» sin identificar el valor inicial. La revisión debe ___.",
    "connector": "indicar el valor o período que sirve como punto de comparación.",
    "options": [
      "eliminar todas las cifras de la sección.",
      "indicar el valor o período que sirve como punto de comparación.",
      "afirmar que toda disminución demuestra una mejora.",
      "añadir otro sinónimo de «disminución»."
    ],
    "explanation": "Una reducción debe interpretarse con referencia a una situación anterior.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-choice-v1-intermedio-16",
    "level": "intermedio",
    "subtopic": "Elisión y adición",
    "gap": "Si el segundo párrafo repite literalmente el primero sin agregar datos, conviene ___.",
    "connector": "eliminar el contenido duplicado y conservar la información nueva.",
    "options": [
      "eliminar el contenido duplicado y conservar la información nueva.",
      "copiar otra vez ambos párrafos al cierre.",
      "añadir un título que repita las mismas palabras.",
      "sustituir los datos por una conclusión universal."
    ],
    "explanation": "La edición distingue información necesaria de reiteraciones sin valor nuevo.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-choice-v1-intermedio-17",
    "level": "intermedio",
    "subtopic": "Elisión y adición",
    "gap": "En «el profesor habló con el director sobre su propuesta», debe aclararse ___.",
    "connector": "de quién es la propuesta mediante un referente explícito.",
    "options": [
      "que todas las propuestas son idénticas.",
      "que ningún interlocutor tenía una propuesta.",
      "la edad del profesor aunque no aporte contexto.",
      "de quién es la propuesta mediante un referente explícito."
    ],
    "explanation": "El posesivo «su» puede referirse al profesor o al director, por lo que debe precisarse.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-choice-v1-intermedio-18",
    "level": "intermedio",
    "subtopic": "Elisión y adición",
    "gap": "Una síntesis omite el dato de que la muestra fue voluntaria. La información necesaria es ___.",
    "connector": "la forma en que se seleccionaron los participantes.",
    "options": [
      "la afirmación de que toda muestra voluntaria es aleatoria.",
      "un comentario irrelevante sobre el salón de clases.",
      "la forma en que se seleccionaron los participantes.",
      "la opinión personal sobre el tamaño del título."
    ],
    "explanation": "El procedimiento de muestreo condiciona el alcance de las inferencias.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-choice-v1-avanzado-19",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "gap": "Si un artículo compara porcentajes de poblaciones distintas, debe identificar ___.",
    "connector": "los denominadores y los criterios de medición de cada porcentaje.",
    "options": [
      "una hipótesis causal no comprobada para cada cifra.",
      "los denominadores y los criterios de medición de cada porcentaje.",
      "solo el porcentaje mayor sin contexto.",
      "la idea de que todos los porcentajes miden lo mismo."
    ],
    "explanation": "La comparación requiere que los porcentajes describan bases compatibles.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-choice-v1-avanzado-20",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "gap": "Un informe declara un efecto «significativo» sin indicar prueba estadística. Lo más preciso es ___.",
    "connector": "describir el cambio observado sin afirmar significación estadística.",
    "options": [
      "describir el cambio observado sin afirmar significación estadística.",
      "garantizar significación estadística por tratarse de un informe.",
      "repetir «significativo» para aumentar credibilidad.",
      "declarar causalidad exclusiva sin controles adicionales."
    ],
    "explanation": "La adición de certeza no sustentada distorsiona el significado de los resultados.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-choice-v1-avanzado-21",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "gap": "En una revisión, «el estudio demuestra» es excesivo para un diseño observacional. Se prefiere ___.",
    "connector": "el estudio presenta una asociación que exige cautela causal.",
    "options": [
      "el estudio confirma la causa única de todos los casos.",
      "el estudio prueba cualquier hipótesis vinculada.",
      "el estudio demuestra definitivamente lo observado como causa.",
      "el estudio presenta una asociación que exige cautela causal."
    ],
    "explanation": "Una asociación observacional no equivale a una atribución causal concluyente.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-choice-v1-avanzado-22",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "gap": "Si un resumen elimina todos los resultados negativos, debería ___.",
    "connector": "reincorporar los resultados adversos pertinentes para representar el estudio.",
    "options": [
      "suprimir cualquier referencia a las limitaciones.",
      "afirmar que las excepciones no afectan ninguna conclusión.",
      "reincorporar los resultados adversos pertinentes para representar el estudio.",
      "mostrar solo hallazgos positivos para mejorar la lectura."
    ],
    "explanation": "Una síntesis fiel debe reflejar los datos relevantes, incluso cuando cuestionan la tesis.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-choice-v1-avanzado-23",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "gap": "En una comparación longitudinal cambia la definición del indicador. Debe añadirse ___.",
    "connector": "una nota sobre la redefinición y sus efectos en la comparabilidad.",
    "options": [
      "la eliminación de cualquier mención de fechas.",
      "una nota sobre la redefinición y sus efectos en la comparabilidad.",
      "una cifra promedio calculada sin ajustar períodos.",
      "una conclusión de continuidad perfecta sin pruebas."
    ],
    "explanation": "Los cambios de definición pueden romper la equivalencia entre registros temporales.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-choice-v1-avanzado-24",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "gap": "Si una encuesta pierde participantes durante el seguimiento, la sección de método debe registrar ___.",
    "connector": "la cantidad de abandonos y sus posibles implicaciones de selección.",
    "options": [
      "la cantidad de abandonos y sus posibles implicaciones de selección.",
      "la afirmación de que los abandonos no afectan nada.",
      "solo el número de personas que completaron la prueba.",
      "un cálculo de causalidad sin describir el procedimiento."
    ],
    "explanation": "El abandono puede modificar la composición de la muestra y sesgar resultados.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-choice-v1-avanzado-25",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "gap": "Una fuente cita de segunda mano un documento histórico. La atribución correcta debe ___.",
    "connector": "explicitar la fuente consultada y verificar la cita original cuando sea posible.",
    "options": [
      "ocultar la fuente intermediaria para aparentar acceso directo.",
      "presentar la cita como literal sin consultar el documento.",
      "eliminar toda referencia temporal del acontecimiento.",
      "explicitar la fuente consultada y verificar la cita original cuando sea posible."
    ],
    "explanation": "La transparencia documental distingue la cita indirecta del texto primario.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-choice-v1-avanzado-26",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "gap": "Una conclusión declara que todos mejoraron pese a resultados contrarios. Debe cambiarse por ___.",
    "connector": "una conclusión acotada que reconozca los casos sin mejora.",
    "options": [
      "una omisión total de las excepciones observadas.",
      "la idea de que las excepciones prueban la universalidad.",
      "una conclusión acotada que reconozca los casos sin mejora.",
      "una afirmación universal todavía más enfática."
    ],
    "explanation": "Las excepciones impiden sostener un cuantificador absoluto como «todos».",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-choice-v1-avanzado-27",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "gap": "El ensayo descarta una explicación alternativa sin discusión. Conviene ___.",
    "connector": "examinar la hipótesis alternativa con las evidencias disponibles.",
    "options": [
      "introducir otra causa exclusiva sin sustento.",
      "examinar la hipótesis alternativa con las evidencias disponibles.",
      "eliminar cualquier prueba que cuestione la tesis.",
      "repetir la conclusión antes de presentar los datos."
    ],
    "explanation": "La argumentación completa debe reconocer hipótesis pertinentes antes de cerrar.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-choice-v1-avanzado-28",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "gap": "Un metaanálisis combina investigaciones con métodos incompatibles. Debe indicar ___.",
    "connector": "las diferencias metodológicas y los límites de una síntesis conjunta.",
    "options": [
      "las diferencias metodológicas y los límites de una síntesis conjunta.",
      "que toda metodología mide siempre una misma variable.",
      "que el promedio obtenido es exacto y definitivo.",
      "solo la cantidad de artículos sin describir sus diseños."
    ],
    "explanation": "La integración exige advertir heterogeneidad y comparabilidad de los resultados.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-choice-v1-avanzado-29",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "gap": "El reporte presenta una proyección climática como dato del pasado. Debe precisarse ___.",
    "connector": "qué cifras son predicciones condicionadas y cuáles son observaciones.",
    "options": [
      "que todas las proyecciones ya ocurrieron.",
      "que ningún modelo depende de supuestos.",
      "que la incertidumbre es irrelevante cuando hay gráficos.",
      "qué cifras son predicciones condicionadas y cuáles son observaciones."
    ],
    "explanation": "Una predicción condicional no debe confundirse con una medición empírica.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-choice-v1-avanzado-30",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "gap": "Si una tabla cambia de unidad durante la serie, el texto explicativo debe ___.",
    "connector": "identificar la conversión o separar los tramos no comparables.",
    "options": [
      "ocultar los nombres de las unidades usadas.",
      "afirmar que los cambios de unidad nunca alteran comparaciones.",
      "identificar la conversión o separar los tramos no comparables.",
      "sumar directamente todas las cifras originales."
    ],
    "explanation": "La unidad de medida es indispensable para interpretar una serie de datos.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-choice-v1-avanzado-31",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "gap": "El informe reporta una mejora media que oculta retrocesos en subgrupos. Hace falta ___.",
    "connector": "describir también las diferencias de distribución entre subgrupos.",
    "options": [
      "usar la media como única medida de todos los casos.",
      "describir también las diferencias de distribución entre subgrupos.",
      "eliminar los retrocesos para simplificar el cierre.",
      "asegurar que todos mejoraron por igual."
    ],
    "explanation": "Un promedio global no describe necesariamente la heterogeneidad de resultados.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-choice-v1-avanzado-32",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "gap": "Si se retiraron observaciones extremas, el informe debería agregar ___.",
    "connector": "el número de exclusiones, sus criterios y el análisis de sensibilidad pertinente.",
    "options": [
      "el número de exclusiones, sus criterios y el análisis de sensibilidad pertinente.",
      "la afirmación de que eliminarlas garantiza precisión.",
      "la eliminación de toda descripción del procedimiento.",
      "una conclusión que niegue cualquier posible sesgo."
    ],
    "explanation": "Las exclusiones selectivas pueden alterar estimaciones y deben quedar documentadas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-choice-v1-avanzado-33",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "gap": "La reseña usa una metáfora como prueba de un hecho histórico. Conviene ___.",
    "connector": "separar la interpretación figurada de las afirmaciones empíricas verificables.",
    "options": [
      "tratar todos los símbolos literarios como fechas exactas.",
      "eliminar cualquier contraste con documentos históricos.",
      "atribuir certeza histórica a la intensidad de la imagen.",
      "separar la interpretación figurada de las afirmaciones empíricas verificables."
    ],
    "explanation": "El valor expresivo de una metáfora no basta para demostrar un hecho verificable.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-choice-v1-avanzado-34",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "gap": "Si un texto equipara testimonios y experimentos sin distinguir su naturaleza, debe ___.",
    "connector": "identificar qué tipo de evidencia ofrece cada fuente antes de integrarlas.",
    "options": [
      "suprimir la información sobre los diseños de investigación.",
      "atribuir causalidad a cualquier opinión recogida.",
      "identificar qué tipo de evidencia ofrece cada fuente antes de integrarlas.",
      "afirmar que todos los testimonios son pruebas experimentales."
    ],
    "explanation": "Diferenciar fuentes permite evaluar el alcance de cada evidencia.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-choice-v1-avanzado-35",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "gap": "Una política se evalúa solo por beneficios y se omiten los costos. La síntesis debe ___.",
    "connector": "integrar también costos y restricciones pertinentes a la decisión.",
    "options": [
      "asegurar que ningún beneficio puede tener limitaciones.",
      "integrar también costos y restricciones pertinentes a la decisión.",
      "descartar cifras desfavorables para reforzar la recomendación.",
      "describir únicamente aspectos positivos de la intervención."
    ],
    "explanation": "Una evaluación equilibrada incorpora la información relevante para comparar opciones.",
    "reviewStatus": "editorial-draft"
  }
];
