import {afterEach,describe,expect,it,vi} from "vitest";
import {cleanup,fireEvent,render,screen} from "@testing-library/react";
import {ErrorHunter,ConnectorGame,ExpertEditor} from "@/components/games/WritingGames";
import {CORRECTION_ERROR_CASES} from "@/lib/correction-error-cases";
import {CORRECTION_CHOICE_CASES} from "@/lib/correction-choice-cases";
import {CORRECTION_EDITOR_CASES} from "@/lib/correction-editor-cases";

afterEach(cleanup);
describe("Fase A · Corrección: interacción sin afectar juegos existentes",()=>{
 it.each(["principiante","intermedio","avanzado"] as const)("Cazador ofrece reemplazo y explicación (%s)",level=>{
  const q=CORRECTION_ERROR_CASES.find(x=>x.level===level)!;const report=vi.fn();
  render(<ErrorHunter item={q} report={report} next={vi.fn()} isLast={false}/>);
  expect(screen.getByText(q.flawed)).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{name:q.correctConnector}));
  expect(report).toHaveBeenCalledOnce();
  expect(report).toHaveBeenCalledWith(true,undefined);
  expect(screen.getByText(q.correctSentence)).toBeInTheDocument();
 });
 it.each(["principiante","intermedio","avanzado"] as const)("Corrección precisa valida selección y explicación (%s)",level=>{
  const q=CORRECTION_CHOICE_CASES.find(x=>x.level===level)!;const report=vi.fn();
  render(<ConnectorGame item={q} report={report} next={vi.fn()} isLast={false}/>);
  expect(screen.getByText("Corrección precisa")).toBeInTheDocument();
  const incorrect=q.options.find(x=>x!==q.connector)!;
  fireEvent.click(screen.getByRole("button",{name:incorrect}));
  expect(report).toHaveBeenCalledOnce();
  expect(report.mock.calls[0][0]).toBe(false);
  expect(report.mock.calls[0][1].correct).toBe(q.connector);
 });
 it.each(["principiante","intermedio","avanzado"] as const)("Editor ordena revisión del texto (%s)",level=>{
  const q=CORRECTION_EDITOR_CASES.find(x=>x.level===level)!;const report=vi.fn();
  render(<ExpertEditor item={q} report={report} next={vi.fn()} isLast={true}/>);
  for(const part of q.steps)fireEvent.click(screen.getByRole("button",{name:part}));
  fireEvent.click(screen.getByRole("button",{name:"Revisar párrafo"}));
  expect(report).toHaveBeenCalledOnce();
  expect(report).toHaveBeenCalledWith(true,undefined);
 });
});
