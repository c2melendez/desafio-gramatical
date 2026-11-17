/** Auditoría M1 contra datos fuente (no contra claves almacenadas).
 * El alcance automático NO reemplaza revisión docente ni acredita independencia psicométrica.
 */
import {M1_FIRST_SOURCE as S,SYNONYM_CONSTRUCTION,COHESION_CONSTRUCTION,MORPH_CLASSIFICATION,MORPH_CONSTRUCTION} from '../src/lib/grammar-m1-activities.ts';
import {HOMO_CONTEXTS} from '../src/lib/m1-homonimia-contexts.ts';
import {HYPER_CONTEXTS} from '../src/lib/m1-hiperonimia-contexts.ts';
import {ADEQ_CONTEXTS} from '../src/lib/m1-adecuacion-contexts.ts';
import {REFERENT_CONTEXTS} from '../src/lib/m1-referentes-contexts.ts';
import {FIGURE_CONTEXTS} from '../src/lib/m1-figuras-contexts.ts';
import {GENRE_CONTEXTS} from '../src/lib/m1-generos-contexts.ts';
import {HOMO_CLASS,HOMO_BUILD,HYPER_CLASS,HYPER_BUILD,ADEQ_CLASS,ADEQ_BUILD,M1_NEXT_QUIZ} from '../src/lib/grammar-m1-next-activities.ts';
import {FIGURE_CLASS,FIGURE_BUILD,GENRE_CLASS,GENRE_BUILD,M1_LITERATURE_QUIZ} from '../src/lib/grammar-m1-literature.ts';
import {gradeClassification,gradeConstruction,validateActivity} from '../src/lib/grammar-activities.ts';
import {execFileSync} from 'node:child_process';
const failures=[],checks=[],level=i=>i<10?'principiante':i<25?'intermedio':'avanzado';
const N=x=>String(x??'').normalize('NFKC').trim().replace(/\s+/g,' ').toLocaleLowerCase('es');
const note=(q,rule)=>failures.push({id:q?.id??'unknown',rule});
const all=[...SYNONYM_CONSTRUCTION,...COHESION_CONSTRUCTION,...MORPH_CLASSIFICATION,...MORPH_CONSTRUCTION,
 ...HOMO_CLASS,...HOMO_BUILD,...HYPER_CLASS,...HYPER_BUILD,...ADEQ_CLASS,...ADEQ_BUILD,
 ...FIGURE_CLASS,...FIGURE_BUILD,...GENRE_CLASS,...GENRE_BUILD,...M1_NEXT_QUIZ,...M1_LITERATURE_QUIZ];
