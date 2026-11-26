import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import {expect,it} from "vitest";
import {mathM3Pool} from "@/lib/math-m3";
import {MATH_LEVELS,MATH_MODES,type MathModel} from "@/lib/math-m1";
import {buildR23Classification,repairOperationR23Candidate,r23TruthMask} from "@/lib/math-operations-r23-candidate";
const hash=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
const review=JSON.parse(readFileSync("qa/certification/rdg/evidence/MAT-ARIT-01-v79-R15-current-review.json","utf8"));
const pass=JSON.parse(readFileSync("qa/certification/rdg/evidence/MAT-ARIT-01-v79-R15-pass.json","utf8"));
const targets=new Set<string>([...review.records.filter((x:{modalidad:string})=>x.modalidad==="clasificar").map((x:{id:string})=>x.id),...pass.records.filter((x:{semantic_status:string})=>x.semantic_status!=="PASS_SEMANTIC").map((x:{id:string})=>x.id)]);
const reduce=(n:number,d:number)=>{let a=Math.abs(n),b=d;while(b){const t=a%b;a=b;b=t;}const g=a||1;return d/g===1?String(n/g):n/g+"/"+d/g;};
function oracle(x:MathModel){
 const n=x.prompt.match(/\d+/g)?.map(Number)??[];
 let key:string,step:string,aux:string;
 if(x.operation==="comparar-ofertas-con-cargos-fijos"){
  const [count,p,f,v,h]=n;const A=Array.from({length:count},()=>p).reduce((a,b)=>a+b,f),B=Array.from({length:count},()=>v).reduce((a,b)=>a+b,h);
  key=String(B-A);step=String(A);aux=String(h-f);
 }else{
  const [r,s,c,d,k]=n,ra=Math.sqrt(r),rb=Math.sqrt(s);
  if(!Number.isInteger(ra)||!Number.isInteger(rb)||d===0||k===0)throw Error("domain");
  const numerator=ra*d-c*rb,denominator=rb*d;
  key=reduce(numerator,denominator*k);step=reduce(numerator,denominator);aux=reduce(ra,rb);
 }
 if(key!==x.expected||key!==x.options[x.answerIndex]||step!==x.steps[0].choices[x.steps[0].answerIndex])throw Error("key/step");
 if(new Set([key,step,aux]).size!==3)throw Error("correct target collision");
 const ds=x.assertions.map(q=>{
  const n=q.text.match(/(-?\d+(?:\/\d+)?)\.$/);if(!n)throw Error("claim");
  const kind=q.text.startsWith("El resultado solicitado")?"key":q.text.startsWith("El valor correcto del paso")?"step":"aux";
  const correct=kind==="key"?key:kind==="step"?step:aux;
  const reason=x.assertionExplanations?.[q.text];
  if(x.mode==="clasificar"&&((n[1]===correct)!==q.truth||!reason?.includes(correct)))throw Error("truth/feedback");
  return {kind,given:n[1],correct,truth:q.truth,reason};
 });
 if(x.mode==="clasificar"&&new Set(ds.map(d=>d.given)).size!==3)throw Error("displayed collision");
 return {key,step,aux,ds};
}
it("R23: 8 affected R15 IDs; 48 classification masks; full-bank tuples and 10 historical PASS preserved",()=>{
 const live=MATH_LEVELS.flatMap(l=>MATH_MODES.flatMap(m=>mathM3Pool("Aritmética","Operaciones",l,m)));
 const candidate=live.map(repairOperationR23Candidate);let changed=0,preserved=0,variants=0,mutants=0;
 expect(targets.size).toBe(8);expect(live).toHaveLength(450);
 for(let i=0;i<live.length;i++){
  const old=live[i],x=candidate[i];
  if(!targets.has(old.id)){expect(hash(x)).toBe(hash(old));preserved++;continue;}
  expect(hash(x)).not.toBe(hash(old));expect(x.id).toBe(old.id);expect(x.operation).toBe(old.operation);const o=oracle(x);
  const tuple=(z:MathModel)=>z.operation+"|"+z.expected+"|"+z.steps[0].choices[z.steps[0].answerIndex];
  const signals=candidate.filter(z=>z.id!==x.id&&(z.prompt===x.prompt||tuple(z)===tuple(x))).map(z=>z.id);expect(signals).toEqual([]);
  if(x.mode==="clasificar"){
   expect(x.prompt).toBe(old.prompt);expect(x.expected).toBe(old.expected);
   for(let k=0;k<8;k++){const v=buildR23Classification(old,k),d=oracle(v).ds;const mask=["key","step","aux"].map(q=>Number(d.find(z=>z.kind===q)!.truth)).join("");expect(parseInt(mask,2)).toBe(k);variants++;}
   for(let j=0;j<3;j++){expect(()=>oracle({...x,assertions:x.assertions.map((q,k)=>k===j?{...q,truth:!q.truth}:q)})).toThrow();mutants++;}
  }else{
   expect(x.prompt).not.toBe(old.prompt);expect(()=>oracle({...x,expected:"999"})).toThrow();mutants++;
   expect(x.options.filter(v=>v!==x.expected).every(v=>x.optionExplanations?.[v])).toBe(true);
   expect(x.steps[0].choices.filter(v=>v!==o.step).every(v=>x.stepOptionExplanations?.[v])).toBe(true);
  }
  console.log("RDG_R23_CANDIDATE "+JSON.stringify({id:x.id,previous_sha256:hash(old),content_sha256:hash(x),stimulus:x.prompt,mode:x.mode,mask:x.mode==="clasificar"?r23TruthMask(x):null,oracle:o,signals,semantic_status:"REVIEW"}));changed++;
 }
 for(const f of pass.records.filter((x:{semantic_status:string})=>x.semantic_status==="PASS_SEMANTIC"))expect(hash(candidate.find(x=>x.id===f.id))).toBe(f.content_hash);
 expect(changed).toBe(8);expect(preserved).toBe(442);expect(variants).toBe(48);expect(mutants).toBe(20);
 console.log("RDG_R23_SUMMARY "+JSON.stringify({changed,preserved,variants,mutants,semantic_pass:0}));
});
