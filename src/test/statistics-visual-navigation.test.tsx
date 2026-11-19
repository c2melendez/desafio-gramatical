import {QueryClient} from "@tanstack/react-query";
import {createMemoryHistory,createRouter,RouterProvider} from "@tanstack/react-router";
import {afterEach,describe,expect,it} from "vitest";
import {cleanup,fireEvent,render,screen,waitFor} from "@testing-library/react";
import {routeTree} from "@/routeTree.gen";
afterEach(()=>cleanup());
describe("Estadística M1 — ruta y juego especializado",()=>{
 it("abre la nueva mecánica desde el menú con 10 rondas y sin error global",async()=>{
  const history=createMemoryHistory({initialEntries:["/?area=matematicas&tema=Estad%C3%ADstica+y+probabilidad&subtema=Tablas+y+gr%C3%A1ficas&modo=quiz&nivel=intermedio"]});
  const router=createRouter({routeTree,history,context:{queryClient:new QueryClient()}});
  await router.load();
  render(<RouterProvider router={router}/>);
  fireEvent.click(await screen.findByRole("link",{name:/Abrir laboratorio de estadística/i}));
  await waitFor(()=>{
   expect(screen.queryByRole("heading",{name:"Laboratorio de geometría"})).not.toBeInTheDocument();
   expect(screen.getByRole("heading",{name:"Laboratorio de estadística"})).toBeInTheDocument();
   expect(screen.getByRole("img")).toHaveAttribute("data-testid","statistics-visual");
   expect(screen.getByRole("progressbar",{name:"Barra de avance"})).toHaveAttribute("aria-valuemax","10");
   expect(screen.queryByText("This page didn't load")).not.toBeInTheDocument();
  });
 });
});
