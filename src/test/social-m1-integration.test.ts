import {describe,it,expect} from "vitest";
import {SOCIAL_TOPICS,SOCIAL_SUBTOPICS,SOCIAL_LEVELS,SOCIAL_MODES,SOCIAL_M1_TOTAL,socialPool,socialFacts,socialModel} from "@/lib/social-m1";
import {verifyScienceItem,verifyScienceCell} from "@/lib/science-m1-verifier";
import {countContent,coverageRows} from "@/lib/coverage";
import {availableModule} from "@/lib/phuma-catalog";
import {emptyRotation,selectRotation,recordRotation,rotationKey} from "@/lib/rotation";
describe("Ciencias Sociales M1: núcleo completo con auditoría de 180 celdas",()=>{
 it("garantiza 2700 IDs, 10/15/20 por cada juego y subtema, claves verificables",()=>{
  const ids=new Set<string>();let count=0;
  expect(SOCIAL_SUBTOPICS).toHaveLength(20);expect(SOCIAL_M1_TOTAL).toBe(2700);
  expect(coverageRows().filter(x=>x.area==="sociales")).toHaveLength(180);
  for(const topic of SOCIAL_TOPICS)for(const subtopic of topic.subtopics)
   for(const mode of SOCIAL_MODES)for(const level of SOCIAL_LEVELS){
    const bank=socialPool(topic.name,subtopic,level,mode);
    expect(bank).toHaveLength(({principiante:10,intermedio:15,avanzado:20})[level]);
    expect(countContent("sociales",topic.name,subtopic,mode,level)).toBe(({principiante:20,intermedio:35,avanzado:45})[level]);
    expect(availableModule("sociales",topic.name,subtopic)).toBe(true);
    expect(verifyScienceCell(bank,level,mode,socialFacts(subtopic))).toEqual([]);
    for(const item of bank){expect(ids.has(item.id)).toBe(false);ids.add(item.id);expect(item.reviewStatus).toBe("editorial-draft");}
    count+=bank.length;
   }
  expect(count).toBe(2700);expect(ids.size).toBe(2700);
 });
 it("produce diez rondas sin repetición y conserva claves de historia por área",()=>{
  for(const t of SOCIAL_TOPICS)for(const s of t.subtopics)
  for(const mode of SOCIAL_MODES)for(const level of SOCIAL_LEVELS){
   const bank=socialPool(t.name,s,level,mode);
   const first=selectRotation(bank,emptyRotation(),10,()=>0.3);
   let history=emptyRotation();for(const q of first)history=recordRotation(history,q.id,true);
   const second=selectRotation(bank,history,10,()=>0.53);
   expect(new Set(first.map(x=>x.id)).size).toBe(10);
   expect(new Set(second.map(x=>x.id)).size).toBe(10);
   if(bank.length>=20)expect(second.some(x=>first.some(y=>y.id===x.id))).toBe(false);
   expect(rotationKey("sociales",t.name,s,mode,level)).not.toBe(rotationKey("naturales",t.name,s,mode,level));
  }
 });
 it("detecta mutaciones críticas por clave, hecho, distractores, modalidad y construcción",()=>{
  const x=socialPool("Historia de Honduras","Independencia","avanzado","quiz")[0],facts=socialFacts("Independencia");
  expect(verifyScienceItem(x,"avanzado","quiz",facts)).toEqual([]);
  expect(verifyScienceItem({...x,expected:"sin evidencia"},"avanzado","quiz",facts)).toContain("Respuesta distinta al oráculo");
  expect(verifyScienceItem({...x,oracle:{...x.oracle,scenario:"inexistente"}},"avanzado","quiz",facts)).toContain("Afirmación sin anclaje en hechos curados");
  expect(verifyScienceItem({...x,options:[x.expected,x.expected,"a","b"]},"avanzado","quiz",facts)).toContain("Distractores o clave de selección inválida");
  expect(verifyScienceItem({...x,steps:[{...x.steps[0],answerIndex:9},x.steps[1]]},"avanzado","quiz",facts)).toContain("Construcción incorrecta");
  expect(verifyScienceCell([x,x],"avanzado","quiz",facts).some(y=>y.includes("ID duplicado"))).toBe(true);
  expect(()=>socialModel("Inexistente","Independencia","intermedio","quiz",0)).toThrow();
 });
});
