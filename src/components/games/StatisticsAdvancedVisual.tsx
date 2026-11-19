import type {Stats2Stimulus} from "@/lib/statistics-visual-advanced";

export function StatisticsAdvancedVisual({data:s}:{data:Stats2Stimulus}){
 if(s.kind==="cross"){
  const total=(r:[number,number])=>r[0]+r[1];
  return <figure className="space-y-2 rounded-lg bg-background p-3 overflow-x-auto">
   <table className="w-full border-collapse text-center text-sm sm:text-base" data-testid="statistics-advanced-visual">
    <caption className="font-bold mb-2">Preferencias de estudiantes por grupo</caption>
    <thead><tr><th scope="col" className="border p-2">Grupo</th>
      <th scope="col" className="border p-2">Lectura</th>
      <th scope="col" className="border p-2">Deportes</th>
      <th scope="col" className="border p-2">Total</th>
    </tr></thead>
    <tbody>{[s.a,s.b].map((r,i)=><tr key={i}><th scope="row" className="border p-2">{i===0?"A":"B"}</th>
      {r.map((n,j)=><td key={j} className="border p-2">{n}</td>)}
      <td className="border p-2">{total(r)}</td></tr>)}
    <tr><th scope="row" className="border p-2">Total</th>
     <td className="border p-2">{s.a[0]+s.b[0]}</td>
     <td className="border p-2">{s.a[1]+s.b[1]}</td>
     <td className="border p-2">{total(s.a)+total(s.b)}</td>
    </tr></tbody>
   </table>
   <figcaption className="text-xs text-muted-foreground">Los porcentajes condicionados deben usar como denominador el total de la columna o fila indicada, no siempre el total general.</figcaption>
  </figure>;
 }
 if(s.kind==="pie"){
  const total=s.counts.reduce((a,b)=>a+b,0);
  let angle=-Math.PI/2;
  const colors=["#0f766e","#2563eb","#b45309"];
  const sectors=s.counts.map((n,i)=>{
   const start=angle,sweep=n/total*2*Math.PI;angle+=sweep;const end=angle;
   const x1=205+106*Math.cos(start),y1=135+106*Math.sin(start);
   const x2=205+106*Math.cos(end),y2=135+106*Math.sin(end);
   return <path key={i} d={`M205 135 L${x1} ${y1} A106 106 0 ${sweep>Math.PI?1:0} 1 ${x2} ${y2} Z`}
    fill={colors[i]} stroke="white" strokeWidth="2"/>;
  });
  return <figure className="space-y-2 rounded-lg bg-background p-3">
   <svg viewBox="0 0 470 310" role="img" data-testid="statistics-advanced-visual" className="w-full h-auto"
    aria-label={`Gráfico circular con ${total} respuestas: ${s.labels.map((x,i)=>`${x} ${s.counts[i]}`).join(", ")}.`}>
    {sectors}
    {s.labels.map((label,i)=><g key={i}>
     <rect x="334" y={66+i*58} width="17" height="17" fill={colors[i]}/>
     <text x="358" y={80+i*58} fontSize="15" fill="currentColor">{label}: {s.counts[i]}</text>
    </g>)}
   </svg><figcaption className="text-xs text-muted-foreground">Los sectores son proporcionales a las frecuencias indicadas; cada sector representa una categoría sin superposición.</figcaption>
  </figure>;
 }
 const all=s.groups.flat(),min=Math.min(...all)-1,max=Math.max(...all)+1;
 const cx=(v:number)=>45+350*(v-min)/(max-min);
 const unique=[...new Set(all)].sort((a,b)=>a-b);
 const description=`Diagrama de puntos comparativo con ocho observaciones por grupo. Grupo A: ${s.groups[0].join(", ")}. Grupo B: ${s.groups[1].join(", ")}. Se conservan las repeticiones.`;
 return <figure className="space-y-2 rounded-lg bg-background p-3">
  <svg viewBox="0 0 450 280" role="img" data-testid="statistics-advanced-visual" aria-label={description} className="w-full h-auto">
   <text x="12" y="88" fill="currentColor" fontSize="16">A</text>
   <text x="12" y="184" fill="currentColor" fontSize="16">B</text>
   {[0,1].map(group=><g key={group}>
    <line x1="40" x2="405" y1={group===0?120:216} y2={group===0?120:216} stroke="currentColor" strokeWidth="2"/>
    {unique.map(v=><g key={v}>
     <line x1={cx(v)} x2={cx(v)} y1={group===0?117:213} y2={group===0?123:219} stroke="currentColor"/>
     <text x={cx(v)} y={group===0?136:232} textAnchor="middle" fill="currentColor" fontSize="11">{v}</text>
    </g>)}
    {s.groups[group].map((v,i)=>{
     const layer=s.groups[group].slice(0,i).filter(n=>n===v).length;
     return <circle key={i} cx={cx(v)} cy={(group===0?105:201)-layer*18} r="7"
      fill={group===0?"#0f766e":"#2563eb"} stroke="white" strokeWidth="1.3"/>;
    })}
   </g>)}
   <text x="40" y="260" fontSize="13" fill="currentColor">Eje horizontal: puntuación; cada punto es una observación.</text>
  </svg><figcaption className="text-xs text-muted-foreground">Diagrama a escala. Para calcular los cuartiles, primero ordena los ocho datos de cada grupo.</figcaption>
 </figure>;
}
