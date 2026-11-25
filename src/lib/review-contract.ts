/** C09 structural contract. Academic approval requires independent review of evidence. */
export type Depth = "principiante" | "intermedio" | "avanzado";
export type ReviewSource = {id:string;url:string;title:string;kind:"discipline"|"didactic";finding:string;limitations:string};
export type Objective = {id:string;statement:string;depth:Depth;assessable:boolean;exceptionReason?:string};
export type ReviewBlock = {id:string;kind:"concept-map"|"comparison"|"sequence"|"worked-example"|"counterexample"|"common-error"|"diagram"|"practice";title:string;objectiveIds:string[];sourceIds:string[];content:string;visual?:{nodes:{id:string;label:string}[];edges:{from:string;to:string;label:string}[]}};
export type ReviewUnit = {area:string;topic:string;subtopic:string;version:string;research:{sources:ReviewSource[];alternatives:{method:string;rationale:string}[];chosenMethod:string};objectives:Objective[];blocks:ReviewBlock[];links:{exerciseId:string;objectiveIds:string[]}[]};
export type InventoryExercise = {id:string;depth:Depth};
const depths:Depth[]=["principiante","intermedio","avanzado"];
const filled=(s:string)=>typeof s==="string"&&s.trim().length>0;
export function validateReview(unit:ReviewUnit,inventory:InventoryExercise[]):string[]{
 const errors:string[]=[];
 const require=(ok:boolean,message:string)=>{if(!ok)errors.push(message);};
 const unique=(ids:string[],label:string)=>require(ids.every(filled)&&new Set(ids).size===ids.length,label+": IDs vacíos o duplicados");
 const sources=new Map(unit.research.sources.map(s=>[s.id,s]));
 const objectives=new Map(unit.objectives.map(o=>[o.id,o]));
 const exercises=new Map(inventory.map(e=>[e.id,e]));
 unique(unit.research.sources.map(s=>s.id),"R01 fuentes");unique(unit.objectives.map(o=>o.id),"R04 objetivos");unique(unit.blocks.map(b=>b.id),"R02 bloques");unique(inventory.map(e=>e.id),"R04 inventario");unique(unit.links.map(l=>l.exerciseId),"R04 enlaces");
 require([unit.area,unit.topic,unit.subtopic,unit.version].every(filled),"R05 identidad incompleta");
 require(inventory.length>0,"R04 inventario vacío");
 require(unit.research.sources.some(s=>s.kind==="discipline"),"R01 falta fuente disciplinar");
 require(new Set(unit.research.sources.filter(s=>s.kind==="didactic").map(s=>s.url)).size>=2,"R01 faltan dos referencias didácticas distintas");
 for(const s of sources.values())require([s.title,s.finding,s.limitations].every(filled)&&/^https?:\/\//.test(s.url),"R01 fuente incompleta "+s.id);
 require(unit.research.alternatives.length>=2&&unit.research.alternatives.every(a=>filled(a.method)&&filled(a.rationale))&&unit.research.alternatives.some(a=>a.method===unit.research.chosenMethod),"R01 elección de método sin comparación");
 const taught=new Set<string>(),tested=new Set<string>();
 for(const o of objectives.values()){require(filled(o.statement)&&depths.includes(o.depth),"R04 objetivo inválido "+o.id);if(!o.assessable)require(filled(o.exceptionReason??""),"R04 excepción sin justificar "+o.id);}
 for(const b of unit.blocks){
  require(filled(b.title)&&filled(b.content)&&b.objectiveIds.length>0&&b.sourceIds.length>0,"R02 bloque incompleto "+b.id);
  for(const id of b.objectiveIds){require(objectives.has(id),"R04 objetivo inexistente "+id);taught.add(id);}
  for(const id of b.sourceIds)require(sources.has(id),"R01 fuente no enlazada "+id);
  if(b.visual){const nodes=b.visual.nodes.map(n=>n.id);unique(nodes,"R02 nodos "+b.id);require(nodes.length>1&&b.visual.nodes.every(n=>filled(n.label))&&b.visual.edges.length>0&&b.visual.edges.every(e=>nodes.includes(e.from)&&nodes.includes(e.to)&&filled(e.label)),"R02 diagrama inválido "+b.id);}
 }
 require(unit.blocks.some(b=>b.visual&&["concept-map","comparison","sequence","diagram"].includes(b.kind)),"R02 falta organizador visual");
 for(const kind of ["worked-example","counterexample","common-error"])require(unit.blocks.some(b=>b.kind===kind),"R02 falta "+kind);
 const covered=new Set<string>();
 for(const link of unit.links){
  const exercise=exercises.get(link.exerciseId);require(Boolean(exercise),"R04 ejercicio ajeno "+link.exerciseId);
  require(link.objectiveIds.length>0,"R04 ejercicio sin objetivos "+link.exerciseId);
  let exact=false;
  for(const id of link.objectiveIds){const o=objectives.get(id);require(Boolean(o?.assessable&&taught.has(id)),"R04 objetivo no enseñado/evaluable "+id);if(o?.assessable&&exercise){require(depths.indexOf(o.depth)<=depths.indexOf(exercise.depth),"R04 profundidad incompatible "+link.exerciseId);if(o.depth===exercise.depth)exact=true;tested.add(id);}}
  require(exact,"R04 falta objetivo de profundidad equivalente "+link.exerciseId);covered.add(link.exerciseId);
 }
 for(const id of exercises.keys())require(covered.has(id),"R04 ejercicio huérfano "+id);
 for(const o of objectives.values()){require(taught.has(o.id),"R04 objetivo no enseñado "+o.id);if(o.assessable)require(tested.has(o.id),"R04 objetivo sin evaluación "+o.id);}
 return errors;
}
