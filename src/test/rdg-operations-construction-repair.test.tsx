import {readFileSync} from "node:fs";
import {createHash} from "node:crypto";
import {expect,it,vi,afterEach} from "vitest";
import {cleanup,fireEvent,render,screen} from "@testing-library/react";
import {mathM3HistoricalPool,mathM3Pool} from "@/lib/math-m3";
import {MATH_LEVELS,MATH_MODES} from "@/lib/math-m1";
import {MathExerciseCard} from "@/components/games/MathExerciseCard";
afterEach(cleanup);
const load=(p:string)=>JSON.parse(readFileSync(p,"utf8"));
const report=load("qa/certification/rdg/evidence/MAT-ARIT-01-02-construction-R2.json");
const before=MATH_LEVELS.flatMap(l=>MATH_MODES.flatMap(m=>mathM3HistoricalPool("Aritmética","Operaciones",l,m)));
const after=MATH_LEVELS.flatMap(l=>MATH_MODES.flatMap(m=>mathM3Pool("Aritmética","Operaciones",l,m)));
const hash=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
it("C02/C04: exactly 37 known hashes change, 413 remain unchanged and every step has three diagnostic distractors",()=>{
 const changed=after.filter(x=>hash(x)!==hash(before.find(b=>b.id===x.id)));
 expect(changed.map(x=>x.id).sort()).toEqual(report.records.map((r:{id:string})=>r.id).sort());
 for(const r of report.records){
  const old=before.find(x=>x.id===r.id)!,x=after.find(x=>x.id===r.id)!;
  expect(hash(old)).toBe(r.previous_hash);expect(hash(x)).toBe(r.content_sha256);
  expect(x.prompt).toBe(old.prompt);expect(x.expected).toBe(old.expected);
  for(const [i,s] of x.steps.entries()){
   const d=r.distractors[i].alternatives;
   expect(s.choices[s.answerIndex]).toBe(i===0?r.intermediate:r.expected);
   expect(new Set(s.choices).size).toBe(4);
   expect(s.choices.filter(v=>v!==s.choices[s.answerIndex]).sort()).toEqual(d.map((a:{value:string})=>a.value).sort());
   for(const a of d)expect(x.constructionExplanations?.[i]?.[a.value]).toContain(a.reason);
  }
 }
 expect(after).toHaveLength(450);
});
it("shows a diagnosis for each incorrect construction subdecision",()=>{
 const r=report.records[0],x=after.find(x=>x.id===r.id)!;
 render(<MathExerciseCard item={x} onResult={vi.fn()} onNext={vi.fn()} isLast={false}/>);
 for(const [i,step] of x.steps.entries())fireEvent.click(screen.getByRole("button",{name:r.distractors[i].alternatives[0].value}));
 const f=screen.getByTestId("learning-feedback");
 expect(f).toHaveTextContent(r.distractors[0].alternatives[0].reason);
 expect(f).toHaveTextContent(r.distractors[1].alternatives[0].reason);
});
