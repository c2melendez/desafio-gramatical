import type {MathModel} from "./math-m1";
/** R20 candidate: choose truth mask independently of sequential index/visible operands.
 * Deterministic for reproducibility, not cryptographic secrecy. Every false
 * claim is a specific error model; avoid duplicated displayed numeric values.
 * Remains disconnected from runtime pending CI and frozen successor hashes.
 */
const masks=[[true,true,false],[false,true,false],[true,false,true],[false,false,true],[true,false,false],[false,true,true]] as const;
function maskFor(id:string){
 let h=2166136261;
 for(const ch of "MAT-ARIT-01/R20/truth/"+id){h=Math.imul(h^ch.charCodeAt(0),16777619);}
 h^=h>>>16;h=Math.imul(h,0x7feb352d);h^=h>>>15;h=Math.imul(h,0x846ca68b);h^=h>>>16;
 return masks[(h>>>0)%masks.length];
}
export function operationClassificationR20TruthCount(id:string){return maskFor(id).filter(Boolean).length;}
type Decision={label:string;correct:number;rule:string;wrong:number[]};
export function repairOperationClassificationR20(item:MathModel):MathModel{
 if(item.subtopic!=="Operaciones"||item.mode!=="clasificar"||!["evaluar-tres-decisiones-operaciones-r18","evaluar-tres-decisiones-operaciones-r19"].includes(item.modeOperation??""))return item;
 const m=item.prompt.match(/\((\d+)\+(\d+)\)×(\d+)/);if(!m)throw Error("R20 stimulus "+item.id);
 const [a,b,c]=m.slice(1).map(Number);
 let answer:Decision,step:Decision,auxiliary:Decision;
 if(item.level==="principiante"){
  const sum=a+b,total=sum*c;
  answer={label:"El valor de la expresión solicitada es ",correct:total,rule:"Los paréntesis se resuelven primero: "+a+"+"+b+"="+sum+"; después "+sum+"×"+c+"="+total+".",wrong:[a+b*c,a*c,b*c,sum+c]};
  step={label:"La suma dentro del paréntesis es ",correct:sum,rule:"Dentro del paréntesis se suman ambos operandos: "+a+"+"+b+"="+sum+".",wrong:[a-b,b-a,a*b,a,b]};
  auxiliary={label:"Al distribuir, el producto del primer sumando por el factor es ",correct:a*c,rule:"La distributiva multiplica cada sumando por el mismo factor: "+a+"×"+c+"="+a*c+".",wrong:[b*c,(a+1)*c,a+c,a*(c+1)]};
 }else if(item.level==="intermedio"){
  const u=b+2,v=c-1,sum=a+u,total=sum*v;
  answer={label:"El valor de la expresión solicitada es ",correct:total,rule:"Primero aplica ambos cambios: "+b+"+2="+u+" y "+c+"−1="+v+". Luego ("+a+"+"+u+")×"+v+"="+total+".",wrong:[(a+b)*v,sum*c,a*v,u*v,(a+b)*c]};
  step={label:"Después de los cambios, la suma dentro del paréntesis es ",correct:sum,rule:"Se modifica el segundo sumando antes de evaluar: "+a+"+("+b+"+2)="+sum+".",wrong:[a+b,a+b-2,a-u,u,a]};
  auxiliary={label:"El factor después del cambio es ",correct:v,rule:"El factor disminuye una unidad: "+c+"−1="+v+".",wrong:[c+1,c,c+2,c-2]};
  if(c===2)step={label:"Antes de modificar los datos, el valor de la expresión original es ",correct:(a+b)*c,rule:"Antes de los cambios los operandos conservan sus valores: ("+a+"+"+b+")×"+c+"="+(a+b)*c+".",wrong:[(a+b+2)*c,(a+b)*(c-1),a*c,b*c]};
  // Two prior IDs had identical complete correct-decision tuples (150,30,5).
  // Preserve the question/key but change the diagnostic decision of one member.
  if(item.id==="math-m1-aritmetica-operaciones-clasificar-intermedio-14")step={label:"El segundo sumando después del cambio es ",correct:u,rule:"Solo aumenta el segundo sumando: "+b+"+2="+u+"; todavía falta sumar el primero y multiplicar.",wrong:[b,b-2,a+2,u+2]};
 }else{
  const total=b*c;
  const prior=item.assertions.find(q=>q.text.startsWith("Si en lugar de restar "));
  const p=prior?.text.match(/se restara (\d+)×(\d+),/);
  if(!p||Number(p[2])!==c)throw Error("R20 R19 predecessor "+item.id);
  const changed=Number(p[1]),delta=changed-a,cf=(b-delta)*c;
  if(Math.abs(delta)!==1)throw Error("R20 counterfactual delta");
  answer={label:"El valor de la expresión solicitada es ",correct:total,rule:"Al distribuir y cancelar "+a+"×"+c+" con su opuesto, queda "+b+"×"+c+"="+total+".",wrong:[(a+b)*c,-total,0,a*c]};
  step={label:"Después de distribuir y cancelar el producto repetido, el sumando restante es ",correct:b,rule:"Se cancela únicamente el primer producto; permanece el segundo sumando "+b+" multiplicado por "+c+".",wrong:[-b,a+b,0,a]};
  auxiliary={label:"Si en lugar de restar "+a+"×"+c+" se restara "+changed+"×"+c+", el resultado sería ",correct:cf,rule:"La diferencia entre los términos restados es "+delta+"×"+c+"; se resta esa diferencia al resultado original "+total+": "+cf+".",wrong:[total,(b+delta)*c,(a+b)*c,0,-cf]};
 }
 const ds=[answer,step,auxiliary];if(new Set(ds.map(d=>d.correct)).size!==3)throw Error("R20 redundant targets "+item.id);
 const mask=maskFor(item.id),used=new Set(ds.filter((_,i)=>mask[i]).map(d=>d.correct));
 const reasons:Record<string,string>={};
 const claims=ds.map((d,i)=>{let value=d.correct;if(!mask[i]){const wrong=d.wrong.find(v=>v!==d.correct&&!used.has(v));if(wrong===undefined)throw Error("R20 false value "+item.id);value=wrong;used.add(value);}
  const text=d.label+value+".";reasons[text]=d.rule+" El valor afirmado es "+value+"; "+(mask[i]?"coincide":"no coincide")+" con el correcto.";return {text,truth:mask[i]};});
 const shift=((item.seed%3)+3)%3;
 return {...item,assertions:[...claims.slice(shift),...claims.slice(0,shift)],assertionExplanations:reasons,modeOperation:"evaluar-tres-decisiones-operaciones-r20"};
}
