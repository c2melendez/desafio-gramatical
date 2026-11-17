// Ejecutar con el resolver del proyecto y dos árboles git explícitos.
// Compara identidad y texto normalizado; nunca decide independencia pedagógica.
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const [mainArg, draftArg] = process.argv.slice(2);
if (!mainArg || !draftArg) {
  console.error('Uso: node --import ./scripts/ts-resolve.mjs scripts/reconcile-grammar.mjs <árbol-main> <árbol-pr1>');
  process.exit(2);
}
const main = resolve(mainArg), draft = resolve(draftArg);
const sha = dir => execFileSync('git', ['-C',dir,'rev-parse','HEAD'], {encoding:'utf8'}).trim();
const status = dir => execFileSync('git', ['-C',dir,'status','--porcelain','--untracked-files=no'], {encoding:'utf8'}).trim();
const load = (dir,path) => import(pathToFileURL(resolve(dir,'src/lib',path)).href);
const [{GRAMMAR_NEXT_DRAFT:mainQuiz},{SYNONYM_CLASSIFICATION},{COHESION_CLASSIFICATION},
  {GRAMMAR_NEXT_DRAFT:draftQuiz},{GRAMMAR_CLASSIFICATION_DRAFT,GRAMMAR_CONSTRUCTION_DRAFT}] = await Promise.all([
  load(main,'grammar-next-draft.ts'),load(main,'grammar-classify-synonyms.ts'),load(main,'grammar-classify-cohesion.ts'),
  load(draft,'grammar-next-draft.ts'),load(draft,'grammar-games-draft.ts')]);
const norm = x => String(x ?? '').normalize('NFKC').toLocaleLowerCase('es').replace(/\s+/g,' ').trim();
const hash = x => createHash('sha256').update(x).digest('hex');
const qkey = x => `${norm(x.passage)}\u0000${norm(x.question)}`;
const groups = [
  ['main','quiz',mainQuiz], ['main','clasificar',SYNONYM_CLASSIFICATION], ['main','clasificar',COHESION_CLASSIFICATION],
  ['pr1','quiz',draftQuiz], ['pr1','clasificar',GRAMMAR_CLASSIFICATION_DRAFT], ['pr1','construir',GRAMMAR_CONSTRUCTION_DRAFT],
];
const all = groups.flatMap(([branch,mode,items]) => items.map(item => ({
  rama:branch, id:item.id, subtema:item.subtopic, juego:mode, nivel:item.level,
  hash_contenido:hash(JSON.stringify(item)),
  huella_estimulo_pregunta:mode==='quiz'?hash(qkey(item)):null,
  estado_editorial:item.reviewStatus ?? 'DESCONOCIDO',
  integracion_verificada: null, independencia: 'NO_VERIFICADA', revision_humana: 'NO_VERIFICADA',
})));
const duplicates = [];
for (const branch of ['main','pr1']) {
  const seen = new Map();
  for (const row of all.filter(x=>x.rama===branch)) {
    if (seen.has(row.id)) duplicates.push({rama:branch,id:row.id});
    seen.set(row.id,true);
  }
}
const duplicateQuiz = [];
for (const [branch, items] of [['main',mainQuiz],['pr1',draftQuiz]]) {
  const seen = new Map();
  for (const item of items) {
    const key = qkey(item);
    if (seen.has(key)) duplicateQuiz.push({rama:branch,id:item.id,coincide_con:seen.get(key)});
    else seen.set(key,item.id);
  }
}
const byId = new Map(mainQuiz.map(x=>[x.id,x]));
const byKey = new Map();
for (const item of mainQuiz) {
  const key=qkey(item); if(!byKey.has(key)) byKey.set(key,[]); byKey.get(key).push(item.id);
}
const comparisons = draftQuiz.map(item => ({
  id_pr1:item.id, id_en_main:byId.has(item.id)?item.id:null,
  ids_main_mismo_estimulo_y_pregunta:byKey.get(qkey(item)) ?? [],
  contenido_identico_mismo_id:byId.has(item.id)?hash(JSON.stringify(item))===hash(JSON.stringify(byId.get(item.id))):null,
}));
console.log(JSON.stringify({version:1, fuentes:{main:{sha:sha(main),arbol_modificado:!!status(main)},pr1:{sha:sha(draft),arbol_modificado:!!status(draft)}},
  advertencia:'Coincidencia exacta normalizada no demuestra independencia, corrección, integración ni revisión docente.',
  resumen:{registros_por_rama:all.reduce((a,x)=>(a[x.rama]=(a[x.rama]??0)+1,a),{}),ids_duplicados_misma_rama:duplicates,
    quiz_estimulo_pregunta_duplicados:duplicateQuiz,
    quiz_ids_compartidos:comparisons.filter(x=>x.id_en_main).length,
    quiz_estimulo_y_pregunta_compartidos:comparisons.filter(x=>x.ids_main_mismo_estimulo_y_pregunta.length).length,
    quiz_mismo_id_contenido_distinto:comparisons.filter(x=>x.contenido_identico_mismo_id===false).length},
  registros:all,comparacion_quiz:comparisons},null,2));
if (duplicates.length) process.exitCode=1;
