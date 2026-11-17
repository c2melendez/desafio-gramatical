import {describe,it,expect} from "vitest";
import {CONNECTOR_CASES} from "@/lib/connector-cases";
import {CONNECTOR_ERROR_CASES} from "@/lib/connector-error-cases";
import {CONNECTOR_EDITOR_CASES} from "@/lib/connector-editor-cases";
import {CORRECTION_ERROR_CASES} from "@/lib/correction-error-cases";
import {CORRECTION_CHOICE_CASES} from "@/lib/correction-choice-cases";
import {CORRECTION_EDITOR_CASES} from "@/lib/correction-editor-cases";
import {ORGANIZATION_ERROR_CASES} from "@/lib/organization-error-cases";
import {ORGANIZATION_CHOICE_CASES} from "@/lib/organization-choice-cases";
import {ORGANIZATION_EDITOR_CASES} from "@/lib/organization-editor-cases";
import {ELISION_ERROR_CASES} from "@/lib/elision-error-cases";
import {ELISION_CHOICE_CASES} from "@/lib/elision-choice-cases";
import {ELISION_EDITOR_CASES} from "@/lib/elision-editor-cases";
import {GENERALIZATION_ERROR_CASES} from "@/lib/generalization-error-cases";
import {GENERALIZATION_CHOICE_CASES} from "@/lib/generalization-choice-cases";
import {GENERALIZATION_EDITOR_CASES} from "@/lib/generalization-editor-cases";
import {writingPool as m1SourceWritingPool,writingItems} from "@/lib/writing";

const m1WritingPool=(...args:Parameters<typeof m1SourceWritingPool>)=>m1SourceWritingPool(...args).filter(q=>!q.id.startsWith("m2-")&&!q.id.startsWith("m3-"));
import {coverageRows,coverageTotals,CONTENT_TARGET,CONTENT_STAGE_ONE,countContent} from "@/lib/coverage";
import {emptyRotation,rotationKey,parseRotation,selectRotation,recordRotation} from "@/lib/rotation";
import type {Level} from "@/lib/grammar";

