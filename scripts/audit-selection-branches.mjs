import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
const norm=x=>String(x??'').normalize('NFKC').toLocaleLowerCase('es').replace(/\s+/g,' ').trim();
const hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
export function inspect(item){
 const errors=[];
 if(![item.id,item.subtopic,item.level,item.passage,item.question,item.explanation].every(x=>typeof x==='string'&&x.trim()))errors.push('campos ausentes');
 if(!['principiante','intermedio','avanzado'].includes(item.level))errors.push('nivel inválido');
 if(!Array.isArray(item.options)||item.options.length!==4||item.options.some(x=>!norm(x))||new Set(item.options.map(norm)).size!==4)errors.push('opciones inválidas');
 if(!Number.isInteger(item.answer)||item.answer<0||item.answer>=4)errors.push('índice de clave inválido');
 return errors;
}
if(process.argv[1] && resolve(process.argv[1])===resolve(new URL(import.meta.url).pathname)){
 const [a,b]=process.argv.slice(2);if(!a||!b){console.error('Indique árboles de main y PR1');process.exit(2);}
 const paths=[resolve(a),resolve(b)];
 const sources=paths.map(path=>({path,sha:execFileSync('git',['-C',path,'rev-parse','HEAD'],{encoding:'utf8'}).trim(),
  dirty:!!execFileSync('git',['-C',path,'status','--porcelain','--untracked-files=no'],{encoding:'utf8'}).trim()}));
 if(sources.some(x=>x.dirty))throw Error('Árbol fuente modificado');
 const banks=await Promise.all(paths.map(async path=>(await import(pathToFileURL(resolve(path,'src/lib/grammar-next-draft.ts')).href)).GRAMMAR_NEXT_DRAFT));
 const keys=items=>new Set(items.map(x=>`${norm(x.passage)}\u0000${norm(x.question)}`));
 const sets=banks.map(keys);
 const rows=banks.flatMap((items,i)=>items.filter(x=>!sets[1-i].has(`${norm(x.passage)}\u0000${norm(x.question)}`)).map(x=>{
  const errors=inspect(x);
  return {rama:i===0?'main':'pr1',id:x.id,subtema:x.subtopic,nivel:x.level,hash:hash(x),posicion_clave:x.answer,
   estructura:errors.length?'RECHAZADO':'VERIFICADO',errores:errors,clave_unica:'INCONCLUSO',independencia:'INCONCLUSA',integracion:'NO_VERIFICADA',conteo_aceptado:0};
 }));
 console.log(JSON.stringify({version:1,fuentes:sources.map(({sha,dirty})=>({sha,dirty})),
  advertencia:'Estructura y huella no prueban unicidad, validez de clave ni independencia semántica.',rows},null,2));
 if(rows.some(x=>x.estructura==='RECHAZADO'))process.exitCode=1;
}
