import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import {expect,it} from "vitest";
import {mathM3R18Pool as mathM3Pool} from "@/lib/math-m3";
import {MATH_LEVELS,MATH_MODES} from "@/lib/math-m1";
import {operationClassificationReason} from "@/lib/math-operations-classification";
import {OPERATIONS_ROUTE} from "@/lib/rdg/operations";
const review=JSON.parse(readFileSync("qa/certification/rdg/evidence/MAT-ARIT-01-v79-R18-review.json","utf8"));
const hash=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
const norm=(s:string)=>s.normalize("NFKC").toLowerCase().replace(/\s+/g,"").replace(/[−–]/g,"-").replace(/×/g,"*").replace(/÷/g,"/");
it("v7.9 R18: all 59 reviewed current IDs, actual feedback and collision screen for family candidates",()=>{
 const bank=MATH_LEVELS.flatMap(l=>MATH_MODES.flatMap(m=>mathM3Pool("Aritmética","Operaciones",l,m)));
 const tasks=[...OPERATIONS_ROUTE.lessons,...OPERATIONS_ROUTE.transfer];
 expect(bank).toHaveLength(450);expect(review.records).toHaveLength(59);
 let checked=0,ready=0,collisionCount=0,feedbackCount=0;
 for(const f of review.records){const x=bank.find(y=>y.id===f.id)!;expect(hash(x)).toBe(f.content_hash);expect(x.prompt).toBe(f.stimulus);expect(x.expected).toBe(f.respuesta_esperada);expect(x.operation).toBe(f.family_id);
 expect(x.assertions).toEqual(f.assertions.map((a:{text:string,truth:boolean})=>({text:a.text,truth:a.truth})));
 const feedback=x.assertions.map((a,i)=>{const reason=x.assertionExplanations?.[a.text]??operationClassificationReason(x,a.text);const correct=f.assertions[i].correct;const present=!!reason&&reason.includes(String(correct));if(present)feedbackCount++;return {text:a.text,truth:a.truth,reason:reason??null,correct,present};});
 const collisions=bank.filter(y=>y.id!==x.id&&norm(y.prompt)===norm(x.prompt)).map(y=>y.id);const rdgCollisions=tasks.filter(y=>norm(y.prompt)===norm(x.prompt)).map(y=>y.id);if(collisions.length||rdgCollisions.length)collisionCount++;
 const eligible=f.promotion_candidate&&feedback.every(a=>a.present)&&!collisions.length&&!rdgCollisions.length;if(eligible)ready++;
 console.log("RDG_V79_R18_REVIEW "+JSON.stringify({id:x.id,content_sha256:hash(x),level:x.level,family:x.operation,feedback,collisions,rdgCollisions,eligible_for_semantic_reassessment:eligible}));checked++;
 }
 expect(checked).toBe(59);expect(review.records.filter((f:{promotion_candidate:boolean})=>f.promotion_candidate)).toHaveLength(25);
 console.log("RDG_V79_R18_REVIEW_SUMMARY "+JSON.stringify({checked,ready,collisionCount,feedbackCount,semantic_pass:0}));
});
