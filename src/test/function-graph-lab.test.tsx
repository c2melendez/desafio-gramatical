import {describe,it,expect} from "vitest";
import {render,screen,cleanup} from "@testing-library/react";
import {afterEach} from "vitest";
import {GRAPH_SKILLS,graphCorrectAnswer,graphPool,graphY,makeGraph,type GraphData} from "@/lib/function-graph-lab";
import {FunctionGraph} from "@/components/games/FunctionGraph";
import {LEVELS} from "@/lib/grammar";

afterEach(()=>cleanup());
describe("Laboratorio gráfico — validez de seis habilidades",()=>{
 it("produce 72 ítems por nivel, 216 en total, cuatro alternativas y claves distintas por ID",()=>{
  const ids=new Set<string>();
  for(const level of LEVELS){
   const pool=graphPool(level);
   expect(pool).toHaveLength(72);
   for(const item of pool){
    expect(ids.has(item.id)).toBe(false);ids.add(item.id);
    expect(item.options).toHaveLength(4);
    expect(new Set(item.options).size).toBe(4);
    expect(item.options[item.answerIndex]).toBe(item.answer);
    expect(item.answer).toBe(graphCorrectAnswer(item.graph,item.skill));
    expect(item.visualRequirement).toBe("essential");
    expect(item.explanation).toContain(item.answer);
    expect(item.graph.xs[0]).toBeLessThan(item.graph.xs[1]);
    expect(item.graph.xs[1]).toBeLessThan(item.graph.xs[2]);
   }
   for(const skill of GRAPH_SKILLS)expect(pool.filter(item=>item.skill===skill)).toHaveLength(12);
  }
  expect(ids.size).toBe(216);
 });
 it("distingue dominio de rango y extremos incluidos",()=>{
  const graph:GraphData={xs:[-4,0,4],ys:[-2,3,1],closed:true};
  expect(graphCorrectAnswer(graph,"domain")).toBe("[-4, 4]");
  expect(graphCorrectAnswer(graph,"range")).toBe("[-2, 3]");
 });
 it("calcula tramos de crecimiento y decrecimiento, sin confundir intervalos contiguos",()=>{
  const peak:GraphData={xs:[-4,0,4],ys:[-2,3,-1],closed:true};
  expect(graphCorrectAnswer(peak,"increasing")).toBe("[-4, 0]");
  expect(graphCorrectAnswer(peak,"decreasing")).toBe("[0, 4]");
  const rising:GraphData={xs:[-4,0,4],ys:[-2,0,3],closed:true};
  expect(graphCorrectAnswer(rising,"increasing")).toBe("[-4, 4]");
  expect(graphCorrectAnswer(rising,"decreasing")).toBe("Ninguno");
 });
 it("distingue intersección en x de intersección en y y verifica interpolación",()=>{
  const graph:GraphData={xs:[-4,0,4],ys:[3,0,4],closed:true};
  expect(graphCorrectAnswer(graph,"x-intercept")).toBe("(0, 0)");
  expect(graphCorrectAnswer(graph,"y-intercept")).toBe("(0, 0)");
  expect(graphY(graph,-2)).toBe(1.5);
  expect(graphY(graph,-5)).toBeUndefined();
  for(const level of LEVELS)for(let i=5;i<72;i+=6){
   const g=makeGraph(i,level,"x-intercept");
   expect(g.ys[1]).toBe(0);
   expect(g.ys[0]*g.ys[2]).toBeGreaterThan(0);
   expect(graphCorrectAnswer(g,"x-intercept")).toBe(`(${g.xs[1]}, 0)`);
  }
 });
 it("cambiar información relevante del estímulo cambia la clave, control negativo",()=>{
  const g:GraphData={xs:[-4,0,4],ys:[-3,4,-1],closed:true};
  expect(graphCorrectAnswer({...g,xs:[-5,0,4]},"domain")).not.toBe(graphCorrectAnswer(g,"domain"));
  expect(graphCorrectAnswer({...g,ys:[-3,5,-1]},"range")).not.toBe(graphCorrectAnswer(g,"range"));
  expect(graphCorrectAnswer({...g,ys:[5,4,-1]},"increasing")).not.toBe(graphCorrectAnswer(g,"increasing"));
  expect(graphCorrectAnswer({...g,ys:[-3,4,6]},"decreasing")).not.toBe(graphCorrectAnswer(g,"decreasing"));
  expect(graphCorrectAnswer({...g,ys:[-3,3,-1]},"y-intercept")).not.toBe(graphCorrectAnswer(g,"y-intercept"));
 });
 it("el SVG expone coordenadas y ejes sin filtrar la solución en el texto visible",()=>{
  const graph=makeGraph(0,"intermedio","domain");
  render(<FunctionGraph graph={graph}/>);
  const svg=screen.getByRole("img",{name:/plano cartesiano con ejes/i});
  expect(svg).toHaveAttribute("data-testid","function-graph");
  expect(svg.querySelectorAll("circle")).toHaveLength(3);
  expect(svg.querySelectorAll("polyline")).toHaveLength(1);
  expect(screen.getByText(/gráfica a escala/i)).toBeInTheDocument();
 });
});
