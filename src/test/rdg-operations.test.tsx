import {QueryClient} from "@tanstack/react-query";
import {createMemoryHistory,createRouter,RouterProvider} from "@tanstack/react-router";
import {afterEach,expect,it} from "vitest";
import {cleanup,fireEvent,render,screen,waitFor,within} from "@testing-library/react";
import {routeTree} from "@/routeTree.gen";
import {OPERATIONS_ROUTE} from "@/lib/rdg/operations";
import {mathM3Pool} from "@/lib/math-m3";
import {MATH_LEVELS,MATH_MODES} from "@/lib/math-m1";
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
 const independent:Record<string,string>={T16:String(96/(4+8)),T17:String((17-17)/5+12),T18:String(26*4-(26-6)*4),T19:format(10-13,24),T20:format(3*(6-7)+2,20),A14:String(12*7-12*2+3*7-3*2),A15:String(6*(5-2)-5*(6-3)),A16:String((6*(8+8)-6*8)/3),T13:String(8*6-8+2*6-2),T14:String(9*(4-2)-4*(9-5)),T15:String((5*(9+9)-5*9)/3),A13:String(20-(7-2*(6-1))),T12:String(25-(11-3*5)),A11:String(8-(-3)-2),A12:format(-4*3+2,1),T10:format(-7-(-5),1),T11:format(6*(-3)+4,1),A1:format(-4+6-3,1),A2:[11-3*2,(11-3)*2].join(" y "),A3:String(42/7*3-5),A4:String((31-3+29)*(11+2)),A5:format(7*(12-5)-7*12,1),A6:format(Math.sqrt(9)+2-6,7),T1:String(Array(6).fill(14).reduce((a,b)=>a+b,0)-Array(3).fill(8).reduce((a,b)=>a+b,0)),T2:String((37-4+19)*(11+1)),T3:format(11*(23-8)-11*23,1),T4:format(Math.sqrt(16)-5+3,9),T5:String(14-Math.sqrt(36)+3*5-24/8),A7:String((76+8)/7),A8:String(6*(15+3)-6*(15-4)),A9:format(14-3,22*4),A10:String(11*16+7-(11*13+30)),T6:String((113+17)/5),T7:String(8*(19+2)-8*(19-6)),T8:format(16-5,26*3),T9:format(17*11+3-(17*9+40),1)};
 const tasks=[...OPERATIONS_ROUTE.lessons,...OPERATIONS_ROUTE.transfer];expect(Object.keys(independent)).toHaveLength(tasks.length);
 for(const t of tasks){expect(independent[t.id]).toBe(t.answer);expect(new Set(t.options).size).toBe(4);expect(t.options.filter(x=>x===independent[t.id])).toHaveLength(1);for(const wrong of t.options.filter(x=>x!==t.answer)){expect(wrong).not.toBe(independent[t.id]);expect(t.errors[wrong]).toBeTruthy();}}
});

