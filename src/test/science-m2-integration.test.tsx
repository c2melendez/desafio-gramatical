import {afterEach,describe,expect,it,vi} from "vitest";
import {cleanup,render,fireEvent,screen} from "@testing-library/react";
import {
 SCIENCE_LEVELS,SCIENCE_MODES,SCIENCE_TOPICS,SCIENCE_SUBTOPICS,sciencePool,scienceFacts
} from "@/lib/science-m1";
import {
 SCIENCE_M2_LEVEL_COUNT,SCIENCE_M2_NEW_PER_LEVEL,SCIENCE_M2_NEW_TOTAL,SCIENCE_M2_TOTAL,
 scienceM2Pool,scienceM2NewPool
} from "@/lib/science-m2";
import {verifyScienceCell,verifyScienceItem} from "@/lib/science-m1-verifier";
import {ScienceExerciseCard} from "@/components/games/ScienceExerciseCard";
import {countContent,coverageRows} from "@/lib/coverage";
import {emptyRotation,selectRotation,recordRotation} from "@/lib/rotation";
afterEach(()=>{cleanup();vi.restoreAllMocks();});
describe("Naturales M2 — 3135 escenarios adicionales y cuota 20/35/45",()=>{
 it("audita 171 celdas, 5700 IDs y compatibilidad exacta con 2565 modelos M1",()=>{
  const ids=new Set<string>();let prior=0,added=0;let total=0;
  expect(SCIENCE_SUBTOPICS).toHaveLength(19);
  expect(coverageRows().filter(x=>x.area==="naturales")).toHaveLength(171);
  for(const topic of SCIENCE_TOPICS)for(const subtopic of topic.subtopics)
  for(const mode of SCIENCE_MODES)for(const level of SCIENCE_LEVELS){
   const old=sciencePool(topic.name,subtopic,level,mode);
   const fresh=scienceM2NewPool(topic.name,subtopic,level,mode);
   const all=scienceM2Pool(topic.name,subtopic,level,mode);
   expect(fresh.length).toBe(SCIENCE_M2_NEW_PER_LEVEL[level]);
   expect(all.length).toBe(SCIENCE_M2_LEVEL_COUNT[level]);
   expect(countContent("naturales",topic.name,subtopic,mode,level)).toBe(all.length);
   expect(all.slice(0,old.length)).toEqual(old);
   expect(verifyScienceCell(all,level,mode,scienceFacts(subtopic))).toEqual([]);
   for(const item of all){expect(ids.has(item.id)).toBe(false);ids.add(item.id);}
   prior+=old.length;added+=fresh.length;total+=all.length;
  }
  expect(prior).toBe(2565);expect(added).toBe(SCIENCE_M2_NEW_TOTAL);
  expect(total).toBe(SCIENCE_M2_TOTAL);expect(ids.size).toBe(SCIENCE_M2_TOTAL);
 });
 it("después de 10 rondas sigue seleccionando inéditos sin repetir dentro de partida",()=>{
  const pool=scienceM2Pool("Química","Compuestos inorgánicos","avanzado","quiz");
  const a=selectRotation(pool,emptyRotation(),10,()=>0.23);
  let history=emptyRotation();
  for(const x of a)history=recordRotation(history,x.id,true);
  const b=selectRotation(pool,history,10,()=>0.53);
  expect(a.length).toBe(10);expect(b.length).toBe(10);
  expect(new Set(a.map(x=>x.id)).size).toBe(10);
  expect(new Set(b.map(x=>x.id)).size).toBe(10);
  expect(b.every(x=>!a.some(y=>y.id===x.id))).toBe(true);
 });
 it("la explicación M2 y las tres mecánicas se ejecutan como una ronda",()=>{
  const quiz=scienceM2NewPool("Biología","Genética","intermedio","quiz")[3],q=vi.fn();
  let view=render(<ScienceExerciseCard item={quiz} onResult={q} onNext={vi.fn()} isLast={false}/>);
  fireEvent.click(screen.getByRole("button",{name:quiz.expected}));
  expect(q).toHaveBeenCalledWith(true,quiz.expected);
  expect(screen.getByText(/Criterio comprobable:/)).toBeInTheDocument();
  view.unmount();
  const item=scienceM2NewPool("Física","Fuentes de energía","avanzado","clasificar")[4],report=vi.fn();
  view=render(<ScienceExerciseCard item={item} onResult={report} onNext={vi.fn()} isLast/>);
  item.assertions.forEach((a,i)=>{
   fireEvent.click(screen.getByRole("button",{name:a.truth?"Verdadero":"Falso"}));
   if(i<2)expect(report).not.toHaveBeenCalled();
  });
  expect(report).toHaveBeenCalledOnce();
  view.unmount();
  const c=scienceM2NewPool("Química","Materia","avanzado","construir")[14],go=vi.fn();
  render(<ScienceExerciseCard item={c} onResult={go} onNext={vi.fn()} isLast/>);
  c.steps.forEach((step,i)=>{
   fireEvent.click(screen.getByRole("button",{name:step.choices[step.answerIndex]}));
   if(i<1)expect(go).not.toHaveBeenCalled();
  });
  expect(go).toHaveBeenCalledWith(true,expect.any(String));
 });
 it("detecta mutaciones críticas de distractor, clave, nivel y duplicado",()=>{
  const x=scienceM2NewPool("Biología","Célula","avanzado","quiz")[18];
  const facts=scienceFacts("Célula");
  expect(verifyScienceItem(x,"avanzado","quiz",facts)).toEqual([]);
  expect(verifyScienceItem({...x,expected:"otra clave"},"avanzado","quiz",facts)).toContain("Respuesta distinta al oráculo");
  expect(verifyScienceItem({...x,options:[x.expected,x.expected,"X","Y"]},"avanzado","quiz",facts)).toContain("Distractores o clave de selección inválida");
  expect(verifyScienceItem({...x,cognitiveStage:1},"avanzado","quiz",facts)).toContain("Metadatos cognitivos insuficientes");
  expect(verifyScienceItem({...x,level:"principiante"},"avanzado","quiz",facts)).toContain("Celda incorrecta");
  expect(verifyScienceCell([x,x],"avanzado","quiz",facts).some(e=>e.includes("ID duplicado"))).toBe(true);
 });
 it("rechaza solicitudes M2 fuera de catálogo y no altera M1",()=>{
  expect(()=>scienceM2NewPool("Otro","No existe","avanzado","quiz")).toThrow();
  expect(()=>scienceM2NewPool("Biología","Célula","intermedio","quiz").length).not.toBe(0);
 });
});
