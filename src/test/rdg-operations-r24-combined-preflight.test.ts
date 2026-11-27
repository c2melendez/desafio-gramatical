// Historical R20 evidence: keep exact baseline; active R26 has a separate full-bank regression.
import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import {expect,it} from "vitest";
import {MATH_LEVELS,MATH_MODES,type MathModel} from "@/lib/math-m1";
import {mathM3R20Pool as mathM3Pool,mathM3R21CandidatePool} from "@/lib/math-m3";
import {repairOperationR22Candidate} from "@/lib/math-operations-r22-candidate";
import {repairOperationR23Candidate} from "@/lib/math-operations-r23-candidate";
import {verifyMathM3Record} from "@/lib/math-m3-guards";
const hash=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
const load=(p:string)=>JSON.parse(readFileSync(p,"utf8"));
const norm=(p:string)=>p.normalize("NFKC").replace(/[−–]/g,"-").replace(/\s/g,"").toLowerCase();
it("R24 combined activation preflight: 450 stable IDs, disjoint successors, prior semantic PASS, guards and cross-revision collisions",()=>{
 const bank=(factory:typeof mathM3Pool)=>MATH_LEVELS.flatMap(l=>MATH_MODES.flatMap(m=>factory("Aritmética","Operaciones",l,m)));
 const old=bank(mathM3Pool),r21=bank(mathM3R21CandidatePool);
 expect(old).toHaveLength(450);expect(r21).toHaveLength(450);
 const before=new Map(old.map(x=>[x.id,x]));expect(before.size).toBe(450);
 const state=load("qa/certification/batch-state.json").rdg_continuity;
 const prior=new Map<string,string>();
 for(const p of state.r26_prior_pass_paths)for(const f of load(p).records)if(f.semantic_status==="PASS_SEMANTIC")prior.set(f.id,f.content_hash);
 expect(prior.size).toBe(98);
 const counts=[0,0,0],records:MathModel[]=[],changed=new Set<string>();
 for(const a of r21){
  const x=before.get(a.id)!;expect(x).toBeDefined();
  const b=repairOperationR22Candidate(x),c=repairOperationR23Candidate(x);
  const variants=[a,b,c].map((v,i)=>({v,i})).filter(({v})=>hash(v)!==hash(x));
  expect(variants.length,"overlapping repairs "+x.id).toBeLessThanOrEqual(1);
  const final=repairOperationR23Candidate(repairOperationR22Candidate(a));
  expect(final.id).toBe(x.id);
  if(variants.length){const {v,i}=variants[0];expect(hash(final)).toBe(hash(v));counts[i]++;changed.add(x.id);}
  else expect(hash(final)).toBe(hash(x));
  expect(verifyMathM3Record(final,final.level),final.id).toEqual([]);
  if(prior.has(x.id)) {expect(hash(x)).toBe(prior.get(x.id));expect(hash(final)).toBe(prior.get(x.id));}
  records.push(final);
 }
 expect(counts).toEqual([59,22,8]);expect(changed.size).toBe(89);
 const tuple=(x:MathModel)=>x.operation+"|"+x.expected+"|"+x.steps[0].choices[x.steps[0].answerIndex];
 const signals=[];for(const x of records.filter(v=>changed.has(v.id))){
  const oldX=before.get(x.id)!;
  for(const y of records.filter(v=>v.id!==x.id)){
   const oldY=before.get(y.id)!;
   if((norm(x.prompt)===norm(y.prompt)&&norm(oldX.prompt)!==norm(oldY.prompt))||
      (tuple(x)===tuple(y)&&tuple(oldX)!==tuple(oldY)))signals.push([x.id,y.id]);
  }
  console.log("RDG_R24_SUCCESSOR "+JSON.stringify({id:x.id,previous_sha256:hash(oldX),content_sha256:hash(x),semantic_status:"REVIEW"}));
 }
 console.log("RDG_R24_COMBINED "+JSON.stringify({total:records.length,changed:changed.size,preserved:records.length-changed.size,prior_pass:prior.size,counts,signals,semantic_pass:0}));
 expect(signals,"new cross-revision collisions").toEqual([]);
},90000);
