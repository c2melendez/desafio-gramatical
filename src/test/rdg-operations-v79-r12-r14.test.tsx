import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import {expect,it,vi,afterEach} from "vitest";
import {cleanup,fireEvent,render,screen} from "@testing-library/react";
import {mathM3Pool} from "@/lib/math-m3";
import {MATH_LEVELS,MATH_MODES,type MathModel} from "@/lib/math-m1";
import {MathExerciseCard} from "@/components/games/MathExerciseCard";
import {OPERATIONS_ROUTE} from "@/lib/rdg/operations";
afterEach(cleanup);
const hash=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
const evidence=JSON.parse(readFileSync("qa/certification/rdg/evidence/MAT-ARIT-01-v79-R12-R14-current-review.json","utf8"));
const bank=MATH_LEVELS.flatMap(l=>MATH_MODES.flatMap(m=>mathM3Pool("Aritmética","Operaciones",l,m)));
const rdg=[...OPERATIONS_ROUTE.lessons,...OPERATIONS_ROUTE.transfer];
const norm=(s:string)=>s.normalize("NFKC").toLowerCase().replace(/[−–]/g,"-").replace(/\s+/g,"");
function expr(s:string){const m=s.normalize("NFKC").replace(/[−–]/g,"-").match(/(?:Calcula|Simplifica|Completa la igualdad)\s+([^.?]+)/i);if(!m)return null;return m[1].split(/\. |Expresa|Simplifica|Opciones/)[0].replace(/\s+/g,"").replace(/\*/g,"×");}
it("R12–R14: 92 exact runtime hashes, verified options, original prompt screen and family-specific evidence",()=>{
 expect(bank).toHaveLength(450);expect(evidence.records).toHaveLength(92);const seen=new Set<string>();
 for(const f of evidence.records){const x=bank.find(y=>y.id===f.id)!;expect(hash(x)).toBe(f.content_hash);expect(x.prompt).toBe(f.stimulus);expect(x.expected).toBe(f.respuesta_esperada);expect(x.operation).toBe(f.family_id);expect(seen.has(x.id)).toBe(false);seen.add(x.id);
 const o=f.oraculo_independiente;expect(x.options[x.answerIndex]).toBe(o.key);expect(x.steps[0].choices[x.steps[0].answerIndex]).toBe(o.step);
 expect(x.options.filter((_,i)=>i!==x.answerIndex).sort()).toEqual(o.wrong);expect(x.steps[0].choices.filter((_,i)=>i!==x.steps[0].answerIndex).sort()).toEqual(o.mid);
 for(const d of f.distractores)expect(x.optionExplanations?.[d.value]).toBe(d.reason);
 for(const d of f.construction[0].alternatives)expect(x.stepOptionExplanations?.[d.value]).toBe(d.reason);
 const signal=(prompt:string)=>norm(prompt)===norm(x.prompt)||(expr(x.prompt)!==null&&expr(prompt)===expr(x.prompt));
 const matches=bank.filter(y=>y.id!==x.id&&signal(y.prompt)).map(y=>y.id);const rdgMatches=rdg.filter(y=>signal(y.prompt)).map(y=>y.id);
 console.log("RDG_R12_R14_RUNTIME "+JSON.stringify({id:x.id,hash:hash(x),mode:x.mode,level:x.level,family:x.operation,matches,rdgMatches,signature:f.variation_signature}));
 }
 expect(seen.size).toBe(92);
});
it("R12–R14: each actual wrong choice returns its own cause, including both construction decisions",()=>{
 let checked=0;
 for(const f of evidence.records){const x=bank.find(y=>y.id===f.id)!;const lists=x.mode==="quiz"?[x.options]:x.steps.map(s=>s.choices),keys=x.mode==="quiz"?[x.answerIndex]:x.steps.map(s=>s.answerIndex);
 for(let i=0;i<lists.length;i++)for(const wrong of lists[i].filter((_,j)=>j!==keys[i])){
 const report=vi.fn();render(<MathExerciseCard item={x} onResult={report} onNext={vi.fn()} isLast={false}/>);
 for(let j=0;j<lists.length;j++)fireEvent.click(screen.getByRole("button",{name:j===i?wrong:lists[j][keys[j]],exact:true}));
 expect(report).toHaveBeenCalledWith(false,lists.map((o,j)=>j===i?wrong:o[keys[j]]).join(" → "));
 const cause=(x.mode==="quiz"||i===1?x.optionExplanations:x.stepOptionExplanations)![wrong];expect(screen.getByTestId("learning-feedback")).toHaveTextContent(cause);cleanup();checked++;
 }
 }
 expect(checked).toBe(414);console.log("RDG_R12_R14_UI "+JSON.stringify({checked,ids:92}));
});
