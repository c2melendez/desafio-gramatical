import type {Level} from "./grammar";
export type InferenceReconstructCase={id:string;level:Level;subtopic:"Inferencias";title:string;passage:string;order:{parts:[string,string,string];hint:string;explanation:string};reviewStatus:"editorial-draft"};
/** 36 contextos nuevos para construir inferencias a partir de indicios. */
export const INFERENCE_RECONSTRUCT_CASES:InferenceReconstructCase[]=[
  {
    "id": "reading-inference-reconstruct-v1-principiante-0",
    "level": "principiante",
    "subtopic": "Inferencias",
    "title": "Lámparas de la biblioteca",
    "passage": "La bibliotecaria observó que los estudiantes evitaban una mesa situada en un rincón oscuro. Después de cambiar la lámpara, algunos comenzaron a sentarse allí. El personal consideró posible que la iluminación influyera, pero aún no registró suficientes visitas para asegurarlo.",
    "order": {
      "parts": [
        "Reconocer que la mesa tenía poca luz.",
        "Observar que algunos alumnos la usaron después del cambio.",
        "Inferir con cautela que la iluminación pudo influir."
      ],
      "hint": "Ordena la observación, los indicios y la inferencia que no excede el texto.",
      "explanation": "En «Lámparas de la biblioteca», el razonamiento parte del hecho observado, examina los indicios o las limitaciones y termina con una inferencia prudente."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-reconstruct-v1-principiante-1",
    "level": "principiante",
    "subtopic": "Inferencias",
    "title": "El banco del parque",
    "passage": "Los vecinos notaron que nadie se sentaba en un banco con una tabla rota. Solicitaron su reparación y, una vez arreglado, varias personas lo usaron durante el recreo de un festival. Todavía falta observar si ocurre lo mismo en días ordinarios.",
    "order": {
      "parts": [
        "Identificar el daño inicial del banco.",
        "Examinar el uso posterior durante el festival.",
        "Inferir que la reparación pudo facilitar su uso, sin generalizar."
      ],
      "hint": "Ordena la observación, los indicios y la inferencia que no excede el texto.",
      "explanation": "En «El banco del parque», el razonamiento parte del hecho observado, examina los indicios o las limitaciones y termina con una inferencia prudente."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-reconstruct-v1-principiante-2",
    "level": "principiante",
    "subtopic": "Inferencias",
    "title": "Pinturas en el aula",
    "passage": "El aula colocó trabajos de dibujo en una pared antes vacía. Durante la semana, varios estudiantes se detuvieron a mirar los cuadros. La maestra pensó que la exposición podía aumentar el interés, pero decidió preguntar antes de afirmar el motivo.",
    "order": {
      "parts": [
        "Identificar que se exhibieron dibujos.",
        "Observar la atención de algunos estudiantes.",
        "Formular la hipótesis de interés sin atribuir motivos confirmados."
      ],
      "hint": "Ordena la observación, los indicios y la inferencia que no excede el texto.",
      "explanation": "En «Pinturas en el aula», el razonamiento parte del hecho observado, examina los indicios o las limitaciones y termina con una inferencia prudente."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-reconstruct-v1-principiante-3",
    "level": "principiante",
    "subtopic": "Inferencias",
    "title": "Nido en el árbol",
    "passage": "En una escuela se escucharon cantos de aves cerca de un árbol nuevo. Un cuidador encontró ramas entrelazadas y observó visitas de dos pájaros. Propuso vigilar desde lejos para saber si estaban preparando un nido, sin tocar las ramas.",
    "order": {
      "parts": [
        "Ubicar los cantos y las ramas observadas.",
        "Relacionar las visitas de las aves con el árbol.",
        "Inferir que podrían estar construyendo un nido, aún sin confirmarlo."
      ],
      "hint": "Ordena la observación, los indicios y la inferencia que no excede el texto.",
      "explanation": "En «Nido en el árbol», el razonamiento parte del hecho observado, examina los indicios o las limitaciones y termina con una inferencia prudente."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-reconstruct-v1-principiante-4",
    "level": "principiante",
    "subtopic": "Inferencias",
    "title": "El reloj de la estación",
    "passage": "Una estación de buses recibió quejas porque el reloj de la sala marcaba una hora distinta a la de los boletos. Tras ajustarlo, disminuyeron las preguntas sobre la salida de vehículos. El administrador sospechó una relación, aunque había también carteles nuevos.",
    "order": {
      "parts": [
        "Reconocer la discrepancia inicial del reloj.",
        "Observar menos consultas tras el ajuste y los carteles.",
        "Inferir que la mejor información pudo reducir confusiones."
      ],
      "hint": "Ordena la observación, los indicios y la inferencia que no excede el texto.",
      "explanation": "En «El reloj de la estación», el razonamiento parte del hecho observado, examina los indicios o las limitaciones y termina con una inferencia prudente."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-reconstruct-v1-principiante-5",
    "level": "principiante",
    "subtopic": "Inferencias",
    "title": "El almuerzo compartido",
    "passage": "Un grupo llevó frutas de distintos tipos a un almuerzo comunitario. Al terminar, quedaron pocas mandarinas y muchas peras. Los organizadores pensaron que quizá hubo mayor preferencia por mandarinas, pero no anotaron cuántas piezas había inicialmente.",
    "order": {
      "parts": [
        "Observar la cantidad restante de cada fruta.",
        "Considerar que no se conocen las cantidades iniciales.",
        "Inferir una posible preferencia sin convertirla en certeza."
      ],
      "hint": "Ordena la observación, los indicios y la inferencia que no excede el texto.",
      "explanation": "En «El almuerzo compartido», el razonamiento parte del hecho observado, examina los indicios o las limitaciones y termina con una inferencia prudente."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-reconstruct-v1-principiante-6",
    "level": "principiante",
    "subtopic": "Inferencias",
    "title": "El toldo de la feria",
    "passage": "Durante una feria escolar, los puestos sin toldo quedaron vacíos cuando comenzó a llover. Algunos visitantes se acercaron a los puestos cubiertos. Los comerciantes plantearon instalar más techos para el próximo evento, aunque la lluvia podría no repetirse.",
    "order": {
      "parts": [
        "Identificar la lluvia y la cobertura desigual.",
        "Observar el desplazamiento de visitantes.",
        "Inferir que los toldos pudieron ofrecer una ventaja durante la lluvia."
      ],
      "hint": "Ordena la observación, los indicios y la inferencia que no excede el texto.",
      "explanation": "En «El toldo de la feria», el razonamiento parte del hecho observado, examina los indicios o las limitaciones y termina con una inferencia prudente."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-reconstruct-v1-intermedio-7",
    "level": "intermedio",
    "subtopic": "Inferencias",
    "title": "Conexión en tres aldeas",
    "passage": "Una asociación instaló wifi comunitario en tres aldeas. El número de consultas educativas registradas aumentó, pero también se distribuyeron dispositivos a estudiantes. La evaluación evitó atribuir toda la diferencia al acceso a internet.",
    "order": {
      "parts": [
        "Identificar la instalación de wifi y entrega de dispositivos.",
        "Observar el aumento de consultas educativas.",
        "Inferir que ambos cambios podrían haber contribuido al resultado."
      ],
      "hint": "Ordena la observación, los indicios y la inferencia que no excede el texto.",
      "explanation": "En «Conexión en tres aldeas», el razonamiento parte del hecho observado, examina los indicios o las limitaciones y termina con una inferencia prudente."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-reconstruct-v1-intermedio-8",
    "level": "intermedio",
    "subtopic": "Inferencias",
    "title": "Una ruta alternativa",
    "passage": "La reparación de una avenida llevó a los vehículos a usar otra calle. Los comerciantes de esa calle reportaron más visitas durante las obras. El municipio consideró que el desvío podría influir, aunque faltaban registros de compras.",
    "order": {
      "parts": [
        "Reconocer las obras y el desvío vehicular.",
        "Examinar el incremento declarado de visitantes.",
        "Inferir que el tráfico desviado pudo aumentar la afluencia."
      ],
      "hint": "Ordena la observación, los indicios y la inferencia que no excede el texto.",
      "explanation": "En «Una ruta alternativa», el razonamiento parte del hecho observado, examina los indicios o las limitaciones y termina con una inferencia prudente."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-reconstruct-v1-intermedio-9",
    "level": "intermedio",
    "subtopic": "Inferencias",
    "title": "Fotografías desiguales",
    "passage": "Dos fotografías de una plaza tenían ángulos y horas de captura diferentes. En una parecía haber más árboles, pero los investigadores consultaron planos antiguos antes de hablar de un cambio real de vegetación.",
    "order": {
      "parts": [
        "Identificar diferencias en ángulos y horas.",
        "Considerar la apariencia distinta del arbolado.",
        "Inferir que la perspectiva podría explicar parte de la discrepancia."
      ],
      "hint": "Ordena la observación, los indicios y la inferencia que no excede el texto.",
      "explanation": "En «Fotografías desiguales», el razonamiento parte del hecho observado, examina los indicios o las limitaciones y termina con una inferencia prudente."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-reconstruct-v1-intermedio-10",
    "level": "intermedio",
    "subtopic": "Inferencias",
    "title": "Encuesta del comedor",
    "passage": "Una encuesta sobre comida escolar se aplicó únicamente a familias presentes en una reunión matutina. Muchas respuestas favorecieron un nuevo menú. La comisión decidió preguntar también en otros horarios para conocer opiniones de quienes no asistieron.",
    "order": {
      "parts": [
        "Identificar la selección de familias en la reunión.",
        "Reconocer la preferencia entre quienes contestaron.",
        "Inferir que el resultado puede no representar a todas las familias."
      ],
      "hint": "Ordena la observación, los indicios y la inferencia que no excede el texto.",
      "explanation": "En «Encuesta del comedor», el razonamiento parte del hecho observado, examina los indicios o las limitaciones y termina con una inferencia prudente."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-reconstruct-v1-intermedio-11",
    "level": "intermedio",
    "subtopic": "Inferencias",
    "title": "Libros en dos cursos",
    "passage": "Dos cursos reportaron números similares de libros leídos, pero uno tenía veinte alumnos y otro cuarenta. El encargado propuso calcular lecturas por estudiante para comparar la intensidad de lectura.",
    "order": {
      "parts": [
        "Observar los totales parecidos en ambos grupos.",
        "Examinar la diferencia de cantidad de alumnos.",
        "Inferir que el promedio individual podría ser distinto."
      ],
      "hint": "Ordena la observación, los indicios y la inferencia que no excede el texto.",
      "explanation": "En «Libros en dos cursos», el razonamiento parte del hecho observado, examina los indicios o las limitaciones y termina con una inferencia prudente."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-reconstruct-v1-intermedio-12",
    "level": "intermedio",
    "subtopic": "Inferencias",
    "title": "Jornadas de limpieza",
    "passage": "El río presentó menos residuos después de una jornada comunitaria, pero durante esos días también había disminuido la lluvia. El informe registró ambos cambios y propuso repetir mediciones en condiciones parecidas.",
    "order": {
      "parts": [
        "Identificar la jornada y la disminución de lluvias.",
        "Observar menos residuos durante el período.",
        "Inferir que no puede asignarse una única causa sin controles."
      ],
      "hint": "Ordena la observación, los indicios y la inferencia que no excede el texto.",
      "explanation": "En «Jornadas de limpieza», el razonamiento parte del hecho observado, examina los indicios o las limitaciones y termina con una inferencia prudente."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-reconstruct-v1-intermedio-13",
    "level": "intermedio",
    "subtopic": "Inferencias",
    "title": "Emprendimientos de barrio",
    "passage": "Varias tiendas reportaron un aumento de ventas durante la semana de un festival. También ampliaron los horarios y ofrecieron descuentos. Los organizadores decidieron estudiar qué factores podían explicar la mejora.",
    "order": {
      "parts": [
        "Reconocer el festival, los descuentos y el horario ampliado.",
        "Observar el aumento de ventas declarado.",
        "Inferir que varios factores pudieron contribuir al resultado."
      ],
      "hint": "Ordena la observación, los indicios y la inferencia que no excede el texto.",
      "explanation": "En «Emprendimientos de barrio», el razonamiento parte del hecho observado, examina los indicios o las limitaciones y termina con una inferencia prudente."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-reconstruct-v1-intermedio-14",
    "level": "intermedio",
    "subtopic": "Inferencias",
    "title": "Reuniones de familias",
    "passage": "Una escuela cambió la hora de reuniones de padres de familia de mañana a tarde. La asistencia aumentó, pero también se habilitó una opción virtual. El informe recomendó no atribuir todo a la hora de inicio.",
    "order": {
      "parts": [
        "Identificar los cambios de horario y modalidad.",
        "Observar el aumento de participación.",
        "Inferir que ambas adaptaciones pudieron ayudar."
      ],
      "hint": "Ordena la observación, los indicios y la inferencia que no excede el texto.",
      "explanation": "En «Reuniones de familias», el razonamiento parte del hecho observado, examina los indicios o las limitaciones y termina con una inferencia prudente."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-reconstruct-v1-intermedio-15",
    "level": "intermedio",
    "subtopic": "Inferencias",
    "title": "Dos narraciones históricas",
    "passage": "Una crónica escrita poco después de una protesta y una entrevista tardía narraban distintas fechas. Los historiadores buscaron actas municipales antes de escoger una cronología. No descartaron una fuente solo por ser posterior.",
    "order": {
      "parts": [
        "Identificar los dos testimonios y sus fechas discrepantes.",
        "Examinar qué registros podían corroborar los hechos.",
        "Inferir que el contraste documental podría aclarar la discrepancia."
      ],
      "hint": "Ordena la observación, los indicios y la inferencia que no excede el texto.",
      "explanation": "En «Dos narraciones históricas», el razonamiento parte del hecho observado, examina los indicios o las limitaciones y termina con una inferencia prudente."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-reconstruct-v1-intermedio-16",
    "level": "intermedio",
    "subtopic": "Inferencias",
    "title": "Calor en el vivero",
    "passage": "Un vivero notó que las plantas cercanas a una ventana crecían más rápido. Al revisar los recipientes descubrió que también tenían más espacio para las raíces. El equipo decidió separar ambos factores en una nueva prueba.",
    "order": {
      "parts": [
        "Identificar la relación observada con la ventana.",
        "Reconocer la diferencia de espacio en las macetas.",
        "Inferir que el crecimiento no puede atribuirse solo a la luz."
      ],
      "hint": "Ordena la observación, los indicios y la inferencia que no excede el texto.",
      "explanation": "En «Calor en el vivero», el razonamiento parte del hecho observado, examina los indicios o las limitaciones y termina con una inferencia prudente."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-reconstruct-v1-intermedio-17",
    "level": "intermedio",
    "subtopic": "Inferencias",
    "title": "Prestamos de balones",
    "passage": "Una escuela registró más préstamos de balones durante un mes. Al mismo tiempo abrió una nueva cancha y contrató un monitor deportivo. El consejo decidió investigar ambos cambios antes de declarar cuál produjo el aumento.",
    "order": {
      "parts": [
        "Identificar la nueva cancha y el monitor.",
        "Observar la subida en préstamos.",
        "Inferir que las dos novedades pudieron influir."
      ],
      "hint": "Ordena la observación, los indicios y la inferencia que no excede el texto.",
      "explanation": "En «Prestamos de balones», el razonamiento parte del hecho observado, examina los indicios o las limitaciones y termina con una inferencia prudente."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-reconstruct-v1-intermedio-18",
    "level": "intermedio",
    "subtopic": "Inferencias",
    "title": "Agua en los estanques",
    "passage": "Dos estanques presentaron distintas cantidades de algas. Uno recibía más sol y también tenía un nivel de nutrientes mayor. Los científicos propusieron medir ambos factores antes de explicar las diferencias.",
    "order": {
      "parts": [
        "Identificar la variación de algas.",
        "Distinguir exposición solar y nutrientes.",
        "Inferir que ambas condiciones podrían tener importancia."
      ],
      "hint": "Ordena la observación, los indicios y la inferencia que no excede el texto.",
      "explanation": "En «Agua en los estanques», el razonamiento parte del hecho observado, examina los indicios o las limitaciones y termina con una inferencia prudente."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-reconstruct-v1-avanzado-19",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Medición de residuos",
    "passage": "Una red municipal registró más reportes de residuos después de instalar una aplicación móvil. Algunos barrios recibieron además nuevas brigadas de inspección. Los analistas propusieron comparar reportes con residuos verificados antes de atribuir el aumento a más contaminación.",
    "order": {
      "parts": [
        "Identificar la aplicación y las brigadas nuevas.",
        "Examinar el incremento de reportes.",
        "Inferir que la detección podría explicar parte del cambio."
      ],
      "hint": "Ordena la observación, los indicios y la inferencia que no excede el texto.",
      "explanation": "En «Medición de residuos», el razonamiento parte del hecho observado, examina los indicios o las limitaciones y termina con una inferencia prudente."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-reconstruct-v1-avanzado-20",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Investigación con deserción",
    "passage": "Un estudio de formación laboral comenzó con cuatrocientos voluntarios y terminó con trescientos veinte. Quienes completaron el curso mejoraron sus resultados, pero se desconocía el desempeño de los ausentes. Los autores pidieron examinar el abandono antes de generalizar.",
    "order": {
      "parts": [
        "Identificar la pérdida de ochenta participantes.",
        "Distinguir resultados observados de datos ausentes.",
        "Inferir que la deserción podría sesgar la estimación final."
      ],
      "hint": "Ordena la observación, los indicios y la inferencia que no excede el texto.",
      "explanation": "En «Investigación con deserción», el razonamiento parte del hecho observado, examina los indicios o las limitaciones y termina con una inferencia prudente."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-reconstruct-v1-avanzado-21",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Comparación de regiones",
    "passage": "Dos departamentos reportaron tasas brutas distintas de enfermedad y tenían estructuras de edad diferentes. El informe propuso una estandarización por edad antes de discutir las diferencias como si reflejaran riesgo individual.",
    "order": {
      "parts": [
        "Identificar tasas distintas y composición demográfica desigual.",
        "Examinar la necesidad de ajustar por edad.",
        "Inferir que una parte de la brecha podría deberse a estructura poblacional."
      ],
      "hint": "Ordena la observación, los indicios y la inferencia que no excede el texto.",
      "explanation": "En «Comparación de regiones», el razonamiento parte del hecho observado, examina los indicios o las limitaciones y termina con una inferencia prudente."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-reconstruct-v1-avanzado-22",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Tres reformas escolares",
    "passage": "Una escuela extendió la jornada, mejoró su biblioteca y cambió evaluaciones en un mismo año. Las notas subieron, pero el equipo señaló que no existía comparación suficiente para asignar el efecto a una de las reformas.",
    "order": {
      "parts": [
        "Reconocer los tres cambios simultáneos.",
        "Observar la mejora en notas reportada.",
        "Inferir que no se puede identificar una causa exclusiva con esos datos."
      ],
      "hint": "Ordena la observación, los indicios y la inferencia que no excede el texto.",
      "explanation": "En «Tres reformas escolares», el razonamiento parte del hecho observado, examina los indicios o las limitaciones y termina con una inferencia prudente."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-reconstruct-v1-avanzado-23",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Escalas de motivación",
    "passage": "Una revisión reunió dos escalas de motivación escolar, una basada en respuestas breves y otra con dimensiones sociales y personales. Aunque ambos instrumentos producían números, los autores exigieron verificar equivalencia antes de combinarlos.",
    "order": {
      "parts": [
        "Identificar las distintas dimensiones evaluadas.",
        "Reconocer que ambas pruebas generan números.",
        "Inferir que la integración podría ser inválida sin equivalencia conceptual."
      ],
      "hint": "Ordena la observación, los indicios y la inferencia que no excede el texto.",
      "explanation": "En «Escalas de motivación», el razonamiento parte del hecho observado, examina los indicios o las limitaciones y termina con una inferencia prudente."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-reconstruct-v1-avanzado-24",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Cifras de transporte",
    "passage": "Dos ciudades compararon pasajeros registrados. Una contaba viajes individuales y la otra tarjetas de transporte utilizadas. El equipo decidió separar los indicadores antes de construir una tasa común.",
    "order": {
      "parts": [
        "Identificar unidades distintas de registro.",
        "Examinar qué describe cada indicador.",
        "Inferir que la suma directa produciría una comparación engañosa."
      ],
      "hint": "Ordena la observación, los indicios y la inferencia que no excede el texto.",
      "explanation": "En «Cifras de transporte», el razonamiento parte del hecho observado, examina los indicios o las limitaciones y termina con una inferencia prudente."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-reconstruct-v1-avanzado-25",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Inundaciones y sensores",
    "passage": "Tras sustituir sensores de nivel de agua, una localidad informó más alertas. También experimentó lluvias fuertes durante el mismo período. El informe recomendó contrastar datos de ambos instrumentos y precipitaciones históricas.",
    "order": {
      "parts": [
        "Identificar sensores nuevos y lluvias intensas.",
        "Observar el aumento de alertas.",
        "Inferir que detección e incidencia podrían contribuir al cambio."
      ],
      "hint": "Ordena la observación, los indicios y la inferencia que no excede el texto.",
      "explanation": "En «Inundaciones y sensores», el razonamiento parte del hecho observado, examina los indicios o las limitaciones y termina con una inferencia prudente."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-reconstruct-v1-avanzado-26",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Testigos de dos épocas",
    "passage": "Un archivo comparó un registro judicial contemporáneo con entrevistas realizadas décadas después. Las fechas coincidían parcialmente, pero los motivos narrados diferían. El historiador propuso contrastar procedencia e intereses antes de decidir qué versión era más precisa.",
    "order": {
      "parts": [
        "Identificar fuentes de épocas diferentes.",
        "Reconocer coincidencias y discrepancias.",
        "Inferir que su contexto podría explicar parte de las diferencias."
      ],
      "hint": "Ordena la observación, los indicios y la inferencia que no excede el texto.",
      "explanation": "En «Testigos de dos épocas», el razonamiento parte del hecho observado, examina los indicios o las limitaciones y termina con una inferencia prudente."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-reconstruct-v1-avanzado-27",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Beneficios por zona",
    "passage": "Un programa de becas registró beneficios medios, pero los resultados en áreas rurales fueron inferiores a los urbanos. El equipo explicó que la distancia a los centros podría intervenir y pidió investigar ese factor.",
    "order": {
      "parts": [
        "Identificar la desigualdad entre zonas.",
        "Examinar la distancia como variable posible.",
        "Inferir que las barreras geográficas podrían influir en el resultado."
      ],
      "hint": "Ordena la observación, los indicios y la inferencia que no excede el texto.",
      "explanation": "En «Beneficios por zona», el razonamiento parte del hecho observado, examina los indicios o las limitaciones y termina con una inferencia prudente."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-reconstruct-v1-avanzado-28",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Indices de consumo",
    "passage": "Un reporte describió una disminución del gasto eléctrico, junto con tarifas menores y cierres temporales de instalaciones. Los analistas decidieron separar precio y consumo físico por día activo antes de hablar de eficiencia.",
    "order": {
      "parts": [
        "Identificar gasto menor, tarifas y cierres.",
        "Examinar qué factores pueden modificar el gasto.",
        "Inferir que el ahorro monetario no prueba menor consumo unitario."
      ],
      "hint": "Ordena la observación, los indicios y la inferencia que no excede el texto.",
      "explanation": "En «Indices de consumo», el razonamiento parte del hecho observado, examina los indicios o las limitaciones y termina con una inferencia prudente."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-reconstruct-v1-avanzado-29",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Publicación selectiva",
    "passage": "Una revisión educativa examinó solamente investigaciones indexadas en una revista. Encontró resultados mayormente positivos y reconoció que podrían existir estudios contrarios en otras publicaciones.",
    "order": {
      "parts": [
        "Identificar el criterio restringido de búsqueda.",
        "Reconocer los resultados positivos hallados.",
        "Inferir que podría existir sesgo por selección de fuentes."
      ],
      "hint": "Ordena la observación, los indicios y la inferencia que no excede el texto.",
      "explanation": "En «Publicación selectiva», el razonamiento parte del hecho observado, examina los indicios o las limitaciones y termina con una inferencia prudente."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-reconstruct-v1-avanzado-30",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Diferencias de pruebas",
    "passage": "Un distrito comparó notas de dos evaluaciones aplicadas en distintos años. La primera incluía ejercicios prácticos y la segunda era exclusivamente escrita. Los autores pidieron comprobar equivalencia antes de atribuir los cambios al aprendizaje.",
    "order": {
      "parts": [
        "Identificar la modificación del formato de examen.",
        "Observar la comparación de calificaciones.",
        "Inferir que el instrumento podría explicar parte de la diferencia."
      ],
      "hint": "Ordena la observación, los indicios y la inferencia que no excede el texto.",
      "explanation": "En «Diferencias de pruebas», el razonamiento parte del hecho observado, examina los indicios o las limitaciones y termina con una inferencia prudente."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-reconstruct-v1-avanzado-31",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Muestra de entrevistas",
    "passage": "Una investigación entrevistó a cuarenta familias usuarias de un servicio y encontró muchas opiniones favorables. Los autores reconocieron que no se había usado una selección aleatoria y evitaron extrapolar los resultados a toda la población.",
    "order": {
      "parts": [
        "Identificar las cuarenta entrevistas.",
        "Examinar la forma de selección de familias.",
        "Inferir que no puede asegurarse representatividad poblacional."
      ],
      "hint": "Ordena la observación, los indicios y la inferencia que no excede el texto.",
      "explanation": "En «Muestra de entrevistas», el razonamiento parte del hecho observado, examina los indicios o las limitaciones y termina con una inferencia prudente."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-reconstruct-v1-avanzado-32",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Proyección del bosque",
    "passage": "Un modelo estimó la expansión de un bosque bajo tres escenarios de protección. Las estimaciones dependían de supuestos climáticos y de uso de suelo. Los expertos aclararon que las superficies futuras no habían sido observadas.",
    "order": {
      "parts": [
        "Identificar los tres escenarios utilizados.",
        "Reconocer la dependencia de supuestos futuros.",
        "Inferir que cambiar las condiciones podría cambiar la proyección."
      ],
      "hint": "Ordena la observación, los indicios y la inferencia que no excede el texto.",
      "explanation": "En «Proyección del bosque», el razonamiento parte del hecho observado, examina los indicios o las limitaciones y termina con una inferencia prudente."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-reconstruct-v1-avanzado-33",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Interpretación del promedio",
    "passage": "Una prueba educativa mostró una mejora media, pero algunas escuelas empeoraron y otras mejoraron mucho. La revisión añadió resultados desagregados para evitar concluir que todos los alumnos progresaron en la misma proporción.",
    "order": {
      "parts": [
        "Identificar la media y los resultados heterogéneos.",
        "Examinar cómo varían los grupos.",
        "Inferir que el promedio oculta trayectorias diferentes."
      ],
      "hint": "Ordena la observación, los indicios y la inferencia que no excede el texto.",
      "explanation": "En «Interpretación del promedio», el razonamiento parte del hecho observado, examina los indicios o las limitaciones y termina con una inferencia prudente."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-reconstruct-v1-avanzado-34",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Citas de segunda mano",
    "passage": "Un ensayo atribuyó una frase a un documento histórico, pero su autor solo había consultado un comentario posterior. La editora pidió localizar el original o aclarar expresamente la cita indirecta.",
    "order": {
      "parts": [
        "Identificar que no se consultó la fuente original.",
        "Reconocer el riesgo de atribución imprecisa.",
        "Inferir que verificar el documento permitiría mejorar la fidelidad de la cita."
      ],
      "hint": "Ordena la observación, los indicios y la inferencia que no excede el texto.",
      "explanation": "En «Citas de segunda mano», el razonamiento parte del hecho observado, examina los indicios o las limitaciones y termina con una inferencia prudente."
    },
    "reviewStatus": "editorial-draft"
  }
];