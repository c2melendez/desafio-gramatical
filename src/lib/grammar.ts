export type Level = "principiante" | "intermedio" | "avanzado";
export type Mode = "clasificar" | "quiz" | "construir";
export type Cat =
  | "sustantivo" | "adjetivo" | "determinante" | "pronombre" | "verbo" | "adverbio"
  | "preposicion" | "conjuncion" | "interjeccion" | "contraccion";

export const LEVELS: Level[] = ["principiante", "intermedio", "avanzado"];
export const LEVEL_LABEL: Record<Level, string> = { principiante: "Principiante", intermedio: "Intermedio", avanzado: "Avanzado" };
export const MODE_LABEL: Record<Mode, string> = { clasificar: "Clasificar palabras", quiz: "Quiz de conceptos", construir: "Construir oraciones" };

export const CATS: Cat[] = ["sustantivo","adjetivo","determinante","pronombre","verbo","adverbio","preposicion","conjuncion","interjeccion","contraccion"];
export const CAT_LABEL: Record<Cat, string> = {
  sustantivo: "Sustantivo", adjetivo: "Adjetivo", determinante: "Determinante", pronombre: "Pronombre",
  verbo: "Verbo", adverbio: "Adverbio", preposicion: "Preposición", conjuncion: "Conjunción",
  interjeccion: "Interjección", contraccion: "Contracción (prep. + art.)",
};
export const CAT_SHORT: Record<Cat, string> = {
  sustantivo: "Sust.", adjetivo: "Adj.", determinante: "Det.", pronombre: "Pron.", verbo: "Verbo",
  adverbio: "Adv.", preposicion: "Prep.", conjuncion: "Conj.", interjeccion: "Interj.", contraccion: "Contr.",
};

/* ---------- Juego 1: clasificar ---------- */
export type Token = { t: string; c: Cat | null; sub?: string; exp?: string };
export type Sentence = { id: string; tokens: Token[] };

const w = (t: string, c: Cat, sub: string, exp: string): Token => ({ t, c, sub, exp });
const p = (t: string): Token => ({ t, c: null });

const AL = (t: "al" | "del") =>
  w(t, "contraccion", `${t === "al" ? "a" : "de"} (preposición) + el (artículo)`,
    `"${t}" es la contracción de la preposición "${t === "al" ? "a" : "de"}" y el artículo determinado "el". Une dos categorías en una sola palabra.`);

