import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import {expect,it} from "vitest";
import {MATH_LEVELS,MATH_MODES} from "@/lib/math-m1";
import {mathM3Pool} from "@/lib/math-m3";
const load=(p:string)=>JSON.parse(readFileSync(p,"utf8"));
const hash=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
it("R27: 27 individual published decisions, 3 REVIEW and 125 active PASS hashes",()=>{
 const s=load("qa/certification/batch-state.json").rdg_continuity;
 const f=load("qa/certification/rdg/evidence/MAT-ARIT-01-v79-R27-pass.json"),source=load(f.source_review);
 const bank=MATH_LEVELS.flatMap(l=>MATH_MODES.flatMap(m=>mathM3Pool("Aritmética","Operaciones",l,m)));
 expect(f.provider_observation.production_ci_status).toBe("SUCCESS");expect(f.provider_observation.render_status).toBe("LIVE_WHEN_OBSERVED");expect(f.provider_observation.review_ci_status).toBe("SUCCESS");
 expect(f.records.filter((r:{semantic_status:string})=>r.semantic_status==="PASS_SEMANTIC")).toHaveLength(27);expect(f.records).toHaveLength(30);
 for(const r of f.records){const x=bank.find(y=>y.id===r.id)!;const a=source.records.find((y:{id:string})=>y.id===r.id);expect(hash(x)).toBe(r.content_hash);expect(a.content_hash).toBe(r.content_hash);expect(r.explicacion).toBe(x.explanation);expect(r.assertions).toEqual(x.assertions);expect(r.assertionExplanations).toEqual(x.assertionExplanations);expect(r.teacher_status).toBe("PENDING");expect(r.empirical_status).toBe("NOT_RUN");
 const good=Object.keys(r.rubric).sort().join("")==="ABCDEFGH"&&Object.values(r.rubric as Record<string,{score:number;reason:string}>).every(v=>Number.isInteger(v.score)&&v.score>=3&&v.score<=4&&v.reason.trim());
 expect(good).toBe(a.promotion_candidate);expect(r.semantic_status).toBe(good?"PASS_SEMANTIC":"REVIEW");if(good){expect(r.reason_codes).toEqual([]);expect(r.oracle_status).toBe("VERIFIED");}else expect(r.reason_codes.length).toBeGreaterThan(0);}
 const all=s.v79_semantic_pass_paths.flatMap((p:string)=>load(p).records.filter((x:{semantic_status:string})=>x.semantic_status==="PASS_SEMANTIC"));
 expect(new Set(all.map((r:{id:string})=>r.id)).size).toBe(all.length);expect(all.length).toBe(s.semantic_pass_ids);expect(all.length).toBeGreaterThanOrEqual(125);expect(s.v79_individual_accounting.not_pass).toBe(450-all.length);
 for(const r of all)expect(hash(bank.find(x=>x.id===r.id))).toBe(r.content_hash);
 console.log("RDG_R27_PUBLISHED "+JSON.stringify({pass:27,review:3,total:all.length}));
});