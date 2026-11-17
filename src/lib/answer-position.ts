/** Rotación reproducible de alternativas con su clave.
 * No emplear una posición fija para todas las respuestas; no alterar el texto
 * ni basarse en la respuesta seleccionada por la persona usuaria.
 */
export function stableIndex(id:string,size:number):number{
 if(!Number.isInteger(size)||size<1)throw new RangeError("Tamaño inválido");
 let hash=2166136261;
 for(let i=0;i<id.length;i++){hash^=id.charCodeAt(i);hash=Math.imul(hash,16777619);}
 return (hash>>>0)%size;
}
export function distributeAnswer<T>(id:string,options:readonly T[],correctIndex:number):{options:T[];answer:number}{
 if(!Number.isInteger(correctIndex)||correctIndex<0||correctIndex>=options.length)throw new RangeError("Clave inválida");
 const n=options.length;
 const target=stableIndex(id,n);
 const result=[...options];
 [result[correctIndex],result[target]]=[result[target],result[correctIndex]];
 return {options:result,answer:target};
}
