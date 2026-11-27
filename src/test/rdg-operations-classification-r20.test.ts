// Historical R20 evidence: keep exact baseline; active R26 has a separate full-bank regression.
import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import {expect,it} from "vitest";
import {mathM3R19Pool as mathM3Pool,mathM3R20Pool as activePool} from "@/lib/math-m3";
import {verifyMathM3Record} from "@/lib/math-m3-guards";
import {MATH_LEVELS,MATH_MODES,type MathModel} from "@/lib/math-m1";
import {repairOperationClassificationR20,operationClassificationR20TruthCount} from "@/lib/math-operations-classification-r20";
const sha=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
const diagnostic=JSON.parse(readFileSync("qa/certification/rdg/evidence/MAT-ARIT-01-R20-reconstructed-diagnostic.json","utf8"));
const records=new Map<string,{id:string;previous_hash:string;mask:string;decisions:{text:string;truth:boolean;correct:number;kind:string;feedback:string}[]}>(diagnostic.records.map((x:{id:string})=>[x.id,x]));
const sum=(value:number,count:number)=>Array.from({length:count},()=>value).reduce((a,b)=>a+b,0);
function assess(x:MathModel){
 const m=x.prompt.match(/\((\d+)\+(\d+)\)×(\d+)/);if(!m)throw Error("stimulus");
 const [a,b,c]=m.slice(1).map(Number);
 const answer=x.level==="principiante"?sum(a+b,c):x.level==="intermedio"?sum(a+b+2,c-1):sum(a+b,c)-sum(a,c);
 if(String(answer)!==x.expected)throw Error("incorrect key");
 const ds=x.assertions.map(q=>{
  let correct:number,kind:string;
  if(q.text.startsWith("El valor de la expresión solicitada")){correct=answer;kind="answer";}
  else if(q.text.startsWith("La suma dentro")){correct=a+b;kind="step";}
  else if(q.text.startsWith("Al distribuir, el producto")){correct=sum(a,c);kind="auxiliary";}
  else if(q.text.startsWith("Después de los cambios")){correct=a+b+2;kind="step";}
  else if(q.text.startsWith("El factor después")){correct=c-1;kind="auxiliary";}
  else if(q.text.startsWith("Antes de modificar")){correct=sum(a+b,c);kind="step";}
  else if(q.text.startsWith("El segundo sumando después")){correct=b+2;kind="step";}
  else if(q.text.startsWith("Después de distribuir")){correct=b;kind="step";}
  else if(q.text.startsWith("Si en lugar de restar ")){
   const k=q.text.match(/^Si en lugar de restar (\d+)×(\d+) se restara (\d+)×(\d+), el resultado sería (-?\d+)\.$/);
   if(!k||+k[1]!==a||+k[2]!==c||+k[4]!==c||+k[3]===a)throw Error("counterfactual");
   correct=sum(a+b,c)-sum(+k[3],+k[4]);kind="auxiliary";
  }else throw Error("unknown decision");
  const s=q.text.match(/(-?\d+)\.$/);if(!s)throw Error("missing value");const claimed=+s[1];
  if(q.truth!==(claimed===correct))throw Error("incorrect truth");
  const feedback=x.assertionExplanations?.[q.text];if(!feedback||!feedback.includes(String(correct)))throw Error("feedback");
  return {kind,claimed,correct,truth:q.truth,text:q.text,feedback};
 });
 if(new Set(ds.map(d=>d.kind)).size!==3||new Set(ds.map(d=>d.correct)).size!==3||new Set(ds.map(d=>d.claimed)).size!==3)throw Error("redundant decisions");
 return ds;
}
it("R20 candidate: 59 live-model successors, independent oracle and unique decision values, preserve remaining 391",()=>{
 const bank=MATH_LEVELS.flatMap(l=>MATH_MODES.flatMap(m=>mathM3Pool("Aritmética","Operaciones",l,m)));
 expect(bank).toHaveLength(450);expect(records.size).toBe(59);
 const active=new Map(MATH_LEVELS.flatMap(l=>MATH_MODES.flatMap(m=>activePool("Aritmética","Operaciones",l,m))).map(x=>[x.id,x]));expect(active.size).toBe(450);
 let changed=0,preserved=0,mutants=0;const masks:Record<string,Record<string,number>>={};
 const tuples=new Map<string,string>();
 for(const old of bank){const x=repairOperationClassificationR20(old),f=records.get(old.id);expect(sha(active.get(old.id))).toBe(sha(x));expect(verifyMathM3Record(x,x.level)).toEqual([]);
  if(!f){expect(sha(x)).toBe(sha(old));preserved++;continue;}
  expect(sha(old)).toBe(f.previous_hash);expect(sha(x)).not.toBe(sha(old));
  expect(x.id).toBe(old.id);expect(x.prompt).toBe(old.prompt);expect(x.expected).toBe(old.expected);expect(x.operation).toBe(old.operation);
  expect(x.options).toEqual(old.options);expect(x.steps).toEqual(old.steps);expect(x.oracle).toEqual(old.oracle);
  const ds=assess(x);const ordered=["answer","step","auxiliary"].map(k=>ds.find(d=>d.kind===k)!);
  const mask=ordered.map(d=>Number(d.truth)).join("");expect(mask).toBe(f.mask);
  expect(x.assertions.filter(a=>a.truth)).toHaveLength(operationClassificationR20TruthCount(x.id));
  expect(x.assertions.filter(a=>a.truth).length).toBeGreaterThan(0);expect(x.assertions.filter(a=>a.truth).length).toBeLessThan(3);
  for(const d of ds){const prior=f.decisions.find(a=>a.text===d.text)!;expect(prior.truth).toBe(d.truth);expect(prior.correct).toBe(d.correct);expect(prior.feedback).toBe(d.feedback);}
  const tuple=x.level+"|"+ordered.map(d=>d.correct).join("|");if(tuples.has(tuple))console.log("RDG_R20_TUPLE_SIGNAL "+JSON.stringify({id:x.id,other:tuples.get(tuple),tuple}));else tuples.set(tuple,x.id);
  for(let i=0;i<3;i++){expect(()=>assess({...x,assertions:x.assertions.map((a,j)=>i===j?{...a,truth:!a.truth}:a)})).toThrow("incorrect truth");mutants++;}
  expect(()=>assess({...x,expected:String(Number(x.expected)+1)})).toThrow("incorrect key");
  expect(()=>assess({...x,assertions:[x.assertions[0],x.assertions[0],x.assertions[2]]})).toThrow("redundant decisions");
  expect(()=>assess({...x,assertionExplanations:{}})).toThrow("feedback");
  const m=masks[x.level]??(masks[x.level]={});m[mask]=(m[mask]??0)+1;
  console.log("RDG_R20_SUCCESSOR "+JSON.stringify({id:x.id,previous_sha256:sha(old),content_sha256:sha(x),level:x.level,operation:x.operation,decisions:ds,mask,semantic_status:"REVIEW"}));changed++;
 }
 expect(changed).toBe(59);expect(preserved).toBe(391);expect(mutants).toBe(177);
 console.log("RDG_R20_SUMMARY "+JSON.stringify({changed,preserved,mutants,masks,semantic_pass:0}));
});
