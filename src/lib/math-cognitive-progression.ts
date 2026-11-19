import type {Level} from "./grammar";
import type {Stats2Skill,Stats2Stimulus} from "./statistics-visual-advanced";

/** Cross-parameter cognitive demands: each advanced task requires extra
 * interpretation beyond reading one value or doing the original operation.
 * The declared stage is auditable; it is not psychometric validation. */
export type CognitiveStage=1|2|3;
export type CognitiveChallenge={
 stage:CognitiveStage;operation:string;requiredEvidence:string[];
 prompt:string;answer:string;distractors:string[];explanation:string;
};
const fmt=(n:number)=>Number.isInteger(n)?String(n):n.toFixed(1);
function median(a:number[]):number{
 const s=[...a].sort((x,y)=>x-y);
 return (s[3]+s[4])/2;
}
function quartiles(a:number[]):[number,number]{
 const s=[...a].sort((x,y)=>x-y);
 return [(s[1]+s[2])/2,(s[5]+s[6])/2];
}
const pct=(numerator:number,denominator:number)=>fmt(100*numerator/denominator)+"%";
const pp=(n:number)=>fmt(n)+" puntos porcentuales";

export function cognitiveChallenge(s:Stats2Stimulus,skill:Stats2Skill,level:Level):CognitiveChallenge|null{
 if(level==="principiante")return null;
 const stage:CognitiveStage=level==="intermedio"?2:3;
 if(s.kind==="dots"){
  const [[q1a,q3a],[q1b,q3b]]=s.groups.map(quartiles);
  const ia=q3a-q1a,ib=q3b-q1b;
  if(skill==="quartile-range"){
   if(stage===2)return {stage,operation:"comparar-dos-cuartiles",requiredEvidence:["leer-ambos-grupos","calcular-dos-IQR","restar-IQR"],
    prompt:"¿Por cuántos puntos supera el rango intercuartílico del Grupo A al del Grupo B? Calcula ambos rangos a partir del diagrama.",
    answer:fmt(ia-ib)+" puntos",distractors:[fmt(ia)+" puntos",fmt(ib)+" puntos",fmt(ia+ib)+" puntos"],
    explanation:`IQR A = ${fmt(ia)}, IQR B = ${fmt(ib)}; diferencia = ${fmt(ia-ib)} puntos.`};
   const ratio=100*(ia-ib)/ib;
   return {stage,operation:"comparacion-relativa-de-dispersion",requiredEvidence:["leer-ambos-grupos","calcular-dos-IQR","normalizar-por-referencia","interpretar-porcentaje"],
    prompt:"Tomando el IQR del Grupo B como referencia, ¿en qué porcentaje lo supera el IQR del Grupo A?",
    answer:pct(ia-ib,ib),distractors:[pct(ia,ib),pct(ia-ib,ia),pct(ib,ia),fmt(ratio+10)+"%"],
    explanation:`IQR A = ${fmt(ia)}, IQR B = ${fmt(ib)}. Incremento relativo = (${fmt(ia)} − ${fmt(ib)}) ÷ ${fmt(ib)} × 100 = ${pct(ia-ib,ib)}.`};
  }
  if(skill==="compare-spread"){
   if(stage===2)return {stage,operation:"cuantificar-diferencia-de-dispersion",requiredEvidence:["leer-ambos-grupos","calcular-dos-IQR","comparar-resultados"],
    prompt:"¿Cuál es la diferencia absoluta entre los rangos intercuartílicos de ambos grupos?",
    answer:fmt(Math.abs(ia-ib))+" puntos",distractors:[fmt(ia)+" puntos",fmt(ib)+" puntos",fmt(ia+ib)+" puntos"],
    explanation:`Los IQR son ${fmt(ia)} y ${fmt(ib)}. Su diferencia absoluta es ${fmt(Math.abs(ia-ib))} puntos.`};
   const transformed=ib*2;
   const winner=ia>transformed?"Grupo A":ia<transformed?"Grupo B":"Igual dispersión";
   return {stage,operation:"modelar-transformacion-de-escala",requiredEvidence:["leer-ambos-grupos","calcular-dos-IQR","aplicar-factor-de-escala","comparar-distribuciones"],
    prompt:"Si se duplican todas las puntuaciones del Grupo B, ¿qué grupo tendrá mayor rango intercuartílico?",
    answer:winner,distractors:["Grupo A","Grupo B","Igual dispersión","No se puede determinar"],
    explanation:`Al multiplicar todas las observaciones del Grupo B por 2, su IQR también se multiplica por 2: ${fmt(ib)} × 2 = ${fmt(transformed)}. El IQR de A permanece en ${fmt(ia)}; resultado: ${winner}.`};
  }
 }
 if(s.kind==="pie"&&skill==="pie-proportion"){
  const [a,b,c]=s.counts,total=a+b+c;
  if(stage===2)return {stage,operation:"combinar-sectores",requiredEvidence:["identificar-dos-categorias","sumar-frecuencias","determinar-porcentaje"],
   prompt:"¿Qué porcentaje del total corresponde conjuntamente a Lectura y Arte?",
   answer:pct(a+c,total),distractors:[pct(a,total),pct(c,total),pct(b,total),pct(a+b,total)],
   explanation:`Lectura y Arte suman ${a} + ${c} = ${a+c}, de ${total} casos. Porcentaje conjunto: ${pct(a+c,total)}.`};
  return {stage,operation:"condicionar-proporcion",requiredEvidence:["excluir-categoria","recalcular-denominador","calcular-porcentaje-condicionado"],
   prompt:"Si se excluye Deportes, ¿qué porcentaje de quienes permanecen corresponde a Lectura?",
   answer:pct(a,a+c),distractors:[pct(a,total),pct(c,a+c),pct(a+b,total),pct(a+c,total)],
   explanation:`Al retirar Deportes quedan ${a+c} respuestas; Lectura aporta ${a}. La proporción condicionada es ${a} ÷ ${a+c} × 100 = ${pct(a,a+c)}.`};
 }
 if(s.kind==="cross"&&skill==="cross-table"){
  const [al,ad]=s.a,[bl,bd]=s.b;
  if(stage===2)return {stage,operation:"cambiar-universo-condicionado",requiredEvidence:["identificar-columna-deportes","determinar-denominador","calcular-porcentaje"],
   prompt:"Entre quienes prefieren Deportes, ¿qué porcentaje pertenece al Grupo B?",
   answer:pct(bd,ad+bd),distractors:[pct(bd,al+ad+bl+bd),pct(bd,bl+bd),pct(ad,ad+bd),pct(bl,al+bl)],
   explanation:`En la columna Deportes hay ${ad+bd} personas; ${bd} son del Grupo B. Porcentaje = ${pct(bd,ad+bd)}.`};
  const p1=100*al/(al+bl),p2=100*ad/(ad+bd);
  return {stage,operation:"contrastar-proporciones-condicionadas",requiredEvidence:["seleccionar-dos-columnas","calcular-dos-proporciones","comparar-en-puntos-porcentuales"],
   prompt:"¿Cuál es la diferencia absoluta, en puntos porcentuales, entre la proporción del Grupo A entre quienes prefieren Lectura y la proporción del Grupo A entre quienes prefieren Deportes?",
   answer:pp(Math.abs(p1-p2)),distractors:[pct(al,al+ad),pct(ad,ad+bd),pp(p1+p2),pp(p1)],
   explanation:`En Lectura, la proporción de A es ${pct(al,al+bl)}; en Deportes es ${pct(ad,ad+bd)}. Diferencia absoluta: ${pp(Math.abs(p1-p2))}.`};
 }
 throw Error("No se puede asignar progresión a la habilidad "+skill);
}
