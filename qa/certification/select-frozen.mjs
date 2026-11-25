// v7.7: structural precondition for associated selection; never academic approval.
export const SCOPE_KEYS=['area','topic','subtopic'];
export const sameScope=(a,b)=>SCOPE_KEYS.every(k=>typeof a?.[k]==='string'&&a[k].trim()&&a[k]===b?.[k]);
export function assertRdgContract(manifest) {
 const scope=manifest?.subtopic_scope,rdg=manifest?.rdg_contract;
 if(!sameScope(scope,scope)) throw Error('RDG: subtema explícito requerido');
 if(!rdg||rdg.status!=='RDG_READY'||!sameScope(scope,rdg.subtopic_scope)) throw Error('RDG: contrato READY del mismo subtema requerido');
 if(typeof rdg.route_path!=='string'||!rdg.route_path.startsWith('src/')||rdg.route_path.split('/').includes('..')||!(/^[a-f0-9]{64}$/.test(rdg.route_sha256??''))) throw Error('RDG: ruta ejecutable y hash requeridos');
 if(!Array.isArray(rdg.objective_ids)||!rdg.objective_ids.length||rdg.objective_ids.some(x=>typeof x!=='string'||!x.trim())||new Set(rdg.objective_ids).size!==rdg.objective_ids.length) throw Error('RDG: objetivos únicos requeridos');
 if(typeof rdg.evidence_ref!=='string'||!rdg.evidence_ref.trim()) throw Error('RDG: evidencia de ruta requerida');
 return rdg;
}
// v7.6: frozen ID/hash selection independent of the historical technical cursor.
export function selectFrozen(order, manifest, hashItem) {
 const rdg=assertRdgContract(manifest);
 const objectives=new Set(rdg.objective_ids);
 if (!Array.isArray(manifest?.items) || manifest.items.length<1 || manifest.items.length>450) throw Error('Lote: 1–450 IDs');
 const index=new Map(order.map(e=>[e.item.id,e]));
 if(index.size!==order.length) throw Error('Inventario: IDs duplicados');
 const seen=new Set();
 return manifest.items.map(({id,content_sha256,objective_ids})=>{
  if(typeof id!=='string'||seen.has(id)||!index.has(id)) throw Error('ID duplicado o desconocido: '+id);
  seen.add(id);
  const entry=index.get(id);
  if(!sameScope(entry.row,manifest.subtopic_scope)) throw Error('ID fuera del subtema activo: '+id);
  if(!Array.isArray(objective_ids)||!objective_ids.length||objective_ids.some(x=>!objectives.has(x))) throw Error('ID sin objetivos de RDG: '+id);
  if(hashItem(entry.item)!==content_sha256) throw Error('Hash obsoleto: '+id);
  return entry;
 });
}
