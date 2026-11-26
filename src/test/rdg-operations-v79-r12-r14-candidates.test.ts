import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import {expect,it} from "vitest";
import {mathM3Pool} from "@/lib/math-m3";
import {MATH_LEVELS,MATH_MODES} from "@/lib/math-m1";
const load=(path:string)=>JSON.parse(readFileSync(path,"utf8"));
const e=load("qa/certification/rdg/evidence/MAT-ARIT-01-v79-R12-R14-publication-candidates.json");
const prior=load("qa/certification/rdg/evidence/MAT-ARIT-01-v79-R12-R14-current-review.json");
const state=load("qa/certification/batch-state.json").rdg_continuity;
const hash=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
type Candidate={id:string;content_hash:string;oracle_status:string;semantic_status:string;candidate_status:string;promotion_candidate:boolean;reason_codes:string[];rubric:Record<string,{score:number,reason:string}>;canonical_runtime:{hash:string;tupleSignals:string[];promptSignals:string[];rdgSignals:string[]};teacher_status:string;empirical_status:string;criteria_revision:string};
function eligible(f:Candidate,h:string){return f.criteria_revision==="7.9"&&f.content_hash===h&&f.canonical_runtime.hash===h&&f.oracle_status==="VERIFIED"&&Object.keys(f.rubric).sort().join("")==="ABCDEFGH"&&Object.values(f.rubric).every(c=>Number.isInteger(c.score)&&c.score>=3&&c.score<=4&&c.reason.trim().length>0)&&f.canonical_runtime.tupleSignals.length===0&&f.canonical_runtime.promptSignals.length===0&&f.canonical_runtime.rdgSignals.length===0&&f.semantic_status==="REVIEW"&&f.teacher_status==="PENDING"&&f.empirical_status==="NOT_RUN"&&f.reason_codes.length===1&&f.reason_codes[0]==="PUBLICACION_CI_CANDIDATE_PENDING";}
it("R12–R14: 92 individual current records, 70 eligible candidates; 22 retained REVIEW, no promotion or duplicate accounting",()=>{
 const bank=MATH_LEVELS.flatMap(l=>MATH_MODES.flatMap(m=>mathM3Pool("Aritmética","Operaciones",l,m)));
 const old=new Set<string>();for(const p of state.v79_semantic_pass_paths)for(const f of load(p).records)if(f.semantic_status==="PASS_SEMANTIC")old.add(f.id);
 expect(old.size).toBe(state.semantic_pass_ids);expect(e.records).toHaveLength(92);expect(new Set(e.records.map((f:Candidate)=>f.id)).size).toBe(92);
 let n=0,mutants=0;
 for(const f of e.records as Candidate[]){
  const x=bank.find(y=>y.id===f.id)!;const h=hash(x);expect(h).toBe(f.content_hash);expect(prior.records.find((y:Candidate)=>y.id===f.id).content_hash).toBe(h);expect(old.has(f.id)).toBe(false);
  expect(f.semantic_status).toBe("REVIEW");expect(eligible(f,h)).toBe(f.promotion_candidate);
  if(f.promotion_candidate){expect(f.candidate_status).toBe("PASS_SEMANTIC_CANDIDATE_PENDING_PUBLICATION");n++;
   expect(eligible({...f,oracle_status:"INCONCLUSIVE"},h)).toBe(false);
   expect(eligible({...f,content_hash:"0".repeat(64)},h)).toBe(false);
   expect(eligible({...f,rubric:{...f.rubric,E:{score:2,reason:"inadequate"}}},h)).toBe(false);
   expect(eligible({...f,canonical_runtime:{...f.canonical_runtime,tupleSignals:["collision"]}},h)).toBe(false);mutants+=4;
  }else expect(f.candidate_status).toBe("REVIEW_REPAIR_REQUIRED");
 }
 expect(n).toBe(70);expect(e.summary.review_repair).toBe(22);expect(e.summary.semantic_pass).toBe(0);
 console.log("RDG_R12_R14_CANDIDATE_ACCOUNTING "+JSON.stringify({examined:92,candidates:n,review:92-n,mutants,priorPass:old.size,semantic_pass:0}));
});
