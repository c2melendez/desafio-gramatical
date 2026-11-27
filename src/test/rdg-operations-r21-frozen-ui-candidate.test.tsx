// Historical R20 evidence: keep exact baseline; active R26 has a separate full-bank regression.
import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import {expect,it,vi,afterEach} from "vitest";
import {cleanup,fireEvent,render,screen} from "@testing-library/react";
import {MATH_LEVELS,MATH_MODES} from "@/lib/math-m1";
import {mathM3R20Pool as mathM3Pool,mathM3R21CandidatePool} from "@/lib/math-m3";
import {MathExerciseCard} from "@/components/games/MathExerciseCard";
import {operationR20WrongCause} from "@/lib/math-operations-r20-error-cause";
// @ts-expect-error JS selector has no TypeScript declaration.
import {selectFrozen} from "../../qa/certification/select-frozen.mjs";
const load=(p:string)=>JSON.parse(readFileSync(p,"utf8"));
const hash=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
const index=load("qa/certification/rdg/evidence/MAT-ARIT-01-R21-candidate-selection-index.json");
const manifest=load(index.successors);
const state=load("qa/certification/batch-state.json").rdg_continuity;
const order=MATH_LEVELS.flatMap(level=>MATH_MODES.flatMap(mode=>mathM3R21CandidatePool("Aritmética","Operaciones",level,mode).map(item=>({row:{area:"matematicas",topic:"Aritmética",subtopic:"Operaciones",level,mode},item}))));
afterEach(cleanup);
it("R21 frozen candidate: 450 IDs, 59 exact successors, 391 unchanged, preserve all current PASS",()=>{
 const current=MATH_LEVELS.flatMap(level=>MATH_MODES.flatMap(mode=>mathM3Pool("Aritmética","Operaciones",level,mode)));
 const before=new Map(current.map(x=>[x.id,hash(x)]));
 const seen=new Set<string>();let changed=0,preserved=0;
 for(let i=0;i<index.selection_paths.length;i++){
  const m=load(index.selection_paths[i]),old=load(index.previous_selection_paths[i]);const selected=selectFrozen(order,m,hash);
  expect(selected).toHaveLength(50);expect(m.rdg_contract).toEqual(old.rdg_contract);
  for(let j=0;j<selected.length;j++){const x=m.items[j],y=old.items[j];expect(x.id).toBe(y.id);expect(x.objective_ids).toEqual(y.objective_ids);expect(seen.has(x.id)).toBe(false);seen.add(x.id);expect(before.get(x.id)).toBe(y.content_sha256);
   const s=manifest.records.find((r:{id:string})=>r.id===x.id);
   if(s){expect(s.previous_sha256).toBe(y.content_sha256);expect(s.content_sha256).toBe(x.content_sha256);changed++;}
   else{expect(x.content_sha256).toBe(y.content_sha256);preserved++;}
  }
 }
 expect(seen.size).toBe(450);expect(changed).toBe(59);expect(preserved).toBe(391);
 const pass=new Map<string,string>();for(const p of state.v79_semantic_pass_paths)for(const f of load(p).records)if(f.semantic_status==="PASS_SEMANTIC")pass.set(f.id,f.content_hash);
 expect(pass.size).toBe(98);
 for(const [id,h] of pass){expect(hash(order.find(x=>x.item.id===id)!.item)).toBe(h);expect(before.get(id)).toBe(h);}
 const bad=load(index.selection_paths[0]);expect(()=>selectFrozen(order,{...bad,items:[{...bad.items[0],content_sha256:"0".repeat(64)},...bad.items.slice(1)]},hash)).toThrow("Hash obsoleto");
 console.log("RDG_R21_FROZEN_CANDIDATE "+JSON.stringify({ids:seen.size,changed,preserved,prior_pass_preserved:pass.size,semantic_pass:0}));
});
it("R21 candidate UI: every claim in all 59 records, correct and wrong paths, including 000 and 111",()=>{
 let correct=0,wrong=0,causes=0;const masks=new Set<string>();
 for(const f of manifest.records){const x=order.find(y=>y.item.id===f.id)!.item;expect(hash(x)).toBe(f.content_sha256);masks.add(f.mask);
  for(const invert of [false,true]){
   const report=vi.fn();render(<MathExerciseCard item={x} onResult={report} onNext={vi.fn()} isLast={false}/>);
   const chosen=x.assertions.map(a=>(invert?!a.truth:a.truth)?"Verdadero":"Falso");
   for(const label of chosen)fireEvent.click(screen.getByRole("button",{name:label,exact:true}));
   expect(report).toHaveBeenCalledTimes(1);expect(report).toHaveBeenCalledWith(!invert,chosen.join(" · "));
   if(invert){const fb=screen.getByTestId("learning-feedback");for(const a of x.assertions){expect(fb).toHaveTextContent(x.assertionExplanations![a.text]);if(!a.truth){const cause=operationR20WrongCause(x,a.text);expect(cause).toBeTruthy();expect(fb).toHaveTextContent(cause!);causes++;}wrong++;}}
   else correct+=3;
   cleanup();
  }
  expect(hash(x)).toBe(f.content_sha256);
 }
 expect(correct).toBe(177);expect(wrong).toBe(177);expect(masks.size).toBe(8);
 console.log("RDG_R21_UI_CANDIDATE "+JSON.stringify({ids:59,correct,wrong,causes,masks:[...masks].sort(),semantic_pass:0}));
},90000);
