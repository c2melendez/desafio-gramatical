import {afterEach,describe,expect,it} from "vitest";
import {cleanup,render,screen} from "@testing-library/react";
import {LEVELS} from "@/lib/grammar";
import {iqr,stats2Oracle,stats2Pool,STATS2_SKILLS,type DotPlot,type PiePlot,type CrossTable} from "@/lib/statistics-visual-advanced";
import {StatisticsAdvancedVisual} from "@/components/games/StatisticsAdvancedVisual";
afterEach(()=>cleanup());
describe("M1 Estadística II: gráficos con datos esenciales",()=>{
 it("216 tareas, cuatro destrezas por nivel, cuatro opciones distintas y clave comprobable",()=>{
  const ids=new Set<string>();
  for(const level of LEVELS){
   const tasks=stats2Pool(level);
   expect(tasks).toHaveLength(72);
   for(const task of tasks){
    expect(ids.has(task.id)).toBe(false);ids.add(task.id);
    expect(task.options).toHaveLength(4);
    expect(new Set(task.options).size).toBe(4);
    expect(task.options[task.answerIndex]).toBe(task.answer);
    expect(task.answer).toBe(stats2Oracle(task.stimulus,task.skill));
    expect(task.explanation).toContain(task.answer);
    expect(task.visualRequirement).toBe("essential");
   }
   for(const skill of STATS2_SKILLS)expect(tasks.filter(t=>t.skill===skill)).toHaveLength(18);
  }
  expect(ids.size).toBe(216);
 });
 it("cuartiles por mitades en ocho datos: empates no se descartan",()=>{
  const a=[2,3,3,4,8,9,9,10],b=[3,4,4,5,6,7,7,8];
  expect(iqr(a)).toBe(6);expect(iqr(b)).toBe(3);
  const d:DotPlot={kind:"dots",groups:[a,b]};
  expect(stats2Oracle(d,"quartile-range")).toBe("6 puntos");
  expect(stats2Oracle(d,"compare-spread")).toBe("Grupo A");
  expect(stats2Oracle({...d,groups:[[2,3,3,4,5,6,6,7],b]},"quartile-range")).not.toBe("6 puntos");
 });
 it("sectores equivalen a proporciones exactas y cambian con frecuencias",()=>{
  const p:PiePlot={kind:"pie",counts:[4,6,10],labels:["Lectura","Deportes","Arte"]};
  expect(stats2Oracle(p,"pie-proportion")).toBe("20%");
  expect(stats2Oracle({...p,counts:[6,6,10]},"pie-proportion")).not.toBe("20%");
 });
 it("porcentajes condicionales usan el total de columna, no el total de fila",()=>{
  const c:CrossTable={kind:"cross",a:[5,15],b:[5,25]};
  expect(stats2Oracle(c,"cross-table")).toBe("50%");
  expect(stats2Oracle({...c,b:[15,25]},"cross-table")).toBe("25%");
 });
 it("tabla nativa y dos diagramas accesibles se presentan como estímulos semánticos",()=>{
  const tasks=stats2Pool("principiante");
  for(const task of [tasks[0],tasks[2],tasks[3]]){
   render(<StatisticsAdvancedVisual data={task.stimulus}/>);
   if(task.stimulus.kind==="cross"){
    expect(screen.getByRole("table",{name:/preferencias de estudiantes/i})).toBeInTheDocument();
    expect(screen.getAllByRole("columnheader")).toHaveLength(4);
   }else expect(screen.getByRole("img")).toHaveAttribute("data-testid","statistics-advanced-visual");
   cleanup();
  }
 });
});
