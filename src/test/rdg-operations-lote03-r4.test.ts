import {readFileSync} from "node:fs";
import {createHash} from "node:crypto";
import {expect,it} from "vitest";
import {mathM3HistoricalPool,mathM3R4Pool as mathM3Pool} from "@/lib/math-m3";
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

const successors=JSON.parse(readFileSync("qa/certification/rdg/evidence/MAT-ARIT-01-R4-successors.json","utf8"));
const rechecked=JSON.parse(readFileSync("qa/certification/rdg/evidence/MAT-ARIT-01-02-R4-recheck.json","utf8"));
it("R4 evidence maps every changed runtime hash, preserves all others and reconciles 37 reopened reviews",()=>{
 const before=MATH_LEVELS.flatMap(level=>MATH_MODES.flatMap(mode=>mathM3HistoricalPool("Aritmética","Operaciones",level,mode)));
 const after=MATH_LEVELS.flatMap(level=>MATH_MODES.flatMap(mode=>mathM3Pool("Aritmética","Operaciones",level,mode)));
 const revisions=new Map<string,{previous_sha256:string;content_sha256:string}>(successors.records.map((r:{id:string;previous_sha256:string;content_sha256:string})=>[r.id,r]));
 expect(revisions.size).toBe(288);
 for(const [i,current] of after.entries()){
  const old=before[i],r=revisions.get(current.id);
  expect(current.id).toBe(old.id);
  if(r){expect(hash(old)).toBe(r.previous_sha256);expect(hash(current)).toBe(r.content_sha256);}
  else expect(hash(current)).toBe(hash(old));
 }
 expect(rechecked.records).toHaveLength(37);
 for(const r of rechecked.records){
  const x=after.find(item=>item.id===r.id)!;
  expect(hash(x),r.id).toBe(r.content_hash);
  expect(x.expected).toBe(r.respuesta_esperada);
  expect(x.steps.map(s=>({label:s.label,correct:s.choices[s.answerIndex],options:s.choices,distractors:s.choices.filter(v=>v!==s.choices[s.answerIndex])}))).toEqual(r.construction);
  expect(r.semantic_status).toBe("REVIEW");
 }
});
