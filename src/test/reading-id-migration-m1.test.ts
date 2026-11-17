import {describe,it,expect,afterEach} from "vitest";
import {READING_BANK,readingItems,readingPool,migrateReadingState} from "@/lib/reading";
import {rotationKey,emptyRotation,readRotation,writeRotation} from "@/lib/rotation";
import type {Mode} from "@/lib/grammar";
afterEach(()=>localStorage.clear());
describe("M1: migración de IDs de lectura entre juegos",()=>{
 it("cada estímulo conserva IDs globalmente diferentes por modalidad",()=>{
  const all=(["clasificar","quiz","construir"] as Mode[]).flatMap(mode=>
   readingPool("principiante","Idea principal",mode).filter(x=>x.id.includes("--"+mode)));
  expect(all.length).toBe(READING_BANK.filter(x=>x.level==="principiante"&&x.subtopic==="Idea principal").length*3);
  expect(new Set(all.map(x=>x.id)).size).toBe(all.length);
 });
 it("migra vistos, errores y últimos sin borrar registros históricos",()=>{
  const mode="quiz" as const;
  const ids=readingPool("principiante","Idea principal",mode).map(x=>x.id);
  const old=ids.find(x=>x.endsWith("--"+mode))!.slice(0,-(mode.length+2));
  const original={version:1 as const,seen:[old],incorrect:[old],last:[old]};
  expect(migrateReadingState(original,ids,mode)).toEqual({
   version:1,seen:[old+"--"+mode],incorrect:[old+"--"+mode],last:[old+"--"+mode]
  });
  const key=rotationKey("espanol","Comprensión lectora","Idea principal",mode,"principiante");
  writeRotation(key,original);
  readingItems("principiante","Idea principal",mode);
  expect(readRotation(key,ids).seen).toContain(old+"--"+mode);
  expect(readRotation(key,ids).incorrect).toContain(old+"--"+mode);
 });
 it("es idempotente y rechaza IDs ajenos a la modalidad",()=>{
  const ids=readingPool("intermedio","Inferencias","clasificar").map(x=>x.id);
  const state={...emptyRotation(),seen:[ids[0],"reading-falso","reading-intermedio-3-1--quiz"]};
  const once=migrateReadingState(state,ids,"clasificar");
  expect(once.seen).toEqual([ids[0]]);
  expect(migrateReadingState(once,ids,"clasificar")).toEqual(once);
 });
});
