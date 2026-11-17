import type {Level} from "./grammar";
import type {GrammarDraft} from "./grammar-next-draft";

type Base={id:string;subtopic:GrammarDraft["subtopic"];level:Level;reviewStatus:"editorial-draft";context:string;explanation:string};
export type GrammarClassification=Base & {kind:"clasificar";prompt:string;labels:[string,string,string];items:[{text:string;answer:number},{text:string;answer:number},{text:string;answer:number}]};
export type GrammarConstruction=Base & {kind:"construir";prompt:string;pieces:[string,string,string]};
export type NewGrammarGame=GrammarClassification|GrammarConstruction;

/** Comprueba las tres clasificaciones, sin depender del orden visual de las etiquetas. */
export function gradeGrammarClassification(item:GrammarClassification,answers:readonly number[]):boolean{
 return answers.length===item.items.length && item.items.every((x,i)=>answers[i]===x.answer);
}
/** Las piezas se guardan en su orden lógico; la vista debe barajarlas antes de mostrarlas. */
export function gradeGrammarConstruction(item:GrammarConstruction,indices:readonly number[]):boolean{
 return indices.length===item.pieces.length && indices.every((x,i)=>x===i);
}
