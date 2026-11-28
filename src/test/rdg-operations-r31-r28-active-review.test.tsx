import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import {afterEach,expect,it,vi} from "vitest";
import {cleanup,fireEvent,render,screen} from "@testing-library/react";
import {MATH_LEVELS,MATH_MODES,type MathModel} from "@/lib/math-m1";
import {mathM3Pool} from "@/lib/math-m3";
import {MathExerciseCard} from "@/components/games/MathExerciseCard";
const load=(p:string)=>JSON.parse(readFileSync(p,"utf8"));
const digest=(v:string|Buffer)=>createHash("sha256").update(v).digest("hex");
const hash=(v:unknown)=>digest(JSON.stringify(v));
const path="qa/certification/rdg/evidence/MAT-ARIT-01-R31-r28-review.json";
const ledger=load(path);
const contract=load("qa/certification/rdg/contracts/MAT-ARIT-01-R4.json");
const integration=load("qa/certification/rdg/evidence/MAT-ARIT-01-R30-integration.json");
const bank=MATH_LEVELS.flatMap(l=>MATH_MODES.flatMap(m=>mathM3Pool("Aritmética","Operaciones",l,m)));
const norm=(s:string)=>s.normalize("NFKC").replace(/[−–]/g,"-").replace(/\s+/g,"").toLowerCase();
const gcd=(a:bigint,b:bigint):bigint=>b?gcd(b,a%b):(a<0n?-a:a)||1n;
const frac=(n:bigint,d:bigint)=>{const g=gcd(n,d);return d/g===1n?String(n/g):n/g+"/"+d/g;};
const root=(n:bigint)=>{let x=0n;while(x*x<n)x++;if(x*x!==n)throw Error("not an exact square");return x;};
function solve(x:MathModel){
 if(x.mode==="clasificar"){
  const m=x.prompt.match(/^Calcula \(√\((\d+)\/(\d+)\) − (\d+)\/(\d+)\) ÷ (\d+)\. Expresa una fracción simplificada\.$/);
  if(!m)throw Error("root stimulus");
  const [r,s,c,d,k]=m.slice(1).map(BigInt),a=root(r),b=root(s);
  if(!b||!d||!k)throw Error("undefined");
  const n=a*d-c*b,den=b*d,step=frac(n,den),key=frac(n,den*k);
  const claims=[step,frac(-a,b),frac(n*k,den)];
  const values=x.assertions.map(a=>a.text.match(/(-?\d+(?:\/\d+)?)\.$/)?.[1]);
  expect(values).toEqual(claims);
  expect(x.assertions.map(a=>a.truth)).toEqual([true,claims[1]===frac(a,b),claims[2]===key]);
  return {key,step};
 }
 const m=x.prompt.match(/^Calcula \((\d+) − (\d+)\) ÷ (\d+) \+ \((\d+) − (\d+)\)\. ¿Cuál es el resultado\?$/);
 if(!m)throw Error("grouped stimulus");
 const [a,b,d,c,e]=m.slice(1).map(BigInt);if(!d||(a-b)%d!==0n)throw Error("undefined/non-integral");
 const key=String((a-b)/d+c-e),step=String(a-b);
 expect(m.slice(1)).not.toContain(key);
 expect(x.options[x.answerIndex]).toBe(key);
 expect(x.steps[0].choices[x.steps[0].answerIndex]).toBe(step);
 expect(x.options.filter((_,i)=>i!==x.answerIndex).sort()).toEqual([String(a/d+c-e),String(c+e),String(c-e+d)].sort());
 expect(x.steps[0].choices.filter((_,i)=>i!==x.steps[0].answerIndex).sort()).toEqual([String(a),String(a+b),String(-b)].sort());
 return {key,step};
}
afterEach(cleanup);
it("R31 active R28: three unique successors, current dependencies, individual A-H pending H, independent keys",()=>{
 expect(bank).toHaveLength(450);
 expect(ledger.records).toHaveLength(3);
 expect(new Set(ledger.records.map((r:{id:string})=>r.id)).size).toBe(3);
 for(const [p,h] of Object.entries(contract.dependency_hashes)){expect(digest(readFileSync(p))).toBe(h);}
 for(const r of ledger.records){
  const x=bank.find(x=>x.id===r.id);expect(x).toBeDefined();if(!x)throw Error("missing active item");
  const history=integration.records.find((p:{id:string})=>p.id===r.id);
  expect(history.origin).toBe("R28");expect(history.previous).toBe(r.previous_sha256);expect(history.next).toBe(r.content_hash);
  expect(hash(x)).toBe(r.content_hash);expect(x.prompt).toBe(r.stimulus);
  const o=solve(x);expect(o.key).toBe(x.expected);expect(o.key).toBe(r.respuesta_esperada);expect(o.step).toBe(r.oraculo_independiente.step);
  expect(r.dependency_hashes).toEqual(contract.dependency_hashes);
  expect(Object.keys(r.rubric).sort().join("")).toBe("ABCDEFGH");
  expect(r.rubric.H.score).toBe(2);expect(r.semantic_status).toBe("REVIEW");expect(r.promotion_candidate).toBe(false);
  expect(r.evidence_fingerprint.hash).toBe(r.content_hash);
  if(x.mode!=="clasificar"){
   const tuple=(y:MathModel)=>[y.operation,y.expected,y.steps[0].choices[y.steps[0].answerIndex]].join("|");
   expect(bank.filter(y=>y.id!==x.id&&(norm(y.prompt)===norm(x.prompt)||tuple(y)===tuple(x)))).toEqual([]);
  }
 }
});
it("R31 active R28: verify all 12 individual wrong choices, three correct paths, named native buttons, focus, live region and next action",()=>{
 let correct=0,errors=0;
 for(const r of ledger.records){
  const x=bank.find(x=>x.id===r.id)!;
  const steps=x.mode==="clasificar"?x.assertions.map(a=>({choices:["Verdadero","Falso"],answerIndex:a.truth?0:1})):x.mode==="quiz"?[{choices:x.options,answerIndex:x.answerIndex}]:x.steps;
  const keys=steps.map(s=>s.choices[s.answerIndex]);
  const cases=[{index:-1,value:""},...steps.flatMap((s,i)=>s.choices.filter((_,j)=>j!==s.answerIndex).map(value=>({index:i,value})))];
  let itemErrors=0;
  for(const c of cases){
   const result=vi.fn(),next=vi.fn();
   render(<MathExerciseCard item={x} onResult={result} onNext={next} isLast={false}/>);
   expect(screen.getByRole("heading",{name:x.prompt})).toBeTruthy();
   const selected=keys.map((v,i)=>i===c.index?c.value:v);
   for(const v of selected){const button=screen.getByRole("button",{name:v,exact:true});expect(button.tagName).toBe("BUTTON");button.focus();expect(document.activeElement).toBe(button);fireEvent.click(button);}
   expect(result).toHaveBeenCalledWith(c.index===-1,selected.join(x.mode==="clasificar"?" · ":" → "));
   const feedback=screen.getByTestId("learning-feedback");expect(feedback.getAttribute("aria-live")).toBe("polite");expect(feedback).toHaveTextContent(x.explanation);
   if(c.index>=0){
    const cause=x.mode==="clasificar"?x.assertionExplanations?.[x.assertions[c.index].text]:(x.mode==="construir"&&c.index===0?x.stepOptionExplanations:x.optionExplanations)?.[c.value];
    expect(cause).toBeTruthy();expect(feedback).toHaveTextContent(cause!);errors++;itemErrors++;
   }else correct++;
   const cont=screen.getByRole("button",{name:"Continuar"});cont.focus();expect(document.activeElement).toBe(cont);fireEvent.click(cont);expect(next).toHaveBeenCalledTimes(1);cleanup();
  }
  console.log("RDG_R31_R28_ACTIVE_UI "+JSON.stringify({id:x.id,hash:hash(x),correct:1,errors:itemErrors,scope:"JSDOM",semantic_pass:0}));
 }
 expect(correct).toBe(3);expect(errors).toBe(12);
});
