import {useState} from "react";
import type {MathModel} from "@/lib/math-m1";
import {LearningFeedback} from "./LearningFeedback";

export function MathExerciseCard({item,onResult,onNext,isLast}:{
 item:MathModel;onResult:(correct:boolean,given:string)=>void;onNext:()=>void;isLast:boolean;
}){
 const [choices,setChoices]=useState<number[]>([]);
 const complete=item.mode==="clasificar"?choices.length===item.assertions.length:
  item.mode==="construir"?choices.length===item.steps.length:choices.length===1;
 const expected=item.mode==="clasificar"?item.assertions.map(x=>x.truth?"Verdadero":"Falso").join(" · "):
  item.mode==="construir"?item.steps.map(x=>x.choices[x.answerIndex]).join(" → "):item.expected;
 const given=item.mode==="clasificar"?choices.map(x=>x===0?"Verdadero":"Falso").join(" · "):
  item.mode==="construir"?choices.map((x,i)=>item.steps[i].choices[x]).join(" → "):
  choices.length?item.options[choices[0]]:"";
 const correct=complete&&(item.mode==="clasificar"?choices.every((x,i)=>(x===0)===item.assertions[i].truth):
  item.mode==="construir"?choices.every((x,i)=>x===item.steps[i].answerIndex):
  choices[0]===item.answerIndex);
 function answer(index:number){
  if(complete)return;
  const next=[...choices,index];setChoices(next);
  const isDone=item.mode==="clasificar"?next.length===item.assertions.length:
   item.mode==="construir"?next.length===item.steps.length:next.length===1;
  if(isDone){
   const ok=item.mode==="clasificar"?next.every((x,i)=>(x===0)===item.assertions[i].truth):
    item.mode==="construir"?next.every((x,i)=>x===item.steps[i].answerIndex):
    next[0]===item.answerIndex;
   const response=item.mode==="clasificar"?next.map(x=>x===0?"Verdadero":"Falso").join(" · "):
    item.mode==="construir"?next.map((x,i)=>item.steps[i].choices[x]).join(" → "):item.options[index];
   onResult(ok,response);
  }
 }
 const selection=item.mode==="construir"?item.steps[choices.length]?.choices:
  item.mode==="quiz"?item.options:null;
 return <section className="card-ink bg-card p-5 space-y-4" aria-label="Ejercicio matemático">
  <p className="text-xs font-bold uppercase tracking-wide text-primary">{item.subtopic} · {item.mode==="quiz"?"Selección":item.mode==="clasificar"?"Clasificación":"Construcción"}</p>
  <h2 className="text-xl font-black leading-relaxed">{item.prompt}</h2>
  {item.mode==="clasificar"&&!complete&&<div className="space-y-4">
   <p className="text-sm text-muted-foreground">Evalúa cada afirmación con los datos del ejercicio. Las tres decisiones forman una sola ronda.</p>
   <div className="card-ink bg-background p-4"><p className="text-sm font-bold">Afirmación {choices.length+1} de 3</p>
    <p className="mt-2">{item.assertions[choices.length].text}</p></div>
   <div className="grid grid-cols-2 gap-2">
    <button className="tile bg-card" onClick={()=>answer(0)}>Verdadero</button>
    <button className="tile bg-card" onClick={()=>answer(1)}>Falso</button>
   </div>
  </div>}
  {item.mode==="construir"&&!complete&&<div className="space-y-3">
   <p className="text-sm text-muted-foreground">Completa dos decisiones del procedimiento. Ambas deben ser correctas para acertar la ronda.</p>
   <h3 className="font-bold">{item.steps[choices.length].label} · paso {choices.length+1} de 2</h3>
   <div className="grid grid-cols-2 gap-2">
    {selection?.map((option,i)=><button key={i} onClick={()=>answer(i)} className="tile bg-card text-center">{option}</button>)}
   </div>
  </div>}
  {item.mode==="quiz"&&!complete&&<div className="space-y-3">
   <p className="text-sm text-muted-foreground">Elige el resultado que satisface el enunciado.</p>
   <div className="grid grid-cols-2 gap-2">{selection?.map((option,i)=>
    <button key={i} onClick={()=>answer(i)} className="tile bg-card">{option}</button>)}</div>
  </div>}
  {complete&&<div className="space-y-3">
   <LearningFeedback correct={correct} subtopic={item.subtopic} selected={given} expected={expected}
    explanation={item.explanation+" Procedimiento comprobable: "+item.formula+"."}/>
   <button type="button" className="tile w-full bg-primary text-primary-foreground" onClick={onNext}>
    {isLast?"Ver resultados":"Continuar"}
   </button>
  </div>}
  <p className="text-xs text-muted-foreground">Ejercicios originales de práctica · revisión docente y calibración pendientes. No son preguntas oficiales PHUMA.</p>
 </section>;
}
