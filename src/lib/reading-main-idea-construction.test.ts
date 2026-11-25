import {describe,it,expect} from "vitest";
import {readingPool,checkReadingOrder} from "./reading";
import {mainIdeaCompositeOrder} from "./main-idea-composite-order";
import type {ReadingChallenge} from "./reading";
import type {Level} from "./grammar";
type Derived=ReadingChallenge & {sourceIds:string[]};
const levels:Level[]=["principiante","intermedio","avanzado"];
const quotas={principiante:[10,10,10],intermedio:[15,20,15],avanzado:[20,25,25]};
const permutations=[[0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]];
describe("Idea principal — construction contracts",()=>{
 for(const level of levels){
  const all=readingPool(level,"Idea principal","construir") as ReadingChallenge[];
  const originals=new Map(all.filter(q=>!/^m[23]-reading-/.test(q.id)).map(q=>[q.id,q]));
  const groups=[Array.from(originals.values()),all.filter(q=>q.id.startsWith("m2-reading-")),all.filter(q=>q.id.startsWith("m3-reading-"))];
  it(level+" exact quotas and unique ids",()=>{
   expect(groups.map(g=>g.length)).toEqual(quotas[level]);
   expect(new Set(all.map(q=>q.id)).size).toBe(all.length);
  });
  for(const q of all){
   it(q.id+" accepts only canonical permutation and preserves all source stages",()=>{
    const parts=q.order.parts;
    expect(parts.length).toBe(3);
    expect(parts.every(p=>p.trim().length>0)).toBe(true);
    expect(new Set(parts).size).toBe(3);
    expect(q.order.explanation.trim().length).toBeGreaterThan(0);
    const accepted=permutations.filter(p=>checkReadingOrder(parts,p));
    expect(accepted).toEqual([[0,1,2]]);
    for(const invalid of [[],[0],[0,1],[0,0,2],[0,1,3],[-1,1,2],[0,1,2,3]])expect(checkReadingOrder(parts,invalid)).toBe(false);
    const stage=q.id.startsWith("m2-reading-")?2:q.id.startsWith("m3-reading-")?3:0;
    if(!stage)return;
    const d=q as Derived;
    expect(d.sourceIds.length).toBe(stage);
    expect(new Set(d.sourceIds).size).toBe(stage);
    const sources=d.sourceIds.map(id=>{const s=originals.get(id);expect(s).toBeDefined();return s!;});
    for(const [j,s] of sources.entries()){
     expect(s.level).toBe(level);
     expect(s.subtopic).toBe("Idea principal");
     expect(q.passage).toContain(s.passage);
     const prefix="Fuente "+String.fromCharCode(65+j)+": ";
     for(let phase=0;phase<3;phase++){
      expect(parts[phase].split("\n")[j]).toBe(prefix+s.order.parts[phase]);
     }
     expect(q.order.explanation).toContain(prefix+s.order.explanation);
    }
    for(const part of parts)expect(part.split("\n").length).toBe(stage);
   });
  }
  it(level+" rejects invalid composite sources",()=>{
   const [a,b]=groups[0];
   expect(()=>mainIdeaCompositeOrder([a])).toThrow();
   expect(()=>mainIdeaCompositeOrder([a,a])).toThrow();
   expect(()=>mainIdeaCompositeOrder([a,{...b,subtopic:"Inferencias"}])).toThrow();
   expect(()=>mainIdeaCompositeOrder([a,{...b,order:{...b.order,parts:[]}}])).toThrow();
  });
 }
});
