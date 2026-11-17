import {afterEach,describe,expect,it,vi} from "vitest";
import {cleanup,fireEvent,render,screen,within} from "@testing-library/react";
import {GrammarClassificationGame,GrammarConstructionGame} from "@/components/games/GrammarBlockGames";
import {GRAMMAR_CLASSIFICATION_DRAFT,GRAMMAR_CONSTRUCTION_DRAFT} from "@/lib/grammar-games-draft";
afterEach(cleanup);
describe("interacciones gramaticales",()=>{
 it("clasifica los tres elementos antes de calificar",()=>{
  const item=GRAMMAR_CLASSIFICATION_DRAFT[0],report=vi.fn();
  render(<GrammarClassificationGame item={item} report={report} next={vi.fn()} isLast={false}/>);
  const button=screen.getByRole("button",{name:"Comprobar"});
  expect(button.hasAttribute("disabled")).toBe(true);
  item.items.forEach((entry,i)=>fireEvent.click(within(screen.getByRole("group",{name:`Clasificación ${i+1}`})).getByRole("button",{name:item.labels[entry.answer]})));
  fireEvent.click(button);
  expect(report).toHaveBeenCalledWith(true);
  expect(screen.getByText(item.explanation,{exact:false})).toBeTruthy();
 });
 it("verifica el orden y muestra una corrección cuando falla",()=>{
  const item=GRAMMAR_CONSTRUCTION_DRAFT[0],report=vi.fn();
  render(<GrammarConstructionGame item={item} report={report} next={vi.fn()} isLast={false}/>);
  [2,1,0].forEach(i=>fireEvent.click(screen.getByRole("button",{name:item.pieces[i]})));
  fireEvent.click(screen.getByRole("button",{name:"Comprobar"}));
  expect(report).toHaveBeenCalledWith(false);
  expect(screen.getByText(/Orden:/)).toBeTruthy();
 });
});
