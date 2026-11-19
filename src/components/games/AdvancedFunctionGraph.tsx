import type {ExtendedGraph} from "@/lib/function-graph-advanced";

export function AdvancedFunctionGraph({graph:g}:{graph:ExtendedGraph}){
 const sx=(x:number)=>260+26*x,sy=(y:number)=>188-22*y;
 const axes=[-8,-6,-4,-2,0,2,4,6,8];
 const description=g.kind==="quadratic"
 ?`Plano cartesiano graduado. Parábola definida en el intervalo cerrado de ${g.h-3} a ${g.h+3}, con vértice en (${g.h}, ${g.k}), concavidad ${g.a>0?"hacia arriba":"hacia abajo"} y coeficiente cuadrático ${g.a}. Los dos extremos están incluidos.`
 :`Plano cartesiano graduado con dos rectas por tramos. La primera se extiende de x=-4 hasta x=0 con círculo abierto en (0, ${g.leftIntercept}), y la segunda desde x=0 hasta x=4, con círculo cerrado en (0, ${g.rightIntercept}). En ambos tramos la pendiente es una unidad por cada unidad horizontal.`;
 const curve=g.kind==="quadratic"?Array.from({length:61},(_,i)=>{
  const x=g.h-3+i/10,y=g.a*(x-g.h)**2+g.k;
  return `${sx(x)},${sy(y)}`;
 }).join(" "):"";
 return <figure className="rounded-lg bg-background p-2 sm:p-4 space-y-2">
  <svg viewBox="0 0 520 385" role="img" aria-label={description}
   data-testid="advanced-function-graph" className="block w-full h-auto" style={{maxHeight:"420px"}}>
   <rect x="35" y="14" width="450" height="355" fill="none" stroke="currentColor" strokeOpacity=".24"/>
   {axes.map(n=><g key={n}>
    <line x1={sx(n)} x2={sx(n)} y1="18" y2="364" stroke="currentColor" strokeOpacity=".13"/>
    <line x1="38" x2="484" y1={sy(n)} y2={sy(n)} stroke="currentColor" strokeOpacity=".13"/>
    {n!==0&&<text x={sx(n)} y={sy(0)+17} textAnchor="middle" fontSize="12" fill="currentColor">{n}</text>}
    {n!==0&&<text x={sx(0)-10} y={sy(n)+4} textAnchor="end" fontSize="12" fill="currentColor">{n}</text>}
   </g>)}
   <line x1="37" x2="485" y1={sy(0)} y2={sy(0)} stroke="currentColor" strokeWidth="2"/>
   <line x1={sx(0)} x2={sx(0)} y1="12" y2="368" stroke="currentColor" strokeWidth="2"/>
   <text x="490" y={sy(0)-7} fill="currentColor" fontSize="18">x</text>
   <text x={sx(0)+12} y="14" fill="currentColor" fontSize="18">y</text>
   {g.kind==="quadratic"?<>
    <polyline points={curve} fill="none" stroke="#0f766e" strokeWidth="4" strokeLinejoin="round"/>
    {([-3,3] as const).map(offset=>{
     const x=g.h+offset,y=g.a*9+g.k;
     return <circle key={offset} cx={sx(x)} cy={sy(y)} r="6" fill="#0f766e" stroke="white" strokeWidth="2"/>;
    })}
    <circle cx={sx(g.h)} cy={sy(g.k)} r="5" fill="#b91c1c" stroke="white" strokeWidth="1.5"/>
   </>:<>
    <line x1={sx(-4)} y1={sy(g.leftIntercept-4)}
     x2={sx(0)} y2={sy(g.leftIntercept)} stroke="#0f766e" strokeWidth="4"/>
    <line x1={sx(0)} y1={sy(g.rightIntercept)}
     x2={sx(4)} y2={sy(g.rightIntercept+4)} stroke="#b45309" strokeWidth="4"/>
    <circle cx={sx(-4)} cy={sy(g.leftIntercept-4)} r="6" fill="#0f766e" stroke="white" strokeWidth="2"/>
    <circle cx={sx(4)} cy={sy(g.rightIntercept+4)} r="6" fill="#b45309" stroke="white" strokeWidth="2"/>
    <circle cx={sx(0)} cy={sy(g.leftIntercept)} r="7" fill="white" stroke="#0f766e" strokeWidth="3"/>
    <circle cx={sx(0)} cy={sy(g.rightIntercept)} r="6" fill="#b45309" stroke="white" strokeWidth="1.5"/>
   </>}
  </svg>
  <figcaption className="text-xs text-muted-foreground">
   Gráfica cartesiana a escala. Círculo vacío: punto excluido; círculo lleno: punto incluido.
   El dibujo no continúa fuera de los extremos señalados.
  </figcaption>
 </figure>;
}