export const SENTENCES: Record<Level, Sentence[]> = {
  principiante: [
    { id: "p1", tokens: [w("El","determinante","artículo determinado","Acompaña a «perro» y concuerda con él en género y número."), w("perro","sustantivo","común, concreto","Nombra un ser vivo."), w("negro","adjetivo","calificativo","Expresa una cualidad del sustantivo «perro»."), w("corre","verbo","forma personal (presente)","Expresa una acción y se conjuga: él corre."), w("rápidamente","adverbio","de modo","Indica cómo corre; los adverbios en -mente suelen ser de modo."), p(".")] },
    { id: "p2", tokens: [w("María","sustantivo","propio","Nombre propio de persona; va con mayúscula."), w("y","conjuncion","coordinante copulativa","Une dos elementos del mismo nivel: «María» y «yo»."), w("yo","pronombre","personal tónico","Sustituye al hablante (1.ª persona singular)."), w("vivimos","verbo","forma personal","Expresa un estado/acción conjugado en 1.ª persona plural."), w("en","preposicion","","Introduce el lugar: «en Lima»."), w("Lima","sustantivo","propio","Nombre propio de lugar."), p(".")] },
    { id: "p3", tokens: [p("¡"), w("Ay","interjeccion","propia","Expresa dolor de forma espontánea; equivale a un enunciado completo."), p("!"), w("Me","pronombre","personal átono","Se refiere al hablante y va unido al verbo sin acento propio."), w("duele","verbo","forma personal","Verbo «doler» conjugado en 3.ª persona."), w("la","determinante","artículo determinado","Acompaña a «cabeza»."), w("cabeza","sustantivo","común","Nombra una parte del cuerpo."), p(".")] },
    { id: "p4", tokens: [w("Los","determinante","artículo determinado","Acompaña a «niños», masculino plural."), w("niños","sustantivo","común","Nombra personas."), w("juegan","verbo","forma personal","Expresa la acción de jugar."), AL("al"), w("fútbol","sustantivo","común","Nombra un deporte."), p(".")] },
    { id: "p5", tokens: [w("Mi","determinante","posesivo","Indica a quién pertenece: la hermana del hablante. Acompaña al sustantivo."), w("hermana","sustantivo","común","Nombra a una persona."), w("compró","verbo","forma personal (pretérito)","Acción pasada del verbo «comprar»."), w("unas","determinante","artículo indeterminado","Presenta un sustantivo no identificado: «unas flores»."), w("flores","sustantivo","común","Nombra un objeto concreto."), w("bonitas","adjetivo","calificativo","Cualidad de «flores»; concuerda en femenino plural."), p(".")] },
    { id: "p6", tokens: [w("Nosotros","pronombre","personal","1.ª persona plural; sustituye a un grupo que incluye al hablante."), w("leemos","verbo","forma personal","Acción de leer, 1.ª persona plural."), w("con","preposicion","","Introduce la compañía o el instrumento."), w("Luis","sustantivo","propio","Nombre propio de persona."), w("hoy","adverbio","de tiempo","Indica cuándo; es invariable."), p(".")] },
  ],
  intermedio: [
    { id: "i1", tokens: [w("Aquel","determinante","demostrativo","Señala distancia y acompaña a «libro»."), w("libro","sustantivo","común","Nombra un objeto."), AL("del"), w("estante","sustantivo","común","Nombra un mueble."), w("es","verbo","copulativo","«Ser» une el sujeto con su atributo; sigue siendo un verbo."), w("muy","adverbio","de cantidad","Intensifica al adjetivo «interesante»."), w("interesante","adjetivo","calificativo","Cualidad del libro. Su función aquí es atributo, pero su categoría es adjetivo."), p(".")] },
    { id: "i2", tokens: [w("Ellos","pronombre","personal","3.ª persona plural."), w("no","adverbio","de negación","Niega la acción del verbo."), w("vinieron","verbo","forma personal","Verbo «venir» en pretérito."), w("porque","conjuncion","subordinante causal","Introduce la causa: «porque llovía»."), w("llovía","verbo","forma personal (impersonal)","Verbo de fenómeno meteorológico, sin sujeto."), w("mucho","adverbio","de cantidad","Modifica al verbo «llovía»; no acompaña a un sustantivo, por eso no es determinante."), p(".")] },
    { id: "i3", tokens: [w("Tengo","verbo","forma personal","1.ª persona del verbo «tener»."), w("tres","determinante","numeral cardinal","Cuantifica a «gatos»."), w("gatos","sustantivo","común","Nombra animales."), p(","), w("pero","conjuncion","coordinante adversativa","Opone dos ideas."), w("ninguno","pronombre","indefinido","Aparece solo, sin sustantivo: sustituye a «ningún gato»."), w("es","verbo","copulativo","Une sujeto y atributo."), w("blanco","adjetivo","calificativo","Expresa el color."), p(".")] },
    { id: "i4", tokens: [w("Siempre","adverbio","de tiempo","Indica frecuencia/tiempo."), w("caminamos","verbo","forma personal","1.ª persona plural."), w("hacia","preposicion","","Indica dirección."), w("el","determinante","artículo determinado","Acompaña a «parque». Sin tilde es artículo; «él» con tilde sería pronombre."), w("parque","sustantivo","común","Nombra un lugar."), w("cercano","adjetivo","calificativo","Cualidad del parque."), p(".")] },
    { id: "i5", tokens: [p("¿"), w("Quién","pronombre","interrogativo","Pregunta por una persona; lleva tilde."), w("te","pronombre","personal átono","Se refiere al oyente."), w("regaló","verbo","forma personal","Pretérito de «regalar»."), w("ese","determinante","demostrativo","Acompaña a «reloj»."), w("reloj","sustantivo","común","Nombra un objeto."), p("?")] },
    { id: "i6", tokens: [w("Algunos","determinante","indefinido","Acompaña a «alumnos» indicando cantidad imprecisa."), w("alumnos","sustantivo","común","Nombra personas."), w("estudian","verbo","forma personal","Acción conjugada en 3.ª plural."), w("sin","preposicion","","Indica carencia."), w("descanso","sustantivo","común, abstracto","Nombra una acción o estado como concepto."), p(",")
      , w("aunque","conjuncion","subordinante concesiva","Introduce un obstáculo que no impide la acción."), w("están","verbo","forma personal","Verbo «estar»."), w("cansados","adjetivo","calificativo (participio adjetival)","Expresa el estado de los alumnos."), p(".")] },
  ],
  avanzado: [
    { id: "a1", tokens: [w("El","determinante","artículo determinado","Acompaña a «bajo», que aquí es sustantivo."), w("bajo","sustantivo","común","Con artículo, «bajo» nombra un instrumento o al músico: es sustantivo."), w("de","preposicion","","Introduce un complemento del nombre."), w("la","determinante","artículo determinado","Acompaña a «banda»."), w("banda","sustantivo","común colectivo","Nombra un grupo."), w("toca","verbo","forma personal","Verbo «tocar»."), w("bajo","preposicion","","Aquí significa «debajo de» e introduce «el puente»: es preposición."), w("el","determinante","artículo determinado","Acompaña a «puente»."), w("puente","sustantivo","común","Nombra una construcción."), p(".")] },
    { id: "a2", tokens: [w("Habla","verbo","forma personal","Verbo «hablar» conjugado."), w("claro","adverbio","adjetivo adverbializado","Modifica al verbo (= claramente) y no concuerda: es adverbio."), w("y","conjuncion","coordinante copulativa","Coordina los dos adverbios."), w("bajo","adverbio","adjetivo adverbializado","Modifica al verbo (= en voz baja); es invariable aquí."), p(".")] },
    { id: "a3", tokens: [w("Ese","pronombre","demostrativo","No acompaña a ningún sustantivo, ocupa su lugar: es pronombre."), w("es","verbo","copulativo","Verbo «ser»."), w("el","determinante","artículo determinado","Acompaña al posesivo."), w("mío","pronombre","posesivo","Sustituye a un sustantivo sobreentendido (el libro mío). En la gramática académica se analiza también como posesivo con núcleo elíptico."), p(".")] },
    { id: "a4", tokens: [w("Que","conjuncion","subordinante completiva","Introduce una oración que funciona como sujeto; no tiene antecedente."), w("vengas","verbo","forma personal (subjuntivo)","Verbo «venir» en subjuntivo."), w("pronto","adverbio","de tiempo","Indica cuándo."), w("es","verbo","copulativo","Verbo «ser»."), w("lo","determinante","artículo neutro","«Lo» delante de «que» relativo es artículo neutro, no pronombre átono."), w("que","pronombre","relativo","Tiene antecedente («lo») y cumple función dentro de su oración (CD de «quiero»)."), w("quiero","verbo","forma personal","Verbo «querer»."), p(".")] },
    { id: "a5", tokens: [w("Comer","verbo","forma no personal (infinitivo)","Es un verbo aunque funcione como sujeto; la función no cambia la categoría."), w("bien","adverbio","de modo","Modifica al infinitivo «comer»."), w("mejora","verbo","forma personal","Verbo «mejorar»."), w("la","determinante","artículo determinado","Acompaña a «salud»."), w("salud","sustantivo","común, abstracto","Nombra un estado."), p(".")] },
    { id: "a6", tokens: [w("Mucha","determinante","indefinido (cuantificador)","Acompaña a «gente» y concuerda con él: es determinante."), w("gente","sustantivo","común colectivo","Nombra un conjunto de personas en singular."), w("come","verbo","forma personal","Verbo «comer»."), w("mucho","adverbio","de cantidad","Modifica al verbo y no concuerda con ningún sustantivo: es adverbio."), p(".")] },
    { id: "a7", tokens: [p("¡"), w("Bravo","interjeccion","impropia (derivada de adjetivo)","Usada como exclamación de aprobación, funciona como interjección."), p("!"), w("Él","pronombre","personal tónico","Con tilde es pronombre; sin tilde sería artículo."), w("cantó","verbo","forma personal","Pretérito de «cantar»."), w("como","adverbio","relativo de modo / comparativo","Introduce la comparación de modo con «nadie»."), w("nadie","pronombre","indefinido","Sustituye a «ninguna persona»."), p(".")] },
  ],
};

