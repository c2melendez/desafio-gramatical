import {afterEach,describe,it,expect} from "vitest";
import {render,screen,cleanup} from "@testing-library/react";
import {LEVELS} from "@/lib/grammar";
import {GEOMETRY_SKILLS,geometryPool,geometryOracle,geometryTask,type ParallelFigure,type CompositeFigure} from "@/lib/geometry-visual-lab";
import {GeometryVisual} from "@/components/games/GeometryVisual";
afterEach(()=>cleanup());
describe("Laboratorio geométrico — geometría aplicada sin enunciados decorativos",()=>{
 it("216 reactivos técnicos (72 por nivel) con cuatro alternativas y oráculos",()=>{
  const ids=new Set<string>();
  for(const level of LEVELS){
   const bank=geometryPool(level);
   expect(bank).toHaveLength(72);
   for(const item of bank){
    expect(ids.has(item.id)).toBe(false);ids.add(item.id);
    expect(item.visualRequirement).toBe("essential");
    expect(item.options).toHaveLength(4);
    expect(new Set(item.options).size).toBe(4);
    expect(item.options[item.answerIndex]).toBe(item.answer);
    expect(item.answer).toBe(`${geometryOracle(item.figure,item.skill)}${item.figure.kind==="parallel"?"°":item.skill==="composite-area"?" cm²":" cm"}`);
    expect(item.explanation).toContain(item.answer);
   }
   for(const skill of GEOMETRY_SKILLS)expect(bank.filter(q=>q.skill===skill)).toHaveLength(18);
  }
  expect(ids.size).toBe(216);
 });
 it("distingue correspondiente de suplementario y cambia clave con dato angular",()=>{
  const f:ParallelFigure={kind:"parallel",parallel:true,degrees:110};
  expect(geometryOracle(f,"corresponding")).toBe(110);
  expect(geometryOracle(f,"supplementary")).toBe(70);
  expect(geometryOracle({...f,degrees:120},"supplementary")).not.toBe(geometryOracle(f,"supplementary"));
 });
 it("figura compuesta: área por sustracción y perímetro por contorno real",()=>{
  const f:CompositeFigure={kind:"composite",width:12,height:8,cutWidth:4,cutHeight:3};
  expect(geometryOracle(f,"composite-area")).toBe(84);
  expect(geometryOracle(f,"composite-perimeter")).toBe(40);
  expect(geometryOracle({...f,cutWidth:3},"composite-area")).not.toBe(84);
  expect(geometryOracle({...f,width:13},"composite-perimeter")).not.toBe(40);
  expect(geometryOracle({...f,cutWidth:3},"composite-perimeter")).toBe(40);
 });
 it("figuras SVG son legibles semánticamente y no revelan clave en la consigna",()=>{
  const a=geometryTask(0,"principiante");
  render(<GeometryVisual figure={a.figure} question="corresponding"/>);
  expect(screen.getByRole("img",{name:/dos rectas horizontales/i})).toHaveAttribute("data-testid","geometry-figure");
  cleanup();
  const b=geometryTask(2,"principiante");
  render(<GeometryVisual figure={b.figure} question="composite-area"/>);
  expect(screen.getByRole("img",{name:/figura compuesta en L/i})).toBeInTheDocument();
 });
});
