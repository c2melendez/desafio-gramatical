import {describe,it,expect} from "vitest";
import {LEVELS} from "@/lib/grammar";
import {GEOMETRY_SKILLS,geometryPool,geometryOracle,type ParallelFigure,type CompositeFigure} from "@/lib/geometry-visual-lab";
import {geometryCognitiveChallenge} from "@/lib/geometry-cognitive-challenges";
describe("M1 Geometría: progresión cognitiva por operación",()=>{
 it("cada habilidad requiere operaciones y consignas distintas en los tres niveles",()=>{
  for(const skill of GEOMETRY_SKILLS){
   const items=LEVELS.map(level=>geometryPool(level).find(q=>q.skill===skill)!);
   expect(items.map(q=>q.cognitiveStage)).toEqual([1,2,3]);
   expect(new Set(items.map(q=>q.operation)).size).toBe(3);
   expect(new Set(items.map(q=>q.prompt)).size).toBe(3);
   expect(items[0].requiredEvidence.length).toBeLessThan(items[1].requiredEvidence.length);
   expect(items[1].requiredEvidence.length).toBeLessThan(items[2].requiredEvidence.length);
  }
 });
 it("paralelismo: correspondencia, suplemento, bisectriz y comparación",()=>{
  const f:ParallelFigure={kind:"parallel",parallel:true,degrees:110};
  expect(geometryOracle(f,"corresponding")).toBe(110);
  expect(geometryOracle(f,"supplementary")).toBe(70);
  expect(geometryCognitiveChallenge(f,"corresponding","intermedio")?.answer).toBe("55°");
  expect(geometryCognitiveChallenge(f,"corresponding","avanzado")?.answer).toBe("75°");
  expect(geometryCognitiveChallenge(f,"supplementary","intermedio")?.answer).toBe("35°");
  expect(geometryCognitiveChallenge(f,"supplementary","avanzado")?.answer).toBe("75°");
  expect(geometryCognitiveChallenge({...f,degrees:100},"corresponding","intermedio")?.answer).not.toBe("55°");
 });
 it("figura compuesta: áreas y perímetros transformados sin sumar artificialmente el recorte al contorno",()=>{
  const f:CompositeFigure={kind:"composite",width:12,height:8,cutWidth:4,cutHeight:3};
  expect(geometryOracle(f,"composite-area")).toBe(84);
  expect(geometryOracle(f,"composite-perimeter")).toBe(40);
  expect(geometryCognitiveChallenge(f,"composite-area","intermedio")?.answer).toBe("336 cm²");
  expect(geometryCognitiveChallenge(f,"composite-area","avanzado")?.answer).toBe("106 cm²");
  expect(geometryCognitiveChallenge(f,"composite-perimeter","intermedio")?.answer).toBe("42 cm");
  expect(geometryCognitiveChallenge(f,"composite-perimeter","avanzado")?.answer).toBe("50 cm");
  expect(geometryCognitiveChallenge({...f,cutWidth:3},"composite-perimeter","avanzado")?.answer).toBe("50 cm");
  expect(geometryCognitiveChallenge({...f,cutWidth:3},"composite-area","avanzado")?.answer).not.toBe("106 cm²");
 });
 it("los 216 identificadores persisten; cada opción correcta es única y se explica",()=>{
  const ids=new Set<string>();
  for(const level of LEVELS)for(const item of geometryPool(level)){
   expect(ids.has(item.id)).toBe(false);ids.add(item.id);
   expect(item.options).toHaveLength(4);
   expect(new Set(item.options).size).toBe(4);
   expect(item.options[item.answerIndex]).toBe(item.answer);
   expect(item.explanation).toContain(item.answer);
   const challenge=geometryCognitiveChallenge(item.figure,item.skill,level);
   if(challenge)expect(item.answer).toBe(challenge.answer);
   else expect(item.answer).toBe(`${geometryOracle(item.figure,item.skill)}${item.figure.kind==="parallel"?"°":item.skill==="composite-area"?" cm²":" cm"}`);
  }
  expect(ids.size).toBe(216);
 });
});
