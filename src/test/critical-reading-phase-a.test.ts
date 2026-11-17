import {describe,expect,it} from "vitest";
import {CRITICAL_DETECTIVE_CASES} from "@/lib/critical-detective-cases";
import {CRITICAL_CHOICE_CASES} from "@/lib/critical-choice-cases";
import {CRITICAL_RECONSTRUCT_CASES} from "@/lib/critical-reconstruct-cases";
import {READING_SUBTOPICS,readingItems,readingPool} from "@/lib/reading";
import {countContent,coverageTotals} from "@/lib/coverage";
import {emptyRotation,recordRotation,selectRotation,rotationKey} from "@/lib/rotation";
describe("Fase A: Lectura crítica",()=>{
 it("contiene 108 lecturas independientes repartidas en tres juegos",()=>{
  const banks=[CRITICAL_DETECTIVE_CASES,CRITICAL_CHOICE_CASES,CRITICAL_RECONSTRUCT_CASES];
  for(const bank of banks){
   expect(bank).toHaveLength(36);
   expect(new Set(bank.map(q=>q.id)).size).toBe(36);
   for(const [level,n] of [["principiante",7],["intermedio",12],["avanzado",17]] as const)
    expect(bank.filter(q=>q.level===level)).toHaveLength(n);
  }
  const all=banks.flatMap(bank=>bank.map(q=>q.passage));
  expect(new Set(all).size).toBe(108);
  expect(all.every(p=>p.length>=145)).toBe(true);
 });
 it("alcanza 10/15/20 por modalidad sin inflar los otros subtemas",()=>{
  for(const [level,n] of [["principiante",10],["intermedio",15],["avanzado",20]] as const)
   for(const mode of ["clasificar","quiz","construir"] as const){
    expect(readingPool(level,"Lectura crítica",mode)).toHaveLength(n);
    expect(readingItems(level,"Lectura crítica",mode)).toHaveLength(10);
    expect(countContent("espanol","Comprensión lectora","Lectura crítica",mode,level)).toBe(n);
   }
  expect(coverageTotals().stageOneComplete).toBeGreaterThanOrEqual(72);
  for(const topic of READING_SUBTOPICS.filter(t=>!["Idea principal","Inferencias","Lectura crítica","Vocabulario en contexto","Análisis de textos","Lectura comparada","Lenguaje figurado"].includes(t)))
   for(const level of ["principiante","intermedio","avanzado"] as const)
    for(const mode of ["clasificar","quiz","construir"] as const)
     expect(readingPool(level,topic,mode)).toHaveLength(3);
 });
 it("confirma claves, afirmaciones y secuencias justificadas",()=>{
  for(const item of CRITICAL_DETECTIVE_CASES){
   expect(item.claims).toHaveLength(3);
   expect(item.claims.map(c=>c.tag).sort()).toEqual(["explicit","inference","unsupported"]);
   expect(new Set(item.claims.map(c=>c.text)).size).toBe(3);
  }
  for(const item of CRITICAL_CHOICE_CASES){
   expect(item.options).toHaveLength(4);
   expect(new Set(item.options).size).toBe(4);
   expect(item.answer).toBeGreaterThanOrEqual(0);
   expect(item.answer).toBeLessThan(4);
   expect(item.explanation.length).toBeGreaterThanOrEqual(50);
  }
  for(const item of CRITICAL_RECONSTRUCT_CASES){
   expect(item.order.parts).toHaveLength(3);
   expect(new Set(item.order.parts).size).toBe(3);
   expect(item.order.explanation.length).toBeGreaterThanOrEqual(50);
  }
 });
 it("rota sin repeticiones en sesiones avanzadas sucesivas",()=>{
  const pool=readingPool("avanzado","Lectura crítica","quiz");
  const first=selectRotation(pool,emptyRotation(),10,()=>0.3);
  let state=emptyRotation();
  for(const item of first)state=recordRotation(state,item.id,true);
  const next=selectRotation(pool,state,10,()=>0.3);
  expect(new Set([...first,...next].map(x=>x.id)).size).toBe(20);
  expect(rotationKey("espanol","Comprensión lectora","Lectura crítica","quiz","avanzado"))
   .not.toEqual(rotationKey("espanol","Comprensión lectora","Inferencias","quiz","avanzado"));
 });
});