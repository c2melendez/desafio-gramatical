import type {Level} from "./grammar";
import type {EvidenceTag} from "./reading";

/** 36 objetivos figurativos, cada uno con tres textos distintos escritos para mecánicas diferentes.
 * La equivalencia psicométrica y posibles lecturas alternativas siguen pendientes de revisión docente.
 */
const FIGURES=[
  {
    "title": "Comparación explícita",
    "figure": "símil",
    "passages": [
      "El silencio de la biblioteca era como una manta que cubría las mesas.",
      "Al terminar el partido, la alegría llegó como una ola que inundó el patio.",
      "La voz de la narradora tembló como una hoja movida por el viento."
    ],
    "meaning": "El silencio envolvía el lugar y favorecía la concentración.",
    "wrong1": "Había una manta real encima de cada mesa.",
    "wrong2": "El edificio quedó totalmente vacío por una tormenta."
  },
  {
    "title": "Un reloj inquieto",
    "figure": "personificación",
    "passages": [
      "El reloj del pasillo protestaba con cada campanada durante el examen.",
      "En la casa abandonada, las ventanas parecían conversar cuando soplaba el viento.",
      "La puerta saludó con un chirrido al visitante que llegó tarde."
    ],
    "meaning": "El sonido insistente del reloj se presenta como si tuviera voluntad.",
    "wrong1": "El reloj habló literalmente con los estudiantes.",
    "wrong2": "Los estudiantes rompieron el reloj durante el examen."
  },
  {
    "title": "El río de gente",
    "figure": "metáfora",
    "passages": [
      "Al salir del concierto, un río de personas atravesó la avenida iluminada.",
      "En la plaza, el mercado era un hormiguero de comerciantes y compradores.",
      "Al abrirse las puertas, una marea de viajeros entró a la estación."
    ],
    "meaning": "Una multitud numerosa se movía de forma continua.",
    "wrong1": "Una corriente de agua inundó toda la avenida.",
    "wrong2": "El concierto había sido cancelado antes de comenzar."
  },
  {
    "title": "Una espera eterna",
    "figure": "hipérbole",
    "passages": [
      "Esperé mil años frente a la ventanilla, dijo Marta tras veinte minutos de fila.",
      "Tengo una montaña de tareas, comentó Luis al mirar los cuadernos.",
      "Lloré un océano cuando terminé la novela, confesó la lectora emocionada."
    ],
    "meaning": "La espera resultó muy larga para quien la experimentó.",
    "wrong1": "Marta vivió literalmente mil años en la fila.",
    "wrong2": "El servicio había dejado de atender para siempre."
  },
  {
    "title": "El timbre del patio",
    "figure": "onomatopeya",
    "passages": [
      "Rin, rin, sonó el timbre que anunció el final del recreo.",
      "¡Pum!, resonó la puerta cuando el viento la cerró de golpe.",
      "El reloj hizo tic, tac durante la noche silenciosa."
    ],
    "meaning": "Las palabras imitan directamente el sonido del timbre.",
    "wrong1": "El timbre produjo una melodía completa con instrumentos.",
    "wrong2": "El recreo nunca había comenzado ese día."
  },
  {
    "title": "La misma promesa",
    "figure": "repetición",
    "passages": [
      "Volveré, volveré, prometió el viajero al despedirse en la estación.",
      "Llueve, llueve, repitió la niña mientras miraba el patio mojado.",
      "Corre, corre, gritó la entrenadora al equipo que avanzaba hacia la meta."
    ],
    "meaning": "La reiteración intensifica la insistencia de la promesa.",
    "wrong1": "El viajero regresó exactamente dos veces esa tarde.",
    "wrong2": "La despedida terminó en una discusión entre pasajeros."
  },
  {
    "title": "Un invierno blanco",
    "figure": "epíteto",
    "passages": [
      "La blanca nieve cubría el camino de la montaña al amanecer.",
      "El frío hielo brillaba bajo la luz de la mañana.",
      "La oscura noche envolvió el pueblo antes de encenderse los faroles."
    ],
    "meaning": "El adjetivo refuerza una cualidad característica de la nieve.",
    "wrong1": "La nieve se había pintado de un color artificial.",
    "wrong2": "La montaña permaneció sin nieve durante el invierno."
  },
  {
    "title": "Luz y sombra",
    "figure": "antítesis",
    "passages": [
      "Su rostro mostraba alegría, pero sus palabras revelaban tristeza.",
      "La plaza estaba llena de risas mientras la calle vecina guardaba silencio.",
      "Él buscaba paz en medio del ruido de la ciudad."
    ],
    "meaning": "La contraposición de sentimientos subraya un conflicto interior.",
    "wrong1": "La persona no expresó ninguna emoción en absoluto.",
    "wrong2": "La alegría y la tristeza eran nombres de dos calles."
  },
  {
    "title": "Qué puntualidad",
    "figure": "ironía",
    "passages": [
      "¡Qué puntual!, dijo Ana cuando el autobús llegó una hora tarde.",
      "Excelente idea, murmuró el estudiante al descubrir que perdió su tarea.",
      "¡Qué suerte!, exclamó Pablo al encontrar su paraguas roto bajo la lluvia."
    ],
    "meaning": "La expresión aparenta elogiar, pero critica un retraso evidente.",
    "wrong1": "Ana consideró que el autobús había llegado demasiado temprano.",
    "wrong2": "El autobús salió antes de la hora anunciada."
  },
  {
    "title": "Leer a una autora",
    "figure": "metonimia",
    "passages": [
      "En clase leímos a Cervantes para comentar sus personajes y aventuras.",
      "Durante la exposición, el público escuchó a Mozart con atención.",
      "La editorial anunció que publicaría más García Márquez el próximo año."
    ],
    "meaning": "El nombre del autor sustituye a sus obras literarias.",
    "wrong1": "El curso entrevistó personalmente al escritor fallecido.",
    "wrong2": "La clase estudió exclusivamente la vida familiar del autor."
  },
  {
    "title": "Cien velas",
    "figure": "sinécdoque",
    "passages": [
      "El cronista contó cien velas que se acercaban al puerto al anochecer.",
      "La familia necesita más manos para recoger la cosecha antes de la lluvia.",
      "El estadio celebró cuando once camisetas azules entraron al campo."
    ],
    "meaning": "Se nombran las velas para referirse a las embarcaciones completas.",
    "wrong1": "Había cien velas encendidas sobre la superficie del agua.",
    "wrong2": "Los barcos se quedaron inmóviles durante todo el viaje."
  },
  {
    "title": "Un silencio atronador",
    "figure": "oxímoron",
    "passages": [
      "Un silencio atronador ocupó la sala cuando se anunció la decisión.",
      "La despedida dejó una dulce amargura en los recuerdos del viajero.",
      "El personaje atravesó una luminosa oscuridad en su sueño."
    ],
    "meaning": "Se unen términos opuestos para intensificar la impresión de silencio.",
    "wrong1": "Un ruido de explosiones se escuchó durante la lectura.",
    "wrong2": "La sala se llenó de música instrumental a volumen alto."
  },
  {
    "title": "Colores que suenan",
    "figure": "sinestesia",
    "passages": [
      "Su voz tenía un color cálido que tranquilizaba a todos.",
      "La mañana dejó un sabor azul en la memoria del poeta.",
      "El músico describió una melodía áspera al terminar el ensayo."
    ],
    "meaning": "Se mezclan sensaciones de sentidos distintos para describir una voz agradable.",
    "wrong1": "La voz produjo una luz naranja físicamente visible.",
    "wrong2": "La cantante había perdido completamente el habla."
  },
  {
    "title": "En el camino",
    "figure": "anáfora",
    "passages": [
      "En el camino aprendí paciencia; en el camino descubrí valor; en el camino encontré amigos.",
      "Aquí comienza la esperanza, aquí crece el esfuerzo, aquí nace el cambio.",
      "Quiero volver al río, quiero escuchar el viento, quiero mirar las montañas."
    ],
    "meaning": "La repetición al comienzo de frases refuerza una idea central.",
    "wrong1": "La frase describe tres caminos diferentes en un mapa real.",
    "wrong2": "El viajero olvidó por completo su destino."
  },
  {
    "title": "Dos voces paralelas",
    "figure": "paralelismo",
    "passages": [
      "La niña miraba las estrellas; el niño observaba el mar.",
      "Unos llegaron temprano; otros salieron tarde.",
      "El viento movía las hojas; la lluvia golpeaba los techos."
    ],
    "meaning": "La estructura semejante de las dos oraciones establece correspondencia.",
    "wrong1": "Las dos personas realizaron exactamente el mismo movimiento.",
    "wrong2": "Ninguno de los personajes observó el paisaje."
  },
  {
    "title": "Una partida delicada",
    "figure": "eufemismo",
    "passages": [
      "La familia dijo que el abuelo había partido para siempre, evitando nombrar su muerte.",
      "La empresa anunció un reajuste de personal cuando eliminó varios puestos.",
      "El narrador dijo que atravesaba dificultades económicas en vez de declarar su pobreza."
    ],
    "meaning": "La expresión atenúa una noticia dolorosa mediante palabras indirectas.",
    "wrong1": "El abuelo tomó un tren para regresar al día siguiente.",
    "wrong2": "La familia organizó una excursión turística."
  },
  {
    "title": "No fue poca cosa",
    "figure": "lítote",
    "passages": [
      "No fue poca cosa la ayuda de los vecinos durante la inundación.",
      "La actriz no estuvo nada mal en su primera función.",
      "El resultado no fue insignificante para quienes participaron."
    ],
    "meaning": "Se niega una expresión opuesta para destacar que la ayuda fue considerable.",
    "wrong1": "Los vecinos prestaron una ayuda mínima e inútil.",
    "wrong2": "No hubo inundación en ese lugar."
  },
  {
    "title": "Palabras suspendidas",
    "figure": "elipsis",
    "passages": [
      "Yo traje cuadernos; ella, lápices para completar las actividades.",
      "En el patio había tres mesas; en el salón, cinco.",
      "María estudiaba historia; Pedro, matemáticas."
    ],
    "meaning": "Se omite un verbo que puede recuperarse por el contexto previo.",
    "wrong1": "Ella había perdido todos sus útiles antes de llegar.",
    "wrong2": "El texto indica que nadie llevó materiales."
  },
  {
    "title": "Oh montaña",
    "figure": "apóstrofe",
    "passages": [
      "Oh montaña, guarda el eco de las voces de quienes caminaron aquí.",
      "Tú, vieja ciudad, escucha el rumor de tus calles al amanecer.",
      "Oh tiempo, detén por un instante las horas de nuestra despedida."
    ],
    "meaning": "La voz poética se dirige directamente a la montaña como interlocutora.",
    "wrong1": "La montaña respondió con palabras humanas audibles.",
    "wrong2": "El hablante estaba dando instrucciones de escalada."
  },
  {
    "title": "El bosque y la esperanza",
    "figure": "alegoría",
    "passages": [
      "El cuento presenta un bosque oscuro como el miedo y un sendero iluminado como la esperanza.",
      "En la fábula, la ciudad amurallada representa el aislamiento y el puente abierto, la confianza.",
      "La narración muestra un viaje entre puertas cerradas y plazas luminosas para hablar de libertad."
    ],
    "meaning": "Varios elementos del relato representan de manera sostenida una experiencia emocional.",
    "wrong1": "El bosque fue medido científicamente por guardabosques.",
    "wrong2": "La narración se limita a explicar especies vegetales."
  },
  {
    "title": "Ganó perdiendo",
    "figure": "paradoja",
    "passages": [
      "Al despedirse de su cargo, afirmó que perdió el puesto y ganó libertad.",
      "Cuanto más intentaba olvidar el recuerdo, más presente lo sentía.",
      "En la distancia encontró la cercanía de las cartas familiares."
    ],
    "meaning": "La contradicción aparente propone una verdad sobre la libertad personal.",
    "wrong1": "La persona recibió una promoción laboral inmediata.",
    "wrong2": "El cargo permaneció sin cambios durante años."
  },
  {
    "title": "El orden invertido",
    "figure": "hipérbaton",
    "passages": [
      "De verdes hojas la plaza se llenó después de la lluvia.",
      "Del mar azul llegaron antiguas historias en la voz del pescador.",
      "Con infinita paciencia los libros ordenó la bibliotecaria."
    ],
    "meaning": "Se altera el orden habitual de las palabras para dar énfasis poético.",
    "wrong1": "Las hojas cambiaron a un color imposible por magia.",
    "wrong2": "La frase carece de cualquier estructura comprensible."
  },
  {
    "title": "Sin conectores",
    "figure": "asíndeton",
    "passages": [
      "Corrí, salté, grité, celebré al llegar a la meta.",
      "Miró el mapa, guardó la brújula, tomó el sendero.",
      "Llegaron cartas, llegaron noticias, llegaron recuerdos."
    ],
    "meaning": "La enumeración prescinde de conjunciones para dar rapidez al ritmo.",
    "wrong1": "Cada acción ocurrió en un día distinto necesariamente.",
    "wrong2": "Nadie llegó a participar en la carrera."
  },
  {
    "title": "Y de nuevo y de nuevo",
    "figure": "polisíndeton",
    "passages": [
      "Y cantaban y reían y bailaban durante la fiesta del pueblo.",
      "Ni descansaba ni comía ni dormía mientras esperaba noticias.",
      "Y el viento y la lluvia y la noche acompañaron el viaje."
    ],
    "meaning": "La repetición de conjunciones hace más insistente el ritmo de la enumeración.",
    "wrong1": "La fiesta se canceló al llegar la noche.",
    "wrong2": "Se omiten todas las conjunciones del relato."
  },
  {
    "title": "La ciudad que despierta",
    "figure": "prosopopeya",
    "passages": [
      "La ciudad despertó bostezando entre luces y motores al amanecer.",
      "Los caminos susurraban historias a los viajeros de la región.",
      "La tarde extendió sus brazos sobre los techos del barrio."
    ],
    "meaning": "Se atribuyen acciones humanas a una ciudad para representar el inicio de actividad.",
    "wrong1": "La ciudad tiene literalmente pulmones y boca.",
    "wrong2": "Los habitantes seguían dormidos durante toda la mañana."
  },
  {
    "title": "El astro de la mañana",
    "figure": "perífrasis",
    "passages": [
      "El astro que ilumina nuestras mañanas apareció detrás de las montañas.",
      "El país de los lagos recibió a los visitantes con un cielo despejado.",
      "El autor de la gran novela fue homenajeado sin pronunciar su nombre."
    ],
    "meaning": "Se designa el sol mediante una expresión descriptiva en lugar de nombrarlo.",
    "wrong1": "Se menciona una estrella desconocida que nunca sale de día.",
    "wrong2": "El texto se refiere a un aparato eléctrico."
  },
  {
    "title": "La puerta cerrada",
    "figure": "simbolismo",
    "passages": [
      "La puerta cerrada de la casa representaba las oportunidades negadas al personaje.",
      "El pañuelo blanco guardado en la caja simbolizaba una promesa de paz.",
      "Una semilla en el bolsillo del protagonista se convirtió en símbolo de esperanza."
    ],
    "meaning": "Un objeto concreto representa una idea abstracta de exclusión.",
    "wrong1": "El personaje extravió una llave metálica sin mayor significado.",
    "wrong2": "La casa fue demolida al principio del cuento."
  },
  {
    "title": "Primero un rumor",
    "figure": "gradación",
    "passages": [
      "Primero fue un susurro, luego una voz y al final un grito que llenó la sala.",
      "La preocupación se hizo miedo, después angustia y finalmente desesperación.",
      "La chispa creció hasta ser llama y luego un incendio descontrolado."
    ],
    "meaning": "Las palabras muestran un incremento progresivo de intensidad sonora.",
    "wrong1": "La sala estuvo totalmente silenciosa durante todo el suceso.",
    "wrong2": "El narrador describe tres salas en distintos edificios."
  },
  {
    "title": "Quién podrá olvidar",
    "figure": "interrogación retórica",
    "passages": [
      "¿Quién podría olvidar la solidaridad de aquella noche?, preguntó la narradora sin esperar respuesta.",
      "¿Acaso no merecen cuidado nuestros ríos?, dijo el activista ante el público.",
      "¿Hasta cuándo ignoraremos este problema?, exclamó la estudiante en la asamblea."
    ],
    "meaning": "La pregunta enfatiza una convicción y no busca una respuesta informativa literal.",
    "wrong1": "La narradora desconoce quiénes asistieron y solicita una lista.",
    "wrong2": "El público debe responder por escrito con nombres."
  },
  {
    "title": "El eco de consonantes",
    "figure": "aliteración",
    "passages": [
      "Bajo la brisa bailaban las blancas banderas del barrio.",
      "Suave susurra el sauce sobre la senda.",
      "Tres tristes trenzas traía Teresa al teatro."
    ],
    "meaning": "La repetición de sonidos iniciales crea musicalidad en la frase.",
    "wrong1": "Las banderas producen música real mediante altavoces.",
    "wrong2": "El texto contiene un registro exacto de la velocidad del viento."
  },
  {
    "title": "El mundo al revés",
    "figure": "antimetábola",
    "passages": [
      "No vivimos para trabajar, trabajamos para vivir, repitió la oradora.",
      "Si estudias para comprender, comprenderás para estudiar mejor.",
      "No hay que temer al cambio; hay que cambiar el temor, escribió el autor."
    ],
    "meaning": "El intercambio de palabras en orden inverso refuerza un contraste de prioridades.",
    "wrong1": "La oradora propone dejar de trabajar para siempre.",
    "wrong2": "El discurso ordena invertir físicamente los edificios."
  },
  {
    "title": "Una historia en el paisaje",
    "figure": "imagen sensorial",
    "passages": [
      "El olor a café tostado llenó el corredor mientras la lluvia golpeaba el techo.",
      "La arena tibia rozó los pies del viajero al caminar por la costa.",
      "El sabor ácido de la fruta despertó los recuerdos de infancia."
    ],
    "meaning": "La descripción evoca el olfato y el oído para hacer presente una escena.",
    "wrong1": "Un laboratorio midió con instrumentos la intensidad del aroma.",
    "wrong2": "La frase describe únicamente cifras sin referencias a sentidos."
  },
  {
    "title": "Una palabra repetida al final",
    "figure": "epífora",
    "passages": [
      "En la escuela buscamos paz; en casa deseamos paz; en la calle defendemos paz.",
      "El camino termina en casa; el recuerdo regresa a casa; el corazón permanece en casa.",
      "La docente pidió respeto; la clase prometió respeto; la comunidad sostuvo respeto."
    ],
    "meaning": "La misma palabra al final de varias frases enfatiza el valor nombrado.",
    "wrong1": "La paz se menciona una sola vez al inicio del discurso.",
    "wrong2": "La expresión presenta un calendario escolar."
  },
  {
    "title": "Un adjetivo contradictorio",
    "figure": "contraste figurado",
    "passages": [
      "La fiesta alegre dejó un recuerdo triste cuando terminó la despedida.",
      "En una victoria amarga, el equipo celebró un resultado que costó demasiadas pérdidas.",
      "La dulce derrota le enseñó a valorar el esfuerzo colectivo."
    ],
    "meaning": "Se oponen emociones para expresar un balance complejo de la experiencia.",
    "wrong1": "La celebración fue absolutamente feliz y sin matices.",
    "wrong2": "La frase ofrece datos de un marcador deportivo solamente."
  },
  {
    "title": "Espejo de recuerdos",
    "figure": "metáfora extendida",
    "passages": [
      "La memoria era un espejo; cada fotografía devolvía un reflejo del pasado.",
      "La escuela era un jardín y cada estudiante una semilla con posibilidades.",
      "La conversación fue un puente cuyos tablones eran palabras de confianza."
    ],
    "meaning": "La imagen del espejo se prolonga para explicar cómo aparecen recuerdos.",
    "wrong1": "La memoria humana está hecha de vidrio pulido.",
    "wrong2": "Las fotografías fueron destruidas en un incendio."
  },
  {
    "title": "El país del silencio",
    "figure": "alegoría social",
    "passages": [
      "En la historia, un pueblo sin ventanas representaba una sociedad que temía mirar otras ideas.",
      "La fábula muestra pájaros encerrados que aprenden a abrir sus propias jaulas.",
      "Un reino donde todos usan máscaras alude a la dificultad de expresar opiniones sinceras."
    ],
    "meaning": "El escenario imaginario representa de manera sostenida una crítica al miedo de pensar.",
    "wrong1": "El pueblo carece de ventanas por una norma arquitectónica real.",
    "wrong2": "El relato es un manual para construir casas."
  },
  {
    "title": "La nieve del cabello",
    "figure": "metáfora corporal",
    "passages": [
      "Al volver de viaje, descubrió nieve en el cabello de su abuelo y comprendió el paso de los años.",
      "La plata de sus sienes brillaba bajo la luz del patio familiar.",
      "El invierno de sus manos hablaba de décadas de trabajo y cuidados."
    ],
    "meaning": "La nieve representa las canas y el envejecimiento de una persona.",
    "wrong1": "El abuelo llevaba hielo real sobre su cabeza.",
    "wrong2": "La familia acaba de visitar una estación de esquí."
  },
  {
    "title": "El filo de una frase",
    "figure": "metáfora conceptual",
    "passages": [
      "Sus palabras fueron cuchillos que cortaron la confianza del equipo durante la reunión.",
      "La crítica dejó una herida invisible en la amistad de los dos hermanos.",
      "Una frase afilada dividió a los compañeros antes de la reconciliación."
    ],
    "meaning": "Se compara el daño emocional con una herida física mediante lenguaje figurado.",
    "wrong1": "Alguien atacó con un cuchillo real durante la reunión.",
    "wrong2": "El equipo realizó una práctica de cocina con cuchillos."
  }
] as const;
const levelFor=(i:number):Level=>i<7?"principiante":i<19?"intermedio":"avanzado";
export type FigurativeDetectiveCase={id:string;level:Level;subtopic:"Lenguaje figurado";title:string;passage:string;claims:{text:string;tag:EvidenceTag;explanation:string}[];reviewStatus:"editorial-draft"};
export type FigurativeChoiceCase={id:string;level:Level;subtopic:"Lenguaje figurado";title:string;passage:string;question:string;options:[string,string,string,string];answer:number;explanation:string;reviewStatus:"editorial-draft"};
export type FigurativeReconstructCase={id:string;level:Level;subtopic:"Lenguaje figurado";title:string;passage:string;order:{parts:[string,string,string];hint:string;explanation:string};reviewStatus:"editorial-draft"};

