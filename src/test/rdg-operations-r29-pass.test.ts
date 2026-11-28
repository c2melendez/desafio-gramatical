import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import {expect,it} from "vitest";
import {MATH_LEVELS,MATH_MODES} from "@/lib/math-m1";
import {mathM3Pool} from "@/lib/math-m3";
const load=(p:string)=>JSON.parse(readFileSync(p,"utf8"));
const hash=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
const d=load("qa/certification/rdg/evidence/MAT-ARIT-01-v79-R27-pass.json"),s=load("qa/certification/batch-state.json").rdg_continuity,c=load(s.rdg_contract_path);
type LedgerEntry={id:string;content_hash:string;semantic_status:string};
type ReviewEntry=LedgerEntry & {rubric:Record<string,{score:number;reason:string}>;promotion_candidate:boolean};
type PassEntry=ReviewEntry & {criteria_revision:string;oracle_status:string;reason_codes:string[];teacher_status:string;empirical_status:string;publication_evidence:{production_ci_status:string;render_status:string;pr_ci_status:string}};
function eligible(f:PassEntry,actual:string){return f.content_hash===actual&&f.criteria_revision==="7.9"&&f.oracle_status==="VERIFIED"&&Object.keys(f.rubric).sort().join("")==="ABCDEFGH"&&Object.values(f.rubric as Record<string,{score:number;reason:string}>).every(v=>Number.isInteger(v.score)&&v.score>=3&&v.score<=4&&v.reason.trim())&&f.reason_codes.length===0&&f.teacher_status==="PENDING"&&f.empirical_status==="NOT_RUN"&&f.publication_evidence.production_ci_status==="SUCCESS"&&f.publication_evidence.render_status==="LIVE_WHEN_OBSERVED"&&f.publication_evidence.pr_ci_status==="SUCCESS";}
it("R29 27 new individual PASS, 3 retained; active union 125 with exact hashes",()=>{
 const bank=MATH_LEVELS.flatMap(l=>MATH_MODES.flatMap(m=>mathM3Pool("Aritmética","Operaciones",l,m)));
 const original=load("qa/certification/rdg/evidence/MAT-ARIT-01-R27-individual-review.json");
 expect(d.records).toHaveLength(30);let pass=0,review=0;
 for(const [p,v] of Object.entries(c.dependency_hashes))expect(createHash("sha256").update(readFileSync(p)).digest("hex")).toBe(v);
 for(const f of d.records){const x=bank.find(y=>y.id===f.id)!;const h=hash(x),p=original.records.find((y:ReviewEntry)=>y.id===f.id);
  expect(h).toBe(f.content_hash);expect(h).toBe(p.content_hash);expect(f.rubric).toEqual(p.rubric);expect(x.explanation).toBe(f.explicacion);expect(f.dependency_hashes).toEqual(c.dependency_hashes);
  if(f.semantic_status==="PASS_SEMANTIC"){expect(p.promotion_candidate).toBe(true);expect(eligible(f,h)).toBe(true);expect(eligible({...f,oracle_status:"INCONCLUSIVE"},h)).toBe(false);expect(eligible({...f,rubric:{...f.rubric,E:{score:2,reason:"test"}}},h)).toBe(false);expect(eligible(f,"0".repeat(64))).toBe(false);expect(eligible({...f,publication_evidence:{...f.publication_evidence,render_status:"PENDING"}},h)).toBe(false);pass++;}
  else{expect(p.promotion_candidate).toBe(false);expect(eligible(f,h)).toBe(false);review++;}
 }
 expect(pass).toBe(27);expect(review).toBe(3);
 const all=s.v79_semantic_pass_paths.flatMap((p:string)=>load(p).records.filter((r:LedgerEntry)=>r.semantic_status==="PASS_SEMANTIC"));expect(new Set(all.map((r:LedgerEntry)=>r.id)).size).toBe(all.length);expect(all.length).toBe(s.semantic_pass_ids);expect(all.length).toBeGreaterThanOrEqual(125);
 for(const r of all)expect(hash(bank.find(x=>x.id===r.id))).toBe(r.content_hash);
 expect(s.v79_individual_accounting.not_pass).toBe(450-all.length);
 console.log("RDG_R29_PASS "+JSON.stringify({new_pass:pass,review,total:all.length}));
});
