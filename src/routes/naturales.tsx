import {createFileRoute,Link} from "@tanstack/react-router";
import {useEffect,useRef,useState} from "react";
import {startSession,submitRound,sessionResult,type Session} from "@/lib/game-session-contract";
import {persistPerfect} from "@/lib/game-achievement-storage";
import {LEVELS,LEVEL_LABEL,saveHistory,type Level,type Mode,type Mistake} from "@/lib/grammar";
import {scienceTopic,SCIENCE_SUBTOPICS,SCIENCE_MODES,type ScienceItem} from "@/lib/science-m1";
import {scienceM3Pool} from "@/lib/science-m3";
import {gameNames} from "@/lib/phuma-catalog";
import {studyReturn} from "@/lib/study-context";
import {GameSessionHeader,ROUNDS_PER_GAME} from "@/components/games/GameSessionHeader";
import {ScienceExerciseCard} from "@/components/games/ScienceExerciseCard";
import {rotationKey,readRotation,selectRotation,recordRotation,writeRotation} from "@/lib/rotation";

export const Route=createFileRoute("/naturales")({
 validateSearch:(s:Record<string,unknown>):{subtema:string;modo:Mode;nivel:Level}=>({
  subtema:SCIENCE_SUBTOPICS.includes(s.subtema as string)?s.subtema as string:"Célula",
  modo:SCIENCE_MODES.includes(s.modo as Mode)?s.modo as Mode:"clasificar",
  nivel:LEVELS.includes(s.nivel as Level)?s.nivel as Level:"principiante",
 }),
 head:()=>({meta:[{title:"Ciencias Naturales — Academia PHUMA Play"},
  {name:"description",content:"Práctica de Ciencias Naturales M3 con 10 rondas y explicaciones."}]}),
 component:MathPlay,
});
function MathPlay(){
 const {subtema,modo,nivel}=Route.useSearch();
 const topic=scienceTopic(subtema);
 const returnTo=studyReturn(topic,subtema,modo,nivel,"naturales");
 const [run,setRun]=useState(0);
 const [items,setItems]=useState<ScienceItem[]|null>(null);
 const [index,setIndex]=useState(0);
 const sessionRef=useRef<Session|null>(null);
 const finalized=useRef(false);
 const [session,setSession]=useState<Session|null>(null);
 const [savedPerfect,setSavedPerfect]=useState(false);
 const [storageWarning,setStorageWarning]=useState(false);
 const result=session?sessionResult(session):null;
 const {correct=0,score=0,streak=0,bestStreak:best=0}=result??{};
 const [mistakes,setMistakes]=useState<Mistake[]>([]);
 const [finished,setFinished]=useState(false);
 useEffect(()=>{
  const bank=scienceM3Pool(topic,subtema,nivel,modo),key=rotationKey("naturales",topic,subtema,modo,nivel);
  const chosen=selectRotation(bank,readRotation(key,bank.map(x=>x.id)),ROUNDS_PER_GAME);
  const nextSession=startSession(crypto.randomUUID(),{area:"naturales",topic,subtopic:subtema,game:modo,level:nivel},"science-m3-contract-v1",chosen.map(x=>x.id));
  sessionRef.current=nextSession;finalized.current=false;setSession(nextSession);setSavedPerfect(false);setStorageWarning(false);
  setItems(chosen);setIndex(0);setMistakes([]);setFinished(false);
 },[topic,subtema,nivel,modo,run]);
 const report=(ok:boolean,given:string)=>{
  const current=sessionRef.current;
  if(!items||!current||finalized.current)return;
  const item=items[index],bank=scienceM3Pool(topic,subtema,nivel,modo),key=rotationKey("naturales",topic,subtema,modo,nivel);
  const updated=submitRound(current,item.id,[ok]);
  if(updated===current)return;
  sessionRef.current=updated;setSession(updated);
  writeRotation(key,recordRotation(readRotation(key,bank.map(x=>x.id)),item.id,ok));
  if(!ok)setMistakes(ms=>[...ms,{prompt:item.prompt,given,correct:item.expected,exp:item.explanation}]);
 };
 const next=()=>{
  const current=sessionRef.current;
  if(!items||!current||finalized.current||current.rounds.length!==index+1)return;
  if(index===items.length-1){
   const final=sessionResult(current);
   if(!final.finished)return;
   finalized.current=true;
   const date=new Date().toISOString();
   saveHistory({date,mode:modo,level:nivel,score:final.score,correct:final.correct,total:final.attempted,bestStreak:final.bestStreak,
    area:"naturales",topic,subtopic:subtema});
   if(final.approved100){try{const saved=persistPerfect(localStorage,current,date);setSavedPerfect(saved.status==="ok");setStorageWarning(saved.status!=="ok");}catch{setStorageWarning(true);}}
   setFinished(true);
  }else setIndex(index+1);
 };
 if(!items||!session)return <main id="contenido-principal" tabIndex={-1} className="mx-auto max-w-xl p-6">Preparando ejercicios de ciencias naturales…</main>;
 if(items.length!==ROUNDS_PER_GAME)throw Error("El banco de Ciencias Naturales debe permitir exactamente 10 rondas sin repetición");
 const names=gameNames(topic),title=names[modo],levelName=nivel==="principiante"?"Básico":LEVEL_LABEL[nivel];
 if(finished){
  return <main id="contenido-principal" tabIndex={-1} className="mx-auto max-w-xl px-4 py-8 space-y-5">
   <h1 className="text-3xl font-black">¡Reto de Ciencias Naturales completado!</h1>
   <p>{topic} · {subtema} · {title} · {levelName}</p>
   <div className="grid grid-cols-3 gap-2 text-center">
    <div className="card-ink p-3"><p className="text-xs">Puntaje</p><strong className="text-2xl text-primary">{score}</strong></div>
    <div className="card-ink p-3"><p className="text-xs">Aciertos</p><strong className="text-2xl">{correct}/10</strong><p className="text-xs">{result?.accuracy}%</p></div>
    <div className="card-ink p-3"><p className="text-xs">Racha</p><strong className="text-2xl">🔥{best}</strong></div>
   </div>
   {savedPerfect&&<p role="status" className="card-ink bg-success-soft p-3 font-bold"><span aria-hidden="true">★ </span>Dominado al 100 % · logro guardado</p>}
   {storageWarning&&<p role="status" className="card-ink p-3">Partida perfecta; no fue posible guardar el logro en este navegador.</p>}
   <section className="space-y-2"><h2 className="text-xl font-black">Revisión de errores</h2>
    {mistakes.length?mistakes.map((m,i)=><div key={i} className="card-ink p-3 space-y-1">
     <p className="font-bold">{m.prompt}</p><p>Tu respuesta: {m.given}</p><p>Correcta: {m.correct}</p><p>{m.exp}</p></div>):
     <p className="card-ink bg-success-soft p-3">¡Todas las respuestas correctas!</p>}
   </section>
   <button className="tile w-full bg-primary text-primary-foreground" onClick={()=>setRun(v=>v+1)}>Repetir con otro orden</button>
   {LEVELS.indexOf(nivel)<LEVELS.length-1&&
    <Link to="/naturales" search={{subtema,modo,nivel:LEVELS[LEVELS.indexOf(nivel)+1]}}
     className="tile block w-full bg-secondary text-center text-secondary-foreground">Siguiente nivel →</Link>}
   <Link to="/" search={returnTo} className="tile block w-full bg-card text-center">Volver a la selección</Link>
   <p className="text-xs text-muted-foreground">Los resultados son lúdicos y no predicen la calificación PHUMA.</p>
  </main>;
 }
 const item=items[index];
 return <main id="contenido-principal" tabIndex={-1} className="mx-auto max-w-2xl px-4 py-5 space-y-5">
  <GameSessionHeader context={`${subtema} · ${levelName}`} title={title} round={index+1} score={score}
   streak={streak} onRestart={()=>setRun(x=>x+1)} returnTo={returnTo}/>
  <ScienceExerciseCard key={item.id} item={item} onResult={report} onNext={next} isLast={index===items.length-1}/>
 </main>;
}
