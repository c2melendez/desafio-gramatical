import {SYNONYM_CLASSIFICATION} from "@/lib/grammar-classify-synonyms";
import {COHESION_CLASSIFICATION} from "@/lib/grammar-classify-cohesion";
import {M2_GRAMMAR_ACTIVITIES} from "@/lib/m2-grammar";
import {M3_GRAMMAR_ACTIVITIES} from "@/lib/m3-grammar";
import {Link} from "@tanstack/react-router";
import {GameSessionHeader,ROUNDS_PER_GAME} from "@/components/games/GameSessionHeader";
import {studyReturn} from "@/lib/study-context";
import {useEffect,useRef,useState} from "react";
import {emptyLedger,recordRound,roundResult} from "@/lib/round-ledger";
import {saveHistory,type Level,type Mode} from "@/lib/grammar";
import {readRotation,recordRotation,rotationKey,selectRotation,writeRotation} from "@/lib/rotation";
import {GrammarClassification,GrammarConstruction} from "@/components/games/GrammarActivities";
import type {ClassificationActivity,ConstructionActivity} from "@/lib/grammar-activities";
import {COHESION_CONSTRUCTION,MORPH_CLASSIFICATION,MORPH_CONSTRUCTION,SYNONYM_CONSTRUCTION} from "@/lib/grammar-m1-activities";
import {M1_NEXT_ACTIVITIES} from "@/lib/grammar-m1-next-activities";
import {M1_LITERATURE_ACTIVITIES} from "@/lib/grammar-m1-literature";

type M1Item=ClassificationActivity|ConstructionActivity;
export function grammarM1Pool(subtopic:string,modo:Mode,nivel:Level):M1Item[]{
 if(modo==="quiz")return []; // la selección siempre se atiende en GrammarPilot
 const base: M1Item[]=subtopic==="Sinónimos y antónimos"&&modo==="clasificar"?SYNONYM_CLASSIFICATION:
 subtopic==="Cohesión y coherencia"&&modo==="clasificar"?COHESION_CLASSIFICATION:
 subtopic==="Sinónimos y antónimos"&&modo==="construir"?SYNONYM_CONSTRUCTION:
 subtopic==="Cohesión y coherencia"&&modo==="construir"?COHESION_CONSTRUCTION:
 subtopic==="Morfosintaxis"&&modo==="clasificar"?MORPH_CLASSIFICATION:
 subtopic==="Morfosintaxis"&&modo==="construir"?MORPH_CONSTRUCTION:
 [...M1_NEXT_ACTIVITIES,...M1_LITERATURE_ACTIVITIES].filter(x=>x.subtopic===subtopic&&x.kind===(modo==="construir"?"construction":"classification"));
 const expanded=[...M2_GRAMMAR_ACTIVITIES,...M3_GRAMMAR_ACTIVITIES].filter(x=>x.subtopic===subtopic&&x.kind===(modo==="construir"?"construction":"classification"));
 return [...base,...expanded].filter(x=>x.level===nivel);
}
/** La ruta mantiene independientes IDs, exposición, errores e historial por juego/nivel. */
export function GrammarM1Play({subtema,modo,nivel}:{subtema:string;modo:Mode;nivel:Level}){
 const [round,setRound]=useState(0);
 const [items,setItems]=useState<M1Item[]|null>(null);
 const [index,setIndex]=useState(0);
 const [correct,setCorrect]=useState(0);
 const [streak,setStreak]=useState(0);

 const [score,setScore]=useState(0);
 const [finished,setFinished]=useState(false);
 const ledger=useRef(emptyLedger());
 const advanced=useRef(-1);
 const topic=subtema==="Figuras retóricas"||subtema==="Géneros literarios"?"Literatura":"Gramática y semántica";
 const key=rotationKey("espanol",topic,subtema,modo,nivel);
 const returnTo=studyReturn(topic,subtema,modo,nivel);
 const source=grammarM1Pool(subtema,modo,nivel);
 useEffect(()=>{
  ledger.current=emptyLedger();advanced.current=-1;
  const bank=grammarM1Pool(subtema,modo,nivel);
  setItems(selectRotation(bank,readRotation(key,bank.map(x=>x.id)),10));
  setIndex(0);setCorrect(0);setStreak(0);setScore(0);setFinished(false);
 },[subtema,modo,nivel,round,key]);
 if(!items)return <main className="p-6">Preparando ejercicios…</main>;
 if(!items.length)return <main className="p-6">No hay ejercicios para esta combinación. <Link to="/">Volver al menú</Link></main>;
 const item=items[index];
 const onResult=(ok:boolean)=>{
  const updated=recordRound(ledger.current,{id:item.id,correct:ok});
  if(updated===ledger.current)return;
  ledger.current=updated;setCorrect(updated.correct);setScore(updated.score);setStreak(updated.streak);
  writeRotation(key,recordRotation(readRotation(key,source.map(x=>x.id)),item.id,ok));
 };
 const onNext=()=>{
  if(ledger.current.events.length!==index+1||advanced.current===index)return;
  advanced.current=index;
  if(index+1===items.length){
   const result=roundResult(ledger.current);if(!result.finished)return;
   saveHistory({date:new Date().toISOString(),mode:modo,level:nivel,score:result.score,correct:result.correct,total:result.attempted,
    bestStreak:ledger.current.bestStreak,area:"espanol",topic,subtopic:subtema});
   setFinished(true);
  }else setIndex(i=>i+1);
 };
 if(finished)return <main className="mx-auto max-w-xl p-6 space-y-4"><h1 className="text-3xl font-black">Práctica terminada</h1><p>{subtema}: {correct}/{items.length} respuestas correctas</p>
 <p className="text-sm">Este resultado corresponde al juego y no equivale a una puntuación PHUMA oficial.</p>
 <button className="tile bg-primary text-primary-foreground" onClick={()=>setRound(n=>n+1)}>Practicar de nuevo</button>
 <Link className="block underline" to="/" search={returnTo}>Volver a la selección</Link></main>;
 return <main className="mx-auto max-w-2xl px-4 py-5 space-y-5">
  <GameSessionHeader context={`${subtema} · ${nivel}`} title={modo==="construir"?"Construcción":"Clasificación"}
   round={index+1} total={ROUNDS_PER_GAME} score={score} streak={streak} onRestart={()=>setRound(n=>n+1)} returnTo={returnTo}/>
  <p role="note" className="text-sm text-muted-foreground">Material original de práctica; revisión académica pendiente. No equivale a un examen PHUMA oficial.</p>
  {item.kind==="construction"?<GrammarConstruction key={item.id} item={item} onResult={onResult} onNext={onNext}/>:
  <GrammarClassification key={item.id} item={item} onResult={onResult} onNext={onNext}/>}
 </main>;
}
