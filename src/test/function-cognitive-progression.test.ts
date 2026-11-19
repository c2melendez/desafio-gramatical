import {describe,it,expect} from "vitest";
import {LEVELS} from "@/lib/grammar";
import {graphPool,GRAPH_SKILLS,graphCorrectAnswer,type GraphData} from "@/lib/function-graph-lab";
import {functionChallenge} from "@/lib/function-cognitive-challenges";
describe("M1 funciones: dificultad por constructo, no por cifras",()=>{
 it("cada una de las seis destrezas presenta tres operaciones y tres consignas distintas",()=>{
  for(const skill of GRAPH_SKILLS){
   const tasks=LEVELS.map(level=>graphPool(level).find(t=>t.skill===skill)!);
   expect(tasks.map(t=>t.cognitiveStage)).toEqual([1,2,3]);
   expect(new Set(tasks.map(t=>t.operation)).size).toBe(3);
   expect(new Set(tasks.map(t=>t.prompt)).size).toBe(3);
   expect(tasks[0].requiredEvidence.length).toBeLessThan(tasks[1].requiredEvidence.length);
   expect(tasks[1].requiredEvidence.length).toBeLessThan(tasks[2].requiredEvidence.length);
  }
 });
 it("transformaciones compuestas cambian dominio, rango, monotonicidad y cruces matemáticamente",()=>{
  const g:GraphData={xs:[-4,0,4],ys:[2,0,4],closed:true};
  expect(functionChallenge(g,"domain","intermedio")?.answer).toBe("[-2, 6]");
  expect(functionChallenge(g,"domain","avanzado")?.answer).toBe("[-1, 3]");
  expect(functionChallenge(g,"range","intermedio")?.answer).toBe("[3, 7]");
  expect(functionChallenge(g,"range","avanzado")?.answer).toBe("[-5, 3]");
  expect(functionChallenge(g,"increasing","intermedio")?.answer).toBe("[2, 6]");
  expect(functionChallenge(g,"increasing","avanzado")?.answer).toBe("[-1, 1]");
  expect(functionChallenge(g,"y-intercept","intermedio")?.answer).toBe("(0, 3)");
  expect(functionChallenge(g,"y-intercept","avanzado")?.answer).toBe("(0, 4)");
  expect(functionChallenge(g,"x-intercept","intermedio")?.answer).toBe("(2, 0)");
  expect(functionChallenge(g,"x-intercept","avanzado")?.answer).toBe("(1, 0)");
 });
 it("los 216 reactivos conservan IDs y tienen cuatro opciones sin redundancias",()=>{
  const ids=new Set<string>();
  for(const level of LEVELS)for(const task of graphPool(level)){
   expect(ids.has(task.id)).toBe(false);ids.add(task.id);
   expect(task.options).toHaveLength(4);
   expect(new Set(task.options).size).toBe(4);
   expect(task.options[task.answerIndex]).toBe(task.answer);
   expect(task.explanation).toContain(task.answer);
   if(level==="principiante")expect(task.answer).toBe(graphCorrectAnswer(task.graph,task.skill));
   else expect(task.answer).toBe(functionChallenge(task.graph,task.skill,level)!.answer);
  }
  expect(ids.size).toBe(216);
 });
});
