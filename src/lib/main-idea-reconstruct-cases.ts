import type {Level} from "./grammar";
export type MainIdeaReconstructCase={id:string;level:Level;subtopic:"Idea principal";title:string;passage:string;order:{parts:[string,string,string];hint:string;explanation:string};reviewStatus:"editorial-draft"};
/** 36 escenarios de lectura independientes para ordenar hechos, condiciones e idea central. */
export const MAIN_IDEA_RECONSTRUCT_CASES:MainIdeaReconstructCase[]=[
  {
    "id": "reading-main-reconstruct-v1-principiante-0",
    "level": "principiante",
    "subtopic": "Idea principal",
    "title": "El boletín meteorológico",
    "passage": "Un boletín escolar informó que el martes hubo lluvia intensa. El miércoles se limpiaron los canales del patio y el jueves se revisó si quedaban charcos. El texto explica una respuesta gradual a un problema del entorno.",
    "order": {
      "parts": [
        "La lluvia del martes ocasionó un problema en el patio.",
        "Ante ese problema, el miércoles se limpiaron los canales y el jueves se comprobó si quedaban charcos.",
        "La secuencia de acciones muestra una respuesta gradual al problema de drenaje."
      ],
      "hint": "Reconstruye la secuencia que conecta evidencia, interpretación y síntesis del pasaje.",
      "explanation": "La lluvia antecede a la limpieza; la revisión posterior permite sintetizar la respuesta, sin afirmar que el drenaje quedó reparado."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-reconstruct-v1-principiante-1",
    "level": "principiante",
    "subtopic": "Idea principal",
    "title": "Los instrumentos del coro",
    "passage": "El coro recibió instrumentos donados y anotó cuáles necesitaban reparación. Después organizó una jornada de mantenimiento antes de iniciar los ensayos. El artículo describe la preparación de una actividad musical, no un concierto ya realizado.",
    "order": {
      "parts": [
        "El coro recibió instrumentos mediante una donación.",
        "Con esos instrumentos disponibles, se revisaron sus necesidades de reparación y se realizó mantenimiento antes de ensayar.",
        "La preparación del material permitió organizar el inicio de las actividades musicales."
      ],
      "hint": "Reconstruye la secuencia que conecta evidencia, interpretación y síntesis del pasaje.",
      "explanation": "La donación precede a la revisión; el mantenimiento prepara los ensayos. El artículo no describe un concierto realizado."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-reconstruct-v1-principiante-2",
    "level": "principiante",
    "subtopic": "Idea principal",
    "title": "Un jardín de mariposas",
    "passage": "Un curso decidió reservar flores nativas en un rincón del patio. Primero observó qué especies crecían allí y después plantó otras variedades recomendadas por un vivero. El relato cuenta una intervención ambiental que aún está siendo observada.",
    "order": {
      "parts": [
        "El curso observó las especies que ya crecían en el rincón del patio.",
        "A partir de esa observación, incorporó otras variedades recomendadas por un vivero.",
        "La intervención creó gradualmente un espacio de flores nativas cuyo desarrollo sigue observándose."
      ],
      "hint": "Reconstruye la secuencia que conecta evidencia, interpretación y síntesis del pasaje.",
      "explanation": "El texto ordena observación y plantación; no demuestra que hayan llegado mariposas ni que la intervención haya concluido."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-reconstruct-v1-principiante-3",
    "level": "principiante",
    "subtopic": "Idea principal",
    "title": "La primera exposición",
    "passage": "Un alumno preparó fotografías de edificios antiguos para una exposición. Consultó fechas con vecinos y escribió pequeños carteles sobre cada imagen. El resultado fue una muestra sobre la memoria del pueblo.",
    "order": {
      "parts": [
        "El alumno seleccionó fotografías de edificios antiguos.",
        "Para contextualizar esas imágenes, consultó fechas y redactó carteles.",
        "Las fotografías contextualizadas integraron una muestra de memoria local."
      ],
      "hint": "Reconstruye la secuencia que conecta evidencia, interpretación y síntesis del pasaje.",
      "explanation": "Las imágenes son el material inicial; las fechas y carteles les aportan contexto, que permite explicar el propósito de la exposición."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-reconstruct-v1-principiante-4",
    "level": "principiante",
    "subtopic": "Idea principal",
    "title": "Ropa para el invierno",
    "passage": "Un colectivo reunió abrigos para familias de una zona fría. Los voluntarios clasificaron las prendas por talla antes de organizar puntos de entrega. El anuncio explica cómo se preparó una ayuda comunitaria.",
    "order": {
      "parts": [
        "El colectivo reunió abrigos destinados a familias de una zona fría.",
        "Con las prendas reunidas, organizó su clasificación por talla y los puntos de entrega.",
        "Estas acciones constituyen la preparación de una ayuda comunitaria."
      ],
      "hint": "Reconstruye la secuencia que conecta evidencia, interpretación y síntesis del pasaje.",
      "explanation": "La clasificación presupone disponer de prendas; organizar el reparto no equivale a haberlo completado."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-reconstruct-v1-principiante-5",
    "level": "principiante",
    "subtopic": "Idea principal",
    "title": "Señales del sendero",
    "passage": "Un grupo de jóvenes recorrió un sendero natural y detectó señales deterioradas. Dibujó un mapa de los tramos afectados y lo entregó a quienes mantienen el parque. El escrito presenta un diagnóstico, no la reparación completa.",
    "order": {
      "parts": [
        "Los jóvenes detectaron señales deterioradas en el sendero.",
        "Con los daños identificados, elaboraron un mapa y lo entregaron a los responsables del parque.",
        "El recorrido permitió documentar necesidades de mantenimiento, no comprobar su reparación."
      ],
      "hint": "Reconstruye la secuencia que conecta evidencia, interpretación y síntesis del pasaje.",
      "explanation": "El mapa depende del reconocimiento de daños; su entrega constituye un diagnóstico y no prueba reparación."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-reconstruct-v1-principiante-6",
    "level": "principiante",
    "subtopic": "Idea principal",
    "title": "El campeonato amistoso",
    "passage": "Dos escuelas organizaron un campeonato sin clasificación por puntos. Prepararon reglas comunes y acordaron turnos para que participaran todos los equipos inscritos. La nota resalta el carácter cooperativo del encuentro.",
    "order": {
      "parts": [
        "Las escuelas organizaron un campeonato sin clasificación por puntos.",
        "Para realizar ese encuentro, acordaron reglas y turnos que permitieran participar a los equipos inscritos.",
        "Los acuerdos reflejan el carácter cooperativo del campeonato."
      ],
      "hint": "Reconstruye la secuencia que conecta evidencia, interpretación y síntesis del pasaje.",
      "explanation": "La modalidad del encuentro explica los acuerdos de participación y permite sintetizar su propósito cooperativo."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-reconstruct-v1-intermedio-7",
    "level": "intermedio",
    "subtopic": "Idea principal",
    "title": "Bibliotecas por turno",
    "passage": "Tres escuelas compartieron una biblioteca de recursos digitales. Un análisis encontró horas de conexión distintas entre los centros y describió las restricciones de sus redes. La propuesta planteó horarios escalonados antes de aumentar las licencias.",
    "order": {
      "parts": [
        "Los centros compartían recursos digitales y tenían distintas horas de conexión.",
        "Ante esas diferencias de acceso, se propusieron horarios escalonados antes de ampliar licencias.",
        "La propuesta buscaba organizar el acceso teniendo en cuenta las restricciones de conexión."
      ],
      "hint": "Reconstruye la secuencia que conecta evidencia, interpretación y síntesis del pasaje.",
      "explanation": "El diagnóstico precede a la propuesta; no se afirma que esta haya logrado igualdad efectiva."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-reconstruct-v1-intermedio-8",
    "level": "intermedio",
    "subtopic": "Idea principal",
    "title": "Lago y visitantes",
    "passage": "Un parque registró más visitas después de inaugurar un mirador. Durante el mismo mes también mejoró la carretera de acceso. El informe evitó atribuir toda la asistencia al mirador porque hubo dos cambios relevantes.",
    "order": {
      "parts": [
        "El parque registró más visitas tras inaugurar el mirador.",
        "Al interpretar ese aumento, debe considerarse que también mejoró la carretera durante el mismo mes.",
        "La concurrencia de ambos cambios impide atribuir toda la asistencia al mirador."
      ],
      "hint": "Reconstruye la secuencia que conecta evidencia, interpretación y síntesis del pasaje.",
      "explanation": "La variación de visitas es el resultado; identificar otro cambio simultáneo permite reconocer el límite causal."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-reconstruct-v1-intermedio-9",
    "level": "intermedio",
    "subtopic": "Idea principal",
    "title": "Dos cronistas",
    "passage": "Una clase leyó dos crónicas sobre una celebración antigua. Ambas coincidían en la plaza, pero diferían en la cantidad de asistentes. Los estudiantes examinaron la procedencia y señalaron qué cifra requería corroboración.",
    "order": {
      "parts": [
        "Las crónicas coinciden en la plaza, pero difieren en la cantidad de asistentes.",
        "Para evaluar esa discrepancia, los estudiantes examinaron la procedencia de los relatos.",
        "La cifra de asistencia requiere corroboración antes de presentarse como cierta."
      ],
      "hint": "Reconstruye la secuencia que conecta evidencia, interpretación y síntesis del pasaje.",
      "explanation": "Primero se delimita qué dato discrepa; después se evalúan sus fuentes y se establece qué falta comprobar."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-reconstruct-v1-intermedio-10",
    "level": "intermedio",
    "subtopic": "Idea principal",
    "title": "Un laboratorio ambulante",
    "passage": "Un laboratorio móvil visitó tres centros educativos para demostrar experimentos sencillos. Los instructores registraron qué materiales se utilizaron y qué preguntas formularon los estudiantes. El informe se limitó a esas visitas y no supuso iguales resultados en todos los colegios.",
    "order": {
      "parts": [
        "El laboratorio realizó demostraciones en tres centros educativos.",
        "Durante esas visitas registró materiales y preguntas de los estudiantes.",
        "El informe describe las experiencias registradas sin extenderlas a todos los colegios."
      ],
      "hint": "Reconstruye la secuencia que conecta evidencia, interpretación y síntesis del pasaje.",
      "explanation": "La recopilación queda delimitada por las visitas realizadas; esa delimitación determina el alcance de la conclusión."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-reconstruct-v1-intermedio-11",
    "level": "intermedio",
    "subtopic": "Idea principal",
    "title": "Pesca sostenible",
    "passage": "Una cooperativa registró capturas de distintas especies durante dos meses. Encontró diferencias entre playas, pero los pescadores también habían utilizado redes de tamaños distintos. El documento pidió comparar métodos antes de afirmar que una playa tenía mayor abundancia.",
    "order": {
      "parts": [
        "Las capturas registradas mostraron diferencias entre playas.",
        "Para interpretar esas diferencias, debe considerarse que se utilizaron redes de tamaños distintos.",
        "Comparar abundancia requiere métodos de captura comparables."
      ],
      "hint": "Reconstruye la secuencia que conecta evidencia, interpretación y síntesis del pasaje.",
      "explanation": "Los registros son el punto de partida; las diferencias de método pueden alterar las capturas y limitan la comparación."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-reconstruct-v1-intermedio-12",
    "level": "intermedio",
    "subtopic": "Idea principal",
    "title": "El teatro del colegio",
    "passage": "El teatro escolar presentó una obra para recaudar fondos. Los responsables registraron boletos y gastos de montaje y después calcularon el dinero disponible para materiales. La nota distinguió ingresos brutos de ganancias finales.",
    "order": {
      "parts": [
        "La venta de boletos produjo ingresos para la actividad escolar.",
        "Para calcular el saldo disponible de esos ingresos, se descontaron los gastos de montaje.",
        "El dinero disponible no equivale a la recaudación bruta."
      ],
      "hint": "Reconstruye la secuencia que conecta evidencia, interpretación y síntesis del pasaje.",
      "explanation": "El saldo depende de los ingresos y los costos; por eso no puede identificarse con el total de boletos vendidos."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-reconstruct-v1-intermedio-13",
    "level": "intermedio",
    "subtopic": "Idea principal",
    "title": "Un programa de tutorías",
    "passage": "Un centro ofreció tutorías por las tardes. Quienes asistieron mejoraron su promedio, pero el informe destacó que se inscribieron voluntariamente y tenían notas iniciales distintas. El equipo pidió controlar esas diferencias antes de atribuir mejoras.",
    "order": {
      "parts": [
        "Los participantes de las tutorías mejoraron su promedio.",
        "Para interpretar esa mejora, se consideran la inscripción voluntaria y las notas iniciales distintas.",
        "El cambio observado no demuestra por sí solo el efecto causal de las tutorías."
      ],
      "hint": "Reconstruye la secuencia que conecta evidencia, interpretación y síntesis del pasaje.",
      "explanation": "La mejora es el resultado observado; selección y condiciones iniciales limitan su atribución causal."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-reconstruct-v1-intermedio-14",
    "level": "intermedio",
    "subtopic": "Idea principal",
    "title": "Dos huellas en el mapa",
    "passage": "Dos mapas mostraban caminos de la montaña en épocas diferentes. El más nuevo incluía un sendero que no figuraba en el anterior, pero la escala era distinta. El informe propuso verificar el terreno antes de hablar de un camino recién construido.",
    "order": {
      "parts": [
        "El mapa reciente representa un sendero ausente en el anterior.",
        "Antes de interpretar esa diferencia como una construcción, se considera que las escalas son distintas.",
        "Se requiere verificar el terreno para establecer si el camino es nuevo."
      ],
      "hint": "Reconstruye la secuencia que conecta evidencia, interpretación y síntesis del pasaje.",
      "explanation": "Una diferencia de representación puede deberse a la escala; la comprobación física es necesaria antes de afirmar una construcción reciente."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-reconstruct-v1-intermedio-15",
    "level": "intermedio",
    "subtopic": "Idea principal",
    "title": "Consulta sobre desayunos",
    "passage": "Un colegio consultó a familias sobre el desayuno escolar. Participaron principalmente personas que pudieron asistir a una reunión matutina. La comisión propuso recoger respuestas en otros horarios antes de hablar de las preferencias de todas las familias.",
    "order": {
      "parts": [
        "La consulta reunió principalmente familias disponibles en la mañana.",
        "Esa forma de selección deja menos representadas a familias con otros horarios.",
        "Ampliar los horarios de consulta permitiría incorporar más perspectivas."
      ],
      "hint": "Reconstruye la secuencia que conecta evidencia, interpretación y síntesis del pasaje.",
      "explanation": "La composición de la muestra explica su limitación y fundamenta la propuesta, sin garantizar representatividad completa."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-reconstruct-v1-intermedio-16",
    "level": "intermedio",
    "subtopic": "Idea principal",
    "title": "Medición de árboles",
    "passage": "Una brigada midió el diámetro de árboles urbanos en tres avenidas. La muestra no incluyó parques ni zonas rurales. El reporte enumeró sus resultados sin afirmar que describían toda la vegetación del municipio.",
    "order": {
      "parts": [
        "La brigada midió árboles en tres avenidas.",
        "Al delimitar esa muestra, se observa que no incluyó parques ni zonas rurales.",
        "Los resultados describen los árboles medidos, no toda la vegetación municipal."
      ],
      "hint": "Reconstruye la secuencia que conecta evidencia, interpretación y síntesis del pasaje.",
      "explanation": "El ámbito de observación determina qué poblaciones pueden describirse; las zonas excluidas no están representadas."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-reconstruct-v1-intermedio-17",
    "level": "intermedio",
    "subtopic": "Idea principal",
    "title": "Historia de una fiesta",
    "passage": "Dos asociaciones entrevistaron a personas mayores sobre el origen de una fiesta. Varias recordaban la misma plaza, aunque las fechas diferían. Los autores compararon registros parroquiales antes de preparar un folleto explicativo.",
    "order": {
      "parts": [
        "Los testimonios coinciden en la plaza, pero difieren en las fechas.",
        "Para aclarar las fechas discrepantes se contrastaron registros parroquiales.",
        "La reconstrucción de la celebración requiere corroborar las memorias con documentos."
      ],
      "hint": "Reconstruye la secuencia que conecta evidencia, interpretación y síntesis del pasaje.",
      "explanation": "La discrepancia identifica qué comprobar; los registros proporcionan evidencia adicional para construir una síntesis."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-reconstruct-v1-intermedio-18",
    "level": "intermedio",
    "subtopic": "Idea principal",
    "title": "Semillas y temperatura",
    "passage": "Un club científico comparó la germinación de semillas en cajas colocadas a temperaturas diferentes. Al revisar el ensayo, notó que una caja también tenía mayor humedad. El grupo decidió repetirlo manteniendo el riego constante.",
    "order": {
      "parts": [
        "El ensayo comparó germinación a temperaturas distintas.",
        "Al revisar esa comparación se detectó que también variaba la humedad.",
        "Se propuso repetir el ensayo con riego constante para reducir una fuente de variación."
      ],
      "hint": "Reconstruye la secuencia que conecta evidencia, interpretación y síntesis del pasaje.",
      "explanation": "La humedad dificulta aislar la temperatura; mantener el riego constante es la medida propuesta, no una garantía de humedad idéntica."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-reconstruct-v1-avanzado-19",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Tasas de egreso",
    "passage": "Dos universidades publicaron tasas de graduación. Una contaba títulos otorgados durante el año y otra incluía estudiantes que terminaron materias aunque aún no recibían diploma. Los analistas advirtieron que los valores no podían compararse sin una definición común.",
    "order": {
      "parts": [
        "Una tasa cuenta títulos otorgados y la otra incluye a quienes terminaron materias sin diploma.",
        "Estas definiciones pueden clasificar como egresada a una misma persona en una universidad y no en la otra.",
        "Se necesita una definición común antes de comparar las tasas."
      ],
      "hint": "Reconstruye la secuencia que conecta evidencia, interpretación y síntesis del pasaje.",
      "explanation": "El texto permite identificar una diferencia en el criterio de conteo, pero no especifica denominadores distintos."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-reconstruct-v1-avanzado-20",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Ensayo de movilidad",
    "passage": "Una ciudad modificó semáforos y rutas de autobús durante el mismo trimestre. Los tiempos de viaje disminuyeron, pero no existía un grupo de comparación. Un informe técnico recomendó un estudio adicional antes de asignar a una medida el cambio completo.",
    "order": {
      "parts": [
        "La ciudad modificó semáforos y rutas mientras disminuían los tiempos de viaje.",
        "Para atribuir esa reducción, faltan comparaciones que separen los efectos de las medidas simultáneas.",
        "Los efectos causales individuales siguen sin establecerse."
      ],
      "hint": "Reconstruye la secuencia que conecta evidencia, interpretación y síntesis del pasaje.",
      "explanation": "La coincidencia temporal y la ausencia de un grupo de comparación impiden identificar qué parte corresponde a cada intervención."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-reconstruct-v1-avanzado-21",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Archivo de correspondencia",
    "passage": "Un equipo encontró cartas privadas, un acta pública y una crónica posterior sobre una disputa histórica. Las versiones discrepaban en los motivos, aunque coincidían en el año. El informe examinó propósitos e intereses antes de integrar una interpretación provisional.",
    "order": {
      "parts": [
        "Las cartas, el acta y la crónica coinciden en el año, pero discrepan sobre los motivos.",
        "Para interpretar esas discrepancias se examinan los propósitos e intereses de cada fuente.",
        "La síntesis histórica debe mantenerse provisional mientras persistan discrepancias no resueltas."
      ],
      "hint": "Reconstruye la secuencia que conecta evidencia, interpretación y síntesis del pasaje.",
      "explanation": "Identificar coincidencias y desacuerdos permite orientar el contraste de fuentes y delimitar la interpretación."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-reconstruct-v1-avanzado-22",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Escalas escolares",
    "passage": "Una red de escuelas compartió notas expresadas en escalas de cero a diez y de cero a cien. Los profesores explicaron que las pruebas no medían necesariamente las mismas competencias. El análisis recomendó revisar contenido y criterios antes de transformar puntuaciones.",
    "order": {
      "parts": [
        "Las escuelas utilizan escalas de cero a diez y de cero a cien.",
        "Una vez identificada la diferencia de escala, debe comprobarse si las pruebas evalúan competencias equivalentes.",
        "Transformar las puntuaciones no garantiza que las mediciones sean comparables."
      ],
      "hint": "Reconstruye la secuencia que conecta evidencia, interpretación y síntesis del pasaje.",
      "explanation": "La equivalencia numérica no demuestra equivalencia de contenido; revisar competencias y criterios antecede a combinar puntuaciones."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-reconstruct-v1-avanzado-23",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Residuos y población",
    "passage": "Dos barrios publicaron cantidades de residuos recuperados por semana. Uno contaba con más habitantes y contenedores, mientras el otro tenía recogidas menos frecuentes. La comparación propuso calcular cantidades por persona y por jornada de servicio.",
    "order": {
      "parts": [
        "Los barrios publicaron cantidades semanales de residuos recuperados.",
        "Para interpretar esos totales, se consideran diferencias de población, contenedores y frecuencia de servicio.",
        "Se propone normalizar los datos por persona y jornada antes de comparar desempeños."
      ],
      "hint": "Reconstruye la secuencia que conecta evidencia, interpretación y síntesis del pasaje.",
      "explanation": "Los totales dependen de condiciones de servicio y población; la normalización permite una comparación mejor delimitada."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-reconstruct-v1-avanzado-24",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Salud y clima",
    "passage": "Un informe observó más consultas respiratorias durante días fríos. Los autores señalaron que también podían variar los niveles de contaminación y las prácticas de atención médica. El estudio presentó asociación temporal sin atribuir una causa exclusiva.",
    "order": {
      "parts": [
        "Se observó un aumento de consultas respiratorias durante días fríos.",
        "Al interpretar esa asociación se consideran posibles variaciones de contaminación y prácticas de atención médica.",
        "La asociación temporal no permite establecer una causa exclusiva."
      ],
      "hint": "Reconstruye la secuencia que conecta evidencia, interpretación y síntesis del pasaje.",
      "explanation": "Las variables alternativas limitan la atribución al frío; el informe presenta una asociación, no una demostración causal."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-reconstruct-v1-avanzado-25",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Prueba de lectores",
    "passage": "Una biblioteca comparó dos cuestionarios sobre comprensión. Uno medía la identificación de ideas principales y otro incluía preguntas sobre vocabulario técnico. Los coordinadores se negaron a combinar promedios sin comprobar la equivalencia de habilidades evaluadas.",
    "order": {
      "parts": [
        "Un cuestionario evalúa ideas principales y otro incluye vocabulario técnico.",
        "La diferencia de contenido obliga a comprobar si ambos instrumentos miden habilidades equivalentes.",
        "No deben combinarse los promedios sin verificar esa equivalencia."
      ],
      "hint": "Reconstruye la secuencia que conecta evidencia, interpretación y síntesis del pasaje.",
      "explanation": "La habilidad medida determina el significado de una puntuación; combinar promedios sin equivalencia puede distorsionar la interpretación."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-reconstruct-v1-avanzado-26",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Diferencias de abandono",
    "passage": "Un programa inició con trescientos participantes y terminó con doscientos cuarenta. Las personas ausentes tenían mayor distancia de transporte según registros iniciales. El informe discutió el sesgo de abandono antes de presentar el promedio final.",
    "order": {
      "parts": [
        "De trescientos participantes iniciales quedaron doscientos cuarenta, por lo que sesenta no completaron el seguimiento.",
        "Entre quienes no completaron el seguimiento se observó mayor distancia inicial de transporte.",
        "El promedio de los participantes restantes exige cautela al generalizar al grupo inicial."
      ],
      "hint": "Reconstruye la secuencia que conecta evidencia, interpretación y síntesis del pasaje.",
      "explanation": "La pérdida de sesenta personas y sus diferencias iniciales indican un posible sesgo de abandono, no prueban su magnitud."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-reconstruct-v1-avanzado-27",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Sensibilidad de informes",
    "passage": "Un equipo eliminó diez observaciones extremas antes de calcular un indicador. La primera versión no explicó los criterios; la segunda mostró cálculos con y sin exclusiones. El documento final destacó cuánto dependía la conclusión de la selección de datos.",
    "order": {
      "parts": [
        "Se excluyeron diez observaciones extremas sin justificar inicialmente el criterio.",
        "Para valorar esa decisión, se compararon los cálculos con y sin los registros excluidos.",
        "Las exclusiones deben justificarse y su efecto sobre la conclusión debe evaluarse."
      ],
      "hint": "Reconstruye la secuencia que conecta evidencia, interpretación y síntesis del pasaje.",
      "explanation": "El análisis de sensibilidad muestra cuánto cambia el indicador según la selección de datos."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-reconstruct-v1-avanzado-28",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Becas y desigualdad",
    "passage": "Un programa de becas mostró una mejora media, aunque los beneficios fueron mayores en áreas urbanas que rurales. La evaluación presentó resultados separados por zona y propuso estudiar diferencias de acceso antes de extender la intervención.",
    "order": {
      "parts": [
        "La mejora media del programa fue mayor en zonas urbanas que rurales.",
        "Ante esa diferencia territorial, se propone investigar las condiciones de acceso.",
        "El promedio no describe beneficios uniformes ni basta para decidir la ampliación."
      ],
      "hint": "Reconstruye la secuencia que conecta evidencia, interpretación y síntesis del pasaje.",
      "explanation": "La heterogeneidad observada fundamenta el análisis por zonas; las causas de la diferencia todavía deben estudiarse."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-reconstruct-v1-avanzado-29",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Tasas y pirámides",
    "passage": "Dos regiones registraron distintas tasas de enfermedad. Una tenía mayor proporción de personas mayores y otra contaba con población más joven. Los investigadores calcularon tasas ajustadas antes de interpretar diferencias de riesgo.",
    "order": {
      "parts": [
        "Las regiones presentan tasas de enfermedad y estructuras de edad distintas.",
        "Para interpretar la diferencia de tasas, se examina el posible efecto de la composición etaria.",
        "Las tasas ajustadas permiten una comparación que tiene en cuenta la edad."
      ],
      "hint": "Reconstruye la secuencia que conecta evidencia, interpretación y síntesis del pasaje.",
      "explanation": "La edad puede modificar las tasas brutas; ajustarla no demuestra que todos los demás factores hayan sido controlados."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-reconstruct-v1-avanzado-30",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Predicciones agrícolas",
    "passage": "Un organismo elaboró escenarios de cosecha basados en tres patrones posibles de lluvia. Las cifras dependían de supuestos climáticos todavía inciertos. La nota explicó que no debían leerse como producción efectivamente recogida.",
    "order": {
      "parts": [
        "Las estimaciones de cosecha se elaboraron bajo tres escenarios de lluvia.",
        "Cada escenario produce cifras condicionadas por supuestos climáticos inciertos.",
        "Las proyecciones no equivalen a cantidades de cosecha efectivamente observadas."
      ],
      "hint": "Reconstruye la secuencia que conecta evidencia, interpretación y síntesis del pasaje.",
      "explanation": "Los supuestos anteceden a las estimaciones y determinan su carácter condicional."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-reconstruct-v1-avanzado-31",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Perspectivas de migración",
    "passage": "Un estudio entrevistó familias migrantes y consultó registros administrativos. Algunos testimonios hablaron de empleo y otros de factores ambientales, sin que existiera una sola causa común. El informe diferenció experiencias individuales de estimaciones poblacionales.",
    "order": {
      "parts": [
        "El estudio reunió entrevistas familiares y registros administrativos.",
        "Al contrastar esas fuentes se reconocieron razones migratorias múltiples y distintos alcances de información.",
        "Las experiencias individuales no demuestran una causa universal ni una frecuencia poblacional."
      ],
      "hint": "Reconstruye la secuencia que conecta evidencia, interpretación y síntesis del pasaje.",
      "explanation": "Distinguir tipos de fuente y motivos permite limitar las conclusiones a lo que cada evidencia sustenta."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-reconstruct-v1-avanzado-32",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Cambio de instrumento",
    "passage": "Un laboratorio instaló un sensor nuevo a mitad de una serie ambiental. Las lecturas posteriores aumentaron, pero el equipo tenía una sensibilidad distinta. El grupo midió ambos instrumentos en paralelo antes de concluir que los cambios reflejaban el entorno.",
    "order": {
      "parts": [
        "Las lecturas aumentaron después de instalar un sensor de sensibilidad distinta.",
        "Para distinguir un cambio instrumental de uno ambiental, se midieron ambos equipos en paralelo.",
        "La comparación de la serie requiere establecer la comparabilidad de las mediciones."
      ],
      "hint": "Reconstruye la secuencia que conecta evidencia, interpretación y síntesis del pasaje.",
      "explanation": "El cambio de sensibilidad puede afectar los valores; las mediciones paralelas aportan evidencia para interpretar la discontinuidad."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-reconstruct-v1-avanzado-33",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Consenso cuestionado",
    "passage": "Una revisión de investigaciones encontró estudios positivos y negativos sobre un método. Algunos tenían muestras pequeñas y otros seguimientos largos. Los autores clasificaron diseños y límites antes de evitar una conclusión de consenso inexistente.",
    "order": {
      "parts": [
        "La revisión encontró investigaciones con resultados positivos y negativos.",
        "Para valorar esos resultados, los autores clasificaron diseños y limitaciones de los estudios.",
        "La síntesis debe reconocer los desacuerdos sin afirmar un consenso inexistente."
      ],
      "hint": "Reconstruye la secuencia que conecta evidencia, interpretación y síntesis del pasaje.",
      "explanation": "El sentido de los resultados depende de su evidencia metodológica; no basta contar estudios favorables o desfavorables."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-reconstruct-v1-avanzado-34",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Índices económicos",
    "passage": "Un municipio anunció una reducción de costos energéticos. También habían bajado tarifas y se cerraron edificios parte del mes. El informe propuso separar precio, consumo y días operativos antes de valorar la eficiencia de la intervención.",
    "order": {
      "parts": [
        "El municipio informó una disminución de costos energéticos.",
        "Para interpretar ese descenso se consideran las tarifas reducidas y los cierres de edificios.",
        "Evaluar eficiencia requiere distinguir precio, consumo físico y tiempo operativo."
      ],
      "hint": "Reconstruye la secuencia que conecta evidencia, interpretación y síntesis del pasaje.",
      "explanation": "El gasto monetario depende de factores adicionales al consumo; su reducción no demuestra por sí sola mayor eficiencia."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-reconstruct-v1-avanzado-35",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Resumen de educación",
    "passage": "Una evaluación escolar informó mejora en la media de escritura, aunque algunos grados empeoraron. La conclusión inicial decía que toda la escuela había mejorado. La revisión corrigió esa generalización y describió las diferencias entre niveles.",
    "order": {
      "parts": [
        "La media de escritura mejoró, aunque algunos grados retrocedieron.",
        "La comparación por grado revela que la media oculta resultados diferentes.",
        "La conclusión debe distinguir la mejora agregada de los retrocesos por nivel."
      ],
      "hint": "Reconstruye la secuencia que conecta evidencia, interpretación y síntesis del pasaje.",
      "explanation": "La desagregación permite corregir la generalización de que toda la escuela mejoró."
    },
    "reviewStatus": "editorial-draft"
  }
];
