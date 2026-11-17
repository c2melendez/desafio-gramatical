import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BUILD, LEVELS, LEVEL_LABEL, MODE_LABEL, QUIZ, SENTENCES, pointsFor, saveHistory, shuffle, type Level, type Mistake, type Mode } from "@/lib/grammar";
import { EXTRA_BUILD } from "@/lib/extra-build";
import { EXTRA_SENTENCES } from "@/lib/extra-sentences";
import { GRAMMAR_ADVANCED_SENTENCES, GRAMMAR_NUCLEUS_BUILD } from "@/lib/grammar-nucleus";
import {COHESION_CLASSIFICATION} from "@/lib/grammar-classify-cohesion";
import {SYNONYM_CLASSIFICATION} from "@/lib/grammar-classify-synonyms";
import {GrammarClassification} from "@/components/games/GrammarActivities";
import type {ClassificationActivity} from "@/lib/grammar-activities";
import {GRAMMAR_PILOT_SUBTOPICS,grammarPilotPool,type GrammarDraft} from "@/lib/grammar-next-draft";
import {rotationKey,readRotation,recordRotation,writeRotation,selectRotation} from "@/lib/rotation";
import { EXTRA_QUIZ } from "@/lib/extra-quiz";
import {GrammarM1Play,grammarM1Pool} from "@/components/games/GrammarM1Play";
import { ClassifyGame } from "@/components/games/ClassifyGame";
import { QuizGame } from "@/components/games/QuizGame";
import { BuildGame } from "@/components/games/BuildGame";

const MODES: Mode[] = ["clasificar", "quiz", "construir"];
export const Route = createFileRoute("/jugar")({
  validateSearch: (s: Record<string, unknown>): { modo: Mode; nivel: Level; subtema?: string } => ({
    modo: MODES.includes(s.modo as Mode) ? (s.modo as Mode) : "clasificar",
    nivel: LEVELS.includes(s.nivel as Level) ? (s.nivel as Level) : "principiante",
    subtema: typeof s.subtema === "string" && GRAMMAR_PILOT_SUBTOPICS.some(x=>x===s.subtema) ? s.subtema : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Jugar — Academia PHUMA Play" },
      { name: "description", content: "Partida de Academia PHUMA Play: clasifica, responde o construye oraciones." },
      { property: "og:title", content: "Jugar — Academia PHUMA Play" },
      { property: "og:description", content: "Práctica lúdica de gramática: primer módulo de Academia PHUMA Play." },
    ],
  }),
  component: PlayRouter,
});

// Se guarda una cola por modalidad y nivel para evitar repeticiones entre partidas.
// Solo se vuelve a barajar cuando se ha agotado todo el banco.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildItems(modo: Mode, nivel: Level): any[] {
  const source = modo === "clasificar" ? [...SENTENCES[nivel], ...EXTRA_SENTENCES[nivel], ...(nivel === "avanzado" ? GRAMMAR_ADVANCED_SENTENCES : [])] : modo === "quiz" ? [...QUIZ[nivel], ...EXTRA_QUIZ[nivel]] : [...BUILD[nivel], ...EXTRA_BUILD[nivel], ...GRAMMAR_NUCLEUS_BUILD[nivel]];
  const key = `desafio-gramatical:cola:${modo}:${nivel}`;
  const ids = new Set(source.map((x) => x.id));
  let queue: string[] = [];
  try {
    const stored = JSON.parse(localStorage.getItem(key) || "[]");
    if (Array.isArray(stored)) queue = stored.filter((id): id is string => typeof id === "string" && ids.has(id));
  } catch { /* Sin almacenamiento disponible: se crea una cola nueva. */ }
  const batchSize = modo === "quiz" ? 8 : 5;
  const selected: string[] = [];
  while (selected.length < Math.min(batchSize, source.length)) {
    if (!queue.length) {
      queue = shuffle(source.map((x) => x.id));
      // Evitar una repetición inmediata en el límite de ciclos.
      if (selected.length && queue[0] === selected[selected.length - 1] && queue.length > 1) {
        [queue[0], queue[1]] = [queue[1], queue[0]];
      }
    }
    const id = queue.shift()!;
    if (!selected.includes(id)) selected.push(id);
  }
  try { localStorage.setItem(key, JSON.stringify(queue)); } catch { /* almacenamiento opcional */ }
  return selected.map((id) => {
    const item = source.find((x) => x.id === id)!;
    if (modo === "quiz") {
      const q = item as (typeof QUIZ)[Level][number];
      return { ...q, order: shuffle(q.options.map((_, i) => i)) };
    }
    if (modo === "construir") {
      const b = item as (typeof BUILD)[Level][number];
      return { ...b, bank: shuffle(b.tiles.map((t, k) => ({ ...t, k }))) };
    }
    return item;
  });
}

