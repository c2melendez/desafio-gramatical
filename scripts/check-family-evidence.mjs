import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const evidence=JSON.parse(readFileSync('docs/evidencia/familias-permutaciones-20261117.json','utf8'));
const review=JSON.parse(readFileSync('docs/evidencia/revision-editorial-36-20261117.json','utf8'));
const byId=new Map(review.items.map(x=>[x.id,x]));
assert.equal(evidence.sha_fuente,review.fuente.sha);
assert.equal(evidence.familias.length,18);
const familyIds=evidence.familias.flatMap(x=>x.ids);
assert.equal(new Set(familyIds).size,36);
for(const family of evidence.familias){
 assert.equal(family.ids.length,2);
 family.ids.forEach((id,i)=>assert.equal(family.hashes[i],byId.get(id)?.hash));
 assert.equal(family.independencia,'INCONCLUSA');
 assert.equal(family.conteo_como_independientes,0);
 assert.ok(family.evidencia_comparativa.trim());
}
assert.equal(evidence.construcciones.length,18);
assert.equal(new Set(evidence.construcciones.map(x=>x.id)).size,18);
let actual;
if(process.argv[2]){
 const dir=resolve(process.argv[2]);
 const bank=await import(pathToFileURL(resolve(dir,'src/lib/grammar-games-draft.ts')).href);
 const grading=await import(pathToFileURL(resolve(dir,'src/lib/grammar-new-games.ts')).href);
 actual={bank:new Map(bank.GRAMMAR_CONSTRUCTION_DRAFT.map(x=>[x.id,x])),grade:grading.gradeGrammarConstruction};
}
for(const row of evidence.construcciones){
 assert.equal(row.hash,byId.get(row.id)?.hash);
 assert.equal(row.permutaciones.length,6);
 assert.equal(new Set(row.permutaciones.map(x=>x.orden.join(','))).size,6);
 assert.equal(row.conteo_aceptado,0);
 let item;
 if(actual){
  item=actual.bank.get(row.id); assert.ok(item);
  assert.equal(createHash('sha256').update(JSON.stringify(item)).digest('hex'),row.hash);
 }
 for(const p of row.permutaciones){
  assert.deepEqual([...p.orden].sort(),[0,1,2]);
  const expected=p.orden.join(',')==='0,1,2';
  assert.equal(p.calificador_pr1,expected?'ACEPTADO':'RECHAZADO');
  if(actual) assert.equal(actual.grade(item,p.orden),expected);
 }
}
console.log(`18 familias y 108 permutaciones: trazabilidad válida${actual?'; comportamiento del PR1 comprobado':''}; equivalencia e independencia siguen pendientes.`);
