import assert from 'node:assert/strict';
import {coverageRows} from '../src/lib/coverage.ts';
import {pool} from './inventory-items.mjs';

const norm=x=>String(x??'').normalize('NFKC').toLocaleLowerCase('es').replace(/\s+/g,' ').trim();
export function auditItem(item,row){
 const problems=[];
 if(!item||typeof item!=='object'||!norm(item.id))return ['ID vacío'];
 if(item.level!==undefined&&item.level!==row.level)problems.push('nivel incoherente');
 if(item.subtopic!==undefined&&item.subtopic!==row.subtopic)problems.push('subtema incoherente');
 if(Array.isArray(item.options)){
  if(item.options.length<2||item.options.some(x=>!norm(x))||
      new Set(item.options.map(norm)).size!==item.options.length)problems.push('opciones duplicadas o inválidas');
  if(typeof item.answer==='number'&&(!Number.isInteger(item.answer)||item.answer<0||item.answer>=item.options.length))
    problems.push('respuesta fuera de opciones');
 }
 if(Array.isArray(item.tokens)&&item.tokens.some(t=>!t||typeof t.t!=='string'||!t.t.trim()))
   problems.push('token vacío');
 return problems;
}
export function auditBaseline(rows=coverageRows()){
 const errors=[],groups=[],examples=[];
 let checked=0;
 for(const row of rows){
  const items=pool(row);
  if(items.length!==row.available)errors.push({cell:[row.area,row.topic,row.subtopic,row.mode,row.level],reason:'conteo distinto'});
  let candidates=0;
  const normSeen=new Map();
  for(const item of items){
   checked++;
   const bad=auditItem(item,row);
   if(bad.length)errors.push({id:item?.id,cell:[row.area,row.topic,row.subtopic,row.mode,row.level],errors:bad});
   const fingerprint=norm([item?.passage,item?.question,item?.prompt,item?.context,item?.text].filter(Boolean).join('|'));
   if(fingerprint){
    if(normSeen.has(fingerprint)){candidates++;if(examples.length<30)examples.push({id:item.id,similar_to:normSeen.get(fingerprint),subtopic:row.subtopic});}
    else normSeen.set(fingerprint,item.id);
   }
  }
  groups.push({area:row.area,tema:row.topic,subtema:row.subtopic,juego:row.mode,nivel:row.level,registrados:items.length,
    candidatos_duplicacion_textual:candidates,aceptados_editorialmente:0,
    revision_docente:'PENDIENTE',independencia_conceptual:'NO_VERIFICADA'});
 }
 const result={version:1,status:errors.length?'FAIL':'PASS',cells:groups.length,items_checked:checked,
  accepted_independent:0,editorial_pending:checked,errors,examples,groups,
  limitation:'Inspección estructural del inventario M0. Candidatos similares y todas las respuestas pendientes de oráculo/editorial; NO acredita calidad pedagógica o independencia.'};
 return result;
}
if(process.argv[1]?.endsWith('audit-m0-baseline-quality.mjs')){
 const out=auditBaseline();
 console.log(JSON.stringify(out,null,2));
 if(out.status==='FAIL')process.exitCode=1;
}
