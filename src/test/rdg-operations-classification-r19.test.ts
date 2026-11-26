import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import {expect,it} from "vitest";
import {mathM3R18Pool as mathM3Pool,mathM3Pool as activePool} from "@/lib/math-m3";
import {MATH_LEVELS,MATH_MODES,type MathModel} from "@/lib/math-m1";
import {repairOperationClassificationR19} from "@/lib/math-operations-classification-r19";
import {operationClassificationReason} from "@/lib/math-operations-classification";
import {verifyMathM3Record} from "@/lib/math-m3-guards";
import {OPERATIONS_ROUTE} from "@/lib/rdg/operations";
const sha=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
const historic=JSON.parse(readFileSync("qa/certification/rdg/evidence/MAT-ARIT-01-v79-R18-independent-diagnostic.json","utf8"));
const targets=new Set<string>(historic.records.filter((x:{level:string,target_collision:boolean})=>x.level==="avanzado"||x.target_collision).map((x:{id:string})=>x.id));
const sourcePattern=/\((\d+)\s*\+\s*(\d+)\)\s*×\s*(\d+)/;
function visible(item:MathModel){
 const m=item.prompt.match(sourcePattern);if(!m)throw Error("stimulus");
 const [a,b,c]=m.slice(1).map(Number);
 let answer=(a+b)*c,step=a+b,aux=a*c;
 if(item.level==="intermedio"){
  const change=item.prompt.match(/segundo sumando aumenta (\d+) y el factor exterior disminuye (\d+)/);
  if(!change)throw Error("change conditions");
  const updated=[a,b+Number(change[1]),c-Number(change[2])];
  step=updated[0]+updated[1];aux=updated[2];answer=step*aux;
 }else if(item.level==="avanzado"){
  const subtract=item.prompt.match(/−\s*(\d+)\s*×\s*(\d+)/);if(!subtract)throw Error("cancellation conditions");
  const [u,v]=subtract.slice(1).map(Number);
  if(u!==a||v!==c)throw Error("invalid cancellation");
  answer=a*c+b*c-u*v;step=b;aux=u*v;
 }
 const decisions=item.assertions.map(claim=>{
  const m=claim.text.match(/(-?\d+)\.$/);if(!m)throw Error("claim value");
  const claimed=Number(m[1]);let key:string,correct:number;
  if(claim.text.startsWith("El valor de la expresión solicitada es ")){key="answer";correct=answer;}
  else if(claim.text.startsWith("Antes de modificar los datos, el valor de la expresión original es ")){key="original";correct=a*c+b*c;}
  else if(claim.text.startsWith("Si en lugar de restar ")){
   const q=claim.text.match(/^Si en lugar de restar (\d+)×(\d+) se restara (\d+)×(\d+), el resultado sería (-?\d+)\.$/);
   if(!q||Number(q[1])!==a||Number(q[2])!==c||Number(q[4])!==c||Number(q[3])===a)throw Error("counterfactual conditions");
   key="counterfactual";correct=a*c+b*c-Number(q[3])*Number(q[4]);
  }else if(/^(La suma dentro|Después de los cambios, la suma|Después de distribuir y cancelar)/.test(claim.text)){key="step";correct=step;}
  else if(/^(El factor después|El producto que se cancela|Al distribuir, el producto)/.test(claim.text)){key="auxiliary";correct=aux;}
  else throw Error("claim operation");
  if(claim.truth!==(claimed===correct))throw Error("incorrect truth");
  const feedback=item.assertionExplanations?.[claim.text]??operationClassificationReason(item,claim.text);
  return {key,claimed,correct,truth:claim.truth,text:claim.text,feedback};
 });
 if(String(answer)!==item.expected)throw Error("incorrect answer");
 if(new Set(decisions.map(x=>x.key)).size!==3||new Set(decisions.map(x=>x.correct)).size!==3)throw Error("redundant targets");
 return decisions;
}
it("R19 candidate: 34 targeted repairs, 416 unchanged, independent visible-stimulus oracle and negative checks",()=>{
 const before=MATH_LEVELS.flatMap(l=>MATH_MODES.flatMap(m=>mathM3Pool("Aritmética","Operaciones",l,m)));
 expect(before).toHaveLength(450);expect(targets.size).toBe(34);
 const active=new Map(MATH_LEVELS.flatMap(l=>MATH_MODES.flatMap(m=>activePool("Aritmética","Operaciones",l,m))).map(x=>[x.id,x]));expect(active.size).toBe(450);
 let changed=0,preserved=0,truthMutants=0,oldCollisionDetected=0,advancedTransfer=0,checked=0;
 for(const old of before){
  const x=repairOperationClassificationR19(old);expect(sha(active.get(old.id))).toBe(sha(x));
  if(!targets.has(old.id)){expect(sha(x)).toBe(sha(old));preserved++;continue;}
  expect(sha(x)).not.toBe(sha(old));expect(x.id).toBe(old.id);expect(x.prompt).toBe(old.prompt);expect(x.expected).toBe(old.expected);
  expect(x.options).toEqual(old.options);expect(x.steps).toEqual(old.steps);expect(x.oracle).toEqual(old.oracle);expect(x.operation).toBe(old.operation);
  expect(x.assertions.filter(a=>a.truth)).toHaveLength(old.assertions.filter(a=>a.truth).length);
  const ds=visible(x);expect(verifyMathM3Record(x,x.level)).toEqual([]);
  for(const d of ds){expect(d.feedback).toBeTruthy();expect(d.feedback).toContain(String(d.correct));checked++;}
  const repaired=ds.find(d=>d.key==="original"||d.key==="counterfactual")!;
  expect(repaired).toBeDefined();expect(repaired.feedback).toContain(String(repaired.claimed));expect(repaired.feedback).toContain(repaired.truth?"coincide":"no coincide");
  if(x.level==="avanzado"){expect(repaired.key).toBe("counterfactual");advancedTransfer++;}
  const prior=historic.records.find((z:{id:string})=>z.id===x.id);
  if(prior.target_collision){expect(()=>visible(old)).toThrow("redundant targets");oldCollisionDetected++;}
  for(let k=0;k<3;k++){expect(()=>visible({...x,assertions:x.assertions.map((a,i)=>i===k?{...a,truth:!a.truth}:a)})).toThrow("incorrect truth");truthMutants++;}
  expect(()=>visible({...x,expected:String(Number(x.expected)+1)})).toThrow("incorrect answer");
  const at=x.assertions.findIndex(a=>a.text===repaired.text);
  expect(()=>visible({...x,assertions:x.assertions.map((a,i)=>i===at?x.assertions[(at+1)%3]:a)})).toThrow("redundant targets");
  console.log("RDG_R19_SUCCESSOR "+JSON.stringify({id:x.id,previous_sha256:sha(old),content_sha256:sha(x),level:x.level,operation:x.operation,decisions:ds,semantic_status:"REVIEW"}));
  changed++;
 }
 expect(changed).toBe(34);expect(preserved).toBe(416);expect(truthMutants).toBe(102);expect(oldCollisionDetected).toBe(6);expect(advancedTransfer).toBe(31);expect(checked).toBe(102);
 console.log("RDG_R19_SUMMARY "+JSON.stringify({changed,preserved,truthMutants,oldCollisionDetected,advancedTransfer,checked,semantic_pass:0}));
});
function signature(prompt:string){
 const s=prompt.normalize("NFKC").replace(/\s+/g,"").replace(/[−–]/g,"-").toLowerCase();
 const m=s.match(/\((\d+)\+(\d+)\)×(\d+)/);if(!m)return null;
 const [a,b,c]=m.slice(1).map(Number);
 if(s.includes("aumenta2")&&s.includes("disminuye1"))return "change|"+a+"|"+b+"|"+c;
 if(s.includes("cancel")||s.includes("simplificar")&&s.includes("-"+a+"×"+c))return "cancel|"+a+"|"+b+"|"+c;
 if(!s.includes("aumenta")&&!s.includes("disminuye")&&!s.includes("reduce")&&!s.includes("cambio")&&!s.includes("resta")&&!s.includes("-"))return "group|"+Math.min(a,b)+"|"+Math.max(a,b)+"|"+c;
 return null;
}
it("R18 candidate review: inspect cross-mode numerical stimulus signatures against 450 items and RDG",()=>{
 const pool=MATH_LEVELS.flatMap(l=>MATH_MODES.flatMap(m=>mathM3Pool("Aritmética","Operaciones",l,m)));
 const tasks=[...OPERATIONS_ROUTE.lessons,...OPERATIONS_ROUTE.transfer];
 const candidate=historic.records.filter((x:{prior_candidate:boolean})=>x.prior_candidate);expect(candidate).toHaveLength(25);
 let checked=0,signals=0;
 for(const f of candidate){
  const x=pool.find(y=>y.id===f.id)!;expect(sha(x)).toBe(f.hash);
  const sig=signature(x.prompt);expect(sig).not.toBeNull();
  const matches=pool.filter(y=>y.id!==x.id&&signature(y.prompt)===sig).map(y=>({id:y.id,mode:y.mode,prompt:y.prompt,expected:y.expected}));
  const rdgMatches=tasks.filter(y=>signature(y.prompt)===sig).map(y=>({id:y.id,prompt:y.prompt,answer:y.answer}));
  const ds=visible(x);const displayedValueRepeats=new Set(ds.map(d=>d.claimed)).size!==3;
  if(matches.length||rdgMatches.length||displayedValueRepeats)signals++;
  console.log("RDG_R19_G_SCREEN "+JSON.stringify({id:x.id,hash:sha(x),signature:sig,matches,rdgMatches,displayedValueRepeats,decisions:ds,semantic_status:"REVIEW"}));
  checked++;
 }
 expect(checked).toBe(25);console.log("RDG_R19_G_SUMMARY "+JSON.stringify({checked,signals,semantic_pass:0}));
});
