import type {ReadingChallenge} from "./reading";

/** Keep all local reasoning dependencies intact. The operation compares
 * complete arguments; it does not splice a premise from one text into
 * a conclusion from another. Editorial independence is not implied. */
export function mainIdeaCompositeOrder(sources:readonly ReadingChallenge[]):ReadingChallenge["order"]{
 if(sources.length!==2&&sources.length!==3)throw Error("Se requieren dos o tres fuentes");
 if(new Set(sources.map(s=>s.id)).size!==sources.length)throw Error("Fuentes duplicadas");
 if(sources.some(s=>s.subtopic!=="Idea principal"||s.order.parts.length!==3))throw Error("Fuente incompatible");
 const collect=(position:number)=>sources.map((s,i)=>"Fuente "+String.fromCharCode(65+i)+": "+s.order.parts[position]).join("\n");
 return {
  parts:[
   collect(0),
   collect(1),
   collect(2)
  ],
  hint:"Organiza las tres etapas del análisis. Cada fragmento contiene una aportación de todas las fuentes; conserva la relación entre los datos, su interpretación y las conclusiones de cada texto.",
  explanation:sources.map((s,i)=>"Fuente "+String.fromCharCode(65+i)+": "+s.order.explanation).join("\n")+"\nLas conclusiones se apoyan en las premisas de su propia fuente. La semejanza de la operación lectora no significa que los hechos de las fuentes sean intercambiables."
 };
}
