import {createHash} from "node:crypto";
import {expect,it} from "vitest";
import {mathM3HistoricalPool as mathM3Pool,MATH_M3_NEW_PER_LEVEL} from "@/lib/math-m3";
import {MATH_LEVELS,MATH_MODES,type MathModel} from "@/lib/math-m1";
import {arithmeticPedagogy} from "@/lib/math-m1-core-arithmetic";
import {repairRationalOperation} from "@/lib/math-operations-rational";
const digest=(item:MathModel)=>createHash("sha256").update(JSON.stringify(item)).digest("hex");
const gcd=(a:number,b:number):number=>b?gcd(b,a%b):Math.abs(a)||1;
const fmt=(n:number,d=1)=>{const g=gcd(n,d);return d/g===1?String(n/g):n/g+"/"+d/g;};
// Derive the oracle from the displayed stimulus, not item.oracle.answer or transformed generator inputs.
function visibleOracle(item:MathModel){
 if(item.oracle.kind==="Operaciones-racionales"){
  const s=item.prompt.match(/^Calcula √\((\d+)\/(\d+)\) \+ (2 × \()?(\d+)\/(\d+)\)? − (\d+)\/(\d+)\.$/);
  if(!s)throw Error("Unparsed OP-04 "+item.id);
  const [,a,b,product,c,d,e,f]=s,rootN=Math.sqrt(Number(a)),rootD=Math.sqrt(Number(b)),factor=product?2:1;
  if(!Number.isInteger(rootN)||!Number.isInteger(rootD)||rootD<=0||Number(d)<=0||Number(f)<=0)throw Error("invalid radical");
  const den=rootD*Number(d)*Number(f);
  const numerator=rootN*Number(d)*Number(f)+factor*Number(c)*rootD*Number(f)-Number(e)*rootD*Number(d);
  return {expected:fmt(numerator,den),intermediate:fmt(rootN,rootD),objective:"OP-04"};
 }
 const s=item.prompt.match(/\((\d+)\+(\d+)\)×(\d+)/);
 if(!s)throw Error("Unparsed operation "+item.id);
 const [a,b,c]=s.slice(1).map(Number);
 if(item.level==="principiante")return {expected:fmt((a+b)*c),intermediate:fmt(a+b),objective:"OP-01"};
 if(item.level==="intermedio")return {expected:fmt((a+b+2)*(c-1)),intermediate:fmt(a+b+2),objective:"OP-02"};
 return {expected:fmt((a+b)*c-a*c),intermediate:fmt(b),objective:"OP-03"};
}
it("C02: repairs the true distractor at factor 1 and the advanced construction procedure",()=>{
 const edge=arithmeticPedagogy("Operaciones","intermedio",[7,5,2])!;
 expect(edge.inputs).toEqual([7,7,1]);
 expect(edge.claims.find(x=>!x.truth)?.text).toContain("omitir el segundo sumando");
 expect(7*1+7).toBe((7+7)*1); // old false claim was true; regression witness
 expect(7*1).not.toBe((7+7)*1);
 const advanced=arithmeticPedagogy("Operaciones","avanzado",[9,5,3])!;
 expect(advanced.procedure.label).toContain("cancelar el primer producto");
 expect(advanced.procedure.value.n).toBe(5);
 expect(advanced.claims[0].text).toContain("queda 5×3");
 expect(advanced.formula).toBe("(9+5)×3−9×3=5×3=15");
});
it("P2 preflight: all real IDs, independent stimulus oracle, 18 focused OP-04 substitutions and per-ID evidence",()=>{
 const seen=new Set<string>(),counts:Record<string,number>={},records=[];
 for(const level of MATH_LEVELS)for(const mode of MATH_MODES){
  const bank=mathM3Pool("Aritmética","Operaciones",level,mode);
  const entries=[];
  for(const item of bank){
   expect(seen.has(item.id)).toBe(false);seen.add(item.id);
   const oracle=visibleOracle(item);
   expect(item.expected,item.id).toBe(oracle.expected);
   expect(item.options[item.answerIndex],item.id).toBe(oracle.expected);
   expect(item.steps[0].choices[item.steps[0].answerIndex],item.id).toBe(oracle.intermediate);
   expect(item.steps[1].choices[item.steps[1].answerIndex],item.id).toBe(oracle.expected);
   expect(new Set(item.options).size).toBe(4);
   expect(item.assertions.filter(x=>x.truth)).toHaveLength(1);
   counts[oracle.objective]=(counts[oracle.objective]??0)+1;
   if(oracle.objective==="OP-04"){
    expect(item.id).toMatch(/^math-m3-/);
    const idx=Number(item.id.split("-").at(-1));
    expect(idx).toBeGreaterThanOrEqual(MATH_M3_NEW_PER_LEVEL[level]-3);
    expect(item.options.filter(x=>x!==item.expected).every(x=>!!item.optionExplanations?.[x])).toBe(true);
    expect(()=>repairRationalOperation(item,3,0)).toThrow();
   }
   const r={id:item.id,content_sha256:digest(item),objective_id:oracle.objective,level,mode,oracle_expected:oracle.expected,oracle_intermediate:oracle.intermediate,oracle_status:"VERIFIED",technical_status:"PASS",semantic_status:"REVIEW",reason:oracle.objective==="OP-04"?"NEW_SCOPE_REQUIRES_FULL_RUBRIC_AND_REVIEW":"LEGACY_DISTRACTORS_AND_INDEPENDENCE_REQUIRE_REVIEW"};
   entries.push(r);records.push(r);
  }
  console.log("RDG_P2_CELL "+JSON.stringify({level,mode,items:entries}));
 }
 expect(seen.size).toBe(450);expect(counts).toEqual({"OP-01":90,"OP-02":141,"OP-03":201,"OP-04":18});
 console.log("RDG_P2_PREFLIGHT "+JSON.stringify({records:records.length,counts,semantic_pass:0,review:records.length,limitations:"Preflight pending promotion of exact RDG contract; not full semantic certification."}));
});
