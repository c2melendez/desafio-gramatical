import {conceptRule} from "@/lib/study-context";

/** Retroalimentación de la norma original, sin inventar información ajena al ejercicio. */
export function LearningFeedback({correct,subtopic,explanation,selected,expected,title}:{
 correct:boolean;subtopic:string;explanation?:string;selected?:string;expected?:string;title?:string;
}){
 const source=explanation?.trim()??"";
 const criterion=conceptRule(subtopic);
 return <section className={`rounded-lg border-2 border-foreground p-4 space-y-2 ${correct?"bg-success-soft":"bg-destructive-soft"}`}
  aria-label="Explicación del resultado" aria-live="polite" data-testid="learning-feedback">
  <p className="font-bold">{title??(correct?"✓ ¡Correcto!":"✗ Revisa tu respuesta.")}</p>
  {!correct&&selected&&<p><strong>Tu respuesta:</strong> {selected}</p>}
  {expected&&<p><strong>{correct?"Respuesta comprobada:":"Respuesta correcta:"}</strong> {expected}</p>}
  {!correct&&<p><strong>¿Por qué no es correcta?</strong> La opción seleccionada no satisface el criterio evaluado en este contexto. Contrasta tu elección con la respuesta correcta y la evidencia descrita abajo.</p>}
  <p><strong>Concepto o regla:</strong> {criterion}</p>
  <p className="font-semibold">Justificación de este ejercicio:</p>
  <p>{source||"Aplica el criterio a los datos del enunciado y contrástalos con la solución indicada. Este ejercicio requiere revisión editorial de la justificación específica."}</p>
 </section>;
}
