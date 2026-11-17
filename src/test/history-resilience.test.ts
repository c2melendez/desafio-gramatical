import {afterEach,beforeEach,describe,expect,it,vi} from "vitest";
import {clearHistory,loadHistory,saveHistory,type HistoryEntry} from "@/lib/grammar";

const KEY="desafio-gramatical:historial";
const sample:HistoryEntry={
 date:"2026-11-17T00:00:00.000Z",mode:"quiz",level:"principiante",
 score:10,correct:1,total:1,bestStreak:1,
};
describe("M0: persistencia e historial resiliente",()=>{
 beforeEach(()=>{vi.unstubAllGlobals();localStorage.clear();});
 afterEach(()=>{vi.unstubAllGlobals();});
 it("rechaza cargas corruptas sin perder compatibilidad",()=>{
  localStorage.setItem(KEY,"{");
  expect(loadHistory()).toEqual([]);
  localStorage.setItem(KEY,JSON.stringify({foo:1}));
  expect(loadHistory()).toEqual([]);
  localStorage.setItem(KEY,JSON.stringify([null,{foo:"bar"},sample]));
  expect(loadHistory()).toEqual([sample]);
 });
 it("conserva el registro más reciente y el límite de 100",()=>{
  for(let i=0;i<104;i++)saveHistory({...sample,score:i});
  const h=loadHistory();
  expect(h).toHaveLength(100);
  expect(h[0].score).toBe(103);
  expect(h[h.length-1].score).toBe(4);
 });
 it("no interrumpe la partida si el navegador bloquea el almacenamiento",()=>{
  vi.stubGlobal("localStorage",{
   getItem(){throw new Error("SecurityError")},
   setItem(){throw new Error("SecurityError")},
   removeItem(){throw new Error("SecurityError")},
  });
  expect(loadHistory()).toEqual([]);
  expect(()=>saveHistory(sample)).not.toThrow();
  expect(()=>clearHistory()).not.toThrow();
 });
 it("permite borrar de forma explícita el historial",()=>{
  saveHistory(sample);
  expect(loadHistory()).toHaveLength(1);
  clearHistory();
  expect(loadHistory()).toEqual([]);
 });
});
