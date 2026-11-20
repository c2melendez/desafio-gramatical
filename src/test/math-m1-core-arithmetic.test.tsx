import {afterEach,describe,expect,it,vi} from "vitest";
import {cleanup,fireEvent,render,screen} from "@testing-library/react";
import {MATH_LEVELS,MATH_MODES,mathPool,mathModel} from "@/lib/math-m1";
import {ARITHMETIC_SUBTOPICS,arithmeticPedagogy} from "@/lib/math-m1-core-arithmetic";
import {MathExerciseCard} from "@/components/games/MathExerciseCard";
afterEach(()=>{cleanup();vi.restoreAllMocks()});
const gcd=(a:number,b:number):number=>{let x=Math.abs(a),y=Math.abs(b);while(y){const t=x%y;x=y;y=t}return x||1};
const fmt=(n:number,d=1):string=>{const g=gcd(n,d);return d/g===1?String(n/g):String(n/g)+"/"+String(d/g)};

describe("M1 aritmética: seis competencias, 810 IDs y tres operaciones cognitivas",()=>{
 it("810 registros con oráculo aritmético independiente y opciones no duplicadas",()=>{
  const seen=new Set<string>();
  for(const subtopic of ARITHMETIC_SUBTOPICS)for(const mode of MATH_MODES)for(const level of MATH_LEVELS){
   const items=mathPool("Aritmética",subtopic,level,mode);
   expect(items).toHaveLength(level==="principiante"?10:level==="intermedio"?15:20);
   for(const item of items){
    expect(seen.has(item.id)).toBe(false);seen.add(item.id);
    expect(item.cognitiveStage).toBe(level==="principiante"?1:level==="intermedio"?2:3);
    expect(item.requiredEvidence).toHaveLength(level==="principiante"?2:level==="intermedio"?3:4);
    expect(item.modeOperation).toBe(mode==="clasificar"?"evaluar-validez-de-inferencias":mode==="quiz"?"resolver-transformacion-algebraica":"construir-evidencia-y-resultado");
    const x=item.oracle.inputs;
    let n=0,d=1;
    if(subtopic==="Operaciones")n=(x[0]+x[1])*x[2];
    if(subtopic==="Fracciones"){n=x[0]*x[3]+x[2]*x[1];d=x[1]*x[3];}
    if(subtopic==="Porcentajes"){n=x[0]*x[1];d=100;}
    if(subtopic==="Proporciones"){n=x[1]*x[2];d=x[0];}
    if(subtopic==="Potencias")n=x[0]**x[1];
    if(subtopic==="MCD y MCM")n=x[2]===0?gcd(x[0],x[1]):x[0]*x[1]/gcd(x[0],x[1]);
    expect(item.expected).toBe(fmt(n,d));
    expect(item.expected).toBe(fmt(item.oracle.answer.n,item.oracle.answer.d));
    expect(item.options).toHaveLength(4);
    expect(new Set(item.options).size).toBe(4);
    expect(item.options[item.answerIndex]).toBe(item.expected);
    expect(item.assertions).toHaveLength(3);
    expect(item.assertions.filter(a=>a.truth)).toHaveLength(1);
    expect(new Set(item.assertions.map(a=>a.text)).size).toBe(3);
    expect(item.steps).toHaveLength(2);
    expect(item.steps[0].choices[item.steps[0].answerIndex]).toBe(fmt(item.oracle.intermediate.n,item.oracle.intermediate.d));
    expect(item.steps[1].choices[item.steps[1].answerIndex]).toBe(item.expected);
    expect(item.explanation).toContain(item.expected);
   }
  }
  expect(seen.size).toBe(810);
 });
 it("cada competencia tiene tres operaciones y tres consignas diferentes",()=>{
  for(const subtopic of ARITHMETIC_SUBTOPICS){
   const items=MATH_LEVELS.map(level=>mathPool("Aritmética",subtopic,level,"quiz")[0]);
   expect(items.map(x=>x.cognitiveStage)).toEqual([1,2,3]);
   expect(new Set(items.map(x=>x.operation)).size).toBe(3);
   expect(new Set(items.map(x=>x.prompt)).size).toBe(3);
  }
 });
 it("operaciones: dos cambios en paréntesis y cancelación distributiva",()=>{
  const input=[4,5,3];
  expect(arithmeticPedagogy("Operaciones","principiante",input)?.result.n).toBe(27);
  expect(arithmeticPedagogy("Operaciones","intermedio",input)?.result.n).toBe(22);
  expect(arithmeticPedagogy("Operaciones","avanzado",input)?.result.n).toBe(15);
  expect(arithmeticPedagogy("Operaciones","avanzado",input)?.inputs).toEqual([0,5,3]);
 });
 it("fracciones: inversión de suma y combinación de signos conservando equivalencia",()=>{
  const input=[1,4,2,3];
  expect(arithmeticPedagogy("Fracciones","principiante",input)?.result).toEqual({n:11,d:12});
  expect(arithmeticPedagogy("Fracciones","intermedio",input)?.result).toEqual({n:1,d:4});
  expect(arithmeticPedagogy("Fracciones","avanzado",input)?.result).toEqual({n:1,d:12});
 });
 it("porcentajes: descuento simple y descuentos sucesivos con denominadores distintos",()=>{
  const input=[200,20];
  expect(arithmeticPedagogy("Porcentajes","principiante",input)?.result.n).toBe(40);
  expect(arithmeticPedagogy("Porcentajes","intermedio",input)?.result.n).toBe(160);
  expect(arithmeticPedagogy("Porcentajes","avanzado",input)?.result.n).toBe(144);
  expect(arithmeticPedagogy("Porcentajes","avanzado",input)?.inputs).toEqual([160,90]);
 });
 it("proporcionalidad: ajustar unidades por regalo y descuento aplicado a doble cantidad",()=>{
  const input=[4,40,7];
  expect(arithmeticPedagogy("Proporciones","principiante",input)?.result.n).toBe(70);
  expect(arithmeticPedagogy("Proporciones","intermedio",input)?.result.n).toBe(60);
  expect(arithmeticPedagogy("Proporciones","avanzado",input)?.result.n).toBe(126);
 });
 it("potencias: sumas de exponentes y combinación de potencia y cociente",()=>{
  const input=[3,3];
  expect(arithmeticPedagogy("Potencias","principiante",input)?.result.n).toBe(27);
  expect(arithmeticPedagogy("Potencias","intermedio",input)?.result.n).toBe(243);
  expect(arithmeticPedagogy("Potencias","avanzado",input)?.result.n).toBe(27);
  expect(arithmeticPedagogy("Potencias","avanzado",input)?.inputs).toEqual([3,3]);
 });
 it("MCD/MCM: cambio de objetivo y escalamiento de ambos valores",()=>{
  const input=[12,18,0];
  expect(arithmeticPedagogy("MCD y MCM","principiante",input)?.result.n).toBe(6);
  expect(arithmeticPedagogy("MCD y MCM","intermedio",input)?.result.n).toBe(36);
  expect(arithmeticPedagogy("MCD y MCM","avanzado",input)?.result.n).toBe(72);
  expect(arithmeticPedagogy("MCD y MCM","avanzado",input)?.inputs).toEqual([24,36,1]);
 });
 it("Clasificar valida procedimientos; Construir exige paso intermedio causal",()=>{
  for(const subtopic of ARITHMETIC_SUBTOPICS){
   const c=mathModel("Aritmética",subtopic,"avanzado","clasificar",1);
   const onClass=vi.fn();render(<MathExerciseCard item={c} onResult={onClass} onNext={vi.fn()} isLast={false}/>);
   for(const a of c.assertions)fireEvent.click(screen.getByRole("button",{name:a.truth?"Verdadero":"Falso"}));
   expect(onClass).toHaveBeenCalledWith(true,expect.any(String));cleanup();
   const b=mathModel("Aritmética",subtopic,"intermedio","construir",1);
   const onBuild=vi.fn();render(<MathExerciseCard item={b} onResult={onBuild} onNext={vi.fn()} isLast={false}/>);
   for(const step of b.steps)fireEvent.click(screen.getByRole("button",{name:step.choices[step.answerIndex]}));
   expect(onBuild).toHaveBeenCalledWith(true,expect.any(String));cleanup();
  }
 });
});
