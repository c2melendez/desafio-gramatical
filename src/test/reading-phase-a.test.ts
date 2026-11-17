import {describe,it,expect} from "vitest";
import {MAIN_IDEA_CHOICE_CASES} from "@/lib/main-idea-choice-cases";
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
   expect(readingPool(level,"Idea principal","clasificar")).toHaveLength(3);
   expect(readingPool(level,"Idea principal","construir")).toHaveLength(3);
  }
  expect(READING_BANK).toHaveLength(63);
  expect(coverageTotals().stageOneComplete).toBeGreaterThanOrEqual(48);
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
 it("los otros seis subtemas de lectura conservan sus nueve textos previos",()=>{
  for(const subtopic of READING_SUBTOPICS.filter(s=>s!=="Idea principal"))
   for(const level of ["principiante","intermedio","avanzado"] as const)
    for(const mode of ["clasificar","quiz","construir"] as const)
     expect(readingPool(level,subtopic,mode)).toHaveLength(3);
 });
});
