import type {Level} from "./grammar";
export type ConnectorErrorCase={
 id:string;level:Level;subtopic:"Conectores";flawed:string;errorType:"Conector inadecuado";correction:string;
 correctSentence:string;correctConnector:string;options:[string,string,string,string];explanation:string;
 reviewStatus:"editorial-draft";
};
/** 36 casos originales de detección/corrección de enlaces incorrectos, distintos de
 * los cuestionarios. Corrección editorial especializada todavía pendiente.
 */
export const CONNECTOR_ERROR_CASES:ConnectorErrorCase[]=[
  {
    "id": "writing-conectores-hunter-v2-principiante-0",
    "level": "principiante",
    "subtopic": "Conectores",
    "flawed": "La biblioteca cerró temprano; «sin embargo», los visitantes regresaron a casa.",
    "errorType": "Conector inadecuado",
    "correction": "El regreso fue consecuencia del cierre temprano.",
    "correctSentence": "La biblioteca cerró temprano; por eso, los visitantes regresaron a casa.",
    "correctConnector": "por eso",
    "options": [
      "por eso",
      "sin embargo",
      "por tanto",
      "porque"
    ],
    "explanation": "El regreso fue consecuencia del cierre temprano.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-hunter-v2-principiante-1",
    "level": "principiante",
    "subtopic": "Conectores",
    "flawed": "Ana llevó lápices; «porque», también trajo borradores.",
    "errorType": "Conector inadecuado",
    "correction": "La segunda proposición añade un material y no justifica el primero.",
    "correctSentence": "Ana llevó lápices; además, también trajo borradores.",
    "correctConnector": "además",
    "options": [
      "porque",
      "sin embargo",
      "por tanto",
      "además"
    ],
    "explanation": "La segunda proposición añade un material y no justifica el primero.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-hunter-v2-principiante-2",
    "level": "principiante",
    "subtopic": "Conectores",
    "flawed": "La ventana estaba abierta; «por tanto», nadie sintió frío.",
    "errorType": "Conector inadecuado",
    "correction": "La ausencia de frío contrasta con la ventana abierta, no se deduce de ella.",
    "correctSentence": "La ventana estaba abierta; sin embargo, nadie sintió frío.",
    "correctConnector": "sin embargo",
    "options": [
      "porque",
      "además",
      "sin embargo",
      "por tanto"
    ],
    "explanation": "La ausencia de frío contrasta con la ventana abierta, no se deduce de ella.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-hunter-v2-principiante-3",
    "level": "principiante",
    "subtopic": "Conectores",
    "flawed": "El grupo no jugó afuera; «además», estaba lloviendo.",
    "errorType": "Conector inadecuado",
    "correction": "La lluvia es la causa de no jugar al aire libre.",
    "correctSentence": "El grupo no jugó afuera; porque, estaba lloviendo.",
    "correctConnector": "porque",
    "options": [
      "por tanto",
      "porque",
      "además",
      "sin embargo"
    ],
    "explanation": "La lluvia es la causa de no jugar al aire libre.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-hunter-v2-principiante-4",
    "level": "principiante",
    "subtopic": "Conectores",
    "flawed": "Primero prepararon la masa; «sin embargo», la hornearon.",
    "errorType": "Conector inadecuado",
    "correction": "Preparar y hornear son acciones sucesivas, sin contraste.",
    "correctSentence": "Primero prepararon la masa; después, la hornearon.",
    "correctConnector": "después",
    "options": [
      "después",
      "sin embargo",
      "por tanto",
      "porque"
    ],
    "explanation": "Preparar y hornear son acciones sucesivas, sin contraste.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-hunter-v2-principiante-5",
    "level": "principiante",
    "subtopic": "Conectores",
    "flawed": "María estudió todos los días; «en cambio», también resolvió ejercicios.",
    "errorType": "Conector inadecuado",
    "correction": "Resolver ejercicios añade otra actividad de estudio.",
    "correctSentence": "María estudió todos los días; además, también resolvió ejercicios.",
    "correctConnector": "además",
    "options": [
      "en cambio",
      "sin embargo",
      "por tanto",
      "además"
    ],
    "explanation": "Resolver ejercicios añade otra actividad de estudio.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-hunter-v2-principiante-6",
    "level": "principiante",
    "subtopic": "Conectores",
    "flawed": "El aula quedó sin luz; «y», suspendieron la proyección por esa razón.",
    "errorType": "Conector inadecuado",
    "correction": "La proyección se suspendió como consecuencia de perder electricidad.",
    "correctSentence": "El aula quedó sin luz; por eso, suspendieron la proyección por esa razón.",
    "correctConnector": "por eso",
    "options": [
      "sin embargo",
      "por tanto",
      "por eso",
      "y"
    ],
    "explanation": "La proyección se suspendió como consecuencia de perder electricidad.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-hunter-v2-intermedio-7",
    "level": "intermedio",
    "subtopic": "Conectores",
    "flawed": "Los visitantes aumentaron un 20 %; «porque», fue necesario habilitar otra entrada.",
    "errorType": "Conector inadecuado",
    "correction": "La habilitación de otra entrada se deriva del aumento de visitantes.",
    "correctSentence": "Los visitantes aumentaron un 20 %; por tanto, fue necesario habilitar otra entrada.",
    "correctConnector": "por tanto",
    "options": [
      "además",
      "por tanto",
      "porque",
      "sin embargo"
    ],
    "explanation": "La habilitación de otra entrada se deriva del aumento de visitantes.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-hunter-v2-intermedio-8",
    "level": "intermedio",
    "subtopic": "Conectores",
    "flawed": "La investigación fue cuidadosa; «por consiguiente», no se eliminaron todos los sesgos.",
    "errorType": "Conector inadecuado",
    "correction": "A pesar de los cuidados, aún quedaron posibles sesgos.",
    "correctSentence": "La investigación fue cuidadosa; sin embargo, no se eliminaron todos los sesgos.",
    "correctConnector": "sin embargo",
    "options": [
      "sin embargo",
      "por consiguiente",
      "por tanto",
      "porque"
    ],
    "explanation": "A pesar de los cuidados, aún quedaron posibles sesgos.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-hunter-v2-intermedio-9",
    "level": "intermedio",
    "subtopic": "Conectores",
    "flawed": "Las dos encuestas usaron escalas diferentes; «además», no es válido comparar sus promedios directamente.",
    "errorType": "Conector inadecuado",
    "correction": "El uso de escalas distintas explica la cautela al comparar promedios.",
    "correctSentence": "Las dos encuestas usaron escalas diferentes; por ello, no es válido comparar sus promedios directamente.",
    "correctConnector": "por ello",
    "options": [
      "además",
      "sin embargo",
      "por tanto",
      "por ello"
    ],
    "explanation": "El uso de escalas distintas explica la cautela al comparar promedios.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-hunter-v2-intermedio-10",
    "level": "intermedio",
    "subtopic": "Conectores",
    "flawed": "El equipo revisó las entrevistas; «aunque», clasificó después las respuestas.",
    "errorType": "Conector inadecuado",
    "correction": "La clasificación sucede temporalmente a la revisión.",
    "correctSentence": "El equipo revisó las entrevistas; luego, clasificó después las respuestas.",
    "correctConnector": "luego",
    "options": [
      "sin embargo",
      "por tanto",
      "luego",
      "aunque"
    ],
    "explanation": "La clasificación sucede temporalmente a la revisión.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-hunter-v2-intermedio-11",
    "level": "intermedio",
    "subtopic": "Conectores",
    "flawed": "Se registraron varios errores; «en cambio», se decidió repetir el procedimiento para corregirlos.",
    "errorType": "Conector inadecuado",
    "correction": "Repetir el proceso es una respuesta a los errores encontrados.",
    "correctSentence": "Se registraron varios errores; por eso, se decidió repetir el procedimiento para corregirlos.",
    "correctConnector": "por eso",
    "options": [
      "por tanto",
      "por eso",
      "en cambio",
      "sin embargo"
    ],
    "explanation": "Repetir el proceso es una respuesta a los errores encontrados.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-hunter-v2-intermedio-12",
    "level": "intermedio",
    "subtopic": "Conectores",
    "flawed": "El programa alcanzó sus metas; «por tanto», todavía requiere una evaluación independiente.",
    "errorType": "Conector inadecuado",
    "correction": "La necesidad de evaluación permanece pese a las metas alcanzadas.",
    "correctSentence": "El programa alcanzó sus metas; no obstante, todavía requiere una evaluación independiente.",
    "correctConnector": "no obstante",
    "options": [
      "no obstante",
      "por tanto",
      "sin embargo",
      "porque"
    ],
    "explanation": "La necesidad de evaluación permanece pese a las metas alcanzadas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-hunter-v2-intermedio-13",
    "level": "intermedio",
    "subtopic": "Conectores",
    "flawed": "Los datos cubren solo una semana; «sin embargo», no permiten establecer una tendencia anual.",
    "errorType": "Conector inadecuado",
    "correction": "La corta duración limita la inferencia anual.",
    "correctSentence": "Los datos cubren solo una semana; por tanto, no permiten establecer una tendencia anual.",
    "correctConnector": "por tanto",
    "options": [
      "sin embargo",
      "porque",
      "además",
      "por tanto"
    ],
    "explanation": "La corta duración limita la inferencia anual.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-hunter-v2-intermedio-14",
    "level": "intermedio",
    "subtopic": "Conectores",
    "flawed": "La escuela amplió su biblioteca; «porque», incorporó también materiales digitales.",
    "errorType": "Conector inadecuado",
    "correction": "Se enuncian dos mejoras adicionales, no una causa.",
    "correctSentence": "La escuela amplió su biblioteca; además, incorporó también materiales digitales.",
    "correctConnector": "además",
    "options": [
      "sin embargo",
      "por tanto",
      "además",
      "porque"
    ],
    "explanation": "Se enuncian dos mejoras adicionales, no una causa.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-hunter-v2-intermedio-15",
    "level": "intermedio",
    "subtopic": "Conectores",
    "flawed": "La muestra fue elegida por conveniencia; «además», los resultados no pueden generalizarse sin cautela.",
    "errorType": "Conector inadecuado",
    "correction": "El sesgo potencial del muestreo explica la cautela.",
    "correctSentence": "La muestra fue elegida por conveniencia; por consiguiente, los resultados no pueden generalizarse sin cautela.",
    "correctConnector": "por consiguiente",
    "options": [
      "por tanto",
      "por consiguiente",
      "además",
      "sin embargo"
    ],
    "explanation": "El sesgo potencial del muestreo explica la cautela.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-hunter-v2-intermedio-16",
    "level": "intermedio",
    "subtopic": "Conectores",
    "flawed": "Las dos versiones coinciden en la fecha; «por eso», discrepan en la identidad del testigo.",
    "errorType": "Conector inadecuado",
    "correction": "Coincidir en fecha contrasta con discrepar en la identidad.",
    "correctSentence": "Las dos versiones coinciden en la fecha; sin embargo, discrepan en la identidad del testigo.",
    "correctConnector": "sin embargo",
    "options": [
      "sin embargo",
      "por eso",
      "por tanto",
      "porque"
    ],
    "explanation": "Coincidir en fecha contrasta con discrepar en la identidad.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-hunter-v2-intermedio-17",
    "level": "intermedio",
    "subtopic": "Conectores",
    "flawed": "Una zona registró más lluvia; «porque», el caudal aumentó durante esos días.",
    "errorType": "Conector inadecuado",
    "correction": "El caudal se presenta como efecto asociado a la lluvia.",
    "correctSentence": "Una zona registró más lluvia; por eso, el caudal aumentó durante esos días.",
    "correctConnector": "por eso",
    "options": [
      "porque",
      "sin embargo",
      "por tanto",
      "por eso"
    ],
    "explanation": "El caudal se presenta como efecto asociado a la lluvia.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-hunter-v2-intermedio-18",
    "level": "intermedio",
    "subtopic": "Conectores",
    "flawed": "El documento define su propósito; «sin embargo», describe también las fuentes consultadas.",
    "errorType": "Conector inadecuado",
    "correction": "Describir las fuentes agrega información sobre el documento.",
    "correctSentence": "El documento define su propósito; además, describe también las fuentes consultadas.",
    "correctConnector": "además",
    "options": [
      "por tanto",
      "porque",
      "además",
      "sin embargo"
    ],
    "explanation": "Describir las fuentes agrega información sobre el documento.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-hunter-v2-avanzado-19",
    "level": "avanzado",
    "subtopic": "Conectores",
    "flawed": "El estudio no controló la edad; «además», no es posible aislar su influencia sobre los resultados.",
    "errorType": "Conector inadecuado",
    "correction": "La falta de control impide aislar la influencia de la edad.",
    "correctSentence": "El estudio no controló la edad; por ello, no es posible aislar su influencia sobre los resultados.",
    "correctConnector": "por ello",
    "options": [
      "por tanto",
      "por ello",
      "además",
      "sin embargo"
    ],
    "explanation": "La falta de control impide aislar la influencia de la edad.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-hunter-v2-avanzado-20",
    "level": "avanzado",
    "subtopic": "Conectores",
    "flawed": "Las medias de dos grupos parecen similares; «por eso», las distribuciones muestran diferencias importantes.",
    "errorType": "Conector inadecuado",
    "correction": "La diferencia de distribuciones contrasta con las medias similares.",
    "correctSentence": "Las medias de dos grupos parecen similares; sin embargo, las distribuciones muestran diferencias importantes.",
    "correctConnector": "sin embargo",
    "options": [
      "sin embargo",
      "por eso",
      "por tanto",
      "porque"
    ],
    "explanation": "La diferencia de distribuciones contrasta con las medias similares.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-hunter-v2-avanzado-21",
    "level": "avanzado",
    "subtopic": "Conectores",
    "flawed": "La hipótesis concuerda con la evidencia presentada; «por tanto», aún necesita replicación independiente.",
    "errorType": "Conector inadecuado",
    "correction": "La necesidad de replicación persiste pese al respaldo inicial.",
    "correctSentence": "La hipótesis concuerda con la evidencia presentada; no obstante, aún necesita replicación independiente.",
    "correctConnector": "no obstante",
    "options": [
      "por tanto",
      "sin embargo",
      "porque",
      "no obstante"
    ],
    "explanation": "La necesidad de replicación persiste pese al respaldo inicial.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-hunter-v2-avanzado-22",
    "level": "avanzado",
    "subtopic": "Conectores",
    "flawed": "El estudio trabajó con datos retrospectivos; «porque», no asignó intervenciones a los participantes.",
    "errorType": "Conector inadecuado",
    "correction": "Se agregan dos características del estudio sin justificar causalidad entre ellas.",
    "correctSentence": "El estudio trabajó con datos retrospectivos; y, no asignó intervenciones a los participantes.",
    "correctConnector": "y",
    "options": [
      "sin embargo",
      "por tanto",
      "y",
      "porque"
    ],
    "explanation": "Se agregan dos características del estudio sin justificar causalidad entre ellas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-hunter-v2-avanzado-23",
    "level": "avanzado",
    "subtopic": "Conectores",
    "flawed": "El instrumento cambió a mitad del período; «sin embargo», la comparación exige normalizar mediciones.",
    "errorType": "Conector inadecuado",
    "correction": "El cambio de instrumento motiva armonizar las mediciones.",
    "correctSentence": "El instrumento cambió a mitad del período; por tanto, la comparación exige normalizar mediciones.",
    "correctConnector": "por tanto",
    "options": [
      "además",
      "por tanto",
      "sin embargo",
      "porque"
    ],
    "explanation": "El cambio de instrumento motiva armonizar las mediciones.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-hunter-v2-avanzado-24",
    "level": "avanzado",
    "subtopic": "Conectores",
    "flawed": "El autor distingue opinión y evidencia; «por ello», algunas afirmaciones siguen siendo interpretaciones.",
    "errorType": "Conector inadecuado",
    "correction": "Las interpretaciones persisten pese a la distinción metodológica.",
    "correctSentence": "El autor distingue opinión y evidencia; sin embargo, algunas afirmaciones siguen siendo interpretaciones.",
    "correctConnector": "sin embargo",
    "options": [
      "sin embargo",
      "por ello",
      "por tanto",
      "porque"
    ],
    "explanation": "Las interpretaciones persisten pese a la distinción metodológica.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-hunter-v2-avanzado-25",
    "level": "avanzado",
    "subtopic": "Conectores",
    "flawed": "El muestreo incorporó más regiones; «por eso», continuaron faltando grupos rurales.",
    "errorType": "Conector inadecuado",
    "correction": "La ausencia de sectores rurales contrasta con la ampliación territorial.",
    "correctSentence": "El muestreo incorporó más regiones; no obstante, continuaron faltando grupos rurales.",
    "correctConnector": "no obstante",
    "options": [
      "por eso",
      "sin embargo",
      "por tanto",
      "no obstante"
    ],
    "explanation": "La ausencia de sectores rurales contrasta con la ampliación territorial.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-hunter-v2-avanzado-26",
    "level": "avanzado",
    "subtopic": "Conectores",
    "flawed": "La correlación observada es alta; «por consiguiente», no puede afirmarse una causa exclusiva.",
    "errorType": "Conector inadecuado",
    "correction": "Una correlación alta no basta para atribuir una causa exclusiva.",
    "correctSentence": "La correlación observada es alta; sin embargo, no puede afirmarse una causa exclusiva.",
    "correctConnector": "sin embargo",
    "options": [
      "por tanto",
      "porque",
      "sin embargo",
      "por consiguiente"
    ],
    "explanation": "Una correlación alta no basta para atribuir una causa exclusiva.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-hunter-v2-avanzado-27",
    "level": "avanzado",
    "subtopic": "Conectores",
    "flawed": "Se eliminaron observaciones extremas sin criterio; «además», los resultados pueden quedar sesgados.",
    "errorType": "Conector inadecuado",
    "correction": "La exclusión arbitraria puede distorsionar los resultados.",
    "correctSentence": "Se eliminaron observaciones extremas sin criterio; por tanto, los resultados pueden quedar sesgados.",
    "correctConnector": "por tanto",
    "options": [
      "porque",
      "por tanto",
      "además",
      "sin embargo"
    ],
    "explanation": "La exclusión arbitraria puede distorsionar los resultados.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-hunter-v2-avanzado-28",
    "level": "avanzado",
    "subtopic": "Conectores",
    "flawed": "La fuente institucional omitió testimonios locales; «sin embargo», es necesario contrastar relatos alternativos.",
    "errorType": "Conector inadecuado",
    "correction": "La omisión motiva buscar otras perspectivas documentales.",
    "correctSentence": "La fuente institucional omitió testimonios locales; por ello, es necesario contrastar relatos alternativos.",
    "correctConnector": "por ello",
    "options": [
      "por ello",
      "sin embargo",
      "por tanto",
      "porque"
    ],
    "explanation": "La omisión motiva buscar otras perspectivas documentales.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-hunter-v2-avanzado-29",
    "level": "avanzado",
    "subtopic": "Conectores",
    "flawed": "El análisis incluyó datos desagregados; «por tanto», persistieron desigualdades que la media ocultaba.",
    "errorType": "Conector inadecuado",
    "correction": "Persisten desigualdades pese al análisis desagregado.",
    "correctSentence": "El análisis incluyó datos desagregados; no obstante, persistieron desigualdades que la media ocultaba.",
    "correctConnector": "no obstante",
    "options": [
      "por tanto",
      "sin embargo",
      "porque",
      "no obstante"
    ],
    "explanation": "Persisten desigualdades pese al análisis desagregado.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-hunter-v2-avanzado-30",
    "level": "avanzado",
    "subtopic": "Conectores",
    "flawed": "Los autores delimitaron la población; «porque», explicaron los criterios de inclusión.",
    "errorType": "Conector inadecuado",
    "correction": "Explicar criterios complementa el procedimiento descrito.",
    "correctSentence": "Los autores delimitaron la población; además, explicaron los criterios de inclusión.",
    "correctConnector": "además",
    "options": [
      "sin embargo",
      "por tanto",
      "además",
      "porque"
    ],
    "explanation": "Explicar criterios complementa el procedimiento descrito.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-hunter-v2-avanzado-31",
    "level": "avanzado",
    "subtopic": "Conectores",
    "flawed": "El indicador fue redefinido en 2020; «sin embargo», deben distinguirse las series anteriores y posteriores.",
    "errorType": "Conector inadecuado",
    "correction": "La redefinición justifica distinguir series no comparables.",
    "correctSentence": "El indicador fue redefinido en 2020; por eso, deben distinguirse las series anteriores y posteriores.",
    "correctConnector": "por eso",
    "options": [
      "porque",
      "por eso",
      "sin embargo",
      "por tanto"
    ],
    "explanation": "La redefinición justifica distinguir series no comparables.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-hunter-v2-avanzado-32",
    "level": "avanzado",
    "subtopic": "Conectores",
    "flawed": "Las evaluaciones presentaron resultados heterogéneos; «además», conviene investigar factores contextuales.",
    "errorType": "Conector inadecuado",
    "correction": "La heterogeneidad es motivo para explorar condiciones de contexto.",
    "correctSentence": "Las evaluaciones presentaron resultados heterogéneos; por consiguiente, conviene investigar factores contextuales.",
    "correctConnector": "por consiguiente",
    "options": [
      "por consiguiente",
      "además",
      "sin embargo",
      "por tanto"
    ],
    "explanation": "La heterogeneidad es motivo para explorar condiciones de contexto.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-hunter-v2-avanzado-33",
    "level": "avanzado",
    "subtopic": "Conectores",
    "flawed": "La síntesis reconoce incertidumbre; «por tanto», no descarta toda explicación alternativa.",
    "errorType": "Conector inadecuado",
    "correction": "Son dos precauciones analíticas complementarias; la segunda no se presenta como inferencia necesaria.",
    "correctSentence": "La síntesis reconoce incertidumbre; y, no descarta toda explicación alternativa.",
    "correctConnector": "y",
    "options": [
      "por tanto",
      "sin embargo",
      "porque",
      "y"
    ],
    "explanation": "Son dos precauciones analíticas complementarias; la segunda no se presenta como inferencia necesaria.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-hunter-v2-avanzado-34",
    "level": "avanzado",
    "subtopic": "Conectores",
    "flawed": "Se revisó la procedencia de los testimonios; «porque», se examinó la fecha de cada uno.",
    "errorType": "Conector inadecuado",
    "correction": "La fecha y la procedencia son criterios de revisión que se suman.",
    "correctSentence": "Se revisó la procedencia de los testimonios; y, se examinó la fecha de cada uno.",
    "correctConnector": "y",
    "options": [
      "sin embargo",
      "por tanto",
      "y",
      "porque"
    ],
    "explanation": "La fecha y la procedencia son criterios de revisión que se suman.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-hunter-v2-avanzado-36",
    "level": "avanzado",
    "subtopic": "Conectores",
    "flawed": "La revisión muestra respuestas contradictorias; «además», es necesario discutir sus límites antes de establecer una conclusión.",
    "errorType": "Conector inadecuado",
    "correction": "La necesidad de discutir los límites es una consecuencia de haber detectado respuestas contradictorias.",
    "correctSentence": "La revisión muestra respuestas contradictorias; por tanto, es necesario discutir sus límites antes de establecer una conclusión.",
    "correctConnector": "por tanto",
    "options": [
      "sin embargo",
      "por tanto",
      "porque",
      "además"
    ],
    "explanation": "La necesidad de discutir los límites es una consecuencia de haber detectado respuestas contradictorias.",
    "reviewStatus": "editorial-draft"
  }
];
