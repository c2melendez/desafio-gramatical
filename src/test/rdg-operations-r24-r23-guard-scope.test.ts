import {expect,it} from "vitest";
import {mathM3Pool} from "@/lib/math-m3";
import {type MathModel} from "@/lib/math-m1";
import {repairOperationR23Candidate} from "@/lib/math-operations-r23-candidate";
import {expectedOperationClassificationTruthCount} from "@/lib/math-operations-classification";
import {verifyMathM3Record} from "@/lib/math-m3-guards";

it("R24 independent structural review: R23 schedule permits zero and three true claims only in the exact authorized scope",()=>{
 const bank=mathM3Pool("Aritmética","Operaciones","intermedio","clasificar");
 const candidates=bank.map(repairOperationR23Candidate).filter(x=>x.modeOperation==="contrastar-tres-decisiones-distintas-r23");
 expect(candidates).toHaveLength(6);
 // Explicit acceptance schedule from R23 adjudication, independent of r23TruthMask.
 const counts:Record<number,number>={12:0,13:2,14:2,15:3,16:1,17:1};
 let wrongScope=0,wrongCount=0;
 for(const x of candidates){
  const slot=Number(x.id.split("-").at(-1));
  expect(expectedOperationClassificationTruthCount(x)).toBe(counts[slot]);
  expect(x.assertions.filter(a=>a.truth)).toHaveLength(counts[slot]);
  expect(verifyMathM3Record(x,x.level)).toEqual([]);
  const bad:MathModel[]=[
   {...x,id:x.id.replace("math-m2-","math-m3-")},
   {...x,id:x.id.replace(/\d+$/,"18")},
   {...x,id:x.id.replace("operaciones","fracciones")},
   {...x,subtopic:"Fracciones"},
   {...x,level:"avanzado"},
   {...x,mode:"quiz"},
   {...x,operation:"operacion-no-autorizada"},
   {...x,oracle:{...x.oracle,kind:"Operaciones"}}
  ];
  for(const m of bad){expect(expectedOperationClassificationTruthCount(m)).toBe(-1);expect(verifyMathM3Record(m,m.level)).toContain("clasificacion-invalida");wrongScope++;}
  for(let i=0;i<3;i++){
   const m={...x,assertions:x.assertions.map((a,j)=>i===j?{...a,truth:!a.truth}:a)};
   expect(verifyMathM3Record(m,m.level)).toContain("clasificacion-invalida");wrongCount++;
  }
 }
 // Preserve historical behavior for the unmodified production bank.
 for(const x of bank)expect(verifyMathM3Record(x,x.level)).toEqual([]);
 expect(wrongScope).toBe(48);expect(wrongCount).toBe(18);
 console.log("RDG_R24_R23_GUARD "+JSON.stringify({ids:6,wrongScope,wrongCount,legacy:bank.length,semantic_pass:0}));
});
