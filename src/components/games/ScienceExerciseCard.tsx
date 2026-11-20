import {useState} from "react";
import type {ScienceItem} from "@/lib/science-m1";
import {LearningFeedback} from "./LearningFeedback";

/** Paridad de mecánicas y una sola actualización de marcador por diez rondas. */
export function ScienceExerciseCard({item,onResult,onNext,isLast,areaLabel="Ciencias Naturales"}:{
 item:ScienceItem;areaLabel?:string;onResult:(ok:boolean,given:string)=>void;onNext:()=>void;isLast:boolean;
}){
 const [choices,setChoices]=useState<number[]>([]);
 const expected=item.mode==="clasificar"?item.assertions.map(x=>x.truth?"Verdadero":"Falso").join(" · "):
  item.mode==="construir"?item.steps.map(x=>x.choices[x.answerIndex]).join(" → "):item.expected;
 const finished=item.mode==="clasificar"?choices.length===3:
  item.mode==="construir"?choices.length===2:choices.length===1;
 const given=item.mode==="clasificar"?choices.map(x=>x===0?"Verdadero":"Falso").join(" · "):
  item.mode==="construir"?choices.map((x,i)=>item.steps[i].choices[x]).join(" → "):
  choices.length?item.options[choices[0]]:"";
 const correct=finished&&(item.mode==="clasificar"?choices.every((x,i)=>(x===0)===item.assertions[i].truth):
  item.mode==="construir"?choices.every((x,i)=>x===item.steps[i].answerIndex):choices[0]===item.answerIndex);
 function answer(n:number){
  if(finished)return;
  const next=[...choices,n];setChoices(next);
  const done=next.length===(item.mode==="quiz"?1:item.mode==="clasificar"?3:2);
  if(!done)return;
  const ok=item.mode==="clasificar"?next.every((v,i)=>(v===0)===item.assertions[i].truth):
   item.mode==="construir"?next.every((v,i)=>v===item.steps[i].answerIndex):n===item.answerIndex;
  const selected=item.mode==="clasificar"?next.map(v=>v===0?"Verdadero":"Falso").join(" · "):
   item.mode==="construir"?next.map((v,i)=>item.steps[i].choices[v]).join(" → "):item.options[n];
  onResult(ok,selected);
 }
 return <section className="card-ink bg-card p-5 space-y-4" aria-label={`Ejercicio de ${areaLabel}`}>
  <p className="text-xs font-bold uppercase tracking-wide text-primary">{item.subtopic} · {item.mode==="quiz"?"Selección":item.mode==="clasificar"?"Clasificación":"Construcción"}</p>
  <h2 className="text-xl font-black leading-relaxed">{item.prompt}</h2>
  {item.mode==="clasificar"&&!finished&&<div className="space-y-3">
   <p className="text-sm text-muted-foreground">Evalúa las tres afirmaciones. Forman una sola ronda.</p>
   <div className="card-ink bg-background p-4">
    <p className="font-bold text-sm">Afirmación {choices.length+1} de 3</p>
    <p>{item.assertions[choices.length].text}</p>
   </div>
   <div className="grid grid-cols-2 gap-2">
    <button className="tile bg-card" onClick={()=>answer(0)}>Verdadero</button>
    <button className="tile bg-card" onClick={()=>answer(1)}>Falso</button>
   </div>
  </div>}
  {item.mode==="quiz"&&!finished&&<div className="space-y-3">
   <p className="text-sm text-muted-foreground">Elige la única descripción que corresponde al caso.</p>
   <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">{item.options.map((v,i)=>
    <button key={i} onClick={()=>answer(i)} className="tile bg-card text-left">{v}</button>)}</div>
  </div>}
  {item.mode==="construir"&&!finished&&<div className="space-y-3">
   <p className="text-sm text-muted-foreground">Construye una explicación en dos pasos. Ambos son necesarios para acertar.</p>
   <h3 className="font-bold">{item.steps[choices.length].label} · paso {choices.length+1} de 2</h3>
   <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">{item.steps[choices.length].choices.map((v,i)=>
    <button key={i} onClick={()=>answer(i)} className="tile bg-card text-left">{v}</button>)}</div>
  </div>}
  {finished&&<div className="space-y-3">
   <LearningFeedback correct={correct} subtopic={item.subtopic} selected={given} expected={expected}
    explanation={item.explanation+" Criterio comprobable: "+item.formula+"."}/>
   <button className="tile w-full bg-primary text-primary-foreground" onClick={onNext}>
    {isLast?"Ver resultados":"Continuar"}
   </button>
  </div>}
  <p className="text-xs text-muted-foreground">Ejercicios originales · revisión docente pendiente · no son preguntas oficiales PHUMA.</p>
 </section>;
}
