// Contratos independientes: los controles estructurales no prueban validez lingüística.
const norm=x=>String(x??'').normalize('NFKC').toLocaleLowerCase('es').replace(/\s+/g,' ').trim();
const result=(status,details=[])=>({status,details});
const distinct=xs=>new Set(xs.map(norm)).size===xs.length;

export function verificarEstructura(item, idCounts){
 const errors=[];
 if(!item||typeof item!=='object')return result('RECHAZADO',['Registro ausente']);
 if(!norm(item.id))errors.push('ID ausente');
 else if((idCounts.get(item.id)??0)!==1)errors.push('ID duplicado o no indexado');
 if(!['principiante','intermedio','avanzado'].includes(item.level))errors.push('Nivel inválido');
 if(!norm(item.subtopic)||!norm(item.explanation))errors.push('Subtema o explicación ausente');
 if(item.kind==='quiz'){
  if(!norm(item.passage)||!norm(item.question))errors.push('Estímulo o pregunta ausente');
  if(!Array.isArray(item.options)||item.options.length!==4||item.options.some(x=>!norm(x))||!distinct(item.options))errors.push('Opciones inválidas');
  if(!Number.isInteger(item.answer)||item.answer<0||item.answer>3)errors.push('Clave fuera de rango');
 }else if(item.kind==='classification'){
  if(!norm(item.prompt)||!Array.isArray(item.labels)||item.labels.length<2||item.labels.some(x=>!norm(x))||!distinct(item.labels))errors.push('Enunciado o categorías inválidas');
  if(!Array.isArray(item.items)||!item.items.length)errors.push('Elementos ausentes');
  else if(item.items.some(x=>!norm(x.id)||!norm(x.text)||!norm(x.explanation)||!item.labels?.includes(x.label))||!distinct(item.items.map(x=>x.id)))errors.push('Elementos o asignaciones inválidas');
 }else errors.push('Modalidad no soportada');
 return errors.length?result('RECHAZADO',errors):result('VERIFICADO');
}

// El oráculo debe provenir de una revisión o resolución independiente; jamás de la propia clave.
export function verificarRespuesta(item,oracle){
 if(!oracle)return result('INCONCLUSO',['Falta oráculo independiente']);
 if(item.kind==='quiz'){
  if(!Array.isArray(oracle.correctIndices)||!oracle.correctIndices.every(Number.isInteger))return result('INCONCLUSO',['Oráculo de selección inválido']);
  if(oracle.correctIndices.length!==1)return result('RECHAZADO',['No hay una única respuesta correcta']);
  return oracle.correctIndices[0]===item.answer?result('VERIFICADO'):result('RECHAZADO',['Clave contradice oráculo']);
 }
 if(item.kind==='classification'){
  if(!oracle.labels||!item.items?.every(x=>Object.hasOwn(oracle.labels,x.id)))return result('INCONCLUSO',['Oráculo de clasificación incompleto']);
  return item.items.every(x=>oracle.labels[x.id]===x.label)?result('VERIFICADO'):result('RECHAZADO',['Asignación contradice oráculo']);
 }
 return result('INCONCLUSO',['Modalidad sin oráculo implementado']);
}

export function verificarIntegracion(item,observed){
 if(!observed)return result('INCONCLUSO',['Sin observación de ruta y juego']);
 if(observed.routePresent===false||observed.poolPresent===false)return result('RECHAZADO',['Ruta o carga ausente']);
 if(observed.routePresent!==true||observed.poolPresent!==true||!observed.level||!observed.subtopic||!observed.kind)return result('INCONCLUSO',['Observación incompleta']);
 return observed.level===item.level&&observed.subtopic===item.subtopic&&observed.kind===item.kind?result('VERIFICADO'):result('RECHAZADO',['Subtema, modalidad o nivel incorrecto']);
}

export function aggregate(...checks){
 if(checks.some(x=>x.status==='RECHAZADO'))return 'RECHAZADO';
 if(checks.length===0||checks.some(x=>x.status!=='VERIFICADO'))return 'INCONCLUSO';
 return 'VERIFICADO';
}
