import type { Mistake } from "@/lib/grammar";
export type GameProps<T> = { item: T; report: (ok: boolean, mistake?: Mistake) => void; next: () => void; isLast: boolean };