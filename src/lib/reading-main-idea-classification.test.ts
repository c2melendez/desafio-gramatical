import {describe,it,expect} from "vitest";
import {readingPool} from "./reading";
import type {ReadingChallenge} from "./reading";
import type {Level} from "./grammar";

type Derived=ReadingChallenge & {sourceIds:string[]};
const levels:Level[]=["principiante","intermedio","avanzado"];
const quotas={principiante:[10,10],intermedio:[20,15],avanzado:[25,25]};
const tags=["explicit","inference","unsupported"].sort();
describe("Idea principal — classification lineage",()=>{
 for(const level of levels){
  const all=readingPool(level,"Idea principal","clasificar") as ReadingChallenge[];
  const originals=new Map(all.filter(q=>!/^m[23]-reading-/.test(q.id)).map(q=>[q.id,q]));
  for(const stage of [2,3]){
   const derived=all.filter(q=>q.id.startsWith("m"+stage+"-reading-")) as Derived[];
   it(level+" M"+stage+" quota",()=>expect(derived.length).toBe(quotas[level][stage-2]));
   for(const q of derived){
    it(q.id+" preserves source, category and feedback for all three claims",()=>{
     expect(q.sourceIds.length).toBe(stage);
     expect(new Set(q.sourceIds).size).toBe(stage);
     const sources=q.sourceIds.map(id=>{const s=originals.get(id);expect(s).toBeDefined();return s!;});
     for(const s of sources){
      expect(s.level).toBe(level);
      expect(s.subtopic).toBe("Idea principal");
      expect(s.claims.map(c=>c.tag).sort()).toEqual(tags);
      expect(q.passage).toContain(s.passage);
     }
     expect(q.claims.length).toBe(3);
     expect(q.claims.map(c=>c.tag).sort()).toEqual(tags);
     expect(new Set(q.claims.map(c=>c.text)).size).toBe(3);
     const used:number[]=[];
     for(const claim of q.claims){
      const pattern=stage===2?/^(?:Según la lectura ([AB])|Se afirma sobre ([AB])): (.+)$/u:/^Fuente ([ABC]): (.+)$/u;
      const match=claim.text.match(pattern);
      expect(match).not.toBeNull();
      if(!match)throw Error("Missing source prefix");
      const index=(match[1]||match[2]).charCodeAt(0)-65;
      const originalText=stage===2?match[3]:match[2];
      expect(index).toBeLessThan(stage);
      const source=sources[index];
      const candidates=source.claims.filter(c=>c.text===originalText);
      expect(candidates.length).toBe(1);
      const oracle=candidates[0];
      expect(claim.tag).toBe(oracle.tag);
      expect(claim.explanation).toBe(oracle.explanation);
      expect(claim.explanation.trim().length).toBeGreaterThan(0);
      // Every alternate classification is rejected against the source label.
      for(const wrong of tags.filter(t=>t!==oracle.tag))expect(claim.tag).not.toBe(wrong);
      used.push(index);
     }
     expect(used.sort()).toEqual(stage===2?[0,0,1]:[0,1,2]);
    });
   }
  }
 }
});
