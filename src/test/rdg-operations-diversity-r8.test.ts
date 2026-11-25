import {createHash} from "node:crypto";
import {it,expect} from "vitest";
import {mathM3Pool,mathM3R6Pool} from "@/lib/math-m3";
import {MATH_LEVELS,MATH_MODES,type MathModel} from "@/lib/math-m1";
import {verifyMathM3Record} from "@/lib/math-m3-guards";
const hash=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
function independent(item:MathModel){
 const n=(item.prompt.match(/\d+/g)??[]).map(Number);
 if(item.level==="principiante"){
  const [a,b,c,d]=n;let q=0;for(let x=a;x>0;x-=b)q++;
  return [Array.from({length:c},()=>q).reduce((s,v)=>s+v,0)-d,q];
 }
 if(item.level==="intermedio"){
  const [a,b,c,d]=n;
  return [Array.from({length:a-c},()=>b+d).reduce((s,v)=>s+v,0),a-c];
 }
 const [c,a,b,k,j]=n;
 return [Array.from({length:c},()=>a-b).reduce((s,v)=>s+v,0)-Array.from({length:k},()=>j).reduce((s,v)=>s+v,0),b];
}
it("R8 verifies nine genuinely distinct-family replacements, visible-prompt oracle, six unique alternatives and unaffected 441 records",()=>{
 const revisions=[];
 for(const level of MATH_LEVELS)for(const mode of MATH_MODES){
  const old=mathM3R6Pool("Aritmética","Operaciones",level,mode),now=mathM3Pool("Aritmética","Operaciones",level,mode);
  expect(now.map(x=>x.id)).toEqual(old.map(x=>x.id));
  for(const [i,x] of now.entries()){
   if(x.oracle.kind!=="Operaciones-diversidad"){expect(hash(x)).toBe(hash(old[i]));continue;}
   expect(mode).toBe("quiz");
   expect(x.operation).not.toBe(old[i].operation);
   const [answer,step]=independent(x);
   expect(x.expected).toBe(String(answer));expect(x.oracle.intermediate.n).toBe(step);
   expect(x.options[x.answerIndex]).toBe(String(answer));
   expect(x.steps[0].choices[x.steps[0].answerIndex]).toBe(String(step));
   expect(verifyMathM3Record(x,level)).toEqual([]);
   expect(Object.keys(x.optionExplanations??{})).toHaveLength(3);
   expect(x.options.filter(v=>v!==String(answer)).every(v=>Boolean(x.optionExplanations?.[v]))).toBe(true);
   expect(verifyMathM3Record({...x,expected:String(answer+1)},level)).toContain("clave-distinta-oraculo");
   revisions.push({id:x.id,previous_sha256:hash(old[i]),content_sha256:hash(x),stimulus:x.prompt,expected:x.expected,intermediate:step,options:x.options,distractors:x.optionExplanations,family:x.operation,semantic_status:"REVIEW"});
  }
 }
 expect(revisions).toHaveLength(9);
 expect(new Set(revisions.map(x=>x.family)).size).toBe(3);
 console.log("RDG_R8_REVISIONS "+JSON.stringify(revisions));
});
