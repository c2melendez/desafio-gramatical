// Incremental index of existing evidence; this does NOT adjudicate or promote any exercise.
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
import {resolve} from 'node:path';
import {sameScope,assertRdgContract} from '../select-frozen.mjs';
const need=(condition,message)=>{if(!condition)throw Error(message)};
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const hex=x=>typeof x==='string'&&/^[a-f0-9]{64}$/.test(x);
const scopeKey=s=>JSON.stringify([s.area,s.topic,s.subtopic]);
// Reuse the live inventory producer and the selector's exact item serialization.
export async function liveInventory(scope){
 const [{coverageRows},{pool}]=await Promise.all([import('../../../src/lib/coverage.ts'),import('../../../scripts/inventory-items.mjs')]);
 const current=new Map();
 for(const row of coverageRows().filter(row=>sameScope(row,scope)))for(const item of pool(row)){
  need(typeof item.id==='string'&&item.id.length>0&&!current.has(item.id),'invalid or duplicate live ID: '+item.id);
  current.set(item.id,hash(JSON.stringify(item)));
 }
 need(current.size>0,'live inventory unavailable for scope');
 return current;
}

export function indexEvidence({scope,manifests,ledgers,dependencies,currentDependencies,currentItems}){
 need(currentItems instanceof Map,'live inventory required');
 need(sameScope(scope,scope),'invalid scope');
 const selected=new Map(),pass=new Map();
 for(const {path,data} of manifests){
  need(scopeKey(data.subtopic_scope)===scopeKey(scope),'manifest outside scope: '+path);
  for(const item of data.items){
   need(typeof item.id==='string'&&item.id.length>0&&hex(item.content_sha256),'invalid selection entry');
   need(!selected.has(item.id),'duplicate selection ID: '+item.id);
   selected.set(item.id,{...item,manifest:path});
  }
 }
 need(Object.keys(dependencies).length>0,'empty contract dependencies');
 const staleDeps=Object.entries(dependencies).filter(([k,v])=>!hex(v)||currentDependencies[k]!==v).map(([k])=>k);
 for(const {path,data} of ledgers)for(const f of data.records){
  if(f.semantic_status!=='PASS_SEMANTIC')continue;
  need(selected.has(f.id),'PASS outside selection: '+f.id);
  need(!pass.has(f.id),'duplicate PASS ID: '+f.id);
  const item=selected.get(f.id),reasons=[];
  if(scopeKey({area:f.area,topic:f.tema,subtopic:f.subtema})!==scopeKey(scope))reasons.push('SCOPE_MISMATCH');
  if(f.content_hash!==item.content_sha256)reasons.push('CONTENT_CHANGED');
  if(f.criteria_revision!=='7.9')reasons.push('CRITERIA_CHANGED');
  if(f.oracle_status!=='VERIFIED')reasons.push('ORACLE_NOT_VERIFIED');
  if(!f.rubric||Object.keys(f.rubric).sort().join('')!=='ABCDEFGH'||Object.values(f.rubric).some(v=>!Number.isInteger(v.score)||v.score<3||v.score>4||typeof v.reason!=='string'||!v.reason.trim()))reasons.push('RUBRIC_INCOMPLETE');
  if(!Array.isArray(f.reason_codes)||f.reason_codes.length)reasons.push('BLOCKING_REASON');
  if(!f.evidence_fingerprint||f.evidence_fingerprint.id!==f.id||(f.evidence_fingerprint.hash??f.evidence_fingerprint.content_hash)!==f.content_hash)reasons.push('FINGERPRINT_MISMATCH');
  if(staleDeps.length||Object.entries(dependencies).some(([k,v])=>f.dependency_hashes?.[k]!==v))reasons.push('DEPENDENCY_CHANGED');
  pass.set(f.id,{ledger:path,reasons});
 }
 const entries=[...selected].map(([id,item])=>{
  const f=pass.get(id),live=currentItems.get(id),reasons=[...(f?.reasons??['NO_PASS_RECORD'])];
  if(live===undefined)reasons.push('LIVE_ID_MISSING');else if(live!==item.content_sha256)reasons.push('LIVE_CONTENT_CHANGED');
  const blocked=live!==item.content_sha256||staleDeps.length>0;
  return {id,content_sha256:item.content_sha256,live_content_sha256:live??null,manifest:item.manifest,ledger:f?.ledger??null,queue:blocked||f?.reasons.length?'REVALIDACION':!f?'REVISION_SEMANTICA':'EVIDENCIA_VIGENTE',reasons};
 });
 const counts={selected:entries.length,registered_pass:pass.size,reusable:entries.filter(x=>x.queue==='EVIDENCIA_VIGENTE').length,revalidation:entries.filter(x=>x.queue==='REVALIDACION').length,review:entries.filter(x=>x.queue==='REVISION_SEMANTICA').length,new_pass:0};
 return {counts,stale_dependencies:staleDeps,entries};
}
export async function loadFront(front,read=path=>readFileSync(path),inventory=liveInventory){
 const load=path=>JSON.parse(read(path));
 need(front.rdg_status==='RDG_READY','route is not RDG_READY');
 const contract=load(front.contract_path);
 need(contract.status==='RDG_READY','contract is not RDG_READY');
 need(front.block_id===contract.block_id&&sameScope(front.scope,contract.subtopic_scope),'front/contract mismatch');
 const dependencies=contract.dependency_hashes;
 const currentDependencies=Object.fromEntries(Object.keys(dependencies).map(path=>[path,hash(read(path))]));
 const manifests=front.selection_paths.map(path=>({path,data:load(path)}));
 for(const {data} of manifests){const embedded=assertRdgContract(data);need(data.block_id===front.block_id&&embedded.block_id===contract.block_id&&embedded.revision===contract.revision,'selection/contract revision mismatch');for(const [path,digest] of Object.entries(dependencies))need(embedded.dependency_hashes?.[path]===digest,'selection/contract dependency mismatch');}
 return indexEvidence({scope:front.scope,manifests,ledgers:front.ledger_paths.map(path=>({path,data:load(path)})),dependencies,currentDependencies,currentItems:await inventory(front.scope)});
}
// Operational queue, not an adjudicator. Existing repair evidence takes priority
// over ordinary review; an old predecessor must never authorize a new hash.
export function prioritizePending(index, repairGroups){
 const byId=new Map(index.entries.map(entry=>[entry.id,entry]));
 need(byId.size===index.entries.length,'duplicate indexed ID');
 const repairs=new Map();
 for(const group of repairGroups){
  need(typeof group.source==='string'&&group.source.length>0&&['CANDIDATE_REPAIR','KNOWN_REVIEW_BLOCKER'].includes(group.kind),'invalid repair group');
  for(const record of group.records){
   need(byId.has(record.id)&&hex(record.previous_sha256),'unknown repair ID or invalid predecessor');
   need(!repairs.has(record.id),'duplicate repair ID: '+record.id);
   if(group.kind==='CANDIDATE_REPAIR')need(hex(record.candidate_sha256)&&record.candidate_sha256!==record.previous_sha256,'invalid candidate successor');
   repairs.set(record.id,{kind:group.kind,source:group.source,...record});
  }
 }
 const entries=index.entries.map(entry=>{
  const repair=repairs.get(entry.id);
  let action=entry.queue==='EVIDENCIA_VIGENTE'?'PRESERVAR_EVIDENCIA':entry.queue==='REVALIDACION'?'REVALIDAR':'REVISION_ORDINARIA';
  if(repair&&entry.queue!=='EVIDENCIA_VIGENTE'){
   if(repair.kind==='CANDIDATE_REPAIR'&&entry.queue==='REVISION_SEMANTICA'&&entry.content_sha256===repair.candidate_sha256&&entry.live_content_sha256===repair.candidate_sha256)action='ADJUDICAR_SUCESOR';
   else action=entry.queue==='REVISION_SEMANTICA'&&entry.content_sha256===repair.previous_sha256&&entry.live_content_sha256===repair.previous_sha256
      ?repair.kind==='CANDIDATE_REPAIR'?'RECONCILIAR_CANDIDATO':'RESOLVER_BLOQUEO'
      :'REVALIDAR';
  }
  return {id:entry.id,content_sha256:entry.content_sha256,manifest:entry.manifest,action,repair:repair??null};
 });
 const counts=Object.fromEntries(['PRESERVAR_EVIDENCIA','REVALIDAR','RECONCILIAR_CANDIDATO','RESOLVER_BLOQUEO','ADJUDICAR_SUCESOR','REVISION_ORDINARIA'].map(action=>[action,entries.filter(e=>e.action===action).length]));
 return {counts,entries,new_pass:0,publication_authorized:false};
}
export function loadRepairGroups(front,read=path=>readFileSync(path)){
 // Explicit current pilot only; other fronts need their own repair inventory.
 if(front.block_id!=='MAT-ARIT-01')return [];
 const candidatePath='qa/certification/rdg/evidence/MAT-ARIT-01-R21-candidate-successors.json';
 const reviewPath='qa/certification/rdg/evidence/MAT-ARIT-01-v79-R27-pass.json';
 const candidate=JSON.parse(read(candidatePath)),review=JSON.parse(read(reviewPath));
 need(candidate.scope===front.block_id&&candidate.status==='CANDIDATE_CI_SUCCESS_NOT_ACTIVE'&&candidate.summary.semantic_pass===0,'unexpected R21 evidence scope/status');
 need(candidate.records.length===candidate.summary.changed&&candidate.records.every(r=>r.semantic_status==='REVIEW'),'unexpected R21 records');
 need(review.scope===front.block_id&&front.ledger_paths.includes(reviewPath),'R27 ledger not registered');
 const blockers=review.records.filter(r=>r.semantic_status==='REVIEW');
 const r28Path='qa/certification/rdg/evidence/MAT-ARIT-01-R28-exam-screen.json';
 const r28=JSON.parse(read(r28Path));
 need(r28.scope===front.block_id&&r28.status==='CANDIDATE_SCREEN_REVIEW'&&r28.summary.semantic_pass===0&&r28.records.length===blockers.length,'unexpected R28 screen');
 for(const r of r28.records)need(blockers.some(b=>b.id===r.id&&b.content_hash===r.previous_hash)&&r.semantic_status==='REVIEW','R28 predecessor does not match blocker');
 need(blockers.every(r=>Array.isArray(r.reason_codes)&&r.reason_codes.length>0),'review record without blocker');
 return [
  {source:candidatePath,kind:'CANDIDATE_REPAIR',records:candidate.records.map(r=>({id:r.id,previous_sha256:r.previous_sha256,candidate_sha256:r.content_sha256}))},
  {source:r28Path,kind:'CANDIDATE_REPAIR',records:r28.records.map(r=>({id:r.id,previous_sha256:r.previous_hash,candidate_sha256:r.hash,reason_codes:blockers.find(b=>b.id===r.id).reason_codes}))}
 ];
}

if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 try{
  const checkpoint=JSON.parse(readFileSync('qa/certification/rdg/continuity-v80.json','utf8'));
  const result=await Promise.all(checkpoint.fronts.filter(f=>f.phase==='P2').map(async f=>{const index=await loadFront(f);return {block_id:f.block_id,...index,work_queue:prioritizePending(index,loadRepairGroups(f))};}));
  console.log(JSON.stringify({scope:'existing evidence index; no new adjudication',fronts:result},null,2));
 }catch(e){console.error(e.message);process.exitCode=1;}
}
