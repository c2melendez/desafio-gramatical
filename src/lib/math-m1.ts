import type {Level,Mode} from "./grammar";
import {AREAS} from "./phuma-catalog";

/** Banco técnico original M1 de Matemáticas: 10/15/20 por subtema y juego.
 * Los parámetros y los casos se calculan con aritmética exacta; las variantes
 * representan registros verificables, NO independencia psicométrica certificada.
 * Guía PRE-U UNAH 2026, pág. 6: contenidos matemáticos; subtemas añadidos del
 * catálogo son práctica complementaria, no equivalencias oficiales.
 */
export const MATH_LEVEL_COUNT:Record<Level,number>={principiante:10,intermedio:15,avanzado:20};
export const MATH_TOPICS=AREAS.find(a=>a.id==="matematicas")!.topics;
export const MATH_SUBTOPICS=MATH_TOPICS.flatMap(t=>t.subtopics);
export const MATH_LEVELS:Level[]=["principiante","intermedio","avanzado"];
export const MATH_MODES:Mode[]=["clasificar","quiz","construir"];
export type Rational={n:number;d:number};
export type MathModel={id:string;topic:string;subtopic:string;level:Level;mode:Mode;seed:number;
 prompt:string;expected:string;explanation:string;formula:string;
 source:"GUIA-PRE-U-UNAH-2026:p6"|"catalogo-practica-complementaria";
 oracle:{kind:string;inputs:number[];answer:Rational;intermediate:Rational};
 options:string[];answerIndex:number;
 assertions:{text:string;truth:boolean}[];
 steps:{label:string;choices:string[];answerIndex:number}[];
 reviewStatus:"editorial-draft";family:string;
};
function gcd(a:number,b:number):number{a=Math.abs(a);b=Math.abs(b);while(b){const c=a%b;a=b;b=c}return a||1}
const q=(n:number,d=1):Rational=>{if(!Number.isInteger(n)||!Number.isInteger(d)||!d)throw Error("Racional inválido");const f=gcd(n,d),sign=d<0?-1:1;return {n:sign*n/f,d:Math.abs(d)/f}};
const add=(a:Rational,b:Rational)=>q(a.n*b.d+b.n*a.d,a.d*b.d);
const fmt=(a:Rational)=>a.d===1?String(a.n):a.n+"/"+a.d;
const choose=(v:number,answers:string[])=>{const shift=v%answers.length;const ordered=[...answers.slice(shift),...answers.slice(0,shift)];return {choices:ordered,answerIndex:ordered.indexOf(answers[0])}};
const variants=(r:Rational)=>[fmt(r),fmt(add(r,q(1))),fmt(add(r,q(2))),fmt(add(r,q(-1)))];
type Computed={question:string;result:Rational;intermediate:Rational;interLabel:string;reason:string;formula:string;inputs:number[];kind:string};
function compute(subtopic:string,level:Level,seed:number):Computed{
 const difficulty=level==="principiante"?0:level==="intermedio"?1:2;
 const a=4+seed%17+2*difficulty,b=3+(seed*3+5)%13+2*difficulty,c=2+(seed*5+1)%7;
 const output=(question:string,result:Rational,intermediate:Rational,interLabel:string,reason:string,formula:string,inputs:number[],kind=subtopic):Computed=>
 ({question,result,intermediate,interLabel,reason,formula,inputs,kind});
 switch(subtopic){
 case "Operaciones":{const t=a+b,ans=t*c;return output(`Calcula (${a} + ${b}) × ${c}.`,q(ans),q(t),"Suma dentro del paréntesis",`Se suma ${a}+${b}=${t} y después se multiplica ${t}×${c}=${ans}; la prioridad de los paréntesis evita multiplicar solo un sumando.`,`(${a}+${b})×${c}=${ans}`,[a,b,c]);}
 case "Fracciones":{const x=1+seed%5,y=x+2+seed%4,u=1+(seed*3)%5,v=u+3+seed%5;const r=add(q(x,y),q(u,v));return output(`Calcula ${x}/${y} + ${u}/${v} y simplifica.`,r,q(y*v),"Denominador común",`Un denominador común es ${y}×${v}=${y*v}; el numerador es ${x}×${v}+${u}×${y}=${x*v+u*y}. Tras simplificar resulta ${fmt(r)}.`,`${x}/${y}+${u}/${v}=${fmt(r)}`,[x,y,u,v]);}
 case "Porcentajes":{const pct=5*(1+seed%12),base=20*(3+(seed*7)%18),r=q(base*pct,100);return output(`¿Cuánto es el ${pct}% de ${base} lempiras?`,r,q(pct,100),"Porcentaje expresado como fracción",`El ${pct}% equivale a ${pct}/100. Por tanto ${base}×${pct}/100=${fmt(r)} lempiras.`,`${base}×${pct}/100=${fmt(r)}`,[base,pct]);}
 case "Proporciones":{const price=2+(seed*3)%15,units=2+seed%6,needed=units+1+seed%6;const total=price*units;return output(`Si ${units} cuadernos cuestan L ${total} al mismo precio, ¿cuánto cuestan ${needed} cuadernos?`,q(price*needed),q(price),"Precio unitario",`El precio por unidad es ${total}÷${units}=${price} lempiras; para ${needed} cuadernos se multiplica por ${needed} y se obtiene L ${price*needed}.`,`(${total}÷${units})×${needed}=${price*needed}`,[units,total,needed]);}
 case "Potencias":{const base=2+seed%5,exp=2+seed%2,part=base**(exp-1),r=base**exp;return output(`Calcula ${base} elevado a ${exp}.`,q(r),q(part),"Producto parcial",`La potencia ${base}^${exp} multiplica ${base} por sí mismo ${exp} veces. ${base}^${exp}=${part}×${base}=${r}.`,`${base}^${exp}=${r}`,[base,exp]);}
 case "MCD y MCM":{const factor=2+seed%9,x=2+seed%7,y=3+(seed*3)%8,aa=factor*x,bb=factor*y;const g=gcd(aa,bb),l=aa*bb/g,isG=seed%2===0;return output(`Encuentra el ${isG?"máximo común divisor":"mínimo común múltiplo"} de ${aa} y ${bb}.`,q(isG?g:l),q(g),"Máximo común divisor",`El MCD de ${aa} y ${bb} es ${g}. ${isG?"Es el mayor divisor de ambos números.":`El MCM es (${aa}×${bb})÷${g}=${l}, el múltiplo positivo común menor.`}`,`MCD=${g}; MCM=${l}`,[aa,bb,isG?0:1],"divisibilidad");}
 case "Ecuaciones":{const x=2+seed%23,coef=2+seed%7,k=3+seed%14,total=coef*x+k;return output(`Resuelve para x: ${coef}x + ${k} = ${total}.`,q(x),q(total-k),"Resultado de restar el término independiente",`Restando ${k} en ambos miembros queda ${coef}x=${total-k}. Al dividir entre ${coef}, x=${x}.`,`x=(${total}-${k})/${coef}=${x}`,[coef,k,total]);}
 case "Sistemas de ecuaciones":{const x=3+seed%17,y=2+(seed*7)%13,sum=x+y,diff=x-y;return output(`En el sistema x + y = ${sum} y x − y = ${diff}, encuentra x.`,q(x),q(2*x),"Resultado de sumar ambas ecuaciones",`Al sumar las ecuaciones se elimina y y queda 2x=${sum}+${diff}=${2*x}. Por tanto, x=${x}.`,`2x=${sum}+${diff}; x=${x}`,[sum,diff]);}
 case "Sucesiones":{const first=1+seed%22,d=2+seed%8,result=first+3*d;return output(`¿Qué número continúa la sucesión ${first}, ${first+d}, ${first+2*d}, ... si sigue la misma regla?`,q(result),q(d),"Diferencia entre términos consecutivos",`La diferencia constante es ${d}. Se suma ${d} al último término ${first+2*d} para obtener ${result}.`,`${first+2*d}+${d}=${result}`,[first,d]);}
 case "Funciones":{const coef=2+seed%8,constant=2+(seed*5)%19,x=1+seed%14,part=coef*x;return output(`Si f(x)=${coef}x+${constant}, calcula f(${x}).`,q(part+constant),q(part),"Producto del coeficiente por la entrada",`Sustituir x=${x} da f(${x})=${coef}×${x}+${constant}=${part+constant}.`,`f(${x})=${coef}×${x}+${constant}=${part+constant}`,[coef,constant,x]);}
 case "Ecuaciones cuadráticas":{const r1=1+seed%9,r2=r1+2+seed%6,S=r1+r2,P=r1*r2;return output(`La ecuación x² − ${S}x + ${P} = 0 tiene dos raíces positivas. ¿Cuál es la mayor?`,q(r2),q(S),"Suma de las raíces",`Se factoriza como (x−${r1})(x−${r2})=0. Las raíces son ${r1} y ${r2}; la mayor es ${r2}.`,`(x−${r1})(x−${r2})=0`,[S,P]);}
 case "Inecuaciones":{const x0=1+seed%22,coef=2+seed%7,k=3+seed%17,bound=coef*x0+k;return output(`Al resolver ${coef}x + ${k} > ${bound}, se obtiene x > ___. Completa el límite.`,q(x0),q(bound-k),"Resta previa a dividir",`Se resta ${k} y se divide por el coeficiente positivo ${coef}; por eso x > ${x0}. El sentido de la desigualdad no cambia al dividir por un positivo.`,`x>(${bound}-${k})/${coef}=${x0}`,[coef,k,bound]);}
 case "Patrones algebraicos":{const coeff=2+seed%8,constant=1+(seed*3)%17,n=3+seed%15;return output(`Un patrón cumple aₙ=${coeff}n+${constant}. ¿Cuál es el término a_${n}?`,q(coeff*n+constant),q(coeff*n),"Producto del índice por el coeficiente",`Al sustituir n=${n}, resulta a_${n}=${coeff}×${n}+${constant}=${coeff*n+constant}.`,`${coeff}×${n}+${constant}=${coeff*n+constant}`,[coeff,constant,n]);}
 case "Áreas y perímetros":{const L=3+seed%18,W=2+(seed*3)%12,isArea=seed%2===0,r=isArea?L*W:2*(L+W);return output(`Un rectángulo mide ${L} cm de largo y ${W} cm de ancho. Calcula su ${isArea?"área (en cm²)":"perímetro (en cm)"}.`,q(r),q(isArea?L+W:L+W),"Suma de largo y ancho",`El ${isArea?"área es largo × ancho":"perímetro es dos veces la suma de sus lados contiguos"}: ${isArea?`${L}×${W}`:`2×(${L}+${W})`}=${r} ${isArea?"cm²":"cm"}.`,`${isArea?`${L}×${W}`:`2×(${L}+${W})`}=${r}`,[L,W,isArea?1:0]);}
 case "Ángulos":{const alpha=20+(seed%9)*5,beta=30+(seed*3%9)*5,r=180-alpha-beta;return output(`En un triángulo dos ángulos interiores miden ${alpha}° y ${beta}°. ¿Cuánto mide el tercero?`,q(r),q(alpha+beta),"Suma de los ángulos conocidos",`Los ángulos interiores suman 180°. El tercero mide 180°−(${alpha}°+${beta}°)=${r}°.`,`180−(${alpha}+${beta})=${r}`,[alpha,beta]);}
 case "Pitágoras":{const p=1+seed%12,x=3*p,y=4*p,z=5*p;return output(`Un triángulo rectángulo tiene catetos de ${x} cm y ${y} cm. ¿Cuánto mide su hipotenusa?`,q(z),q(x*x+y*y),"Suma de los cuadrados de los catetos",`Por Pitágoras, h²=${x}²+${y}²=${z*z}; la raíz cuadrada positiva es h=${z} cm.`,`h=√(${x}²+${y}²)=${z}`,[x,y]);}
 case "Sólidos: área y volumen":{const L=2+seed%9,W=3+(seed*2)%7,H=2+(seed*3)%6;const base=L*W,isVolume=seed%2===0,r=isVolume?base*H:2*(base+L*H+W*H);return output(`Una caja rectangular mide ${L} cm × ${W} cm × ${H} cm. ¿Cuál es su ${isVolume?"volumen (cm³)":"área total exterior (cm²)"}?`,q(r),q(base),"Área de la base",`${isVolume?"El volumen es base por altura.":"El área total suma dos veces las áreas de las tres parejas de caras."} Base=${L}×${W}=${base}. Resultado=${r} ${isVolume?"cm³":"cm²"}.`,`${isVolume?`${L}×${W}×${H}`:`2×(${L}×${W}+${L}×${H}+${W}×${H})`}=${r}`,[L,W,H,isVolume?1:0]);}
 case "Semejanza":{const orig=2+seed%10,scale=2+seed%6,other=3+(seed*5)%12,known=orig*scale;return output(`En figuras semejantes, un lado de ${orig} cm corresponde a uno de ${known} cm. ¿Cuánto mide el correspondiente a otro lado de ${other} cm?`,q(other*scale),q(scale),"Factor de escala",`El factor de escala es ${known}÷${orig}=${scale}; el segundo lado correspondiente mide ${other}×${scale}=${other*scale} cm.`,`(${known}/${orig})×${other}=${other*scale}`,[orig,known,other]);}
 case "Promedios":{const center=3+seed%27,d=2+seed%6;return output(`Calcula la media aritmética de ${center-d}, ${center} y ${center+d}.`,q(center),q(3*center),"Suma de los tres datos",`La suma es ${3*center}; al dividir entre tres datos, el promedio es ${center}.`,`(${center-d}+${center}+${center+d})/3=${center}`,[center-d,center,center+d]);}
 case "Probabilidad":{const red=1+seed%9,blue=2+(seed*3)%10,total=red+blue,r=q(red,total);return output(`Una bolsa tiene ${red} fichas rojas y ${blue} azules. Si se extrae una al azar, ¿cuál es la probabilidad de que sea roja? Expresa una fracción simplificada.`,r,q(total),"Cantidad total de fichas",`Hay ${total} resultados equiprobables y ${red} favorables. La probabilidad es ${red}/${total}=${fmt(r)}.`,`P(roja)=${red}/${total}=${fmt(r)}`,[red,blue]);}
 case "Dispersión de datos":{const min=1+seed%18,d=2+seed%9,max=min+d+2+seed%8;return output(`Los datos ordenados son ${min}, ${min+d}, ${max}. ¿Cuál es el rango?`,q(max-min),q(max),"Valor máximo del conjunto",`El rango es la diferencia entre el máximo ${max} y el mínimo ${min}: ${max}−${min}=${max-min}. No es el promedio.`,`${max}−${min}=${max-min}`,[min,min+d,max]);}
 case "Tablas y gráficas":{const mon=3+seed%20,tue=2+(seed*5)%19,wed=4+(seed*7)%17,rs=mon+tue+wed;return output(`Una tabla registra libros prestados: lunes ${mon}, martes ${tue}, miércoles ${wed}. ¿Cuál es el total de los tres días?`,q(rs),q(mon+tue),"Subtotal de lunes y martes",`Se leen los datos de la tabla y se suman las tres frecuencias: ${mon}+${tue}+${wed}=${rs} libros; no se confunde suma con promedio.`,`${mon}+${tue}+${wed}=${rs}`,[mon,tue,wed]);}
 default:throw new Error("Subtema sin modelo matemático M1: "+subtopic);
 }
}
const guideSubtopics=new Set(["Operaciones","Porcentajes","Proporciones","MCD y MCM","Ecuaciones cuadráticas","Inecuaciones","Patrones algebraicos","Áreas y perímetros","Ángulos","Pitágoras","Sólidos: área y volumen","Dispersión de datos","Tablas y gráficas"]);
export function mathModel(topic:string,subtopic:string,level:Level,mode:Mode,index:number):MathModel{
 const known=MATH_TOPICS.find(t=>t.name===topic)?.subtopics.includes(subtopic);
 if(!known||!MATH_MODES.includes(mode)||!MATH_LEVELS.includes(level)||!Number.isInteger(index)||index<0||index>=MATH_LEVEL_COUNT[level])throw Error("Solicitud fuera de contrato M1");
 const levelN=MATH_LEVELS.indexOf(level),modeN=MATH_MODES.indexOf(mode);
 const seed=1+index+levelN*43+modeN*137;
 const r=compute(subtopic,level,seed),solution=fmt(r.result),base=variants(r.result);
 const choices=choose(seed,base),step=choose(seed+1,variants(r.intermediate));
 const correctClaim={text:`La solución obtenida es ${solution}.`,truth:true};
 const falseClaims=[1,3].map(n=>({text:`La solución obtenida es ${base[n]}.`,truth:false}));
 const ordered=[correctClaim,...falseClaims],shift=seed%3;
 const assertions=[...ordered.slice(shift),...ordered.slice(0,shift)];
 const id="math-m1-"+[topic,subtopic,mode,level,index].map(v=>String(v).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")).join("-");
 return {id,topic,subtopic,level,mode,seed,prompt:r.question,expected:solution,explanation:r.reason,
  formula:r.formula,source:guideSubtopics.has(subtopic)?"GUIA-PRE-U-UNAH-2026:p6":"catalogo-practica-complementaria",
  oracle:{kind:r.kind,inputs:r.inputs,answer:r.result,intermediate:r.intermediate},
  options:choices.choices,answerIndex:choices.answerIndex,assertions,
  steps:[{label:r.interLabel,choices:step.choices,answerIndex:step.answerIndex},
   {label:"Resultado final",choices:choices.choices,answerIndex:choices.answerIndex}],
  family:"math-m1-"+subtopic,reviewStatus:"editorial-draft"};
}
export function mathPool(topic:string,subtopic:string,level:Level,mode:Mode):MathModel[]{
 return Array.from({length:MATH_LEVEL_COUNT[level]},(_,i)=>mathModel(topic,subtopic,level,mode,i));
}
export function mathTopic(subtopic:string){const topic=MATH_TOPICS.find(t=>t.subtopics.includes(subtopic));if(!topic)throw Error("Subtema matemático no registrado: "+subtopic);return topic.name}
export const MATH_M1_TOTAL=MATH_SUBTOPICS.length*MATH_MODES.length*(10+15+20);
