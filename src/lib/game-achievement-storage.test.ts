import { describe, it, expect } from "vitest";
import { startSession, submitRound, achievementKey } from "./game-session-contract";
import { ACHIEVEMENT_STORAGE_KEY, loadAchievements, persistPerfect } from "./game-achievement-storage";
const context={area:"espanol",topic:"gramatica",subtopic:"categorias",game:"quiz",level:"principiante"};
const ids=Array.from({length:10},(_,i)=>String(i));
const date="2026-11-24T00:00:00Z";
const play=(id="a",wrong=-1)=>ids.reduce((s,item,i)=>submitRound(s,item,[i!==wrong]),startSession(id,context,"v1",ids));
function memory(initial:string|null=null) {
 let raw=initial;
 return {getItem:(key:string)=>key===ACHIEVEMENT_STORAGE_KEY?raw:null,setItem:(key:string,value:string)=>{if(key===ACHIEVEMENT_STORAGE_KEY)raw=value;}};
}
describe("C07: almacenamiento de logros",()=>{
 it("recupera el logro desde almacenamiento tras una nueva lectura",()=>{
  const store=memory(); expect(persistPerfect(store,play(),date).status).toBe("ok");
  expect(loadAchievements(store).achievements[achievementKey(context)]).toMatchObject({perfectRuns:1,bestCorrect:10,bestScore:170});
 });
 it("no duplica intentos ni elimina el logro tras fallar",()=>{
  const store=memory();persistPerfect(store,play(),date);persistPerfect(store,play(),date);persistPerfect(store,play("b",1),date);
  expect(loadAchievements(store).achievements[achievementKey(context)].perfectRuns).toBe(1);
  persistPerfect(store,play("c"),date);expect(loadAchievements(store).achievements[achievementKey(context)].perfectRuns).toBe(2);
 });
 it.each(["{","null","[]",'{"version":2,"achievements":{}}','{"version":1,"achievements":{"bad":{}}}'])("no sobrescribe datos inválidos: %s",raw=>{
  const store=memory(raw);expect(persistPerfect(store,play(),date).status).toBe("corrupt");expect(store.getItem(ACHIEVEMENT_STORAGE_KEY)).toBe(raw);
 });
 it("reporta lectura y escritura bloqueadas sin inventar un logro",()=>{
  const blocked={getItem:()=>{throw Error("blocked");},setItem:()=>{throw Error("blocked");}};
  expect(persistPerfect(blocked,play(),date)).toEqual({status:"unavailable",achievements:{}});
  const quota={getItem:()=>null,setItem:()=>{throw Error("quota");}};
  expect(persistPerfect(quota,play(),date)).toEqual({status:"unavailable",achievements:{}});
 });
 it("no guarda partidas incompletas ni resultados sin aprobación",()=>{
  const store=memory();persistPerfect(store,startSession("p",context,"v1",ids),date);persistPerfect(store,play("b",0),date);
  expect(store.getItem(ACHIEVEMENT_STORAGE_KEY)).toBeNull();
 });
});
