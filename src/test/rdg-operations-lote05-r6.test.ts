import {readFileSync} from "node:fs";
import {createHash} from "node:crypto";
import {expect,it} from "vitest";
import {mathM3Pool,mathM3HistoricalPool,mathM3R5Pool} from "@/lib/math-m3";
import {MATH_LEVELS,MATH_MODES} from "@/lib/math-m1";
const hash=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
type Claim={text:string;truth:boolean;oracle_truth:boolean};
type Review={id:string;batch_id:string;previous_sha256:string;content_sha256:string;stimulus:string;expected:string;mode:string;assertions:Claim[];construction:{label:string;choices:string[];correct:string}[];distractors:unknown[];semantic_status:string};
const load=(p:string):{records:Review[]}=>JSON.parse(readFileSync(p,"utf8"));
const classification=load("qa/certification/rdg/evidence/MAT-ARIT-01-R6-classification-review.json");
const lot=load("qa/certification/rdg/evidence/MAT-ARIT-01-05-R6-review.json");
it("R6: reconciles 100 classifications, 92 reopened and 8 new; preserves other hashes",()=>{
 const historical=MATH_LEVELS.flatMap(level=>MATH_MODES.flatMap(mode=>mathM3HistoricalPool("Aritmética","Operaciones",level,mode)));
 const before=MATH_LEVELS.flatMap(level=>MATH_MODES.flatMap(mode=>mathM3R5Pool("Aritmética","Operaciones",level,mode)));
 const current=MATH_LEVELS.flatMap(level=>MATH_MODES.flatMap(mode=>mathM3Pool("Aritmética","Operaciones",level,mode)));
 expect(classification.records).toHaveLength(100);
 const revised=new Map<string,Review>(classification.records.map((r:Review)=>[r.id,r]));
 for(const [i,x] of current.entries()){
  const r=revised.get(x.id);
  if(!r){expect(hash(x)).toBe(hash(before[i]));continue;}
  expect(hash(historical[i]),x.id).toBe(r.previous_sha256);
  expect(hash(before[i]),x.id).toBe(r.previous_sha256);
  expect(hash(x),x.id).toBe(r.content_sha256);
  expect(x.prompt).toBe(r.stimulus);
  expect(x.expected).toBe(r.expected);
  expect(x.assertions).toEqual(r.assertions.map((a:Claim)=>({text:a.text,truth:a.truth})));
  expect(r.assertions.every((a:Claim)=>a.truth===a.oracle_truth)).toBe(true);
  expect(r.semantic_status).toBe("REVIEW");
 }
 expect(classification.records.filter((r:Review)=>r.batch_id!=="MAT-ARIT-01-05")).toHaveLength(92);
});
it("lot 05: reconciles 50 individual records and construction decisions with the actual R6 bank",()=>{
 const historical=MATH_LEVELS.flatMap(level=>MATH_MODES.flatMap(mode=>mathM3HistoricalPool("Aritmética","Operaciones",level,mode)));
 const current=MATH_LEVELS.flatMap(level=>MATH_MODES.flatMap(mode=>mathM3Pool("Aritmética","Operaciones",level,mode)));
 expect(lot.records).toHaveLength(50);
 for(const r of lot.records){
  const prior=historical.find(x=>x.id===r.id)!;
  const x=current.find(x=>x.id===r.id)!;
  expect(hash(prior),r.id).toBe(r.previous_sha256);
  expect(hash(x),r.id).toBe(r.content_sha256);
  expect(x.prompt).toBe(r.stimulus);
  expect(x.expected).toBe(r.expected);
  if(x.mode==="construir"){
   expect(x.steps.map(s=>({label:s.label,choices:s.choices,correct:s.choices[s.answerIndex]}))).toEqual(r.construction);
   expect(r.distractors).toHaveLength(6);
  }else expect(x.assertions).toEqual(r.assertions.map((a:Claim)=>({text:a.text,truth:a.truth})));
  expect(r.semantic_status).toBe("REVIEW");
 }
 expect(lot.records.filter((r:Review)=>r.mode==="construir")).toHaveLength(42);
});
