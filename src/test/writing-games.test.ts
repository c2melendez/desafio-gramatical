import {describe,it,expect} from "vitest";
import {WRITING_BANK,WRITING_SUBTOPICS,ERROR_TYPES,writingItems,writingPool,checkWritingSequence} from "@/lib/writing";
import {LEVELS,type Mode} from "@/lib/grammar";
import {AREAS,availableModule,gameNames} from "@/lib/phuma-catalog";
describe("Redacción: tres juegos, cinco subtemas y tres dificultades",()=>{
 it("contiene 45 escenarios originales sin repetir IDs y tres rondas por subtema y dificultad",()=>{
  expect(WRITING_BANK).toHaveLength(45);
  expect(new Set(WRITING_BANK.map(x=>x.id)).size).toBe(45);
  expect(WRITING_SUBTOPICS).toHaveLength(5);
  for(const level of LEVELS)for(const topic of WRITING_SUBTOPICS){
   for(const mode of ["clasificar","quiz","construir"] as Mode[]){
    const rounds=writingItems(level,topic,mode);
    expect(rounds).toHaveLength(["Conectores","Corrección","Organización textual"].includes(topic)?10:3);
    expect(new Set(rounds.map(x=>x.id)).size).toBe(rounds.length);
   }
   expect(availableModule("espanol","Redacción",topic)).toBe(true);
  }
 });
 it("valida errores, cuatro conectores distintos y solución sin alternativas equivalentes",()=>{
  for(const q of WRITING_BANK){
   expect(q.flawed.length).toBeGreaterThan(25);
   expect(ERROR_TYPES).toContain(q.errorType);
   expect(q.correction.length).toBeGreaterThan(45);
   expect(q.gap).toContain("___");
   expect(q.options).toHaveLength(4);
   expect(new Set(q.options).size).toBe(4);
   expect(q.options.filter(x=>x===q.connector)).toHaveLength(1);
   expect(q.steps).toHaveLength(3);
   expect(new Set(q.steps).size).toBe(3);
   expect(checkWritingSequence(q.steps,[0,1,2])).toBe(true);
   expect(checkWritingSequence(q.steps,[2,1,0])).toBe(false);
   expect(checkWritingSequence(q.steps,[0,0,2])).toBe(false);
   expect(checkWritingSequence(q.steps,[0,1])).toBe(false);
  }
 });
 it("habilita Redacción sin modificar el funcionamiento de Categorías gramaticales o Comprensión",()=>{
  expect(gameNames("Redacción")).toEqual({clasificar:"Cazador de errores",quiz:"Conector correcto",construir:"Editor experto"});
  expect(availableModule("espanol","Gramática y semántica","Categorías gramaticales")).toBe(true);
  expect(availableModule("espanol","Comprensión lectora","Inferencias")).toBe(true);
  expect(availableModule("espanol","Literatura","Figuras retóricas")).toBe(false);
  const available=AREAS.flatMap(a=>a.topics.flatMap(t=>t.subtopics.map(s=>({a:a.id,t:t.name,s}))))
   .filter(x=>availableModule(x.a as "espanol",x.t,x.s));
  expect(available).toHaveLength(13);
 });
});
