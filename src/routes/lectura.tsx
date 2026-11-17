import {createFileRoute,Link} from "@tanstack/react-router";
import {useEffect,useRef,useState} from "react";
import {LEVELS,LEVEL_LABEL,pointsFor,saveHistory,type Level,type Mode,type Mistake} from "@/lib/grammar";
import {gameNames} from "@/lib/phuma-catalog";
import {READING_SUBTOPICS,readingItems,readingPool,type ReadingChallenge,type ReadingItem,type ReadingSubtopic} from "@/lib/reading";
import {ReadingDetective,ReadingInference,ReadingReconstruct} from "@/components/games/ReadingGames";
import {rotationKey,readRotation,recordRotation,writeRotation} from "@/lib/rotation";
import type {MainIdeaChoiceCase} from "@/lib/main-idea-choice-cases";

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
 const classification=useRef<{id:string;count:number;allCorrect:boolean}>({id:"",count:0,allCorrect:true});
 useEffect(()=>{
  setItems(readingItems(nivel,subtema,modo));setIdx(0);setCorrect(0);setTotal(0);
  setScore(0);setStreak(0);setBest(0);setMistakes([]);setFinished(false);
 },[nivel,subtema,modo,run]);
 const report=(ok:boolean,m?:Mistake)=>{
  if(items?.[idx]){
   const itemId=items[idx].id;
   let persist=true,allCorrect=ok;
   if(modo==="clasificar"){
    if(classification.current.id!==itemId)classification.current={id:itemId,count:0,allCorrect:true};
    classification.current.count++;
    classification.current.allCorrect=classification.current.allCorrect&&ok;
    persist=classification.current.count===3;
    allCorrect=classification.current.allCorrect;
   }
   if(persist){
    const key=rotationKey("espanol","Comprensión lectora",subtema,modo,nivel);
    const ids=readingPool(nivel,subtema,modo).map(q=>q.id);
    writeRotation(key,recordRotation(readRotation(key,ids),itemId,allCorrect));
   }
  }
  setTotal(t=>t+1);
  if(ok){setCorrect(c=>c+1);setStreak(s=>{setScore(p=>p+pointsFor(s));setBest(b=>Math.max(b,s+1));return s+1;});}
  else {setStreak(0);if(m)setMistakes(ms=>[...ms,m])}
 };
 const next=()=>{
  if(!items)return;
  if(idx+1>=items.length){
   setFinished(true);
   saveHistory({date:new Date().toISOString(),mode:modo,level:nivel,score,correct,total,bestStreak:best,
    area:"espanol",topic:"Comprensión lectora",subtopic:subtema});
  }else setIdx(i=>i+1);
 };
 if(!items)return <main className="p-8 text-center">Preparando lecturas…</main>;
 const title=gameNames("Comprensión lectora")[modo];
 const levelName=nivel==="principiante"?"Básico":LEVEL_LABEL[nivel];
 if(items.length===0)return <main className="mx-auto max-w-xl p-6"><p>Este contenido aún no tiene ejercicios.</p><Link to="/" className="underline">← Inicio</Link></main>;
 if(finished){
  const pct=total?Math.round(100*correct/total):0;
  return <main className="mx-auto max-w-xl px-4 py-8 space-y-5">
   <h1 className="text-4xl font-black">¡Reto de lectura completado!</h1>
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
   <Link to="/" className="tile block w-full bg-card text-center">Volver al menú</Link>
   <p className="text-xs text-muted-foreground">Los puntos de juego no representan el resultado oficial PHUMA.</p>
  </main>;
 }
 const item=items[idx];
 const props={item,report,next,isLast:idx===items.length-1};
 return <main className="mx-auto max-w-2xl px-4 py-5 space-y-5">
  <div className="flex flex-wrap items-center justify-between gap-2">
   <Link to="/" className="font-bold underline">← Menú</Link>
   <p className="text-sm font-bold">{subtema} · {levelName}</p>
   <button onClick={()=>{if(confirm("¿Reiniciar la partida?"))setRun(n=>n+1)}} className="font-bold underline">Reiniciar</button>
  </div>
  <h1 className="text-2xl font-black">{title}</h1>
  <div className="grid grid-cols-3 gap-2 text-center" aria-live="polite">
   <div className="card-ink p-2"><span className="text-xs block">Lectura</span><strong className="text-xl">{idx+1}/{items.length}</strong></div>
   <div className="card-ink p-2"><span className="text-xs block">Puntaje</span><strong className="text-xl text-primary">{score}</strong></div>
   <div className="card-ink p-2"><span className="text-xs block">Racha</span><strong className="text-xl">🔥{streak}</strong></div>
  </div>
  <div className="h-3 rounded-full border-2 border-foreground bg-muted overflow-hidden" role="progressbar" aria-valuemin={1} aria-valuemax={items.length} aria-valuenow={idx+1}>
   <div className="h-full bg-primary" style={{width:`${100*(idx+1)/items.length}%`}}/>
  </div>
  {modo==="clasificar"&&<ReadingDetective key={item.id} {...props} item={item as ReadingChallenge}/>}
  {modo==="quiz"&&<ReadingInference key={item.id} {...props} item={item as ReadingChallenge|MainIdeaChoiceCase}/>}
  {modo==="construir"&&<ReadingReconstruct key={item.id} {...props} item={item as ReadingChallenge}/>}
 </main>;
}
