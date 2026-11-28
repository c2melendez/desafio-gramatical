import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {indexEvidence,loadFront,prioritizePending,loadRepairGroups} from './incremental-index.mjs';
const h='a'.repeat(64),other='b'.repeat(64),scope={area:'fixture',topic:'fixture',subtopic:'fixture'};
const fixture=()=>({scope,manifests:[{path:'s',data:{subtopic_scope:scope,items:[{id:'x',content_sha256:h},{id:'y',content_sha256:other}]}}],ledgers:[{path:'l',data:{records:[{id:'x',area:'fixture',tema:'fixture',subtema:'fixture',content_hash:h,semantic_status:'PASS_SEMANTIC',criteria_revision:'7.9',oracle_status:'VERIFIED',rubric:Object.fromEntries([... 'ABCDEFGH'].map(k=>[k,{score:3,reason:'fixture'}])),reason_codes:[],dependency_hashes:{p:h},evidence_fingerprint:{id:'x',hash:h}}]}}],dependencies:{p:h},currentDependencies:{p:h},currentItems:new Map([['x',h],['y',other]])});
test('existing PASS reused; no new PASS from index',()=>assert.deepEqual(indexEvidence(fixture()).counts,{selected:2,registered_pass:1,reusable:1,revalidation:0,review:1,new_pass:0}));
for(const [name,mutate] of [
 ['stale content',x=>x.manifests[0].data.items[0].content_sha256=other],
 ['stale dependency',x=>x.currentDependencies.p=other],
 ['missing criterion',x=>delete x.ledgers[0].data.records[0].rubric.E],
 ['weak criterion',x=>x.ledgers[0].data.records[0].rubric.F.score=2],
 ['oracle inconclusive',x=>x.ledgers[0].data.records[0].oracle_status='INCONCLUSIVE'],
 ['stale fingerprint',x=>x.ledgers[0].data.records[0].evidence_fingerprint.hash=other],
 ['blocked',x=>x.ledgers[0].data.records[0].reason_codes=['BLOCK']],
 ['wrong scope',x=>x.ledgers[0].data.records[0].area='other']
])test(name+' requires revalidation',()=>{const x=fixture();mutate(x);assert.equal(indexEvidence(x).counts.reusable,0);assert.equal(indexEvidence(x).counts.revalidation,name==='stale dependency'?2:1)});
test('duplicate approval fails closed',()=>{const x=fixture();x.ledgers[0].data.records.push(x.ledgers[0].data.records[0]);assert.throws(()=>indexEvidence(x),/duplicate PASS/)});
test('duplicate selection fails closed',()=>{const x=fixture();x.manifests[0].data.items.push(x.manifests[0].data.items[0]);assert.throws(()=>indexEvidence(x),/duplicate selection/)});
test('wrong manifest scope fails closed',()=>{const x=fixture();x.manifests[0].data.subtopic_scope={...scope,area:'other'};assert.throws(()=>indexEvidence(x),/outside scope/)});
test('candidate route cannot enter P2',async()=>assert.rejects(loadFront({rdg_status:'CANDIDATE_NOT_READY'}),/not RDG_READY/));
test('live content drift reopens PASS even when frozen ledger matches',()=>{const x=fixture();x.currentItems.set('x',other);const r=indexEvidence(x);assert.equal(r.counts.reusable,0);assert.equal(r.counts.revalidation,1);assert.ok(r.entries[0].reasons.includes('LIVE_CONTENT_CHANGED'));});
test('missing live ID with no PASS is blocked from review queue',()=>{const x=fixture();x.currentItems.delete('y');const r=indexEvidence(x);assert.equal(r.counts.revalidation,1);assert.equal(r.counts.review,0);assert.ok(r.entries[1].reasons.includes('LIVE_ID_MISSING'));});
test('missing inventory cannot authorize evidence reuse',()=>{const x=fixture();delete x.currentItems;assert.throws(()=>indexEvidence(x),/live inventory required/);});
test('stale dependencies block unadjudicated IDs as well',()=>{const x=fixture();x.currentDependencies.p=other;const r=indexEvidence(x);assert.equal(r.counts.revalidation,2);assert.equal(r.counts.review,0);});
const repair=(records)=>[{source:'candidate.json',kind:'CANDIDATE_REPAIR',records}];
test('repair candidate consumes only matching pending predecessor, never PASS',()=>{
 const result=prioritizePending(indexEvidence(fixture()),repair([{id:'y',previous_sha256:other,candidate_sha256:h}]));
 assert.equal(result.counts.PRESERVAR_EVIDENCIA,1);assert.equal(result.counts.RECONCILIAR_CANDIDATO,1);assert.equal(result.counts.REVISION_ORDINARIA,0);assert.equal(result.new_pass,0);assert.equal(result.publication_authorized,false);
});
test('exact integrated successor goes to individual adjudication, not PASS',()=>{
 const result=prioritizePending(indexEvidence(fixture()),repair([{id:'y',previous_sha256:h,candidate_sha256:other}]));
 assert.equal(result.counts.ADJUDICAR_SUCESOR,1);assert.equal(result.counts.REVALIDAR,0);assert.equal(result.new_pass,0);
});
test('stale repair predecessor is routed to revalidation',()=>{
 const result=prioritizePending(indexEvidence(fixture()),repair([{id:'y',previous_sha256:h,candidate_sha256:'c'.repeat(64)}]));
 assert.equal(result.counts.REVALIDAR,1);assert.equal(result.counts.RECONCILIAR_CANDIDATO,0);
});
test('known blocker does not enter ordinary review',()=>{
 const result=prioritizePending(indexEvidence(fixture()),[{source:'ledger.json',kind:'KNOWN_REVIEW_BLOCKER',records:[{id:'y',previous_sha256:other,reason_codes:['BLOCK']}]}]);
 assert.equal(result.counts.RESOLVER_BLOQUEO,1);assert.equal(result.counts.REVISION_ORDINARIA,0);
});
test('duplicate or unknown repairs fail closed',()=>{
 const r={id:'y',previous_sha256:other,candidate_sha256:h};
 assert.throws(()=>prioritizePending(indexEvidence(fixture()),repair([r,r])),/duplicate repair ID/);
 assert.throws(()=>prioritizePending(indexEvidence(fixture()),repair([{...r,id:'absent'}])),/unknown repair ID/);
});
test('existing revalidation cannot be bypassed by candidate',()=>{
 const x=fixture();x.currentItems.delete('y');
 const result=prioritizePending(indexEvidence(x),repair([{id:'y',previous_sha256:other,candidate_sha256:h}]));
 assert.equal(result.counts.REVALIDAR,1);assert.equal(result.counts.RECONCILIAR_CANDIDATO,0);
});
test('real repository index and preserved legacy continuity',async()=>{
 const state=JSON.parse(readFileSync('qa/certification/batch-state.json','utf8')),checkpoint=JSON.parse(readFileSync('qa/certification/rdg/continuity-v80.json','utf8'));
 assert.equal(state.active_prompt_version,'8.0');assert.equal(state.batch_policy.criteria_revision,'7.9');assert.equal(checkpoint.fronts.length,3);
 const f=checkpoint.fronts.find(x=>x.block_id==='MAT-ARIT-01');
 assert.deepEqual(f.selection_paths,state.rdg_continuity.selection_paths);assert.deepEqual(f.ledger_paths,state.rdg_continuity.v79_semantic_pass_paths);
 const result=await loadFront(f);
 assert.equal(result.counts.selected,450);assert.equal(result.counts.registered_pass,state.rdg_continuity.semantic_pass_ids);assert.equal(result.counts.new_pass,0);assert.equal(result.counts.reusable+result.counts.revalidation+result.counts.review,result.counts.selected);
 assert.ok(result.counts.reusable<=result.counts.registered_pass);assert.ok(result.entries.every(x=>x.queue!=='EVIDENCIA_VIGENTE'||x.live_content_sha256===x.content_sha256));console.log('RDG_V80_INCREMENTAL '+JSON.stringify(result.counts));
 const queue=prioritizePending(result,loadRepairGroups(f));
 assert.equal(Object.values(queue.counts).reduce((a,b)=>a+b,0),result.counts.selected);
 assert.equal(queue.counts.PRESERVAR_EVIDENCIA,result.counts.reusable);
 assert.equal(queue.counts.ADJUDICAR_SUCESOR,62);assert.equal(queue.counts.REVALIDAR,0);assert.equal(queue.counts.PRESERVAR_EVIDENCIA,125);assert.equal(queue.counts.REVISION_ORDINARIA,263);
 assert.equal(queue.new_pass,0);assert.equal(queue.publication_authorized,false);
 assert.ok(queue.entries.every(e=>e.action!=='REVISION_ORDINARIA'||e.repair===null));
 console.log('RDG_STEM05_QUEUE '+JSON.stringify(queue.counts));
});
