// Historical R20 evidence: keep exact baseline; active R26 has a separate full-bank regression.
import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import {expect,it} from "vitest";
import {MATH_LEVELS,MATH_MODES,type MathModel} from "@/lib/math-m1";
import {mathM3R20Pool as mathM3Pool} from "@/lib/math-m3";
import {OPERATIONS_ROUTE} from "@/lib/rdg/operations";
const path="qa/certification/rdg/evidence/MAT-ARIT-01-v79-R12-R14-current-review.json";
const evidence=JSON.parse(readFileSync(path,"utf8"));
const sha=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
const gcd=(a:bigint,b:bigint):bigint=>b===0n?(a<0n?-a:a):gcd(b,a%b);
function frac(n:string,d:string){
 let a=BigInt(n),b=BigInt(d);if(b===0n)return n+"/"+d;
 if(b<0n){a=-a;b=-b;}
 const g=gcd(a,b);return (a/g)+"/"+(b/g);
}
function normalize(s:string){
 return s.normalize("NFKC").toLowerCase().replace(/[−–]/g,"-").replace(/(\d+)\s*\/\s*(\d+)/g,(_,a,b)=>frac(a,b)).replace(/×/g,"*").replace(/÷/g,"/").replace(/\s+/g,"");
}
function expression(s:string){
 const m=s.normalize("NFKC").match(/(?:Calcula|Simplifica|Completa la igualdad)\s+([^.?]+)/i);
 if(!m)return null;
 return normalize(m[1].split(/\. |Expresa|Simplifica|Opciones/)[0]);
}
function sameStimulus(a:string,b:string){
 const x=expression(a),y=expression(b);
 return normalize(a)===normalize(b)||(x!==null&&y!==null&&x===y);
}
function value(s:string){
 const t=s.trim().replace(/[−–]/g,"-");
 if(/^-?\d+$/.test(t))return frac(t,"1");
 const m=t.match(/^(-?\d+)\s*\/\s*(-?\d+)$/);return m?frac(m[1],m[2]):normalize(t);
}
function tuple(x:MathModel){
 const first=x.steps[0];return x.operation&&first?x.operation+"|"+value(x.expected)+"|"+value(first.choices[first.answerIndex]):null;
}
it("canonical screen detects equivalent fractions and representations without conflating operation order",()=>{
 expect(sameStimulus("Calcula √(4/16) − 2/6.","Calcula √(1/4) - 1/3.")).toBe(true);
 expect(sameStimulus("Calcula 2 × (4 − 1).","Calcula (4 − 1) × 2.")).toBe(false);
 expect(value("-2/4")).toBe(value("-1/2"));
 expect(value("2")).toBe(value("4/2"));
 expect(value("0/0")).not.toBe(value("0"));
});
it("R12–R14: current 92 identities, reduced-expression signals and key/step signals across all 450",()=>{
 const bank=MATH_LEVELS.flatMap(l=>MATH_MODES.flatMap(m=>mathM3Pool("Aritmética","Operaciones",l,m)));
 const rdg=[...OPERATIONS_ROUTE.lessons,...OPERATIONS_ROUTE.transfer];
 expect(bank).toHaveLength(450);expect(new Set(bank.map(x=>x.id)).size).toBe(450);expect(evidence.records).toHaveLength(92);
 const seen=new Set<string>();let promptSignals=0,rdgSignals=0,tupleSignals=0,depthReview=0;
 for(const f of evidence.records){
  const x=bank.find(y=>y.id===f.id)!;
  expect(x).toBeDefined();expect(sha(x)).toBe(f.content_hash);expect(x.prompt).toBe(f.stimulus);expect(x.operation).toBe(f.family_id);
  expect(seen.has(x.id)).toBe(false);seen.add(x.id);
  const expectedTuple=f.family_id+"|"+value(f.oraculo_independiente.key)+"|"+value(f.oraculo_independiente.step);
  expect(tuple(x)).toBe(expectedTuple);
  const p=bank.filter(y=>y.id!==x.id&&sameStimulus(y.prompt,x.prompt)).map(y=>y.id);
  const t=bank.filter(y=>y.id!==x.id&&tuple(y)===expectedTuple).map(y=>y.id);
  const rd=rdg.filter(y=>sameStimulus(y.prompt,x.prompt)).map(y=>y.prompt);
  const cell=bank.filter(y=>y.mode===x.mode&&y.level===x.level);
  const cellFamily=cell.filter(y=>y.operation===x.operation).length;
  expect(cellFamily).toBeGreaterThan(0);expect(cellFamily).toBeLessThanOrEqual(cell.length);
  if(p.length)promptSignals++;if(t.length)tupleSignals++;if(rd.length)rdgSignals++;if(f.rubric.F.score<3)depthReview++;
  console.log("RDG_R12_R14_CANONICAL "+JSON.stringify({id:x.id,hash:sha(x),family:x.operation,level:x.level,mode:x.mode,signature:f.variation_signature,tuple:expectedTuple,promptSignals:p,tupleSignals:t,rdgSignals:rd,cellSize:cell.length,cellFamily,depthScore:f.rubric.F.score}));
 }
 expect(seen.size).toBe(92);expect(depthReview).toBe(18);
 console.log("RDG_R12_R14_CANONICAL_SUMMARY "+JSON.stringify({checked:92,promptSignals,rdgSignals,tupleSignals,depthReview,semantic_pass:0}));
});
