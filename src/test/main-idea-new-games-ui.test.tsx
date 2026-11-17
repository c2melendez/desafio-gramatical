import {afterEach,describe,expect,it,vi} from "vitest";
import {cleanup,fireEvent,render,screen} from "@testing-library/react";
import {ReadingDetective,ReadingReconstruct} from "@/components/games/ReadingGames";
import {MAIN_IDEA_DETECTIVE_CASES} from "@/lib/main-idea-detective-cases";
import {MAIN_IDEA_RECONSTRUCT_CASES} from "@/lib/main-idea-reconstruct-cases";

afterEach(cleanup);
describe("Idea principal: lectura independiente para clasificar y reconstruir",()=>{
 it.each(["principiante","intermedio","avanzado"] as const)("Detective reconoce las tres evidencias (%s)",level=>{
  const item=MAIN_IDEA_DETECTIVE_CASES.find(q=>q.level===level)!;
  const report=vi.fn();
  render(<ReadingDetective item={item} report={report} next={vi.fn()} isLast={false}/>);
  const labels={explicit:"Dato explícito",inference:"Inferencia razonable",unsupported:"No sustentado"};
  item.claims.forEach((claim,i)=>{
   const group=screen.getByRole("group",{name:`Clasificación de afirmación ${i+1}`});
   const button=Array.from(group.querySelectorAll("button")).find(b=>b.textContent===labels[claim.tag]);
   expect(button).toBeDefined();
   fireEvent.click(button!);
  });
  fireEvent.click(screen.getByRole("button",{name:"Comprobar las tres afirmaciones"}));
  expect(report).toHaveBeenCalledTimes(3);
  expect(report.mock.calls.every(([ok])=>ok===true)).toBe(true);
 });
 it.each(["principiante","intermedio","avanzado"] as const)("Reconstruye el texto valida secuencia (%s)",level=>{
  const item=MAIN_IDEA_RECONSTRUCT_CASES.find(q=>q.level===level)!;
  const report=vi.fn();
  render(<ReadingReconstruct item={item} report={report} next={vi.fn()} isLast={true}/>);
  for(const part of item.order.parts)fireEvent.click(screen.getByRole("button",{name:part}));
  fireEvent.click(screen.getByRole("button",{name:"Comprobar secuencia"}));
  expect(report).toHaveBeenCalledOnce();
  expect(report).toHaveBeenCalledWith(true,undefined);
 });
});
