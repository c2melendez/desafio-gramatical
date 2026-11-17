import type {Level} from "./grammar";
export type InferenceChoiceCase={id:string;level:Level;subtopic:"Inferencias";title:string;passage:string;question:string;options:[string,string,string,string];answer:number;explanation:string;reviewStatus:"editorial-draft"};
/** 36 textos nuevos con inferencias plausibles y distractores contextualizados. */
export const INFERENCE_CHOICE_CASES:InferenceChoiceCase[]=[
  {
    "id": "reading-inference-choice-v1-principiante-0",
    "level": "principiante",
    "subtopic": "Inferencias",
    "title": "Cartas sin sello",
    "passage": "En un salón se prepararon cartas para visitar un museo. La profesora encontró que algunas no tenían el nombre del destinatario y pidió completar ese dato antes de entregarlas. Nadie anunció todavía cuándo saldrían las cartas.",
    "question": "¿Qué conclusión es razonable a partir de las pistas, sin presentarse literalmente como hecho confirmado?",
    "options": [
      "Las cartas incompletas podrían retrasar su entrega.",
      "Algunas cartas carecían de destinatario.",
      "Todas las cartas ya llegaron al museo.",
      "La profesora canceló para siempre la visita."
    ],
    "answer": 0,
    "explanation": "La opción «Las cartas incompletas podrían retrasar su entrega.» se infiere de indicios del texto; «Algunas cartas carecían de destinatario.» es un dato expresamente mencionado, mientras que las otras opciones exceden la información disponible.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-choice-v1-principiante-1",
    "level": "principiante",
    "subtopic": "Inferencias",
    "title": "El farol del callejón",
    "passage": "Los vecinos solicitaron reparar un farol que se apagaba cada noche. Un electricista revisó los cables y encontró una pieza desgastada, pero explicó que necesitaría un repuesto antes de completar el trabajo.",
    "question": "¿Qué conclusión es razonable a partir de las pistas, sin presentarse literalmente como hecho confirmado?",
    "options": [
      "Se encontró una pieza desgastada.",
      "El farol fue reparado completamente esa noche.",
      "Toda la red eléctrica de la ciudad está dañada.",
      "La iluminación podría mejorar cuando se consiga el repuesto."
    ],
    "answer": 3,
    "explanation": "La opción «La iluminación podría mejorar cuando se consiga el repuesto.» se infiere de indicios del texto; «Se encontró una pieza desgastada.» es un dato expresamente mencionado, mientras que las otras opciones exceden la información disponible.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-choice-v1-principiante-2",
    "level": "principiante",
    "subtopic": "Inferencias",
    "title": "El vivero de la escuela",
    "passage": "Un grupo observó que varias plantas del vivero tenían hojas secas. La encargada explicó que los recipientes habían recibido poca agua durante las vacaciones y propuso ajustar los turnos de riego.",
    "question": "¿Qué conclusión es razonable a partir de las pistas, sin presentarse literalmente como hecho confirmado?",
    "options": [
      "Todas las plantas murieron sin excepción.",
      "La luz no interviene jamás en su crecimiento.",
      "Un riego más regular podría ayudar a las plantas.",
      "Algunos recipientes recibieron poca agua."
    ],
    "answer": 2,
    "explanation": "La opción «Un riego más regular podría ayudar a las plantas.» se infiere de indicios del texto; «Algunos recipientes recibieron poca agua.» es un dato expresamente mencionado, mientras que las otras opciones exceden la información disponible.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-choice-v1-principiante-3",
    "level": "principiante",
    "subtopic": "Inferencias",
    "title": "Camino de regreso",
    "passage": "Los estudiantes encontraron una calle cerrada por trabajos de reparación y regresaron por una ruta diferente. Llegaron unos minutos más tarde y la directora pidió avisar a las familias cuando hubiera cambios de acceso.",
    "question": "¿Qué conclusión es razonable a partir de las pistas, sin presentarse literalmente como hecho confirmado?",
    "options": [
      "La escuela prohibió caminar por cualquier calle.",
      "Los cambios de ruta pueden afectar la hora de llegada.",
      "Los estudiantes usaron otra ruta.",
      "La calle permanecerá cerrada todo el año."
    ],
    "answer": 1,
    "explanation": "La opción «Los cambios de ruta pueden afectar la hora de llegada.» se infiere de indicios del texto; «Los estudiantes usaron otra ruta.» es un dato expresamente mencionado, mientras que las otras opciones exceden la información disponible.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-choice-v1-principiante-4",
    "level": "principiante",
    "subtopic": "Inferencias",
    "title": "Bolsas reutilizables",
    "passage": "En un mercado, tres comerciantes comenzaron a ofrecer bolsas de tela. Algunos clientes llevaron bolsas propias y preguntaron si habría descuentos. Los comerciantes todavía no habían acordado ninguna promoción.",
    "question": "¿Qué conclusión es razonable a partir de las pistas, sin presentarse literalmente como hecho confirmado?",
    "options": [
      "Los clientes muestran interés en opciones para reducir bolsas desechables.",
      "Tres comerciantes ofrecieron bolsas de tela.",
      "Ya se aprobó un descuento obligatorio.",
      "El mercado eliminó todos los envases."
    ],
    "answer": 0,
    "explanation": "La opción «Los clientes muestran interés en opciones para reducir bolsas desechables.» se infiere de indicios del texto; «Tres comerciantes ofrecieron bolsas de tela.» es un dato expresamente mencionado, mientras que las otras opciones exceden la información disponible.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-choice-v1-principiante-5",
    "level": "principiante",
    "subtopic": "Inferencias",
    "title": "Un ensayo de coro",
    "passage": "El coro escolar comenzó a practicar una canción nueva y varias voces se adelantaban al ritmo. La directora decidió dedicar la siguiente sesión a escuchar la melodía y marcar las entradas antes de volver a cantarla.",
    "question": "¿Qué conclusión es razonable a partir de las pistas, sin presentarse literalmente como hecho confirmado?",
    "options": [
      "La directora propuso escuchar la melodía.",
      "El coro nunca podrá interpretar la canción.",
      "Todos los estudiantes dejaron de participar.",
      "La práctica del ritmo podría mejorar la coordinación del coro."
    ],
    "answer": 3,
    "explanation": "La opción «La práctica del ritmo podría mejorar la coordinación del coro.» se infiere de indicios del texto; «La directora propuso escuchar la melodía.» es un dato expresamente mencionado, mientras que las otras opciones exceden la información disponible.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-choice-v1-principiante-6",
    "level": "principiante",
    "subtopic": "Inferencias",
    "title": "El puesto de frutas",
    "passage": "Un vendedor puso mangos y naranjas a diferentes precios según su tamaño. Al final de la mañana observó que se habían vendido más naranjas, pero no anotó cuántos clientes habían preguntado por los mangos.",
    "question": "¿Qué conclusión es razonable a partir de las pistas, sin presentarse literalmente como hecho confirmado?",
    "options": [
      "La naranja será siempre la fruta más vendida.",
      "Ninguna persona mostró interés en los mangos.",
      "La demanda observada podría depender también del precio y el tamaño.",
      "Se vendieron más naranjas esa mañana."
    ],
    "answer": 2,
    "explanation": "La opción «La demanda observada podría depender también del precio y el tamaño.» se infiere de indicios del texto; «Se vendieron más naranjas esa mañana.» es un dato expresamente mencionado, mientras que las otras opciones exceden la información disponible.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-choice-v1-intermedio-7",
    "level": "intermedio",
    "subtopic": "Inferencias",
    "title": "Estaciones de recarga",
    "passage": "Una ciudad instaló puntos para cargar bicicletas eléctricas. Durante el primer mes hubo más recargas en el centro, pero también había más estaciones en ese sector. Los técnicos solicitaron cifras por estación antes de decidir dónde ampliar.",
    "question": "¿Qué conclusión es razonable a partir de las pistas, sin presentarse literalmente como hecho confirmado?",
    "options": [
      "Los otros barrios no utilizan bicicletas.",
      "El total del centro podría reflejar su mayor oferta de estaciones.",
      "Se observaron más recargas en el centro.",
      "Los usuarios del centro recargan más por persona con certeza."
    ],
    "answer": 1,
    "explanation": "La opción «El total del centro podría reflejar su mayor oferta de estaciones.» se infiere de indicios del texto; «Se observaron más recargas en el centro.» es un dato expresamente mencionado, mientras que las otras opciones exceden la información disponible.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-choice-v1-intermedio-8",
    "level": "intermedio",
    "subtopic": "Inferencias",
    "title": "Una antología juvenil",
    "passage": "Una editorial invitó a jóvenes a enviar cuentos a una antología. Recibió muchos textos de colegios urbanos y pocos de regiones rurales, donde la convocatoria se difundió más tarde. Decidió ampliar el plazo para recibir otras voces.",
    "question": "¿Qué conclusión es razonable a partir de las pistas, sin presentarse literalmente como hecho confirmado?",
    "options": [
      "La difusión desigual podría influir en la procedencia de los cuentos recibidos.",
      "La invitación llegó más tarde a zonas rurales.",
      "Los jóvenes rurales carecen de interés por escribir.",
      "La antología ya representa a todo el país."
    ],
    "answer": 0,
    "explanation": "La opción «La difusión desigual podría influir en la procedencia de los cuentos recibidos.» se infiere de indicios del texto; «La invitación llegó más tarde a zonas rurales.» es un dato expresamente mencionado, mientras que las otras opciones exceden la información disponible.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-choice-v1-intermedio-9",
    "level": "intermedio",
    "subtopic": "Inferencias",
    "title": "Taller de programación",
    "passage": "Un taller empezó con treinta inscritos y terminó con veintidós participantes. Los docentes registraron buenas notas entre quienes concluyeron, pero solicitaron información sobre los ocho ausentes antes de valorar el resultado total.",
    "question": "¿Qué conclusión es razonable a partir de las pistas, sin presentarse literalmente como hecho confirmado?",
    "options": [
      "Ocho personas no terminaron el taller.",
      "Todos los ausentes habrían tenido mejores notas.",
      "El taller demostró éxito universal.",
      "Las notas finales podrían no representar a quienes abandonaron."
    ],
    "answer": 3,
    "explanation": "La opción «Las notas finales podrían no representar a quienes abandonaron.» se infiere de indicios del texto; «Ocho personas no terminaron el taller.» es un dato expresamente mencionado, mientras que las otras opciones exceden la información disponible.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-choice-v1-intermedio-10",
    "level": "intermedio",
    "subtopic": "Inferencias",
    "title": "Fotografías del puerto",
    "passage": "Dos fotos del puerto parecían mostrar un cambio importante de altura en un muelle. Los investigadores encontraron que una se había tomado desde un edificio elevado y otra desde el agua. Buscaron planos antes de medir el cambio.",
    "question": "¿Qué conclusión es razonable a partir de las pistas, sin presentarse literalmente como hecho confirmado?",
    "options": [
      "El muelle fue elevado exactamente cinco metros.",
      "Las fotografías fueron manipuladas intencionalmente.",
      "La posición de la cámara podría explicar parte de la diferencia visual.",
      "Las fotos se tomaron desde lugares diferentes."
    ],
    "answer": 2,
    "explanation": "La opción «La posición de la cámara podría explicar parte de la diferencia visual.» se infiere de indicios del texto; «Las fotos se tomaron desde lugares diferentes.» es un dato expresamente mencionado, mientras que las otras opciones exceden la información disponible.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-choice-v1-intermedio-11",
    "level": "intermedio",
    "subtopic": "Inferencias",
    "title": "Notas de dos pruebas",
    "passage": "Dos cursos rindieron exámenes de ciencias en semanas distintas. Las preguntas no eran iguales y una prueba incluía tareas prácticas. La coordinadora pidió revisar el contenido antes de comparar los promedios.",
    "question": "¿Qué conclusión es razonable a partir de las pistas, sin presentarse literalmente como hecho confirmado?",
    "options": [
      "Los dos instrumentos eran idénticos.",
      "Las notas podrían medir habilidades parcialmente distintas.",
      "Una prueba tenía tareas prácticas.",
      "El curso con nota mayor aprendió necesariamente más."
    ],
    "answer": 1,
    "explanation": "La opción «Las notas podrían medir habilidades parcialmente distintas.» se infiere de indicios del texto; «Una prueba tenía tareas prácticas.» es un dato expresamente mencionado, mientras que las otras opciones exceden la información disponible.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-choice-v1-intermedio-12",
    "level": "intermedio",
    "subtopic": "Inferencias",
    "title": "La ruta del correo",
    "passage": "Una oficina postal informó menos entregas tardías después de reorganizar rutas. En el mismo período disminuyó el volumen de paquetes por vacaciones. Los responsables pidieron comparar semanas con cargas similares.",
    "question": "¿Qué conclusión es razonable a partir de las pistas, sin presentarse literalmente como hecho confirmado?",
    "options": [
      "La reducción de paquetes podría contribuir a los cambios de puntualidad.",
      "Hubo menos paquetes durante vacaciones.",
      "La nueva ruta explica exclusivamente toda la mejora.",
      "El servicio dejó de transportar paquetes."
    ],
    "answer": 0,
    "explanation": "La opción «La reducción de paquetes podría contribuir a los cambios de puntualidad.» se infiere de indicios del texto; «Hubo menos paquetes durante vacaciones.» es un dato expresamente mencionado, mientras que las otras opciones exceden la información disponible.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-choice-v1-intermedio-13",
    "level": "intermedio",
    "subtopic": "Inferencias",
    "title": "Registro de peces",
    "passage": "Un equipo contó peces cerca de una desembocadura durante seis mañanas. Encontró más ejemplares tras algunos días de lluvia, pero no tomó muestras por la noche. El informe reconoció esa limitación temporal.",
    "question": "¿Qué conclusión es razonable a partir de las pistas, sin presentarse literalmente como hecho confirmado?",
    "options": [
      "Se realizaron seis observaciones matutinas.",
      "El número de peces es igual a cualquier hora.",
      "Las lluvias explican todas las variaciones.",
      "Los conteos nocturnos podrían ofrecer resultados diferentes."
    ],
    "answer": 3,
    "explanation": "La opción «Los conteos nocturnos podrían ofrecer resultados diferentes.» se infiere de indicios del texto; «Se realizaron seis observaciones matutinas.» es un dato expresamente mencionado, mientras que las otras opciones exceden la información disponible.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-choice-v1-intermedio-14",
    "level": "intermedio",
    "subtopic": "Inferencias",
    "title": "La plaza arbolada",
    "passage": "Un municipio plantó árboles en una plaza y posteriormente registró menos temperatura en ciertos puntos. También había cambiado el pavimento y los técnicos propusieron evaluar ambas modificaciones.",
    "question": "¿Qué conclusión es razonable a partir de las pistas, sin presentarse literalmente como hecho confirmado?",
    "options": [
      "Solo los árboles produjeron cada cambio medido.",
      "El clima de toda la región cambió permanentemente.",
      "La reducción térmica podría tener más de una explicación.",
      "Se cambió el pavimento."
    ],
    "answer": 2,
    "explanation": "La opción «La reducción térmica podría tener más de una explicación.» se infiere de indicios del texto; «Se cambió el pavimento.» es un dato expresamente mencionado, mientras que las otras opciones exceden la información disponible.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-choice-v1-intermedio-15",
    "level": "intermedio",
    "subtopic": "Inferencias",
    "title": "Dos periódicos",
    "passage": "Dos periódicos describieron de forma distinta una protesta histórica. Una crónica se publicó al día siguiente y la otra décadas después. Los investigadores compararon autoría y fuentes en vez de suponer que la más temprana era siempre exacta.",
    "question": "¿Qué conclusión es razonable a partir de las pistas, sin presentarse literalmente como hecho confirmado?",
    "options": [
      "La primera crónica era necesariamente perfecta.",
      "La cercanía temporal por sí sola podría no garantizar fidelidad.",
      "Los periódicos se publicaron en épocas distintas.",
      "La noticia tardía fue inventada por completo."
    ],
    "answer": 1,
    "explanation": "La opción «La cercanía temporal por sí sola podría no garantizar fidelidad.» se infiere de indicios del texto; «Los periódicos se publicaron en épocas distintas.» es un dato expresamente mencionado, mientras que las otras opciones exceden la información disponible.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-choice-v1-intermedio-16",
    "level": "intermedio",
    "subtopic": "Inferencias",
    "title": "Talleres de lectura",
    "passage": "Dos colegios crearon clubes de lectura voluntarios. Quienes asistieron mostraron notas superiores al final, pero ya habían presentado diferencias de nivel al comenzar. El informe evitó atribuir todas las diferencias al club.",
    "question": "¿Qué conclusión es razonable a partir de las pistas, sin presentarse literalmente como hecho confirmado?",
    "options": [
      "La selección inicial podría influir en las diferencias finales.",
      "Los participantes tenían niveles iniciales diferentes.",
      "El club causó todas las mejoras con seguridad.",
      "Nadie mejoró fuera del programa."
    ],
    "answer": 0,
    "explanation": "La opción «La selección inicial podría influir en las diferencias finales.» se infiere de indicios del texto; «Los participantes tenían niveles iniciales diferentes.» es un dato expresamente mencionado, mientras que las otras opciones exceden la información disponible.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-choice-v1-intermedio-17",
    "level": "intermedio",
    "subtopic": "Inferencias",
    "title": "Ventas en la feria",
    "passage": "La feria vendió más artesanías durante un fin de semana con conciertos gratuitos. También se amplió el horario de los puestos. Los organizadores decidieron estudiar ambos factores antes de repetir el evento.",
    "question": "¿Qué conclusión es razonable a partir de las pistas, sin presentarse literalmente como hecho confirmado?",
    "options": [
      "Los puestos estuvieron abiertos más horas.",
      "Solo la música causó todas las ventas.",
      "Las ventas bajaron durante los conciertos.",
      "Los conciertos y el horario podrían haber contribuido a las ventas."
    ],
    "answer": 3,
    "explanation": "La opción «Los conciertos y el horario podrían haber contribuido a las ventas.» se infiere de indicios del texto; «Los puestos estuvieron abiertos más horas.» es un dato expresamente mencionado, mientras que las otras opciones exceden la información disponible.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-choice-v1-intermedio-18",
    "level": "intermedio",
    "subtopic": "Inferencias",
    "title": "Un mapa de evacuación",
    "passage": "Una asociación actualizó un mapa de rutas de evacuación tras observar una obra nueva sobre una calle. El plano revisado marcó una alternativa para peatones y recomendó comprobar las condiciones antes de cada simulacro.",
    "question": "¿Qué conclusión es razonable a partir de las pistas, sin presentarse literalmente como hecho confirmado?",
    "options": [
      "El mapa garantiza seguridad absoluta en cualquier desastre.",
      "La obra terminó antes del simulacro.",
      "La obra podría dificultar el paso habitual de peatones.",
      "Se marcó una ruta alternativa."
    ],
    "answer": 2,
    "explanation": "La opción «La obra podría dificultar el paso habitual de peatones.» se infiere de indicios del texto; «Se marcó una ruta alternativa.» es un dato expresamente mencionado, mientras que las otras opciones exceden la información disponible.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-choice-v1-avanzado-19",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Comparación de ensayos",
    "passage": "Una revisión integró estudios de alimentación, unos aleatorizados y otros observacionales. Los resultados parecían similares, pero los autores señalaron que los diseños no permitían atribuir el mismo grado de certeza causal.",
    "question": "¿Qué conclusión es razonable a partir de las pistas, sin presentarse literalmente como hecho confirmado?",
    "options": [
      "La comparación eliminó cualquier incertidumbre.",
      "La similitud numérica podría ocultar diferencias en la fuerza de las conclusiones.",
      "Había estudios con diseños distintos.",
      "Todos los estudios probaron la misma causa."
    ],
    "answer": 1,
    "explanation": "La opción «La similitud numérica podría ocultar diferencias en la fuerza de las conclusiones.» se infiere de indicios del texto; «Había estudios con diseños distintos.» es un dato expresamente mencionado, mientras que las otras opciones exceden la información disponible.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-choice-v1-avanzado-20",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Muestreo digital",
    "passage": "Una consulta nacional recogió miles de formularios mediante un enlace difundido por redes sociales. Las respuestas fueron voluntarias y los analistas no disponían de una lista completa de la población consultable.",
    "question": "¿Qué conclusión es razonable a partir de las pistas, sin presentarse literalmente como hecho confirmado?",
    "options": [
      "Una gran cantidad de respuestas no necesariamente evita el sesgo de selección.",
      "La participación fue voluntaria.",
      "La muestra es probabilística por definición.",
      "El resultado representa exactamente cada región."
    ],
    "answer": 0,
    "explanation": "La opción «Una gran cantidad de respuestas no necesariamente evita el sesgo de selección.» se infiere de indicios del texto; «La participación fue voluntaria.» es un dato expresamente mencionado, mientras que las otras opciones exceden la información disponible.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-choice-v1-avanzado-21",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Dosis y recuperación",
    "passage": "Un informe observó recuperación más rápida entre pacientes con cierta dosis, pero esos pacientes eran en promedio más jóvenes. Los investigadores pidieron ajustar por edad antes de interpretar la asociación.",
    "question": "¿Qué conclusión es razonable a partir de las pistas, sin presentarse literalmente como hecho confirmado?",
    "options": [
      "Los grupos diferían en edad.",
      "La dosis fue demostrada como única causa.",
      "Las diferencias de edad carecen de importancia.",
      "La edad podría confundir la relación entre dosis y recuperación."
    ],
    "answer": 3,
    "explanation": "La opción «La edad podría confundir la relación entre dosis y recuperación.» se infiere de indicios del texto; «Los grupos diferían en edad.» es un dato expresamente mencionado, mientras que las otras opciones exceden la información disponible.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-choice-v1-avanzado-22",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Series de desempleo",
    "passage": "Un organismo cambió su definición de empleo formal a mitad de una serie temporal. Después se observó una variación en la tasa publicada. El informe técnico propuso recalcular períodos comparables antes de interpretar la tendencia.",
    "question": "¿Qué conclusión es razonable a partir de las pistas, sin presentarse literalmente como hecho confirmado?",
    "options": [
      "La economía empeoró exactamente en la proporción publicada.",
      "Los datos anteriores eran necesariamente falsos.",
      "Parte de la variación podría deberse al cambio de definición.",
      "Se modificó la definición de empleo formal."
    ],
    "answer": 2,
    "explanation": "La opción «Parte de la variación podría deberse al cambio de definición.» se infiere de indicios del texto; «Se modificó la definición de empleo formal.» es un dato expresamente mencionado, mientras que las otras opciones exceden la información disponible.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-choice-v1-avanzado-23",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Dos territorios",
    "passage": "Un informe comparó tasas de asistencia médica de una región montañosa y otra urbana. Los autores advirtieron diferencias de edad, distancia y acceso a servicios, y evitaron clasificar regiones únicamente por tasas brutas.",
    "question": "¿Qué conclusión es razonable a partir de las pistas, sin presentarse literalmente como hecho confirmado?",
    "options": [
      "Las tasas brutas prueban una causa genética.",
      "El acceso geográfico podría contribuir a las diferencias observadas.",
      "Las regiones tenían condiciones de acceso distintas.",
      "La región con tasa mayor tiene siempre mejor salud."
    ],
    "answer": 1,
    "explanation": "La opción «El acceso geográfico podría contribuir a las diferencias observadas.» se infiere de indicios del texto; «Las regiones tenían condiciones de acceso distintas.» es un dato expresamente mencionado, mientras que las otras opciones exceden la información disponible.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-choice-v1-avanzado-24",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Efecto de una beca",
    "passage": "Un programa de becas coincidió con un nuevo sistema de transporte estudiantil. Al término del semestre aumentó la asistencia y el análisis señaló que ambos cambios debían examinarse para separar efectos.",
    "question": "¿Qué conclusión es razonable a partir de las pistas, sin presentarse literalmente como hecho confirmado?",
    "options": [
      "El transporte podría haber influido en la asistencia junto con las becas.",
      "Se introdujo un sistema de transporte.",
      "Solo las becas explican necesariamente la variación.",
      "El nuevo transporte no fue utilizado por nadie."
    ],
    "answer": 0,
    "explanation": "La opción «El transporte podría haber influido en la asistencia junto con las becas.» se infiere de indicios del texto; «Se introdujo un sistema de transporte.» es un dato expresamente mencionado, mientras que las otras opciones exceden la información disponible.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-choice-v1-avanzado-25",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Clima futuro",
    "passage": "Un modelo estimó cosechas bajo escenarios de lluvia y temperatura. Los expertos explicaron que los resultados dependen de los supuestos y que no representan toneladas realmente recogidas en el futuro.",
    "question": "¿Qué conclusión es razonable a partir de las pistas, sin presentarse literalmente como hecho confirmado?",
    "options": [
      "Se usaron escenarios de lluvia y temperatura.",
      "Las predicciones son cosechas ya observadas.",
      "Las cifras serán exactas inevitablemente.",
      "Modificar los escenarios podría alterar los resultados del modelo."
    ],
    "answer": 3,
    "explanation": "La opción «Modificar los escenarios podría alterar los resultados del modelo.» se infiere de indicios del texto; «Se usaron escenarios de lluvia y temperatura.» es un dato expresamente mencionado, mientras que las otras opciones exceden la información disponible.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-choice-v1-avanzado-26",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Testimonio y actas",
    "passage": "Un historiador comparó una entrevista grabada mucho después de un hecho y unas actas de la época. Identificó coincidencias y diferencias, y destacó que las fuentes podían reflejar distintos intereses.",
    "question": "¿Qué conclusión es razonable a partir de las pistas, sin presentarse literalmente como hecho confirmado?",
    "options": [
      "La entrevista es falsa solo por ser tardía.",
      "Las actas son infalibles por su fecha.",
      "El contraste podría aclarar discrepancias entre recuerdos y documentos.",
      "Había una entrevista y unas actas."
    ],
    "answer": 2,
    "explanation": "La opción «El contraste podría aclarar discrepancias entre recuerdos y documentos.» se infiere de indicios del texto; «Había una entrevista y unas actas.» es un dato expresamente mencionado, mientras que las otras opciones exceden la información disponible.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-choice-v1-avanzado-27",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Promedios y excepciones",
    "passage": "Una evaluación halló una mejora promedio en talleres de escritura, pero varios grupos mostraron retrocesos. La síntesis publicó los resultados separados para reconocer la diversidad de cambios.",
    "question": "¿Qué conclusión es razonable a partir de las pistas, sin presentarse literalmente como hecho confirmado?",
    "options": [
      "Ningún taller mostró avance.",
      "La media podría ocultar experiencias negativas en algunos grupos.",
      "Algunos grupos retrocedieron.",
      "Todas las personas mejoraron en la misma medida."
    ],
    "answer": 1,
    "explanation": "La opción «La media podría ocultar experiencias negativas en algunos grupos.» se infiere de indicios del texto; «Algunos grupos retrocedieron.» es un dato expresamente mencionado, mientras que las otras opciones exceden la información disponible.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-choice-v1-avanzado-28",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Costos escolares",
    "passage": "Un instituto gastó menos en materiales después de un cambio de proveedor. También disminuyó el número de alumnos y se redujeron días de funcionamiento. La dirección solicitó calcular gasto por alumno y por día.",
    "question": "¿Qué conclusión es razonable a partir de las pistas, sin presentarse literalmente como hecho confirmado?",
    "options": [
      "La caída de gasto total podría no indicar mayor eficiencia.",
      "La matrícula disminuyó.",
      "Cada material se volvió más barato con certeza.",
      "El proveedor explica todo el ahorro."
    ],
    "answer": 0,
    "explanation": "La opción «La caída de gasto total podría no indicar mayor eficiencia.» se infiere de indicios del texto; «La matrícula disminuyó.» es un dato expresamente mencionado, mientras que las otras opciones exceden la información disponible.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-choice-v1-avanzado-29",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Revisión parcial",
    "passage": "Una investigadora buscó artículos sobre un método educativo en una sola base de datos. Encontró mayormente resultados favorables, pero reconoció que podrían existir trabajos en otros repositorios.",
    "question": "¿Qué conclusión es razonable a partir de las pistas, sin presentarse literalmente como hecho confirmado?",
    "options": [
      "Se utilizó una sola base de datos.",
      "No existe ningún estudio desfavorable.",
      "Todos los trabajos publicados son idénticos.",
      "La revisión podría haber omitido evidencia contraria."
    ],
    "answer": 3,
    "explanation": "La opción «La revisión podría haber omitido evidencia contraria.» se infiere de indicios del texto; «Se utilizó una sola base de datos.» es un dato expresamente mencionado, mientras que las otras opciones exceden la información disponible.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-choice-v1-avanzado-30",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Exclusiones estadísticas",
    "passage": "Un equipo eliminó valores altos antes de calcular un promedio de consumo. No explicó los criterios iniciales y los revisores pidieron un análisis con y sin los registros excluidos.",
    "question": "¿Qué conclusión es razonable a partir de las pistas, sin presentarse literalmente como hecho confirmado?",
    "options": [
      "Los registros extremos son siempre errores.",
      "Eliminar datos garantiza la exactitud.",
      "La exclusión podría cambiar la estimación final.",
      "Se eliminaron valores altos."
    ],
    "answer": 2,
    "explanation": "La opción «La exclusión podría cambiar la estimación final.» se infiere de indicios del texto; «Se eliminaron valores altos.» es un dato expresamente mencionado, mientras que las otras opciones exceden la información disponible.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-choice-v1-avanzado-31",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Reportes de inundación",
    "passage": "Una ciudad instaló una línea para informar inundaciones y recibió más avisos. El mismo período tuvo lluvias abundantes y nuevas brigadas vecinales. Se propuso distinguir alertas de incidentes confirmados.",
    "question": "¿Qué conclusión es razonable a partir de las pistas, sin presentarse literalmente como hecho confirmado?",
    "options": [
      "Las lluvias no influyeron en ningún aviso.",
      "El aumento de avisos podría tener causas de detección y de incidencia real.",
      "Se instaló una línea de reportes.",
      "Cada aviso prueba una nueva inundación real."
    ],
    "answer": 1,
    "explanation": "La opción «El aumento de avisos podría tener causas de detección y de incidencia real.» se infiere de indicios del texto; «Se instaló una línea de reportes.» es un dato expresamente mencionado, mientras que las otras opciones exceden la información disponible.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-choice-v1-avanzado-32",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Escalas de aprendizaje",
    "passage": "Una escuela comparó puntuaciones de dos pruebas, una sobre lectura de argumentos y otra sobre memorización de vocabulario. Los analistas explicaron que ambas tenían escalas numéricas pero medían habilidades diferentes.",
    "question": "¿Qué conclusión es razonable a partir de las pistas, sin presentarse literalmente como hecho confirmado?",
    "options": [
      "Sumar ambas puntuaciones podría producir una medida poco interpretable.",
      "Las pruebas medían habilidades diferentes.",
      "Las dos pruebas son equivalentes por tener números.",
      "La nota mayor demuestra todo el aprendizaje."
    ],
    "answer": 0,
    "explanation": "La opción «Sumar ambas puntuaciones podría producir una medida poco interpretable.» se infiere de indicios del texto; «Las pruebas medían habilidades diferentes.» es un dato expresamente mencionado, mientras que las otras opciones exceden la información disponible.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-choice-v1-avanzado-33",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Acuerdos históricos",
    "passage": "Tres relatos sobre una negociación coincidían en el lugar y diferían en las personas presentes. El investigador buscó listas originales de asistentes y evitó elegir automáticamente un relato por su antigüedad.",
    "question": "¿Qué conclusión es razonable a partir de las pistas, sin presentarse literalmente como hecho confirmado?",
    "options": [
      "Los relatos diferían en asistentes.",
      "El relato más antiguo es necesariamente verdadero.",
      "Todos los relatos fueron falsificados.",
      "Los registros originales podrían ayudar a resolver el desacuerdo."
    ],
    "answer": 3,
    "explanation": "La opción «Los registros originales podrían ayudar a resolver el desacuerdo.» se infiere de indicios del texto; «Los relatos diferían en asistentes.» es un dato expresamente mencionado, mientras que las otras opciones exceden la información disponible.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-choice-v1-avanzado-34",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Medición de actividad",
    "passage": "Una institución registró más usuarios activos después de modificar la definición de inicio de sesión. El equipo técnico reconoció que el aumento podría responder a nuevos criterios y propuso mantener ambas métricas durante una transición.",
    "question": "¿Qué conclusión es razonable a partir de las pistas, sin presentarse literalmente como hecho confirmado?",
    "options": [
      "Todas las personas se conectaron más por voluntad propia.",
      "El conteo anterior no tenía ninguna validez.",
      "La variación podría reflejar un cambio de medición, no solo de conducta.",
      "La definición de inicio de sesión cambió."
    ],
    "answer": 2,
    "explanation": "La opción «La variación podría reflejar un cambio de medición, no solo de conducta.» se infiere de indicios del texto; «La definición de inicio de sesión cambió.» es un dato expresamente mencionado, mientras que las otras opciones exceden la información disponible.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-choice-v1-avanzado-35",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Distribución y tasa",
    "passage": "Un informe comparó tasas de participación en dos barrios con poblaciones muy diferentes. Los analistas propusieron dividir asistentes entre población elegible en vez de comparar únicamente cifras absolutas.",
    "question": "¿Qué conclusión es razonable a partir de las pistas, sin presentarse literalmente como hecho confirmado?",
    "options": [
      "Los números absolutos bastan para cualquier comparación.",
      "El barrio con más asistentes podría no tener la tasa más alta.",
      "Las poblaciones de los barrios eran distintas.",
      "El total mayor prueba mayor participación proporcional."
    ],
    "answer": 1,
    "explanation": "La opción «El barrio con más asistentes podría no tener la tasa más alta.» se infiere de indicios del texto; «Las poblaciones de los barrios eran distintas.» es un dato expresamente mencionado, mientras que las otras opciones exceden la información disponible.",
    "reviewStatus": "editorial-draft"
  }
];