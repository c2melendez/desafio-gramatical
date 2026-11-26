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
