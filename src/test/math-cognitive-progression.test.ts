import {describe,it,expect} from "vitest";
import {LEVELS} from "@/lib/grammar";
import {stats2Pool,STATS2_SKILLS,stats2Oracle} from "@/lib/statistics-visual-advanced";
import {cognitiveChallenge} from "@/lib/math-cognitive-progression";
import {statsPool,STATS_SKILLS} from "@/lib/statistics-visual-lab";
import {geometryPool,GEOMETRY_SKILLS} from "@/lib/geometry-visual-lab";
import {graphPool,GRAPH_SKILLS} from "@/lib/function-graph-lab";
import {extendedPool,EXTENDED_SKILLS} from "@/lib/function-graph-advanced";

/** Rejects 'advanced means bigger numbers' where a family is explicitly upgraded.
 * Other families are inventoried as open deficiencies rather than falsely certified. */
describe("M1 — verificación de progresión cognitiva real",()=>{
 it("en Estadística II cada habilidad exige operaciones diferentes y evidencias acumulativas por nivel",()=>{
  for(const skill of STATS2_SKILLS){
   const records=LEVELS.map(l=>stats2Pool(l).find(t=>t.skill===skill)!);
   expect(records.map(x=>x.cognitiveStage)).toEqual([1,2,3]);
   expect(new Set(records.map(x=>x.operation)).size).toBe(3);
   expect(new Set(records.map(x=>x.prompt)).size).toBe(3);
   expect(records[0].requiredEvidence.length).toBeLessThan(records[1].requiredEvidence.length);
   expect(records[1].requiredEvidence.length).toBeLessThanOrEqual(records[2].requiredEvidence.length);
   expect(records[0].answer).toBe(stats2Oracle(records[0].stimulus,skill));
   expect(records[1].answer).toBe(cognitiveChallenge(records[1].stimulus,skill,"intermedio")!.answer);
   expect(records[2].answer).toBe(cognitiveChallenge(records[2].stimulus,skill,"avanzado")!.answer);
  }
 });
 it("las 216 preguntas cumplen oráculos y distractores no duplicados",()=>{
  for(const level of LEVELS)for(const item of stats2Pool(level)){
   expect(item.options).toHaveLength(4);
   expect(new Set(item.options).size).toBe(4);
   expect(item.options[item.answerIndex]).toBe(item.answer);
   expect(item.explanation).toContain(item.answer);
  }
 });
 it("inventaría sin dar por certificadas otras cinco familias parametrizadas",()=>{
  for(const level of LEVELS){
   expect(statsPool(level).length).toBe(72);
   expect(geometryPool(level).length).toBe(72);
   expect(graphPool(level).length).toBe(72);
   expect(extendedPool(level).length).toBe(96);
   for(const skill of STATS_SKILLS)expect(statsPool(level).filter(x=>x.skill===skill).length).toBe(12);
   for(const skill of GEOMETRY_SKILLS)expect(geometryPool(level).filter(x=>x.skill===skill).length).toBe(18);
   for(const skill of GRAPH_SKILLS)expect(graphPool(level).filter(x=>x.skill===skill).length).toBe(12);
   for(const skill of EXTENDED_SKILLS)expect(extendedPool(level).filter(x=>x.skill===skill).length).toBe(12);
  }
 });
});
