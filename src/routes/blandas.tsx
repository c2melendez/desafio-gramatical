import {savePerfect,newAttemptId} from "@/lib/perfect-achievements";
import {PerfectBadge} from "@/components/games/PerfectBadge";
import {createFileRoute,Link} from "@tanstack/react-router";
import {useEffect,useState,useRef} from "react";
import {emptyLedger,recordRound,roundResult} from "@/lib/round-ledger";
import {LEVELS,LEVEL_LABEL,saveHistory,type Mistake} from "@/lib/grammar";
import {type ScienceItem} from "@/lib/science-m1";
import {softTopic} from "@/lib/soft-m1";
import {validateSoftSearch} from "@/lib/soft-route";

import {softM3Pool} from "@/lib/soft-m3";
import {gameNames} from "@/lib/phuma-catalog";
import {studyReturn} from "@/lib/study-context";
import {GameSessionHeader,ROUNDS_PER_GAME} from "@/components/games/GameSessionHeader";
import {ScienceExerciseCard} from "@/components/games/ScienceExerciseCard";
import {rotationKey,readRotation,selectRotation,recordRotation,writeRotation} from "@/lib/rotation";

export const Route=createFileRoute("/blandas")({
 validateSearch:validateSoftSearch,
 head:()=>({meta:[{title:"Habilidades Blandas — Academia PHUMA Play"},
  {name:"description",content:"Práctica de Habilidades Blandas M3 con 10 rondas y explicaciones."}]}),
 component:SoftPlay,
});
function SoftPlay(){
 const {subtema,modo,nivel}=Route.useSearch();
 const topic=softTopic(subtema);
 const returnTo=studyReturn(topic,subtema,modo,nivel,"blandas");
 const [run,setRun]=useState(0);
 const [items,setItems]=useState<ScienceItem[]|null>(null);
 const [index,setIndex]=useState(0);
 const [correct,setCorrect]=useState(0),[total,setTotal]=useState(0),[score,setScore]=useState(0);
 const [streak,setStreak]=useState(0),[best,setBest]=useState(0);
 const [mistakes,setMistakes]=useState<Mistake[]>([]);
 const [finished,setFinished]=useState(false);
 const ledger=useRef(emptyLedger());
 const advanced=useRef(-1);
 const attemptId=useRef("");
 useEffect(()=>{
  const bank=softM3Pool(topic,subtema,nivel,modo),key=rotationKey("blandas",topic,subtema,modo,nivel);
  const chosen=selectRotation(bank,readRotation(key,bank.map(x=>x.id)),ROUNDS_PER_GAME);
  ledger.current=emptyLedger();advanced.current=-1;attemptId.current=newAttemptId();
  setItems(chosen);setIndex(0);setCorrect(0);setTotal(0);setScore(0);setStreak(0);setBest(0);setMistakes([]);setFinished(false);
 },[topic,subtema,nivel,modo,run]);
 const report=(ok:boolean,given:string)=>{
  if(!items||total>index)return;
  const item=items[index],bank=softM3Pool(topic,subtema,nivel,modo),key=rotationKey("blandas",topic,subtema,modo,nivel);
  const updated=recordRound(ledger.current,{id:item.id,correct:ok});
  if(updated===ledger.current)return;
  ledger.current=updated;
  writeRotation(key,recordRotation(readRotation(key,bank.map(x=>x.id)),item.id,ok));
  setTotal(updated.events.length);setCorrect(updated.correct);setScore(updated.score);setStreak(updated.streak);setBest(updated.bestStreak);
  if(!ok)setMistakes(ms=>[...ms,{prompt:item.prompt,given,correct:item.expected,exp:item.explanation}]);
 };
 const next=()=>{
  if(!items||ledger.current.events.length!==index+1||advanced.current===index)return;
  advanced.current=index;
  if(index===items.length-1){
   const result=roundResult(ledger.current);
   if(!result.finished)return;
   savePerfect(returnTo,ledger.current,attemptId.current);saveHistory({date:new Date().toISOString(),mode:modo,level:nivel,score:result.score,correct:result.correct,total:result.attempted,bestStreak:ledger.current.bestStreak,
    area:"blandas",topic,subtopic:subtema});
   setFinished(true);
  }else setIndex(i=>i+1);
 };
 if(!items)return <main id="contenido-principal" tabIndex={-1} className="mx-auto max-w-xl p-6">Preparando ejercicios de Habilidades Blandas…</main>;
 if(items.length!==ROUNDS_PER_GAME)throw Error("El banco de Habilidades Blandas debe permitir exactamente 10 rondas sin repetición");
 const names=gameNames(topic),title=names[modo],levelName=nivel==="principiante"?"Básico":LEVEL_LABEL[nivel];
 if(finished){
  return <main id="contenido-principal" tabIndex={-1} className="mx-auto max-w-xl px-4 py-8 space-y-5">
   <h1 className="text-3xl font-black">¡Reto de Habilidades Blandas completado!</h1><PerfectBadge visible={roundResult(ledger.current).approved100}/>
   <p>{topic} · {subtema} · {title} · {levelName}</p>
   <div className="grid grid-cols-3 gap-2 text-center">
    <div className="card-ink p-3"><p className="text-xs">Puntaje</p><strong className="text-2xl text-primary">{score}</strong></div>
    <div className="card-ink p-3"><p className="text-xs">Aciertos</p><strong className="text-2xl">{correct}/10</strong></div>
    <div className="card-ink p-3"><p className="text-xs">Racha</p><strong className="text-2xl">🔥{best}</strong></div>
   </div>
   <section className="space-y-2"><h2 className="text-xl font-black">Revisión de errores</h2>
    {mistakes.length?mistakes.map((m,i)=><div key={i} className="card-ink p-3 space-y-1">
     <p className="font-bold">{m.prompt}</p><p>Tu respuesta: {m.given}</p><p>Correcta: {m.correct}</p><p>{m.exp}</p></div>):
     <p className="card-ink bg-success-soft p-3">¡Todas las respuestas correctas!</p>}
   </section>
   <button className="tile w-full bg-primary text-primary-foreground" onClick={()=>setRun(v=>v+1)}>Repetir con otro orden</button>
   {LEVELS.indexOf(nivel)<LEVELS.length-1&&
    <Link to="/blandas" search={{subtema,modo,nivel:LEVELS[LEVELS.indexOf(nivel)+1]}}
     className="tile block w-full bg-secondary text-center text-secondary-foreground">Siguiente nivel →</Link>}
   <Link to="/" search={returnTo} className="tile block w-full bg-card text-center">Volver a la selección</Link>
   <p className="text-xs text-muted-foreground">Los resultados son lúdicos y no predicen la calificación PHUMA.</p>
  </main>;
 }
 const item=items[index];
 return <main id="contenido-principal" tabIndex={-1} className="mx-auto max-w-2xl px-4 py-5 space-y-5">
  <GameSessionHeader context={`${subtema} · ${levelName}`} title={title} round={index+1} score={score}
   streak={streak} onRestart={()=>setRun(x=>x+1)} returnTo={returnTo}/>
  <ScienceExerciseCard key={item.id} areaLabel="Habilidades Blandas" item={item} onResult={report} onNext={next} isLast={index===items.length-1}/>
 </main>;
}
