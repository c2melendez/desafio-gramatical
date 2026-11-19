import {createFileRoute,Link} from "@tanstack/react-router";
import {useEffect,useState} from "react";
import {LEVELS,LEVEL_LABEL,pointsFor,saveHistory,type Level,type Mistake} from "@/lib/grammar";
import {geometryPool,GEOMETRY_SKILLS,GEOMETRY_SKILL_NAMES,type GeometryTask} from "@/lib/geometry-visual-lab";
import {GeometryVisual} from "@/components/games/GeometryVisual";
import {GameSessionHeader,ROUNDS_PER_GAME} from "@/components/games/GameSessionHeader";
import {studyReturn} from "@/lib/study-context";
import {rotationKey,readRotation,selectRotation,recordRotation,writeRotation} from "@/lib/rotation";

export const Route=createFileRoute("/laboratorio-geometria")({
 validateSearch:(search:Record<string,unknown>):{nivel:Level}=>({
  nivel:LEVELS.includes(search.nivel as Level)?search.nivel as Level:"principiante"
 }),
 head:()=>({meta:[{title:"Laboratorio de geometría — Academia PHUMA Play"},
  {name:"description",content:"Interpreta ángulos entre paralelas y transversales y figuras compuestas con medidas."}]}),
 component:FunctionLab
});
const TOPIC="Geometría",SUBTOPIC="Geometría · Laboratorio visual";
function FunctionLab(){
 const {nivel}=Route.useSearch();
 const [run,setRun]=useState(0);
 const [items,setItems]=useState<GeometryTask[]|null>(null);
 const [index,setIndex]=useState(0),[selected,setSelected]=useState<number|null>(null);
 const [score,setScore]=useState(0),[correct,setCorrect]=useState(0),[streak,setStreak]=useState(0),[best,setBest]=useState(0);
 const [mistakes,setMistakes]=useState<Mistake[]>([]),[finished,setFinished]=useState(false);
 const back=studyReturn(TOPIC,"Ángulos","quiz",nivel,"matematicas");
 const key=rotationKey("matematicas",TOPIC,SUBTOPIC,"quiz",nivel);
 useEffect(()=>{
  const bank=geometryPool(nivel),state=readRotation(key,bank.map(q=>q.id));
  const order=[...GEOMETRY_SKILLS.slice(run%4),...GEOMETRY_SKILLS.slice(0,run%4)];
  const picked:GeometryTask[]=[];
  // Las cuatro habilidades aparecen al menos dos veces en diez rondas.
  order.forEach((skill,k)=>{
   const pool=bank.filter(q=>q.skill===skill);
   picked.push(...selectRotation(pool,state,k<2?3:2));
  });
  if(picked.length!==ROUNDS_PER_GAME||new Set(picked.map(q=>q.id)).size!==10)throw Error("El laboratorio necesita diez tareas distintas");
  // Alterna familias al presentar la secuencia.
  const arranged=[...picked.filter((_,i)=>i%2===0),...picked.filter((_,i)=>i%2!==0)];
  setItems(arranged);setIndex(0);setSelected(null);setScore(0);setCorrect(0);
  setStreak(0);setBest(0);setMistakes([]);setFinished(false);
 },[nivel,run,key]);
 function choose(i:number){
  if(selected!==null||!items)return;
  const item=items[index],ok=i===item.answerIndex;
  setSelected(i);
  writeRotation(key,recordRotation(readRotation(key,geometryPool(nivel).map(q=>q.id)),item.id,ok));
  if(ok){setCorrect(n=>n+1);setScore(n=>n+pointsFor(streak));setStreak(n=>n+1);setBest(n=>Math.max(n,streak+1));}
  else{setStreak(0);setMistakes(m=>[...m,{prompt:item.prompt,given:item.options[i],correct:item.answer,exp:item.explanation}]);}
 }
 function next(){
  if(selected===null||!items)return;
  if(index===ROUNDS_PER_GAME-1){
   saveHistory({date:new Date().toISOString(),mode:"quiz",level:nivel,area:"matematicas",topic:TOPIC,
    subtopic:SUBTOPIC,score,correct,total:ROUNDS_PER_GAME,bestStreak:best});
   setFinished(true);
  }else{setIndex(n=>n+1);setSelected(null);}
 }
 if(!items)return <main className="mx-auto max-w-2xl p-6">Preparando el laboratorio geométrico…</main>;
 const levelLabel=nivel==="principiante"?"Básico":LEVEL_LABEL[nivel];
 if(finished)return <main className="mx-auto max-w-2xl px-4 py-8 space-y-4">
  <h1 className="text-3xl font-black">¡Laboratorio completado!</h1>
  <p>Funciones · {levelLabel} · {correct}/{ROUNDS_PER_GAME} respuestas correctas</p>
  <p className="card-ink p-4 font-bold">Puntaje: {score} · Mejor racha: {best}</p>
  {mistakes.length>0&&<section className="space-y-3"><h2 className="text-xl font-bold">Repasa las respuestas</h2>
   {mistakes.map((m,i)=><article key={i} className="card-ink p-3"><strong>{m.prompt}</strong><p>Tu elección: {m.given}</p><p>Correcta: {m.correct}</p><p>{m.exp}</p></article>)}
  </section>}
  <button className="tile bg-primary text-primary-foreground w-full" onClick={()=>setRun(n=>n+1)}>Otra partida con diez nuevas preguntas</button>
  <Link to="/" search={back} className="tile block text-center bg-card">Volver a la selección</Link>
 </main>;
 const item=items[index];
 return <main className="mx-auto max-w-3xl px-4 py-6 space-y-4">
  <GameSessionHeader context={`Geometría · ${levelLabel}`} title="Laboratorio de geometría" round={index+1}
   score={score} streak={streak} onRestart={()=>setRun(n=>n+1)} returnTo={back}/>
  <section className="card-ink bg-card p-4 sm:p-6 space-y-4" aria-label="Reto de interpretación geométrica">
   <p className="text-sm font-bold text-primary">Destreza: {GEOMETRY_SKILL_NAMES[item.skill]}</p>
   <h2 className="text-xl font-black">{item.prompt}</h2>
   <GeometryVisual figure={item.figure} question={item.skill}/>
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
     {index===ROUNDS_PER_GAME-1?"Ver resultados":"Siguiente figura"}
    </button>
   </div>}
  </section>
  <p className="text-xs text-muted-foreground">Figuras originales de práctica orientadas a las competencias de ángulos y medición de la guía PHUMA. No son reactivos oficiales; revisión docente pendiente.</p>
 </main>;
}
