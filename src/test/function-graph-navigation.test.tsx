import {QueryClient} from "@tanstack/react-query";
import {createMemoryHistory,createRouter,RouterProvider} from "@tanstack/react-router";
import {afterEach,describe,it,expect} from "vitest";
import {cleanup,fireEvent,render,screen,waitFor} from "@testing-library/react";
import {routeTree} from "@/routeTree.gen";
afterEach(()=>cleanup());
describe("Navegación del nuevo laboratorio de funciones",()=>{
 it("ofrece cuarto juego desde la selección de Álgebra/Funciones y abre una ronda con gráfica",async()=>{
  const history=createMemoryHistory({initialEntries:["/?area=matematicas&tema=%C3%81lgebra&subtema=Funciones&modo=quiz&nivel=intermedio"]});
  const router=createRouter({routeTree,history,context:{queryClient:new QueryClient()}});
  await router.load();
  render(<RouterProvider router={router}/>);
  const link=await screen.findByRole("link",{name:/Abrir laboratorio de funciones/i});
  fireEvent.click(link);
  await waitFor(()=>{
   expect(screen.getByRole("heading",{name:"Laboratorio de gráficas"})).toBeInTheDocument();
   expect(screen.getByRole("img",{name:/plano cartesiano con ejes/i})).toBeInTheDocument();
   expect(screen.getByRole("progressbar",{name:"Barra de avance"})).toHaveAttribute("aria-valuemax","10");
   expect(screen.queryByText("This page didn't load")).not.toBeInTheDocument();
  });
 });
});
