import {readFileSync} from "node:fs";
import {createHash} from "node:crypto";
import {cleanup,fireEvent,render,screen} from "@testing-library/react";
import {afterEach,expect,it,vi} from "vitest";
import {mathM3R16Pool as mathM3Pool} from "@/lib/math-m3";
import {MathExerciseCard} from "@/components/games/MathExerciseCard";
import type {MathModel} from "@/lib/math-m1";
afterEach(cleanup);
const evidence=JSON.parse(readFileSync("qa/certification/rdg/evidence/MAT-ARIT-01-01-OP04-review.json","utf8"));
const all=["intermedio","avanzado"].flatMap(level=>["clasificar","quiz","construir"].flatMap(mode=>mathM3Pool("Aritmética","Operaciones",level as MathModel["level"],mode as MathModel["mode"]))).filter(x=>x.oracle.kind==="Operaciones-racionales");
const find=(id:string)=>all.find(x=>x.id===id)!;
it("reconciles each of 18 reviewed OP04 prompts, actual distractors and evidence hash",()=>{
 expect(all).toHaveLength(18);
 for(const f of evidence.records){
  const x=find(f.id);
  expect(x.prompt).toBe(f.stimulus);
  expect(x.expected).toBe(f.respuesta_esperada);
  expect(x.options.filter(v=>v!==x.expected).sort()).toEqual(f.distractores.map((d:{value:string})=>d.value).sort());
  expect(createHash("sha256").update(JSON.stringify(x)).digest("hex")).toBe(f.content_hash);
  expect(f.semantic_status).toBe("REVIEW");
  expect(f.rubric.G.score).toBe(2);
 }
});
it("OP04 construction identifies the chosen wrong root and wrong final operation",()=>{
 const x=all.find(x=>x.mode==="construir")!;
 render(<MathExerciseCard item={x} onResult={vi.fn()} onNext={vi.fn()} isLast={false}/>);
 for(const step of x.steps)fireEvent.click(screen.getByRole("button",{name:step.choices.find(v=>v!==step.choices[step.answerIndex])!}));
 expect(screen.getByText(/Raíz elegida:/)).toHaveTextContent("Resultado elegido:");
});
it("OP04 classification identifies the incorrect subdecision",()=>{
 const x=all.find(x=>x.mode==="clasificar")!;
 render(<MathExerciseCard item={x} onResult={vi.fn()} onNext={vi.fn()} isLast={false}/>);
 for(const a of x.assertions)fireEvent.click(screen.getByRole("button",{name:a.truth?"Falso":"Verdadero"}));
 expect(screen.getByText(/Afirmación «/)).toHaveTextContent("verdadera");
});
