import {createHash} from "node:crypto";
import {afterEach,expect,it,vi} from "vitest";
import {cleanup,fireEvent,render,screen} from "@testing-library/react";
import {MATH_LEVELS,MATH_MODES,type MathModel} from "@/lib/math-m1";
import {mathM3Pool} from "@/lib/math-m3";
import {repairOperationRootR28Candidate} from "@/lib/math-operations-root-r28-candidate";
import {verifyMathM3Record} from "@/lib/math-m3-guards";
import {MathExerciseCard} from "@/components/games/MathExerciseCard";
const hash=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
const bank=MATH_LEVELS.flatMap(l=>MATH_MODES.flatMap(m=>mathM3Pool("Aritmética","Operaciones",l,m)));
const gcd=(a:bigint,b:bigint):bigint=>b?gcd(b,a%b):(a<0n?-a:a)||1n;
const q=(a:bigint,b:bigint)=>{const g=gcd(a,b);return b/g===1n?String(a/g):a/g+"/"+b/g;};
function independent(x:MathModel){
 const p=x.prompt.match(/^Calcula \(√\((\d+)\/(\d+)\) − (\d+)\/(\d+)\) ÷ (\d+)\. Expresa una fracción simplificada\.$/);if(!p)throw Error("stimulus");
 const [r,s,c,d,k]=p.slice(1).map(BigInt);
 const root=(z:bigint)=>{let a=0n;while(a*a<z)a++;if(a*a!==z)throw Error("root");return a;};
 const a=root(r),b=root(s);if(!b||!d||!k)throw Error("domain");
 const n=a*d-c*b,den=b*d;
 const target={step:q(n,den),aux:q(a,b),key:q(n,den*k)};
 const expectedClaims={step:target.step,aux:q(-a,b),key:q(n*k,den)};
 const found=new Set<string>();
 for(const claim of x.assertions){
  const kind=claim.text.startsWith("El resultado solicitado")?"key":claim.text.startsWith("El valor correcto del paso")?"step":"aux";
  const value=claim.text.match(/(-?\d+(?:\/\d+)?)\.$/)?.[1];
  if(found.has(kind)||value!==expectedClaims[kind]||claim.truth!==(value===target[kind]))throw Error("claim");
  const reason=x.assertionExplanations?.[claim.text];
  if(!reason?.includes(target[kind]))throw Error("feedback");found.add(kind);
  if(kind==="aux"&&!reason.includes("raíz negativa"))throw Error("root cause");
  if(kind==="key"&&(!reason.includes("multiplicó")||reason.includes("raíz negativa")))throw Error("division cause");
 }
 if(found.size!==3||x.expected!==target.key)throw Error("coverage");
 return {target,expectedClaims};
}
afterEach(cleanup);
it("R28 root: one exact successor, independent distinct error causes and 449 preserved",()=>{
 const next=bank.map(repairOperationRootR28Candidate),changed=next.filter((x,i)=>hash(x)!==hash(bank[i]));
 expect(bank).toHaveLength(450);expect(changed).toHaveLength(1);const x=changed[0],old=bank.find(y=>y.id===x.id)!;
 expect(x.id).toBe("math-m2-aritmetica-operaciones-clasificar-intermedio-17");expect(hash(old)).toBe("56a42f81536dbe0240df6d6c429039347ba218732ea0ac12201ca5f574ec7d2d");
 expect(x.prompt).toBe(old.prompt);expect(x.expected).toBe(old.expected);expect(x.options).toEqual(old.options);expect(x.steps).toEqual(old.steps);expect(x.oracle).toEqual(old.oracle);expect(x.assertions.map(a=>a.truth)).toEqual(old.assertions.map(a=>a.truth));
 expect(verifyMathM3Record(x,x.level)).toEqual([]);const o=independent(x);
 expect(()=>independent(old)).toThrow();expect(()=>independent({...x,assertions:x.assertions.map(a=>({...a,truth:!a.truth}))})).toThrow();expect(()=>independent({...x,assertionExplanations:{}})).toThrow();
 console.log("RDG_R28_ROOT_ID "+JSON.stringify({id:x.id,previous_hash:hash(old),hash:hash(x),oracle:o,assertions:x.assertions,reasons:x.assertionExplanations,semantic_status:"REVIEW"}));
 const keys=x.assertions.map(a=>a.truth?"Verdadero":"Falso");
 for(let i=-1;i<keys.length;i++){
  const result=vi.fn();render(<MathExerciseCard item={x} onResult={result} onNext={vi.fn()} isLast={false}/>);
  const selected=keys.map((v,j)=>j===i?(v==="Verdadero"?"Falso":"Verdadero"):v);
  for(const v of selected)fireEvent.click(screen.getByRole("button",{name:v,exact:true}));
  expect(result).toHaveBeenCalledWith(i===-1,selected.join(" · "));
  if(i>=0)expect(screen.getByTestId("learning-feedback")).toHaveTextContent(x.assertionExplanations![x.assertions[i].text]);
  cleanup();
 }
});
