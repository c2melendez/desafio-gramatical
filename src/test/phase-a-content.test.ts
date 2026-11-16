import {describe,it,expect} from "vitest";
import {CONNECTOR_CASES} from "@/lib/connector-cases";
import {CONNECTOR_ERROR_CASES} from "@/lib/connector-error-cases";
import {CONNECTOR_EDITOR_CASES} from "@/lib/connector-editor-cases";
import {writingPool,writingItems} from "@/lib/writing";
import {coverageRows,coverageTotals,CONTENT_TARGET,CONTENT_STAGE_ONE,countContent} from "@/lib/coverage";
import {emptyRotation,rotationKey,parseRotation,selectRotation,recordRotation} from "@/lib/rotation";
import type {Level} from "@/lib/grammar";

describe("Fase A: metas, validez y rotación de contenido",()=>{
 it("cumple la primera meta 10/15/20 para el juego Conector correcto",()=>{
  expect(CONNECTOR_CASES).toHaveLength(36);
  expect(CONNECTOR_ERROR_CASES).toHaveLength(36);
  expect(CONNECTOR_EDITOR_CASES).toHaveLength(36);
  expect(new Set(CONNECTOR_CASES.map(q=>q.id)).size).toBe(36);
  for(const [level,count] of [["principiante",10],["intermedio",15],["avanzado",20]] as const){
   for(const mode of ["clasificar","quiz","construir"] as const){
    const pool=writingPool(level,"Conectores",mode);
    expect(pool).toHaveLength(count);
    expect(countContent("espanol","Redacción","Conectores",mode,level)).toBe(count);
   }
   expect(CONTENT_STAGE_ONE[level]).toBe(count);
   expect(CONTENT_TARGET[level]).toBeGreaterThan(count);
   for(const mode of ["clasificar","quiz","construir"] as const)expect(writingItems(level,"Conectores",mode)).toHaveLength(10);
  }
 });
 it("valida que distractores y claves de los 36 nuevos casos sean diferentes y completos",()=>{
  for(const q of CONNECTOR_CASES){
   expect(q.gap.split("___")).toHaveLength(2);
   expect(q.options).toHaveLength(4);
   expect(new Set(q.options).size).toBe(4);
   expect(q.options.filter(x=>x===q.connector)).toHaveLength(1);
   expect(q.explanation.length).toBeGreaterThan(40);
   expect(q.reviewStatus).toBe("editorial-draft");
  }
 });
 it("verifica contenido independiente y solución única de los otros dos juegos",()=>{
  for(const q of CONNECTOR_ERROR_CASES){
   expect(q.options).toHaveLength(4);
   expect(new Set(q.options).size).toBe(4);
   expect(q.options.filter(x=>x===q.correctConnector)).toHaveLength(1);
   expect(q.correctSentence.includes("«")).toBe(false);
   expect(q.flawed).toContain("«");
   expect(q.explanation.length).toBeGreaterThan(42);
  }
  for(const q of CONNECTOR_EDITOR_CASES){
   expect(q.steps).toHaveLength(3);
   expect(new Set(q.steps).size).toBe(3);
   expect(q.explanation.length).toBeGreaterThan(42);
  }
  const all=[...CONNECTOR_CASES,...CONNECTOR_ERROR_CASES,...CONNECTOR_EDITOR_CASES];
  expect(new Set(all.map(x=>x.id)).size).toBe(108);
 });
 it("rotación consume inéditos antes de repetir y después prioriza fallos",()=>{
  const items=Array.from({length:15},(_,i)=>({id:"item-"+i}));
  const key=rotationKey("espanol","Redacción","Conectores","quiz","intermedio");
  expect(key).toContain("Conectores");
  let state=emptyRotation();
  const first=selectRotation(items,state,10,()=>0.5);
  expect(new Set(first.map(x=>x.id)).size).toBe(10);
  for(const x of first)state=recordRotation(state,x.id,x.id!==first[0].id);
  const second=selectRotation(items,state,10,()=>0.5);
  expect(second.slice(0,5).every(x=>!state.seen.includes(x.id))).toBe(true);
  expect(second.slice(5).some(x=>x.id===first[0].id)).toBe(true);
  expect(parseRotation(JSON.stringify(state),items.map(x=>x.id))).toEqual(state);
  expect(parseRotation("{broken",items.map(x=>x.id))).toEqual(emptyRotation());
  expect(()=>selectRotation([...items,items[0]],emptyRotation(),2)).toThrow("duplicados");
 });
 it("una misma pregunta y nivel en distintos juegos tienen historiales de rotación separados",()=>{
  expect(rotationKey("espanol","Redacción","Conectores","quiz","intermedio"))
   .not.toBe(rotationKey("espanol","Redacción","Conectores","construir","intermedio"));
 });
 it("cobertura total auditable, sin presentar variantes compartidas como progreso completo",()=>{
  const rows=coverageRows();
  expect(rows).toHaveLength(810);
  const totals=coverageTotals();
  expect(totals.target).toBe(40500);
  expect(totals.stageOneComplete).toBeGreaterThanOrEqual(9);
  expect(rows.filter(x=>x.topic==="Redacción"&&x.subtopic==="Conectores").every(x=>x.stageOneComplete&&!x.complete)).toBe(true);
  expect(rows.some(x=>x.topic==="Literatura"&&x.available===0)).toBe(true);
 });
});
