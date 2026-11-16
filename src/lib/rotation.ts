import type {Level,Mode} from "./grammar";
/** Historial de exposición/errores separado por subtema, juego y dificultad. */
export type RotationState={version:1;seen:string[];incorrect:string[];last:string[]};
export const ROTATION_PREFIX="phuma-play:rotation:v1:";
export function rotationKey(area:string,topic:string,subtopic:string,mode:Mode,level:Level){
 return ROTATION_PREFIX+[area,topic,subtopic,mode,level].map(encodeURIComponent).join(":");
}
export function emptyRotation():RotationState{return {version:1,seen:[],incorrect:[],last:[]}}
export function parseRotation(serialized:string|null,validIds:readonly string[]):RotationState{
 let source:unknown;try{source=serialized?JSON.parse(serialized):null}catch{return emptyRotation()}
 if(!source||typeof source!=="object")return emptyRotation();
 const s=source as Partial<RotationState>;
 const valid=new Set(validIds);
 const clean=(a:unknown)=>Array.isArray(a)?[...new Set(a.filter(x=>typeof x==="string"&&valid.has(x)))]:[];
 return {version:1,seen:clean(s.seen),incorrect:clean(s.incorrect),last:clean(s.last)};
}
export function selectRotation<T extends {id:string}>(
 pool:readonly T[],state:RotationState,count:number,random:()=>number=Math.random
):T[]{
 if(!Number.isInteger(count)||count<0)throw new RangeError("Número de rondas inválido");
 if(new Set(pool.map(x=>x.id)).size!==pool.length)throw new Error("IDs duplicados");
 const shuffle=(a:T[])=>{
  for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;
 };
 const last=new Set(state.last),seen=new Set(state.seen),incorrect=new Set(state.incorrect);
 const group=(fn:(x:T)=>boolean)=>shuffle(pool.filter(fn));
 const unseen=group(x=>!seen.has(x.id)&&!last.has(x.id));
 const unusedLast=group(x=>!seen.has(x.id)&&last.has(x.id));
 const retry=group(x=>seen.has(x.id)&&incorrect.has(x.id)&&!last.has(x.id));
 const old=group(x=>seen.has(x.id)&&!incorrect.has(x.id)&&!last.has(x.id));
 const recent=group(x=>seen.has(x.id)&&last.has(x.id));
 const out: T[]=[],used=new Set<string>();
 for(const a of [unseen,unusedLast,retry,old,recent])for(const x of a){
  if(out.length>=count)return out;
  if(!used.has(x.id)){out.push(x);used.add(x.id)}
 }
 return out;
}
export function recordRotation(state:RotationState,id:string,correct:boolean):RotationState{
 const seen=state.seen.includes(id)?state.seen:[...state.seen,id];
 const incorrect=correct?state.incorrect.filter(x=>x!==id):[...new Set([...state.incorrect,id])];
 const last=[...state.last.filter(x=>x!==id),id].slice(-10);
 return {version:1,seen,incorrect,last};
}
export function readRotation(key:string,ids:readonly string[]){
 if(typeof localStorage==="undefined")return emptyRotation();
 try{return parseRotation(localStorage.getItem(key),ids)}catch{return emptyRotation()}
}
export function writeRotation(key:string,state:RotationState){
 if(typeof localStorage==="undefined")return;
 try{localStorage.setItem(key,JSON.stringify(state))}catch{/* Modo privado o cuota agotada: la partida sigue funcionando. */}
}
