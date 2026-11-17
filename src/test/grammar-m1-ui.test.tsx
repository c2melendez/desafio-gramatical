import {afterEach,describe,expect,it,vi} from "vitest";
import {cleanup,fireEvent,render,screen} from "@testing-library/react";
import {GrammarM1Play} from "@/components/games/GrammarM1Play";
import {MORPH_CONSTRUCTION} from "@/lib/grammar-m1-activities";
import {rotationKey,readRotation} from "@/lib/rotation";
vi.mock("@tanstack/react-router",()=>({
 Link:({children}:{children:React.ReactNode})=><span>{children}</span>
}));
afterEach(()=>{cleanup();localStorage.clear()});
describe("M1: integración funcional de construcción",()=>{
 it("carga el juego, valida una respuesta, registra rotación y avanza",()=>{
  render(<GrammarM1Play subtema="Morfosintaxis" modo="construir" nivel="principiante"/>);
  const matches=MORPH_CONSTRUCTION.filter(x=>x.level==="principiante"&&screen.queryByText(x.prompt));
  expect(matches).toHaveLength(1);
  const item=matches[0];
  for(const id of item.solutions[0]){
   const tile=item.tiles.find(x=>x.id===id)!;
   fireEvent.click(screen.getByRole("button",{name:tile.text}));
  }
  fireEvent.click(screen.getByRole("button",{name:"Comprobar"}));
  expect(screen.getByText("Correcto.")).toBeTruthy();
  const key=rotationKey("espanol","Gramática y semántica","Morfosintaxis","construir","principiante");
  expect(readRotation(key,MORPH_CONSTRUCTION.map(x=>x.id)).seen).toContain(item.id);
  fireEvent.click(screen.getByRole("button",{name:"Continuar"}));
  expect(screen.getByText(/Pregunta 2 de 10/)).toBeTruthy();
 });
 it("rechaza distractor de concordancia y conserva el error en historial de rotación",()=>{
  render(<GrammarM1Play subtema="Morfosintaxis" modo="construir" nivel="principiante"/>);
  const item=MORPH_CONSTRUCTION.find(x=>x.level==="principiante"&&screen.queryByText(x.prompt))!;
  expect(item).toBeDefined();
  for(const id of [...item.solutions[0].slice(0,2),"d"]){
   const tile=item.tiles.find(x=>x.id===id)!;
   fireEvent.click(screen.getByRole("button",{name:tile.text}));
  }
  fireEvent.click(screen.getByRole("button",{name:"Comprobar"}));
  expect(screen.getByText(/Una solución:/)).toBeTruthy();
  const key=rotationKey("espanol","Gramática y semántica","Morfosintaxis","construir","principiante");
  expect(readRotation(key,MORPH_CONSTRUCTION.map(x=>x.id)).incorrect).toContain(item.id);
 });
});
