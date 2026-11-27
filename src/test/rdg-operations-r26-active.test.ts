import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import {expect,it} from "vitest";
import {MATH_LEVELS,MATH_MODES} from "@/lib/math-m1";
import {mathM3Pool,mathM3R20Pool} from "@/lib/math-m3";
import {verifyMathM3Record} from "@/lib/math-m3-guards";
// @ts-expect-error historical JS selector
import {selectFrozen} from "../../qa/certification/select-frozen.mjs";
const load=(p:string)=>JSON.parse(readFileSync(p,"utf8"));
const hash=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
it("R26 active runtime: 30 exact R22/R23 successors, 420 preserved, 450 frozen IDs, all 98 prior PASS unchanged",()=>{
 const state=load("qa/certification/batch-state.json").rdg_continuity;
 const evidence=load("qa/certification/rdg/evidence/MAT-ARIT-01-R26-exam-g-h-screen.json");
 const reviews=["R22","R23"].flatMap(r=>load("qa/certification/rdg/evidence/MAT-ARIT-01-R24-"+r+"-adjudication-review.json").records);
 const selected=new Map<string,{content_hash:string;previous_sha256:string}>(reviews.map((r:{id:string;content_hash:string;previous_sha256:string})=>[r.id,r]));
 expect(selected.size).toBe(30);
 const baseline=MATH_LEVELS.flatMap(level=>MATH_MODES.flatMap(mode=>mathM3R20Pool("Aritmética","Operaciones",level,mode)));
 const active=MATH_LEVELS.flatMap(level=>MATH_MODES.flatMap(mode=>mathM3Pool("Aritmética","Operaciones",level,mode).map(item=>({row:{area:"matematicas",topic:"Aritmética",subtopic:"Operaciones",level,mode},item}))));
 expect(active).toHaveLength(450);expect(new Set(active.map(x=>x.item.id)).size).toBe(450);
 let changed=0,preserved=0;for(const {item} of active){const p=baseline.find(x=>x.id===item.id)!;const r=selected.get(item.id);expect(verifyMathM3Record(item,item.level)).toEqual([]);if(r){expect(hash(p)).toBe(r.previous_sha256);expect(hash(item)).toBe(r.content_hash);expect(hash(item)).not.toBe(hash(p));const e=evidence.records.find((x:{id:string})=>x.id===item.id);expect(e.content_hash).toBe(hash(item));expect(e.G_screen).toBe("NO_SIGNAL_IN_BOUNDED_SCREEN");changed++;}else{expect(hash(item)).toBe(hash(p));preserved++;}}
 expect(changed).toBe(30);expect(preserved).toBe(420);
 const seen=new Set<string>();for(const path of state.selection_paths){const manifest=load(path);for(const row of selectFrozen(active,manifest,hash)){expect(seen.has(row.item.id)).toBe(false);seen.add(row.item.id);}}
 expect(seen.size).toBe(450);
 const pass=["qa/certification/rdg/evidence/MAT-ARIT-01-v79-OP04-pass.json","qa/certification/rdg/evidence/MAT-ARIT-01-v79-R15-pass.json","qa/certification/rdg/evidence/MAT-ARIT-01-v79-R12-R14-pass.json"].flatMap((p:string)=>load(p).records.filter((x:{semantic_status:string})=>x.semantic_status==="PASS_SEMANTIC"));expect(new Set(pass.map((f:{id:string})=>f.id)).size).toBe(98);for(const f of pass){expect(hash(active.find(x=>x.item.id===f.id)!.item)).toBe(f.content_hash);expect(selected.has(f.id)).toBe(false);}
 expect(state.v79_individual_accounting.pass).toBeGreaterThanOrEqual(98);
 console.log("RDG_R26_ACTIVATION "+JSON.stringify({ids:450,changed,preserved,manifests:state.selection_paths.length,prior_pass:98,new_pass:0}));
});
