import {describe,it,expect} from "vitest";
import {MAIN_IDEA_CHOICE_CASES} from "@/lib/main-idea-choice-cases";
import {MAIN_IDEA_DETECTIVE_CASES} from "@/lib/main-idea-detective-cases";
import {MAIN_IDEA_RECONSTRUCT_CASES} from "@/lib/main-idea-reconstruct-cases";
import {READING_BANK,READING_SUBTOPICS,readingPool,readingItems} from "@/lib/reading";
import {countContent,coverageTotals,CONTENT_STAGE_ONE} from "@/lib/coverage";
import {recordRotation,emptyRotation,selectRotation,rotationKey} from "@/lib/rotation";

describe("Fase A: núcleo Idea principal con textos originales",()=>{
 it("contiene 36 lecturas distintas, exclusivas de selección, por nivel 7/12/17",()=>{
  expect(MAIN_IDEA_CHOICE_CASES).toHaveLength(36);
  expect(new Set(MAIN_IDEA_CHOICE_CASES.map(q=>q.id)).size).toBe(36);
  expect(new Set(MAIN_IDEA_CHOICE_CASES.map(q=>q.passage)).size).toBe(36);
  for(const [level,added,goal] of [["principiante",7,10],["intermedio",12,15],["avanzado",17,20]] as const){
   expect(MAIN_IDEA_CHOICE_CASES.filter(x=>x.level===level)).toHaveLength(added);
   expect(readingPool(level,"Idea principal","quiz")).toHaveLength(goal);
   expect(countContent("espanol","Comprensión lectora","Idea principal","quiz",level)).toBe(goal);
   expect(CONTENT_STAGE_ONE[level]).toBe(goal);
   expect(readingItems(level,"Idea principal","quiz")).toHaveLength(10);
   expect(readingPool(level,"Idea principal","clasificar")).toHaveLength(goal);
   expect(readingPool(level,"Idea principal","construir")).toHaveLength(goal);
  }
  expect(READING_BANK).toHaveLength(63);
  expect(coverageTotals().stageOneComplete).toBeGreaterThanOrEqual(54);
 });
 it("los dos bancos nuevos no reutilizan textos y tienen clasificación y secuencias válidas",()=>{
   for(const bank of [MAIN_IDEA_DETECTIVE_CASES,MAIN_IDEA_RECONSTRUCT_CASES]){
    expect(bank).toHaveLength(36);
    expect(new Set(bank.map(q=>q.id)).size).toBe(36);
    expect(new Set(bank.map(q=>q.passage)).size).toBe(36);
    for(const [level,amount] of [["principiante",7],["intermedio",12],["avanzado",17]] as const)
     expect(bank.filter(x=>x.level===level)).toHaveLength(amount);
   }
   const passages=[...MAIN_IDEA_CHOICE_CASES,...MAIN_IDEA_DETECTIVE_CASES,...MAIN_IDEA_RECONSTRUCT_CASES].map(x=>x.passage);
   expect(new Set(passages).size).toBe(108);
   for(const q of MAIN_IDEA_DETECTIVE_CASES){
    expect(q.claims).toHaveLength(3);
    expect(new Set(q.claims.map(c=>c.tag))).toEqual(new Set(["explicit","inference","unsupported"]));
    expect(new Set(q.claims.map(c=>c.text)).size).toBe(3);
   }
   for(const q of MAIN_IDEA_RECONSTRUCT_CASES){
    expect(q.order.parts).toHaveLength(3);
    expect(new Set(q.order.parts).size).toBe(3);
    expect(q.order.explanation.length).toBeGreaterThan(45);
   }
   for(const level of ["principiante","intermedio","avanzado"] as const)
    for(const mode of ["clasificar","quiz","construir"] as const){
     expect(readingItems(level,"Idea principal",mode)).toHaveLength(10);
    }
 });
 it("todas las preguntas tienen texto, clave y cuatro distractores estructuralmente diferentes",()=>{
  for(const q of MAIN_IDEA_CHOICE_CASES){
   expect(q.passage.length).toBeGreaterThanOrEqual(240);
   expect(q.options).toHaveLength(4);
   expect(new Set(q.options).size).toBe(4);
   expect(q.answer).toBeGreaterThanOrEqual(0);
   expect(q.answer).toBeLessThan(4);
   expect(q.explanation.length).toBeGreaterThan(45);
   expect(q.reviewStatus).toBe("editorial-draft");
  }
 });
 it("la rotación es independiente en cada juego y prioriza lecturas aún no vistas",()=>{
  expect(rotationKey("espanol","Comprensión lectora","Idea principal","quiz","principiante"))
   .not.toBe(rotationKey("espanol","Comprensión lectora","Idea principal","construir","principiante"));
  const pool=readingPool("avanzado","Idea principal","quiz");
  let state=emptyRotation();
  const first=selectRotation(pool,state,10,()=>0.3);
  for(const q of first)state=recordRotation(state,q.id,true);
  const second=selectRotation(pool,state,10,()=>0.3);
  expect(second.every(q=>!state.seen.includes(q.id))).toBe(true);
  expect(new Set([...first,...second].map(q=>q.id)).size).toBe(20);
 });
 it("la lista de subtemas pendientes de lectura está vacía",()=>{
  for(const subtopic of READING_SUBTOPICS)
   for(const level of ["principiante","intermedio","avanzado"] as const)
    for(const mode of ["clasificar","quiz","construir"] as const)
     expect(readingPool(level,subtopic,mode)).toHaveLength(({principiante:10,intermedio:15,avanzado:20} as const)[level]);
 });
});
