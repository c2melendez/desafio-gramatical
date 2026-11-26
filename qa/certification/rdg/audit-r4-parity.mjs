import {createHash} from 'node:crypto';
import {OPERATIONS_ROUTE} from '../../../src/lib/rdg/operations.ts';
import {mathM3Pool} from '../../../src/lib/math-m3.ts';
import {MATH_LEVELS,MATH_MODES} from '../../../src/lib/math-m1.ts';
const sha=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
const bank=MATH_LEVELS.flatMap(level=>MATH_MODES.flatMap(mode=>mathM3Pool('Aritmética','Operaciones',level,mode)));
const tasks=new Map([...OPERATIONS_ROUTE.lessons,...OPERATIONS_ROUTE.transfer].map(x=>[x.id,x]));
// Vínculos propuestos para revisión humana/semántica; no equivalen a cobertura suficiente.
const links={
 'prioridad-de-operaciones':['A2','A3','T5'],
 'resta-de-entero-negativo':['A11','T10'],
 'cociente-con-agrupacion':['A2','A3','T16'],
 'producto-negativo-y-suma':['A12','T11'],
 'cero-dividido-por-no-cero':['A3','T17'],
 'division-producto-izquierda-derecha':['A3','T5'],
 'enteros-desplazamiento-signos':['A1','T10'],
 'precedencia-sin-parentesis':['A2','A3','T5'],
 'modificar-parentesis-y-factor':['A4','T2'],
 'presupuesto-dos-compras':['A10','T9'],
 'reconstruir-inventario-inicial':['A7','A18','T22'],
 'comparar-cambios-compensados':['A4','A17','T21'],
 'reconstruir-cantidad-por-grupo':['A7','T6'],
 'comparar-ofertas-con-cargos-fijos':['A10','T9'],
 'cociente-de-diferencia-racional-con-raiz':['A9','T8'],
 'cambio-contextual-inventario':['A4','T1'],
 'inventario-flujos-independientes':['T1'],
 'reparto-neto-exacto':['A7','A19','T23'],
 'raiz-producto-suma-resta':['A6','T5'],
 'raiz-racionales-signos':['A6','T4'],
 'distributiva-y-cancelacion':['A5','T3'],
 'factor-comun-diferencia-compuesta':['A5','A14','T18'],
 'resta-anidada-distributiva':['A13','T12'],
 'cancelacion-cruzada-de-productos':['A15','T14'],
 'dos-raices-en-producto-agrupado':['A6','A20','T24'],
 'completar-igualdad-distributiva':['A8','T7'],
 'factor-desconocido-tras-cancelar':['A16','T15'],
 'raiz-racional-resta-agrupada':['A6','A9','A13','T19'],
 'distribuir-sobre-raiz-racional':['A5','A6','A9','T20'],
 'distributiva-signo-negativo':['A5','T3'],
 'factor-comun-dos-grupos':['A14','T13'],
 'diferencia-productos-no-identicos':['A15','T14'],
 'raiz-producto-cociente-agrupado':['A3','A6','T5'],
 'raiz-producto-racionales-combinados':['A6','A9','T4'],
};
if(bank.length!==450||new Set(bank.map(x=>x.id)).size!==450)throw Error('inventario');
const operations=new Set(bank.map(x=>x.operation));
if(operations.size!==34||Object.keys(links).length!==34||Object.keys(links).some(x=>!operations.has(x)))throw Error('familias desactualizadas');
const rows=Object.entries(links).map(([family,taskIds])=>{
 const records=bank.filter(x=>x.operation===family);
 if(!taskIds.length||taskIds.some(id=>!tasks.has(id)))throw Error('ruta inexistente: '+family);
 return {family,count:records.length,task_ids:taskIds,game_records:records.map(x=>({id:x.id,content_sha256:sha(x)})),status:'REVIEW',note:'Relación propuesta; suficiencia, distractores y decisiones de cada ID requieren revisión independiente.'};
});
if(rows.reduce((n,x)=>n+x.count,0)!==450)throw Error('cobertura incompleta');
console.log(JSON.stringify({status:'INVENTARIO_REVIEW',scope:'MAT-ARIT-01',route_revision:OPERATIONS_ROUTE.revision,plan_sha256:OPERATIONS_ROUTE.planSha256,families:rows.length,game_ids:450,semantic_pass:0,rows},null,2));
