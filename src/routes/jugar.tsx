import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BUILD, LEVELS, LEVEL_LABEL, MODE_LABEL, QUIZ, SENTENCES, pointsFor, saveHistory, shuffle, type Level, type Mistake, type Mode } from "@/lib/grammar";
import { EXTRA_SENTENCES } from "@/lib/extra-sentences";
import { EXTRA_QUIZ } from "@/lib/extra-quiz";
import { ClassifyGame } from "@/components/games/ClassifyGame";
import { QuizGame } from "@/components/games/QuizGame";
import { BuildGame } from "@/components/games/BuildGame";

const MODES: Mode[] = ["clasificar", "quiz", "construir"];
export const Route = createFileRoute("/jugar")({
  validateSearch: (s: Record<string, unknown>): { modo: Mode; nivel: Level } => ({
    modo: MODES.includes(s.modo as Mode) ? (s.modo as Mode) : "clasificar",
    nivel: LEVELS.includes(s.nivel as Level) ? (s.nivel as Level) : "principiante",
  }),
  head: () => ({
    meta: [
      { title: "Jugar — Desafío Gramatical" },
      { name: "description", content: "Partida de Desafío Gramatical: clasifica, responde o construye oraciones." },
      { property: "og:title", content: "Jugar — Desafío Gramatical" },
      { property: "og:description", content: "Pon a prueba tu gramática española." },
    ],
  }),
  component: Play,
});

// Se guarda una cola por modalidad y nivel para evitar repeticiones entre partidas.
// Solo se vuelve a barajar cuando se ha agotado todo el banco.
function buildItems(modo: Mode, nivel: Level): any[] {
  const source = modo === "clasificar" ? [...SENTENCES[nivel], ...EXTRA_SENTENCES[nivel]] : modo === "quiz" ? [...QUIZ[nivel], ...EXTRA_QUIZ[nivel]] : BUILD[nivel];
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
      {modo === "clasificar" && <ClassifyGame key={`${run}-${idx}`} {...props} />}
      {modo === "quiz" && <QuizGame key={`${run}-${idx}`} {...props} />}
      {modo === "construir" && <BuildGame key={`${run}-${idx}`} {...props} />}
    </main>
  );
}