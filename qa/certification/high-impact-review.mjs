/** C02/C04 — inspección contextual de todos los distractores de alto impacto.
 * Primeras 32 claves con justificación escrita independiente; 30 M2 con linaje.
 * Separar consistencia con fuentes de corrección académica externa.
 */
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {coverageRows} from '../../src/lib/coverage.ts';
import {pool} from '../../scripts/inventory-items.mjs';
const norm=s=>String(s??'').normalize('NFKC').toLocaleLowerCase('es').replace(/\s+/g,' ').trim();
const sourceRules=JSON.parse(readFileSync('qa/certification/high-impact-anchor-rules.json','utf8')).rules;
const queue=JSON.parse(readFileSync('qa/certification/evidence/distractor-review-queue.json','utf8')).cases;
const byId=new Map();
for(const row of coverageRows().filter(r=>r.area==='espanol')){
 for(const item of pool(row))byId.set(item.id,{item,row});
}
const issues=[],results=[],anchors=new Map(sourceRules.map(a=>[a.id,a]));
const value=item=>item?.connector??item?.correctConnector??(Number.isInteger(item?.answer)?item.options?.[item.answer]:undefined);
function checkAnchor(a){
 const found=byId.get(a.id);
 if(!found){issues.push(a.id+': fuente original inexistente');return}
 const item=found.item,got=value(item),scene=[item.passage,item.gap,item.flawed,item.q,item.question].filter(Boolean).join(' ');
 const failures=[];
 if(!norm(scene).includes(norm(a.context)))failures.push('contexto original alterado');
 if(!Array.isArray(item.options)||item.options.length!==4)failures.push('sin cuatro opciones');
 else{
  if(item.options.filter(x=>norm(x)===norm(a.expected)).length!==1)failures.push('la respuesta no es única');
  if(norm(got)!==norm(a.expected))failures.push('clave distinta del oráculo contextual');
 }
 if(!a.rationale||a.rationale.length<55)failures.push('fundamento insuficiente');
 const wrong=structuredClone(item);
 if(Number.isInteger(wrong.answer))wrong.answer=(wrong.answer+1)%4;
 else if(typeof wrong.connector==='string')wrong.connector=wrong.options.find(x=>norm(x)!==norm(a.expected));
 else if(typeof wrong.correctConnector==='string')wrong.correctConnector=wrong.options.find(x=>norm(x)!==norm(a.expected));
 if(norm(value(wrong))===norm(a.expected))failures.push('mutación de clave no detectada');
 if(Array.isArray(item.options)){
  const copy=structuredClone(item);
  const slot=copy.options.findIndex(x=>norm(x)!==norm(a.expected));
  if(slot>=0)copy.options[slot]=a.expected;
  if(copy.options.filter(x=>norm(x)===norm(a.expected)).length!==2)failures.push('mutación de distractor no detectada');
 }
 results.push({id:a.id,type:'ORIGINAL',status:failures.length?'FAIL':'RULE_JUSTIFIED_NEEDS_EXTERNAL_REVIEW',
  expected:a.expected,actual:got,context:scene.slice(0,240),rationale:a.rationale,dependents:0,issues:failures});
 issues.push(...failures.map(s=>a.id+': '+s));
}
for(const rule of sourceRules)checkAnchor(rule);
const high=queue.filter(x=>x.priority==='HIGH_EDITORIAL_REVIEW');
const hiSet=new Set(high.map(x=>x.id));
if(high.length!==hiSet.size)issues.push('IDs prioritarios duplicados');
if(high.length>62)issues.push('La cola de alto impacto creció sobre el límite inicial 62');
const base=high.filter(x=>anchors.has(x.id)),composites=high.filter(x=>!anchors.has(x.id));
for(const entry of high){
 const record=byId.get(entry.id);if(!record){issues.push(entry.id+': alerta sin ejercicio');continue}
 if(norm(value(record.item))!==norm(entry.selected))issues.push(entry.id+': respuesta cambió desde la evidencia');
 if(anchors.has(entry.id))continue;
 const item=record.item,ids=item.sourceIds??[],parts=ids.map(id=>byId.get(id)?.item);
 const first=parts[0],selected=value(item),expected=value(first);
 const failures=[];
 if(!entry.id.startsWith('m2-writing-'))failures.push('alerta sin regla M2 de fuente');
 if(ids.length!==2||parts.some(x=>!x))failures.push('fuentes M2 no resolubles');
 if(!first||norm(expected)!==norm(selected))failures.push('respuesta compuesta no coincide con fuente A');
 if(!Array.isArray(item.options)||item.options.filter(x=>norm(x)===norm(expected)).length!==1)
  failures.push('clave compuesta no aparece exactamente una vez');
 const sourceRule=anchors.get(ids[0]);
 if(sourceRule&&norm(sourceRule.expected)!==norm(expected))failures.push('fuente A contradice oráculo original');
 results.push({id:entry.id,type:'M2_DERIVED',status:failures.length?'FAIL':sourceRule?'SOURCE_RULE_AND_KEY_CONSISTENT_NEEDS_EXTERNAL_REVIEW':'SOURCE_KEY_CONSISTENT_SEMANTIC_REVIEW',
  sourceIds:ids,selected,sourceExpected:expected,sourceRuleId:sourceRule?.id??null,sourceContext:first?.gap??first?.flawed??null,
  issues:failures});
 issues.push(...failures.map(x=>entry.id+': '+x));
}
for(const e of base)if(!anchors.has(e.id))issues.push('Caso original prioritario sin regla '+e.id);
if(results.length!==sourceRules.length+composites.length)issues.push('Cantidad de resultados incongruente');
if(base.length+composites.length!==high.length)issues.push('Partición de alertas incongruente');
if(sourceRules.length<30||base.length<30||composites.length<25)
 issues.push('No se alcanza la cobertura mínima de 30 fuentes y 25 composiciones');
const linked=results.filter(x=>x.type==='M2_DERIVED'&&x.sourceRuleId).length;
const sha=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
const report={suite:'ACADEMIA_SPANISH_HIGH_IMPACT_REVIEW_V1',sha,status:issues.length?'FAIL':'PASS',
 totals:{current_high_priority:high.length,originals_in_high:base.length,derived_in_high:composites.length,original_rule_anchors:sourceRules.length,
 verified_source_rule_dependencies:linked,provenance_only:composites.length-linked,issues:issues.length},
 cases:results,issues,
 limitations:'ORIGINAL implica regla documentada y mutaciones, no dictamen externo. M2_DERIVED comprueba clave de fuente A, no independencia semántica ni validez psicométrica; no se afirma que 62 casos hayan recibido aprobación académica.'};
mkdirSync('qa/certification/evidence',{recursive:true});
writeFileSync('qa/certification/evidence/high-impact-review.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({status:report.status,totals:report.totals,issues:issues.slice(0,20)},null,2));
if(issues.length)process.exitCode=1;
