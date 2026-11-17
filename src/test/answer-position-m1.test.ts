import {describe,expect,it} from "vitest";
import {distributeAnswer,stableIndex} from "@/lib/answer-position";
import {HOMO_CONTEXTS} from "@/lib/m1-homonimia-contexts";
import {HYPER_CONTEXTS} from "@/lib/m1-hiperonimia-contexts";
import {ADEQ_CONTEXTS} from "@/lib/m1-adecuacion-contexts";
import {REFERENT_CONTEXTS} from "@/lib/m1-referentes-contexts";
import {FIGURE_CONTEXTS} from "@/lib/m1-figuras-contexts";
import {GENRE_CONTEXTS} from "@/lib/m1-generos-contexts";
import {HOMO_QUIZ,HYPER_QUIZ,ADEQ_QUIZ} from "@/lib/grammar-m1-next-activities";
import {FIGURE_QUIZ,GENRE_QUIZ} from "@/lib/grammar-m1-literature";

describe("M1: oráculos de opción y distribución de claves",()=>{
 it("rechaza índices inválidos y no altera las opciones originales",()=>{
   expect(()=>stableIndex("a",0)).toThrow(RangeError);
   expect(()=>distributeAnswer("a",["a","b","c"],3)).toThrow(RangeError);
   const original=["a","b","c","d"];
   const copy=[...original];
   const q=distributeAnswer("m1-seed",original,2);
   expect(original).toEqual(copy);
   expect(q.options[q.answer]).toBe("c");
   expect(q).toEqual(distributeAnswer("m1-seed",original,2));
   for(const i of Array.from({length:256},(_,i)=>i)){
     const generated=distributeAnswer("seed-"+i,original,2);
     expect(generated.options[generated.answer]).toBe("c");
   }
 });
 it("comprueba una respuesta correcta desde fuentes de contexto, no desde la clave del ítem",()=>{
   const blocks=[
     [HOMO_QUIZ,HOMO_CONTEXTS.map(x=>x[2])],
     [HYPER_QUIZ,HYPER_CONTEXTS.map(x=>x[0])],
     [ADEQ_QUIZ,ADEQ_CONTEXTS.map((x,i)=>i<30?x.slice(1,4).join(" "):REFERENT_CONTEXTS[i-30][2])],
     [FIGURE_QUIZ,FIGURE_CONTEXTS.map(x=>x[1])],
     [GENRE_QUIZ,GENRE_CONTEXTS.map(x=>x[1])]
   ] as const;
   for(const [questions,answers] of blocks)
     questions.forEach((q,i)=>{
       expect(q.options[q.answer],q.id).toBe(answers[i]);
       expect(q.options.filter(x=>x===answers[i]),q.id).toHaveLength(1);
     });
 });
 it("distribuye las claves en las cuatro posiciones para evitar un patrón trivial",()=>{
   const q=[...HOMO_QUIZ,...HYPER_QUIZ,...ADEQ_QUIZ,...FIGURE_QUIZ,...GENRE_QUIZ];
   expect(q).toHaveLength(225);
   const histogram=[0,0,0,0];
   for(const question of q)histogram[question.answer]++;
   expect(histogram.every(x=>x>=20)).toBe(true);
   expect(new Set(q.map(x=>x.answer)).size).toBe(4);
 });
});
