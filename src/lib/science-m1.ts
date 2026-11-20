import type {Level,Mode} from "./grammar";
import {AREAS} from "./phuma-catalog";

/** Núcleo original de práctica de Ciencias Naturales.
 * Los ejemplos proceden del mapa de competencias de la guía PRE-U UNAH 2026
 * (páginas impresas 7-9), con las extensiones del catálogo marcadas aparte.
 * NO son reactivos oficiales, ni 2565 unidades conceptualmente independientes.
 */
export const SCIENCE_LEVEL_COUNT:Record<Level,number>={principiante:10,intermedio:15,avanzado:20};
export const SCIENCE_LEVELS:Level[]=["principiante","intermedio","avanzado"];
export const SCIENCE_MODES:Mode[]=["clasificar","quiz","construir"];
export const SCIENCE_TOPICS=AREAS.find(a=>a.id==="naturales")!.topics;
export const SCIENCE_SUBTOPICS=SCIENCE_TOPICS.flatMap(x=>x.subtopics);
export type ScienceFact={concept:string;property:string;scenario:string};
export type ScienceItem={
 id:string;topic:string;subtopic:string;level:Level;mode:Mode;index:number;family:string;
 concept:string;prompt:string;expected:string;explanation:string;formula:string;
 source:"GUIA-PRE-U-UNAH-2026:p7"|"GUIA-PRE-U-UNAH-2026:p8"|"GUIA-PRE-U-UNAH-2026:p9"|"catalogo-practica-complementaria";
 reviewStatus:"editorial-draft";cognitiveStage:1|2|3;operation:string;requiredEvidence:string[];
 oracle:{concept:string;property:string;scenario:string};
 options:string[];answerIndex:number;
 assertions:{text:string;truth:boolean}[];
 steps:{label:string;choices:string[];answerIndex:number}[];
};
const DATA:Record<string,readonly ScienceFact[]>={
"Célula":[
 {concept:"membrana plasmática",property:"regula selectivamente el intercambio con el entorno",scenario:"una célula controla qué sustancias entran y salen"},
 {concept:"núcleo eucariota",property:"contiene el ADN organizado dentro de una envoltura nuclear",scenario:"se examina el compartimento que aloja el material hereditario"},
 {concept:"ribosoma",property:"participa directamente en la síntesis de proteínas",scenario:"se localiza el sitio de ensamblaje de cadenas polipeptídicas"},
 {concept:"mitocondria",property:"realiza etapas de la respiración celular aeróbica y produce ATP",scenario:"una célula requiere energía utilizable para sus funciones"},
 {concept:"cloroplasto",property:"contiene maquinaria fotosintética en células vegetales",scenario:"una célula vegetal capta energía luminosa"},
 {concept:"pared celular vegetal",property:"aporta soporte y protección externa a la membrana",scenario:"la célula vegetal mantiene una estructura rígida"},
 {concept:"citoplasma",property:"contiene el citosol y estructuras internas de la célula",scenario:"se observa el medio interno fuera del núcleo"},
 {concept:"procariota",property:"carece de núcleo delimitado por membrana",scenario:"se observa una bacteria con ADN en una región nucleoide"},
 {concept:"vacuola central vegetal",property:"almacena agua y ayuda a mantener la turgencia",scenario:"una célula vegetal mantiene presión interna por agua"},
 {concept:"retículo endoplasmático rugoso",property:"participa en la síntesis y procesamiento de proteínas de secreción",scenario:"una célula produce proteínas destinadas a exportarse"}
],
"Genética":[
 {concept:"ADN",property:"almacena información hereditaria mediante secuencias de nucleótidos",scenario:"se analiza la molécula que conserva instrucciones de herencia"},
 {concept:"gen",property:"es un segmento de ADN asociado a un producto funcional",scenario:"se estudia una secuencia hereditaria de un cromosoma"},
 {concept:"alelo",property:"es una variante de un gen en un locus",scenario:"se comparan dos versiones de una misma posición genética"},
 {concept:"genotipo",property:"describe la composición alélica de un organismo",scenario:"se registran combinaciones AA, Aa y aa"},
 {concept:"fenotipo",property:"es el conjunto de características observables resultado de genotipo y ambiente",scenario:"se observa una característica expresada por un organismo"},
 {concept:"meiosis",property:"produce células haploides y contribuye a la variabilidad genética",scenario:"se forman gametos con la mitad de los cromosomas"},
 {concept:"mutación",property:"es un cambio en la secuencia del material genético",scenario:"se detecta una sustitución de nucleótidos"},
 {concept:"ARN mensajero",property:"transporta información codificante hacia los ribosomas",scenario:"un transcrito lleva instrucciones para sintetizar proteínas"},
 {concept:"cromosoma",property:"organiza ADN asociado a proteínas",scenario:"se observa material hereditario condensado durante división"},
 {concept:"grupo sanguíneo ABO",property:"se determina por antígenos A y B en los eritrocitos",scenario:"se identifican los antígenos de la superficie de glóbulos rojos"}
],
"Ecología":[
 {concept:"ecosistema",property:"integra seres vivos y factores físicos en interacción",scenario:"se estudian organismos, agua, suelo y luz de un bosque"},
 {concept:"población",property:"reúne individuos de la misma especie en un lugar y tiempo",scenario:"se cuentan venados de una reserva durante un año"},
 {concept:"comunidad",property:"incluye poblaciones de diferentes especies que coexisten",scenario:"se registran aves, árboles y hongos en un área"},
 {concept:"productor primario",property:"incorpora energía a la red alimentaria mediante producción orgánica",scenario:"una planta transforma energía luminosa en materia orgánica"},
 {concept:"consumidor primario",property:"obtiene energía al alimentarse de productores",scenario:"un herbívoro ingiere hojas"},
 {concept:"descomponedor",property:"transforma materia orgánica muerta y recicla nutrientes",scenario:"hongos degradan hojas caídas"},
 {concept:"competencia interespecífica",property:"ocurre entre especies distintas por recursos limitados",scenario:"dos especies utilizan el mismo alimento escaso"},
 {concept:"mutualismo",property:"es una interacción en la que ambas especies obtienen beneficio",scenario:"un polinizador obtiene néctar y la flor recibe polinización"},
 {concept:"biodiversidad",property:"incluye variedad de organismos y niveles biológicos",scenario:"se comparan especies y diversidad genética"},
 {concept:"factor abiótico",property:"es un componente no vivo que afecta a los organismos",scenario:"se mide la disponibilidad de luz y agua"}
],
"Cuerpo humano":[
 {concept:"alvéolos",property:"permiten intercambio de oxígeno y dióxido de carbono con capilares",scenario:"el oxígeno pasa del aire hacia la sangre"},
 {concept:"intestino delgado",property:"absorbe la mayor parte de nutrientes digeridos",scenario:"los nutrientes del alimento cruzan al medio interno"},
 {concept:"corazón",property:"bombea sangre por los circuitos circulatorios",scenario:"la sangre circula gracias a contracciones rítmicas"},
 {concept:"glóbulos rojos",property:"transportan gran parte del oxígeno mediante hemoglobina",scenario:"la sangre lleva oxígeno a los tejidos"},
 {concept:"riñones",property:"filtran sangre y regulan agua, sales y desechos",scenario:"se forma orina para eliminar sustancias"},
 {concept:"neuronas",property:"transmiten señales eléctricas y químicas del sistema nervioso",scenario:"se coordina una respuesta rápida a un estímulo"},
 {concept:"huesos",property:"dan soporte corporal y protegen órganos",scenario:"el cráneo protege el encéfalo"},
 {concept:"músculo esquelético",property:"permite movimiento voluntario por contracción",scenario:"se flexiona voluntariamente un brazo"},
 {concept:"estómago",property:"mezcla alimentos y participa en digestión química inicial de proteínas",scenario:"un alimento se combina con jugo gástrico"},
 {concept:"arterias",property:"conducen sangre desde el corazón hacia los tejidos",scenario:"la sangre sale de los ventrículos por vasos grandes"}
],
"Biomoléculas":[
 {concept:"carbohidratos",property:"cumplen funciones energéticas y estructurales",scenario:"se metaboliza glucosa para obtener energía"},
 {concept:"lípidos",property:"forman membranas y sirven de reserva energética",scenario:"los fosfolípidos integran una bicapa celular"},
 {concept:"proteínas",property:"pueden desempeñar funciones estructurales, de transporte y catalíticas",scenario:"una molécula funciona como transportador de oxígeno"},
 {concept:"enzimas",property:"aceleran reacciones químicas disminuyendo la energía de activación",scenario:"una reacción celular ocurre más rápido con un catalizador"},
 {concept:"ADN",property:"contiene información genética en secuencias de nucleótidos",scenario:"se conserva información hereditaria en una doble hélice"},
 {concept:"ARN",property:"participa en la expresión de información genética",scenario:"un transcrito interviene en síntesis proteica"},
 {concept:"agua",property:"es disolvente y medio de reacciones biológicas",scenario:"solutos se transportan en el citoplasma acuoso"},
 {concept:"ATP",property:"transfiere energía en numerosos procesos celulares",scenario:"se utiliza energía química inmediata para transporte activo"},
 {concept:"aminoácidos",property:"son unidades constituyentes de las proteínas",scenario:"se ensamblan cadenas peptídicas"},
 {concept:"nucleótidos",property:"son unidades de los ácidos nucleicos",scenario:"se construye una cadena de ADN mediante monómeros"}
],
"División celular":[
 {concept:"mitosis",property:"produce normalmente dos células hijas con información cromosómica equivalente",scenario:"una célula somática se divide para crecimiento"},
 {concept:"meiosis",property:"reduce la dotación cromosómica y forma células haploides",scenario:"se originan gametos en un organismo diploide"},
 {concept:"interfase",property:"incluye crecimiento y replicación del ADN antes de división",scenario:"la célula duplica su material genético"},
 {concept:"profase",property:"inicia la condensación visible de cromosomas",scenario:"los cromosomas comienzan a compactarse"},
 {concept:"metafase",property:"alinea cromosomas en el plano ecuatorial",scenario:"los cromosomas se organizan en el centro del huso"},
 {concept:"anafase mitótica",property:"separa cromátidas hermanas hacia polos opuestos",scenario:"cromátidas se desplazan por el huso"},
 {concept:"telofase",property:"reconstituye envolturas nucleares alrededor de grupos cromosómicos",scenario:"se forman dos núcleos al concluir la separación"},
 {concept:"citocinesis",property:"divide el citoplasma en células hijas",scenario:"una célula se separa físicamente en dos"},
 {concept:"entrecruzamiento meiótico",property:"intercambia segmentos entre cromátidas no hermanas de homólogos",scenario:"se recombina material genético durante profase I"},
 {concept:"separación de homólogos",property:"ocurre durante anafase I de la meiosis",scenario:"los cromosomas homólogos migran a polos distintos"}
],
"Fotosíntesis":[
 {concept:"fase luminosa",property:"transforma energía luminosa en ATP y NADPH y libera oxígeno",scenario:"la luz impulsa reacciones de tilacoides"},
 {concept:"ciclo de Calvin",property:"fija dióxido de carbono en compuestos orgánicos",scenario:"se incorpora carbono inorgánico a moléculas orgánicas"},
 {concept:"clorofila",property:"absorbe energía luminosa para iniciar reacciones fotosintéticas",scenario:"un pigmento capta luz en los fotosistemas"},
 {concept:"tilacoides",property:"albergan componentes de las reacciones luminosas",scenario:"se observa el sistema de membranas internas del cloroplasto"},
 {concept:"estroma",property:"es el compartimento donde se desarrolla el ciclo de Calvin",scenario:"se fijan moléculas de CO₂ fuera de los tilacoides"},
 {concept:"fotólisis del agua",property:"contribuye a liberar oxígeno y electrones en fotosistema II",scenario:"se forma oxígeno molecular al usar agua"},
 {concept:"ATP fotosintético",property:"aporta energía al ciclo de Calvin",scenario:"se consume energía para sintetizar compuestos orgánicos"},
 {concept:"NADPH",property:"aporta poder reductor a reacciones del ciclo de Calvin",scenario:"se transfieren electrones de alta energía a intermediarios"},
 {concept:"estomas",property:"regulan intercambio gaseoso y pérdida de agua en hojas",scenario:"entra dióxido de carbono por poros foliares"},
 {concept:"fotosistema II",property:"inicia transporte de electrones y oxidación del agua en fotosíntesis oxigénica",scenario:"se excitan electrones y se libera oxígeno"}
],
"Método científico":[
 {concept:"pregunta investigable",property:"plantea una relación que puede contrastarse con evidencia",scenario:"se formula qué factor altera la germinación"},
 {concept:"hipótesis",property:"propone una explicación que admite pruebas y posible refutación",scenario:"se anticipa el efecto de la luz en el crecimiento"},
 {concept:"variable independiente",property:"es el factor que se modifica deliberadamente",scenario:"el experimento cambia la cantidad de iluminación"},
 {concept:"variable dependiente",property:"es la respuesta que se mide",scenario:"se registra la altura de las plantas"},
 {concept:"grupo de control",property:"proporciona una referencia para comparar tratamientos",scenario:"un grupo de plantas mantiene condiciones habituales"},
 {concept:"repetición experimental",property:"permite evaluar la consistencia de los resultados",scenario:"se repiten mediciones con múltiples plantas"},
 {concept:"observación",property:"registra características de un fenómeno mediante métodos definidos",scenario:"se anotan cambios visibles sin alterar el fenómeno"},
 {concept:"conclusión",property:"relaciona hallazgos con hipótesis y limitaciones",scenario:"se compara evidencia recolectada con la predicción"},
 {concept:"sesgo de medición",property:"puede distorsionar sistemáticamente los datos observados",scenario:"un instrumento sin calibrar marca valores desviados"},
 {concept:"variable controlada",property:"es una condición que se mantiene constante entre grupos",scenario:"se usa igual tipo de suelo para comparar niveles de luz"}
],
"Clasificación biológica":[
 {concept:"especie",property:"es una unidad taxonómica que agrupa organismos estrechamente relacionados",scenario:"se identifica el taxón de un organismo"},
 {concept:"género",property:"reúne especies relacionadas",scenario:"dos especies comparten el primer nombre científico"},
 {concept:"familia",property:"agrupa géneros relacionados",scenario:"varios géneros pertenecen al mismo taxón superior"},
 {concept:"orden",property:"agrupa familias relacionadas",scenario:"diferentes familias se reúnen en una categoría mayor"},
 {concept:"clase",property:"agrupa órdenes relacionados",scenario:"se ordenan grandes grupos de vertebrados"},
 {concept:"filo",property:"reúne clases según planes corporales y parentesco evolutivo",scenario:"se compara la organización de grupos animales"},
 {concept:"reino",property:"es una categoría taxonómica amplia por debajo del dominio",scenario:"se estudia un grupo grande como el de animales"},
 {concept:"dominio",property:"es una categoría taxonómica muy amplia que incluye Bacteria, Archaea y Eukarya",scenario:"se separan grandes linajes celulares"},
 {concept:"nomenclatura binomial",property:"usa dos nombres para designar una especie",scenario:"se escribe un nombre científico con género y epíteto"},
 {concept:"filogenia",property:"reconstruye relaciones de parentesco evolutivo",scenario:"se compara ADN para inferir ancestros comunes"}
],
"Materia":[
 {concept:"átomo",property:"es la unidad de un elemento que conserva su identidad química",scenario:"se identifica una unidad de oxígeno elemental"},
 {concept:"elemento químico",property:"consiste en átomos con el mismo número de protones",scenario:"se agrupan átomos con número atómico igual"},
 {concept:"molécula",property:"es un conjunto definido de átomos enlazados",scenario:"se observa una entidad individual de agua H₂O"},
 {concept:"compuesto",property:"contiene dos o más elementos unidos químicamente en proporciones definidas",scenario:"se forma agua a partir de hidrógeno y oxígeno"},
 {concept:"mezcla homogénea",property:"tiene composición uniforme a escala macroscópica",scenario:"una sal se disuelve uniformemente en agua"},
 {concept:"mezcla heterogénea",property:"presenta fases o componentes distinguibles",scenario:"se observan dos capas de agua y aceite"},
 {concept:"cambio físico",property:"no transforma la identidad química de una sustancia",scenario:"se derrite un cubo de hielo"},
 {concept:"cambio químico",property:"produce sustancias de composición química distinta",scenario:"el hierro se oxida"},
 {concept:"densidad",property:"es el cociente entre masa y volumen",scenario:"se comparan masas de volúmenes iguales"},
 {concept:"conservación de masa",property:"en un sistema cerrado la masa total se mantiene durante una reacción",scenario:"se pesa un recipiente sellado antes y después de reaccionar"}
],
"Reacciones":[
 {concept:"reactivos",property:"son sustancias presentes antes de la transformación química",scenario:"se identifican sustancias a la izquierda de una ecuación"},
 {concept:"productos",property:"son sustancias obtenidas durante la transformación",scenario:"se analizan fórmulas a la derecha de una ecuación"},
 {concept:"coeficiente estequiométrico",property:"indica proporciones de partículas o moles en una ecuación balanceada",scenario:"un número precede a una fórmula química"},
 {concept:"balanceo",property:"iguala el número de átomos de cada elemento a ambos lados",scenario:"se ajusta una ecuación conservando átomos"},
 {concept:"oxidación",property:"implica pérdida de electrones de una especie",scenario:"un átomo cede electrones en una reacción redox"},
 {concept:"reducción",property:"implica ganancia de electrones de una especie",scenario:"un ion capta electrones"},
 {concept:"ácido",property:"puede donar protones según la teoría de Brønsted-Lowry",scenario:"una especie entrega H⁺ en una reacción"},
 {concept:"base",property:"puede aceptar protones según la teoría de Brønsted-Lowry",scenario:"una especie recibe H⁺"},
 {concept:"precipitación",property:"forma un sólido poco soluble a partir de especies disueltas",scenario:"aparece sólido al mezclar dos soluciones"},
 {concept:"combustión completa",property:"oxidación de combustible que en compuestos orgánicos suele producir CO₂ y agua",scenario:"un hidrocarburo arde con suficiente oxígeno"}
],
"Tabla periódica":[
 {concept:"número atómico",property:"equivale al número de protones del núcleo",scenario:"se identifica un elemento por su carga nuclear"},
 {concept:"grupo",property:"es una columna que suele reunir elementos de propiedades químicas semejantes",scenario:"se comparan elementos situados verticalmente"},
 {concept:"período",property:"es una fila horizontal de la tabla periódica",scenario:"se localizan elementos de una misma fila"},
 {concept:"metal alcalino",property:"pertenece al grupo 1, excluyendo el hidrógeno",scenario:"se identifica sodio en su familia"},
 {concept:"halógeno",property:"es un elemento del grupo 17",scenario:"se ubican flúor y cloro en una familia"},
 {concept:"gas noble",property:"pertenece al grupo 18 y suele ser poco reactivo",scenario:"se considera el helio por su baja reactividad"},
 {concept:"electrón de valencia",property:"es un electrón de la capa externa involucrado en enlaces",scenario:"se analizan los electrones que intervienen en la unión"},
 {concept:"isótopo",property:"tiene igual número de protones y diferente número de neutrones",scenario:"dos átomos de carbono tienen masas distintas"},
 {concept:"catión",property:"es un ion con carga positiva por pérdida neta de electrones",scenario:"un átomo pierde un electrón"},
 {concept:"anión",property:"es un ion con carga negativa por ganancia neta de electrones",scenario:"un átomo adquiere un electrón"}
],
"Compuestos inorgánicos":[
 {concept:"óxido",property:"es un compuesto binario del oxígeno con otro elemento",scenario:"se identifica un óxido metálico"},
 {concept:"hidróxido",property:"contiene el grupo hidróxido OH unido a un catión",scenario:"se analiza NaOH en una disolución"},
 {concept:"hidruro",property:"es un compuesto binario que contiene hidrógeno con otro elemento",scenario:"se clasifica un hidruro metálico"},
 {concept:"ácido oxácido",property:"contiene hidrógeno, oxígeno y un elemento central",scenario:"se identifica ácido sulfúrico H₂SO₄"},
 {concept:"ácido hidrácido",property:"es un ácido binario sin oxígeno en su fórmula",scenario:"se identifica HCl en disolución acuosa"},
 {concept:"sal",property:"es un compuesto iónico formado por cationes y aniones",scenario:"se cristaliza cloruro de sodio"},
 {concept:"peróxido",property:"contiene un enlace oxígeno-oxígeno del grupo peróxido",scenario:"se identifica H₂O₂"},
 {concept:"nitrato",property:"es una sal o ion que contiene NO₃⁻",scenario:"se examina un fertilizante con nitrato"},
 {concept:"carbonato",property:"es un compuesto que contiene el ion CO₃²⁻",scenario:"se estudia carbonato de calcio"},
 {concept:"sulfato",property:"contiene el ion SO₄²⁻",scenario:"se identifica una sal con anión sulfato"}
],
"Contaminación y agroquímicos":[
 {concept:"herbicida",property:"se usa para controlar plantas no deseadas",scenario:"se aplica un producto contra malezas"},
 {concept:"insecticida",property:"se usa para controlar plagas de insectos",scenario:"se controla una población de insectos"},
 {concept:"fungicida",property:"se utiliza contra hongos que afectan cultivos",scenario:"se combate una enfermedad fúngica"},
 {concept:"fertilizante",property:"aporta nutrientes para el crecimiento de plantas",scenario:"se añaden nitrógeno o fósforo al suelo"},
 {concept:"eutrofización",property:"ocurre por enriquecimiento excesivo de nutrientes en aguas",scenario:"aparece proliferación de algas por escorrentía"},
 {concept:"bioacumulación",property:"es acumulación de una sustancia en un organismo con el tiempo",scenario:"un contaminante persistente se concentra en un pez"},
 {concept:"escorrentía",property:"transporta sustancias sobre la superficie hacia cuerpos de agua",scenario:"la lluvia arrastra residuos agrícolas al río"},
 {concept:"equipo de protección personal",property:"reduce la exposición durante manejo seguro de sustancias",scenario:"un trabajador usa guantes adecuados y protección ocular"},
 {concept:"dosis",property:"es la cantidad de sustancia a la que se expone un organismo",scenario:"se compara exposición a diferentes cantidades"},
 {concept:"manejo integrado de plagas",property:"combina medidas preventivas, biológicas y químicas según necesidad",scenario:"se monitorean plagas antes de elegir tratamiento"}
],
"Movimiento":[
 {concept:"rapidez media",property:"es distancia recorrida dividida por tiempo transcurrido",scenario:"un corredor recorre una distancia durante un intervalo"},
 {concept:"velocidad media",property:"es desplazamiento dividido por intervalo de tiempo",scenario:"se calcula el cambio de posición por segundo"},
 {concept:"aceleración media",property:"es cambio de velocidad dividido por tiempo",scenario:"un vehículo pasa de menor a mayor velocidad"},
 {concept:"desplazamiento",property:"es diferencia vectorial entre posición final e inicial",scenario:"alguien termina cerca de donde comenzó tras caminar"},
 {concept:"trayectoria",property:"es el camino descrito por un cuerpo al moverse",scenario:"se dibuja el recorrido de una pelota"},
 {concept:"movimiento rectilíneo uniforme",property:"tiene velocidad constante en una trayectoria recta",scenario:"un móvil avanza distancias iguales en tiempos iguales"},
 {concept:"reposo relativo",property:"depende del sistema de referencia elegido",scenario:"una persona sentada está quieta respecto de un autobús"},
 {concept:"posición",property:"describe una ubicación respecto de un sistema de referencia",scenario:"se marca un punto sobre un eje graduado"},
 {concept:"tiempo",property:"es la magnitud que permite comparar duraciones",scenario:"se usa un cronómetro en una carrera"},
 {concept:"distancia recorrida",property:"es la longitud total de la trayectoria",scenario:"se suma todo el camino de ida y vuelta"}
],
"Fuerzas y energía":[
 {concept:"segunda ley de Newton",property:"relaciona fuerza neta, masa y aceleración mediante F=ma",scenario:"se aplica una fuerza neta a un carrito"},
 {concept:"inercia",property:"es la tendencia a conservar el estado de movimiento sin fuerza neta",scenario:"un pasajero continúa moviéndose cuando frena un bus"},
 {concept:"peso",property:"es una fuerza gravitatoria sobre la masa",scenario:"una báscula de resorte mide atracción terrestre"},
 {concept:"fricción",property:"se opone al deslizamiento relativo de superficies en contacto",scenario:"unas ruedas experimentan rozamiento"},
 {concept:"energía cinética",property:"depende de la masa y del cuadrado de la rapidez",scenario:"un objeto en movimiento almacena energía mecánica"},
 {concept:"energía potencial gravitatoria",property:"aumenta con la altura respecto de una referencia",scenario:"se eleva una caja a una repisa"},
 {concept:"trabajo mecánico",property:"es transferencia de energía por una fuerza con componente en el desplazamiento",scenario:"una persona empuja una caja que se desplaza"},
 {concept:"potencia",property:"es trabajo o energía transferida por unidad de tiempo",scenario:"dos máquinas realizan la misma tarea en tiempos distintos"},
 {concept:"conservación de energía",property:"indica que la energía total se transforma sin crearse ni destruirse",scenario:"un péndulo intercambia energía cinética y potencial"},
 {concept:"tercera ley de Newton",property:"establece pares de fuerzas iguales y opuestas en cuerpos distintos",scenario:"dos patinadores se empujan mutuamente"}
],
"Magnitudes y conversiones":[
 {concept:"metro",property:"es la unidad base de longitud del Sistema Internacional",scenario:"se registra la distancia entre dos puntos"},
 {concept:"kilogramo",property:"es la unidad base de masa del Sistema Internacional",scenario:"se mide la masa de un paquete"},
 {concept:"segundo",property:"es la unidad base de tiempo del Sistema Internacional",scenario:"se mide duración con reloj"},
 {concept:"kelvin",property:"es la unidad base de temperatura termodinámica",scenario:"se mide temperatura absoluta"},
 {concept:"amperio",property:"es la unidad base de corriente eléctrica",scenario:"se mide corriente en un circuito"},
 {concept:"newton",property:"es una unidad derivada de fuerza igual a kg·m/s²",scenario:"se cuantifica el empuje sobre un cuerpo"},
 {concept:"joule",property:"es una unidad de energía o trabajo igual a N·m",scenario:"se mide transferencia de energía mecánica"},
 {concept:"watt",property:"es una unidad de potencia igual a joule por segundo",scenario:"se compara potencia de aparatos"},
 {concept:"conversión km a m",property:"multiplica kilómetros por mil para expresarlos en metros",scenario:"se convierte una distancia de kilómetros a metros"},
 {concept:"conversión de horas a segundos",property:"multiplica las horas por tres mil seiscientos",scenario:"se expresa una duración en segundos"}
],
"Trabajo mecánico":[
 {concept:"trabajo positivo",property:"ocurre cuando la fuerza tiene componente a favor del desplazamiento",scenario:"una fuerza impulsa un objeto en el sentido en que avanza"},
 {concept:"trabajo negativo",property:"ocurre cuando la fuerza se opone al desplazamiento",scenario:"una fuerza de rozamiento frena el movimiento"},
 {concept:"trabajo nulo",property:"ocurre cuando la fuerza es perpendicular al desplazamiento",scenario:"se sostiene una mochila verticalmente mientras se camina horizontalmente"},
 {concept:"energía cinética",property:"equivale a la mitad de masa multiplicada por rapidez al cuadrado",scenario:"se calcula energía de un móvil"},
 {concept:"energía potencial gravitatoria",property:"en un campo aproximadamente uniforme equivale a mgh",scenario:"se eleva un cuerpo respecto de una referencia"},
 {concept:"teorema trabajo-energía",property:"relaciona trabajo neto con cambio de energía cinética",scenario:"una fuerza neta modifica rapidez"},
 {concept:"potencia mecánica",property:"es trabajo realizado por unidad de tiempo",scenario:"una máquina eleva cargas rápidamente"},
 {concept:"fuerza",property:"en condiciones de masa constante produce aceleración según F=ma",scenario:"una fuerza neta cambia velocidad"},
 {concept:"desplazamiento",property:"es la variación vectorial entre posición inicial y final",scenario:"se mueve una caja entre dos puntos"},
 {concept:"joule",property:"es la unidad del SI para trabajo y energía",scenario:"se informa resultado de trabajo mecánico"}
],
"Fuentes de energía":[
 {concept:"energía solar",property:"proviene de la radiación emitida por el Sol",scenario:"se utilizan paneles fotovoltaicos"},
 {concept:"energía eólica",property:"aprovecha la energía cinética del viento",scenario:"un aerogenerador gira por corriente de aire"},
 {concept:"energía hidroeléctrica",property:"aprovecha energía del agua en movimiento o desnivel",scenario:"una turbina funciona gracias al caudal de un río"},
 {concept:"energía geotérmica",property:"proviene del calor interno terrestre",scenario:"se aprovecha vapor subterráneo"},
 {concept:"energía de biomasa",property:"utiliza materia orgánica como recurso energético",scenario:"se produce biogás de residuos vegetales"},
 {concept:"energía mareomotriz",property:"aprovecha el movimiento periódico de las mareas",scenario:"la variación del nivel del mar mueve turbinas"},
 {concept:"energía nuclear",property:"se libera mediante transformaciones del núcleo atómico",scenario:"una planta usa fisión nuclear"},
 {concept:"combustibles fósiles",property:"son recursos no renovables formados a partir de materia orgánica antigua",scenario:"se quema petróleo para obtener calor"},
 {concept:"energía química",property:"está asociada a los enlaces y estados químicos de sustancias",scenario:"una batería almacena energía para un circuito"},
 {concept:"energía eléctrica",property:"se asocia a cargas eléctricas y su movimiento",scenario:"circula corriente por un conductor"}
]
};
const slug=(s:string)=>s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
function choose<T>(xs:readonly T[],shift:number):{values:T[];answerIndex:number}{
 const p=((shift%xs.length)+xs.length)%xs.length;
 const values=[...xs.slice(p),...xs.slice(0,p)];
 return {values,answerIndex:values.indexOf(xs[0])};
}
export function scienceFacts(subtopic:string):readonly ScienceFact[]{
 if(!SCIENCE_SUBTOPICS.includes(subtopic)||!DATA[subtopic])throw Error("Subtema científico sin banco: "+subtopic);
 return DATA[subtopic];
}
export function scienceModel(topic:string,subtopic:string,level:Level,mode:Mode,index:number):ScienceItem{
 if(!SCIENCE_TOPICS.some(t=>t.name===topic&&t.subtopics.includes(subtopic))||
  !SCIENCE_LEVELS.includes(level)||!SCIENCE_MODES.includes(mode)||
  !Number.isInteger(index)||index<0||index>=SCIENCE_LEVEL_COUNT[level])throw Error("Solicitud Naturales M1 fuera de catálogo");
 const facts=scienceFacts(subtopic),fact=facts[index%facts.length],k=index%facts.length,variant=Math.floor(index/facts.length);
 const distractors=[1,2,3].map(j=>facts[(k+j+variant)%facts.length]);
 const levelN=SCIENCE_LEVELS.indexOf(level)+1;
 const context=variant===0?fact.scenario:
  `Se contrastan dos observaciones: «${fact.scenario}» frente a «${distractors[0].scenario}». Identifica la explicación de la primera sin atribuirle la función de la segunda.`;
 const source:ScienceItem["source"]=["Ecología","Tabla periódica","Materia","Reacciones"].includes(subtopic)?
  "catalogo-practica-complementaria":topic==="Biología"?
  (["Cuerpo humano","Método científico"].includes(subtopic)?"GUIA-PRE-U-UNAH-2026:p8":"GUIA-PRE-U-UNAH-2026:p7"):
  "GUIA-PRE-U-UNAH-2026:p9";
 const intro=level==="principiante"?`Identifica la propiedad científica del concepto «${fact.concept}».`:
  level==="intermedio"?`Situación de estudio: ${context}. Para analizarla se considera «${fact.concept}». ¿Cuál descripción es apropiada?`:
  `Análisis y descarte de hipótesis: ${context}. Se evalúa el papel de «${fact.concept}» frente a otras explicaciones. ¿Qué conclusión es coherente con el conocimiento científico?`;
 const prompt=mode==="clasificar"?`${intro} Evalúa tres afirmaciones sin confundir las funciones de conceptos diferentes. Caso ${variant+1}.`:
  mode==="quiz"?`${intro} Selecciona una respuesta. Caso ${variant+1}.`:
  `Caso para reconstruir la relación entre observación y explicación: ${context}. Identifica el concepto y después la propiedad que corresponde. Caso ${variant+1}.`;
 const options=choose([fact.property,...distractors.map(x=>x.property)],index+levelN);
 const a=[
  {text:`«${fact.concept}»: ${fact.property}.`,truth:true},
  {text:`«${fact.concept}»: ${distractors[0].property}.`,truth:false},
  {text:`«${fact.concept}»: ${distractors[1].property}.`,truth:false}
 ];
 const assertions=choose(a,index+levelN).values;
 const names=choose([fact.concept,...distractors.map(x=>x.concept)],index+2*levelN);
 const steps=[
  {label:"Primero identifica el concepto que corresponde al caso descrito",choices:names.values,answerIndex:names.answerIndex},
  {label:"Después selecciona la función o propiedad que explica el caso",choices:options.values,answerIndex:options.answerIndex}
 ];
 const explanation=`En la situación «${fact.scenario}», el concepto «${fact.concept}» se vincula con esta propiedad: ${fact.property}. Esa relación es la que se debe reconocer. «${distractors[0].concept}» se relaciona, en cambio, con «${distractors[0].property}», por lo que no sustituye el criterio solicitado.`;
 const id="science-m1-"+[topic,subtopic,mode,level,index].map(x=>slug(String(x))).join("-");
 return {id,topic,subtopic,level,mode,index,concept:fact.concept,prompt,expected:fact.property,explanation,
  formula:`Observación: ${fact.scenario} → concepto: ${fact.concept} → criterio: ${fact.property}`,
  family:"science-m1-"+slug(subtopic)+"-"+slug(fact.concept),source,reviewStatus:"editorial-draft",
  cognitiveStage:levelN as 1|2|3,operation:level==="principiante"?"identificar-propiedad":level==="intermedio"?"aplicar-a-caso":"contrastar-explicaciones",
  requiredEvidence:level==="principiante"?["concepto","función"]:level==="intermedio"?["observación","concepto","función"]:["observación","relación-funcional","descartar-distractor","conclusión"],
  oracle:{concept:fact.concept,property:fact.property,scenario:fact.scenario},
  options:options.values,answerIndex:options.answerIndex,assertions,steps};
}
export function sciencePool(topic:string,subtopic:string,level:Level,mode:Mode):ScienceItem[]{
 return Array.from({length:SCIENCE_LEVEL_COUNT[level]},(_,i)=>scienceModel(topic,subtopic,level,mode,i));
}
export function scienceTopic(subtopic:string):string{
 const topic=SCIENCE_TOPICS.find(t=>t.subtopics.includes(subtopic));
 if(!topic)throw Error("Subtema científico desconocido: "+subtopic);
 return topic.name;
}
export const SCIENCE_M1_TOTAL=SCIENCE_SUBTOPICS.length*SCIENCE_MODES.length*(10+15+20);
