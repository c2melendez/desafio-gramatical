import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import {expect,it} from "vitest";
import {MATH_LEVELS,MATH_MODES} from "@/lib/math-m1";
import {mathM3Pool} from "@/lib/math-m3";
import {R36_IDS,repairOperationR36Candidate} from "@/lib/math-operations-r36-candidate";
const load=(p:string)=>JSON.parse(readFileSync(p,"utf8"));
const hash=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
// Independent recursive parser, operating only on displayed arithmetic.
function evaluate(s:string):number{
 const tokens=s.match(/\d+|[()+−×÷]/g)??[];
 if(tokens.join("")!==s)throw Error("unknown token "+s);
 let i=0;
 function atom():number{const t=tokens[i++];if(t==="("){const x=sum();if(tokens[i++]!==")")throw Error("missing close");return x;}if(t===undefined||!/^\d+$/.test(t))throw Error("bad number");return Number(t);}
 function product():number{let x=atom();while(tokens[i]==="×"||tokens[i]==="÷"){const op=tokens[i++],y=atom();if(op==="÷"&&y===0)throw Error("zero division");x=op==="×"?x*y:x/y;}return x;}
 function sum():number{let x=product();while(tokens[i]==="+"||tokens[i]==="−"){const op=tokens[i++],y=product();x=op==="+"?x+y:x-y;}return x;}
 const x=sum();if(i!==tokens.length)throw Error("trailing tokens");return x;
}
function number(s:string){const m=/^(-?\d+)(?:\/(\d+))?$/.exec(s);if(!m)throw Error("bad answer "+s);return Number(m[1])/Number(m[2]??1);}
function verifyClaim(text:string,truth:boolean){const m=/^La expresión (.+) vale (-?\d+(?:\/\d+)?)\.$/.exec(text);if(!m)throw Error("unknown claim "+text);return (Math.abs(evaluate(m[1])-number(m[2]))<1e-10)===truth;}
it("R36: 31 inactive successors, 93 independent visible judgments, scope and negative mutations",()=>{
 const bank=MATH_LEVELS.flatMap(l=>MATH_MODES.flatMap(m=>mathM3Pool("Aritmética","Operaciones",l,m)));
 const review=load("qa/certification/rdg/evidence/MAT-ARIT-01-R34-r21-review.json");
 const s=load("qa/certification/batch-state.json").rdg_continuity;
 const old=s.v79_semantic_pass_paths.flatMap((p:string)=>load(p).records.filter((r:{semantic_status:string})=>r.semantic_status==="PASS_SEMANTIC"));
 const pass=new Set(old.map((r:{id:string})=>r.id)),ids=new Set(R36_IDS),families=new Set<string>(),expressions=new Set<string>(),prompts=new Set<string>(),masks=new Set<string>();
 let claims=0,changed=0;
 expect(bank).toHaveLength(450);expect(ids.size).toBe(31);
 for(const x of bank){const y=repairOperationR36Candidate(x);expect(y.id).toBe(x.id);if(!ids.has(x.id)){expect(y).toBe(x);continue;}
  expect(pass.has(x.id)).toBe(false);const prior=review.records.find((r:{id:string})=>r.id===x.id);expect(hash(x)).toBe(prior.content_hash);
  expect(hash(y)).not.toBe(hash(x));expect(y.level).toBe("avanzado");expect(y.mode).toBe("clasificar");expect(y.cognitiveStage).toBe(3);
  expect(y.assertions).toHaveLength(3);expect(new Set(y.assertions.map(q=>q.text)).size).toBe(3);
  for(const q of y.assertions){expect(verifyClaim(q.text,q.truth)).toBe(true);expect(verifyClaim(q.text,!q.truth)).toBe(false);
   const expr=q.text.split(" vale ")[0];expect(expressions.has(expr)).toBe(false);expressions.add(expr);expect(y.assertionExplanations?.[q.text]).toBeTruthy();claims++;}
  const expr=y.formula.split("=")[0];expect(evaluate(expr)).toBeCloseTo(number(y.expected),10);
  expect(y.options[y.answerIndex]).toBe(y.expected);expect(new Set(y.options.map(number)).size).toBe(4);
  for(const option of y.options.filter(v=>v!==y.expected)){expect(number(option)).not.toBeCloseTo(number(y.expected),10);expect(y.optionExplanations?.[option]).toBeTruthy();}
  expect(prompts.has(y.prompt)).toBe(false);prompts.add(y.prompt);families.add(y.operation??"");masks.add(y.assertions.map(q=>Number(q.truth)).join(""));
  changed++;console.log("RDG_R36_CANDIDATE "+JSON.stringify({id:x.id,previous:hash(x),candidate:hash(y),family:y.operation,semantic_status:"REVIEW",assertions:y.assertions}));
 }
 expect(changed).toBe(31);expect(claims).toBe(93);expect(families.size).toBe(6);expect(masks.size).toBeGreaterThanOrEqual(6);
 for(const r of old)expect(hash(bank.find(x=>x.id===r.id))).toBe(r.content_hash);
 console.log("RDG_R36_SUMMARY "+JSON.stringify({changed,claims,families:families.size,mutants:claims,old_pass:old.length,new_pass:0}));
});
it("visible oracle rejects malformed expressions and altered grouping",()=>{expect(()=>evaluate("1÷0")).toThrow();expect(()=>evaluate("2×(3−4")).toThrow();expect(evaluate("5−(3−2×(4−7))")).toBe(-4);});
