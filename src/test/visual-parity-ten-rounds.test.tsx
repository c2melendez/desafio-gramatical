import {afterEach,describe,expect,it,vi} from "vitest";
import {cleanup,fireEvent,render,screen} from "@testing-library/react";
vi.mock("@tanstack/react-router",()=>({
 createFileRoute:()=>()=>({}),
 Link:({children}:{children:React.ReactNode})=><span>{children}</span>,
}));
import {GameSessionHeader,ROUNDS_PER_GAME} from "@/components/games/GameSessionHeader";
import {buildItems} from "@/routes/jugar";
import {readingItems,READING_SUBTOPICS} from "@/lib/reading";
import {writingItems,WRITING_SUBTOPICS} from "@/lib/writing";
import {grammarM1Pool} from "@/components/games/GrammarM1Play";
import {grammarPilotPool,GRAMMAR_PILOT_SUBTOPICS} from "@/lib/grammar-next-draft";

afterEach(()=>{cleanup();localStorage.clear();vi.restoreAllMocks();});
describe("Contrato visual y funcional transversal",()=>{
 it("define diez rondas para todos los juegos, no cinco ni ocho",()=>{
  expect(ROUNDS_PER_GAME).toBe(10);
  for(const level of ["principiante","intermedio","avanzado"] as const){
   for(const mode of ["clasificar","quiz","construir"] as const){
    const bank=buildItems(mode,level);
    expect(bank,mode+"/"+level).toHaveLength(10);
    expect(new Set(bank.map(x=>x.id)).size).toBe(10);
   }
  }
 });
 it("mantiene diez retos por partida en las rutas de Lectura, Redacción y Gramática",()=>{
  for(const level of ["principiante","intermedio","avanzado"] as const){
   for(const mode of ["clasificar","quiz","construir"] as const){
    for(const sub of READING_SUBTOPICS){
     const bank=readingItems(level,sub,mode);
     expect(bank.length,sub+"/"+mode+"/"+level).toBe(10);
     expect(new Set(bank.map(x=>x.id)).size).toBe(10);
    }
    for(const sub of WRITING_SUBTOPICS){
     const bank=writingItems(level,sub,mode);
     expect(bank.length,sub+"/"+mode+"/"+level).toBe(10);
     expect(new Set(bank.map(x=>x.id)).size).toBe(10);
    }
    for(const sub of GRAMMAR_PILOT_SUBTOPICS){
     const bank=mode==="quiz"?grammarPilotPool(sub,level):grammarM1Pool(sub,mode,level);
     expect(bank.length,sub+"/"+mode+"/"+level).toBeGreaterThanOrEqual(10);
    }
   }
  }
 });
 it("renderiza salir, reiniciar, Ronda, Puntaje, Racha y barra con 10 pasos",()=>{
  const restart=vi.fn();
  vi.spyOn(window,"confirm").mockReturnValue(true);
  const {rerender}=render(<GameSessionHeader context="Idea principal · Intermedio" title="Detective de ideas"
    round={1} score={0} streak={0} onRestart={restart}/>);
  expect(screen.getByText("Ronda")).toBeInTheDocument();
  expect(screen.getByText("1/10")).toBeInTheDocument();
  expect(screen.getByText("Puntaje")).toBeInTheDocument();
  expect(screen.getByText("Racha")).toBeInTheDocument();
  expect(screen.getByText(/Salir/)).toBeInTheDocument();
  const bar=screen.getByRole("progressbar");
  expect(bar).toHaveAttribute("aria-valuemax","10");
  expect(bar).toHaveAttribute("aria-valuenow","1");
  fireEvent.click(screen.getByRole("button",{name:"Reiniciar"}));
  expect(restart).toHaveBeenCalledOnce();
  rerender(<GameSessionHeader context="Idea principal · Intermedio" title="Detective de ideas"
   round={10} score={100} streak={4} onRestart={restart}/>);
  expect(screen.getByText("10/10")).toBeInTheDocument();
  expect(bar).toHaveAttribute("aria-valuenow","10");
 });
 it("no reinicia si la confirmación se rechaza",()=>{
  vi.spyOn(window,"confirm").mockReturnValue(false);
  const restart=vi.fn();
  render(<GameSessionHeader context="Gramática · Básico" title="Clasificar" round={5}
   score={20} streak={2} onRestart={restart}/>);
  fireEvent.click(screen.getByRole("button",{name:"Reiniciar"}));
  expect(restart).not.toHaveBeenCalled();
 });
});