export const FIGURATIVE_DETECTIVE_CASES:FigurativeDetectiveCase[]=FIGURES.map((f,i)=>{
 const passage=f.passages[0]+" La docente invitó a examinar si el lenguaje describe hechos comprobables o crea una imagen poética. El grupo discutió cómo una expresión puede comunicar emociones sin afirmar que las palabras deban entenderse literalmente.";
 const claims=[
  {text:"El pasaje contiene esta expresión: «"+f.passages[0]+"»",tag:"explicit" as const,explanation:"La expresión aparece textualmente en la lectura."},
  {text:"El recurso figurativo permite sugerir que "+f.meaning+".",tag:"inference" as const,explanation:"El contexto hace plausible esta interpretación sin exigir una lectura literal de la imagen."},
  {text:"La lectura confirma que "+f.wrong1+".",tag:"unsupported" as const,explanation:"Ese sentido literal o exagerado no está respaldado por el texto."}
 ],k=i%3;
 return {id:"figurative-det-"+i,level:levelFor(i),subtopic:"Lenguaje figurado",title:f.title+" — identificación",passage,claims:[...claims.slice(k),...claims.slice(0,k)],reviewStatus:"editorial-draft"};
});
export const FIGURATIVE_CHOICE_CASES:FigurativeChoiceCase[]=FIGURES.map((f,i)=>{
 const passage=f.passages[1]+" En el taller de interpretación literaria, el grupo examinó cómo esa expresión funciona dentro de la escena narrada y qué significado resulta defendible sin forzar una lectura literal.";
 const distractor=FIGURES[(i+11)%FIGURES.length].meaning;
 const options=[f.meaning,f.wrong1,f.wrong2,distractor],k=i%4;
 return {id:"figurative-quiz-"+i,level:levelFor(i),subtopic:"Lenguaje figurado",title:f.title+" — significado",passage,question:"¿Qué interpretación describe mejor el sentido figurado del fragmento?",options:[...options.slice(k),...options.slice(0,k)] as [string,string,string,string],answer:(4-k)%4,explanation:"La frase «"+f.passages[1]+"» emplea "+f.figure+" para comunicar que "+f.meaning+". No implica que "+f.wrong1+".",reviewStatus:"editorial-draft"};
});
export const FIGURATIVE_RECONSTRUCT_CASES:FigurativeReconstructCase[]=FIGURES.map((f,i)=>{
 const passage=f.passages[2]+" Los lectores organizaron su explicación en tres pasos: localizar la imagen, reconocer el recurso literario y expresar una interpretación coherente con el contexto, evitando confundir metáforas y comparaciones con hechos físicos.";
 const parts:[string,string,string]=[
  "Reconocer en el fragmento la imagen: «"+f.passages[2]+"»",
  "Examinar cómo funciona el recurso denominado "+f.figure+" en el contexto.",
  "Concluir que la imagen expresa: "+f.meaning+"."
 ];
 return {id:"figurative-recon-"+i,level:levelFor(i),subtopic:"Lenguaje figurado",title:f.title+" — reconstrucción",passage,order:{parts,hint:"Ordena imagen textual, recurso figurativo e interpretación contextual.",explanation:"El recurso de "+f.figure+" se entiende considerando la imagen «"+f.passages[2]+"» y su sentido figurado: "+f.meaning+"."},reviewStatus:"editorial-draft"};
});
