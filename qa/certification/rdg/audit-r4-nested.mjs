import {createHash} from 'node:crypto';
import {OPERATIONS_ROUTE} from '../../../src/lib/rdg/operations.ts';
import {mathM3Pool} from '../../../src/lib/math-m3.ts';
import {MATH_LEVELS,MATH_MODES} from '../../../src/lib/math-m1.ts';
const check=(condition,message)=>{if(!condition)throw Error(message)};
const fmt=x=>String(x).replace('-', '−');
const expected={A13:{answer:20-(7-2*(6-1)),wrong:[20-7-2*(6-1),20-7,7-2*(6-1)]},T12:{answer:25-(11-3*5),wrong:[25-11,25-11-3*5,11-3*5]}};
const tasks=[...OPERATIONS_ROUTE.lessons,...OPERATIONS_ROUTE.transfer];
const bank=MATH_LEVELS.flatMap(level=>MATH_MODES.flatMap(mode=>mathM3Pool('Aritmética','Operaciones',level,mode)));
check(bank.length===450&&new Set(bank.map(x=>x.id)).size===450,'inventario');
const records=[];
for(const [id,o] of Object.entries(expected)){
 const x=tasks.find(t=>t.id===id);check(x,`falta ${id}`);check(x.answer===fmt(o.answer),`clave ${id}`);
 check(x.options.length===4&&new Set(x.options).size===4,`opciones ${id}`);
 check(JSON.stringify(x.options.filter(v=>v!==x.answer).sort())===JSON.stringify(o.wrong.map(fmt).sort()),`distractores ${id}`);
 check(x.options.filter(v=>v!==x.answer).every(v=>x.errors[v]),`feedback ${id}`);
 check(!bank.some(b=>b.prompt===x.prompt),`colisión literal ${id}`);
 check(id==='A13'?x.bridge?.length===3:!x.bridge&&!x.hint,`ayuda ${id}`);
 records.push({id,answer:x.answer,task_sha256:createHash('sha256').update(JSON.stringify(x)).digest('hex')});
}
const ids=bank.filter(x=>x.operation==='resta-anidada-distributiva').map(x=>x.id);
check(ids.length===9,'familia cambió; revisar alcance');
console.log(JSON.stringify({status:'PASS_TECNICO',scope:'MAT-ARIT-01',route_revision:OPERATIONS_ROUTE.revision,plan_sha256:OPERATIONS_ROUTE.planSha256,bank_size:bank.length,records,family:'resta-anidada-distributiva',ids,semantic_certification:'NOT_GRANTED',limits:'Revisa esta familia y colisión literal; no prueba paridad completa ni eficacia empírica.'},null,2));
