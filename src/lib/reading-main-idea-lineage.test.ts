import {describe,it,expect} from "vitest";
import {readingPool} from "./reading";
import type {Level} from "./grammar";
import type {ReadingChallenge} from "./reading";
type Derived=ReadingChallenge & {sourceIds:string[]};
const levels:Level[]=["principiante","intermedio","avanzado"];
const expected={principiante:[10,10],intermedio:[20,15],avanzado:[25,25]};
describe("Idea principal — composite quiz lineage",()=>{
 for(const level of levels){
  const all=readingPool(level,"Idea principal","quiz") as ReadingChallenge[];
  const originals=new Map(all.filter(q=>!/^m[23]-reading-/.test(q.id)).map(q=>[q.id,q]));
  for(const stage of [2,3]){
   const derived=all.filter(q=>q.id.startsWith("m"+stage+"-reading-")) as Derived[];
   it(level+" M"+stage+" quota",()=>expect(derived.length).toBe(expected[level][stage-2]));
   for(const q of derived){
    it(q.id+" preserves source truth and exclusive correct combination",()=>{
     expect(q.sourceIds.length).toBe(stage);
     expect(new Set(q.sourceIds).size).toBe(stage);
     const sources=q.sourceIds.map(id=>{const s=originals.get(id);expect(s).toBeDefined();return s!;});
     for(const s of sources){
      expect(s.level).toBe(level);
      expect(s.subtopic).toBe("Idea principal");
      expect(s.options.length).toBe(4);
      expect(new Set(s.options).size).toBe(4);
      expect(Number.isInteger(s.answer)&&s.answer>=0&&s.answer<4).toBe(true);
     }
     const format=(values:string[])=>values.map((value,i)=>stage===2?(i===0?"Lectura A: ":"lectura B: ")+value:"Fuente "+String.fromCharCode(65+i)+": "+value).join("; ");
     const keys=sources.map(s=>s.options[s.answer]);
     const distractors=sources.map(s=>s.options[(s.answer+1)%4]);
     const right=format(keys);
     const alternatives=[right];
     for(let i=0;i<stage;i++)alternatives.push(format(keys.map((v,j)=>j===i?distractors[j]:v)));
     if(stage===2)alternatives.push(format(distractors));
     expect(q.options.length).toBe(4);
     expect(new Set(q.options).size).toBe(4);
     expect(q.options[q.answer]).toBe(right);
     expect(q.options.filter(o=>o===right).length).toBe(1);
     expect([...q.options].sort()).toEqual(alternatives.sort());
     for(const s of sources){
      expect(q.passage).toContain(s.passage);
      expect(q.question).toContain(s.question);
      expect(q.explanation).toContain(s.explanation);
     }
     // Negative control: every incorrect compound alternative must fail the independent source-key oracle.
     for(let i=0;i<q.options.length;i++)if(i!==q.answer)expect(q.options[i]===right).toBe(false);
    });
   }
  }
 }
});
