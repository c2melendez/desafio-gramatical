import assert from 'node:assert/strict';
import {auditIds} from './inventory-items.mjs';
import {verificarEstructura,verificarRespuesta,verificarIntegracion} from './content-contracts.mjs';
import {emptyRotation,parseRotation,recordRotation,selectRotation,rotationKey} from '../src/lib/rotation.ts';
import {availableModule} from '../src/lib/phuma-catalog.ts';

/* Ensayos de mutación sobre entradas reales de verificadores y lógica de rotación.
   No son mutaciones del binario ni demuestran revisión académica. */
const q={id:'q1',kind:'quiz',level:'principiante',subtopic:'Sinónimos y antónimos',
  passage:'Texto de prueba.',question:'¿Cuál opción corresponde?',options:['A','B','C','D'],
  answer:1,explanation:'La respuesta es B.'};
let detected=0;
const cases=[
 ['duplicar ID',()=>!auditIds([{id:'a'},{id:'a'}],2).matches],
 ['clave fuera de rango',()=>verificarEstructura({...q,answer:4},new Map([['q1',1]])).status==='RECHAZADO'],
 ['dos opciones normalizadas iguales',()=>verificarEstructura({...q,options:['A',' a ','C','D']},new Map([['q1',1]])).status==='RECHAZADO'],
 ['cambiar nivel a desconocido',()=>verificarEstructura({...q,level:'superior'},new Map([['q1',1]])).status==='RECHAZADO'],
 ['clave falsa contra oráculo',()=>verificarRespuesta({...q,answer:0},{correctIndices:[1]}).status==='RECHAZADO'],
 ['dos claves correctas según oráculo',()=>verificarRespuesta(q,{correctIndices:[1,2]}).status==='RECHAZADO'],
 ['omitir ruta de UI',()=>verificarIntegracion(q,{routePresent:false,poolPresent:true,level:q.level,subtopic:q.subtopic,kind:q.kind}).status==='RECHAZADO'],
 ['desconectar el banco',()=>verificarIntegracion(q,{routePresent:true,poolPresent:false,level:q.level,subtopic:q.subtopic,kind:q.kind}).status==='RECHAZADO'],
 ['nivel incompatible con ruta',()=>verificarIntegracion(q,{routePresent:true,poolPresent:true,level:'avanzado',subtopic:q.subtopic,kind:q.kind}).status==='RECHAZADO'],
 ['duplicar ID en una sesión',()=>{try{selectRotation([{id:'x'},{id:'x'}],emptyRotation(),2);return false}catch{return true}}],
 ['borrar progreso guardado',()=>{
    const s=recordRotation(emptyRotation(),'x',false);
    const corrupt=JSON.stringify({...s,seen:[]});
    return parseRotation(corrupt,['x']).seen.length!==s.seen.length;
 }],
 ['fusionar claves de dificultad',()=>rotationKey('espanol','Gramática','Sinónimos','quiz','principiante')!==rotationKey('espanol','Gramática','Sinónimos','quiz','avanzado')],
 ['habilitar área ajena a catálogo',()=>!availableModule('blandas','Convivencia','Subtema inexistente')],
];
for(const [label,fn] of cases){
 const ok=fn();
 assert.equal(ok,true,'mutante superviviente: '+label);
 detected++;
}
console.log(JSON.stringify({status:'PASS',scope:'mutaciones de fixtures contra verificadores y rotación reales, sin certificar todo el banco',generated:cases.length,applicable:cases.length,detected,survived:cases.length-detected,labels:cases.map(c=>c[0])},null,2));
