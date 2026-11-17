import {M2_CATEGORY_SENTENCES,M2_CATEGORY_QUIZ,M2_CATEGORY_BUILD} from "@/lib/m2-grammar";
import {M3_CATEGORY_SENTENCES,M3_CATEGORY_QUIZ,M3_CATEGORY_BUILD} from "@/lib/m3-grammar";
import { describe, expect, it } from "vitest";
import { countContent } from "@/lib/coverage";
import { BUILD, QUIZ, SENTENCES, checkBuild } from "@/lib/grammar";
import { GRAMMAR_ADVANCED_SENTENCES, GRAMMAR_NUCLEUS_BUILD } from "@/lib/grammar-nucleus";
import { EXTRA_BUILD } from "@/lib/extra-build";
import { EXTRA_QUIZ } from "@/lib/extra-quiz";
import { EXTRA_SENTENCES } from "@/lib/extra-sentences";

describe("cobertura del banco gramatical jugable", () => {
  it("cuenta los mismos bancos que usa la ruta de juego en cada nivel", () => {
    for (const level of ["principiante", "intermedio", "avanzado"] as const) {
      for (const [mode, items] of [
        ["clasificar", [...SENTENCES[level], ...EXTRA_SENTENCES[level], ...(level === "avanzado" ? GRAMMAR_ADVANCED_SENTENCES : []),...M2_CATEGORY_SENTENCES[level],...M3_CATEGORY_SENTENCES[level]]],
        ["quiz", [...QUIZ[level], ...EXTRA_QUIZ[level],...M2_CATEGORY_QUIZ[level],...M3_CATEGORY_QUIZ[level]]],
        ["construir", [...BUILD[level], ...EXTRA_BUILD[level], ...GRAMMAR_NUCLEUS_BUILD[level],...M2_CATEGORY_BUILD[level],...M3_CATEGORY_BUILD[level]]],
      ] as const) {
        expect(new Set(items.map((item) => item.id)).size).toBe(items.length);
        expect(countContent("espanol", "Gramática y semántica", "Categorías gramaticales", mode, level)).toBe(items.length);
      }
    }
  });
  it("alcanza el núcleo y valida las soluciones nuevas", () => {
    for (const level of ["principiante", "intermedio", "avanzado"] as const)
      for (const mode of ["clasificar", "quiz", "construir"] as const)
        expect(countContent("espanol", "Gramática y semántica", "Categorías gramaticales", mode, level)).toBeGreaterThanOrEqual(({principiante:10, intermedio:15, avanzado:20} as const)[level]);
    for (const item of [...GRAMMAR_NUCLEUS_BUILD.intermedio, ...GRAMMAR_NUCLEUS_BUILD.avanzado]) {
      const chosen = item.solutions[0].split(" ").map(word => item.tiles.find(tile => tile.w === word)!);
      expect(chosen.every(Boolean)).toBe(true);
      expect(checkBuild(item, chosen).ok).toBe(true);
    }
  });
});
