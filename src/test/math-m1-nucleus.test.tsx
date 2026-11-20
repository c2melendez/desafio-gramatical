import {describe,it,expect,vi,afterEach} from "vitest";
import {cleanup,render,screen,fireEvent} from "@testing-library/react";
import {mathPool,MATH_LEVELS,MATH_MODES,MATH_TOPICS,MATH_SUBTOPICS,MATH_M1_TOTAL} from "@/lib/math-m1";
import {MathExerciseCard} from "@/components/games/MathExerciseCard";
import {countContent,coverageRows} from "@/lib/coverage";
import {availableModule} from "@/lib/phuma-catalog";
import {rotationKey} from "@/lib/rotation";
afterEach(()=>{cleanup();vi.restoreAllMocks();});
describe("Núcleo M1 Matemáticas: 22 subtemas, 3 juegos, 3 niveles",()=>{
 it("cubre todas las 198 celdas de Matemáticas con 2970 registros técnicos únicos",()=>{
  expect(MATH_SUBTOPICS).toHaveLength(22);
  expect(MATH_M1_TOTAL).toBe(2970);
  const rows=coverageRows().filter(r=>r.area==="matematicas");
  expect(rows).toHaveLength(198);
  const ids=new Set<string>();let total=0;
  for(const topic of MATH_TOPICS)for(const subtopic of topic.subtopics)
  for(const mode of MATH_MODES)for(const level of MATH_LEVELS){
   const bank=mathPool(topic.name,subtopic,level,mode);
   expect(bank.length).toBe(({principiante:10,intermedio:15,avanzado:20})[level]);
   expect(countContent("matematicas",topic.name,subtopic,mode,level)).toBe(({principiante:20,intermedio:35,avanzado:45})[level]);
   expect(availableModule("matematicas",topic.name,subtopic)).toBe(true);
   for(const item of bank){expect(ids.has(item.id)).toBe(false);ids.add(item.id);expect(item.reviewStatus).toBe("editorial-draft");}
   total+=bank.length;
  }
  expect(total).toBe(2970);expect(ids.size).toBe(2970);
 });
 it("conserva la separación de historial y rotación entre subtemas, juegos y niveles",()=>{
  const a=rotationKey("matematicas","Aritmética","Fracciones","quiz","intermedio");
  const b=rotationKey("matematicas","Aritmética","Fracciones","construir","intermedio");
  const c=rotationKey("matematicas","Aritmética","Fracciones","quiz","avanzado");
  expect(new Set([a,b,c]).size).toBe(3);
 });
 it("clasificar cuenta una ronda después de tres decisiones, y explica tanto éxito como error",()=>{
  const bank=mathPool("Aritmética","Operaciones","principiante","clasificar");
  const item=bank[0],report=vi.fn(),next=vi.fn();
  render(<MathExerciseCard item={item} onResult={report} onNext={next} isLast={false}/>);
  for(let i=0;i<3;i++){
   fireEvent.click(screen.getByRole("button",{name:item.assertions[i].truth?"Verdadero":"Falso"}));
   if(i<2)expect(report).not.toHaveBeenCalled();
  }
  expect(report).toHaveBeenCalledTimes(1);expect(report).toHaveBeenCalledWith(true,expect.any(String));
  expect(screen.getByTestId("learning-feedback")).toHaveClass("bg-success-soft");
  expect(screen.getByText(/Procedimiento comprobable:/)).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{name:"Continuar"}));expect(next).toHaveBeenCalledOnce();
 });
 it("construcción exige dos decisiones antes de registrar la única ronda",()=>{
  const item=mathPool("Álgebra","Ecuaciones","intermedio","construir")[2],report=vi.fn();
  render(<MathExerciseCard item={item} onResult={report} onNext={vi.fn()} isLast/>);
  for(let j=0;j<2;j++){
   const step=item.steps[j];
   fireEvent.click(screen.getByRole("button",{name:step.choices[step.answerIndex]}));
   if(j===0)expect(report).not.toHaveBeenCalled();
  }
  expect(report).toHaveBeenCalledTimes(1);expect(report).toHaveBeenCalledWith(true,expect.any(String));
  expect(screen.getByRole("button",{name:"Ver resultados"})).toBeInTheDocument();
 });
 it("muestra diagnóstico del error para una elección incorrecta",()=>{
  const item=mathPool("Geometría","Pitágoras","avanzado","quiz")[3],bad=(item.answerIndex+1)%4,report=vi.fn();
  render(<MathExerciseCard item={item} onResult={report} onNext={vi.fn()} isLast/>);
  fireEvent.click(screen.getByRole("button",{name:item.options[bad]}));
  expect(report).toHaveBeenCalledWith(false,item.options[bad]);
  expect(screen.getByTestId("learning-feedback")).toHaveClass("bg-destructive-soft");
  expect(screen.getByText("¿Por qué no es correcta?")).toBeInTheDocument();
 });
});
