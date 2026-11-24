import {createHash} from 'node:crypto';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {coverageRows} from '../../src/lib/coverage.ts';
import {pool} from '../../scripts/inventory-items.mjs';
import {mainIdeaDraft} from '../../src/lib/reviews/idea-principal.ts';
import {validateReview} from '../../src/lib/review-contract.ts';
const hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
const identity={area:'espanol',topic:'Comprensión lectora',subtopic:'Idea principal'};
const rows=coverageRows().filter(r=>Object.entries(identity).every(([k,v])=>r[k]===v));
const modes={quiz:1,clasificar:2,construir:3};
const targets={principiante:30,intermedio:50,avanzado:70};
const errors=[],records=[],seen=new Set();
const evidencePath='qa/certification/review-main-idea-decisions.json';
const decisions=JSON.parse(readFileSync(evidencePath,'utf8'));
const lookup=new Map(decisions.items.map(x=>[x.id,x]));
if(lookup.size!==decisions.items.length)errors.push('Duplicate editorial decision');
if(rows.length!==9)errors.push('Expected nine cells');
for(const row of rows){
 const items=pool(row);
 if(items.length!==targets[row.level])errors.push('Incorrect quota '+row.mode+'/'+row.level);
 for(const item of items){
  if(seen.has(item.id))errors.push('Duplicate ID '+item.id);seen.add(item.id);
  const digest=hash(item);
  const candidate='ip-'+row.level+'-'+modes[row.mode];
  const shape=row.mode==='quiz'?Array.isArray(item.options)&&typeof item.question==='string':
   row.mode==='clasificar'?Array.isArray(item.claims)&&item.claims.length===3:
   Array.isArray(item.order?.parts)&&item.order.parts.length===3;
  if(!shape)errors.push('Unexpected decision shape '+item.id);
  const decision=lookup.get(item.id);
  const current=decision?.content_sha256===digest&&decision?.review_sha256===hash(mainIdeaDraft);
  const valid=Boolean(current&&decision.status==='APPROVED'&&typeof decision.rationale==='string'&&decision.rationale.trim()&&typeof decision.reviewer==='string'&&decision.reviewer.trim()&&Array.isArray(decision.objectiveIds)&&decision.objectiveIds.length);
  records.push({id:item.id,game:row.mode,level:row.level,content_sha256:digest,origin:item.origin??'original',source_ids:item.sourceIds??[],candidate_objective_ids:[candidate],semantic_status:valid?'APPROVED':'REVIEW',review_reason:valid?decision.rationale:decision?'Decision stale or incomplete':'Per-item judgment absent',approved_objective_ids:valid?decision.objectiveIds:[]});
 }
}
for(const id of lookup.keys())if(!seen.has(id))errors.push('Foreign editorial ID '+id);
if(records.length!==450||seen.size!==450)errors.push('Expected 450 distinct IDs');
const inventory=records.map(r=>({id:r.id,depth:r.level}));
const candidate={...mainIdeaDraft,links:records.map(r=>({exerciseId:r.id,objectiveIds:r.candidate_objective_ids}))};
const candidateIssues=validateReview(candidate,inventory);
errors.push(...candidateIssues);
const approved={...mainIdeaDraft,links:records.filter(r=>r.semantic_status==='APPROVED').map(r=>({exerciseId:r.id,objectiveIds:r.approved_objective_ids}))};
const actualIssues=validateReview(approved,inventory);
const approvedCount=records.filter(r=>r.semantic_status==='APPROVED').length;
const report={schema_version:1,sha:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),identity,review_sha256:hash(mainIdeaDraft),inventory_count:records.length,technical_status:errors.length?'FAIL':'PASS',semantic_approved:approvedCount,semantic_review:records.length-approvedCount,c09_status:errors.length?'FAIL':approvedCount===450&&!actualIssues.length?'PARITY_REVIEW_COMPLETE':'PENDING',candidate_mapping_only:true,issues:errors,approved_parity_issues:actualIssues,records,limitations:'Candidate mappings by game and level are not academic evidence. Even complete editorial parity requires R01/R02/R03/R06 review and same-SHA CI/Render.'};
mkdirSync('qa/certification/evidence',{recursive:true});
writeFileSync('qa/certification/evidence/review-main-idea.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({sha:report.sha,inventory_count:report.inventory_count,technical_status:report.technical_status,semantic_approved:approvedCount,semantic_review:report.semantic_review,c09_status:report.c09_status,issues:errors},null,2));
if(errors.length)process.exitCode=1;
