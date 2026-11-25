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
