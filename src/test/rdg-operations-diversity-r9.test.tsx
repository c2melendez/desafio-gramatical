import {createHash} from "node:crypto";
import {it,expect,vi,afterEach} from "vitest";
import {cleanup,fireEvent,render,screen} from "@testing-library/react";
import {mathM3R9Pool as mathM3Pool,mathM3R8Pool} from "@/lib/math-m3";
import {MATH_LEVELS,MATH_MODES,type MathModel} from "@/lib/math-m1";
import {verifyMathM3Record} from "@/lib/math-m3-guards";
import {MathExerciseCard} from "@/components/games/MathExerciseCard";
afterEach(cleanup);
const hash=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
function independent(x:MathModel){
 const n=(x.prompt.match(/\d+/g)??[]).map(Number);
 if(x.level==="principiante"){const [a,b,c,d]=n;let q=0;for(let v=a;v>0;v-=b)q++;return [Array.from({length:c},()=>q).reduce((s,v)=>s+v,0)-d,q];}
 if(x.level==="intermedio"){const [a,b,c,d]=n;return [Array.from({length:a-c},()=>b+d).reduce((s,v)=>s+v,0),a-c];}
 const [c,a,b,k,j]=n;return [Array.from({length:c},()=>a-b).reduce((s,v)=>s+v,0)-Array.from({length:k},()=>j).reduce((s,v)=>s+v,0),b];
}
it("R9 verifies 18 successors, 27 distinct prompts across games, all decisions and 432 unchanged hashes",()=>{
 const changed=[],prompts=new Set<string>();
 for(const level of MATH_LEVELS)for(const mode of MATH_MODES){
  const old=mathM3R8Pool("Aritmética","Operaciones",level,mode),now=mathM3Pool("Aritmética","Operaciones",level,mode);
  expect(now.map(x=>x.id)).toEqual(old.map(x=>x.id));
  for(const [i,x] of now.entries()){
   if(x.oracle.kind==="Operaciones-diversidad"){expect(prompts.has(x.prompt)).toBe(false);prompts.add(x.prompt);}
   if(mode==="quiz"||x.oracle.kind!=="Operaciones-diversidad"){expect(hash(x)).toBe(hash(old[i]));continue;}
   const [answer,step]=independent(x);
   expect(x.expected).toBe(String(answer));expect(x.oracle.intermediate.n).toBe(step);
   expect(x.options[x.answerIndex]).toBe(String(answer));
   expect(x.steps[0].choices[x.steps[0].answerIndex]).toBe(String(step));
   expect(verifyMathM3Record(x,level)).toEqual([]);
   for(const [j,s] of x.steps.entries())for(const v of s.choices.filter(v=>v!==s.choices[s.answerIndex]))expect(j===0?x.stepOptionExplanations?.[v]:x.optionExplanations?.[v]).toBeTruthy();
   if(mode==="clasificar")for(const a of x.assertions){
    const value=Number(a.text.match(/(-?\d+)\.$/)?.[1]);const truth=value===(a.text.startsWith("El valor correcto del paso")?step:answer);
    expect(a.truth).toBe(truth);expect(x.assertionExplanations?.[a.text]).toBeTruthy();
   }
   expect(verifyMathM3Record({...x,expected:String(answer+1)},level)).toContain("clave-distinta-oraculo");
   changed.push({id:x.id,previous_sha256:hash(old[i]),content_sha256:hash(x),stimulus:x.prompt,expected:x.expected,intermediate:step,mode,assertions:x.assertions,steps:x.steps,semantic_status:"REVIEW"});
  }
 }
 expect(changed).toHaveLength(18);expect(prompts.size).toBe(27);
 for(let i=0;i<changed.length;i+=6)console.log("RDG_R9_REVISIONS "+JSON.stringify(changed.slice(i,i+6)));
});
it.each(MATH_LEVELS)("R9 construction displays specific intermediate error: %s",level=>{
 const x=mathM3Pool("Aritmética","Operaciones",level,"construir").find(x=>x.oracle.kind==="Operaciones-diversidad")!;
 const wrong=x.steps[0].choices.find(v=>v!==x.steps[0].choices[x.steps[0].answerIndex])!;
 render(<MathExerciseCard item={x} onResult={vi.fn()} onNext={vi.fn()} isLast={false}/>);
 fireEvent.click(screen.getByRole("button",{name:wrong,exact:true}));
 fireEvent.click(screen.getByRole("button",{name:x.steps[1].choices[x.steps[1].answerIndex],exact:true}));
 expect(screen.getByTestId("learning-feedback")).toHaveTextContent(x.stepOptionExplanations![wrong]);
});
it.each(MATH_LEVELS)("R9 classification displays causes of each wrong choice: %s",level=>{
 const x=mathM3Pool("Aritmética","Operaciones",level,"clasificar").find(x=>x.oracle.kind==="Operaciones-diversidad")!;
 render(<MathExerciseCard item={x} onResult={vi.fn()} onNext={vi.fn()} isLast={false}/>);
 for(const a of x.assertions)fireEvent.click(screen.getByRole("button",{name:a.truth?"Falso":"Verdadero"}));
 for(const a of x.assertions)expect(screen.getByTestId("learning-feedback")).toHaveTextContent(x.assertionExplanations![a.text]);
});
