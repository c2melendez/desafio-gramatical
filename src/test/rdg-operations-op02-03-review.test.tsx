import {readFileSync} from "node:fs";
import {createHash} from "node:crypto";
import {expect,it,vi,afterEach} from "vitest";
import {cleanup,fireEvent,render,screen} from "@testing-library/react";
import {mathM3HistoricalPool as mathM3Pool} from "@/lib/math-m3";
import {MathExerciseCard} from "@/components/games/MathExerciseCard";
afterEach(cleanup);
const report=JSON.parse(readFileSync("qa/certification/rdg/evidence/MAT-ARIT-01-01-OP02-03-review.json","utf8"));
const bank=(["intermedio","avanzado"] as const).flatMap(level=>mathM3Pool("Aritmética","Operaciones",level,"clasificar"));
it("reconciles the 32 individual decisions with actual frozen records, 96 mathematical claims and exact hashes",()=>{
 expect(report.records).toHaveLength(32);
 for(const r of report.records){
  const x=bank.find(item=>item.id===r.id)!;
  expect(x.prompt,r.id).toBe(r.stimulus);
  expect(x.expected).toBe(r.respuesta_esperada);
  expect(createHash("sha256").update(JSON.stringify(x)).digest("hex")).toBe(r.content_hash);
  expect(x.assertions.map(a=>a.text+"|"+a.truth).sort()).toEqual(r.distractores.map((a:{text:string;truth:boolean})=>a.text+"|"+a.truth).sort());
  for(const a of r.distractores)expect(a.value===Number(x.expected)).toBe(a.truth);
  expect(r.semantic_status).toBe("REVIEW");
  expect(r.rubric.G.score).toBe(2);
 }
});
it("reports a specific cause for incorrect advanced cancellation decisions",()=>{
 const x=bank.find(item=>item.level==="avanzado"&&item.oracle.kind==="Operaciones")!;
 render(<MathExerciseCard item={x} onResult={vi.fn()} onNext={vi.fn()} isLast={false}/>);
 for(const a of x.assertions)fireEvent.click(screen.getByRole("button",{name:a.truth?"Falso":"Verdadero"}));
 expect(screen.getByTestId("learning-feedback")).toHaveTextContent("El producto que queda conserva su signo positivo");
 expect(screen.getByTestId("learning-feedback")).toHaveTextContent("Solo se cancelan productos iguales con signos opuestos");
});
it("reports the actual intermediate distractors and handles the factor-one edge case",()=>{
 const x=bank.find(item=>item.level==="intermedio"&&item.oracle.kind==="Operaciones"&&item.oracle.inputs[2]===1)!;
 expect(x).toBeDefined();
 render(<MathExerciseCard item={x} onResult={vi.fn()} onNext={vi.fn()} isLast={false}/>);
 for(const a of x.assertions)fireEvent.click(screen.getByRole("button",{name:a.truth?"Falso":"Verdadero"}));
 expect(screen.getByTestId("learning-feedback")).toHaveTextContent("Multiplicar por uno conserva los dos sumandos");
 expect(screen.getByTestId("learning-feedback")).toHaveTextContent("sustituye una multiplicación por una suma");
});
