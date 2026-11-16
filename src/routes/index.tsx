import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { LEVELS, LEVEL_LABEL, type Level, type Mode } from "@/lib/grammar";
import {
 AREAS, CATALOG_COUNTS, FIRST_MODULE, GAME_IDS, GAME_ICONS,
 GAME_FOCUS, gameNames, availableModule, type AreaId
} from "@/lib/phuma-catalog";

export const Route = createFileRoute("/")({
 head: () => ({
  meta: [
   { title: "Academia PHUMA Play — Aprende jugando" },
   { name: "description", content: "Cinco áreas de preparación PHUMA: selecciona un subtema y practica con tres desafíos de reconocimiento, aplicación y construcción." },
   { property: "og:title", content: "Academia PHUMA Play" },
   { property: "og:description", content: "Aprende jugando. Cinco áreas, diecinueve temas y tres retos por tema." },
  ],
 }),
 component: Home,
});

function Home() {
 const [areaId,setAreaId]=useState<AreaId>(FIRST_MODULE.area);
 const [topic,setTopic]=useState(FIRST_MODULE.topic);
 const [subtopic,setSubtopic]=useState(FIRST_MODULE.subtopic);
 const [mode,setMode]=useState<Mode>("clasificar");
 const [level,setLevel]=useState<Level>("principiante");
 const selectedArea=AREAS.find(a=>a.id===areaId)!;
 const selectedTopic=selectedArea.topics.find(t=>t.name===topic)!;
 const active=availableModule(areaId,topic,subtopic);
 const reading=areaId==="espanol"&&topic==="Comprensión lectora";
 const names=gameNames(topic);
 const onArea=(id:AreaId)=>{
  const target=AREAS.find(a=>a.id===id)!;
  setAreaId(id);setTopic(target.topics[0].name);setSubtopic(target.topics[0].subtopics[0]);setMode("clasificar");
 };
 const onTopic=(name:string)=>{
  const target=selectedArea.topics.find(t=>t.name===name)!;
  setTopic(name);setSubtopic(target.subtopics[0]);setMode("clasificar");
 };
 return (
  <main className="mx-auto max-w-4xl px-4 py-7 md:py-10 space-y-7">
   <header className="space-y-3">
    <p className="inline-block rounded-full border-2 border-foreground bg-accent px-3 py-1 text-sm font-bold">🎓 Preparación universitaria · Honduras</p>
    <h1 className="text-4xl sm:text-5xl font-black leading-tight">Academia <span className="text-primary">PHUMA Play</span></h1>
    <p className="text-lg text-muted-foreground max-w-2xl">Aprende jugando. Selecciona una materia, elige qué deseas practicar y supera tres desafíos con dificultad progresiva.</p>
    <p className="text-sm text-muted-foreground">{CATALOG_COUNTS.areas} áreas · {CATALOG_COUNTS.topics} temas · {CATALOG_COUNTS.subtopics} subtemas</p>
   </header>

   <section aria-labelledby="select-area" className="space-y-3">
    <h2 id="select-area" className="text-2xl font-black">1. Selecciona un área</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3" role="group" aria-label="Área académica">
     {AREAS.map(a=>(
      <button key={a.id} onClick={()=>onArea(a.id)} aria-pressed={areaId===a.id}
       className={`card-ink flex flex-col items-start gap-1 p-4 text-left transition-colors ${areaId===a.id?"bg-primary text-primary-foreground":"bg-card"}`}>
       <span className="text-3xl" aria-hidden>{a.icon}</span>
       <span className="font-bold text-base">{a.label}</span>
       <span className="text-xs opacity-85">{a.topics.length} temas</span>
      </button>
     ))}
    </div>
   </section>

   <section aria-labelledby="select-topic" className="card-ink bg-card p-5 space-y-4">
    <h2 id="select-topic" className="text-2xl font-black">2. Elige un tema y subtema</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
     <label className="block space-y-2 font-bold text-sm">Tema
      <select aria-label="Tema de estudio" value={topic} onChange={e=>onTopic(e.target.value)} className="w-full border-2 border-foreground rounded-lg bg-background p-3 font-normal">
       {selectedArea.topics.map(t=><option key={t.name} value={t.name}>{t.name}</option>)}
      </select>
     </label>
     <label className="block space-y-2 font-bold text-sm">Subtema
      <select aria-label="Subtema de estudio" value={subtopic} onChange={e=>setSubtopic(e.target.value)} className="w-full border-2 border-foreground rounded-lg bg-background p-3 font-normal">
       {selectedTopic.subtopics.map(s=><option key={s} value={s}>{s}</option>)}
      </select>
     </label>
    </div>
    <p aria-live="polite" className={`rounded-lg px-3 py-2 text-sm font-bold ${active?"bg-success-soft":"bg-muted"}`}>
      {active?(reading?"✓ Lectura disponible: los tres juegos se han desarrollado para este subtema.":"✓ Módulo disponible: los tres juegos originales se conservan.") :
      "🛠️ Módulo planificado: puedes explorar los juegos, pero aún no está desarrollado."}
    </p>
   </section>

   <section aria-labelledby="select-game" className="space-y-3">
    <h2 id="select-game" className="text-2xl font-black">3. Elige un juego</h2>
    <div className="grid gap-3" role="group" aria-label="Tipo de desafío">
     {GAME_IDS.map(id=>(
      <button key={id} onClick={()=>setMode(id)} aria-pressed={mode===id}
       className={`card-ink flex items-center gap-4 p-4 text-left transition ${mode===id?"bg-primary text-primary-foreground":"bg-card"}`}>
       <span className="text-3xl" aria-hidden>{GAME_ICONS[id]}</span>
       <span className="flex-1"><span className="block text-lg font-bold">{names[id]}</span><span className="block text-sm opacity-90">{GAME_FOCUS[id]}</span></span>
       <span className="text-xs font-bold">{active?"Disponible":"Próximamente"}</span>
      </button>
     ))}
    </div>
   </section>

   <section aria-labelledby="select-level" className="space-y-3">
    <h2 id="select-level" className="text-2xl font-black">4. Selecciona el nivel</h2>
    <div className="grid grid-cols-3 gap-2" role="group" aria-label="Dificultad">
     {LEVELS.map(l=>(
      <button key={l} aria-pressed={level===l} onClick={()=>setLevel(l)}
       className={`tile text-sm ${level===l?"bg-secondary text-secondary-foreground":"bg-card"}`}>
       {l==="principiante"?"Básico":LEVEL_LABEL[l]}
      </button>
     ))}
    </div>
    <p className="text-sm text-muted-foreground">Básico: fundamentos · Intermedio: aplicación tipo PHUMA · Avanzado: razonamiento complejo. Estos niveles son orientativos, no una clasificación oficial.</p>
   </section>

   <section className="space-y-3">
    <div aria-live="polite" className="rounded-xl border-2 border-foreground bg-accent/40 p-4 text-sm">
      <strong>Tu ruta:</strong> {selectedArea.label} → {topic} → {subtopic} → {names[mode]} → {level==="principiante"?"Básico":LEVEL_LABEL[level]}
    </div>
    {active?(reading?
     <Link to="/lectura" search={{subtema:subtopic as import("@/lib/reading").ReadingSubtopic,modo:mode,nivel:level}}
      className="tile block w-full bg-primary py-4 text-center text-xl text-primary-foreground">▶ ¡Comenzar desafío!</Link>:
     <Link to="/jugar" search={{modo:mode,nivel:level}}
      className="tile block w-full bg-primary py-4 text-center text-xl text-primary-foreground">▶ ¡Comenzar desafío!</Link>):
     <div className="tile w-full cursor-not-allowed bg-muted py-4 text-center font-bold" role="status">🔒 Juego en desarrollo · prueba Comprensión lectora o Categorías gramaticales</div>
    }
    <Link to="/historial" className="tile block w-full bg-card text-center">📊 Ver historial de partidas</Link>
   </section>
   <aside className="rounded-xl border-2 border-foreground bg-card p-4 text-sm space-y-2">
    <h2 className="text-lg font-black">Sobre la evolución de Desafío Gramatical</h2>
    <p>La aplicación conserva los tres juegos gramaticales originales y ya incluye Comprensión lectora: Detective de ideas, Verdad o inferencia y Reconstruye el texto. El resto del catálogo se ampliará progresivamente.</p>
    <p className="text-muted-foreground">Recurso educativo independiente. No afiliado ni avalado por la UNAH. Los puntos del juego no equivalen al puntaje de la prueba PHUMA.</p>
   </aside>
  </main>
 );
}
