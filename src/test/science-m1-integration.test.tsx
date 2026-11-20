import {afterEach,describe,expect,it,vi} from "vitest";
import {cleanup,render,fireEvent,screen} from "@testing-library/react";
import {SCIENCE_TOPICS,SCIENCE_LEVELS,SCIENCE_MODES,SCIENCE_M1_TOTAL,SCIENCE_SUBTOPICS,sciencePool,scienceFacts} from "@/lib/science-m1";
import {verifyScienceCell,verifyScienceItem} from "@/lib/science-m1-verifier";
import {ScienceExerciseCard} from "@/components/games/ScienceExerciseCard";
import {countContent,coverageRows} from "@/lib/coverage";
import {availableModule} from "@/lib/phuma-catalog";
import {rotationKey,selectRotation,emptyRotation,recordRotation} from "@/lib/rotation";
afterEach(()=>{cleanup();vi.restoreAllMocks();});
describe("Ciencias Naturales M1: núcleo 10/15/20 para 19 subtemas",()=>{
 it("cubre 171 celdas con 2565 IDs integrados y sin inconsistencias de respuesta",()=>{
  expect(SCIENCE_SUBTOPICS).toHaveLength(19);expect(SCIENCE_M1_TOTAL).toBe(2565);
  expect(coverageRows().filter(r=>r.area==="naturales")).toHaveLength(171);
  const ids=new Set<string>();let total=0;
  for(const topic of SCIENCE_TOPICS)for(const subtopic of topic.subtopics)
   for(const mode of SCIENCE_MODES)for(const level of SCIENCE_LEVELS){
    const bank=sciencePool(topic.name,subtopic,level,mode);
    expect(bank.length).toBe(({principiante:10,intermedio:15,avanzado:20})[level]);
    expect(countContent("naturales",topic.name,subtopic,mode,level)).toBe(({principiante:30,intermedio:50,avanzado:70})[level]);
    expect(availableModule("naturales",topic.name,subtopic)).toBe(true);
    expect(verifyScienceCell(bank,level,mode,scienceFacts(subtopic)).length).toBe(0);
    for(const item of bank){expect(ids.has(item.id)).toBe(false);ids.add(item.id);expect(item.reviewStatus).toBe("editorial-draft");}
    total+=bank.length;
   }
  expect(total).toBe(2565);expect(ids.size).toBe(2565);
 });
 it("conserva 10 rondas distintas y una clave de historial por área, modalidad y nivel",()=>{
  const bank=sciencePool("Biología","Célula","avanzado","quiz");
  const first=selectRotation(bank,emptyRotation(),10,()=>0.37);
  let state=emptyRotation();for(const q of first)state=recordRotation(state,q.id,true);
  const second=selectRotation(bank,state,10,()=>0.53);
  expect(new Set(first.map(x=>x.id)).size).toBe(10);
  expect(new Set(second.map(x=>x.id)).size).toBe(10);
  expect(second.some(x=>!first.some(y=>y.id===x.id))).toBe(true);
  expect(rotationKey("naturales","Biología","Célula","quiz","avanzado"))
   .not.toBe(rotationKey("naturales","Biología","Célula","clasificar","avanzado"));
 });
 it("selección permite elegir y muestra explicación incluso con respuesta correcta",()=>{
  const item=sciencePool("Biología","Célula","principiante","quiz")[0],report=vi.fn();
  render(<ScienceExerciseCard item={item} onResult={report} onNext={vi.fn()} isLast/>);
  fireEvent.click(screen.getByRole("button",{name:item.expected}));
  expect(report).toHaveBeenCalledWith(true,item.expected);
  expect(screen.getByTestId("learning-feedback")).toHaveClass("bg-success-soft");
  expect(screen.getByText(/Criterio comprobable:/)).toBeInTheDocument();
  expect(screen.getByRole("button",{name:"Ver resultados"})).toBeInTheDocument();
 });
 it("clasificación exige 3 decisiones en una ronda; construcción exige dos",()=>{
  const classify=sciencePool("Química","Compuestos inorgánicos","intermedio","clasificar")[0],c=vi.fn();
  const view=render(<ScienceExerciseCard item={classify} onResult={c} onNext={vi.fn()} isLast={false}/>);
  for(let i=0;i<3;i++){fireEvent.click(screen.getByRole("button",{name:classify.assertions[i].truth?"Verdadero":"Falso"}));if(i<2)expect(c).not.toHaveBeenCalled();}
  expect(c).toHaveBeenCalledOnce();expect(c).toHaveBeenCalledWith(true,expect.any(String));
  view.unmount();
  const build=sciencePool("Física","Movimiento","avanzado","construir")[0],report=vi.fn();
  render(<ScienceExerciseCard item={build} onResult={report} onNext={vi.fn()} isLast/>);
  for(let i=0;i<2;i++){fireEvent.click(screen.getByRole("button",{name:build.steps[i].choices[build.steps[i].answerIndex]}));if(i===0)expect(report).not.toHaveBeenCalled();}
  expect(report).toHaveBeenCalledWith(true,expect.any(String));
 });
 it("rechaza mutantes críticos: clave incorrecta, distractor duplicado, etapa equivocada y construcción falsa",()=>{
  const item=sciencePool("Biología","Genética","avanzado","quiz")[0];
  const facts=[item.oracle];
  expect(verifyScienceItem(item,"avanzado","quiz",facts)).toEqual([]);
  expect(verifyScienceItem({...item,expected:"clave-falsa"},"avanzado","quiz",facts)).toContain("Respuesta distinta al oráculo");
  expect(verifyScienceItem({...item,options:[item.expected,item.expected,"x","y"]},"avanzado","quiz",facts)).toContain("Distractores o clave de selección inválida");
  expect(verifyScienceItem({...item,cognitiveStage:1},"avanzado","quiz",facts)).toContain("Metadatos cognitivos insuficientes");
  expect(verifyScienceItem({...item,steps:[{...item.steps[0],answerIndex:3},item.steps[1]]},"avanzado","quiz",facts)).toContain("Construcción incorrecta");
  expect(verifyScienceCell([item,item],"avanzado","quiz",facts).some(x=>x.includes("ID duplicado"))).toBe(true);
 });
});
