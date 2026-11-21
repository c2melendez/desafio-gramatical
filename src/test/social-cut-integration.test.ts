import {describe,it,expect} from "vitest";
import {SOCIAL_TOPICS,SOCIAL_SUBTOPICS,SOCIAL_MODES,SOCIAL_LEVELS,socialFacts,socialPool} from "@/lib/social-m1";
import {socialM2Pool} from "@/lib/social-m2";
import {socialM3Pool,SOCIAL_M3_LEVEL_COUNT} from "@/lib/social-m3";
import {validateSocialSearch,DEFAULT_SOCIAL_SUBTOPIC} from "@/lib/social-route";
import {learningDescription,studyReturn} from "@/lib/study-context";
import {countContent,coverageRows} from "@/lib/coverage";
import {availableModule} from "@/lib/phuma-catalog";
import {ROUNDS_PER_GAME} from "@/components/games/GameSessionHeader";
import {emptyRotation,parseRotation,recordRotation,rotationKey,selectRotation} from "@/lib/rotation";
import {verifyScienceCell} from "@/lib/science-m1-verifier";
describe("CORTE Ciencias Sociales: 180 combinaciones y 9000 IDs válidos",()=>{
 it("rehidrata una ruta /sociales válida ante búsqueda vacía o maliciosa",()=>{
  expect(DEFAULT_SOCIAL_SUBTOPIC).toBe("Independencia");
  expect(validateSocialSearch({})).toEqual({subtema:"Independencia",modo:"clasificar",nivel:"principiante"});
  expect(validateSocialSearch({subtema:"Célula",modo:"x",nivel:"desconocido"})).toEqual(validateSocialSearch({}));
  expect(validateSocialSearch({subtema:null,modo:17,nivel:[]})).toEqual(validateSocialSearch({}));
  for(const sub of SOCIAL_SUBTOPICS)for(const mode of SOCIAL_MODES)for(const level of SOCIAL_LEVELS)
   expect(validateSocialSearch({subtema:sub,modo:mode,nivel:level})).toEqual({subtema:sub,modo, nivel:level});
 });
 it("usa una competencia específica por cada subtema y mantiene navegación contextual",()=>{
  for(const topic of SOCIAL_TOPICS)for(const subtopic of topic.subtopics){
   const rule=learningDescription("sociales",topic.name,subtopic);
   expect(rule.length).toBeGreaterThan(65);
   expect(rule).not.toContain("En «"+subtopic+"»");
   expect(rule).not.toMatch(/módulo|CI|auditoría|ampliación M3/i);
   expect(studyReturn(topic.name,subtopic,"quiz","avanzado","sociales"))
     .toEqual({area:"sociales",tema:topic.name,subtema:subtopic,modo:"quiz",nivel:"avanzado"});
  }
 });
 it("verifica el 100% de celdas, IDs y preservación de todos los ejercicios M1/M2",()=>{
  expect(ROUNDS_PER_GAME).toBe(10);
  expect(SOCIAL_SUBTOPICS).toHaveLength(20);
  const rows=coverageRows().filter(r=>r.area==="sociales");expect(rows).toHaveLength(180);
  let count=0;const ids=new Set<string>();
  for(const topic of SOCIAL_TOPICS)for(const subtopic of topic.subtopics)
   for(const mode of SOCIAL_MODES)for(const level of SOCIAL_LEVELS){
    const bank=socialM3Pool(topic.name,subtopic,level,mode),
      m1=socialPool(topic.name,subtopic,level,mode),
      m2=socialM2Pool(topic.name,subtopic,level,mode);
    expect(bank.slice(0,m1.length)).toEqual(m1);
    expect(bank.slice(0,m2.length)).toEqual(m2);
    expect(bank).toHaveLength(SOCIAL_M3_LEVEL_COUNT[level]);
    expect(countContent("sociales",topic.name,subtopic,mode,level)).toBe(bank.length);
    expect(availableModule("sociales",topic.name,subtopic)).toBe(true);
    expect(verifyScienceCell(bank,level,mode,socialFacts(subtopic))).toEqual([]);
    for(const item of bank){expect(ids.has(item.id)).toBe(false);ids.add(item.id);}
    count+=bank.length;
   }
  expect(count).toBe(9000);expect(ids.size).toBe(9000);
  expect(rows.every(r=>r.complete&&r.available===SOCIAL_M3_LEVEL_COUNT[r.level])).toBe(true);
 });
 it("ejecuta dos sesiones únicas de diez rondas con progreso restaurado en todas las celdas",()=>{
  for(const topic of SOCIAL_TOPICS)for(const subtopic of topic.subtopics)
   for(const mode of SOCIAL_MODES)for(const level of SOCIAL_LEVELS){
    const bank=socialM3Pool(topic.name,subtopic,level,mode);
    const key=rotationKey("sociales",topic.name,subtopic,mode,level);
    expect(key).not.toBe(rotationKey("naturales",topic.name,subtopic,mode,level));
    const first=selectRotation(bank,emptyRotation(),ROUNDS_PER_GAME,()=>0.24);
    let progress=emptyRotation();
    for(const item of first)progress=recordRotation(progress,item.id,true);
    const restored=parseRotation(JSON.stringify(progress),bank.map(x=>x.id));
    const second=selectRotation(bank,restored,ROUNDS_PER_GAME,()=>0.64);
    expect(first).toHaveLength(10);expect(second).toHaveLength(10);
    expect(new Set(first.map(x=>x.id)).size).toBe(10);
    expect(new Set(second.map(x=>x.id)).size).toBe(10);
    expect(second.every(x=>first.every(y=>x.id!==y.id))).toBe(true);
   }
 });
});