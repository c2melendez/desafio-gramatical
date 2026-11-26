import {createHash} from 'node:crypto';
import {OPERATIONS_ROUTE} from '../../../src/lib/rdg/operations.ts';
import {mathM3Pool} from '../../../src/lib/math-m3.ts';
import {MATH_LEVELS,MATH_MODES} from '../../../src/lib/math-m1.ts';
const assert=(x,m)=>{if(!x)throw Error(m)},fmt=n=>String(n).replace('-','−');
const signature=s=>(s.match(/\d+/g)||[]).map(Number).sort((a,b)=>a-b).join(',');
const bank=MATH_LEVELS.flatMap(l=>MATH_MODES.flatMap(m=>mathM3Pool('Aritmética','Operaciones',l,m)));
const tasks=[...OPERATIONS_ROUTE.lessons,...OPERATIONS_ROUTE.transfer];
assert(bank.length===450&&new Set(bank.map(x=>x.id)).size===450&&tasks.length===44,'alcance');
const original=[{id:'A12',prompt:'Calcula −4 × 3 + 2.'},{id:'A17',prompt:'Una expresión vale (10 + 6) × 5. Aumenta el segundo sumando en 2 y reduce el factor en 1.'},{id:'T21',prompt:'Una expresión vale (8 + 4) × 6. Aumenta el primer sumando en 2 y reduce el factor en 1.'}];
const previous=original.map(x=>({id:x.id,candidates:bank.filter(b=>signature(b.prompt)===signature(x.prompt)).map(b=>b.id)}));
assert(previous.every(x=>x.candidates.length>0),'mutación no reproduce coincidencias anteriores');
const hits=[];
for(const t of tasks)for(const b of bank)if(signature(t.prompt)===signature(b.prompt))hits.push({task_id:t.id,game_id:b.id,task_prompt:t.prompt,game_prompt:b.prompt});
assert(hits.length===0,'coincidencia nueva requiere revisión');
const oracle={A12:{answer:-6*3+2,wrong:[6*3+2,-6*(3+2),-6*3-2]},A17:{answer:(14+11)*4-(14+8)*6,wrong:[(14+8)*6-(14+11)*4,(14+11)*4,(14+8)*6]},T21:{answer:(15+5)*4-(13+5)*7,wrong:[(13+5)*7-(15+5)*4,(15+5)*4,(13+5)*7]}};
const repaired=[];
for(const [id,o] of Object.entries(oracle)){
 const x=tasks.find(t=>t.id===id);assert(x&&x.answer===fmt(o.answer),'clave '+id);
 assert(JSON.stringify(x.options.filter(v=>v!==x.answer).sort())===JSON.stringify(o.wrong.map(fmt).sort()),'distractores '+id);
 assert(x.options.filter(v=>v!==x.answer).every(v=>x.errors[v]),'retroalimentación '+id);
 repaired.push({id,answer:x.answer,task_sha256:createHash('sha256').update(JSON.stringify(x)).digest('hex')});
}
console.log(JSON.stringify({status:'PASS_TECNICO',scope:'MAT-ARIT-01',plan_sha256:OPERATIONS_ROUTE.planSha256,bank_size:bank.length,route_tasks:tasks.length,previous_collisions:previous,repaired,remaining_candidates:hits,semantic_pass:0,limitations:'Igualdad de conjuntos de cifras es un filtro conservador; no detecta toda equivalencia ni sustituye revisión semántica.'},null,2));
