import {createHash} from "node:crypto";
import {afterEach,expect,it,vi} from "vitest";
import {cleanup,fireEvent,render,screen} from "@testing-library/react";
import {MATH_LEVELS,MATH_MODES,type MathModel} from "@/lib/math-m1";
import {mathM3Pool} from "@/lib/math-m3";
import {repairOperationZeroR28Candidate} from "@/lib/math-operations-zero-r28-candidate";
import {verifyMathM3Record} from "@/lib/math-m3-guards";
import {MathExerciseCard} from "@/components/games/MathExerciseCard";
import {OPERATIONS_ROUTE} from "@/lib/rdg/operations";
const hash=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
const norm=(p:string)=>p.normalize("NFKC").toLowerCase().replace(/[−–]/g,"-").replace(/\s/g,"");
const bank=MATH_LEVELS.flatMap(l=>MATH_MODES.flatMap(m=>mathM3Pool("Aritmética","Operaciones",l,m)));
const next=bank.map(repairOperationZeroR28Candidate);
const targets=next.filter((x,i)=>hash(x)!==hash(bank[i]));
function independent(x:MathModel){
 const m=x.prompt.match(/^Calcula \((\d+) − (\d+)\) ÷ (\d+) \+ \((\d+) − (\d+)\)\. ¿Cuál es el resultado\?$/);if(!m)throw Error("stimulus");
 const [a,b,c,d,e]=m.slice(1).map(BigInt);if(a!==b||!c)throw Error("domain");
 const key=(a-b)/c+d-e,step=a-b;
 const wrong=[a/c+d-e,d+e,d-e+c].map(String),mid=[a,a+b,-b].map(String);
 if(m.slice(1).includes(String(key)))throw Error("visible key");
 if(x.expected!==String(key)||x.options[x.answerIndex]!==String(key)||x.steps[0].choices[x.steps[0].answerIndex]!==String(step))throw Error("key/step");
 if(JSON.stringify(x.options.filter((_,i)=>i!==x.answerIndex).sort())!==JSON.stringify(wrong.sort())||JSON.stringify(x.steps[0].choices.filter((_,i)=>i!==x.steps[0].answerIndex).sort())!==JSON.stringify(mid.sort()))throw Error("alternatives");
 return {key:String(key),step:String(step),wrong,mid};
}
afterEach(cleanup);
it("R28 only two intended successors; independent visible arithmetic, no visible key, no new exact/tuple signals, lineage preserved",()=>{
 expect(bank).toHaveLength(450);expect(targets.map(x=>x.id).sort()).toEqual(["math-m2-aritmetica-operaciones-construir-principiante-8","math-m2-aritmetica-operaciones-quiz-principiante-9"]);
 const tuple=(x:MathModel)=>[x.operation,x.expected,x.steps[0].choices[x.steps[0].answerIndex]].join("|");
 let mutants=0;
 for(const x of targets){
  const p=bank.find(y=>y.id===x.id)!;expect(x.operation).toBe(p.operation);expect(x.level).toBe(p.level);expect(x.mode).toBe(p.mode);expect(verifyMathM3Record(x,x.level)).toEqual([]);
  const o=independent(x);
  expect(next.filter(y=>y.id!==x.id&&(norm(y.prompt)===norm(x.prompt)||tuple(y)===tuple(x)))).toEqual([]);
  expect([...OPERATIONS_ROUTE.lessons,...OPERATIONS_ROUTE.transfer].filter(y=>norm(y.prompt)===norm(x.prompt))).toEqual([]);
  for(const bad of [{...x,expected:"0"},{...x,steps:[{...x.steps[0],answerIndex:(x.steps[0].answerIndex+1)%4},x.steps[1]]},{...x,options:[x.expected,x.expected,x.expected,x.expected]},{...x,prompt:x.prompt.replace(/÷ \d+/,"÷ 0")}]){expect(()=>independent(bad)).toThrow();mutants++;}
  console.log("RDG_R28_ZERO_ID "+JSON.stringify({id:x.id,previous_hash:hash(p),hash:hash(x),prompt:x.prompt,oracle:o,semantic_status:"REVIEW"}));
 }
 expect(mutants).toBe(8);
});
it("R28 all visible wrong decisions and correct paths retain selected cause and feedback",()=>{
 let correct=0,errors=0;
 for(const x of targets){
  const steps=x.mode==="quiz"?[{choices:x.options,answerIndex:x.answerIndex}]:x.steps;
  const keys=steps.map(s=>s.choices[s.answerIndex]);
  const cases=[{index:-1,value:""},...steps.flatMap((s,i)=>s.choices.filter((_,j)=>j!==s.answerIndex).map(value=>({index:i,value})))];
  for(const c of cases){
   const result=vi.fn();render(<MathExerciseCard item={x} onResult={result} onNext={vi.fn()} isLast={false}/>);
   const selected=keys.map((v,i)=>i===c.index?c.value:v);
   for(const v of selected)fireEvent.click(screen.getByRole("button",{name:v,exact:true}));
   expect(result).toHaveBeenCalledWith(c.index===-1,selected.join(" → "));
   const feedback=screen.getByTestId("learning-feedback");expect(feedback).toHaveTextContent(x.explanation);
   if(c.index!==-1){const cause=(x.mode==="construir"&&c.index===0?x.stepOptionExplanations:x.optionExplanations)?.[c.value];expect(cause).toBeTruthy();expect(feedback).toHaveTextContent(cause!);errors++;}else correct++;
   cleanup();
  }
 }
 expect(correct).toBe(2);expect(errors).toBe(9);console.log("RDG_R28_ZERO_UI "+JSON.stringify({correct,errors,semantic_pass:0}));
});
