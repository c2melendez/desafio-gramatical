import {describe,expect,it,vi} from "vitest";
import {cleanup,fireEvent,render,screen,within} from "@testing-library/react";
import {GrammarClassification} from "@/components/games/GrammarActivities";
import {HOMO_CLASS} from "@/lib/grammar-m1-next-activities";
import {FIGURE_CLASS} from "@/lib/grammar-m1-literature";
describe("M1 clasificación: orden de etiquetas independiente de la clave",()=>{
 it.each([HOMO_CLASS[0],FIGURE_CLASS[10]])("valida todas las etiquetas de $id independientemente del orden visual",item=>{
  const onResult=vi.fn(),onNext=vi.fn();
  const view=render(<GrammarClassification key={item.id} item={item} onResult={onResult} onNext={onNext}/>);
  for(const part of item.items){
   const field=screen.getByText(part.text).closest("fieldset");
   expect(field).not.toBeNull();
   fireEvent.click(within(field!).getByRole("button",{name:part.label}));
  }
  fireEvent.click(screen.getByRole("button",{name:"Comprobar"}));
  expect(onResult).toHaveBeenCalledExactlyOnceWith(true);
  fireEvent.click(screen.getByRole("button",{name:"Continuar"}));
  expect(onNext).toHaveBeenCalledTimes(1);
  view.unmount();cleanup();
 });
});
