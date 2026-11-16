import type {Level} from "./grammar";
export type ElisionErrorCase={id:string;level:Level;subtopic:"Elisión y adición";flawed:string;correctConnector:string;correctSentence:string;options:[string,string,string,string];explanation:string;reviewStatus:"editorial-draft"};
/** Ejercicios originales de eliminar redundancias, precisar referencias o recuperar información.
 * Los distractores son revisiones incompatibles con el contexto; revisión docente pendiente. */
export const ELISION_ERROR_CASES:ElisionErrorCase[]=[
  {
    "id": "writing-elision-hunter-v1-principiante-0",
    "level": "principiante",
    "subtopic": "Elisión y adición",
    "flawed": "La profesora volvió a repetir las instrucciones por segunda vez.",
    "correctConnector": "La profesora repitió las instrucciones.",
    "correctSentence": "La profesora repitió las instrucciones.",
    "options": [
      "La profesora repitió las instrucciones.",
      "La profesora volvió a repetir las mismas instrucciones.",
      "La profesora repitió de nuevo por segunda vez.",
      "La profesora las instrucciones repitiendo."
    ],
    "explanation": "«Volver a», «repetir» y «por segunda vez» reiteran una misma idea.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-hunter-v1-principiante-1",
    "level": "principiante",
    "subtopic": "Elisión y adición",
    "flawed": "El alumno subió hacia arriba para buscar su cuaderno.",
    "correctConnector": "El alumno subió para buscar su cuaderno.",
    "correctSentence": "El alumno subió para buscar su cuaderno.",
    "options": [
      "El alumno ascendió hacia arriba subiendo.",
      "El alumno elevó hacia arriba subiendo.",
      "El alumno subió en dirección hacia arriba.",
      "El alumno subió para buscar su cuaderno."
    ],
    "explanation": "«Subir» ya implica dirección ascendente y no necesita el complemento redundante.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-hunter-v1-principiante-2",
    "level": "principiante",
    "subtopic": "Elisión y adición",
    "flawed": "Los niños entraron adentro del salón para comenzar la clase.",
    "correctConnector": "Los niños entraron al salón para comenzar la clase.",
    "correctSentence": "Los niños entraron al salón para comenzar la clase.",
    "options": [
      "Los niños entraron en el interior adentro.",
      "Los niños entraron dentro de adentro.",
      "Los niños entraron al salón para comenzar la clase.",
      "Los niños entraron hacia adentro del salón."
    ],
    "explanation": "«Entrar» ya expresa acceso al interior de un espacio.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-hunter-v1-principiante-3",
    "level": "principiante",
    "subtopic": "Elisión y adición",
    "flawed": "La carta terminó con una conclusión final definitiva del mensaje.",
    "correctConnector": "La carta terminó con una conclusión del mensaje.",
    "correctSentence": "La carta terminó con una conclusión del mensaje.",
    "options": [
      "La carta concluyó con una conclusión definitiva final.",
      "La carta terminó con una conclusión del mensaje.",
      "La carta terminó con una conclusión final y definitiva.",
      "La carta terminó con un final conclusivo final."
    ],
    "explanation": "La palabra «conclusión» ya denota el cierre del escrito.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-hunter-v1-principiante-4",
    "level": "principiante",
    "subtopic": "Elisión y adición",
    "flawed": "La biblioteca entregó gratis, sin cobrar, un folleto informativo.",
    "correctConnector": "La biblioteca entregó gratis un folleto informativo.",
    "correctSentence": "La biblioteca entregó gratis un folleto informativo.",
    "options": [
      "La biblioteca entregó gratis un folleto informativo.",
      "La biblioteca entregó gratis sin pagar sin cobrar.",
      "La biblioteca cobró el folleto que regaló.",
      "La biblioteca entregó un folleto de pago gratuito."
    ],
    "explanation": "«Gratis» y «sin cobrar» duplican la misma información.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-hunter-v1-principiante-5",
    "level": "principiante",
    "subtopic": "Elisión y adición",
    "flawed": "La maestra anunció con anticipación previa la fecha de entrega.",
    "correctConnector": "La maestra anunció con anticipación la fecha de entrega.",
    "correctSentence": "La maestra anunció con anticipación la fecha de entrega.",
    "options": [
      "La maestra anunció previamente con anticipación previa.",
      "La maestra anunció después con anticipación previa.",
      "La maestra informó con anterioridad previa anticipada.",
      "La maestra anunció con anticipación la fecha de entrega."
    ],
    "explanation": "«Anticipación previa» es redundante porque ambas formas indican anterioridad.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-hunter-v1-principiante-6",
    "level": "principiante",
    "subtopic": "Elisión y adición",
    "flawed": "Juan se reunió junto con sus compañeros para trabajar en equipo.",
    "correctConnector": "Juan se reunió con sus compañeros para trabajar en equipo.",
    "correctSentence": "Juan se reunió con sus compañeros para trabajar en equipo.",
    "options": [
      "Juan trabajó completamente solo con sus compañeros.",
      "Juan se reunió en soledad junto con todos.",
      "Juan se reunió con sus compañeros para trabajar en equipo.",
      "Juan se reunió juntamente junto con sus compañeros."
    ],
    "explanation": "Basta indicar con quién se reunió; «junto con» añade una repetición prescindible.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-hunter-v1-intermedio-7",
    "level": "intermedio",
    "subtopic": "Elisión y adición",
    "flawed": "La encuesta se aplicó a 60 participantes. Ellos dijeron que era útil.",
    "correctConnector": "La encuesta se aplicó a 60 participantes, quienes consideraron útil el cuestionario.",
    "correctSentence": "La encuesta se aplicó a 60 participantes, quienes consideraron útil el cuestionario.",
    "options": [
      "Se aplicó a 60 participantes y era útil para ellos y para otros.",
      "La encuesta se aplicó a 60 participantes, quienes consideraron útil el cuestionario.",
      "La encuesta se aplicó a 60 participantes y ellos dijeron que eso era útil.",
      "Los participantes consideraron útil aquello de la encuesta sin definirlo."
    ],
    "explanation": "La revisión precisa que el cuestionario es el elemento considerado útil.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-hunter-v1-intermedio-8",
    "level": "intermedio",
    "subtopic": "Elisión y adición",
    "flawed": "Las estudiantes revisaron el cartel. Esto fue complicado.",
    "correctConnector": "Las estudiantes encontraron complicada la revisión del cartel.",
    "correctSentence": "Las estudiantes encontraron complicada la revisión del cartel.",
    "options": [
      "Las estudiantes encontraron complicada la revisión del cartel.",
      "Las estudiantes lo revisaron y eso fue complicado para esto.",
      "Las estudiantes y el cartel fueron complicados en todo.",
      "Fue complicado eso que revisaron las estudiantes."
    ],
    "explanation": "El sustantivo «revisión» identifica con precisión qué actividad fue complicada.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-hunter-v1-intermedio-9",
    "level": "intermedio",
    "subtopic": "Elisión y adición",
    "flawed": "La propuesta mejoró el servicio. La propuesta redujo los tiempos de espera.",
    "correctConnector": "La propuesta mejoró el servicio y redujo los tiempos de espera.",
    "correctSentence": "La propuesta mejoró el servicio y redujo los tiempos de espera.",
    "options": [
      "La propuesta mejoró la propuesta del servicio propuesto.",
      "El servicio fue mejorado mejor por la propuesta propuesta.",
      "La propuesta fue propuesta por el servicio.",
      "La propuesta mejoró el servicio y redujo los tiempos de espera."
    ],
    "explanation": "Coordinar los predicados evita repetir el sujeto sin perder dos hechos.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-hunter-v1-intermedio-10",
    "level": "intermedio",
    "subtopic": "Elisión y adición",
    "flawed": "El informe describe las entrevistas y describe los gráficos de las entrevistas.",
    "correctConnector": "El informe describe las entrevistas y sus gráficos.",
    "correctSentence": "El informe describe las entrevistas y sus gráficos.",
    "options": [
      "El informe hace descripción de lo descrito en entrevistas.",
      "Los gráficos describen un informe que describe entrevistas.",
      "El informe describe las entrevistas y sus gráficos.",
      "El informe describe entrevistas y vuelve a describir entrevistas."
    ],
    "explanation": "El pronombre posesivo mantiene el referente y evita repeticiones.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-hunter-v1-intermedio-11",
    "level": "intermedio",
    "subtopic": "Elisión y adición",
    "flawed": "Se decidió posponer la visita para más adelante en una fecha posterior.",
    "correctConnector": "Se decidió posponer la visita.",
    "correctSentence": "Se decidió posponer la visita.",
    "options": [
      "Se decidió visitar antes después a futuro.",
      "Se decidió posponer la visita.",
      "Se decidió posponer para después en fecha futura posterior.",
      "La visita fue pospuesta con anterioridad previa posterior."
    ],
    "explanation": "El verbo «posponer» ya indica postergación hacia una fecha posterior.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-hunter-v1-intermedio-12",
    "level": "intermedio",
    "subtopic": "Elisión y adición",
    "flawed": "La carta menciona un problema. No explica cuál es el problema.",
    "correctConnector": "La carta menciona un problema, pero no especifica en qué consiste.",
    "correctSentence": "La carta menciona un problema, pero no especifica en qué consiste.",
    "options": [
      "La carta menciona un problema, pero no especifica en qué consiste.",
      "La carta menciona un problema problemático sin problema.",
      "La carta no explica cuál problema problemático menciona.",
      "La carta menciona el problema que menciona sin mencionarlo."
    ],
    "explanation": "Una referencia precisa permite evitar la repetición del sustantivo.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-hunter-v1-intermedio-13",
    "level": "intermedio",
    "subtopic": "Elisión y adición",
    "flawed": "El equipo presentó resultados significativos, pero no indicó qué cambió.",
    "correctConnector": "El equipo informó un cambio, sin precisar la variable ni su magnitud.",
    "correctSentence": "El equipo informó un cambio, sin precisar la variable ni su magnitud.",
    "options": [
      "El equipo demostró un cambio estadísticamente significativo sin datos.",
      "Los resultados fueron importantes y significativos para todos.",
      "Los resultados se demostraron plenamente por haber sido presentados.",
      "El equipo informó un cambio, sin precisar la variable ni su magnitud."
    ],
    "explanation": "Se sustituye la certeza no documentada por una descripción limitada.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-hunter-v1-intermedio-14",
    "level": "intermedio",
    "subtopic": "Elisión y adición",
    "flawed": "La evaluación señaló que los dos grupos eran diferentes, pero no explicó en qué.",
    "correctConnector": "La evaluación señaló diferencias entre grupos sin identificar los indicadores comparados.",
    "correctSentence": "La evaluación señaló diferencias entre grupos sin identificar los indicadores comparados.",
    "options": [
      "La evaluación señaló diferencias diferentes y muy distintas.",
      "No se comparó nada aunque se obtuvieron todos los resultados.",
      "La evaluación señaló diferencias entre grupos sin identificar los indicadores comparados.",
      "La evaluación demostró que los grupos eran completamente distintos en todo."
    ],
    "explanation": "Para interpretar una diferencia es necesario conocer qué se comparó.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-hunter-v1-intermedio-15",
    "level": "intermedio",
    "subtopic": "Elisión y adición",
    "flawed": "La reseña cita un documento. La reseña también cita una entrevista.",
    "correctConnector": "La reseña cita un documento y una entrevista.",
    "correctSentence": "La reseña cita un documento y una entrevista.",
    "options": [
      "La reseña cita el documento y lo cita además en otra reseña.",
      "La reseña cita un documento y una entrevista.",
      "La reseña cita una cita y también vuelve a citar una cita.",
      "La entrevista cita una reseña del mismo documento desconocido."
    ],
    "explanation": "Se coordinan complementos de un mismo verbo sin repetir el sujeto.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-hunter-v1-intermedio-16",
    "level": "intermedio",
    "subtopic": "Elisión y adición",
    "flawed": "Se anunció que habría un aumento importante. No se indicó de qué aumentaría.",
    "correctConnector": "Se anunció un aumento, pero no se identificó la variable afectada.",
    "correctSentence": "Se anunció un aumento, pero no se identificó la variable afectada.",
    "options": [
      "Se anunció un aumento, pero no se identificó la variable afectada.",
      "Se anunció un aumento aumentado muy importante para todo.",
      "Se anunció que todo aumentaría en todos los ámbitos.",
      "No se anunció nada y todas las variables aumentaron."
    ],
    "explanation": "La revisión explicita la información omitida necesaria para comprender el dato.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-hunter-v1-intermedio-17",
    "level": "intermedio",
    "subtopic": "Elisión y adición",
    "flawed": "Las instrucciones indican revisar la fuente y luego revisar su procedencia.",
    "correctConnector": "Las instrucciones indican revisar la fuente y comprobar su procedencia.",
    "correctSentence": "Las instrucciones indican revisar la fuente y comprobar su procedencia.",
    "options": [
      "Las instrucciones indican revisar la fuente revisando la fuente de revisión.",
      "Las instrucciones permiten omitir toda información de procedencia.",
      "La fuente debe revisarse sin ninguna comprobación documental.",
      "Las instrucciones indican revisar la fuente y comprobar su procedencia."
    ],
    "explanation": "El segundo verbo concreta una operación diferente de la revisión inicial.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-hunter-v1-intermedio-18",
    "level": "intermedio",
    "subtopic": "Elisión y adición",
    "flawed": "El alumnado asistió a una charla informativa que ofrecía información.",
    "correctConnector": "El alumnado asistió a una charla sobre los temas previstos.",
    "correctSentence": "El alumnado asistió a una charla sobre los temas previstos.",
    "options": [
      "La charla fue informativa porque informaba información.",
      "El alumnado no asistió a la charla que asistió.",
      "El alumnado asistió a una charla sobre los temas previstos.",
      "El alumnado recibió información informativa durante la charla informativa."
    ],
    "explanation": "Se elimina la repetición léxica y se mantiene la referencia al encuentro.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-hunter-v1-avanzado-19",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "flawed": "El artículo concluye que la política tuvo éxito. No define qué se entiende por éxito.",
    "correctConnector": "El artículo sostiene que la política tuvo éxito, pero no precisa el indicador empleado.",
    "correctSentence": "El artículo sostiene que la política tuvo éxito, pero no precisa el indicador empleado.",
    "options": [
      "El artículo elimina el concepto de éxito y lo confirma.",
      "El artículo sostiene que la política tuvo éxito, pero no precisa el indicador empleado.",
      "El artículo demuestra el éxito universal aunque no tenga indicadores.",
      "La política fue exitosa por resultar exitosa para todos."
    ],
    "explanation": "Se conserva la afirmación del texto y se señala la variable no definida.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-hunter-v1-avanzado-20",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "flawed": "Se examinó una muestra. La muestra era voluntaria. Los resultados fueron generalizados.",
    "correctConnector": "Se examinaron voluntarios; la generalización de los resultados requiere cautela.",
    "correctSentence": "Se examinaron voluntarios; la generalización de los resultados requiere cautela.",
    "options": [
      "Se examinaron voluntarios; la generalización de los resultados requiere cautela.",
      "La muestra voluntaria demuestra representatividad estadística de todos.",
      "Se generalizó totalmente porque hubo una muestra voluntaria.",
      "La muestra fue una muestra de muestras y por ello representa a todos."
    ],
    "explanation": "La integración evita repetir «muestra» y advierte sobre selección voluntaria.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-hunter-v1-avanzado-21",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "flawed": "La autora afirma que el resultado es definitivo; admite, además, que faltan datos.",
    "correctConnector": "La autora presenta el resultado como provisional, pues reconoce que faltan datos.",
    "correctSentence": "La autora presenta el resultado como provisional, pues reconoce que faltan datos.",
    "options": [
      "La autora confirma resultados definitivos porque faltan todos los datos.",
      "Los datos faltantes prueban que la conclusión es universal y exacta.",
      "El resultado es definitivo de modo provisional absolutamente definitivo.",
      "La autora presenta el resultado como provisional, pues reconoce que faltan datos."
    ],
    "explanation": "La certidumbre en el cierre debe concordar con las limitaciones reconocidas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-hunter-v1-avanzado-22",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "flawed": "Un informe distingue dos fuentes, aunque no indica su procedencia ni fecha.",
    "correctConnector": "El informe contrasta dos fuentes sin identificar todavía su procedencia y fecha.",
    "correctSentence": "El informe contrasta dos fuentes sin identificar todavía su procedencia y fecha.",
    "options": [
      "Las fuentes no requieren fecha, autoría ni comprobación alguna.",
      "La comparación concluye que la fuente más reciente siempre es falsa.",
      "El informe contrasta dos fuentes sin identificar todavía su procedencia y fecha.",
      "El informe demuestra que ambas fuentes son idénticas por definición."
    ],
    "explanation": "La nueva redacción reconoce de forma explícita qué datos de contexto faltan.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-hunter-v1-avanzado-23",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "flawed": "El resumen combina tasas y proporciones y no aclara si comparten denominador.",
    "correctConnector": "El resumen integra medidas que deben distinguirse hasta verificar sus denominadores.",
    "correctSentence": "El resumen integra medidas que deben distinguirse hasta verificar sus denominadores.",
    "options": [
      "Todas las medidas se unifican porque están expresadas como números.",
      "El resumen integra medidas que deben distinguirse hasta verificar sus denominadores.",
      "Las tasas y proporciones son medidas idénticas en todo contexto.",
      "El resumen suma cualquier cifra sin considerar su base."
    ],
    "explanation": "La comparabilidad requiere especificar denominadores antes de integrar cifras.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-hunter-v1-avanzado-24",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "flawed": "Se sostiene que todos mejoraron. El documento registra participantes que empeoraron.",
    "correctConnector": "La conclusión debe limitarse porque algunos participantes no mejoraron.",
    "correctSentence": "La conclusión debe limitarse porque algunos participantes no mejoraron.",
    "options": [
      "La conclusión debe limitarse porque algunos participantes no mejoraron.",
      "La conclusión universal queda demostrada precisamente por las excepciones.",
      "Todos mejoraron sin excepción aunque varios empeoraron.",
      "Se confirma que nadie cambió, pues todos mejoraron."
    ],
    "explanation": "Las excepciones invalidan el cuantificador universal empleado en la conclusión.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-hunter-v1-avanzado-25",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "flawed": "La sección presenta el método elegido. La sección no explica por qué fue elegido.",
    "correctConnector": "La sección describe el método, pero omite justificar su selección.",
    "correctSentence": "La sección describe el método, pero omite justificar su selección.",
    "options": [
      "El método es válido por haber sido elegido sin más información.",
      "La elección del método demuestra que es mejor para todos.",
      "La sección repite el método elegido y por eso queda justificado.",
      "La sección describe el método, pero omite justificar su selección."
    ],
    "explanation": "Unir las ideas evita redundancia y señala la justificación que aún falta.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-hunter-v1-avanzado-26",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "flawed": "El texto atribuye el cambio al programa, sin mencionar otros cambios simultáneos.",
    "correctConnector": "El texto propone una explicación causal que necesita considerar factores simultáneos.",
    "correctSentence": "El texto propone una explicación causal que necesita considerar factores simultáneos.",
    "options": [
      "La atribución es definitiva por ocurrir los eventos juntos.",
      "El programa produjo todos los cambios por definición conceptual.",
      "El texto propone una explicación causal que necesita considerar factores simultáneos.",
      "Los cambios simultáneos garantizan la causalidad única del programa."
    ],
    "explanation": "La redacción evita una causalidad excesiva al reconocer factores alternativos.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-hunter-v1-avanzado-27",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "flawed": "El informe documenta variaciones de precios. El informe documenta variaciones de consumo.",
    "correctConnector": "El informe distingue variaciones de precios y de consumo.",
    "correctSentence": "El informe distingue variaciones de precios y de consumo.",
    "options": [
      "La información documentada puede omitirse porque son dos variables.",
      "El informe distingue variaciones de precios y de consumo.",
      "El informe suma precios y cantidades como si fueran equivalentes.",
      "Las variaciones del gasto son siempre idénticas a las del consumo."
    ],
    "explanation": "La coordinación permite distinguir indicadores sin repetir innecesariamente el sujeto.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-hunter-v1-avanzado-28",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "flawed": "Las fuentes no coinciden sobre la fecha. El texto omite indicar esa discrepancia.",
    "correctConnector": "El texto debe señalar la discrepancia de fechas entre las fuentes consultadas.",
    "correctSentence": "El texto debe señalar la discrepancia de fechas entre las fuentes consultadas.",
    "options": [
      "El texto debe señalar la discrepancia de fechas entre las fuentes consultadas.",
      "Se descarta toda fuente discordante sin revisión de contexto.",
      "Se elige la fecha que resulte más conveniente para la conclusión.",
      "Las fechas no coinciden y por eso ambas son automáticamente falsas."
    ],
    "explanation": "No puede omitirse una discrepancia relevante para la interpretación histórica.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-hunter-v1-avanzado-29",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "flawed": "El estudio reporta una mejora media, pero no informa sobre los subgrupos.",
    "correctConnector": "El estudio comunica la mejora media sin describir su distribución por subgrupos.",
    "correctSentence": "El estudio comunica la mejora media sin describir su distribución por subgrupos.",
    "options": [
      "El estudio demuestra una mejora uniforme para todos los participantes.",
      "La media garantiza que cada subgrupo presentó idénticos resultados.",
      "Los datos de distribución son innecesarios porque existe un promedio.",
      "El estudio comunica la mejora media sin describir su distribución por subgrupos."
    ],
    "explanation": "La media no representa necesariamente los resultados de todos los grupos.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-hunter-v1-avanzado-30",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "flawed": "La revisión cita un documento original, aunque solo consultó una reseña posterior.",
    "correctConnector": "La revisión debe identificar la reseña consultada y comprobar la fuente primaria antes de atribuirle citas.",
    "correctSentence": "La revisión debe identificar la reseña consultada y comprobar la fuente primaria antes de atribuirle citas.",
    "options": [
      "Una reseña tardía equivale a cualquier documento primario sin verificación.",
      "La revisión debe ocultar el intermediario para presentar mayor certeza.",
      "La revisión debe identificar la reseña consultada y comprobar la fuente primaria antes de atribuirle citas.",
      "La revisión puede asegurar una cita literal sin consultar el documento."
    ],
    "explanation": "La atribución documental exige declarar la fuente intermediaria consultada.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-hunter-v1-avanzado-31",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "flawed": "El reporte cambia la definición del indicador, pero presenta la serie como continua.",
    "correctConnector": "El reporte debe advertir la redefinición y evaluar la comparabilidad de los períodos.",
    "correctSentence": "El reporte debe advertir la redefinición y evaluar la comparabilidad de los períodos.",
    "options": [
      "La comparación no necesita documentar definiciones ni fechas.",
      "El reporte debe advertir la redefinición y evaluar la comparabilidad de los períodos.",
      "La redefinición garantiza que todas las cifras siguen siendo iguales.",
      "La serie siempre es comparable aunque cambie qué se mide."
    ],
    "explanation": "Un cambio conceptual puede interrumpir una serie y requiere explicación.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-hunter-v1-avanzado-32",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "flawed": "El ensayo introduce una explicación alternativa, pero la conclusión la omite sin discutirla.",
    "correctConnector": "La conclusión debe valorar también la explicación alternativa presentada.",
    "correctSentence": "La conclusión debe valorar también la explicación alternativa presentada.",
    "options": [
      "La conclusión debe valorar también la explicación alternativa presentada.",
      "La conclusión es concluyente por ignorar toda hipótesis distinta.",
      "La explicación alternativa debe borrarse sin dejar constancia.",
      "La omisión demuestra que solo existe una causa viable."
    ],
    "explanation": "El cierre argumentativo debe integrar las alternativas discutidas previamente.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-hunter-v1-avanzado-33",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "flawed": "El análisis elimina casos extremos sin mencionar cuántos ni con qué criterio.",
    "correctConnector": "El análisis debe justificar la exclusión y documentar la cantidad de casos retirados.",
    "correctSentence": "El análisis debe justificar la exclusión y documentar la cantidad de casos retirados.",
    "options": [
      "La eliminación de datos siempre mejora la validez por sí sola.",
      "Los casos extremos se borran y los resultados quedan certificados.",
      "No hace falta explicar qué datos se eliminaron si el promedio subió.",
      "El análisis debe justificar la exclusión y documentar la cantidad de casos retirados."
    ],
    "explanation": "La exclusión selectiva puede alterar los resultados y requiere transparencia.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-hunter-v1-avanzado-34",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "flawed": "El texto presenta una proyección como dato observado, sin aclarar sus supuestos.",
    "correctConnector": "El texto debe distinguir la predicción de los datos registrados y declarar sus supuestos.",
    "correctSentence": "El texto debe distinguir la predicción de los datos registrados y declarar sus supuestos.",
    "options": [
      "El modelo predice con certeza absoluta sin depender de condiciones.",
      "Los supuestos pueden omitirse para presentar la cifra como segura.",
      "El texto debe distinguir la predicción de los datos registrados y declarar sus supuestos.",
      "La proyección es una observación histórica porque aparece en una tabla."
    ],
    "explanation": "La información predictiva no es idéntica a una observación empírica.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-elision-hunter-v1-avanzado-35",
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "flawed": "El informe declara equivalentes dos escalas distintas sin explicar conversión alguna.",
    "correctConnector": "El informe necesita justificar la equivalencia o presentar las escalas por separado.",
    "correctSentence": "El informe necesita justificar la equivalencia o presentar las escalas por separado.",
    "options": [
      "Toda conversión es automática sin indicar su procedimiento.",
      "El informe necesita justificar la equivalencia o presentar las escalas por separado.",
      "Las escalas son iguales porque ambas contienen números comparables.",
      "Las cifras pueden sumarse sin examinar sus unidades de medida."
    ],
    "explanation": "La equivalencia de escalas debe comprobarse antes de sintetizar resultados.",
    "reviewStatus": "editorial-draft"
  }
];
