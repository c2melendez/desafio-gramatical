/** Oráculos estructurales independientes para las seis familias de Español.
 * Verifican que la clave almacenada sea seleccionable y los controles tengan salida;
 * no certifican veracidad semántica ni equivalencia con PAA/PHUMA.
 */
const nonempty=x=>typeof x==='string'&&x.trim().length>0;
const unique=xs=>new Set(xs).size===xs.length;
const index=(n,size)=>Number.isInteger(n)&&n>=0&&n<size;
const quad=xs=>Array.isArray(xs)&&xs.length===4&&xs.every(nonempty)&&unique(xs);
function choice(errors,item,key){
 if(!quad(item.options))errors.push('exactamente cuatro opciones distintas no vacías');
 if(!index(item[key],item.options?.length??0))errors.push('índice de respuesta fuera de opciones');
}
function labeled(errors,item){
 if(!Array.isArray(item.labels)||item.labels.length<2||!item.labels.every(nonempty)||!unique(item.labels))errors.push('categorías inválidas');
 if(!Array.isArray(item.items)||item.items.length<1||!unique(item.items.map(x=>x.id)))errors.push('elementos no únicos');
 for(const it of item.items??[]){
  if(!nonempty(it.id)||!nonempty(it.text)||!item.labels?.includes(it.label))errors.push('clasificación sin destino válido');
 }
}
function constructed(errors,item){
 const tiles=item.tiles??[],ids=tiles.map(x=>x.id);
 if(!Array.isArray(item.tiles)||tiles.length<2||!unique(ids)||tiles.some(t=>!nonempty(t.id)||!nonempty(t.text)))errors.push('fichas duplicadas/inválidas');
 if(!Array.isArray(item.solutions)||!item.solutions.length||
  item.solutions.some(solution=>!Array.isArray(solution)||!solution.length||!unique(solution)||solution.some(id=>!ids.includes(id))))
   errors.push('solución no construible con las fichas');
}
export function validateSpanishItem(item,row){
 const errors=[],topic=row.topic,mode=row.mode;
 if(!item||typeof item!=='object')return ['ejercicio ausente'];
 if(!nonempty(item.id))errors.push('ID vacío');
 if(topic==='Comprensión lectora'){
  if(!nonempty(item.passage))errors.push('texto de lectura vacío');
  if(mode==='quiz'){choice(errors,item,'answer');if(!nonempty(item.question))errors.push('pregunta vacía');}
  if(mode==='clasificar'){
   if(!Array.isArray(item.claims)||item.claims.length!==3)errors.push('tres afirmaciones obligatorias');
   else for(const c of item.claims)if(!nonempty(c.text)||!['explicit','inference','unsupported'].includes(c.tag))
    errors.push('etiqueta de evidencia inválida');
  }
  if(mode==='construir'&&(!Array.isArray(item.order?.parts)||item.order.parts.length!==3||
   item.order.parts.some(x=>!nonempty(x))||!nonempty(item.order?.explanation)))errors.push('secuencia de reconstrucción incompleta');
 }else if(topic==='Redacción'){
  if(mode==='quiz'){
   if(!quad(item.options)||!nonempty(item.connector)||!item.options?.includes(item.connector))errors.push('conector no elegible o distractores inválidos');
   if(!nonempty(item.gap))errors.push('frase incompleta');
  }
  if(mode==='clasificar'){
   if(!nonempty(item.flawed))errors.push('enunciado de corrección vacío');
   if(Object.hasOwn(item,'correctConnector')){
    if(!quad(item.options)||!nonempty(item.correctConnector)||!item.options.includes(item.correctConnector))errors.push('corrección no elegible');
   }else if(!nonempty(item.errorType)||!nonempty(item.correction))errors.push('error o corrección sin etiqueta');
  }
  if(mode==='construir'&&(!Array.isArray(item.steps)||item.steps.length!==3||item.steps.some(x=>!nonempty(x))))errors.push('tres pasos de edición obligatorios');
 }else if(topic==='Gramática y semántica'||topic==='Literatura'){
  if(mode==='quiz'){
   choice(errors,item,'answer');
   if(!nonempty(item.question)&&!nonempty(item.q))errors.push('pregunta vacía');
  }
  if(mode==='clasificar'){
   if(item.kind==='classification')labeled(errors,item);
   else if(Array.isArray(item.tokens)){
    if(!item.tokens.some(t=>nonempty(t.c)))errors.push('no hay palabras para clasificar');
    if(item.tokens.some(t=>!nonempty(t.t)||!(t.c===null||nonempty(t.c))))errors.push('token inválido');
   }else errors.push('clasificación sin tokens ni elementos');
  }
  if(mode==='construir'){
   if(item.kind==='construction')constructed(errors,item);
   else if(Array.isArray(item.pattern)&&Array.isArray(item.tiles)&&Array.isArray(item.solutions)){
    if(!item.pattern.length||item.tiles.length<item.pattern.length||!item.solutions.length)errors.push('patrón o fichas incompletos');
    if(item.tiles.some(t=>!nonempty(t.w)||!nonempty(t.c)))errors.push('ficha gramatical inválida');
   }else errors.push('construcción sin patrón ni soluciones');
  }
 }else errors.push('tema español desconocido: '+topic);
 return errors;
}
export function mutationEvidence(){
 const fixtures=[
  [{topic:'Comprensión lectora',mode:'quiz'},{id:'1',passage:'Texto',question:'Pregunta',options:['A','B','C','D'],answer:2},x=>{x.answer=9;}],
  [{topic:'Comprensión lectora',mode:'clasificar'},{id:'1',passage:'Texto',claims:['A','B','C'].map(text=>({text,tag:'explicit'}))},x=>{x.claims[0].tag='unknown';}],
  [{topic:'Comprensión lectora',mode:'construir'},{id:'1',passage:'Texto',order:{parts:['A','B','C'],explanation:'Orden'}},x=>{x.order.parts.pop();}],
  [{topic:'Redacción',mode:'quiz'},{id:'1',gap:'Texto ___',options:['A','B','C','D'],connector:'B'},x=>{x.connector='Z';}],
  [{topic:'Redacción',mode:'clasificar'},{id:'1',flawed:'Texto',correctConnector:'A',options:['A','B','C','D']},x=>{x.options.splice(0,1);}],
  [{topic:'Redacción',mode:'construir'},{id:'1',steps:['A','B','C']},x=>{x.steps.pop();}],
  [{topic:'Gramática y semántica',mode:'clasificar'},{id:'1',kind:'classification',labels:['A','B'],items:[{id:'c1',text:'Texto',label:'A'}]},x=>{x.items[0].label='Z';}],
  [{topic:'Gramática y semántica',mode:'construir'},{id:'1',kind:'construction',tiles:[{id:'a',text:'A'},{id:'b',text:'B'}],solutions:[['a','b']]},x=>{x.solutions=[['a','z']];}],
  [{topic:'Literatura',mode:'quiz'},{id:'1',question:'Pregunta',options:['A','B','C','D'],answer:0},x=>{x.options[3]='B';}]
 ];
 return fixtures.map(([row,good,mutate],i)=>{
  const baseline=validateSpanishItem(good,row);
  const altered=structuredClone(good);mutate(altered);
  return {fixture:i+1,baseline_ok:baseline.length===0,mutant_rejected:validateSpanishItem(altered,row).length>0,baseline_issues:baseline};
 });
}
