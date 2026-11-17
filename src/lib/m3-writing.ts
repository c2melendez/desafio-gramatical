import type {Level,Mode} from './grammar';
import type {WritingItem,WritingSubtopic} from './writing';
const count:Record<Level,number>={principiante:10,intermedio:15,avanzado:25};
const slug=(s:string)=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-');
export function m3WritingPool(level:Level,subtopic:WritingSubtopic,mode:Mode,existing:WritingItem[]):WritingItem[]{
 const source=existing.filter(x=>x.id.startsWith('m2-writing-'));
 if(source.length<3)throw Error('M3 redacción requiere tres ejercicios fuente');
 return Array.from({length:count[level]},(_,i)=>{
  const j=i+17*['principiante','intermedio','avanzado'].indexOf(level);
  const ai=j%source.length,bi=(ai+1+Math.floor(j/source.length))%source.length;
  let ci=(bi+1)%source.length;if(ci===ai)ci=(ci+1)%source.length;
  const [a,b,c]=[source[ai],source[bi],source[ci]];
  const id='m3-writing-'+slug(subtopic)+'-'+mode+'-'+level+'-'+(i+1);
  const meta={id,sourceIds:[a.id,b.id,c.id],origin:'integracion-triple-M3-20261117',family:id,
   reviewStatus:'editorial-draft' as const,sourceLocator:'Guía pre-U UNAH 2026: redacción; casos originales M2',
   competence:'Competencias comunicativas — Redacción',cognitiveGoal:'Distinguir tres casos y resolver una tarea contextual'};
  if(mode==='quiz'&&'gap' in a&&'gap' in b&&'gap' in c){
   return {...a,...meta,gap:'CASO B RESUELTO: '+b.gap.replace('___',b.connector)+'\nCASO C RESUELTO: '+c.gap.replace('___',c.connector)+'\nCASO A POR RESOLVER: '+a.gap,
    explanation:'Los casos B y C ofrecen relaciones de contraste; en A: '+a.explanation} as WritingItem;
  }
  if(mode==='clasificar'&&'flawed' in a&&'flawed' in b&&'flawed' in c){
   return {...a,...meta,
    flawed:'CASO B CORREGIDO: '+b.correctSentence+'\nCASO C CORREGIDO: '+c.correctSentence+'\nCASO A POR CORREGIR: '+a.flawed,
    explanation:'B y C se contrastan, pero la corrección A debe justificarse por su propia evidencia. '+a.explanation} as WritingItem;
  }
  if(mode==='construir'&&'steps' in a&&'steps' in b&&'steps' in c){
   // Distintos énfasis de análisis para casos con indicios parcialmente similares.
   // No representan una certificación de independencia pedagógica.
   const focus=[
    'localizar las premisas de cada caso',
    'comprobar la secuencia temporal de los tres casos',
    'contrastar las relaciones expresadas por conectores',
    'separar observaciones e interpretaciones',
    'evitar generalizaciones más allá de las evidencias',
    'justificar las correcciones de cada fuente',
    'reconocer los límites de las conclusiones'
   ][i%7];
   return {...a,...meta,steps:[
     'Primero, '+focus+' en A: '+a.steps[0],
     'Después, '+focus+' en B, sin trasladar supuestos: '+b.steps[1],
     'Por último, '+focus+' en C, delimitando la conclusión: '+c.steps[2]
    ],hint:'Analiza A, contrasta B, delimita C. Énfasis: '+focus+'.',
    explanation:'Razonamiento escalonado en tres fuentes. '+a.explanation} as WritingItem;
  }
  throw Error('M3: modalidad incompatible '+mode+' '+id);
 });
}
