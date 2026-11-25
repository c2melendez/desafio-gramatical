import {QueryClient} from "@tanstack/react-query";
import {createMemoryHistory,createRouter,RouterProvider} from "@tanstack/react-router";
import {afterEach,expect,it} from "vitest";
import {cleanup,fireEvent,render,screen,waitFor,within} from "@testing-library/react";
import {routeTree} from "@/routeTree.gen";
import {OPERATIONS_ROUTE} from "@/lib/rdg/operations";
afterEach(cleanup);
const path="/?area=matematicas&tema=Aritm%C3%A9tica&subtema=Operaciones&modo=construir&nivel=avanzado";
async function mount(url=path){const router=createRouter({routeTree,history:createMemoryHistory({initialEntries:[url]}),context:{queryClient:new QueryClient()}});await router.load();render(<RouterProvider router={router}/>);return router;}
it("offers voluntary review before games, supports errors and contextual return",async()=>{
 const router=await mount();
 const link=await screen.findByRole("link",{name:/Modo Repaso/});
 const game=screen.getByRole("heading",{name:/Elige un juego/});
 expect(link.compareDocumentPosition(game)&Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
 fireEvent.click(link);await screen.findByRole("heading",{name:"Modo Repaso: Operaciones"});
 fireEvent.click(screen.getByRole("button",{name:"+6"}));expect(screen.getByText("Posición actual: 2")).toBeInTheDocument();
 fireEvent.click(screen.getByRole("button",{name:"−3"}));expect(screen.getByText("Posición actual: -1")).toBeInTheDocument();
 fireEvent.click(screen.getByRole("button",{name:"5",exact:true}));fireEvent.click(screen.getByRole("button",{name:"Comprobar"}));
 expect(screen.getByRole("status")).toHaveTextContent("La segunda acción es restar");
 fireEvent.click(screen.getByRole("button",{name:"Intentar de nuevo"}));fireEvent.click(screen.getByRole("button",{name:"−1",exact:true}));fireEvent.click(screen.getByRole("button",{name:"Comprobar"}));expect(screen.getByRole("status")).toHaveTextContent("¡Bien razonado!");
 fireEvent.click(screen.getByRole("link",{name:/Volver a los juegos/}));await screen.findByRole("heading",{name:/Elige un juego/});
 expect(screen.getByRole("combobox",{name:"Subtema de estudio"})).toHaveValue("Operaciones");
 expect(router.state.location.search).toMatchObject({area:"matematicas",subtema:"Operaciones",modo:"construir",nivel:"avanzado"});
});
it("direct review supports transfer without hints and does not expose it for other subtopics",async()=>{
 await mount(path+"&repaso=true");await screen.findByRole("heading",{name:"Modo Repaso: Operaciones"});
 fireEvent.click(screen.getByRole("button",{name:"Transferencia",exact:true}));
 expect(screen.queryByRole("button",{name:/pista/i})).not.toBeInTheDocument();
 expect(screen.getByRole("button",{name:"Comprobar"})).toBeDisabled();
 fireEvent.click(within(screen.getByRole("group",{name:"Respuestas"})).getByRole("button",{name:"60"}));fireEvent.click(screen.getByRole("button",{name:"Comprobar"}));
 expect(screen.getByRole("status")).toHaveTextContent("60");
});
it("does not publish a false review for a different subtopic",async()=>{
 await mount(path.replace("subtema=Operaciones","subtema=Fracciones")+"&repaso=true");
 expect(await screen.findByRole("heading",{name:/Elige un juego/})).toBeInTheDocument();expect(screen.queryByRole("link",{name:/Modo Repaso/})).not.toBeInTheDocument();
});
it("independent arithmetic oracle covers all activity and transfer keys, rejects mutated keys",()=>{
 // Independent direct evaluation, not the explanation or selected index. Fractions use integer numerators and common denominators.
 const format=(n:number,d:number)=>{const gcd=(a:number,b:number):number=>b?gcd(b,a%b):Math.abs(a);const g=gcd(n,d);return d/g===1?String(n/g).replace("-","−"):(String(n/g)+"/"+String(d/g)).replace("-","−");};
 const independent:Record<string,string>={A1:format(-4+6-3,1),A2:[11-3*2,(11-3)*2].join(" y "),A3:String(42/7*3-5),A4:String((13-3+5)*(4+2)),A5:format(7*(12-5)-7*12,1),A6:format(Math.sqrt(9)+2-6,7),T1:String(Array(6).fill(14).reduce((a,b)=>a+b,0)-Array(3).fill(8).reduce((a,b)=>a+b,0)),T2:String((17-4+9)*(5+1)),T3:format(11*(23-8)-11*23,1),T4:format(Math.sqrt(16)-5+3,9),T5:String(14-Math.sqrt(36)+3*5-24/8)};
 const tasks=[...OPERATIONS_ROUTE.lessons,...OPERATIONS_ROUTE.transfer];expect(Object.keys(independent)).toHaveLength(tasks.length);
 for(const t of tasks){expect(independent[t.id]).toBe(t.answer);expect(new Set(t.options).size).toBe(4);expect(t.options.filter(x=>x===independent[t.id])).toHaveLength(1);for(const wrong of t.options.filter(x=>x!==t.answer)){expect(wrong).not.toBe(independent[t.id]);expect(t.errors[wrong]).toBeTruthy();}}
});
