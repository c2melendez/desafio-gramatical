import {describe,it,expect} from "vitest";
import {SCIENCE_LEVELS,SCIENCE_MODES,SCIENCE_TOPICS,SCIENCE_SUBTOPICS,scienceFacts} from "@/lib/science-m1";
import {scienceM2Pool} from "@/lib/science-m2";
import {scienceM3Pool,scienceM3NewPool,SCIENCE_M3_LEVEL_COUNT,SCIENCE_M3_NEW_PER_LEVEL,SCIENCE_M3_NEW_TOTAL,SCIENCE_M3_TOTAL} from "@/lib/science-m3";
import {verifyScienceCell,verifyScienceItem,scienceStimulusFingerprint} from "@/lib/science-m1-verifier";
import {countContent,coverageRows} from "@/lib/coverage";
import {emptyRotation,selectRotation,recordRotation} from "@/lib/rotation";
describe("Ciencias Naturales M3: 8550 modelos, 171 celdas, cierre técnico",()=>{
 it("preserva 5700 ítems anteriores y añade 2850 IDs nuevos 30/50/70 sin colisión",()=>{
  let before=0,added=0,after=0;const global=new Set<string>();
  expect(SCIENCE_SUBTOPICS).toHaveLength(19);
  expect(coverageRows().filter(x=>x.area==="naturales")).toHaveLength(171);
  for(const topic of SCIENCE_TOPICS)for(const subtopic of topic.subtopics)
  for(const mode of SCIENCE_MODES)for(const level of SCIENCE_LEVELS){
   const old=scienceM2Pool(topic.name,subtopic,level,mode);
   const fresh=scienceM3NewPool(topic.name,subtopic,level,mode);
   const all=scienceM3Pool(topic.name,subtopic,level,mode);
   expect(all.slice(0,old.length)).toEqual(old);
   expect(fresh.length).toBe(SCIENCE_M3_NEW_PER_LEVEL[level]);
   expect(all.length).toBe(SCIENCE_M3_LEVEL_COUNT[level]);
   expect(countContent("naturales",topic.name,subtopic,mode,level)).toBe(all.length);
   expect(verifyScienceCell(all,level,mode,scienceFacts(subtopic))).toEqual([]);
   for(const item of all){expect(global.has(item.id)).toBe(false);global.add(item.id);}
   before+=old.length;added+=fresh.length;after+=all.length;
  }
  expect(before).toBe(5700);expect(added).toBe(SCIENCE_M3_NEW_TOTAL);expect(after).toBe(SCIENCE_M3_TOTAL);
  expect(global.size).toBe(SCIENCE_M3_TOTAL);
 });
 it("todas las combinaciones completan diez rondas sin repetición ni tras la rotación",()=>{
  for(const topic of SCIENCE_TOPICS)for(const subtopic of topic.subtopics)
  for(const mode of SCIENCE_MODES)for(const level of SCIENCE_LEVELS){
   const pool=scienceM3Pool(topic.name,subtopic,level,mode);
   const first=selectRotation(pool,emptyRotation(),10,()=>0.25);
   let history=emptyRotation();for(const item of first)history=recordRotation(history,item.id,true);
   const second=selectRotation(pool,history,10,()=>0.53);
   expect(first.length).toBe(10);expect(second.length).toBe(10);
   expect(new Set(first.map(x=>x.id)).size).toBe(10);
   expect(new Set(second.map(x=>x.id)).size).toBe(10);
   expect(second.some(x=>first.some(y=>y.id===x.id))).toBe(false);
  }
 });
 it("detecta mutaciones de clave, escenario, dos respuestas válidas y operación fuera del nivel",()=>{
  const x=scienceM3NewPool("Biología","Genética","avanzado","quiz")[12];
  const facts=scienceFacts("Genética");
  expect(verifyScienceItem(x,"avanzado","quiz",facts)).toEqual([]);
  expect(verifyScienceItem({...x,expected:"error"},"avanzado","quiz",facts)).toContain("Respuesta distinta al oráculo");
  expect(verifyScienceItem({...x,oracle:{...x.oracle,scenario:"sin evidencia"}},"avanzado","quiz",facts)).toContain("Afirmación sin anclaje en hechos curados");
  expect(verifyScienceItem({...x,options:[x.expected,x.expected,"x","y"]},"avanzado","quiz",facts)).toContain("Distractores o clave de selección inválida");
  expect(verifyScienceItem({...x,cognitiveStage:1},"avanzado","quiz",facts)).toContain("Metadatos cognitivos insuficientes");
  expect(verifyScienceCell([x,x],"avanzado","quiz",facts).some(t=>t.includes("ID duplicado"))).toBe(true);
 });
 it("rechaza celdas fuera del catálogo e identifica huellas de estímulos",()=>{
  expect(()=>scienceM3NewPool("Tema ajeno","No existe","intermedio","quiz")).toThrow();
  const a=scienceM3Pool("Física","Movimiento","principiante","quiz");
  expect(new Set(a.map(scienceStimulusFingerprint)).size).toBe(a.length);
 });
});
