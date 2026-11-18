import {afterEach,describe,expect,it,vi} from "vitest";
import {cleanup,fireEvent,render,screen} from "@testing-library/react";
import {mathPool,MATH_LEVELS,mathModel} from "@/lib/math-m1";
import {visualAnswer,visualDescription,type MathVisual} from "@/lib/math-visual";
import {MathExerciseCard} from "@/components/games/MathExerciseCard";
afterEach(()=>cleanup());
const cases=[
 ["Álgebra","Funciones","linear-function"],["Álgebra","Inecuaciones","number-line"],
 ["Geometría","Ángulos","triangle-angles"],["Geometría","Pitágoras","right-triangle"],
 ["Geometría","Áreas y perímetros","rectangle"],["Geometría","Sólidos: área y volumen","prism"],
 ["Geometría","Semejanza","similar-triangles"],
 ["Estadística y probabilidad","Tablas y gráficas","bar-chart"]
] as const;
const modes=["clasificar","quiz","construir"] as const;
function mutate(v:MathVisual):MathVisual{
 switch(v.kind){
 case "triangle-angles":return {...v,beta:v.beta+1};
 case "right-triangle":return {...v,legB:v.legB+1};
 case "bar-chart":return {...v,tuesday:v.tuesday+1};
 case "linear-function":return {...v,slope:v.slope+1};
 case "number-line":return {...v,boundary:v.boundary+1};
 case "rectangle":return {...v,length:v.length+1};
 case "prism":return {...v,height:v.height+1};
 case "similar-triangles":return {...v,large:v.large+1};
 }
}
describe("rehabilitación geométrica y de mecánicas de Matemáticas M1",()=>{
 it("las 8 competencias y 3 mecánicas tienen 1080 estímulos esenciales con oráculo independiente",()=>{
  let count=0;
  for(const [topic,subtopic,kind] of cases)for(const mode of modes)for(const level of MATH_LEVELS){
   const bank=mathPool(topic,subtopic,level,mode);
   for(const item of bank){
    count++;
    expect(item.visualRequirement).toBe("essential");
    expect(item.visual?.kind).toBe(kind);
    expect(visualAnswer(item.visual!)).toBe(item.oracle.answer.n/item.oracle.answer.d);
    expect(visualAnswer(mutate(item.visual!))).not.toBe(item.oracle.answer.n/item.oracle.answer.d);
    expect(visualDescription(item.visual!).length).toBeGreaterThan(45);
    expect(item.options[item.answerIndex]).toBe(item.expected);
    expect(item.assertions.filter(a=>a.truth)).toHaveLength(1);
    expect(item.steps).toHaveLength(2);
    expect(item.explanation).toContain(item.expected);
   }
  }
  expect(count).toBe(1080);
 });
 it("no declara visuales las modalidades de temas sin rehabilitar",()=>{
  const item=mathModel("Aritmética","Operaciones","intermedio","clasificar",0);
  expect(item.visualRequirement).toBe("none");
  expect(item.visual).toBeUndefined();
 });
 it("clasificación exige interpretar figura y registra una sola ronda",()=>{
  const item=mathModel("Geometría","Sólidos: área y volumen","principiante","clasificar",0),result=vi.fn();
  render(<MathExerciseCard item={item} onResult={result} onNext={vi.fn()} isLast={false}/>);
  expect(screen.getByRole("img",{name:/prisma rectangular/i})).toBeInTheDocument();
  for(const assertion of item.assertions){
   fireEvent.click(screen.getByRole("button",{name:assertion.truth?"Verdadero":"Falso"}));
  }
  expect(result).toHaveBeenCalledOnce();
  expect(result.mock.calls[0][0]).toBe(true);
  expect(screen.getByTestId("learning-feedback")).toBeInTheDocument();
 });
 it("construcción lee medidas de una figura y completa dos decisiones en una ronda",()=>{
  const item=mathModel("Geometría","Semejanza","intermedio","construir",2),result=vi.fn();
  render(<MathExerciseCard item={item} onResult={result} onNext={vi.fn()} isLast={false}/>);
  expect(screen.getByRole("img",{name:/dos triángulos semejantes/i})).toBeInTheDocument();
  for(const step of item.steps)fireEvent.click(screen.getByRole("button",{name:step.choices[step.answerIndex]}));
  expect(result).toHaveBeenCalledOnce();
  expect(result.mock.calls[0][0]).toBe(true);
 });
});
