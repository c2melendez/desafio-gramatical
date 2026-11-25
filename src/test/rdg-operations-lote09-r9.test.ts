import {readFileSync} from "node:fs";
import {createHash} from "node:crypto";
import {expect,it} from "vitest";
import {mathM3R9Pool as mathM3Pool,mathM3HistoricalPool,mathM3R6Pool} from "@/lib/math-m3";
import {MATH_LEVELS,MATH_MODES} from "@/lib/math-m1";
const hash=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
const report=JSON.parse(readFileSync("qa/certification/rdg/evidence/MAT-ARIT-01-09-R9-review.json","utf8"));
it("lot 09 matches all 50 remaining current and historical hashes, keys and options",()=>{
 const old=MATH_LEVELS.flatMap(level=>MATH_MODES.flatMap(mode=>mathM3HistoricalPool("Aritmética","Operaciones",level,mode)));
 const r6=MATH_LEVELS.flatMap(level=>MATH_MODES.flatMap(mode=>mathM3R6Pool("Aritmética","Operaciones",level,mode)));
 const bank=MATH_LEVELS.flatMap(level=>MATH_MODES.flatMap(mode=>mathM3Pool("Aritmética","Operaciones",level,mode)));
 expect(report.records).toHaveLength(50);
 for(const r of report.records){
  const prior=old.find(x=>x.id===r.id)!;const item=bank.find(x=>x.id===r.id)!;
  expect(hash(prior),r.id).toBe(r.previous_sha256);
  expect(hash(item),r.id).toBe(r.content_sha256);
  if(item.oracle.kind==="Operaciones-diversidad")expect(hash(r6.find(x=>x.id===r.id)!)).toBe(r.previous_revision_sha256);
  expect(item.prompt).toBe(r.stimulus);expect(item.expected).toBe(r.expected);
  expect(item.steps.map(s=>({label:s.label,choices:s.choices,correct:s.choices[s.answerIndex]}))).toEqual(r.construction);
  expect(r.distractors).toHaveLength(6);expect(r.semantic_status).toBe("REVIEW");
 }
});
it("reports exact 450 unique frozen IDs and current family counts in all nine cells",()=>{
 const selections=Array.from({length:9},(_,i)=>JSON.parse(readFileSync("qa/certification/rdg/selections/MAT-ARIT-01-0"+(i+1)+".json","utf8")));
 const ids=selections.flatMap(x=>x.items.map((v:{id:string})=>v.id));
 expect(ids).toHaveLength(450);expect(new Set(ids).size).toBe(450);
 const cells=MATH_LEVELS.flatMap(level=>MATH_MODES.map(mode=>{
  const bank=mathM3Pool("Aritmética","Operaciones",level,mode);
  const families:Record<string,number>={};
  for(const x of bank)families[x.operation??"UNKNOWN"]=(families[x.operation??"UNKNOWN"]??0)+1;
  expect(Object.keys(families).length).toBe(level==="principiante"?2:3);
  return {level,mode,count:bank.length,families};
 }));
 expect(cells.reduce((s,c)=>s+c.count,0)).toBe(450);
 console.log("RDG_FAMILY_INVENTORY "+JSON.stringify(cells));
});
