// Propuestas en cuarentena: no altera el banco jugable ni acredita integración.
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { check } from './review-draft-grammar.mjs';

const dir=process.argv[2];
if(!dir){console.error('Indique árbol del PR1');process.exit(2);}
const root=resolve(dir);
const sha=execFileSync('git',['-C',root,'rev-parse','HEAD'],{encoding:'utf8'}).trim();
if(sha!=='e1b22cddc81e49e3c68d9103cd547abf851d99a1') throw Error('SHA de fuente inesperado');
if(execFileSync('git',['-C',root,'status','--porcelain','--untracked-files=no'],{encoding:'utf8'}).trim()) throw Error('Árbol fuente modificado');
const {GRAMMAR_CLASSIFICATION_DRAFT,GRAMMAR_CONSTRUCTION_DRAFT}=await import(pathToFileURL(resolve(root,'src/lib/grammar-games-draft.ts')).href);
const source=[...GRAMMAR_CLASSIFICATION_DRAFT,...GRAMMAR_CONSTRUCTION_DRAFT];
const targets=['cl-sa-p2','cl-cc-a1','cl-cc-a2','co-sa-p2','co-ms-i2'];
const proposals=targets.map(id=>{
 const original=source.find(x=>x.id===id);
 if(!original) throw Error(`Falta ${id}`);
 const item=structuredClone(original);
 if(id==='cl-sa-p2') item.explanation='Bonito y hermoso son próximos; abierto y cerrado son contrarios; techo y jardín no son sinónimos ni antónimos.';
 if(id==='cl-cc-a1'||id==='cl-cc-a2') {
   item.labels=['Información indicada directamente','Deducción a partir de la información','No se puede concluir'];
   item.prompt='Clasifica cada afirmación según la información del informe.';
 }
 if(id==='co-sa-p2') {
   item.pieces[0]='Reconoce que «lleno» indica que no queda espacio libre en el recipiente.';
   item.explanation='Lleno indica que la capacidad está ocupada; vacío indica ausencia de contenido.';
 }
 if(id==='co-ms-i2') item.pieces[1]='muestra el sendero';
 const errors=check(item);
 if(errors.length) throw Error(`${id}: ${errors.join(', ')}`);
 return {id,hash_original:createHash('sha256').update(JSON.stringify(original)).digest('hex'),
   hash_propuesta:createHash('sha256').update(JSON.stringify(item)).digest('hex'),estado:'CUARENTENA',
   pendientes:['revisión de respuesta y alternativas','independencia y familia','integración','revisión docente'],item};
});
console.log(JSON.stringify({version:1,sha_fuente:sha,advertencia:'Propuestas sin integración ni aceptación pedagógica.',proposals},null,2));
