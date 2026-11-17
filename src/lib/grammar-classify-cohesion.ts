import type {ClassificationActivity} from './grammar-activities';
import type {Level} from './grammar';
type Row=[string,string,'Causa'|'Consecuencia'|'Contraste'|'Adición',string];
const basic:Row[]=[
['No salimos porque llovía.','porque','Causa','Introduce el motivo por el que no salieron.'],
['Llovía; por eso llevamos paraguas.','por eso','Consecuencia','Presenta la acción como resultado de la lluvia.'],
['Quería correr, pero estaba cansada.','pero','Contraste','Contrapone el deseo al cansancio.'],
['Trajo lápices y también cuadernos.','también','Adición','Agrega otro objeto a los lápices.'],
['Se quedó en casa porque estaba enfermo.','porque','Causa','Expresa la razón de quedarse.'],
['El semáforo estaba rojo; por eso se detuvo.','por eso','Consecuencia','Presenta detenerse como resultado de la señal roja.'],
['El café estaba caliente, pero el jugo estaba frío.','pero','Contraste','Contrapone las temperaturas de dos bebidas.'],
['Ana canta; además, toca guitarra.','además','Adición','Agrega una segunda actividad de Ana.'],
['La planta se secó porque no recibió agua.','porque','Causa','Indica el motivo por el que la planta se secó.'],
['El piso estaba mojado; por eso caminamos despacio.','por eso','Consecuencia','Relaciona la precaución con el estado del piso.'],
];
const intermediate:Row[]=[
['El centro amplió el horario; sin embargo, cerró el domingo.','sin embargo','Contraste','Contrapone la ampliación del horario con el cierre dominical.'],
['El camino quedó bloqueado a causa del derrumbe.','a causa de','Causa','Presenta el derrumbe como motivo del bloqueo.'],
['Hubo una fuga; en consecuencia, se cerró la llave.','en consecuencia','Consecuencia','Presenta el cierre como resultado de la fuga.'],
['El taller ofrece lectura; asimismo, organiza debates.','asimismo','Adición','Añade una segunda actividad del taller.'],
['Aunque el equipo practicó, perdió el partido.','aunque','Contraste','Introduce una circunstancia que no impidió la derrota.'],
['La prueba se repitió debido a un error en el registro.','debido a','Causa','Señala el error como motivo de la repetición.'],
['Los boletos se agotaron; por lo tanto, se abrió otra fecha.','por lo tanto','Consecuencia','Introduce una respuesta al agotamiento de entradas.'],
['El plan incluye tutorías y, además, materiales de consulta.','además','Adición','Agrega los materiales a las tutorías.'],
['El edificio es antiguo; no obstante, se conserva bien.','no obstante','Contraste','Contrapone la antigüedad con el buen estado.'],
['La cosecha disminuyó por falta de lluvia.','por','Causa','Introduce la falta de lluvia como causa de la disminución.'],
['El depósito está vacío; por consiguiente, habrá que llenarlo.','por consiguiente','Consecuencia','Vincula la necesidad de llenarlo con que está vacío.'],
['Se consultaron libros; igualmente, se revisaron archivos.','igualmente','Adición','Agrega la consulta de archivos a la de libros.'],
['El autobús salió temprano, pero llegó tarde.','pero','Contraste','Contrapone la salida temprana con la llegada tardía.'],
['Se suspendió el ensayo ya que faltaban participantes.','ya que','Causa','Explica el motivo de la suspensión.'],
['El presupuesto no alcanza; así que se reducirán los gastos.','así que','Consecuencia','Presenta la reducción como respuesta al presupuesto insuficiente.'],
];
const advanced:Row[]=[
['La muestra fue pequeña; por tanto, los resultados no bastan para representar a toda la población.','por tanto','Consecuencia','Deriva una limitación de la muestra reducida.'],
['El informe describe una asociación; sin embargo, no demuestra causalidad.','sin embargo','Contraste','Distingue la asociación observada de una conclusión causal no probada.'],
['Puesto que faltan datos de dos meses, el promedio anual todavía no puede calcularse.','puesto que','Causa','Introduce la ausencia de datos como razón de la limitación.'],
['El ensayo evaluó resistencia; además, midió el peso de cada pieza.','además','Adición','Añade una medición distinta a la prueba de resistencia.'],
['La ruta es más corta; no obstante, requiere cruzar una zona inundable.','no obstante','Contraste','Contrasta la ventaja de distancia con una condición desfavorable.'],
['La encuesta solo incluyó visitantes; por ello, no describe a quienes no acudieron.','por ello','Consecuencia','Deriva una limitación de la selección de participantes.'],
['Dado que los datos no son comparables, el análisis separa ambos períodos.','dado que','Causa','Explica por qué se separan los períodos.'],
['El informe detalla los costos y, asimismo, identifica posibles fuentes de financiación.','asimismo','Adición','Añade la identificación de fuentes a la descripción de costos.'],
['Aunque la intervención coincidió con una mejora, otros factores también pudieron influir.','aunque','Contraste','Reconoce la coincidencia y limita la atribución de causa.'],
['El sensor perdió señal; en consecuencia, se excluyó ese intervalo del cálculo.','en consecuencia','Consecuencia','Presenta la exclusión como resultado de la pérdida de señal.'],
['Como se modificó el instrumento, las mediciones se interpretarán por separado.','como','Causa','Al inicio, introduce la razón para separar la interpretación.'],
['La propuesta reduce costos; en cambio, aumenta el tiempo de traslado.','en cambio','Contraste','Contrapone efectos en dos dimensiones distintas.'],
['Los vecinos aportaron testimonios; además, entregaron fotografías fechadas.','además','Adición','Añade otro tipo de evidencia a los testimonios.'],
['La muestra está incompleta; por consiguiente, la conclusión deberá revisarse.','por consiguiente','Consecuencia','Relaciona la revisión necesaria con la falta de datos.'],
['Debido a que el mapa carece de escala, no permite calcular distancias exactas.','debido a que','Causa','Explica la limitación del cálculo mediante la ausencia de escala.'],
['La biblioteca amplió sus fondos; sin embargo, el acceso sigue limitado los domingos.','sin embargo','Contraste','Contrapone la mejora de fondos con la limitación de acceso.'],
['Se compararon los datos por edad y, además, por zona de residencia.','además','Adición','Añade una segunda dimensión de comparación.'],
['La fuente no menciona la fecha; por eso, no se puede ordenar con precisión el suceso.','por eso','Consecuencia','Deriva una limitación cronológica de la ausencia de fecha.'],
['Ya que las variables cambiaron juntas, el estudio describe correlación sin atribuir causa.','ya que','Causa','Presenta la observación conjunta como base de la descripción correlacional.'],
['El informe propone conservar el bosque, mientras que el borrador anterior sugería urbanizarlo.','mientras que','Contraste','Contrapone dos propuestas para el mismo territorio.'],
];
function make(level:Level,rows:Row[]):ClassificationActivity[]{return rows.map(([text,connector,label,explanation],i)=>({id:`cohesion-class-${level}-${i+1}`,subtopic:'Cohesión y coherencia',level,kind:'classification',reviewStatus:'editorial-draft',prompt:`Clasifica la relación que expresa «${connector}» en el siguiente enunciado: ${text}`,labels:['Causa','Consecuencia','Contraste','Adición'],items:[{id:'relacion',text:connector,label,explanation}],explanation}));}
export const COHESION_CLASSIFICATION=[...make('principiante',basic),...make('intermedio',intermediate),...make('avanzado',advanced)];
