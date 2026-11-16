import {useState} from "react";
import {NextButton} from "./Feedback";
import type {GameProps} from "./types";
import {ERROR_TYPES,checkWritingSequence,type WritingChallenge} from "@/lib/writing";
import type {ConnectorErrorCase} from "@/lib/connector-error-cases";
import type {ConnectorEditorCase} from "@/lib/connector-editor-cases";
import type {CorrectionErrorCase} from "@/lib/correction-error-cases";
import type {CorrectionEditorCase} from "@/lib/correction-editor-cases";
import type {CorrectionChoiceCase} from "@/lib/correction-choice-cases";
import type {OrganizationErrorCase} from "@/lib/organization-error-cases";
import type {OrganizationChoiceCase} from "@/lib/organization-choice-cases";
import type {OrganizationEditorCase} from "@/lib/organization-editor-cases";
import type {ElisionErrorCase} from "@/lib/elision-error-cases";
import type {ElisionChoiceCase} from "@/lib/elision-choice-cases";
import type {ElisionEditorCase} from "@/lib/elision-editor-cases";

export function ErrorHunter(props:GameProps<WritingChallenge|ConnectorErrorCase|CorrectionErrorCase|OrganizationErrorCase|ElisionErrorCase>){
 if("correctConnector" in props.item)return <ConnectorCorrection {...props} item={props.item}/>;
 return <LegacyErrorHunter {...props} item={props.item}/>;
}
function LegacyErrorHunter({item,report,next,isLast}:GameProps<WritingChallenge>){
 const [choice,setChoice]=useState<string|null>(null);
 // Evitamos distracciones semánticamente equivalentes (p. ej. acentuación/ortografía).
 // Se toman alternativas de familias diferentes al error que se desea identificar.
 const families:Record<string,string>={
  "Concordancia":"gramática","Acentuación":"gramática","Ortografía":"gramática","Puntuación":"gramática",
  "Redundancia":"estilo","Precisión":"estilo","Ambigüedad":"estilo","Referencia ambigua":"estilo","Información omitida":"estilo",
  "Generalización injustificada":"argumentación","Relación lógica inválida":"argumentación",
  "Inferencia injustificada":"argumentación","Sesgo de selección":"argumentación","Integración imprecisa":"argumentación",
  "Conector inadecuado":"conectores",
  "Orden temporal":"estructura","Coherencia temática":"estructura","Estructura argumentativa":"estructura",
  "Organización de la comparación":"estructura","Contradicción argumentativa":"estructura","Jerarquización de evidencias":"estructura"
 };
 const family=families[item.errorType];
 const choices=ERROR_TYPES.filter(t=>t!==item.errorType&&families[t]!==family);
 const options=[item.errorType,...[0,1,2].map(n=>choices[(item.id.charCodeAt(item.id.length-1)+n*7)%choices.length])];
 for(const t of choices)if(options.length<4&&!options.includes(t))options.push(t);
 const uniqueOptions=options.filter((v,i,a)=>a.indexOf(v)===i).slice(0,4);
 const rotate=(item.id.charCodeAt(item.id.length-2)+item.id.charCodeAt(item.id.length-1))%4;
 const shuffled=[...uniqueOptions.slice(rotate),...uniqueOptions.slice(0,rotate)];
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
function ConnectorCorrection({item,report,next,isLast}:GameProps<ConnectorErrorCase|CorrectionErrorCase|OrganizationErrorCase|ElisionErrorCase>){
 const correction=item.subtopic==="Corrección";
 const organization=item.subtopic==="Organización textual";
 const elision=item.subtopic==="Elisión y adición";
 const [choice,setChoice]=useState<string|null>(null);
 const submit=(option:string)=>{
  if(choice!==null)return;setChoice(option);
  const ok=option===item.correctConnector;
  report(ok,ok?undefined:{prompt:item.flawed,given:option,correct:item.correctConnector,exp:item.explanation});
 };
 return <section className="space-y-4" aria-label={elision?"Cazador de errores: elisión y adición":organization?"Cazador de errores: organización textual":correction?"Cazador de errores: corrección":"Cazador de errores: corrección de conectores"}>
  <h2 className="text-xl font-black">Cazador de errores</h2>
  <p>{elision?"Identifica qué sobra o qué falta en el texto y selecciona la versión mejor justificada.":organization?"Lee el problema de organización y elige la revisión editorial más adecuada.":correction?"El fragmento entre comillas necesita corregirse. Elige su reemplazo preciso.":"El conector entre comillas es incorrecto. Selecciona el que lo reemplaza sin alterar la relación lógica."}</p>
  <div className="card-ink bg-card p-5"><p className="font-semibold text-xl leading-relaxed">{item.flawed}</p></div>
  <div className="grid grid-cols-2 gap-2">{item.options.map(option=><button key={option}
   disabled={choice!==null} onClick={()=>submit(option)}
   className={`tile text-left text-sm ${choice===null?"bg-card":option===item.correctConnector?"bg-success-soft":option===choice?"bg-destructive-soft":"bg-muted opacity-60"}`}>{option}</button>)}</div>
  {choice!==null&&<div className="space-y-3" aria-live="polite">
   <p className={`rounded-xl border-2 border-foreground p-4 ${choice===item.correctConnector?"bg-success-soft":"bg-destructive-soft"}`}>
    <strong>{choice===item.correctConnector?"¡Corrección acertada! ":"La corrección adecuada es «"+item.correctConnector+"». "}</strong>
    {item.explanation}
   </p>
   <div className="card-ink bg-card p-4"><strong>{organization||elision?"Revisión recomendada:":"Versión corregida:"}</strong><p>{item.correctSentence}</p></div>
   <NextButton onClick={next} isLast={isLast}/>
  </div>}
 </section>;
}
export function ConnectorGame({item,report,next,isLast}:GameProps<WritingChallenge|import("@/lib/connector-cases").ConnectorCase|CorrectionChoiceCase|OrganizationChoiceCase|ElisionChoiceCase>){
 const [choice,setChoice]=useState<string|null>(null);
 const send=(option:string)=>{
  if(choice!==null)return;
  setChoice(option);
  const ok=option===item.connector;
  report(ok,ok?undefined:{prompt:item.gap,given:option,correct:item.connector,exp:"explanation" in item ? item.explanation : "El conector «"+item.connector+"» expresa la relación lógica adecuada para el contexto."});
 };
 return <section className="space-y-4" aria-label="Conector correcto">
  <h2 className="text-xl font-black">{item.subtopic==="Corrección"?"Corrección precisa":item.subtopic==="Organización textual"?"Continúa el texto":item.subtopic==="Elisión y adición"?"Revisión precisa":"Conector correcto"}</h2>
  <p>{item.subtopic==="Corrección"?"Completa el enunciado con la forma correcta según la gramática, la ortografía o el contexto.":item.subtopic==="Organización textual"?"Elige la oración que desarrolla el tema sin romper su coherencia ni exagerar la conclusión.":item.subtopic==="Elisión y adición"?"Elige cómo quitar información redundante o recuperar información omitida sin alterar el significado.":"Lee las dos ideas. Elige el conector que establezca la relación lógica indicada por el sentido del texto."}</p>
  <div className="card-ink bg-card p-5">
   <p className="text-xl font-semibold leading-relaxed">{item.gap.replace("___",choice??"_______")}</p>
  </div>
  <div className={["Organización textual","Elisión y adición"].includes(item.subtopic)?"grid grid-cols-1 gap-3":"grid grid-cols-2 gap-3"}>{item.options.map(o=><button key={o} disabled={choice!==null} onClick={()=>send(o)}
   className={`tile text-sm ${choice===null?"bg-card":o===item.connector?"bg-success-soft":o===choice?"bg-destructive-soft":"bg-muted opacity-60"}`}>{o}</button>)}</div>
  {choice!==null&&<div aria-live="polite" className="space-y-3">
   <p className={`rounded-lg border-2 border-foreground p-4 ${choice===item.connector?"bg-success-soft":"bg-destructive-soft"}`}>
    <strong>{choice===item.connector?"¡Excelente conexión! ":"Revisa la relación lógica. "}</strong>
    {"explanation" in item ? item.explanation : `En este caso, «${item.connector}» permite enlazar las ideas sin cambiar su sentido.`}
   </p><NextButton onClick={next} isLast={isLast}/></div>}
 </section>;
}
export function ExpertEditor({item,report,next,isLast}:GameProps<WritingChallenge|ConnectorEditorCase|CorrectionEditorCase|OrganizationEditorCase|ElisionEditorCase>){
 const [sequence,setSequence]=useState<number[]>([]);
 const [checked,setChecked]=useState(false);
 // Cinco órdenes distintos, nunca el orden correcto de presentación.
 // El índice deriva del ID estable, evitando repetir la misma disposición en todas las rondas.
 const permutations=[[2,0,1],[1,2,0],[2,1,0],[1,0,2],[0,2,1]];
 const hash=[...item.id].reduce((n,char)=>n*31+char.charCodeAt(0),0)>>>0;
 const order=permutations[hash%permutations.length];
 const correct=checkWritingSequence(item.steps,sequence);
 const check=()=>{
  if(checked||sequence.length!==3)return;
  setChecked(true);
  report(correct,correct?undefined:{prompt:"Organizar el párrafo: "+item.subtopic,
   given:sequence.map(i=>item.steps[i]).join(" → "),
   correct:item.steps.join(" → "),
   exp:"explanation" in item?item.explanation:"Un párrafo coherente primero presenta su tema o evidencia, desarrolla las relaciones y cierra con una conclusión sustentada."});
 };
 return <section className="space-y-4" aria-label="Editor experto">
  <h2 className="text-xl font-black">Editor experto</h2>
  <p>{["Organización textual","Elisión y adición"].includes(item.subtopic)?"Ordena tres fragmentos para reconstruir una revisión de contenido lógica y coherente.":"Ordena las tres frases para construir un párrafo coherente. Selecciona las fichas de principio a fin."}</p>
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
    {"explanation" in item?item.explanation:"El orden propuesto primero presenta el tema, luego aporta información y finalmente permite cerrar el argumento."}
    {!correct&&<span className="block mt-2"><strong>Orden esperado:</strong> {item.steps.join(" → ")}</span>}
   </p><NextButton onClick={next} isLast={isLast}/></div>}
 </section>;
}
