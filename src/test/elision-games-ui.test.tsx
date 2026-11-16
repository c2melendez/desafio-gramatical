import {afterEach,describe,it,expect,vi} from "vitest";
import {render,fireEvent,screen,cleanup} from "@testing-library/react";
import {ErrorHunter,ConnectorGame,ExpertEditor} from "@/components/games/WritingGames";
import {ELISION_ERROR_CASES} from "@/lib/elision-error-cases";
import {ELISION_CHOICE_CASES} from "@/lib/elision-choice-cases";
import {ELISION_EDITOR_CASES} from "@/lib/elision-editor-cases";
afterEach(cleanup);
describe("Redacción: elisión y adición en los tres niveles",()=>{
 it.each(["principiante","intermedio","avanzado"] as const)("Cazador elige revisión sin perder información (%s)",level=>{
  const q=ELISION_ERROR_CASES.find(x=>x.level===level)!;const report=vi.fn();
  render(<ErrorHunter item={q} report={report} next={vi.fn()} isLast={false}/>);
  expect(screen.getByText(q.flawed)).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{name:q.correctConnector}));
  expect(report).toHaveBeenCalledWith(true,undefined);
  expect(screen.getByText("Revisión recomendada:")).toBeInTheDocument();
 });
 it.each(["principiante","intermedio","avanzado"] as const)("Revisión precisa explica las opciones incorrectas (%s)",level=>{
  const q=ELISION_CHOICE_CASES.find(x=>x.level===level)!;const report=vi.fn();
  render(<ConnectorGame item={q} report={report} next={vi.fn()} isLast={false}/>);
  expect(screen.getByRole("heading",{name:"Revisión precisa"})).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{name:q.options.find(x=>x!==q.connector)!}));
  expect(report).toHaveBeenCalledOnce();
  expect(report.mock.calls[0][0]).toBe(false);
  expect(report.mock.calls[0][1].correct).toBe(q.connector);
 });
 it.each(["principiante","intermedio","avanzado"] as const)("Editor revisa una secuencia lógica (%s)",level=>{
  const q=ELISION_EDITOR_CASES.find(x=>x.level===level)!;const report=vi.fn();
  render(<ExpertEditor item={q} report={report} next={vi.fn()} isLast={true}/>);
  for(const part of q.steps)fireEvent.click(screen.getByRole("button",{name:part}));
  fireEvent.click(screen.getByRole("button",{name:"Revisar párrafo"}));
  expect(report).toHaveBeenCalledWith(true,undefined);
  expect(report).toHaveBeenCalledOnce();
 });
});
