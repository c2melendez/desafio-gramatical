import type {MathModel} from "./math-m1";
const designs:Readonly<Record<string,readonly [number,number,number,number]>>={
 "math-m2-aritmetica-operaciones-quiz-principiante-9":[42,7,31,14],
 "math-m2-aritmetica-operaciones-construir-principiante-8":[60,6,37,18],
};
export function repairOperationZeroR28Candidate(x:MathModel):MathModel{
 const data=designs[x.id];if(!data)return x;
 if(x.subtopic!=="Operaciones"||x.level!=="principiante"||x.operation!=="cero-dividido-por-no-cero"||x.mode==="clasificar"||x.oracle.kind!=="Operaciones-contraste")throw Error("R28 scope");
 const [a,b,c,d]=data,key=c-d,label="Calcula el numerador agrupado";
 const wrong:[[number,string],[number,string],[number,string]]=[[a/b+key,"Se omitió la resta del numerador."],[c+d,"Se sumaron los términos del segundo paréntesis."],[key+b,"Se confundió el divisor con un sumando."]];
 const mid:[[number,string],[number,string],[number,string]]=[[a,"Se omitió el segundo término."],[2*a,"Se sumaron los números iguales."],[-a,"Se omitió el primer término."]];
 const rotate=(v:string[],seed:number)=>{const k=((seed%4)+4)%4;const choices=[...v.slice(k),...v.slice(0,k)];return {choices,answerIndex:choices.indexOf(v[0])};};
 const final=rotate([String(key),...wrong.map(([v])=>String(v))],x.seed),first=rotate(["0",...mid.map(([v])=>String(v))],x.seed+1);
 if(new Set(final.choices).size!==4||new Set(first.choices).size!==4||[a,b,c,d].includes(key))throw Error("R28 visible key or duplicate");
 const explanation="Los números iguales se cancelan: "+a+"−"+a+"=0. Como "+b+" no es cero, 0÷"+b+"=0. El segundo paréntesis vale "+c+"−"+d+"="+key+". La suma de cero y "+key+" es "+key+".";
 const assertions=[{text:"El resultado solicitado es "+key+".",truth:true},{text:"El resultado solicitado es "+wrong[0][0]+".",truth:false},{text:"El valor correcto del paso «"+label+"» es "+mid[0][0]+".",truth:false}];
 return {...x,prompt:"Calcula ("+a+" − "+a+") ÷ "+b+" + ("+c+" − "+d+"). ¿Cuál es el resultado?",expected:String(key),formula:"0÷"+b+"+("+c+"−"+d+")="+key,explanation,oracle:{kind:"Operaciones-contraste",inputs:[a,b,c,d,0,7],answer:{n:key,d:1},intermediate:{n:0,d:1}},options:final.choices,answerIndex:final.answerIndex,optionExplanations:Object.fromEntries(wrong.map(([v,r])=>[String(v),r])),stepOptionExplanations:Object.fromEntries(mid.map(([v,r])=>[String(v),r])),steps:[{label,...first},{label:"Resultado final",...final}],assertions,assertionExplanations:Object.fromEntries(assertions.map((a,i)=>[a.text,i===0?explanation:i===1?wrong[0][1]+" El resultado correcto es "+key+".":mid[0][1]+" El numerador correcto es 0."])),requiredEvidence:["cancelar-iguales","dividir-cero-por-no-cero","evaluar-segundo-parentesis","sumar"]};
}
