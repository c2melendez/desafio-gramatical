import { recordPerfect, type Achievements, type Achievement, type Session } from "./game-session-contract";
export const ACHIEVEMENT_STORAGE_KEY = "academia-phuma:achievements:v1";
type StoragePort = Pick<Storage,"getItem"|"setItem">;
type ReadResult = {status:"ok"; achievements:Achievements} | {status:"unavailable"|"corrupt"; achievements:Achievements};
const object = (v: unknown): v is Record<string,unknown> => !!v && typeof v === "object" && !Array.isArray(v);
const date = (v:unknown): v is string => typeof v==="string" && Number.isFinite(Date.parse(v));
function validKey(k:string) {
  try {const x:unknown=JSON.parse(k);return Array.isArray(x)&&x.length===6&&x[0]===1&&x.slice(1).every(v=>typeof v==="string"&&v.trim().length>0)&&JSON.stringify(x)===k;} catch{return false;}
}
function validAchievement(v:unknown): v is Achievement {
  if (!object(v)||!date(v.firstPerfectAt)||!date(v.lastPerfectAt)||Date.parse(v.firstPerfectAt)>Date.parse(v.lastPerfectAt)||!object(v.attempts)) return false;
  const attempts=Object.entries(v.attempts);
  return attempts.length>0&&attempts.every(([id,version])=>id.trim().length>0&&typeof version==="string"&&version.trim().length>0)&&v.perfectRuns===attempts.length&&v.bestCorrect===10&&v.bestScore===170;
}
export function loadAchievements(storage:StoragePort):ReadResult {
  let raw:string|null;
  try {raw=storage.getItem(ACHIEVEMENT_STORAGE_KEY);} catch{return {status:"unavailable",achievements:{}};}
  if(raw===null)return {status:"ok",achievements:{}};
  try {
    const parsed:unknown=JSON.parse(raw);
    if(!object(parsed)||parsed.version!==1||!object(parsed.achievements)||!Object.entries(parsed.achievements).every(([k,v])=>validKey(k)&&validAchievement(v))) return {status:"corrupt",achievements:{}};
    return {status:"ok",achievements:parsed.achievements as Achievements};
  } catch{return {status:"corrupt",achievements:{}};}
}
export function persistPerfect(storage:StoragePort, session:Session, at:string):ReadResult {
  const read=loadAchievements(storage);
  // Never overwrite unreadable data or claim persistence after a storage error.
  if(read.status!=="ok")return read;
  const next=recordPerfect(read.achievements,session,at);
  if(next===read.achievements)return read;
  try {storage.setItem(ACHIEVEMENT_STORAGE_KEY,JSON.stringify({version:1,achievements:next}));return {status:"ok",achievements:next};}
  catch{return {status:"unavailable",achievements:read.achievements};}
}
