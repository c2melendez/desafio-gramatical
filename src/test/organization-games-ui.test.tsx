import {afterEach,describe,expect,it,vi} from "vitest";
import {cleanup,fireEvent,render,screen} from "@testing-library/react";
import {ErrorHunter,ConnectorGame,ExpertEditor} from "@/components/games/WritingGames";
import {ORGANIZATION_ERROR_CASES} from "@/lib/organization-error-cases";
import {ORGANIZATION_CHOICE_CASES} from "@/lib/organization-choice-cases";
import {ORGANIZATION_EDITOR_CASES} from "@/lib/organization-editor-cases";

afterEach(cleanup);
describe("Fase A · Organización textual: tres juegos y niveles",()=>{
 it.each(["principiante","intermedio","avanzado"] as const)("Cazador de errores elige reparación editorial (%s)",level=>{
  const q=ORGANIZATION_ERROR_CASES.find(x=>x.level===level)!;const report=vi.fn();
  render(<ErrorHunter item={q} report={report} next={vi.fn()} isLast={false}/>);
  expect(screen.getByText(q.flawed)).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{name:q.correctConnector}));
  expect(report).toHaveBeenCalledOnce();
  expect(report).toHaveBeenCalledWith(true,undefined);
  expect(screen.getByText("Revisión recomendada:")).toBeInTheDocument();
  expect(screen.getAllByText(q.correctSentence).length).toBeGreaterThanOrEqual(2);
 });
 it.each(["principiante","intermedio","avanzado"] as const)("Continúa el texto verifica opción incorrecta y explicación (%s)",level=>{
  const q=ORGANIZATION_CHOICE_CASES.find(x=>x.level===level)!;const report=vi.fn();
  render(<ConnectorGame item={q} report={report} next={vi.fn()} isLast={false}/>);
  expect(screen.getByRole("heading",{name:"Continúa el texto"})).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{name:q.options.find(x=>x!==q.connector)!}));
  expect(report).toHaveBeenCalledOnce();
  expect(report.mock.calls[0][0]).toBe(false);
  expect(report.mock.calls[0][1].correct).toBe(q.connector);
 });
 it.each(["principiante","intermedio","avanzado"] as const)("Editor ordena textos originales (%s)",level=>{
  const q=ORGANIZATION_EDITOR_CASES.find(x=>x.level===level)!;const report=vi.fn();
  render(<ExpertEditor item={q} report={report} next={vi.fn()} isLast={false}/>);
  for(const part of q.steps)fireEvent.click(screen.getByRole("button",{name:part}));
  fireEvent.click(screen.getByRole("button",{name:"Revisar párrafo"}));
  expect(report).toHaveBeenCalledWith(true,undefined);
  expect(report).toHaveBeenCalledOnce();
 });
});
