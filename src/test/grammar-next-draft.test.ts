import { describe, expect, it } from "vitest";
import { GRAMMAR_NEXT_DRAFT } from "@/lib/grammar-next-draft";

describe("borrador del siguiente bloque gramatical",()=>{
 it("conserva identificadores, niveles, opciones y explicaciones verificables",()=>{
  expect(GRAMMAR_NEXT_DRAFT).toHaveLength(18);
  expect(new Set(GRAMMAR_NEXT_DRAFT.map(q=>q.id)).size).toBe(18);
  for(const subtopic of ["Sinónimos y antónimos","Cohesión y coherencia","Morfosintaxis"]){
   for(const level of ["principiante","intermedio","avanzado"]){
    expect(GRAMMAR_NEXT_DRAFT.filter(q=>q.subtopic===subtopic&&q.level===level)).toHaveLength(2);
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
});
