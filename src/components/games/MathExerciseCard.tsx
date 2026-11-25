import {useState} from "react";
import type {MathModel} from "@/lib/math-m1";
import {LearningFeedback} from "./LearningFeedback";
import {MathVisualStimulus} from "./MathVisualStimulus";

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
 // OP-04: report the actual mistaken subdecision before showing the worked solution.
 const operationClaimReason=(text:string,truth:boolean)=>{
  if(item.oracle.kind!=="Operaciones")return item.explanation;
  if(truth)return item.explanation;
  if(text.includes("queda −"))return "El producto que queda conserva su signo positivo; cancelar un término opuesto no cambia el signo de otro.";
  if(text.includes("también se cancela"))return "Solo se cancelan productos iguales con signos opuestos; el otro producto permanece.";
  if(text.includes("omitir el segundo sumando"))return "Multiplicar por uno conserva los dos sumandos; omitir uno cambia el valor.";
  if(text.includes("multiplicar solo el primer sumando"))return "La propiedad distributiva exige multiplicar los dos sumandos por el factor común.";
  if(text.includes("sin respetar el producto"))return "Sumar el factor como un tercer sumando sustituye una multiplicación por una suma y altera el resultado.";
  return item.explanation;
 };
 const subdecisionFeedback=complete&&!correct&&(item.oracle.kind==="Operaciones-racionales"||item.oracle.kind==="Operaciones")
  ?item.mode==="clasificar"?item.assertions.flatMap((a,i)=>(choices[i]===0)===a.truth?[]:[`Afirmación «${a.text}»: es ${a.truth?"verdadera":"falsa"}. ${operationClaimReason(a.text,a.truth)}`]).join(" ")
   :item.mode==="construir"?item.steps.flatMap((s,i)=>{
    if(choices[i]===s.answerIndex)return [];
    const chosen=s.choices[choices[i]];
    return [i===0&&item.oracle.kind==="Operaciones"?`Paso elegido: ${chosen}. ${item.explanation} El valor correcto de este paso es ${s.choices[s.answerIndex]}.`:i===0?`Raíz elegida: ${chosen}. La raíz principal debe ser no negativa y su cuadrado debe coincidir con el radicando; el valor correcto es ${s.choices[s.answerIndex]}.`:`Resultado elegido: ${chosen}. ${item.optionExplanations?.[chosen]??"Comprueba la precedencia y las unidades fraccionarias."}`];
   }).join(" "):""
  :"";
 const selection=item.mode==="construir"?item.steps[choices.length]?.choices:
  item.mode==="quiz"?item.options:null;
 return <section className="card-ink bg-card p-5 space-y-4" aria-label="Ejercicio matemático">
  <p className="text-xs font-bold uppercase tracking-wide text-primary">{item.subtopic} · {item.mode==="quiz"?"Selección":item.mode==="clasificar"?"Clasificación":"Construcción"}</p>
  <h2 className="text-xl font-black leading-relaxed">{item.prompt}</h2>
  {item.visual&&<MathVisualStimulus visual={item.visual}/> }
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
    explanation={(subdecisionFeedback?subdecisionFeedback+" ":"")+(!correct&&item.mode==="quiz"&&item.optionExplanations?.[given]?item.optionExplanations[given]+" ":"")+item.explanation+" Procedimiento comprobable: "+item.formula+"."}/>
   <button type="button" className="tile w-full bg-primary text-primary-foreground" onClick={onNext}>
    {isLast?"Ver resultados":"Continuar"}
   </button>
  </div>}
  <p className="text-xs text-muted-foreground">Ejercicios originales de práctica · revisión docente y calibración pendientes. No son preguntas oficiales PHUMA.</p>
 </section>;
}
