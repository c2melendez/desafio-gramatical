import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { check } from './review-draft-grammar.mjs';
const data=JSON.parse(readFileSync('docs/evidencia/propuestas-cuarentena-20261117.json','utf8'));
const review=JSON.parse(readFileSync('docs/evidencia/revision-editorial-36-20261117.json','utf8'));
const originals=new Map(review.items.map(x=>[x.id,x]));
const targeted=review.items.filter(x=>x.revision_automatica==='REQUIERE_CAMBIO').map(x=>x.id).sort();
assert.deepEqual(data.proposals.map(x=>x.id).sort(),targeted);
for(const p of data.proposals){
 assert.equal(p.estado,'CUARENTENA');
 assert.equal(p.hash_original,originals.get(p.id).hash);
 assert.equal(p.id,p.item.id);
 assert.equal(p.hash_propuesta,createHash('sha256').update(JSON.stringify(p.item)).digest('hex'));
 assert.notEqual(p.hash_original,p.hash_propuesta);
 assert.deepEqual(check(p.item),[]);
}
console.log(`${data.proposals.length} propuestas trazables en cuarentena; aceptación pendiente.`);
