import {QueryClient} from "@tanstack/react-query";
import {createMemoryHistory,createRouter,RouterProvider} from "@tanstack/react-router";
import {afterEach,describe,expect,it} from "vitest";
import {cleanup,fireEvent,render,screen,waitFor} from "@testing-library/react";
import {routeTree} from "@/routeTree.gen";
afterEach(()=>cleanup());
describe("M1 Estadística II — navegación y contrato",()=>{
 it("abre juego independiente desde el selector en 10 rondas",async()=>{
  const history=createMemoryHistory({initialEntries:["/?area=matematicas&tema=Estad%C3%ADstica+y+probabilidad&subtema=Dispersi%C3%B3n+de+datos&modo=quiz&nivel=intermedio"]});
  const router=createRouter({routeTree,history,context:{queryClient:new QueryClient()}});
  await router.load();
  render(<RouterProvider router={router}/>);
  fireEvent.click(await screen.findByRole("link",{name:/Laboratorio II: dispersión, sectores y tablas cruzadas/i}));
  await waitFor(()=>{
   expect(screen.getByRole("heading",{name:"Laboratorio de estadística II"})).toBeInTheDocument();
   expect(screen.getByRole("progressbar",{name:"Barra de avance"})).toHaveAttribute("aria-valuemax","10");
   expect(screen.queryByText("This page didn't load")).not.toBeInTheDocument();
   expect(screen.getByTestId("statistics-advanced-visual")).toBeInTheDocument();
  });
 });
});
