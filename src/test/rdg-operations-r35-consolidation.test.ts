import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import {expect,it} from "vitest";
import {MATH_LEVELS,MATH_MODES} from "@/lib/math-m1";
import {mathM3Pool} from "@/lib/math-m3";
// @ts-expect-error shared diagnostic JS
import {inspectR21} from "../../qa/certification/rdg/inspect-r21-independence.mjs";
const load=(p:string)=>JSON.parse(readFileSync(p,"utf8"));
const hash=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
it("R35: six individually adjudicated intermedios, visible arithmetic, immutable evidence and unique union",()=>{
 const path="qa/certification/rdg/evidence/MAT-ARIT-01-R35-pass.json",l=load(path),s=load("qa/certification/batch-state.json").rdg_continuity,source=load(l.source_paths[0]);
 const bank=MATH_LEVELS.flatMap(level=>MATH_MODES.flatMap(mode=>mathM3Pool("Aritmética","Operaciones",level,mode)));
 const contract=load(s.rdg_contract_path);
 const eligible=source.records.filter((r:{nivel:string;rubric:Record<string,{score:number}>})=>r.nivel==="intermedio"&&Object.values(r.rubric).every((v:{score:number})=>v.score>=3));
 expect(eligible).toHaveLength(6);expect(l.records.map((r:{id:string})=>r.id)).toEqual(eligible.map((r:{id:string})=>r.id));
 const values=[25,174,132,162,72,182];
 for(const [i,r] of l.records.entries()){
  const x=bank.find(v=>v.id===r.id);if(!x)throw Error("missing ID");
  const original=eligible[i];
  expect(hash(x)).toBe(r.content_hash);expect(r.content_hash).toBe(original.content_hash);
  expect(r.rubric).toEqual(original.rubric);expect(r.dependency_hashes).toEqual(contract.dependency_hashes);
  expect(r.oracle_status).toBe("VERIFIED");expect(r.tuple_signals).toEqual([]);expect(r.independence_signals).toEqual([]);
  const m=x.prompt.match(/\((\d+)\+(\d+)\)×(\d+)/);if(!m)throw Error("unrecognized prompt");
  const [a,b,c]=m.slice(1).map(Number);
  // Alternative derivation: original product + two extra factors - modified sum.
  const v=(a+b)*c+2*c-(a+b+2);
  expect(v).toBe(values[i]);expect(Number(x.expected)).toBe(v);
  const rebuilt=inspectR21(x.prompt,x.level,x.assertions);
  expect(rebuilt.links).toEqual([]);expect(rebuilt.value).toBe(v);
  for(const [k,q] of x.assertions.entries()){
   expect(rebuilt.decisions[k].truth).toBe(q.truth);
   expect(r.assertion_decisions[k].truth).toBe(q.truth);
   expect(x.assertionExplanations?.[q.text]).toBeTruthy();
  }
  expect(r.semantic_status).toBe("PASS_SEMANTIC");expect(r.reason_codes).toEqual([]);
  expect(r.teacher_status).toBe("PENDING");expect(r.empirical_status).toBe("NOT_RUN");
  expect(r.publication_evidence.pr_ci).toBe(46105334314);
  expect(r.publication_evidence.published_sha).toBe("eedcce7aa754645c79d661294744c90d0932f06f");
 }
 const all=s.v79_semantic_pass_paths.flatMap((p:string)=>load(p).records.filter((r:{semantic_status:string})=>r.semantic_status==="PASS_SEMANTIC"));
 expect(all.length).toBeGreaterThanOrEqual(141);expect(new Set(all.map((r:{id:string})=>r.id)).size).toBe(all.length);
 expect(s.semantic_pass_ids).toBe(all.length);
 for(const r of all)expect(hash(bank.find(x=>x.id===r.id))).toBe(r.content_hash);
 console.log("RDG_R35_CONSOLIDATION "+JSON.stringify({new_pass:6,total:all.length,remaining:450-all.length}));
});
