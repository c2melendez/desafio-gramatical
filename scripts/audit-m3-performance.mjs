/** Medición reproducible de la construcción del catálogo M3.
 * El ensayo Node no equivale a un ensayo de navegador o equipo móvil.
 */
import {performance} from 'node:perf_hooks';
import {execFileSync} from 'node:child_process';
import {coverageRows} from '../src/lib/coverage.ts';
import {pool} from './inventory-items.mjs';
const t0=performance.now(),mem0=process.memoryUsage();
const rows=coverageRows().filter(x=>x.area==='espanol');
const perCell=[],usedIds=new Set();
let total=0,peak=mem0.rss;
for(const row of rows){
 const start=performance.now();
 const items=pool(row);
 for(const item of items){
  if(usedIds.has(item.id))throw new Error('ID duplicado: '+item.id);
  usedIds.add(item.id);
 }
 total+=items.length;
 perCell.push({cell:[row.topic,row.subtopic,row.mode,row.level],count:items.length,elapsed_ms:Math.round((performance.now()-start)*1000)/1000});
 peak=Math.max(peak,process.memoryUsage().rss);
}
const elapsed=performance.now()-t0,mem1=process.memoryUsage();
const slowest=[...perCell].sort((a,b)=>b.elapsed_ms-a.elapsed_ms).slice(0,8);
const report={
 module:'espanol-M3',version:1,sha:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),
 status:rows.length===189&&total===9450&&usedIds.size===9450?'PASS':'FAIL',
 summary:{cells:rows.length,items:total,distinct_ids:usedIds.size,elapsed_ms:Math.round(elapsed),rss_start_mb:Math.round(mem0.rss/1048576),
 rss_end_mb:Math.round(mem1.rss/1048576),rss_peak_observed_mb:Math.round(peak/1048576),
 heap_used_end_mb:Math.round(mem1.heapUsed/1048576),slowest_cells:slowest},
 projection_40500_unmeasured:{method:'proporción simple de elementos, NO ensayo de rendimiento ni predicción fiable',
 elements:40500,linear_ms_estimate:Math.round(elapsed*40500/total)},
 caveat:'Medición del proceso Node 24 en runner CI, no dispositivos reales ni carga concurrente. No certifica memoria/latencia en navegadores ni independencia académica.'
};
console.log(JSON.stringify(report,null,2));if(report.status!=='PASS')process.exitCode=1;
