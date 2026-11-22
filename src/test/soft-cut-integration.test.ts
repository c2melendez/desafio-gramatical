import {describe,it,expect} from "vitest";
import {SOFT_TOPICS,SOFT_SUBTOPICS,SOFT_MODES,SOFT_LEVELS,softPool,softFacts} from "@/lib/soft-m1";
import {softM2Pool} from "@/lib/soft-m2";
import {softM3Pool,SOFT_M3_LEVEL_COUNT} from "@/lib/soft-m3";
import {validateSoftSearch,DEFAULT_SOFT_SUBTOPIC} from "@/lib/soft-route";
import {learningDescription,studyReturn} from "@/lib/study-context";
import {coverageRows,countContent} from "@/lib/coverage";
import {availableModule} from "@/lib/phuma-catalog";
import {ROUNDS_PER_GAME} from "@/components/games/GameSessionHeader";
import {emptyRotation,parseRotation,recordRotation,rotationKey,selectRotation} from "@/lib/rotation";
import {verifyScienceCell} from "@/lib/science-m1-verifier";

describe("Corte técnico integral Habilidades Blandas: ocho subtemas y 3600 IDs",()=>{
 it("mantiene ruta segura y respeta las 72 combinaciones de búsqueda",()=>{
  expect(DEFAULT_SOFT_SUBTOPIC).toBe("Pensamiento crítico");
  expect(validateSoftSearch({})).toEqual({subtema:"Pensamiento crítico",modo:"clasificar",nivel:"principiante"});
  expect(validateSoftSearch({subtema:"Célula",modo:"inexistente",nivel:"x"})).toEqual(validateSoftSearch({}));
  expect(validateSoftSearch({subtema:null,modo:17,nivel:[]})).toEqual(validateSoftSearch({}));
  for(const sub of SOFT_SUBTOPICS)for(const mode of SOFT_MODES)for(const level of SOFT_LEVELS)
   expect(validateSoftSearch({subtema:sub,modo:mode,nivel:level})).toEqual({subtema:sub,modo:mode,nivel:level});
 });
 it("explica competencias transversales concretas, conserva selección de origen",()=>{
  for(const t of SOFT_TOPICS)for(const sub of t.subtopics){
   const desc=learningDescription("blandas",t.name,sub);
   expect(desc.length).toBeGreaterThanOrEqual(60);
   expect(desc).not.toContain("En «"+sub+"»");
   expect(studyReturn(t.name,sub,"quiz","avanzado","blandas"))
    .toEqual({area:"blandas",tema:t.name,subtema:sub,modo:"quiz",nivel:"avanzado"});
  }
 });
 it("valida integridad de los 3600 IDs y preserva literalmente los 2400 anteriores",()=>{
  expect(ROUNDS_PER_GAME).toBe(10);
  expect(SOFT_SUBTOPICS).toHaveLength(8);
  expect(coverageRows().filter(x=>x.area==="blandas")).toHaveLength(72);
  const ids=new Set<string>();let records=0;
  for(const t of SOFT_TOPICS)for(const sub of t.subtopics)
   for(const mode of SOFT_MODES)for(const level of SOFT_LEVELS){
    const one=softPool(t.name,sub,level,mode),two=softM2Pool(t.name,sub,level,mode),all=softM3Pool(t.name,sub,level,mode);
    expect(all.slice(0,one.length)).toEqual(one);expect(all.slice(0,two.length)).toEqual(two);
    expect(all).toHaveLength(SOFT_M3_LEVEL_COUNT[level]);
    expect(countContent("blandas",t.name,sub,mode,level)).toBe(all.length);
    expect(availableModule("blandas",t.name,sub)).toBe(true);
    expect(verifyScienceCell(all,level,mode,softFacts(sub))).toEqual([]);
    for(const x of all){expect(ids.has(x.id)).toBe(false);ids.add(x.id);expect(x.source).toBe("catalogo-practica-complementaria");}
    records+=all.length;
   }
  expect(records).toBe(3600);expect(ids.size).toBe(3600);
 });
 it("usa dos partidas sin repeticiones y restaura el historial en cada celda",()=>{
  for(const t of SOFT_TOPICS)for(const sub of t.subtopics)
   for(const mode of SOFT_MODES)for(const level of SOFT_LEVELS){
    const items=softM3Pool(t.name,sub,level,mode);
    expect(rotationKey("blandas",t.name,sub,mode,level))
     .not.toBe(rotationKey("sociales",t.name,sub,mode,level));
    const first=selectRotation(items,emptyRotation(),10,()=>0.29);
    let history=emptyRotation();for(const x of first)history=recordRotation(history,x.id,true);
    const second=selectRotation(items,parseRotation(JSON.stringify(history),items.map(x=>x.id)),10,()=>0.71);
    expect(first).toHaveLength(10);expect(second).toHaveLength(10);
    expect(new Set(first.map(x=>x.id)).size).toBe(10);
    expect(new Set(second.map(x=>x.id)).size).toBe(10);
    expect(second.every(x=>first.every(y=>x.id!==y.id))).toBe(true);
   }
 });
});
