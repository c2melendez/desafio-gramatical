import {afterEach,describe,expect,it,vi} from "vitest";
import {cleanup,fireEvent,render,screen,within} from "@testing-library/react";
import {ReadingDetective,ReadingInference,ReadingReconstruct} from "@/components/games/ReadingGames";
import {FIGURATIVE_DETECTIVE_CASES,FIGURATIVE_CHOICE_CASES,FIGURATIVE_RECONSTRUCT_CASES} from "@/lib/reading-figurative-block";
afterEach(cleanup);
describe("Lenguaje figurado — funcionamiento de los tres juegos",()=>{
 it.each(["principiante","intermedio","avanzado"] as const)("Detective evalúa tres evidencias de una imagen figurativa (%s)",level=>{
  const item=FIGURATIVE_DETECTIVE_CASES.find(q=>q.level===level)!;
  const report=vi.fn();
  render(<ReadingDetective item={item} report={report} next={vi.fn()} isLast={false}/>);
  for(const [i,claim] of item.claims.entries()){
   const group=screen.getByRole("group",{name:`Clasificación de afirmación ${i+1}`});
   const label={explicit:"Dato explícito",inference:"Inferencia razonable",unsupported:"No sustentado"}[claim.tag];
   fireEvent.click(within(group).getByRole("button",{name:label}));
  }
  fireEvent.click(screen.getByRole("button",{name:"Comprobar las tres afirmaciones"}));
  expect(report).toHaveBeenCalledTimes(3);
  expect(report.mock.calls.every(([ok])=>ok===true)).toBe(true);
 });
 it.each(["principiante","intermedio","avanzado"] as const)("Verdad o inferencia evalúa una interpretación incorrecta (%s)",level=>{
  const item=FIGURATIVE_CHOICE_CASES.find(q=>q.level===level)!;
  const report=vi.fn();
  render(<ReadingInference item={item} report={report} next={vi.fn()} isLast={false}/>);
  const wrong=item.options.findIndex((_,i)=>i!==item.answer);
  fireEvent.click(screen.getByRole("button",{name:item.options[wrong]}));
  expect(report).toHaveBeenCalledOnce();
  expect(report.mock.calls[0][0]).toBe(false);
  expect(report.mock.calls[0][1].correct).toBe(item.options[item.answer]);
 });
 it.each(["principiante","intermedio","avanzado"] as const)("Reconstruye interpreta la figura literaria (%s)",level=>{
  const item=FIGURATIVE_RECONSTRUCT_CASES.find(q=>q.level===level)!;
  const report=vi.fn();
  render(<ReadingReconstruct item={item} report={report} next={vi.fn()} isLast={true}/>);
  for(const part of item.order.parts)fireEvent.click(screen.getByRole("button",{name:part}));
  fireEvent.click(screen.getByRole("button",{name:"Comprobar secuencia"}));
  expect(report).toHaveBeenCalledWith(true,undefined);
 });
});