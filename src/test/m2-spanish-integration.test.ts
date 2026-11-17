import {describe,expect,it} from "vitest";
import {coverageRows} from "@/lib/coverage";
import {m2GrammarQuiz,M2_GRAMMAR_ACTIVITIES,M2_CATEGORY_BUILD} from "@/lib/m2-grammar";
import {GRAMMAR_NEXT_DRAFT} from "@/lib/grammar-next-draft";
import {M1_NEXT_QUIZ} from "@/lib/grammar-m1-next-activities";
import {M1_LITERATURE_QUIZ} from "@/lib/grammar-m1-literature";
import {m2ReadingPool} from "@/lib/m2-reading";
import {readingPool} from "@/lib/reading";
import {m2WritingPool} from "@/lib/m2-writing";
import {writingPool} from "@/lib/writing";
import {grammarM1Pool} from "@/components/games/GrammarM1Play";

const desired={principiante:20,intermedio:35,avanzado:45} as const;
const increments={principiante:10,intermedio:20,avanzado:25} as const;
describe("M2 Español: cobertura, oráculos de doble contexto y trazabilidad",()=>{
 it("cubre los 189 cruces subtema/juego/nivel en 21 subtemas",()=>{
  const rows=coverageRows().filter(r=>r.area==="espanol");
  expect(rows).toHaveLength(189);
  const all=rows.map(r=>r.available);
  expect(all.reduce((a,b)=>a+b,0)).toBe(6301);
  for(const r of rows)expect(r.available,r.subtopic+"/"+r.mode+"/"+r.level).toBeGreaterThanOrEqual(desired[r.level]);
 });
 it("en Gramática las dos respuestas de cada selección coinciden con las fuentes originales, no con answer",()=>{
  const sources=[...GRAMMAR_NEXT_DRAFT,...M1_NEXT_QUIZ,...M1_LITERATURE_QUIZ];
  const byId=new Map(sources.map(x=>[x.id,x]));
  const subs=[...new Set(sources.map(x=>x.subtopic))];
  let checked=0;
  for(const sub of subs)for(const lev of ["principiante","intermedio","avanzado"] as const){
   const questions=m2GrammarQuiz(sub,lev,sources);
   expect(questions).toHaveLength(increments[lev]);
   for(const q of questions){
    const parents=(q as typeof q&{sourceIds:string[]}).sourceIds;
    expect(parents).toHaveLength(2);expect(parents[0]).not.toBe(parents[1]);
    const a=byId.get(parents[0])!,b=byId.get(parents[1])!;
    expect(a).toBeDefined();expect(b).toBeDefined();
    const valid="En A: "+a.options[a.answer]+"; en B: "+b.options[b.answer];
    expect(q.options[q.answer],q.id).toBe(valid);
    expect(q.options.filter(v=>v===valid)).toHaveLength(1);
    expect(q.options[(q.answer+1)%4]).not.toBe(valid);
    checked++;
   }
  }
  expect(checked).toBe(8*55);
 });
 it("el banco de clasificación y construcción contiene operaciones distintas por juego",()=>{
  expect(M2_GRAMMAR_ACTIVITIES).toHaveLength(8*2*55);
  const ids=M2_GRAMMAR_ACTIVITIES.map(x=>x.id);
  expect(new Set(ids).size).toBe(ids.length);
  for(const item of M2_GRAMMAR_ACTIVITIES){
   expect(item.reviewStatus).toBe("editorial-draft");
   expect(item.sourceIds).toHaveLength(2);
   if(item.kind==="classification"){
    expect(new Set(item.items.map(x=>x.id)).size).toBe(item.items.length);
    expect(new Set(item.labels).size).toBeGreaterThanOrEqual(2);
    expect(item.items.every(x=>item.labels.includes(x.label))).toBe(true);
   }else{
    expect(item.tiles.find(t=>t.id==="d")).toBeDefined();
    expect(item.solutions).toContainEqual(["t0","t1","t2"]);
   }
  }
  expect(M2_CATEGORY_BUILD.avanzado).toHaveLength(25);
 });
 it("las rutas gramaticales muestran M1+M2 sin derivar selección a clasificación",()=>{
  for(const topic of ["Morfosintaxis","Sinónimos y antónimos","Cohesión y coherencia","Géneros literarios"])
   for(const level of ["principiante","intermedio","avanzado"] as const){
    expect(grammarM1Pool(topic,"quiz",level)).toEqual([]);
    for(const kind of ["clasificar","construir"] as const)
     expect(grammarM1Pool(topic,kind,level)).toHaveLength(desired[level]);
   }
 });
 it("los nuevos pasajes y ediciones conservan dos fuentes distintas y tres modalidades",()=>{
  let total=0;
  for(const sub of ["Idea principal","Inferencias","Lectura crítica","Vocabulario en contexto","Análisis de textos","Lectura comparada","Lenguaje figurado"] as const)
   for(const level of ["principiante","intermedio","avanzado"] as const)
    for(const mode of ["quiz","clasificar","construir"] as const){
     const items=readingPool(level,sub,mode);
     const m2=items.filter(q=>q.id.startsWith("m2-"));
     expect(m2).toHaveLength(increments[level]);
     for(const q of m2){
      expect(q.sourceIds).toHaveLength(2);
      expect(q.sourceIds[0]).not.toBe(q.sourceIds[1]);
     }
     total+=m2.length;
    }
  expect(total).toBe(7*3*55);
  let written=0;
  for(const sub of ["Conectores","Corrección","Organización textual","Elisión y adición","Generalización e integración"] as const)
   for(const level of ["principiante","intermedio","avanzado"] as const)
    for(const mode of ["quiz","clasificar","construir"] as const){
     const items=writingPool(level,sub,mode);
     const m2=items.filter(q=>q.id.startsWith("m2-"));
     expect(m2).toHaveLength(increments[level]);
     for(const q of m2){
      expect(q.sourceIds).toHaveLength(2);
      expect(q.sourceIds[0]).not.toBe(q.sourceIds[1]);
     }
     written+=m2.length;
    }
  expect(written).toBe(5*3*55);
 });
});
