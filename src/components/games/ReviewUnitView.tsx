import {useId} from "react";
import type {ReviewUnit,ReviewBlock,InventoryExercise} from "@/lib/review-contract";
import {validateReview} from "@/lib/review-contract";
const labels:Record<ReviewBlock["kind"],string>={"concept-map":"Mapa conceptual",comparison:"Comparación",sequence:"Secuencia","worked-example":"Ejemplo resuelto",counterexample:"Contraejemplo","common-error":"Error frecuente",diagram:"Diagrama",practice:"Práctica formativa"};
const depthLabels={principiante:"Básico",intermedio:"Intermedio",avanzado:"Avanzado"};
function Visual({visual}:{visual:NonNullable<ReviewBlock["visual"]>}){
 const names=new Map(visual.nodes.map(n=>[n.id,n.label]));
 return <div className="space-y-2" role="group" aria-label="Relaciones del organizador visual">
  {visual.edges.map((edge,i)=><div key={i} className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-2 items-center text-center">
   <span className="rounded-lg border border-foreground/30 bg-card p-3 font-semibold break-words">{names.get(edge.from)}</span>
   <span className="text-sm font-medium"><span aria-hidden="true">→ </span>{edge.label}</span>
   <span className="rounded-lg border border-foreground/30 bg-accent/40 p-3 font-semibold break-words">{names.get(edge.to)}</span>
  </div>)}
 </div>;
}
/** Structural validity is not academic approval. No score, session, or history mutation. */
export function ReviewUnitView({unit,inventory,onBack}:{unit:ReviewUnit;inventory:InventoryExercise[];onBack:()=>void}){
 const titleId=useId();
 const issues=validateReview(unit,inventory);
 if(issues.length)return <section aria-labelledby={titleId} className="card-ink p-4 space-y-3"><h2 id={titleId} className="text-xl font-black">Repaso no disponible</h2><p role="status">Este material todavía no cumple los controles de cobertura.</p><button type="button" className="tile bg-card" onClick={onBack}>Volver a la selección</button></section>;
 return <section aria-labelledby={titleId} className="space-y-5">
  <header className="space-y-2"><button type="button" className="tile bg-card" onClick={onBack}>← Volver a la selección</button><h2 id={titleId} className="text-3xl font-black">Aprende y repasa: {unit.subtopic}</h2><p className="text-sm text-muted-foreground">{unit.topic} · A tu ritmo, sin puntuación ni límite de tiempo.</p><p role="note" className="text-sm">Material de estudio original. La validez académica requiere revisión independiente; no equivale a certificación PHUMA.</p></header>
  <section className="card-ink bg-card p-4 space-y-2"><h3 className="text-xl font-black">Objetivos de aprendizaje</h3><ul className="list-disc pl-5 space-y-1">{unit.objectives.map(o=><li key={o.id}><strong>{depthLabels[o.depth]}:</strong> {o.statement}</li>)}</ul></section>
  {unit.blocks.map(b=><article key={b.id} className="card-ink bg-card p-4 sm:p-6 space-y-3"><p className="text-sm font-semibold text-primary">{labels[b.kind]}</p><h3 className="text-xl font-black">{b.title}</h3><p className="whitespace-pre-wrap leading-relaxed break-words">{b.content}</p>{b.visual&&<Visual visual={b.visual}/>}</article>)}
  <details className="card-ink p-4"><summary className="font-bold cursor-pointer">Fuentes y decisiones didácticas</summary><p className="mt-3">Método: {unit.research.chosenMethod}</p><ul className="space-y-3 mt-3">{unit.research.sources.map(s=><li key={s.id}><a href={s.url} target="_blank" rel="noopener noreferrer" className="underline font-semibold break-words">{s.title}</a><p>{s.finding}</p><p className="text-sm text-muted-foreground">Limitaciones: {s.limitations}</p></li>)}</ul></details>
  <button type="button" className="tile w-full bg-primary text-primary-foreground" onClick={onBack}>Volver a los juegos</button>
 </section>;
}
