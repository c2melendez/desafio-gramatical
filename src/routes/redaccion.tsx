import {createFileRoute,Link} from "@tanstack/react-router";
import {GameSessionHeader,ROUNDS_PER_GAME} from "@/components/games/GameSessionHeader";
import {studyReturn} from "@/lib/study-context";
import {useEffect,useRef,useState} from "react";
import {startSession,submitRound,sessionResult,type Session} from "@/lib/game-session-contract";
import {persistPerfect} from "@/lib/game-achievement-storage";
import {LEVELS,LEVEL_LABEL,saveHistory,type Level,type Mode,type Mistake} from "@/lib/grammar";
import {gameNames} from "@/lib/phuma-catalog";
import {WRITING_SUBTOPICS,writingItems,writingPool,type WritingChallenge,type WritingItem,type WritingSubtopic} from "@/lib/writing";
import {ErrorHunter,ConnectorGame,ExpertEditor} from "@/components/games/WritingGames";
import {rotationKey,readRotation,recordRotation,writeRotation} from "@/lib/rotation";
import type {ConnectorErrorCase} from "@/lib/connector-error-cases";
import type {ConnectorEditorCase} from "@/lib/connector-editor-cases";
import type {ConnectorCase} from "@/lib/connector-cases";
import type {CorrectionErrorCase} from "@/lib/correction-error-cases";
import type {CorrectionChoiceCase} from "@/lib/correction-choice-cases";
import type {CorrectionEditorCase} from "@/lib/correction-editor-cases";
import type {OrganizationErrorCase} from "@/lib/organization-error-cases";
import type {OrganizationChoiceCase} from "@/lib/organization-choice-cases";
import type {OrganizationEditorCase} from "@/lib/organization-editor-cases";
import type {ElisionErrorCase} from "@/lib/elision-error-cases";
import type {ElisionChoiceCase} from "@/lib/elision-choice-cases";
import type {ElisionEditorCase} from "@/lib/elision-editor-cases";
import type {GeneralizationErrorCase} from "@/lib/generalization-error-cases";
import type {GeneralizationChoiceCase} from "@/lib/generalization-choice-cases";
import type {GeneralizationEditorCase} from "@/lib/generalization-editor-cases";