function PlayRouter() {
 const {subtema,nivel,modo}=Route.useSearch();
 if(subtema){
  if(grammarM1Pool(subtema,modo,nivel).length)return <GrammarM1Play key={`${subtema}-${nivel}-${modo}`} subtema={subtema} nivel={nivel} modo={modo}/>;
  if(modo==="quiz")return <GrammarPilot key={`${subtema}-${nivel}`} subtema={subtema} nivel={nivel}/>;
  if(modo==="clasificar"&&(subtema==="Sinónimos y antónimos"||subtema==="Cohesión y coherencia"))
   return <SynonymClassification key={`${subtema}-${nivel}`} nivel={nivel} subtema={subtema}/>;
  return <main className="p-6">Esta modalidad está en desarrollo. <Link to="/">Volver al menú</Link></main>;
 }
 return <Play/>;
}

function Play() {
  const { modo, nivel } = Route.useSearch();
  const [run, setRun] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [items, setItems] = useState<any[] | null>(null);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);
  const [mistakes, setMistakes] = useState<Mistake[]>([]);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    setItems(buildItems(modo, nivel)); setIdx(0); setScore(0); setStreak(0); setBest(0);
    setCorrect(0); setTotal(0); setMistakes([]); setFinished(false);
  }, [modo, nivel, run]);

  const report = (ok: boolean, m?: Mistake) => {
    setTotal((t) => t + 1);
    if (ok) {
      setCorrect((c) => c + 1);
      setStreak((s) => { setScore((sc) => sc + pointsFor(s)); const n = s + 1; setBest((b) => Math.max(b, n)); return n; });
    } else { setStreak(0); if (m) setMistakes((x) => [...x, m]); }
  };
  const next = () => {
    if (!items) return;
    if (idx + 1 >= items.length) {
      setFinished(true);
      saveHistory({ date: new Date().toISOString(), mode: modo, level: nivel, score, correct, total, bestStreak: best });
    } else setIdx(idx + 1);
  };

  if (!items) return <main className="p-8 text-center">Cargando…</main>;
  const nextLevel = LEVELS[LEVELS.indexOf(nivel) + 1];

  if (finished) {
    const pct = total ? Math.round((correct / total) * 100) : 0;
    return (
      <main className="mx-auto max-w-xl px-4 py-8 space-y-6">
        <h1 className="text-4xl font-black">Resultados</h1>
        <p className="text-muted-foreground">{MODE_LABEL[modo]} · {LEVEL_LABEL[nivel]}</p>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="card-ink p-3"><p className="text-xs">Puntaje</p><p className="text-3xl font-black text-primary">{score}</p></div>
          <div className="card-ink p-3"><p className="text-xs">Aciertos</p><p className="text-3xl font-black">{pct}%</p><p className="text-xs">{correct}/{total}</p></div>
          <div className="card-ink p-3"><p className="text-xs">Mejor racha</p><p className="text-3xl font-black">🔥{best}</p></div>
        </div>
        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Revisión de errores</h2>
          {mistakes.length === 0 ? <p className="rounded-lg border-2 border-foreground bg-success-soft p-3 font-bold">¡Sin errores! Excelente trabajo.</p> : (
            <ul className="space-y-2">{mistakes.map((m, i) => (
              <li key={i} className="rounded-lg border-2 border-foreground bg-card p-3 space-y-1">
                <p className="font-bold">{m.prompt}</p>
                <p className="text-sm">Tu respuesta: <span className="text-destructive font-bold">{m.given}</span></p>
                <p className="text-sm">Correcta: <span className="text-success font-bold">{m.correct}</span></p>
                <p className="text-sm text-muted-foreground">{m.exp}</p>
              </li>))}</ul>
          )}
        </section>
        <div className="grid gap-2">
          <button onClick={() => setRun((r) => r + 1)} className="tile bg-primary text-primary-foreground text-lg">↻ Jugar de nuevo</button>
          {nextLevel && <Link to="/jugar" search={{ modo, nivel: nextLevel }} className="tile bg-secondary text-center text-secondary-foreground">Siguiente nivel: {LEVEL_LABEL[nextLevel]} →</Link>}
          <Link to="/" className="tile bg-card text-center">Inicio</Link>
        </div>
      </main>
    );
  }

  const item = items[idx];
  const props = { item, report, next, isLast: idx === items.length - 1 };
  return (
    <main className="mx-auto max-w-xl px-4 py-5 space-y-5">
      <div className="flex items-center justify-between gap-2">
        <Link to="/" className="font-bold underline" aria-label="Salir al inicio">← Salir</Link>
        <p className="text-sm font-bold">{MODE_LABEL[modo]} · {LEVEL_LABEL[nivel]}</p>
        <button onClick={() => { if (confirm("¿Reiniciar la partida?")) setRun((r) => r + 1); }} className="font-bold underline">Reiniciar</button>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center" aria-live="polite">
        <div className="card-ink p-2"><p className="text-xs">Ronda</p><p className="text-xl font-black">{idx + 1}/{items.length}</p></div>
        <div className="card-ink p-2"><p className="text-xs">Puntaje</p><p className="text-xl font-black text-primary">{score}</p></div>
        <div className="card-ink p-2"><p className="text-xs">Racha</p><p className="text-xl font-black">🔥{streak}</p></div>
      </div>
      <div className="h-3 rounded-full border-2 border-foreground bg-muted overflow-hidden" role="progressbar" aria-valuenow={idx + 1} aria-valuemax={items.length} aria-valuemin={1}>
        <div className="h-full bg-primary transition-all" style={{ width: `${((idx + 1) / items.length) * 100}%` }} />
      </div>
      {modo === "clasificar" && <ClassifyGame key={`${modo}-${nivel}-${run}-${idx}-${item.id}`} {...props} />}
      {modo === "quiz" && <QuizGame key={`${modo}-${nivel}-${run}-${idx}-${item.id}`} {...props} />}
      {modo === "construir" && <BuildGame key={`${modo}-${nivel}-${run}-${idx}-${item.id}`} {...props} />}
    </main>
  );
}
export function GrammarPilot({subtema,nivel}:{subtema:string;nivel:Level}) {
 const [run,setRun]=useState(0);
 const [items,setItems]=useState<GrammarDraft[]|null>(null);
 const [index,setIndex]=useState(0);
 const [picked,setPicked]=useState<number|null>(null);
 const [correct,setCorrect]=useState(0);
 const [pilotStreak,setPilotStreak]=useState(0);
 const [pilotBest,setPilotBest]=useState(0);
 const [finished,setFinished]=useState(false);
 const [order,setOrder]=useState<number[]>([]);
 const pool=grammarPilotPool(subtema,nivel);
 const topic=subtema==="Figuras retóricas"||subtema==="Géneros literarios"?"Literatura":"Gramática y semántica";
 const key=rotationKey("espanol",topic,subtema,"quiz",nivel);
 useEffect(()=>{
  const list=grammarPilotPool(subtema,nivel);
  setItems(selectRotation(list,readRotation(key,list.map(q=>q.id)),10));
  setIndex(0);setPicked(null);setCorrect(0);setPilotStreak(0);setPilotBest(0);setFinished(false);setOrder(shuffle([0,1,2,3]));
 },[subtema,nivel,run,key]);
 if(!items)return <main className="p-6">Preparando ejercicios…</main>;
 if(!items.length)return <main className="p-6">No hay ejercicios para esta selección. <Link to="/">Volver al menú</Link></main>;
 if(finished)return <main className="mx-auto max-w-xl p-6 space-y-4"><h1 className="text-3xl font-black">Práctica terminada</h1><p>{subtema} · {correct}/{items.length} respuestas correctas</p><p className="text-sm">La práctica es orientativa y no representa un puntaje oficial PHUMA.</p><button className="tile bg-primary text-primary-foreground" onClick={()=>setRun(n=>n+1)}>Practicar de nuevo</button><Link className="block underline" to="/">Volver al menú</Link></main>;
 const q=items[index];
 const choose=(i:number)=>{if(picked!==null)return;setPicked(i);const ok=i===q.answer;if(ok){setCorrect(n=>n+1);setPilotStreak(n=>{const next=n+1;setPilotBest(best=>Math.max(best,next));return next;});}else setPilotStreak(0);writeRotation(key,recordRotation(readRotation(key,pool.map(x=>x.id)),q.id,ok));};
 const next=()=>{if(index+1===items.length){saveHistory({date:new Date().toISOString(),mode:"quiz",level:nivel,score:correct*10,correct,total:items.length,bestStreak:pilotBest,area:"espanol",topic,subtopic:subtema});setFinished(true);}else{setIndex(n=>n+1);setPicked(null);setOrder(shuffle([0,1,2,3]));}};
 return <main className="mx-auto max-w-2xl p-6 space-y-5"><Link to="/" className="underline">← Menú</Link><h1 className="text-2xl font-black">{subtema}</h1><p role="note" className="text-sm text-muted-foreground">Ejercicios originales en revisión académica, no preguntas PHUMA oficiales.</p><p>Pregunta {index+1} de {items.length} · {nivel==="principiante"?"Básico":LEVEL_LABEL[nivel]}</p><div className="card-ink p-5 space-y-4"><p>{q.passage}</p><h2 className="font-bold">{q.question}</h2></div><div className="grid gap-3">{order.map(i=><button key={i} disabled={picked!==null} onClick={()=>choose(i)} className={`tile text-left ${picked===null?"bg-card":i===q.answer?"bg-success-soft":i===picked?"bg-destructive-soft":"bg-muted"}`}>{q.options[i]}</button>)}</div>{picked!==null&&<div aria-live="polite" className="space-y-3"><p className="card-ink p-4"><strong>{picked===q.answer?"Correcto. ":"Revisa tu respuesta. "}</strong>{q.explanation}</p><button onClick={next} className="tile w-full bg-primary text-primary-foreground">{index+1===items.length?"Ver resultado":"Siguiente"}</button></div>}</main>;
}

