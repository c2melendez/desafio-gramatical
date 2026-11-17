import {describe,it,expect,afterEach} from "vitest";
import {WRITING_BANK,writingPool,writingItems,migrateWritingState} from "@/lib/writing";
import {rotationKey,readRotation,writeRotation,emptyRotation} from "@/lib/rotation";
import type {Mode} from "@/lib/grammar";
afterEach(()=>localStorage.clear());
describe("M1: identidad global y migración de redacción",()=>{
 it("cada semilla tiene un ID distinto en sus tres modalidades",()=>{
  const modes:Mode[]=["quiz","clasificar","construir"];
  const all=modes.flatMap(mode=>writingPool("principiante","Conectores",mode).filter(x=>x.id.endsWith("--"+mode)));
  expect(all).toHaveLength(WRITING_BANK.filter(x=>x.level==="principiante"&&x.subtopic==="Conectores").length*3);
  expect(new Set(all.map(x=>x.id)).size).toBe(all.length);
 });
 it("preserva el registro de rotación anterior sin contar como nuevo",()=>{
  const mode="construir" as const,subtopic="Corrección" as const,level="avanzado" as const;
  const ids=writingPool(level,subtopic,mode).map(x=>x.id);
  const old=ids.find(x=>x.endsWith("--"+mode))!.slice(0,-(mode.length+2));
  const state={version:1 as const,seen:[old],incorrect:[old],last:[old]};
  const key=rotationKey("espanol","Redacción",subtopic,mode,level);
  writeRotation(key,state);
  writingItems(level,subtopic,mode);
  expect(readRotation(key,ids)).toEqual({...state,seen:[old+"--"+mode],incorrect:[old+"--"+mode],last:[old+"--"+mode]});
 });
 it("es idempotente y descarta claves cruzadas de modalidad",()=>{
  const ids=writingPool("intermedio","Elisión y adición","quiz").map(x=>x.id);
  const s={...emptyRotation(),seen:[ids[0],"writing-otro","writing-intermedio-10-1--clasificar"]};
  const once=migrateWritingState(s,ids,"quiz");
  expect(once.seen).toEqual([ids[0]]);
  expect(migrateWritingState(once,ids,"quiz")).toEqual(once);
 });
});
