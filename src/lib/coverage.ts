import {M2_CATEGORY_SENTENCES,M2_CATEGORY_QUIZ,M2_CATEGORY_BUILD,M2_GRAMMAR_ACTIVITIES} from "./m2-grammar";
import {M3_CATEGORY_SENTENCES,M3_CATEGORY_QUIZ,M3_CATEGORY_BUILD,M3_GRAMMAR_ACTIVITIES} from "./m3-grammar";
import {AREAS,type AreaId,type GameId} from "./phuma-catalog";
import {SENTENCES,QUIZ,BUILD,type Level} from "./grammar";
import {EXTRA_SENTENCES} from "./extra-sentences";
import {EXTRA_QUIZ} from "./extra-quiz";
import {GRAMMAR_ADVANCED_SENTENCES,GRAMMAR_NUCLEUS_BUILD} from "./grammar-nucleus";
import {EXTRA_BUILD} from "./extra-build";
import {readingPool} from "./reading";
import {COHESION_CLASSIFICATION} from "./grammar-classify-cohesion";
import {SYNONYM_CLASSIFICATION} from "./grammar-classify-synonyms";
import {grammarPilotPool} from "./grammar-next-draft";
import {GRAMMAR_M1_ACTIVITIES} from "./grammar-m1-activities";
import {M1_NEXT_ACTIVITIES} from "./grammar-m1-next-activities";
import {M1_LITERATURE_ACTIVITIES} from "./grammar-m1-literature";
import {writingPool} from "./writing";
import {MATH_LEVEL_COUNT,MATH_TOPICS,MATH_MODES} from "./math-m1";

export const CONTENT_TARGET:Record<Level,number>={principiante:30,intermedio:50,avanzado:70};
export const CONTENT_STAGE_ONE:Record<Level,number>={principiante:10,intermedio:15,avanzado:20};
export type ContentCoverage={
 area:AreaId;topic:string;subtopic:string;mode:GameId;level:Level;
 available:number;target:number;stageOne:number;stageOneComplete:boolean;complete:boolean;
 /** Los juegos de Redacción comparten 3 escenarios antiguos por nivel. */
 source:"legacy"|"original-context"|"not-developed";
};
export function countContent(area:AreaId,topic:string,subtopic:string,mode:GameId,level:Level):number{
 if(area==="matematicas")return MATH_TOPICS.some(t=>t.name===topic&&t.subtopics.includes(subtopic))&&MATH_MODES.includes(mode)?(MATH_LEVEL_COUNT[level]??0):0;
 if(area!=="espanol")return 0;
 if(topic==="Gramática y semántica"&&subtopic==="Categorías gramaticales")
  return mode==="clasificar"?SENTENCES[level].length+EXTRA_SENTENCES[level].length+(level==="avanzado"?GRAMMAR_ADVANCED_SENTENCES.length:0)+M2_CATEGORY_SENTENCES[level].length+M3_CATEGORY_SENTENCES[level].length:mode==="quiz"?QUIZ[level].length+EXTRA_QUIZ[level].length+M2_CATEGORY_QUIZ[level].length+M3_CATEGORY_QUIZ[level].length:BUILD[level].length+EXTRA_BUILD[level].length+GRAMMAR_NUCLEUS_BUILD[level].length+M2_CATEGORY_BUILD[level].length+M3_CATEGORY_BUILD[level].length;
 if(topic==="Gramática y semántica"&&subtopic==="Sinónimos y antónimos"&&mode==="clasificar")return SYNONYM_CLASSIFICATION.filter(q=>q.level===level).length+[...M2_GRAMMAR_ACTIVITIES,...M3_GRAMMAR_ACTIVITIES].filter(q=>q.subtopic===subtopic&&q.level===level&&q.kind==="classification").length;
 if(topic==="Gramática y semántica"&&subtopic==="Cohesión y coherencia"&&mode==="clasificar")return COHESION_CLASSIFICATION.filter(q=>q.level===level).length+[...M2_GRAMMAR_ACTIVITIES,...M3_GRAMMAR_ACTIVITIES].filter(q=>q.subtopic===subtopic&&q.level===level&&q.kind==="classification").length;
 if(topic==="Gramática y semántica"&&mode==="quiz")return grammarPilotPool(subtopic,level).length;
 if(topic==="Gramática y semántica"&&(mode==="construir"||mode==="clasificar"))
  return [...GRAMMAR_M1_ACTIVITIES,...M1_NEXT_ACTIVITIES,...M2_GRAMMAR_ACTIVITIES,...M3_GRAMMAR_ACTIVITIES].filter(x=>x.subtopic===subtopic&&x.level===level&&x.kind===(mode==="construir"?"construction":"classification")).length;
 if(topic==="Literatura")return mode==="quiz"?grammarPilotPool(subtopic,level).length:[...M1_LITERATURE_ACTIVITIES,...M2_GRAMMAR_ACTIVITIES,...M3_GRAMMAR_ACTIVITIES].filter(x=>x.subtopic===subtopic&&x.level===level&&x.kind===(mode==="construir"?"construction":"classification")).length;
 if(topic==="Comprensión lectora")return readingPool(level,subtopic as Parameters<typeof readingPool>[1],mode).length;
 if(topic==="Redacción")return writingPool(level,subtopic as Parameters<typeof writingPool>[1],mode).length;
 return 0;
}
export function coverageRows():ContentCoverage[]{
 const rows:ContentCoverage[]=[];
 for(const area of AREAS)for(const topic of area.topics)for(const subtopic of topic.subtopics)
  for(const mode of ["clasificar","quiz","construir"] as GameId[])
   for(const level of ["principiante","intermedio","avanzado"] as Level[]){
    const available=countContent(area.id,topic.name,subtopic,mode,level);
    rows.push({area:area.id,topic:topic.name,subtopic,mode,level,
      available,target:CONTENT_TARGET[level],stageOne:CONTENT_STAGE_ONE[level],
      stageOneComplete:available>=CONTENT_STAGE_ONE[level],complete:available>=CONTENT_TARGET[level],
      source:available===0?"not-developed":topic.name==="Gramática y semántica"&&subtopic!=="Categorías gramaticales"?"original-context":topic.name==="Redacción"&&subtopic==="Conectores"&&mode==="quiz"?"original-context":"legacy"});
   }
 return rows;
}
export function coverageTotals(){
 const rows=coverageRows();
 const available=rows.reduce((s,x)=>s+x.available,0);
 const goal=rows.reduce((s,x)=>s+x.target,0);
 return {slots:rows.length,available,target:goal,stageOneComplete:rows.filter(x=>x.stageOneComplete).length,complete:rows.filter(x=>x.complete).length};
}
