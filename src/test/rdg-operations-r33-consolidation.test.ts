import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import {expect,it} from "vitest";
import {MATH_LEVELS,MATH_MODES} from "@/lib/math-m1";
import {mathM3Pool} from "@/lib/math-m3";
const load=(p:string)=>JSON.parse(readFileSync(p,"utf8"));
const hash=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
it("R33: 14 individual PASS tied to published R30 and immutable R31/R32 reviews",()=>{
 const ledger=load("qa/certification/rdg/evidence/MAT-ARIT-01-R33-pass.json");
 const state=load("qa/certification/batch-state.json").rdg_continuity;
 const old=ledger.source_paths.flatMap((p:string)=>load(p).records);
 const bank=MATH_LEVELS.flatMap(l=>MATH_MODES.flatMap(m=>mathM3Pool("Aritmética","Operaciones",l,m)));
 const contract=load(state.rdg_contract_path);
 expect(ledger.records).toHaveLength(14);expect(new Set(ledger.records.map((r:{id:string})=>r.id)).size).toBe(14);
 for(const r of ledger.records){
  const original=old.find((x:{id:string})=>x.id===r.id);
  expect(original.semantic_status).toBe("REVIEW");expect(r.content_hash).toBe(original.content_hash);
  expect(hash(bank.find(x=>x.id===r.id))).toBe(r.content_hash);expect(r.dependency_hashes).toEqual(contract.dependency_hashes);
  expect(r.semantic_status).toBe("PASS_SEMANTIC");expect(r.oracle_status).toBe("VERIFIED");expect(r.reason_codes).toEqual([]);
  expect(Object.keys(r.rubric).sort().join("")).toBe("ABCDEFGH");
  for(const [k,v] of Object.entries(r.rubric)){const q=v as {score:number;reason:string};expect(q.score).toBeGreaterThanOrEqual(3);expect(q.score).toBeLessThanOrEqual(4);expect(q.reason.trim()).not.toBe("");if(k!=="H"||original.rubric.H.score===3)expect(v).toEqual(original.rubric[k]);}
  expect(r.publication_evidence.published_sha).toBe("eedcce7aa754645c79d661294744c90d0932f06f");expect(r.publication_evidence.production_ci).toBe(46103082832);expect(r.publication_evidence.production_ci_status).toBe("SUCCESS");expect(r.publication_evidence.render_status).toBe("LIVE_WHEN_OBSERVED");expect(r.publication_evidence.pr_ci_status).toBe("SUCCESS");
  expect(r.teacher_status).toBe("PENDING");expect(r.empirical_status).toBe("NOT_RUN");
 }
 const all=state.v79_semantic_pass_paths.flatMap((p:string)=>load(p).records.filter((r:{semantic_status:string})=>r.semantic_status==="PASS_SEMANTIC"));
 expect(all.length).toBeGreaterThanOrEqual(139);expect(new Set(all.map((r:{id:string})=>r.id)).size).toBe(all.length);expect(state.semantic_pass_ids).toBe(all.length);
 console.log("RDG_R33_CONSOLIDATION "+JSON.stringify({new_pass:14,total:all.length,remaining:450-all.length}));
});
