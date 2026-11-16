import {afterEach,describe,expect,it,vi} from "vitest";
import {cleanup,fireEvent,render,screen} from "@testing-library/react";
import {ErrorHunter,ExpertEditor} from "@/components/games/WritingGames";
import {CONNECTOR_ERROR_CASES} from "@/lib/connector-error-cases";
import {CONNECTOR_EDITOR_CASES} from "@/lib/connector-editor-cases";

afterEach(cleanup);
describe("Interacción real en juegos nuevos de Conectores",()=>{
 it.each(["principiante","intermedio","avanzado"] as const)("Cazador corrige un enlace incorrecto (%s)",level=>{
  const item=CONNECTOR_ERROR_CASES.find(x=>x.level===level)!;
  const report=vi.fn(),next=vi.fn();
  render(<ErrorHunter item={item} report={report} next={next} isLast={false}/>);
  expect(screen.getByText(item.flawed)).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{name:item.correctConnector}));
  expect(report).toHaveBeenCalledTimes(1);
  expect(report).toHaveBeenCalledWith(true,undefined);
  expect(screen.getByText(item.correctSentence)).toBeInTheDocument();
 });
 it.each(["principiante","intermedio","avanzado"] as const)("Cazador explica la opción incorrecta (%s)",level=>{
  const item=CONNECTOR_ERROR_CASES.find(x=>x.level===level)!;
  const wrong=item.options.find(x=>x!==item.correctConnector)!;
  const report=vi.fn();
  render(<ErrorHunter item={item} report={report} next={vi.fn()} isLast={false}/>);
  fireEvent.click(screen.getByRole("button",{name:wrong}));
  expect(report).toHaveBeenCalledTimes(1);
  expect(report.mock.calls[0][0]).toBe(false);
  expect(report.mock.calls[0][1].correct).toBe(item.correctConnector);
 });
 it.each(["principiante","intermedio","avanzado"] as const)("Editor admite la secuencia validada (%s)",level=>{
  const item=CONNECTOR_EDITOR_CASES.find(x=>x.level===level)!;
  const report=vi.fn();
  render(<ExpertEditor item={item} report={report} next={vi.fn()} isLast={true}/>);
  for(const part of item.steps)fireEvent.click(screen.getByRole("button",{name:part}));
  fireEvent.click(screen.getByRole("button",{name:"Revisar párrafo"}));
  expect(report).toHaveBeenCalledTimes(1);
  expect(report).toHaveBeenCalledWith(true,undefined);
  expect(screen.getByText(/Párrafo coherente/)).toBeInTheDocument();
 });
});
