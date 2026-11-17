// Inventario técnico, no valida independencia, revisión ni disponibilidad real en UI.
import { execFileSync } from 'node:child_process';
import { coverageRows } from '../src/lib/coverage.ts';
import { availableModule } from '../src/lib/phuma-catalog.ts';
import { GRAMMAR_PILOT_SUBTOPICS } from '../src/lib/grammar-next-draft.ts';
import {GRAMMAR_M1_ACTIVITIES} from '../src/lib/grammar-m1-activities.ts';

const sha = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
const dirty = execFileSync('git', ['status', '--porcelain', '--untracked-files=no'], { encoding: 'utf8' }).trim() !== '';
const sourceHashes = Object.fromEntries(['src/lib/coverage.ts', 'src/lib/phuma-catalog.ts'].map(path =>
  [path, execFileSync('git', ['hash-object', path], { encoding: 'utf8' }).trim()]));
// Reproduce las condiciones de activación de src/routes/index.tsx y jugar.tsx.
function menuEnabled(row) {
  if (row.area === 'espanol' && row.topic === 'Gramática y semántica'
    && GRAMMAR_PILOT_SUBTOPICS.includes(row.subtopic)) {
    return row.mode === 'quiz' ||
      (row.mode === 'clasificar' && ['Sinónimos y antónimos','Cohesión y coherencia'].includes(row.subtopic)) ||
      GRAMMAR_M1_ACTIVITIES.some(x=>x.subtopic===row.subtopic&&x.level===row.level&&x.kind===(row.mode==='construir'?'construction':'classification'));
  }
  return availableModule(row.area,row.topic,row.subtopic);
}
const rows = coverageRows().map(row => ({
  habilitado_en_menu: menuEnabled(row),
  registros_con_ruta_de_menu: menuEnabled(row) ? row.available : 0,
  deficit_nucleo_en_ruta: Math.max(0,row.stageOne-(menuEnabled(row) ? row.available : 0)),
  area: row.area, tema: row.topic, subtema: row.subtopic, juego: row.mode, nivel: row.level,
  registros_tecnicos: row.available, objetivo_nucleo: row.stageOne, objetivo_final: row.target,
  deficit_tecnico_nucleo: Math.max(0, row.stageOne-row.available),
  integrado_verificado: null, independientes_verificados: null, revision_automatica: null,
  revision_humana: null, elegibilidad: 'NO_VERIFICADA',
}));
const resumen = { celdas: rows.length, celdas_habilitadas: rows.filter(x=>x.habilitado_en_menu).length,
  registros_tecnicos: rows.reduce((n,x)=>n+x.registros_tecnicos,0),
  registros_con_ruta_de_menu: rows.reduce((n,x)=>n+x.registros_con_ruta_de_menu,0),
  deficit_nucleo_en_ruta: rows.reduce((n,x)=>n+x.deficit_nucleo_en_ruta,0),
  por_area: Object.fromEntries([...new Set(rows.map(x=>x.area))].map(area=>{
    const subset=rows.filter(x=>x.area===area);
    return [area,{subtemas:new Set(subset.map(x=>x.tema+'\\0'+x.subtema)).size,celdas:subset.length,
      registros_tecnicos:subset.reduce((n,x)=>n+x.registros_tecnicos,0),
      registros_con_ruta_de_menu:subset.reduce((n,x)=>n+x.registros_con_ruta_de_menu,0)}];
  })) };
console.log(JSON.stringify({ version: 2, sha, arbol_modificado: dirty, hashes_fuentes: sourceHashes, resumen,
  fuente: 'src/lib/coverage.ts', advertencia: 'Ruta habilitada = deducción estática de las condiciones del menú; NO es prueba funcional de carga, calidad, independencia ni aprobación editorial.', rows }, null, 2));
