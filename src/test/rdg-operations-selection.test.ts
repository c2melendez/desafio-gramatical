import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import {expect,it} from "vitest";
import {MATH_LEVELS,MATH_MODES} from "@/lib/math-m1";
import {mathM3HistoricalPool as mathM3Pool,mathM3R16Pool as currentPool,mathM3R17Pool as activePool,mathM3R18Pool as currentR18Pool,mathM3Pool as currentR19Pool} from "@/lib/math-m3";
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

it("G-REPASO R4: verifies 450 exact frozen R16 hashes and objective mappings; historical selections remain intact",()=>{
 const state=load("qa/certification/batch-state.json").rdg_continuity;
 const ready=load(state.rdg_contract_path);
 expect(ready.revision).toBe("4");expect(ready.status).toBe("RDG_READY");expect(ready.gate_evidence.tested_sha).toBe(ready.gate_evidence.render_sha);
 const order=MATH_LEVELS.flatMap(level=>MATH_MODES.flatMap(mode=>currentPool("Aritmética","Operaciones",level,mode).map(item=>({row:{area:"matematicas",topic:"Aritmética",subtopic:"Operaciones",level,mode},item}))));
 const historical=new Map<string,{id:string,content_sha256:string,objective_ids:string[]}>();for(const path of state.historical_selection_paths)for(const x of load(path).items)historical.set(x.id,x);
 const fix:Record<string,string[]>={"cociente-de-diferencia-racional-con-raiz":["OP-04"],"raiz-producto-suma-resta":["OP-01","OP-04"],"dos-raices-en-producto-agrupado":["OP-01","OP-04"],"raiz-racional-resta-agrupada":["OP-04"],"distribuir-sobre-raiz-racional":["OP-04"],"raiz-producto-cociente-agrupado":["OP-01","OP-04"]};
 const ids=new Set<string>();let corrected=0,changed=0;
 for(const path of state.r16_selection_paths){const manifest=load(path);expect(manifest.rdg_contract).toEqual(ready);expect(manifest.items).toHaveLength(50);const selected=selectFrozen(order,manifest,hash);
  for(let i=0;i<selected.length;i++){const item=selected[i].item,x=manifest.items[i],old=historical.get(item.id)!;expect(ids.has(item.id)).toBe(false);ids.add(item.id);expect(x.objective_ids).toEqual(fix[item.operation]??old.objective_ids);if(JSON.stringify(old.objective_ids)!==JSON.stringify(x.objective_ids))corrected++;if(old.content_sha256!==x.content_sha256)changed++;}
 }
 expect(ids.size).toBe(450);expect(corrected).toBe(54);expect(changed).toBe(432);
 const manifest=load(state.r16_selection_paths[0]);const bad={...manifest,items:[{...manifest.items[0],content_sha256:"0".repeat(64)},...manifest.items.slice(1)]};expect(()=>selectFrozen(order,bad,hash)).toThrow("Hash obsoleto");
});

it("R17: historical frozen selections match all 450 runtime hashes and six exact successors",()=>{
 const state=load("qa/certification/batch-state.json").rdg_continuity;
 const order=MATH_LEVELS.flatMap(level=>MATH_MODES.flatMap(mode=>activePool("Aritmética","Operaciones",level,mode).map(item=>({row:{area:"matematicas",topic:"Aritmética",subtopic:"Operaciones",level,mode},item}))));
 const e=load("qa/certification/rdg/evidence/MAT-ARIT-01-R17-successors.json");const successors=new Map<string,{previous_sha256:string,content_sha256:string}>(e.records.map((x:{id:string,previous_sha256:string,content_sha256:string})=>[x.id,x]));
 let changed=0,count=0;const ids=new Set<string>();
 for(let i=0;i<state.r17_selection_paths.length;i++){const old=load(state.r16_selection_paths[i]),now=load(state.r17_selection_paths[i]);const selected=selectFrozen(order,now,hash);for(let j=0;j<selected.length;j++){const x=now.items[j],before=old.items[j],r=successors.get(x.id);expect(x.id).toBe(before.id);expect(ids.has(x.id)).toBe(false);ids.add(x.id);if(r){expect(before.content_sha256).toBe(r.previous_sha256);expect(x.content_sha256).toBe(r.content_sha256);changed++;}else expect(x.content_sha256).toBe(before.content_sha256);count++;}}
 expect(count).toBe(450);expect(changed).toBe(6);
 const review=load("qa/certification/rdg/evidence/MAT-ARIT-01-R4-01-OP02-03-review.json");expect(review.records).toHaveLength(32);
 for(const f of review.records){const x=order.find(y=>y.item.id===f.id)!.item;expect(hash(x)).toBe(f.content_hash);expect(x.prompt).toBe(f.stimulus);expect(x.expected).toBe(f.respuesta_esperada);expect(x.assertions).toEqual(f.assertions.map((a:{text:string,truth:boolean})=>({text:a.text,truth:a.truth})));expect(f.semantic_status).toBe("REVIEW");}
});

