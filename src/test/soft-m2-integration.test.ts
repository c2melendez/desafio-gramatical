import {describe,it,expect} from "vitest";
import {SOFT_TOPICS,SOFT_SUBTOPICS,SOFT_LEVELS,SOFT_MODES,softFacts,softPool} from "@/lib/soft-m1";
import {SOFT_M2_LEVEL_COUNT,SOFT_M2_NEW_PER_LEVEL,SOFT_M2_NEW_TOTAL,SOFT_M2_TOTAL,softM2Pool,softM2NewPool,softM2Model} from "@/lib/soft-m2";
import {verifyScienceCell,verifyScienceItem,scienceStimulusFingerprint} from "@/lib/science-m1-verifier";
import {countContent,coverageRows} from "@/lib/coverage";
import {SOFT_M3_LEVEL_COUNT} from "@/lib/soft-m3";
import {availableModule} from "@/lib/phuma-catalog";
import {emptyRotation,selectRotation,recordRotation,parseRotation,rotationKey} from "@/lib/rotation";
describe("Habilidades Blandas M2: integración cumulativa y regresión 2400 IDs",()=>{
 it("eleva a 20/35/45 las 72 celdas sin alterar los 1080 M1",()=>{
  expect(SOFT_SUBTOPICS).toHaveLength(8);
  let old=0,added=0,total=0;const seen=new Set<string>();
  for(const topic of SOFT_TOPICS)for(const sub of topic.subtopics)
   for(const mode of SOFT_MODES)for(const level of SOFT_LEVELS){
    const previous=softPool(topic.name,sub,level,mode);
    const fresh=softM2NewPool(topic.name,sub,level,mode);
    const bank=softM2Pool(topic.name,sub,level,mode);
    expect(bank.slice(0,previous.length)).toEqual(previous);
    expect(fresh.length).toBe(SOFT_M2_NEW_PER_LEVEL[level]);
    expect(bank.length).toBe(SOFT_M2_LEVEL_COUNT[level]);
    expect(countContent("blandas",topic.name,sub,mode,level)).toBe(SOFT_M3_LEVEL_COUNT[level]);
    expect(availableModule("blandas",topic.name,sub)).toBe(true);
    expect(verifyScienceCell(bank,level,mode,softFacts(sub))).toEqual([]);
    const stems=new Set(previous.map(scienceStimulusFingerprint));
    for(const x of fresh){expect(x.id.startsWith("blandas-m2-")).toBe(true);expect(stems.has(scienceStimulusFingerprint(x))).toBe(false);}
    for(const x of bank){expect(seen.has(x.id)).toBe(false);seen.add(x.id);expect(x.reviewStatus).toBe("editorial-draft");}
    old+=previous.length;added+=fresh.length;total+=bank.length;
   }
  expect(old).toBe(1080);expect(added).toBe(SOFT_M2_NEW_TOTAL);
  expect(total).toBe(SOFT_M2_TOTAL);expect(seen.size).toBe(2400);
  expect(coverageRows().filter(x=>x.area==="blandas")).toHaveLength(72);
 });
 it("realiza dos partidas de diez sin repeticiones, persistiendo la rotación en cada celda",()=>{
  for(const t of SOFT_TOPICS)for(const s of t.subtopics)for(const mode of SOFT_MODES)
   for(const level of SOFT_LEVELS){
    const bank=softM2Pool(t.name,s,level,mode);
    const first=selectRotation(bank,emptyRotation(),10,()=>0.31);
    let history=emptyRotation();for(const x of first)history=recordRotation(history,x.id,true);
    const second=selectRotation(bank,parseRotation(JSON.stringify(history),bank.map(x=>x.id)),10,()=>0.63);
    expect(first).toHaveLength(10);expect(second).toHaveLength(10);
    expect(new Set(first.map(x=>x.id)).size).toBe(10);
    expect(new Set(second.map(x=>x.id)).size).toBe(10);
    expect(second.every(x=>first.every(y=>y.id!==x.id))).toBe(true);
    expect(rotationKey("blandas",t.name,s,mode,level)).not.toBe(rotationKey("sociales",t.name,s,mode,level));
   }
 });
 it("detecta mutaciones de oráculo, opciones, dos mecánicas y etapa cognitiva",()=>{
  const x=softM2NewPool("Convivencia","Comunicación asertiva","avanzado","quiz")[0];
  const facts=softFacts("Comunicación asertiva");
  expect(verifyScienceItem(x,"avanzado","quiz",facts)).toEqual([]);
  expect(verifyScienceItem({...x,expected:"clase falsa"},"avanzado","quiz",facts)).toContain("Respuesta distinta al oráculo");
  expect(verifyScienceItem({...x,oracle:{...x.oracle,scenario:"caso falso"}},"avanzado","quiz",facts)).toContain("Afirmación sin anclaje en hechos curados");
  expect(verifyScienceItem({...x,options:[x.expected,x.expected,"A","B"]},"avanzado","quiz",facts)).toContain("Distractores o clave de selección inválida");
  expect(verifyScienceItem({...x,assertions:x.assertions.map(a=>({...a,truth:true}))},"avanzado","quiz",facts)).toContain("Clasificación ambigua o sin clave");
  expect(verifyScienceItem({...x,steps:[{...x.steps[0],answerIndex:9},x.steps[1]]},"avanzado","quiz",facts)).toContain("Construcción incorrecta");
  expect(verifyScienceItem({...x,cognitiveStage:1},"avanzado","quiz",facts)).toContain("Metadatos cognitivos insuficientes");
  expect(()=>softM2Model("Convivencia","Comunicación asertiva","principiante","quiz",10)).toThrow();
  expect(()=>softM2Model("Convivencia","Subtema inválido","avanzado","quiz",0)).toThrow();
 });
});