export function SynonymClassification({nivel,subtema="Sinónimos y antónimos"}:{nivel:Level;subtema?:string}) {
 const source=subtema==="Cohesión y coherencia"?COHESION_CLASSIFICATION:SYNONYM_CLASSIFICATION;
 const pool=source.filter(q=>q.level===nivel);
 const key=rotationKey("espanol","Gramática y semántica",subtema,"clasificar",nivel);
 const [run,setRun]=useState(0);
 const [items,setItems]=useState<ClassificationActivity[]|null>(null);
 const [index,setIndex]=useState(0);
 const [correct,setCorrect]=useState(0);
 const [streak,setStreak]=useState(0);
 const [best,setBest]=useState(0);
 const [finished,setFinished]=useState(false);
 useEffect(()=>{const list=source.filter(q=>q.level===nivel);setItems(selectRotation(list,readRotation(key,list.map(q=>q.id)),10));setIndex(0);setCorrect(0);setStreak(0);setBest(0);setFinished(false);},[nivel,run,key,source]);
 if(!items)return <main className="p-6">Preparando ejercicios…</main>;
 if(!items.length)return <main className="p-6">No hay ejercicios para esta selección. <Link to="/">Volver al menú</Link></main>;
 if(finished)return <main className="mx-auto max-w-xl p-6 space-y-4"><h1 className="text-3xl font-black">Práctica terminada</h1><p>{subtema} · {correct}/{items.length} respuestas correctas</p><p className="text-sm">La práctica es orientativa y no representa un puntaje oficial PHUMA.</p><button className="tile bg-primary text-primary-foreground" onClick={()=>setRun(n=>n+1)}>Practicar de nuevo</button><Link className="block underline" to="/">Volver al menú</Link></main>;
 const q=items[index];
 const report=(ok:boolean)=>{if(ok){setCorrect(n=>n+1);setStreak(n=>{const next=n+1;setBest(b=>Math.max(b,next));return next;});}else setStreak(0);writeRotation(key,recordRotation(readRotation(key,pool.map(x=>x.id)),q.id,ok));};
 const next=()=>{if(index+1===items.length){saveHistory({date:new Date().toISOString(),mode:"clasificar",level:nivel,score:correct*10,correct,total:items.length,bestStreak:best,area:"espanol",topic:"Gramática y semántica",subtopic:subtema});setFinished(true);}else setIndex(n=>n+1);};
 return <main className="mx-auto max-w-2xl p-6 space-y-5"><Link to="/" className="underline">← Menú</Link><h1 className="text-2xl font-black">{subtema}</h1><p>Clasificación · Pregunta {index+1} de {items.length} · {nivel==="principiante"?"Básico":LEVEL_LABEL[nivel]}</p><GrammarClassification key={q.id} item={q} onResult={report} onNext={next}/></main>;
}
