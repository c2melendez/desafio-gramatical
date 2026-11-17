import {describe,expect,it} from "vitest";
import {GRAMMAR_CLASSIFICATION_DRAFT,GRAMMAR_CONSTRUCTION_DRAFT} from "@/lib/grammar-games-draft";
import {gradeGrammarClassification,gradeGrammarConstruction} from "@/lib/grammar-new-games";
describe("borradores de clasificación y construcción",()=>{
 it("separa IDs, niveles, subtemas y valida las claves",()=>{
  const all=[...GRAMMAR_CLASSIFICATION_DRAFT,...GRAMMAR_CONSTRUCTION_DRAFT];
  expect(new Set(all.map(x=>x.id)).size).toBe(all.length);
  expect(new Set(all.map(x=>x.context.trim().toLowerCase())).size).toBe(all.length);
  for(const subtopic of ["Sinónimos y antónimos","Cohesión y coherencia","Morfosintaxis"])
   for(const level of ["principiante","intermedio","avanzado"]){
    expect(GRAMMAR_CLASSIFICATION_DRAFT.filter(x=>x.subtopic===subtopic&&x.level===level)).toHaveLength(2);
    expect(GRAMMAR_CONSTRUCTION_DRAFT.filter(x=>x.subtopic===subtopic&&x.level===level)).toHaveLength(2);
   }
  for(const x of GRAMMAR_CLASSIFICATION_DRAFT){
   expect(x.reviewStatus).toBe("editorial-draft");
   expect(new Set(x.labels).size).toBe(3);
   expect(new Set(x.items.map(i=>i.text)).size).toBe(3);
   expect(gradeGrammarClassification(x,x.items.map(i=>i.answer))).toBe(true);
   expect(x.items.every(i=>Number.isInteger(i.answer)&&i.answer>=0&&i.answer<3)).toBe(true);
  }
  for(const x of GRAMMAR_CONSTRUCTION_DRAFT){
   expect(x.reviewStatus).toBe("editorial-draft");
   expect(new Set(x.pieces).size).toBe(3);
   expect(gradeGrammarConstruction(x,[0,1,2])).toBe(true);
   expect(gradeGrammarConstruction(x,[2,1,0])).toBe(false);
  }
 });
});
