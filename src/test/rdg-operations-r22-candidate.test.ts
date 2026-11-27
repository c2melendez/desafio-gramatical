// Historical R20 evidence: keep exact baseline; active R26 has a separate full-bank regression.
import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import {expect,it} from "vitest";
import {MATH_LEVELS,MATH_MODES,type MathModel} from "@/lib/math-m1";
import {mathM3R20Pool as mathM3Pool} from "@/lib/math-m3";
import {verifyMathM3Record} from "@/lib/math-m3-guards";
import {repairOperationR22Candidate} from "@/lib/math-operations-r22-candidate";
const hash=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
const e=JSON.parse(readFileSync("qa/certification/rdg/evidence/MAT-ARIT-01-v79-R12-R14-publication-candidates.json","utf8"));
const norm=(p:string)=>p.normalize("NFKC").replace(/[−–]/g,"-").replace(/\s/g,"").toLowerCase();
function oracle(x:MathModel){
 const n=x.prompt.match(/\d+/g)?.map(Number)??[];let key:number,step:number,wrong:number[],mid:number[];
 switch(x.operation){
 case "cociente-con-agrupacion":{const [a,b,c]=n;step=b+c;key=a/step;wrong=[a/b+c,key+c,a-b-c];mid=[b*c,b,c];break;}
 case "cero-dividido-por-no-cero":{const [a,b,c,d]=n;if(a!==b||c===0)throw Error("domain");step=a-b;key=step/c+d;wrong=[a/c+d,a-c+d,d+c];mid=[a,2*a,-a];break;}
 case "completar-igualdad-distributiva":{const [a,b,c,f,g,d]=n;step=a*(b-c);key=f*(g+d)-step;wrong=[f*(g+d),a*(c-d),c+d];mid=[a*b-c,a*(b+c),b-c];break;}
 case "factor-comun-diferencia-compuesta":{const [a,b,c,t]=n;const valid=Array.from({length:201},(_,i)=>i-100).filter(k=>a*k-(b-c)*k===t);if(valid.length!==1)throw Error("nonunique");key=valid[0];step=a-(b-c);wrong=[t,-key,t+c];mid=[a+c,a,-c];break;}
 case "resta-anidada-distributiva":{const [a,b,d,f,t]=n;const valid=Array.from({length:201},(_,i)=>i-100).filter(k=>a-(b-k*(d-f))===t);if(valid.length!==1)throw Error("nonunique");key=valid[0];step=key*(d-f);wrong=[step,-key,step-(d-f)];mid=[t-a,a-b-t,t+a-b];break;}
 case "dos-raices-en-producto-agrupado":{const [a,b,d,f,t]=n;const ra=Math.sqrt(a),rd=Math.sqrt(d);if(!Number.isInteger(ra)||!Number.isInteger(rd))throw Error("roots");const valid=Array.from({length:201},(_,i)=>i-100).filter(k=>(ra-b)*(k+rd)-f===t);if(valid.length!==1)throw Error("nonunique");key=valid[0];step=key+rd;wrong=[step,step+rd,-key];mid=[t+f,t+f-(ra-b),step+f];break;}
 default:throw Error("family");
 }
 if(!Number.isInteger(key)||!Number.isInteger(step)||String(key)!==x.expected||String(key)!==x.options[x.answerIndex]||String(step)!==x.steps[0].choices[x.steps[0].answerIndex])throw Error("wrong key or step");
 if(key===step)throw Error("redundant step");
 if(wrong.some(v=>!x.options.includes(String(v))||!x.optionExplanations?.[String(v)])||mid.some(v=>!x.steps[0].choices.includes(String(v))||!x.stepOptionExplanations?.[String(v)]))throw Error("wrong alternatives or feedback");
 return {key,step,wrong,mid};
}
it("R22: 22 repairs, visible independent oracles, full 450 collision screen, preserve 428 current hashes",()=>{
 const live=MATH_LEVELS.flatMap(l=>MATH_MODES.flatMap(m=>mathM3Pool("Aritmética","Operaciones",l,m)));
 const candidates=live.map(repairOperationR22Candidate);
 const target=new Set<string>(e.records.filter((x:{promotion_candidate:boolean})=>!x.promotion_candidate).map((x:{id:string})=>x.id));
 expect(target.size).toBe(22);expect(live).toHaveLength(450);let changed=0,unchanged=0,mutants=0,choices=0,signals=0;
 for(let i=0;i<live.length;i++){
  const old=live[i],x=candidates[i];if(!target.has(old.id)){expect(hash(x)).toBe(hash(old));unchanged++;continue;}
  expect(hash(x)).not.toBe(hash(old));expect(verifyMathM3Record(x,x.level)).toEqual([]);expect(x.id).toBe(old.id);expect(x.operation).toBe(old.operation);
  const o=oracle(x);choices+=6;for(const bad of [{...x,expected:String(o.key+1)},{...x,steps:[{...x.steps[0],answerIndex:(x.steps[0].answerIndex+1)%4},x.steps[1]]}]){expect(()=>oracle(bad)).toThrow();mutants++;}
  const tuple=(y:MathModel)=>y.operation+"|"+y.expected+"|"+y.steps[0].choices[y.steps[0].answerIndex];
  const matches=candidates.filter(y=>y.id!==x.id&&(norm(y.prompt)===norm(x.prompt)||tuple(y)===tuple(x))).map(y=>y.id);
  signals+=matches.length;
  console.log("RDG_R22_CANDIDATE "+JSON.stringify({id:x.id,previous_sha256:hash(old),content_sha256:hash(x),operation:x.operation,level:x.level,mode:x.mode,stimulus:x.prompt,key:o.key,step:o.step,wrong:o.wrong,mid:o.mid,signals:matches,semantic_status:"REVIEW"}));changed++;
 }
 expect(changed).toBe(22);expect(unchanged).toBe(428);expect(choices).toBe(132);expect(mutants).toBe(44);expect(signals).toBe(0);
 console.log("RDG_R22_SUMMARY "+JSON.stringify({changed,unchanged,choices,mutants,signals,semantic_pass:0}));
});
