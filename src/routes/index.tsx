import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { LEVELS, LEVEL_LABEL, type Level, type Mode } from "@/lib/grammar";
import {
 AREAS, CATALOG_COUNTS, GAME_IDS, GAME_ICONS,
 GAME_FOCUS, gameNames, availableModule, type AreaId
} from "@/lib/phuma-catalog";
import {GRAMMAR_PILOT_SUBTOPICS} from "@/lib/grammar-next-draft";
import {GRAMMAR_M1_ACTIVITIES} from "@/lib/grammar-m1-activities";
import {M1_NEXT_ACTIVITIES} from "@/lib/grammar-m1-next-activities";
import {M1_LITERATURE_ACTIVITIES} from "@/lib/grammar-m1-literature";
import {CONTENT_TARGET,CONTENT_STAGE_ONE,countContent} from "@/lib/coverage";
import {learningDescription,DEFAULT_SELECTION,type StudySelection} from "@/lib/study-context";

export const Route = createFileRoute("/")({
 validateSearch:(search:Record<string,unknown>)=>{
  const area=AREAS.find(a=>a.id===search.area)??AREAS.find(a=>a.id===DEFAULT_SELECTION.area)!;
  const selectedTopic=area.topics.find(t=>t.name===search.tema)??area.topics[0];
  return {area:area.id,tema:selectedTopic.name,
   subtema:selectedTopic.subtopics.includes(search.subtema as string)?search.subtema as string:selectedTopic.subtopics[0],
   modo:GAME_IDS.includes(search.modo as Mode)?search.modo as Mode:DEFAULT_SELECTION.modo,
   nivel:LEVELS.includes(search.nivel as Level)?search.nivel as Level:DEFAULT_SELECTION.nivel};
 },
 head: () => ({
  meta: [
   { title: "Academia PHUMA Play — Aprende jugando" },
   { name: "description", content: "Cinco áreas de preparación PHUMA: elige un tema y practica mediante desafíos adaptados a cada competencia, incluidos laboratorios gráficos." },
   { property: "og:title", content: "Academia PHUMA Play" },
   { property: "og:description", content: "Aprende jugando. Cinco áreas con juegos adaptados a la competencia." },
  ],
 }),
 component: Home,
});

