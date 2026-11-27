import {afterEach,expect,it} from "vitest";
import {cleanup,fireEvent,render,screen,within} from "@testing-library/react";
import {ReviewActivity,SharedReview} from "@/components/review/SharedReview";
import {IDEA_REVIEW,CELL_REVIEW} from "@/lib/rdg/route-candidates-v80";
afterEach(cleanup);
for(const route of [IDEA_REVIEW,CELL_REVIEW]){
 it(route.title+" candidate: shared engine, optional aids, contextual exit and transfer without hints",()=>{
  render(<SharedReview route={route} back={<a href="/?return=1">Volver a los juegos</a>}/>);
  expect(screen.getByRole("heading",{name:"Modo Repaso: "+route.title})).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{name:"Necesito una pista"}));
  expect(screen.getByRole("button",{name:"Ocultar pista"})).toHaveAttribute("aria-expanded","true");
  fireEvent.click(screen.getByRole("button",{name:"Revelar siguiente paso"}));
  fireEvent.click(screen.getByRole("button",{name:"Transferencia",exact:true}));
  expect(screen.queryByRole("button",{name:/pista/i})).not.toBeInTheDocument();
  expect(screen.queryByRole("button",{name:"Revelar siguiente paso"})).not.toBeInTheDocument();
  expect(screen.getByRole("button",{name:"Comprobar"})).toBeDisabled();
  fireEvent.click(within(screen.getByRole("group",{name:"Respuestas"})).getByRole("button",{name:route.transfer[0].answer,exact:true}));
  fireEvent.click(screen.getByRole("button",{name:"Comprobar"}));
  expect(screen.getByRole("status")).toHaveTextContent("¡Bien razonado!");
  expect(screen.queryByRole("button",{name:"Intentar de nuevo"})).not.toBeInTheDocument();
  expect(screen.getByRole("link",{name:"Volver a los juegos"})).toHaveAttribute("href","/?return=1");
 });
 it(route.title+" candidate: every response path and individual feedback",()=>{
  for(const [transfer,tasks] of [[false,route.lessons],[true,route.transfer]] as const)for(const task of tasks){
   expect(new Set(task.options).size).toBe(4);
   for(const option of task.options){
    render(<ReviewActivity task={task} transfer={transfer}/>);
    fireEvent.click(within(screen.getByRole("group",{name:"Respuestas"})).getByRole("button",{name:option,exact:true}));
    fireEvent.click(screen.getByRole("button",{name:"Comprobar"}));
    const status=screen.getByRole("status");expect(status).toHaveTextContent(task.explanation);
    if(option===task.answer)expect(status).toHaveTextContent("¡Bien razonado!");
    else{expect(task.errors[option]).toBeTruthy();expect(status).toHaveTextContent(task.errors[option]);}
    cleanup();
   }
  }
 });
}
