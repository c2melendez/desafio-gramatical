/** M4: medición real de construcción de los 40.500 registros en Node CI.
 * No equivale a rendimiento de navegador, móvil ni carga concurrente.
 */
import {performance} from 'node:perf_hooks';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {coverageRows} from '../src/lib/coverage.ts';
import {pool} from './inventory-items.mjs';
const begin=performance.now(),start=process.memoryUsage();
const expected={espanol:9450,matematicas:9900,naturales:8550,sociales:9000,blandas:3600};
const rows=coverageRows(),seen=new Set(),areas={};
let count=0,peak=start.rss;
const slow=[];
for(const row of rows){
 const t=performance.now(),items=pool(row);
 const area=areas[row.area]??={cells:0,items:0};
 area.cells++;area.items+=items.length;
 if(items.length!==row.target)throw Error('Cuota inválida: '+[row.area,row.topic,row.subtopic,row.mode,row.level].join('/'));
 for(const x of items){
  if(!x||typeof x.id!=='string'||seen.has(x.id))throw Error('ID ausente/repetido '+x?.id);
  seen.add(x.id);
 }
 count+=items.length;
 peak=Math.max(peak,process.memoryUsage().rss);
 const ms=performance.now()-t;
 slow.push({cell:[row.area,row.topic,row.subtopic,row.mode,row.level],elapsed_ms:Math.round(ms*1000)/1000,items:items.length});
}
const issues=[];
if(rows.length!==810||count!==40500||seen.size!==40500)issues.push('Matriz global incompleta');
for(const [area,items] of Object.entries(expected))if(areas[area]?.items!==items)issues.push('Total inesperado '+area);
const end=process.memoryUsage(),report={
 module:'M4',kind:'GLOBAL_NODE_PERFORMANCE',status:issues.length?'FAIL':'PASS',
 sha:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),
 timestamp_utc:new Date().toISOString(),runtime:{node:process.version,platform:process.platform,arch:process.arch},
 summary:{cells:rows.length,items:count,unique_ids:seen.size,per_area:areas,
 elapsed_ms:Math.round(performance.now()-begin),rss_start_mb:Math.round(start.rss/1048576),
 rss_end_mb:Math.round(end.rss/1048576),observed_peak_rss_mb:Math.round(peak/1048576),
 heap_end_mb:Math.round(end.heapUsed/1048576),
 slowest_cells:slow.sort((a,b)=>b.elapsed_ms-a.elapsed_ms).slice(0,12),
 id_digest_sha256:createHash('sha256').update([...seen].sort().join('\n')).digest('hex')},
 issues,limitations:'CI Node solamente: no prueba latencia del navegador, uso de dispositivos móviles, accesibilidad asistiva, concurrencia, independiencia semántica ni calibración.'};
console.log(JSON.stringify(report,null,2));
if(issues.length)process.exitCode=1;
