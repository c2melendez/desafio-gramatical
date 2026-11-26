import {createHash} from "node:crypto";
import {it,expect} from "vitest";
import {mathM3Pool,mathM3R11Pool} from "@/lib/math-m3";
import {MATH_LEVELS,MATH_MODES,type MathModel} from "@/lib/math-m1";
import {verifyMathM3Record} from "@/lib/math-m3-guards";
const hash=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
const mul=(a:number,b:number)=>Array.from({length:b},()=>a).reduce((x,y)=>x+y,0);
function visible(x:MathModel){
 const n=(x.prompt.match(/\d+/g)??[]).map(Number);
 const [a,b,c,d,e]=n;
 switch(x.operation){
 case "resta-de-entero-negativo":return {key:a+b-c,step:a+b,wrong:[a-b-c,a+b+c,a+b],mid:[a-b,-a+b,a]};
 case "cociente-con-agrupacion":{let q=0;for(let v=a;v>0;v-=b+c)q++;expect(q*(b+c)).toBe(a);return {key:q,step:b+c,wrong:[a/b+c,q+c,a-b-c],mid:[mul(b,c),b,c]};}
 case "presupuesto-dos-compras":return {key:a-mul(c,b)-d,step:mul(c,b),wrong:[a-mul(c,b)+d,a-b-c-d,a-mul(c,b)],mid:[b+c,b,c]};
 case "reconstruir-inventario-inicial":{let k=a+d;for(let i=0;i<b;i++)k-=c;return {key:k,step:mul(c,b),wrong:[a+mul(c,b)-d,a-mul(c,b)-d,a-b-c+d],mid:[b+c,b,c]};}
 case "factor-comun-diferencia-compuesta":{const [p,q,u,v,w]=n;expect(p).toBe(u);expect(q).toBe(w);const step=u-v;return {key:mul(p,q)-mul(step,w),step,wrong:[mul(p,q)-step,mul(p+v,q),mul(p,q)+mul(step,w)],mid:[u+v,u,v]};}
 case "resta-anidada-distributiva":{const t=d-e;return {key:a-(b-mul(t,c)),step:t,wrong:[a-b-mul(t,c),a-b+mul(d,c)-e,a+b-mul(t,c)],mid:[d+e,d,e]};}
 default:throw Error("unknown visible R12 family");
 }
}
it("R12: 54 replacements; 396 preserved hashes, 324 distractors, 162 assertions; independent visible oracle",()=>{
 const revised=[],prompts=new Set<string>(),counts=new Map<string,number>();
 for(const level of MATH_LEVELS)for(const mode of MATH_MODES){
 const before=mathM3R11Pool("Aritmética","Operaciones",level,mode),now=mathM3Pool("Aritmética","Operaciones",level,mode);
 expect(now.map(x=>x.id)).toEqual(before.map(x=>x.id));
 for(const [i,x] of now.entries()){
 if(x.oracle.kind!=="Operaciones-transferencia"){expect(hash(x)).toBe(hash(before[i]));continue;}
 expect(before[i].oracle.kind).toBe("Operaciones");expect(x.id.startsWith("math-m2-")).toBe(true);
 const o=visible(x);expect(prompts.has(x.prompt)).toBe(false);prompts.add(x.prompt);
 expect(x.expected).toBe(String(o.key));expect(x.oracle.intermediate.n).toBe(o.step);expect(verifyMathM3Record(x,level)).toEqual([]);
 expect(x.options.filter((_,j)=>j!==x.answerIndex).map(Number).sort((a,b)=>a-b)).toEqual(o.wrong.sort((a,b)=>a-b));
 expect(x.steps[0].choices.filter((_,j)=>j!==x.steps[0].answerIndex).map(Number).sort((a,b)=>a-b)).toEqual(o.mid.sort((a,b)=>a-b));
 expect(x.steps[0].choices[x.steps[0].answerIndex]).toBe(String(o.step));expect(x.steps[1].choices[x.steps[1].answerIndex]).toBe(String(o.key));
 for(const v of o.wrong)expect(x.optionExplanations?.[String(v)]).toBeTruthy();
 for(const v of o.mid)expect(x.stepOptionExplanations?.[String(v)]).toBeTruthy();
 for(const a of x.assertions){const v=Number(a.text.match(/(-?\d+)\.$/)?.[1]);expect(a.truth).toBe(v===(a.text.startsWith("El valor correcto del paso")?o.step:o.key));expect(x.assertionExplanations?.[a.text]).toBeTruthy();}
 expect(verifyMathM3Record({...x,expected:String(o.key+1)},level)).toContain("clave-distinta-oraculo");
 counts.set(x.operation!,1+(counts.get(x.operation!)??0));
 revised.push({id:x.id,previous_sha256:hash(before[i]),content_sha256:hash(x),objective_ids:[level==="principiante"?"OP-01":level==="intermedio"?"OP-02":"OP-03"],level,mode,stimulus:x.prompt,expected:x.expected,intermediate:o.step,family:x.operation,steps:x.steps,assertions:x.assertions,explanation:x.explanation,optionExplanations:x.optionExplanations,stepOptionExplanations:x.stepOptionExplanations,assertionExplanations:x.assertionExplanations,semantic_status:"REVIEW"});
 }}
 expect(revised).toHaveLength(54);expect(counts.size).toBe(6);expect([...counts.values()]).toEqual([9,9,9,9,9,9]);
 for(let i=0;i<revised.length;i+=3)console.log("RDG_R12_REVISIONS "+JSON.stringify(revised.slice(i,i+3)));
});
