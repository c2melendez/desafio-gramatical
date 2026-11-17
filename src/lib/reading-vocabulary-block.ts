import type {Level} from "./grammar";
import type {EvidenceTag} from "./reading";
export const VOCABULARY_SEEDS=[
  {
    "word": "banco",
    "meaning": "asiento para varias personas",
    "wrong": "entidad que administra dinero",
    "contexts": [
      "En el patio, el abuelo descansó en un banco de madera junto al jardín.",
      "Durante la excursión, el grupo se sentó en un banco largo para almorzar.",
      "La alcaldía reparó un banco del parque porque sus tablas estaban sueltas."
    ]
  },
  {
    "word": "planta",
    "meaning": "ser vivo vegetal que crece y necesita recursos",
    "wrong": "piso de un edificio",
    "contexts": [
      "La niña regó una planta de hojas verdes en la ventana.",
      "El jardinero trasplantó la planta a una maceta con tierra fértil.",
      "Una planta del vivero perdió hojas por falta de agua."
    ]
  },
  {
    "word": "llave",
    "meaning": "instrumento que abre o cierra una cerradura",
    "wrong": "grifo por el que sale agua",
    "contexts": [
      "El portero buscó la llave del depósito para abrir la puerta.",
      "La profesora guardó una llave de metal con la que cerraba el armario.",
      "Una llave se extravió y nadie pudo abrir el salón."
    ]
  },
  {
    "word": "claro",
    "meaning": "fácil de entender y sin confusión",
    "wrong": "espacio libre de árboles",
    "contexts": [
      "El aviso era claro: señalaba la fecha, la hora y el lugar de reunión.",
      "La explicación clara permitió a los alumnos seguir los pasos sin preguntar.",
      "El instructivo dejó de ser confuso después de redactarse de forma clara."
    ]
  },
  {
    "word": "corriente",
    "meaning": "flujo de agua que se desplaza",
    "wrong": "algo común y habitual",
    "contexts": [
      "La corriente del río arrastró ramas hacia el puente.",
      "El pescador evitó la corriente rápida que empujaba la canoa.",
      "Una fuerte corriente cambió la dirección de los objetos flotantes."
    ]
  },
  {
    "word": "hoja",
    "meaning": "parte verde de una planta",
    "wrong": "lámina de papel para escribir",
    "contexts": [
      "La hoja del árbol cambió de color antes de caer.",
      "El viento movía una hoja verde que seguía unida a la rama.",
      "Una hoja de la planta se secó después de varios días sin riego."
    ]
  },
  {
    "word": "raíz",
    "meaning": "parte de una planta que la fija y absorbe agua",
    "wrong": "origen abstracto de un problema",
    "contexts": [
      "El niño observó la raíz de un árbol cuando el suelo se abrió.",
      "La jardinera cubrió con tierra la raíz que había quedado expuesta.",
      "La raíz de una planta dañada dejó de absorber suficiente agua."
    ]
  },
  {
    "word": "ambiguo",
    "meaning": "que admite más de una interpretación",
    "wrong": "exacto e inequívoco",
    "contexts": [
      "El mensaje «nos vemos allí» resultó ambiguo porque nadie sabía qué lugar indicaba.",
      "La consigna ambigua provocó respuestas distintas a la misma pregunta.",
      "El informe calificó de ambiguo un pronombre con dos posibles referentes."
    ]
  },
  {
    "word": "conciso",
    "meaning": "que expresa lo necesario con pocas palabras",
    "wrong": "extenso y lleno de repeticiones",
    "contexts": [
      "El resumen conciso explicó los resultados en tres oraciones sin perder datos.",
      "La directora pidió un mensaje conciso que evitara repetir antecedentes.",
      "Un título conciso permitió comprender rápidamente el tema central."
    ]
  },
  {
    "word": "implícito",
    "meaning": "que se da a entender sin expresarse directamente",
    "wrong": "dicho de forma literal y explícita",
    "contexts": [
      "En su silencio estaba implícito el desacuerdo que antes había insinuado.",
      "El relato dejó implícito el temor del protagonista mediante sus acciones.",
      "El comentario sugería de manera implícita una crítica sin escribirla."
    ]
  },
  {
    "word": "contrastar",
    "meaning": "comparar elementos para reconocer semejanzas y diferencias",
    "wrong": "copiar información sin examinarla",
    "contexts": [
      "La investigadora decidió contrastar dos mapas con escalas diferentes.",
      "Antes de publicar, el reportero quiso contrastar ambas versiones de los hechos.",
      "El profesor pidió contrastar dos argumentos y señalar dónde discrepaban."
    ]
  },
  {
    "word": "respaldar",
    "meaning": "apoyar una afirmación mediante razones o pruebas",
    "wrong": "negar una idea sin presentar razones",
    "contexts": [
      "La alumna citó el registro de lluvias para respaldar su conclusión.",
      "El equipo buscó cifras que pudieran respaldar la propuesta de horarios.",
      "La reseña necesitaba ejemplos del cuento para respaldar sus valoraciones."
    ]
  },
  {
    "word": "matizar",
    "meaning": "introducir precisiones o límites a una afirmación",
    "wrong": "hacer una afirmación absoluta sin excepciones",
    "contexts": [
      "La investigadora decidió matizar su conclusión al reconocer varios casos contrarios.",
      "El historiador tuvo que matizar una generalización sobre todas las familias.",
      "Una nota pidió matizar el titular para no atribuir causalidad exclusiva."
    ]
  },
  {
    "word": "inferir",
    "meaning": "deducir una idea a partir de indicios",
    "wrong": "repetir literalmente una frase sin interpretarla",
    "contexts": [
      "A partir del suelo mojado, la niña pudo inferir que había llovido.",
      "El lector intentó inferir el temor del personaje por su manera de actuar.",
      "Las huellas permitieron inferir que alguien había pasado por el sendero."
    ]
  },
  {
    "word": "pertinente",
    "meaning": "que guarda relación apropiada con el asunto",
    "wrong": "ajeno al tema examinado",
    "contexts": [
      "La profesora consideró pertinente una cita relacionada con la pregunta.",
      "El equipo seleccionó un dato pertinente para explicar la diferencia de resultados.",
      "El ejemplo pertinente ayudó a sostener la tesis sin cambiar de tema."
    ]
  },
  {
    "word": "coherente",
    "meaning": "que mantiene relación lógica y no se contradice",
    "wrong": "que contiene afirmaciones incompatibles",
    "contexts": [
      "El informe fue coherente porque sus conclusiones concordaban con los datos.",
      "La narración coherente presentó hechos que se enlazaban sin contradicciones.",
      "Una explicación coherente respetó el orden temporal establecido."
    ]
  },
  {
    "word": "literal",
    "meaning": "que reproduce el sentido exacto de las palabras sin metáforas",
    "wrong": "figurado y simbólico",
    "contexts": [
      "La traducción literal conservó cada palabra, aunque sonó poco natural.",
      "El docente pidió interpretar de modo literal la instrucción, no como metáfora.",
      "En sentido literal, «cerró la puerta» describe una acción física."
    ]
  },
  {
    "word": "provisional",
    "meaning": "que no es definitivo y puede modificarse",
    "wrong": "permanente e inalterable",
    "contexts": [
      "La comisión publicó un calendario provisional hasta confirmar los permisos.",
      "Los investigadores presentaron resultados provisionales pendientes de revisión.",
      "El director anunció una decisión provisional sujeta a nuevas pruebas."
    ]
  },
  {
    "word": "exhaustivo",
    "meaning": "que examina todos los aspectos pertinentes con detalle",
    "wrong": "superficial y limitado a una observación",
    "contexts": [
      "El inventario exhaustivo incluyó cada libro de las tres salas.",
      "La revisión exhaustiva examinó documentos y registros disponibles.",
      "El auditor pidió un análisis exhaustivo en vez de consultar una sola fuente."
    ]
  },
  {
    "word": "polisemia",
    "meaning": "presencia de varios significados relacionados en una palabra",
    "wrong": "error ortográfico por una letra omitida",
    "contexts": [
      "La profesora usó «cabeza» de una persona y de una organización para ilustrar la polisemia.",
      "El análisis de «brazo» corporal y de un río explicó un caso de polisemia.",
      "La clase estudió la polisemia de «red» al hablar de pesca y comunicaciones."
    ]
  },
  {
    "word": "connotación",
    "meaning": "asociación subjetiva o cultural añadida al significado básico",
    "wrong": "definición estrictamente literal del diccionario",
    "contexts": [
      "La palabra «hogar» despertó una connotación de protección en el poema.",
      "La campaña utilizó «amanecer» por su connotación de esperanza.",
      "En una reseña, «frío» tuvo una connotación emocional de distancia."
    ]
  },
  {
    "word": "denotación",
    "meaning": "significado directo y básico de una expresión",
    "wrong": "valor emocional asociado a una palabra",
    "contexts": [
      "El diccionario registró la denotación de «puente» como estructura que comunica dos puntos.",
      "La denotación de «llave» permitió distinguir el objeto físico de sus usos simbólicos.",
      "El estudiante separó la denotación de «invierno» de su valor poético."
    ]
  },
  {
    "word": "ambivalente",
    "meaning": "que manifiesta sentimientos o valoraciones opuestas a la vez",
    "wrong": "que muestra una sola emoción inequívoca",
    "contexts": [
      "El protagonista se sintió ambivalente: quería marcharse y quedarse al mismo tiempo.",
      "La crítica tuvo una respuesta ambivalente, entre entusiasmo y desconfianza.",
      "El jurado expresó una postura ambivalente ante los beneficios y riesgos."
    ]
  },
  {
    "word": "subyacente",
    "meaning": "que está presente como fundamento aunque no sea visible",
    "wrong": "que aparece expresamente en la superficie",
    "contexts": [
      "Detrás del desacuerdo había un temor subyacente que nadie nombraba.",
      "El análisis buscó la causa subyacente que explicaba los síntomas observados.",
      "La investigadora identificó un supuesto subyacente en el argumento del autor."
    ]
  },
  {
    "word": "disonancia",
    "meaning": "falta de armonía o concordancia entre elementos",
    "wrong": "coincidencia perfecta entre afirmaciones",
    "contexts": [
      "El crítico señaló una disonancia entre el discurso de austeridad y el gasto excesivo.",
      "La disonancia entre promesas y hechos debilitó la confianza del público.",
      "El ensayo mostró disonancia entre la conclusión y los datos citados."
    ]
  },
  {
    "word": "sesgo",
    "meaning": "inclinación sistemática que puede distorsionar un juicio o muestra",
    "wrong": "selección perfectamente representativa sin influencia",
    "contexts": [
      "La encuesta tenía un sesgo porque solo consultó a clientes habituales.",
      "El informe señaló sesgo en la selección voluntaria de participantes.",
      "El lector detectó un sesgo al ver que solo se citaban opiniones favorables."
    ]
  },
  {
    "word": "extrapolar",
    "meaning": "extender una conclusión más allá de los casos observados",
    "wrong": "limitar un resultado únicamente a lo medido",
    "contexts": [
      "El analista evitó extrapolar la opinión de veinte voluntarios a toda la ciudad.",
      "Era prematuro extrapolar resultados de una escuela a todo el país.",
      "La investigadora aclaró que no podía extrapolar sin evaluar otros contextos."
    ]
  },
  {
    "word": "operacionalizar",
    "meaning": "definir cómo se observará o medirá un concepto abstracto",
    "wrong": "usar un término sin señalar indicadores medibles",
    "contexts": [
      "El equipo necesitó operacionalizar «participación» como asistencia a reuniones.",
      "Para operacionalizar «bienestar», se eligieron indicadores y preguntas concretas.",
      "El informe explicó cómo operacionalizar «éxito» antes de calcular porcentajes."
    ]
  },
  {
    "word": "circunscribir",
    "meaning": "limitar el alcance de una afirmación a un ámbito determinado",
    "wrong": "generalizar sin límite a toda la población",
    "contexts": [
      "El reporte decidió circunscribir sus conclusiones a las tres escuelas estudiadas.",
      "La historiadora quiso circunscribir el análisis a fuentes del período colonial.",
      "El equipo optó por circunscribir los hallazgos a los participantes evaluados."
    ]
  },
  {
    "word": "contingente",
    "meaning": "que depende de circunstancias y podría ser de otra manera",
    "wrong": "necesario y fijo en cualquier situación",
    "contexts": [
      "La apertura era contingente a la aprobación de los permisos municipales.",
      "El éxito del plan era contingente a que continuara la financiación.",
      "La respuesta del proyecto seguía contingente al clima y al presupuesto."
    ]
  },
  {
    "word": "refutar",
    "meaning": "mostrar con razones o pruebas que una afirmación no se sostiene",
    "wrong": "confirmar una idea sin cuestionarla",
    "contexts": [
      "Los datos contrarios permitieron refutar la afirmación de éxito universal.",
      "La estudiante intentó refutar el argumento mediante un contraejemplo válido.",
      "El informe pudo refutar la hipótesis al encontrar resultados incompatibles."
    ]
  },
  {
    "word": "dilucidar",
    "meaning": "aclarar una cuestión compleja mediante examen de información",
    "wrong": "ocultar deliberadamente las razones del problema",
    "contexts": [
      "El comité buscó dilucidar por qué dos fuentes daban fechas diferentes.",
      "Para dilucidar la causa, el equipo comparó registros y entrevistas.",
      "La revisión documental ayudó a dilucidar una discrepancia histórica."
    ]
  },
  {
    "word": "taxativo",
    "meaning": "que expresa una afirmación de modo categórico y sin reservas",
    "wrong": "expresado con cautela y probabilidades",
    "contexts": [
      "El titular taxativo aseguraba que todos se beneficiarían sin excepción.",
      "La respuesta taxativa no admitía dudas aunque faltaran datos.",
      "El informe criticó un juicio taxativo basado en una sola observación."
    ]
  },
  {
    "word": "anacrónico",
    "meaning": "propio de una época distinta y situado fuera de su tiempo",
    "wrong": "adecuado a la fecha histórica descrita",
    "contexts": [
      "Fue anacrónico representar un teléfono inteligente en una escena medieval.",
      "El museo corrigió un detalle anacrónico en la reconstrucción de una batalla antigua.",
      "El crítico señaló un término anacrónico en una novela ambientada siglos atrás."
    ]
  },
  {
    "word": "intertextual",
    "meaning": "que establece relaciones entre textos mediante alusiones o referencias",
    "wrong": "que solo describe colores sin vínculos con otros escritos",
    "contexts": [
      "El poema contenía una referencia intertextual a un mito conocido.",
      "La novela incorporó un diálogo intertextual con una leyenda anterior.",
      "El ensayo analizó un recurso intertextual al citar un verso clásico."
    ]
  },
  {
    "word": "paráfrasis",
    "meaning": "reformulación con palabras distintas que conserva el sentido original",
    "wrong": "copia exacta entre comillas de cada palabra",
    "contexts": [
      "La alumna escribió una paráfrasis del párrafo con palabras propias.",
      "El editor utilizó una paráfrasis para aclarar el texto sin modificar su idea.",
      "Una paráfrasis fiel permitió explicar el argumento sin reproducirlo literalmente."
    ]
  }
] as const;
const levelFor=(i:number):Level=>i<7?"principiante":i<19?"intermedio":"avanzado";
export type NewReadingDetective={id:string;level:Level;subtopic:"Vocabulario en contexto";title:string;passage:string;claims:{text:string;tag:EvidenceTag;explanation:string}[];reviewStatus:"editorial-draft"};
export type NewReadingChoice={id:string;level:Level;subtopic:"Vocabulario en contexto";title:string;passage:string;question:string;options:[string,string,string,string];answer:number;explanation:string;reviewStatus:"editorial-draft"};
export type NewReadingReconstruct={id:string;level:Level;subtopic:"Vocabulario en contexto";title:string;passage:string;order:{parts:[string,string,string];hint:string;explanation:string};reviewStatus:"editorial-draft"};

