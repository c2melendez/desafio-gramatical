import { useState } from "react";
import type { QuizQ } from "@/lib/grammar";
import type { GameProps } from "./types";
import { NextButton } from "./Feedback";

export function QuizGame({ item, report, next, isLast }: GameProps<QuizQ & { order: number[] }>) {
  const [pick, setPick] = useState<number | null>(null);
  const choose = (i: number) => {
    if (pick !== null) return;
    setPick(i);
    const ok = i === item.answer;
    report(ok, ok ? undefined : { prompt: item.q, given: item.options[i], correct: item.options[item.answer], exp: item.exp });
  };
  return (
    <div className="space-y-5">
      <h2 className="card-ink p-5 text-xl font-bold leading-snug">{item.q}</h2>
      <div className="grid gap-3">
        {item.order.map((i) => {
          const state = pick === null ? "bg-card" : i === item.answer ? "bg-success-soft" : i === pick ? "bg-destructive-soft" : "bg-card opacity-60";
          return (
            <button key={i} onClick={() => choose(i)} disabled={pick !== null} className={`tile text-left text-base ${state}`}>
              {pick !== null && i === item.answer ? "✓ " : pick === i ? "✗ " : ""}{item.options[i]}
            </button>
          );
        })}
      </div>
      {pick !== null && (
        <div aria-live="polite" className="space-y-4">
          <p className={`rounded-lg border-2 border-foreground p-3 ${pick === item.answer ? "bg-success-soft" : "bg-destructive-soft"}`}>
            <strong>{pick === item.answer ? "¡Correcto! " : "Incorrecto. "}</strong>{item.exp}
          </p>
          <NextButton onClick={next} isLast={isLast} />
        </div>
      )}
    </div>
  );
}