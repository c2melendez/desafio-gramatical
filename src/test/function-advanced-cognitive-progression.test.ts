import {describe,it,expect} from "vitest";
import {LEVELS} from "@/lib/grammar";
import {EXTENDED_SKILLS,extendedPool,extendedOracle,type QuadraticGraph,type JumpGraph} from "@/lib/function-graph-advanced";
import {advancedFunctionChallenge} from "@/lib/function-advanced-cognitive-challenges";

describe("M1 Funciones II — progresión cognitiva evaluable",()=>{
 it("ocho destrezas requieren tres operaciones y consignas diferentes",()=>{
  for(const skill of EXTENDED_SKILLS){
   const tasks=LEVELS.map(level=>extendedPool(level).find(t=>t.skill===skill)!);
   expect(tasks.map(t=>t.cognitiveStage)).toEqual([1,2,3]);
   expect(new Set(tasks.map(t=>t.operation)).size).toBe(3);
   expect(new Set(tasks.map(t=>t.prompt)).size).toBe(3);
   expect(tasks[0].requiredEvidence.length).toBeLessThan(tasks[1].requiredEvidence.length);
   expect(tasks[1].requiredEvidence.length).toBeLessThan(tasks[2].requiredEvidence.length);
  }
 });
 it("exactitud de transformaciones de parábolas",()=>{
  const q:QuadraticGraph={kind:"quadratic",h:1,a:1,k:-4,radius:3};
  expect(advancedFunctionChallenge(q,"vertex","intermedio")?.answer).toBe("(3, -4)");
  expect(advancedFunctionChallenge(q,"vertex","avanzado")?.answer).toBe("(3, 7)");
  expect(advancedFunctionChallenge(q,"quadratic-range","intermedio")?.answer).toBe("[-2, 7]");
  expect(advancedFunctionChallenge(q,"quadratic-range","avanzado")?.answer).toBe("[-7, 11]");
  expect(advancedFunctionChallenge(q,"quadratic-roots","intermedio")?.answer).toBe("(1, 0) y (5, 0)");
  expect(advancedFunctionChallenge(q,"quadratic-roots","avanzado")?.answer).toBe("(0.5, 0) y (2.5, 0)");
  expect(advancedFunctionChallenge(q,"quadratic-growth","intermedio")?.answer).toBe("[3, 6]");
  expect(advancedFunctionChallenge(q,"quadratic-growth","avanzado")?.answer).toBe("[-0.5, 1]");
 });
 it("valor, límite, reparación de salto y amplitud frente a transformación",()=>{
  const jump:JumpGraph={kind:"jump",leftIntercept:3,rightIntercept:-3,leftOpen:true,rightClosed:true};
  expect(advancedFunctionChallenge(jump,"jump-value","intermedio")?.answer).toBe("-1");
  expect(advancedFunctionChallenge(jump,"jump-value","avanzado")?.answer).toBe("9");
  expect(advancedFunctionChallenge(jump,"jump-left-limit","intermedio")?.answer).toBe("5");
  expect(advancedFunctionChallenge(jump,"jump-left-limit","avanzado")?.answer).toBe("-3");
  expect(advancedFunctionChallenge(jump,"jump-continuity","intermedio")?.answer).toBe("6");
  expect(advancedFunctionChallenge(jump,"jump-continuity","avanzado")?.answer).toBe("9");
  expect(advancedFunctionChallenge(jump,"jump-range","intermedio")?.answer).toBe("6");
  expect(advancedFunctionChallenge(jump,"jump-range","avanzado")?.answer).toBe("6");
  // A nontrivial case where moving the branch changes the span.
  const other:JumpGraph={kind:"jump",leftIntercept:2,rightIntercept:-3,leftOpen:true,rightClosed:true};
  expect(advancedFunctionChallenge(other,"jump-range","avanzado")?.answer).toBe("7");
 });
 it("288 items preserve IDs, uniqueness and full answer validation",()=>{
  const ids=new Set<string>();
  for(const level of LEVELS)for(const task of extendedPool(level)){
   expect(ids.has(task.id)).toBe(false);ids.add(task.id);
   expect(task.options).toHaveLength(4);
   expect(new Set(task.options).size).toBe(4);
   expect(task.options[task.answerIndex]).toBe(task.answer);
   expect(task.explanation).toContain(task.answer);
   expect(task.answer).toBe(advancedFunctionChallenge(task.graph,task.skill,level)?.answer??extendedOracle(task.graph,task.skill));
  }
  expect(ids.size).toBe(288);
 });
});
