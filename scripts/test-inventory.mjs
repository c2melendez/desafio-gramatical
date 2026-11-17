import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
const out = execFileSync(process.execPath, ['--import', './scripts/ts-resolve.mjs', 'scripts/inventory-coverage.mjs'], { encoding: 'utf8' });
const inventory = JSON.parse(out);
const keys = inventory.rows.map(r => [r.area,r.tema,r.subtema,r.juego,r.nivel].join('\0'));
assert.equal(new Set(keys).size, keys.length, 'combinación repetida');
assert.ok(inventory.rows.length > 0);
for (const row of inventory.rows) {
  assert.ok(Number.isInteger(row.registros_tecnicos) && row.registros_tecnicos >= 0);
  assert.equal(row.deficit_tecnico_nucleo, Math.max(0,row.objetivo_nucleo-row.registros_tecnicos));
  assert.equal(row.independientes_verificados, null);
  assert.equal(row.integrado_verificado, null);
}
console.log(`Inventario: ${keys.length} celdas únicas; valores desconocidos conservados.`);
