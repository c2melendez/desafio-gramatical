// Independent exact arithmetic for R22 inverse problems, using only visible stimulus.
export function operationInverseR22FromPrompt(prompt){
 const patterns=[
  /^Completa (\d+) × □ − \((\d+) − (\d+)\) × □ = (\d+)\. El mismo entero sustituye ambos cuadros\. ¿Cuál es\?$/,
  /^Completa (\d+) − \[(\d+) − □ × \((\d+) − (\d+)\)\] = (\d+)\. ¿Qué entero sustituye □\?$/,
  /^Completa \(√(\d+) − (\d+)\) × \(□ \+ √(\d+)\) − (\d+) = (\d+)\. ¿Qué entero sustituye □\?$/
 ];
 for(let i=0;i<patterns.length;i++){
  const match=prompt.match(patterns[i]);if(!match)continue;
  const n=match.slice(1).map(Number);
  if(!n.every(Number.isSafeInteger))throw Error("R22 unsafe operand");
  let evaluate;
  if(i===0){const [a,b,c,t]=n;evaluate=k=>a*k-(b-c)*k-t;}
  if(i===1){const [a,b,d,e,t]=n;evaluate=k=>a-(b-k*(d-e))-t;}
  if(i===2){const [a,b,d,e,t]=n;const ra=Math.sqrt(a),rd=Math.sqrt(d);if(!Number.isInteger(ra)||!Number.isInteger(rd))throw Error("R22 nonexact radical");evaluate=k=>(ra-b)*(k+rd)-e-t;}
  // Affine expression: exact slope and intercept from independent evaluations.
  const intercept=evaluate(0),slope=evaluate(1)-intercept;
  if(!Number.isSafeInteger(intercept)||!Number.isSafeInteger(slope)||slope===0)throw Error("R22 nonunique or unsafe equation");
  const key=-intercept/slope;
  if(!Number.isSafeInteger(key)||evaluate(key)!==0)throw Error("R22 no unique integer solution");
  return {n:key,d:1};
 }
 throw Error("R22 unrecognized visible stimulus");
}