/* ---------- Juego 2: quiz ---------- */
export type QuizQ = { id: string; q: string; options: string[]; answer: number; exp: string };
const q = (id: string, qq: string, options: string[], answer: number, exp: string): QuizQ => ({ id, q: qq, options, answer, exp });

export const QUIZ: Record<Level, QuizQ[]> = {
  principiante: [
    q("qp1","En «La mesa es grande», ¿qué categoría tiene «mesa»?",["Sustantivo","Adjetivo","Verbo","Adverbio"],0,"«Mesa» nombra un objeto y lleva determinante («la»): es un sustantivo común."),
    q("qp2","¿Qué es un verbo en gramática?",["Palabra que expresa acción, estado o proceso y se conjuga en persona, número, tiempo y modo","Cada línea de un poema","Palabra que califica a un sustantivo","Palabra invariable que une oraciones"],0,"El verbo es una categoría gramatical que se conjuga. No confundir con «verso», que es cada línea de un poema."),
    q("qp3","¿Cuál de estas palabras es un adjetivo?",["alto","correr","ayer","con"],0,"«Alto» expresa una cualidad y concuerda con el sustantivo (alto, alta, altos). «Correr» es verbo, «ayer» adverbio y «con» preposición."),
    q("qp4","¿Qué categoría tiene «y» en «pan y leche»?",["Conjunción","Preposición","Interjección","Pronombre"],0,"«Y» es una conjunción coordinante copulativa: une elementos del mismo nivel."),
    q("qp5","En «¡Hola!», la palabra «hola» es…",["Interjección","Sustantivo","Verbo","Adverbio"],0,"Las interjecciones expresan emociones o saludos y forman por sí solas un enunciado."),
    q("qp6","¿Cuál es una preposición?",["desde","dulce","dormir","deprisa"],0,"«Desde» relaciona palabras indicando origen. «Dulce» es adjetivo, «dormir» verbo y «deprisa» adverbio."),
    q("qp7","En «Ella canta», ¿qué es «ella»?",["Pronombre personal","Determinante","Sustantivo propio","Adjetivo"],0,"«Ella» sustituye a un nombre de persona (3.ª persona singular): es pronombre personal."),
    q("qp8","En «los árboles», ¿qué es «los»?",["Determinante (artículo)","Pronombre","Adjetivo","Preposición"],0,"«Los» acompaña al sustantivo «árboles» y concuerda con él: es artículo determinado."),
    q("qp9","¿Qué categoría tiene «lentamente»?",["Adverbio de modo","Adjetivo","Verbo","Sustantivo"],0,"Los adverbios en -mente son invariables y suelen indicar modo."),
  ],
  intermedio: [
    q("qi1","¿Qué tipo de determinante es «aquellas» en «aquellas casas»?",["Demostrativo","Posesivo","Numeral","Indefinido"],0,"Los demostrativos (este, ese, aquel) señalan distancia respecto al hablante."),
    q("qi2","En «Vengo del mercado», «del» es…",["Contracción de la preposición «de» y el artículo «el»","Un pronombre","Un adverbio de lugar","Una conjunción"],0,"«Del» = de + el. Las únicas contracciones obligatorias del español son «al» y «del»."),
    q("qi3","¿Cuál es la diferencia entre categoría gramatical y función sintáctica?",["La categoría es la clase de palabra; la función es el papel que cumple en la oración","Son lo mismo con distinto nombre","La función solo existe en los verbos","La categoría depende de la posición en la oración"],0,"Ej.: «niño» es sustantivo (categoría) y puede ser sujeto o complemento (función)."),
    q("qi4","En «El niño come manzanas», ¿qué función cumple «el niño»?",["Sujeto","Adjetivo","Verbo","Determinante"],0,"«Sujeto» es una función. Adjetivo, verbo y determinante son categorías, no funciones."),
    q("qi5","¿Qué tipo de adverbio es «quizás»?",["De duda","De negación","De lugar","De cantidad"],0,"«Quizás», «tal vez» y «acaso» expresan duda."),
    q("qi6","«Pero» es una conjunción…",["Coordinante adversativa","Subordinante causal","Coordinante copulativa","Subordinante condicional"],0,"«Pero» contrapone dos ideas: «Es caro, pero bueno»."),
    q("qi7","En «Alguien llamó», ¿qué es «alguien»?",["Pronombre indefinido","Determinante indefinido","Sustantivo","Adverbio"],0,"«Alguien» nunca acompaña a un sustantivo; lo sustituye de forma imprecisa."),
    q("qi8","En «Tengo dos hermanos», «dos» es…",["Determinante numeral cardinal","Adjetivo calificativo","Pronombre","Adverbio de cantidad"],0,"Acompaña al sustantivo indicando cantidad exacta."),
    q("qi9","En «Es una casa grande», «es» pertenece a la categoría…",["Verbo (copulativo)","Conjunción","Pronombre","Determinante"],0,"«Ser» y «estar» son verbos copulativos: unen sujeto y atributo, pero siguen siendo verbos."),
  ],
  avanzado: [
    q("qa1","En «Habla claro», «claro» es…",["Adverbio (adjetivo adverbializado)","Adjetivo calificativo","Sustantivo","Interjección"],0,"Modifica al verbo y no concuerda con ningún sustantivo, por eso funciona como adverbio (= claramente)."),
    q("qa2","En «Camina bajo la lluvia», «bajo» es…",["Preposición","Adjetivo","Adverbio","Sustantivo"],0,"Equivale a «debajo de» e introduce un grupo nominal: es preposición."),
    q("qa3","En «Este es mío», ¿qué es «este»?",["Pronombre demostrativo","Determinante demostrativo","Artículo","Adverbio"],0,"No acompaña a un sustantivo, lo sustituye. «Este libro» sí sería determinante."),
    q("qa4","En «Dijo que vendría», «que» es…",["Conjunción subordinante completiva","Pronombre relativo","Pronombre interrogativo","Adverbio"],0,"No tiene antecedente ni función dentro de la subordinada; solo la introduce."),
    q("qa5","En «El libro que leí era largo», «que» es…",["Pronombre relativo","Conjunción completiva","Determinante","Preposición"],0,"Tiene antecedente («libro») y funciona como CD de «leí»."),
    q("qa6","En «Me gusta el saber», «saber» es…",["Sustantivo (infinitivo sustantivado)","Verbo conjugado","Adjetivo","Adverbio"],0,"El artículo «el» lo convierte en sustantivo; incluso admite plural: «los saberes»."),
    q("qa7","En «Trabaja mucho», «mucho» es…",["Adverbio de cantidad","Determinante indefinido","Pronombre","Adjetivo"],0,"Modifica al verbo. En «mucho trabajo» sería determinante porque acompaña a un sustantivo."),
    q("qa8","En «Lo bueno dura poco», «lo» es…",["Artículo neutro (determinante)","Pronombre personal átono","Sustantivo","Preposición"],0,"«Lo» delante de un adjetivo lo sustantiva; es artículo neutro. «Lo vi» sí sería pronombre."),
    q("qa9","¿Qué afirmación es correcta?",["Un adjetivo puede funcionar como atributo sin dejar de ser adjetivo","Si una palabra es sujeto, deja de ser sustantivo","Las preposiciones varían en género y número","Las interjecciones siempre son verbos"],0,"Categoría y función son niveles distintos: la función no cambia la clase de palabra."),
    q("qa10","En «¡Cuidado!», «cuidado» es…",["Interjección impropia","Verbo","Adjetivo","Conjunción"],0,"Es un sustantivo (o participio) usado como exclamación: interjección impropia o derivada."),
  ],
};

