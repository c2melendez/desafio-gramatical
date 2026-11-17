import {describe,expect,it} from "vitest";
import {gradeGrammarClassification,gradeGrammarConstruction,type GrammarClassification,type GrammarConstruction} from "@/lib/grammar-new-games";
const common={id:"test",subtopic:"Cohesión y coherencia" as const,level:"intermedio" as const,reviewStatus:"editorial-draft" as const,context:"Contexto de prueba",explanation:"Explicación de prueba"};
describe("mecánicas de gramática en desarrollo",()=>{
 it("solo acepta las tres clasificaciones correctas",()=>{
  const item:GrammarClassification={...common,kind:"clasificar",prompt:"Clasifica",labels:["A","B","C"],items:[{text:"uno",answer:0},{text:"dos",answer:1},{text:"tres",answer:2}]};
  expect(gradeGrammarClassification(item,[0,1,2])).toBe(true);
  expect(gradeGrammarClassification(item,[0,1])).toBe(false);
  expect(gradeGrammarClassification(item,[0,2,1])).toBe(false);
 });
 it("rechaza omisiones y permutaciones en construcción",()=>{
  const item:GrammarConstruction={...common,kind:"construir",prompt:"Ordena",pieces:["Primero","Después","Finalmente"]};
  expect(gradeGrammarConstruction(item,[0,1,2])).toBe(true);
  expect(gradeGrammarConstruction(item,[0,1])).toBe(false);
  expect(gradeGrammarConstruction(item,[1,0,2])).toBe(false);
 });
});
