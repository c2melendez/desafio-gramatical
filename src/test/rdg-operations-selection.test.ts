import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import {expect,it} from "vitest";
import {MATH_LEVELS,MATH_MODES} from "@/lib/math-m1";
import {mathM3HistoricalPool as mathM3Pool,mathM3Pool as currentPool} from "@/lib/math-m3";
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
 for(const path of state.historical_selection_paths){
  const manifest=load(path);
  expect(manifest.rdg_contract).toEqual(ready);
  expect(manifest.items.length).toBeLessThanOrEqual(50);
  const selected=selectFrozen(order,manifest,hash);
  for(const {item} of selected){expect(ids.has(item.id)).toBe(false);ids.add(item.id);}
 }
 expect(ids.size).toBe(450);
 const manifest=load(state.historical_selection_paths[0]);
 expect(manifest.items.filter((x:{objective_ids:string[]})=>x.objective_ids.includes("OP-04"))).toHaveLength(18);
 expect(()=>selectFrozen(order,{...manifest,rdg_contract:{...ready,status:"REVIEW"}},hash)).toThrow();
});

it("G-REPASO R4: verifies 450 exact current hashes and objective mappings; historical selections remain intact",()=>{
 const state=load("qa/certification/batch-state.json").rdg_continuity;
 const ready=load(state.rdg_contract_path);
 expect(ready.revision).toBe("4");expect(ready.status).toBe("RDG_READY");expect(ready.gate_evidence.tested_sha).toBe(ready.gate_evidence.render_sha);
 const order=MATH_LEVELS.flatMap(level=>MATH_MODES.flatMap(mode=>currentPool("Aritmética","Operaciones",level,mode).map(item=>({row:{area:"matematicas",topic:"Aritmética",subtopic:"Operaciones",level,mode},item}))));
 const historical=new Map<string,{id:string,content_sha256:string,objective_ids:string[]}>();for(const path of state.historical_selection_paths)for(const x of load(path).items)historical.set(x.id,x);
 const fix:Record<string,string[]>={"cociente-de-diferencia-racional-con-raiz":["OP-04"],"raiz-producto-suma-resta":["OP-01","OP-04"],"dos-raices-en-producto-agrupado":["OP-01","OP-04"],"raiz-racional-resta-agrupada":["OP-04"],"distribuir-sobre-raiz-racional":["OP-04"],"raiz-producto-cociente-agrupado":["OP-01","OP-04"]};
 const ids=new Set<string>();let corrected=0,changed=0;
 for(const path of state.selection_paths){const manifest=load(path);expect(manifest.rdg_contract).toEqual(ready);expect(manifest.items).toHaveLength(50);const selected=selectFrozen(order,manifest,hash);
  for(let i=0;i<selected.length;i++){const item=selected[i].item,x=manifest.items[i],old=historical.get(item.id)!;expect(ids.has(item.id)).toBe(false);ids.add(item.id);expect(x.objective_ids).toEqual(fix[item.operation]??old.objective_ids);if(JSON.stringify(old.objective_ids)!==JSON.stringify(x.objective_ids))corrected++;if(old.content_sha256!==x.content_sha256)changed++;}
 }
 expect(ids.size).toBe(450);expect(corrected).toBe(54);expect(changed).toBe(432);
 const manifest=load(state.selection_paths[0]);const bad={...manifest,items:[{...manifest.items[0],content_sha256:"0".repeat(64)},...manifest.items.slice(1)]};expect(()=>selectFrozen(order,bad,hash)).toThrow("Hash obsoleto");
});
