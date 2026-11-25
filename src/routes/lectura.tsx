import {savePerfect,newAttemptId} from "@/lib/perfect-achievements";
import {PerfectBadge} from "@/components/games/PerfectBadge";
import {createFileRoute,Link} from "@tanstack/react-router";
import {GameSessionHeader,ROUNDS_PER_GAME} from "@/components/games/GameSessionHeader";
import {studyReturn} from "@/lib/study-context";
import {useEffect,useRef,useState} from "react";
import {emptyLedger,recordRound,roundResult} from "@/lib/round-ledger";
import {LEVELS,LEVEL_LABEL,saveHistory,type Level,type Mode,type Mistake} from "@/lib/grammar";
import {gameNames} from "@/lib/phuma-catalog";
import {READING_SUBTOPICS,readingItems,readingPool,type ReadingChallenge,type ReadingItem,type ReadingSubtopic} from "@/lib/reading";
import {ReadingDetective,ReadingInference,ReadingReconstruct} from "@/components/games/ReadingGames";
import {rotationKey,readRotation,recordRotation,writeRotation} from "@/lib/rotation";
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

const modes:Mode[]=["clasificar","quiz","construir"];
export const Route=createFileRoute("/lectura")({
 validateSearch:(s:Record<string,unknown>):{subtema:ReadingSubtopic;modo:Mode;nivel:Level}=>({
  subtema:READING_SUBTOPICS.includes(s.subtema as ReadingSubtopic)?s.subtema as ReadingSubtopic:"Idea principal",
  modo:modes.includes(s.modo as Mode)?s.modo as Mode:"clasificar",
  nivel:LEVELS.includes(s.nivel as Level)?s.nivel as Level:"principiante",
 }),
 head:()=>({meta:[
  {title:"Comprensión lectora — Academia PHUMA Play"},
  {name:"description",content:"Tres juegos de comprensión lectora para practicar siete habilidades en tres niveles."},
 ]}),
 component:ReadingPlay,
});
function ReadingPlay(){
 const {subtema,modo,nivel}=Route.useSearch();
 const returnTo=studyReturn("Comprensión lectora",subtema,modo,nivel);
 const [run,setRun]=useState(0);
 const [items,setItems]=useState<ReadingItem[]|null>(null);
 const [idx,setIdx]=useState(0);
 const [correct,setCorrect]=useState(0);
 const [total,setTotal]=useState(0);
 const [score,setScore]=useState(0);
 const [streak,setStreak]=useState(0);
 const [best,setBest]=useState(0);
 const [mistakes,setMistakes]=useState<Mistake[]>([]);
 const [finished,setFinished]=useState(false);
 const ledger=useRef(emptyLedger());
 const advanced=useRef(-1);
 const attemptId=useRef("");
 const classification=useRef<{id:string;count:number;allCorrect:boolean}>({id:"",count:0,allCorrect:true});
 useEffect(()=>{
  ledger.current=emptyLedger();advanced.current=-1;attemptId.current=newAttemptId();
  classification.current={id:"",count:0,allCorrect:true};
  setItems(readingItems(nivel,subtema,modo));setIdx(0);setCorrect(0);setTotal(0);
  setScore(0);setStreak(0);setBest(0);setMistakes([]);setFinished(false);
 },[nivel,subtema,modo,run]);
 const report=(ok:boolean,m?:Mistake)=>{
  const item=items?.[idx];
  if(!item||ledger.current.events.some(e=>e.id===item.id))return;
  if(m)setMistakes(ms=>[...ms,m]);
  if(modo==="clasificar"){
   if(classification.current.id!==item.id)classification.current={id:item.id,count:0,allCorrect:true};
   classification.current.count++;
   classification.current.allCorrect=classification.current.allCorrect&&ok;
   if(classification.current.count!==3)return;
   ok=classification.current.allCorrect;
  }
  const updated=recordRound(ledger.current,{id:item.id,correct:ok});
  if(updated===ledger.current)return;
  ledger.current=updated;
  const key=rotationKey("espanol","Comprensión lectora",subtema,modo,nivel);
  const ids=readingPool(nivel,subtema,modo).map(q=>q.id);
  writeRotation(key,recordRotation(readRotation(key,ids),item.id,ok));
  setTotal(updated.events.length);setCorrect(updated.correct);setScore(updated.score);setStreak(updated.streak);setBest(updated.bestStreak);
 };
 const next=()=>{
  if(!items||ledger.current.events.length!==idx+1||advanced.current===idx)return;
  advanced.current=idx;
  if(idx+1>=items.length){
   const result=roundResult(ledger.current);
   if(!result.finished)return;
   setFinished(true);
   savePerfect(returnTo,ledger.current,attemptId.current);saveHistory({date:new Date().toISOString(),mode:modo,level:nivel,score:result.score,correct:result.correct,total:result.attempted,bestStreak:ledger.current.bestStreak,
    area:"espanol",topic:"Comprensión lectora",subtopic:subtema});
  }else setIdx(i=>i+1);
 };
 if(!items)return <main className="p-8 text-center">Preparando lecturas…</main>;
 const title=gameNames("Comprensión lectora")[modo];
 const levelName=nivel==="principiante"?"Básico":LEVEL_LABEL[nivel];
 if(items.length!==ROUNDS_PER_GAME)throw new Error("Paridad de rondas: se esperaban 10 en lectura");
 if(items.length===0)return <main className="mx-auto max-w-xl p-6"><p>Este contenido aún no tiene ejercicios.</p><Link to="/" search={returnTo} className="underline">← Inicio</Link></main>;
 if(finished){
  const pct=total?Math.round(100*correct/total):0;
  return <main className="mx-auto max-w-xl px-4 py-8 space-y-5">
   <h1 className="text-4xl font-black">¡Reto de lectura completado!</h1><PerfectBadge visible={roundResult(ledger.current).approved100}/>
   <p>{subtema} · {title} · {levelName}</p>
   <div className="grid grid-cols-3 gap-2 text-center">
    <div className="card-ink p-3"><p className="text-xs">Puntos</p><strong className="text-3xl text-primary">{score}</strong></div>
    <div className="card-ink p-3"><p className="text-xs">Aciertos</p><strong className="text-3xl">{pct}%</strong><p className="text-xs">{correct}/{total}</p></div>
    <div className="card-ink p-3"><p className="text-xs">Racha</p><strong className="text-3xl">🔥 {best}</strong></div>
   </div>
   <section className="space-y-3"><h2 className="text-2xl font-bold">Revisión de errores</h2>
    {mistakes.length===0?<p className="card-ink bg-success-soft p-3">¡Todas las respuestas correctas!</p>:
     <ul className="space-y-2">{mistakes.map((m,i)=><li key={i} className="card-ink bg-card p-4 space-y-1">
      <p className="font-semibold">{m.prompt}</p><p>Tu respuesta: <strong>{m.given}</strong></p>
      <p>Respuesta correcta: <strong>{m.correct}</strong></p><p className="text-sm text-muted-foreground">{m.exp}</p>
     </li>)}</ul>}
   </section>
   <button onClick={()=>setRun(x=>x+1)} className="tile w-full bg-primary text-primary-foreground">↻ Repetir con otro orden</button>
   {LEVELS.indexOf(nivel)<LEVELS.length-1&&
    <Link to="/lectura" search={{subtema,modo,nivel:LEVELS[LEVELS.indexOf(nivel)+1]}}
     className="tile block w-full bg-secondary text-center text-secondary-foreground">Siguiente nivel →</Link>}
   <Link to="/" search={returnTo} className="tile block w-full bg-card text-center">Volver a la selección</Link>
   <p className="text-xs text-muted-foreground">Los puntos de juego no representan el resultado oficial PHUMA.</p>
  </main>;
 }
 const item=items[idx];
 const props={item,report,next,isLast:idx===items.length-1};
 return <main className="mx-auto max-w-2xl px-4 py-5 space-y-5">
  <GameSessionHeader context={`${subtema} · ${levelName}`} title={title} round={idx+1}
   score={score} streak={streak} onRestart={()=>setRun(n=>n+1)} returnTo={returnTo}/>
  {modo==="clasificar"&&<ReadingDetective key={item.id} {...props} item={item as ReadingChallenge|MainIdeaDetectiveCase|InferenceDetectiveCase|CriticalDetectiveCase|NewReadingDetective|AnalysisDetective|CompareDetective|FigurativeDetectiveCase}/>}
  {modo==="quiz"&&<ReadingInference key={item.id} {...props} item={item as ReadingChallenge|MainIdeaChoiceCase|InferenceChoiceCase|CriticalChoiceCase|NewReadingChoice|AnalysisChoice|CompareChoice|FigurativeChoiceCase}/>}
  {modo==="construir"&&<ReadingReconstruct key={item.id} {...props} item={item as ReadingChallenge|MainIdeaReconstructCase|InferenceReconstructCase|CriticalReconstructCase|NewReadingReconstruct|AnalysisReconstruct|CompareReconstruct|FigurativeReconstructCase}/>}
 </main>;
}
