import {createHash} from 'node:crypto';
import {OPERATIONS_ROUTE} from '../../../src/lib/rdg/operations.ts';
const check=(c,m)=>{if(!c)throw Error(m)};
const frac=(n,d)=>{let a=Math.abs(n),b=d;while(b)[a,b]=[b,a%b];const g=a||1;return (d/g===1?String(n/g):`${n/g}/${d/g}`).replace('-','−')};
// Cálculos derivados por separado; los resultados son verificaciones matemáticas, no una aprobación de suficiencia pedagógica.
const expectations={
 'Divisor agrupado':[String(84/(5+7)),'= 7'],
 'Saldo con dos compras':[String(200-(6*7+20)),'= L 138'],
 'Cajas restantes y cambio por caja':[String((12-3)*(8+2)),'= 90 piezas'],
 'Dos flujos independientes':[String(4*9-2*5),'= 26 unidades'],
 'Raíz, producto y resta':[String(Math.sqrt(49)+4*3-5),'= 14'],
 'Diferencia con factor común':[String(15*6-(15-4)*6),'= 24'],
 'Raíz racional y diferencia agrupada':[frac(4-5,10),'= −1/10'],
 'Factor y raíz racional':[frac(2*(3-2)+1,10),'= 3/10'],
 'Productos distintos':[String(9*(4-2)-2*(4+2)),'= 6'],
 'Raíz, producto y cociente agrupado':[String(15-Math.sqrt(25)*2+(10-4)/3),'= 7'],
 'Raíz y productos racionales':[frac(4+4-5,18),'= 1/6'],
};
const records=[];
for(const [title,[answer,ending]] of Object.entries(expectations)){
 const matches=OPERATIONS_ROUTE.workedExamples.filter(x=>x.title===title);check(matches.length===1,'ejemplo duplicado o ausente '+title);
 const example=matches[0];check(example.text.includes(ending),'resultado visible '+title);
 check(ending.includes(answer),'oráculo no coincide '+title);
 records.push({title,answer,content_sha256:createHash('sha256').update(JSON.stringify(example)).digest('hex')});
}
console.log(JSON.stringify({status:'PASS_TECNICO',scope:'MAT-ARIT-01',plan_sha256:OPERATIONS_ROUTE.planSha256,examples:records,academic_status:'REVIEW',limitations:'Verifica cálculos y resultados visibles; no verifica semántica individual, suficiencia de la ruta ni eficacia empírica.'},null,2));
