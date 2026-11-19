import {afterEach,describe,expect,it,vi} from "vitest";
import {cleanup,fireEvent,render,screen} from "@testing-library/react";
import {mathPool,MATH_MODES,MATH_LEVELS,mathModel} from "@/lib/math-m1";
import {nextAlgebraPedagogy,NEXT_ALGEBRA_SUBTOPICS} from "@/lib/math-m1-core-algebra-next";
import {MathExerciseCard} from "@/components/games/MathExerciseCard";
import {visualAnswer,visualDescription} from "@/lib/math-visual";
afterEach(()=>{cleanup();vi.restoreAllMocks();});

describe("M1 — 540 actividades del segundo bloque de Álgebra",()=>{
 it("cuatro subtemas × tres juegos × tres niveles conservan 540 IDs y oráculos numéricos reproducibles",()=>{
  const seen=new Set<string>();
  for(const subtopic of NEXT_ALGEBRA_SUBTOPICS)for(const mode of MATH_MODES)for(const level of MATH_LEVELS){
   const tasks=mathPool("Álgebra",subtopic,level,mode);
   for(const t of tasks){
    expect(seen.has(t.id)).toBe(false);seen.add(t.id);
    expect(t.cognitiveStage).toBe(level==="principiante"?1:level==="intermedio"?2:3);
    expect(t.requiredEvidence).toHaveLength(level==="principiante"?2:level==="intermedio"?3:4);
    expect(t.modeOperation).toBe(mode==="clasificar"?"evaluar-validez-de-inferencias":mode==="quiz"?"resolver-transformacion-algebraica":"construir-evidencia-y-resultado");
    const [a,b,c]=t.oracle.inputs;
    const independent=subtopic==="Ecuaciones cuadráticas"?(a+Math.sqrt(a*a-4*b))/2:
      subtopic==="Inecuaciones"?(c-b)/a: a*c+b;
    expect(independent).toBe(t.oracle.answer.n/t.oracle.answer.d);
    expect(Number(t.expected)).toBe(independent);
    expect(new Set(t.options).size).toBe(4);
    expect(t.options[t.answerIndex]).toBe(t.expected);
    expect(t.assertions).toHaveLength(3);
    expect(t.assertions.filter(x=>x.truth)).toHaveLength(1);
    expect(new Set(t.assertions.map(x=>x.text)).size).toBe(3);
    expect(t.steps).toHaveLength(2);
    expect(t.explanation).toContain(t.expected);
    if(t.visual){
     expect(visualAnswer(t.visual)).toBe(independent);
     expect(visualDescription(t.visual)).toContain(t.visual.kind==="number-line"?"círculo abierto":"recta");
    }
   }
  }
  expect(seen.size).toBe(540);
 });
 it("cada subtema presenta operaciones y preguntas diferentes en los tres niveles",()=>{
  for(const subtopic of NEXT_ALGEBRA_SUBTOPICS){
   const examples=MATH_LEVELS.map(level=>mathPool("Álgebra",subtopic,level,"quiz")[0]);
   expect(examples.map(t=>t.cognitiveStage)).toEqual([1,2,3]);
   expect(new Set(examples.map(t=>t.operation)).size).toBe(3);
   expect(new Set(examples.map(t=>t.prompt)).size).toBe(3);
  }
 });
 it("cuadráticas: desplazar y después componer escala horizontal con traslado",()=>{
  const inputs=[9,14]; // raíces 2 y 7
  expect(nextAlgebraPedagogy("Ecuaciones cuadráticas","principiante",inputs)?.result.n).toBe(7);
  expect(nextAlgebraPedagogy("Ecuaciones cuadráticas","intermedio",inputs)?.result.n).toBe(9);
  expect(nextAlgebraPedagogy("Ecuaciones cuadráticas","intermedio",inputs)?.inputs).toEqual([13,36]);
  expect(nextAlgebraPedagogy("Ecuaciones cuadráticas","avanzado",inputs)?.result.n).toBe(15);
  expect(nextAlgebraPedagogy("Ecuaciones cuadráticas","avanzado",inputs)?.inputs).toEqual([20,75]);
 });
 it("inecuaciones: desplazar frontera y dividir por negativo invierte el signo",()=>{
  const inputs=[3,4,25]; // x>7
  expect(nextAlgebraPedagogy("Inecuaciones","principiante",inputs)?.result.n).toBe(7);
  expect(nextAlgebraPedagogy("Inecuaciones","intermedio",inputs)?.result.n).toBe(9);
  const advanced=nextAlgebraPedagogy("Inecuaciones","avanzado",inputs)!;
  expect(advanced.result.n).toBe(-5);
  expect(advanced.inputs).toEqual([-3,10,25]);
  expect(advanced.prompt).toContain("x <");
  const t=mathModel("Álgebra","Inecuaciones","avanzado","construir",0);
  expect(t.visual?.kind).toBe("number-line");
  if(t.visual?.kind!=="number-line")throw Error("Estímulo inválido");
  expect(t.visual.direction).toBe("right"); // original, NOT transformed
  expect(t.visual.operation).toBe("reflect");
  expect(t.steps[0].choices[t.steps[0].answerIndex]).toBe(String(t.visual.boundary));
  expect(t.steps[1].choices[t.steps[1].answerIndex]).toBe("x < "+t.expected);
 });
 it("funciones: la recta dibuja f original y la clave corresponde a g",()=>{
  const inputs=[3,5,4];
  expect(nextAlgebraPedagogy("Funciones","principiante",inputs)?.result.n).toBe(17);
  expect(nextAlgebraPedagogy("Funciones","intermedio",inputs)?.result.n).toBe(23);
  expect(nextAlgebraPedagogy("Funciones","avanzado",inputs)?.result.n).toBe(26);
  for(const level of MATH_LEVELS){
   const t=mathModel("Álgebra","Funciones",level,"quiz",0);
   if(t.visual?.kind!=="linear-function")throw Error("Falta gráfica");
   expect(t.visual.slope).not.toBe(0);
   expect(visualAnswer(t.visual)).toBe(Number(t.expected));
   const transformed={...t.visual,slope:t.visual.slope+1};
   expect(visualAnswer(transformed)).not.toBe(Number(t.expected));
  }
 });
 it("patrones: el nivel avanzado suma términos con índices diferentes",()=>{
  const inputs=[4,3,6];
  expect(nextAlgebraPedagogy("Patrones algebraicos","principiante",inputs)?.result.n).toBe(27);
  expect(nextAlgebraPedagogy("Patrones algebraicos","intermedio",inputs)?.result.n).toBe(35);
  const advanced=nextAlgebraPedagogy("Patrones algebraicos","avanzado",inputs)!;
  expect(advanced.result.n).toBe(58); // a8=35, a5=23
  expect(advanced.inputs).toEqual([8,10,6]);
 });
 it("clasificar evalúa afirmaciones conceptuales y construir exige dos decisiones",()=>{
  for(const subtopic of NEXT_ALGEBRA_SUBTOPICS){
   const classify=mathModel("Álgebra",subtopic,"avanzado","clasificar",1);
   const onClassify=vi.fn();
   render(<MathExerciseCard item={classify} onResult={onClassify} onNext={vi.fn()} isLast={false}/>);
   for(const item of classify.assertions)fireEvent.click(screen.getByRole("button",{name:item.truth?"Verdadero":"Falso"}));
   expect(onClassify).toHaveBeenCalledWith(true,expect.any(String));
   cleanup();
   const build=mathModel("Álgebra",subtopic,"intermedio","construir",1);
   const onBuild=vi.fn();
   render(<MathExerciseCard item={build} onResult={onBuild} onNext={vi.fn()} isLast={false}/>);
   for(const step of build.steps)fireEvent.click(screen.getByRole("button",{name:step.choices[step.answerIndex]}));
   expect(onBuild).toHaveBeenCalledWith(true,expect.any(String));
   cleanup();
  }
 });
});
