import type {MathModel} from "./math-m1";

/**
 * R19 candidate: three factor-one collisions + all 31 advanced R18 items.
 * Retain the original stimulus/key/ID and truth count. The advanced auxiliary
 * decision transfers cancellation to a modified expression instead of
 * computing the product already cancelled in the original expression.
 * Not connected to the live pool until successor hashes are reconciled.
 */
export function repairOperationClassificationR19(item:MathModel):MathModel {
 if(item.subtopic!=="Operaciones"||item.mode!=="clasificar"||item.modeOperation!=="evaluar-tres-decisiones-operaciones-r18")return item;
 const m=item.prompt.match(/\((\d+)\+(\d+)\)×(\d+)/);
 if(!m)throw Error("R19 stimulus "+item.id);
 const [a,b,c]=m.slice(1).map(Number);
 let index:number,correct:number,wrong:number,label:string,rule:string;
 if(item.level==="intermedio"&&c===2){
  index=item.assertions.findIndex(x=>x.text.startsWith("Después de los cambios, la suma dentro del paréntesis es "));
  correct=(a+b)*c;wrong=(a+b+2)*c;
  label="Antes de modificar los datos, el valor de la expresión original es ";
  rule="El valor original conserva los dos sumandos y el factor sin cambios: ("+a+"+"+b+")×"+c+"="+correct+".";
 }else if(item.level==="avanzado"){
  index=item.assertions.findIndex(x=>x.text.startsWith("El producto que se cancela tiene valor "));
  const original=b*c;
  // Counterfactual: vary the term subtracted, not the original expression.
  // The additional/removed unit of the coefficient changes the result by c.
  const preferred=item.seed%2===0?1:-1;
  const delta=[preferred,-preferred].find(d=>a+d>=0&&b-d!==b&& ![b,original].includes((b-d)*c));
  if(delta===undefined)throw Error("R19 counterfactual collision "+item.id);
  correct=(b-delta)*c;wrong=(b+delta)*c;
  label="Si en lugar de restar "+a+"×"+c+" se restara "+(a+delta)+"×"+c+", el resultado sería ";
  rule="Al distribuir, el primer producto se cancela con "+a+"×"+c+". Cambiar el coeficiente restado de "+a+" a "+(a+delta)+" "+(delta>0?"reduce":"aumenta")+" el resultado en "+c+": ("+b+(delta>0?"−":"+")+"1)×"+c+"="+correct+".";
 }else return item;
 if(index<0||correct===wrong)throw Error("R19 scope "+item.id);
 const old=item.assertions[index],value=old.truth?correct:wrong;
 const text=label+value+".";
 const assertionExplanations={...item.assertionExplanations};
 delete assertionExplanations[old.text];
 assertionExplanations[text]=rule+" El valor afirmado es "+value+"; "+(old.truth?"coincide":"no coincide")+" con el correcto.";
 return {...item,assertions:item.assertions.map((x,i)=>i===index?{text,truth:old.truth}:x),assertionExplanations,modeOperation:"evaluar-tres-decisiones-operaciones-r19"};
}
