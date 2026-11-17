import {Link} from "@tanstack/react-router";
import {useEffect,useState} from "react";
import {saveHistory,type Level,type Mode} from "@/lib/grammar";
import {readRotation,recordRotation,rotationKey,selectRotation,writeRotation} from "@/lib/rotation";
import {GrammarClassification,GrammarConstruction} from "@/components/games/GrammarActivities";
import type {ClassificationActivity,ConstructionActivity} from "@/lib/grammar-activities";
import {COHESION_CONSTRUCTION,MORPH_CLASSIFICATION,MORPH_CONSTRUCTION,SYNONYM_CONSTRUCTION} from "@/lib/grammar-m1-activities";
import {M1_NEXT_ACTIVITIES} from "@/lib/grammar-m1-next-activities";

type M1Item=ClassificationActivity|ConstructionActivity;
export function grammarM1Pool(subtopic:string,modo:Mode,nivel:Level):M1Item[]{
 const items=subtopic==="Sinónimos y antónimos"&&modo==="construir"?SYNONYM_CONSTRUCTION:
 subtopic==="Cohesión y coherencia"&&modo==="construir"?COHESION_CONSTRUCTION:
 subtopic==="Morfosintaxis"&&modo==="clasificar"?MORPH_CLASSIFICATION:
 subtopic==="Morfosintaxis"&&modo==="construir"?MORPH_CONSTRUCTION:
 M1_NEXT_ACTIVITIES.filter(x=>x.subtopic===subtopic&&x.kind===(modo==="construir"?"construction":"classification"));
 return items.filter(item=>item.level===nivel);
}
/** La ruta mantiene independientes IDs, exposición, errores e historial por juego/nivel. */
export function GrammarM1Play({subtema,modo,nivel}:{subtema:string;modo:Mode;nivel:Level}){
 const [round,setRound]=useState(0);
 const [items,setItems]=useState<M1Item[]|null>(null);
 const [index,setIndex]=useState(0);
 const [correct,setCorrect]=useState(0);
 const [streak,setStreak]=useState(0);
 const [best,setBest]=useState(0);
 const [finished,setFinished]=useState(false);
 const key=rotationKey("espanol","Gramática y semántica",subtema,modo,nivel);
 const source=grammarM1Pool(subtema,modo,nivel);
 useEffect(()=>{
  const bank=grammarM1Pool(subtema,modo,nivel);
  setItems(selectRotation(bank,readRotation(key,bank.map(x=>x.id)),10));
  setIndex(0);setCorrect(0);setStreak(0);setBest(0);setFinished(false);
 },[subtema,modo,nivel,round,key]);
 if(!items)return <main className="p-6">Preparando ejercicios…</main>;
 if(!items.length)return <main className="p-6">No hay ejercicios para esta combinación. <Link to="/">Volver al menú</Link></main>;
 const item=items[index];
 const onResult=(ok:boolean)=>{
  if(ok){setCorrect(n=>n+1);setStreak(n=>{const next=n+1;setBest(v=>Math.max(v,next));return next;});}
  else setStreak(0);
  writeRotation(key,recordRotation(readRotation(key,source.map(x=>x.id)),item.id,ok));
 };
 const onNext=()=>{
  if(index+1===items.length){
   saveHistory({date:new Date().toISOString(),mode:modo,level:nivel,score:correct*10,correct,total:items.length,
    bestStreak:best,area:"espanol",topic:"Gramática y semántica",subtopic:subtema});
   setFinished(true);
  }else setIndex(i=>i+1);
 };
 if(finished)return <main className="mx-auto max-w-xl p-6 space-y-4"><h1 className="text-3xl font-black">Práctica terminada</h1><p>{subtema}: {correct}/{items.length} respuestas correctas</p>
 <p className="text-sm">Este resultado corresponde al juego y no equivale a una puntuación PHUMA oficial.</p>
 <button className="tile bg-primary text-primary-foreground" onClick={()=>setRound(n=>n+1)}>Practicar de nuevo</button>
 <Link className="block underline" to="/">Volver al menú</Link></main>;
 return <main className="mx-auto max-w-2xl p-6 space-y-5">
  <Link to="/" className="underline">← Menú</Link>
  <h1 className="text-2xl font-black">{subtema}</h1>
  <p>{modo==="construir"?"Construcción":"Clasificación"} · Pregunta {index+1} de {items.length} · {nivel}</p>
  {item.kind==="construction"?<GrammarConstruction key={item.id} item={item} onResult={onResult} onNext={onNext}/>:
  <GrammarClassification key={item.id} item={item} onResult={onResult} onNext={onNext}/>}
 </main>;
}
