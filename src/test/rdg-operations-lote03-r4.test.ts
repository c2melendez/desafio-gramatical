import {readFileSync} from "node:fs";
import {createHash} from "node:crypto";
import {expect,it} from "vitest";
import {mathM3HistoricalPool,mathM3Pool} from "@/lib/math-m3";
import {MATH_LEVELS,MATH_MODES} from "@/lib/math-m1";
const hash=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
const report=JSON.parse(readFileSync("qa/certification/rdg/evidence/MAT-ARIT-01-03-R4-review-candidate.json","utf8"));
it("reconciles 50 independently reviewed R4 successors against the actual bank and archived R3 selection",()=>{
 const before=MATH_LEVELS.flatMap(level=>MATH_MODES.flatMap(mode=>mathM3HistoricalPool("Aritmética","Operaciones",level,mode)));
 const after=MATH_LEVELS.flatMap(level=>MATH_MODES.flatMap(mode=>mathM3Pool("Aritmética","Operaciones",level,mode)));
 expect(report.records).toHaveLength(50);
 for(const r of report.records){
  const old=before.find(x=>x.id===r.id)!;
  const current=after.find(x=>x.id===r.id)!;
  expect(hash(old),r.id).toBe(r.previous_sha256);
  expect(hash(current),r.id).toBe(r.content_sha256);
  expect(current.prompt).toBe(r.stimulus);
  expect(current.options[current.answerIndex]).toBe(r.expected);
  expect(current.steps.map(s=>({label:s.label,choices:s.choices,correct:s.choices[s.answerIndex]}))).toEqual(r.construction);
  expect(current.options.filter(d=>d!==current.expected).map(value=>({value,reason:current.optionExplanations?.[value]}))).toEqual(r.distractors);
  expect(r.semantic_status).toBe("REVIEW");
 }
});
