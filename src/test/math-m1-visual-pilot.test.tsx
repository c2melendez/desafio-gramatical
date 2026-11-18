import {afterEach,describe,expect,it,vi} from "vitest";
import {cleanup,fireEvent,render,screen} from "@testing-library/react";
import {mathModel,mathPool,MATH_LEVELS,MATH_TOPICS} from "@/lib/math-m1";
import {visualAnswer,visualDescription,type MathVisual} from "@/lib/math-visual";
import {MathExerciseCard} from "@/components/games/MathExerciseCard";
afterEach(()=>{cleanup();vi.restoreAllMocks();});
const scope=[
 ["Álgebra","Funciones","linear-function"],
 ["Álgebra","Inecuaciones","number-line"],
 ["Geometría","Ángulos","triangle-angles"],
 ["Geometría","Pitágoras","right-triangle"],
 ["Estadística y probabilidad","Tablas y gráficas","bar-chart"]
] as const;
describe("rehabilitación visual M1 — piloto de cinco competencias",()=>{
 it("todos los 225 estímulos de selección requieren datos visuales y sus claves coinciden con el oráculo",()=>{
  let total=0;
  for(const [topic,subtopic,kind] of scope)for(const level of MATH_LEVELS){
   const pool=mathPool(topic,subtopic,level,"quiz");
   for(const item of pool){
    total++;
    expect(item.visualRequirement).toBe("essential");
    expect(item.visual?.kind).toBe(kind);
    expect(item.visual).toBeDefined();
    expect(visualAnswer(item.visual!)).toBe(item.oracle.answer.n/item.oracle.answer.d);
    expect(item.options[item.answerIndex]).toBe(item.expected);
    expect(new Set(item.options).size).toBe(4);
    expect(item.explanation).toContain(item.expected);
    expect(visualDescription(item.visual!).length).toBeGreaterThan(55);
   }
  }
  expect(total).toBe(225);
 });
 it("los modos que aún no se rediseñaron no se cuentan como visuales aptos",()=>{
  for(const [topic,subtopic] of scope)for(const mode of ["clasificar","construir"] as const){
   const item=mathModel(topic,subtopic,"principiante",mode,0);
   expect(item.visualRequirement).toBe("none");expect(item.visual).toBeUndefined();
  }
 });
 it("sin el objeto gráfico, el estudiante carece de datos necesarios para responder",()=>{
  const item=mathModel("Geometría","Pitágoras","principiante","quiz",0);
  expect(item.prompt).toContain(String(item.visual!.kind==="right-triangle"?item.visual!.legA:""));
  expect(item.prompt).not.toContain(` ${item.visual!.kind==="right-triangle"?item.visual!.legB:"-"} cm`);
 });
 it("la representación alterada falla frente al oráculo — mutación negativa",()=>{
  for(const [topic,subtopic] of scope){
   const item=mathModel(topic,subtopic,"principiante","quiz",0);
   const visual=item.visual!;
   const mutated:MathVisual=visual.kind==="triangle-angles"?{...visual,beta:visual.beta+1}:
    visual.kind==="right-triangle"?{...visual,legB:visual.legB+1}:
    visual.kind==="bar-chart"?{...visual,tuesday:visual.tuesday+1}:
    visual.kind==="linear-function"?{...visual,slope:visual.slope+1}:
    {...visual,boundary:visual.boundary+1};
   expect(visualAnswer(mutated)).not.toBe(item.oracle.answer.n/item.oracle.answer.d);
  }
 });
 it("representa SVG semántico y permite completar una pregunta visual en un solo resultado",()=>{
  const item=mathModel("Álgebra","Inecuaciones","intermedio","quiz",2),result=vi.fn(),next=vi.fn();
  render(<MathExerciseCard item={item} onResult={result} onNext={next} isLast={false}/>);
  const visual=screen.getByRole("img",{name:/círculo abierto/i});
  expect(visual).toHaveAttribute("data-testid","math-visual");
  expect(screen.queryByTestId("learning-feedback")).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{name:item.expected}));
  expect(result).toHaveBeenCalledExactlyOnceWith(true,item.expected);
  expect(screen.getByTestId("learning-feedback")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{name:"Continuar"}));
  expect(next).toHaveBeenCalledOnce();
 });
});
