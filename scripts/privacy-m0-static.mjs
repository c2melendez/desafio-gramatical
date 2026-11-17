import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const ROOT=path.resolve(import.meta.dirname,'..');
const RULES=[
 ['fetch-browser',/\bfetch\s*\(/g],
 ['xhr-browser',/\bnew\s+XMLHttpRequest\s*\(/g],
 ['websocket-browser',/\bnew\s+WebSocket\s*\(/g],
 ['beacon-browser',/\bsendBeacon\s*\(/g],
 ['cookie-write',/\bdocument\.cookie\s*=/g],
];
export function inspect(source,file){
 const hits=[];
 for(const [kind,pattern] of RULES){
  const re=new RegExp(pattern.source,pattern.flags);
  let match;
  while((match=re.exec(source))!==null){
   const line=source.slice(0,match.index).split('\n').length;
   hits.push({file,line,kind});
  }
 }
 return hits;
}
function walk(p){
 if(!fs.existsSync(p))return [];
 return fs.readdirSync(p,{withFileTypes:true}).flatMap(e=>
  e.isDirectory()?walk(path.join(p,e.name)):
  /\.(ts|tsx|js|jsx)$/.test(e.name)?[path.join(p,e.name)]:[]);
}
function test(){
 assert.equal(inspect("const x = 1;",'test').length,0);
 for(const source of ['fetch("/external")','new XMLHttpRequest()','new WebSocket("wss://example.com")','navigator.sendBeacon("/x",data)','document.cookie = "x"'])
  assert.equal(inspect(source,'fixture').length,1,'mutación de privacidad no detectada: '+source);
 console.log('PASS privacidad M0: 5 mutaciones de envío y cookies detectadas.');
}
if(process.argv.includes('--test'))test();
else {
 const paths=[...walk(path.join(ROOT,'src/lib')),...walk(path.join(ROOT,'src/routes')),...walk(path.join(ROOT,'src/components/games'))];
 const findings=paths.flatMap(p=>inspect(fs.readFileSync(p,'utf8'),path.relative(ROOT,p)));
 const report={status:findings.length?'FAIL':'PASS',files_scanned:paths.length,findings,
   scope:'Solo llamadas de red y escritura de cookies explícitas en código propio del cliente. No examina SDK de terceros ni tráfico real del navegador; la privacidad del historial se cubre en history-resilience.test.ts.'};
 console.log(JSON.stringify(report,null,2));
 if(findings.length)process.exitCode=1;
}