it("R06: all 450 actual game IDs are checked against review expressions, including transformed operands",()=>{
 const bank=MATH_LEVELS.flatMap(level=>MATH_MODES.flatMap(mode=>mathM3Pool("Aritmética","Operaciones",level,mode)));
 expect(bank).toHaveLength(450);expect(new Set(bank.map(x=>x.id)).size).toBe(450);
 const norm=(s:string)=>s.normalize("NFKC").replace(/\s/g,"").replace(/[−–]/g,"-").replace(/×/g,"*").replace(/÷/g,"/").replace(/\)(?=\d)/g,")*").replace(/(\d)\(/g,"$1*(");
 const grouped=(s:string)=>[...norm(s).matchAll(/\(\d+\+\d+\)\*\d+/g)].map(x=>x[0]);
 const groups=new Map<string,string[]>();
 for(const item of bank)for(const expression of new Set([...grouped(item.prompt),...grouped(item.formula)]))groups.set(expression,[...(groups.get(expression)??[]),item.id]);
 // Regression: both prior worked results really exist as playable basic exercises.
 expect(groups.get("(10+5)*6")).toContain("math-m1-aritmetica-operaciones-quiz-principiante-4");
 expect(groups.get("(13+9)*6")).toContain("math-m1-aritmetica-operaciones-clasificar-principiante-8");
 const revision2=["(31+29)*11","(28+29)*13","(37+19)*11","(33+19)*12"];
 for(const expression of revision2)expect(groups.has(expression),expression).toBe(false);
 const signatures=["-4+6","2-3","11-3*2","(11-3)*2","42/7*3-5","7*(12-5)-7*12","√(9/49)+2/7-6/7","27-4*(3+2)","(19-7)*2","19-7*2","9*(8-3)-9*8","√(25/64)-1/4+3/8","6*14-3*8","11*(23-8)-11*23","√(16/81)-5/9+1/3","14-√36+3*5-24/8"];
 // Single-step signed fragments cannot be full prompts of the current grouped-product bank.
 for(const item of bank)for(const signature of signatures){
  const fullFormula=norm(item.formula.split("=")[0]);
  expect(fullFormula, item.id+" / "+signature).not.toBe(signature);
 }
 const counts=Object.fromEntries([...new Set(bank.map(x=>x.operation))].map(op=>[String(op),bank.filter(x=>x.operation===op).length]));
 console.log("RDG_BANK_CONTRAST "+JSON.stringify({ids:bank.length,grouped_expressions:groups.size,corrected_collisions:2,remaining_grouped_collisions:0,families:counts,op04_gap:bank.filter(x=>/√|raíz/i.test(x.prompt)).length===0}));
});
it("checks distinct error mechanisms and manipulation for changed examples",async()=>{
 await mount(path+"&repaso=true");await screen.findByRole("heading",{name:"Modo Repaso: Operaciones"});
 fireEvent.click(screen.getByRole("button",{name:"Procedimientos",exact:true}));
 fireEvent.click(screen.getByRole("button",{name:"Siguiente",exact:true}));
 fireEvent.click(screen.getByRole("button",{name:"−3",exact:true}));
 fireEvent.click(screen.getByRole("button",{name:"+2",exact:true}));
 expect(screen.getByText("(28 + 29) × 13",{exact:true})).toBeInTheDocument();
 fireEvent.click(within(screen.getByRole("group",{name:"Respuestas"})).getByRole("button",{name:"780",exact:true}));
 fireEvent.click(screen.getByRole("button",{name:"Comprobar"}));
 expect(screen.getByRole("status")).toHaveTextContent("no disminuiste el primer sumando");
});

it("R02/R07: distractors correspond to distinct reproducible error operations",()=>{
 const tasks=[...OPERATIONS_ROUTE.lessons,...OPERATIONS_ROUTE.transfer];
 const expected:Record<string,number[]>={A1:[-4+6+3,-4-3,-4+6],A3:[42/(7*3)-5,42/7*(3-5),42/7*3],A4:[(31+29)*11,(31+29)*13,(31-3+29)*11],T1:[6*14,6*14+3*8,6*14-8],T2:[(37+19)*11,(37+19)*12,(37-4+19)*11],T5:[14-6+15+3,14-6-3,(14-6+3)*5-3]};
 for(const [id,values] of Object.entries(expected)){
  const task=tasks.find(t=>t.id===id)!;
  expect(task.options.filter(x=>x!==task.answer).map(x=>Number(x.replace("−","-"))).sort((a,b)=>a-b)).toEqual(values.sort((a,b)=>a-b));
 }
 expect(27-4*(3+2)).toBe(7);expect((19-7)*2).toBe(24);expect(19-7*2).toBe(5);expect(9*(8-3)-9*8).toBe(-27);
 expect((Math.sqrt(25)-2+3)/8).toBe(3/4);
 expect(0/9).toBe(0);expect(Number.isFinite(9/0)).toBe(false);expect(Math.sqrt(0)).toBe(0);expect(Number.isNaN(Math.sqrt(-9))).toBe(true);expect(Math.sqrt(9)).toBe(3);
});
it("R02: summary explicitly explains real-domain counterexamples",async()=>{
 await mount(path+"&repaso=true");
 await screen.findByRole("heading",{name:"Modo Repaso: Operaciones"});
 fireEvent.click(screen.getByRole("button",{name:"Síntesis",exact:true}));
 const section=screen.getByRole("region",{name:"Condiciones y contraejemplos"});
 expect(section).toHaveTextContent("9 ÷ 0 no está definido");
 expect(section).toHaveTextContent("√(−9) no tiene valor real");
});

