import type {Level,Mode} from "./grammar";
import {MATH_LEVELS,MATH_MODES,MATH_SUBTOPICS,MATH_LEVEL_COUNT,MATH_TOPICS,mathModel,mathPool,type MathModel} from "./math-m1";

/**
 * M2 is cumulative: original M1 objects/IDs remain unchanged, and the extra
 * models carry a disjoint namespace. Formal item acceptance is audited in CI.
 * Numerical variants do not by themselves establish conceptual independence.
 */
export const MATH_M2_LEVEL_COUNT:Record<Level,number>={principiante:20,intermedio:35,avanzado:45};
export const MATH_M2_NEW_PER_LEVEL:Record<Level,number>={principiante:10,intermedio:20,avanzado:25};
const slug=(s:string)=>s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");

const stimulusSignature=(item:MathModel)=>item.prompt.normalize("NFKC").toLocaleLowerCase("es")
 .replace(/\\(ejercicio [0-9]+\\)\\.?/gi,"").replace(/\\s+/g," ").trim()+"|"+
 (item.visual?JSON.stringify(item.visual):"");

export function mathM2NewPool(topic:string,subtopic:string,level:Level,mode:Mode):MathModel[]{
 if(!MATH_TOPICS.some(t=>t.name===topic&&t.subtopics.includes(subtopic))||!MATH_LEVELS.includes(level)||!MATH_MODES.includes(mode))
  throw Error("Celda matemática M2 fuera del catálogo");
 const originalSize=MATH_LEVEL_COUNT[level],amount=MATH_M2_NEW_PER_LEVEL[level];
 const topicIndex=MATH_SUBTOPICS.indexOf(subtopic),levelIndex=MATH_LEVELS.indexOf(level),modeIndex=MATH_MODES.indexOf(mode);
 const used=new Set(mathPool(topic,subtopic,level,mode).map(stimulusSignature));
 const fresh:MathModel[]=[];
 let nextSeed=1801+(levelIndex*10009)+(modeIndex*20011)+(topicIndex*30011);
 for(let i=0;i<amount;i++){
  let item:MathModel|undefined;
  for(let attempts=0;attempts<2000;attempts++){
   const seed=nextSeed;
   nextSeed+=97;
   const candidate=mathModel(topic,subtopic,level,mode,i%originalSize,seed);
   const fingerprint=stimulusSignature(candidate);
   if(used.has(fingerprint))continue;
   used.add(fingerprint);
   item=candidate;
   break;
  }
  if(!item)throw Error("M2: variedad insuficiente en "+[topic,subtopic,mode,level].join("/"));
  const id="math-m2-"+[topic,subtopic,mode,level,i].map(x=>slug(String(x))).join("-");
  fresh.push({...item,id,family:"math-m2-"+slug(subtopic)+"-"+(item.operation??"original"),
   reviewStatus:"editorial-draft" as const});
 }
 return fresh;
}
export function mathM2Pool(topic:string,subtopic:string,level:Level,mode:Mode):MathModel[]{
 return [...mathPool(topic,subtopic,level,mode),...mathM2NewPool(topic,subtopic,level,mode)];
}
export const MATH_M2_TOTAL=MATH_SUBTOPICS.length*MATH_MODES.length*(20+35+45);
export const MATH_M2_NEW_TOTAL=MATH_SUBTOPICS.length*MATH_MODES.length*(10+20+25);
