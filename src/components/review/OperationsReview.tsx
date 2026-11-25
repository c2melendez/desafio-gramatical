import {useEffect,useRef,useState} from "react";
import type {ReviewTask} from "@/lib/rdg/operations";
import {OPERATIONS_ROUTE} from "@/lib/rdg/operations";

const tile="tile bg-card text-left p-3 min-h-11";
function Visual({kind}:{kind:NonNullable<ReviewTask["visual"]>}){
 const [selected,setSelected]=useState<string[]>([]);
 const [position,setPosition]=useState(-4);
 const [operands,setOperands]=useState([31,11]);
 const [order,setOrder]=useState(["18 − 5","42 ÷ 7","6 × 3"]);
 const [reveal,setReveal]=useState(false);
 const [root,setRoot]=useState("");
 const [thirds,setThirds]=useState("");
 const toggle=(x:string)=>setSelected(old=>old.includes(x)?old.filter(y=>y!==x):[...old,x]);
 const move=(i:number,delta:number)=>setOrder(old=>{const next=[...old],j=i+delta;if(j<0||j>=next.length)return old;[next[i],next[j]]=[next[j],next[i]];return next;});
 if(kind==="line")return <div className="space-y-3">
  <p className="text-sm">Una posición negativa está a la izquierda de cero. Sumar una cantidad positiva mueve a la derecha; restarla mueve a la izquierda.</p>
  <svg role="img" aria-label={"Recta numérica de −10 a 10; posición actual "+position} viewBox="0 0 340 76" className="w-full max-w-md" >
   <path d="M10 33 H330" stroke="currentColor" strokeWidth="2"/>
   {Array.from({length:21},(_,i)=>i-10).map(n=><g key={n}><path d={"M"+(170+n*15)+" 28v10"} stroke="currentColor"/>{n%2===0&&<text x={170+n*15} y="53" textAnchor="middle" fontSize="10" fill="currentColor">{n}</text>}</g>)}
   <circle cx={170+position*15} cy="33" r="6" fill="currentColor"/><text x={170+position*15} y="19" textAnchor="middle" fontSize="12" fill="currentColor">{position}</text>
  </svg>
  <div className="flex flex-wrap gap-2">{[6,-3].map(d=><button key={d} className={tile} disabled={position+d>10||position+d< -10} onClick={()=>setPosition(n=>n+d)}>{d>0?"+6":"−3"}</button>)}<button className={tile} onClick={()=>setPosition(-4)}>Reiniciar recta</button></div>
  <p aria-live="polite">Posición actual: {position}</p>
 </div>;
 if(kind==="tree")return <div className="space-y-3">
  <p>Elige la primera operación de cada expresión. Un nodo hijo se resuelve antes de su padre.</p>
  {([{expr:"11 − 3 × 2",nodes:["11 − 3","3 × 2"]},{expr:"(11 − 3) × 2",nodes:["11 − 3","3 × 2"]}]).map((row,i)=><div key={row.expr} className="rounded-lg border border-foreground p-3 text-center space-y-2">
   <p className="font-bold">{row.expr}</p><div aria-hidden="true">↙ ↘</div><div className="grid grid-cols-2 gap-2">{row.nodes.map((x,j)=><button key={x} className={tile} aria-pressed={selected.includes(i+":"+j)} onClick={()=>setSelected(old=>[...old.filter(y=>!y.startsWith(i+":")),i+":"+j])}>{x}</button>)}</div>
   <p aria-live="polite" className="text-sm">{selected.some(x=>x.startsWith(i+":"))?(selected.includes(i+":"+(i===0?1:0))?"Bien: este nodo debe resolverse primero.":"Revisa: el paréntesis o la prioridad del producto determina el primer nodo."):"Selecciona un nodo."}</p>
  </div>)}
 </div>;
 if(kind==="sequence")return <div className="space-y-2"><p>Ordena los pasos: las operaciones de igual prioridad van de izquierda a derecha.</p><ol className="space-y-2">{order.map((x,i)=><li key={x} className="flex items-center flex-wrap gap-2 border border-foreground rounded-lg p-2"><span className="flex-1">{i+1}. {x}</span><button className={tile} aria-label={"Subir "+x} disabled={i===0} onClick={()=>move(i,-1)}>↑</button><button className={tile} aria-label={"Bajar "+x} disabled={i===order.length-1} onClick={()=>move(i,1)}>↓</button></li>)}</ol><p aria-live="polite">{order.join("|")==="42 ÷ 7|6 × 3|18 − 5"?"Secuencia válida: ya puedes terminar el cálculo.":"Comprueba el orden antes de calcular."}</p></div>;
 if(kind==="change")return <div className="space-y-2"><p>Modifica los datos en la tabla, no el resultado final.</p><div className="grid grid-cols-3 gap-2 text-center"><div>Primer sumando<br/><strong>{operands[0]}</strong><button className={tile+" w-full"} onClick={()=>setOperands(v=>[v[0]===31?28:31,v[1]])}> {operands[0]===31?"−3":"Deshacer"}</button></div><div>Segundo sumando<br/><strong>29</strong></div><div>Factor<br/><strong>{operands[1]}</strong><button className={tile+" w-full"} onClick={()=>setOperands(v=>[v[0],v[1]===11?13:11])}>{operands[1]===11?"+2":"Deshacer"}</button></div></div><p aria-live="polite" className="font-bold text-center">({operands[0]} + 29) × {operands[1]}</p></div>;
 if(kind==="distribution")return <div className="space-y-2"><p>Distribuye el factor en las dos ramas. Selecciona los términos que se cancelan entre sí.</p><button className={tile} onClick={()=>setReveal(v=>!v)} aria-expanded={reveal}>{reveal?"Ocultar distribución":"Ver las dos ramas"}</button>{reveal&&<><div className="text-center font-bold">7(12 − 5) − 7 × 12</div><div className="grid gap-2 sm:grid-cols-3">{["7 × 12","−7 × 5","−7 × 12"].map(x=><button key={x} className={tile} aria-pressed={selected.includes(x)} onClick={()=>toggle(x)}>{selected.includes(x)?"✓ ":""}{x}</button>)}</div><p aria-live="polite">{selected.length===2?(selected.includes("7 × 12")&&selected.includes("−7 × 12")?"Correcto: los productos opuestos se cancelan.":"Solo se cancelan términos de igual magnitud y signo opuesto."):"Marca los dos términos opuestos."}</p></>}</div>;
 return <div className="space-y-3"><p>El radical encierra 9/49. Escoge la raíz principal; debe ser no negativa.</p><div className="flex items-center gap-4 flex-wrap"><svg viewBox="0 0 98 98" className="w-28" role="img" aria-label="Cuadrado de siete por siete partes iguales: nueve celdas forman un cuadrado de lado tres séptimos">{Array.from({length:49},(_,i)=><rect key={i} x={(i%7)*14} y={Math.floor(i/7)*14} width="14" height="14" stroke="currentColor" strokeWidth=".6" fill={i%7<3&&Math.floor(i/7)<3?"currentColor":"none"}/>)}</svg><p className="text-sm">Área sombreada: 9/49. Lado: 3/7 de la unidad. Comprueba que (3/7)² = 9/49.</p></div><div className="flex flex-wrap gap-2">{["3/7","−3/7","9/7"].map(x=><button key={x} className={tile} aria-pressed={root===x} onClick={()=>setRoot(x)}>{x}</button>)}</div><p aria-live="polite">{root?(root==="3/7"?"Correcto: (3/7)² = 9/49.":"Comprueba el cuadrado y el signo no negativo."):""}</p><p>Una banda de siete partes iguales representa una unidad.</p><div className="grid grid-cols-7 border border-foreground rounded overflow-hidden" role="img" aria-label="Siete partes iguales, cinco marcadas: tres séptimos más dos séptimos">{Array.from({length:7},(_,i)=><span key={i} className={"border-r border-foreground text-center py-3 "+(i<5?"bg-success-soft":"bg-card")}>{i<3?"R":i<5?"+":"·"}</span>)}</div><p className="text-sm">R: tres séptimos de la raíz; +: dos séptimos añadidos. Ahora resta seis séptimos.</p><div className="flex flex-wrap gap-2">{["5/7 − 6/7","5/14 − 6/7"].map(x=><button key={x} className={tile} aria-pressed={thirds===x} onClick={()=>setThirds(x)}>{x}</button>)}</div><p aria-live="polite">{thirds?(thirds==="5/7 − 6/7"?"Correcto: conserva las unidades de séptimo.":"No sumes denominadores iguales."):""}</p></div>;
}
function Task({task,transfer=false}:{task:ReviewTask;transfer?:boolean}){
 const [choice,setChoice]=useState("");
 const [checked,setChecked]=useState(false);
 const [hint,setHint]=useState(false);
 const correct=choice===task.answer;
 return <section aria-labelledby={"task-"+task.id} className="card-ink bg-card p-4 sm:p-6 space-y-4">
  <h2 id={"task-"+task.id} className="text-2xl font-black">{task.title}</h2>
  {!transfer&&task.visual&&<Visual kind={task.visual}/>}
  <p className="font-bold text-lg">{task.prompt}</p>
  {!transfer&&task.hint&&<><button className={tile} onClick={()=>setHint(v=>!v)} aria-expanded={hint}>{hint?"Ocultar pista":"Necesito una pista"}</button>{hint&&<p className="bg-accent/40 rounded p-3">{task.hint}</p>}</>}
  <div role="group" aria-label="Respuestas" className="grid grid-cols-1 sm:grid-cols-2 gap-2">{task.options.map(x=><button key={x} className={tile+(choice===x?" ring-2 ring-primary":"")} disabled={checked} aria-pressed={choice===x} onClick={()=>setChoice(x)}>{choice===x?"✓ ":""}{x}</button>)}</div>
  {!checked?<button className="tile w-full bg-primary text-primary-foreground" disabled={!choice} onClick={()=>setChecked(true)}>Comprobar</button>:<><section role="status" className={"rounded-lg border-2 border-foreground p-3 space-y-2 "+(correct?"bg-success-soft":"bg-destructive-soft")}><p className="font-bold">{correct?"¡Bien razonado!":"Revisa este paso"}</p><p>{!correct&&task.errors[choice]}</p><p>{task.explanation}</p></section>{!transfer&&<button className={tile} onClick={()=>{setChecked(false);setChoice("");}}>Intentar de nuevo</button>}</>}
 </section>;
}
export function OperationsReview({back}:{back:React.ReactNode}){
 const [stage,setStage]=useState(0);
 const heading=useRef<HTMLHeadingElement>(null);
 const lessons=OPERATIONS_ROUTE.lessons,transfer=OPERATIONS_ROUTE.transfer,summary=lessons.length,firstTransfer=summary+1,total=firstTransfer+transfer.length;
 useEffect(()=>heading.current?.focus(),[stage]);
 const change=(n:number)=>setStage(Math.max(0,Math.min(total-1,n)));
 return <main id="contenido-principal" tabIndex={-1} className="mx-auto max-w-3xl px-4 py-6 space-y-5">
  <div>{back}</div><header className="space-y-2"><p className="text-sm font-bold text-primary">Matemáticas · Aritmética</p><h1 ref={heading} tabIndex={-1} className="text-3xl font-black">Modo Repaso: Operaciones</h1><p>Aprende a decidir qué calcular primero, cambiar datos, distribuir factores y combinar raíces y fracciones. Sin puntaje ni tiempo límite.</p></header>
  <nav aria-label="Etapas de aprendizaje" className="flex flex-wrap gap-2">{[{label:"Fundamentos",n:0},{label:"Procedimientos",n:2},{label:"Síntesis",n:summary},{label:"Transferencia",n:firstTransfer}].map(x=><button key={x.label} className={tile} aria-current={stage===x.n?"step":undefined} onClick={()=>change(x.n)}>{x.label}</button>)}</nav>
  {stage<summary?<Task key={lessons[stage].id} task={lessons[stage]}/>:stage===summary?<section className="card-ink bg-card p-4 space-y-4"><h2 className="text-2xl font-black">Conecta las reglas</h2><ol className="space-y-2"><li>1. Agrupaciones: resuelve primero el contenido agrupado.</li><li>2. Potencias y raíces: respeta el alcance de cada operador.</li><li>3. Productos y divisiones: de izquierda a derecha.</li><li>4. Sumas y restas: de izquierda a derecha.</li></ol><p>Los signos se conservan. Los denominadores deben ser compatibles antes de sumar o restar.</p><section aria-label="Condiciones y contraejemplos" className="rounded-lg border border-foreground p-3 space-y-2"><h3 className="font-bold">Comprueba los límites de las reglas</h3><p>0 ÷ 9 = 0, pero 9 ÷ 0 no está definido: ningún número multiplicado por cero da nueve.</p><p>√0 = 0. √(−9) no tiene valor real porque ningún cuadrado real es negativo. √9 = 3: la raíz principal no es ±3.</p><p>Si los denominadores son distintos, transforma primero a fracciones equivalentes con denominador común.</p></section>{OPERATIONS_ROUTE.workedExamples.map(e=><details key={e.title} className="border border-foreground rounded p-3"><summary className="font-bold cursor-pointer">{e.title}: ver ejemplo resuelto</summary><p className="mt-2">{e.text}</p></details>)}<p>Ahora prueba casos nuevos sin ayudas reveladoras.</p></section>:<Task key={transfer[stage-firstTransfer].id} task={transfer[stage-firstTransfer]} transfer/>}
  <div className="flex items-center justify-between flex-wrap gap-3"><button className={tile} onClick={()=>change(stage-1)} disabled={stage===0}>Anterior</button><span aria-live="polite" className="text-sm">{stage+1} de {total} · {stage>=firstTransfer?"Transferencia":"Aprendizaje"}</span>{stage<total-1?<button className="tile bg-primary text-primary-foreground" onClick={()=>change(stage+1)}>Siguiente</button>:back}</div>
  <p className="text-xs text-muted-foreground">Puedes volver a los juegos en cualquier momento. El repaso no altera tu historial ni acredita dominio.</p>
 </main>;
}
