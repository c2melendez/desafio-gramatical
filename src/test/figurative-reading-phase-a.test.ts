import {describe,expect,it} from "vitest";
import {FIGURATIVE_DETECTIVE_CASES,FIGURATIVE_CHOICE_CASES,FIGURATIVE_RECONSTRUCT_CASES} from "@/lib/reading-figurative-block";
import {READING_SUBTOPICS,readingItems,readingPool as m1SourceReadingPool} from "@/lib/reading";

const m1ReadingPool=(...args:Parameters<typeof m1SourceReadingPool>)=>m1SourceReadingPool(...args).filter(q=>!q.id.startsWith("m2-"));
import {coverageTotals,countContent} from "@/lib/coverage";
import {emptyRotation,recordRotation,rotationKey,selectRotation} from "@/lib/rotation";

describe("Fase A — Lenguaje figurado y cierre de Comprensión lectora",()=>{
 it("registra 108 lecturas originales y 36 casos distintos por juego",()=>{
  const banks=[FIGURATIVE_DETECTIVE_CASES,FIGURATIVE_CHOICE_CASES,FIGURATIVE_RECONSTRUCT_CASES];
  for(const bank of banks){
   expect(bank).toHaveLength(36);
   expect(new Set(bank.map(q=>q.id)).size).toBe(36);
   for(const [level,expected] of [["principiante",7],["intermedio",12],["avanzado",17]] as const)
    expect(bank.filter(q=>q.level===level)).toHaveLength(expected);
   expect(bank.every(q=>q.reviewStatus==="editorial-draft")).toBe(true);
  }
  const passages=banks.flatMap(bank=>bank.map(q=>q.passage));
  expect(new Set(passages).size).toBe(108);
  expect(passages.every(p=>p.length>=145)).toBe(true);
 });
 it("suma 10/15/20 por juego y marca los siete núcleos de lectura",()=>{
  for(const subtopic of READING_SUBTOPICS)
   for(const [level,expected] of [["principiante",10],["intermedio",15],["avanzado",20]] as const)
    for(const mode of ["clasificar","quiz","construir"] as const){
     expect(m1ReadingPool(level,subtopic,mode)).toHaveLength(expected);
     expect(readingItems(level,subtopic,mode)).toHaveLength(10);
     expect(countContent("espanol","Comprensión lectora",subtopic,mode,level)).toBeGreaterThanOrEqual(expected);
    }
  expect(coverageTotals().available).toBeGreaterThanOrEqual(1682);
  expect(coverageTotals().stageOneComplete).toBeGreaterThanOrEqual(108);
 });
 it("controla tres evidencias, una sola clave, cuatro opciones y secuencia válida",()=>{
  for(const q of FIGURATIVE_DETECTIVE_CASES){
   expect(q.claims).toHaveLength(3);
   expect(new Set(q.claims.map(x=>x.tag))).toEqual(new Set(["explicit","inference","unsupported"]));
   expect(new Set(q.claims.map(x=>x.text)).size).toBe(3);
  }
  for(const q of FIGURATIVE_CHOICE_CASES){
   expect(q.options).toHaveLength(4);
   expect(new Set(q.options).size).toBe(4);
   expect(q.answer).toBeGreaterThanOrEqual(0);
   expect(q.answer).toBeLessThan(4);
   expect(q.explanation.length).toBeGreaterThanOrEqual(45);
  }
  for(const q of FIGURATIVE_RECONSTRUCT_CASES){
   expect(q.order.parts).toHaveLength(3);
   expect(new Set(q.order.parts).size).toBe(3);
   expect(q.order.explanation.length).toBeGreaterThanOrEqual(45);
  }
 });
 it("dos sesiones avanzadas priorizan diez preguntas no vistas cada una",()=>{
  const pool=m1ReadingPool("avanzado","Lenguaje figurado","quiz");
  const first=selectRotation(pool,emptyRotation(),10,()=>0.25);
  let state=emptyRotation();
  for(const q of first)state=recordRotation(state,q.id,true);
  const second=selectRotation(pool,state,10,()=>0.25);
  expect(second).toHaveLength(10);
  expect(new Set([...first,...second].map(x=>x.id)).size).toBe(20);
  expect(rotationKey("espanol","Comprensión lectora","Lenguaje figurado","quiz","avanzado"))
   .not.toEqual(rotationKey("espanol","Comprensión lectora","Lectura crítica","quiz","avanzado"));
 });
});
