import {describe,it,expect} from "vitest";
import {gradeClassification,gradeConstruction,validateActivity} from "@/lib/grammar-activities";
import {GRAMMAR_M1_ACTIVITIES,SYNONYM_CONSTRUCTION,COHESION_CONSTRUCTION,MORPH_CLASSIFICATION,MORPH_CONSTRUCTION} from "@/lib/grammar-m1-activities";
import {countContent} from "@/lib/coverage";
const targets={principiante:10,intermedio:15,avanzado:20} as const;
describe("M1: corrida de 180 actividades de gramática",()=>{
 it("completa las cuatro modalidades sin reusar ID",()=>{
  expect(GRAMMAR_M1_ACTIVITIES).toHaveLength(180);
  expect(new Set(GRAMMAR_M1_ACTIVITIES.map(x=>x.id)).size).toBe(180);
  for(const bank of [SYNONYM_CONSTRUCTION,COHESION_CONSTRUCTION,MORPH_CLASSIFICATION,MORPH_CONSTRUCTION]){
   expect(bank).toHaveLength(45);
   for(const [level,target] of Object.entries(targets))expect(bank.filter(x=>x.level===level)).toHaveLength(target);
  }
 });
 it("detecta respuestas erróneas, incompletas y fichas duplicadas en los 180 casos",()=>{
  for(const item of GRAMMAR_M1_ACTIVITIES){
   expect(validateActivity(item),item.id).toEqual([]);
   expect(item.explanation.length).toBeGreaterThan(25);
   expect(item.competence).toContain("Español");
   expect(item.cognitiveGoal?.length).toBeGreaterThan(12);
   expect(item.sourceLocator).toContain("PHUMA");
   expect(item.origin).toBe("original-M1-20261117");
   expect(item.family).toBeTruthy();
   if(item.kind==="classification"){
    const answers=Object.fromEntries(item.items.map(x=>[x.id,x.label]));
    expect(gradeClassification(item,answers),item.id).toBe(true);
    expect(gradeClassification(item,{}),item.id).toBe(false);
    expect(gradeClassification(item,{...answers,[item.items[0].id]:"respuesta errónea"}),item.id).toBe(false);
   }else{
    const correct=item.solutions[0];
    expect(gradeConstruction(item,correct),item.id).toBe(true);
    expect(gradeConstruction(item,correct.slice(0,1)),item.id).toBe(false);
    expect(gradeConstruction(item,[...correct].reverse()),item.id).toBe(false);
    expect(gradeConstruction(item,[correct[0],correct[0]]),item.id).toBe(false);
   }
  }
 });
 it("registra exactamente 10/15/20 por modalidad y subtema abierto",()=>{
  const modes={
   "Sinónimos y antónimos":["construir"],
   "Cohesión y coherencia":["construir"],
   "Morfosintaxis":["clasificar","construir"],
  };
  for(const [subtopic,items] of Object.entries(modes)){
   for(const mode of items){
    for(const [level,count] of Object.entries(targets)){
     expect(countContent("espanol","Gramática y semántica",subtopic,mode as "clasificar"|"construir",level as keyof typeof targets)).toBe(count);
    }
   }
  }
 });
});
