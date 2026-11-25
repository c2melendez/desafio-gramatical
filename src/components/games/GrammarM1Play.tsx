import {SYNONYM_CLASSIFICATION} from "@/lib/grammar-classify-synonyms";
import {COHESION_CLASSIFICATION} from "@/lib/grammar-classify-cohesion";
import {M2_GRAMMAR_ACTIVITIES} from "@/lib/m2-grammar";
import {M3_GRAMMAR_ACTIVITIES} from "@/lib/m3-grammar";
import {Link} from "@tanstack/react-router";
import {GameSessionHeader,ROUNDS_PER_GAME} from "@/components/games/GameSessionHeader";
import {studyReturn} from "@/lib/study-context";
import {useEffect,useRef,useState} from "react";
import {startSession,submitRound,sessionResult,type Session} from "@/lib/game-session-contract";
import {persistPerfect} from "@/lib/game-achievement-storage";
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
 const sessionRef=useRef<Session|null>(null);
 const finalized=useRef(false);
 const [session,setSession]=useState<Session|null>(null);
 const [savedPerfect,setSavedPerfect]=useState(false);
 const [storageWarning,setStorageWarning]=useState(false);
 const result=session?sessionResult(session):null;
 const {correct=0,streak=0,score=0}=result??{};
 const [finished,setFinished]=useState(false);
 const topic=subtema==="Figuras retóricas"||subtema==="Géneros literarios"?"Literatura":"Gramática y semántica";
 const key=rotationKey("espanol",topic,subtema,modo,nivel);
 const returnTo=studyReturn(topic,subtema,modo,nivel);
 const source=grammarM1Pool(subtema,modo,nivel);
 useEffect(()=>{
  const bank=grammarM1Pool(subtema,modo,nivel);
  const chosen=selectRotation(bank,readRotation(key,bank.map(x=>x.id)),ROUNDS_PER_GAME);
  const nextSession=chosen.length===ROUNDS_PER_GAME?startSession(crypto.randomUUID(),{area:"espanol",topic,subtopic:subtema,game:modo,level:nivel},"grammar-m1-m3-contract-v1",chosen.map(x=>x.id)):null;
  sessionRef.current=nextSession;finalized.current=false;setSession(nextSession);setSavedPerfect(false);setStorageWarning(false);
  setItems(chosen);setIndex(0);setFinished(false);
 },[subtema,modo,nivel,round,key,topic]);
 if(!items)return <main className="p-6">Preparando ejercicios…</main>;
 if(!session)return <main className="p-6">No hay diez ejercicios únicos disponibles para esta combinación. <Link to="/">Volver al menú</Link></main>;
 const item=items[index];
 const onResult=(ok:boolean)=>{
  const current=sessionRef.current;if(!current||finalized.current)return;
  const updated=submitRound(current,item.id,[ok]);if(updated===current)return;
  sessionRef.current=updated;setSession(updated);
  writeRotation(key,recordRotation(readRotation(key,source.map(x=>x.id)),item.id,ok));
 };
 const onNext=()=>{
  const current=sessionRef.current;if(!current||finalized.current||current.rounds.length!==index+1)return;
  if(index===items.length-1){
   const final=sessionResult(current);if(!final.finished)return;
   finalized.current=true;const date=new Date().toISOString();
   saveHistory({date,mode:modo,level:nivel,score:final.score,correct:final.correct,total:final.attempted,bestStreak:final.bestStreak,area:"espanol",topic,subtopic:subtema});
   if(final.approved100){try{const saved=persistPerfect(localStorage,current,date);setSavedPerfect(saved.status==="ok");setStorageWarning(saved.status!=="ok");}catch{setStorageWarning(true);}}
   setFinished(true);
  }else setIndex(index+1);
 };
 if(finished)return <main className="mx-auto max-w-xl p-6 space-y-4"><h1 className="text-3xl font-black">Práctica terminada</h1><p>{subtema}: {correct}/{items.length} respuestas correctas</p>
 {savedPerfect&&<p role="status" className="card-ink bg-success-soft p-3 font-bold">★ Dominado al 100 % · logro guardado</p>}
 {storageWarning&&<p role="status">Partida perfecta; no fue posible guardar el logro en este navegador.</p>}
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