export const VOCAB_DETECTIVE_CASES:NewReadingDetective[]=VOCABULARY_SEEDS.map((s,i)=>{
 const passage=s.contexts[0]+" La docente explicó que en esta oración la palabra «"+s.word+"» se emplea con el sentido de «"+s.meaning+"». Después pidió distinguir el significado empleado de otros posibles usos del término, sin alterar el sentido del relato.";
 const claims=[{text:"En esta lectura, «"+s.word+"» se usa con el sentido de "+s.meaning+".",tag:"explicit" as const,explanation:"La aclaración del texto define ese uso específico."},{text:"Las pistas de la oración permiten distinguir este significado de «"+s.word+"» de otros posibles usos.",tag:"inference" as const,explanation:"La situación y la explicación ayudan a precisar el sentido contextual."},{text:"Aquí «"+s.word+"» significa necesariamente "+s.wrong+".",tag:"unsupported" as const,explanation:"Ese significado no corresponde a las pistas de esta oración."}];
 const k=i%3;
 return {id:"vocab-det-"+i,level:levelFor(i),subtopic:"Vocabulario en contexto",title:"Sentido de «"+s.word+"» en un relato",passage,claims:[...claims.slice(k),...claims.slice(0,k)],reviewStatus:"editorial-draft"};
});
export const VOCAB_CHOICE_CASES:NewReadingChoice[]=VOCABULARY_SEEDS.map((s,i)=>{
 const passage=s.contexts[1]+" El fragmento exige elegir el significado que encaja en esta situación y no interpretar la palabra fuera de contexto. Una lectura cuidadosa debe fijarse en la acción descrita y en los objetos o ideas cercanos.";
 const other=VOCABULARY_SEEDS[(i+7)%VOCABULARY_SEEDS.length].meaning;
 const options=[s.meaning,s.wrong,other,"expresión sin sentido preciso dentro de la oración"],k=i%4;
 return {id:"vocab-quiz-"+i,level:levelFor(i),subtopic:"Vocabulario en contexto",title:"Interpretación de «"+s.word+"»",passage,question:"¿Qué significa «"+s.word+"» en este fragmento?",options:[...options.slice(k),...options.slice(0,k)] as [string,string,string,string],answer:(4-k)%4,explanation:"La pista concreta «"+s.contexts[1]+"» permite interpretar «"+s.word+"» como «"+s.meaning+"», no como «"+s.wrong+"».",reviewStatus:"editorial-draft"};
});
export const VOCAB_RECONSTRUCT_CASES:NewReadingReconstruct[]=VOCABULARY_SEEDS.map((s,i)=>{
 const passage=s.contexts[2]+" Para explicar el vocabulario de este pasaje, la clase siguió un procedimiento: encontrar la palabra, recuperar el contexto relevante y establecer el sentido compatible con la situación sin sustituirlo por una acepción ajena.";
 const parts:[string,string,string]=["Identificar en la lectura el empleo de la palabra «"+s.word+"».","Relacionar «"+s.word+"» con esta pista: "+s.contexts[2],"Concluir que el significado contextual es «"+s.meaning+"»."];
 return {id:"vocab-recon-"+i,level:levelFor(i),subtopic:"Vocabulario en contexto",title:"Razonamiento léxico: «"+s.word+"»",passage,order:{parts,hint:"Ordena palabra, pista contextual y significado válido.",explanation:"La lectura de «"+s.word+"» requiere consultar la pista narrativa antes de seleccionar la acepción «"+s.meaning+"»."},reviewStatus:"editorial-draft"};
});
