import {afterEach,describe,expect,it,vi} from "vitest";
import {render,fireEvent,screen,cleanup} from "@testing-library/react";
import {ErrorHunter,ConnectorGame,ExpertEditor} from "@/components/games/WritingGames";
import {GENERALIZATION_ERROR_CASES} from "@/lib/generalization-error-cases";
import {GENERALIZATION_CHOICE_CASES} from "@/lib/generalization-choice-cases";
import {GENERALIZATION_EDITOR_CASES} from "@/lib/generalization-editor-cases";
afterEach(cleanup);
describe("Fase A: generalización e integración — interacción",()=>{
 it.each(["principiante","intermedio","avanzado"] as const)("Cazador restringe las conclusiones a los datos (%s)",level=>{
  const q=GENERALIZATION_ERROR_CASES.find(x=>x.level===level)!;const report=vi.fn();
  render(<ErrorHunter item={q} report={report} next={vi.fn()} isLast={false}/>);
  expect(screen.getByText(q.flawed)).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{name:q.correctConnector}));
  expect(report).toHaveBeenCalledOnce();
  expect(report).toHaveBeenCalledWith(true,undefined);
  expect(screen.getByText("Revisión recomendada:")).toBeInTheDocument();
 });
 it.each(["principiante","intermedio","avanzado"] as const)("Conclusión sustentada documenta errores (%s)",level=>{
  const q=GENERALIZATION_CHOICE_CASES.find(x=>x.level===level)!;const report=vi.fn();
  render(<ConnectorGame item={q} report={report} next={vi.fn()} isLast={false}/>);
  expect(screen.getByRole("heading",{name:"Conclusión sustentada"})).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{name:q.options.find(x=>x!==q.connector)!}));
  expect(report).toHaveBeenCalledOnce();
  expect(report.mock.calls[0][0]).toBe(false);
  expect(report.mock.calls[0][1].correct).toBe(q.connector);
 });
 it.each(["principiante","intermedio","avanzado"] as const)("Editor organiza observación, contraste y cierre (%s)",level=>{
  const q=GENERALIZATION_EDITOR_CASES.find(x=>x.level===level)!;const report=vi.fn();
  render(<ExpertEditor item={q} report={report} next={vi.fn()} isLast={true}/>);
  for(const step of q.steps)fireEvent.click(screen.getByRole("button",{name:step}));
  fireEvent.click(screen.getByRole("button",{name:"Revisar párrafo"}));
  expect(report).toHaveBeenCalledOnce();
  expect(report).toHaveBeenCalledWith(true,undefined);
 });
});
