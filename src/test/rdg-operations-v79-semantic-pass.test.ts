import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import {expect,it} from "vitest";
import {mathM3Pool} from "@/lib/math-m3";
import {MATH_LEVELS,MATH_MODES} from "@/lib/math-m1";
const evidence=JSON.parse(readFileSync("qa/certification/rdg/evidence/MAT-ARIT-01-v79-OP04-pass.json","utf8"));
const distribution=JSON.parse(readFileSync("qa/certification/rdg/evidence/MAT-ARIT-01-v79-distribucion-verificada.json","utf8"));
const state=JSON.parse(readFileSync("qa/certification/batch-state.json","utf8")).rdg_continuity;
const hash=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
type Decision={id:string;content_hash:string;criteria_revision:string;semantic_status:string;oracle_status:string;rubric:Record<string,{score:number,reason:string}>;family_evidence_ref:string;teacher_status:string;empirical_status:string;reason_codes:string[]};
function eligible(f:Decision,actualHash:string){return f.content_hash===actualHash&&f.criteria_revision==="7.9"&&f.semantic_status==="PASS_SEMANTIC"&&f.oracle_status==="VERIFIED"&&Object.keys(f.rubric).sort().join("")==="ABCDEFGH"&&Object.values(f.rubric).every(x=>Number.isInteger(x.score)&&x.score>=3&&x.score<=4&&x.reason.trim().length>0)&&f.family_evidence_ref==="qa/certification/rdg/evidence/MAT-ARIT-01-v79-distribucion-verificada.json"&&f.teacher_status==="PENDING"&&f.empirical_status==="NOT_RUN"&&f.reason_codes.length===0;}
it("v7.9 first 18 assisted semantic decisions bind real IDs/hashes and A-H; stale/false approvals rejected",()=>{
 const bank=MATH_LEVELS.flatMap(l=>MATH_MODES.flatMap(m=>mathM3Pool("Aritmética","Operaciones",l,m)));
 expect(evidence.records).toHaveLength(18);expect(new Set(evidence.records.map((f:Decision)=>f.id)).size).toBe(18);
 expect(distribution.status).toBe("VERIFIED_RUNTIME_E1");expect(distribution.provider_observation.tested_tree).toBe(evidence.provider_observation.tested_tree);
 expect(state.v79_pilot.semantic_pass).toBe(18);
 for(const f of evidence.records as Decision[]){const x=bank.find(y=>y.id===f.id)!;const actualHash=hash(x);expect(eligible(f,actualHash),f.id).toBe(true);
 expect(eligible({...f,content_hash:"0".repeat(64)},actualHash)).toBe(false);
 expect(eligible({...f,oracle_status:"INCONCLUSIVE"},actualHash)).toBe(false);
 expect(eligible({...f,rubric:{...f.rubric,G:{score:2,reason:"insufficient"}}},actualHash)).toBe(false);
 expect(eligible({...f,family_evidence_ref:"fake"},actualHash)).toBe(false);
 }
});

it("v7.9 R15 publication: ten additional exact decisions and two retained REVIEW; union accounting",()=>{
 const r15=JSON.parse(readFileSync("qa/certification/rdg/evidence/MAT-ARIT-01-v79-R15-pass.json","utf8"));
 const candidates=JSON.parse(readFileSync("qa/certification/rdg/evidence/MAT-ARIT-01-v79-R15-publication-candidates.json","utf8"));
 const bank=MATH_LEVELS.flatMap(l=>MATH_MODES.flatMap(m=>mathM3Pool("Aritmética","Operaciones",l,m)));
 expect(r15.records).toHaveLength(12);
 const pass=r15.records.filter((f:Decision)=>f.semantic_status==="PASS_SEMANTIC");
 const review=r15.records.filter((f:Decision)=>f.semantic_status==="REVIEW");
 expect(pass).toHaveLength(10);expect(review).toHaveLength(2);
 expect(r15.provider_observation.production_ci_status).toBe("SUCCESS");
 expect(r15.provider_observation.render_status).toBe("LIVE_WHEN_OBSERVED");
 for(const f of r15.records){const x=bank.find(y=>y.id===f.id)!;const original=candidates.records.find((y:Decision)=>y.id===f.id);expect(hash(x)).toBe(f.content_hash);expect(f.content_hash).toBe(original.content_hash);
  if(f.semantic_status==="PASS_SEMANTIC"){expect(eligible(f,hash(x))).toBe(true);expect(original.candidate_status).toBe("PASS_SEMANTIC_CANDIDATE_PENDING_PUBLICATION");expect(eligible({...f,rubric:{...f.rubric,G:{score:2,reason:"collision"}}},hash(x))).toBe(false);}
  else{expect(f.rubric.G.score).toBe(2);expect(f.reason_codes).toContain("G_KEY_STEP_COLLISION");expect(eligible(f,hash(x))).toBe(false);}
 }
 const all=[...evidence.records,...pass];expect(new Set(all.map((f:Decision)=>f.id)).size).toBe(all.length);expect(all).toHaveLength(28);
 const union=state.v79_semantic_pass_paths.flatMap((p:string)=>JSON.parse(readFileSync(p,"utf8")).records.filter((f:Decision)=>f.semantic_status==="PASS_SEMANTIC"));expect(new Set(union.map((f:Decision)=>f.id)).size).toBe(union.length);expect(state.semantic_pass_ids).toBe(union.length);expect(state.v79_individual_accounting.not_pass).toBe(450-union.length);
 expect(state.v79_semantic_pass_paths).toContain("qa/certification/rdg/evidence/MAT-ARIT-01-v79-R15-pass.json");
});

it("v7.9 R12-R14: 70 additional published PASS with exact hashes; 22 REVIEW and unique union",()=>{
 const data=JSON.parse(readFileSync("qa/certification/rdg/evidence/MAT-ARIT-01-v79-R12-R14-pass.json","utf8"));const source=JSON.parse(readFileSync("qa/certification/rdg/evidence/MAT-ARIT-01-v79-R12-R14-publication-candidates.json","utf8"));
 const bank=MATH_LEVELS.flatMap(l=>MATH_MODES.flatMap(m=>mathM3Pool("Aritmética","Operaciones",l,m)));
 expect(data.provider_observation.production_ci_status).toBe("SUCCESS");expect(data.provider_observation.render_status).toBe("LIVE_WHEN_OBSERVED");expect(data.records).toHaveLength(92);
 let pass=0,review=0;for(const f of data.records as Decision[]){const actual=hash(bank.find(x=>x.id===f.id)!);expect(actual).toBe(f.content_hash);const original=source.records.find((x:Decision)=>x.id===f.id);expect(original.content_hash).toBe(actual);if(f.semantic_status==="PASS_SEMANTIC"){expect(eligible(f,actual)).toBe(true);expect(original.promotion_candidate).toBe(true);pass++;}else{expect(original.promotion_candidate).toBe(false);expect(eligible(f,actual)).toBe(false);review++;}}expect(pass).toBe(70);expect(review).toBe(22);
 const all=state.v79_semantic_pass_paths.flatMap((p:string)=>JSON.parse(readFileSync(p,"utf8")).records.filter((f:Decision)=>f.semantic_status==="PASS_SEMANTIC"));expect(new Set(all.map((f:Decision)=>f.id)).size).toBe(all.length);expect(all.length).toBe(state.semantic_pass_ids);expect(all.length).toBeGreaterThanOrEqual(98);console.log("RDG_V79_R12_R14_PUBLISHED "+JSON.stringify({pass,review,total:all.length}));
});
