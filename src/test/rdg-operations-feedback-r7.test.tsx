import {expect,it,vi,afterEach} from "vitest";
import {cleanup,fireEvent,render,screen} from "@testing-library/react";
import {mathM3Pool} from "@/lib/math-m3";
import {MATH_LEVELS} from "@/lib/math-m1";
import {operationStepReason} from "@/lib/math-operations-distractors";
import {operationClassificationReason} from "@/lib/math-operations-classification";
import {MathExerciseCard} from "@/components/games/MathExerciseCard";
afterEach(cleanup);
const construction=MATH_LEVELS.flatMap(level=>mathM3Pool("Aritmética","Operaciones",level,"construir")).filter(x=>x.oracle.kind==="Operaciones");
const classification=MATH_LEVELS.flatMap(level=>mathM3Pool("Aritmética","Operaciones",level,"clasificar")).filter(x=>x.oracle.kind==="Operaciones");
it("R7 maps every construction intermediate distractor and every revised classification claim to its own cause",()=>{
 expect(construction).toHaveLength(144);
 expect(classification).toHaveLength(144);
 let distractors=0,claims=0;
 for(const x of construction){
  const step=x.steps[0],correct=step.choices[step.answerIndex];
  expect(operationStepReason(x,correct)).toBeUndefined();
  for(const v of step.choices.filter(v=>v!==correct)){
   expect(operationStepReason(x,v),x.id+" "+v).toBeTruthy();
   distractors++;
  }
 }
 for(const x of classification)for(const a of x.assertions){
  const cause=operationClassificationReason(x,a.text);
  expect(cause,x.id+" "+a.text).toBeTruthy();
  expect(cause).toMatch(a.truth?/coincide|son equivalentes porque conservan/:/no coincide|no son equivalentes porque alteran/);
  claims++;
 }
 expect(distractors).toBe(432);expect(claims).toBe(432);
 console.log("RDG_R7_SUMMARY "+JSON.stringify({intermediate_distractors:distractors,classification_claims:claims,semantic_pass:0}));
});
it.each(MATH_LEVELS)("R7 renders the selected intermediate error at %s",level=>{
 const x=construction.find(y=>y.level===level)!;const wrong=x.steps[0].choices.find(v=>v!==x.steps[0].choices[x.steps[0].answerIndex])!;
 const reason=operationStepReason(x,wrong)!;
 render(<MathExerciseCard item={x} onResult={vi.fn()} onNext={vi.fn()} isLast={false}/>);
 fireEvent.click(screen.getByRole("button",{name:wrong,exact:true}));
 fireEvent.click(screen.getByRole("button",{name:x.steps[1].choices[x.steps[1].answerIndex],exact:true}));
 expect(screen.getByTestId("learning-feedback")).toHaveTextContent(reason);
});
it.each(MATH_LEVELS)("R7 renders each incorrectly classified assertion at %s",level=>{
 const x=classification.find(y=>y.level===level)!;
 render(<MathExerciseCard item={x} onResult={vi.fn()} onNext={vi.fn()} isLast={false}/>);
 for(const a of x.assertions)fireEvent.click(screen.getByRole("button",{name:a.truth?"Falso":"Verdadero"}));
 for(const a of x.assertions)expect(screen.getByTestId("learning-feedback")).toHaveTextContent(operationClassificationReason(x,a.text)!);
});
