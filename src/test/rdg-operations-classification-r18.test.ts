import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import {expect,it} from "vitest";
import {mathM3Pool,mathM3R17Pool} from "@/lib/math-m3";
import {MATH_LEVELS,MATH_MODES,type MathModel} from "@/lib/math-m1";
import {verifyMathM3Record} from "@/lib/math-m3-guards";
const hash=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
const evidence=JSON.parse(readFileSync("qa/certification/rdg/evidence/MAT-ARIT-01-R18-candidate.json","utf8"));
const index=new Map<string,{previous_sha256:string,previous_claims:{text:string,truth:boolean}[]}>(evidence.records.map((x:{id:string,previous_sha256:string,previous_claims:{text:string,truth:boolean}[]})=>[x.id,x]));
function assess(item:MathModel){
 const [a,b,c]=item.prompt.match(/\((\d+)\+(\d+)\)×(\d+)/)!.slice(1).map(Number);
 const advanced=item.level==="avanzado",middle=item.level==="intermedio";
 const answer=advanced?(a+b)*c-a*c:middle?(a+b+2)*(c-1):(a+b)*c;
 const step=advanced?b:middle?a+b+2:a+b;
 const auxiliary=middle?c-1:a*c;
 const kinds=new Set<string>();
 for(const claim of item.assertions){const v=Number(claim.text.match(/(-?\d+)\.$/)?.[1]);
 const kind=claim.text.startsWith("El valor de la expresión solicitada es ")?"answer":claim.text.startsWith("La suma dentro del paréntesis es ")||claim.text.startsWith("Después de los cambios, la suma dentro del paréntesis es ")||claim.text.startsWith("Después de distribuir y cancelar el producto repetido, el sumando restante es ")?"step":claim.text.startsWith("El factor después del cambio es ")||claim.text.startsWith("El producto que se cancela tiene valor ")||claim.text.startsWith("Al distribuir, el producto del primer sumando por el factor es ")?"auxiliary":"invalid";
 if(kind==="invalid"||kinds.has(kind)||!Number.isFinite(v))throw Error("redundant or invalid claim");
 kinds.add(kind);if(claim.truth!==(v==={answer,step,auxiliary}[kind]))throw Error("incorrect truth");
 }
 if(kinds.size!==3||String(answer)!==item.expected)throw Error("oracle mismatch");
 return auxiliary;
}
it("R18: 59 distinct-decision repairs, 391 unchanged, 177 truth mutations rejected by independent visible oracle",()=>{
 let changed=0,preserved=0,mutants=0;const counts:Record<string,number>={};
 for(const l of MATH_LEVELS)for(const m of MATH_MODES){
 const before=mathM3R17Pool("Aritmética","Operaciones",l,m),after=mathM3Pool("Aritmética","Operaciones",l,m);
 for(const [i,x] of after.entries()){const old=before[i],e=index.get(x.id);expect(x.id).toBe(old.id);
 if(!e){expect(hash(x)).toBe(hash(old));preserved++;continue;}
 expect(hash(old)).toBe(e.previous_sha256);expect(old.assertions).toEqual(e.previous_claims);expect(hash(x)).not.toBe(hash(old));expect(x.prompt).toBe(old.prompt);expect(x.expected).toBe(old.expected);expect(x.options).toEqual(old.options);expect(x.steps).toEqual(old.steps);expect(x.oracle).toEqual(old.oracle);
 const auxiliary=assess(x);expect(x.assertions.filter(a=>a.truth)).toHaveLength(old.assertions.filter(a=>a.truth).length);
 const claim=x.assertions.find(a=>a.text.startsWith("El factor después")||a.text.startsWith("El producto que se cancela")||a.text.startsWith("Al distribuir, el producto"))!;
 expect(x.assertionExplanations?.[claim.text]).toContain(String(auxiliary));
 expect(verifyMathM3Record(x,l)).toEqual([]);
 for(let k=0;k<3;k++){expect(()=>assess({...x,assertions:x.assertions.map((a,i)=>i===k?{...a,truth:!a.truth}:a)})).toThrow("incorrect truth");mutants++;}
 expect(()=>assess(old)).toThrow("redundant or invalid claim");
 counts[l]=(counts[l]??0)+1;changed++;
 console.log("RDG_R18_SUCCESSOR "+JSON.stringify({id:x.id,previous_sha256:hash(old),content_sha256:hash(x),level:l,operation:x.operation,assertions:x.assertions,auxiliary,semantic_status:"REVIEW"}));
 }}
 expect(changed).toBe(59);expect(preserved).toBe(391);expect(mutants).toBe(177);expect(counts).toEqual({principiante:11,intermedio:17,avanzado:31});
});
