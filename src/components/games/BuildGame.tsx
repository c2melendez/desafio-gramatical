import { useState } from "react";
import { CAT_LABEL, CAT_SHORT, checkBuild, type BuildQ, type BuildResult, type Tile } from "@/lib/grammar";
import type { GameProps } from "./types";
import { NextButton } from "./Feedback";

export function BuildGame({ item, report, next, isLast }: GameProps<BuildQ & { bank: (Tile & { k: number })[] }>) {
  const [chosen, setChosen] = useState<number[]>([]);
  const [res, setRes] = useState<BuildResult | null>(null);
  const tileOf = (k: number) => item.bank.find((t) => t.k === k)!;
  const words = chosen.map(tileOf);
  const locked = !!res;

  const check = () => {
    const r = checkBuild(item, words);
    setRes(r);
    report(r.ok, r.ok ? undefined : { prompt: `Patrón: ${item.pattern.map((c) => CAT_LABEL[c]).join(" + ")}`, given: words.map((t) => t.w).join(" ") || "(vacío)", correct: item.solutions.join(" / "), exp: `${r.message} ${item.exp}` });
  };

  return (
    <div className="space-y-5">
      <div className="card-ink p-4 space-y-2">
        <p className="text-sm text-muted-foreground">Pista: {item.hint}</p>
        <ol className="flex flex-wrap gap-2" aria-label="Patrón gramatical">
          {item.pattern.map((c, i) => {
            const bad = res?.badPos.includes(i);
            return (
              <li key={i} className={`rounded-md border-2 border-foreground px-2 py-1 text-sm font-bold ${res ? (bad ? "bg-destructive-soft" : "bg-success-soft") : "bg-muted"}`}>
                {i + 1}. {CAT_SHORT[c]}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="min-h-20 rounded-xl border-2 border-dashed border-foreground p-3 flex flex-wrap gap-2" aria-label="Tu oración" aria-live="polite">
        {words.length === 0 && <span className="text-muted-foreground self-center">Toca las fichas del banco para construir la oración…</span>}
        {chosen.map((k, i) => (
          <button key={k} disabled={locked} onClick={() => setChosen(chosen.filter((x) => x !== k))} aria-label={`Quitar ${tileOf(k).w}`}
            className={`tile ${res ? (res.badPos.includes(i) ? "bg-destructive-soft" : "bg-success-soft") : "bg-accent"}`}>{tileOf(k).w}</button>
        ))}
      </div>

      <div>
        <p className="mb-2 font-bold">Banco de fichas</p>
        <div className="flex flex-wrap gap-2">
          {item.bank.map((t) => {
            const used = chosen.includes(t.k);
            return (
              <button key={t.k} disabled={used || locked} onClick={() => setChosen([...chosen, t.k])} className="tile bg-card disabled:opacity-30">{t.w}</button>
            );
          })}
        </div>
      </div>

      {!res ? (
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => setChosen(chosen.slice(0, -1))} disabled={!chosen.length} className="tile bg-card disabled:opacity-40">↶ Deshacer</button>
          <button onClick={() => setChosen([])} disabled={!chosen.length} className="tile bg-card disabled:opacity-40">Vaciar</button>
          <button onClick={check} disabled={!chosen.length} className="tile col-span-2 bg-primary text-primary-foreground text-lg disabled:opacity-40">Comprobar</button>
        </div>
      ) : (
        <div className="space-y-4" aria-live="polite">
          <div className={`rounded-lg border-2 border-foreground p-3 ${res.ok ? "bg-success-soft" : "bg-destructive-soft"}`}>
            <p className="font-bold">{res.message}</p>
            {!res.ok && <p>Solución: <strong>{item.solutions.join(" · ")}</strong></p>}
            <p className="text-sm mt-1">{item.exp}</p>
          </div>
          <NextButton onClick={next} isLast={isLast} />
        </div>
      )}
    </div>
  );
}