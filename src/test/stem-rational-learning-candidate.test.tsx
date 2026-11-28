import {afterEach,describe,expect,it} from "vitest";
import {cleanup,fireEvent,render,screen,within} from "@testing-library/react";
import {SharedReview,ReviewActivity} from "@/components/review/SharedReview";
import {STEM_RATIONAL_REVIEW as route} from "@/lib/rdg/stem-rational-candidate";
import {mathM3Pool} from "@/lib/math-m3";
import {OPERATIONS_ROUTE} from "@/lib/rdg/operations";
import asset from "../../qa/stem/rational-learning-candidate.json";

afterEach(cleanup);
describe("STEM-07 shared rational candidate",()=>{
 it("is a candidate with distinct stimuli from the selected native game pool and Operations review",()=>{
  expect(asset.status).toBe("CANDIDATE");
  const tasks=[...route.lessons,...route.transfer];
  const existing=new Set([...mathM3Pool("Aritmética","Operaciones","intermedio","clasificar").map(x=>x.prompt),...OPERATIONS_ROUTE.lessons.map(x=>x.prompt)]);
  expect(tasks).toHaveLength(5);
  expect(new Set(tasks.map(t=>t.prompt)).size).toBe(5);
  for(const task of tasks)expect(existing.has(task.prompt)).toBe(false);
 });
 it("reveals reasoning and hides aids in transfer",()=>{
  render(<SharedReview route={route} back={<a href="/?return=1">Volver a los juegos</a>}/>);
  expect(screen.getByRole("heading",{name:"Modo Repaso: "+route.title})).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{name:"Revelar siguiente paso"}));
  fireEvent.click(screen.getByRole("button",{name:"Necesito una pista"}));
  expect(screen.getByRole("button",{name:"Ocultar pista"})).toHaveAttribute("aria-expanded","true");
  fireEvent.click(screen.getByRole("button",{name:"Transferencia",exact:true}));
  expect(screen.queryByRole("button",{name:/pista/i})).not.toBeInTheDocument();
  expect(screen.queryByRole("button",{name:"Revelar siguiente paso"})).not.toBeInTheDocument();
  expect(screen.getByRole("button",{name:"Comprobar"})).toBeDisabled();
 });
 for(const [transfer,tasks] of [[false,route.lessons],[true,route.transfer]] as const)for(const task of tasks)for(const option of task.options){
  it(task.id+" response "+option,()=>{
   render(<ReviewActivity task={task} transfer={transfer}/>);
   fireEvent.click(within(screen.getByRole("group",{name:"Respuestas"})).getByRole("button",{name:option,exact:true}));
   fireEvent.click(screen.getByRole("button",{name:"Comprobar"}));
   const status=screen.getByRole("status");
   expect(status).toHaveTextContent(task.explanation);
   if(option===task.answer)expect(status).toHaveTextContent("¡Bien razonado!");
   else expect(status).toHaveTextContent(task.errors[option]);
  });
 }
});
