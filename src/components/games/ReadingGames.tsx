import {useState} from "react";
import {NextButton} from "./Feedback";
import {LearningFeedback} from "./LearningFeedback";
import type {GameProps} from "./types";
import {EVIDENCE_LABEL,checkReadingOrder,type EvidenceTag,type ReadingChallenge} from "@/lib/reading";
import type {MainIdeaChoiceCase} from "@/lib/main-idea-choice-cases";
import type {MainIdeaDetectiveCase} from "@/lib/main-idea-detective-cases";
import type {MainIdeaReconstructCase} from "@/lib/main-idea-reconstruct-cases";
import type {InferenceDetectiveCase} from "@/lib/inference-detective-cases";
import type {InferenceChoiceCase} from "@/lib/inference-choice-cases";
import type {InferenceReconstructCase} from "@/lib/inference-reconstruct-cases";
import type {CriticalDetectiveCase} from "@/lib/critical-detective-cases";
import type {CriticalChoiceCase} from "@/lib/critical-choice-cases";
import type {CriticalReconstructCase} from "@/lib/critical-reconstruct-cases";
import type {NewReadingDetective,NewReadingChoice,NewReadingReconstruct} from "@/lib/reading-vocabulary-block";
import type {AnalysisDetective,AnalysisChoice,AnalysisReconstruct} from "@/lib/reading-analysis-block";
import type {CompareDetective,CompareChoice,CompareReconstruct} from "@/lib/reading-comparison-block";
import type {FigurativeDetectiveCase,FigurativeChoiceCase,FigurativeReconstructCase} from "@/lib/reading-figurative-block";

