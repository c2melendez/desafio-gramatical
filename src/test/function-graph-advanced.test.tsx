import {afterEach,describe,expect,it} from "vitest";
import {cleanup,render,screen} from "@testing-library/react";
import {LEVELS} from "@/lib/grammar";
import {extendedGraph,extendedOracle,extendedPool,EXTENDED_SKILLS,type QuadraticGraph,type JumpGraph} from "@/lib/function-graph-advanced";
import {AdvancedFunctionGraph} from "@/components/games/AdvancedFunctionGraph";
afterEach(()=>cleanup());
describe("Laboratorio II — ocho competencias gráficas y oráculos",()=>{
 it("genera 288 tareas verificables, 96 por nivel, 12 por destreza",()=>{
  const ids=new Set<string>();
  for(const level of LEVELS){
   const bank=extendedPool(level);
   expect(bank).toHaveLength(96);
   for(const task of bank){
    expect(ids.has(task.id)).toBe(false);ids.add(task.id);
    expect(task.options).toHaveLength(4);
    expect(new Set(task.options).size).toBe(4);
    expect(task.options[task.answerIndex]).toBe(task.answer);
    expect(extendedOracle(task.graph,task.skill)).toBe(task.answer);
    expect(task.explanation).toContain(task.answer);
    expect(task.visualRequirement).toBe("essential");
   }
   for(const skill of EXTENDED_SKILLS)expect(bank.filter(task=>task.skill===skill)).toHaveLength(12);
  }
  expect(ids.size).toBe(288);
 });
 it("dos raíces y concavidad del modelo cuadrático tienen consecuencias correctas",()=>{
  const q:QuadraticGraph={kind:"quadratic",h:1,a:1,k:-4,radius:3};
  expect(extendedOracle(q,"vertex")).toBe("(1, -4)");
  expect(extendedOracle(q,"quadratic-range")).toBe("[-4, 5]");
  expect(extendedOracle(q,"quadratic-roots")).toBe("(-1, 0) y (3, 0)");
  expect(extendedOracle(q,"quadratic-growth")).toBe("[1, 4]");
  const down:QuadraticGraph={...q,a:-1,k:4};
  expect(extendedOracle(down,"quadratic-range")).toBe("[-5, 4]");
  expect(extendedOracle(down,"quadratic-growth")).toBe("[-2, 1]");
 });
 it("separación de valor y límite, continuidad y extremos excluidos",()=>{
  const jump:JumpGraph={kind:"jump",leftIntercept:3,rightIntercept:-3,leftOpen:true,rightClosed:true};
  expect(extendedOracle(jump,"jump-value")).toBe("-3");
  expect(extendedOracle(jump,"jump-left-limit")).toBe("3");
  expect(extendedOracle(jump,"jump-continuity")).toBe("No, tiene un salto");
  expect(extendedOracle(jump,"jump-range")).toBe("[-3, 3)");
  const connected:JumpGraph={...jump,rightIntercept:3};
  expect(extendedOracle(connected,"jump-continuity")).toBe("Sí, es continua");
  expect(extendedOracle(connected,"jump-range")).toBe("[-1, 7]");
 });
 it("cambiar parámetros relevantes altera las soluciones correctas",()=>{
  const q:QuadraticGraph={kind:"quadratic",h:0,a:1,k:-4,radius:3};
  expect(extendedOracle({...q,h:1},"vertex")).not.toBe(extendedOracle(q,"vertex"));
  expect(extendedOracle({...q,k:-5},"quadratic-range")).not.toBe(extendedOracle(q,"quadratic-range"));
  expect(extendedOracle({...q,h:2},"quadratic-roots")).not.toBe(extendedOracle(q,"quadratic-roots"));
  const j:JumpGraph={kind:"jump",leftIntercept:3,rightIntercept:-3,leftOpen:true,rightClosed:true};
  expect(extendedOracle({...j,rightIntercept:-2},"jump-value")).not.toBe(extendedOracle(j,"jump-value"));
  expect(extendedOracle({...j,leftIntercept:2},"jump-left-limit")).not.toBe(extendedOracle(j,"jump-left-limit"));
  expect(extendedOracle({...j,rightIntercept:3},"jump-continuity")).not.toBe(extendedOracle(j,"jump-continuity"));
  expect(extendedOracle({...j,leftIntercept:2},"jump-range")).not.toBe(extendedOracle(j,"jump-range"));
 });
 it("la imagen muestra parábolas y tramos con extremos semánticamente accesibles",()=>{
  render(<AdvancedFunctionGraph graph={extendedGraph(0,"intermedio","vertex")}/>);
  expect(screen.getByRole("img",{name:/parábola definida en el intervalo cerrado/i})).toBeInTheDocument();
  expect(screen.getByTestId("advanced-function-graph").querySelector("polyline")).toBeInTheDocument();
  cleanup();
  render(<AdvancedFunctionGraph graph={extendedGraph(4,"avanzado","jump-value")}/>);
  expect(screen.getByRole("img",{name:/círculo abierto/i})).toBeInTheDocument();
  expect(screen.getByTestId("advanced-function-graph").querySelectorAll("circle").length).toBeGreaterThanOrEqual(4);
 });
});
