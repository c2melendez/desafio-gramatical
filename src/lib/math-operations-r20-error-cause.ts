import type {MathModel} from "./math-m1";
/** R20 feedback: identify the concrete error model behind a false claim from its visible operands.
 * This is a possible procedure, not an inference about the student's private reasoning.
 * Does not change any canonical exercise model or hash.
 */
export function operationR20WrongCause(item:MathModel,text:string):string|undefined{
 if(item.modeOperation!=="evaluar-tres-decisiones-operaciones-r20"||item.mode!=="clasificar")return;
 const assertion=item.assertions.find(q=>q.text===text);
 if(!assertion||assertion.truth)return;
 const m=item.prompt.match(/\((\d+)\+(\d+)\)×(\d+)/),n=text.match(/(-?\d+)\.$/);if(!m||!n)return;
 const [a,b,c]=m.slice(1).map(Number),v=Number(n[1]),s=a+b;
 type Cause=[number,string];
 let candidates:Cause[]=[];
 if(item.level==="principiante"){
  if(text.startsWith("El valor de la expresión solicitada"))candidates=[[a+b*c,"se multiplica antes de resolver el paréntesis: "+a+"+"+b+"×"+c],[a*c,"se multiplica solo el primer sumando"],[b*c,"se multiplica solo el segundo sumando"],[s+c,"se suma el factor en vez de multiplicar"]];
  else if(text.startsWith("La suma dentro"))candidates=[[a-b,"se resta el segundo sumando al primero"],[b-a,"se resta el primero al segundo"],[a*b,"se multiplican los sumandos"],[a,"se omite el segundo sumando"],[b,"se omite el primer sumando"]];
  else if(text.startsWith("Al distribuir"))candidates=[[b*c,"se calcula el producto del segundo sumando, no del primero"],[(a+1)*c,"se aumenta una unidad el primer sumando sin que el enunciado lo indique"],[a+c,"se suma el factor al primer sumando en vez de multiplicar"],[a*(c+1),"se aumenta una unidad el factor"]];
 }else if(item.level==="intermedio"){
  const u=b+2,f=c-1,t=a+u;
  if(text.startsWith("El valor de la expresión solicitada"))candidates=[[(a+b)*f,"se omite aumentar el segundo sumando"],[t*c,"se omite disminuir el factor exterior"],[a*f,"se multiplica solo el primer sumando"],[u*f,"se multiplica solo el segundo sumando modificado"],[(a+b)*c,"se mantienen los datos originales sin aplicar los cambios"]];
  else if(text.startsWith("Después de los cambios, la suma"))candidates=[[s,"se conserva el segundo sumando original"],[s-2,"se disminuye el segundo sumando en lugar de aumentarlo"],[a-u,"se resta el segundo sumando modificado"],[u,"se omite el primer sumando"],[a,"se omite el segundo sumando"]];
  else if(text.startsWith("El factor después"))candidates=[[c+1,"se aumenta el factor en vez de disminuirlo"],[c,"se omite el cambio del factor"],[c+2,"se aplica al factor el aumento destinado al sumando"],[c-2,"se disminuye el factor dos unidades en lugar de una"]];
  else if(text.startsWith("Antes de modificar"))candidates=[[(s+2)*c,"se aplica el aumento al sumando antes de calcular el valor original"],[s*(c-1),"se disminuye el factor antes de calcular el valor original"],[a*c,"se omite el segundo sumando"],[b*c,"se omite el primero"]];
  else if(text.startsWith("El segundo sumando después"))candidates=[[b,"se omite el aumento del segundo sumando"],[b-2,"se disminuye el segundo sumando en lugar de aumentarlo"],[a+2,"se aplica el aumento al primer sumando"],[u+2,"se aplica el aumento dos veces"]];
 }else{
  const total=b*c;
  if(text.startsWith("El valor de la expresión solicitada"))candidates=[[(a+b)*c,"se omite restar el producto repetido"],[-total,"se invierte el signo del término que permanece"],[0,"se cancelan los dos productos en lugar de solo el repetido"],[a*c,"se conserva el producto cancelado en vez del segundo"]];
  else if(text.startsWith("Después de distribuir y cancelar"))candidates=[[-b,"se cambia el signo del sumando que permanece"],[s,"se conservan los dos sumandos pese a la cancelación"],[0,"se cancelan ambos sumandos"],[a,"se conserva el sumando que debía cancelarse"]];
  else if(text.startsWith("Si en lugar de restar")){
   const p=text.match(/se restara (\d+)×(\d+),/);if(!p||Number(p[2])!==c)return;
   const delta=Number(p[1])-a,cf=(b-delta)*c;
   candidates=[[total,"se conserva el resultado original sin aplicar el cambio en el producto restado"],[(b+delta)*c,"se aplica la diferencia con signo contrario"],[(a+b)*c,"se omite el producto que ahora se debe restar"],[0,"se cancela toda la expresión"],[-cf,"se invierte el signo del resultado contrafactual"]];
  }
 }
 const cause=candidates.find(([value])=>value===v)?.[1];return cause?"Ese valor puede obtenerse si "+cause+".":undefined;
}
