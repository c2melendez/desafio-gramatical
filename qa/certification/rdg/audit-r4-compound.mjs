import {createHash} from 'node:crypto';
import {OPERATIONS_ROUTE} from '../../../src/lib/rdg/operations.ts';
import {mathM3Pool} from '../../../src/lib/math-m3.ts';
import {MATH_LEVELS,MATH_MODES} from '../../../src/lib/math-m1.ts';
const assert=(c,m)=>{if(!c)throw Error(m)},fmt=n=>String(n).replace('-','−');
const oracle={
 A17:{answer:(14+11)*4-(14+8)*6,wrong:[(14+8)*6-(14+11)*4,(14+11)*4,(14+8)*6]},
 A18:{answer:100+9-4*6,wrong:[100+4*6-9,100+9,100-4*6]},
 A19:{answer:(10*8-2*5)/7,wrong:[10*8-2*5,10*8,10*8/10]},
 A20:{answer:(Math.sqrt(64)-3)*(4+Math.sqrt(9))-2,wrong:[5*7,5+7-2,(8+3)*7-2]},
 T21:{answer:(15+5)*4-(13+5)*7,wrong:[(13+5)*7-(15+5)*4,(15+5)*4,(13+5)*7]},
 T22:{answer:91+8-5*3,wrong:[91+5*3-8,91+8,91-5*3]},
 T23:{answer:(12*7-3*4)/8,wrong:[12*7-3*4,12*7,12*7/12]},
 T24:{answer:(Math.sqrt(81)-4)*(6+Math.sqrt(16))-3,wrong:[5*10,5+10-3,(9+4)*10-3]},
};
const bank=MATH_LEVELS.flatMap(l=>MATH_MODES.flatMap(m=>mathM3Pool('Aritmética','Operaciones',l,m)));
assert(bank.length===450&&new Set(bank.map(x=>x.id)).size===450,'inventario');
const tasks=[...OPERATIONS_ROUTE.lessons,...OPERATIONS_ROUTE.transfer],records=[];
for(const [id,o] of Object.entries(oracle)){
 const x=tasks.find(t=>t.id===id);assert(x,`falta ${id}`);assert(x.answer===fmt(o.answer),`clave ${id}`);
 assert(x.options.length===4&&new Set(x.options).size===4,`opciones ${id}`);
 assert(JSON.stringify(x.options.filter(v=>v!==x.answer).sort())===JSON.stringify(o.wrong.map(fmt).sort()),`distractores ${id}`);
 assert(x.options.filter(v=>v!==x.answer).every(v=>x.errors[v]),`retroalimentación ${id}`);
 assert(!bank.some(b=>b.prompt===x.prompt),`colisión literal ${id}`);assert(id.startsWith('A')?x.bridge?.length===3:!x.bridge&&!x.hint,`ayuda ${id}`);
 records.push({id,answer:x.answer,task_sha256:createHash('sha256').update(JSON.stringify(x)).digest('hex')});
}
const names=['comparar-cambios-compensados','reconstruir-inventario-inicial','reparto-neto-exacto','dos-raices-en-producto-agrupado'];
const families=Object.fromEntries(names.map(op=>[op,bank.filter(x=>x.operation===op).map(x=>x.id)]));
assert(names.every(op=>families[op].length===9),'familias cambiaron; revisar alcance');
console.log(JSON.stringify({status:'PASS_TECNICO',scope:'MAT-ARIT-01',route_revision:OPERATIONS_ROUTE.revision,plan_sha256:OPERATIONS_ROUTE.planSha256,bank_size:bank.length,records,families,semantic_certification:'NOT_GRANTED',limits:'Cuatro familias y colisión literal; no acredita suficiencia global ni eficacia empírica.'},null,2));
