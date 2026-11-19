import type {Level} from "./grammar";
import {geometryCognitiveChallenge} from "./geometry-cognitive-challenges";
import type {CognitiveStage} from "./math-cognitive-progression";

/** Figuras nuevas y originales, basadas en habilidades presentes en la guía PRE-U UNAH 2026.
 * Ninguna pregunta ni diagrama oficial es reproducido literalmente. */
export type GeometrySkill="corresponding"|"supplementary"|"composite-area"|"composite-perimeter";
export const GEOMETRY_SKILLS:GeometrySkill[]=["corresponding","supplementary","composite-area","composite-perimeter"];
export const GEOMETRY_SKILL_NAMES:Record<GeometrySkill,string>={
 corresponding:"Ángulos correspondientes",supplementary:"Ángulos suplementarios",
 "composite-area":"Área de figura compuesta","composite-perimeter":"Perímetro de figura compuesta"};
export type ParallelFigure={kind:"parallel";degrees:number;parallel:true};
export type CompositeFigure={kind:"composite";width:number;height:number;cutWidth:number;cutHeight:number};
export type GeometryFigure=ParallelFigure|CompositeFigure;
export type GeometryTask={
 id:string;skill:GeometrySkill;level:Level;figure:GeometryFigure;
 cognitiveStage:CognitiveStage;operation:string;requiredEvidence:string[];
 prompt:string;options:string[];answerIndex:number;answer:string;explanation:string;
 visualRequirement:"essential";source:"practica-original-basada-en-competencias-phuma";
};
export function geometryFigure(index:number,level:Level,skill:GeometrySkill):GeometryFigure{
 if(!Number.isInteger(index)||index<0||index>=72)throw Error("Índice geométrico inválido");
 const variant=Math.floor(index/4),difficulty=level==="principiante"?0:level==="intermedio"?1:2;
 if(skill==="corresponding"||skill==="supplementary"){
  return {kind:"parallel",parallel:true,degrees:32+((variant*11+difficulty*9)%112)};
 }
 const width=8+(variant+difficulty)%7,height=7+(variant*2+difficulty)%6;
 const cutWidth=2+(variant*3+difficulty)%4,cutHeight=2+(variant+difficulty)%4;
 return {kind:"composite",width,height,cutWidth,cutHeight};
}
export function geometryOracle(figure:GeometryFigure,skill:GeometrySkill):number{
 if(figure.kind==="parallel"){
  if(skill==="corresponding")return figure.degrees;
  if(skill==="supplementary")return 180-figure.degrees;
 }else{
  if(skill==="composite-area")return figure.width*figure.height-figure.cutWidth*figure.cutHeight;
  if(skill==="composite-perimeter")return 2*(figure.width+figure.height);
 }
 throw Error("Incompatibilidad entre figura y habilidad");
}
const prompts:Record<GeometrySkill,string>={
 corresponding:"Las rectas L₁ y L₂ son paralelas. ¿Cuánto mide el ángulo señalado con ? en la posición correspondiente de la segunda intersección?",
 supplementary:"Las rectas L₁ y L₂ son paralelas. ¿Cuánto mide el ángulo ? adyacente al ángulo correspondiente del segundo cruce?",
 "composite-area":"La figura en L se obtiene al retirar el recorte superior derecho de un rectángulo. ¿Cuál es su área, en cm²?",
 "composite-perimeter":"La figura en L tiene las medidas indicadas. ¿Cuál es la longitud total de su contorno, en cm?"};
export function geometryTask(index:number,level:Level):GeometryTask{
 const skill=GEOMETRY_SKILLS[index%4],figure=geometryFigure(index,level,skill);
 const numeric=geometryOracle(figure,skill),unit=figure.kind==="parallel"?"°":skill==="composite-area"?" cm²":" cm";
 const challenge=geometryCognitiveChallenge(figure,skill,level);
 const answer=challenge?.answer??`${numeric}${unit}`;
 const variants=figure.kind==="parallel"?
  [numeric,180-numeric,numeric+10,Math.abs(numeric-10)]:
  [numeric,figure.width*figure.height,
   figure.width*figure.height+figure.cutWidth*figure.cutHeight,
   numeric+(skill==="composite-area"?figure.cutWidth*figure.cutHeight:2*figure.cutHeight)];
 const candidates=challenge?[answer,...challenge.distractors]:[answer,...variants.map(n=>`${n}${unit}`)];
 for(let n=1;n<12;n++)candidates.push(`${numeric+3*n}${unit}`);
 const options=[...new Set(candidates)].slice(0,4);
 if(options.length!==4)throw Error("No hay cuatro alternativas distintas");
 const offset=index%4,rotated=[...options.slice(offset),...options.slice(0,offset)];
 const basicExplanation=figure.kind==="parallel"
  ?skill==="corresponding"
   ?`El ángulo indicado arriba mide ${figure.degrees}°. Por el paralelismo, los ángulos correspondientes son congruentes. El segundo mide ${answer}.`
   :`El ángulo correspondiente mide ${figure.degrees}°. El ángulo adyacente es suplementario: 180° − ${figure.degrees}° = ${answer}.`
  :skill==="composite-area"
   ?`El rectángulo exterior mide ${figure.width} × ${figure.height} cm. Se retira un rectángulo de ${figure.cutWidth} × ${figure.cutHeight} cm: área = ${figure.width*figure.height} − ${figure.cutWidth*figure.cutHeight} = ${answer}.`
   :`En la figura en L, las longitudes horizontales del contorno suman 2 × ${figure.width} y las verticales 2 × ${figure.height}. Perímetro = 2(${figure.width}+${figure.height}) = ${answer}.`;
 return {id:`math-geom-v1-${level}-${index}`,skill,level,figure,prompt:challenge?.prompt??prompts[skill],
   answer,answerIndex:rotated.indexOf(answer),options:rotated,
   explanation:challenge?challenge.explanation+` Respuesta correcta: ${answer}.`:basicExplanation,
   cognitiveStage:challenge?.stage??1,operation:challenge?.operation??skill,
   requiredEvidence:challenge?.requiredEvidence??["leer-diagrama","aplicar-relacion-directa"],
   visualRequirement:"essential",source:"practica-original-basada-en-competencias-phuma"};
}
export function geometryPool(level:Level):GeometryTask[]{return Array.from({length:72},(_,i)=>geometryTask(i,level))}
