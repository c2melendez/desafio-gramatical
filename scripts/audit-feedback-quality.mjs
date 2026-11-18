/** Revisión reproducible de explicación a nivel de 189 celdas y 9450 posiciones.
 * Un control mecánico no puede certificar precisión pedagógica: reportar sospechosos.
 */
import {coverageRows} from "../src/lib/coverage.ts";
import {pool} from "./inventory-items.mjs";
import {conceptRule,learningDescription} from "../src/lib/study-context.ts";
const rows=coverageRows().filter(r=>r.area==="espanol");
const issues=[],weak=[],topics=new Set(),counts={rows:0,records:0,source_with_rationale:0,source_weak:0,source_missing:0,selected_difficulty_levels:new Set(),modes:new Set()};
const strings=(x)=>typeof x==="string"&&x.trim()?x.trim():null;
function reasons(q){
 const r=[q.exp,q.explanation,q.correction,q.order?.explanation,
  ...(Array.isArray(q.items)?q.items.map(x=>x.explanation):[]),
  ...(Array.isArray(q.claims)?q.claims.map(x=>x.explanation):[]),
  ...(Array.isArray(q.tokens)?q.tokens.filter(x=>x.c).map(x=>x.exp):[])];
 return r.map(strings).filter(Boolean);
}
for(const row of rows){
 counts.rows++;topics.add(row.topic+" / "+row.subtopic);counts.selected_difficulty_levels.add(row.level);counts.modes.add(row.mode);
 if(conceptRule(row.subtopic).length<55)issues.push({cell:row.subtopic,reason:"concepto insuficiente"});
 if(learningDescription("espanol",row.topic,row.subtopic).length<55)issues.push({cell:row.subtopic,reason:"franja insuficiente"});
 const items=pool(row);
 for(const item of items){
  counts.records++;
  const refs=reasons(item);
  if(!refs.length){counts.source_missing++;issues.push({id:item.id,cell:row.subtopic,reason:"falta justificación de origen"});}
  else {counts.source_with_rationale++;
   const total=refs.join(" ");
   if(total.length<75||/^(?:la respuesta es correcta|se revisa contra|las tres fuentes tienen alcances)/i.test(total)){
    counts.source_weak++;
    if(weak.length<60)weak.push({id:item.id,subtopic:row.subtopic,mode:row.mode,level:row.level,source_excerpt:total.slice(0,150)});
   }
  }
 }
}
const report={module:"espanol-paridad-pedagogica",status:issues.length===0&&counts.records===9450&&counts.rows===189?"PASS":"FAIL",
 summary:{cells:counts.rows,records:counts.records,source_with_rationale:counts.source_with_rationale,
 source_missing:counts.source_missing,source_weak_review:counts.source_weak,unique_subtopics:topics.size,
 levels:[...counts.selected_difficulty_levels],games:[...counts.modes]},
 controls:{visual_feedback:"LearningFeedback plus original tokens",diagnostic_rule:"21 subtemas",human_academic_review:"PENDIENTE",weak_source_review:"PENDIENTE_EDICION"},
 caveat:"Una justificación textual no garantiza por sí sola profundidad, independencia ni corrección conceptual. Los casos source_weak_review requieren revisión de contenido; los criterios de UI añaden explicación sin sustituir su validación humana.",
 issues:issues.slice(0,100),weak_source_samples:weak};
console.log(JSON.stringify(report,null,2));if(report.status!=="PASS")process.exitCode=1;
