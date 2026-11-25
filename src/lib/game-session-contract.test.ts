import { describe, it, expect } from "vitest";
import { startSession, submitRound, sessionResult, achievementKey, recordPerfect, type Context } from "./game-session-contract";
const context: Context = {area:"espanol",topic:"gramatica",subtopic:"categorias",game:"quiz",level:"principiante"};
const ids = Array.from({length:10},(_,i)=>"item-"+i);
const start = (attemptId="a", c=context) => startSession(attemptId,c,"v1",ids);
function play(wrong=-1, assisted=-1, attemptId="a", c=context) {
  return ids.reduce((s,id,i)=>submitRound(s,id,[i!==wrong],i===assisted),start(attemptId,c));
}
describe("C06: contrato de dominio",()=>{
  it("rechaza bancos incompletos, excesivos o repetidos",()=>{
    for (const bank of [ids.slice(0,9),[...ids,"extra"],[...ids.slice(0,9),ids[0]]])
      expect(()=>startSession("a",context,"v1",bank)).toThrow();
  });
  it("10/10 sin ayuda: 100%, 170 puntos y racha 10",()=>{
    expect(sessionResult(play())).toEqual({attempted:10,correct:10,score:170,streak:10,bestStreak:10,finished:true,accuracy:100,approved100:true});
  });
  it("9/10 y 8/10 no aprueban aunque haya bonificación",()=>{
    expect(sessionResult(play(9))).toMatchObject({correct:9,accuracy:90,approved100:false});
    const s=ids.reduce((s,id,i)=>submitRound(s,id,[i>1]),start());
    expect(sessionResult(s)).toMatchObject({correct:8,accuracy:80,approved100:false});
  });
  it("una ayuda invalidante impide aprobar",()=>expect(sessionResult(play(-1,0))).toMatchObject({correct:9,approved100:false}));
  it("consolida decisiones parciales en una ronda y no permite repetirla",()=>{
    const s=submitRound(start(),ids[0],[true,true,false]);
    expect(sessionResult(s)).toMatchObject({attempted:1,correct:0,score:0,accuracy:null,finished:false});
    expect(submitRound(s,ids[0],[true])).toBe(s);
    expect(submitRound(s,ids[2],[true])).toBe(s);
    expect(submitRound(s,ids[1],[])).toBe(s);
  });
  it("no permite ronda once ni logro parcial",()=>{
    const s=play(); expect(submitRound(s,"extra",[true])).toBe(s);
    expect(recordPerfect({},start(),"2026-11-24T00:00:00Z")).toEqual({});
  });
  it("conserva logro histórico, deduplica intento y separa dimensiones",()=>{
    const date="2026-11-24T00:00:00Z", s=play(), saved=recordPerfect({},s,date);
    expect(saved[achievementKey(context)]).toMatchObject({perfectRuns:1,bestCorrect:10,bestScore:170});
    expect(recordPerfect(saved,s,date)).toBe(saved);
    expect(recordPerfect(saved,play(0,-1,"b"),date)).toBe(saved);
    expect(recordPerfect(saved,play(-1,-1,"c"),date)[achievementKey(context)].perfectRuns).toBe(2);
    for(const dimension of Object.keys(context) as (keyof Context)[]) {
      const other={...context,[dimension]:"other"};
      expect(achievementKey(other)).not.toBe(achievementKey(context));
      expect(saved[achievementKey(other)]).toBeUndefined();
    }
  });
});
