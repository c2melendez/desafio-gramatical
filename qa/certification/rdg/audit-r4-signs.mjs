import {createHash} from 'node:crypto';
import {OPERATIONS_ROUTE} from '../../../src/lib/rdg/operations.ts';
import {mathM3Pool} from '../../../src/lib/math-m3.ts';
import {MATH_LEVELS,MATH_MODES} from '../../../src/lib/math-m1.ts';
const check=(condition,message)=>{if(!condition)throw Error(message);};
const format=x=>String(x).replace('-', '−');
// Oráculos y errores derivados por separado de los textos de respuesta.
const independent={
 A11:{answer:8-(-3)-2,wrong:[8-3-2,8+3+2,8-(-3)]},
 A12:{answer:-6*3+2,wrong:[6*3+2,-6*(3+2),-6*3-2]},
 T10:{answer:-7-(-5),wrong:[-7+(-5),-5-(-7),7+5]},
 T11:{answer:6*(-3)+4,wrong:[6*(-3)-4,6*3+4,6*(-3+4)]},
};
const tasks=[...OPERATIONS_ROUTE.lessons,...OPERATIONS_ROUTE.transfer];
const bank=MATH_LEVELS.flatMap(level=>MATH_MODES.flatMap(mode=>mathM3Pool('Aritmética','Operaciones',level,mode)));
check(bank.length===450&&new Set(bank.map(x=>x.id)).size===450,'inventario');
const records=[];
for(const [id,oracle] of Object.entries(independent)){
 const x=tasks.find(t=>t.id===id);check(x,`falta ${id}`);
 check(x.answer===format(oracle.answer),`clave ${id}`);
 check(x.options.length===4&&new Set(x.options).size===4,`opciones ${id}`);
 check(JSON.stringify(x.options.filter(o=>o!==x.answer).sort())===JSON.stringify(oracle.wrong.map(format).sort()),`distractores ${id}`);
 check(x.options.filter(o=>o!==x.answer).every(o=>x.errors[o]),`feedback ${id}`);
 check(!bank.some(b=>b.prompt===x.prompt),`colisión literal ${id}`);
 check(id.startsWith('T')?!x.bridge&&!x.hint:x.bridge?.length===3,`ayuda ${id}`);
 records.push({id,answer:x.answer,task_sha256:createHash('sha256').update(JSON.stringify(x)).digest('hex')});
}
const families=Object.fromEntries(['resta-de-entero-negativo','producto-negativo-y-suma'].map(op=>[op,bank.filter(x=>x.operation===op).map(x=>x.id)]));
check(families['resta-de-entero-negativo'].length===9&&families['producto-negativo-y-suma'].length===6,'familias cambiaron; revisar alcance');
console.log(JSON.stringify({status:'PASS_TECNICO',scope:'MAT-ARIT-01',route_revision:OPERATIONS_ROUTE.revision,plan_sha256:OPERATIONS_ROUTE.planSha256,bank_size:bank.length,records,families,semantic_certification:'NOT_GRANTED',limits:'Comprobación de las dos brechas y colisión literal; no prueba paridad completa ni eficacia empírica.'},null,2));
