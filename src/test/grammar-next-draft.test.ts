import { describe, expect, it } from "vitest";
import { countContent } from "@/lib/coverage";
import { GRAMMAR_NEXT_DRAFT, m1PilotPool } from "@/lib/grammar-next-draft";

const m1PilotPool=(...args:Parameters<typeof m1SourcePilotPool>)=>m1SourcePilotPool(...args).filter(q=>!q.id.startsWith("m2-"));

describe("borrador del siguiente bloque gramatical",()=>{
 it("conserva identificadores, niveles, opciones y explicaciones verificables",()=>{
  expect(GRAMMAR_NEXT_DRAFT).toHaveLength(135);
  expect(new Set(GRAMMAR_NEXT_DRAFT.map(q=>q.id)).size).toBe(135);
  for(const subtopic of ["Sinónimos y antónimos","Cohesión y coherencia","Morfosintaxis"]){
   for(const level of ["principiante","intermedio","avanzado"]){
    expect(GRAMMAR_NEXT_DRAFT.filter(q=>q.subtopic===subtopic&&q.level===level)).toHaveLength(({principiante:10,intermedio:15,avanzado:20} as const)[level as "principiante"|"intermedio"|"avanzado"]);
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
 it("conserva las 135 preguntas y contabiliza por separado las nuevas modalidades M1",()=>{
  for(const topic of ["Sinónimos y antónimos","Cohesión y coherencia","Morfosintaxis"]){
   for(const level of ["principiante","intermedio","avanzado"] as const){
    expect(m1PilotPool(topic,level)).toHaveLength(({principiante:10,intermedio:15,avanzado:20} as const)[level as "principiante"|"intermedio"|"avanzado"]);
    expect(countContent("espanol","Gramática y semántica",topic,"quiz",level)).toBeGreaterThanOrEqual(({principiante:10,intermedio:15,avanzado:20} as const)[level]);
    expect(countContent("espanol","Gramática y semántica",topic,"clasificar",level)).toBeGreaterThanOrEqual((topic === "Sinónimos y antónimos" || topic === "Cohesión y coherencia") ? ({principiante:10,intermedio:15,avanzado:20} as const)[level] : ({principiante:10,intermedio:15,avanzado:20} as const)[level]);
    expect(countContent("espanol","Gramática y semántica",topic,"construir",level)).toBeGreaterThanOrEqual(({principiante:10,intermedio:15,avanzado:20} as const)[level]);
   }
  }
 });
});
