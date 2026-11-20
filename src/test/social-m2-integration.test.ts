import {describe,it,expect} from "vitest";
import {SOCIAL_TOPICS,SOCIAL_LEVELS,SOCIAL_MODES,SOCIAL_SUBTOPICS,socialFacts,socialPool} from "@/lib/social-m1";
import {SOCIAL_M2_LEVEL_COUNT,SOCIAL_M2_NEW_PER_LEVEL,SOCIAL_M2_NEW_TOTAL,SOCIAL_M2_TOTAL,socialM2NewPool,socialM2Pool,socialM2Model} from "@/lib/social-m2";
import {verifyScienceCell,verifyScienceItem} from "@/lib/science-m1-verifier";
import {coverageRows,countContent} from "@/lib/coverage";
import {emptyRotation,selectRotation,recordRotation} from "@/lib/rotation";
describe("Ciencias Sociales M2: 6000 registros acumulados en 180 celdas",()=>{
 it("preserva los 2700 M1 y suma 3300 M2 sin alterar claves ni cuotas",()=>{
  let old=0,newCount=0,allCount=0;const ids=new Set<string>();
  expect(SOCIAL_SUBTOPICS).toHaveLength(20);
  expect(coverageRows().filter(x=>x.area==="sociales")).toHaveLength(180);
  for(const topic of SOCIAL_TOPICS)for(const subtopic of topic.subtopics)
   for(const mode of SOCIAL_MODES)for(const level of SOCIAL_LEVELS){
    const prev=socialPool(topic.name,subtopic,level,mode),fresh=socialM2NewPool(topic.name,subtopic,level,mode),all=socialM2Pool(topic.name,subtopic,level,mode);
    expect(all.slice(0,prev.length)).toEqual(prev);
    expect(fresh).toHaveLength(SOCIAL_M2_NEW_PER_LEVEL[level]);
    expect(all).toHaveLength(SOCIAL_M2_LEVEL_COUNT[level]);
    expect(countContent("sociales",topic.name,subtopic,mode,level)).toBe(({principiante:30,intermedio:50,avanzado:70})[level]);
    expect(verifyScienceCell(all,level,mode,socialFacts(subtopic))).toEqual([]);
    for(const item of all){expect(ids.has(item.id)).toBe(false);ids.add(item.id);}
    old+=prev.length;newCount+=fresh.length;allCount+=all.length;
   }
  expect(old).toBe(2700);expect(newCount).toBe(SOCIAL_M2_NEW_TOTAL);
  expect(allCount).toBe(SOCIAL_M2_TOTAL);expect(ids.size).toBe(6000);
 });
 it("sostiene dos partidas de diez rondas sin repetir en las 180 celdas",()=>{
  for(const t of SOCIAL_TOPICS)for(const s of t.subtopics)
   for(const mode of SOCIAL_MODES)for(const level of SOCIAL_LEVELS){
    const bank=socialM2Pool(t.name,s,level,mode),one=selectRotation(bank,emptyRotation(),10,()=>0.3);
    let history=emptyRotation();for(const x of one)history=recordRotation(history,x.id,true);
    const two=selectRotation(bank,history,10,()=>0.53);
    expect(one).toHaveLength(10);expect(two).toHaveLength(10);
    expect(new Set(one.map(x=>x.id)).size).toBe(10);
    expect(new Set(two.map(x=>x.id)).size).toBe(10);
    expect(two.every(x=>one.every(y=>x.id!==y.id))).toBe(true);
   }
 });
 it("rechaza claves incorrectas, fuente ajena, dos respuestas iguales y niveles falsos",()=>{
  const facts=socialFacts("Independencia");
  const x=socialM2NewPool("Historia de Honduras","Independencia","avanzado","quiz")[0];
  expect(verifyScienceItem(x,"avanzado","quiz",facts)).toEqual([]);
  expect(verifyScienceItem({...x,expected:"falsa"},"avanzado","quiz",facts)).toContain("Respuesta distinta al oráculo");
  expect(verifyScienceItem({...x,oracle:{...x.oracle,scenario:"fuente falsa"}},"avanzado","quiz",facts)).toContain("Afirmación sin anclaje en hechos curados");
  expect(verifyScienceItem({...x,options:[x.expected,x.expected,"x","y"]},"avanzado","quiz",facts)).toContain("Distractores o clave de selección inválida");
  expect(verifyScienceItem({...x,cognitiveStage:1},"avanzado","quiz",facts)).toContain("Metadatos cognitivos insuficientes");
  expect(()=>socialM2Model("falso","Independencia","principiante","quiz",0)).toThrow();
  expect(()=>socialM2Model("Historia de Honduras","Independencia","principiante","quiz",10)).toThrow();
 });
});
