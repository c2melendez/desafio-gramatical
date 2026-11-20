import {describe,it,expect} from "vitest";
import {SOCIAL_TOPICS,SOCIAL_SUBTOPICS,SOCIAL_LEVELS,SOCIAL_MODES,socialFacts,socialPool} from "@/lib/social-m1";
import {socialM2Pool} from "@/lib/social-m2";
import {SOCIAL_M3_LEVEL_COUNT,SOCIAL_M3_NEW_PER_LEVEL,SOCIAL_M3_TOTAL,SOCIAL_M3_NEW_TOTAL,socialM3Pool,socialM3NewPool,socialM3Model} from "@/lib/social-m3";
import {verifyScienceCell,verifyScienceItem} from "@/lib/science-m1-verifier";
import {countContent,coverageRows} from "@/lib/coverage";
import {emptyRotation,selectRotation,recordRotation} from "@/lib/rotation";
describe("Ciencias Sociales M3: corte completo, 9000 registros, 180 celdas",()=>{
 it("alcanza 30/50/70, conserva M1/M2 exactos y exige claves verificadas",()=>{
  let before=0,added=0,after=0;const ids=new Set<string>();
  expect(SOCIAL_SUBTOPICS).toHaveLength(20);expect(coverageRows().filter(x=>x.area==="sociales")).toHaveLength(180);
  for(const t of SOCIAL_TOPICS)for(const sub of t.subtopics)
   for(const mode of SOCIAL_MODES)for(const level of SOCIAL_LEVELS){
    const prior=socialM2Pool(t.name,sub,level,mode);
    const fresh=socialM3NewPool(t.name,sub,level,mode);
    const bank=socialM3Pool(t.name,sub,level,mode);
    expect(bank.slice(0,prior.length)).toEqual(prior);
    expect(fresh.length).toBe(SOCIAL_M3_NEW_PER_LEVEL[level]);
    expect(bank.length).toBe(SOCIAL_M3_LEVEL_COUNT[level]);
    expect(countContent("sociales",t.name,sub,mode,level)).toBe(bank.length);
    expect(verifyScienceCell(bank,level,mode,socialFacts(sub))).toEqual([]);
    for(const x of bank){expect(ids.has(x.id)).toBe(false);ids.add(x.id);}
    before+=prior.length;added+=fresh.length;after+=bank.length;
   }
  expect(before).toBe(6000);expect(added).toBe(SOCIAL_M3_NEW_TOTAL);expect(after).toBe(SOCIAL_M3_TOTAL);
  expect(ids.size).toBe(9000);
 });
 it("preserva dos partidas de 10 rondas sin repetición en las 180 celdas",()=>{
  for(const t of SOCIAL_TOPICS)for(const sub of t.subtopics)
   for(const mode of SOCIAL_MODES)for(const level of SOCIAL_LEVELS){
    const bank=socialM3Pool(t.name,sub,level,mode);
    const a=selectRotation(bank,emptyRotation(),10,()=>0.26);
    let history=emptyRotation();for(const x of a)history=recordRotation(history,x.id,true);
    const b=selectRotation(bank,history,10,()=>0.63);
    expect(a).toHaveLength(10);expect(b).toHaveLength(10);
    expect(new Set(a.map(x=>x.id)).size).toBe(10);expect(new Set(b.map(x=>x.id)).size).toBe(10);
    expect(b.every(x=>a.every(y=>x.id!==y.id))).toBe(true);
   }
 });
 it("detecta clave falsa, caso inventado, distractor duplicado, estadio y paso erróneos",()=>{
  const x=socialM3NewPool("Historia de Honduras","Independencia","avanzado","quiz")[0];
  const facts=socialFacts("Independencia");
  expect(verifyScienceItem(x,"avanzado","quiz",facts)).toEqual([]);
  expect(verifyScienceItem({...x,expected:"falso"},"avanzado","quiz",facts)).toContain("Respuesta distinta al oráculo");
  expect(verifyScienceItem({...x,oracle:{...x.oracle,scenario:"ajeno"}},"avanzado","quiz",facts)).toContain("Afirmación sin anclaje en hechos curados");
  expect(verifyScienceItem({...x,options:[x.expected,x.expected,"uno","dos"]},"avanzado","quiz",facts)).toContain("Distractores o clave de selección inválida");
  expect(verifyScienceItem({...x,cognitiveStage:1},"avanzado","quiz",facts)).toContain("Metadatos cognitivos insuficientes");
  expect(verifyScienceItem({...x,steps:[{...x.steps[0],answerIndex:9},x.steps[1]]},"avanzado","quiz",facts)).toContain("Construcción incorrecta");
  expect(()=>socialM3Model("falso","Independencia","principiante","quiz",0)).toThrow();
  expect(()=>socialM3Model("Historia de Honduras","Independencia","principiante","quiz",10)).toThrow();
 });
});
