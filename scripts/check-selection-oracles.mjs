import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { verificarRespuesta } from './content-contracts.mjs';
const manual=JSON.parse(readFileSync('docs/evidencia/oraculos-seleccion-72-20261117.json','utf8'));
const inventory=JSON.parse(readFileSync('docs/evidencia/seleccion-distinta-20261117.json','utf8'));
const key=x=>`${x.rama}\0${x.id}`;
const entries=new Map(inventory.rows.map(x=>[key(x),x]));
assert.equal(manual.respuestas.length,72);
assert.equal(new Set(manual.respuestas.map(key)).size,72);
assert.deepEqual([...entries.keys()].sort(),manual.respuestas.map(key).sort());
for(const row of manual.respuestas){
 assert.equal(row.decision,'PROPUESTA_AUTOMATICA');assert.equal(row.unicidad,'INCONCLUSA');assert.equal(row.docente,'PENDIENTE');
 assert.ok(row.respuesta_textual.trim());
}
if(process.argv[2]&&process.argv[3]){
 let compared=0;
 for(const [i,branch] of ['main','pr1'].entries()){
  const dir=resolve(process.argv[i+2]);
  const sha=execFileSync('git',['-C',dir,'rev-parse','HEAD'],{encoding:'utf8'}).trim();
  assert.equal(sha,manual.fuentes[branch]);
  assert.equal(execFileSync('git',['-C',dir,'status','--porcelain','--untracked-files=no'],{encoding:'utf8'}).trim(),'');
  const {GRAMMAR_NEXT_DRAFT}=await import(pathToFileURL(resolve(dir,'src/lib/grammar-next-draft.ts')).href);
  const bank=new Map(GRAMMAR_NEXT_DRAFT.map(x=>[x.id,x]));
  for(const row of manual.respuestas.filter(x=>x.rama===branch)){
   const item=bank.get(row.id);assert.ok(item,`${branch}:${row.id} ausente`);
   assert.equal(createHash('sha256').update(JSON.stringify(item)).digest('hex'),entries.get(key(row)).hash);
   const matching=item.options.map((x,i)=>x===row.respuesta_textual?i:-1).filter(i=>i>=0);
   assert.equal(matching.length,1,`${branch}:${row.id}: respuesta textual no es única entre opciones`);
   const verdict=verificarRespuesta({...item,kind:'quiz'},{correctIndices:matching});
   assert.equal(verdict.status,'VERIFICADO',`${branch}:${row.id}: contradicción entre propuesta y clave`);
   compared++;
  }
 }
 console.log(`${compared} propuestas automáticas coinciden con las claves; unicidad semántica y revisión docente pendientes.`);
}else console.log('72 oráculos propuestos están enlazados por ID; comparación con código NO EJECUTADA.');
