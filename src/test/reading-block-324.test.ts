import {describe,it,expect} from "vitest";
import {VOCAB_DETECTIVE_CASES,VOCAB_CHOICE_CASES,VOCAB_RECONSTRUCT_CASES,VOCABULARY_SEEDS} from "@/lib/reading-vocabulary-block";
import {ANALYSIS_DETECTIVE_CASES,ANALYSIS_CHOICE_CASES,ANALYSIS_RECONSTRUCT_CASES} from "@/lib/reading-analysis-block";
import {COMPARISON_DETECTIVE_CASES,COMPARISON_CHOICE_CASES,COMPARISON_RECONSTRUCT_CASES} from "@/lib/reading-comparison-block";
import {readingPool,readingItems} from "@/lib/reading";
import {coverageTotals,countContent} from "@/lib/coverage";
const groups=[
 {subtopic:"Vocabulario en contexto" as const,banks:[VOCAB_DETECTIVE_CASES,VOCAB_CHOICE_CASES,VOCAB_RECONSTRUCT_CASES]},
 {subtopic:"Análisis de textos" as const,banks:[ANALYSIS_DETECTIVE_CASES,ANALYSIS_CHOICE_CASES,ANALYSIS_RECONSTRUCT_CASES]},
 {subtopic:"Lectura comparada" as const,banks:[COMPARISON_DETECTIVE_CASES,COMPARISON_CHOICE_CASES,COMPARISON_RECONSTRUCT_CASES]}
];
describe("Fase A — corrida de tres subtemas",()=>{
 it("genera 324 ejercicios con 108 por subtema y claves propias de tres juegos",()=>{
  expect(VOCABULARY_SEEDS).toHaveLength(36);
  for(const group of groups){
   expect(group.banks).toHaveLength(3);
   for(const bank of group.banks){
    expect(bank).toHaveLength(36);
    expect(new Set(bank.map(q=>q.id)).size).toBe(36);
    for(const [level,n] of [["principiante",7],["intermedio",12],["avanzado",17]] as const)
     expect(bank.filter(q=>q.level===level)).toHaveLength(n);
    expect(bank.every(q=>q.reviewStatus==="editorial-draft")).toBe(true);
   }
   const passages=group.banks.flatMap(bank=>bank.map(q=>q.passage));
   expect(new Set(passages).size).toBe(108);
   expect(passages.every(p=>p.length>=145)).toBe(true);
  }
  expect(new Set(groups.flatMap(g=>g.banks.flatMap(b=>b.map(q=>q.id)))).size).toBe(324);
 });
 it("alcanza 10/15/20 por juego, sin atribuir el nuevo contenido a Lenguaje figurado",()=>{
  for(const group of groups)
   for(const [level,n] of [["principiante",10],["intermedio",15],["avanzado",20]] as const)
    for(const mode of ["clasificar","quiz","construir"] as const){
     expect(readingPool(level,group.subtopic,mode)).toHaveLength(n);
     expect(readingItems(level,group.subtopic,mode)).toHaveLength(10);
     expect(countContent("espanol","Comprensión lectora",group.subtopic,mode,level)).toBe(n);
    }
  for(const level of ["principiante","intermedio","avanzado"] as const)
   for(const mode of ["clasificar","quiz","construir"] as const)
    expect(readingPool(level,"Lenguaje figurado",mode)).toHaveLength(3);
  expect(coverageTotals().available).toBe(1574);
  expect(coverageTotals().stageOneComplete).toBe(99);
 });
 it("valida explícitas, inferencias, distractores y secuencias correctas",()=>{
  const detectives=[VOCAB_DETECTIVE_CASES,ANALYSIS_DETECTIVE_CASES,COMPARISON_DETECTIVE_CASES];
  const choices=[VOCAB_CHOICE_CASES,ANALYSIS_CHOICE_CASES,COMPARISON_CHOICE_CASES];
  const reconstructions=[VOCAB_RECONSTRUCT_CASES,ANALYSIS_RECONSTRUCT_CASES,COMPARISON_RECONSTRUCT_CASES];
  for(const bank of detectives)for(const q of bank){
   expect(q.claims).toHaveLength(3);
   expect(new Set(q.claims.map(c=>c.tag))).toEqual(new Set(["explicit","inference","unsupported"]));
   expect(new Set(q.claims.map(c=>c.text)).size).toBe(3);
  }
  for(const bank of choices)for(const q of bank){
   expect(q.options).toHaveLength(4);
   expect(new Set(q.options).size).toBe(4);
   expect(q.answer).toBeGreaterThanOrEqual(0);
   expect(q.answer).toBeLessThan(4);
   expect(q.options[q.answer]).toBeTruthy();
   expect(q.explanation.length).toBeGreaterThanOrEqual(45);
  }
  for(const bank of reconstructions)for(const q of bank){
   expect(q.order.parts).toHaveLength(3);
   expect(new Set(q.order.parts).size).toBe(3);
   expect(q.order.explanation.length).toBeGreaterThanOrEqual(45);
  }
 });
});