describe("Fase A: metas, validez y rotación de contenido",()=>{
 it("cumple la primera meta 10/15/20 para el juego Conector correcto",()=>{
  expect(CONNECTOR_CASES).toHaveLength(36);
  expect(CONNECTOR_ERROR_CASES).toHaveLength(36);
  expect(CONNECTOR_EDITOR_CASES).toHaveLength(36);
  expect(CORRECTION_ERROR_CASES).toHaveLength(36);
  expect(CORRECTION_CHOICE_CASES).toHaveLength(36);
  expect(CORRECTION_EDITOR_CASES).toHaveLength(36);
  expect(new Set(CONNECTOR_CASES.map(q=>q.id)).size).toBe(36);
  for(const [level,count] of [["principiante",10],["intermedio",15],["avanzado",20]] as const){
   for(const subtopic of ["Conectores","Corrección","Organización textual","Elisión y adición","Generalización e integración"] as const)for(const mode of ["clasificar","quiz","construir"] as const){
    const pool=m1WritingPool(level,subtopic,mode);
    expect(pool).toHaveLength(count);
    expect(countContent("espanol","Redacción",subtopic,mode,level)).toBeGreaterThanOrEqual(count);
   }
   expect(CONTENT_STAGE_ONE[level]).toBe(count);
   expect(CONTENT_TARGET[level]).toBeGreaterThan(count);
   for(const subtopic of ["Conectores","Corrección"] as const)for(const mode of ["clasificar","quiz","construir"] as const)expect(writingItems(level,subtopic,mode)).toHaveLength(10);
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
 it("verifica 108 reactivos nuevos y exclusivos de los tres juegos de Corrección",()=>{
  const sets=[CORRECTION_ERROR_CASES,CORRECTION_CHOICE_CASES,CORRECTION_EDITOR_CASES];
  for(const cases of sets){
   expect(cases).toHaveLength(36);
   expect(new Set(cases.map(x=>x.id)).size).toBe(36);
   expect(cases.filter(x=>x.level==="principiante")).toHaveLength(7);
   expect(cases.filter(x=>x.level==="intermedio")).toHaveLength(12);
   expect(cases.filter(x=>x.level==="avanzado")).toHaveLength(17);
  }
  for(const q of CORRECTION_ERROR_CASES){
   expect(q.flawed).toContain("«");
   expect(q.correctSentence).not.toContain("«");
   expect(q.options).toHaveLength(4);
   expect(new Set(q.options).size).toBe(4);
   expect(q.options.filter(x=>x===q.correctConnector)).toHaveLength(1);
   expect(q.explanation.length).toBeGreaterThan(42);
  }
  for(const q of CORRECTION_CHOICE_CASES){
   expect(q.gap.split("___")).toHaveLength(2);
   expect(new Set(q.options).size).toBe(4);
   expect(q.options.filter(x=>x===q.connector)).toHaveLength(1);
  }
  for(const q of CORRECTION_EDITOR_CASES){
   expect(q.steps).toHaveLength(3);
   expect(new Set(q.steps).size).toBe(3);
   expect(q.explanation.length).toBeGreaterThan(45);
  }
  const ids=sets.flatMap(x=>x.map(y=>y.id));
  expect(new Set(ids).size).toBe(108);
 });
 it("tiene tres bancos diferentes para Organización textual y alcanza el núcleo 10/15/20",()=>{
  const banks=[ORGANIZATION_ERROR_CASES,ORGANIZATION_CHOICE_CASES,ORGANIZATION_EDITOR_CASES];
  for(const bank of banks){
   expect(bank).toHaveLength(36);
   expect(new Set(bank.map(q=>q.id)).size).toBe(36);
   expect(bank.filter(q=>q.level==="principiante")).toHaveLength(7);
   expect(bank.filter(q=>q.level==="intermedio")).toHaveLength(12);
   expect(bank.filter(q=>q.level==="avanzado")).toHaveLength(17);
  }
  const all=banks.flatMap(bank=>bank.map(q=>q.id));
  expect(new Set(all).size).toBe(108);
  for(const q of ORGANIZATION_ERROR_CASES){
   expect(q.options).toHaveLength(4);expect(new Set(q.options).size).toBe(4);
   expect(q.options.filter(o=>o===q.correctConnector)).toHaveLength(1);
   expect(q.explanation.length).toBeGreaterThan(50);
  }
  for(const q of ORGANIZATION_CHOICE_CASES){
   expect(q.gap.split("___")).toHaveLength(2);expect(new Set(q.options).size).toBe(4);
   expect(q.options.filter(o=>o===q.connector)).toHaveLength(1);
  }
  for(const q of ORGANIZATION_EDITOR_CASES){
   expect(q.steps).toHaveLength(3);expect(new Set(q.steps).size).toBe(3);
  }
  for(const level of ["principiante","intermedio","avanzado"] as const)
   for(const mode of ["clasificar","quiz","construir"] as const){
    expect(writingItems(level,"Organización textual",mode)).toHaveLength(10);
    expect(m1WritingPool(level,"Organización textual",mode)).toHaveLength(CONTENT_STAGE_ONE[level]);
   }
 });
 it("Elisión y adición: tres bancos independientes de 7/12/17 ejercicios originales",()=>{
  const banks=[ELISION_ERROR_CASES,ELISION_CHOICE_CASES,ELISION_EDITOR_CASES];
  for(const bank of banks){
   expect(bank).toHaveLength(36);
   expect(bank.filter(q=>q.level==="principiante")).toHaveLength(7);
   expect(bank.filter(q=>q.level==="intermedio")).toHaveLength(12);
   expect(bank.filter(q=>q.level==="avanzado")).toHaveLength(17);
  }
  const ids=banks.flatMap(bank=>bank.map(q=>q.id));
  expect(new Set(ids).size).toBe(108);
  for(const q of ELISION_ERROR_CASES){
   expect(q.options).toHaveLength(4);
   expect(new Set(q.options).size).toBe(4);
   expect(q.options.filter(x=>x===q.correctConnector)).toHaveLength(1);
  }
  for(const q of ELISION_CHOICE_CASES){
   expect(q.gap.split("___")).toHaveLength(2);
   expect(new Set(q.options).size).toBe(4);
   expect(q.options.filter(x=>x===q.connector)).toHaveLength(1);
  }
  for(const q of ELISION_EDITOR_CASES){
   expect(q.steps).toHaveLength(3);
   expect(new Set(q.steps).size).toBe(3);
  }
  for(const [level,count] of [["principiante",10],["intermedio",15],["avanzado",20]] as const){
   for(const mode of ["clasificar","quiz","construir"] as const){
    expect(m1WritingPool(level,"Elisión y adición",mode)).toHaveLength(count);
    expect(writingItems(level,"Elisión y adición",mode)).toHaveLength(10);
   }
  }
 });
 it("Generalización e integración: 108 casos y los tres núcleos 10/15/20",()=>{
  const banks=[GENERALIZATION_ERROR_CASES,GENERALIZATION_CHOICE_CASES,GENERALIZATION_EDITOR_CASES];
  for(const bank of banks){
   expect(bank).toHaveLength(36);
   expect(bank.filter(q=>q.level==="principiante")).toHaveLength(7);
   expect(bank.filter(q=>q.level==="intermedio")).toHaveLength(12);
   expect(bank.filter(q=>q.level==="avanzado")).toHaveLength(17);
  }
  expect(new Set(banks.flatMap(x=>x.map(q=>q.id))).size).toBe(108);
  for(const q of GENERALIZATION_ERROR_CASES){
   expect(q.options).toHaveLength(4);
   expect(new Set(q.options).size).toBe(4);
   expect(q.options.filter(x=>x===q.correctConnector)).toHaveLength(1);
  }
  for(const q of GENERALIZATION_CHOICE_CASES){
   expect(q.gap.split("___")).toHaveLength(2);
   expect(new Set(q.options).size).toBe(4);
   expect(q.options.filter(x=>x===q.connector)).toHaveLength(1);
  }
  for(const q of GENERALIZATION_EDITOR_CASES){
   expect(q.steps).toHaveLength(3);
   expect(new Set(q.steps).size).toBe(3);
  }
  for(const [level,count] of [["principiante",10],["intermedio",15],["avanzado",20]] as const)
   for(const mode of ["clasificar","quiz","construir"] as const){
    expect(m1WritingPool(level,"Generalización e integración",mode)).toHaveLength(count);
    expect(writingItems(level,"Generalización e integración",mode)).toHaveLength(10);
   }
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
  expect(totals.stageOneComplete).toBeGreaterThanOrEqual(45);
  expect(rows.filter(x=>x.topic==="Redacción"&&["Conectores","Corrección","Organización textual","Elisión y adición","Generalización e integración"].includes(x.subtopic)).every(x=>x.stageOneComplete&&x.complete)).toBe(true);
  expect(rows.filter(x=>x.topic==="Literatura").every(x=>x.available>=x.stageOne)).toBe(true);
  expect(rows.some(x=>x.area==="matematicas"&&x.available===0)).toBe(true);
 });
});
