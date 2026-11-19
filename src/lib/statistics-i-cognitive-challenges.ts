import type {Level} from "./grammar";
import type {CognitiveChallenge} from "./math-cognitive-progression";
import type {StatsSkill,StatsStimulus,FrequencyStimulus} from "./statistics-visual-lab";

/** Each higher level changes the reasoning operation, not only the seed.
 * The original visual stimulus remains the sole source for its input data. */
const fmt=(x:number)=>String(Number(x.toFixed(3)));
const qty=(x:number,u:string)=>fmt(x)+" "+u;
const gcd=(a:number,b:number):number=>b===0?a:gcd(b,a%b);
function fraction(a:number,b:number):string{
 const d=gcd(a,b);return (a/d)+"/"+(b/d);
}
function expanded(s:FrequencyStimulus):number[]{
 return s.values.flatMap((v,i)=>Array.from({length:s.frequencies[i]},()=>v));
}
function medianOf(a:number[]):number{
 if(a.length===0)throw Error("Sin observaciones");
 const v=[...a].sort((x,y)=>x-y),n=v.length;
 return n%2?v[(n-1)/2]:(v[n/2-1]+v[n/2])/2;
}
function answerChoices(answer:string,wrong:string[]):string[]{
 // For probabilities, compare rational values, not just textual spelling.
 const equivalent=(x:string,y:string):boolean=>{
  if(!x.includes("/")||!y.includes("/"))return x===y;
  const [a,b]=x.split("/").map(Number),[c,d]=y.split("/").map(Number);
  return b!==0&&d!==0&&a*d===c*b;
 };
 const distinct:string[]=[];
 for(const v of wrong)if(!equivalent(v,answer)&&!distinct.some(x=>equivalent(x,v)))distinct.push(v);
 if(distinct.length<3)throw Error("Distractores no independientes");
 return distinct.slice(0,3);
}
export function statisticsCognitiveChallenge(s:StatsStimulus,skill:StatsSkill,level:Level):CognitiveChallenge|null{
 if(level==="principiante")return null;
 const advanced=level==="avanzado",stage:2|3=advanced?3:2;
 const requiredEvidence=advanced?
  ["leer-datos","identificar-relacion","modificar-condiciones","recalcular-y-comprobar"]:
  ["leer-datos","combinar-observaciones","resolver-operacion"];
 let operation="",prompt="",answer="",explanation="",wrong:string[]=[];
 if(skill==="bar-difference"&&s.kind==="bars"){
  const [m,t,w,h]=s.values;
  if(!advanced){
   operation="barras-comparacion-de-dos-diferencias";
   prompt="¿Cuántos libros separan, en valor absoluto, la diferencia martes−lunes y la diferencia jueves−miércoles?";
   const first=t-m,second=h-w;
   answer=qty(Math.abs(first-second),"libros");
   explanation=`La diferencia martes−lunes es ${first}, mientras jueves−miércoles es ${second}. Su distancia absoluta es ${answer}.`;
   wrong=[qty(first,"libros"),qty(second,"libros"),qty(first+second,"libros"),qty(Math.abs(h-m),"libros")];
  }else{
   operation="barras-doble-escenario-y-balance";
   prompt="Se agregan 3 libros al jueves y se retiran 2 del martes. ¿Cuál es la diferencia (martes+miércoles) − (lunes+jueves) después de esos cambios? Incluye el signo.";
   const left=t-2+w,right=m+h+3;
   answer=qty(left-right,"libros");
   explanation=`Martes+miércoles queda ${t-2}+${w}=${left}; lunes+jueves queda ${m}+${h+3}=${right}. La diferencia con signo es ${answer}.`;
   wrong=[qty(t+w-m-h,"libros"),qty(Math.abs(left-right),"libros"),qty(left+right,"libros"),qty(right-left,"libros")];
  }
 }
 if(skill==="line-change"&&s.kind==="line"){
  const [jan,feb,mar,apr]=s.values;
  if(!advanced){
   operation="lineas-dos-cambios-y-balance";
   prompt="¿Cuál es la variación neta entre enero y abril, teniendo en cuenta los cambios de los meses intermedios? Incluye el signo.";
   answer=qty(apr-jan,"unidades");
   explanation=`Las variaciones mensuales se encadenan y equivalen a abril−enero = ${apr}−${jan} = ${answer}.`;
   wrong=[qty(mar-feb,"unidades"),qty(apr-mar,"unidades"),qty(mar-jan,"unidades"),qty(apr+jan,"unidades")];
  }else{
   operation="lineas-modificar-dos-puntos-y-comparar";
   prompt="En una revisión, febrero aumenta 3 unidades y abril disminuye 2. ¿Cuál es la nueva variación de febrero a abril, con su signo?";
   const change=(apr-2)-(feb+3);
   answer=qty(change,"unidades");
   explanation=`El febrero revisado es ${feb+3} y abril revisado es ${apr-2}. Variación = ${apr-2}−${feb+3} = ${answer}.`;
   wrong=[qty(apr-feb,"unidades"),qty(apr-feb+5,"unidades"),qty(Math.abs(change),"unidades"),qty(mar-feb,"unidades")];
  }
 }
 if(s.kind==="frequency"){
  const data=expanded(s),[first,second,third,last]=s.values,counts=s.frequencies;
  if(skill==="frequency-mode"){
   if(!advanced){
    operation="frecuencias-comparar-dos-frecuencias";
    prompt="¿Cuántas observaciones más tiene la moda que el tercer valor de la tabla? Compara frecuencias, no puntuaciones.";
    const diff=Math.max(...counts)-counts[2];
    answer=qty(diff,"observaciones");
    explanation=`La frecuencia modal es ${Math.max(...counts)} y la del tercer valor es ${counts[2]}; diferencia: ${answer}.`;
    wrong=[qty(counts[1],"observaciones"),qty(counts[2],"observaciones"),qty(second-third,"observaciones"),qty(diff+2,"observaciones")];
   }else{
    operation="frecuencias-modificar-moda-umbral";
    prompt="Se incorporan observaciones del tercer valor de la tabla, sin modificar las demás. ¿Cuál es el número mínimo que debe agregarse para que ese valor se convierta en la única moda?";
    const needed=Math.max(...counts)-counts[2]+1;
    answer=qty(needed,"observaciones");
    explanation=`La frecuencia dominante es ${Math.max(...counts)} y la del tercer valor ${counts[2]}. Debe superarla estrictamente: ${Math.max(...counts)}−${counts[2]}+1 = ${answer}.`;
    wrong=[qty(needed-1,"observaciones"),qty(needed+1,"observaciones"),qty(counts[1],"observaciones"),qty(counts[2],"observaciones")];
   }
  }
  if(skill==="frequency-range"){
   if(!advanced){
    operation="rango-tras-excluir-minimo";
    prompt="Si se eliminan todas las observaciones del menor valor de la tabla, ¿cuál es el rango de los datos restantes?";
    answer=qty(last-second,"puntos");
    explanation=`Tras excluir ${first}, el mínimo observado es ${second} y el máximo sigue siendo ${last}. Rango = ${answer}.`;
    wrong=[qty(last-first,"puntos"),qty(last-third,"puntos"),qty(last-second+1,"puntos"),qty(last+second,"puntos")];
   }else{
    operation="rango-filtrado-y-transformacion";
    prompt="Se eliminan todas las observaciones de los valores mínimo y máximo. Después se suman 3 puntos a todas las observaciones del valor mayor que permanece. ¿Cuál es el rango final?";
    answer=qty(third+3-second,"puntos");
    explanation=`Solo quedan puntuaciones ${second} y ${third}. El segundo valor permanece, y el mayor aumenta a ${third+3}. Rango = ${third+3}−${second} = ${answer}.`;
    wrong=[qty(last-first,"puntos"),qty(third-second,"puntos"),qty(third+3-first,"puntos"),qty(last+3-second,"puntos")];
   }
  }
  if(skill==="frequency-median"){
   if(!advanced){
    operation="mediana-tras-incorporar-observacion";
    prompt="Si se añade una observación del mayor valor de la tabla, ¿cuál es la mediana del nuevo conjunto?";
    answer=qty(medianOf([...data,last]),"puntos");
    explanation=`Las frecuencias representan ${data.length} observaciones; se añade un dato ${last} y se vuelve a localizar el centro entre ${data.length+1} observaciones. Mediana: ${answer}.`;
    wrong=[qty(medianOf(data),"puntos"),qty(second,"puntos"),qty(third,"puntos"),qty(last,"puntos")];
   }else{
    operation="mediana-filtrado-y-reponderacion";
    prompt="Se eliminan todas las observaciones del valor modal y se añaden dos observaciones del mayor valor de la tabla. ¿Cuál es la mediana del nuevo conjunto?";
    const modal=s.values[counts.indexOf(Math.max(...counts))],rest=data.filter(x=>x!==modal);
    const newData=[...rest,last,last];
    answer=qty(medianOf(newData),"puntos");
    explanation=`Se retiran las ${Math.max(...counts)} apariciones del valor modal ${modal} y se añaden dos datos ${last}. El conjunto resultante tiene ${newData.length} observaciones y mediana ${answer}.`;
    wrong=[qty(medianOf(data),"puntos"),qty(medianOf([...data,last]),"puntos"),qty(third,"puntos"),qty(last,"puntos"),qty(first,"puntos")];
   }
  }
 }
 if(skill==="sample-probability"&&s.kind==="sample"){
  const total=s.colors.length,red=s.colors.filter(x=>x==="rojo").length,blue=total-red;
  if(!advanced){
   operation="probabilidad-complemento";
   prompt="Si se extrae una ficha al azar, ¿cuál es la probabilidad de que NO sea roja? Expresa la fracción simplificada.";
   answer=fraction(blue,total);
   explanation=`Hay ${blue} fichas azules de ${total} posibles. La probabilidad complementaria es ${answer}.`;
   wrong=[fraction(red,total),fraction(blue,total+1),fraction(red,total+1),fraction(1,total),fraction(total,blue)];
  }else{
   operation="probabilidad-sin-reemplazo-condicionada";
   prompt="Se extrae una ficha roja y no se devuelve. ¿Cuál es la probabilidad de que la segunda ficha también sea roja? Expresa la fracción simplificada.";
   answer=fraction(red-1,total-1);
   explanation=`Tras retirar una ficha roja quedan ${red-1} rojas entre ${total-1} fichas. La probabilidad condicionada es ${answer}.`;
   wrong=[fraction(red,total),fraction(red-1,total),fraction(red,total-1),fraction(blue,total-1),fraction(1,total-1)];
  }
 }
 if(!operation)throw Error("Incompatibilidad entre habilidad y estímulo: "+skill);
 const unit=answer.includes(" libros")?" libros":answer.includes(" unidades")?" unidades":answer.includes(" observaciones")?" observaciones":answer.includes(" puntos")?" puntos":"";
 for(let k=1;k<=25;k++){
  if(unit)wrong.push(qty(17+k,unit.trim()));
  else wrong.push(fraction(k,k+41));
 }
 return {stage,operation,requiredEvidence,prompt,answer,distractors:answerChoices(answer,wrong),explanation};
}
