import type {MathModel} from "./math-m1";
import {buildOperationTransferR15} from "./math-operations-decision-r15";
const masks:Record<number,number>={12:0,13:5,14:3,15:7,16:4,17:2};
const q=(n:number,d=1)=>{let a=Math.abs(n),b=d;while(b){const t=a%b;a=b;b=t;}return d/(a||1)===1?String(n/(a||1)):n/(a||1)+"/"+d/(a||1);};
type Choice=[string,string];
export function buildR23Classification(x:MathModel,mask:number):MathModel{
 if(x.mode!=="clasificar"||x.oracle.kind!=="Operaciones-decision"||mask<0||mask>7||!Number.isInteger(mask))throw Error("R23 classification scope");
 const nums=x.prompt.match(/\d+/g)?.map(Number)??[];
 const key=x.expected,step=x.steps[0].choices[x.steps[0].answerIndex];
 let aux:string,label:string,rule:string,auxWrong:Choice[];
 if(x.operation==="comparar-ofertas-con-cargos-fijos"){
  const [n,p,f,v,h]=nums;aux=q(h-f);label="La diferencia de los cargos fijos (B menos A) es ";rule="Los cargos fijos se restan B menos A: "+h+"−"+f+"="+aux+".";
  auxWrong=[[q(f-h),"Se invirtió el orden de la diferencia entre cargos fijos."],[q(h+f),"Se sumaron los cargos fijos en lugar de restarlos."],[q(h),"Se omitió restar el cargo fijo de A."],[q(-f),"Se omitió el cargo fijo de B."]];
 }else if(x.operation==="cociente-de-diferencia-racional-con-raiz"){
  const [n,d]=nums,a=Math.sqrt(n),b=Math.sqrt(d);aux=q(a,b);label="La raíz cuadrada principal es ";rule="La raíz principal es no negativa: "+aux+"; su cuadrado es "+n+"/"+d+".";
  auxWrong=[[q(-a,b),"Se eligió la raíz negativa en lugar de la principal."],[q(n,d),"Se confundió el radicando con su raíz."],[q(a),"Se omitió la raíz del denominador."],[q(1,b),"Se omitió la raíz del numerador."]];
 }else throw Error("R23 operation");
 const defs=[
  {label:"El resultado solicitado es ",correct:key,rule:x.explanation,wrong:x.options.filter(v=>v!==key).map(v=>[v,x.optionExplanations?.[v]??""] as Choice)},
  {label:"El valor correcto del paso «"+x.steps[0].label+"» es ",correct:step,rule:x.explanation,wrong:x.steps[0].choices.filter(v=>v!==step).map(v=>[v,x.stepOptionExplanations?.[v]??""] as Choice)},
  {label,correct:aux,rule,wrong:auxWrong}
 ];
 const truth=[Boolean(mask&4),Boolean(mask&2),Boolean(mask&1)],used=new Set(defs.filter((_,i)=>truth[i]).map(d=>d.correct)),reasons:Record<string,string>={};
 if(new Set(defs.map(d=>d.correct)).size!==3)throw Error("R23 redundant correct targets");
 const claims=defs.map((d,i)=>{
  const w=truth[i]?undefined:d.wrong.find(([v,s])=>v!==d.correct&&!used.has(v)&&s.trim());
  if(!truth[i]&&!w)throw Error("R23 no distinct wrong value "+x.id);
  const v=truth[i]?d.correct:w![0];used.add(v);
  const text=d.label+v+".";reasons[text]=(truth[i]?"":w![1]+" ")+d.rule+" El valor afirmado es "+v+"; el correcto es "+d.correct+".";
  return {text,truth:truth[i]};
 });
 const shift=((x.seed%3)+3)%3;
 return {...x,assertions:[...claims.slice(shift),...claims.slice(0,shift)],assertionExplanations:reasons,modeOperation:"contrastar-tres-decisiones-distintas-r23"};
}
export function r23TruthMask(x:MathModel){const slot=Number(x.id.split("-").at(-1));return masks[slot];}
/** Disconnected candidate: 2 rational key/step collisions and 6 classifications, preserving 10 R15 PASS. */
export function repairOperationR23Candidate(x:MathModel):MathModel{
 if(x.subtopic!=="Operaciones"||x.level!=="intermedio"||!x.id.startsWith("math-m2-")||x.oracle.kind!=="Operaciones-decision")return x;
 const slot=Number(x.id.split("-").at(-1));if(slot<12||slot>17)return x;
 if(x.mode==="clasificar")return buildR23Classification(x,r23TruthMask(x));
 if(slot===16)return buildOperationTransferR15(x,1);
 return x;
}
