import {distributeAnswer} from "./answer-position";
import type {Level} from "./grammar";
import type {ClassificationActivity,ConstructionActivity} from "./grammar-activities";
import {FIGURE_CONTEXTS} from "./m1-figuras-contexts";
import {GENRE_CONTEXTS} from "./m1-generos-contexts";

/** Ejercicios candidatos: 90 textos originales × 3 operaciones técnicas.
 * Las familias se conservan para NO sumar tres juegos como independencia demostrada.
 */
export type LiteratureTopic="Figuras retóricas"|"Géneros literarios";
export type LiteratureQuiz={
 id:string;subtopic:LiteratureTopic;level:Level;passage:string;question:string;
 options:[string,string,string,string];answer:0|1|2|3;explanation:string;
 reviewStatus:"editorial-draft";origin:string;sourceLocator:string;family:string;
 competence:string;cognitiveGoal:string;
};
const level=(i:number):Level=>i<10?"principiante":i<25?"intermedio":"avanzado";
const source="Guía pre-U PHUMA UNAH 2026, Competencias comunicativas — Español; estímulos propios";
const meta=(family:string,goal:string)=>({
 competence:"Competencias comunicativas — Español",cognitiveGoal:goal,
 sourceLocator:source,origin:"original-M1-20261117",reviewStatus:"editorial-draft" as const,family
});
const uniq=(values:string[])=>[...new Set(values)];
const figureKinds=["Metáfora","Símil","Personificación","Hipérbole","Anáfora"];
const genres=["Narrativo","Lírico","Dramático","Ensayístico"];
function quiz(id:string,subtopic:LiteratureTopic,lev:Level,passage:string,question:string,choices:string[],explanation:string,goal:string,family:string):LiteratureQuiz{
 const options=uniq(choices);
 if(options.length!==4)throw new Error("Opciones duplicadas para "+id);
 const ordered=distributeAnswer(id,options,0);
 return {id,subtopic,level:lev,passage,question,options:ordered.options as [string,string,string,string],answer:ordered.answer as 0|1|2|3,
 explanation,...meta(family,goal)};
}
function cls(id:string,subtopic:LiteratureTopic,lev:Level,prompt:string,labelA:string,labelB:string,textA:string,textB:string,expA:string,expB:string,goal:string,family:string):ClassificationActivity{
 if(labelA===labelB)throw new Error("Etiquetas iguales");
 return {id,subtopic,level:lev,kind:"classification",prompt,
 labels:[labelA,labelB],items:[
  {id:"f1",text:textB,label:labelB,explanation:expB},
  {id:"f0",text:textA,label:labelA,explanation:expA}],
 explanation:"La forma textual y su propósito permiten reconocer los recursos o géneros de cada microtexto.",
 ...meta(family,goal)};
}
function build(id:string,subtopic:LiteratureTopic,lev:Level,prompt:string,parts:string[],wrong:string,explanation:string,goal:string,family:string):ConstructionActivity{
 return {id,subtopic,level:lev,kind:"construction",prompt,
 tiles:[...parts.map((text,i)=>({id:"t"+i,text})),{id:"d",text:wrong}],
 solutions:[["t0","t1","t2"]],explanation,...meta(family,goal)};
}
export const FIGURE_QUIZ:LiteratureQuiz[]=FIGURE_CONTEXTS.map(([line,kind,reason],i)=>{
 const k=figureKinds.indexOf(kind);
 return quiz("m1-figure-quiz-"+level(i)+"-"+(i+1),"Figuras retóricas",level(i),line,
 "¿Cuál es la figura que predomina en el enunciado?",
 [kind,figureKinds[(k+1)%5],figureKinds[(k+2)%5],figureKinds[(k+3)%5]],
 "Se reconoce «"+kind+"» porque "+reason+".","Reconocer figuras por sus rasgos expresivos","m1-figure-"+(i+1));
});
export const FIGURE_CLASS:ClassificationActivity[]=FIGURE_CONTEXTS.map(([line,kind,reason],i)=>{
 const other=FIGURE_CONTEXTS[(i+9)%45];
 return cls("m1-figure-class-"+level(i)+"-"+(i+1),"Figuras retóricas",level(i),
 "Clasifica los recursos presentes en estas dos expresiones originales.",
 kind,other[1],line,other[0],
 "Es «"+kind+"» porque "+reason+".",
 "Es «"+other[1]+"» porque "+other[2]+".",
 "Distinguir recursos expresivos entre dos enunciados","m1-figure-"+(i+1));
});
export const FIGURE_BUILD:ConstructionActivity[]=FIGURE_CONTEXTS.map(([line,kind,reason],i)=>{
 const other=figureKinds[(figureKinds.indexOf(kind)+1)%5];
 return build("m1-figure-build-"+level(i)+"-"+(i+1),"Figuras retóricas",level(i),
 "Construye una explicación breve de la figura utilizada en «"+line+"».",
 ["En «"+line+"»","predomina el recurso","«"+kind+"»."],"«"+other+"».",
 "Es «"+kind+"» porque "+reason+". El distractor designa otra figura.",
 "Justificar un recurso literario con su ejemplo","m1-figure-"+(i+1));
});
export const GENRE_QUIZ:LiteratureQuiz[]=GENRE_CONTEXTS.map(([line,kind,reason],i)=>{
 const other=genres.filter(x=>x!==kind);
 return quiz("m1-genre-quiz-"+level(i)+"-"+(i+1),"Géneros literarios",level(i),line,
 "¿Qué género predomina según la forma de este microtexto?",
 [kind,...other],"Es un texto «"+kind.toLocaleLowerCase("es")+"» porque "+reason+".",
 "Identificar un género mediante sus rasgos","m1-genre-"+(i+1));
});
export const GENRE_CLASS:ClassificationActivity[]=GENRE_CONTEXTS.map(([line,kind,reason],i)=>{
 const other=GENRE_CONTEXTS[(i+15)%45];
 return cls("m1-genre-class-"+level(i)+"-"+(i+1),"Géneros literarios",level(i),
 "Clasifica cada microtexto según su forma predominante.",
 kind,other[1],line,other[0],
 "Es «"+kind.toLocaleLowerCase("es")+"» porque "+reason+".",
 "Es «"+other[1].toLocaleLowerCase("es")+"» porque "+other[2]+".",
 "Comparar géneros a partir de indicios formales","m1-genre-"+(i+1));
});
export const GENRE_BUILD:ConstructionActivity[]=GENRE_CONTEXTS.map(([line,kind,reason],i)=>{
 const other=genres[(genres.indexOf(kind)+1)%genres.length];
 return build("m1-genre-build-"+level(i)+"-"+(i+1),"Géneros literarios",level(i),
 "Organiza una descripción que identifique el género del siguiente microtexto: «"+line+"».",
 ["El microtexto","corresponde al género","«"+kind+"»."],"«"+other+"».",
 "La clasificación es «"+kind+"» porque "+reason+". La alternativa no describe la forma dominante.",
 "Construir una caracterización literaria justificada","m1-genre-"+(i+1));
});
export const M1_LITERATURE_QUIZ:LiteratureQuiz[]=[...FIGURE_QUIZ,...GENRE_QUIZ];
export const M1_LITERATURE_ACTIVITIES:(ClassificationActivity|ConstructionActivity)[]=[
 ...FIGURE_CLASS,...FIGURE_BUILD,...GENRE_CLASS,...GENRE_BUILD];
