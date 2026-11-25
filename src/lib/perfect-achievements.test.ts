// @vitest-environment jsdom
import {beforeEach,describe,it,expect} from "vitest";
import {emptyLedger,recordRound} from "./round-ledger";
import {achievementKey,loadAchievements,savePerfect,ACHIEVEMENT_STORAGE} from "./perfect-achievements";
const scope={area:"matematicas",tema:"Álgebra",subtema:"Funciones",modo:"quiz",nivel:"intermedio"};
const play=(wrong=-1,help=-1)=>Array.from({length:10},(_,i)=>({id:String(i),correct:i!==wrong,assistance:i===help})).reduce(recordRound,emptyLedger());
describe("C07 perfect achievements",()=>{
 beforeEach(()=>localStorage.clear());
 it("persists perfect runs and rejects failed retries",()=>{expect(savePerfect(scope,play(),"a")).toBe(true);expect(savePerfect(scope,play(9),"b")).toBe(false);expect(loadAchievements()[achievementKey(scope)].perfectRuns).toBe(1);});
 it("isolates each dimension",()=>{savePerfect(scope,play(),"a");for(const field of Object.keys(scope) as (keyof typeof scope)[])expect(loadAchievements()[achievementKey({...scope,[field]:"other"})]).toBeUndefined();});
 it("deduplicates immediate retry and tracks new perfect run",()=>{savePerfect(scope,play(),"a");savePerfect(scope,play(),"a");savePerfect(scope,play(),"b");expect(loadAchievements()[achievementKey(scope)].perfectRuns).toBe(2);});
 it("rejects assistance, incomplete games and malformed storage",()=>{expect(savePerfect(scope,play(-1,4),"a")).toBe(false);expect(savePerfect(scope,emptyLedger(),"b")).toBe(false);localStorage.setItem(ACHIEVEMENT_STORAGE,"{");expect(loadAchievements()).toEqual({});});
});
