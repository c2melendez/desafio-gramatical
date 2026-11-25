import {createHash} from "node:crypto";
import {expect,it} from "vitest";
import {mathM3HistoricalPool,mathM3Pool} from "@/lib/math-m3";
import {MATH_LEVELS,MATH_MODES} from "@/lib/math-m1";
const hash=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
it("P2 R4: preserves ID, visible stimulus and independently checked keys while replacing artificial distractors",()=>{
 const revised=[],unchanged=[];
 for(const level of MATH_LEVELS)for(const mode of MATH_MODES){
  const before=mathM3HistoricalPool("Aritmética","Operaciones",level,mode);
  const after=mathM3Pool("Aritmética","Operaciones",level,mode);
  expect(after.map(x=>x.id)).toEqual(before.map(x=>x.id));
  for(const [i,x] of after.entries()){
   const old=before[i];
   if(mode==="clasificar"||x.oracle.kind==="Operaciones-racionales"){
    expect(hash(x)).toBe(hash(old));unchanged.push(x.id);continue;
   }
   expect(x.prompt).toBe(old.prompt);
   expect(x.oracle).toEqual(old.oracle);
   expect(x.assertions).toEqual(old.assertions);
   const m=x.prompt.match(/\((\d+)\+(\d+)\)×(\d+)/)!;
   const [a,b,c]=m.slice(1).map(Number);
   const u=a,v=level==="intermedio"?b+2:b,w=level==="intermedio"?c-1:c;
   const expected=level==="avanzado"?(a+b)*c-a*c:(u+v)*w;
   const intermediate=level==="avanzado"?b:u+v;
   const allowedFinal=level==="avanzado"?[-b*c,0,(a+b)*c,a*c]:[u*w+v,u+v+w,u*w,v*w,(u-v)*w,...(level==="intermedio"?[(a+b)*c]:[])];
   const allowedStep=level==="avanzado"?[-b,a+b,0,a]:[u-v,u*v,u,v];
   expect(x.expected).toBe(String(expected));
   expect(x.options[x.answerIndex]).toBe(String(expected));
   expect(x.steps[0].choices[x.steps[0].answerIndex]).toBe(String(intermediate));
   expect(x.steps[1].choices[x.steps[1].answerIndex]).toBe(String(expected));
   expect(new Set(x.options).size).toBe(4);
   expect(new Set(x.steps[0].choices).size).toBe(4);
   for(const d of x.options.filter(d=>d!==x.expected)){
    expect(allowedFinal).toContain(Number(d));
    expect(x.optionExplanations?.[d]?.length).toBeGreaterThan(20);
   }
   for(const d of x.steps[0].choices.filter(d=>d!==String(intermediate)))expect(allowedStep).toContain(Number(d));
   expect(hash(x)).not.toBe(hash(old));
   revised.push({id:x.id,previous_sha256:hash(old),content_sha256:hash(x),expected:x.expected,intermediate:String(intermediate),options:x.options,step:x.steps[0].choices});
  }
 }
 expect(revised).toHaveLength(288);expect(unchanged).toHaveLength(162);
 for(let i=0;i<revised.length;i+=24)console.log("RDG_R4_REVISIONS "+JSON.stringify(revised.slice(i,i+24)));
 console.log("RDG_R4_SUMMARY "+JSON.stringify({revised:revised.length,unchanged:unchanged.length,semantic_pass:0,reason:"Diversity and full individual rubric remain open"}));
});
