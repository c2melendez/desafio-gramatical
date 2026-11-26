import {readFileSync} from "node:fs";
import {createHash} from "node:crypto";
import {expect,it} from "vitest";
import {mathM3R8Pool as mathM3Pool,mathM3HistoricalPool} from "@/lib/math-m3";
import {MATH_LEVELS,MATH_MODES} from "@/lib/math-m1";
const hash=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
const report=JSON.parse(readFileSync("qa/certification/rdg/evidence/MAT-ARIT-01-06-R8-review.json","utf8"));
it("lot 06 matches all 50 R4 successor hashes and 300 distractors in the actual R8 bank",()=>{
 const old=MATH_LEVELS.flatMap(level=>MATH_MODES.flatMap(mode=>mathM3HistoricalPool("Aritmética","Operaciones",level,mode)));
 const bank=MATH_LEVELS.flatMap(level=>MATH_MODES.flatMap(mode=>mathM3Pool("Aritmética","Operaciones",level,mode)));
 expect(report.records).toHaveLength(50);
 for(const r of report.records){
  const prior=old.find(x=>x.id===r.id)!;
  const item=bank.find(x=>x.id===r.id)!;
  expect(hash(prior),r.id).toBe(r.previous_sha256);
  expect(hash(item),r.id).toBe(r.content_sha256);
  expect(item.prompt).toBe(r.stimulus);expect(item.expected).toBe(r.expected);
  expect(item.steps.map(s=>({label:s.label,choices:s.choices,correct:s.choices[s.answerIndex]}))).toEqual(r.construction);
  expect(r.distractors).toHaveLength(6);
  expect(r.semantic_status).toBe("REVIEW");
 }
});
