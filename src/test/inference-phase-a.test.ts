import {describe,expect,it} from "vitest";
import {INFERENCE_DETECTIVE_CASES} from "@/lib/inference-detective-cases";
import {INFERENCE_CHOICE_CASES} from "@/lib/inference-choice-cases";
import {INFERENCE_RECONSTRUCT_CASES} from "@/lib/inference-reconstruct-cases";
import {READING_SUBTOPICS,readingItems,readingPool} from "@/lib/reading";
import {countContent,coverageTotals} from "@/lib/coverage";
import {emptyRotation,recordRotation,rotationKey,selectRotation} from "@/lib/rotation";

describe("Fase A — Inferencias: contenido y progresión",()=>{
 it("tiene 108 pasajes únicos y 36 por cada juego, distribuidos 7/12/17",()=>{
  const banks=[INFERENCE_DETECTIVE_CASES,INFERENCE_CHOICE_CASES,INFERENCE_RECONSTRUCT_CASES];
  for(const bank of banks){
   expect(bank).toHaveLength(36);
   expect(new Set(bank.map(x=>x.id)).size).toBe(36);
   for(const [level,amount] of [["principiante",7],["intermedio",12],["avanzado",17]] as const)
    expect(bank.filter(x=>x.level===level)).toHaveLength(amount);
  }
  const texts=banks.flatMap(bank=>bank.map(x=>x.passage));
  expect(new Set(texts).size).toBe(108);
  expect(texts.every(p=>p.length>=145)).toBe(true);
 });
 it("suma los nueve ejercicios anteriores sin adjudicar contenido a otros subtemas",()=>{
  for(const [level,count] of [["principiante",10],["intermedio",15],["avanzado",20]] as const)
   for(const mode of ["clasificar","quiz","construir"] as const){
    expect(readingPool(level,"Inferencias",mode)).toHaveLength(count);
    expect(readingItems(level,"Inferencias",mode)).toHaveLength(10);
    expect(countContent("espanol","Comprensión lectora","Inferencias",mode,level)).toBe(count);
   }
  for(const subtopic of READING_SUBTOPICS)
   for(const level of ["principiante","intermedio","avanzado"] as const)
    for(const mode of ["clasificar","quiz","construir"] as const)
     expect(readingPool(level,subtopic,mode)).toHaveLength(({principiante:10,intermedio:15,avanzado:20} as const)[level]);
  expect(coverageTotals().stageOneComplete).toBeGreaterThanOrEqual(63);
 });
 it("valida las tres categorías, las opciones y las secuencias",()=>{
  for(const q of INFERENCE_DETECTIVE_CASES){
   expect(q.claims.map(x=>x.tag).sort()).toEqual(["explicit","inference","unsupported"]);
   expect(new Set(q.claims.map(x=>x.text)).size).toBe(3);
  }
  for(const q of INFERENCE_CHOICE_CASES){
   expect(q.options).toHaveLength(4);
   expect(new Set(q.options).size).toBe(4);
   expect(q.options[q.answer]).toBeTruthy();
   expect(q.explanation.length).toBeGreaterThan(45);
  }
  for(const q of INFERENCE_RECONSTRUCT_CASES){
   expect(q.order.parts).toHaveLength(3);
   expect(new Set(q.order.parts).size).toBe(3);
   expect(q.order.explanation.length).toBeGreaterThan(45);
  }
 });
 it("rota sin repetir en dos sesiones avanzadas sucesivas",()=>{
  const pool=readingPool("avanzado","Inferencias","quiz");
  const first=selectRotation(pool,emptyRotation(),10,()=>0.2);
  let rotation=emptyRotation();
  for(const q of first)rotation=recordRotation(rotation,q.id,true);
  const second=selectRotation(pool,rotation,10,()=>0.2);
  expect(second).toHaveLength(10);
  expect(new Set([...first,...second].map(x=>x.id)).size).toBe(20);
  expect(rotationKey("espanol","Comprensión lectora","Inferencias","quiz","avanzado"))
   .not.toEqual(rotationKey("espanol","Comprensión lectora","Idea principal","quiz","avanzado"));
 });
});