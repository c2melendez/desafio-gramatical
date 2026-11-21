import {QueryClient} from "@tanstack/react-query";
import {createMemoryHistory,createRouter,RouterProvider} from "@tanstack/react-router";
import {afterEach,describe,expect,it,vi} from "vitest";
import {cleanup,fireEvent,render,screen,waitFor} from "@testing-library/react";
import {routeTree} from "@/routeTree.gen";
afterEach(()=>{cleanup();localStorage.clear();vi.restoreAllMocks();});
describe("Habilidades Blandas M1 — entrada, partida y retorno",()=>{
 it("entra desde selector, responde una ronda, regresa a la selección original",async()=>{
  const history=createMemoryHistory({initialEntries:["/?area=blandas&tema=Convivencia&subtema=Respeto&modo=clasificar&nivel=principiante"]});
  const router=createRouter({routeTree,history,context:{queryClient:new QueryClient()}});
  await router.load();render(<RouterProvider router={router}/>);
  expect(await screen.findByRole("combobox",{name:"Tema de estudio"})).toHaveValue("Convivencia");
  expect(screen.getByRole("combobox",{name:"Subtema de estudio"})).toHaveValue("Respeto");
  fireEvent.click(screen.getByRole("link",{name:/Comenzar desafío/}));
  await waitFor(()=>expect(screen.getByTestId("game-session-header")).toBeInTheDocument());
  expect(screen.getByRole("progressbar",{name:"Barra de avance"})).toHaveAttribute("aria-valuemax","10");
  for(let i=0;i<3;i++)fireEvent.click(screen.getByRole("button",{name:"Verdadero"}));
  expect(screen.getByTestId("learning-feedback")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{name:"Continuar"}));
  await waitFor(()=>expect(screen.getByText("2/10")).toBeInTheDocument());
  const confirmation=vi.spyOn(window,"confirm").mockReturnValue(true);
  fireEvent.click(screen.getByRole("button",{name:"Reiniciar"}));
  expect(confirmation).toHaveBeenCalled();
  await waitFor(()=>expect(screen.getByText("1/10")).toBeInTheDocument());
  fireEvent.click(screen.getByRole("link",{name:"Volver a la selección del juego"}));
  await waitFor(()=>{
   expect(screen.getByRole("combobox",{name:"Tema de estudio"})).toHaveValue("Convivencia");
   expect(screen.getByRole("combobox",{name:"Subtema de estudio"})).toHaveValue("Respeto");
  });
 });
 it("abre la ruta sin parámetros con un subtema Blandas válido",async()=>{
  const history=createMemoryHistory({initialEntries:["/blandas"]});
  const router=createRouter({routeTree,history,context:{queryClient:new QueryClient()}});
  await router.load();render(<RouterProvider router={router}/>);
  expect(await screen.findByTestId("game-session-header")).toBeInTheDocument();
  expect(screen.getByText("1/10")).toBeInTheDocument();
  expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuemax","10");
 });
});