import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import {expect,it,vi,afterEach} from "vitest";
import {cleanup,fireEvent,render,screen} from "@testing-library/react";
import {MATH_LEVELS,MATH_MODES} from "@/lib/math-m1";
import {mathM3R21CandidatePool} from "@/lib/math-m3";
import {repairOperationR22Candidate} from "@/lib/math-operations-r22-candidate";
import {repairOperationR23Candidate} from "@/lib/math-operations-r23-candidate";
import {verifyMathM3Record} from "@/lib/math-m3-guards";
import {MathExerciseCard} from "@/components/games/MathExerciseCard";
import {OPERATIONS_ROUTE} from "@/lib/rdg/operations";
// @ts-expect-error JS selector has no TypeScript declaration.
import {selectFrozen} from "../../qa/certification/select-frozen.mjs";
const load=(p:string)=>JSON.parse(readFileSync(p,"utf8"));
const e=load("qa/certification/rdg/evidence/MAT-ARIT-01-R22-R23-candidate-successors.json");
const index=load(e.source_selection_index);
const state=load("qa/certification/batch-state.json").rdg_continuity;
const sha=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
const base=MATH_LEVELS.flatMap(level=>MATH_MODES.flatMap(mode=>mathM3R21CandidatePool("Aritmética","Operaciones",level,mode).map(item=>({row:{area:"matematicas",topic:"Aritmética",subtopic:"Operaciones",level,mode},item}))));
const next=base.map(x=>({...x,item:repairOperationR23Candidate(repairOperationR22Candidate(x.item))}));
const norm=(x:string)=>x.normalize("NFKC").toLowerCase().replace(/[−–]/g,"-").replace(/\s/g,"");
afterEach(cleanup);
it("R22/R23: frozen successor manifests against R21 baseline; 30 replacements, 420 preserved, 98 PASS unchanged",()=>{
 const seen=new Set<string>();let changed=0,preserved=0;
 expect(e.records).toHaveLength(30);expect(new Set(e.records.map((x:{id:string})=>x.id)).size).toBe(30);
 for(const p of index.selection_paths){
  const old=load(p);selectFrozen(base,old,sha);
  const proposed={...old,items:old.items.map((x:{id:string;content_sha256:string})=>{
   expect(seen.has(x.id)).toBe(false);seen.add(x.id);
   const f=e.records.find((v:{id:string})=>v.id===x.id);
   if(!f){preserved++;return x;}expect(x.content_sha256).toBe(f.previous_sha256);changed++;
   return {...x,content_sha256:f.content_sha256};
  })};
  selectFrozen(next,proposed,sha);
 }
 expect(seen.size).toBe(450);expect(changed).toBe(30);expect(preserved).toBe(420);
 let pass=0;for(const p of state.v79_semantic_pass_paths)for(const f of load(p).records)if(f.semantic_status==="PASS_SEMANTIC"){
  expect(sha(next.find(y=>y.item.id===f.id)!.item)).toBe(f.content_hash);pass++;
 }
 expect(pass).toBe(state.semantic_pass_ids);expect(pass).toBeGreaterThanOrEqual(98);
 for(const f of e.records){const x=next.find(y=>y.item.id===f.id)!.item;
  expect(verifyMathM3Record(x,x.level)).toEqual([]);expect(x.prompt).toBe(f.stimulus);
  expect(x.expected).toBe(String(f.revision==="R22"?f.key:f.oracle.key));expect(x.steps[0].choices[x.steps[0].answerIndex]).toBe(String(f.revision==="R22"?f.step:f.oracle.step));
  expect(next.filter(y=>y.item.id!==x.id&&norm(y.item.prompt)===norm(x.prompt))).toEqual([]);
  expect([...OPERATIONS_ROUTE.lessons,...OPERATIONS_ROUTE.transfer].filter(y=>norm(y.prompt)===norm(x.prompt))).toEqual([]);
 }
 console.log("RDG_R22_R23_FROZEN "+JSON.stringify({ids:seen.size,changed,preserved,prior_pass_preserved:pass,semantic_pass:0}));
});
it("R22/R23: every visible wrong option and all classification decisions, plus correct paths",()=>{
 let correct=0,wrong=0,classification=0;
 for(const f of e.records){
  const x=next.find(y=>y.item.id===f.id)!.item;
  if(x.mode==="clasificar"){
   for(const invert of [false,true]){
    const report=vi.fn();render(<MathExerciseCard item={x} onResult={report} onNext={vi.fn()} isLast={false}/>);
    const chosen=x.assertions.map(a=>(invert?!a.truth:a.truth)?"Verdadero":"Falso");
    for(const c of chosen)fireEvent.click(screen.getByRole("button",{name:c,exact:true}));
    expect(report).toHaveBeenCalledTimes(1);expect(report).toHaveBeenCalledWith(!invert,chosen.join(" · "));
    if(invert){for(const a of x.assertions){expect(screen.getByTestId("learning-feedback")).toHaveTextContent(x.assertionExplanations![a.text]);classification++;}}else correct++;
    cleanup();
   }
   continue;
  }
  const lists=x.mode==="quiz"?[x.options]:x.steps.map(s=>s.choices),keys=x.mode==="quiz"?[x.answerIndex]:x.steps.map(s=>s.answerIndex);
  const cases=[{i:-1,value:""},...lists.flatMap((choices,i)=>choices.filter((_,j)=>j!==keys[i]).map(value=>({i,value})))];
  for(const c of cases){
   const report=vi.fn();render(<MathExerciseCard item={x} onResult={report} onNext={vi.fn()} isLast={false}/>);
   const chosen=lists.map((o,j)=>j===c.i?c.value:o[keys[j]]);
   for(const v of chosen)fireEvent.click(screen.getByRole("button",{name:v,exact:true}));
   expect(report).toHaveBeenCalledTimes(1);expect(report).toHaveBeenCalledWith(c.i===-1,chosen.join(" → "));
   if(c.i===-1)correct++;else{const cause=(x.mode==="quiz"||c.i===1?x.optionExplanations:x.stepOptionExplanations)![c.value];expect(cause).toBeTruthy();expect(screen.getByTestId("learning-feedback")).toHaveTextContent(cause);wrong++;}
   cleanup();
  }
 }
 expect(correct).toBe(30);expect(classification).toBe(18);expect(wrong).toBeGreaterThan(100);
 console.log("RDG_R22_R23_UI "+JSON.stringify({ids:30,correct,wrong,classification,semantic_pass:0}));
},90000);
