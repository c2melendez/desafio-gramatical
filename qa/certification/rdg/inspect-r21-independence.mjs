// Diagnostic only: reconstruct R21 judgments from the visible expressions.
export function inspectR21(prompt, level, assertions){
 const m=prompt.match(/\((\d+)\+(\d+)\)×(\d+)/);
 if(!m)throw Error("unrecognized stimulus");
 const [a,b,c]=m.slice(1).map(Number);
 if(c<2||!Number.isSafeInteger(a+b+c))throw Error("domain");
 const value=level==="principiante"?(a+b)*c:level==="intermedio"?(a+b+2)*(c-1):(a+b)*c-a*c;
 const decisions=assertions.map(q=>{
  const t=q.text;
  const tail=t.match(/(-?\d+)\.$/);
  if(!tail)throw Error("missing asserted value");
  const given=+tail[1];let kind,expected,variant;
  if(t.startsWith("El valor de la expresión solicitada")){kind="answer";expected=value;variant="answer";}
  else if(t.startsWith("La suma dentro")){kind="step";expected=a+b;variant="sum";}
  else if(t.startsWith("Al distribuir, el producto")){kind="auxiliary";expected=a*c;variant="first-product";}
  else if(t.startsWith("Después de los cambios")){kind="step";expected=a+b+2;variant="modified-sum";}
  else if(t.startsWith("Antes de modificar")){kind="step";expected=(a+b)*c;variant="original";}
  else if(t.startsWith("El segundo sumando después")){kind="step";expected=b+2;variant="second-addend";}
  else if(t.startsWith("El factor después")){kind="auxiliary";expected=c-1;variant="factor";}
  else if(t.startsWith("Después de distribuir")){kind="step";expected=b;variant="remaining-addend";}
  else if(t.startsWith("Si en lugar de restar ")){
   const p=t.match(/^Si en lugar de restar (\d+)×(\d+) se restara (\d+)×(\d+), el resultado sería (-?\d+)\.$/);
   if(!p||+p[1]!==a||+p[2]!==c||+p[4]!==c||+p[3]===a)throw Error("invalid transfer");
   kind="auxiliary";expected=(a+b)*c-(+p[3])*c;variant="counterfactual";return {kind,given,expected,truth:given===expected,variant,delta:(a-+p[3])*c};
  }else throw Error("unrecognized assertion");
  return {kind,given,expected,truth:given===expected,variant};
 });
 if(decisions.length!==3||new Set(decisions.map(d=>d.kind)).size!==3)throw Error("invalid decision coverage");
 const d=Object.fromEntries(decisions.map(d=>[d.kind,d])),s=d.step.given,u=d.auxiliary.given,v=d.answer.given,links=[];
 if(level==="principiante"){
  if(s*c===v)links.push("STEP_ANSWER");
  if(u+b*c===v)links.push("AUX_ANSWER");
  if((s-b)*c===u)links.push("STEP_AUX");
 }else if(level==="intermedio"){
  // For an original-product assertion, avoid division and compare integers exactly.
  if(d.step.variant==="original"?(s+2*c)*(c-1)===v*c:(d.step.variant==="second-addend"?a+s:s)*(c-1)===v)links.push("STEP_ANSWER");
  if((a+b+2)*u===v)links.push("AUX_ANSWER");
 }else{
  if(s*c===v)links.push("STEP_ANSWER");
  if(v+d.auxiliary.delta===u)links.push("AUX_ANSWER");
  if(s*c+d.auxiliary.delta===u)links.push("STEP_AUX");
 }
 // A signal identifies an algebraic relation, not an automatic claim that
 // two distinct operations are identical. Retain REVIEW for individual judgment.
 return {operands:[a,b,c],value,decisions,links};
}
