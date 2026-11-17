import {describe,it,expect} from "vitest";
import {M1_LITERATURE_QUIZ,M1_LITERATURE_ACTIVITIES} from "@/lib/grammar-m1-literature";
import {gradeClassification,gradeConstruction,validateActivity} from "@/lib/grammar-activities";
import {countContent} from "@/lib/coverage";
import {grammarPilotPool} from "@/lib/grammar-next-draft";
const TOPICS=["Figuras retóricas","Géneros literarios"];
const LEVELS={principiante:10,intermedio:15,avanzado:20} as const;
describe("M1 literatura: 270 casos técnicos en dos subtemas",()=>{
 it("conserva cuota 10/15/20 para cada uno de los tres juegos",()=>{
  expect(M1_LITERATURE_QUIZ).toHaveLength(90);
  expect(M1_LITERATURE_ACTIVITIES).toHaveLength(180);
  expect(new Set([...M1_LITERATURE_QUIZ,...M1_LITERATURE_ACTIVITIES].map(x=>x.id)).size).toBe(270);
  for(const topic of TOPICS)for(const [level,target] of Object.entries(LEVELS)){
   expect(grammarPilotPool(topic,level as keyof typeof LEVELS)).toHaveLength(target);
   for(const mode of ["quiz","clasificar","construir"] as const)
    expect(countContent("espanol","Literatura",topic,mode,level as keyof typeof LEVELS)).toBe(target);
  }
 });
 it("verifica opciones no repetidas y clave de 90 selecciones",()=>{
  for(const q of M1_LITERATURE_QUIZ){
   expect(q.reviewStatus).toBe("editorial-draft");
   expect(q.passage.length).toBeGreaterThan(25);
   expect(q.explanation.length).toBeGreaterThan(25);
   expect(new Set(q.options.map(x=>x.trim().normalize("NFKC").toLowerCase())).size).toBe(4);
   expect(q.options[q.answer]).toBeTruthy();
  }
 });
 it("valida clasificaciones y rechazo de distractores en 180 actividades",()=>{
  for(const q of M1_LITERATURE_ACTIVITIES){
   expect(validateActivity(q),q.id).toEqual([]);
   if(q.kind==="classification"){
    const correct=Object.fromEntries(q.items.map(x=>[x.id,x.label]));
    expect(gradeClassification(q,correct),q.id).toBe(true);
    expect(gradeClassification(q,{}),q.id).toBe(false);
    expect(q.items.map(x=>x.label),q.id).not.toEqual(q.labels);
   }else{
    expect(q.tiles).toHaveLength(4);
    expect(gradeConstruction(q,q.solutions[0]),q.id).toBe(true);
    expect(gradeConstruction(q,[...q.solutions[0].slice(0,2),"d"]),q.id).toBe(false);
   }
  }
 });
});
