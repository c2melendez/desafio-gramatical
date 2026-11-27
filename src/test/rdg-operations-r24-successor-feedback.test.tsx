import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import {expect,it,vi,afterEach} from "vitest";
import {cleanup,fireEvent,render,screen} from "@testing-library/react";
import {MathExerciseCard} from "@/components/games/MathExerciseCard";
import {MATH_LEVELS,MATH_MODES} from "@/lib/math-m1";
import {mathM3R21CandidatePool} from "@/lib/math-m3";
import {repairOperationR22Candidate} from "@/lib/math-operations-r22-candidate";
import {repairOperationR23Candidate} from "@/lib/math-operations-r23-candidate";
const hash=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
const evidence=JSON.parse(readFileSync("qa/certification/rdg/evidence/MAT-ARIT-01-R24-combined-successors.json","utf8"));
afterEach(cleanup);
it("R24: individual scoring and explicit feedback for the 30 R22/R23 successors",()=>{
 const bank=MATH_LEVELS.flatMap(l=>MATH_MODES.flatMap(m=>mathM3R21CandidatePool("Aritmética","Operaciones",l,m).map(repairOperationR22Candidate).map(repairOperationR23Candidate)));
 const candidates=bank.filter(x=>evidence.records.some((f:{id:string})=>f.id===x.id)&&x.modeOperation!=="evaluar-tres-decisiones-operaciones-r21");
 expect(candidates).toHaveLength(30);
 let correct=0,errors=0;
 for(const x of candidates){
  const before=hash(x);expect(before).toBe(evidence.records.find((f:{id:string})=>f.id===x.id).content_sha256);
  const cases:{choices:string[];causes:string[];ok:boolean}[]=[];
  if(x.mode==="clasificar"){
   const keys=x.assertions.map(a=>a.truth?"Verdadero":"Falso");
   cases.push({choices:keys,causes:[],ok:true});
   for(let i=0;i<keys.length;i++)cases.push({choices:keys.map((v,j)=>i===j?(v==="Verdadero"?"Falso":"Verdadero"):v),causes:[x.assertionExplanations![x.assertions[i].text]],ok:false});
  }else{
   const steps=x.mode==="quiz"?[{choices:x.options,answerIndex:x.answerIndex}]:x.steps;
   const keys=steps.map(s=>s.choices[s.answerIndex]);
   cases.push({choices:keys,causes:[],ok:true});
   for(let i=0;i<steps.length;i++)for(const v of steps[i].choices.filter((_,j)=>j!==steps[i].answerIndex)){
    const cause=(x.mode==="construir"&&i===0?x.stepOptionExplanations:x.optionExplanations)?.[v];
    expect(cause).toBeTruthy();cases.push({choices:keys.map((k,j)=>i===j?v:k),causes:[cause!],ok:false});
   }
  }
  for(const c of cases){
   const result=vi.fn();render(<MathExerciseCard item={x} onResult={result} onNext={vi.fn()} isLast={false}/>);
   for(const v of c.choices)fireEvent.click(screen.getByRole("button",{name:v,exact:true}));
   expect(result).toHaveBeenCalledTimes(1);expect(result).toHaveBeenCalledWith(c.ok,c.choices.join(x.mode==="clasificar"?" · ":" → "));
   const feedback=screen.getByTestId("learning-feedback");
   for(const cause of c.causes){expect(cause).toBeTruthy();expect(feedback).toHaveTextContent(cause);}
   expect(feedback).toHaveTextContent(x.explanation);
   cleanup();if(c.ok)correct++;else errors++;
  }
  expect(hash(x)).toBe(before);
  console.log("RDG_R24_UI_ID "+JSON.stringify({id:x.id,hash:before,mode:x.mode,correct:1,errors:cases.length-1,semantic_status:"REVIEW"}));
 }
 expect(correct).toBe(30);expect(errors).toBeGreaterThan(90);
 console.log("RDG_R24_UI_SUMMARY "+JSON.stringify({ids:30,correct,errors,semantic_pass:0}));
},90000);
