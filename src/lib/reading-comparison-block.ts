import type {Level} from "./grammar";
import type {EvidenceTag} from "./reading";
const SEEDS=[
  {
    "title": "Dos horarios de biblioteca",
    "a": "La biblioteca central abrirá los sábados para atender a estudiantes que trabajan de lunes a viernes.",
    "b": "La biblioteca del barrio conservará su horario, pero realizará préstamos a domicilio.",
    "common": "ambos textos proponen facilitar el acceso a libros",
    "different": "uno amplía horas y el otro utiliza entregas"
  },
  {
    "title": "Dos huertos escolares",
    "a": "El primer colegio siembra hortalizas en macetas y registra el consumo de agua.",
    "b": "El segundo cultiva árboles frutales en el patio y evalúa la disponibilidad de sombra.",
    "common": "ambas experiencias observan el cultivo en escuelas",
    "different": "cambian las especies y las condiciones estudiadas"
  },
  {
    "title": "Transporte al hospital",
    "a": "El informe vecinal propone una ruta directa de autobús para reducir transbordos.",
    "b": "El comité de salud pide mejorar la frecuencia de las rutas existentes para reducir esperas.",
    "common": "ambos buscan facilitar el viaje al hospital",
    "different": "una propuesta modifica el recorrido y la otra la frecuencia"
  },
  {
    "title": "Cuidado del río",
    "a": "La asociación juvenil organiza jornadas para recoger plásticos en las orillas.",
    "b": "El laboratorio municipal mide la calidad del agua y pide investigar fuentes de sedimentos.",
    "common": "ambos atienden problemas ambientales del río",
    "different": "uno realiza limpieza y el otro recopila evidencia"
  },
  {
    "title": "Dos reseñas del cuento",
    "a": "La primera reseña destaca las decisiones de la protagonista y su cambio personal.",
    "b": "La segunda reseña analiza el lenguaje poético y las imágenes de la narración.",
    "common": "ambas interpretan la misma obra literaria",
    "different": "una se concentra en personajes y la otra en estilo"
  },
  {
    "title": "La feria de ciencias",
    "a": "El colegio del norte exhibirá proyectos sobre energía solar y explicará sus materiales.",
    "b": "El colegio del sur presentará experimentos de filtración de agua con demostraciones.",
    "common": "ambos participan en actividades de divulgación científica",
    "different": "presentan temas y procedimientos diferentes"
  },
  {
    "title": "Reglas del parque",
    "a": "La alcaldía pide no dejar residuos y anuncia recipientes de reciclaje.",
    "b": "Un grupo de vecinos solicita mantener abiertos los senderos y reparar señales dañadas.",
    "common": "ambos proponen mejoras para el uso del parque",
    "different": "uno trata residuos y el otro accesibilidad"
  },
  {
    "title": "Una obra vial",
    "a": "El municipio sostiene que la ampliación de la carretera reducirá tiempos de viaje.",
    "b": "El comité ambiental advierte que el proyecto puede afectar árboles próximos y pide estudios.",
    "common": "ambos se refieren al mismo proyecto de carretera",
    "different": "uno enfatiza movilidad y el otro impactos ambientales"
  },
  {
    "title": "Becas educativas",
    "a": "La escuela reporta que una beca facilitó materiales a estudiantes de bajos ingresos.",
    "b": "La asociación de familias propone añadir transporte para quienes viven lejos del centro.",
    "common": "ambos identifican barreras para estudiar",
    "different": "uno ofrece materiales y el otro propone movilidad"
  },
  {
    "title": "Dos noticias del clima",
    "a": "El boletín local informa que llovió intensamente durante tres días.",
    "b": "El informe climático examina cambios en lluvias durante veinte años con estaciones comparables.",
    "common": "ambos describen precipitaciones",
    "different": "analizan períodos de duración distinta"
  },
  {
    "title": "Préstamos digitales",
    "a": "La biblioteca informa más préstamos electrónicos desde que actualizó su aplicación.",
    "b": "El comité de usuarios señala que algunas familias carecen de conexión para descargar libros.",
    "common": "ambos hablan de acceso a lecturas digitales",
    "different": "uno registra aumento y el otro advierte exclusión"
  },
  {
    "title": "Uso de la cancha",
    "a": "La dirección propone turnos fijos para distribuir el uso entre varios cursos.",
    "b": "Los estudiantes piden horarios flexibles que permitan cambios entre equipos.",
    "common": "ambos buscan compartir la cancha con justicia",
    "different": "difieren sobre la flexibilidad de los turnos"
  },
  {
    "title": "Encuestas de hábitos",
    "a": "Una encuesta escolar pregunta por libros leídos durante las vacaciones.",
    "b": "Otra encuesta incluye lecturas obligatorias de tareas en su recuento anual.",
    "common": "ambos miden prácticas lectoras",
    "different": "utilizan criterios distintos para contar lecturas"
  },
  {
    "title": "Un museo comunitario",
    "a": "El museo reúne fotografías antiguas para reconstruir los cambios del barrio.",
    "b": "Una asociación entrevista a vecinos mayores para registrar memorias personales.",
    "common": "ambos conservan la historia comunitaria",
    "different": "uno prioriza imágenes y otro testimonios"
  },
  {
    "title": "Consumo de energía",
    "a": "La escuela calcula cuánto bajó el consumo eléctrico después de instalar lámparas eficientes.",
    "b": "Una empresa presenta una reducción de factura después de cambiar tarifas y reducir días activos.",
    "common": "ambos reportan variaciones vinculadas con energía",
    "different": "miden consumo físico y gasto monetario respectivamente"
  },
  {
    "title": "Dos planes de reciclaje",
    "a": "Un municipio colocará contenedores separados en espacios públicos.",
    "b": "Una cooperativa propone recoger materiales directamente en hogares voluntarios.",
    "common": "ambos buscan clasificar residuos para aprovecharlos",
    "different": "utilizan puntos públicos y recogida domiciliaria"
  },
  {
    "title": "Opiniones sobre tecnología",
    "a": "Una docente valora los programas digitales porque permiten ejercicios personalizados.",
    "b": "Otro profesor advierte que deben contemplarse estudiantes sin conexión estable.",
    "common": "ambos discuten el uso escolar de tecnología",
    "different": "uno enfatiza posibilidades y otro limitaciones"
  },
  {
    "title": "Rutas de emergencia",
    "a": "El servicio de bomberos publica mapas de evacuación para las principales avenidas.",
    "b": "La asociación de personas con discapacidad solicita rutas accesibles y señalización adicional.",
    "common": "ambos trabajan la seguridad durante evacuaciones",
    "different": "el segundo añade necesidades de accesibilidad"
  },
  {
    "title": "Dos informes de salud",
    "a": "El hospital urbano cuenta consultas realizadas en sus clínicas durante el año.",
    "b": "El centro rural registra pacientes atendidos por brigadas móviles en comunidades dispersas.",
    "common": "ambos reportan atención sanitaria",
    "different": "emplean modalidades y poblaciones diferentes"
  },
  {
    "title": "Tasas de abandono",
    "a": "Una universidad define abandono como faltar un semestre a clases.",
    "b": "Otra universidad define abandono como no matricularse durante dos períodos consecutivos.",
    "common": "ambas intentan medir interrupción de estudios",
    "different": "sus definiciones operativas no son equivalentes"
  },
  {
    "title": "Dos pruebas de aprendizaje",
    "a": "Un examen mide comprensión de argumentos mediante textos y preguntas abiertas.",
    "b": "Otro examen mide vocabulario mediante opciones de significado en frases breves.",
    "common": "ambas evalúan destrezas de lengua",
    "different": "miden competencias distintas"
  },
  {
    "title": "Movilidad sostenible",
    "a": "La ciudad construye carriles para bicicletas en avenidas principales.",
    "b": "Otra localidad subsidia el autobús para reducir viajes en automóvil.",
    "common": "ambas buscan modos de transporte más sostenibles",
    "different": "una mejora infraestructura ciclista y otra precios del transporte público"
  },
  {
    "title": "Crónicas del conflicto",
    "a": "Un diario contemporáneo relata acontecimientos de una huelga con fechas específicas.",
    "b": "Una entrevista décadas después recoge las memorias de antiguos participantes.",
    "common": "ambos aportan versiones de un hecho histórico",
    "different": "difieren en época y naturaleza de sus fuentes"
  },
  {
    "title": "Una tasa de participación",
    "a": "El primer reporte divide asistentes a reuniones entre todos los vecinos registrados.",
    "b": "El segundo divide asistentes entre quienes confirmaron previamente su interés.",
    "common": "ambos estiman asistencia a reuniones",
    "different": "las bases poblacionales de las tasas son diferentes"
  },
  {
    "title": "Gasto público",
    "a": "El ministerio presenta cifras de gasto total en materiales escolares por región.",
    "b": "Una auditoría calcula gasto por alumno para comparar instituciones de distinto tamaño.",
    "common": "ambos informan sobre recursos educativos",
    "different": "uno usa totales y otro valores por estudiante"
  },
  {
    "title": "Beneficios de un programa",
    "a": "El informe ejecutivo comunica una mejora media en lectura de estudiantes participantes.",
    "b": "El anexo señala que algunos grupos rurales no tuvieron mejoras comparables.",
    "common": "ambos describen resultados del programa",
    "different": "el promedio y los resultados desagregados muestran perspectivas diferentes"
  },
  {
    "title": "Dos diseños de estudio",
    "a": "Un equipo encuesta voluntariamente a personas que acuden a una clínica.",
    "b": "Otro equipo selecciona aleatoriamente hogares para una encuesta comunitaria.",
    "common": "ambos recopilan información sobre salud",
    "different": "las estrategias de muestreo tienen alcances diferentes"
  },
  {
    "title": "Causas de los retrasos",
    "a": "La nota administrativa atribuye los retrasos del autobús a obras viales.",
    "b": "La evaluación independiente documenta además cambios de horario y lluvias.",
    "common": "ambos examinan demoras del transporte",
    "different": "la segunda ofrece explicaciones alternativas"
  },
  {
    "title": "Escalas de bienestar",
    "a": "Un cuestionario pide valorar satisfacción vital en una escala de cero a diez.",
    "b": "Otro instrumento evalúa bienestar mediante relaciones, salud y actividades diarias.",
    "common": "ambos intentan medir bienestar",
    "different": "los componentes considerados no son idénticos"
  },
  {
    "title": "Proyecciones de población",
    "a": "El modelo municipal calcula población futura bajo supuestos de natalidad estable.",
    "b": "Otro escenario incorpora un aumento de migración y obtiene cifras mayores.",
    "common": "ambos estiman población futura",
    "different": "emplean supuestos demográficos diferentes"
  },
  {
    "title": "Sensores de contaminación",
    "a": "El primer informe cuenta alertas con equipos antiguos de menor sensibilidad.",
    "b": "El segundo registra incidentes con sensores nuevos que detectan concentraciones menores.",
    "common": "ambos estudian contaminación ambiental",
    "different": "los instrumentos tienen capacidades de detección diferentes"
  },
  {
    "title": "Citas históricas",
    "a": "Una investigación reproduce palabras verificadas en un acta original conservada.",
    "b": "Una reseña refiere el mismo suceso mediante la paráfrasis de un libro posterior.",
    "common": "ambas mencionan un acontecimiento histórico",
    "different": "una cita fuente primaria y la otra interpreta indirectamente"
  },
  {
    "title": "Resultados contradictorios",
    "a": "Un ensayo de tutoría registra mejores notas entre estudiantes participantes.",
    "b": "Otro estudio no encuentra mejora y advierte diferencias iniciales entre grupos.",
    "common": "ambos evalúan tutorías escolares",
    "different": "sus resultados y condiciones metodológicas difieren"
  },
  {
    "title": "Eficiencia del agua",
    "a": "Un informe registra litros utilizados por día activo en una fábrica.",
    "b": "Otro comunica solo el descenso de factura después de una reducción de tarifas.",
    "common": "ambos describen uso o costos vinculados con agua",
    "different": "una medida consumo físico y otra gasto"
  },
  {
    "title": "Costos de un proyecto",
    "a": "La propuesta enumera beneficios de ampliar la red de autobuses y reducir esperas.",
    "b": "El estudio financiero presenta gastos de mantenimiento y personal para la ampliación.",
    "common": "ambos evalúan el mismo proyecto de transporte",
    "different": "uno enfatiza beneficios y otro costos"
  },
  {
    "title": "Diversidad de testimonios",
    "a": "Un archivo reúne entrevistas de personas que respaldan una reforma histórica.",
    "b": "Otra colección conserva relatos de quienes se opusieron a la misma reforma.",
    "common": "ambos documentan opiniones sobre un acontecimiento",
    "different": "las perspectivas recopiladas son contrapuestas"
  }
] as const;
const level=(i:number):Level=>i<7?"principiante":i<19?"intermedio":"avanzado";
export type CompareDetective={id:string;level:Level;subtopic:"Lectura comparada";title:string;passage:string;claims:{text:string;tag:EvidenceTag;explanation:string}[];reviewStatus:"editorial-draft"};
export type CompareChoice={id:string;level:Level;subtopic:"Lectura comparada";title:string;passage:string;question:string;options:[string,string,string,string];answer:number;explanation:string;reviewStatus:"editorial-draft"};
export type CompareReconstruct={id:string;level:Level;subtopic:"Lectura comparada";title:string;passage:string;order:{parts:[string,string,string];hint:string;explanation:string};reviewStatus:"editorial-draft"};

