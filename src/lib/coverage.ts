import {AREAS,type AreaId,type GameId} from "./phuma-catalog";
import {SENTENCES,QUIZ,BUILD,type Level} from "./grammar";
import {EXTRA_SENTENCES} from "./extra-sentences";
import {EXTRA_QUIZ} from "./extra-quiz";
import {GRAMMAR_ADVANCED_SENTENCES,GRAMMAR_NUCLEUS_BUILD} from "./grammar-nucleus";
import {EXTRA_BUILD} from "./extra-build";
import {readingPool} from "./reading";
import {SYNONYM_CLASSIFICATION} from "./grammar-classify-synonyms";
import {grammarPilotPool} from "./grammar-next-draft";
import {writingPool} from "./writing";

export const CONTENT_TARGET:Record<Level,number>={principiante:30,intermedio:50,avanzado:70};
export const CONTENT_STAGE_ONE:Record<Level,number>={principiante:10,intermedio:15,avanzado:20};
export type ContentCoverage={
 area:AreaId;topic:string;subtopic:string;mode:GameId;level:Level;
 available:number;target:number;stageOne:number;stageOneComplete:boolean;complete:boolean;
 /** Los juegos de Redacción comparten 3 escenarios antiguos por nivel. */
 source:"legacy"|"original-context"|"not-developed";
};
export function countContent(area:AreaId,topic:string,subtopic:string,mode:GameId,level:Level):number{
 if(area!=="espanol")return 0;
 if(topic==="Gramática y semántica"&&subtopic==="Categorías gramaticales")
  return mode==="clasificar"?SENTENCES[level].length+EXTRA_SENTENCES[level].length+(level==="avanzado"?GRAMMAR_ADVANCED_SENTENCES.length:0):mode==="quiz"?QUIZ[level].length+EXTRA_QUIZ[level].length:BUILD[level].length+EXTRA_BUILD[level].length+GRAMMAR_NUCLEUS_BUILD[level].length;
 if(topic==="Gramática y semántica"&&subtopic==="Sinónimos y antónimos"&&mode==="clasificar")return SYNONYM_CLASSIFICATION.filter(q=>q.level===level).length;
 if(topic==="Gramática y semántica"&&mode==="quiz")return grammarPilotPool(subtopic,level).length;
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
