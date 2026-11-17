import {describe,it,expect} from "vitest";
import {M1_NEXT_ACTIVITIES,M1_NEXT_QUIZ} from "@/lib/grammar-m1-next-activities";
import {GRAMMAR_M1_ACTIVITIES} from "@/lib/grammar-m1-activities";
import {gradeClassification,gradeConstruction,validateActivity} from "@/lib/grammar-activities";
import {countContent} from "@/lib/coverage";
import {grammarPilotPool} from "@/lib/grammar-next-draft";

const TOPICS=["Homonimia y polisemia","Hiperonimia","Adecuación y referente"] as const;
const LEVELS={principiante:10,intermedio:15,avanzado:20} as const;
describe("M1 gramática: 405 actividades adicionales para tres subtemas",()=>{
 it("cada uno de 27 cruces subtema/juego/nivel contiene exactamente 10/15/20",()=>{
  expect(M1_NEXT_QUIZ).toHaveLength(135);
  expect(M1_NEXT_ACTIVITIES).toHaveLength(270);
  const ids=[...M1_NEXT_QUIZ,...M1_NEXT_ACTIVITIES,...GRAMMAR_M1_ACTIVITIES].map(q=>q.id);
  expect(new Set(ids).size).toBe(585);
  for(const topic of TOPICS)for(const [level,goal] of Object.entries(LEVELS)){
   expect(grammarPilotPool(topic,level as keyof typeof LEVELS)).toHaveLength(goal);
   for(const mode of ["quiz","clasificar","construir"] as const)
    expect(countContent("espanol","Gramática y semántica",topic,mode,level as keyof typeof LEVELS)).toBe(goal);
  }
 });
 it("valida contextos, cuatro opciones únicas y claves de 135 selecciones",()=>{
  for(const q of M1_NEXT_QUIZ){
   expect(q.reviewStatus,q.id).toBe("editorial-draft");
   expect(q.question.length,q.id).toBeGreaterThan(25);
   expect(q.passage.length,q.id).toBeGreaterThan(15);
   expect(q.explanation.length,q.id).toBeGreaterThan(45);
   expect(new Set(q.options.map(x=>x.normalize("NFKC").trim().toLocaleLowerCase("es"))).size,q.id).toBe(4);
   expect(q.options[q.answer].length,q.id).toBeGreaterThan(2);
   expect(q.sourceLocator).toContain("PHUMA");
  }
 });
 it("revisa estructura, alternativas, clasificación y distractores de los 270 juegos",()=>{
  for(const q of M1_NEXT_ACTIVITIES){
   expect(validateActivity(q),q.id).toEqual([]);
   expect(q.origin).toBe("original-M1-20261117");
   expect(q.family?.length,q.id).toBeGreaterThan(6);
   if(q.kind==="classification"){
    const answers=Object.fromEntries(q.items.map(x=>[x.id,x.label]));
    expect(gradeClassification(q,answers),q.id).toBe(true);
    expect(gradeClassification(q,{}),q.id).toBe(false);
    expect(gradeClassification(q,{...answers,[q.items[0].id]:"incorrecta"}),q.id).toBe(false);
   }else{
    expect(q.tiles).toHaveLength(4);
    expect(q.solutions[0]).toHaveLength(3);
    expect(q.tiles.filter(x=>x.id==="d")).toHaveLength(1);
    expect(gradeConstruction(q,q.solutions[0]),q.id).toBe(true);
    expect(gradeConstruction(q,[...q.solutions[0].slice(0,2),"d"]),q.id).toBe(false);
    expect(gradeConstruction(q,q.solutions[0].slice(0,2)),q.id).toBe(false);
   }
  }
 });
});
