import type {MathModel} from "./math-m1";
import {buildOperationClassificationR20} from "./math-operations-classification-r20";
/** R21 candidate, disconnected from production until successor hashes and CI are reconciled.
 * All eight truth masks occur in each level of this scope. Mapping fixed by
 * salted hash ordering of frozen IDs, not visible operands or sequential index.
 * A mask is assigned only to the 59 affected R20 predecessors.
 */
const masks:Readonly<Record<string,number>>={
  "math-m1-aritmetica-operaciones-clasificar-principiante-8": 0,
  "math-m1-aritmetica-operaciones-clasificar-principiante-0": 1,
  "math-m1-aritmetica-operaciones-clasificar-principiante-3": 2,
  "math-m1-aritmetica-operaciones-clasificar-principiante-7": 3,
  "math-m1-aritmetica-operaciones-clasificar-principiante-6": 4,
  "math-m1-aritmetica-operaciones-clasificar-principiante-4": 5,
  "math-m1-aritmetica-operaciones-clasificar-principiante-1": 6,
  "math-m1-aritmetica-operaciones-clasificar-principiante-2": 7,
  "math-m3-aritmetica-operaciones-clasificar-principiante-9": 0,
  "math-m1-aritmetica-operaciones-clasificar-principiante-5": 1,
  "math-m1-aritmetica-operaciones-clasificar-principiante-9": 2,
  "math-m1-aritmetica-operaciones-clasificar-intermedio-6": 0,
  "math-m1-aritmetica-operaciones-clasificar-intermedio-14": 1,
  "math-m1-aritmetica-operaciones-clasificar-intermedio-11": 2,
  "math-m1-aritmetica-operaciones-clasificar-intermedio-13": 3,
  "math-m1-aritmetica-operaciones-clasificar-intermedio-10": 4,
  "math-m1-aritmetica-operaciones-clasificar-intermedio-9": 5,
  "math-m1-aritmetica-operaciones-clasificar-intermedio-7": 6,
  "math-m1-aritmetica-operaciones-clasificar-intermedio-8": 7,
  "math-m2-aritmetica-operaciones-clasificar-intermedio-19": 0,
  "math-m1-aritmetica-operaciones-clasificar-intermedio-1": 1,
  "math-m1-aritmetica-operaciones-clasificar-intermedio-3": 2,
  "math-m1-aritmetica-operaciones-clasificar-intermedio-2": 3,
  "math-m1-aritmetica-operaciones-clasificar-intermedio-4": 4,
  "math-m1-aritmetica-operaciones-clasificar-intermedio-12": 5,
  "math-m2-aritmetica-operaciones-clasificar-intermedio-18": 6,
  "math-m1-aritmetica-operaciones-clasificar-intermedio-0": 7,
  "math-m1-aritmetica-operaciones-clasificar-intermedio-5": 0,
  "math-m1-aritmetica-operaciones-clasificar-avanzado-18": 0,
  "math-m3-aritmetica-operaciones-clasificar-avanzado-15": 1,
  "math-m1-aritmetica-operaciones-clasificar-avanzado-12": 2,
  "math-m1-aritmetica-operaciones-clasificar-avanzado-19": 3,
  "math-m1-aritmetica-operaciones-clasificar-avanzado-14": 4,
  "math-m1-aritmetica-operaciones-clasificar-avanzado-8": 5,
  "math-m3-aritmetica-operaciones-clasificar-avanzado-21": 6,
  "math-m1-aritmetica-operaciones-clasificar-avanzado-1": 7,
  "math-m1-aritmetica-operaciones-clasificar-avanzado-6": 0,
  "math-m3-aritmetica-operaciones-clasificar-avanzado-16": 1,
  "math-m1-aritmetica-operaciones-clasificar-avanzado-16": 2,
  "math-m3-aritmetica-operaciones-clasificar-avanzado-17": 3,
  "math-m3-aritmetica-operaciones-clasificar-avanzado-20": 4,
  "math-m1-aritmetica-operaciones-clasificar-avanzado-3": 5,
  "math-m2-aritmetica-operaciones-clasificar-avanzado-24": 6,
  "math-m1-aritmetica-operaciones-clasificar-avanzado-10": 7,
  "math-m1-aritmetica-operaciones-clasificar-avanzado-15": 0,
  "math-m1-aritmetica-operaciones-clasificar-avanzado-2": 1,
  "math-m3-aritmetica-operaciones-clasificar-avanzado-14": 2,
  "math-m3-aritmetica-operaciones-clasificar-avanzado-13": 3,
  "math-m1-aritmetica-operaciones-clasificar-avanzado-17": 4,
  "math-m1-aritmetica-operaciones-clasificar-avanzado-5": 5,
  "math-m3-aritmetica-operaciones-clasificar-avanzado-12": 6,
  "math-m1-aritmetica-operaciones-clasificar-avanzado-4": 7,
  "math-m1-aritmetica-operaciones-clasificar-avanzado-9": 0,
  "math-m1-aritmetica-operaciones-clasificar-avanzado-0": 1,
  "math-m3-aritmetica-operaciones-clasificar-avanzado-18": 2,
  "math-m1-aritmetica-operaciones-clasificar-avanzado-7": 3,
  "math-m1-aritmetica-operaciones-clasificar-avanzado-13": 4,
  "math-m1-aritmetica-operaciones-clasificar-avanzado-11": 5,
  "math-m3-aritmetica-operaciones-clasificar-avanzado-19": 6
};
export function r21Mask(id:string):readonly boolean[]|undefined{
 const n=masks[id];return n===undefined?undefined:[Boolean(n&4),Boolean(n&2),Boolean(n&1)];
}
export function repairOperationClassificationR21Candidate(item:MathModel):MathModel{
 const mask=r21Mask(item.id);if(!mask)return item;
 const revised=buildOperationClassificationR20(item,mask);
 return {...revised,modeOperation:"evaluar-tres-decisiones-operaciones-r21"};
}
