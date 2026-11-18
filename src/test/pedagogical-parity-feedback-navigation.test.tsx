import {afterEach,describe,expect,it,vi} from "vitest";
import {cleanup,render,screen,fireEvent} from "@testing-library/react";
import {AREAS} from "@/lib/phuma-catalog";
import {conceptRule,learningDescription,studyReturn} from "@/lib/study-context";
import {LearningFeedback} from "@/components/games/LearningFeedback";
import {GameSessionHeader} from "@/components/games/GameSessionHeader";
vi.mock("@tanstack/react-router",()=>({
 Link:({children,search}:{children:React.ReactNode;search?:unknown})=><a href="/" data-selection={JSON.stringify(search)}>{children}</a>,
}));
afterEach(()=>{cleanup();vi.restoreAllMocks();});
describe("Paridad pedagógica y navegación contextual universal",()=>{
 it("explica la competencia para cada área, tema y subtema",()=>{
  for(const area of AREAS)for(const topic of area.topics)for(const sub of topic.subtopics){
   const text=learningDescription(area.id,topic.name,sub);
   expect(text.length,`${area.id}/${topic.name}/${sub}`).toBeGreaterThan(55);
   expect(text).not.toMatch(/módulo disponible|ampliación m2|en desarrollo/i);
   expect(conceptRule(sub).length).toBeGreaterThan(55);
  }
 });
 it("el error presenta elección, solución, regla y causa con paleta original",()=>{
  const explanation="El conector adversativo marca un contraste explícito entre las dos proposiciones.";
  render(<LearningFeedback correct={false} subtopic="Conectores"
   selected="por lo tanto" expected="sin embargo" explanation={explanation}/>);
  const feedback=screen.getByTestId("learning-feedback");
  expect(feedback).toHaveClass("bg-destructive-soft");
  expect(screen.getByText("por lo tanto")).toBeInTheDocument();
  expect(screen.getByText("sin embargo")).toBeInTheDocument();
  expect(screen.getByText(explanation)).toBeInTheDocument();
  expect(screen.getByText("Concepto o regla:")).toBeInTheDocument();
  expect(screen.getByText("¿Por qué no es correcta?")).toBeInTheDocument();
 });
 it("incluso el acierto explica la regla aplicable",()=>{
  render(<LearningFeedback correct subtopic="Inferencias" expected="La hipótesis es probable"
   explanation="El texto aporta dos indicios que sostienen esta hipótesis."/>);
  expect(screen.getByTestId("learning-feedback")).toHaveClass("bg-success-soft");
  expect(screen.getByText(/Una inferencia válida/)).toBeInTheDocument();
 });
 it("Salir recupera la selección original en vez del menú predeterminado",()=>{
  const selection=studyReturn("Comprensión lectora","Inferencias","construir","avanzado");
  const restart=vi.fn();
  vi.spyOn(window,"confirm").mockReturnValue(true);
  render(<GameSessionHeader context="Inferencias · Avanzado" title="Reconstruye el texto" round={3} score={20} streak={2}
   onRestart={restart} returnTo={selection}/>);
  const link=screen.getByRole("link",{name:/Salir/});
  expect(JSON.parse(link.getAttribute("data-selection")!)).toEqual(selection);
  expect(link).toHaveTextContent("Salir");
  fireEvent.click(screen.getByRole("button",{name:"Reiniciar"}));
  expect(restart).toHaveBeenCalledOnce();
 });
});