export const COMPARISON_DETECTIVE_CASES:CompareDetective[]=SEEDS.map((s,i)=>{
 const passage="Documento A: "+s.a+"\n\nDocumento B: "+s.b+" Los dos textos examinan el asunto desde perspectivas distintas. La comparación no puede suponer que las metodologías, las poblaciones o los propósitos sean idénticos si los pasajes no lo muestran.";
 const claims=[{text:"El documento A plantea: "+s.a,tag:"explicit" as const,explanation:"La proposición está escrita literalmente en el primer documento."},{text:"Al comparar las fuentes se puede reconocer que "+s.common+".",tag:"inference" as const,explanation:"Ambos documentos ofrecen indicios que permiten detectar ese punto de conexión."},{text:"Los documentos tienen exactamente los mismos procedimientos y conclusiones sin matices.",tag:"unsupported" as const,explanation:"Sus enfoques son distintos: "+s.different+"."}],k=i%3;
 return {id:"compare-det-"+i,level:level(i),subtopic:"Lectura comparada",title:s.title+" — dos fuentes",passage,claims:[...claims.slice(k),...claims.slice(0,k)],reviewStatus:"editorial-draft"};
});
export const COMPARISON_CHOICE_CASES:CompareChoice[]=SEEDS.map((s,i)=>{
 const passage="Texto A: "+s.a+"\n\nTexto B: "+s.b+" La consigna es interpretar cómo se complementan o en qué divergen los dos documentos, sin confundir una coincidencia temática con identidad total.";
 const options=["Ambos textos se relacionan porque "+s.common+", pero "+s.different+".","Los dos textos son completamente idénticos en procedimiento y resultados.","El segundo documento confirma que todas las hipótesis del primero son falsas.","No existe ninguna relación temática entre las dos lecturas."],k=i%4;
 return {id:"compare-quiz-"+i,level:level(i),subtopic:"Lectura comparada",title:s.title+" — relación entre textos",passage,question:"¿Qué comparación identifica correctamente una coincidencia y una diferencia?",options:[...options.slice(k),...options.slice(0,k)] as [string,string,string,string],answer:(4-k)%4,explanation:"La conexión está en que "+s.common+"; la diferencia relevante es que "+s.different+". No debe afirmarse identidad total.",reviewStatus:"editorial-draft"};
});
export const COMPARISON_RECONSTRUCT_CASES:CompareReconstruct[]=SEEDS.map((s,i)=>{
 const passage="Fuente primera: "+s.a+"\n\nFuente segunda: "+s.b+" El equipo debe sintetizar ambas lecturas indicando qué comparte su tema y qué rasgo es distinto, antes de escribir una comparación sustentada.";
 const parts:[string,string,string]=["Reconocer la idea del texto A: "+s.a,"Examinar la información de la fuente B: "+s.b,"Concluir que "+s.common+", aunque "+s.different+"."];
 return {id:"compare-recon-"+i,level:level(i),subtopic:"Lectura comparada",title:s.title+" — síntesis comparativa",passage,order:{parts,hint:"Ordena fuente inicial, segunda perspectiva y contraste que integra ambas.",explanation:"La comparación debe mantener las dos perspectivas. Coinciden en que "+s.common+", pero "+s.different+"."},reviewStatus:"editorial-draft"};
});
