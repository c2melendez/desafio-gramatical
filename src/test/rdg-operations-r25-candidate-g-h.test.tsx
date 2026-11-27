// Historical R20 evidence: keep exact baseline; active R26 has a separate full-bank regression.
import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import {afterEach,expect,it,vi} from "vitest";
import {cleanup,fireEvent,render,screen,within} from "@testing-library/react";
import {MathExerciseCard} from "@/components/games/MathExerciseCard";
import {MATH_LEVELS,MATH_MODES,type MathModel} from "@/lib/math-m1";
import {mathM3R20Pool as mathM3Pool,mathM3R21CandidatePool} from "@/lib/math-m3";
import {repairOperationR22Candidate} from "@/lib/math-operations-r22-candidate";
import {repairOperationR23Candidate} from "@/lib/math-operations-r23-candidate";
import {OPERATIONS_ROUTE} from "@/lib/rdg/operations";
import {selectOperationsRotation,OPERATIONS_FAMILY_CAP} from "@/lib/operations-rotation";
import {emptyRotation,selectRotation} from "@/lib/rotation";
const load=(p:string)=>JSON.parse(readFileSync(p,"utf8"));
const hash=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
const evidence=load("qa/certification/rdg/evidence/MAT-ARIT-01-R24-combined-successors.json");
const old=MATH_LEVELS.flatMap(l=>MATH_MODES.flatMap(m=>mathM3Pool("Aritmética","Operaciones",l,m)));
const bank=MATH_LEVELS.flatMap(l=>MATH_MODES.flatMap(m=>mathM3R21CandidatePool("Aritmética","Operaciones",l,m).map(repairOperationR22Candidate).map(repairOperationR23Candidate)));
const tasks=[...OPERATIONS_ROUTE.lessons,...OPERATIONS_ROUTE.transfer];
const successors=new Map<string,{previous_sha256:string;content_sha256:string}>(evidence.records.map((x:{id:string;previous_sha256:string;content_sha256:string})=>[x.id,x]));
const candidates=bank.filter(x=>successors.has(x.id));
const gcd=(a:bigint,b:bigint):bigint=>b===0n?(a<0n?-a:a)||1n:gcd(b,a%b);
function fraction(n:string,d:string){let a=BigInt(n),b=BigInt(d);if(!b)return n+"/"+d;if(b<0n){a=-a;b=-b;}const g=gcd(a,b);return a/g+"/"+b/g;}
function norm(s:string){return s.normalize("NFKC").toLowerCase().replace(/[−–]/g,"-").replace(/\s+/g,"").replace(/×/g,"*");}
function canonical(p:string){
 const s=norm(p),r=s.match(/\(√\((\d+)\/(\d+)\)-(\d+)\/(\d+)\)÷(\d+)/);
 if(r){const a=Math.sqrt(+r[1]),b=Math.sqrt(+r[2]);if(Number.isInteger(a)&&Number.isInteger(b))return "root|"+fraction(String(a),String(b))+"|"+fraction(r[3],r[4])+"|"+r[5];}
 if(/(?:tienda|cobra|cargo|oferta)/.test(s)&&/(?:menos|diferencia)/.test(s)){const n=p.match(/\d+/g)??[];if(n.length===5)return "cost|"+n.join("|");}
 const m=p.match(/^(?:Calcula|Resuelve|Simplifica|Completa(?: la igualdad)?)\s+([^.?]+)/i);
 return m?"expr|"+norm(m[1]).replace(/(-?\d+)\/([1-9]\d*)/g,(_,a,b)=>fraction(a,b)):null;
}
function value(s:string){const p=norm(s).match(/^(-?\d+)(?:\/(-?\d+))?$/);return p?fraction(p[1],p[2]??"1"):norm(s);}
function tuple(x:MathModel){return x.operation+"|"+value(x.expected)+"|"+value(x.steps[0].choices[x.steps[0].answerIndex]);}
function same(a:string,b:string){const x=canonical(a),y=canonical(b);return norm(a)===norm(b)||(x!==null&&x===y);}
function counts(items:MathModel[]){const c:Record<string,number>={};for(const x of items)c[x.operation!]=(c[x.operation!]??0)+1;return c;}
const rng=(seed:number)=>()=>((seed=Math.imul(seed,1664525)+1013904223|0)>>>0)/4294967296;
afterEach(cleanup);
it("R25 G: reduced-operand screening per successor, nine-cell rotation and lineage",()=>{
 expect(old).toHaveLength(450);expect(bank).toHaveLength(450);expect(candidates).toHaveLength(89);
 expect(new Set(bank.map(x=>x.id)).size).toBe(450);expect(OPERATIONS_FAMILY_CAP).toBe(3);
 expect(same("Calcula √(4/16) − 2/6.","Calcula √(1/4) - 1/3.")).toBe(true);
 expect(same("Calcula 4 × (2 − 1).","Calcula (4 − 2) × 1.")).toBe(false);
 expect(canonical("Calcula (√(25/81) − 6/18) ÷ 3. Expresa una fracción simplificada.")).toBe("root|5/9|1/3|3");
 let scenarios=0,signalIds=0,rdgSignalIds=0,tupleSignalIds=0,reusable=0;
 for(const l of MATH_LEVELS)for(const m of MATH_MODES){
  const pool=bank.filter(x=>x.level===l&&x.mode===m),before=old.filter(x=>x.level===l&&x.mode===m);
  expect(counts(pool)).toEqual(counts(before));
  for(let seed=1;seed<=256;seed++)for(const state of [emptyRotation(),{version:1 as const,seen:pool.filter((_,i)=>i%3!==0).map(x=>x.id),incorrect:pool.filter((_,i)=>i%7===0).map(x=>x.id),last:pool.slice(0,10).map(x=>x.id)}]){
   const ranked=selectRotation(pool,state,pool.length,rng(seed)),chosen=selectOperationsRotation(pool,state,10,rng(seed));
   expect(chosen).toHaveLength(10);expect(new Set(chosen.map(x=>x.id)).size).toBe(10);
   expect(Object.values(counts(chosen)).every(n=>n<=3)).toBe(true);
   expect(Object.keys(counts(chosen)).length).toBeGreaterThanOrEqual(4);
   const selected=new Set(chosen.map(x=>x.id));
   for(const x of chosen)expect(ranked.slice(0,ranked.indexOf(x)).filter(y=>y.operation===x.operation).every(y=>selected.has(y.id))).toBe(true);
   scenarios++;
  }
  console.log("RDG_R25_CELL "+JSON.stringify({level:l,mode:m,pool:pool.length,families:counts(pool)}));
 }
 const priorExam=load("qa/certification/rdg/evidence/MAT-ARIT-01-v79-R15-exam-screen.json");
 for(const x of candidates){
  const f=successors.get(x.id)!,p=old.find(y=>y.id===x.id)!;
  expect(hash(x)).toBe(f.content_sha256);expect(hash(p)).toBe(f.previous_sha256);
  const gameSignals=bank.filter(y=>y.id!==x.id&&same(y.prompt,x.prompt)).map(y=>y.id);
  const rdgSignals=tasks.filter(y=>same(y.prompt,x.prompt)).map(y=>y.id);
  const tupleSignals=bank.filter(y=>y.id!==x.id&&tuple(y)===tuple(x)).map(y=>y.id);
  const cell=bank.filter(y=>y.level===x.level&&y.mode===x.mode);
  const exam=priorExam.records.find((y:{id:string})=>y.id===x.id);
  const examReusable=Boolean(exam&&exam.hash===hash(p)&&p.prompt===x.prompt&&exam.signature===canonical(x.prompt)?.replace(/(\d+)\/1(?=\||$)/g,"$1")&&exam.matches.length===0);
  if(gameSignals.length)signalIds++;if(rdgSignals.length)rdgSignalIds++;if(tupleSignals.length)tupleSignalIds++;if(examReusable)reusable++;
  console.log("RDG_R25_G_ID "+JSON.stringify({id:x.id,hash:hash(x),previous_hash:hash(p),prompt:x.prompt,signature:canonical(x.prompt),operation:x.operation,mode:x.mode,level:x.level,cell:cell.length,family:cell.filter(y=>y.operation===x.operation).length,tuple:tuple(x),gameSignals,rdgSignals,tupleSignals,examReusable,stimulusChanged:p.prompt!==x.prompt,semantic_status:"REVIEW"}));
 }
 expect(scenarios).toBe(4608);expect(reusable).toBe(6);
 console.log("RDG_R25_G_SUMMARY "+JSON.stringify({ids:candidates.length,scenarios,signalIds,rdgSignalIds,tupleSignalIds,reusable,semantic_pass:0}));
},90000);
it("R25 H: 89 successor cards have text, named native buttons, focus, feedback and next action",()=>{
 let completed=0,steps=0;
 for(const x of candidates){
  const f=successors.get(x.id)!;expect(hash(x)).toBe(f.content_sha256);
  expect(x.visual).toBeUndefined();expect(x.visualRequirement).not.toBe("essential");
  const report=vi.fn(),next=vi.fn();render(<MathExerciseCard item={x} onResult={report} onNext={next} isLast={false}/>);
  const card=screen.getByRole("region",{name:"Ejercicio matemático"});expect(within(card).getByRole("heading",{level:2})).toHaveTextContent(x.prompt);
  const keys=x.mode==="clasificar"?x.assertions.map(a=>a.truth?"Verdadero":"Falso"):x.mode==="construir"?x.steps.map(s=>s.choices[s.answerIndex]):[x.expected];
  for(let i=0;i<keys.length;i++){
   if(x.mode==="clasificar")expect(within(card).getByText(x.assertions[i].text,{exact:true})).toBeVisible();
   if(x.mode==="construir")expect(within(card).getByRole("heading",{level:3})).toHaveTextContent(x.steps[i].label);
   const bs=within(card).getAllByRole("button");expect(bs.length).toBe(x.mode==="clasificar"?2:4);
   for(const b of bs){expect(b.tagName).toBe("BUTTON");expect(b.textContent?.trim()).toBeTruthy();expect(b).toBeEnabled();expect(b.tabIndex).toBe(0);}
   const choice=within(card).getByRole("button",{name:keys[i],exact:true});choice.focus();expect(choice).toHaveFocus();fireEvent.click(choice);steps++;
  }
  expect(report).toHaveBeenCalledTimes(1);expect(report).toHaveBeenCalledWith(true,keys.join(x.mode==="clasificar"?" · ":" → "));
  const fb=within(card).getByTestId("learning-feedback");expect(fb).toHaveAttribute("aria-live","polite");expect(fb).toHaveAccessibleName("Explicación del resultado");expect(fb).toHaveTextContent("¡Correcto!");expect(fb).toHaveTextContent(x.explanation);
  const b=within(card).getByRole("button",{name:"Continuar",exact:true});b.focus();expect(b).toHaveFocus();fireEvent.click(b);expect(next).toHaveBeenCalledTimes(1);
  expect(hash(x)).toBe(f.content_sha256);cleanup();completed++;
  console.log("RDG_R25_H_ID "+JSON.stringify({id:x.id,hash:hash(x),mode:x.mode,steps:keys.length,nativeButtons:true,focus:true,textFeedback:true,liveRegion:true,nextAction:true,scope:"JSDOM_NOT_PHYSICAL_OR_SCREEN_READER",semantic_status:"REVIEW"}));
 }
 expect(completed).toBe(89);console.log("RDG_R25_H_SUMMARY "+JSON.stringify({ids:completed,steps,semantic_pass:0}));
},90000);
