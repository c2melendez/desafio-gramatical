import {selectRotation,type RotationState} from "./rotation";
export const OPERATIONS_FAMILY_CAP=3;
/** Limit any one cognitive family to three of ten rounds. Preserve rotation
 * priority within each family; skip only items exceeding the cap. */
export function selectOperationsRotation<T extends {id:string;operation?:string}>(pool:readonly T[],state:RotationState,count:number,random:()=>number=Math.random):T[]{
 if(!Number.isInteger(count)||count<0)throw new RangeError("Número de rondas inválido");
 if(pool.some(x=>!x.operation))throw Error("Familia de Operaciones ausente");
 if(count===0)return [];
 const ranked=selectRotation(pool,state,pool.length,random);
 const result:T[]=[],families=new Map<string,number>();
 for(const item of ranked){const family=item.operation!,n=families.get(family)??0;
  if(n>=OPERATIONS_FAMILY_CAP)continue;
  result.push(item);families.set(family,n+1);
  if(result.length===count)return result;
 }
 throw Error("Capacidad insuficiente para una partida diversa de Operaciones");
}
