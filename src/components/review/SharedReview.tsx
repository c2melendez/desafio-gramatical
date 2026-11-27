// Candidate adapter extracted from OperationsReview. Legacy R4 remains byte-identical until dependency reconciliation.
import {useEffect,useRef,useState,type ReactNode} from "react";
import type {ReviewTask} from "@/lib/rdg/operations";
export type SharedTask=Omit<ReviewTask,"visual">;
const tile="tile bg-card text-left p-3 min-h-11";
export function balanceTransferOptions(tasks:readonly SharedTask[], random:()=>number=Math.random):Record<string,readonly string[]> {
 const shuffled=<T,>(values:readonly T[])=>{
  const result=[...values];
  for(let i=result.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}
  return result;
 };
 const slots=shuffled(tasks.map((_,i)=>i%4));
 const order:Record<string,readonly string[]>={};
 tasks.forEach((task,i)=>{
  if(task.options.length!==4||new Set(task.options).size!==4||!task.options.includes(task.answer))throw Error("Invalid transfer options: "+task.id);
  const options=shuffled(task.options.filter(x=>x!==task.answer));
  options.splice(slots[i],0,task.answer);
  order[task.id]=options;
 });
 return order;
}
function Bridge({steps}:{steps:NonNullable<SharedTask["bridge"]>}){
 const [visible,setVisible]=useState(1);
 return <section aria-label="Organizador de razonamiento" className="space-y-2"><p>Conecta los pasos del procedimiento.</p><ol className="space-y-2">{steps.map((s,i)=><li key={s.label} className="rounded-lg border border-foreground p-3"><strong>{i+1}. {s.label}</strong>{i<visible?<p className="mt-1">{s.text}</p>:<p className="text-sm text-muted-foreground">Paso por explorar</p>}</li>)}</ol><button className={tile} disabled={visible>=steps.length} onClick={()=>setVisible(n=>Math.min(steps.length,n+1))}>Revelar siguiente paso</button><p aria-live="polite" className="text-sm">{visible} de {steps.length} pasos visibles</p></section>;
}
export function ReviewActivity({task,transfer=false,options=task.options}:{task:SharedTask;transfer?:boolean;options?:readonly string[]}){
 const [choice,setChoice]=useState("");
 const [checked,setChecked]=useState(false);
 const [hint,setHint]=useState(false);
 const correct=choice===task.answer;
 return <section aria-labelledby={"task-"+task.id} className="card-ink bg-card p-4 sm:p-6 space-y-4">
  <h2 id={"task-"+task.id} className="text-2xl font-black">{task.title}</h2>
  {!transfer&&task.bridge&&<Bridge steps={task.bridge}/>}
  <p className="font-bold text-lg">{task.prompt}</p>
  {!transfer&&task.hint&&<><button className={tile} onClick={()=>setHint(v=>!v)} aria-expanded={hint}>{hint?"Ocultar pista":"Necesito una pista"}</button>{hint&&<p className="bg-accent/40 rounded p-3">{task.hint}</p>}</>}
  <div role="group" aria-label="Respuestas" className="grid grid-cols-1 sm:grid-cols-2 gap-2">{options.map(x=><button key={x} className={tile+(choice===x?" ring-2 ring-primary":"")} disabled={checked} aria-pressed={choice===x} onClick={()=>setChoice(x)}>{choice===x?"✓ ":""}{x}</button>)}</div>
  {!checked?<button className="tile w-full bg-primary text-primary-foreground" disabled={!choice} onClick={()=>setChecked(true)}>Comprobar</button>:<><section role="status" className={"rounded-lg border-2 border-foreground p-3 space-y-2 "+(correct?"bg-success-soft":"bg-destructive-soft")}><p className="font-bold">{correct?"¡Bien razonado!":"Revisa este paso"}</p><p>{!correct&&task.errors[choice]}</p><p>{task.explanation}</p></section>{!transfer&&<button className={tile} onClick={()=>{setChecked(false);setChoice("");}}>Intentar de nuevo</button>}</>}
 </section>;
}
export type ReviewRoute={context:string;title:string;intro:string;lessons:readonly SharedTask[];transfer:readonly SharedTask[];summary:readonly {label:string;text:string}[]};
export function SharedReview({route,back}:{route:ReviewRoute;back:ReactNode}){
 const [stage,setStage]=useState(0);
 const heading=useRef<HTMLHeadingElement>(null);
 const summary=route.lessons.length,firstTransfer=summary+1,total=firstTransfer+route.transfer.length;
 const [orders]=useState(()=>balanceTransferOptions(route.transfer));
 useEffect(()=>heading.current?.focus(),[stage]);
 const change=(n:number)=>setStage(Math.max(0,Math.min(total-1,n)));
 return <main id="contenido-principal" tabIndex={-1} className="mx-auto max-w-3xl px-4 py-6 space-y-5">
 <div>{back}</div><header><p className="text-sm font-bold text-primary">{route.context}</p><h1 ref={heading} tabIndex={-1} className="text-3xl font-black">Modo Repaso: {route.title}</h1><p>{route.intro} Sin puntaje ni tiempo límite.</p></header>
 <nav aria-label="Etapas de aprendizaje" className="flex flex-wrap gap-2">{[{label:"Fundamentos",n:0},{label:"Procedimientos",n:Math.min(1,summary-1)},{label:"Síntesis",n:summary},{label:"Transferencia",n:firstTransfer}].map(x=><button key={x.label} className={tile} aria-current={stage===x.n?"step":undefined} onClick={()=>change(x.n)}>{x.label}</button>)}</nav>
 {stage<summary?<ReviewActivity key={route.lessons[stage].id} task={route.lessons[stage]}/>:stage===summary?<section className="card-ink bg-card p-4 space-y-4"><h2 className="text-2xl font-black">Conecta las ideas</h2><Bridge key={route.title} steps={route.summary}/></section>:<ReviewActivity key={route.transfer[stage-firstTransfer].id} task={route.transfer[stage-firstTransfer]} options={orders[route.transfer[stage-firstTransfer].id]} transfer/>}
 <div className="flex items-center justify-between flex-wrap gap-3"><button className={tile} onClick={()=>change(stage-1)} disabled={stage===0}>Anterior</button><span aria-live="polite" className="text-sm">{stage+1} de {total} · {stage>=firstTransfer?"Transferencia":"Aprendizaje"}</span>{stage<total-1?<button className="tile bg-primary text-primary-foreground" onClick={()=>change(stage+1)}>Siguiente</button>:back}</div>
 <p className="text-xs text-muted-foreground">Puedes volver a los juegos en cualquier momento. El repaso no altera tu historial ni acredita dominio.</p></main>;
}
