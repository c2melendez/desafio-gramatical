import {emptyLedger,recordRound,roundResult,type RoundLedger} from "./round-ledger";
export type AchievementScope={area:string;tema:string;subtema:string;modo:string;nivel:string};
export type PerfectAchievement={scope:AchievementScope;firstPerfectAt:string;lastPerfectAt:string;perfectRuns:number;bestCorrect:10;bestScore:number;lastAttemptId:string};
export const ACHIEVEMENT_STORAGE="desafio-gramatical:perfect:v1";
export function achievementKey(s:AchievementScope){return JSON.stringify([1,s.area,s.tema,s.subtema,s.modo,s.nivel]);}
function validScope(s:AchievementScope){return !!s&&[s.area,s.tema,s.subtema,s.modo,s.nivel].every(x=>typeof x==="string"&&x.trim().length>0);}
export function loadAchievements():Record<string,PerfectAchievement>{
 try{
  const raw=JSON.parse(localStorage.getItem(ACHIEVEMENT_STORAGE)||"{}");
  if(!raw||typeof raw!=="object"||Array.isArray(raw))return {};
  return Object.fromEntries(Object.entries(raw).filter(([k,v])=>{
   const a=v as PerfectAchievement;
   return a&&validScope(a.scope)&&achievementKey(a.scope)===k&&a.bestCorrect===10&&Number.isSafeInteger(a.perfectRuns)&&a.perfectRuns>0&&Number.isFinite(a.bestScore)&&typeof a.firstPerfectAt==="string"&&typeof a.lastPerfectAt==="string"&&typeof a.lastAttemptId==="string";
  })) as Record<string,PerfectAchievement>;
 }catch{return {};}
}
export function savePerfect(scope:AchievementScope,ledger:RoundLedger,attemptId:string,date=new Date().toISOString()):boolean{
 if(!validScope(scope)||!attemptId||!Number.isFinite(Date.parse(date)))return false;
 const verified=ledger.events.reduce(recordRound,emptyLedger());
 if(ledger.events.length!==10||!roundResult(verified).approved100)return false;
 try{
  const all=loadAchievements(),key=achievementKey(scope),old=all[key];
  if(old?.lastAttemptId===attemptId)return true;
  all[key]={scope,firstPerfectAt:old?.firstPerfectAt??date,lastPerfectAt:date,perfectRuns:(old?.perfectRuns??0)+1,bestCorrect:10,bestScore:Math.max(old?.bestScore??0,verified.score),lastAttemptId:attemptId};
  localStorage.setItem(ACHIEVEMENT_STORAGE,JSON.stringify(all));return true;
 }catch{return false;}
}
export function newAttemptId(){return globalThis.crypto.randomUUID();}