/* ---------- Juego 3: construir ---------- */
export type Tile = { w: string; c: Cat };
export type BuildQ = { id: string; pattern: Cat[]; hint: string; tiles: Tile[]; solutions: string[]; exp: string };
const tl = (s: string): Tile[] => s.split("|").map((x) => { const [ww, c] = x.split(":"); return { w: ww, c: c as Cat }; });

export const BUILD: Record<Level, BuildQ[]> = {
  principiante: [
    { id: "bp1", pattern: ["determinante","sustantivo","verbo"], hint: "Un animal que realiza una acción.", tiles: tl("El:determinante|gato:sustantivo|duerme:verbo|azul:adjetivo|La:determinante|ayer:adverbio"), solutions: ["El gato duerme"], exp: "«El» (det.) concuerda con «gato» (sust.) y «duerme» (verbo) expresa la acción." },
    { id: "bp2", pattern: ["determinante","sustantivo","adjetivo","verbo"], hint: "Una persona con una cualidad hace algo.", tiles: tl("La:determinante|niña:sustantivo|alegre:adjetivo|canta:verbo|mesa:sustantivo|con:preposicion"), solutions: ["La niña alegre canta"], exp: "El adjetivo «alegre» va tras el sustantivo y antes del verbo, según el patrón." },
    { id: "bp3", pattern: ["pronombre","verbo","adverbio"], hint: "Nosotros hacemos algo de cierta manera.", tiles: tl("Nosotros:pronombre|cantamos:verbo|bien:adverbio|canta:verbo|bueno:adjetivo|y:conjuncion"), solutions: ["Nosotros cantamos bien"], exp: "«Cantamos» concuerda con «nosotros»; «bien» es adverbio de modo (no «bueno», que es adjetivo)." },
    { id: "bp4", pattern: ["sustantivo","verbo","preposicion","sustantivo"], hint: "Alguien viaja a una ciudad.", tiles: tl("Ana:sustantivo|viaja:verbo|a:preposicion|Madrid:sustantivo|feliz:adjetivo|el:determinante"), solutions: ["Ana viaja a Madrid"], exp: "Sustantivo propio + verbo + preposición «a» (dirección) + sustantivo propio." },
    { id: "bp5", pattern: ["determinante","sustantivo","verbo","adverbio"], hint: "Unos pájaros hacen algo en un momento.", tiles: tl("Los:determinante|pájaros:sustantivo|vuelan:verbo|hoy:adverbio|vuela:verbo|altos:adjetivo"), solutions: ["Los pájaros vuelan hoy"], exp: "«Vuelan» (plural) concuerda con «pájaros»; «vuela» rompería la concordancia." },
  ],
  intermedio: [
    { id: "bi1", pattern: ["determinante","sustantivo","verbo","adverbio","adjetivo"], hint: "Describe la temperatura de una bebida.", tiles: tl("El:determinante|café:sustantivo|está:verbo|muy:adverbio|caliente:adjetivo|rápidamente:adverbio|fríos:adjetivo"), solutions: ["El café está muy caliente"], exp: "«Muy» (adv. de cantidad) intensifica al adjetivo «caliente»; «fríos» no concuerda en número." },
    { id: "bi2", pattern: ["pronombre","verbo","conjuncion","pronombre","verbo"], hint: "Dos personas hacen dos cosas a la vez.", tiles: tl("Yo:pronombre|canto:verbo|y:conjuncion|tú:pronombre|bailas:verbo|con:preposicion|bailo:verbo"), solutions: ["Yo canto y tú bailas","Tú bailas y yo canto"], exp: "La conjunción copulativa «y» coordina dos oraciones; cada verbo concuerda con su pronombre." },
    { id: "bi3", pattern: ["determinante","sustantivo","verbo","contraccion","sustantivo"], hint: "Un transporte se dirige hacia un punto cardinal.", tiles: tl("Este:determinante|tren:sustantivo|va:verbo|al:contraccion|norte:sustantivo|del:contraccion|rojo:adjetivo"), solutions: ["Este tren va al norte"], exp: "«Ir» pide «a» (dirección): a + el = «al». «Del» no tiene sentido con «va» aquí." },
    { id: "bi4", pattern: ["adverbio","pronombre","verbo","determinante","sustantivo"], hint: "Algo que vimos en el pasado.", tiles: tl("Ayer:adverbio|nosotros:pronombre|vimos:verbo|una:determinante|película:sustantivo|mañana:adverbio|un:determinante"), solutions: ["Ayer nosotros vimos una película"], exp: "«Ayer» concuerda con el pretérito «vimos»; «mañana» chocaría con el tiempo pasado, y «un» no concuerda con «película»." },
    { id: "bi5", pattern: ["determinante","sustantivo","verbo","conjuncion","verbo"], hint: "Mi perro hace dos acciones seguidas.", tiles: tl("Mi:determinante|perro:sustantivo|come:verbo|y:conjuncion|duerme:verbo|sobre:preposicion|comen:verbo"), solutions: ["Mi perro come y duerme","Mi perro duerme y come"], exp: "Dos verbos en singular coordinados por «y», concordando con «perro»." },
  ],
  avanzado: [
    { id: "ba1", pattern: ["interjeccion","pronombre","verbo","adverbio"], hint: "Una queja: alguien no llegó a tiempo.", tiles: tl("¡Ay!:interjeccion|Ella:pronombre|llegó:verbo|tarde:adverbio|llegaron:verbo|tardía:adjetivo"), solutions: ["¡Ay! Ella llegó tarde"], exp: "La interjección forma un enunciado propio; «tarde» es adverbio de tiempo (no el adjetivo «tardía»)." },
    { id: "ba2", pattern: ["determinante","sustantivo","pronombre","verbo","verbo","adjetivo"], hint: "Opinión sobre un libro que leí.", tiles: tl("El:determinante|libro:sustantivo|que:pronombre|leí:verbo|era:verbo|largo:adjetivo|larga:adjetivo|cual:pronombre"), solutions: ["El libro que leí era largo"], exp: "«Que» es pronombre relativo con antecedente «libro»; «largo» concuerda en masculino." },
    { id: "ba3", pattern: ["verbo","determinante","sustantivo","verbo","adjetivo"], hint: "Una actividad como sujeto de la oración.", tiles: tl("Leer:verbo|un:determinante|libro:sustantivo|es:verbo|útil:adjetivo|leyó:verbo|rápidamente:adverbio"), solutions: ["Leer un libro es útil"], exp: "El infinitivo «leer» funciona como sujeto, pero su categoría sigue siendo verbo." },
    { id: "ba4", pattern: ["conjuncion","pronombre","verbo","pronombre","verbo"], hint: "Una condición y su consecuencia.", tiles: tl("Si:conjuncion|tú:pronombre|vienes:verbo|yo:pronombre|voy:verbo|para:preposicion|vas:verbo"), solutions: ["Si tú vienes yo voy","Si yo voy tú vienes"], exp: "«Si» es conjunción subordinante condicional; cada verbo concuerda con su pronombre." },
    { id: "ba5", pattern: ["determinante","sustantivo","preposicion","determinante","sustantivo","verbo","adverbio"], hint: "El músico toca en un lugar concreto… ¿cómo?", tiles: tl("El:determinante|bajo:sustantivo|de:preposicion|la:determinante|banda:sustantivo|suena:verbo|bien:adverbio|bueno:adjetivo|bajo:preposicion"), solutions: ["El bajo de la banda suena bien"], exp: "Aquí «bajo» es sustantivo (con artículo); la otra ficha «bajo» es preposición y no encaja en el patrón." },
  ],
};

