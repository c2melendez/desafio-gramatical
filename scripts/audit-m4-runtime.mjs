/** M4 — contratos de persistencia y compatibilidad PWA en Node.
 * Prueba ejecución de adaptadores de almacenamiento, NO tráfico real del navegador.
 */
import {readFileSync} from 'node:fs';
import {loadHistory,saveHistory,clearHistory} from '../src/lib/grammar.ts';
import {rotationKey,parseRotation,recordRotation,emptyRotation,readRotation,writeRotation,selectRotation} from '../src/lib/rotation.ts';
const issues=[], checks=[];
const verify=(ok,label)=>{checks.push({label,ok:Boolean(ok)});if(!ok)issues.push(label);};
const previous=Object.getOwnPropertyDescriptor(globalThis,'localStorage');
const data=new Map();let blocked=false;
const storage={
 getItem(k){if(blocked)throw Error('storage unavailable');return data.get(k)??null;},
 setItem(k,v){if(blocked)throw Error('storage unavailable');data.set(String(k),String(v));},
 removeItem(k){if(blocked)throw Error('storage unavailable');data.delete(k);}
};
try{
 Object.defineProperty(globalThis,'localStorage',{configurable:true,value:storage});
 const key='desafio-gramatical:historial';
 const entry={date:'2026-11-22T00:00:00.000Z',mode:'quiz',level:'principiante',score:10,correct:1,total:10,bestStreak:1,area:'espanol',topic:'Gramática',subtopic:'Morfosintaxis'};
 saveHistory(entry);
 verify(loadHistory().length===1&&data.has(key),'Persistir partida local y restaurarla');
 for(let n=0;n<105;n++)saveHistory({...entry,date:new Date(Date.UTC(2026,0,1+n)).toISOString()});
 verify(loadHistory().length===100,'Límite de historial de 100 partidas');
 data.set(key,'{invalid');
 verify(loadHistory().length===0,'Historial corrupto aislado');
 data.set(key,JSON.stringify([{...entry,score:'incorrecto'},entry]));
 verify(loadHistory().length===1,'Descartar registros incompletos');
 clearHistory();verify(!data.has(key),'Borrado local efectivo');
 const key1=rotationKey('naturales','Biología','Célula','quiz','avanzado');
 const key2=rotationKey('sociales','Historia','Célula','quiz','avanzado');
 verify(key1!==key2&&key1.startsWith('phuma-play:rotation:v1:'),'Separación por área de las claves');
 let state=recordRotation(emptyRotation(),'a',false);
 writeRotation(key1,state);
 verify(readRotation(key1,['a','b']).incorrect.includes('a'),'Persistencia de errores de rotación');
 data.set(key1,JSON.stringify({version:1,seen:['a','x','a'],incorrect:['x','a'],last:['x','a']}));
 state=readRotation(key1,['a','b']);
 verify(JSON.stringify(state.seen)==='["a"]'&&!state.incorrect.includes('x'),'Descartar identificadores de ejercicios retirados');
 verify(parseRotation('{bad',['a']).seen.length===0,'Historial de rotación malformado');
 const pool=Array.from({length:30},(_,i)=>({id:'i'+i}));
 const picked=selectRotation(pool,emptyRotation(),10,()=>0.23);
 verify(picked.length===10&&new Set(picked.map(x=>x.id)).size===10,'Diez rondas sin repetición');
 blocked=true;
 verify(loadHistory().length===0,'Fallback lectura sin almacenamiento');
 try{saveHistory(entry);clearHistory();writeRotation(key1,state);verify(readRotation(key1,['a']).seen.length===0,'Fallback sin escritura permitida');}catch{verify(false,'Fallback sin escritura permitida');}
 blocked=false;
 const manifest=JSON.parse(readFileSync('public/manifest.webmanifest','utf8'));
 verify(manifest.name==='Academia PHUMA Play'&&manifest.display==='standalone'&&manifest.start_url==='/'&&manifest.lang==='es','Manifiesto instalable básico');
 const icons=manifest.icons??[];
 verify([192,512].every(size=>icons.some(x=>x.src==='/icon-'+size+'.png'&&x.sizes===size+'x'+size)),'Iconos referenciados desde manifiesto');
 for(const name of ['icon-192.png','icon-512.png','favicon.png']){
  try{const bytes=readFileSync('public/'+name);const valid=bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]));const size=bytes.readUInt32BE(16);verify(valid&&(size===192||size===512), 'PNG válido '+name);}catch{verify(false,'PNG válido '+name);}
 }
}finally{
 if(previous)Object.defineProperty(globalThis,'localStorage',previous);
 else delete globalThis.localStorage;
}
const report={module:'M4',status:issues.length?'FAIL':'PASS',checks:checks.length,passed:checks.filter(x=>x.ok).length,issues,
 risk_boundaries:{storage:'Adaptadores simulados, no browser real',pwa:'Integridad de PNG y manifiesto; no prueba instalación en dispositivo',privacy:'No se inspecciona tráfico ni plugins de terceros',academic:'PENDIENTE'}};
console.log(JSON.stringify(report,null,2));
if(issues.length)process.exitCode=1;
