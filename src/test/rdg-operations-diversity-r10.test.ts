import {createHash} from "node:crypto";
import {it,expect} from "vitest";
import {mathM3R10Pool as mathM3Pool,mathM3R9Pool} from "@/lib/math-m3";
import {MATH_LEVELS,MATH_MODES,type MathModel} from "@/lib/math-m1";
import {verifyMathM3Record} from "@/lib/math-m3-guards";
const hash=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
function independent(x:MathModel){
 const n=(x.prompt.match(/\d+/g)??[]).map(Number);
 const add=(v:number,k:number)=>Array.from({length:k},()=>v).reduce((a,b)=>a+b,0);
 switch(x.oracle.inputs[4]){
 case 4:{const [a,b,c]=n;return [b-a-c,b-a];}
 case 5:{const [a,b,c]=n;const step=add(b,c);return [a+step,step];}
 case 6:{const [a,b,c,d]=n;const step=add(b,a);return [step-add(d,c),step];}
 case 7:{const [a,b,c,d,k]=n;const step=add(b,a)-add(d,c);expect(step%k).toBe(0);let count=0;for(let v=step;v>0;v-=k)count++;return [count,step];}
 case 8:{const [a,b,c,d,e,f,g,h]=n;return [add(b,a)-add(d,c)+add(f,e)-add(h,g),b-d];}
 case 9:{const [a,b,c,d,e,f]=n;return [add(b,a)-add(c,a)-add(e,d)-add(f,d),add(b,a)-add(c,a)];}
 default:throw Error("R10: familia no reconocida");
 }
}
it("R10 independently verifies 54 actual replacements, 324 distractors and 162 assertions; preserves 396 hashes",()=>{
 const records=[],prompts=new Set<string>(),families=new Set<string>(),inventory=[];
 for(const level of MATH_LEVELS)for(const mode of MATH_MODES){
  const before=mathM3R9Pool("Aritmética","Operaciones",level,mode),now=mathM3Pool("Aritmética","Operaciones",level,mode);
  expect(now.map(x=>x.id)).toEqual(before.map(x=>x.id));
  const counts:Record<string,number>={};
  for(const [i,x] of now.entries()){
   counts[x.operation??"UNKNOWN"]=(counts[x.operation??"UNKNOWN"]??0)+1;
   if(x.oracle.kind!=="Operaciones-diversidad"||x.oracle.inputs[4]<4){expect(hash(x)).toBe(hash(before[i]));continue;}
   expect(prompts.has(x.prompt)).toBe(false);prompts.add(x.prompt);families.add(x.operation!);
   const [key,step]=independent(x);
   expect(x.expected).toBe(String(key));expect(x.oracle.intermediate.n).toBe(step);
   expect(verifyMathM3Record(x,level)).toEqual([]);
   expect(x.steps[0].choices[x.steps[0].answerIndex]).toBe(String(step));
   expect(x.steps[1].choices[x.steps[1].answerIndex]).toBe(String(key));
   const distractors=x.steps.flatMap((s,j)=>s.choices.filter((_,k)=>k!==s.answerIndex).map(v=>({step:j+1,value:v,reason:j===0?x.stepOptionExplanations?.[v]:x.optionExplanations?.[v]})));
   expect(distractors).toHaveLength(6);expect(distractors.every(d=>Boolean(d.reason))).toBe(true);
   const assertions=x.assertions.map(a=>{const value=Number(a.text.match(/(-?\d+)\.$/)?.[1]);const correct=a.text.startsWith("El valor correcto del paso")?step:key;expect(a.truth).toBe(value===correct);expect(x.assertionExplanations?.[a.text]).toBeTruthy();return {...a,value,correct,oracle_truth:value===correct,reason:x.assertionExplanations?.[a.text]};});
   expect(verifyMathM3Record({...x,expected:String(key+1)},level)).toContain("clave-distinta-oraculo");
   expect(verifyMathM3Record({...x,options:[x.expected,x.expected,x.options[2],x.options[3]]},level)).toContain("seleccion-invalida");
   records.push({id:x.id,previous_sha256:hash(before[i]),content_sha256:hash(x),stimulus:x.prompt,expected:x.expected,intermediate:step,mode,level,family:x.operation,assertions,distractors,steps:x.steps,explanation:x.explanation,semantic_status:"REVIEW"});
  }
  expect(Object.keys(counts)).toHaveLength(level==="principiante"?4:5);
  inventory.push({level,mode,count:now.length,families:counts});
 }
 expect(records).toHaveLength(54);expect(families.size).toBe(6);expect(prompts.size).toBe(54);
 for(let i=0;i<records.length;i+=3)console.log("RDG_R10_REVISIONS "+JSON.stringify(records.slice(i,i+3)));
 console.log("RDG_R10_INVENTORY "+JSON.stringify(inventory));
});