/* ---------- Utilidades ---------- */
export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
export const norm = (s: string) => s.toLowerCase().replace(/[¡!¿?.,;:]/g, "").replace(/\s+/g, " ").trim();

export type BuildResult = { ok: boolean; patternOk: boolean; badPos: number[]; message: string };
export function checkBuild(item: BuildQ, chosen: Tile[]): BuildResult {
  const badPos: number[] = [];
  item.pattern.forEach((c, i) => { if (!chosen[i] || chosen[i].c !== c) badPos.push(i); });
  const patternOk = chosen.length === item.pattern.length && badPos.length === 0;
  const sentence = norm(chosen.map((t) => t.w).join(" "));
  const ok = patternOk && item.solutions.some((s) => norm(s) === sentence);
  let message = "¡Correcto! La oración cumple el patrón y tiene sentido.";
  if (!ok) {
    if (chosen.length !== item.pattern.length) message = `El patrón pide ${item.pattern.length} palabras y usaste ${chosen.length}.`;
    else if (!patternOk) message = `Las posiciones ${badPos.map((i) => i + 1).join(", ")} no corresponden a la categoría pedida.`;
    else message = "Las categorías coinciden, pero el orden o la concordancia no forman una oración natural.";
  }
  return { ok, patternOk, badPos, message };
}

/* ---------- Puntaje e historial ---------- */
export const pointsFor = (streak: number) => 10 + Math.min(streak, 5) * 2;

export type Mistake = { prompt: string; given: string; correct: string; exp: string };
export type HistoryEntry = { date: string; mode: Mode; level: Level; score: number; correct: number; total: number; bestStreak: number; area?: string; topic?: string; subtopic?: string };
const KEY = "desafio-gramatical:historial";
export function loadHistory(): HistoryEntry[] {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}
export function saveHistory(e: HistoryEntry) {
  const h = [e, ...loadHistory()].slice(0, 100);
  localStorage.setItem(KEY, JSON.stringify(h));
}
export function clearHistory() { localStorage.removeItem(KEY); }