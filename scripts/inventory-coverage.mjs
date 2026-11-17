// Inventario técnico, no valida independencia, revisión ni disponibilidad real en UI.
import { execFileSync } from 'node:child_process';
import { coverageRows } from '../src/lib/coverage.ts';

const sha = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
const dirty = execFileSync('git', ['status', '--porcelain', '--untracked-files=no'], { encoding: 'utf8' }).trim() !== '';
const sourceHashes = Object.fromEntries(['src/lib/coverage.ts', 'src/lib/phuma-catalog.ts'].map(path =>
  [path, execFileSync('git', ['hash-object', path], { encoding: 'utf8' }).trim()]));
const rows = coverageRows().map(row => ({
  area: row.area, tema: row.topic, subtema: row.subtopic, juego: row.mode, nivel: row.level,
  registros_tecnicos: row.available, objetivo_nucleo: row.stageOne, objetivo_final: row.target,
  deficit_tecnico_nucleo: Math.max(0, row.stageOne-row.available),
  integrado_verificado: null, independientes_verificados: null, revision_automatica: null,
  revision_humana: null, elegibilidad: 'NO_VERIFICADA',
}));
console.log(JSON.stringify({ version: 1, sha, arbol_modificado: dirty, hashes_fuentes: sourceHashes,
  fuente: 'src/lib/coverage.ts', advertencia: 'Conteos declarados por código; no son aceptación editorial ni prueba de integración o independencia.', rows }, null, 2));
