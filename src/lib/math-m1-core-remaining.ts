import type {Level} from "./grammar";
import type {Rational} from "./math-m1";
import type {CorePedagogy} from "./math-m1-core-pedagogy";

export const REMAINING_MATH_SUBTOPICS=["Áreas y perímetros","Ángulos","Pitágoras","Sólidos: área y volumen","Semejanza","Promedios","Probabilidad","Dispersión de datos","Tablas y gráficas","Sucesiones"] as const;
type ExtendedPedagogy=CorePedagogy & {kind?:string};
const gcd=(x:number,y:number):number=>{let a=Math.abs(x),b=Math.abs(y);while(b){const t=a%b;a=b;b=t;}return a||1;};
const q=(n:number,d=1):Rational=>{if(!Number.isInteger(n)||!Number.isInteger(d)||!d)throw Error("Racional incorrecto");const g=gcd(n,d),sign=d<0?-1:1;return {n:n/g*sign,d:Math.abs(d)/g};};
const fmt=(v:Rational)=>v.d===1?String(v.n):v.n+"/"+v.d;
const levelStage=(l:Level):1|2|3=>l==="principiante"?1:l==="intermedio"?2:3;
const stageEvidence=[["interpretar-datos","calcular-propiedad"],["interpretar-datos","aplicar-cambio","calcular-propiedad"],["interpretar-representacion","combinar-condiciones","resolver-pasos","comprobar-resultado"]];
export function remainingMathPedagogy(subtopic:string,level:Level,inputs:number[]):ExtendedPedagogy|null{
 if(!REMAINING_MATH_SUBTOPICS.some(t=>t===subtopic))return null;
 const stage=levelStage(level);let kind:string|undefined,values:number[]=[],result=q(0),intermediate=q(0),prompt="",explanation="",formula="",operation="",label="";
 let trueText="",falseOne="",falseTwo="";
 if(subtopic==="Áreas y perímetros"){
  const [L,W,flag]=inputs,plusL=stage===1?0:stage===2?2:3,plusW=stage===3?2:0;
  const a=L+plusL,b=W+plusW;
  values=[a,b,flag];result=q(flag?a*b:2*(a+b));intermediate=q(a+b);
  prompt=stage===1?`Usa el largo y el ancho del rectángulo dibujado para calcular su ${flag?"área (cm²)":"perímetro (cm)"}.`:
   stage===2?`El dibujo representa el rectángulo inicial. Si aumenta su largo 2 cm y el ancho permanece igual, ¿cuánto vale el ${flag?"área (cm²)":"perímetro (cm)"} del nuevo rectángulo?`:
   `El dibujo representa el rectángulo inicial. Si se aumenta el largo 3 cm y el ancho 2 cm, ¿cuánto vale el ${flag?"área (cm²)":"perímetro (cm)"} del rectángulo resultante?`;
  explanation=`Largo nuevo ${a} cm y ancho nuevo ${b} cm. La fórmula correcta ${flag?"área = largo × ancho":"perímetro = 2(largo + ancho)"} da ${fmt(result)} ${flag?"cm²":"cm"}. No debe confundirse contorno con superficie.`;
  formula=flag?`${a}×${b}=${fmt(result)}`:`2(${a}+${b})=${fmt(result)}`;
  operation=["aplicar-formula-rectangulo","transformar-una-dimension","transformar-dos-dimensiones-y-evaluar"][stage-1];label="Suma las dos dimensiones del rectángulo resultante";
  trueText="Para calcular el área se multiplican largo y ancho; para el perímetro se duplica su suma.";
  falseOne="Al cambiar solo el largo, el área y el perímetro aumentan necesariamente por el mismo factor.";
  falseTwo="Para calcular el área y el perímetro siempre se debe utilizar exactamente la misma fórmula.";
 }else if(subtopic==="Ángulos"){
  const [a,b]=inputs,aa=a-(stage===1?0:6),bb=b-(stage===3?4:0);
  values=[aa,bb];result=q(180-aa-bb);intermediate=q(aa+bb);
  prompt=stage===1?"Consulta los ángulos A y B del triángulo. Encuentra el ángulo interior C.":
   stage===2?"El triángulo dibujado representa la situación original. Si el ángulo A disminuye 6° y B permanece igual, ¿cuánto vale el nuevo ángulo C?":
   "El triángulo dibujado representa la situación original. Si A disminuye 6° y B disminuye 4°, calcula el nuevo valor de C respetando la suma de ángulos interiores.";
  explanation=`Los ángulos transformados son A=${aa}° y B=${bb}°. Como el triángulo tiene 180° en total, C=180°−(${aa}°+${bb}°)=${fmt(result)}°. Los nuevos ángulos se describen verbalmente, no se representan a escala en el dibujo.`;
  formula=`180−(${aa}+${bb})=${fmt(result)}`;
  operation=["tercer-angulo","ajustar-un-angulo-y-compensar","ajustar-dos-angulos-y-compensar"][stage-1];label="Suma los dos ángulos conocidos después de los cambios";
  trueText="Los tres ángulos interiores del triángulo deben sumar 180°, aun si cambian sus medidas.";
  falseOne="Modificar el ángulo A obliga a que el ángulo B aumente exactamente el mismo número de grados.";
  falseTwo="La medida de C se obtiene sumando directamente las medidas conocidas en lugar de restarlas de 180°.";
 }else if(subtopic==="Pitágoras"){
  const [a,b]=inputs,h=Math.sqrt(a*a+b*b);if(!Number.isInteger(h))throw Error("Triángulo no pitagórico");
  if(stage===1){values=[a,b];result=q(h);intermediate=q(a*a+b*b);}
  if(stage===2){values=[2*a,2*b];result=q(2*h);intermediate=q(4*(a*a+b*b));}
  if(stage===3){values=[2*a,2*b];result=q(2*(a+b+h));intermediate=q(2*h);kind="Pitágoras-perímetro";}
  prompt=stage===1?`El cateto horizontal mide ${a} cm. Observa el triángulo rectángulo para encontrar el otro cateto y calcula su hipotenusa.`:
   stage===2?"Los dos catetos del dibujo se duplican para construir un triángulo semejante. ¿Cuánto mide su nueva hipotenusa?":
   "Los dos catetos del dibujo se duplican para construir otro triángulo rectángulo. Primero encuentra la nueva hipotenusa con Pitágoras y después calcula el PERÍMETRO del triángulo nuevo.";
  explanation=stage===3?`El triángulo de origen tiene hipotenusa √(${a}²+${b}²)=${h}. Al duplicar los catetos, los nuevos lados son ${2*a}, ${2*b}, ${2*h}; su perímetro es ${fmt(result)} cm. Se requiere Pitágoras y luego sumar tres lados.`:
   `Pitágoras sobre los catetos ${values[0]} y ${values[1]} da √(${values[0]}²+${values[1]}²)=${fmt(result)} cm. La escala de los catetos modifica la hipotenusa proporcionalmente.`;
  formula=stage===3?`√(${2*a}²+${2*b}²)+${2*a}+${2*b}=${fmt(result)}`:`√(${values[0]}²+${values[1]}²)=${fmt(result)}`;
  operation=["hipotenusa-directa","escalamiento-y-pitagoras","escalamiento-pitagoras-y-perimetro"][stage-1];label=stage===3?"Calcula la nueva hipotenusa antes de sumar el perímetro":"Calcula la suma de cuadrados de los nuevos catetos";
  trueText="En un triángulo rectángulo, el cuadrado de la hipotenusa es la suma de los cuadrados de los catetos.";
  falseOne="La hipotenusa de un triángulo rectángulo se obtiene sumando directamente los dos catetos.";
  falseTwo="Al duplicar ambos catetos, la hipotenusa aumenta solo una unidad, cualquiera que sea su longitud.";
 }else if(subtopic==="Sólidos: área y volumen"){
  const [L,W,H,flag]=inputs,a=L+(stage===3?1:0),b=W+(stage===3?2:0),c=H+(stage===2?1:0);
  values=[a,b,c,flag];result=q(flag?a*b*c:2*(a*b+a*c+b*c));intermediate=q(a*b);
  prompt=stage===1?`Usa las tres dimensiones rotuladas del prisma para calcular su ${flag?"volumen (cm³)":"área superficial total (cm²)"}.`:
   stage===2?`El prisma del dibujo representa la caja original. Si la ALTURA aumenta 1 cm, ¿cuál es el ${flag?"volumen (cm³)":"área superficial total (cm²)"} de la nueva caja?`:
   `La caja dibujada es el objeto inicial. Su largo aumenta 1 cm y su ancho 2 cm, sin alterar su altura. Calcula el nuevo ${flag?"volumen (cm³)":"área superficial total (cm²)"}; si se trata del área, incluye todas las caras.`;
  explanation=`Las nuevas dimensiones son ${a} cm × ${b} cm × ${c} cm. ${flag?"El volumen se obtiene multiplicando las tres dimensiones":"El área superficial exige sumar dos veces las tres parejas de caras"}: resultado ${fmt(result)} ${flag?"cm³":"cm²"}.`;
  formula=flag?`${a}×${b}×${c}=${fmt(result)}`:`2(${a}×${b}+${a}×${c}+${b}×${c})=${fmt(result)}`;
  operation=["calcular-medida-prisma","transformar-altura","transformar-largo-ancho-y-todas-las-caras"][stage-1];label="Calcula el área de la base transformada";
  trueText="Para calcular el volumen de un prisma rectangular se utiliza el área de la base por la altura.";
  falseOne="El área superficial y el volumen tienen las mismas unidades, porque ambos emplean las tres dimensiones.";
  falseTwo="El área total del prisma comprende solo las caras superiores y no las laterales.";
 }else if(subtopic==="Semejanza"){
  const [small,large,other]=inputs,scale=large/small;
  if(!Number.isInteger(scale))throw Error("Razón no entera");
  values=stage===1?[small,large,other]:stage===2?[small,large,other+2]:[small,large+small,other+2];
  result=q(values[1]*values[2],values[0]);intermediate=q(values[1],values[0]);
  prompt=stage===1?"Los triángulos representados son semejantes. Calcula el lado correspondiente marcado con una incógnita.":
   stage===2?"En el diagrama original hay dos triángulos semejantes. Si el lado pequeño que no es la base aumenta 2 cm, manteniendo la misma razón de semejanza, ¿cuál será su lado correspondiente en el triángulo grande?":
   "En los triángulos originales, la base grande aumenta en una longitud igual a la base pequeña y el otro lado pequeño aumenta 2 cm. En la NUEVA pareja semejante, ¿cuánto mide el otro lado grande?";
  explanation=`Las nuevas bases corresponden ${values[0]} y ${values[1]} cm y el otro lado pequeño mide ${values[2]} cm. El factor actualizado es ${fmt(intermediate)}. Su homólogo grande es ${fmt(result)} cm.`;
  formula=`(${values[1]}/${values[0]})×${values[2]}=${fmt(result)}`;
  operation=["razon-de-semejanza","transformar-lado-correspondiente","transformar-dos-correspondencias-y-razon"][stage-1];label="Calcula el factor de semejanza después de los cambios";
  trueText="En figuras semejantes, los cocientes entre lados correspondientes deben ser iguales.";
  falseOne="En triángulos semejantes, los lados correspondientes se relacionan sumando siempre una constante fija.";
  falseTwo="Para calcular un lado grande a partir del pequeño, se divide entre el factor de ampliación.";
 }else if(subtopic==="Promedios"){
  const [a,b,c]=inputs;
  values=stage===1?[a,b,c]:stage===2?[a,b,c+3]:[a+2,b-1,c+5];
  result=q(values[0]+values[1]+values[2],3);intermediate=q(values[0]+values[1]+values[2]);
  prompt=stage===1?`Calcula el promedio de ${a}, ${b} y ${c}.`:
   stage===2?`La muestra es ${a}, ${b}, ${c}. Una revisión aumenta el tercer dato en 3. ¿Cuál es el NUEVO promedio?`:
   `La muestra es ${a}, ${b}, ${c}. El primer dato aumenta 2, el segundo disminuye 1 y el tercero aumenta 5. Calcula la nueva media teniendo en cuenta todos los cambios.`;
  explanation=`Los datos tras la revisión son ${values.join(", ")}. Sumarlos da ${fmt(intermediate)} y dividir la suma entre tres produce ${fmt(result)}. El número de observaciones sigue siendo 3.`;
  formula=`(${values.join("+")})/3=${fmt(result)}`;
  operation=["media-directa","media-tras-cambio-de-un-dato","media-tras-tres-cambios"][stage-1];label="Calcula la suma de los tres datos revisados";
  trueText="Cuando hay tres observaciones, la media es su suma dividida entre tres.";
  falseOne="La media de tres observaciones se calcula dividiendo la suma entre dos.";
  falseTwo="Modificar una observación mantiene inalterada la media en todos los casos.";
 }else if(subtopic==="Probabilidad"){
  const [r,b]=inputs;
  values=stage===1?[r,b]:stage===2?[r,b+2]:[r-1,b+3];
  result=q(values[0],values[0]+values[1]);intermediate=q(values[0]+values[1]);
  prompt=stage===1?`En una bolsa hay ${r} fichas rojas y ${b} azules. ¿Cuál es P(roja) en una extracción aleatoria?`:
   stage===2?`En una bolsa con ${r} rojas y ${b} azules, se añaden dos fichas azules antes de extraer una. ¿Cuál es la nueva probabilidad de obtener roja?`:
   `En una bolsa con ${r} rojas y ${b} azules se retira una roja y se incorporan tres azules. Tras estos dos cambios, ¿cuál es la probabilidad de sacar una ficha roja de la bolsa resultante?`;
  explanation=`Quedan ${values[0]} fichas rojas de un total de ${fmt(intermediate)}. La probabilidad es casos favorables sobre casos equiprobables: ${fmt(result)}.`;
  formula=`${values[0]}/(${values[0]}+${values[1]})=${fmt(result)}`;
  operation=["probabilidad-simple","probabilidad-tras-anadir-desfavorables","probabilidad-tras-retirar-y-anadir"][stage-1];label="Calcula el nuevo número total de fichas";
  trueText="La probabilidad de una ficha roja se calcula con rojas entre el total de fichas que queda tras los cambios.";
  falseOne="Agregar fichas azules a una bolsa necesariamente aumenta la probabilidad de extraer una roja.";
  falseTwo="Al sacar una ficha, las cantidades iniciales son siempre las que deben usarse, sin importar las modificaciones.";
 }else if(subtopic==="Dispersión de datos"){
  const [minimum,middle,maximum]=inputs;
  values=stage===1?[minimum,middle,maximum]:stage===2?[middle,middle,maximum]:[middle,middle,maximum+5];
  result=q(values[2]-values[0]);intermediate=q(values[2]);
  prompt=stage===1?`Los datos ordenados son ${minimum}, ${middle}, ${maximum}. ¿Cuál es el rango?`:
   stage===2?`Los datos ordenados son ${minimum}, ${middle}, ${maximum}. Se elimina el dato menor. ¿Cuál es el rango de las observaciones que permanecen?`:
   `Los datos ordenados son ${minimum}, ${middle}, ${maximum}. Se elimina el menor y se aumenta el máximo en 5. ¿Qué rango tiene la nueva muestra de dos datos?`;
  explanation=`Después de los cambios, el mínimo que permanece es ${values[0]} y el máximo ${values[2]}. Rango = máximo − mínimo = ${fmt(result)}. El rango no se obtiene sumando observaciones.`;
  formula=`${values[2]}−${values[0]}=${fmt(result)}`;
  operation=["rango-directo","rango-tras-filtrado","rango-tras-filtrado-y-transformacion"][stage-1];label="Identifica el nuevo dato máximo";
  trueText="Para calcular el rango se resta el dato mínimo al máximo del conjunto que realmente permanece.";
  falseOne="El rango de una muestra se calcula sumando todos los datos y dividiendo entre el número de observaciones.";
  falseTwo="Al excluir el valor mínimo, el rango necesariamente permanece igual, aun si ese mínimo era único.";
 }else if(subtopic==="Tablas y gráficas"){
  const [mon,tue,wed]=inputs;
  values=[mon,tue,wed];
  if(stage===1){result=q(mon+tue+wed);}
  else if(stage===2){kind="bar-balance";result=q(mon+tue-wed);}
  else {kind="bar-balance";values=[mon-2,tue+3,wed+4];result=q(values[0]+values[1]-values[2]);}
  intermediate=q(values[0]+values[1]);
  prompt=stage===1?"El gráfico muestra los préstamos de lunes, martes y miércoles. ¿Cuál es el total de los tres días?":
   stage===2?"Interpreta las tres barras originales. ¿Cuántos libros más (o menos, si es negativo) suman lunes y martes respecto de miércoles? Responde con signo.":
   "El gráfico muestra los datos iniciales. Si el lunes se prestan 2 libros MENOS, el martes 3 MÁS y el miércoles 4 MÁS, ¿cuál es el balance con signo (lunes+martes)−miércoles del nuevo escenario?";
  explanation=`Los valores considerados son lunes ${values[0]}, martes ${values[1]} y miércoles ${values[2]}. ${stage===1?"El total":"El balance de dos días contra el tercero"} es ${fmt(result)} libros.`;
  formula=stage===1?`${values.join("+")}=${fmt(result)}`:`(${values[0]}+${values[1]})−${values[2]}=${fmt(result)}`;
  operation=["lectura-total-de-tres-barras","comparar-grupos-de-barras","actualizar-barras-y-comparar-grupos"][stage-1];label="Calcula el subtotal de lunes más martes del escenario requerido";
  trueText="El balance entre dos días y otro se obtiene sumando primero los dos días y restando luego el tercero.";
  falseOne="Para comparar (lunes+martes) con miércoles basta restar directamente martes−miércoles.";
  falseTwo="Al revisar un gráfico, las modificaciones anunciadas en el enunciado deben ignorarse para calcular el nuevo balance.";
 }else{
  const [first,diff]=inputs;
  if(stage===1){values=[first,diff];result=q(first+3*diff);}
  if(stage===2){values=[first,diff];result=q(first+4*diff);kind="Sucesiones-quinto";}
  if(stage===3){values=[first,diff];result=q(4*diff);kind="Sucesiones-diferencia";}
  intermediate=q(diff);
  prompt=stage===1?`Una sucesión aritmética empieza en ${first} y aumenta ${diff} en cada paso. ¿Cuál es el cuarto término?`:
   stage===2?`La sucesión aritmética empieza en ${first} y tiene diferencia ${diff}. ¿Cuál es su QUINTO término? Identifica cuántos saltos hay desde el primero.`:
   `La sucesión aritmética comienza en ${first} y aumenta ${diff} por término. ¿Cuánto mayor es el SÉPTIMO término que el TERCERO? Calcula la diferencia entre índices, sin confundirla con los valores absolutos.`;
  explanation=stage===3?`Del tercer al séptimo término hay cuatro incrementos de ${diff}. La diferencia solicitada es 4×${diff}=${fmt(result)}, independiente del término inicial.`:
   `Se parte de ${first} y se aplican ${stage===1?3:4} incrementos de ${diff}. Resultado ${fmt(result)}.`;
  formula=stage===3?`a7−a3=4×${diff}=${fmt(result)}`:`${first}+${stage===1?3:4}×${diff}=${fmt(result)}`;
  operation=["continuar-cuarto-termino","inferir-quinto-termino","comparar-terminos-no-consecutivos"][stage-1];label="Determina la diferencia constante entre términos consecutivos";
  trueText="El salto entre el tercer y el séptimo término de una progresión aritmética corresponde a cuatro diferencias comunes.";
  falseOne="Para hallar el séptimo término basta aplicar exactamente siete incrementos al término inicial.";
  falseTwo="La diferencia entre términos separados depende siempre del valor absoluto del primer término.";
 }
 if(!explanation.includes(fmt(result)))throw Error("Explicación sin resultado: "+subtopic);
 return {kind,inputs:values,result,intermediate,explanation,formula,prompt,operation,cognitiveStage:stage,
  requiredEvidence:[...stageEvidence[stage-1]],
  procedure:{label,value:intermediate},claims:[{text:trueText,truth:true},{text:falseOne,truth:false},{text:falseTwo,truth:false}]};
}
