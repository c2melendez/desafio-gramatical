import {readFileSync} from "node:fs";
import {createHash} from "node:crypto";
import {afterEach,expect,it,vi} from "vitest";
import {cleanup,fireEvent,render,screen} from "@testing-library/react";
import {mathM3Pool} from "@/lib/math-m3";
import {MATH_LEVELS,MATH_MODES} from "@/lib/math-m1";
import {MathExerciseCard} from "@/components/games/MathExerciseCard";
afterEach(cleanup);
const report=JSON.parse(readFileSync("qa/certification/rdg/evidence/MAT-ARIT-01-02-review.json","utf8"));
const all=MATH_LEVELS.flatMap(level=>MATH_MODES.flatMap(mode=>mathM3Pool("Aritmética","Operaciones",level,mode)));
it("reconciles 50 frozen review decisions against real prompts, claims, step choices and hashes",()=>{
 expect(report.records).toHaveLength(50);
 for(const r of report.records){
  const x=all.find(item=>item.id===r.id)!;
  expect(x.prompt,r.id).toBe(r.stimulus);
  expect(x.expected).toBe(r.respuesta_esperada);
  expect(createHash("sha256").update(JSON.stringify(x)).digest("hex")).toBe(r.content_hash);
  expect(x.assertions.map(a=>a.text+"|"+a.truth).sort()).toEqual(r.assertions.map((a:{text:string;truth:boolean})=>a.text+"|"+a.truth).sort());
  for(const [i,s] of x.steps.entries()){
   expect([...s.choices].sort()).toEqual([...r.construction[i].options].sort());
   expect(s.choices[s.answerIndex]).toBe(r.construction[i].correct);
  }
  expect(r.semantic_status).toBe("REVIEW");expect(r.rubric.C.score).toBe(2);
 }
});
it("explains the incorrect final integer result without suggesting fractional units",()=>{
 const x=all.find(item=>item.mode==="construir"&&item.level==="avanzado"&&item.oracle.kind==="Operaciones")!;
 render(<MathExerciseCard item={x} onResult={vi.fn()} onNext={vi.fn()} isLast={false}/>);
 fireEvent.click(screen.getByRole("button",{name:x.steps[0].choices[x.steps[0].answerIndex]}));
 const wrong=x.steps[1].choices.find(v=>v!==x.expected)!;
 fireEvent.click(screen.getByRole("button",{name:wrong}));
 const feedback=screen.getByTestId("learning-feedback");
 expect(feedback).toHaveTextContent("Resultado elegido: "+wrong);
 expect(feedback).toHaveTextContent("El valor de la expresión solicitada es "+x.expected);
 expect(feedback).not.toHaveTextContent("unidades fraccionarias");
});