function Home() {
 const selected=Route.useSearch();
 const [selection,setSelection]=useState<StudySelection>(()=>({...selected}));
 const {area:areaId,tema:topic,subtema:subtopic,modo:mode,nivel:level}=selection;
 const selectedArea=AREAS.find(a=>a.id===areaId)??AREAS[0];
 const selectedTopic=selectedArea.topics.find(t=>t.name===topic)??selectedArea.topics[0];
 const pilot=areaId==="espanol"&&(topic==="Gramática y semántica"||topic==="Literatura")&&GRAMMAR_PILOT_SUBTOPICS.some(s=>s===subtopic);
 const pilotMode=(id:Mode)=>id==="quiz"||((subtopic==="Sinónimos y antónimos"||subtopic==="Cohesión y coherencia")&&id==="clasificar")||[...GRAMMAR_M1_ACTIVITIES,...M1_NEXT_ACTIVITIES,...M1_LITERATURE_ACTIVITIES].some(x=>x.subtopic===subtopic&&x.kind===(id==="construir"?"construction":"classification"));
 const active=pilot?pilotMode(mode):availableModule(areaId,topic,subtopic);
 const reading=areaId==="espanol"&&topic==="Comprensión lectora";
 const writing=areaId==="espanol"&&topic==="Redacción";
 const math=areaId==="matematicas";
 const names={...gameNames(topic),...(topic==="Redacción"&&subtopic==="Corrección"?{quiz:"Corrección precisa"}:{}),...(topic==="Redacción"&&subtopic==="Organización textual"?{quiz:"Continúa el texto"}:{}),...(topic==="Redacción"&&subtopic==="Elisión y adición"?{quiz:"Revisión precisa"}:{}),...(topic==="Redacción"&&subtopic==="Generalización e integración"?{quiz:"Conclusión sustentada"}:{})};
 const availableCount=countContent(areaId,topic,subtopic,mode,level);
 const targetCount=CONTENT_TARGET[level];
 const nucleus=CONTENT_STAGE_ONE[level];
 const onArea=(id:AreaId)=>{
  const target=AREAS.find(a=>a.id===id)!;
  setSelection(previous=>({...previous,area:id,tema:target.topics[0].name,subtema:target.topics[0].subtopics[0],modo:"clasificar"}));
 };
 const onTopic=(name:string)=>{
  const target=selectedArea.topics.find(t=>t.name===name)!;
  setSelection(previous=>({...previous,tema:name,subtema:target.subtopics[0],modo:"clasificar"}));
 };
 return (
  <main className="mx-auto max-w-4xl px-4 py-7 md:py-10 space-y-7">
   <header className="space-y-3">
    <p className="inline-block rounded-full border-2 border-foreground bg-accent px-3 py-1 text-sm font-bold">🎓 Preparación universitaria · Honduras</p>
    <h1 className="text-4xl sm:text-5xl font-black leading-tight">Academia <span className="text-primary">PHUMA Play</span></h1>
    <p className="text-lg text-muted-foreground max-w-2xl">Aprende jugando. Selecciona una materia y practica con desafíos flexibles, incluyendo laboratorios gráficos y actividades adaptadas a cada competencia.</p>
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
      <select aria-label="Subtema de estudio" value={subtopic} onChange={e=>setSelection(previous=>({...previous,subtema:e.target.value}))} className="w-full border-2 border-foreground rounded-lg bg-background p-3 font-normal">
       {selectedTopic.subtopics.map(s=><option key={s} value={s}>{s}</option>)}
      </select>
     </label>
    </div>
    <p aria-live="polite" role="note" className="rounded-lg border border-foreground/20 bg-success-soft px-4 py-3 text-sm leading-relaxed">
     <strong>¿Qué aprenderás en {subtopic}?</strong> {learningDescription(areaId,topic,subtopic)}
    </p>
    <p role="status" className="text-xs text-muted-foreground">
     {active?"Contenido disponible para practicar. Revisión académica pendiente.":"Contenido planificado: esta combinación todavía no está disponible."}
    </p>
   </section>

   <section aria-labelledby="select-game" className="space-y-3">
    <h2 id="select-game" className="text-2xl font-black">3. Elige un juego</h2>
    <div className="grid gap-3" role="group" aria-label="Tipo de desafío">
     {GAME_IDS.map(id=>(
      <button key={id} onClick={()=>setSelection(previous=>({...previous,modo:id}))} aria-pressed={mode===id}
       className={`card-ink flex items-center gap-4 p-4 text-left transition ${mode===id?"bg-primary text-primary-foreground":"bg-card"}`}>
       <span className="text-3xl" aria-hidden>{GAME_ICONS[id]}</span>
       <span className="flex-1"><span className="block text-lg font-bold">{names[id]}</span><span className="block text-sm opacity-90">{GAME_FOCUS[id]}</span></span>
       <span className="text-xs font-bold">{(pilot?pilotMode(id):active)?"Disponible":"Próximamente"}</span>
      </button>
     ))}
    </div>
   </section>

   <section aria-labelledby="select-level" className="space-y-3">
    <h2 id="select-level" className="text-2xl font-black">4. Selecciona el nivel</h2>
    <div className="grid grid-cols-3 gap-2" role="group" aria-label="Dificultad">
     {LEVELS.map(l=>(
      <button key={l} aria-pressed={level===l} onClick={()=>setSelection(previous=>({...previous,nivel:l}))}
       className={`tile text-sm ${level===l?"bg-secondary text-secondary-foreground":"bg-card"}`}>
       {l==="principiante"?"Básico":LEVEL_LABEL[l]}
      </button>
     ))}
    </div>
    <p className="text-sm text-muted-foreground">Básico: fundamentos · Intermedio: aplicación tipo PHUMA · Avanzado: razonamiento complejo. Estos niveles son orientativos, no una clasificación oficial.</p>
   </section>

   <section className="card-ink bg-card p-4 space-y-3" aria-label="Cobertura del banco de ejercicios">
    <div className="flex flex-wrap justify-between items-center gap-2">
     <h2 className="font-black text-lg">Cobertura de este juego</h2>
     <p className="text-sm font-bold">{availableCount} / {targetCount} ejercicios registrados</p>
    </div>
    <div className="h-3 overflow-hidden rounded-full bg-muted border border-foreground" role="progressbar"
     aria-label="Progreso hacia la meta de contenido" aria-valuemin={0} aria-valuemax={targetCount} aria-valuenow={availableCount}>
     <div className="h-full bg-primary" style={{width:`${Math.min(100,100*availableCount/targetCount)}%`}} />
    </div>
    <p className="text-sm text-muted-foreground">{availableCount>=nucleus?
      `Primera meta de contenido alcanzada (${nucleus} ejercicios). Falta revisión pedagógica y completar ${targetCount}.`:
      `Primera meta: ${nucleus} ejercicios; actualmente faltan ${Math.max(0,nucleus-availableCount)} para ese mínimo.`}
    </p>
    <p className="text-xs text-muted-foreground">Los escenarios compartidos entre mecánicas se cuentan por juego, pero no equivalen a problemas totalmente independientes. Esta cifra indica cantidad, no certificación del contenido.</p>
   </section>

   <section className="space-y-3">
    <div aria-live="polite" className="rounded-xl border-2 border-foreground bg-accent/40 p-4 text-sm">
      <strong>Tu ruta:</strong> {selectedArea.label} → {topic} → {subtopic} → {names[mode]} → {level==="principiante"?"Básico":LEVEL_LABEL[level]}
    </div>
    {active?(math?
     <Link to="/matematicas" search={{subtema:subtopic,modo:mode,nivel:level}}
      className="tile block w-full bg-primary py-4 text-center text-xl text-primary-foreground">▶ ¡Comenzar desafío!</Link>:
     writing?
     <Link to="/redaccion" search={{subtema:subtopic as import("@/lib/writing").WritingSubtopic,modo:mode,nivel:level}}
      className="tile block w-full bg-primary py-4 text-center text-xl text-primary-foreground">▶ ¡Comenzar desafío!</Link>:
     reading?
     <Link to="/lectura" search={{subtema:subtopic as import("@/lib/reading").ReadingSubtopic,modo:mode,nivel:level}}
      className="tile block w-full bg-primary py-4 text-center text-xl text-primary-foreground">▶ ¡Comenzar desafío!</Link>:
     <Link to="/jugar" search={{modo:mode,nivel:level,subtema:pilot?subtopic:undefined}}
      className="tile block w-full bg-primary py-4 text-center text-xl text-primary-foreground">▶ ¡Comenzar desafío!</Link>):
     <div className="tile w-full cursor-not-allowed bg-muted py-4 text-center font-bold" role="status">🔒 Juego en desarrollo · selecciona otra modalidad disponible</div>
    }
    {math&&topic==="Álgebra"&&subtopic==="Funciones"&&<section className="card-ink bg-accent/40 p-4 space-y-3" aria-label="Laboratorio de análisis de funciones">
     <h3 className="font-black text-lg">📈 Laboratorio de gráficas: seis habilidades</h3>
     <p className="text-sm">Nuevo juego visual independiente para interpretar dominio, rango, tramos crecientes y decrecientes e intersecciones con los ejes. Cada partida incluye diez ejercicios repartidos entre seis destrezas.</p>
     <Link to="/laboratorio-funciones" search={{nivel:level}}
      className="tile block w-full bg-secondary text-secondary-foreground text-center font-bold">▶ Abrir laboratorio de funciones ({level==="principiante"?"Básico":LEVEL_LABEL[level]})</Link>
     <p className="text-xs">Práctica complementaria: el temario oficial PHUMA 2026 no enumera separadamente todas estas habilidades.</p>
    </section>}
    <Link to="/historial" className="tile block w-full bg-card text-center">📊 Ver historial de partidas</Link>
   </section>
   <aside className="rounded-xl border-2 border-foreground bg-card p-4 text-sm space-y-2">
    <h2 className="text-lg font-black">Sobre la evolución de Desafío Gramatical</h2>
    <p>La aplicación conserva las experiencias originales de Español y adopta otras mecánicas cuando son más adecuadas, como el laboratorio de interpretación gráfica de Matemáticas. Los módulos se amplían por competencia y evidencia.</p>
    <p className="text-muted-foreground">Recurso educativo independiente. No afiliado ni avalado por la UNAH. Los puntos del juego no equivalen al puntaje de la prueba PHUMA.</p>
   </aside>
  </main>
 );
}
