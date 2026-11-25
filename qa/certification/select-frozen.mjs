// v7.6: frozen ID/hash selection independent of the historical technical cursor.
export function selectFrozen(order, manifest, hashItem) {
 if (!Array.isArray(manifest?.items) || manifest.items.length<1 || manifest.items.length>450) throw Error('Lote: 1–450 IDs');
 const index=new Map(order.map(e=>[e.item.id,e]));
 if(index.size!==order.length) throw Error('Inventario: IDs duplicados');
 const seen=new Set();
 return manifest.items.map(({id,content_sha256})=>{
  if(typeof id!=='string'||seen.has(id)||!index.has(id)) throw Error('ID duplicado o desconocido: '+id);
  seen.add(id);
  const entry=index.get(id);
  if(hashItem(entry.item)!==content_sha256) throw Error('Hash obsoleto: '+id);
  return entry;
 });
}
