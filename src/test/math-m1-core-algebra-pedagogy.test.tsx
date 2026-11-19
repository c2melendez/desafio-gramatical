import {afterEach,describe,expect,it,vi} from "vitest";
import {cleanup,fireEvent,render,screen} from "@testing-library/react";
import {mathModel,mathPool,MATH_LEVELS,MATH_MODES} from "@/lib/math-m1";
import {corePedagogy} from "@/lib/math-m1-core-pedagogy";
import {MathExerciseCard} from "@/components/games/MathExerciseCard";
afterEach(()=>cleanup());

describe("M1 banco principal: etapa cognitiva y operación lúdica algebraicas",()=>{
 const subtopics=["Ecuaciones","Sistemas de ecuaciones"] as const;
 it("rehabilita 270 registros existentes, conservando IDs y oráculos independientes",()=>{
  const ids=new Set<string>();
  for(const subtopic of subtopics)for(const mode of MATH_MODES)for(const level of MATH_LEVELS){
   const bank=mathPool("Álgebra",subtopic,level,mode);
   for(const item of bank){
    expect(item.id).toContain("math-m1-algebra-");
    expect(ids.has(item.id)).toBe(false);ids.add(item.id);
    expect(item.cognitiveStage).toBe(level==="principiante"?1:level==="intermedio"?2:3);
    expect(item.modeOperation).toBe(mode==="clasificar"?"evaluar-validez-de-transformaciones":mode==="quiz"?"resolver-modelo-transformado":"construir-cadena-de-eliminacion");
    expect(item.requiredEvidence?.length).toBe(level==="principiante"?2:level==="intermedio"?3:4);
    expect(item.options).toHaveLength(4);
    expect(new Set(item.options).size).toBe(4);
    expect(item.options[item.answerIndex]).toBe(item.expected);
    expect(item.assertions).toHaveLength(3);
    expect(item.assertions.filter(x=>x.truth)).toHaveLength(1);
    expect(new Set(item.assertions.map(x=>x.text)).size).toBe(3);
    expect(item.steps).toHaveLength(2);
    expect(item.steps[1].choices[item.steps[1].answerIndex]).toBe(item.expected);
    const x=item.oracle.inputs;
    const recomputed=subtopic==="Ecuaciones"?(x[2]-x[1])/x[0]:(x[0]+x[1])/2;
    expect(recomputed).toBe(item.oracle.answer.n/item.oracle.answer.d);
    expect(item.expected).toBe(String(recomputed));
    expect(item.explanation).toContain(item.expected);
    expect(item.formula).toContain(item.expected);
   }
  }
  expect(ids.size).toBe(270);
 });
 it("cada subtema tiene tres operaciones cognitivas y consignas sustancialmente diferentes",()=>{
  for(const subtopic of subtopics){
   const examples=MATH_LEVELS.map(l=>mathPool("Álgebra",subtopic,l,"quiz")[0]);
   expect(new Set(examples.map(x=>x.operation)).size).toBe(3);
   expect(new Set(examples.map(x=>x.prompt)).size).toBe(3);
   expect(examples.map(x=>x.cognitiveStage)).toEqual([1,2,3]);
  }
 });
 it("ecuaciones: aumentar lado derecho y cambiar simultáneamente coeficiente y constante",()=>{
  const initial=[3,5,26],original=corePedagogy("Ecuaciones","principiante",initial)!;
  const mid=corePedagogy("Ecuaciones","intermedio",initial)!;
  const adv=corePedagogy("Ecuaciones","avanzado",initial)!;
  expect(original.result.n).toBe(7);
  expect(mid.result.n).toBe(10);
  expect(adv.result.n).toBe(-5);
  expect(mid.inputs).toEqual([3,5,35]);
  expect(adv.inputs).toEqual([-3,11,26]);
  expect(mid.intermediate.n).toBe(30);
  expect(adv.intermediate.n).toBe(15);
  expect(corePedagogy("Ecuaciones","intermedio",[3,5,29])?.result.n).toBe(11);
 });
 it("sistemas: invertir una restricción y modificar simultáneamente ambas",()=>{
  const original=[15,5];
  expect(corePedagogy("Sistemas de ecuaciones","principiante",original)?.result.n).toBe(10);
  expect(corePedagogy("Sistemas de ecuaciones","intermedio",original)?.result.n).toBe(5);
  expect(corePedagogy("Sistemas de ecuaciones","avanzado",original)?.result.n).toBe(11);
  expect(corePedagogy("Sistemas de ecuaciones","avanzado",original)?.inputs).toEqual([19,3]);
 });
 it("clasificar evalúa validez del razonamiento, no tres números casi idénticos",()=>{
  const item=mathModel("Álgebra","Ecuaciones","avanzado","clasificar",2);
  const received=vi.fn();render(<MathExerciseCard item={item} onResult={received} onNext={vi.fn()} isLast={false}/>);
  expect(item.assertions.some(c=>c.text.includes("procedimiento válido"))).toBe(true);
  for(const a of item.assertions)fireEvent.click(screen.getByRole("button",{name:a.truth?"Verdadero":"Falso"}));
  expect(received).toHaveBeenCalledWith(true,expect.any(String));
 });
 it("construir evalúa resultado intermedio antes de la raíz",()=>{
  const item=mathModel("Álgebra","Sistemas de ecuaciones","intermedio","construir",1);
  const received=vi.fn();render(<MathExerciseCard item={item} onResult={received} onNext={vi.fn()} isLast={false}/>);
  expect(item.steps[0].label).toMatch(/suma las dos ecuaciones/i);
  for(const step of item.steps)fireEvent.click(screen.getByRole("button",{name:step.choices[step.answerIndex]}));
  expect(received).toHaveBeenCalledWith(true,expect.any(String));
 });
});
