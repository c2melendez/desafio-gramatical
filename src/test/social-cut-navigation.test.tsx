import {QueryClient} from "@tanstack/react-query";
import {createMemoryHistory,createRouter,RouterProvider} from "@tanstack/react-router";
import {afterEach,describe,expect,it,vi} from "vitest";
import {cleanup,fireEvent,render,screen,waitFor,within} from "@testing-library/react";
import {routeTree} from "@/routeTree.gen";

afterEach(()=>{cleanup();localStorage.clear();vi.restoreAllMocks();});
describe("Corte Sociales — interfaz y navegación funcional real",()=>{
 const makeRouter=async(path:string)=>{
  const history=createMemoryHistory({initialEntries:[path]});
  const router=createRouter({routeTree,history,context:{queryClient:new QueryClient()}});
  await router.load();
  render(<RouterProvider router={router}/>);
  return router;
 };
 it("abre /sociales sin query y resuelve el subtema legítimo, diez rondas y retorno",async()=>{
  await makeRouter("/sociales");
  expect(await screen.findByTestId("game-session-header")).toBeInTheDocument();
  expect(screen.getByText(/Independencia · Básico/)).toBeInTheDocument();
  expect(screen.getByRole("progressbar",{name:"Barra de avance"})).toHaveAttribute("aria-valuemax","10");
  expect(screen.getByText("1/10")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("link",{name:"Volver a la selección del juego"}));
  await waitFor(()=>{
   expect(screen.getByRole("combobox",{name:"Tema de estudio"})).toHaveValue("Historia de Honduras");
   expect(screen.getByRole("combobox",{name:"Subtema de estudio"})).toHaveValue("Independencia");
  });
 });
 it("completa diez rondas de selección y recupera resultados desde URL directo",async()=>{
  await makeRouter("/sociales?subtema=Husos%20horarios&modo=quiz&nivel=intermedio");
  expect(await screen.findByText("1/10")).toBeInTheDocument();
  const progress=screen.getByRole("progressbar",{name:"Barra de avance"});
  expect(progress).toHaveAttribute("aria-valuemax","10");
  for(let round=1;round<=10;round++){
   expect(screen.getByText(round+"/10")).toBeInTheDocument();
   const card=screen.getByRole("region",{name:"Ejercicio de Ciencias Sociales"});
   fireEvent.click(within(card).getAllByRole("button")[0]);
   expect(within(card).getByTestId("learning-feedback")).toBeInTheDocument();
   fireEvent.click(within(card).getByRole("button",{name:round===10?"Ver resultados":"Continuar"}));
   if(round<10)await waitFor(()=>expect(screen.getByText((round+1)+"/10")).toBeInTheDocument());
  }
  expect(await screen.findByRole("heading",{name:/Reto de Ciencias Sociales completado/})).toBeInTheDocument();
  expect(screen.getByText(/Aciertos/)).toBeInTheDocument();
  fireEvent.click(screen.getByRole("link",{name:"Volver a la selección"}));
  await waitFor(()=>{
   expect(screen.getByRole("combobox",{name:"Tema de estudio"})).toHaveValue("Geografía");
   expect(screen.getByRole("combobox",{name:"Subtema de estudio"})).toHaveValue("Husos horarios");
  });
 });
 it("clasificación completa exactamente una ronda y reiniciar requiere confirmación",async()=>{
  await makeRouter("/sociales?subtema=Independencia&modo=clasificar&nivel=avanzado");
  expect(await screen.findByText("1/10")).toBeInTheDocument();
  for(let i=0;i<3;i++)fireEvent.click(screen.getByRole("button",{name:"Verdadero"}));
  expect(screen.getByTestId("learning-feedback")).toBeInTheDocument();
  expect(screen.getByText("1/10")).toBeInTheDocument();
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