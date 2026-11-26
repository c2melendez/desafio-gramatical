import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {OPERATIONS_ROUTE} from '../../../src/lib/rdg/operations.ts';
import {mathM3Pool} from '../../../src/lib/math-m3.ts';
import {MATH_LEVELS,MATH_MODES} from '../../../src/lib/math-m1.ts';
const sha=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
const matrix=JSON.parse(execFileSync(process.execPath,['--import','./scripts/ts-resolve.mjs','qa/certification/rdg/audit-r4-parity.mjs'],{encoding:'utf8'}));
const tasks=new Map([...OPERATIONS_ROUTE.lessons,...OPERATIONS_ROUTE.transfer].map(x=>[x.id,x]));
const bank=MATH_LEVELS.flatMap(l=>MATH_MODES.flatMap(m=>mathM3Pool('Aritmética','Operaciones',l,m)));
const byId=new Map(bank.map(x=>[x.id,x]));
if(matrix.plan_sha256!==OPERATIONS_ROUTE.planSha256||byId.size!==450||matrix.rows.length!==34)throw Error('matriz o ruta desactualizada');
// La clasificación es juicio de diseño: identificar ejemplo completo o componentes separados.
// No es PASS de paridad, evaluación semántica de los IDs ni aprobación docente.
const direct={
 'prioridad-de-operaciones':'A2 y A3 modelan la prioridad y la igualdad de rango.',
 'resta-de-entero-negativo':'A11 muestra el opuesto y T10 aplica la resta orientada.',
 'cero-dividido-por-no-cero':'La síntesis muestra 0 ÷ 9 y T17 combina el caso con una suma.',
 'producto-negativo-y-suma':'A12 modela el signo del producto y su suma posterior.',
 'division-producto-izquierda-derecha':'A3 ordena división y producto de izquierda a derecha.',
 'enteros-desplazamiento-signos':'A1 usa posición negativa y desplazamientos.',
 'precedencia-sin-parentesis':'A2 contrasta producto sin paréntesis y con paréntesis.',
 'modificar-parentesis-y-factor':'A4 modifica sumando y factor; T2 repite la decisión con otros datos.',
 'reconstruir-inventario-inicial':'A18 invierte entrada y retiro; T22 verifica el procedimiento.',
 'comparar-cambios-compensados':'A17 compara valor nuevo con original; T21 conserva la orientación.',
 'reconstruir-cantidad-por-grupo':'A7 invierte el retiro y divide por grupos.',
 'comparar-ofertas-con-cargos-fijos':'A10 suma cada cargo fijo y compara costos completos.',
 'cociente-de-diferencia-racional-con-raiz':'A9 resuelve raíz, resta y división; T8 transfiere el procedimiento.',
 'reparto-neto-exacto':'A19 calcula total, retiro y reparto; T23 aplica las tres etapas.',
 'raiz-racionales-signos':'A6 obtiene la raíz y combina fracciones con signo.',
 'distributiva-y-cancelacion':'A5 distribuye y cancela un producto opuesto.',
 'resta-anidada-distributiva':'A13 evalúa agrupaciones y resta el grupo completo.',
 'cancelacion-cruzada-de-productos':'A15 distribuye dos grupos y cancela productos cruzados.',
 'dos-raices-en-producto-agrupado':'A20 calcula dos raíces, dos grupos, producto y resta final.',
 'completar-igualdad-distributiva':'A8 compara ambos lados y recupera el término faltante.',
 'factor-desconocido-tras-cancelar':'A16 cancela y aísla un factor con división.',
 'distributiva-signo-negativo':'A5 distribuye una diferencia y conserva el signo negativo.',
 'factor-comun-dos-grupos':'A14 agrupa cuatro productos y extrae el factor común.',
};
const compound={
 'cociente-con-agrupacion':'A2 enseña agrupación y A3 división; T16 pide la combinación sin ejemplo guiado equivalente.',
 'presupuesto-dos-compras':'A10 calcula costos y A13 resta un grupo; falta ejemplo guiado de saldo con dos compras.',
 'cambio-contextual-inventario':'A4 cambia operandos y T1 combina flujos; falta guía completa de retirar cajas y aumentar piezas por caja restante.',
 'inventario-flujos-independientes':'T1 resuelve entradas y salidas como transferencia, sin puente guiado específico de dos flujos.',
 'raiz-producto-suma-resta':'A3 y A6 enseñan precedencia y raíz; T5 integra raíz, producto y cociente sin puente guiado idéntico.',
 'factor-comun-diferencia-compuesta':'A5 y A14 enseñan distribución y factor; T18 plantea la diferencia sin puente guiado específico.',
 'raiz-racional-resta-agrupada':'A6 y A13 cubren raíz y resta de grupo; T19 integra fracciones con denominadores distintos.',
 'distribuir-sobre-raiz-racional':'A5 y A6 cubren distribución y raíz; T20 integra factor exterior y fracciones.',
 'diferencia-productos-no-identicos':'A15 resta dos productos y cancela; debe verificarse transferencia a productos que no se cancelan.',
 'raiz-producto-cociente-agrupado':'A3 y A6 enseñan las piezas; T5 integra precedencia sin agrupar exactamente como el banco.',
 'raiz-producto-racionales-combinados':'A6 y A9 enseñan racionales y raíces; T20 integra un factor pero no la misma estructura del banco.',
};
const exampleByFamily={
 'cociente-con-agrupacion':'Divisor agrupado',
 'presupuesto-dos-compras':'Saldo con dos compras',
 'cambio-contextual-inventario':'Cajas restantes y cambio por caja',
 'inventario-flujos-independientes':'Dos flujos independientes',
 'raiz-producto-suma-resta':'Raíz, producto y resta',
 'factor-comun-diferencia-compuesta':'Diferencia con factor común',
 'raiz-racional-resta-agrupada':'Raíz racional y diferencia agrupada',
 'distribuir-sobre-raiz-racional':'Factor y raíz racional',
 'diferencia-productos-no-identicos':'Productos distintos',
 'raiz-producto-cociente-agrupado':'Raíz, producto y cociente agrupado',
 'raiz-producto-racionales-combinados':'Raíz y productos racionales',
};
const expected=new Set([...Object.keys(direct),...Object.keys(compound)]);
if(expected.size!==34||matrix.rows.some(row=>!expected.has(row.family)))throw Error('familias cambiaron');
const rows=matrix.rows.map(row=>{
 if(row.task_ids.some(id=>!tasks.has(id)))throw Error('actividad ausente '+row.family);
 for(const r of row.game_records){const x=byId.get(r.id);if(!x||sha(x)!==r.content_sha256||x.operation!==row.family)throw Error('hash o familia obsoletos '+r.id)}
 const directCase=Object.hasOwn(direct,row.family);
 const exampleTitle=directCase?null:exampleByFamily[row.family];
 if(!directCase&&!OPERATIONS_ROUTE.workedExamples.some(x=>x.title===exampleTitle))throw Error('síntesis ausente '+row.family);
 const example=byId.get(row.game_records[0].id);
 return {family:row.family,count:row.count,classification:directCase?'EJEMPLO_GUIADO_DIRECTO':'EJEMPLO_RESUELTO_EN_SINTESIS',reason:directCase?direct[row.family]:"Brecha anterior: "+compound[row.family]+" Ahora existe un ejemplo desplegable en síntesis; su suficiencia requiere revisión.",summary_example:exampleTitle,task_ids:row.task_ids,game_example:{id:example.id,prompt:example.prompt},decision:'REVIEW',limitations:'La suficiencia pedagógica de la síntesis y las transferencias debe verificarse. Juicio de diseño; no acredita clave, distractores ni semántica individual.'};
});
const grouped=Object.fromEntries(['EJEMPLO_GUIADO_DIRECTO','EJEMPLO_RESUELTO_EN_SINTESIS'].map(k=>[k,{families:rows.filter(x=>x.classification===k).length,ids:rows.filter(x=>x.classification===k).reduce((n,x)=>n+x.count,0)}]));
console.log(JSON.stringify({status:'REVIEW',scope:'MAT-ARIT-01',plan_sha256:matrix.plan_sha256,route_data_sha256:createHash('sha256').update(readFileSync('src/lib/rdg/operations.ts')).digest('hex'),families:34,game_ids:450,semantic_pass:0,grouped,rows},null,2));
