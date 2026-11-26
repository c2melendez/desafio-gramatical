import {readFileSync} from "node:fs";
import {createHash} from "node:crypto";
import {mathM3R16Pool as mathM3Pool,mathM3R15Pool} from "../../../src/lib/math-m3.ts";
import {MATH_LEVELS,MATH_MODES} from "../../../src/lib/math-m1.ts";
const evidence=JSON.parse(readFileSync("qa/certification/rdg/evidence/MAT-ARIT-01-R16-successors.json"));
const hash=x=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
const byId=new Map(evidence.records.map(x=>[x.id,x]));
if(byId.size!==evidence.records.length) throw Error("duplicate ID");
let changed=0,preserved=0;
for(const level of MATH_LEVELS) for(const mode of MATH_MODES){
 const old=mathM3R15Pool("Aritmética","Operaciones",level,mode),now=mathM3Pool("Aritmética","Operaciones",level,mode);
 if(old.length!==now.length) throw Error("pool size changed");
 for(let i=0;i<now.length;i++){
  if(old[i].id!==now[i].id) throw Error("ID changed");
  const record=byId.get(now[i].id);
  if(record){
   if(hash(old[i])!==record.previous_sha256||hash(now[i])!==record.content_sha256||record.semantic_status!=="REVIEW") throw Error("evidence mismatch: "+now[i].id);
   changed++;
  }else{
   if(hash(old[i])!==hash(now[i])) throw Error("untracked change: "+now[i].id);
   preserved++;
  }
 }
}
if(changed!==28||preserved!==422||byId.size!==changed) throw Error("inventory mismatch");
console.log(JSON.stringify({status:"PASS",changed,preserved,review:changed,semantic_pass:0}));
