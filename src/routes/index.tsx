import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { LEVELS, LEVEL_LABEL, MODE_LABEL, type Level, type Mode } from "@/lib/grammar";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Desafío Gramatical — Juega con las categorías gramaticales" },
      { name: "description", content: "Clasifica palabras, responde quizzes y construye oraciones en español. Tres niveles, rachas e historial." },
      { property: "og:title", content: "Desafío Gramatical" },
      { property: "og:description", content: "Tres juegos para dominar sustantivos, verbos, adverbios y más." },
    ],
  }),
  component: Home,
});

const MODES: { id: Mode; icon: string; desc: string }[] = [
  { id: "clasificar", icon: "🏷️", desc: "Etiqueta cada palabra de una oración." },
  { id: "quiz", icon: "❓", desc: "Preguntas de clasificación y conceptos." },
  { id: "construir", icon: "🧩", desc: "Arma oraciones que cumplan un patrón." },
];

function Home() {
  const [mode, setMode] = useState<Mode>("clasificar");
  const [level, setLevel] = useState<Level>("principiante");
  return (
    <main className="mx-auto max-w-xl px-4 py-8 space-y-8">
      <header className="space-y-2">
        <p className="inline-block rounded-full border-2 border-foreground bg-accent px-3 py-1 text-sm font-bold">Ñ · Gramática en juego</p>
        <h1 className="text-5xl font-black leading-none">Desafío <span className="text-primary">Gramatical</span></h1>
        <p className="text-lg text-muted-foreground">Aprende a distinguir las categorías de las palabras con explicaciones en cada respuesta.</p>
      </header>

      <section aria-labelledby="m" className="space-y-3">
        <h2 id="m" className="text-2xl font-bold">1. Elige un juego</h2>
        <div className="grid gap-3" role="radiogroup">
          {MODES.map((m) => (
            <button key={m.id} role="radio" aria-checked={mode === m.id} onClick={() => setMode(m.id)}
              className={`card-ink flex items-center gap-4 p-4 text-left transition ${mode === m.id ? "bg-primary text-primary-foreground" : ""}`}>
              <span className="text-3xl" aria-hidden>{m.icon}</span>
              <span><span className="block text-lg font-bold">{MODE_LABEL[m.id]}</span><span className="text-sm opacity-90">{m.desc}</span></span>
            </button>
          ))}
        </div>
      </section>

      <section aria-labelledby="l" className="space-y-3">
        <h2 id="l" className="text-2xl font-bold">2. Elige el nivel</h2>
        <div className="grid grid-cols-3 gap-2" role="radiogroup">
          {LEVELS.map((l) => (
            <button key={l} role="radio" aria-checked={level === l} onClick={() => setLevel(l)}
              className={`tile text-sm ${level === l ? "bg-secondary text-secondary-foreground" : "bg-card"}`}>{LEVEL_LABEL[l]}</button>
          ))}
        </div>
      </section>

      <Link to="/jugar" search={{ modo: mode, nivel: level }} className="tile block w-full bg-primary py-4 text-center text-xl text-primary-foreground">¡Jugar!</Link>
      <Link to="/historial" className="tile block w-full bg-card text-center">📊 Ver historial</Link>
    </main>
  );
}