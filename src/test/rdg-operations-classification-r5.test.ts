import {createHash} from "node:crypto";
import {expect,it} from "vitest";
import {mathM3Pool,mathM3R4Pool} from "@/lib/math-m3";
import {MATH_LEVELS,MATH_MODES,type MathModel} from "@/lib/math-m1";
import {verifyMathM3Record} from "@/lib/math-m3-guards";
const digest=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
function independent(item:MathModel){
 const [a,b,c]=item.prompt.match(/\((\d+)\+(\d+)\)×(\d+)/)!.slice(1).map(Number);
 const [answer,step]=item.level==="avanzado"?[(a+b)*c-a*c,b]:item.level==="intermedio"?[(a+b+2)*(c-1),a+b+2]:[(a+b)*c,a+b];
 return {answer,step};
}
function judge(text:string,answer:number,step:number){
 const value=Number(text.match(/(-?\d+)\.$/)?.[1]);
 if(text.startsWith("El valor de la expresión solicitada es "))return value===answer;
 if(text.startsWith("La expresión solicitada equivale a ")){
  const m=text.match(/a (-?\d+)×(\d+)(?:\+(\d+)×(\d+))?\.$/);
  if(!m)throw Error("Unparsed equivalence "+text);
  return Number(m[1])*Number(m[2])+(m[3]?Number(m[3])*Number(m[4]):0)===answer;
 }
 if(text.startsWith("La suma dentro del paréntesis es ")||text.startsWith("Después de los cambios, la suma dentro del paréntesis es ")||text.startsWith("Después de distribuir y cancelar el producto repetido, el sumando restante es "))return value===step;
 throw Error("Unparsed claim "+text);
}
it("R5 validates every revised classification claim against visible stimulus, detects flipped truth, and preserves R4 outside scope",()=>{
 const changed=[],counts:Record<string,Record<number,number>>={};
 for(const level of MATH_LEVELS)for(const mode of MATH_MODES){
  const before=mathM3R4Pool("Aritmética","Operaciones",level,mode),after=mathM3Pool("Aritmética","Operaciones",level,mode);
  expect(after.map(x=>x.id)).toEqual(before.map(x=>x.id));
  for(const [i,x] of after.entries()){
   const old=before[i];
   const eligible=mode==="clasificar"&&x.id.startsWith("math-m3-")&&x.oracle.kind==="Operaciones";
   if(!eligible){expect(digest(x)).toBe(digest(old));continue;}
   expect(x.prompt).toBe(old.prompt);expect(x.expected).toBe(old.expected);expect(x.oracle).toEqual(old.oracle);
   const {answer,step}=independent(x);
   expect(x.expected).toBe(String(answer));
   for(const a of x.assertions){
    const truth=judge(a.text,answer,step);
    expect(a.truth,x.id+" "+a.text).toBe(truth);
    expect(!a.truth).not.toBe(truth);
   }
   const n=x.assertions.filter(a=>a.truth).length;
   counts[level]??={};counts[level][n]=(counts[level][n]??0)+1;
   expect(verifyMathM3Record(x,level)).toEqual([]);
   const mutant={...x,assertions:x.assertions.map((a,i)=>i===0?{...a,truth:!a.truth}:a)};
   expect(verifyMathM3Record(mutant,level)).toContain("clasificacion-invalida");
   changed.push({id:x.id,previous_sha256:digest(old),content_sha256:digest(x),claims:x.assertions,oracle_status:"VERIFIED",semantic_status:"REVIEW"});
  }
 }
 expect(changed).toHaveLength(44);
 for(const level of MATH_LEVELS){expect(counts[level][1]).toBeGreaterThan(0);expect(counts[level][2]).toBeGreaterThan(0);}
 for(let i=0;i<changed.length;i+=11)console.log("RDG_R5_REVISIONS "+JSON.stringify(changed.slice(i,i+11)));
 console.log("RDG_R5_SUMMARY "+JSON.stringify({revised:changed.length,claims_verified:changed.length*3,counts,semantic_pass:0}));
});
