import {QueryClient} from "@tanstack/react-query";
import {createMemoryHistory,createRouter,RouterProvider} from "@tanstack/react-router";
import {afterEach,describe,expect,it,vi} from "vitest";
import {cleanup,fireEvent,render,screen,waitFor} from "@testing-library/react";
import {routeTree} from "@/routeTree.gen";
afterEach(()=>{cleanup();vi.restoreAllMocks();});
describe("Ciencias Naturales M1 — navegación real y contrato 10/10",()=>{
 it("entra desde el selector, completa una ronda, reinicia y vuelve al contexto previo",async()=>{
  const history=createMemoryHistory({initialEntries:["/?area=naturales&tema=Biolog%C3%ADa&subtema=C%C3%A9lula&modo=clasificar&nivel=principiante"]});
  const router=createRouter({routeTree,history,context:{queryClient:new QueryClient()}});
  await router.load();render(<RouterProvider router={router}/>);
  expect(await screen.findByRole("combobox",{name:"Tema de estudio"})).toHaveValue("Biología");
  expect(screen.getByRole("combobox",{name:"Subtema de estudio"})).toHaveValue("Célula");
  fireEvent.click(screen.getByRole("link",{name:/Comenzar desafío/}));
  await waitFor(()=>expect(screen.getByTestId("game-session-header")).toBeInTheDocument());
  expect(screen.getByRole("progressbar",{name:"Barra de avance"})).toHaveAttribute("aria-valuemax","10");
  expect(screen.getByText("1/10")).toBeInTheDocument();
  for(let i=0;i<3;i++)fireEvent.click(screen.getByRole("button",{name:"Verdadero"}));
  expect(screen.getByTestId("learning-feedback")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{name:"Continuar"}));
  await waitFor(()=>expect(screen.getByText("2/10")).toBeInTheDocument());
  const confirm=vi.spyOn(window,"confirm").mockReturnValue(true);
  fireEvent.click(screen.getByRole("button",{name:"Reiniciar"}));
  expect(confirm).toHaveBeenCalled();
  await waitFor(()=>expect(screen.getByText("1/10")).toBeInTheDocument());
  fireEvent.click(screen.getByRole("link",{name:"Volver a la selección del juego"}));
  await waitFor(()=>{
   expect(screen.getByRole("combobox",{name:"Tema de estudio"})).toHaveValue("Biología");
   expect(screen.getByRole("combobox",{name:"Subtema de estudio"})).toHaveValue("Célula");
   expect(screen.getByText(/Tu ruta:/)).toBeInTheDocument();
  });
 });
});
