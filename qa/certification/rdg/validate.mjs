// Structural validator; not a disciplinary review or approval.
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
export const sha=b=>createHash('sha256').update(b).digest('hex');
export const key=s=>JSON.stringify([s.area,s.topic,s.subtopic]);
const need=(x,msg)=>{if(!x)throw Error(msg)};
export function shape(value,schema,path='$'){
 if('const' in schema)need(value===schema.const,path+': const');
 if(schema.enum)need(schema.enum.includes(value),path+': enum');
 if(schema.type==='object'){
  need(value&&typeof value==='object'&&!Array.isArray(value),path+': object');
  for(const k of schema.required??[])need(Object.hasOwn(value,k),path+': missing '+k);
  for(const [k,v] of Object.entries(value)){need(schema.additionalProperties!==false||Object.hasOwn(schema.properties,k),path+': unknown '+k);if(schema.properties?.[k])shape(v,schema.properties[k],path+'.'+k);}
 }
 if(schema.type==='array'){need(Array.isArray(value)&&value.length>=(schema.minItems??0),path+': array length');value.forEach((x,i)=>shape(x,schema.items,path+'['+i+']'));}
 if(schema.type==='string'){need(typeof value==='string'&&value.trim().length>=(schema.minLength??0),path+': string');if(schema.pattern)need(new RegExp(schema.pattern).test(value),path+': pattern');}
 if(schema.type==='integer')need(Number.isInteger(value)&&value>=(schema.minimum??-Infinity),path+': integer');
}
const unique=(a,label)=>{need(new Set(a).size===a.length,'duplicate '+label);return new Set(a)};
const equalSets=(a,b)=>a.size===b.size&&[...a].every(x=>b.has(x));
export function validateArchitecture(a,ctx,schemas){
 shape(a,schemas.arch);
 need(a.catalog_sha256===ctx.catalogHash&&a.source_manifest_sha256===ctx.sourceHash,'stale architecture inputs');
 const all=unique(a.blocks.flatMap(b=>b.subtopics.map(key)),'architecture subtopic');
 need(equalSets(all,new Set(ctx.rows.map(key))),'architecture must cover real catalog exactly');
 unique(a.components.map(c=>c.id),'component');
 const seen=new Set();
 for(const b of a.blocks){need(!seen.has(b.block_id),'duplicate block');need(b.depends_on.every(d=>seen.has(d)),'dependency must precede block');seen.add(b.block_id);}
 return true;
}
export function validatePlan(p,a,ctx,schemas){
 validateArchitecture(a,ctx,schemas);shape(p,schemas.plan);
 need(p.architecture_sha256===ctx.archHash&&p.catalog_sha256===ctx.catalogHash&&p.source_manifest_sha256===ctx.sourceHash,'stale plan inputs');
 const block=a.blocks.find(b=>b.block_id===p.block_id);need(block,'unknown block');
 const blockKeys=new Set(block.subtopics.map(key));
 const expected=p.route_scope?new Set([key(p.route_scope)]):blockKeys;
 if(p.route_scope)need(blockKeys.has(key(p.route_scope)),'independent route outside block');
 need(equalSets(unique(p.route_specs.map(r=>key(r.scope)),'route scope'),expected),p.route_scope?'plan must cover declared independent route exactly':'plan must cover block exactly');
 const docs=new Map(ctx.documents.map(d=>[d.id,d]));
 for(const r of p.route_specs){
  const refs=unique(r.sources.map(d=>d.source_id),'source');
  for(const ref of r.sources){const d=docs.get(ref.source_id);need(d&&d.sha256===ref.sha256&&ref.pages.every(n=>n<=d.pages),'invalid source id/hash/page');}
  const objectives=unique(r.objectives.map(o=>o.id),'objective');
  for(const o of r.objectives){need(o.source_refs.every(x=>refs.has(x)),'unbound source');if(o.classification==='PHUMA')need(o.source_refs.some(x=>docs.get(x)?.role==='official-primary'),'PHUMA requires primary source');}
  const research=r.external_research;
  const resources=unique(research.resources.map(x=>x.id),'external resource');
  const consulted=new Map(research.resources.filter(x=>x.access==='CONSULTADO'||x.access==='PARCIAL').map(x=>[x.id,x]));
  const primary=id=>refs.has(id)&&docs.get(id)?.role==='official-primary';
  for(const x of research.resources){
   need(/^https?:\/\//i.test(x.url),'external URL required');
   if(x.access==='SIN_ACCESO')need(x.decision==='DESCARTA','inaccessible source cannot support decisions');
  }
  need(equalSets(unique(research.profiles.map(x=>x.level),'calibration level'),new Set(['principiante','intermedio','avanzado'])),'calibration must cover three levels');
  need(research.profiles.some(x=>x.phuma_relation==='COMPARABLE'),'PHUMA comparable anchor required');
  for(const x of research.profiles){
   need(x.official_anchor_ids.every(primary),'calibration requires official anchors');
   need(x.external_resource_ids.every(id=>consulted.has(id)&&consulted.get(id).decision!=='DESCARTA'),'unavailable calibration resource');
  }
  for(const x of research.decisions){
   need(x.objective_ids.every(id=>objectives.has(id)),'external decision unknown objective');
   need(x.official_anchor_ids.every(primary),'external decision requires official anchor');
   need(x.resource_ids.every(id=>resources.has(id)),'unknown external resource');
   if(x.action!=='DESCARTA')need(x.resource_ids.every(id=>consulted.has(id)&&consulted.get(id).decision!=='DESCARTA'),'unavailable external evidence');
  }
  if(research.status==='CALIBRACION_CUALITATIVA'){
   const usable=[...consulted.values()].filter(x=>x.decision!=='DESCARTA');
   need(new Set(usable.map(x=>x.lineage)).size>=2,'two independent lineages or LIMITADA');
   need(research.profiles.some(x=>x.external_resource_ids.length>0),'external calibration not linked');
  }
  unique(r.activities.map(x=>x.id),'activity');
  for(const x of [...r.activities,...r.transfer_tasks,...r.games])need(x.objective_ids.every(id=>objectives.has(id)),'unknown objective');
  const taught=new Set(r.activities.flatMap(x=>x.objective_ids));
  need(equalSets(taught,objectives),'objective without activity');
  const evaluable=r.objectives.filter(o=>['PHUMA','PAA_COMPLEMENT'].includes(o.classification)).map(o=>o.id);
  need(evaluable.length>0,'no evaluable objective');
  const transfers=new Set(r.transfer_tasks.flatMap(x=>x.objective_ids)),practiced=new Set(r.games.flatMap(x=>x.objective_ids));
  need(evaluable.every(id=>transfers.has(id)&&practiced.has(id)),'missing transfer/practice mapping');
  const cells=new Set(ctx.rows.filter(x=>key(x)===key(r.scope)).map(x=>JSON.stringify([x.mode,x.level])));
  need(equalSets(unique(r.games.map(x=>JSON.stringify([x.mode,x.level])),'game/level'),cells),'game/level mapping incomplete');
 }
 return true;
}
async function main(){
 const dir='qa/certification/rdg/';
 const schemas={arch:JSON.parse(readFileSync(dir+'architecture.schema.json','utf8')),plan:JSON.parse(readFileSync(dir+'plan.schema.json','utf8'))};
 const {coverageRows}=await import('../../../src/lib/coverage.ts');
 const rows=coverageRows().map(({area,topic,subtopic,mode,level})=>({area,topic,subtopic,mode,level})).sort((a,b)=>JSON.stringify(a).localeCompare(JSON.stringify(b),'en'));
 const catalogHash=sha(JSON.stringify(rows));
 const sourceBytes=readFileSync('docs/fuentes_certificacion_paa_phuma_v6.json'),sourceHash=sha(sourceBytes),documents=JSON.parse(sourceBytes).documents;
 for(const d of documents)if(d.repository_copy)need(sha(readFileSync(d.repository_path))===d.sha256,'source bytes differ: '+d.id);
 if(process.argv[2]==='--inputs'){console.log(JSON.stringify({catalog_sha256:catalogHash,source_manifest_sha256:sourceHash,rows,documents:documents.map(({id,sha256,pages,role})=>({id,sha256,pages,role}))},null,2));return;}
 const path=process.argv[2];need(path,'plan path or --architecture required');
 const archBytes=readFileSync(dir+'architecture.json'),a=JSON.parse(archBytes),ctx={rows,documents,catalogHash,sourceHash,archHash:sha(archBytes)};
 if(path==='--architecture'){validateArchitecture(a,ctx,schemas);console.log(JSON.stringify({status:'PASS_STRUCTURAL',path:dir+'architecture.json',sha256:ctx.archHash,scope:'architecture only; no route implemented'}));return;}
 const bytes=readFileSync(path),p=JSON.parse(bytes);validatePlan(p,a,ctx,schemas);
 console.log(JSON.stringify({status:'PASS_STRUCTURAL',path,sha256:sha(bytes),block_id:p.block_id,subtopics:p.route_specs.length,scope:p.route_scope?'independent subtopic design only; block not certified':'design only; no route or academic certification'}));
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href)main().catch(e=>{console.error(e.message);process.exitCode=1;});
