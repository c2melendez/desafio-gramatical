import {createFileRoute,Link} from "@tanstack/react-router";
import {useEffect,useRef,useState} from "react";
import {startSession,submitRound,sessionResult,type Session} from "@/lib/game-session-contract";
import {persistPerfect} from "@/lib/game-achievement-storage";
import {LEVELS,LEVEL_LABEL,saveHistory,type Level,type Mistake} from "@/lib/grammar";
import {graphPool,GRAPH_SKILLS,GRAPH_SKILL_NAMES,type GraphTask} from "@/lib/function-graph-lab";
import {FunctionGraph} from "@/components/games/FunctionGraph";
import {GameSessionHeader,ROUNDS_PER_GAME} from "@/components/games/GameSessionHeader";
import {studyReturn} from "@/lib/study-context";
import {rotationKey,readRotation,selectRotation,recordRotation,writeRotation} from "@/lib/rotation";

export const Route=createFileRoute("/laboratorio-funciones")({
 validateSearch:(search:Record<string,unknown>):{nivel:Level}=>({
  nivel:LEVELS.includes(search.nivel as Level)?search.nivel as Level:"principiante"
 }),
 head:()=>({meta:[{title:"Laboratorio de gráficas — Academia PHUMA Play"},
  {name:"description",content:"Analiza dominio, rango, crecimiento, decrecimiento e intersecciones en gráficas cartesianas."}]}),
 component:FunctionLab
});
const TOPIC="Álgebra",SUBTOPIC="Funciones · Laboratorio gráfico";
function FunctionLab(){
 const {nivel}=Route.useSearch();
 const [run,setRun]=useState(0);
 const [items,setItems]=useState<GraphTask[]|null>(null);
 const [index,setIndex]=useState(0),[selected,setSelected]=useState<number|null>(null);
 const sessionRef=useRef<Session|null>(null),finalized=useRef(false);
 const [session,setSession]=useState<Session|null>(null);
 const [savedPerfect,setSavedPerfect]=useState(false),[storageWarning,setStorageWarning]=useState(false);
 const result=session?sessionResult(session):null;
 const {correct=0,score=0,streak=0,bestStreak:best=0}=result??{};
 const [mistakes,setMistakes]=useState<Mistake[]>([]),[finished,setFinished]=useState(false);
 const back=studyReturn(TOPIC,"Funciones","quiz",nivel,"matematicas");
 const key=rotationKey("matematicas",TOPIC,SUBTOPIC,"quiz",nivel);
 useEffect(()=>{
  const bank=graphPool(nivel),state=readRotation(key,bank.map(q=>q.id));
  const order=[...GRAPH_SKILLS.slice(run%6),...GRAPH_SKILLS.slice(0,run%6)];
  const picked:GraphTask[]=[];
  // All six skills represented each session; distribute four extra turns across sessions.
  order.forEach((skill,k)=>{
   const pool=bank.filter(q=>q.skill===skill);
   picked.push(...selectRotation(pool,state,k<4?2:1));
  });
  if(picked.length!==ROUNDS_PER_GAME||new Set(picked.map(q=>q.id)).size!==10)throw Error("El laboratorio necesita diez tareas distintas");
  // Interleave the selected skills so adjacent questions do not repeat a skill.
  const arranged=[...picked.filter((_,i)=>i%2===0),...picked.filter((_,i)=>i%2!==0)];
  const nextSession=startSession(crypto.randomUUID(),{area:"matematicas",topic:TOPIC,subtopic:SUBTOPIC,game:"quiz",level:nivel},"laboratorio-funciones-contract-v1",arranged.map(q=>q.id));
  sessionRef.current=nextSession;finalized.current=false;setSession(nextSession);setSavedPerfect(false);setStorageWarning(false);
  setItems(arranged);setIndex(0);setSelected(null);setMistakes([]);setFinished(false);
 },[nivel,run,key]);
 function choose(i:number){
  const current=sessionRef.current;
  if(selected!==null||!items||!current||finalized.current)return;
  const item=items[index],ok=i===item.answerIndex;
  const updated=submitRound(current,item.id,[ok]);if(updated===current)return;
  sessionRef.current=updated;setSession(updated);setSelected(i);
  writeRotation(key,recordRotation(readRotation(key,graphPool(nivel).map(q=>q.id)),item.id,ok));
  if(!ok)setMistakes(m=>[...m,{prompt:item.prompt,given:item.options[i],correct:item.answer,exp:item.explanation}]);
 }
 function next(){
  const current=sessionRef.current;
  if(selected===null||!items||!current||finalized.current||current.rounds.length!==index+1)return;
  if(index===ROUNDS_PER_GAME-1){
   const final=sessionResult(current);if(!final.finished)return;
   finalized.current=true;const date=new Date().toISOString();
   saveHistory({date,mode:"quiz",level:nivel,area:"matematicas",topic:TOPIC,subtopic:SUBTOPIC,score:final.score,correct:final.correct,total:final.attempted,bestStreak:final.bestStreak});
   if(final.approved100){try{const saved=persistPerfect(localStorage,current,date);setSavedPerfect(saved.status==="ok");setStorageWarning(saved.status!=="ok");}catch{setStorageWarning(true);}}
   setFinished(true);
  }else{setIndex(index+1);setSelected(null);}
 }
 if(!items||!session)return <main className="mx-auto max-w-2xl p-6">Preparando el laboratorio gráfico…</main>;
 const levelLabel=nivel==="principiante"?"Básico":LEVEL_LABEL[nivel];
 if(finished)return <main className="mx-auto max-w-2xl px-4 py-8 space-y-4">
  <h1 className="text-3xl font-black">¡Laboratorio completado!</h1>
  <p>Funciones · {levelLabel} · {correct}/{ROUNDS_PER_GAME} respuestas correctas</p>
  <p className="card-ink p-4 font-bold">Puntaje: {score} · Mejor racha: {best}</p>
  {savedPerfect&&<p role="status" className="card-ink bg-success-soft p-3 font-bold">★ Dominado al 100 % · logro guardado</p>}
  {storageWarning&&<p role="status" className="card-ink p-3">Partida perfecta; no fue posible guardar el logro en este navegador.</p>}
  {mistakes.length>0&&<section className="space-y-3"><h2 className="text-xl font-bold">Repasa las respuestas</h2>
   {mistakes.map((m,i)=><article key={i} className="card-ink p-3"><strong>{m.prompt}</strong><p>Tu elección: {m.given}</p><p>Correcta: {m.correct}</p><p>{m.exp}</p></article>)}
  </section>}
  <button className="tile bg-primary text-primary-foreground w-full" onClick={()=>setRun(n=>n+1)}>Otra partida con diez nuevas preguntas</button>
  <Link to="/" search={back} className="tile block text-center bg-card">Volver a la selección</Link>
 </main>;
 const item=items[index];
 return <main className="mx-auto max-w-3xl px-4 py-6 space-y-4">
  <GameSessionHeader context={`Funciones · ${levelLabel}`} title="Laboratorio de gráficas" round={index+1}
   score={score} streak={streak} onRestart={()=>setRun(n=>n+1)} returnTo={back}/>
  <section className="card-ink bg-card p-4 sm:p-6 space-y-4" aria-label="Reto de interpretación gráfica">
   <p className="text-sm font-bold text-primary">Destreza: {GRAPH_SKILL_NAMES[item.skill]}</p>
   <h2 className="text-xl font-black">{item.prompt}</h2>
   <FunctionGraph graph={item.graph}/>
   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="group" aria-label="Respuestas posibles">
    {item.options.map((option,i)=><button key={i} type="button" disabled={selected!==null}
     className={`tile min-h-14 text-center ${selected===i?(i===item.answerIndex?"bg-success-soft":"bg-destructive-soft"):"bg-background"}`}
     aria-pressed={selected===i} onClick={()=>choose(i)}>{option}</button>)}
   </div>
   {selected!==null&&<div className={`card-ink p-4 space-y-2 ${selected===item.answerIndex?"bg-success-soft":"bg-destructive-soft"}`} role="status">
    <p className="font-bold">{selected===item.answerIndex?"¡Correcto!":"Revisa la interpretación de la gráfica"}</p>
    <p>Tu elección: {item.options[selected]} · Respuesta correcta: {item.answer}</p>
    <p>{item.explanation}</p>
    <button type="button" className="tile bg-primary text-primary-foreground w-full" onClick={next}>
     {index===ROUNDS_PER_GAME-1?"Ver resultados":"Siguiente gráfica"}
    </button>
   </div>}
  </section>
  <p className="text-xs text-muted-foreground">Práctica complementaria de análisis de funciones. No son reactivos oficiales ni equivalencias psicométricas PHUMA. Revisión docente pendiente.</p>
 </main>;
}