it("R4 candidate: progressive bridges, independent transfer and preserved R3 tasks",async()=>{
 const added=OPERATIONS_ROUTE.lessons.filter(t=>t.bridge);expect(added).toHaveLength(10);expect(added.every(t=>t.bridge?.length===3)).toBe(true);
 const transfer=OPERATIONS_ROUTE.transfer;expect(transfer).toHaveLength(20);expect(transfer.every(t=>!t.bridge&&!t.hint)).toBe(true);
 const bank=MATH_LEVELS.flatMap(l=>MATH_MODES.flatMap(m=>mathM3Pool("Aritmética","Operaciones",l,m)));
 const norm=(s:string)=>s.normalize("NFKC").replace(/\s/g,"").replace(/[−–]/g,"-").toLowerCase();
 for(const task of [...added,...transfer.slice(5)])expect(bank.some(x=>norm(x.prompt)===norm(task.prompt))).toBe(false);
 await mount(path+"&repaso=true");await screen.findByRole("heading",{name:"Modo Repaso: Operaciones"});
 for(let i=0;i<6;i++)fireEvent.click(screen.getByRole("button",{name:"Siguiente",exact:true}));
 const organizer=screen.getByRole("region",{name:"Organizador de razonamiento"});expect(organizer).toHaveTextContent("1 de 3 pasos visibles");
 fireEvent.click(within(organizer).getByRole("button",{name:"Revelar siguiente paso"}));expect(organizer).toHaveTextContent("2 de 3 pasos visibles");
 fireEvent.click(within(organizer).getByRole("button",{name:"Revelar siguiente paso"}));expect(organizer).toHaveTextContent("3 de 3 pasos visibles");
 fireEvent.click(screen.getByRole("button",{name:"Transferencia",exact:true}));expect(screen.queryByRole("region",{name:"Organizador de razonamiento"})).not.toBeInTheDocument();
});

it("teaches signed subtraction and product, and keeps the new transfers free of hints",async()=>{
 await mount(path+"&repaso=true");await screen.findByRole("heading",{name:"Modo Repaso: Operaciones"});
 for(let i=0;i<10;i++)fireEvent.click(screen.getByRole("button",{name:"Siguiente",exact:true}));
 expect(screen.getByRole("heading",{name:"Restar un número negativo"})).toBeInTheDocument();
 fireEvent.click(within(screen.getByRole("group",{name:"Respuestas"})).getByRole("button",{name:"3",exact:true}));
 fireEvent.click(screen.getByRole("button",{name:"Comprobar"}));
 expect(screen.getByRole("status")).toHaveTextContent("restar 3");
 fireEvent.click(screen.getByRole("button",{name:"Siguiente",exact:true}));
 expect(screen.getByRole("heading",{name:"Producto negativo y suma"})).toBeInTheDocument();
 fireEvent.click(screen.getByRole("button",{name:"Siguiente",exact:true}));
 expect(screen.getByRole("heading",{name:"Restar un grupo negativo"})).toBeInTheDocument();
 fireEvent.click(within(screen.getByRole("group",{name:"Respuestas"})).getByRole("button",{name:"3",exact:true}));
 fireEvent.click(screen.getByRole("button",{name:"Comprobar"}));
 expect(screen.getByRole("status")).toHaveTextContent("grupo completo");
 fireEvent.click(screen.getByRole("button",{name:"Transferencia",exact:true}));
 for(let i=0;i<9;i++)fireEvent.click(screen.getByRole("button",{name:"Siguiente",exact:true}));
 expect(screen.getByRole("heading",{name:"Diferencia entre temperaturas"})).toBeInTheDocument();
 expect(screen.queryByRole("button",{name:/pista/i})).not.toBeInTheDocument();
 expect(screen.queryByRole("region",{name:"Organizador de razonamiento"})).not.toBeInTheDocument();
 fireEvent.click(screen.getByRole("button",{name:"Siguiente",exact:true}));
 expect(screen.getByRole("heading",{name:"Saldo con cambios repetidos"})).toBeInTheDocument();
 fireEvent.click(screen.getByRole("button",{name:"Siguiente",exact:true}));
 expect(screen.getByRole("heading",{name:"Cargo con reintegros"})).toBeInTheDocument();
 expect(screen.queryByRole("button",{name:/pista/i})).not.toBeInTheDocument();
});
