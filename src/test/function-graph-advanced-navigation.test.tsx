import {QueryClient} from "@tanstack/react-query";
import {createMemoryHistory,createRouter,RouterProvider} from "@tanstack/react-router";
import {afterEach,describe,expect,it} from "vitest";
import {cleanup,fireEvent,render,screen,waitFor} from "@testing-library/react";
import {routeTree} from "@/routeTree.gen";
afterEach(()=>cleanup());
describe("Laboratorio gráfico II — navegación y contrato de sesión",()=>{
 it("el selector abre el juego avanzado sin pantalla de error, con diez rondas",async()=>{
  const history=createMemoryHistory({initialEntries:["/?area=matematicas&tema=%C3%81lgebra&subtema=Funciones&modo=quiz&nivel=intermedio"]});
  const router=createRouter({routeTree,history,context:{queryClient:new QueryClient()}});
  await router.load();
  render(<RouterProvider router={router}/>);
  fireEvent.click(await screen.findByRole("link",{name:/Laboratorio II: parábolas, extremos y discontinuidades/i}));
  await waitFor(()=>{
   expect(screen.getByRole("heading",{name:"Laboratorio de gráficas II"})).toBeInTheDocument();
   expect(screen.getByRole("img",{name:/plano cartesiano graduado/i})).toBeInTheDocument();
   expect(screen.getByRole("progressbar",{name:"Barra de avance"})).toHaveAttribute("aria-valuemax","10");
   expect(screen.queryByText("This page didn't load")).not.toBeInTheDocument();
  });
 });
});
