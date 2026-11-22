// M4: verificación transversal de la matriz real, no certificación psicométrica.
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {inventoryItems} from './inventory-items.mjs';
import {coverageRows} from '../src/lib/coverage.ts';
const issues=[];
const manifest=JSON.parse(readFileSync('docs/modulos-phuma.json','utf8'));
const required=['espanol-CORTE','matematicas-CORTE','naturales-CORTE','sociales-CORTE','blandas-CORTE'];
for(const id of required){
 const mod=manifest.modules.find(m=>m.id===id);
 if(!mod||mod.state!=='COMPLETADA')issues.push('Dependencia M4 sin cierre técnico: '+id);
}
const inventory=inventoryItems(), rows=coverageRows();
const expectedAreas={espanol:9450,matematicas:9900,naturales:8550,sociales:9000,blandas:3600};
const areas={};
const allIds=new Set();
for(const group of inventory.groups){
 if(!areas[group.area])areas[group.area]={cells:0,records:0};
 areas[group.area].cells++;
 areas[group.area].records+=group.count;
 for(const id of group.ids){
  if(allIds.has(id))issues.push('ID global compartido: '+id);
  allIds.add(id);
 }
}
for(const [area,expected] of Object.entries(expectedAreas)){
 if(areas[area]?.records!==expected)issues.push('Total de '+area+': '+areas[area]?.records+' frente a '+expected);
}
if(rows.length!==810||inventory.summary.cells!==810)issues.push('Matriz incompleta: '+rows.length+'/'+inventory.summary.cells);
if(inventory.summary.observed!==40500||inventory.summary.declared!==40500||allIds.size!==40500)issues.push('No se verificaron 40500 registros/IDs únicos');
if(inventory.summary.failed_cells!==0||inventory.summary.ids_reused_between_cells!==0)issues.push('Inventario con fallos o colisiones');
for(const row of rows){
 if(row.available!==row.target||!row.complete)issues.push('Cuota incompleta '+[row.area,row.topic,row.subtopic,row.mode,row.level].join('/'));
}
const result={
 module:'M4',stage:'GLOBAL_TECHNICAL_BASELINE',status:issues.length?'FAIL':'PASS',
 sha:inventory.sha,
 catalog_sha256:createHash('sha256').update(readFileSync('src/lib/phuma-catalog.ts')).digest('hex'),
 modules_sha256:createHash('sha256').update(readFileSync('docs/modulos-phuma.json')).digest('hex'),
 summary:{cells:rows.length,technical_records:inventory.summary.observed,unique_ids:allIds.size,areas,
 prerequisites:required,issues:issues.length},
 limitations:{semantic_independence:'NO_CERTIFICADA',psychometrics:'NO_CERTIFICADA',manual_accessibility:'NO_EJECUTADA',manual_visual:'NO_EJECUTADA',academic_review:'PENDIENTE_AUTORIZADA'},
 issues
};
console.log(JSON.stringify(result,null,2));
if(issues.length)process.exitCode=1;
