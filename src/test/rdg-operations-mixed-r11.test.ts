import {createHash} from "node:crypto";
import {it,expect} from "vitest";
import {mathM3R11Pool as mathM3Pool,mathM3R10Pool} from "@/lib/math-m3";
import {MATH_LEVELS,MATH_MODES,type MathModel} from "@/lib/math-m1";
import {verifyMathM3Record} from "@/lib/math-m3-guards";
const hash=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
const sum=(n:number,k:number)=>Array.from({length:k},()=>n).reduce((a,b)=>a+b,0);
function visibleOracle(x:MathModel){
 const n=(x.prompt.match(/\d+/g)??[]).map(Number);
 if(x.level==="intermedio"){
  const [r,a,b,c]=n;const root=Math.sqrt(r);expect(Number.isInteger(root)).toBe(true);
  return {key:root+sum(a,b)-c,step:root,wrong:[-root+sum(a,b)-c,root+a+b-c,root+sum(a,b)+c],middle:[-root,r,root+1]};
 }
 const [a,r,b,c,d,e]=n,root=Math.sqrt(r),step=sum(root,b);
 expect(Number.isInteger(root)).toBe(true);expect((c-d)%e).toBe(0);
 let q=0;for(let v=c-d;v>0;v-=e)q++;
 return {key:a-step+q,step,wrong:[a+step+q,sum(a-root,b)+q,a-step+c-d],middle:[-step,root+b,root]};
}
it("R11: 18 OP-04 successors, 432 preserved hashes; visible independent oracles, 108 distractors and 54 claims",()=>{
 const changed=[],prompts=new Set<string>();
 for(const level of MATH_LEVELS)for(const mode of MATH_MODES){
  const before=mathM3R10Pool("Aritmética","Operaciones",level,mode),now=mathM3Pool("Aritmética","Operaciones",level,mode);
  expect(now.map(x=>x.id)).toEqual(before.map(x=>x.id));
  for(const [i,x] of now.entries()){
   if(x.oracle.kind!=="Operaciones-mixtas"){expect(hash(x)).toBe(hash(before[i]));continue;}
   const o=visibleOracle(x);expect(prompts.has(x.prompt)).toBe(false);prompts.add(x.prompt);
   expect(x.expected).toBe(String(o.key));expect(x.oracle.intermediate.n).toBe(o.step);
   expect(verifyMathM3Record(x,level)).toEqual([]);
   expect(x.options.filter((_,j)=>j!==x.answerIndex).map(Number).sort((a,b)=>a-b)).toEqual(o.wrong.sort((a,b)=>a-b));
   expect(x.steps[0].choices.filter((_,j)=>j!==x.steps[0].answerIndex).map(Number).sort((a,b)=>a-b)).toEqual(o.middle.sort((a,b)=>a-b));
   expect(x.steps[0].choices[x.steps[0].answerIndex]).toBe(String(o.step));
   expect(x.steps[1].choices[x.steps[1].answerIndex]).toBe(String(o.key));
   for(const v of o.wrong)expect(x.optionExplanations?.[String(v)]).toBeTruthy();
   for(const v of o.middle)expect(x.stepOptionExplanations?.[String(v)]).toBeTruthy();
   for(const a of x.assertions){const value=Number(a.text.match(/(-?\d+)\.$/)?.[1]);expect(a.truth).toBe(value===(a.text.startsWith("El valor correcto del paso")?o.step:o.key));expect(x.assertionExplanations?.[a.text]).toBeTruthy();}
   expect(verifyMathM3Record({...x,expected:String(o.key+1)},level)).toContain("clave-distinta-oraculo");
   expect(verifyMathM3Record({...x,options:[x.expected,x.expected,x.options[2],x.options[3]]},level)).toContain("seleccion-invalida");
   changed.push({id:x.id,previous_sha256:hash(before[i]),content_sha256:hash(x),objective_ids:["OP-04"],level,mode,stimulus:x.prompt,expected:x.expected,intermediate:o.step,family:x.operation,steps:x.steps,assertions:x.assertions,explanation:x.explanation,semantic_status:"REVIEW"});
  }
 }
 expect(changed).toHaveLength(18);expect(prompts.size).toBe(18);
 for(let i=0;i<changed.length;i+=3)console.log("RDG_R11_REVISIONS "+JSON.stringify(changed.slice(i,i+3)));
});