const modes:Mode[]=["clasificar","quiz","construir"];
export const Route=createFileRoute("/redaccion")({
 validateSearch:(s:Record<string,unknown>):{subtema:WritingSubtopic;modo:Mode;nivel:Level}=>({
  subtema:WRITING_SUBTOPICS.includes(s.subtema as WritingSubtopic)?s.subtema as WritingSubtopic:"Corrección",
  modo:modes.includes(s.modo as Mode)?s.modo as Mode:"clasificar",
  nivel:LEVELS.includes(s.nivel as Level)?s.nivel as Level:"principiante",
 }),
 head:()=>({meta:[
  {title:"Redacción — Academia PHUMA Play"},
  {name:"description",content:"Tres juegos de redacción para practicar cinco subtemas en tres niveles."},
 ]}),
 component:WritingPlay,
});
function WritingPlay(){
 const {subtema,modo,nivel}=Route.useSearch();
 const returnTo=studyReturn("Redacción",subtema,modo,nivel);
 const [run,setRun]=useState(0);
 const [items,setItems]=useState<WritingItem[]|null>(null);
 const [idx,setIdx]=useState(0);
 const sessionRef=useRef<Session|null>(null);
 const finalized=useRef(false);
 const [session,setSession]=useState<Session|null>(null);
 const [savedPerfect,setSavedPerfect]=useState(false);
 const [storageWarning,setStorageWarning]=useState(false);
 const result=session?sessionResult(session):null;
 const {correct=0,attempted:total=0,score=0,streak=0,bestStreak:best=0}=result??{};
 const [mistakes,setMistakes]=useState<Mistake[]>([]);
 const [finished,setFinished]=useState(false);
 useEffect(()=>{
  const chosen=writingItems(nivel,subtema,modo);
  const nextSession=startSession(crypto.randomUUID(),{area:"espanol",topic:"Redacción",subtopic:subtema,game:modo,level:nivel},"writing-m3-contract-v1",chosen.map(x=>x.id));
  sessionRef.current=nextSession;finalized.current=false;setSession(nextSession);setSavedPerfect(false);setStorageWarning(false);
  setItems(chosen);setIdx(0);setMistakes([]);setFinished(false);
 },[nivel,subtema,modo,run]);
 const report=(ok:boolean,m?:Mistake)=>{
  const current=sessionRef.current,item=items?.[idx];
  if(!current||!item||finalized.current||current.rounds.length!==idx||current.ids[idx]!==item.id)return;
  if(!ok&&m)setMistakes(ms=>[...ms,m]);
  const updated=submitRound(current,item.id,[ok]);
  if(updated===current)return;
  sessionRef.current=updated;setSession(updated);
  const key=rotationKey("espanol","Redacción",subtema,modo,nivel);
  const ids=writingPool(nivel,subtema,modo).map(x=>x.id);
  writeRotation(key,recordRotation(readRotation(key,ids),item.id,ok));
 };
 const next=()=>{
  const current=sessionRef.current;
  if(!items||!current||finalized.current||current.rounds.length!==idx+1)return;
  if(idx===items.length-1){
   const final=sessionResult(current);if(!final.finished)return;
   finalized.current=true;const date=new Date().toISOString();
   saveHistory({date,mode:modo,level:nivel,score:final.score,correct:final.correct,total:final.attempted,bestStreak:final.bestStreak,area:"espanol",topic:"Redacción",subtopic:subtema});
   if(final.approved100){try{const saved=persistPerfect(localStorage,current,date);setSavedPerfect(saved.status==="ok");setStorageWarning(saved.status!=="ok");}catch{setStorageWarning(true);}}
   setFinished(true);
  }else setIdx(idx+1);
 };
 if(!items||!session)return <main className="p-8 text-center">Preparando retos de redacción…</main>;
 const title=subtema==="Corrección"&&modo==="quiz"?"Corrección precisa":subtema==="Organización textual"&&modo==="quiz"?"Continúa el texto":subtema==="Elisión y adición"&&modo==="quiz"?"Revisión precisa":subtema==="Generalización e integración"&&modo==="quiz"?"Conclusión sustentada":gameNames("Redacción")[modo];
 const levelName=nivel==="principiante"?"Básico":LEVEL_LABEL[nivel];
 if(items.length!==ROUNDS_PER_GAME)throw new Error("Paridad de rondas: se esperaban 10 en redaccion");
 if(items.length===0)return <main className="mx-auto max-w-xl p-6"><p>Este contenido aún no tiene ejercicios.</p><Link to="/" search={returnTo} className="underline">← Inicio</Link></main>;
 if(finished){
  const pct=total?Math.round(100*correct/total):0;
  return <main className="mx-auto max-w-xl px-4 py-8 space-y-5">
   <h1 className="text-4xl font-black">¡Reto de redacción completado!</h1>
   <p>{subtema} · {title} · {levelName}</p>
   <div className="grid grid-cols-3 gap-2 text-center">
    <div className="card-ink p-3"><p className="text-xs">Puntos</p><strong className="text-3xl text-primary">{score}</strong></div>
    <div className="card-ink p-3"><p className="text-xs">Aciertos</p><strong className="text-3xl">{pct}%</strong><p className="text-xs">{correct}/{total}</p></div>
    <div className="card-ink p-3"><p className="text-xs">Racha</p><strong className="text-3xl">🔥 {best}</strong></div>
   </div>
   {savedPerfect&&<p role="status" className="card-ink bg-success-soft p-3 font-bold"><span aria-hidden="true">★ </span>Dominado al 100 % · logro guardado</p>}
   {storageWarning&&<p role="status" className="card-ink p-3">Partida perfecta; no fue posible guardar el logro en este navegador.</p>}
   <section className="space-y-3"><h2 className="text-2xl font-bold">Revisión de errores</h2>
    {mistakes.length===0?<p className="card-ink bg-success-soft p-3">¡Todas las respuestas correctas!</p>:
     <ul className="space-y-2">{mistakes.map((m,i)=><li key={i} className="card-ink bg-card p-4 space-y-1">
      <p className="font-semibold">{m.prompt}</p><p>Tu respuesta: <strong>{m.given}</strong></p>
      <p>Respuesta correcta: <strong>{m.correct}</strong></p><p className="text-sm text-muted-foreground">{m.exp}</p>
     </li>)}</ul>}
   </section>
   <button onClick={()=>setRun(x=>x+1)} className="tile w-full bg-primary text-primary-foreground">↻ Repetir con otro orden</button>
   {LEVELS.indexOf(nivel)<LEVELS.length-1&&
    <Link to="/redaccion" search={{subtema,modo,nivel:LEVELS[LEVELS.indexOf(nivel)+1]}}
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
  {modo==="clasificar"&&<ErrorHunter key={item.id} {...props} item={item as WritingChallenge|ConnectorErrorCase|CorrectionErrorCase|OrganizationErrorCase|ElisionErrorCase|GeneralizationErrorCase}/>}
  {modo==="quiz"&&<ConnectorGame key={item.id} {...props} item={item as WritingChallenge|ConnectorCase|CorrectionChoiceCase|OrganizationChoiceCase|ElisionChoiceCase|GeneralizationChoiceCase}/>}
  {modo==="construir"&&<ExpertEditor key={item.id} {...props} item={item as WritingChallenge|ConnectorEditorCase|CorrectionEditorCase|OrganizationEditorCase|ElisionEditorCase|GeneralizationEditorCase}/>}
 </main>;
}
