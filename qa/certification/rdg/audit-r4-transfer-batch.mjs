import {createHash} from 'node:crypto';
import {OPERATIONS_ROUTE} from '../../../src/lib/rdg/operations.ts';
import {mathM3Pool} from '../../../src/lib/math-m3.ts';
import {MATH_LEVELS,MATH_MODES} from '../../../src/lib/math-m1.ts';
const check=(c,m)=>{if(!c)throw Error(m)};
const integer=n=>String(n).replace('-','−');
const fraction=(n,d)=>{let a=Math.abs(n),b=d;while(b)[a,b]=[b,a%b];const g=a||1;return (d/g===1?String(n/g):`${n/g}/${d/g}`).replace('-','−')};
const oracle={
 T16:{answer:integer(96/(4+8)),wrong:[integer(96/4+8),integer(96/4-8),integer(96/(4*8))]},
 T17:{answer:integer((17-17)/5+12),wrong:[integer((17-17)/5),integer(-12),integer(5+12)]},
 T18:{answer:integer(26*4-(26-6)*4),wrong:[integer(26*4),integer((26-6)*4-26*4),integer((26-6)*4)]},
 T19:{answer:fraction(10-13,24),wrong:[fraction(13-10,24),fraction(10-14-1,24),fraction(5,12)]},
 T20:{answer:fraction(3*(6-7)+2,20),wrong:[fraction(3*(6-7),20),fraction(-3+4,20),fraction(-1+6,60)]},
};
const bank=MATH_LEVELS.flatMap(l=>MATH_MODES.flatMap(m=>mathM3Pool('Aritmética','Operaciones',l,m)));
check(bank.length===450&&new Set(bank.map(x=>x.id)).size===450,'inventario');
const records=[];
for(const [id,o] of Object.entries(oracle)){
 const x=OPERATIONS_ROUTE.transfer.find(t=>t.id===id);check(x,`falta ${id}`);check(x.answer===o.answer,`clave ${id}`);
 check(x.options.length===4&&new Set(x.options).size===4,`opciones ${id}`);
 check(JSON.stringify(x.options.filter(v=>v!==x.answer).sort())===JSON.stringify(o.wrong.sort()),`distractores ${id}`);
 check(x.options.filter(v=>v!==x.answer).every(v=>x.errors[v]),`retroalimentación ${id}`);
 check(!bank.some(b=>b.prompt===x.prompt),`colisión literal ${id}`);check(!x.bridge&&!x.hint,`ayuda ${id}`);
 records.push({id,answer:x.answer,task_sha256:createHash('sha256').update(JSON.stringify(x)).digest('hex')});
}
const names=['cociente-con-agrupacion','cero-dividido-por-no-cero','factor-comun-diferencia-compuesta','raiz-racional-resta-agrupada','distribuir-sobre-raiz-racional'];
const families=Object.fromEntries(names.map(op=>[op,bank.filter(x=>x.operation===op).map(x=>x.id)]));
check(names.reduce((n,op)=>n+families[op].length,0)===42,'familias cambiaron; revisar alcance');
console.log(JSON.stringify({status:'PASS_TECNICO',scope:'MAT-ARIT-01',route_revision:OPERATIONS_ROUTE.revision,plan_sha256:OPERATIONS_ROUTE.planSha256,bank_size:bank.length,records,families,semantic_certification:'NOT_GRANTED',limits:'Claves, distractores, ayuda y colisión literal; la suficiencia pedagógica y paridad completa requieren revisión.'},null,2));
