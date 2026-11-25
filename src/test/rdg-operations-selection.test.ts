import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import {expect,it} from "vitest";
import {MATH_LEVELS,MATH_MODES} from "@/lib/math-m1";
import {mathM3HistoricalPool as mathM3Pool} from "@/lib/math-m3";
// The production frozen-selector is a JS module with no TS declarations.
// @ts-expect-error JS selector has no TypeScript declaration.
import {selectFrozen} from "../../qa/certification/select-frozen.mjs";
const load=(path:string)=>JSON.parse(readFileSync(path,"utf8"));
const hash=(item:unknown)=>createHash("sha256").update(JSON.stringify(item)).digest("hex");
it("G-REPASO: consume exact READY contract and reconcile every frozen P2 selection",()=>{
 const state=load("qa/certification/batch-state.json").rdg_continuity;
 const ready=load("qa/certification/rdg/contracts/MAT-ARIT-01.json");
 expect(ready.status).toBe("RDG_READY");
 expect(ready.gate_evidence.ci_run).toBe(45689363635);
 const order=MATH_LEVELS.flatMap(level=>MATH_MODES.flatMap(mode=>mathM3Pool("Aritmética","Operaciones",level,mode).map(item=>({row:{area:"matematicas",topic:"Aritmética",subtopic:"Operaciones",level,mode},item}))));
 const ids=new Set<string>();
 for(const path of state.selection_paths){
  const manifest=load(path);
  expect(manifest.rdg_contract).toEqual(ready);
  expect(manifest.items.length).toBeLessThanOrEqual(50);
  const selected=selectFrozen(order,manifest,hash);
  for(const {item} of selected){expect(ids.has(item.id)).toBe(false);ids.add(item.id);}
 }
 expect(ids.size).toBe(450);
 const manifest=load(state.selection_paths[0]);
 expect(manifest.items.filter((x:{objective_ids:string[]})=>x.objective_ids.includes("OP-04"))).toHaveLength(18);
 expect(()=>selectFrozen(order,{...manifest,rdg_contract:{...ready,status:"REVIEW"}},hash)).toThrow();
});
