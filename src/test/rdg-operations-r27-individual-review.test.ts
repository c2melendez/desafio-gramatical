import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import {expect,it} from "vitest";
import {MATH_LEVELS,MATH_MODES} from "@/lib/math-m1";
import {mathM3Pool} from "@/lib/math-m3";
const load=(p:string)=>JSON.parse(readFileSync(p,"utf8"));
const hash=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
const data=load("qa/certification/rdg/evidence/MAT-ARIT-01-R27-individual-review.json");
it("R27: 30 active identities, independent key/step and all alternatives, actual claims and feedback",()=>{
 const pool=MATH_LEVELS.flatMap(l=>MATH_MODES.flatMap(m=>mathM3Pool("Aritmética","Operaciones",l,m)));
 expect(data.records).toHaveLength(30);expect(new Set(data.records.map((f:{id:string})=>f.id)).size).toBe(30);
 let eligible=0,held=0;
 for(const f of data.records){
  const x=pool.find(y=>y.id===f.id)!;expect(hash(x)).toBe(f.content_hash);expect(x.prompt).toBe(f.stimulus);expect(x.expected).toBe(f.oraculo_independiente.key);expect(x.steps[0].choices[x.steps[0].answerIndex]).toBe(f.oraculo_independiente.step);
  expect(x.operation).toBe(f.operation);expect(x.mode).toBe(f.modalidad);expect(x.level).toBe(f.nivel);
  expect(new Set(x.options).size).toBe(4);expect(new Set(x.steps[0].choices).size).toBe(4);
  expect(x.options[x.answerIndex]).toBe(x.expected);expect(x.steps[1].choices[x.steps[1].answerIndex]).toBe(x.expected);
  expect(x.options.filter((_,i)=>i!==x.answerIndex).sort()).toEqual([...f.independent_wrong].sort());
  expect(x.steps[0].choices.filter((_,i)=>i!==x.steps[0].answerIndex).sort()).toEqual([...f.independent_mid].sort());
  for(const v of x.options.filter((_,i)=>i!==x.answerIndex))expect(x.optionExplanations?.[v]).toBeTruthy();
  for(const v of x.steps[0].choices.filter((_,i)=>i!==x.steps[0].answerIndex))expect(x.stepOptionExplanations?.[v]).toBeTruthy();
  if(x.mode==="clasificar"){
   expect(f.assertion_decisions).toHaveLength(3);
   for(const a of x.assertions){const kind=a.text.startsWith("El resultado solicitado")?"key":a.text.startsWith("El valor correcto del paso")?"step":"aux";
    const d=f.assertion_decisions.find((d:{kind:string})=>d.kind===kind);expect(a.text.endsWith(" "+d.given+".")).toBe(true);expect(a.truth).toBe(d.truth);expect(x.assertionExplanations?.[a.text]).toBe(d.reason);}
  }
  expect(f.semantic_status).toBe("REVIEW");expect(f.oracle_status).toBe("VERIFIED");
  const good=Object.values(f.rubric as Record<string,{score:number}>).every(v=>v.score>=3);
  expect(good).toBe(f.promotion_candidate);if(good)eligible++;else held++;
  console.log("RDG_R27_FICHA "+JSON.stringify({id:x.id,hash:hash(x),stimulus:x.prompt,options:x.options,answerIndex:x.answerIndex,steps:x.steps,assertions:x.assertions,explanation:x.explanation,optionExplanations:x.optionExplanations,stepOptionExplanations:x.stepOptionExplanations,assertionExplanations:x.assertionExplanations,eligible:good,semantic_status:"REVIEW"}));
 }
 expect(eligible).toBe(27);expect(held).toBe(3);console.log("RDG_R27_SUMMARY "+JSON.stringify({ids:30,eligible_pending_publication:eligible,held,new_pass:0}));
});
