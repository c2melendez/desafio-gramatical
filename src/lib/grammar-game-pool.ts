import type {Level} from "./grammar";
import {GRAMMAR_CLASSIFICATION_DRAFT,GRAMMAR_CONSTRUCTION_DRAFT} from "./grammar-games-draft";
export function grammarClassificationPool(subtopic:string,level:Level){return GRAMMAR_CLASSIFICATION_DRAFT.filter(x=>x.subtopic===subtopic&&x.level===level);}
export function grammarConstructionPool(subtopic:string,level:Level){return GRAMMAR_CONSTRUCTION_DRAFT.filter(x=>x.subtopic===subtopic&&x.level===level);}
