import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import {expect,it,vi,afterEach} from "vitest";
import {cleanup,fireEvent,render,screen} from "@testing-library/react";
import {mathM3Pool,mathM3R11Pool,mathM3R12Pool,mathM3R13Pool} from "@/lib/math-m3";
import {MATH_LEVELS,MATH_MODES,type MathModel} from "@/lib/math-m1";
import {verifyMathM3Record} from "@/lib/math-m3-guards";
import {repairOperationR22Candidate} from "@/lib/math-operations-r22-candidate";
import {MathExerciseCard} from "@/components/games/MathExerciseCard";
afterEach(cleanup);
const sha=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
const load=(p:string)=>JSON.parse(readFileSync(p,"utf8"));
const reviewed=load("qa/certification/rdg/evidence/MAT-ARIT-01-v79-R12-R14-publication-candidates.json");
const ids=reviewed.records.filter((f:{reason_codes:string[]})=>f.reason_codes.some(c=>c.startsWith("G_")||c.startsWith("C_"))).map((f:{id:string})=>f.id) as string[];
function independent(x:MathModel){
 const nums=x.prompt.match(/\d+/g)!.map(Number);
 let key:number,step:number,wrong:number[],mid:number[];
 if(x.operation==="cociente-con-agrupacion"){
  const [a,b,c]=nums;step=b+c;key=a/step;wrong=[a/b+c,key+c,a-b-c];mid=[b*c,b,c];
 }else if(x.operation==="cero-dividido-por-no-cero"){
  const [a,a2,b,c]=nums;if(a!==a2||b===0)throw Error("zero condition");step=a-a2;key=step/b+c;wrong=[a/b+c,a-b+c,c+b];mid=[a,2*a,-a];
 }else if(x.operation==="completar-igualdad-distributiva"){
  const [a,b,c,a2,b2,d]=nums;if(a!==a2||b!==b2)throw Error("equal factors");step=a*(b-c);key=a2*(b2+d)-step;wrong=[a*(b+d),a*(c-d),c+d];mid=[a*b-c,a*(b+c),b-c];
 }else throw Error("family");
 if(x.expected!==String(key)||x.options[x.answerIndex]!==String(key)||x.steps[0].choices[x.steps[0].answerIndex]!==String(step)||x.steps[1].choices[x.steps[1].answerIndex]!==String(key))throw Error("key/step");
 if(new Set([key,...wrong]).size!==4||new Set([step,...mid]).size!==4)throw Error("options");
 expect(x.options.filter((_,i)=>i!==x.answerIndex).sort()).toEqual(wrong.map(String).sort());
 expect(x.steps[0].choices.filter((_,i)=>i!==x.steps[0].answerIndex).sort()).toEqual(mid.map(String).sort());
 if(x.mode==="construir"&&key===step)throw Error("internal collision");
 return {key,step,wrong,mid};
}
const canonical=(s:string)=>s.replace(/\s/g,"").replace(/[−–]/g,"-");
it("R22: four exact G/C repairs independently solved, all wrong choices and no new bank collision",()=>{
 const bank=MATH_LEVELS.flatMap(l=>MATH_MODES.flatMap(m=>mathM3Pool("Aritmética","Operaciones",l,m)));
 expect(bank).toHaveLength(450);expect(ids).toHaveLength(4);
 const predecessor=new Map<string,MathModel>();
 for(const id of ids){const old=bank.find(x=>x.id===id)!;const pool=old.operation==="cociente-con-agrupacion"?mathM3R11Pool:old.operation==="cero-dividido-por-no-cero"?mathM3R12Pool:mathM3R13Pool;predecessor.set(id,pool("Aritmética","Operaciones",old.level,old.mode).find(x=>x.id===id)!);}
 const candidates=new Map(ids.map(id=>[id,repairOperationR22Candidate(predecessor.get(id)!)]));
 const next=bank.map(x=>candidates.get(x.id)??x);
 let changes=0,uiCases=0,mutants=0;
 for(const old of bank){const x=next.find(y=>y.id===old.id)!;if(!ids.includes(old.id)){expect(sha(x)).toBe(sha(old));continue;}
 const previous=reviewed.records.find((f:{id:string})=>f.id===old.id);expect(sha(old)).toBe(previous.content_hash);expect(sha(x)).not.toBe(sha(old));expect(x.operation).toBe(old.operation);expect(x.level).toBe(old.level);expect(x.mode).toBe(old.mode);expect(x.requiredEvidence).toEqual(old.requiredEvidence);expect(verifyMathM3Record(x,x.level)).toEqual([]);
 const check=independent(x);expect(()=>independent({...x,expected:String(check.key+1)})).toThrow("key/step");mutants++;
 expect(next.filter(y=>y.id!==x.id&&canonical(y.prompt)===canonical(x.prompt))).toEqual([]);
 expect(next.filter(y=>y.id!==x.id&&y.operation===x.operation&&y.expected===x.expected&&y.steps[0].choices[y.steps[0].answerIndex]===String(check.step))).toEqual([]);
 const options=x.mode==="quiz"?[{choices:x.options,answerIndex:x.answerIndex}]:x.steps;
 for(let i=0;i<options.length;i++)for(let j=0;j<options[i].choices.length;j++){if(j===options[i].answerIndex)continue;const report=vi.fn();render(<MathExerciseCard item={x} onResult={report} onNext={vi.fn()} isLast={false}/>);
 for(let k=0;k<options.length;k++)fireEvent.click(screen.getByRole("button",{name:options[k].choices[k===i?j:options[k].answerIndex],exact:true}));
 const chosen=options[i].choices[j],reason=x.mode==="construir"&&i===0?x.stepOptionExplanations?.[chosen]:x.optionExplanations?.[chosen];expect(reason).toBeTruthy();expect(screen.getByTestId("learning-feedback")).toHaveTextContent(reason!);expect(report).toHaveBeenCalledWith(false,expect.any(String));cleanup();uiCases++;}
 console.log("RDG_R22_CANDIDATE "+JSON.stringify({id:x.id,previous_sha256:sha(old),content_sha256:sha(x),prompt:x.prompt,operation:x.operation,...check,semantic_status:"REVIEW"}));changes++;
 }
 expect(changes).toBe(4);expect(uiCases).toBe(21);expect(mutants).toBe(4);console.log("RDG_R22_CANDIDATE_SUMMARY "+JSON.stringify({changes,preserved:446,uiCases,mutants,semantic_pass:0}));
},45000);
