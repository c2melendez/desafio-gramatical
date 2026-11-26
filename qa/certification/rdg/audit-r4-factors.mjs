import {createHash} from 'node:crypto';
import {OPERATIONS_ROUTE} from '../../../src/lib/rdg/operations.ts';
import {mathM3Pool} from '../../../src/lib/math-m3.ts';
import {MATH_LEVELS,MATH_MODES} from '../../../src/lib/math-m1.ts';
const check=(c,m)=>{if(!c)throw Error(m)};
const fmt=x=>String(x).replace('-','−');
const oracle={
 A14:{answer:12*7-12*2+3*7-3*2,wrong:[12*(7-2),12*7+12*2+3*7+3*2,12*7-12*2+3*7]},
 A15:{answer:6*(5-2)-5*(6-3),wrong:[6*(5-2)+5*(6-3),6*5-6*2-5*6-5*3,6*(5-2)]},
 A16:{answer:(6*(8+8)-6*8)/3,wrong:[6*(8+8)-6*8,6*(8+8)/3,(8+8)-8]},
 T13:{answer:8*6-8+2*6-2,wrong:[8*(6-1),8*6+8+2*6+2,8*6-8+2*6]},
 T14:{answer:9*(4-2)-4*(9-5),wrong:[9*(4-2)+4*(9-5),9*4-9*2-4*9-4*5,9*(4-2)]},
 T15:{answer:(5*(9+9)-5*9)/3,wrong:[5*(9+9)-5*9,5*(9+9)/3,(9+9)-9]},
};
const tasks=[...OPERATIONS_ROUTE.lessons,...OPERATIONS_ROUTE.transfer];
const bank=MATH_LEVELS.flatMap(l=>MATH_MODES.flatMap(m=>mathM3Pool('Aritmética','Operaciones',l,m)));
check(bank.length===450&&new Set(bank.map(x=>x.id)).size===450,'inventario');
const records=[];
for(const [id,o] of Object.entries(oracle)){
 const x=tasks.find(t=>t.id===id);check(x,`falta ${id}`);check(x.answer===fmt(o.answer),`clave ${id}`);
 check(x.options.length===4&&new Set(x.options).size===4,`opciones ${id}`);
 check(JSON.stringify(x.options.filter(v=>v!==x.answer).sort())===JSON.stringify(o.wrong.map(fmt).sort()),`distractores ${id}`);
 check(x.options.filter(v=>v!==x.answer).every(v=>x.errors[v]),`retroalimentación ${id}`);
 check(!bank.some(b=>b.prompt===x.prompt),`colisión literal ${id}`);
 check(id.startsWith('A')?x.bridge?.length===3:!x.bridge&&!x.hint,`ayuda ${id}`);
 records.push({id,answer:x.answer,task_sha256:createHash('sha256').update(JSON.stringify(x)).digest('hex')});
}
const names=['factor-comun-dos-grupos','cancelacion-cruzada-de-productos','factor-desconocido-tras-cancelar'];
const families=Object.fromEntries(names.map(op=>[op,bank.filter(x=>x.operation===op).map(x=>x.id)]));
check(names.every(op=>families[op].length===9),'familia cambió; revisar alcance');
console.log(JSON.stringify({status:'PASS_TECNICO',scope:'MAT-ARIT-01',route_revision:OPERATIONS_ROUTE.revision,plan_sha256:OPERATIONS_ROUTE.planSha256,bank_size:bank.length,records,families,semantic_certification:'NOT_GRANTED',limits:'Tres familias y colisión literal; no prueba paridad completa ni eficacia empírica.'},null,2));
