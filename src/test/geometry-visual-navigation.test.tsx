import {QueryClient} from "@tanstack/react-query";
import {createMemoryHistory,createRouter,RouterProvider} from "@tanstack/react-router";
import {afterEach,describe,expect,it} from "vitest";
import {cleanup,fireEvent,render,screen,waitFor} from "@testing-library/react";
import {routeTree} from "@/routeTree.gen";
afterEach(()=>cleanup());
describe("M1 laboratorio geométrico — integración con el selector",()=>{
 it("selecciona Geometría y accede a diez rondas sin pantalla global de error",async()=>{
  const history=createMemoryHistory({initialEntries:["/?area=matematicas&tema=Geometr%C3%ADa&subtema=%C3%81ngulos&modo=quiz&nivel=intermedio"]});
  const router=createRouter({routeTree,history,context:{queryClient:new QueryClient()}});
  await router.load();
  render(<RouterProvider router={router}/>);
  fireEvent.click(await screen.findByRole("link",{name:/Abrir laboratorio de geometría/i}));
  await waitFor(()=>{
   expect(screen.getByRole("heading",{name:"Laboratorio de geometría"})).toBeInTheDocument();
   expect(screen.getByRole("img",{name:/rectas horizontales|figura compuesta en L/i})).toBeInTheDocument();
   expect(screen.getByRole("progressbar",{name:"Barra de avance"})).toHaveAttribute("aria-valuemax","10");
   expect(screen.queryByText("This page didn't load")).not.toBeInTheDocument();
  });
 });
});
