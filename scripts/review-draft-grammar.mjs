// Controles estructurales de borradores del PR1. No verifica corrección ni independencia.
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const norm = x => String(x ?? '').normalize('NFKC').toLocaleLowerCase('es').replace(/\s+/g,' ').trim();
const unique = list => new Set(list.map(norm)).size === list.length;
export function check(item) {
  const issues=[];
  if (![item.id,item.context,item.prompt,item.explanation,item.subtopic,item.level].every(x=>typeof x==='string'&&x.trim())) issues.push('campos generales ausentes');
  if (!['principiante','intermedio','avanzado'].includes(item.level)) issues.push('nivel inválido');
  if (item.kind==='clasificar') {
    if (!Array.isArray(item.labels)||item.labels.length<2||!unique(item.labels)||item.labels.some(x=>!norm(x))) issues.push('etiquetas inválidas');
    if (!Array.isArray(item.items)||!item.items.length) issues.push('elementos ausentes');
    else {
      if (!unique(item.items.map(x=>x.text))) issues.push('elementos repetidos');
      if (item.items.some(x=>!norm(x.text)||!Number.isInteger(x.answer)||x.answer<0||x.answer>=(item.labels?.length ?? 0))) issues.push('elemento o clave inválida');
    }
  } else if (item.kind==='construir') {
    if (!Array.isArray(item.pieces)||item.pieces.length<2||!unique(item.pieces)||item.pieces.some(x=>!norm(x))) issues.push('fichas inválidas');
  } else issues.push('modalidad desconocida');
  return issues;
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(new URL(import.meta.url).pathname)) {
  if (!process.argv[2]) { console.error('Indique el árbol del PR1'); process.exit(2); }
  const dir=resolve(process.argv[2]);
  const {GRAMMAR_CLASSIFICATION_DRAFT,GRAMMAR_CONSTRUCTION_DRAFT}=await import(pathToFileURL(resolve(dir,'src/lib/grammar-games-draft.ts')).href);
  const sha=execFileSync('git',['-C',dir,'rev-parse','HEAD'],{encoding:'utf8'}).trim();
  const dirty=!!execFileSync('git',['-C',dir,'status','--porcelain','--untracked-files=no'],{encoding:'utf8'}).trim();
  const items=[...GRAMMAR_CLASSIFICATION_DRAFT,...GRAMMAR_CONSTRUCTION_DRAFT];
  const ids=new Set();
  const rows=items.map(item=>{
    const errors=check(item); if(ids.has(item.id)) errors.push('ID duplicado'); ids.add(item.id);
    const peer=item.id.replace(/([12])$/,(_,n)=>n==='1'?'2':'1');
    return {id:item.id,subtema:item.subtopic,juego:item.kind,nivel:item.level,
      hash:createHash('sha256').update(JSON.stringify(item)).digest('hex'),
      estructura:errors.length?'RECHAZADO':'VERIFICADO',errores:errors,
      candidato_familia:ids.has(peer)||items.some(x=>x.id===peer)?peer:null,
      respuesta:'INCONCLUSO',independencia:'INCONCLUSO',integracion:'NO_VERIFICADA',revision_docente:'PENDIENTE',
      causa:'Validar clave y todas las alternativas, similitud con su par y otros bancos; adaptar y probar modalidad antes de contar.'};
  });
  console.log(JSON.stringify({version:1,sha,arbol_modificado:dirty,advertencia:'La estructura no demuestra corrección, unicidad ni independencia.',rows},null,2));
  if(rows.some(x=>x.estructura==='RECHAZADO')) process.exitCode=1;
}
