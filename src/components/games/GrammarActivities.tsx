import { useState } from 'react';
import { gradeClassification, gradeConstruction, type ClassificationActivity, type ConstructionActivity } from '@/lib/grammar-activities';
import { shuffle } from '@/lib/grammar';
import {LearningFeedback} from './LearningFeedback';

type Props<T> = { item: T; onResult: (correct: boolean) => void; onNext: () => void };

/** Renderizar con key igual al ID del ejercicio para reiniciar el estado entre rondas. */
export function GrammarClassification({ item, onResult, onNext }: Props<ClassificationActivity>) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  // Orden independiente por partida: las categorías no anticipan el resultado.
  const [presentedItems] = useState(() => shuffle([...item.items]));
  const [presentedLabels] = useState(() => shuffle([...item.labels]));
  const [checked, setChecked] = useState(false);
  const complete = item.items.every(x => answers[x.id] !== undefined);
  const check = () => { if (!complete || checked) return; setChecked(true); onResult(gradeClassification(item, answers)); };
  return <section className="space-y-4">
    <h2 className="card-ink p-4 font-bold">{item.prompt}</h2>
    {presentedItems.map(x => <fieldset key={x.id} className="card-ink p-4 space-y-2" disabled={checked}>
      <legend className="font-bold">{x.text}</legend>
      <div className="flex flex-wrap gap-2">{presentedLabels.map(label => <button type="button" key={label} aria-pressed={answers[x.id] === label} onClick={() => setAnswers(a => ({ ...a, [x.id]: label }))} className={`tile ${answers[x.id] === label ? 'bg-primary text-primary-foreground' : 'bg-card'}`}>{label}</button>)}</div>
      {checked && <LearningFeedback correct={answers[x.id]===x.label} subtopic={item.subtopic} selected={answers[x.id]} expected={x.label} explanation={x.explanation}/>}
    </fieldset>)}
    {!checked ? <button disabled={!complete} onClick={check} className="tile w-full bg-primary text-primary-foreground disabled:opacity-40">Comprobar</button> : <div aria-live="polite" className="space-y-3">{!item.items.some(x=>x.explanation===item.explanation)&&<p className="rounded-lg border-2 border-foreground bg-success-soft p-3">{item.explanation}</p>}<button className="tile w-full bg-primary text-primary-foreground" onClick={onNext}>Continuar</button></div>}
  </section>;
}

export function GrammarConstruction({ item, onResult, onNext }: Props<ConstructionActivity>) {
  const [tiles] = useState(() => shuffle([...item.tiles]));
  const [chosen, setChosen] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const lookup = (id: string) => item.tiles.find(x => x.id === id)!.text;
  const complete = item.solutions.some(solution=>solution.length===chosen.length);
  const check = () => { if (!complete || checked) return; setChecked(true); onResult(gradeConstruction(item, chosen)); };
  return <section className="space-y-4">
    <h2 className="card-ink p-4 font-bold">{item.prompt}</h2>
    <div aria-label="Tu construcción" aria-live="polite" className="rounded-xl border-2 border-dashed p-4 flex flex-wrap gap-2">
      {chosen.map(id => <button key={id} disabled={checked} className="tile bg-accent" onClick={() => setChosen(c => c.filter(x => x !== id))} aria-label={`Quitar ${lookup(id)}`}>{lookup(id)}</button>)}
      {!chosen.length && <span>Selecciona fichas en orden.</span>}
    </div>
    <div className="flex flex-wrap gap-2" aria-label="Fichas disponibles">{tiles.map(x => <button key={x.id} disabled={checked || chosen.includes(x.id)} className="tile bg-card disabled:opacity-40" onClick={() => setChosen(c => [...c, x.id])}>{x.text}</button>)}</div>
    {!checked ? <button disabled={!complete} className="tile w-full bg-primary text-primary-foreground disabled:opacity-40" onClick={check}>Comprobar</button> : <div aria-live="polite" className="space-y-3"><LearningFeedback correct={gradeConstruction(item,chosen)} subtopic={item.subtopic} selected={chosen.map(lookup).join(' → ')} expected={item.solutions[0].map(lookup).join(' → ')} explanation={item.explanation} title={gradeConstruction(item,chosen)?'Correcto.':`Una solución: ${item.solutions[0].map(lookup).join(' ')}`}/><button className="tile w-full bg-primary text-primary-foreground" onClick={onNext}>Continuar</button></div>}
  </section>;
}
