import {describe,it,expect} from "vitest";
import {MATH_TOPICS,MATH_LEVELS,MATH_MODES} from "@/lib/math-m1";
import {mathM2Pool} from "@/lib/math-m2";
import {mathM3Pool,mathM3NewPool,MATH_M3_NEW_PER_LEVEL,MATH_M3_LEVEL_COUNT,MATH_M3_NEW_TOTAL,MATH_M3_TOTAL,mathStimulusSignature} from "@/lib/math-m3";
import {countContent} from "@/lib/coverage";
import {selectRotation,emptyRotation,recordRotation} from "@/lib/rotation";
describe("Matemáticas M3 — 9900 registros en 198 celdas",()=>{
 it("mantiene todo el historial de IDs M1/M2, 3300 nuevos y cuotas 30/50/70",()=>{
  const ids=new Set<string>();let prior=0,added=0;
  for(const topic of MATH_TOPICS)for(const subtopic of topic.subtopics)
  for(const mode of MATH_MODES)for(const level of MATH_LEVELS){
   const old=mathM2Pool(topic.name,subtopic,level,mode),newItems=mathM3NewPool(topic.name,subtopic,level,mode),all=mathM3Pool(topic.name,subtopic,level,mode);
   expect(all.length).toBe(MATH_M3_LEVEL_COUNT[level]);
   expect(newItems.length).toBe(MATH_M3_NEW_PER_LEVEL[level]);
   expect(all.slice(0,old.length).map(x=>x.id)).toEqual(old.map(x=>x.id));
   expect(countContent("matematicas",topic.name,subtopic,mode,level)).toBe(all.length);
   expect(new Set(all.map(mathStimulusSignature)).size).toBe(all.length);
   for(const x of all){expect(ids.has(x.id)).toBe(false);ids.add(x.id);}
   prior+=old.length;added+=newItems.length;
  }
  expect(prior).toBe(6600);expect(added).toBe(MATH_M3_NEW_TOTAL);
  expect(ids.size).toBe(MATH_M3_TOTAL);
 });
 it("conserva diez rondas sin repeticiones y prioriza IDs no vistos",()=>{
  const bank=mathM3Pool("Álgebra","Funciones","avanzado","quiz");
  const first=selectRotation(bank,emptyRotation(),10,()=>0.21);
  let history=emptyRotation();
  for(const x of first)history=recordRotation(history,x.id,true);
  const second=selectRotation(bank,history,10,()=>0.57);
  expect(first.length).toBe(10);expect(second.length).toBe(10);
  expect(new Set(first.map(x=>x.id)).size).toBe(10);
  expect(new Set(second.map(x=>x.id)).size).toBe(10);
  expect(second.every(x=>!first.some(y=>y.id===x.id))).toBe(true);
 });
 it("rechaza solicitudes fuera de catálogo",()=>{
  expect(()=>mathM3Pool("No existe","Otro","avanzado","quiz")).toThrow();
 });
});
