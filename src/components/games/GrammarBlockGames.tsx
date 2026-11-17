import {useMemo,useState} from "react";
import {shuffle} from "@/lib/grammar";
import {gradeGrammarClassification,gradeGrammarConstruction,type GrammarClassification,type GrammarConstruction} from "@/lib/grammar-new-games";
import {NextButton} from "./Feedback";

type Props<T>={item:T;report:(correct:boolean)=>void;next:()=>void;isLast:boolean};
export function GrammarClassificationGame({item,report,next,isLast}:Props<GrammarClassification>){
 const [answers,setAnswers]=useState<(number|undefined)[]>([undefined,undefined,undefined]);
 const [checked,setChecked]=useState(false);
 const complete=answers.every(x=>x!==undefined);
 const ok=checked&&gradeGrammarClassification(item,answers as number[]);
 return <section className="space-y-4"><p className="card-ink p-4">{item.context}</p><h2 className="font-bold">{item.prompt}</h2>
  {item.items.map((entry,i)=><div key={i} className="card-ink p-4 space-y-2"><p>{entry.text}</p><div role="group" aria-label={`Clasificación ${i+1}`} className="flex flex-wrap gap-2">{item.labels.map((label,j)=><button key={label} type="button" disabled={checked} aria-pressed={answers[i]===j} className={`tile ${answers[i]===j?"bg-primary text-primary-foreground":"bg-card"}`} onClick={()=>setAnswers(old=>old.map((x,k)=>k===i?j:x))}>{label}</button>)}</div>{checked&&<p>{answers[i]===entry.answer?"✓":"✗"} {item.labels[entry.answer]}</p>}</div>)}
  {!checked?<button type="button" disabled={!complete} className="tile bg-primary text-primary-foreground disabled:opacity-40" onClick={()=>{if(!complete)return;setChecked(true);report(gradeGrammarClassification(item,answers as number[]));}}>Comprobar</button>:<div aria-live="polite"><p>{ok?"Correcto. ":"Revisa las clasificaciones. "}{item.explanation}</p><NextButton onClick={next} isLast={isLast}/></div>}
 </section>;
}
export function GrammarConstructionGame({item,report,next,isLast}:Props<GrammarConstruction>){
 const [selected,setSelected]=useState<number[]>([]);const [checked,setChecked]=useState(false);
 const bank=useMemo(()=>shuffle([0,1,2]),[item.id]);
 const ok=checked&&gradeGrammarConstruction(item,selected);
 return <section className="space-y-4"><p className="card-ink p-4">{item.context}</p><h2 className="font-bold">{item.prompt}</h2>
  <div className="card-ink p-4 space-y-2" aria-label="Orden seleccionado">{selected.map((i,n)=><button type="button" className="tile block" key={i} disabled={checked} onClick={()=>setSelected(xs=>xs.filter(x=>x!==i))}>{n+1}. {item.pieces[i]} ×</button>)}</div>
  <div className="grid gap-2">{bank.map(i=><button type="button" key={i} className="tile bg-card" disabled={checked||selected.includes(i)} onClick={()=>setSelected(xs=>[...xs,i])}>{item.pieces[i]}</button>)}</div>
  {!checked?<button type="button" disabled={selected.length!==item.pieces.length} className="tile bg-primary text-primary-foreground disabled:opacity-40" onClick={()=>{if(selected.length!==item.pieces.length)return;setChecked(true);report(gradeGrammarConstruction(item,selected));}}>Comprobar</button>:<div aria-live="polite"><p>{ok?"Correcto. ":"Revisa el orden. "}{item.explanation}</p>{!ok&&<p>Orden: {item.pieces.join(" → ")}</p>}<NextButton onClick={next} isLast={isLast}/></div>}
 </section>;
}
