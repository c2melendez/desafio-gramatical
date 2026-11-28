import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {coverageRows} from '../src/lib/coverage.ts';
import {pool} from './inventory-items.mjs';
import {canonicalPrompt,stimulusKey} from './phuma-pair-identity.mjs';
const sha=s=>createHash('sha256').update(s).digest('hex');
const rows=coverageRows().filter(r=>r.area==='matematicas'&&r.topic==='Aritmética'&&r.subtopic==='Operaciones');
const records=rows.flatMap(row=>pool(row).map(q=>{
 if(typeof q.prompt!=='string'||!q.prompt.trim()||typeof q.id!=='string'||!q.id.trim())throw Error('Invalid identity');
 return {id:q.id,level:row.level,mode:row.mode,prompt_sha256:sha(canonicalPrompt(q.prompt)),stimulus_sha256:sha(stimulusKey(q)),family:q.family??null};
}));
if(records.length!==450||new Set(records.map(r=>r.id)).size!==records.length)throw Error('Incomplete MAT-ARIT-01');
console.log(JSON.stringify({schema:1,repository:'c2melendez/desafio-gramatical',scope:'MAT-ARIT-01',checkout:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),identity_revision:'d85040f0457a6411b3e1e9e44b42ed78d11ad4b6',status:'SCREEN_ONLY',records,limitations:'Active game models only, prompt and visual screen; does not include RDG routes, exam bank or semantic decisions.'},null,2));
