import type {Level} from "./grammar";
import type {EvidenceTag} from "./reading";
const SEEDS=[
  {
    "name": "La apertura de la biblioteca",
    "contexts": [
      "La biblioteca del barrio amplió su horario; el comunicado explicó los días de servicio y pidió evaluar la demanda.",
      "Una carta de usuarios solicitó más tiempo de apertura y presentó ejemplos de quienes trabajan hasta tarde.",
      "El informe final comparó las visitas antes y después de extender el horario."
    ],
    "purpose": "informar sobre un cambio y evaluar sus efectos",
    "wrong": "demostrar que todas las personas aprobaron el cambio"
  },
  {
    "name": "El aviso de la tormenta",
    "contexts": [
      "El servicio meteorológico advirtió fuertes lluvias y recomendó evitar cruces inundados.",
      "Un folleto vecinal explicó qué hacer si el agua bloquea una calle y dónde solicitar ayuda.",
      "El boletín de seguimiento enumeró las calles afectadas y las medidas de prevención aplicadas."
    ],
    "purpose": "orientar acciones preventivas frente a un riesgo",
    "wrong": "garantizar que nunca habrá inundaciones"
  },
  {
    "name": "Una receta de familia",
    "contexts": [
      "La abuela escribió los ingredientes del pan y numeró los pasos para prepararlo.",
      "El taller culinario explicó por qué primero se mezcla la harina y luego se deja reposar la masa.",
      "El libro escolar comparó dos métodos de horneado y señaló qué condiciones cambian el resultado."
    ],
    "purpose": "explicar un procedimiento mediante pasos ordenados",
    "wrong": "afirmar que toda receta produce idéntico pan"
  },
  {
    "name": "Los animales del manglar",
    "contexts": [
      "La guía describió aves, peces y cangrejos que habitan el manglar y sus características observables.",
      "El artículo de ciencia agrupó organismos por su alimentación e indicó rasgos que comparten.",
      "Una clase elaboró una ficha de especies y distinguió descripción de opinión sobre su belleza."
    ],
    "purpose": "describir y clasificar elementos de un ecosistema",
    "wrong": "probar que todas las especies se alimentan igual"
  },
  {
    "name": "Una campaña de lectura",
    "contexts": [
      "El afiche invitó a donar libros y explicó dónde entregarlos para la biblioteca escolar.",
      "Un estudiante argumentó que compartir ejemplares facilita el acceso y ofreció ejemplos concretos.",
      "La directora presentó resultados preliminares de la campaña y precisó lo que aún faltaba medir."
    ],
    "purpose": "promover una acción mediante razones y datos",
    "wrong": "asegurar que toda la población ya participó"
  },
  {
    "name": "El recorrido del museo",
    "contexts": [
      "La guía narró cómo visitantes entraron a la primera sala, recorrieron una exposición y regresaron al patio.",
      "Una reseña describió las tres secciones del museo y explicó qué información ofrece cada una.",
      "Un folleto ordenó fechas de inauguración de las salas sin mezclar la cronología con opiniones."
    ],
    "purpose": "organizar acontecimientos o secciones con secuencia clara",
    "wrong": "declarar que el museo carece de toda historia"
  },
  {
    "name": "Un problema de ruido",
    "contexts": [
      "El consejo estudiantil describió interrupciones durante la lectura y propuso un espacio silencioso.",
      "La carta al director sostuvo la necesidad de reducir ruido con observaciones de varias clases.",
      "El informe comparó alternativas para organizar recreos sin impedir el juego."
    ],
    "purpose": "plantear un problema y evaluar soluciones",
    "wrong": "demostrar que ningún alumno desea recreo"
  },
  {
    "name": "Dos causas de retraso",
    "contexts": [
      "La crónica señaló que el autobús llegó tarde por obras en la avenida y por una lluvia fuerte.",
      "El artículo examinó cómo el cierre de calles y una avería coincidieron durante el horario escolar.",
      "El reporte separó demoras por tráfico de las causadas por esperas en terminales."
    ],
    "purpose": "explicar un resultado mediante varias causas posibles",
    "wrong": "atribuir toda demora a una causa única sin pruebas"
  },
  {
    "name": "Una opinión editorial",
    "contexts": [
      "El editorial defendió plantar árboles urbanos y citó beneficios de sombra en plazas.",
      "Una columna propuso instalar bebederos públicos y argumentó con observaciones de usuarios.",
      "La revista defendió ampliar ciclovías, pero reconoció costos que deben estudiarse."
    ],
    "purpose": "sostener una posición con argumentos y límites",
    "wrong": "presentar la preferencia personal como hecho universal"
  },
  {
    "name": "La encuesta escolar",
    "contexts": [
      "El informe indicó cuántos estudiantes respondieron, qué se preguntó y qué resultados se obtuvieron.",
      "Una nota metodológica explicó por qué una encuesta voluntaria no representa automáticamente a todos.",
      "El boletín comparó respuestas de distintos grados y evitó sumar categorías incompatibles."
    ],
    "purpose": "exponer resultados y condiciones de una investigación",
    "wrong": "afirmar representatividad perfecta sin describir la muestra"
  },
  {
    "name": "El viaje del personaje",
    "contexts": [
      "El cuento presentó a una joven que perdió su mapa, pidió ayuda y encontró el camino de vuelta.",
      "La narración siguió a un mensajero que superó tres obstáculos antes de entregar una carta.",
      "La historia describió un encuentro, un conflicto entre amigos y una reconciliación."
    ],
    "purpose": "narrar acciones conectadas por un conflicto y un desenlace",
    "wrong": "enumerar únicamente datos estadísticos sin personajes"
  },
  {
    "name": "Una explicación causal",
    "contexts": [
      "El texto explicó que la sombra reduce la temperatura percibida y lo relacionó con la ubicación de árboles.",
      "El artículo describió cómo lluvias intensas movilizaron sedimentos y aumentaron la turbidez.",
      "El folleto explicó por qué las ventanas abiertas favorecen la ventilación cuando existe corriente de aire."
    ],
    "purpose": "relacionar causas, procesos y consecuencias observables",
    "wrong": "convertir cualquier coincidencia en causalidad absoluta"
  },
  {
    "name": "Comparación de rutas",
    "contexts": [
      "El informe comparó dos caminos al hospital considerando espera, distancia y tiempo total.",
      "La guía confrontó recorridos de autobuses según accesibilidad, conexiones y horarios.",
      "El consejo contrastó rutas ciclistas por pendiente y seguridad, sin declarar una mejor para todos."
    ],
    "purpose": "comparar alternativas a partir de criterios definidos",
    "wrong": "afirmar que todas las rutas son idénticas"
  },
  {
    "name": "El resumen de una reunión",
    "contexts": [
      "El acta distinguió los temas tratados, los acuerdos aprobados y las tareas pendientes.",
      "Una secretaria organizó intervenciones por asunto y recogió decisiones sin reproducir cada frase.",
      "El informe sintetizó propuestas diferentes y aclaró cuáles se aceptaron o rechazaron."
    ],
    "purpose": "sintetizar información relevante sin perder distinciones",
    "wrong": "atribuir aprobación a propuestas que no se votaron"
  },
  {
    "name": "Una exposición ambiental",
    "contexts": [
      "El artículo presentó primero la acumulación de residuos y después mostró opciones de reducción.",
      "La charla explicó una dificultad de abastecimiento y enumeró medidas de ahorro.",
      "El documento identificó un riesgo de erosión y evaluó posibles soluciones de reforestación."
    ],
    "purpose": "usar una estructura de problema y solución",
    "wrong": "omitir el problema e inventar una solución aplicada"
  },
  {
    "name": "Una norma de seguridad",
    "contexts": [
      "La instrucción indicó usar casco y explicó en qué situaciones es obligatorio.",
      "El reglamento enumeró condiciones de acceso al laboratorio y responsabilidades del alumnado.",
      "La guía de excursión distinguió conductas permitidas y prohibidas con ejemplos."
    ],
    "purpose": "establecer reglas y condiciones de cumplimiento",
    "wrong": "demostrar que ninguna precaución es necesaria"
  },
  {
    "name": "Análisis de una noticia",
    "contexts": [
      "El reportaje presentó una afirmación y citó los registros que la sostienen, aclarando lagunas.",
      "El periodista contrastó dos testimonios antes de redactar una nota y marcó desacuerdos.",
      "La redacción comprobó el origen de una fotografía para evitar atribuirle otra fecha."
    ],
    "purpose": "informar hechos comprobables y distinguir incertidumbres",
    "wrong": "declarar confirmados los hechos todavía sin verificación"
  },
  {
    "name": "Evaluación de fuentes",
    "contexts": [
      "El investigador identificó autor, fecha y propósito de un documento antes de citarlo.",
      "La historiadora diferenció una carta contemporánea y una memoria grabada cuarenta años después.",
      "El archivo comparó documentos firmados y testimonios anónimos sin descartar ninguno automáticamente."
    ],
    "purpose": "evaluar procedencia y límites de las evidencias",
    "wrong": "elegir siempre la fuente más emotiva sin contraste"
  },
  {
    "name": "Una conclusión apresurada",
    "contexts": [
      "El artículo criticó generalizar a todas las escuelas resultados de solo una clase.",
      "El reporte corrigió un titular que confundía una media mayor con mejoras individuales uniformes.",
      "La revisión señaló que tres días de lluvia no bastan para inferir una tendencia de diez años."
    ],
    "purpose": "delimitar conclusiones al alcance de la evidencia",
    "wrong": "confirmar una regla universal con un ejemplo aislado"
  },
  {
    "name": "Resultados de un ensayo",
    "contexts": [
      "La investigación informó la cantidad de participantes, la medición inicial y los cambios registrados.",
      "El equipo describió el procedimiento de asignación de grupos antes de interpretar diferencias.",
      "La nota técnica separó resultados medidos de hipótesis que aún debían probarse."
    ],
    "purpose": "presentar método y resultados separando datos de interpretaciones",
    "wrong": "atribuir causalidad sin examinar el diseño"
  },
  {
    "name": "Contraste de argumentos",
    "contexts": [
      "La mesa redonda presentó razones favorables y contrarias a ampliar el horario escolar.",
      "El ensayo analizó dos posturas sobre transporte público y evaluó datos de cada una.",
      "La discusión recogió objeciones a una propuesta de becas y respondió con evidencias pertinentes."
    ],
    "purpose": "examinar posiciones opuestas con argumentos pertinentes",
    "wrong": "eliminar críticas para simular unanimidad"
  },
  {
    "name": "Un texto divulgativo",
    "contexts": [
      "El folleto explicó con palabras sencillas cómo se forman las nubes y definió vocabulario técnico.",
      "Una guía científica describió la fotosíntesis mediante ejemplos cotidianos para niños.",
      "La exposición tradujo términos especializados sobre energías renovables a ejemplos claros."
    ],
    "purpose": "explicar conocimientos técnicos para un público no especialista",
    "wrong": "ocultar deliberadamente el tema con tecnicismos"
  },
  {
    "name": "Una hipótesis en debate",
    "contexts": [
      "El equipo propuso que más luz favorecería plantas, pero registró también el riego.",
      "La investigadora sospechó que el ruido afectaba la lectura y diseñó un contraste de grupos.",
      "El laboratorio planteó que el tipo de suelo influía en la germinación y controló la humedad."
    ],
    "purpose": "plantear hipótesis y describir cómo comprobarlas",
    "wrong": "afirmar resultados antes de realizar pruebas"
  },
  {
    "name": "La continuidad de una serie",
    "contexts": [
      "El reporte advirtió que el criterio de usuario activo cambió a mitad del año.",
      "El informe de asistencia explicó que se incluyeron grupos antes no contados.",
      "Una serie de precios señaló qué períodos tenían distinta unidad de medida."
    ],
    "purpose": "advertir cambios metodológicos que afectan una comparación temporal",
    "wrong": "tratar cambios de indicador como si no existieran"
  },
  {
    "name": "La crítica de un estudio",
    "contexts": [
      "La reseña señaló que la muestra era voluntaria y discutió sus efectos en la generalización.",
      "Un comentario examinó variables no controladas en una investigación sobre aprendizaje.",
      "La evaluación distinguió observación y experimento antes de aceptar una atribución causal."
    ],
    "purpose": "examinar límites de un método antes de aceptar resultados",
    "wrong": "declarar incuestionable todo informe publicado"
  },
  {
    "name": "Diferencias entre géneros",
    "contexts": [
      "Una clase distinguió una noticia que relata hechos y un editorial que defiende una postura.",
      "El curso comparó una crónica narrativa y una ficha informativa sobre el mismo viaje.",
      "La docente separó instrucciones de seguridad de un relato personal de excursión."
    ],
    "purpose": "identificar propósito y rasgos propios de distintos géneros",
    "wrong": "afirmar que todos los textos tienen propósito idéntico"
  },
  {
    "name": "La voz del narrador",
    "contexts": [
      "El cuento fue relatado por un personaje que solo conocía sus propias experiencias.",
      "La novela alternó la perspectiva de dos personajes sobre un mismo acontecimiento.",
      "La narración usó un observador externo que describió acciones sin expresar pensamientos."
    ],
    "purpose": "analizar cómo el punto de vista determina lo narrado",
    "wrong": "suponer que el narrador conoce necesariamente todos los hechos"
  },
  {
    "name": "Un ejemplo insuficiente",
    "contexts": [
      "La columna usó un solo caso de éxito para defender una norma para todo el país.",
      "El ensayo extendió una experiencia urbana a comunidades rurales sin compararlas.",
      "El reporte citó tres testimonios satisfechos como prueba de aprobación universal."
    ],
    "purpose": "evaluar si ejemplos concretos respaldan una tesis general",
    "wrong": "convertir evidencia anecdótica en prueba universal"
  },
  {
    "name": "Interpretación de gráficos",
    "contexts": [
      "El análisis detectó que el eje de una gráfica empezaba cerca del máximo y exageraba cambios.",
      "El informe comparó porcentajes con bases diferentes y pidió revisar denominadores.",
      "La revisión advirtió que dos histogramas usaban escalas incompatibles."
    ],
    "purpose": "leer representaciones cuantitativas considerando escala y denominador",
    "wrong": "deducir cifras inventadas sin leer los ejes"
  },
  {
    "name": "Análisis de ironía",
    "contexts": [
      "El narrador escribió «qué puntual» cuando su amigo llegó una hora tarde.",
      "En una reseña se llamó «gran ayuda» a una herramienta que dejó de funcionar.",
      "El personaje describió como «excelente suerte» haber perdido el único autobús."
    ],
    "purpose": "interpretar una expresión cuyo sentido contrasta con la situación",
    "wrong": "tomar siempre los elogios irónicos como aprobación literal"
  },
  {
    "name": "Un argumento condicional",
    "contexts": [
      "El documento explicó que el plan se ejecutaría solo si aprobaban el presupuesto.",
      "La propuesta supeditó una apertura a la disponibilidad de voluntarios.",
      "El proyecto condicionó la expansión al resultado de una prueba piloto."
    ],
    "purpose": "reconocer condiciones necesarias para una acción futura",
    "wrong": "presentar posibilidades condicionadas como hechos seguros"
  },
  {
    "name": "Síntesis de documentos",
    "contexts": [
      "La revisión integró resultados favorables y desfavorables de varios informes.",
      "La historiadora distinguió coincidencias y discrepancias de tres testimonios.",
      "El comité resumió beneficios y costos de una medida sin ocultar incertidumbres."
    ],
    "purpose": "integrar evidencias distintas y conservar sus matices",
    "wrong": "seleccionar solo datos favorables e inventar consenso"
  },
  {
    "name": "Estructura argumentativa",
    "contexts": [
      "El ensayo planteó una tesis sobre bibliotecas y luego justificó la postura con encuestas.",
      "El discurso presentó una propuesta de movilidad y respondió a objeciones sobre costos.",
      "La columna sostuvo ampliar becas y reconoció límites de financiación."
    ],
    "purpose": "organizar tesis, argumentos y respuesta a objeciones",
    "wrong": "confundir repetición de la tesis con justificación"
  },
  {
    "name": "La evidencia de una causa",
    "contexts": [
      "Una investigación halló asociación entre tutorías y notas, pero no evaluó notas iniciales.",
      "El informe observó más visitas tras una campaña y una ampliación simultánea de horarios.",
      "El estudio registró menor gasto tras cambiar equipos y reducir días operativos."
    ],
    "purpose": "distinguir asociaciones de atribuciones causales demostradas",
    "wrong": "asegurar causalidad exclusiva por coincidencia temporal"
  },
  {
    "name": "Análisis intertextual",
    "contexts": [
      "Un poema aludió a un mito antiguo para relacionar dos figuras heroicas.",
      "Una novela citó un refrán popular y transformó su sentido en otro contexto.",
      "Un ensayo comparó un personaje moderno con un héroe de una obra clásica."
    ],
    "purpose": "reconocer relaciones de sentido entre escritos diferentes",
    "wrong": "afirmar que toda alusión es una copia literal"
  },
  {
    "name": "Una recomendación equilibrada",
    "contexts": [
      "La comisión evaluó ampliar un servicio considerando beneficios de acceso y gastos.",
      "El grupo comparó alternativas energéticas por costos y efectos ambientales.",
      "El consejo propuso modificar rutas después de revisar accesibilidad y limitaciones."
    ],
    "purpose": "formular una recomendación que integra ventajas y restricciones",
    "wrong": "recomendar sin examinar ninguna consecuencia"
  }
] as const;
const level=(i:number):Level=>i<7?"principiante":i<19?"intermedio":"avanzado";
export type AnalysisDetective={id:string;level:Level;subtopic:"Análisis de textos";title:string;passage:string;claims:{text:string;tag:EvidenceTag;explanation:string}[];reviewStatus:"editorial-draft"};
export type AnalysisChoice={id:string;level:Level;subtopic:"Análisis de textos";title:string;passage:string;question:string;options:[string,string,string,string];answer:number;explanation:string;reviewStatus:"editorial-draft"};
export type AnalysisReconstruct={id:string;level:Level;subtopic:"Análisis de textos";title:string;passage:string;order:{parts:[string,string,string];hint:string;explanation:string};reviewStatus:"editorial-draft"};

