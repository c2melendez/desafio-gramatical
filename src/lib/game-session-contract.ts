// C06 domain contract. Integration with routes is required before certification.
export const SESSION_ROUNDS = 10;
export type Round = { id: string; correct: boolean; assisted: boolean };
export type Context = { area: string; topic: string; subtopic: string; game: string; level: string };
export type Session = { attemptId: string; context: Context; contentVersion: string; ids: readonly string[]; rounds: readonly Round[] };
export function startSession(attemptId: string, context: Context, contentVersion: string, ids: readonly string[]): Session {
  if (!attemptId.trim() || !contentVersion.trim() || Object.values(context).some(v => !v.trim()) || ids.length !== SESSION_ROUNDS || new Set(ids).size !== SESSION_ROUNDS || ids.some(id => !id.trim())) throw new Error("Invalid session");
  return { attemptId, context: {...context}, contentVersion, ids: [...ids], rounds: [] };
}
export const roundPoints = (streak: number) => 10 + Math.min(streak, 5) * 2;
export function submitRound(s: Session, id: string, decisions: readonly boolean[], assisted = false): Session {
  if (s.rounds.length >= SESSION_ROUNDS || s.ids[s.rounds.length] !== id || decisions.length === 0 || decisions.some(v => typeof v !== "boolean")) return s;
  return {...s, rounds: [...s.rounds, {id, correct: decisions.every(Boolean) && !assisted, assisted}]};
}
export function sessionResult(s: Session) {
  let correct = 0, score = 0, streak = 0, bestStreak = 0;
  for (const r of s.rounds) {
    if (r.correct && !r.assisted) { correct++; score += roundPoints(streak); streak++; bestStreak = Math.max(bestStreak, streak); }
    else streak = 0;
  }
  const finished = s.rounds.length === SESSION_ROUNDS;
  return {attempted: s.rounds.length, correct, score, streak, bestStreak, finished, accuracy: finished ? correct * 10 : null, approved100: finished && correct === SESSION_ROUNDS && s.rounds.every(r => !r.assisted)};
}
export function achievementKey(c: Context) { return JSON.stringify([1,c.area,c.topic,c.subtopic,c.game,c.level]); }
export type Achievement = { firstPerfectAt: string; lastPerfectAt: string; perfectRuns: number; bestCorrect: 10; bestScore: number; attempts: Record<string,string> };
export type Achievements = Record<string, Achievement>;
export function recordPerfect(previous: Achievements, s: Session, date: string): Achievements {
  const result = sessionResult(s);
  if (!result.approved100 || !Number.isFinite(Date.parse(date))) return previous;
  const key = achievementKey(s.context), old = previous[key];
  if (old && Object.prototype.hasOwnProperty.call(old.attempts,s.attemptId)) return previous;
  const firstPerfectAt = old && Date.parse(old.firstPerfectAt) < Date.parse(date) ? old.firstPerfectAt : date;
  const lastPerfectAt = old && Date.parse(old.lastPerfectAt) > Date.parse(date) ? old.lastPerfectAt : date;
  return {...previous, [key]: {firstPerfectAt,lastPerfectAt,perfectRuns:(old?.perfectRuns ?? 0)+1,bestCorrect:10,bestScore:Math.max(old?.bestScore ?? 0,result.score),attempts:{...old?.attempts,[s.attemptId]:s.contentVersion}}};
}
