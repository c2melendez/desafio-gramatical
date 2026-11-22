import {QueryClient} from "@tanstack/react-query";
import {createMemoryHistory,createRouter,RouterProvider} from "@tanstack/react-router";
import {afterEach,describe,expect,it,vi} from "vitest";
import {cleanup,fireEvent,render,screen,waitFor,within} from "@testing-library/react";
import {routeTree} from "@/routeTree.gen";
afterEach(()=>{cleanup();localStorage.clear();vi.restoreAllMocks();});
describe("Corte Blandas — navegación real, diez rondas y controles",()=>{
 const start=async(path:string)=>{
  const router=createRouter({routeTree,history:createMemoryHistory({initialEntries:[path]}),
   context:{queryClient:new QueryClient()}});
  await router.load();render(<RouterProvider router={router}/>);
 };
 it("abre /blandas con defecto seguro, práctica y retorno contextual",async()=>{
  await start("/blandas?subtema=Célula&modo=desconocido&nivel=desconocido");
  expect(await screen.findByTestId("game-session-header")).toBeInTheDocument();
  expect(screen.getByText(/Pensamiento crítico · Básico/)).toBeInTheDocument();
  expect(screen.getByText("1/10")).toBeInTheDocument();
  expect(screen.getByRole("progressbar",{name:"Barra de avance"})).toHaveAttribute("aria-valuemax","10");
  fireEvent.click(screen.getByRole("link",{name:"Volver a la selección del juego"}));
  await waitFor(()=>{
   expect(screen.getByRole("combobox",{name:"Tema de estudio"})).toHaveValue("Toma de decisiones");
   expect(screen.getByRole("combobox",{name:"Subtema de estudio"})).toHaveValue("Pensamiento crítico");
  });
 });
 it("completa exactamente diez rondas de quiz y vuelve a la elección avanzada",async()=>{
  await start("/blandas?subtema=Ética&modo=quiz&nivel=avanzado");
  expect(await screen.findByText("1/10")).toBeInTheDocument();
  expect(screen.getByRole("progressbar",{name:"Barra de avance"})).toHaveAttribute("aria-valuemax","10");
  for(let n=1;n<=10;n++){
   expect(screen.getByText(n+"/10")).toBeInTheDocument();
   const card=screen.getByRole("region",{name:"Ejercicio de Habilidades Blandas"});
   fireEvent.click(within(card).getAllByRole("button")[0]);
   expect(within(card).getByTestId("learning-feedback")).toBeInTheDocument();
   fireEvent.click(within(card).getByRole("button",{name:n===10?"Ver resultados":"Continuar"}));
   if(n<10)await waitFor(()=>expect(screen.getByText((n+1)+"/10")).toBeInTheDocument());
  }
  expect(await screen.findByRole("heading",{name:/Reto de Habilidades Blandas completado/})).toBeInTheDocument();
  expect(screen.getByText(/Aciertos/)).toBeInTheDocument();
  fireEvent.click(screen.getByRole("link",{name:"Volver a la selección"}));
  await waitFor(()=>{
   expect(screen.getByRole("combobox",{name:"Tema de estudio"})).toHaveValue("Autogestión");
   expect(screen.getByRole("combobox",{name:"Subtema de estudio"})).toHaveValue("Ética");
  });
 });
 it("clasificación respeta el avance y exige confirmación para reiniciar",async()=>{
  await start("/blandas?subtema=Respeto&modo=clasificar&nivel=intermedio");
  expect(await screen.findByText("1/10")).toBeInTheDocument();
  for(let i=0;i<3;i++)fireEvent.click(screen.getByRole("button",{name:"Verdadero"}));
  expect(screen.getByTestId("learning-feedback")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{name:"Continuar"}));
  await waitFor(()=>expect(screen.getByText("2/10")).toBeInTheDocument());
  vi.spyOn(window,"confirm").mockReturnValue(false);
  fireEvent.click(screen.getByRole("button",{name:"Reiniciar"}));
  expect(screen.getByText("2/10")).toBeInTheDocument();
  vi.spyOn(window,"confirm").mockReturnValue(true);
  fireEvent.click(screen.getByRole("button",{name:"Reiniciar"}));
  await waitFor(()=>expect(screen.getByText("1/10")).toBeInTheDocument());
 });
});
