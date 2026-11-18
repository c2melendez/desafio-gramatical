import {QueryClient} from "@tanstack/react-query";
import {createMemoryHistory,createRouter,RouterProvider} from "@tanstack/react-router";
import {afterEach,describe,expect,it} from "vitest";
import {cleanup,fireEvent,render,screen,waitFor} from "@testing-library/react";
import {routeTree} from "@/routeTree.gen";

afterEach(()=>cleanup());

describe("Selección de área sin excepción de ruta",()=>{
 it("cambia Español → Matemáticas → Español sin error global y mantiene subtema coherente",async()=>{
  const history=createMemoryHistory({initialEntries:["/?area=espanol&tema=Comprensi%C3%B3n+lectora&subtema=Idea+principal&modo=clasificar&nivel=principiante"]});
  const router=createRouter({routeTree,history,context:{queryClient:new QueryClient()}});
  await router.load();
  render(<RouterProvider router={router}/>);
  fireEvent.click(await screen.findByRole("button",{name:/Matemáticas/}));
  await waitFor(()=>{
   expect(screen.queryByText("This page didn't load")).not.toBeInTheDocument();
   expect(screen.getByRole("combobox",{name:"Tema de estudio"})).toHaveValue("Aritmética");
   expect(screen.getByRole("combobox",{name:"Subtema de estudio"})).toHaveValue("Operaciones");
   expect(screen.getAllByText("Ordena los números").length).toBeGreaterThan(0);
  });
  fireEvent.click(screen.getByRole("button",{name:/Comunicación y Español/}));
  expect(screen.getByRole("combobox",{name:"Tema de estudio"})).toHaveValue("Comprensión lectora");
  expect(screen.getByRole("combobox",{name:"Subtema de estudio"})).toHaveValue("Idea principal");
 });
});
