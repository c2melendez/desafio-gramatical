import type {MathModel} from "./math-m1";
/** Keep the correct step and truth mask; distinguish a wrong division operation from the wrong root sign. */
export function repairOperationRootR28Candidate(x:MathModel):MathModel{
 if(x.id!=="math-m2-aritmetica-operaciones-clasificar-intermedio-17")return x;
 if(x.level!=="intermedio"||x.mode!=="clasificar"||x.operation!=="cociente-de-diferencia-racional-con-raiz"||x.modeOperation!=="contrastar-tres-decisiones-distintas-r23")throw Error("R28 root scope");
 const old="El resultado solicitado es -1/5.",replacement="El resultado solicitado es 15/11.";
 if(x.expected!=="3/55"||x.steps[0].choices[x.steps[0].answerIndex]!=="3/11"||!x.assertions.some(a=>a.text===old&&!a.truth)||!x.options.includes("15/11")||!x.optionExplanations?.["15/11"])throw Error("R28 root predecessor");
 const reasons={...x.assertionExplanations};delete reasons[old];
 reasons[replacement]="Se multiplicó por el divisor en lugar de dividir. El paréntesis vale 3/11; multiplicar por 5 da 15/11, pero dividir por 5 equivale a multiplicar por 1/5: 3/55.";
 return {...x,assertions:x.assertions.map(a=>a.text===old?{...a,text:replacement}:a),assertionExplanations:reasons};
}
