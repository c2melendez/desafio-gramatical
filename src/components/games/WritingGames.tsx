import {useState} from "react";
import {NextButton} from "./Feedback";
import type {GameProps} from "./types";
import {ERROR_TYPES,checkWritingSequence,type WritingChallenge} from "@/lib/writing";

export function ErrorHunter({item,report,next,isLast}:GameProps<WritingChallenge>){
 const [choice,setChoice]=useState<string|null>(null);
 const wrong=ERROR_TYPES.filter(t=>t!==item.errorType);
 const shift=item.id.charCodeAt(item.id.length-1)%wrong.length;
 const types=[item.errorType,...[0,1,2].map(n=>wrong[(shift+n*4)%wrong.length])];
 const options=[...new Set(types)];
 for(const t of wrong)if(options.length<4&&!options.includes(t))options.push(t);
 const rotate=(item.id.charCodeAt(item.id.length-2)+item.id.charCodeAt(item.id.length-1))%4;
 const shuffled=[...options.slice(rotate),...options.slice(0,rotate)];
 const submit=(label:string)=>{
  if(choice!==null)return;
  setChoice(label);
  const ok=label===item.errorType;
  report(ok,ok?undefined:{prompt:item.flawed,given:label,correct:item.errorType,exp:item.correction});
 };
 return <section className="space-y-4" aria-label="Cazador de errores">
  <div className="card-ink bg-card p-5 space-y-3">
   <p className="text-xs font-bold uppercase tracking-wide text-primary">Observa el enunciado</p>
   <p className="text-xl leading-relaxed font-semibold">{item.flawed}</p>
  </div>
  <h2 className="text-xl font-black">Cazador de errores</h2>
  <p>¿Qué problema principal debes identificar para corregir este texto?</p>
  <div className="grid gap-2">{shuffled.map(option=><button key={option} disabled={choice!==null}
   className={`tile text-left ${choice===null?"bg-card":option===item.errorType?"bg-success-soft":option===choice?"bg-destructive-soft":"bg-muted opacity-60"}`}
   onClick={()=>submit(option)}>{option}</button>)}</div>
  {choice!==null&&<div aria-live="polite" className="space-y-3">
   <p className={`rounded-lg border-2 border-foreground p-4 ${choice===item.errorType?"bg-success-soft":"bg-destructive-soft"}`}>
    <strong>{choice===item.errorType?"¡Identificado! ":"La categoría adecuada es «"+item.errorType+"». "}</strong>{item.correction}
   </p><NextButton onClick={next} isLast={isLast}/></div>}
 </section>;
}
export function ConnectorGame({item,report,next,isLast}:GameProps<WritingChallenge>){
 const [choice,setChoice]=useState<string|null>(null);
 const send=(option:string)=>{
  if(choice!==null)return;
  setChoice(option);
  const ok=option===item.connector;
  report(ok,ok?undefined:{prompt:item.gap,given:option,correct:item.connector,exp:"El conector «"+item.connector+"» expresa la relación lógica adecuada para el contexto."});
 };
 return <section className="space-y-4" aria-label="Conector correcto">
  <h2 className="text-xl font-black">Conector correcto</h2>
  <p>Lee las dos ideas. Elige el conector que establezca la relación lógica indicada por el sentido del texto.</p>
  <div className="card-ink bg-card p-5">
   <p className="text-xl font-semibold leading-relaxed">{item.gap.replace("___",choice??"_______")}</p>
  </div>
  <div className="grid grid-cols-2 gap-3">{item.options.map(o=><button key={o} disabled={choice!==null} onClick={()=>send(o)}
   className={`tile text-sm ${choice===null?"bg-card":o===item.connector?"bg-success-soft":o===choice?"bg-destructive-soft":"bg-muted opacity-60"}`}>{o}</button>)}</div>
  {choice!==null&&<div aria-live="polite" className="space-y-3">
   <p className={`rounded-lg border-2 border-foreground p-4 ${choice===item.connector?"bg-success-soft":"bg-destructive-soft"}`}>
    <strong>{choice===item.connector?"¡Excelente conexión! ":"Revisa la relación lógica. "}</strong>
    En este caso, «{item.connector}» permite enlazar las ideas sin cambiar su sentido.
   </p><NextButton onClick={next} isLast={isLast}/></div>}
 </section>;
}
export function ExpertEditor({item,report,next,isLast}:GameProps<WritingChallenge>){
 const [sequence,setSequence]=useState<number[]>([]);
 const [checked,setChecked]=useState(false);
 const order=[2,0,1];
 const correct=checkWritingSequence(item.steps,sequence);
 const check=()=>{
  if(checked||sequence.length!==3)return;
  setChecked(true);
  report(correct,correct?undefined:{prompt:"Organizar el párrafo: "+item.subtopic,
   given:sequence.map(i=>item.steps[i]).join(" → "),
   correct:item.steps.join(" → "),
   exp:"Un párrafo coherente primero presenta su tema o evidencia, desarrolla las relaciones y cierra con una conclusión sustentada."});
 };
 return <section className="space-y-4" aria-label="Editor experto">
  <h2 className="text-xl font-black">Editor experto</h2>
  <p>Ordena las tres frases para construir un párrafo coherente. Selecciona las fichas de principio a fin.</p>
  <div className="border-2 border-dashed border-foreground rounded-xl p-3 min-h-28 flex flex-col gap-2" aria-label="Párrafo en construcción" aria-live="polite">
   {sequence.length===0&&<p className="text-muted-foreground">El párrafo aparecerá aquí…</p>}
   {sequence.map((n,i)=><button key={n} disabled={checked} onClick={()=>setSequence(xs=>xs.filter(z=>z!==n))}
    className="tile text-left bg-accent text-sm">{i+1}. {item.steps[n]} <span aria-hidden>×</span></button>)}
  </div>
  <h3 className="font-bold">Fragmentos disponibles</h3>
  <div className="grid gap-2">{order.map(n=><button key={n} disabled={checked||sequence.includes(n)} onClick={()=>setSequence(xs=>[...xs,n])}
   className="tile bg-card text-left text-sm disabled:opacity-35">{item.steps[n]}</button>)}</div>
  {!checked?<div className="grid grid-cols-2 gap-2">
   <button disabled={!sequence.length} onClick={()=>setSequence(xs=>xs.slice(0,-1))} className="tile bg-card disabled:opacity-40">↶ Deshacer</button>
   <button disabled={!sequence.length} onClick={()=>setSequence([])} className="tile bg-card disabled:opacity-40">Vaciar</button>
   <button disabled={sequence.length!==3} onClick={check} className="tile bg-primary col-span-2 text-primary-foreground disabled:opacity-40">Revisar párrafo</button>
  </div>:<div className="space-y-3" aria-live="polite">
   <p className={`rounded-lg border-2 border-foreground p-4 ${correct?"bg-success-soft":"bg-destructive-soft"}`}>
    <strong>{correct?"¡Párrafo coherente! ":"Revisa el orden de las ideas. "}</strong>
    El orden propuesto primero presenta el tema, luego aporta información y finalmente permite cerrar el argumento.
    {!correct&&<span className="block mt-2"><strong>Orden esperado:</strong> {item.steps.join(" → ")}</span>}
   </p><NextButton onClick={next} isLast={isLast}/></div>}
 </section>;
}
