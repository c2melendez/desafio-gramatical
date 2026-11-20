import {describe,it,expect} from "vitest";
import {MATH_TOPICS,MATH_LEVELS,MATH_MODES,mathPool} from "@/lib/math-m1";
import {mathM2Pool,mathM2NewPool,MATH_M2_TOTAL,MATH_M2_NEW_TOTAL,MATH_M2_LEVEL_COUNT} from "@/lib/math-m2";
import {selectRotation,emptyRotation,recordRotation} from "@/lib/rotation";
describe("Matemáticas M2 — ampliación acumulada de 66 combinaciones",()=>{
 it("mantiene los 2970 IDs M1 e incorpora 3630 IDs nuevos sin colisión",()=>{
  const ids=new Set<string>();let core=0,added=0,full=0;
  for(const topic of MATH_TOPICS)for(const subtopic of topic.subtopics)
   for(const mode of MATH_MODES)for(const level of MATH_LEVELS){
    const m1=mathPool(topic.name,subtopic,level,mode);
    const fresh=mathM2NewPool(topic.name,subtopic,level,mode);
    const all=mathM2Pool(topic.name,subtopic,level,mode);
    expect(all).toHaveLength(MATH_M2_LEVEL_COUNT[level]);
    expect(all.slice(0,m1.length).map(x=>x.id)).toEqual(m1.map(x=>x.id));
    expect(all.slice(m1.length).map(x=>x.id)).toEqual(fresh.map(x=>x.id));
    for(const item of all){expect(ids.has(item.id)).toBe(false);ids.add(item.id);}
    core+=m1.length;added+=fresh.length;full+=all.length;
   }
  expect(core).toBe(2970);expect(added).toBe(MATH_M2_NEW_TOTAL);
  expect(full).toBe(MATH_M2_TOTAL);expect(ids.size).toBe(6600);
 });
 it("mantiene 10 rondas únicas y rota hacia ejercicios inéditos",()=>{
  const bank=mathM2Pool("Geometría","Pitágoras","avanzado","quiz");
  const first=selectRotation(bank,emptyRotation(),10,()=>0.31);
  let used=emptyRotation();first.forEach(x=>{used=recordRotation(used,x.id,true)});
  const second=selectRotation(bank,used,10,()=>0.77);
  expect(new Set(first.map(x=>x.id)).size).toBe(10);
  expect(new Set(second.map(x=>x.id)).size).toBe(10);
  expect(second.some(x=>!first.some(y=>x.id===y.id))).toBe(true);
 });
 it("rechaza combinaciones ajenas al catálogo",()=>{
  expect(()=>mathM2Pool("No existe","Subtema","intermedio","quiz")).toThrow();
 });
});
