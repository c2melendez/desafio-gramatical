import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import {expect,it} from "vitest";
import {MATH_LEVELS,MATH_MODES} from "@/lib/math-m1";
import {mathM3Pool} from "@/lib/math-m3";
// @ts-expect-error JS diagnostic shared with certification runner
import {inspectR21} from "../../qa/certification/rdg/inspect-r21-independence.mjs";
const load=(p:string)=>JSON.parse(readFileSync(p,"utf8"));
const hash=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
it("R34: independently reconstruct 177 judgments and compare all 27 signaled tuples against active bank",()=>{
 const l=load("qa/certification/rdg/evidence/MAT-ARIT-01-R34-r21-review.json");
 const screen=load("qa/certification/rdg/evidence/MAT-ARIT-01-R26-exam-g-h-screen.json");
 const bank=MATH_LEVELS.flatMap(level=>MATH_MODES.flatMap(mode=>mathM3Pool("Aritmética","Operaciones",level,mode)));
 const byId=new Map(bank.map(x=>[x.id,x]));
 expect(bank).toHaveLength(450);expect(l.records).toHaveLength(59);expect(new Set(l.records.map((r:{id:string})=>r.id)).size).toBe(59);
 let claims=0,linked=0,signaled=0,advanced=0,eligibleIntermediate=0;
 for(const r of l.records){
  const x=byId.get(r.id);if(!x)throw Error("missing item");
  expect(hash(x)).toBe(r.content_hash);expect(x.prompt).toBe(r.stimulus);
  const a=inspectR21(x.prompt,x.level,x.assertions);
  expect(a.value).toBe(Number(x.expected));expect(a).toEqual({operands:r.oraculo_independiente.operands,value:r.oraculo_independiente.value,decisions:r.oraculo_independiente.decisions,links:r.independence_signals});
  for(let i=0;i<x.assertions.length;i++){expect(a.decisions[i].truth).toBe(x.assertions[i].truth);expect(x.assertionExplanations?.[x.assertions[i].text]).toBeTruthy();claims++;}
  if(a.links.length){linked++;expect(r.rubric.C.score).toBe(2);}else expect(r.rubric.C.score).toBe(3);
  const s=screen.records.find((v:{id:string})=>v.id===r.id);expect(r.tuple_signals).toEqual(s.tuple_signals);
  const pairs=r.tuple_signals.map((id:string)=>{
   const y=byId.get(id);if(!y)throw Error("unknown tuple partner");
   return {id,hash:hash(y),prompt:y.prompt,mode:y.mode,expected:y.expected,step:y.steps[0]?.choices[y.steps[0].answerIndex],sameAnswer:y.expected===x.expected,samePrompt:y.prompt===x.prompt,assertions:y.mode==="clasificar"?y.assertions:[]};
  });
  if(pairs.length){signaled++;expect(r.rubric.G.score).toBe(2);}
  if(x.level==="avanzado"){advanced++;expect(r.rubric.F.score).toBe(2);}
  if(x.level==="intermedio"&&Object.values(r.rubric).every(v=>(v as {score:number}).score>=3))eligibleIntermediate++;
  expect(r.semantic_status).toBe("REVIEW");expect(r.promotion_candidate).toBe(false);
  console.log("RDG_R34_INDIVIDUAL "+JSON.stringify({id:r.id,hash:r.content_hash,links:a.links,level:r.nivel,pairs,semantic_pass:0}));
 }
 expect(claims).toBe(177);expect(linked).toBe(30);expect(signaled).toBe(27);expect(advanced).toBe(31);expect(eligibleIntermediate).toBe(6);
 console.log("RDG_R34_SUMMARY "+JSON.stringify({claims,linked,signaled,advanced,eligibleIntermediate,semantic_pass:0}));
});
it("R34 rejects a changed visible claim and detects direct relation even with distinct numeric values",()=>{
 const a=inspectR21("Resuelve (6+14)×6. ¿Cuál es el resultado?","principiante",[{text:"Al distribuir, el producto del primer sumando por el factor es 84."},{text:"El valor de la expresión solicitada es 120."},{text:"La suma dentro del paréntesis es 20."}]);
 expect(a.links).toContain("STEP_ANSWER");expect(a.decisions.map((d:{truth:boolean})=>d.truth)).toEqual([false,true,true]);
 const b=inspectR21("Resuelve (6+14)×6. ¿Cuál es el resultado?","principiante",[{text:"Al distribuir, el producto del primer sumando por el factor es 84."},{text:"El valor de la expresión solicitada es 121."},{text:"La suma dentro del paréntesis es 20."}]);
 expect(b.links).not.toContain("STEP_ANSWER");expect(b.decisions[1].truth).toBe(false);
});
