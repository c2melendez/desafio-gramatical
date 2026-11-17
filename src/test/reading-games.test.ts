import {describe,it,expect} from "vitest";
import {READING_BANK,READING_SUBTOPICS,EVIDENCE_LABEL,readingItems,readingPool,checkReadingOrder} from "@/lib/reading";
import {LEVELS,type Mode} from "@/lib/grammar";
import {AREAS,availableModule,gameNames} from "@/lib/phuma-catalog";

describe("Comprensión lectora: cobertura y tres juegos",()=>{
 it("ofrece tres textos diferentes por subtema y nivel, con IDs únicos",()=>{
  expect(READING_BANK).toHaveLength(63);
  expect(new Set(READING_BANK.map(q=>q.id)).size).toBe(63);
  expect(new Set(READING_BANK.map(q=>q.title)).size).toBe(9);
  expect(READING_SUBTOPICS).toHaveLength(7);
  for(const level of LEVELS)for(const subtopic of READING_SUBTOPICS){
   expect(readingItems(level,subtopic,"clasificar").length).toBe(["Idea principal","Inferencias","Lectura crítica"].includes(subtopic)?10:3);
   expect(new Set(readingItems(level,subtopic,"quiz").map(x=>x.id)).size).toBe(["Idea principal","Inferencias","Lectura crítica"].includes(subtopic)?10:3);
   expect(readingItems(level,subtopic,"construir").every(x=>x.subtopic===subtopic)).toBe(true);
   expect(availableModule("espanol","Comprensión lectora",subtopic)).toBe(true);
  }
 });
 it("permite responder cada pregunta con una única alternativa y evidencia coherente",()=>{
  const tags=Object.keys(EVIDENCE_LABEL);
  for(const q of READING_BANK){
   expect(q.passage.length).toBeGreaterThan(200);
   expect(q.claims).toHaveLength(3);
   expect(new Set(q.claims.map(x=>x.tag)).size).toBe(3);
   expect(q.claims.every(x=>tags.includes(x.tag)&&x.explanation.length>10)).toBe(true);
   expect(q.options).toHaveLength(4);
   expect(new Set(q.options).size).toBe(4);
   expect(q.answer).toBeGreaterThanOrEqual(0);
   expect(q.answer).toBeLessThan(4);
   expect(q.explanation.length).toBeGreaterThan(35);
   expect(q.order.parts).toHaveLength(3);
   expect(new Set(q.order.parts).size).toBe(3);
   expect(checkReadingOrder(q.order.parts,[0,1,2])).toBe(true);
   expect(checkReadingOrder(q.order.parts,[2,1,0])).toBe(false);
   expect(checkReadingOrder(q.order.parts,[0,0,2])).toBe(false);
   expect(checkReadingOrder(q.order.parts,[0,1])).toBe(false);
  }
 });
 it("todo término y expresión figurada aparece en el texto correspondiente",()=>{
  for(const q of READING_BANK){
   if(q.subtopic==="Vocabulario en contexto"||q.subtopic==="Lenguaje figurado"){
    const match=q.question.match(/«([^»]+)»/);
    expect(match?.[1]).toBeTruthy();
    expect(q.passage.toLocaleLowerCase("es").includes(match![1].toLocaleLowerCase("es"))).toBe(true);
   }
  }
 });
 it("nombres de juegos correctos y catálogo antiguo intacto",()=>{
  expect(gameNames("Comprensión lectora")).toEqual({
   clasificar:"Detective de ideas",quiz:"Verdad o inferencia",construir:"Reconstruye el texto"
  });
  const grammar=AREAS[0].topics.find(t=>t.name==="Gramática y semántica")!;
  expect(availableModule("espanol",grammar.name,"Categorías gramaticales")).toBe(true);
  expect(availableModule("espanol",grammar.name,"Morfosintaxis")).toBe(false);
  for(const mode of ["clasificar","quiz","construir"] as Mode[]){
   expect(readingItems("avanzado","Lectura crítica",mode)).toHaveLength(3);
  }
 });
});
