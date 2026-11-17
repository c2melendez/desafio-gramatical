import {afterEach,describe,expect,it,vi} from "vitest";
import {cleanup,fireEvent,render,screen} from "@testing-library/react";
import {ReadingInference} from "@/components/games/ReadingGames";
import {MAIN_IDEA_CHOICE_CASES} from "@/lib/main-idea-choice-cases";
afterEach(cleanup);
describe("Idea principal: textos originales y respuesta explicada",()=>{
 it.each(["principiante","intermedio","avanzado"] as const)("permite elegir la idea principal correcta (%s)",level=>{
  const q=MAIN_IDEA_CHOICE_CASES.find(x=>x.level===level)!;
  const report=vi.fn();
  render(<ReadingInference item={q} report={report} next={vi.fn()} isLast={false}/>);
  expect(screen.getByText(q.passage)).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{name:q.options[q.answer]}));
  expect(report).toHaveBeenCalledWith(true,undefined);
  expect(screen.getByText(/¡Correcto!/)).toBeInTheDocument();
 });
 it.each(["principiante","intermedio","avanzado"] as const)("documenta la respuesta incorrecta y su clave (%s)",level=>{
  const q=MAIN_IDEA_CHOICE_CASES.find(x=>x.level===level)!;
  const wrong=q.options.findIndex((_,i)=>i!==q.answer);const report=vi.fn();
  render(<ReadingInference item={q} report={report} next={vi.fn()} isLast={true}/>);
  fireEvent.click(screen.getByRole("button",{name:q.options[wrong]}));
  expect(report).toHaveBeenCalledOnce();
  expect(report.mock.calls[0][0]).toBe(false);
  expect(report.mock.calls[0][1].correct).toBe(q.options[q.answer]);
 });
});
