import {afterEach,beforeEach,describe,expect,it,vi} from "vitest";
import {cleanup,fireEvent,render,screen} from "@testing-library/react";
vi.mock("@tanstack/react-router",()=>({
 createFileRoute:()=>()=>({}),
 Link:({children}:{children:React.ReactNode})=><span>{children}</span>,
}));
import {GrammarPilot} from "@/routes/jugar";
import {GrammarM1Play} from "@/components/games/GrammarM1Play";
import {M1_LITERATURE_QUIZ,M1_LITERATURE_ACTIVITIES} from "@/lib/grammar-m1-literature";
import {rotationKey,readRotation} from "@/lib/rotation";
beforeEach(()=>vi.spyOn(Math,"random").mockReturnValue(0.999999));
afterEach(()=>{vi.restoreAllMocks();cleanup();localStorage.clear()});
describe("M1 integración de Literatura",()=>{
 it("juego de selección carga una figura y da retroalimentación",()=>{
  render(<GrammarPilot subtema="Figuras retóricas" nivel="principiante"/>);
  const candidates=M1_LITERATURE_QUIZ.filter(x=>x.subtopic==="Figuras retóricas"&&x.level==="principiante");
  const q=candidates.find(x=>screen.queryByText(x.passage)&&screen.queryByText(x.question))!;
  expect(q).toBeDefined();
  fireEvent.click(screen.getByRole("button",{name:q.options[q.answer]}));
  expect(screen.getByText(q.explanation)).toBeTruthy();
 });
 it("construcción de género graba su progreso en Literatura y no Gramática",()=>{
  render(<GrammarM1Play subtema="Géneros literarios" modo="construir" nivel="principiante"/>);
  const cases=M1_LITERATURE_ACTIVITIES.filter(x=>x.subtopic==="Géneros literarios"&&x.level==="principiante"&&x.kind==="construction");
  const item=cases.find(x=>screen.queryByText(x.prompt))!;
  expect(item).toBeDefined();
  if(item.kind!=="construction")throw new Error("modalidad inválida");
  for(const id of item.solutions[0]){
   const tile=item.tiles.find(t=>t.id===id)!;
   fireEvent.click(screen.getByRole("button",{name:tile.text}));
  }
  fireEvent.click(screen.getByRole("button",{name:"Comprobar"}));
  expect(screen.getByText("Correcto.")).toBeTruthy();
  const key=rotationKey("espanol","Literatura","Géneros literarios","construir","principiante");
  expect(readRotation(key,cases.map(x=>x.id)).seen).toContain(item.id);
  expect(localStorage.getItem(rotationKey("espanol","Gramática y semántica","Géneros literarios","construir","principiante"))).toBeNull();
 });
});
