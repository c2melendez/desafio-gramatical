import type {StatsStimulus} from "@/lib/statistics-visual-lab";

export function StatisticsVisual({data:d}:{data:StatsStimulus}){
 if(d.kind==="frequency"){
  const labels=["Valor","Frecuencia"];
  const alt=`Tabla de frecuencias: valor ${d.values.map((v,i)=>`${v} con frecuencia ${d.frequencies[i]}`).join("; ")}. Las frecuencias expresan repeticiones, no resultados individuales.`;
  return <figure className="space-y-2 rounded-lg bg-background p-3">
   <div data-testid="statistics-visual" className="overflow-x-auto" aria-label={alt}>
    <table className="w-full border-collapse text-center text-sm sm:text-base">
     <caption className="font-bold mb-2">Tabla de frecuencias</caption><thead><tr>
      <th scope="col" className="border p-2">{labels[0]} (puntos)</th>
      {d.values.map((v,i)=><th scope="col" key={i} className="border p-2">{v}</th>)}
     </tr></thead><tbody><tr><th scope="row" className="border p-2">{labels[1]}</th>
      {d.frequencies.map((n,i)=><td className="border p-2" key={i}>{n}</td>)}
     </tr></tbody>
    </table>
   </div><figcaption className="text-xs text-muted-foreground">Cada frecuencia indica cuántas veces aparece el valor correspondiente.</figcaption>
  </figure>;
 }
 if(d.kind==="sample"){
  const red=d.colors.filter(c=>c==="rojo").length,blue=d.colors.length-red;
  return <figure className="space-y-2 rounded-lg bg-background p-3">
   <svg viewBox="0 0 430 210" role="img" data-testid="statistics-visual" className="w-full h-auto"
    aria-label={`Conjunto de ${d.colors.length} fichas igualmente probables: ${red} rojas y ${blue} azules.`}>
    <rect x="18" y="18" width="394" height="176" rx="12" fill="none" stroke="currentColor" strokeWidth="2"/>
    {d.colors.map((c,i)=><circle key={i} cx={55+(i%6)*60} cy={65+Math.floor(i/6)*70}
      r="21" fill={c==="rojo"?"#b91c1c":"#1d4ed8"} stroke="currentColor" strokeWidth="1"/>)}
   </svg><figcaption className="text-xs text-muted-foreground">Cada círculo representa una ficha y todas tienen la misma probabilidad de extracción.</figcaption>
  </figure>;
 }
 const max=Math.ceil(Math.max(...d.values)/5)*5,px=(n:number)=>180-120*n/max;
 const colors=["#0f766e","#2563eb","#b45309","#7c3aed"];
 const description=`${d.kind==="bars"?"Gráfico de barras":"Gráfico de líneas"} con eje vertical en ${d.unit}. ${d.labels.map((label,i)=>`${label}: ${d.values[i]}`).join("; ")}.`;
 return <figure className="space-y-2 rounded-lg bg-background p-3">
  <svg viewBox="0 0 450 240" role="img" aria-label={description} data-testid="statistics-visual" className="w-full h-auto">
   <text x="18" y="20" fontSize="14" fill="currentColor">Cantidad ({d.unit})</text>
   {Array.from({length:6},(_,i)=><g key={i}>
    <line x1="55" x2="431" y1={180-120*i/5} y2={180-120*i/5} stroke="currentColor" strokeOpacity=".2"/>
    <text x="48" y={185-120*i/5} textAnchor="end" fontSize="12" fill="currentColor">{Number((max*i/5).toFixed(1))}</text>
   </g>)}
   <line x1="55" x2="431" y1="180" y2="180" stroke="currentColor" strokeWidth="2"/>
   {d.kind==="bars"?d.values.map((v,i)=><g key={i}>
    <rect x={77+i*88} y={px(v)} width="53" height={180-px(v)} fill={colors[i]}/>
    <text x={103+i*88} y={px(v)-6} fontSize="13" textAnchor="middle" fill="currentColor">{v}</text>
    <text x={103+i*88} y="205" fontSize="13" textAnchor="middle" fill="currentColor">{d.labels[i]}</text>
   </g>):<>
    <polyline points={d.values.map((v,i)=>`${101+i*91},${px(v)}`).join(" ")}
      stroke="#0f766e" strokeWidth="3.5" fill="none"/>
    {d.values.map((v,i)=><g key={i}>
     <circle cx={101+i*91} cy={px(v)} r="6" fill="#b91c1c" stroke="white" strokeWidth="1.5"/>
     <text x={101+i*91} y={px(v)-13} textAnchor="middle" fontSize="13" fill="currentColor">{v}</text>
     <text x={101+i*91} y="205" textAnchor="middle" fontSize="13" fill="currentColor">{d.labels[i]}</text>
    </g>)}
   </>}
  </svg>
  <figcaption className="text-xs text-muted-foreground">Gráfico a escala. Usa las etiquetas y las marcas del eje vertical; las cantidades corresponden a {d.unit}.</figcaption>
 </figure>;
}
