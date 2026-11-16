import { describe, expect, it } from "vitest";
import { AREAS, CATALOG_COUNTS, GAME_IDS, FIRST_MODULE, TOPIC_GAMES, gameNames, availableModule } from "@/lib/phuma-catalog";
import { LEVELS, SENTENCES, QUIZ, BUILD } from "@/lib/grammar";

describe("Academia PHUMA Play: curriculum and staged rollout", () => {
 it("keeps all five admission areas, 19 topics, and 90 subtopics", () => {
  expect(CATALOG_COUNTS).toEqual({areas:5,topics:19,subtopics:90});
  expect(AREAS.map(a=>a.id)).toEqual(["espanol","matematicas","naturales","sociales","blandas"]);
  expect(AREAS.every(a=>a.topics.length>0&&a.topics.every(t=>t.subtopics.length>0))).toBe(true);
 });
 it("declares three named educational games per topic, with unique stable identifiers",()=>{
  const names=AREAS.flatMap(a=>a.topics.map(t=>t.name));
  expect(new Set(names).size).toBe(names.length);
  expect(Object.keys(TOPIC_GAMES)).toHaveLength(19);
  expect(GAME_IDS).toEqual(["clasificar","quiz","construir"]);
  for(const t of names){
   const games=gameNames(t);
   expect(Object.values(games)).toHaveLength(3);
   expect(Object.values(games).every(g=>g.length>=5)).toBe(true);
  }
 });
 it("enables grammar, reading and writing while keeping other modules locked",()=>{
  const modules=AREAS.flatMap(a=>a.topics.flatMap(t=>t.subtopics.map(s=>({area:a.id,topic:t.name,subtopic:s}))));
  const playable=modules.filter(m=>availableModule(m.area as typeof FIRST_MODULE.area,m.topic,m.subtopic));
  expect(playable).toHaveLength(13);
  expect(playable).toContainEqual(FIRST_MODULE);
  expect(playable.filter(x=>x.topic==="Comprensión lectora")).toHaveLength(7);
  expect(playable.filter(x=>x.topic==="Redacción")).toHaveLength(5);
  expect(LEVELS).toEqual(["principiante","intermedio","avanzado"]);
  for(const level of LEVELS){
   expect(SENTENCES[level].length).toBeGreaterThan(0);
   expect(QUIZ[level].length).toBeGreaterThan(0);
   expect(BUILD[level].length).toBeGreaterThan(0);
  }
 });
});
