import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import {expect,it} from "vitest";
import {mathM3Pool} from "@/lib/math-m3";
const load=(p:string)=>JSON.parse(readFileSync(p,"utf8"));
const hash=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
it("R32: eleven active basic R21 fichas, exact hashes, visible arithmetic and distinct false decision origins",()=>{
 const ledger=load("qa/certification/rdg/evidence/MAT-ARIT-01-R32-r21-basic-review.json");
 const contract=load("qa/certification/rdg/contracts/MAT-ARIT-01-R4.json");
 const r30=load("qa/certification/rdg/evidence/MAT-ARIT-01-R30-integration.json");
 const screens=load("qa/certification/rdg/evidence/MAT-ARIT-01-R26-exam-g-h-screen.json");
 const bank=mathM3Pool("Aritmética","Operaciones","principiante","clasificar");
 expect(ledger.records).toHaveLength(11);
 expect(new Set(ledger.records.map((r:{id:string})=>r.id)).size).toBe(11);
 for(const [p,h] of Object.entries(contract.dependency_hashes))expect(createHash("sha256").update(readFileSync(p)).digest("hex")).toBe(h);
 for(const r of ledger.records){
  const x=bank.find(v=>v.id===r.id);expect(x).toBeDefined();if(!x)throw Error("missing active item");
  const history=r30.records.find((v:{id:string})=>v.id===r.id),s=screens.records.find((v:{id:string})=>v.id===r.id);
  expect(history.origin).toBe("R21");expect(history.next).toBe(r.content_hash);expect(history.previous).toBe(r.previous_sha256);
  expect(hash(x)).toBe(r.content_hash);expect(x.prompt).toBe(r.stimulus);expect(s.content_hash).toBe(r.content_hash);
  for(const field of ["exam_matches","game_signals","rdg_signals","tuple_signals"])expect(s[field]).toEqual([]);
  for(const field of ["nativeButtons","focus","textFeedback","liveRegion","nextAction"])expect(s.H[field]).toBe(true);
  const m=x.prompt.match(/^Resuelve \((\d+)\+(\d+)\)×(\d+)\. ¿Cuál es el resultado\?$/);if(!m)throw Error("stimulus");
  const [a,b,c]=m.slice(1).map(Number),values={step:a+b,auxiliary:a*c,answer:(a+b)*c},wrong={step:a-b,auxiliary:b*c,answer:a+b*c};
  expect(x.expected).toBe(String(values.answer));expect(r.respuesta_esperada).toBe(x.expected);
  const kinds=new Set<string>();
  for(const d of r.assertion_decisions){
   const kind=d.kind as keyof typeof values;expect(kinds.has(kind)).toBe(false);kinds.add(kind);
   expect(d.value).toBe(values[kind]);expect(d.truth).toBe(d.given===values[kind]);
   if(!d.truth){expect(d.given).toBe(wrong[kind]);expect(d.cause).toBeTruthy();}
   const active=x.assertions.find(v=>v.text===d.text);expect(active?.truth).toBe(d.truth);
   expect(x.assertionExplanations?.[d.text]).toBeTruthy();
  }
  expect(kinds.size).toBe(3);expect(Object.keys(r.rubric).sort().join("")).toBe("ABCDEFGH");
  expect(Object.values(r.rubric).every(v=>{const q=v as {score:number;reason:string};return q.score>=3&&q.score<=4&&q.reason.trim().length>0})).toBe(true);
  expect(r.dependency_hashes).toEqual(contract.dependency_hashes);expect(r.semantic_status).toBe("REVIEW");expect(r.promotion_candidate).toBe(false);
  console.log("RDG_R32_BASIC_REVIEW "+JSON.stringify({id:r.id,hash:r.content_hash,values,semantic_pass:0}));
 }
});