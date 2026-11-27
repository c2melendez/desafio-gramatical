// Historical R20 evidence: keep exact baseline; active R26 has a separate full-bank regression.
import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import {expect,it} from "vitest";
import {MATH_LEVELS,MATH_MODES} from "@/lib/math-m1";
import {mathM3R20Pool as mathM3Pool,mathM3R21CandidatePool} from "@/lib/math-m3";
import {repairOperationR22Candidate} from "@/lib/math-operations-r22-candidate";
import {repairOperationR23Candidate} from "@/lib/math-operations-r23-candidate";
// @ts-expect-error JS selector has no TypeScript declaration.
import {selectFrozen} from "../../qa/certification/select-frozen.mjs";
const load=(p:string)=>JSON.parse(readFileSync(p,"utf8"));
const hash=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
it("R24 frozen selection: all 450 candidate hashes, exact successor lineage, unchanged objectives, negative mutations",()=>{
 const index=load("qa/certification/rdg/evidence/MAT-ARIT-01-R24-candidate-selection-index.json");
 const ev=load(index.successors);
 const baseline=MATH_LEVELS.flatMap(level=>MATH_MODES.flatMap(mode=>mathM3Pool("Aritmética","Operaciones",level,mode)));
 const before=new Map(baseline.map(x=>[x.id,hash(x)]));
 const order=MATH_LEVELS.flatMap(level=>MATH_MODES.flatMap(mode=>mathM3R21CandidatePool("Aritmética","Operaciones",level,mode).map(x=>({row:{area:"matematicas",topic:"Aritmética",subtopic:"Operaciones",level,mode},item:repairOperationR23Candidate(repairOperationR22Candidate(x))}))));
 const successors=new Map<string,{previous_sha256:string;content_sha256:string}>(ev.records.map((x:{id:string;previous_sha256:string;content_sha256:string})=>[x.id,x]));
 expect(successors.size).toBe(89);expect(index.selection_paths).toHaveLength(9);
 const seen=new Set<string>();let changed=0,mutants=0;
 for(let i=0;i<9;i++){
  const m=load(index.selection_paths[i]),old=load(index.previous_selection_paths[i]);
  expect(m.rdg_contract).toEqual(old.rdg_contract);expect(m.items).toHaveLength(50);
  const selected=selectFrozen(order,m,hash);expect(selected).toHaveLength(50);
  for(let j=0;j<50;j++){
   const x=m.items[j],y=old.items[j];expect(x.id).toBe(y.id);expect(x.objective_ids).toEqual(y.objective_ids);
   expect(seen.has(x.id)).toBe(false);seen.add(x.id);expect(before.get(x.id)).toBe(y.content_sha256);
   const s=successors.get(x.id);
   if(s){expect(s.previous_sha256).toBe(y.content_sha256);expect(s.content_sha256).toBe(x.content_sha256);expect(x.content_sha256).not.toBe(y.content_sha256);changed++;}
   else expect(x.content_sha256).toBe(y.content_sha256);
  }
  const first=m.items[0],rest=m.items.slice(1);
  for(const bad of [
   {...m,items:[{...first,content_sha256:"0".repeat(64)},...rest]},
   {...m,items:[first,first,...rest.slice(1)]},
   {...m,items:[{...first,objective_ids:["UNKNOWN"]},...rest]},
   {...m,rdg_contract:{...m.rdg_contract,status:"REVIEW"}}
  ]){expect(()=>selectFrozen(order,bad,hash)).toThrow();mutants++;}
 }
 expect(seen.size).toBe(450);expect(changed).toBe(89);expect(mutants).toBe(36);
 console.log("RDG_R24_FROZEN "+JSON.stringify({ids:seen.size,changed,preserved:seen.size-changed,manifests:9,mutants,semantic_pass:0}));
},90000);
