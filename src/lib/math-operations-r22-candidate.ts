import type {MathModel} from "./math-m1";
import {repairOperationTransferR12} from "./math-operations-transfer-r12";
import {repairOperationTransferR13} from "./math-operations-contrast-r13";
import {repairOperationAdvancedR14} from "./math-operations-advanced-r14";
/** R22 candidate: four specific G/C debt IDs, no active-pool mutation.
 * Accept the respective original R11/R12/R13 predecessor, preserving IDs and learning objectives.
 */
export function repairOperationR22Candidate(x:MathModel):MathModel{
 switch(x.id){
 case "math-m2-aritmetica-operaciones-construir-principiante-3":return repairOperationTransferR12(x,{divisorSecond:10,quotient:18});
 case "math-m2-aritmetica-operaciones-quiz-principiante-9":return repairOperationTransferR13(x,{zeroAddend:17});
 case "math-m2-aritmetica-operaciones-construir-principiante-8":return repairOperationTransferR13(x,{zeroAddend:19});
 case "math-m2-aritmetica-operaciones-construir-avanzado-13":return repairOperationAdvancedR14(x,{rightAddend:6});
 default:return x;
 }
}
