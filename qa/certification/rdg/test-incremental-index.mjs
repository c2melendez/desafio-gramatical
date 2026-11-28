import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {indexEvidence,loadFront} from './incremental-index.mjs';
const h='a'.repeat(64),other='b'.repeat(64),scope={area:'fixture',topic:'fixture',subtopic:'fixture'};
const fixture=()=>({scope,manifests:[{path:'s',data:{subtopic_scope:scope,items:[{id:'x',content_sha256:h},{id:'y',content_sha256:other}]}}],ledgers:[{path:'l',data:{records:[{id:'x',area:'fixture',tema:'fixture',subtema:'fixture',content_hash:h,semantic_status:'PASS_SEMANTIC',criteria_revision:'7.9',oracle_status:'VERIFIED',rubric:Object.fromEntries([... 'ABCDEFGH'].map(k=>[k,{score:3,reason:'fixture'}])),reason_codes:[],dependency_hashes:{p:h},evidence_fingerprint:{id:'x',hash:h}}]}}],dependencies:{p:h},currentDependencies:{p:h}});
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
])test(name+' requires revalidation',()=>{const x=fixture();mutate(x);assert.equal(indexEvidence(x).counts.reusable,0);assert.equal(indexEvidence(x).counts.revalidation,1)});
test('duplicate approval fails closed',()=>{const x=fixture();x.ledgers[0].data.records.push(x.ledgers[0].data.records[0]);assert.throws(()=>indexEvidence(x),/duplicate PASS/)});
test('duplicate selection fails closed',()=>{const x=fixture();x.manifests[0].data.items.push(x.manifests[0].data.items[0]);assert.throws(()=>indexEvidence(x),/duplicate selection/)});
test('wrong manifest scope fails closed',()=>{const x=fixture();x.manifests[0].data.subtopic_scope={...scope,area:'other'};assert.throws(()=>indexEvidence(x),/outside scope/)});
test('candidate route cannot enter P2',()=>assert.throws(()=>loadFront({rdg_status:'CANDIDATE_NOT_READY'}),/not RDG_READY/));
test('real repository index and preserved legacy continuity',()=>{
 const state=JSON.parse(readFileSync('qa/certification/batch-state.json','utf8')),checkpoint=JSON.parse(readFileSync('qa/certification/rdg/continuity-v80.json','utf8'));
 assert.equal(state.active_prompt_version,'8.0');assert.equal(state.batch_policy.criteria_revision,'7.9');assert.equal(checkpoint.fronts.length,3);
 const f=checkpoint.fronts.find(x=>x.block_id==='MAT-ARIT-01');
 assert.deepEqual(f.selection_paths,state.rdg_continuity.selection_paths);assert.deepEqual(f.ledger_paths,state.rdg_continuity.v79_semantic_pass_paths);
 const result=loadFront(f);
 assert.equal(result.counts.selected,450);assert.equal(result.counts.registered_pass,state.rdg_continuity.semantic_pass_ids);assert.equal(result.counts.reusable,result.counts.registered_pass);assert.equal(result.counts.revalidation,0);assert.equal(result.counts.new_pass,0);
 assert.equal(result.counts.review,450-result.counts.registered_pass);console.log('RDG_V80_INCREMENTAL '+JSON.stringify(result.counts));
});
