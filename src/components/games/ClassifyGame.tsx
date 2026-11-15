import { useState } from "react";
import { CATS, CAT_LABEL, type Cat, type Sentence } from "@/lib/grammar";
import type { GameProps } from "./types";
import { NextButton } from "./Feedback";

export function ClassifyGame({ item, report, next, isLast }: GameProps<Sentence>) {
  const words = item.tokens.map((t, i) => ({ ...t, i })).filter((t) => t.c);
  const [sel, setSel] = useState<number>(words[0].i);
  const [ans, setAns] = useState<Record<number, Cat>>({});
  const [checked, setChecked] = useState(false);
  const done = words.every((w) => ans[w.i]);

  const assign = (c: Cat) => {
    if (checked) return;
    const nextAns = { ...ans, [sel]: c };
    setAns(nextAns);
    const pending = words.find((w) => !nextAns[w.i] && w.i !== sel);
    if (pending) setSel(pending.i);
  };
  const check = () => {
    setChecked(true);
    const sentence = item.tokens.map((t) => t.t).join(" ");
    words.forEach((w) => {
      const ok = ans[w.i] === w.c;
      report(ok, ok ? undefined : { prompt: `«${w.t}» en: ${sentence}`, given: CAT_LABEL[ans[w.i]], correct: `${CAT_LABEL[w.c!]}${w.sub ? ` (${w.sub})` : ""}`, exp: w.exp ?? "" });
    });
  };
  const cur = item.tokens[sel];

  return (
    <div className="space-y-5">
      <p className="text-muted-foreground">Toca una palabra y luego su categoría gramatical. Los signos de puntuación no se clasifican.</p>
      <div className="card-ink p-4 flex flex-wrap gap-2" role="group" aria-label="Palabras de la oración">
        {item.tokens.map((t, i) => {
          if (!t.c) return <span key={i} className="self-center text-2xl font-bold text-muted-foreground" aria-hidden>{t.t}</span>;
          const a = ans[i];
          const state = checked ? (a === t.c ? "bg-success-soft" : "bg-destructive-soft") : sel === i ? "bg-accent" : a ? "bg-muted" : "bg-card";
          return (
            <button key={i} onClick={() => setSel(i)} aria-pressed={sel === i} className={`tile flex flex-col items-start text-left ${state} ${sel === i ? "ring-2 ring-primary" : ""}`}>
              <span className="text-lg">{t.t}</span>
              <span className="text-xs font-normal">{a ? CAT_LABEL[a] : "—"}</span>
            </button>
          );
        })}
      </div>

      {!checked ? (
        <>
          <p className="font-bold" aria-live="polite">Clasificando: <span className="text-primary">«{cur.t}»</span></p>
          <div className="grid grid-cols-2 gap-2">
            {CATS.map((c) => (
              <button key={c} onClick={() => assign(c)} className={`tile text-sm ${ans[sel] === c ? "bg-primary text-primary-foreground" : "bg-card"}`}>{CAT_LABEL[c]}</button>
            ))}
          </div>
          <button disabled={!done} onClick={check} className="tile w-full bg-primary text-primary-foreground text-lg disabled:opacity-40">
            {done ? "Comprobar" : `Faltan ${words.filter((w) => !ans[w.i]).length} palabras`}
          </button>
        </>
      ) : (
        <>
          <ul className="space-y-2">
            {words.map((w) => {
              const ok = ans[w.i] === w.c;
              return (
                <li key={w.i} className={`rounded-lg border-2 border-foreground p-3 ${ok ? "bg-success-soft" : "bg-destructive-soft"}`}>
                  <p className="font-bold">{ok ? "✓" : "✗"} «{w.t}»: {CAT_LABEL[w.c!]}{w.sub ? ` · ${w.sub}` : ""}{!ok && <span className="font-normal"> (elegiste {CAT_LABEL[ans[w.i]]})</span>}</p>
                  <p className="text-sm">{w.exp}</p>
                </li>
              );
            })}
          </ul>
          <NextButton onClick={next} isLast={isLast} />
        </>
      )}
    </div>
  );
}