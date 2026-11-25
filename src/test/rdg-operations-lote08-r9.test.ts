import {readFileSync} from "node:fs";
import {createHash} from "node:crypto";
import {expect,it} from "vitest";
import {mathM3Pool,mathM3HistoricalPool,mathM3R8Pool} from "@/lib/math-m3";
import {MATH_LEVELS,MATH_MODES} from "@/lib/math-m1";
const hash=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
type Claim={text:string;truth:boolean;oracle_truth:boolean};
type Review={id:string;previous_sha256:string;previous_revision_sha256:string;content_sha256:string;stimulus:string;expected:string;mode:string;assertions:Claim[];construction:{label:string;choices:string[];correct:string}[];distractors:unknown[];semantic_status:string};
const load=(p:string):{records:Review[]}=>JSON.parse(readFileSync("qa/certification/rdg/evidence/"+p+".json","utf8"));
const lot=load("MAT-ARIT-01-08-R9-review"),reopened=load("MAT-ARIT-01-07-R9-recheck");
const successors=JSON.parse(readFileSync("qa/certification/rdg/evidence/MAT-ARIT-01-R9-successors.json","utf8"));
it("lot 08 and reopened lot 07 match actual R9 runtime hashes and decisions",()=>{
 const old=MATH_LEVELS.flatMap(level=>MATH_MODES.flatMap(mode=>mathM3HistoricalPool("Aritmética","Operaciones",level,mode)));
 const before=MATH_LEVELS.flatMap(level=>MATH_MODES.flatMap(mode=>mathM3R8Pool("Aritmética","Operaciones",level,mode)));
 const bank=MATH_LEVELS.flatMap(level=>MATH_MODES.flatMap(mode=>mathM3Pool("Aritmética","Operaciones",level,mode)));
 expect(lot.records).toHaveLength(50);expect(reopened.records).toHaveLength(6);
 for(const r of [...lot.records,...reopened.records]){
  const prior=old.find(x=>x.id===r.id)!;
  const item=bank.find(x=>x.id===r.id)!;
  expect(hash(prior),r.id).toBe(r.previous_sha256);
  expect(hash(item),r.id).toBe(r.content_sha256);
  if(item.oracle.kind==="Operaciones-diversidad")expect(hash(before.find(x=>x.id===r.id)!)).toBe(r.previous_revision_sha256);
  expect(item.prompt).toBe(r.stimulus);expect(item.expected).toBe(r.expected);
  if(item.mode==="clasificar"){expect(item.assertions).toEqual(r.assertions.map(a=>({text:a.text,truth:a.truth})));expect(r.assertions.every(a=>a.truth===a.oracle_truth)).toBe(true);}
  else {expect(item.steps.map(s=>({label:s.label,choices:s.choices,correct:s.choices[s.answerIndex]}))).toEqual(r.construction);expect(r.distractors).toHaveLength(6);}
  expect(r.semantic_status).toBe("REVIEW");
 }
});
it("R9 verifies all 18 archived successors and 432 untouched records",()=>{
 const old=MATH_LEVELS.flatMap(level=>MATH_MODES.flatMap(mode=>mathM3R8Pool("Aritmética","Operaciones",level,mode)));
 const bank=MATH_LEVELS.flatMap(level=>MATH_MODES.flatMap(mode=>mathM3Pool("Aritmética","Operaciones",level,mode)));
 const revisions=new Map<string,{previous_sha256:string;content_sha256:string}>(successors.records.map((r:{id:string;previous_sha256:string;content_sha256:string})=>[r.id,r]));
 expect(revisions.size).toBe(18);
 for(const [i,x] of bank.entries()){
  const r=revisions.get(x.id);
  if(r){expect(hash(old[i])).toBe(r.previous_sha256);expect(hash(x)).toBe(r.content_sha256);}
  else expect(hash(x)).toBe(hash(old[i]));
 }
});
