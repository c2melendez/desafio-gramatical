import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {validateArchitecture,validatePlan} from './validate.mjs';
const schema=n=>JSON.parse(readFileSync(new URL(n+'.schema.json',import.meta.url),'utf8'));
const schemas={arch:schema('architecture'),plan:schema('plan')},h='a'.repeat(64);
const scope={area:'fixture',topic:'fixture',subtopic:'fixture'},ctx={catalogHash:h,sourceHash:h,archHash:h,rows:[{...scope,mode:'quiz',level:'principiante'}],documents:[{id:'s',sha256:h,pages:2,role:'official-primary'}]};
function fixture(){
 const a={schema_version:'7.8',catalog_sha256:h,source_manifest_sha256:h,components:[{id:'c',decision:'REUSE',purpose:'fixture',acceptance:'fixture'}],blocks:[{block_id:'b',reason:'fixture',depends_on:[],subtopics:[scope]}]};
 const p={schema_version:'7.8',block_id:'b',architecture_sha256:h,catalog_sha256:h,source_manifest_sha256:h,route_specs:[{scope,sources:[{source_id:'s',sha256:h,pages:[1],finding:'fixture'}],didactic_evidence:[{url:'https://example.invalid',accessed_at:'fixture',finding:'fixture',limitations:'fixture'}],objectives:[{id:'o',statement:'fixture',operation:'fixture',depth:'fixture',source_refs:['s'],classification:'PHUMA'}],foundations:['fixture'],bridges:['fixture'],common_errors:['fixture'],activities:[{id:'a',objective_ids:['o'],function:'fixture',interaction:'fixture',representation:'fixture',prompt:'fixture',expected_reasoning:'fixture',feedback:'fixture',help:'fixture',acceptance:'fixture'}],worked_examples:['fixture'],transfer_tasks:[{prompt:'fixture',solution:'fixture',oracle:'fixture',objective_ids:['o']}],games:[{mode:'quiz',level:'principiante',objective_ids:['o'],operation:'fixture'}],acceptance:['fixture']}]};
 const external={status:'CALIBRACION_CUALITATIVA',searches:[{query:'fixture',date:'2026-11-25',channel:'fixture',results_reviewed:2,finding:'fixture'}],resources:['r1','r2'].map(id=>({id,url:'https://example.invalid/'+id,title:'fixture',producer:id,lineage:id,kind:'SIMULACRO',scope:'PHUMA',access:'CONSULTADO',locator:'fixture',finding:'fixture',quality:'fixture',limitations:'fixture',decision:'REFUERZA'})),coverage_note:'fixture',stop_reason:'fixture',limitations:'fixture',profiles:['principiante','intermedio','avanzado'].map(level=>({level,official_anchor_ids:['s'],external_resource_ids:['r1'],operation:'fixture',reasoning_steps:'fixture',prerequisites:'fixture',representations:'fixture',reading_load:'fixture',distractors:'fixture',format:'fixture',autonomy:'fixture',time_basis:'estimate fixture',phuma_relation:level==='avanzado'?'COMPARABLE':'PREPARATORIO',original_example:'fixture',decision:'fixture'})),decisions:[{objective_ids:['o'],resource_ids:['r1'],official_anchor_ids:['s'],action:'REFUERZA',rationale:'fixture'}]};
 p.route_specs[0].external_research=external;
 return {a,p};
}
test('synthetic valid plan',()=>{const {a,p}=fixture();assert.equal(validatePlan(p,a,ctx,schemas),true)});
test('stale source',()=>{const {a,p}=fixture();p.source_manifest_sha256='b'.repeat(64);assert.throws(()=>validatePlan(p,a,ctx,schemas),/stale/)});
test('incomplete catalog',()=>{const {a}=fixture();assert.throws(()=>validateArchitecture(a,{...ctx,rows:[...ctx.rows,{...scope,subtopic:'other'}]},schemas),/exactly/)});
test('empty design',()=>{const {a,p}=fixture();p.route_specs=[];assert.throws(()=>validatePlan(p,a,ctx,schemas))});
test('unknown objective',()=>{const {a,p}=fixture();p.route_specs[0].activities[0].objective_ids=['missing'];assert.throws(()=>validatePlan(p,a,ctx,schemas),/unknown objective/)});
test('missing transfer',()=>{const {a,p}=fixture();p.route_specs[0].transfer_tasks=[];assert.throws(()=>validatePlan(p,a,ctx,schemas))});
test('invalid source page',()=>{const {a,p}=fixture();p.route_specs[0].sources[0].pages=[3];assert.throws(()=>validatePlan(p,a,ctx,schemas),/source/)});
test('incomplete games',()=>{const {a,p}=fixture();p.route_specs[0].games[0].mode='other';assert.throws(()=>validatePlan(p,a,ctx,schemas),/mapping/)});
test('missing dependency',()=>{const {a}=fixture();a.blocks[0].depends_on=['missing'];assert.throws(()=>validateArchitecture(a,ctx,schemas),/dependency/)});
test('rejects absent complementary research',()=>{const {a,p}=fixture();delete p.route_specs[0].external_research;assert.throws(()=>validatePlan(p,a,ctx,schemas),/external_research/)});
test('rejects inaccessible calibration source',()=>{const {a,p}=fixture();p.route_specs[0].external_research.resources[0].access='SIN_ACCESO';assert.throws(()=>validatePlan(p,a,ctx,schemas),/inaccessible/)});
test('rejects copied lineages as independent',()=>{const {a,p}=fixture();p.route_specs[0].external_research.resources[1].lineage='r1';assert.throws(()=>validatePlan(p,a,ctx,schemas),/lineages/)});
test('accepts documented limited evidence',()=>{const {a,p}=fixture();const r=p.route_specs[0].external_research;r.status='LIMITADA';r.resources=[];for(const x of r.profiles)x.external_resource_ids=[];r.decisions[0].resource_ids=[];assert.equal(validatePlan(p,a,ctx,schemas),true)});
test('rejects missing difficulty level',()=>{const {a,p}=fixture();p.route_specs[0].external_research.profiles.pop();assert.throws(()=>validatePlan(p,a,ctx,schemas),/three levels/)});
test('rejects ungrounded official anchor',()=>{const {a,p}=fixture();p.route_specs[0].external_research.profiles[0].official_anchor_ids=['r1'];assert.throws(()=>validatePlan(p,a,ctx,schemas),/official anchors/)});
test('rejects external decision for unknown objective',()=>{const {a,p}=fixture();p.route_specs[0].external_research.decisions[0].objective_ids=['other'];assert.throws(()=>validatePlan(p,a,ctx,schemas),/unknown objective/)});

