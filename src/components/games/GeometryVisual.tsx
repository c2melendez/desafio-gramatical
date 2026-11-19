import type {GeometryFigure} from "@/lib/geometry-visual-lab";

export function GeometryVisual({figure:f,question,stage=1}:{figure:GeometryFigure;question:"corresponding"|"supplementary"|"composite-area"|"composite-perimeter";stage?:1|2|3}){
 if(f.kind==="parallel"){
  const corresponding=question==="corresponding";
  const description=`Dos rectas horizontales L1 y L2 paralelas atravesadas por una transversal inclinada. Arriba, el ángulo sobre L1 y a la derecha de la transversal mide ${f.degrees} grados. Abajo, el ángulo ${stage===1?"incógnita":"de referencia"} está ${corresponding?"sobre L2 y a la derecha de la transversal, en posición correspondiente":"sobre L2 y a la izquierda de la transversal, adyacente al correspondiente"}.`;
  return <figure className="space-y-2 rounded-lg bg-background p-3">
   <svg viewBox="0 0 440 280" className="w-full h-auto" role="img" aria-label={description} data-testid="geometry-figure">
    <line x1="50" y1="83" x2="390" y2="83" stroke="currentColor" strokeWidth="3"/>
    <line x1="50" y1="196" x2="390" y2="196" stroke="currentColor" strokeWidth="3"/>
    <line x1="95" y1="255" x2="315" y2="24" stroke="currentColor" strokeWidth="3"/>
    <text x="395" y="88" fontSize="17" fill="currentColor">L₁</text>
    <text x="395" y="201" fontSize="17" fill="currentColor">L₂</text>
    <text x="282" y="64" fontSize="19" fill="#0f766e">{f.degrees}°</text>
    <text x={corresponding?164:112} y="173" fontSize="22" fontWeight="bold" fill="#b91c1c">{stage===1?"?":"θ"}</text>
    <path d="M365 102 l9 0 M365 109 l9 0 M365 214 l9 0 M365 221 l9 0" stroke="#0f766e" strokeWidth="2.5"/>
   </svg>
   <figcaption className="text-xs text-muted-foreground">L₁ ∥ L₂. Esquema no a escala. Usa la posición de los ángulos y el paralelismo, no la inclinación dibujada. {stage>1?"La bisectriz o los cambios adicionales se describen en el enunciado; no están dibujados.":""}</figcaption>
  </figure>;
 }
 const {width:W,height:H,cutWidth:w,cutHeight:h}=f;
 const x=55,y=34,ow=280,oh=196,nx=x+ow*(W-w)/W,ny=y+oh*h/H;
 const desc=`Figura compuesta en L: rectángulo exterior de ancho ${W} cm y alto ${H} cm, con recorte en la esquina superior derecha de ancho ${w} cm y alto ${h} cm. Permanecen los lados exterior inferior e izquierdo y los dos escalones internos. Figura no a escala.`;
 return <figure className="space-y-2 rounded-lg bg-background p-3">
  <svg viewBox="0 0 440 300" className="w-full h-auto" role="img" aria-label={desc} data-testid="geometry-figure">
   <path d={`M${x},${y} H${nx} V${ny} H${x+ow} V${y+oh} H${x} Z`} fill="#ccfbf1" stroke="#0f766e" strokeWidth="3" strokeLinejoin="round"/>
   <line x1={x} y1="253" x2={x+ow} y2="253" stroke="currentColor" strokeWidth="1.8"/>
   <text x="183" y="274" fontSize="18" fill="currentColor">{W} cm</text>
   <text x="3" y="146" fontSize="17" fill="currentColor">{H} cm</text>
   <text x={nx+8} y="27" fontSize="16" fill="currentColor">Recorte: {w} cm</text>
   <text x={x+ow+7} y={y+oh*.23} fontSize="16" fill="currentColor">{h} cm</text>
   <text x="60" y="290" fontSize="13" fill="currentColor">Contorno en L · cotas exactas</text>
  </svg>
  <figcaption className="text-xs text-muted-foreground">Las dimensiones están en centímetros. El dibujo no está a escala; no se debe medir en píxeles.</figcaption>
 </figure>;
}
