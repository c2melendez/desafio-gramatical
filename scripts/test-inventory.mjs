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
  assert.equal(typeof row.habilitado_en_menu, 'boolean');
  assert.equal(row.registros_con_ruta_de_menu, row.habilitado_en_menu ? row.registros_tecnicos : 0);
  assert.equal(row.deficit_nucleo_en_ruta, Math.max(0,row.objetivo_nucleo-row.registros_con_ruta_de_menu));
}
assert.equal(inventory.resumen.celdas, keys.length);
assert.equal(inventory.resumen.registros_tecnicos,inventory.rows.reduce((n,r)=>n+r.registros_tecnicos,0));
assert.equal(inventory.resumen.registros_con_ruta_de_menu,inventory.rows.reduce((n,r)=>n+r.registros_con_ruta_de_menu,0));
for (const subtema of ['Sinónimos y antónimos','Cohesión y coherencia','Morfosintaxis']) {
  const selected=inventory.rows.filter(r=>r.tema==='Gramática y semántica' && r.subtema===subtema);
  assert.equal(selected.length,9);
  assert.ok(selected.filter(r=>r.juego==='construir').every(r=>r.habilitado_en_menu && r.registros_tecnicos===r.objetivo_nucleo));
}
assert.ok(inventory.rows.filter(r=>r.subtema==='Morfosintaxis' && r.juego==='clasificar').every(r=>r.habilitado_en_menu && r.registros_tecnicos===r.objetivo_nucleo));
console.log(`Inventario: ${keys.length} celdas únicas; valores desconocidos conservados.`);
