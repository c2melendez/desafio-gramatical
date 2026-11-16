import type {Level} from "./grammar";
export type GeneralizationErrorCase={id:string;level:Level;subtopic:"Generalización e integración";flawed:string;correctConnector:string;correctSentence:string;options:[string,string,string,string];explanation:string;reviewStatus:"editorial-draft"};
/** Ejercicios originales de detección de generalizaciones excesivas y síntesis sin controles. Revisión docente pendiente. */
export const GENERALIZATION_ERROR_CASES:GeneralizationErrorCase[]=[
  {
    "id": "writing-generalization-hunter-v1-principiante-0",
    "level": "principiante",
    "subtopic": "Generalización e integración",
    "flawed": "Tres compañeros aprobaron; se afirma que toda la escuela aprobará.",
    "correctConnector": "Los resultados de tres compañeros no describen a toda la escuela.",
    "correctSentence": "Los resultados de tres compañeros no describen a toda la escuela.",
    "options": [
      "Los resultados de tres compañeros no describen a toda la escuela.",
      "La afirmación puede aplicarse a todos sin examinar más datos.",
      "La conclusión es válida únicamente porque aparece en un informe.",
      "Es correcto atribuir certeza total sin considerar el contexto."
    ],
    "explanation": "La pequeña muestra no representa automáticamente a todos los estudiantes. La revisión limita el alcance de la afirmación a lo respaldado.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-hunter-v1-principiante-1",
    "level": "principiante",
    "subtopic": "Generalización e integración",
    "flawed": "Una vecina cosechó tomates; se asegura que todas las familias cosecharán igual.",
    "correctConnector": "Un huerto familiar no garantiza cosechas idénticas en otras viviendas.",
    "correctSentence": "Un huerto familiar no garantiza cosechas idénticas en otras viviendas.",
    "options": [
      "La afirmación puede aplicarse a todos sin examinar más datos.",
      "La conclusión es válida únicamente porque aparece en un informe.",
      "Es correcto atribuir certeza total sin considerar el contexto.",
      "Un huerto familiar no garantiza cosechas idénticas en otras viviendas."
    ],
    "explanation": "El resultado depende de condiciones que no han sido examinadas. La revisión limita el alcance de la afirmación a lo respaldado.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-hunter-v1-principiante-2",
    "level": "principiante",
    "subtopic": "Generalización e integración",
    "flawed": "Dos lectores disfrutaron una novela; la reseña sostiene que gustará a todos.",
    "correctConnector": "Dos opiniones favorables no representan los gustos de todos los lectores.",
    "correctSentence": "Dos opiniones favorables no representan los gustos de todos los lectores.",
    "options": [
      "La conclusión es válida únicamente porque aparece en un informe.",
      "Es correcto atribuir certeza total sin considerar el contexto.",
      "Dos opiniones favorables no representan los gustos de todos los lectores.",
      "La afirmación puede aplicarse a todos sin examinar más datos."
    ],
    "explanation": "Una muestra de dos personas no respalda preferencias universales. La revisión limita el alcance de la afirmación a lo respaldado.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-hunter-v1-principiante-3",
    "level": "principiante",
    "subtopic": "Generalización e integración",
    "flawed": "Una clase recicló un viernes; se anunció que todo el barrio recicla siempre.",
    "correctConnector": "La actividad de una clase en un día no demuestra hábitos del barrio.",
    "correctSentence": "La actividad de una clase en un día no demuestra hábitos del barrio.",
    "options": [
      "Es correcto atribuir certeza total sin considerar el contexto.",
      "La actividad de una clase en un día no demuestra hábitos del barrio.",
      "La afirmación puede aplicarse a todos sin examinar más datos.",
      "La conclusión es válida únicamente porque aparece en un informe."
    ],
    "explanation": "La conclusión excede la comunidad y el período observados. La revisión limita el alcance de la afirmación a lo respaldado.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-hunter-v1-principiante-4",
    "level": "principiante",
    "subtopic": "Generalización e integración",
    "flawed": "Un alumno aprendió una canción rápidamente; se concluye que todos aprenden igual.",
    "correctConnector": "La rapidez de un alumno no determina el ritmo de los demás.",
    "correctSentence": "La rapidez de un alumno no determina el ritmo de los demás.",
    "options": [
      "La rapidez de un alumno no determina el ritmo de los demás.",
      "La afirmación puede aplicarse a todos sin examinar más datos.",
      "La conclusión es válida únicamente porque aparece en un informe.",
      "Es correcto atribuir certeza total sin considerar el contexto."
    ],
    "explanation": "Los ritmos individuales no se infieren de un solo ejemplo. La revisión limita el alcance de la afirmación a lo respaldado.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-hunter-v1-principiante-5",
    "level": "principiante",
    "subtopic": "Generalización e integración",
    "flawed": "Un autobús llegó tarde dos veces; el texto afirma que nunca llega puntual.",
    "correctConnector": "Dos retrasos no demuestran que el autobús falle en todos sus viajes.",
    "correctSentence": "Dos retrasos no demuestran que el autobús falle en todos sus viajes.",
    "options": [
      "La afirmación puede aplicarse a todos sin examinar más datos.",
      "La conclusión es válida únicamente porque aparece en un informe.",
      "Es correcto atribuir certeza total sin considerar el contexto.",
      "Dos retrasos no demuestran que el autobús falle en todos sus viajes."
    ],
    "explanation": "«Nunca» es una conclusión absoluta sin registros suficientes. La revisión limita el alcance de la afirmación a lo respaldado.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-hunter-v1-principiante-6",
    "level": "principiante",
    "subtopic": "Generalización e integración",
    "flawed": "Un perro siguió una orden; se concluye que todos los animales obedecen igual.",
    "correctConnector": "La respuesta de un perro no permite generalizar a todos los animales.",
    "correctSentence": "La respuesta de un perro no permite generalizar a todos los animales.",
    "options": [
      "La conclusión es válida únicamente porque aparece en un informe.",
      "Es correcto atribuir certeza total sin considerar el contexto.",
      "La respuesta de un perro no permite generalizar a todos los animales.",
      "La afirmación puede aplicarse a todos sin examinar más datos."
    ],
    "explanation": "Los comportamientos difieren entre especies y contextos. La revisión limita el alcance de la afirmación a lo respaldado.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-hunter-v1-intermedio-7",
    "level": "intermedio",
    "subtopic": "Generalización e integración",
    "flawed": "Una encuesta de 40 voluntarios pretende representar a toda una ciudad.",
    "correctConnector": "La encuesta describe a quienes respondieron, no necesariamente a toda la ciudad.",
    "correctSentence": "La encuesta describe a quienes respondieron, no necesariamente a toda la ciudad.",
    "options": [
      "Es correcto atribuir certeza total sin considerar el contexto.",
      "La encuesta describe a quienes respondieron, no necesariamente a toda la ciudad.",
      "La afirmación puede aplicarse a todos sin examinar más datos.",
      "La conclusión es válida únicamente porque aparece en un informe."
    ],
    "explanation": "La selección voluntaria impide asegurar representatividad. La revisión limita el alcance de la afirmación a lo respaldado.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-hunter-v1-intermedio-8",
    "level": "intermedio",
    "subtopic": "Generalización e integración",
    "flawed": "Dos escuelas mejoraron sus notas tras instalar una aplicación y se atribuye toda mejora a ella.",
    "correctConnector": "La mejora coincide con la aplicación, sin que ello demuestre una causa exclusiva.",
    "correctSentence": "La mejora coincide con la aplicación, sin que ello demuestre una causa exclusiva.",
    "options": [
      "La mejora coincide con la aplicación, sin que ello demuestre una causa exclusiva.",
      "La afirmación puede aplicarse a todos sin examinar más datos.",
      "La conclusión es válida únicamente porque aparece en un informe.",
      "Es correcto atribuir certeza total sin considerar el contexto."
    ],
    "explanation": "La temporalidad no descarta otros cambios simultáneos. La revisión limita el alcance de la afirmación a lo respaldado.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-hunter-v1-intermedio-9",
    "level": "intermedio",
    "subtopic": "Generalización e integración",
    "flawed": "Cinco entrevistas favorables se resumen como satisfacción universal de usuarios.",
    "correctConnector": "Los cinco testimonios no permiten afirmar satisfacción de toda la población.",
    "correctSentence": "Los cinco testimonios no permiten afirmar satisfacción de toda la población.",
    "options": [
      "La afirmación puede aplicarse a todos sin examinar más datos.",
      "La conclusión es válida únicamente porque aparece en un informe.",
      "Es correcto atribuir certeza total sin considerar el contexto.",
      "Los cinco testimonios no permiten afirmar satisfacción de toda la población."
    ],
    "explanation": "La conclusión debe limitarse a la evidencia recogida. La revisión limita el alcance de la afirmación a lo respaldado.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-hunter-v1-intermedio-10",
    "level": "intermedio",
    "subtopic": "Generalización e integración",
    "flawed": "Subió la nota promedio de una clase, pero tres estudiantes empeoraron; se afirma que todos mejoraron.",
    "correctConnector": "Una media mayor no implica mejora individual de todos los alumnos.",
    "correctSentence": "Una media mayor no implica mejora individual de todos los alumnos.",
    "options": [
      "La conclusión es válida únicamente porque aparece en un informe.",
      "Es correcto atribuir certeza total sin considerar el contexto.",
      "Una media mayor no implica mejora individual de todos los alumnos.",
      "La afirmación puede aplicarse a todos sin examinar más datos."
    ],
    "explanation": "El promedio oculta diferencias y excepciones. La revisión limita el alcance de la afirmación a lo respaldado.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-hunter-v1-intermedio-11",
    "level": "intermedio",
    "subtopic": "Generalización e integración",
    "flawed": "Aumentaron las ventas después de una campaña y se atribuyen todas las compras a los anuncios.",
    "correctConnector": "El aumento posterior no demuestra que la campaña causara todas las ventas.",
    "correctSentence": "El aumento posterior no demuestra que la campaña causara todas las ventas.",
    "options": [
      "Es correcto atribuir certeza total sin considerar el contexto.",
      "El aumento posterior no demuestra que la campaña causara todas las ventas.",
      "La afirmación puede aplicarse a todos sin examinar más datos.",
      "La conclusión es válida únicamente porque aparece en un informe."
    ],
    "explanation": "Puede haber factores estacionales o cambios de precios. La revisión limita el alcance de la afirmación a lo respaldado.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-hunter-v1-intermedio-12",
    "level": "intermedio",
    "subtopic": "Generalización e integración",
    "flawed": "Un centro mide asistencia y otro inscripciones; el informe suma ambas cifras como si fueran iguales.",
    "correctConnector": "Inscripción y asistencia deben distinguirse antes de integrar las cifras.",
    "correctSentence": "Inscripción y asistencia deben distinguirse antes de integrar las cifras.",
    "options": [
      "Inscripción y asistencia deben distinguirse antes de integrar las cifras.",
      "La afirmación puede aplicarse a todos sin examinar más datos.",
      "La conclusión es válida únicamente porque aparece en un informe.",
      "Es correcto atribuir certeza total sin considerar el contexto."
    ],
    "explanation": "Los indicadores registran hechos diferentes. La revisión limita el alcance de la afirmación a lo respaldado.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-hunter-v1-intermedio-13",
    "level": "intermedio",
    "subtopic": "Generalización e integración",
    "flawed": "Una reseña solo cita elogios y concluye que nadie expresó críticas.",
    "correctConnector": "Citar exclusivamente elogios no prueba ausencia de opiniones críticas.",
    "correctSentence": "Citar exclusivamente elogios no prueba ausencia de opiniones críticas.",
    "options": [
      "La afirmación puede aplicarse a todos sin examinar más datos.",
      "La conclusión es válida únicamente porque aparece en un informe.",
      "Es correcto atribuir certeza total sin considerar el contexto.",
      "Citar exclusivamente elogios no prueba ausencia de opiniones críticas."
    ],
    "explanation": "La selección favorable puede distorsionar el balance. La revisión limita el alcance de la afirmación a lo respaldado.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-hunter-v1-intermedio-14",
    "level": "intermedio",
    "subtopic": "Generalización e integración",
    "flawed": "Llovió intensamente tres días y se presenta como tendencia climática de diez años.",
    "correctConnector": "Tres días no permiten establecer una tendencia de una década.",
    "correctSentence": "Tres días no permiten establecer una tendencia de una década.",
    "options": [
      "La conclusión es válida únicamente porque aparece en un informe.",
      "Es correcto atribuir certeza total sin considerar el contexto.",
      "Tres días no permiten establecer una tendencia de una década.",
      "La afirmación puede aplicarse a todos sin examinar más datos."
    ],
    "explanation": "Las escalas temporales son incompatibles. La revisión limita el alcance de la afirmación a lo respaldado.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-hunter-v1-intermedio-15",
    "level": "intermedio",
    "subtopic": "Generalización e integración",
    "flawed": "Una biblioteca cambió el registro de préstamos y luego informó más préstamos; atribuye todo a más lectores.",
    "correctConnector": "El aumento podría reflejar tanto actividad real como cambios de registro.",
    "correctSentence": "El aumento podría reflejar tanto actividad real como cambios de registro.",
    "options": [
      "Es correcto atribuir certeza total sin considerar el contexto.",
      "El aumento podría reflejar tanto actividad real como cambios de registro.",
      "La afirmación puede aplicarse a todos sin examinar más datos.",
      "La conclusión es válida únicamente porque aparece en un informe."
    ],
    "explanation": "La medición puede influir en las cifras observadas. La revisión limita el alcance de la afirmación a lo respaldado.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-hunter-v1-intermedio-16",
    "level": "intermedio",
    "subtopic": "Generalización e integración",
    "flawed": "Una fuente histórica se declara falsa solo porque fue escrita décadas después.",
    "correctConnector": "La fecha tardía exige contextualizar y corroborar, no invalidar automáticamente.",
    "correctSentence": "La fecha tardía exige contextualizar y corroborar, no invalidar automáticamente.",
    "options": [
      "La fecha tardía exige contextualizar y corroborar, no invalidar automáticamente.",
      "La afirmación puede aplicarse a todos sin examinar más datos.",
      "La conclusión es válida únicamente porque aparece en un informe.",
      "Es correcto atribuir certeza total sin considerar el contexto."
    ],
    "explanation": "La fiabilidad no depende únicamente de la antigüedad. La revisión limita el alcance de la afirmación a lo respaldado.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-hunter-v1-intermedio-17",
    "level": "intermedio",
    "subtopic": "Generalización e integración",
    "flawed": "Un informe atribuye todas las diferencias entre barrios al transporte sin examinar ingresos.",
    "correctConnector": "El transporte puede intervenir junto con ingresos y otros factores.",
    "correctSentence": "El transporte puede intervenir junto con ingresos y otros factores.",
    "options": [
      "La afirmación puede aplicarse a todos sin examinar más datos.",
      "La conclusión es válida únicamente porque aparece en un informe.",
      "Es correcto atribuir certeza total sin considerar el contexto.",
      "El transporte puede intervenir junto con ingresos y otros factores."
    ],
    "explanation": "La causalidad exclusiva no ha sido justificada. La revisión limita el alcance de la afirmación a lo respaldado.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-hunter-v1-intermedio-18",
    "level": "intermedio",
    "subtopic": "Generalización e integración",
    "flawed": "Una promoción funcionó en una academia y se garantiza igual efecto en todos los países.",
    "correctConnector": "Un resultado local no asegura efectos idénticos en contextos diferentes.",
    "correctSentence": "Un resultado local no asegura efectos idénticos en contextos diferentes.",
    "options": [
      "La conclusión es válida únicamente porque aparece en un informe.",
      "Es correcto atribuir certeza total sin considerar el contexto.",
      "Un resultado local no asegura efectos idénticos en contextos diferentes.",
      "La afirmación puede aplicarse a todos sin examinar más datos."
    ],
    "explanation": "La validez externa depende de poblaciones y condiciones. La revisión limita el alcance de la afirmación a lo respaldado.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-hunter-v1-avanzado-19",
    "level": "avanzado",
    "subtopic": "Generalización e integración",
    "flawed": "Un metaanálisis promedia estudios que definen «éxito» de formas incompatibles.",
    "correctConnector": "No debe combinarse una tasa hasta comprobar equivalencia de definiciones.",
    "correctSentence": "No debe combinarse una tasa hasta comprobar equivalencia de definiciones.",
    "options": [
      "Es correcto atribuir certeza total sin considerar el contexto.",
      "No debe combinarse una tasa hasta comprobar equivalencia de definiciones.",
      "La afirmación puede aplicarse a todos sin examinar más datos.",
      "La conclusión es válida únicamente porque aparece en un informe."
    ],
    "explanation": "La síntesis requiere indicadores comparables. La revisión limita el alcance de la afirmación a lo respaldado.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-hunter-v1-avanzado-20",
    "level": "avanzado",
    "subtopic": "Generalización e integración",
    "flawed": "Un programa mejoró en promedio, pero se omiten perjuicios a grupos vulnerables.",
    "correctConnector": "La media debe acompañarse de las diferencias relevantes entre grupos.",
    "correctSentence": "La media debe acompañarse de las diferencias relevantes entre grupos.",
    "options": [
      "La media debe acompañarse de las diferencias relevantes entre grupos.",
      "La afirmación puede aplicarse a todos sin examinar más datos.",
      "La conclusión es válida únicamente porque aparece en un informe.",
      "Es correcto atribuir certeza total sin considerar el contexto."
    ],
    "explanation": "Un efecto promedio puede ocultar desigualdades. La revisión limita el alcance de la afirmación a lo respaldado.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-hunter-v1-avanzado-21",
    "level": "avanzado",
    "subtopic": "Generalización e integración",
    "flawed": "Un informe suma opiniones y ensayos controlados como pruebas causales equivalentes.",
    "correctConnector": "Deben diferenciarse testimonios, observaciones y ensayos antes de inferir causas.",
    "correctSentence": "Deben diferenciarse testimonios, observaciones y ensayos antes de inferir causas.",
    "options": [
      "La afirmación puede aplicarse a todos sin examinar más datos.",
      "La conclusión es válida únicamente porque aparece en un informe.",
      "Es correcto atribuir certeza total sin considerar el contexto.",
      "Deben diferenciarse testimonios, observaciones y ensayos antes de inferir causas."
    ],
    "explanation": "Los diseños de investigación tienen alcances distintos. La revisión limita el alcance de la afirmación a lo respaldado.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-hunter-v1-avanzado-22",
    "level": "avanzado",
    "subtopic": "Generalización e integración",
    "flawed": "Una encuesta voluntaria online usa un margen de error propio de muestreo aleatorio.",
    "correctConnector": "La autoselección impide tratar sin más el error como si la muestra fuera probabilística.",
    "correctSentence": "La autoselección impide tratar sin más el error como si la muestra fuera probabilística.",
    "options": [
      "La conclusión es válida únicamente porque aparece en un informe.",
      "Es correcto atribuir certeza total sin considerar el contexto.",
      "La autoselección impide tratar sin más el error como si la muestra fuera probabilística.",
      "La afirmación puede aplicarse a todos sin examinar más datos."
    ],
    "explanation": "El tamaño no corrige automáticamente sesgos de selección. La revisión limita el alcance de la afirmación a lo respaldado.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-hunter-v1-avanzado-23",
    "level": "avanzado",
    "subtopic": "Generalización e integración",
    "flawed": "Se atribuye una diferencia final al tratamiento sin considerar desigualdades iniciales entre grupos.",
    "correctConnector": "La atribución debe controlar o discutir diferencias de partida.",
    "correctSentence": "La atribución debe controlar o discutir diferencias de partida.",
    "options": [
      "Es correcto atribuir certeza total sin considerar el contexto.",
      "La atribución debe controlar o discutir diferencias de partida.",
      "La afirmación puede aplicarse a todos sin examinar más datos.",
      "La conclusión es válida únicamente porque aparece en un informe."
    ],
    "explanation": "La desigualdad basal puede confundir el efecto. La revisión limita el alcance de la afirmación a lo respaldado.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-hunter-v1-avanzado-24",
    "level": "avanzado",
    "subtopic": "Generalización e integración",
    "flawed": "Se redefine un indicador en mitad de una serie y se presenta una tendencia ininterrumpida.",
    "correctConnector": "Es necesario documentar el cambio y evaluar si los períodos son comparables.",
    "correctSentence": "Es necesario documentar el cambio y evaluar si los períodos son comparables.",
    "options": [
      "Es necesario documentar el cambio y evaluar si los períodos son comparables.",
      "La afirmación puede aplicarse a todos sin examinar más datos.",
      "La conclusión es válida únicamente porque aparece en un informe.",
      "Es correcto atribuir certeza total sin considerar el contexto."
    ],
    "explanation": "La continuidad requiere una definición consistente. La revisión limita el alcance de la afirmación a lo respaldado.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-hunter-v1-avanzado-25",
    "level": "avanzado",
    "subtopic": "Generalización e integración",
    "flawed": "Se asegura que bajó el consumo porque disminuyó el gasto, sin examinar tarifas.",
    "correctConnector": "El gasto puede disminuir por precios menores aunque el consumo no cambie.",
    "correctSentence": "El gasto puede disminuir por precios menores aunque el consumo no cambie.",
    "options": [
      "La afirmación puede aplicarse a todos sin examinar más datos.",
      "La conclusión es válida únicamente porque aparece en un informe.",
      "Es correcto atribuir certeza total sin considerar el contexto.",
      "El gasto puede disminuir por precios menores aunque el consumo no cambie."
    ],
    "explanation": "Deben separarse precio y cantidad. La revisión limita el alcance de la afirmación a lo respaldado.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-hunter-v1-avanzado-26",
    "level": "avanzado",
    "subtopic": "Generalización e integración",
    "flawed": "Una correlación alta se presenta como demostración de una causa exclusiva.",
    "correctConnector": "La asociación no elimina confusores ni causalidad inversa.",
    "correctSentence": "La asociación no elimina confusores ni causalidad inversa.",
    "options": [
      "La conclusión es válida únicamente porque aparece en un informe.",
      "Es correcto atribuir certeza total sin considerar el contexto.",
      "La asociación no elimina confusores ni causalidad inversa.",
      "La afirmación puede aplicarse a todos sin examinar más datos."
    ],
    "explanation": "La magnitud de la correlación no prueba causalidad. La revisión limita el alcance de la afirmación a lo respaldado.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-hunter-v1-avanzado-27",
    "level": "avanzado",
    "subtopic": "Generalización e integración",
    "flawed": "Una proyección de población futura se describe como dato ya observado.",
    "correctConnector": "Las predicciones deben distinguirse de registros históricos y declarar supuestos.",
    "correctSentence": "Las predicciones deben distinguirse de registros históricos y declarar supuestos.",
    "options": [
      "Es correcto atribuir certeza total sin considerar el contexto.",
      "Las predicciones deben distinguirse de registros históricos y declarar supuestos.",
      "La afirmación puede aplicarse a todos sin examinar más datos.",
      "La conclusión es válida únicamente porque aparece en un informe."
    ],
    "explanation": "Una proyección no es una observación. La revisión limita el alcance de la afirmación a lo respaldado.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-hunter-v1-avanzado-28",
    "level": "avanzado",
    "subtopic": "Generalización e integración",
    "flawed": "Se eliminan datos extremos arbitrariamente y se declara que mejoró la representatividad.",
    "correctConnector": "Las exclusiones requieren criterios y análisis de sus efectos.",
    "correctSentence": "Las exclusiones requieren criterios y análisis de sus efectos.",
    "options": [
      "Las exclusiones requieren criterios y análisis de sus efectos.",
      "La afirmación puede aplicarse a todos sin examinar más datos.",
      "La conclusión es válida únicamente porque aparece en un informe.",
      "Es correcto atribuir certeza total sin considerar el contexto."
    ],
    "explanation": "Eliminar valores puede introducir sesgo. La revisión limita el alcance de la afirmación a lo respaldado.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-hunter-v1-avanzado-29",
    "level": "avanzado",
    "subtopic": "Generalización e integración",
    "flawed": "Se concede máxima credibilidad al testimonio más emotivo sin contrastarlo.",
    "correctConnector": "La fiabilidad exige procedencia, contexto y corroboración de los testimonios.",
    "correctSentence": "La fiabilidad exige procedencia, contexto y corroboración de los testimonios.",
    "options": [
      "La afirmación puede aplicarse a todos sin examinar más datos.",
      "La conclusión es válida únicamente porque aparece en un informe.",
      "Es correcto atribuir certeza total sin considerar el contexto.",
      "La fiabilidad exige procedencia, contexto y corroboración de los testimonios."
    ],
    "explanation": "La emoción no es medida de exactitud. La revisión limita el alcance de la afirmación a lo respaldado.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-hunter-v1-avanzado-30",
    "level": "avanzado",
    "subtopic": "Generalización e integración",
    "flawed": "Se comparan tasas brutas de regiones con pirámides de edad muy distintas.",
    "correctConnector": "Debe examinarse si corresponde ajustar por estructura de edad.",
    "correctSentence": "Debe examinarse si corresponde ajustar por estructura de edad.",
    "options": [
      "La conclusión es válida únicamente porque aparece en un informe.",
      "Es correcto atribuir certeza total sin considerar el contexto.",
      "Debe examinarse si corresponde ajustar por estructura de edad.",
      "La afirmación puede aplicarse a todos sin examinar más datos."
    ],
    "explanation": "La composición poblacional afecta algunas tasas. La revisión limita el alcance de la afirmación a lo respaldado.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-hunter-v1-avanzado-31",
    "level": "avanzado",
    "subtopic": "Generalización e integración",
    "flawed": "Un seguimiento pierde la mitad de participantes y generaliza sin discutir abandonos.",
    "correctConnector": "La deserción requiere evaluar sesgo y limitar extrapolaciones.",
    "correctSentence": "La deserción requiere evaluar sesgo y limitar extrapolaciones.",
    "options": [
      "Es correcto atribuir certeza total sin considerar el contexto.",
      "La deserción requiere evaluar sesgo y limitar extrapolaciones.",
      "La afirmación puede aplicarse a todos sin examinar más datos.",
      "La conclusión es válida únicamente porque aparece en un informe."
    ],
    "explanation": "Los abandonos pueden cambiar la composición. La revisión limita el alcance de la afirmación a lo respaldado.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-hunter-v1-avanzado-32",
    "level": "avanzado",
    "subtopic": "Generalización e integración",
    "flawed": "Se integran puntuaciones de escalas distintas sin conversión ni evaluación de equivalencia.",
    "correctConnector": "Las medidas requieren equivalencia técnica o presentación separada.",
    "correctSentence": "Las medidas requieren equivalencia técnica o presentación separada.",
    "options": [
      "Las medidas requieren equivalencia técnica o presentación separada.",
      "La afirmación puede aplicarse a todos sin examinar más datos.",
      "La conclusión es válida únicamente porque aparece en un informe.",
      "Es correcto atribuir certeza total sin considerar el contexto."
    ],
    "explanation": "Dos puntuaciones numéricas pueden medir cosas diferentes. La revisión limita el alcance de la afirmación a lo respaldado.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-hunter-v1-avanzado-33",
    "level": "avanzado",
    "subtopic": "Generalización e integración",
    "flawed": "Una revisión omite estudios negativos y afirma consenso absoluto.",
    "correctConnector": "La síntesis debe declarar criterios e incorporar resultados adversos pertinentes.",
    "correctSentence": "La síntesis debe declarar criterios e incorporar resultados adversos pertinentes.",
    "options": [
      "La afirmación puede aplicarse a todos sin examinar más datos.",
      "La conclusión es válida únicamente porque aparece en un informe.",
      "Es correcto atribuir certeza total sin considerar el contexto.",
      "La síntesis debe declarar criterios e incorporar resultados adversos pertinentes."
    ],
    "explanation": "La selección de evidencia puede sesgar conclusiones. La revisión limita el alcance de la afirmación a lo respaldado.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-hunter-v1-avanzado-34",
    "level": "avanzado",
    "subtopic": "Generalización e integración",
    "flawed": "Una política coincide con otras reformas y se le atribuyen todos los cambios.",
    "correctConnector": "La atribución debe reconocer posibles efectos de reformas simultáneas.",
    "correctSentence": "La atribución debe reconocer posibles efectos de reformas simultáneas.",
    "options": [
      "La conclusión es válida únicamente porque aparece en un informe.",
      "Es correcto atribuir certeza total sin considerar el contexto.",
      "La atribución debe reconocer posibles efectos de reformas simultáneas.",
      "La afirmación puede aplicarse a todos sin examinar más datos."
    ],
    "explanation": "La coincidencia temporal no prueba un efecto único. La revisión limita el alcance de la afirmación a lo respaldado.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-hunter-v1-avanzado-35",
    "level": "avanzado",
    "subtopic": "Generalización e integración",
    "flawed": "Testimonios individuales se usan para calcular una tasa de éxito para toda una región.",
    "correctConnector": "Los relatos no permiten una tasa poblacional sin un muestreo apropiado.",
    "correctSentence": "Los relatos no permiten una tasa poblacional sin un muestreo apropiado.",
    "options": [
      "Es correcto atribuir certeza total sin considerar el contexto.",
      "Los relatos no permiten una tasa poblacional sin un muestreo apropiado.",
      "La afirmación puede aplicarse a todos sin examinar más datos.",
      "La conclusión es válida únicamente porque aparece en un informe."
    ],
    "explanation": "Los datos cualitativos no tienen denominador representativo. La revisión limita el alcance de la afirmación a lo respaldado.",
    "reviewStatus": "editorial-draft"
  }
];