import { describe, expect, it } from "vitest";
import { countContent } from "@/lib/coverage";
import { BUILD, QUIZ, SENTENCES } from "@/lib/grammar";
import { EXTRA_BUILD } from "@/lib/extra-build";
import { EXTRA_QUIZ } from "@/lib/extra-quiz";
import { EXTRA_SENTENCES } from "@/lib/extra-sentences";

describe("cobertura del banco gramatical jugable", () => {
  it("cuenta los mismos bancos que usa la ruta de juego en cada nivel", () => {
    for (const level of ["principiante", "intermedio", "avanzado"] as const) {
      for (const [mode, items] of [
        ["clasificar", [...SENTENCES[level], ...EXTRA_SENTENCES[level]]],
        ["quiz", [...QUIZ[level], ...EXTRA_QUIZ[level]]],
        ["construir", [...BUILD[level], ...EXTRA_BUILD[level]]],
      ] as const) {
        expect(new Set(items.map((item) => item.id)).size).toBe(items.length);
        expect(countContent("espanol", "Gramática y semántica", "Categorías gramaticales", mode, level)).toBe(items.length);
      }
    }
  });
});
