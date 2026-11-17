import {coverageRows} from '../src/lib/coverage.ts';
import {pool} from './inventory-items.mjs';
import {execFileSync} from 'node:child_process';
const rows=coverageRows().filter(x=>x.area==='espanol').map(x=>{
 const bank=pool(x);
 const deficit=Math.max(0,x.stageOne-x.available);
 const key=[x.topic,x.subtopic,x.mode,x.level].join(' / ');
 return {key,tema:x.topic,subtema:x.subtopic,juego:x.mode,nivel:x.level,
  nivel_nucleo:x.stageOne,registrados:x.available,deficit,ids:bank.map(q=>q.id),
  status:bank.length!==x.available?'ERROR':deficit?'PENDIENTE':'META_TECNICA'};
});
const pending=rows.filter(r=>r.deficit>0);
const summary={
 subtemas:new Set(rows.map(x=>x.tema+'|'+x.subtema)).size,
 celdas:rows.length,
 cuota_nucleo:rows.reduce((n,r)=>n+r.nivel_nucleo,0),
 registros_tecnicos:rows.reduce((n,r)=>n+r.registrados,0),
 deficit_tecnico_nucleo:rows.reduce((n,r)=>n+r.deficit,0),
 celdas_con_deficit:pending.length,
 celdas_con_error:rows.filter(r=>r.status==='ERROR').length
};
const report={version:1,module:'espanol-M1',sha:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),
status:summary.celdas_con_error?'FAIL':summary.deficit_tecnico_nucleo?'EN_CURSO':'NUCLEO_TECNICO_CUBIERTO',
summary,pendientes:pending.map(({ids,...x})=>x),
restricciones:'Los registros técnicos, incluidas preguntas replicadas por modalidad, no equivalen a contenido independiente; revisión editorial y cierre de M1 siguen pendientes.'};
console.log(JSON.stringify(report,null,2));
if(summary.celdas_con_error)process.exitCode=1;
