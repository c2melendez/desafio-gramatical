import assert from 'node:assert/strict';
import {verificarEstructura as structure,verificarRespuesta as answer,verificarIntegracion as integration,aggregate} from './content-contracts.mjs';
const q={id:'q',kind:'quiz',level:'intermedio',subtopic:'s',passage:'Un estímulo.',question:'¿Cuál?',options:['A','B','C','D'],answer:1,explanation:'B es correcta.'};
const index=new Map([['q',1]]);
assert.equal(structure(q,index).status,'VERIFICADO');
assert.equal(answer(q,{correctIndices:[1]}).status,'VERIFICADO');
assert.equal(integration(q,{routePresent:true,poolPresent:true,level:'intermedio',subtopic:'s',kind:'quiz'}).status,'VERIFICADO');
// Mutaciones independientes con resultados predeterminados; no prueban validez de todo el banco.
const negatives=[
 [structure(q,new Map([['q',2]])),'ID duplicado'],
 [structure({...q,options:['A',' a ','C','D']},index),'opciones duplicadas'],
 [structure({...q,answer:4},index),'clave fuera del dominio'],
 [structure({...q,level:'otro'},index),'nivel desconocido'],
 [answer({...q,answer:0},{correctIndices:[1]}),'clave falsa'],
 [answer(q,{correctIndices:[0,1]}),'dos respuestas posibles'],
 [integration(q,{routePresent:false,poolPresent:true}),'ruta ausente'],
 [integration(q,{routePresent:true,poolPresent:true,level:'avanzado',subtopic:'s',kind:'quiz'}),'nivel equivocado'],
];
for(const [out,label] of negatives)assert.equal(out.status,'RECHAZADO',label);
assert.equal(answer(q,null).status,'INCONCLUSO');
assert.equal(integration(q,null).status,'INCONCLUSO');
assert.equal(aggregate(structure(q,index),answer(q,null)),'INCONCLUSO');
const c={id:'c',kind:'classification',level:'principiante',subtopic:'s',prompt:'Clasifica',explanation:'Razón',labels:['A','B'],items:[{id:'x',text:'Ejemplo',label:'A',explanation:'A'}]};
assert.equal(structure(c,new Map([['c',1]])).status,'VERIFICADO');
assert.equal(answer(c,{labels:{x:'B'}}).status,'RECHAZADO');
assert.equal(answer(c,{labels:{}}).status,'INCONCLUSO');
console.log('Contratos: 8/8 mutaciones previstas detectadas; ausencia de oráculo y ruta no se acreditan.');
