/** C06: pure, deterministic round ledger. Only complete rounds are submitted. */
export const ROUND_LIMIT = 10;
export const pointsForRound = (streak: number) => 10 + Math.min(streak, 5) * 2;
export type RoundEvent = { id: string; correct: boolean; assistance?: boolean };
export type RoundLedger = { events: readonly RoundEvent[]; correct: number; score: number; streak: number; bestStreak: number };
export const emptyLedger = (): RoundLedger => ({events: [], correct: 0, score: 0, streak: 0, bestStreak: 0});
export function recordRound(state: RoundLedger, event: RoundEvent): RoundLedger {
 if (!event.id.trim() || typeof event.correct !== "boolean" || state.events.length >= ROUND_LIMIT || state.events.some(e => e.id === event.id)) return state;
 const ok = event.correct && !event.assistance;
 const streak = ok ? state.streak + 1 : 0;
 return {events: [...state.events, {...event}], correct: state.correct + Number(ok), score: state.score + (ok ? pointsForRound(state.streak) : 0), streak, bestStreak: Math.max(state.bestStreak, streak)};
}
export function roundResult(state: RoundLedger) {
 const attempted = state.events.length;
 const finished = attempted === ROUND_LIMIT && new Set(state.events.map(e => e.id)).size === ROUND_LIMIT;
 const accuracy = finished ? state.correct * 100 / ROUND_LIMIT : null;
 return {attempted, finished, correct: state.correct, score: state.score, accuracy, approved100: finished && state.correct === ROUND_LIMIT && state.events.every(e => e.correct && !e.assistance)};
}
