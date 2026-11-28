/** Deterministic identity screen; not a semantic adjudication or an oracle. */
export function normalizeText(value) {
 return String(value??'').normalize('NFKC').toLocaleLowerCase('es')
  .replace(/[−–—]/g,'-').replace(/[“”«»]/g,'"').replace(/[‘’]/g,"'")
  .replace(/\s+/g,' ').trim();
}
const wrappers=[
 'examina el texto o enunciado y elige la opción más precisa.',
 'evalúa cuidadosamente la interpretación y descarta los distractores.'
];
const suffixes=[
 'justifica mentalmente tu elección atendiendo al contexto.',
 'considera el sentido completo y no solo palabras aisladas.'
];
export function canonicalPrompt(value){
 let s=normalizeText(value);
 for(const p of wrappers)if(s.startsWith(p+' '))s=s.slice(p.length).trim();
 for(const p of suffixes)if(s.endsWith(' '+p))s=s.slice(0,-p.length).trim();
 return s;
}
function canonical(value){
 if(typeof value==='string')return normalizeText(value);
 if(Array.isArray(value))return value.map(canonical);
 if(value&&typeof value==='object')return Object.fromEntries(Object.keys(value).sort().map(k=>[k,canonical(value[k])]));
 return value??null;
}
export function stimulusKey(q){
 // Do not strip digits, accents or mathematical signs: these can change meaning.
 return JSON.stringify([canonicalPrompt(q.prompt),normalizeText(q.passage),canonical(q.visual)]);
}
export function structuralSignal(q){
 if(q.area!=='matematicas')return null;
 if(q.familyId)return 'declared:'+q.familyId;
 return 'numeric-skeleton:'+canonicalPrompt(q.prompt).replace(/\d+(?:[.,]\d+)?/g,'#');
}
export function auditIdentities(bank){
 const byId=new Map(),stimuli=new Map(),structures=new Map();
 for(const q of bank){
  for(const [map,key] of [[byId,q.id],[stimuli,stimulusKey(q)],[structures,structuralSignal(q)]]){
   if(key===null)continue;
   if(!map.has(key))map.set(key,[]);
   map.get(key).push(q.id);
  }
 }
 const collisions=map=>[...map].filter(([,ids])=>ids.length>1).map(([key,ids])=>({key,ids}));
 return {records:bank.length,distinctStimuli:stimuli.size,duplicateIds:collisions(byId),
   stimulusCollisions:collisions(stimuli),structuralReview:collisions(structures),
   semanticPass:0,limitations:'Exact normalized visible-stimulus screen. Structural matches require review; no paraphrase completeness or semantic certification.'};
}
export function eligibility(bank,history=[]){
 const seen=new Set(history),known=new Set(bank.map(q=>q.id));
 const seenStimuli=new Set(bank.filter(q=>seen.has(q.id)).map(stimulusKey));
 return {eligible:bank.filter(q=>!seen.has(q.id)&&!seenStimuli.has(stimulusKey(q))),
  unknownHistory:[...seen].filter(id=>!known.has(id))};
}
