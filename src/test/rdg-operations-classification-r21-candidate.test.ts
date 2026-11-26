import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import {expect,it} from "vitest";
import {mathM3R19Pool,mathM3R20Pool as mathM3Pool} from "@/lib/math-m3";
import {MATH_LEVELS,MATH_MODES,type MathModel} from "@/lib/math-m1";
import {buildOperationClassificationR20} from "@/lib/math-operations-classification-r20";
import {repairOperationClassificationR21Candidate,r21Mask} from "@/lib/math-operations-classification-r21-candidate";
import {verifyMathM3Record} from "@/lib/math-m3-guards";
import {operationR20WrongCause} from "@/lib/math-operations-r20-error-cause";
const sha=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
const archive=JSON.parse(readFileSync("qa/certification/rdg/evidence/MAT-ARIT-01-R20-feedback-causes.json","utf8"));
const manifest=JSON.parse(readFileSync("qa/certification/rdg/evidence/MAT-ARIT-01-R21-candidate-successors.json","utf8"));
const scope=new Set<string>(archive.records.map((x:{id:string})=>x.id));
const add=(x:number,n:number)=>Array.from({length:n},()=>x).reduce((a,b)=>a+b,0);
function assess(x:MathModel){
 const m=x.prompt.match(/\((\d+)\+(\d+)\)×(\d+)/);if(!m)throw Error("stimulus");
 const [a,b,c]=m.slice(1).map(Number);
 const result=x.level==="principiante"?add(a+b,c):x.level==="intermedio"?add(a+b+2,c-1):add(a+b,c)-add(a,c);
 if(String(result)!==x.expected)throw Error("key");
 const ds=x.assertions.map(q=>{
  let value:number,kind:string;
  if(q.text.startsWith("El valor de la expresión solicitada")){value=result;kind="answer";}
  else if(q.text.startsWith("La suma dentro")){value=a+b;kind="step";}
  else if(q.text.startsWith("Al distribuir, el producto")){value=add(a,c);kind="auxiliary";}
  else if(q.text.startsWith("Después de los cambios")){value=a+b+2;kind="step";}
  else if(q.text.startsWith("El factor después")){value=c-1;kind="auxiliary";}
  else if(q.text.startsWith("Antes de modificar")){value=add(a+b,c);kind="step";}
  else if(q.text.startsWith("El segundo sumando después")){value=b+2;kind="step";}
  else if(q.text.startsWith("Después de distribuir")){value=b;kind="step";}
  else if(q.text.startsWith("Si en lugar de restar ")){
   const p=q.text.match(/^Si en lugar de restar (\d+)×(\d+) se restara (\d+)×(\d+), el resultado sería (-?\d+)\.$/);
   if(!p||+p[1]!==a||+p[2]!==c||+p[4]!==c||+p[3]===a)throw Error("counterfactual");
   value=add(a+b,c)-add(+p[3],+p[4]);kind="auxiliary";
  }else throw Error("decision");
  const p=q.text.match(/(-?\d+)\.$/);if(!p)throw Error("value");const given=+p[1];
  if((given===value)!==q.truth)throw Error("truth");
  const reason=x.assertionExplanations?.[q.text];if(!reason||!reason.includes(String(value)))throw Error("feedback");
  const cause=operationR20WrongCause(x,q.text);if(!q.truth&&!cause)throw Error("missing error cause");
  return {kind,text:q.text,truth:q.truth,given,value,reason,cause:cause??null};
 });
 if(ds.length!==3||new Set(ds.map(q=>q.kind)).size!==3||new Set(ds.map(q=>q.given)).size!==3||new Set(ds.map(q=>q.value)).size!==3)throw Error("redundancy");
 return ds;
}
it("R21 candidate: all eight masks in each level; 59 frozen IDs, all 472 counterfactual masks tested independently",()=>{
 const prev=MATH_LEVELS.flatMap(l=>MATH_MODES.flatMap(m=>mathM3R19Pool("Aritmética","Operaciones",l,m)));
 const live=new Map(MATH_LEVELS.flatMap(l=>MATH_MODES.flatMap(m=>mathM3Pool("Aritmética","Operaciones",l,m))).map(x=>[x.id,x]));
 expect(live.size).toBe(450);expect(scope.size).toBe(59);expect(manifest.records).toHaveLength(59);expect(new Set(manifest.records.map((x:{id:string})=>x.id)).size).toBe(59);
 let checked=0,unchanged=0,changed=0,variants=0,mutants=0;const coverage:Record<string,Record<string,number>>={};
 for(const predecessor of prev){
  const old=live.get(predecessor.id)!;
  if(!scope.has(old.id)){expect(r21Mask(old.id)).toBeUndefined();expect(sha(repairOperationClassificationR21Candidate(old))).toBe(sha(old));unchanged++;continue;}
  const f=archive.records.find((y:{id:string})=>y.id===old.id);expect(sha(old)).toBe(f.content_hash);
  for(let i=0;i<8;i++){
   const mask=[Boolean(i&4),Boolean(i&2),Boolean(i&1)];const v=buildOperationClassificationR20(predecessor,mask);const ds=assess(v);
   expect(["answer","step","auxiliary"].map(k=>ds.find(d=>d.kind===k)!.truth)).toEqual(mask);variants++;
  }
  const v=repairOperationClassificationR21Candidate(predecessor),ds=assess(v),mask=["answer","step","auxiliary"].map(k=>Number(ds.find(d=>d.kind===k)!.truth)).join("");
  expect(v.modeOperation).toBe("evaluar-tres-decisiones-operaciones-r21");expect(verifyMathM3Record(v,v.level)).toEqual([]);
  expect(v.id).toBe(old.id);expect(v.expected).toBe(old.expected);expect(v.prompt).toBe(old.prompt);expect(v.operation).toBe(old.operation);
  expect(v.options).toEqual(old.options);expect(v.steps).toEqual(old.steps);expect(v.oracle).toEqual(old.oracle);
  const c=coverage[v.level]??(coverage[v.level]={});c[mask]=(c[mask]??0)+1;
  for(let i=0;i<3;i++){expect(()=>assess({...v,assertions:v.assertions.map((d,j)=>j===i?{...d,truth:!d.truth}:d)})).toThrow("truth");mutants++;}
  const row=manifest.records.find((x:{id:string})=>x.id===v.id);expect(row.previous_sha256).toBe(sha(old));expect(row.content_sha256).toBe(sha(v));expect(row.decisions).toEqual(ds);expect(row.mask).toBe(mask);
  if(sha(v)!==sha(old))changed++;
  console.log("RDG_R21_CANDIDATE "+JSON.stringify({id:v.id,previous_sha256:sha(old),content_sha256:sha(v),level:v.level,operation:v.operation,mask,decisions:ds,semantic_status:"REVIEW"}));checked++;
 }
 expect(changed).toBe(59);expect(checked).toBe(59);expect(unchanged).toBe(391);expect(variants).toBe(472);expect(mutants).toBe(177);
 for(const c of Object.values(coverage))expect(Object.keys(c).sort()).toEqual(["000","001","010","011","100","101","110","111"]);
 console.log("RDG_R21_CANDIDATE_SUMMARY "+JSON.stringify({checked,changed,unchanged,variants,mutants,coverage,semantic_pass:0}));
});
