import type {MathModel} from "./math-m1";
const gcd=(a:number,b:number):number=>b?gcd(b,a%b):Math.abs(a)||1;
const fmt=(n:number,d:number)=>{const g=gcd(n,d);return d/g===1?String(n/g):n/g+"/"+d/g;};
const masks=[[true,false,true],[false,true,false],[true,true,false],[false,true,true],[true,false,false],[false,false,true]] as const;
export function repairOperationRationalClassificationR17(item:MathModel):MathModel{
 if(item.subtopic!=="Operaciones"||item.mode!=="clasificar"||item.oracle.kind!=="Operaciones-racionales")return item;
 const [p,d,n,m]=item.oracle.inputs,advanced=item.level==="avanzado",k=advanced?2:1,den=advanced?2*d:d,rn=p*(den/d),prod=k*n*(den/d);
 const slot=Number(item.id.split("-").at(-1))-(advanced?22:12);
 if(slot<0||slot>2)throw Error("R17 slot "+item.id);
 const mask=masks[slot+(advanced?3:0)],root=fmt(p,d),answer=fmt(rn+prod-m,den);
 const propositions=[
  {label:"La raíz principal del radical es ",correct:root,incorrect:fmt(-p,d),reason:`La raíz principal es ${root}, no negativa; su cuadrado es el radicando.`},
  {label:"El término central, expresado en unidades de 1/"+den+", tiene numerador ",correct:String(prod),incorrect:String(prod+den/d),reason:`El término central vale ${k} × ${n}/${d} = ${prod}/${den}; se conserva su valor al cambiar de unidad.`},
  {label:"El resultado de la expresión completa es ",correct:answer,incorrect:fmt(rn+prod,den),reason:`En unidades de 1/${den}: (${rn} + ${prod} − ${m})/${den} = ${answer}.`}
 ];
 const claims=propositions.map((x,i)=>({text:x.label+(mask[i]?x.correct:x.incorrect)+".",truth:mask[i]}));
 const shift=item.seed%3,assertions=[...claims.slice(shift),...claims.slice(0,shift)];
 return {...item,assertions,assertionExplanations:Object.fromEntries(claims.map((x,i)=>[x.text,propositions[i].reason])),modeOperation:"evaluar-tres-decisiones-racionales-r17"};
}
