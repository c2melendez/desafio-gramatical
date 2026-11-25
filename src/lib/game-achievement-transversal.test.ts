import {describe,it,expect} from "vitest";
import {startSession,submitRound,sessionResult,achievementKey,type Context} from "./game-session-contract";
import {loadAchievements,persistPerfect,ACHIEVEMENT_STORAGE_KEY} from "./game-achievement-storage";
const contexts:Context[]=[
 ["espanol","Gramática y semántica","Categorías gramaticales"],
 ["espanol","Comprensión lectora","Idea principal"],
 ["espanol","Redacción","Corrección"],
 ["matematicas","Álgebra","Funciones"],
 ["naturales","Biología","Célula"],
 ["sociales","Historia","Historia"],
 ["blandas","Autogestión","Ética"],
 ["matematicas","Álgebra","Funciones · Laboratorio gráfico"],
 ["matematicas","Álgebra","Funciones · Laboratorio gráfico II"],
 ["matematicas","Geometría","Geometría · Laboratorio visual"],
 ["matematicas","Estadística y probabilidad","Estadística · Laboratorio visual"],
 ["matematicas","Estadística y probabilidad","Estadística · Laboratorio visual II"],
].map(([area,topic,subtopic])=>({area,topic,subtopic,game:"quiz",level:"principiante"}));
const ids=Array.from({length:10},(_,i)=>"q"+i);
const date="2026-11-24T00:00:00Z";
function storage(){const map=new Map<string,string>();return {getItem:(k:string)=>map.get(k)??null,setItem:(k:string,v:string)=>{map.set(k,v);}};}
function run(c:Context,id:string,wrong=-1,assisted=-1){
 return ids.reduce((s,q,i)=>submitRound(s,q,[i!==wrong],i===assisted),startSession(id,c,"v1",ids));
}
describe("C06/C07 transversal de dominio (contrato puro; no sustituye pruebas de rutas)",()=>{
 it.each(contexts)("aísla $area / $subtopic de las demás combinaciones",c=>{
  const store=storage();
  expect(persistPerfect(store,run(c,"a"),date).status).toBe("ok");
  const all=loadAchievements(store).achievements;
  expect(Object.keys(all)).toEqual([achievementKey(c)]);
  for(const other of contexts.filter(x=>x!==c))expect(all[achievementKey(other)]).toBeUndefined();
  for(const level of ["intermedio","avanzado"])expect(all[achievementKey({...c,level})]).toBeUndefined();
  for(const game of ["clasificar","construir"])expect(all[achievementKey({...c,game})]).toBeUndefined();
  persistPerfect(store,run(c,"b",0),date);
  persistPerfect(store,run(c,"c",-1,0),date);
  expect(loadAchievements(store).achievements[achievementKey(c)].perfectRuns).toBe(1);
 });
 it("verifica las 1024 secuencias binarias de diez rondas con oráculo independiente",()=>{
  for(let mask=0;mask<1024;mask++){
   const answers=ids.map((_,i)=>Boolean(mask&(1<<i)));
   const session=ids.reduce((s,q,i)=>submitRound(s,q,[answers[i]]),startSession("mask-"+mask,contexts[0],"v1",ids));
   let score=0,streak=0,best=0,correct=0;
   const bonuses=[10,12,14,16,18,20];
   for(const ok of answers){if(ok){score+=bonuses[Math.min(5,streak)];correct++;streak++;best=Math.max(best,streak);}else streak=0;}
   expect(sessionResult(session)).toEqual({attempted:10,correct,score,streak,bestStreak:best,finished:true,accuracy:correct*10,approved100:mask===1023});
  }
 });
 it("no depende de la retención de 100 intentos del historial",()=>{
  const store=storage();const c=contexts[0];
  persistPerfect(store,run(c,"first"),date);
  store.setItem("desafio-gramatical:historial",JSON.stringify(Array.from({length:100},()=>({correct:0}))));
  expect(loadAchievements(store).achievements[achievementKey(c)].perfectRuns).toBe(1);
  expect(store.getItem(ACHIEVEMENT_STORAGE_KEY)).not.toBeNull();
 });
});
