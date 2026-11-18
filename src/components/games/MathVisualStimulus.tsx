import type {MathVisual} from "@/lib/math-visual";
import {visualDescription} from "@/lib/math-visual";

/** Diagrams are generated from the same numerical data used by the independent oracle.
 * Accessible descriptions give the *input*, never the requested answer. */
export function MathVisualStimulus({visual:v}:{visual:MathVisual}){
 const title=visualDescription(v);
 const common={role:"img" as const,"aria-label":title,className:"w-full max-w-lg h-auto text-foreground","data-testid":"math-visual"};
 if(v.kind==="triangle-angles")return <figure className="space-y-2">
  <svg viewBox="0 0 380 240" {...common}>
   <path d="M60 195 L318 195 L173 35 Z" fill="none" stroke="currentColor" strokeWidth="3"/>
   <text x="44" y="213" fontSize="17" fill="currentColor">A: {v.alpha}°</text>
   <text x="278" y="213" fontSize="17" fill="currentColor">B: {v.beta}°</text>
   <text x="165" y="27" fontSize="18" fill="currentColor">C: ?</text>
   <path d="M92 195 A32 32 0 0 1 80 171 M290 195 A28 28 0 0 0 300 173" fill="none" stroke="#b91c1c" strokeWidth="2"/>
  </svg><figcaption className="text-xs text-muted-foreground">Diagrama esquemático: no está a escala. Utiliza los ángulos indicados.</figcaption>
 </figure>;
 if(v.kind==="right-triangle")return <figure className="space-y-2">
  <svg viewBox="0 0 380 230" {...common}>
   <path d="M65 185 L295 185 L65 36 Z" fill="none" stroke="currentColor" strokeWidth="3"/>
   <path d="M65 165 L85 165 L85 185" fill="none" stroke="currentColor" strokeWidth="2"/>
   <text x="140" y="207" fontSize="17" fill="currentColor">{v.legA} cm</text>
   <text x="7" y="107" fontSize="17" fill="currentColor">{v.legB} cm</text>
   <text x="198" y="91" fontSize="18" fill="currentColor">h = ?</text>
  </svg><figcaption className="text-xs text-muted-foreground">Triángulo rectángulo. Las medidas indicadas son las válidas, no la longitud dibujada.</figcaption>
 </figure>;
 if(v.kind==="bar-chart"){
  const values=[v.monday,v.tuesday,v.wednesday],max=Math.max(...values,5),step=5,cap=Math.ceil(max/step)*step;
  const barY=(n:number)=>190-140*n/cap;
  return <figure className="space-y-2">
   <svg viewBox="0 0 390 255" {...common}>
    <text x="8" y="17" fontSize="15" fill="currentColor">Libros prestados</text>
    {[0,1,2,3,4,5].map(i=>{const y=190-140*i/5;return <g key={i}>
     <line x1="50" y1={y} x2="365" y2={y} stroke="currentColor" strokeOpacity=".15"/>
     <text x="40" y={y+5} textAnchor="end" fontSize="12" fill="currentColor">{Math.round(cap*i/5)}</text>
    </g>})}
    {values.map((n,i)=><g key={i}>
     <rect x={76+i*98} y={barY(n)} width="50" height={190-barY(n)} fill="#0f766e"/>
     <text x={101+i*98} y={barY(n)-7} textAnchor="middle" fontSize="14" fill="currentColor">{n}</text>
     <text x={101+i*98} y="211" textAnchor="middle" fontSize="15" fill="currentColor">{["Lunes","Martes","Miércoles"][i]}</text>
    </g>)}
    <line x1="50" y1="190" x2="365" y2="190" stroke="currentColor" strokeWidth="2"/>
   </svg><figcaption className="text-xs text-muted-foreground">Los valores sobre las barras indican libros, no porcentajes.</figcaption>
  </figure>;
 }
 if(v.kind==="number-line"){
  const labels=[v.boundary-2,v.boundary-1,null,v.boundary+1,v.boundary+2];
  return <figure className="space-y-2">
   <svg viewBox="0 0 390 145" {...common}>
    <line x1="25" y1="72" x2="365" y2="72" stroke="currentColor" strokeWidth="2"/>
    <line x1="195" y1="72" x2="350" y2="72" stroke="#0f766e" strokeWidth="7" strokeLinecap="round"/>
    <path d="M350 61 L370 72 L350 83" fill="none" stroke="#0f766e" strokeWidth="4"/>
    {labels.map((n,i)=>{const x=55+70*i;return <g key={i}>
     <line x1={x} x2={x} y1="63" y2="81" stroke="currentColor" strokeWidth="2"/>
     <text x={x} y="110" textAnchor="middle" fontSize="18" fill="currentColor">{n===null?"?":n}</text>
    </g>})}
    <circle cx="195" cy="72" r="8" fill="white" stroke="#0f766e" strokeWidth="3"/>
   </svg><figcaption className="text-xs text-muted-foreground">Círculo abierto: extremo excluido. Flecha hacia valores mayores. Marcas igualmente espaciadas.</figcaption>
  </figure>;
 }
 if(v.kind==="rectangle")return <figure className="space-y-2">
  <svg viewBox="0 0 390 240" {...common}>
   <rect x="78" y="49" width="228" height="137" fill="none" stroke="currentColor" strokeWidth="3"/>
   <line x1="78" y1="195" x2="306" y2="195" stroke="#0f766e" strokeWidth="2"/>
   <text x="192" y="220" textAnchor="middle" fontSize="18" fill="currentColor">{v.length} cm</text>
   <text x="13" y="124" fontSize="18" fill="currentColor">{v.width} cm</text>
   <path d="M78 166 h20 v20" fill="none" stroke="currentColor" strokeWidth="2"/>
  </svg><figcaption className="text-xs text-muted-foreground">Rectángulo esquemático, no a escala; utiliza únicamente las medidas rotuladas.</figcaption>
 </figure>;
 if(v.kind==="prism")return <figure className="space-y-2">
  <svg viewBox="0 0 390 260" {...common}>
   <path d="M72 97 L271 97 L318 57 L119 57 Z M271 97 V218 L318 178 V57 M72 97 V218 H271 V97 M72 218 L119 178 V57" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
   <path d="M72 218 L271 218 L318 178" fill="none" stroke="#0f766e" strokeWidth="3"/>
   <text x="158" y="240" fontSize="17" fill="currentColor">{v.length} cm</text>
   <text x="291" y="216" fontSize="16" fill="currentColor">{v.width} cm</text>
   <text x="12" y="155" fontSize="17" fill="currentColor">{v.height} cm</text>
  </svg><figcaption className="text-xs text-muted-foreground">Prisma rectangular no a escala; los rótulos identifican tres aristas perpendiculares.</figcaption>
 </figure>;
 if(v.kind==="similar-triangles")return <figure className="space-y-2">
  <svg viewBox="0 0 390 240" {...common}>
   <path d="M26 201 L158 201 L70 102 Z M207 201 L372 201 L262 40 Z" fill="none" stroke="currentColor" strokeWidth="3"/>
   <text x="76" y="224" fontSize="15" fill="currentColor">{v.small} cm</text>
   <text x="286" y="224" fontSize="15" fill="currentColor">{v.large} cm</text>
   <text x="19" y="139" fontSize="15" fill="currentColor">{v.other} cm</text>
   <text x="209" y="111" fontSize="17" fill="currentColor">? cm</text>
   <path d="M26 185 h16 v16 M207 185 h16 v16" fill="none" stroke="#0f766e" strokeWidth="2"/>
  </svg><figcaption className="text-xs text-muted-foreground">Triángulos semejantes no a escala: bases correspondientes y lados izquierdos correspondientes.</figcaption>
 </figure>;
  const {slope,intercept,targetX}=v;
 const x0=90,y0=170,x1=165,y1=95;
 return <figure className="space-y-2">
  <svg viewBox="0 0 390 240" {...common}>
   <line x1="38" y1="170" x2="355" y2="170" stroke="currentColor" strokeWidth="2"/>
   <line x1={x0} y1="205" x2={x0} y2="26" stroke="currentColor" strokeWidth="2"/>
   <path d={`M ${x0} ${y0} L ${x1} ${y1}`} fill="none" stroke="#0f766e" strokeWidth="3"/>
   <circle cx={x0} cy={y0} r="5" fill="#b91c1c"/><circle cx={x1} cy={y1} r="5" fill="#b91c1c"/>
   <text x="101" y="187" fontSize="16" fill="currentColor">(0, {intercept})</text>
   <text x="175" y="88" fontSize="16" fill="currentColor">(1, {intercept+slope})</text>
   <text x="349" y="190" fontSize="16" fill="currentColor">x</text><text x="72" y="24" fontSize="16" fill="currentColor">y</text>
   <text x="107" y="226" fontSize="14" fill="currentColor">Recta definida por dos puntos</text>
  </svg><figcaption className="text-xs text-muted-foreground">Gráfico esquemático, no a escala. Usa las coordenadas etiquetadas para obtener f({targetX}).</figcaption>
 </figure>;
}
