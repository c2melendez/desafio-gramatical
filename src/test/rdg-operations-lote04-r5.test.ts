import {readFileSync} from "node:fs";
import {createHash} from "node:crypto";
import {expect,it} from "vitest";
import {mathM3Pool,mathM3HistoricalPool,mathM3R4Pool} from "@/lib/math-m3";
import {MATH_LEVELS,MATH_MODES} from "@/lib/math-m1";
const hash=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
const load=(p:string)=>JSON.parse(readFileSync(p,"utf8"));
const report=load("qa/certification/rdg/evidence/MAT-ARIT-01-04-R5-review.json");
const successors=load("qa/certification/rdg/evidence/MAT-ARIT-01-R5-successors.json");
it("P2 lote 04: reconciles 50 original and current hashes, actual stimuli, claims and decisions",()=>{
 const old=MATH_LEVELS.flatMap(level=>MATH_MODES.flatMap(mode=>mathM3HistoricalPool("Aritmética","Operaciones",level,mode)));
 const bank=MATH_LEVELS.flatMap(level=>MATH_MODES.flatMap(mode=>mathM3Pool("Aritmética","Operaciones",level,mode)));
 expect(report.records).toHaveLength(50);
 for(const r of report.records){
  const prior=old.find(x=>x.id===r.id)!;
  const item=bank.find(x=>x.id===r.id)!;
  expect(hash(prior),r.id).toBe(r.previous_sha256);
  expect(hash(item),r.id).toBe(r.content_hash);
  expect(item.prompt).toBe(r.stimulus);
  expect(item.expected).toBe(r.expected);
  expect(item.options).toEqual(r.options);
  expect(item.steps.map(s=>({label:s.label,choices:s.choices,correct:s.choices[s.answerIndex]}))).toEqual(r.construction);
  expect(item.assertions).toEqual(r.assertions.map((a:{text:string;truth:boolean})=>({text:a.text,truth:a.truth})));
  expect(r.assertions.every((a:{truth:boolean;oracle_truth:boolean})=>a.truth===a.oracle_truth)).toBe(true);
  expect(r.semantic_status).toBe("REVIEW");
 }
});
it("R5: verifies 44 archived successors and all 406 unaffected current hashes",()=>{
 const old=MATH_LEVELS.flatMap(level=>MATH_MODES.flatMap(mode=>mathM3R4Pool("Aritmética","Operaciones",level,mode)));
 const bank=MATH_LEVELS.flatMap(level=>MATH_MODES.flatMap(mode=>mathM3Pool("Aritmética","Operaciones",level,mode)));
 const revisions=new Map<string,{previous_sha256:string;content_sha256:string;claims:unknown}>(successors.records.map((r:{id:string;previous_sha256:string;content_sha256:string;claims:unknown})=>[r.id,r]));
 expect(revisions.size).toBe(44);
 for(const [i,item] of bank.entries()){
  const r=revisions.get(item.id);
  if(r){expect(hash(old[i])).toBe(r.previous_sha256);expect(hash(item)).toBe(r.content_sha256);expect(item.assertions).toEqual(r.claims);}
  else expect(hash(item)).toBe(hash(old[i]));
 }
});