function checkMeta(q,expectedLevel){
 if(!q.id||!q.explanation||q.explanation.length<30||!q.competence||!q.cognitiveGoal||!q.sourceLocator||!q.family||!q.origin)note(q,'metadatos o explicación insuficientes');
 if(q.reviewStatus!=='editorial-draft')note(q,'revisión académica declarada incorrectamente');
 if(q.level!==expectedLevel)note(q,'nivel diferente al de su posición de origen');
}
function checkClassification(q,expected,lev){
 checkMeta(q,lev);
 const errors=validateActivity(q);if(errors.length)note(q,'esquema inválido: '+errors.join(','));
 if(q.kind!=='classification'||q.items.length!==expected.length)note(q,'número/tipo de fragmentos distinto del origen');
 else{
  const byId=new Map(q.items.map(x=>[x.id,x]));
  for(const [i,{text,label}] of expected.entries()){
   const item=byId.get('f'+i);
   if(!item||N(item.text)!==N(text)||N(item.label)!==N(label))note(q,'fragmento f'+i+' contradice etiqueta/fuente');
   if(item&&!item.explanation)note(q,'faltó justificación por fragmento');
  }
  const actual=Object.fromEntries(q.items.map(x=>[x.id,x.label]));
  if(!gradeClassification(q,actual)||gradeClassification(q,{}))note(q,'evaluador no discrimina una respuesta inválida');
  if(q.items.map(x=>x.label).every((x,i)=>x===q.labels[i]))note(q,'posible pista posicional de clasificación');
 }
 checks.push({id:q.id,control:'clasificacion_fuente',resultado:failures.some(x=>x.id===q.id)?'RECHAZADO':'VERIFICADO_AUTOMATICO'});
}
function checkBuild(q,parts,wrong,lev){
 checkMeta(q,lev);
 const errors=validateActivity(q);if(errors.length)note(q,'esquema inválido: '+errors.join(','));
 if(q.kind!=='construction'||q.tiles.length!==4||q.solutions.length<1)note(q,'formato de construcción incompleto');
 else{
  for(let j=0;j<3;j++)if(N(q.tiles.find(x=>x.id==='t'+j)?.text)!==N(parts[j]))note(q,'ficha t'+j+' diferente de la fuente');
  if(N(q.tiles.find(x=>x.id==='d')?.text)!==N(wrong))note(q,'distractor diferente de la fuente');
  if(new Set([...parts,wrong].map(N)).size!==4)note(q,'ficha distractora igual a una solución');
  const expected=['t0','t1','t2'];
  if(!gradeConstruction(q,expected)||gradeConstruction(q,['t0','t1','d'])||gradeConstruction(q,expected.slice(0,2)))note(q,'clave de construcción no respeta origen');
  if(q.solutions.some(arr=>arr.some(id=>id==='d')))note(q,'distractor incluido en solución');
 }
 checks.push({id:q.id,control:'construccion_fuente',resultado:failures.some(x=>x.id===q.id)?'RECHAZADO':'VERIFICADO_AUTOMATICO'});
}
function rowEntry(text,label){return {text,label}}
for(let i=0;i<45;i++){
 const lev=level(i);
 checkBuild(SYNONYM_CONSTRUCTION[i],S.SYN[i].slice(1),S.SYN_DECOYS[i],lev);
 checkBuild(COHESION_CONSTRUCTION[i],S.COH[i],S.COH_DECOYS[i],lev);
 const morph=i<10?S.MORPH_B[i]:i<25?S.MORPH_I[i-10]:S.MORPH_A[i-25];
 const labels=i<10?S.BASIC_LABELS:i<25?S.INTER_LABELS:S.ADV_LABELS;
 checkClassification(MORPH_CLASSIFICATION[i],morph.slice(1).map((text,j)=>rowEntry(text,labels[j])),lev);
 checkBuild(MORPH_CONSTRUCTION[i],S.MORPH_CONSTR[i],S.MORPH_DECOYS[i],lev);
 const [word,a,ma,b,mb]=HOMO_CONTEXTS[i];
 checkClassification(HOMO_CLASS[i],[rowEntry(a,ma),rowEntry(b,mb)],lev);
 checkBuild(HOMO_BUILD[i],['En «'+b+'»','la palabra «'+word+'» significa','«'+mb+'».'],'«'+ma+'».',lev);
 const [category,hypoA,hypoB]=HYPER_CONTEXTS[i],other=HYPER_CONTEXTS[(i+1)%45];
 checkClassification(HYPER_CLASS[i],[rowEntry('«'+hypoA+'»',category),rowEntry('«'+other[1]+'»',other[0])],lev);
 checkBuild(HYPER_BUILD[i],['«'+hypoA+'» y «'+hypoB+'»','son ejemplos de','«'+category+'».'],'«'+other[0]+'».',lev);
 const [scenario,p1,p2,p3,informal]=ADEQ_CONTEXTS[i],message=[p1,p2,p3].join(' ');
 checkClassification(ADEQ_CLASS[i],[rowEntry(message,'Registro formal'),rowEntry(informal,'Registro coloquial')],lev);
 if(i<30)checkBuild(ADEQ_BUILD[i],[p1,p2,p3],informal,lev);
 else{
  const [passage,pronoun,answer,incorrect]=REFERENT_CONTEXTS[i-30];
  checkBuild(ADEQ_BUILD[i],['En «'+passage+'»','el pronombre «'+pronoun+'» retoma a','«'+answer+'».'],'«'+incorrect+'».',lev);
 }
 const [line,figure,reason]=FIGURE_CONTEXTS[i],otherFig=FIGURE_CONTEXTS[(i+9)%45];
 checkClassification(FIGURE_CLASS[i],[rowEntry(line,figure),rowEntry(otherFig[0],otherFig[1])],lev);
 const kinds=['Metáfora','Símil','Personificación','Hipérbole','Anáfora'];
 checkBuild(FIGURE_BUILD[i],['En «'+line+'»','aparece «'+figure+'»','porque '+reason+'.'],'porque corresponde a «'+kinds[(kinds.indexOf(figure)+1)%5]+'».',lev);
 const [genreLine,genre,genreReason]=GENRE_CONTEXTS[i],otherGenre=GENRE_CONTEXTS[(i+15)%45];
 checkClassification(GENRE_CLASS[i],[rowEntry(genreLine,genre),rowEntry(otherGenre[0],otherGenre[1])],lev);
 const genres=['Narrativo','Lírico','Dramático','Ensayístico'];
 checkBuild(GENRE_BUILD[i],['El microtexto','pertenece al género «'+genre+'»','porque '+genreReason+'.'],'porque pertenece al género «'+genres[(genres.indexOf(genre)+1)%4]+'».',lev);
}
// La selección tiene un segundo oráculo de fuente y mutaciones en audit-m1-quiz-oracles.
for(const q of [...M1_NEXT_QUIZ,...M1_LITERATURE_QUIZ]){
 checkMeta(q,q.level);
 if(q.options.length!==4||new Set(q.options.map(N)).size!==4||!q.options[q.answer])note(q,'opciones o clave inválidas');
 checks.push({id:q.id,control:'seleccion_formato',resultado:failures.some(x=>x.id===q.id)?'RECHAZADO':'VERIFICADO_AUTOMATICO'});
}
const byId=new Set(all.map(x=>x.id));
if(all.length!==855||byId.size!==855)failures.push({rule:'M1: se esperaban 855 IDs diferentes, vistos '+byId.size});
const counts={items:all.length,checks:checks.length,automatic_accepted:checks.filter(x=>x.resultado==='VERIFICADO_AUTOMATICO').length,
rejected_ids:new Set(failures.filter(x=>x.id).map(x=>x.id)).size,failures:failures.length};
const report={version:1,sha:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),
status:failures.length?'FAIL':'PASS',counts,limitations:{
oracles:'fragments, categorías y explicaciones contrastados contra contextos fuente del repositorio; selección contrastada en audit-m1-quiz-oracles',
conceptual_independence:'INCONCLUSO sin revisión adicional',human_review:'PENDIENTE',psychometrics:'NO_APLICABLE',
meaning:'VERIFICADO_AUTOMATICO se refiere a consistencia con fuente, no certificación semántica externa'},issues:failures,items:checks};
console.log(JSON.stringify(report,null,2));if(failures.length)process.exitCode=1;
