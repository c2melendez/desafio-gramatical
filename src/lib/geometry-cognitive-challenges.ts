import type {Level} from "./grammar";
import type {GeometryFigure,GeometrySkill} from "./geometry-visual-lab";
import type {CognitiveChallenge} from "./math-cognitive-progression";

/** Original diagram-dependent problems. The given drawing always represents
 * the original geometric object, and any hypothetical change is in the prompt. */
const fmt=(n:number)=>String(Number(n.toFixed(3)));
const angle=(n:number)=>fmt(n)+"°";
const area=(n:number)=>fmt(n)+" cm²";
const perimeter=(n:number)=>fmt(n)+" cm";

export function geometryCognitiveChallenge(
 figure:GeometryFigure,skill:GeometrySkill,level:Level
):CognitiveChallenge|null{
 if(level==="principiante")return null;
 const hard=level==="avanzado",stage:2|3=hard?3:2;
 const requiredEvidence=hard?
  ["leer-diagrama","reconocer-relaciones","combinar-condiciones","verificar-unidades"]:
  ["leer-diagrama","establecer-relacion","resolver-operacion"];
 if(figure.kind==="parallel"){
  const theta=figure.degrees, supplement=180-theta;
  if(skill==="corresponding"){
   if(!hard){
    const answer=angle(theta/2);
    return {stage,operation:"correspondientes-y-bisectriz",
     requiredEvidence,prompt:"En L₂, el ángulo correspondiente al indicado se divide mediante una bisectriz. ¿Cuánto mide cada una de las dos partes?",
     answer,distractors:[angle(theta),angle(supplement/2),angle(supplement),angle(theta/3)],
     explanation:`Por las rectas paralelas, el ángulo correspondiente mide ${theta}°. Una bisectriz lo divide en dos ángulos de ${answer}.`};
   }
   const answer=angle(Math.abs(theta-supplement/2));
   return {stage,operation:"correspondientes-suplementarios-y-bisectriz",
    requiredEvidence,prompt:"En el cruce con L₂ se biseca el ángulo suplementario al correspondiente. ¿Cuál es la diferencia absoluta entre el ángulo correspondiente completo y una de esas mitades?",
    answer,distractors:[angle(theta),angle(theta/2),angle(supplement/2),angle(Math.abs(theta-supplement))],
    explanation:`El correspondiente mide ${theta}°. El suplementario mide ${supplement}°; su mitad es ${angle(supplement/2)}. La diferencia absoluta es ${answer}.`};
  }
  if(skill==="supplementary"){
   if(!hard){
    const answer=angle(supplement/2);
    return {stage,operation:"suplementarios-y-bisectriz",requiredEvidence,
     prompt:"¿Cuánto mide cada parte si se biseca el ángulo suplementario al correspondiente del segundo cruce?",
     answer,distractors:[angle(theta),angle(supplement),angle(theta/2),angle(supplement/3)],
     explanation:`El ángulo suplementario mide 180° − ${theta}° = ${supplement}°. La bisectriz lo divide en dos partes de ${answer}.`};
   }
   const answer=angle(Math.abs(theta-supplement/2));
   return {stage,operation:"relacion-suplementaria-con-comparacion",requiredEvidence,
    prompt:"Después de bisecar el ángulo suplementario al correspondiente en L₂, ¿cuál es la diferencia absoluta entre una de sus mitades y el ángulo correspondiente?",
    answer,distractors:[angle(supplement),angle(theta/2),angle(Math.abs(theta-supplement)),angle(supplement/2)],
    explanation:`El ángulo correspondiente es ${theta}°; el suplementario es ${supplement}° y su bisectriz produce ${angle(supplement/2)}. La diferencia absoluta solicitada es ${answer}.`};
  }
 }
 if(figure.kind==="composite"){
  const {width:W,height:H,cutWidth:w,cutHeight:h}=figure;
  const originalArea=W*H-w*h,originalPerimeter=2*(W+H);
  if(skill==="composite-area"){
   if(!hard){
    const answer=area(4*originalArea);
    return {stage,operation:"area-compuesta-y-escala-bidimensional",
     requiredEvidence,prompt:"Se construye una figura semejante a la dibujada, duplicando todas sus longitudes (incluido el recorte). ¿Cuál es el área de la nueva figura?",
     answer,distractors:[area(2*originalArea),area(originalArea),area(4*W*H),area(4*originalArea+4)],
     explanation:`El área original es ${W}×${H} − ${w}×${h} = ${originalArea} cm². Duplicar ambas dimensiones multiplica las áreas por 2²=4; nueva área = ${answer}.`};
   }
   const answer=area((W+2)*(H+1)-(w+1)*(h+1));
   return {stage,operation:"area-compuesta-cambio-de-dos-regiones",
    requiredEvidence,prompt:"En una nueva figura en L, el rectángulo exterior mide 2 cm más de ancho y 1 cm más de alto. El recorte mide 1 cm más en cada dimensión. ¿Cuál es el área nueva?",
    answer,distractors:[area(originalArea),area((W+2)*(H+1)-w*h),area(W*H-(w+1)*(h+1)),area((W+2)*(H+1))],
    explanation:`El nuevo rectángulo mide ${W+2}×${H+1} y el recorte ${w+1}×${h+1}. La diferencia es ${answer}.`};
  }
  if(skill==="composite-perimeter"){
   if(!hard){
    const answer=perimeter(2*(W+1+H));
    return {stage,operation:"perimetro-compuesto-con-cambio-de-anchura",
     requiredEvidence,prompt:"El ancho exterior de esta figura aumenta 1 cm, sin modificar la altura; el recorte continúa en la esquina superior derecha. ¿Cuál es su nuevo perímetro?",
     answer,distractors:[perimeter(originalPerimeter),perimeter(originalPerimeter+1),perimeter(originalPerimeter+2*h),perimeter(2*(W+H+1+w))],
     explanation:`Para esta L, las partes horizontales suman dos veces el ancho exterior y las verticales dos veces la altura. Perímetro nuevo = 2(${W+1}+${H}) = ${answer}.`};
   }
   const answer=perimeter(2*(W+2+H+3));
   return {stage,operation:"perimetro-transformacion-con-invarianza-del-recorte",
    requiredEvidence,prompt:"Se crea otra figura en L: el ancho exterior aumenta 2 cm, la altura exterior 3 cm y el recorte se hace 1 cm más ancho y 1 cm más alto. ¿Cuál es su nuevo perímetro?",
    answer,distractors:[perimeter(originalPerimeter),perimeter(originalPerimeter+2+3),perimeter(2*(W+2+H+3+w+1)),perimeter(2*(W+2+H+3)-2*(w+1))],
    explanation:`El contorno escalonado suma dos veces cada dimensión exterior y los cambios del recorte se compensan en sus tramos. Nuevo perímetro = 2(${W+2}+${H+3}) = ${answer}.`};
  }
 }
 throw Error("Competencia no compatible con la figura");
}
