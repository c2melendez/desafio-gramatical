import { describe, expect, it } from "vitest";
import { countContent } from "@/lib/coverage";
import { GRAMMAR_NEXT_DRAFT, grammarPilotPool } from "@/lib/grammar-next-draft";

describe("borrador del siguiente bloque gramatical",()=>{
 it("conserva identificadores, niveles, opciones y explicaciones verificables",()=>{
  expect(GRAMMAR_NEXT_DRAFT).toHaveLength(99);
  expect(new Set(GRAMMAR_NEXT_DRAFT.map(q=>q.id)).size).toBe(99);
  for(const subtopic of ["Sinónimos y antónimos","Cohesión y coherencia","Morfosintaxis"]){
   for(const level of ["principiante","intermedio","avanzado"]){
    expect(GRAMMAR_NEXT_DRAFT.filter(q=>q.subtopic===subtopic&&q.level===level)).toHaveLength(({principiante:10,intermedio:11,avanzado:12} as const)[level as "principiante"|"intermedio"|"avanzado"]);
   }
  }
  for(const q of GRAMMAR_NEXT_DRAFT){
   expect(q.reviewStatus).toBe("editorial-draft");
   expect(new Set(q.options.map(x=>x.trim().toLocaleLowerCase("es"))).size).toBe(4);
   expect(q.options[q.answer]).toBeTruthy();
   expect(q.passage.length).toBeGreaterThan(35);
   expect(q.explanation.length).toBeGreaterThan(40);
  }
 });
 it("contabiliza solo la modalidad jugable y mantiene los bancos separados",()=>{
  for(const topic of ["Sinónimos y antónimos","Cohesión y coherencia","Morfosintaxis"]){
   for(const level of ["principiante","intermedio","avanzado"] as const){
    expect(grammarPilotPool(topic,level)).toHaveLength(({principiante:10,intermedio:11,avanzado:12} as const)[level as "principiante"|"intermedio"|"avanzado"]);
    expect(countContent("espanol","Gramática y semántica",topic,"quiz",level)).toBe(({principiante:10,intermedio:11,avanzado:12} as const)[level]);
    expect(countContent("espanol","Gramática y semántica",topic,"clasificar",level)).toBe(0);
    expect(countContent("espanol","Gramática y semántica",topic,"construir",level)).toBe(0);
   }
  }
 });
});
