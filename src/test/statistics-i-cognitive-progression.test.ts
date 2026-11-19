import {describe,it,expect} from "vitest";
import {LEVELS} from "@/lib/grammar";
import {statsPool,STATS_SKILLS,statsOracle,type BarStimulus,type LineStimulus,type FrequencyStimulus,type SampleStimulus} from "@/lib/statistics-visual-lab";
import {statisticsCognitiveChallenge} from "@/lib/statistics-i-cognitive-challenges";

describe("M1 Estadística I — progresión conceptual verificable",()=>{
 it("las seis destrezas exigen tres operaciones y consignas diferentes",()=>{
  for(const skill of STATS_SKILLS){
   const tasks=LEVELS.map(level=>statsPool(level).find(t=>t.skill===skill)!);
   expect(tasks.map(t=>t.cognitiveStage)).toEqual([1,2,3]);
   expect(new Set(tasks.map(t=>t.operation)).size).toBe(3);
   expect(new Set(tasks.map(t=>t.prompt)).size).toBe(3);
   expect(tasks[0].requiredEvidence.length).toBeLessThan(tasks[1].requiredEvidence.length);
   expect(tasks[1].requiredEvidence.length).toBeLessThan(tasks[2].requiredEvidence.length);
  }
 });
 it("barras y líneas: se razona sobre cambios comparativos y condiciones nuevas",()=>{
  const b:BarStimulus={kind:"bars",labels:["Lunes","Martes","Miércoles","Jueves"],values:[8,13,10,17],unit:"libros"};
  const l:LineStimulus={kind:"line",labels:["Enero","Febrero","Marzo","Abril"],values:[12,17,23,21],unit:"unidades"};
  expect(statisticsCognitiveChallenge(b,"bar-difference","intermedio")?.answer).toBe("2 libros");
  expect(statisticsCognitiveChallenge(b,"bar-difference","avanzado")?.answer).toBe("-7 libros");
  expect(statisticsCognitiveChallenge(l,"line-change","intermedio")?.answer).toBe("9 unidades");
  expect(statisticsCognitiveChallenge(l,"line-change","avanzado")?.answer).toBe("-1 unidades");
  expect(statisticsCognitiveChallenge({...b,values:[8,14,10,17]},"bar-difference","intermedio")?.answer).not.toBe("2 libros");
 });
 it("frecuencias: modo, rango y mediana después de transformaciones",()=>{
  const f:FrequencyStimulus={kind:"frequency",values:[2,4,6,8],frequencies:[2,5,3,1],unit:"puntos"};
  expect(statisticsCognitiveChallenge(f,"frequency-mode","intermedio")?.answer).toBe("2 observaciones");
  expect(statisticsCognitiveChallenge(f,"frequency-mode","avanzado")?.answer).toBe("3 observaciones");
  expect(statisticsCognitiveChallenge(f,"frequency-range","intermedio")?.answer).toBe("4 puntos");
  expect(statisticsCognitiveChallenge(f,"frequency-range","avanzado")?.answer).toBe("5 puntos");
  expect(statisticsCognitiveChallenge(f,"frequency-median","intermedio")?.answer).toBe("4 puntos");
  expect(statisticsCognitiveChallenge(f,"frequency-median","avanzado")?.answer).toBe("6 puntos");
 });
 it("espacio muestral: complementaria y condicional sin reemplazo",()=>{
  const s:SampleStimulus={kind:"sample",colors:["rojo","azul","rojo","azul","azul","azul","rojo","azul"],unit:"fichas"};
  expect(statisticsCognitiveChallenge(s,"sample-probability","intermedio")?.answer).toBe("5/8");
  expect(statisticsCognitiveChallenge(s,"sample-probability","avanzado")?.answer).toBe("2/7");
  const changed:SampleStimulus={...s,colors:["rojo","rojo","rojo","rojo","azul","azul","azul","azul"]};
  expect(statisticsCognitiveChallenge(changed,"sample-probability","avanzado")?.answer).toBe("3/7");
 });
 it("preserva 216 IDs, cuatro opciones únicas, oráculos y distractores racionalmente distintos",()=>{
  const ids=new Set<string>();
  for(const level of LEVELS)for(const t of statsPool(level)){
   expect(ids.has(t.id)).toBe(false);ids.add(t.id);
   expect(t.options).toHaveLength(4);
   expect(new Set(t.options).size).toBe(4);
   expect(t.options[t.answerIndex]).toBe(t.answer);
   expect(t.explanation).toContain(t.answer);
   expect(t.answer).toBe(statisticsCognitiveChallenge(t.stimulus,t.skill,level)?.answer??statsOracle(t.stimulus,t.skill));
   if(t.stimulus.kind==="sample"){
    const [a,b]=t.answer.split("/").map(Number);
    for(const alternative of t.options.filter(x=>x!==t.answer)){
     const [c,d]=alternative.split("/").map(Number);
     expect(a*d).not.toBe(c*b);
    }
   }
  }
  expect(ids.size).toBe(216);
 });
});