it("R18: active 450 hashes reconcile 59 successors and preserve 391",()=>{
 const state=load("qa/certification/batch-state.json").rdg_continuity;
 const order=MATH_LEVELS.flatMap(level=>MATH_MODES.flatMap(mode=>currentR18Pool("Aritmética","Operaciones",level,mode).map(item=>({row:{area:"matematicas",topic:"Aritmética",subtopic:"Operaciones",level,mode},item}))));
 const e=load("qa/certification/rdg/evidence/MAT-ARIT-01-R18-successors.json");const succ=new Map<string,{previous_sha256:string,content_sha256:string}>(e.records.map((x:{id:string,previous_sha256:string,content_sha256:string})=>[x.id,x]));let changed=0;const seen=new Set<string>();
 for(let i=0;i<state.r18_selection_paths.length;i++){const old=load(state.r17_selection_paths[i]),now=load(state.r18_selection_paths[i]);const selected=selectFrozen(order,now,hash);for(let j=0;j<selected.length;j++){const x=now.items[j],y=old.items[j],z=succ.get(x.id);expect(x.id).toBe(y.id);expect(seen.has(x.id)).toBe(false);seen.add(x.id);if(z){expect(y.content_sha256).toBe(z.previous_sha256);expect(x.content_sha256).toBe(z.content_sha256);changed++;}else expect(x.content_sha256).toBe(y.content_sha256);}}
 expect(seen.size).toBe(450);expect(changed).toBe(59);
});

it("R19: active 450 hashes reconcile exactly 34 successors, preserve 416 and OP04",()=>{
 const state=load("qa/certification/batch-state.json").rdg_continuity;
 const order=MATH_LEVELS.flatMap(level=>MATH_MODES.flatMap(mode=>currentR19Pool("Aritmética","Operaciones",level,mode).map(item=>({row:{area:"matematicas",topic:"Aritmética",subtopic:"Operaciones",level,mode},item}))));
 const e=load("qa/certification/rdg/evidence/MAT-ARIT-01-R19-successors.json");const succ=new Map<string,{previous_sha256:string,content_sha256:string}>(e.records.map((x:{id:string,previous_sha256:string,content_sha256:string})=>[x.id,x]));const seen=new Set<string>();let changed=0,preserved=0;
 for(let i=0;i<state.selection_paths.length;i++){const old=load(state.r18_selection_paths[i]),now=load(state.selection_paths[i]);const selected=selectFrozen(order,now,hash);for(let j=0;j<selected.length;j++){const x=now.items[j],y=old.items[j],z=succ.get(x.id);expect(x.id).toBe(y.id);expect(x.objective_ids).toEqual(y.objective_ids);expect(seen.has(x.id)).toBe(false);seen.add(x.id);if(z){expect(y.content_sha256).toBe(z.previous_sha256);expect(x.content_sha256).toBe(z.content_sha256);changed++;}else{expect(x.content_sha256).toBe(y.content_sha256);preserved++;}}}
 expect(seen.size).toBe(450);expect(changed).toBe(34);expect(preserved).toBe(416);
 const pass=load("qa/certification/rdg/evidence/MAT-ARIT-01-v79-OP04-pass.json");expect(pass.records).toHaveLength(18);for(const f of pass.records){expect(hash(order.find(x=>x.item.id===f.id)!.item)).toBe(f.content_hash);expect(succ.has(f.id)).toBe(false);}
 console.log("RDG_R19_INTEGRATION "+JSON.stringify({ids:seen.size,changed,preserved,prior_pass_preserved:18,semantic_pass_new:0}));
});
