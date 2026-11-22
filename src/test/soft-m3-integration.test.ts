import {describe,it,expect} from "vitest";
import {SOFT_TOPICS,SOFT_SUBTOPICS,SOFT_LEVELS,SOFT_MODES,softPool,softFacts} from "@/lib/soft-m1";
import {softM2Pool} from "@/lib/soft-m2";
import {SOFT_M3_LEVEL_COUNT,SOFT_M3_NEW_PER_LEVEL,SOFT_M3_NEW_TOTAL,SOFT_M3_TOTAL,softM3NewPool,softM3Pool,softM3Model} from "@/lib/soft-m3";
import {verifyScienceItem,verifyScienceCell,scienceStimulusFingerprint} from "@/lib/science-m1-verifier";
import {countContent,coverageRows} from "@/lib/coverage";
import {availableModule} from "@/lib/phuma-catalog";
import {emptyRotation,selectRotation,recordRotation,parseRotation,rotationKey} from "@/lib/rotation";
describe("Habilidades Blandas M3: 3600 registros técnicos, 72 celdas y herencia M1/M2",()=>{
 it("mantiene intactos 2400 ítems anteriores, añade 1200 y satisface 30/50/70 en todas las celdas",()=>{
  expect(SOFT_SUBTOPICS).toHaveLength(8);
  let m1=0,m2=0,m3=0,total=0;const seen=new Set<string>();
  for(const t of SOFT_TOPICS)for(const sub of t.subtopics)
   for(const mode of SOFT_MODES)for(const level of SOFT_LEVELS){
    const one=softPool(t.name,sub,level,mode),two=softM2Pool(t.name,sub,level,mode),
      added=softM3NewPool(t.name,sub,level,mode),bank=softM3Pool(t.name,sub,level,mode);
    expect(bank.slice(0,one.length)).toEqual(one);
    expect(bank.slice(0,two.length)).toEqual(two);
    expect(added).toHaveLength(SOFT_M3_NEW_PER_LEVEL[level]);
    expect(bank).toHaveLength(SOFT_M3_LEVEL_COUNT[level]);
    expect(countContent("blandas",t.name,sub,mode,level)).toBe(SOFT_M3_LEVEL_COUNT[level]);
    expect(availableModule("blandas",t.name,sub)).toBe(true);
    expect(verifyScienceCell(bank,level,mode,softFacts(sub))).toEqual([]);
    const stems=new Set(two.map(scienceStimulusFingerprint));
    for(const q of added){expect(q.id).toMatch(/^blandas-m3-/);expect(stems.has(scienceStimulusFingerprint(q))).toBe(false);}
    for(const q of bank){
     expect(seen.has(q.id)).toBe(false);seen.add(q.id);
     expect(q.source).toBe("catalogo-practica-complementaria");
     expect(q.reviewStatus).toBe("editorial-draft");
    }
    m1+=one.length;m2+=two.length;m3+=added.length;total+=bank.length;
   }
  expect(m1).toBe(1080);expect(m2).toBe(2400);
  expect(m3).toBe(SOFT_M3_NEW_TOTAL);expect(total).toBe(SOFT_M3_TOTAL);expect(seen.size).toBe(3600);
  expect(coverageRows().filter(x=>x.area==="blandas").length).toBe(72);
  expect(coverageRows().filter(x=>x.area==="blandas").every(x=>x.complete&&x.stageOneComplete)).toBe(true);
 });
 it("dos partidas de diez sin reutilizar IDs, con persistencia e independencia de área",()=>{
  for(const t of SOFT_TOPICS)for(const s of t.subtopics)for(const mode of SOFT_MODES)
   for(const level of SOFT_LEVELS){
    const bank=softM3Pool(t.name,s,level,mode);
    const first=selectRotation(bank,emptyRotation(),10,()=>0.31);
    let state=emptyRotation();for(const x of first)state=recordRotation(state,x.id,true);
    const restored=parseRotation(JSON.stringify(state),bank.map(x=>x.id));
    const second=selectRotation(bank,restored,10,()=>0.63);
    expect(first).toHaveLength(10);expect(second).toHaveLength(10);
    expect(new Set(first.map(x=>x.id)).size).toBe(10);expect(new Set(second.map(x=>x.id)).size).toBe(10);
    expect(second.every(x=>first.every(y=>y.id!==x.id))).toBe(true);
    expect(rotationKey("blandas",t.name,s,mode,level)).not.toBe(rotationKey("sociales",t.name,s,mode,level));
   }
 });
 it("falla al manipular oráculo, selección, clasificación, construcción o metadatos",()=>{
  const facts=softFacts("Comunicación asertiva"),
   x=softM3NewPool("Convivencia","Comunicación asertiva","avanzado","quiz")[0];
  expect(verifyScienceItem(x,"avanzado","quiz",facts)).toEqual([]);
  expect(verifyScienceItem({...x,expected:"otra respuesta"},"avanzado","quiz",facts).length).toBeGreaterThan(0);
  expect(verifyScienceItem({...x,oracle:{...x.oracle,scenario:"hecho inventado"}},"avanzado","quiz",facts).length).toBeGreaterThan(0);
  expect(verifyScienceItem({...x,options:[x.expected,x.expected,"A","B"]},"avanzado","quiz",facts).length).toBeGreaterThan(0);
  expect(verifyScienceItem({...x,assertions:x.assertions.map(a=>({...a,truth:true}))},"avanzado","quiz",facts).length).toBeGreaterThan(0);
  expect(verifyScienceItem({...x,steps:[{...x.steps[0],answerIndex:99},x.steps[1]]},"avanzado","quiz",facts).length).toBeGreaterThan(0);
  expect(verifyScienceItem({...x,cognitiveStage:1},"avanzado","quiz",facts).length).toBeGreaterThan(0);
  expect(()=>softM3Model("Convivencia","Comunicación asertiva","principiante","quiz",10)).toThrow();
  expect(()=>softM3Model("Convivencia","inexistente","avanzado","quiz",0)).toThrow();
 });
});
