import type {GraphData} from "@/lib/function-graph-lab";

export function FunctionGraph({graph:g}:{graph:GraphData}){
 const sx=(x:number)=>250+x*25;
 const sy=(y:number)=>185-y*19;
 const coords=g.xs.map((x,i)=>`${sx(x)},${sy(g.ys[i])}`).join(" ");
 const description=`Plano cartesiano con ejes x e y y escala de una unidad. La función es lineal por tramos y conecta, en orden, los puntos (${g.xs[0]}, ${g.ys[0]}), (${g.xs[1]}, ${g.ys[1]}) y (${g.xs[2]}, ${g.ys[2]}). Los extremos son cerrados. No hay gráfica fuera de esos extremos.`;
 return <figure className="space-y-2 rounded-lg bg-background p-2 sm:p-4">
  <svg viewBox="0 0 520 380" role="img" aria-label={description} data-testid="function-graph"
   className="block w-full h-auto" style={{maxHeight:"420px"}}>
   <rect x="36" y="26" width="428" height="324" fill="none" stroke="currentColor" strokeOpacity=".2"/>
   {Array.from({length:17},(_,i)=>i-8).map(n=><g key={n}>
    <line x1={sx(n)} x2={sx(n)} y1="26" y2="344" stroke="currentColor" strokeOpacity=".13"/>
    <line x1="40" x2="460" y1={sy(n)} y2={sy(n)} stroke="currentColor" strokeOpacity=".13"/>
    {n%2===0&&<text x={sx(n)} y={sy(0)+18} textAnchor="middle" fill="currentColor" fontSize="12">{n}</text>}
    {n%2===0&&n!==0&&<text x={sx(0)-12} y={sy(n)+4} textAnchor="end" fill="currentColor" fontSize="12">{n}</text>}
   </g>)}
   <line x1="38" x2="468" y1={sy(0)} y2={sy(0)} stroke="currentColor" strokeWidth="2"/>
   <line x1={sx(0)} x2={sx(0)} y1="20" y2="352" stroke="currentColor" strokeWidth="2"/>
   <path d={`M 459 ${sy(0)-6} L 469 ${sy(0)} L 459 ${sy(0)+6}`} fill="none" stroke="currentColor" strokeWidth="2"/>
   <path d={`M ${sx(0)-6} 27 L ${sx(0)} 17 L ${sx(0)+6} 27`} fill="none" stroke="currentColor" strokeWidth="2"/>
   <text x="472" y={sy(0)-7} fontWeight="bold" fontSize="18" fill="currentColor">x</text>
   <text x={sx(0)+11} y="19" fontWeight="bold" fontSize="18" fill="currentColor">y</text>
   <polyline points={coords} fill="none" stroke="#0f766e" strokeWidth="4.5" strokeLinejoin="round" strokeLinecap="round"/>
   {g.xs.map((x,i)=><circle key={i} cx={sx(x)} cy={sy(g.ys[i])} r="6" fill="#b91c1c" stroke="white" strokeWidth="2"/>)}
  </svg>
  <figcaption className="text-xs text-muted-foreground">
   Gráfica a escala con ejes y marcas en unidades. Los puntos rojos pertenecen a la función; no hay prolongación fuera de los extremos.
  </figcaption>
 </figure>;
}
