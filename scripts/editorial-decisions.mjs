/** Decisiones editoriales expresas para distinguir distractores ortográficos legítimos
 * de opciones que admiten dos respuestas. Las decisiones se fundamentan en
 * seis casos base, se extienden a sus permutaciones M2/M3 y no certifican el
 * contenido restante ni reemplazan una revisión docente.
 */
const norm=s=>String(s??'').normalize('NFKC').toLocaleLowerCase('es').trim();
const key=arr=>[...arr].map(norm).sort().join('\u241f');
const approved=[
 {options:['ensima','enzima','encima','en cima'],rule:'ortografía de encima',
  rationale:'En «está encima de la mesa», «encima» es un adverbio locativo con c y escrito junto; «enzima» nombra una proteína, «en cima» no corresponde a este uso y «ensima» es incorrecto.'},
 {options:['Porqué','Porque','Por que','Por qué'],rule:'por qué en pregunta directa o indirecta',
  rationale:'«Por qué» es interrogativo (directo o indirecto); «porque» introduce una causa, «porqué» es sustantivo y «por que» corresponde a otras construcciones. El contexto de la oración determina la clave.'},
 {options:['Aunque se registraron nuevos datos. Estos','Aunque se registraron nuevos datos estos','Aunque se registraron nuevos datos; estos,','Aunque se registraron nuevos datos, estos'],rule:'puntuación de subordinada concesiva',
  rationale:'En el texto de esta pregunta, «Aunque se registraron nuevos datos» es una subordinada concesiva antepuesta; una coma la separa de «estos requieren...». Los otros signos separan o unen indebidamente las cláusulas.'},
 {options:['el por qué','el porqué','el porque','el por que'],rule:'porqué como sustantivo',
  rationale:'Tras el artículo «el», «porqué» funciona como sustantivo equivalente a «motivo» y lleva tilde; las variantes separadas o sin tilde cambian de función.'},
 {options:['en sima','encíma','encima','ensima'],rule:'acentuación y escritura de encima',
  rationale:'En «dejó el libro encima de la mesa» se usa el adverbio «encima» sin tilde, escrito junto y con c. Las otras grafías no son correctas en ese contexto.'}
];
const lookup=new Map(approved.map(v=>[key(v.options),v]));
export function reviewedOrthographicOptions(row,item){
 if(row.area!=='espanol'||row.subtopic!=='Corrección'||row.topic!=='Redacción')return null;
 if(!['clasificar','quiz'].includes(row.mode)||!Array.isArray(item.options)||item.options.length!==4)return null;
 const found=lookup.get(key(item.options));
 if(!found)return null;
 const answer=item.correctConnector??item.connector;
 if(!item.options.includes(answer))return null;
 const explanation=String(item.explanation??item.correction??'');
 if(explanation.length<35)return null;
 return {rule:found.rule,justification:found.rationale,answer};
}
