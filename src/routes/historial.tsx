import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { clearHistory, loadHistory, LEVEL_LABEL, MODE_LABEL, type HistoryEntry } from "@/lib/grammar";

export const Route = createFileRoute("/historial")({
  head: () => ({
    meta: [
      { title: "Historial — Academia PHUMA Play" },
      { name: "description", content: "Tus partidas, puntajes y mejores rachas en Academia PHUMA Play." },
      { property: "og:title", content: "Historial — Academia PHUMA Play" },
      { property: "og:description", content: "Revisa tu progreso en los juegos de gramática." },
    ],
  }),
  component: History,
});

function History() {
  const [h, setH] = useState<HistoryEntry[]>([]);
  useEffect(() => setH(loadHistory()), []);
  const best = h.reduce((m, e) => Math.max(m, e.score), 0);
  return (
    <main className="mx-auto max-w-xl px-4 py-8 space-y-6">
      <Link to="/" className="font-bold underline">← Inicio</Link>
      <h1 className="text-4xl font-black">Historial</h1>
      <div className="grid grid-cols-2 gap-3">
        <div className="card-ink p-4"><p className="text-sm">Partidas</p><p className="text-3xl font-black">{h.length}</p></div>
        <div className="card-ink p-4"><p className="text-sm">Mejor puntaje</p><p className="text-3xl font-black text-primary">{best}</p></div>
      </div>
      {h.length === 0 ? <p className="text-muted-foreground">Aún no hay partidas. ¡Juega una!</p> : (
        <ul className="space-y-2">
          {h.map((e, i) => (
            <li key={i} className="card-ink p-3 flex justify-between gap-2">
              <div><p className="font-bold">{e.topic === "Comprensión lectora" ? ({clasificar:"Detective de ideas",quiz:"Verdad o inferencia",construir:"Reconstruye el texto"}[e.mode]) : e.topic === "Redacción" ? (e.subtopic==="Corrección"&&e.mode==="quiz"?"Corrección precisa":e.subtopic==="Organización textual"&&e.mode==="quiz"?"Continúa el texto":e.subtopic==="Elisión y adición"&&e.mode==="quiz"?"Revisión precisa":e.subtopic==="Generalización e integración"&&e.mode==="quiz"?"Conclusión sustentada":({clasificar:"Cazador de errores",quiz:"Conector correcto",construir:"Editor experto"}[e.mode])) : MODE_LABEL[e.mode]} · {LEVEL_LABEL[e.level]}</p>
                <p className="text-sm text-muted-foreground">{e.topic ? `${e.topic} / ${e.subtopic} · ` : "Gramática · "}{new Date(e.date).toLocaleString("es")} · racha {e.bestStreak}</p></div>
              <div className="text-right"><p className="text-xl font-black">{e.score}</p><p className="text-sm">{e.correct}/{e.total}</p></div>
            </li>
          ))}
        </ul>
      )}
      {h.length > 0 && <button onClick={() => { if (confirm("¿Borrar todo el historial?")) { clearHistory(); setH([]); } }} className="tile w-full bg-destructive text-destructive-foreground">Borrar historial</button>}
    </main>
  );
}