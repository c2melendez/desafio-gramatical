import {afterEach,describe,expect,it,vi} from "vitest";
import {cleanup,fireEvent,render,screen} from "@testing-library/react";
import {mathPool,mathModel,mathTopic,MATH_LEVELS,MATH_MODES} from "@/lib/math-m1";
import {REMAINING_MATH_SUBTOPICS,remainingMathPedagogy} from "@/lib/math-m1-core-remaining";
import {visualAnswer,type MathVisual} from "@/lib/math-visual";
import {MathExerciseCard} from "@/components/games/MathExerciseCard";
afterEach(()=>{cleanup();vi.restoreAllMocks();});
const gcd=(aa:number,bb:number):number=>{let a=Math.abs(aa),b=Math.abs(bb);while(b){const m=a%b;a=b;b=m;}return a||1;};
const equivalent=(n:number,d=1):string=>{const k=gcd(n,d);return d/k===1?String(n/k):n/k+"/"+(d/k);};
function oracle(kind:string,x:number[]):string{
 switch(kind){
  case "Áreas y perímetros":return equivalent(x[2]?x[0]*x[1]:2*(x[0]+x[1]));
  case "Ángulos":return equivalent(180-x[0]-x[1]);
  case "Pitágoras":return equivalent(Math.sqrt(x[0]**2+x[1]**2));
  case "Pitágoras-perímetro":return equivalent(Math.sqrt(x[0]**2+x[1]**2)+x[0]+x[1]);
  case "Sólidos: área y volumen":return equivalent(x[3]?x[0]*x[1]*x[2]:2*(x[0]*x[1]+x[0]*x[2]+x[1]*x[2]));
  case "Semejanza":return equivalent(x[1]*x[2],x[0]);
  case "Promedios":return equivalent(x[0]+x[1]+x[2],3);
  case "Probabilidad":return equivalent(x[0],x[0]+x[1]);
  case "Dispersión de datos":return equivalent(x[2]-x[0]);
  case "Tablas y gráficas":return equivalent(x[0]+x[1]+x[2]);
  case "bar-balance":return equivalent(x[0]+x[1]-x[2]);
  case "Sucesiones":return equivalent(x[0]+3*x[1]);
  case "Sucesiones-quinto":return equivalent(x[0]+4*x[1]);
  case "Sucesiones-diferencia":return equivalent(4*x[1]);
  default:throw Error("Falta oráculo: "+kind);
 }
}
function mutate(v:MathVisual):MathVisual{
 switch(v.kind){
  case "triangle-angles":return {...v,beta:v.beta+1};
  case "right-triangle":return {...v,legB:v.legB+1};
  case "bar-chart":return {...v,tuesday:v.tuesday+1};
  case "rectangle":return {...v,length:v.length+1};
  case "prism":return {...v,height:v.height+1};
  case "similar-triangles":return {...v,large:v.large+1};
  default:throw Error("figura no auditada");
 }
}
describe("M1: cierre de diez subtemas geométricos, estadísticos y sucesiones",()=>{
 it("1350 identificadores, 10 competencias, 3 modos, 3 niveles y oráculos independientes",()=>{
  const ids=new Set<string>();
  for(const subtopic of REMAINING_MATH_SUBTOPICS)for(const mode of MATH_MODES)for(const level of MATH_LEVELS){
   const tasks=mathPool(mathTopic(subtopic),subtopic,level,mode);
   expect(tasks.length).toBe(level==="principiante"?10:level==="intermedio"?15:20);
   for(const t of tasks){
    expect(ids.has(t.id)).toBe(false);ids.add(t.id);
    expect(t.cognitiveStage).toBe(level==="principiante"?1:level==="intermedio"?2:3);
    expect(t.requiredEvidence).toHaveLength(level==="principiante"?2:level==="intermedio"?3:4);
    expect(t.modeOperation).toBe(mode==="clasificar"?"evaluar-validez-de-inferencias":mode==="quiz"?"resolver-transformacion-algebraica":"construir-evidencia-y-resultado");
    expect(t.expected).toBe(oracle(t.oracle.kind,t.oracle.inputs));
    expect(t.options).toHaveLength(4);
    expect(new Set(t.options).size).toBe(4);
    expect(t.options[t.answerIndex]).toBe(t.expected);
    expect(t.assertions).toHaveLength(3);
    expect(t.assertions.filter(a=>a.truth)).toHaveLength(1);
    expect(new Set(t.assertions.map(a=>a.text)).size).toBe(3);
    expect(t.steps).toHaveLength(2);
    expect(t.steps[0].choices[t.steps[0].answerIndex]).toBe(equivalent(t.oracle.intermediate.n,t.oracle.intermediate.d));
    expect(t.steps[1].choices[t.steps[1].answerIndex]).toBe(t.expected);
    expect(t.explanation).toContain(t.expected);
    if(t.visual){
     expect(visualAnswer(t.visual)).toBe(t.oracle.answer.n/t.oracle.answer.d);
     expect(visualAnswer(mutate(t.visual))).not.toBe(t.oracle.answer.n/t.oracle.answer.d);
     expect(t.visualRequirement).toBe("essential");
     expect(t.visual.stage).toBe(t.cognitiveStage);
    }
   }
  }
  expect(ids.size).toBe(1350);
 });
 it("diez destrezas tienen tres operaciones y tres enunciados distintos",()=>{
  for(const subtopic of REMAINING_MATH_SUBTOPICS){
   const items=MATH_LEVELS.map(level=>mathPool(mathTopic(subtopic),subtopic,level,"quiz")[0]);
   expect(items.map(t=>t.cognitiveStage)).toEqual([1,2,3]);
   expect(new Set(items.map(t=>t.operation)).size).toBe(3);
   expect(new Set(items.map(t=>t.prompt)).size).toBe(3);
  }
 });
 it("geometría: cambios de dimensiones, compensación angular, perímetro pitagórico",()=>{
  expect(remainingMathPedagogy("Áreas y perímetros","avanzado",[6,4,1])?.result.n).toBe(54);
  expect(remainingMathPedagogy("Áreas y perímetros","avanzado",[6,4,0])?.result.n).toBe(30);
  expect(remainingMathPedagogy("Ángulos","intermedio",[65,45])?.result.n).toBe(76);
  expect(remainingMathPedagogy("Ángulos","avanzado",[65,45])?.result.n).toBe(80);
  const p=remainingMathPedagogy("Pitágoras","avanzado",[3,4])!;
  expect(p.kind).toBe("Pitágoras-perímetro");
  expect(p.result.n).toBe(24);
  expect(remainingMathPedagogy("Sólidos: área y volumen","intermedio",[3,4,5,1])?.result.n).toBe(72);
  expect(remainingMathPedagogy("Semejanza","avanzado",[3,12,5])?.result.n).toBe(35);
 });
 it("estadística: cambios de base, filtro, balance firmado y probabilidad",()=>{
  expect(remainingMathPedagogy("Promedios","avanzado",[6,9,12])?.result.n).toBe(11);
  expect(remainingMathPedagogy("Probabilidad","avanzado",[3,5])?.result).toEqual({n:2,d:10});
  expect(remainingMathPedagogy("Dispersión de datos","avanzado",[2,5,11])?.result.n).toBe(11);
  const b=remainingMathPedagogy("Tablas y gráficas","intermedio",[4,7,15])!;
  expect(b.kind).toBe("bar-balance");
  expect(b.result.n).toBe(-4);
  expect(remainingMathPedagogy("Tablas y gráficas","avanzado",[4,7,15])?.result.n).toBe(-7);
 });
 it("sucesiones: valor del quinto término frente a diferencia de índices",()=>{
  expect(remainingMathPedagogy("Sucesiones","principiante",[3,4])?.result.n).toBe(15);
  expect(remainingMathPedagogy("Sucesiones","intermedio",[3,4])?.result.n).toBe(19);
  const a=remainingMathPedagogy("Sucesiones","avanzado",[3,4])!;
  expect(a.kind).toBe("Sucesiones-diferencia");
  expect(a.result.n).toBe(16);
 });
 it("Clasificar verifica razonamientos y Construir exige dos decisiones",()=>{
  for(const subtopic of REMAINING_MATH_SUBTOPICS){
   const topic=mathTopic(subtopic);
   const c=mathModel(topic,subtopic,"avanzado","clasificar",1),onC=vi.fn();
   render(<MathExerciseCard item={c} onResult={onC} onNext={vi.fn()} isLast={false}/>);
   for(const a of c.assertions)fireEvent.click(screen.getByRole("button",{name:a.truth?"Verdadero":"Falso"}));
   expect(onC).toHaveBeenCalledWith(true,expect.any(String));
   cleanup();
   const b=mathModel(topic,subtopic,"intermedio","construir",1),onB=vi.fn();
   render(<MathExerciseCard item={b} onResult={onB} onNext={vi.fn()} isLast={false}/>);
   for(const step of b.steps)fireEvent.click(screen.getByRole("button",{name:step.choices[step.answerIndex]}));
   expect(onB).toHaveBeenCalledWith(true,expect.any(String));
   cleanup();
  }
 });
});
