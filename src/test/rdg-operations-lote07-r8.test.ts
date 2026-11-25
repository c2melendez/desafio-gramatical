import {readFileSync} from "node:fs";
import {createHash} from "node:crypto";
import {expect,it} from "vitest";
import {mathM3Pool,mathM3HistoricalPool,mathM3R6Pool} from "@/lib/math-m3";
import {MATH_LEVELS,MATH_MODES} from "@/lib/math-m1";
const hash=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
const report=JSON.parse(readFileSync("qa/certification/rdg/evidence/MAT-ARIT-01-07-R8-review.json","utf8"));
const r8=JSON.parse(readFileSync("qa/certification/rdg/evidence/MAT-ARIT-01-R8-successors.json","utf8"));
it("lot 07 reconciles 50 individual records with the actual R8 runtime",()=>{
 const old=MATH_LEVELS.flatMap(level=>MATH_MODES.flatMap(mode=>mathM3HistoricalPool("Aritmética","Operaciones",level,mode)));
 const bank=MATH_LEVELS.flatMap(level=>MATH_MODES.flatMap(mode=>mathM3Pool("Aritmética","Operaciones",level,mode)));
 expect(report.records).toHaveLength(50);
 for(const r of report.records){
  const prior=old.find(x=>x.id===r.id)!;
  const item=bank.find(x=>x.id===r.id)!;
  expect(hash(prior),r.id).toBe(r.previous_sha256);
  expect(hash(item),r.id).toBe(r.content_sha256);
  expect(item.prompt).toBe(r.stimulus);expect(item.expected).toBe(r.expected);
  if(item.mode==="clasificar")expect(item.assertions).toEqual(r.assertions.map((a:{text:string;truth:boolean})=>({text:a.text,truth:a.truth})));
  else expect(item.steps.map(s=>({label:s.label,choices:s.choices,correct:s.choices[s.answerIndex]}))).toEqual(r.construction);
  expect(r.semantic_status).toBe("REVIEW");
 }
});
it("R8 checks exact archived successors and 441 unchanged hashes",()=>{
 const old=MATH_LEVELS.flatMap(level=>MATH_MODES.flatMap(mode=>mathM3R6Pool("Aritmética","Operaciones",level,mode)));
 const now=MATH_LEVELS.flatMap(level=>MATH_MODES.flatMap(mode=>mathM3Pool("Aritmética","Operaciones",level,mode)));
 const revisions=new Map<string,{previous_sha256:string;content_sha256:string}>(r8.records.map((r:{id:string;previous_sha256:string;content_sha256:string})=>[r.id,r]));
 expect(revisions.size).toBe(9);
 for(const [i,x] of now.entries()){
  const r=revisions.get(x.id);
  if(r){expect(hash(old[i])).toBe(r.previous_sha256);expect(hash(x)).toBe(r.content_sha256);}
  else expect(hash(x)).toBe(hash(old[i]));
 }
});
