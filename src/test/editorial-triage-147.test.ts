import {describe,it,expect} from "vitest";
import {writingPool,WRITING_SUBTOPICS} from "@/lib/writing";
import {M2_CATEGORY_QUIZ} from "@/lib/m2-grammar";
const levels=["principiante","intermedio","avanzado"] as const;
const orderCue=/^(primero|después|finalmente|por último|en primer lugar|en segundo lugar|en tercer lugar|luego|a continuación|al final|al comienzo|al inicio|al cerrar|más tarde|solo después)(?:,|\s)/i;
describe("Triaje editorial — secuencias, opciones y justificaciones",()=>{
 it("todas las fichas de Redacción exigen reconstruir el orden sin un marcador ordinal de solución",()=>{
  for(const subtopic of WRITING_SUBTOPICS)for(const level of levels){
   const bank=writingPool(level,subtopic,"construir");
   for(const item of bank){
    if(!("steps" in item))continue;
    for(const step of item.steps)expect(step,item.id).not.toMatch(orderCue);
   }
  }
 });
 it("las explicaciones M2 de categorías incluyen la regla de función y la doble comprobación",()=>{
  for(const level of levels)for(const item of M2_CATEGORY_QUIZ[level]){
   expect(item.exp).toContain("En A:");
   expect(item.exp).toContain("En B:");
   expect(item.exp).toContain("ambas clasificaciones");
  }
 });
 it("las frases corregidas mantienen una secuencia causal evaluable",()=>{
  const items=writingPool("principiante","Corrección","construir").filter(x=>x.id.startsWith("writing-correction-editor-v1-"));
  expect(items.length).toBeGreaterThan(0);
  expect(items.some(x=>"steps" in x&&x.steps.some(s=>s.includes("Revisó si había escrito correctamente su nombre")))).toBe(true);
 });
});
