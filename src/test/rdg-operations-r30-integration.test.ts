import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import {expect,it} from "vitest";
import {MATH_TOPICS,MATH_LEVELS,MATH_MODES} from "@/lib/math-m1";
import {mathM3Pool,mathM3R26Pool} from "@/lib/math-m3";
import {verifyMathM3Record} from "@/lib/math-m3-guards";
// @ts-expect-error JS selector
import {selectFrozen} from "../../qa/certification/select-frozen.mjs";
const load=(p:string)=>JSON.parse(readFileSync(p,"utf8"));
const hash=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
it("R30: all 9900 active records preserve scope, exactly 62 successors, all 125 PASS unchanged",()=>{
 const e=load("qa/certification/rdg/evidence/MAT-ARIT-01-R30-integration.json");
 const state=load("qa/certification/batch-state.json").rdg_continuity;
 const changes=new Map<string,{previous:string;next:string;origin:string}>(e.records.map((r:{id:string;previous:string;next:string;origin:string})=>[r.id,r]));
 expect(changes.size).toBe(62);expect(state.selection_paths).toEqual(e.selection_paths);
 const order=[];let changed=0,total=0;
 for(const topic of MATH_TOPICS)for(const subtopic of topic.subtopics)for(const level of MATH_LEVELS)for(const mode of MATH_MODES){
  const before=mathM3R26Pool(topic.name,subtopic,level,mode),after=mathM3Pool(topic.name,subtopic,level,mode);
  expect(after.length).toBe(before.length);
  for(let i=0;i<after.length;i++){
   const x=after[i],y=before[i],r=changes.get(x.id);expect(x.id).toBe(y.id);
   if(r){expect(hash(y)).toBe(r.previous);expect(hash(x)).toBe(r.next);expect(verifyMathM3Record(x,level)).toEqual([]);changed++;}
   else expect(hash(x)).toBe(hash(y));
   if(subtopic==="Operaciones"&&topic.name==="Aritmética")order.push({row:{area:"matematicas",topic:topic.name,subtopic,level,mode},item:x});
   total++;
  }
 }
 expect(total).toBe(9900);expect(changed).toBe(62);expect(order.length).toBe(450);
 const selected=new Set();for(const path of state.selection_paths)for(const row of selectFrozen(order,load(path),hash)){expect(selected.has(row.item.id)).toBe(false);selected.add(row.item.id);}
 expect(selected.size).toBe(450);
 const pass=["qa/certification/rdg/evidence/MAT-ARIT-01-v79-OP04-pass.json","qa/certification/rdg/evidence/MAT-ARIT-01-v79-R15-pass.json","qa/certification/rdg/evidence/MAT-ARIT-01-v79-R12-R14-pass.json","qa/certification/rdg/evidence/MAT-ARIT-01-v79-R27-pass.json"].flatMap((p:string)=>load(p).records.filter((r:{semantic_status:string})=>r.semantic_status==="PASS_SEMANTIC"));
 expect(pass.length).toBe(125);expect(new Set(pass.map((r:{id:string})=>r.id)).size).toBe(125);
 for(const r of pass){expect(changes.has(r.id)).toBe(false);expect(hash(order.find(x=>x.item.id===r.id)!.item)).toBe(r.content_hash);}
 console.log("RDG_R30_INTEGRATION "+JSON.stringify({changed,preserved:450-changed,global:total,prior_pass:pass.length,new_pass:0}));
},90000);
