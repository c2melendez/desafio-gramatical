import {afterEach,describe,expect,it,vi} from "vitest";
import {cleanup,fireEvent,render,screen} from "@testing-library/react";
vi.mock("@tanstack/react-router",()=>({
 createFileRoute:()=>()=>({}),
 Link:({children}:{children:React.ReactNode})=><span>{children}</span>,
}));
import {GrammarPilot} from "@/routes/jugar";
import {grammarPilotPool} from "@/lib/grammar-next-draft";

afterEach(()=>{cleanup();localStorage.clear();});
describe("práctica gramatical inicial",()=>{
 it("muestra una pregunta, registra la respuesta y ofrece retroalimentación",()=>{
  render(<GrammarPilot subtema="Morfosintaxis" nivel="intermedio"/>);
  // Varias preguntas comparten enunciado; el pasaje identifica el estímulo mostrado.
  const matches=grammarPilotPool("Morfosintaxis","intermedio").filter(x=>screen.queryByText(x.passage)&&screen.queryByText(x.question));
  expect(matches).toHaveLength(1);
  const q=matches[0];
  expect(q).toBeDefined();
  fireEvent.click(screen.getByRole("button",{name:q!.options[q!.answer]}));
  expect(screen.getByText(q!.explanation)).toBeTruthy();
  fireEvent.click(screen.getByRole("button",{name:"Siguiente"}));
  expect(screen.getByText("Pregunta 2 de 10 · Intermedio")).toBeTruthy();
 });
});
