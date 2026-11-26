import {createHash} from "node:crypto";
import {expect,it} from "vitest";
import {mathM3Pool,mathM3R15Pool} from "@/lib/math-m3";
import {MATH_LEVELS,MATH_MODES,type MathModel} from "@/lib/math-m1";
import {verifyMathM3Record} from "@/lib/math-m3-guards";
const hash=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
const norm=(s:string)=>{const [a,b=1]=s.split("/").map(Number);return a/b;};
function auxiliaryVisible(item:MathModel){
 const n=(item.prompt.match(/\d+/g)??[]).map(Number);
 switch(item.operation){
 case "producto-negativo-y-suma":return n[0]*n[1];
 case "cero-dividido-por-no-cero":return n[2];
 case "comparar-cambios-compensados":return n[2]-n[4];
 case "reconstruir-cantidad-por-grupo":return n[1];
 case "cancelacion-cruzada-de-productos":return n[0]*n[1];
 case "dos-raices-en-producto-agrupado":return n[2]+Math.sqrt(n[3]);
 case "completar-igualdad-distributiva":return n[3]*(n[4]+n[5]);
 case "factor-desconocido-tras-cancelar":return n[0]*n[1];
 case "raiz-racional-resta-agrupada":return Math.sqrt(n[0]/n[1]);
 case "distribuir-sobre-raiz-racional":return Math.sqrt(n[1]/n[2]);
 default:throw Error("R16 family");
 }
}
it("R16 eliminates mutually exclusive result claims in 28 R13/R14 classification items without modifying 422 others",()=>{
 const records=[],counts:Record<string,number>={};let preserved=0;
 for(const level of MATH_LEVELS)for(const mode of MATH_MODES){
 const old=mathM3R15Pool("Aritmética","Operaciones",level,mode),now=mathM3Pool("Aritmética","Operaciones",level,mode);
 expect(now.map(x=>x.id)).toEqual(old.map(x=>x.id));
 for(const [i,x] of now.entries()){
 const before=old[i],target=mode==="clasificar"&&["Operaciones-contraste","Operaciones-avanzadas"].includes(x.oracle.kind);
 if(!target){expect(hash(x)).toBe(hash(before));preserved++;continue;}
 expect(before.assertions.filter(a=>a.text.startsWith("El resultado solicitado es "))).toHaveLength(2);
 expect(x.assertions.filter(a=>a.text.startsWith("El resultado solicitado es "))).toHaveLength(1);
 expect(x.assertions.filter(a=>a.text.startsWith("El valor correcto del paso"))).toHaveLength(1);
 const claim=x.assertions.find(a=>!a.text.startsWith("El resultado solicitado")&&!a.text.startsWith("El valor correcto del paso"))!;
 const n=claim.text.match(/(-?\d+(?:\/\d+)?)\.$/)?.[1];
 expect(n).toBeDefined();expect(claim.truth).toBe(Math.abs(norm(n!)-auxiliaryVisible(x))<1e-12);
 expect(x.assertionExplanations?.[claim.text]).toBeTruthy();expect(x.assertions.filter(a=>a.truth)).toHaveLength(before.assertions.filter(a=>a.truth).length);
 expect(x.prompt).toBe(before.prompt);expect(x.expected).toBe(before.expected);expect(x.steps).toEqual(before.steps);expect(x.options).toEqual(before.options);expect(x.oracle).toEqual(before.oracle);
 expect(verifyMathM3Record(x,level)).toEqual([]);
 expect(verifyMathM3Record({...x,assertions:[x.assertions[0],x.assertions[0],x.assertions[2]]},level)).toContain("clasificacion-invalida");
 counts[x.operation!]=(counts[x.operation!]??0)+1;
 records.push({id:x.id,previous_sha256:hash(before),content_sha256:hash(x),level,mode,family:x.operation,stimulus:x.prompt,expected:x.expected,previous_assertions:before.assertions,assertions:x.assertions,assertionExplanations:x.assertionExplanations,auxiliary_value:auxiliaryVisible(x),semantic_status:"REVIEW"});
 }}
 expect(records).toHaveLength(28);expect(preserved).toBe(422);expect(Object.keys(counts)).toHaveLength(10);
 console.log("RDG_R16_SUMMARY "+JSON.stringify({changed:records.length,preserved,counts}));
 for(let i=0;i<records.length;i+=3)console.log("RDG_R16_REVISIONS "+JSON.stringify(records.slice(i,i+3)));
});
