import {describe,it,expect} from "vitest";
import {SOFT_TOPICS,SOFT_SUBTOPICS,SOFT_LEVELS,SOFT_MODES,SOFT_LEVEL_COUNT,SOFT_M1_TOTAL,softPool,softFacts,softTopic,softModel} from "@/lib/soft-m1";
import {verifyScienceItem,verifyScienceCell} from "@/lib/science-m1-verifier";
import {countContent,coverageRows} from "@/lib/coverage";
import {availableModule} from "@/lib/phuma-catalog";
import {emptyRotation,recordRotation,parseRotation,selectRotation} from "@/lib/rotation";
describe("Habilidades Blandas M1: 1080 registros técnicos, 72 celdas",()=>{
 it("confirma 8 subtemas, 40 anclajes, 10/15/20 y oráculos por 72 celdas",()=>{
  expect(SOFT_SUBTOPICS).toHaveLength(8);expect(SOFT_TOPICS).toHaveLength(3);
  expect(coverageRows().filter(x=>x.area==="blandas")).toHaveLength(72);
  let n=0;const ids=new Set<string>();
  for(const t of SOFT_TOPICS)for(const sub of t.subtopics)for(const mode of SOFT_MODES)for(const level of SOFT_LEVELS){
   const bank=softPool(t.name,sub,level,mode);
   expect(bank).toHaveLength(SOFT_LEVEL_COUNT[level]);
   expect(countContent("blandas",t.name,sub,mode,level)).toBe(bank.length);
   expect(availableModule("blandas",t.name,sub)).toBe(true);
   expect(verifyScienceCell(bank,level,mode,softFacts(sub))).toEqual([]);
   expect(softTopic(sub)).toBe(t.name);
   for(const x of bank){
    expect(ids.has(x.id)).toBe(false);ids.add(x.id);
    expect(x.reviewStatus).toBe("editorial-draft");
    expect(x.source).toBe("catalogo-practica-complementaria");
   }n+=bank.length;
  }
  expect(n).toBe(SOFT_M1_TOTAL);expect(ids.size).toBe(1080);
 });
 it("dos partidas de 10 rondas sin repetir y restauración del historial en cada celda",()=>{
  for(const t of SOFT_TOPICS)for(const s of t.subtopics)for(const mode of SOFT_MODES)for(const level of SOFT_LEVELS){
   const bank=softPool(t.name,s,level,mode),first=selectRotation(bank,emptyRotation(),10,()=>0.25);
   let state=emptyRotation();for(const x of first)state=recordRotation(state,x.id,true);
   const restored=parseRotation(JSON.stringify(state),bank.map(x=>x.id)),second=selectRotation(bank,restored,10,()=>0.65);
   expect(first).toHaveLength(10);expect(second).toHaveLength(10);
   expect(new Set(first.map(x=>x.id)).size).toBe(10);
   expect(new Set(second.map(x=>x.id)).size).toBe(10);
   expect(second.filter(x=>first.some(y=>y.id===x.id)).length).toBe(level==="principiante"?10:level==="intermedio"?5:0);
  }
 });
 it("detecta respuestas, distractores, fuentes, clasificación y construcción erróneas",()=>{
  const x=softPool("Convivencia","Comunicación asertiva","avanzado","quiz")[0],facts=softFacts("Comunicación asertiva");
  expect(verifyScienceItem(x,"avanzado","quiz",facts)).toEqual([]);
  expect(verifyScienceItem({...x,expected:"falso"},"avanzado","quiz",facts)).toContain("Respuesta distinta al oráculo");
  expect(verifyScienceItem({...x,oracle:{...x.oracle,scenario:"falso"}},"avanzado","quiz",facts)).toContain("Afirmación sin anclaje en hechos curados");
  expect(verifyScienceItem({...x,options:[x.expected,x.expected,"A","B"]},"avanzado","quiz",facts)).toContain("Distractores o clave de selección inválida");
  expect(verifyScienceItem({...x,steps:[{...x.steps[0],answerIndex:99},x.steps[1]]},"avanzado","quiz",facts)).toContain("Construcción incorrecta");
  expect(()=>softModel("Convivencia","Colaboración","principiante","quiz",10)).toThrow();
 });
});