import {describe,it,expect} from "vitest";
import {emptyLedger,recordRound,roundResult,pointsForRound} from "./round-ledger";
const play=(wrong=-1,help=-1)=>Array.from({length:10},(_,i)=>({id:String(i),correct:i!==wrong,assistance:i===help})).reduce(recordRound,emptyLedger());
describe("C06 round ledger",()=>{
 it("perfect and points",()=>{const s=play();expect(roundResult(s)).toMatchObject({finished:true,accuracy:100,approved100:true,attempted:10});expect(s.score).toBe(170);expect(s.bestStreak).toBe(10);});
 it("nine correct never approves",()=>{for(let i=0;i<10;i++)expect(roundResult(play(i))).toMatchObject({accuracy:90,approved100:false});});
 it("help invalidates perfect",()=>{expect(roundResult(play(-1,3)).approved100).toBe(false);});
 it("duplicate and eleventh event are no-ops",()=>{const s=recordRound(emptyLedger(),{id:"a",correct:true});expect(recordRound(s,{id:"a",correct:false})).toBe(s);const full=play();expect(recordRound(full,{id:"11",correct:true})).toBe(full);});
 it("partial attempt has no accuracy or approval",()=>{expect(roundResult(recordRound(emptyLedger(),{id:"a",correct:true}))).toMatchObject({finished:false,accuracy:null,approved100:false});});
 it("streak resets and scoring is capped",()=>{expect(pointsForRound(20)).toBe(20);expect(play(9).streak).toBe(0);expect(play(0).bestStreak).toBe(9);});
});
