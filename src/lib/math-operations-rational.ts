import type {MathModel,Rational} from "./math-m1";
const gcd=(a:number,b:number):number=>b?gcd(b,a%b):Math.abs(a)||1;
const q=(n:number,d:number):Rational=>{const g=gcd(n,d);return {n:n/g,d:d/g};};
const fmt=(r:Rational)=>r.d===1?String(r.n):r.n+"/"+r.d;
const rotated=(values:string[],seed:number)=>{const k=seed%values.length;const choices=[...values.slice(k),...values.slice(0,k)];return {choices,answerIndex:choices.indexOf(values[0])};};
/** OP-04: a narrowly scoped corrective substitution of redundant M3 variants, not new IDs.
 * Use positive denominators and perfect-square radicands. Exact rational arithmetic;
 * the audit independently reconstructs the expression from the displayed operands.
 */
export function repairRationalOperation(base:MathModel,slot:number,modeIndex:number):MathModel{
 if(base.subtopic!=="Operaciones"||base.level==="principiante"||!Number.isInteger(slot)||slot<0||slot>2||!Number.isInteger(modeIndex)||modeIndex<0||modeIndex>2)throw Error("OP-04 fuera de alcance");
 const advanced=base.level==="avanzado";
 const p=3+slot,d=(advanced?37:17)+modeIndex*6+slot,n=2*p+1;
 const m=advanced?(slot===1?2*p+4*n-5:2*p+4*n+3+slot):(slot===1?p+1:p+n+2+slot);
 const denominator=advanced?2*d:d;
 const numerator=advanced?2*p+4*n-m:p+n-m;
 const root=fmt(q(p,d)),answer=q(numerator,denominator),expected=fmt(answer);
 const radical="√("+p*p+"/"+d*d+")";
 const expression=advanced?radical+" + 2 × ("+n+"/"+d+") − "+m+"/"+(2*d):radical+" + "+n+"/"+d+" − "+m+"/"+d;
 const errors=advanced?[
  {value:fmt(q(-2*p+4*n-m,denominator)),reason:"Se usó la raíz negativa; la raíz principal es "+root+"."},
  {value:fmt(q(2*p+2*n-m,denominator)),reason:"Se omitió el factor 2 que multiplica "+n+"/"+d+"."},
  {value:fmt(q(2*p+4*n,denominator)),reason:"Se omitió restar "+m+"/"+denominator+"."}
 ]:[
  {value:fmt(q(-p+n-m,d)),reason:"Se usó la raíz negativa; la raíz principal es "+root+"."},
  {value:fmt(q(numerator,3*d)),reason:"Se sumaron los denominadores pese a que representan la misma unidad."},
  {value:fmt(q(p+n,d)),reason:"Se omitió restar "+m+"/"+d+"."}
 ];
 const opts=rotated([expected,...errors.map(x=>x.value)],base.seed);
 if(new Set(opts.choices).size!==4)throw Error("OP-04 alternativas equivalentes");
 const steps=rotated([root,fmt(q(-p,d)),fmt(q(p+1,d)),fmt(q(p,d+1))],base.seed+1);
 const calculation=advanced?"("+2*p+" + "+4*n+" − "+m+")/"+denominator:"("+p+" + "+n+" − "+m+")/"+d;
 const explanation="La raíz principal es "+root+" porque su cuadrado es "+p*p+"/"+d*d+" y es positiva. "+(advanced?"Primero multiplica por 2 y expresa todo en unidades de 1/"+denominator+". ":"Los denominadores ya coinciden. ")+calculation+" = "+expected+".";
 const claims=[
  {text:"La raíz principal es "+root+" y la expresión equivale a "+calculation+".",truth:true},
  {text:"La raíz principal del radical es "+fmt(q(-p,d))+".",truth:false},
  {text:advanced?"Puede omitirse el factor 2 y conservar el resultado.":"Para sumar y restar las fracciones de igual denominador, deben sumarse también los tres denominadores.",truth:false}
 ];
 const shift=base.seed%3;
 return {...base,prompt:"Calcula "+expression+".",expected,explanation,formula:expression+" = "+calculation+" = "+expected,
  oracle:{kind:"Operaciones-racionales",inputs:[p,d,n,m,advanced?3:2],answer,intermediate:q(p,d)},
  options:opts.choices,answerIndex:opts.answerIndex,optionExplanations:Object.fromEntries(errors.map(x=>[x.value,x.reason])),
  assertions:[...claims.slice(shift),...claims.slice(0,shift)],
  steps:[{label:"Determina el valor exacto de la raíz principal",choices:steps.choices,answerIndex:steps.answerIndex},{label:"Combina las operaciones respetando precedencia y denominadores",choices:opts.choices,answerIndex:opts.answerIndex}],
  operation:advanced?"raiz-producto-racionales-combinados":"raiz-racionales-signos",
  requiredEvidence:advanced?["raiz-principal","prioridad-producto","denominador-comun","comprobar-signo-y-resultado"]:["raiz-principal","unidad-fraccionaria","combinar-signos"],
  modeOperation:base.mode==="clasificar"?"evaluar-equivalencias-racionales":base.mode==="quiz"?"resolver-operaciones-racionales":"construir-raiz-y-resultado"};
}