// Validate the actual P0 candidate against the repository catalog and source bytes, not synthetic fixtures.
import {execFileSync} from 'node:child_process';
test('P0 actual architecture and MAT-ARIT-01 plan',()=>{
 for(const path of ['--architecture','qa/certification/rdg/plans/MAT-ARIT-01.json']){
  const result=JSON.parse(execFileSync(process.execPath,['--import','./scripts/ts-resolve.mjs','qa/certification/rdg/validate.mjs',path],{encoding:'utf8'}));
  assert.equal(result.status,'PASS_STRUCTURAL');
  console.log(JSON.stringify(result));
 }
});

test('independent route does not weaken legacy full-block validation',()=>{
 const {a,p}=fixture(),other={...scope,subtopic:'other'},context={...ctx,rows:[...ctx.rows,{...other,mode:'quiz',level:'principiante'}]};
 a.blocks[0].subtopics.push(other);
 assert.throws(()=>validatePlan(p,a,context,schemas),/cover block exactly/);
 p.route_scope=scope;assert.equal(validatePlan(p,a,context,schemas),true);
 p.route_scope=other;assert.throws(()=>validatePlan(p,a,context,schemas),/declared independent route exactly/);
 p.route_scope={...scope,subtopic:'outside'};assert.throws(()=>validatePlan(p,a,context,schemas),/outside block/);
 p.route_scope=scope;p.route_specs.push({...p.route_specs[0],scope:other});
 assert.throws(()=>validatePlan(p,a,context,schemas),/declared independent route exactly/);
 p.route_specs.pop();p.route_specs[0].games=[];
 assert.throws(()=>validatePlan(p,a,context,schemas));
});
test('P0 actual two independent subtopic candidates; no block completion claim',()=>{
 for(const path of ['qa/certification/rdg/plans/ESPANOL-01-Idea-principal.json','qa/certification/rdg/plans/NATURALES-01-Celula.json']){
  const result=JSON.parse(execFileSync(process.execPath,['--import','./scripts/ts-resolve.mjs','qa/certification/rdg/validate.mjs',path],{encoding:'utf8'}));
  assert.equal(result.status,'PASS_STRUCTURAL');assert.equal(result.subtopics,1);
  assert.match(result.scope,/block not certified/);console.log(JSON.stringify(result));
 }
});
