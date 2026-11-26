import {createHash} from "node:crypto";
import {it,expect} from "vitest";
import {mathM3R13Pool as mathM3Pool,mathM3R12Pool} from "@/lib/math-m3";
import {MATH_LEVELS,MATH_MODES,type MathModel} from "@/lib/math-m1";
import {verifyMathM3Record} from "@/lib/math-m3-guards";
const hash=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
function visible(x:MathModel){
 const n=(x.prompt.match(/\d+/g)??[]).map(Number),[a,b,c,d,e]=n;
 switch(x.operation){
 case "producto-negativo-y-suma":return {key:c-a*b,step:-a*b,wrong:[a*b+c,-a*(b+c),-a*b-c],mid:[a*b,-a-b,-a]};
 case "cero-dividido-por-no-cero":expect(a).toBe(b);expect(d).not.toBeNaN();expect(c).toBeGreaterThan(0);return {key:(a-b)/c+d,step:a-b,wrong:[a/c+d,a-c+d,d+c],mid:[a,a+b,-b]};
 case "comparar-cambios-compensados":{const step=a+b,k=(step+d)*(c-e)-step*c;return {key:k,step,wrong:[-k,d*c,d-e],mid:[step+d,a-b,a]};}
 case "reconstruir-cantidad-por-grupo":{const step=b+c,k=step/a;expect(k*a-b).toBe(c);return {key:k,step,wrong:[k-b,step,k+a],mid:[c-b,c,step+a]};}
 case "cancelacion-cruzada-de-productos":{const [p,q,u,v,w,z]=n;expect(p).toBe(w);expect(q).toBe(v);const step=v*z,k=p*(q-u)-v*(w-z);return {key:k,step,wrong:[step+p*u,-step-p*u,-k],mid:[v+z,v,z]};}
 case "dos-raices-en-producto-agrupado":{const p=Math.sqrt(a),q=Math.sqrt(d),t=p-b;expect(Number.isInteger(p)&&Number.isInteger(q)).toBe(true);return {key:t*(c+q)-e,step:t,wrong:[(p+b)*(c+q)-e,t*(c-q)-e,t*(c+q)+e],mid:[p+b,-p-b,a-b]};}
 default:throw Error("familia R13");
 }
}
it("R13: 48 successors, 402 preserved, 288 distractors, 144 assertions; actual inventory before and after",()=>{
 const revised=[],stimuli=new Set<string>(),counts=new Map<string,number>();let beforeDominant=0,afterDominant=0;
 const inventory=[];for(const level of MATH_LEVELS)for(const mode of MATH_MODES){
 const before=mathM3R12Pool("Aritmética","Operaciones",level,mode),now=mathM3Pool("Aritmética","Operaciones",level,mode);
 const dominant=level==="principiante"?"prioridad-de-operaciones":level==="intermedio"?"modificar-parentesis-y-factor":"distributiva-y-cancelacion";
 beforeDominant+=before.filter(x=>x.operation===dominant).length;afterDominant+=now.filter(x=>x.operation===dominant).length;
 const families=Object.fromEntries([...new Set(now.map(x=>x.operation!))].map(op=>[op,now.filter(x=>x.operation===op).length]));inventory.push({level,mode,count:now.length,families});
 expect(now.map(x=>x.id)).toEqual(before.map(x=>x.id));
 for(const [i,x] of now.entries()){
 if(x.oracle.kind!=="Operaciones-contraste"){expect(hash(x)).toBe(hash(before[i]));continue;}
 expect(before[i].oracle.kind).toBe("Operaciones");
 const o=visible(x);expect(stimuli.has(x.prompt)).toBe(false);stimuli.add(x.prompt);
 expect(x.expected).toBe(String(o.key));expect(x.oracle.intermediate.n).toBe(o.step);expect(verifyMathM3Record(x,level)).toEqual([]);
 expect(x.options.filter((_,j)=>j!==x.answerIndex).map(Number).sort((a,b)=>a-b)).toEqual(o.wrong.sort((a,b)=>a-b));
 expect(x.steps[0].choices.filter((_,j)=>j!==x.steps[0].answerIndex).map(Number).sort((a,b)=>a-b)).toEqual(o.mid.sort((a,b)=>a-b));
 expect(x.steps[0].choices[x.steps[0].answerIndex]).toBe(String(o.step));expect(x.steps[1].choices[x.steps[1].answerIndex]).toBe(String(o.key));
 for(const v of o.wrong)expect(x.optionExplanations?.[String(v)]).toBeTruthy();for(const v of o.mid)expect(x.stepOptionExplanations?.[String(v)]).toBeTruthy();
 for(const a of x.assertions){const v=Number(a.text.match(/(-?\d+)\.$/)?.[1]);expect(a.truth).toBe(v===(a.text.startsWith("El valor correcto del paso")?o.step:o.key));expect(x.assertionExplanations?.[a.text]).toBeTruthy();}
 expect(verifyMathM3Record({...x,expected:String(o.key+1)},level)).toContain("clave-distinta-oraculo");
 counts.set(x.operation!,1+(counts.get(x.operation!)??0));
 revised.push({id:x.id,previous_sha256:hash(before[i]),content_sha256:hash(x),objective_ids:[level==="principiante"?"OP-01":level==="intermedio"?"OP-02":x.operation==="dos-raices-en-producto-agrupado"?"OP-04":"OP-03"],level,mode,stimulus:x.prompt,expected:x.expected,intermediate:o.step,family:x.operation,steps:x.steps,assertions:x.assertions,explanation:x.explanation,optionExplanations:x.optionExplanations,stepOptionExplanations:x.stepOptionExplanations,assertionExplanations:x.assertionExplanations,semantic_status:"REVIEW"});
 }}
 expect(revised).toHaveLength(48);expect(counts.size).toBe(6);expect(beforeDominant).toBe(279);expect(afterDominant).toBe(231);
 console.log("RDG_R13_INVENTORY "+JSON.stringify({beforeDominant,afterDominant,inventory}));
 for(let i=0;i<revised.length;i+=3)console.log("RDG_R13_REVISIONS "+JSON.stringify(revised.slice(i,i+3)));
});
