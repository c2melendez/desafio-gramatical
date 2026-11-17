import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { verificarEstructura,verificarRespuesta,verificarIntegracion,aggregate } from './content-contracts.mjs';
const root=resolve(process.argv[2]??'.');
const sha=execFileSync('git',['-C',root,'rev-parse','HEAD'],{encoding:'utf8'}).trim();
if(sha!=='14398e47a8644d694041f62cf800a956e0b5c2bf')throw Error('Se requiere SHA de main inventariado');
if(execFileSync('git',['-C',root,'status','--porcelain','--untracked-files=no'],{encoding:'utf8'}).trim())throw Error('Árbol de contenido modificado');
const load=path=>import(pathToFileURL(resolve(root,'src/lib',path)).href);
const [{GRAMMAR_NEXT_DRAFT},{SYNONYM_CLASSIFICATION},{COHESION_CLASSIFICATION}]=await Promise.all([load('grammar-next-draft.ts'),load('grammar-classify-synonyms.ts'),load('grammar-classify-cohesion.ts')]);
const bank=[...GRAMMAR_NEXT_DRAFT.map(x=>({...x,kind:'quiz'})),...SYNONYM_CLASSIFICATION,...COHESION_CLASSIFICATION];
const counts=new Map();for(const x of bank)counts.set(x.id,(counts.get(x.id)??0)+1);
const rows=bank.map(item=>{
 const estructura=verificarEstructura(item,counts),respuesta=verificarRespuesta(item,null),integracion=verificarIntegracion(item,null);
 return {id:item.id,nivel:item.level,subtema:item.subtopic,juego:item.kind,hash:createHash('sha256').update(JSON.stringify(item)).digest('hex'),
 estructura,respuesta,integracion,resultado:aggregate(estructura,respuesta,integracion),revision_docente:'PENDIENTE'};
});
console.log(JSON.stringify({version:1,fuente:sha,alcance:'225 registros declarados en bloque abierto; índice exclusivo de este bloque, no de todo el banco',
 advertencia:'Sin oráculo editorial independiente ni observación funcional por ítem; no se acredita respuesta o integración.',rows},null,2));
if(rows.some(x=>x.resultado==='RECHAZADO'))process.exitCode=1;
