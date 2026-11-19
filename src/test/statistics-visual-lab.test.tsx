import {afterEach,describe,it,expect} from "vitest";
import {render,screen,cleanup} from "@testing-library/react";
import {LEVELS} from "@/lib/grammar";
import {STATS_SKILLS,statsPool,statsOracle,statsTask,type FrequencyStimulus,type SampleStimulus,type BarStimulus,type LineStimulus} from "@/lib/statistics-visual-lab";
import {StatisticsVisual} from "@/components/games/StatisticsVisual";
import {statisticsCognitiveChallenge} from "@/lib/statistics-i-cognitive-challenges";
afterEach(()=>cleanup());
describe("Laboratorio estadístico M1 — validez del estímulo y de la clave",()=>{
 it("216 reactivos técnicos: 72 por nivel, 12 por destreza, sin claves ambiguas",()=>{
  const ids=new Set<string>();
  for(const level of LEVELS){
   const tasks=statsPool(level);
   expect(tasks).toHaveLength(72);
   for(const t of tasks){
    expect(ids.has(t.id)).toBe(false);ids.add(t.id);
    expect(t.visualRequirement).toBe("essential");
    expect(t.options).toHaveLength(4);
    expect(new Set(t.options).size).toBe(4);
    expect(t.options[t.answerIndex]).toBe(t.answer);
    expect(statisticsCognitiveChallenge(t.stimulus,t.skill,level)?.answer??statsOracle(t.stimulus,t.skill)).toBe(t.answer);
    expect(t.cognitiveStage).toBe(level==="principiante"?1:level==="intermedio"?2:3);
    expect(t.explanation).toContain(t.answer);
    if(t.stimulus.kind==="sample"){
     const [a,b]=t.answer.split("/").map(Number);
     for(const option of t.options.filter(x=>x!==t.answer)){
      const [p,q]=option.split("/").map(Number);
      expect(p*b).not.toBe(a*q);
     }
    }
   }
   for(const skill of STATS_SKILLS)expect(tasks.filter(t=>t.skill===skill)).toHaveLength(12);
  }
  expect(ids.size).toBe(216);
 });
 it("resuelve lectura de dos gráficos comparativos",()=>{
  const b:BarStimulus={kind:"bars",labels:["Lunes","Martes","Miércoles","Jueves"],values:[8,12,10,15],unit:"libros"};
  const l:LineStimulus={kind:"line",labels:["Enero","Febrero","Marzo","Abril"],values:[12,17,23,21],unit:"unidades"};
  expect(statsOracle(b,"bar-difference")).toBe("7 libros");
  expect(statsOracle(l,"line-change")).toBe("6 unidades");
  expect(statsOracle({...b,values:[8,12,10,16]},"bar-difference")).not.toBe("7 libros");
  expect(statsOracle({...l,values:[12,17,22,21]},"line-change")).not.toBe("6 unidades");
 });
 it("interpreta moda, rango y mediana de frecuencias sin confundir frecuencia con valor",()=>{
  const f:FrequencyStimulus={kind:"frequency",values:[2,4,6,8],frequencies:[2,5,3,1],unit:"puntos"};
  expect(statsOracle(f,"frequency-mode")).toBe("4 puntos");
  expect(statsOracle(f,"frequency-range")).toBe("6 puntos");
  expect(statsOracle(f,"frequency-median")).toBe("4 puntos");
  expect(statsOracle({...f,frequencies:[2,1,6,1]},"frequency-mode")).toBe("6 puntos");
  expect(statsOracle({...f,values:[1,4,6,8]},"frequency-range")).toBe("7 puntos");
 });
 it("espacio muestral: cuenta casos y simplifica racionalmente",()=>{
  const sample:SampleStimulus={kind:"sample",colors:["rojo","azul","rojo","azul","azul","azul","rojo","azul"],unit:"fichas"};
  expect(statsOracle(sample,"sample-probability")).toBe("3/8");
  expect(statsOracle({...sample,colors:["rojo","rojo","rojo","rojo","azul","azul","azul","azul"]},"sample-probability")).toBe("1/2");
 });
 it("los cuatro formatos visuales cuentan con representación accesible",()=>{
  for(const index of [0,1,2,5]){
   const item=statsTask(index,"principiante");
   render(<StatisticsVisual data={item.stimulus}/>);
   if(item.stimulus.kind==="frequency"){
    expect(screen.getByRole("table",{name:/tabla de frecuencias/i})).toBeInTheDocument();
    expect(screen.getAllByRole("columnheader")).toHaveLength(5);
   }else expect(screen.getByRole("img")).toHaveAttribute("data-testid","statistics-visual");
   cleanup();
  }
 });
});