export const ANALYSIS_DETECTIVE_CASES:AnalysisDetective[]=SEEDS.map((s,i)=>{
 const passage=s.contexts[0]+" Un lector analizó la organización de esta información y determinó que el propósito del escrito era "+s.purpose+". La discusión en clase distinguió el propósito de detalles secundarios y de interpretaciones que el texto no confirma.";
 const claims=[{text:"El análisis identifica como finalidad del escrito "+s.purpose+".",tag:"explicit" as const,explanation:"La lectura declara explícitamente esa finalidad comunicativa."},{text:"La selección de hechos y su organización podrían ayudar a cumplir el propósito identificado.",tag:"inference" as const,explanation:"La forma de disponer la información ofrece indicios sobre la función del texto."},{text:"La lectura permite "+s.wrong+".",tag:"unsupported" as const,explanation:"El contenido no respalda esa interpretación categórica."}],k=i%3;
 return {id:"analysis-det-"+i,level:level(i),subtopic:"Análisis de textos",title:s.name+" — estructura",passage,claims:[...claims.slice(k),...claims.slice(0,k)],reviewStatus:"editorial-draft"};
});
export const ANALYSIS_CHOICE_CASES:AnalysisChoice[]=SEEDS.map((s,i)=>{
 const passage=s.contexts[1]+" El comentario de lectura pide precisar qué organiza las ideas y qué función desempeña el fragmento. También advierte que una conclusión crítica debe respetar la información disponible, sin atribuir resultados no documentados.";
 const answer=s.purpose;
 const other=SEEDS[(i+11)%SEEDS.length].purpose;
 const options=[answer,other,s.wrong,"presentar únicamente una lista de palabras sin relación con el asunto"],k=i%4;
 return {id:"analysis-quiz-"+i,level:level(i),subtopic:"Análisis de textos",title:s.name+" — interpretación",passage,question:"¿Qué propósito o estructura describe mejor este texto?",options:[...options.slice(k),...options.slice(0,k)] as [string,string,string,string],answer:(4-k)%4,explanation:"Las pistas «"+s.contexts[1]+"» indican que el texto busca "+answer+", no "+s.wrong+".",reviewStatus:"editorial-draft"};
});
export const ANALYSIS_RECONSTRUCT_CASES:AnalysisReconstruct[]=SEEDS.map((s,i)=>{
 const passage=s.contexts[2]+" Para analizarlo, el equipo de lectura distinguió la observación principal, su función discursiva y una conclusión compatible con las pistas. Así evitó tratar detalles aislados como toda la tesis del escrito.";
 const parts:[string,string,string]=["Localizar en el pasaje este contenido: "+s.contexts[2],"Identificar cómo ese contenido contribuye a "+s.purpose+".","Sintetizar la función del texto sin "+s.wrong+"."];
 return {id:"analysis-recon-"+i,level:level(i),subtopic:"Análisis de textos",title:s.name+" — razonamiento",passage,order:{parts,hint:"Ordena observación textual, función discursiva y síntesis justificada.",explanation:"El examen de «"+s.name+"» comienza con datos concretos y concluye identificando la función de "+s.purpose+"."},reviewStatus:"editorial-draft"};
});
