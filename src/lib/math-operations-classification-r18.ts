import type {MathModel} from "./math-m1";
/** R18: replace a numerical equivalent of the final-result assertion with a
 * distinct, meaningful decision. Preserve old truth counts, keys and stimuli. */
export function repairOperationClassificationR18(item:MathModel):MathModel{
 if(item.subtopic!=="Operaciones"||item.mode!=="clasificar"||item.oracle.kind!=="Operaciones")return item;
 const match=item.prompt.match(/\((\d+)\+(\d+)\)×(\d+)/);
 if(!match)throw Error("R18 stimulus "+item.id);
 const [a,b,c]=match.slice(1).map(Number);
 const advanced=item.level==="avanzado",middle=item.level==="intermedio";
 const correct=middle?c-1:a*c,wrong=middle?c+1:advanced?(a+b)*c:a*c+c;
 const label=middle?"El factor después del cambio es ":advanced?"El producto que se cancela tiene valor ":"Al distribuir, el producto del primer sumando por el factor es ";
 const reason=middle?`El factor original ${c} disminuye una unidad: ${c}−1=${correct}.`:advanced?`El producto repetido es ${a}×${c}=${correct}; se cancela únicamente ese producto con su opuesto.`:`Al distribuir, el primer sumando se multiplica por el factor: ${a}×${c}=${correct}.`;
 const indices=item.assertions.flatMap((x,i)=>x.text.startsWith("La expresión solicitada equivale a ")?[i]:[]);
 if(indices.length!==1||correct===wrong)throw Error("R18 scope "+item.id);
 const index=indices[0],prior=item.assertions[index],text=label+(prior.truth?correct:wrong)+".";
 const assertions=item.assertions.map((x,i)=>i===index?{text,truth:prior.truth}:x);
 return {...item,assertions,assertionExplanations:{...item.assertionExplanations,[text]:reason},modeOperation:"evaluar-tres-decisiones-operaciones-r18"};
}
