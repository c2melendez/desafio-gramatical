import {afterEach,describe,expect,it,vi} from "vitest";
import {cleanup,fireEvent,render,screen,within} from "@testing-library/react";
import {ReadingDetective,ReadingInference,ReadingReconstruct} from "@/components/games/ReadingGames";
import {VOCAB_DETECTIVE_CASES,VOCAB_CHOICE_CASES,VOCAB_RECONSTRUCT_CASES} from "@/lib/reading-vocabulary-block";
import {ANALYSIS_DETECTIVE_CASES,ANALYSIS_CHOICE_CASES,ANALYSIS_RECONSTRUCT_CASES} from "@/lib/reading-analysis-block";
import {COMPARISON_DETECTIVE_CASES,COMPARISON_CHOICE_CASES,COMPARISON_RECONSTRUCT_CASES} from "@/lib/reading-comparison-block";
const DATA=[
 {name:"Vocabulario en contexto",detective:VOCAB_DETECTIVE_CASES,choice:VOCAB_CHOICE_CASES,reconstruct:VOCAB_RECONSTRUCT_CASES},
 {name:"Análisis de textos",detective:ANALYSIS_DETECTIVE_CASES,choice:ANALYSIS_CHOICE_CASES,reconstruct:ANALYSIS_RECONSTRUCT_CASES},
 {name:"Lectura comparada",detective:COMPARISON_DETECTIVE_CASES,choice:COMPARISON_CHOICE_CASES,reconstruct:COMPARISON_RECONSTRUCT_CASES}
] as const;
afterEach(cleanup);
describe("Corrida 324 — interacción real en los tres subtemas y niveles",()=>{
 for(const data of DATA)for(const level of ["principiante","intermedio","avanzado"] as const){
  it(data.name+" / "+level+" / clasificación",()=>{
   const item=data.detective.find(q=>q.level===level)!;const report=vi.fn();
   render(<ReadingDetective item={item} report={report} next={vi.fn()} isLast={false}/>);
   for(const [i,claim] of item.claims.entries()){
    const group=screen.getByRole("group",{name:`Clasificación de afirmación ${i+1}`});
    const label={explicit:"Dato explícito",inference:"Inferencia razonable",unsupported:"No sustentado"}[claim.tag];
    fireEvent.click(within(group).getByRole("button",{name:label}));
   }
   fireEvent.click(screen.getByRole("button",{name:"Comprobar las tres afirmaciones"}));
   expect(report).toHaveBeenCalledTimes(3);
   expect(report.mock.calls.every(([correct])=>correct===true)).toBe(true);
  });
  it(data.name+" / "+level+" / selección",()=>{
   const item=data.choice.find(q=>q.level===level)!;const report=vi.fn();
   render(<ReadingInference item={item} report={report} next={vi.fn()} isLast={false}/>);
   fireEvent.click(screen.getByRole("button",{name:item.options[item.answer]}));
   expect(report).toHaveBeenCalledWith(true,undefined);
   expect(screen.getByText(/¡Correcto!/)).toBeInTheDocument();
  });
  it(data.name+" / "+level+" / secuencia",()=>{
   const item=data.reconstruct.find(q=>q.level===level)!;const report=vi.fn();
   render(<ReadingReconstruct item={item} report={report} next={vi.fn()} isLast={true}/>);
   for(const part of item.order.parts)fireEvent.click(screen.getByRole("button",{name:part}));
   fireEvent.click(screen.getByRole("button",{name:"Comprobar secuencia"}));
   expect(report).toHaveBeenCalledWith(true,undefined);
  });
 }
});