function Passage({item}:{item:ReadingChallenge|MainIdeaChoiceCase|MainIdeaDetectiveCase|MainIdeaReconstructCase|InferenceDetectiveCase|InferenceChoiceCase|InferenceReconstructCase|CriticalDetectiveCase|CriticalChoiceCase|CriticalReconstructCase|NewReadingDetective|NewReadingChoice|NewReadingReconstruct|AnalysisDetective|AnalysisChoice|AnalysisReconstruct|CompareDetective|CompareChoice|CompareReconstruct|FigurativeDetectiveCase|FigurativeChoiceCase|FigurativeReconstructCase}){
 return <section className="card-ink bg-card p-5 space-y-3" aria-label="Texto para analizar">
  <p className="text-xs font-bold uppercase tracking-wider text-primary">Lectura · {item.subtopic}</p>
  <h2 className="text-xl font-black">{item.id.startsWith("m3-reading-")?`Integración de tres fuentes · ${item.subtopic}`:item.title}</h2>
  {item.id.startsWith("m3-reading-")
   ?<div className="space-y-3">
     {item.passage.split(/(?=FUENTE [ABC]\\n)/).filter(Boolean).map((block,i)=>
      <section key={i} className="rounded-lg border-2 border-foreground/40 bg-background p-3 whitespace-pre-line leading-relaxed text-base"
       aria-label={`Fuente de lectura ${"ABC"[i]}`}>{block.trim()}</section>)}
    </div>
   :<p className="leading-relaxed whitespace-pre-line text-base">{item.passage}</p>}
 </section>;
}
const TYPES:EvidenceTag[]=["explicit","inference","unsupported"];
export function ReadingDetective({item,report,next,isLast}:GameProps<ReadingChallenge|MainIdeaDetectiveCase|InferenceDetectiveCase|CriticalDetectiveCase|NewReadingDetective|AnalysisDetective|CompareDetective|FigurativeDetectiveCase>){
 const [picks,setPicks]=useState<Record<number,EvidenceTag>>({});
 const [checked,setChecked]=useState(false);
 const done=item.claims.every((_,i)=>Boolean(picks[i]));
 const check=()=>{
  if(!done||checked)return;
  setChecked(true);
  item.claims.forEach((claim,i)=>{
   const ok=picks[i]===claim.tag;
   report(ok,ok?undefined:{prompt:claim.text,given:EVIDENCE_LABEL[picks[i]],correct:EVIDENCE_LABEL[claim.tag],exp:claim.explanation});
  });
 };
 return <div className="space-y-5">
  <Passage item={item}/>
  <p className="font-bold">Detective de ideas: clasifica cada afirmación según las pruebas de la lectura.</p>
  {item.claims.map((claim,i)=><div key={i} className="card-ink bg-card p-4 space-y-3">
   <p className="font-semibold">{i+1}. {claim.text}</p>
   <div className="flex flex-wrap gap-2" role="group" aria-label={`Clasificación de afirmación ${i+1}`}>
    {TYPES.map(type=><button key={type} disabled={checked} aria-pressed={picks[i]===type}
     onClick={()=>setPicks(x=>({...x,[i]:type}))}
     className={`rounded-lg border-2 border-foreground px-3 py-2 text-sm font-bold ${picks[i]===type?"bg-primary text-primary-foreground":"bg-muted"} disabled:cursor-default`}>{EVIDENCE_LABEL[type]}</button>)}
   </div>
   {checked&&<LearningFeedback correct={picks[i]===claim.tag} subtopic={item.subtopic}
     selected={EVIDENCE_LABEL[picks[i]]} expected={EVIDENCE_LABEL[claim.tag]} explanation={claim.explanation}/>}
  </div>)}
  {!checked?<button onClick={check} disabled={!done} className="tile w-full bg-primary text-primary-foreground disabled:opacity-40">{done?"Comprobar las tres afirmaciones":"Clasifica las tres afirmaciones"}</button>:<NextButton onClick={next} isLast={isLast}/>}
 </div>;
}
export function ReadingInference({item,report,next,isLast}:GameProps<ReadingChallenge|MainIdeaChoiceCase|InferenceChoiceCase|CriticalChoiceCase|NewReadingChoice|AnalysisChoice|CompareChoice|FigurativeChoiceCase>){
 const [pick,setPick]=useState<number|null>(null);
 const choose=(i:number)=>{
  if(pick!==null)return;
  setPick(i);
  const ok=i===item.answer;
  report(ok,ok?undefined:{prompt:item.question,given:item.options[i],correct:item.options[item.answer],exp:item.explanation});
 };
 return <div className="space-y-5">
  <Passage item={item}/>
  <h2 className="text-xl font-black">Verdad o inferencia</h2>
  <p className="font-semibold">{item.question}</p>
  <div className="grid gap-3">{item.options.map((choice,i)=><button key={i} disabled={pick!==null} onClick={()=>choose(i)}
   className={`tile text-left ${pick===null?"bg-card":i===item.answer?"bg-success-soft":i===pick?"bg-destructive-soft":"bg-muted opacity-60"}`}>
   {pick!==null&&i===item.answer?"✓ ":pick===i?"✗ ":""}{choice}
  </button>)}</div>
  {pick!==null&&<div className="space-y-3" aria-live="polite">
   <LearningFeedback correct={pick===item.answer} subtopic={item.subtopic}
    selected={item.options[pick]} expected={item.options[item.answer]} explanation={item.explanation}/><NextButton onClick={next} isLast={isLast}/></div>}
 </div>;
}
export function ReadingReconstruct({item,report,next,isLast}:GameProps<ReadingChallenge|MainIdeaReconstructCase|InferenceReconstructCase|CriticalReconstructCase|NewReadingReconstruct|AnalysisReconstruct|CompareReconstruct|FigurativeReconstructCase>){
 const [sequence,setSequence]=useState<number[]>([]);
 const [checked,setChecked]=useState(false);
 const pieces=item.order.parts;
 const bank=[2,0,1] as const;
 const ok=checkReadingOrder(pieces,sequence);
 const check=()=>{
  if(checked||sequence.length!==pieces.length)return;
  setChecked(true);
  report(ok,ok?undefined:{prompt:"Reconstruye el razonamiento: "+item.title,given:sequence.map(i=>pieces[i]).join(" → "),correct:pieces.join(" → "),exp:item.order.explanation});
 };
 return <div className="space-y-5">
  <Passage item={item}/>
  <h2 className="text-xl font-black">Reconstruye el texto</h2>
  <p>{item.order.hint} Toca las fichas en el orden correcto.</p>
  <div className="min-h-24 border-2 border-dashed border-foreground rounded-xl p-3 flex flex-wrap gap-2" aria-live="polite" aria-label="Tu secuencia de razonamiento">
   {sequence.length===0&&<p className="text-muted-foreground">Selecciona la primera ficha…</p>}
   {sequence.map((idx,i)=><button key={idx} disabled={checked} onClick={()=>setSequence(xs=>xs.filter(x=>x!==idx))}
    className="tile bg-accent text-left text-sm">{i+1}. {pieces[idx]} <span aria-hidden>×</span></button>)}
  </div>
  <p className="font-bold">Fichas disponibles</p>
  <div className="grid gap-2">{bank.map(idx=><button key={idx} disabled={checked||sequence.includes(idx)}
   onClick={()=>setSequence(xs=>[...xs,idx])} className="tile bg-card text-left text-sm disabled:opacity-30">{pieces[idx]}</button>)}</div>
  {!checked?<div className="grid grid-cols-2 gap-2">
   <button disabled={!sequence.length} onClick={()=>setSequence(xs=>xs.slice(0,-1))} className="tile bg-card disabled:opacity-40">↶ Deshacer</button>
   <button disabled={!sequence.length} onClick={()=>setSequence([])} className="tile bg-card disabled:opacity-40">Vaciar</button>
   <button disabled={sequence.length!==3} onClick={check} className="tile col-span-2 bg-primary text-primary-foreground disabled:opacity-40">Comprobar secuencia</button>
  </div>:<div aria-live="polite" className="space-y-3">
   <LearningFeedback correct={ok} subtopic={item.subtopic} title={ok?"¡Orden correcto!":"Este no es el orden lógico."}
     selected={sequence.map(i=>pieces[i]).join(" → ")} expected={pieces.join(" → ")} explanation={item.order.explanation}/><NextButton onClick={next} isLast={isLast}/></div>}
 </div>;
}
