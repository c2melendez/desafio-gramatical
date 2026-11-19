import type {Level} from "./grammar";
import type {CognitiveChallenge} from "./math-cognitive-progression";
import type {ExtendedGraph,ExtendedSkill} from "./function-graph-advanced";

/** Each level assesses a different operation on the SAME drawn source function f.
 * g is described by the prompt, never misrepresented as a plotted curve. */
const fmt=(v:number)=>String(Number(v.toFixed(2)));
const point=(x:number,y:number)=>`(${fmt(x)}, ${fmt(y)})`;
const interval=(a:number,b:number)=>`[${fmt(a)}, ${fmt(b)}]`;
export function advancedFunctionChallenge(g:ExtendedGraph,skill:ExtendedSkill,level:Level):CognitiveChallenge|null{
 if(level==="principiante")return null;
 const hard=level==="avanzado",stage:2|3=hard?3:2;
 const requiredEvidence=hard?
  ["leer-grafica","interpretar-condicion","combinar-transformaciones","comprobar-resultado"]:
  ["leer-grafica","aplicar-regla","inferir-propiedad"];
 let operation="",prompt="",answer="",explanation="",wrong:string[]=[];
 if(g.kind==="quadratic"){
  const {h,k,a,radius}=g,end=k+a*radius*radius;
  if(skill==="vertex"){
   operation=hard?"vertice-reflexion-traslacion":"vertice-traslacion";
   prompt=hard?"Si g(x)=3−f(x−2), ¿cuál es el vértice de g?":"Si g(x)=f(x−2), ¿cuál es el vértice de g?";
   answer=hard?point(h+2,3-k):point(h+2,k);
   explanation=`El vértice de f es ${point(h,k)}. Se aplica el desplazamiento horizontal de 2 unidades${hard?" y la reflexión vertical con traslación de 3 unidades":""}. Vértice de g: ${answer}.`;
   wrong=[point(h,k),point(h-2,k),point(h+2,k),point(h+2,3-k)];
  }
  if(skill==="quadratic-range"){
   operation=hard?"rango-reflexion-y-escala":"rango-traslacion";
   prompt=hard?"Si g(x)=3−2f(x), ¿cuál es el rango de g sobre el dominio dibujado?":"Si g(x)=f(x)+2, ¿cuál es el rango de g sobre el dominio dibujado?";
   answer=hard?interval(3-2*Math.max(k,end),3-2*Math.min(k,end)):interval(Math.min(k,end)+2,Math.max(k,end)+2);
   explanation=`El rango de f tiene extremos ${fmt(Math.min(k,end))} y ${fmt(Math.max(k,end))}. La transformación ${hard?"invierte y duplica las alturas y luego suma 3":"suma 2 a cada altura"}: ${answer}.`;
   wrong=[interval(Math.min(k,end),Math.max(k,end)),interval(Math.min(k,end)+2,Math.max(k,end)+2),interval(3-2*Math.min(k,end),3-2*Math.max(k,end)),interval(-end,-k)];
  }
  if(skill==="quadratic-roots"){
   operation=hard?"raices-cambio-escala-horizontal":"raices-traslacion";
   prompt=hard?"Para g(x)=−3f(2x−2), ¿cuáles son sus dos intersecciones con el eje X?":"Para g(x)=f(x−2), ¿cuáles son sus dos intersecciones con el eje X?";
   const roots=hard?[(h-2+2)/2,(h+2+2)/2]:[h, h+4];
   answer=`${point(roots[0],0)} y ${point(roots[1],0)}`;
   explanation=`Las raíces de f son ${fmt(h-2)} y ${fmt(h+2)}. ${hard?"El factor −3 no las modifica; se resuelve 2x−2 igual a cada raíz":"Se traslada cada raíz 2 unidades a la derecha"}. Resultado: ${answer}.`;
   wrong=[`${point(h-2,0)} y ${point(h+2,0)}`,`${point(h,0)} y ${point(h+4,0)}`,`${point((h-2)/2,0)} y ${point((h+2)/2,0)}`,`${point(h-1,0)} y ${point(h+1,0)}`];
  }
  if(skill==="quadratic-growth"){
   operation=hard?"monotonia-reflexion-afin":"monotonia-traslacion";
   prompt=hard?"Si g(x)=−f(2x−2), ¿en qué intervalo de su dominio es estrictamente creciente g?":"Si g(x)=f(x−2), ¿en qué intervalo de su dominio es estrictamente creciente g?";
   const increasing=hard?a<0:a>0;
   const from=increasing?h:h-radius,to=increasing?h+radius:h;
   const transform=(v:number)=>hard?(v+2)/2:v+2;
   answer=interval(transform(from),transform(to));
   explanation=`f abre hacia ${a>0?"arriba":"abajo"}; ${hard?"la reflexión invierte la monotonía y la transformación 2x−2 modifica los extremos":"la traslación horizontal conserva la monotonía"}. Intervalo: ${answer}.`;
   wrong=[interval(h-radius,h),interval(h,h+radius),interval(h-radius+2,h+2),interval((h+2)/2,(h+radius+2)/2)];
  }
 }else{
  const {leftIntercept:p,rightIntercept:q}=g;
  if(skill==="jump-value"){
   operation=hard?"valor-composicion-afin":"valor-traslacion";
   prompt=hard?"Para g(x)=3−2f(x), ¿cuánto vale g(0)?":"Para g(x)=f(x)+2, ¿cuánto vale g(0)?";
   answer=fmt(hard?3-2*q:q+2);
   explanation=`El círculo lleno representa f(0)=${q}. Por tanto g(0)=${hard?"3−2("+q+")":"("+q+")+2"}=${answer}.`;
   wrong=[fmt(p),fmt(q),fmt(q+2),fmt(3-2*p)];
  }
  if(skill==="jump-left-limit"){
   operation=hard?"limite-transformacion-compuesta":"limite-traslacion";
   prompt=hard?"Si g(x)=3−2f(x), ¿cuál es el límite de g cuando x se acerca a 0 por la izquierda?":"Si g(x)=f(x)+2, ¿cuál es el límite de g cuando x se acerca a 0 por la izquierda?";
   answer=fmt(hard?3-2*p:p+2);
   explanation=`Por la izquierda, f se aproxima a ${p}, el círculo abierto. Se transforma ese límite, no el valor f(0)=${q}; resultado: ${answer}.`;
   wrong=[fmt(q),fmt(p),fmt(p+2),fmt(3-2*q)];
  }
  if(skill==="jump-continuity"){
   operation=hard?"reparar-salto-con-escala":"reparar-salto";
   prompt=hard?"Define g(x)=2f(x) si x<0 y g(x)=f(x)+c si x≥0. ¿Qué valor de c hace continua g en 0?":"Define g(x)=f(x) si x<0 y g(x)=f(x)+c si x≥0. ¿Qué valor de c hace continua g en 0?";
   answer=fmt((hard?2*p:p)-q);
   explanation=`El límite izquierdo de g es ${hard?"2×":""}${p}; el valor derecho en 0 es ${q}+c. Igualar ambas expresiones da c=${answer}.`;
   wrong=[fmt(q-p),fmt(p-q),fmt(2*p-q),fmt(p+q)];
  }
  if(skill==="jump-range"){
   operation=hard?"amplitud-con-modificacion-de-rama":"amplitud-de-union-de-tramos";
   prompt=hard?"Se construye g sumando 4 a la rama x≥0 de f y conservando la rama x<0. ¿Cuál es la amplitud total (supremo menos ínfimo) de los valores de g?":"¿Cuál es la amplitud total (supremo menos ínfimo) del conjunto de valores representados por f?";
   const lo=Math.min(p-4,q+(hard?4:0)),hi=Math.max(p,q+4+(hard?4:0));
   answer=fmt(hi-lo);
   explanation=`La rama izquierda recorre desde ${p-4} hasta ${p} (extremo superior abierto), y la derecha desde ${q+(hard?4:0)} hasta ${q+4+(hard?4:0)}. La amplitud es supremo − ínfimo = ${answer}.`;
   wrong=[fmt((q+4)-q),fmt(p-(p-4)),fmt(Math.abs(p-q)),fmt(Math.max(p,q+4)-Math.min(p-4,q))];
  }
 }
 if(!operation)throw Error("Habilidad incompatible: "+skill);
 for(let k=1;k<15;k++){
  if(skill==="quadratic-roots")wrong.push(`${point(15+k,0)} y ${point(17+k,0)}`);
  else if(skill==="vertex")wrong.push(point(20+k,25+k));
  else if(skill==="quadratic-range"||skill==="quadratic-growth")wrong.push(interval(-20-k,20+k));
  else wrong.push(fmt(30+k));
 }
 const distractors=[...new Set(wrong.filter(x=>x!==answer))].slice(0,3);
 if(distractors.length!==3)throw Error("Alternativas insuficientes: "+skill);
 return {stage,operation,requiredEvidence,prompt,answer,distractors,explanation};
}
