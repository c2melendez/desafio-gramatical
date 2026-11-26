import {createHash} from "node:crypto";
import {it,expect} from "vitest";
import {mathM3R15Pool as mathM3Pool,mathM3R14Pool} from "@/lib/math-m3";
import {MATH_LEVELS,MATH_MODES,type MathModel} from "@/lib/math-m1";
import {verifyMathM3Record} from "@/lib/math-m3-guards";
const hash=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
function reduce(n:number,d=1){let g=1;for(let i=1;i<=d;i++)if(n%i===0&&d%i===0)g=i;return d/g===1?String(n/g):n/g+"/"+d/g;}
function visible(x:MathModel){
 const n=(x.prompt.match(/\d+/g)??[]).map(Number);
 if(x.operation==="comparar-ofertas-con-cargos-fijos"){
 const [count,p,f,v,h]=n,A=count*p+f,B=count*v+h;
 return {key:reduce(B-A),step:reduce(A),aux:reduce(h-f),wrong:[B,count*(v-p),A-B].map(v=>reduce(v)),mid:[count*p,(count+f)*p,count+p+f].map(v=>reduce(v))};
 }
 if(x.operation==="cociente-de-diferencia-racional-con-raiz"){
 const [rad,den,c,v,d]=n,a=Math.sqrt(rad),b=Math.sqrt(den);expect(Number.isInteger(a)&&Number.isInteger(b)).toBe(true);expect(v).toBe(2*b);
 return {key:reduce(a*v-c*b,b*v*d),step:reduce(a*v-c*b,b*v),aux:reduce(a,b),wrong:[reduce(a*v-c*b,b*v),reduce((a*v-c*b)*d,b*v),reduce(-a*v-c*b,b*v*d)],mid:[reduce(a*v+c*b,b*v),reduce(-a*v-c*b,b*v),reduce(a-c,b+v)]};
 }
 throw Error("Familia R15 desconocida");
}
it("R15: 18 intermediate successors, 432 preserved, 108 distractors, 54 claims on three distinct decisions",()=>{
 const records=[],prompts=new Set<string>(),inventory=[];let beforeDominant=0,afterDominant=0;
 for(const level of MATH_LEVELS)for(const mode of MATH_MODES){
 const before=mathM3R14Pool("Aritmética","Operaciones",level,mode),now=mathM3Pool("Aritmética","Operaciones",level,mode);
 const dominant=level==="principiante"?"prioridad-de-operaciones":level==="intermedio"?"modificar-parentesis-y-factor":"distributiva-y-cancelacion";
 beforeDominant+=before.filter(x=>x.operation===dominant).length;afterDominant+=now.filter(x=>x.operation===dominant).length;
 inventory.push({level,mode,count:now.length,families:Object.fromEntries([...new Set(now.map(x=>x.operation!))].map(op=>[op,now.filter(x=>x.operation===op).length]))});
 expect(now.map(x=>x.id)).toEqual(before.map(x=>x.id));
 for(const [i,x] of now.entries()){
 if(x.oracle.kind!=="Operaciones-decision"){expect(hash(x)).toBe(hash(before[i]));continue;}
 expect(level).toBe("intermedio");expect(before[i].oracle.kind).toBe("Operaciones");expect(before[i].operation).toBe(dominant);
 const o=visible(x);expect(prompts.has(x.prompt)).toBe(false);prompts.add(x.prompt);
 expect(x.expected).toBe(o.key);expect(reduce(x.oracle.intermediate.n,x.oracle.intermediate.d)).toBe(o.step);expect(verifyMathM3Record(x,level)).toEqual([]);
 expect(x.options.filter((_,j)=>j!==x.answerIndex).sort()).toEqual(o.wrong.sort());expect(x.steps[0].choices.filter((_,j)=>j!==x.steps[0].answerIndex).sort()).toEqual(o.mid.sort());
 expect(x.steps[0].choices[x.steps[0].answerIndex]).toBe(o.step);expect(x.steps[1].choices[x.steps[1].answerIndex]).toBe(o.key);
 for(const v of o.wrong)expect(x.optionExplanations?.[v]).toBeTruthy();for(const v of o.mid)expect(x.stepOptionExplanations?.[v]).toBeTruthy();
 const seen=new Set<string>();
 for(const a of x.assertions){const v=a.text.match(/(-?\d+(?:\/\d+)?)\.$/)?.[1],kind=a.text.startsWith("El resultado solicitado")?"key":a.text.startsWith("El valor correcto del paso")?"step":"aux";seen.add(kind);expect(a.truth).toBe(v===o[kind]);expect(x.assertionExplanations?.[a.text]).toBeTruthy();}
 expect(seen.size).toBe(3);expect(verifyMathM3Record({...x,expected:"999999"},level)).toContain("clave-distinta-oraculo");
 records.push({id:x.id,previous_sha256:hash(before[i]),content_sha256:hash(x),objective_ids:[x.operation!.includes("racional")?"OP-04":"OP-02"],level,mode,stimulus:x.prompt,expected:x.expected,intermediate:o.step,auxiliary:o.aux,family:x.operation,steps:x.steps,assertions:x.assertions,explanation:x.explanation,optionExplanations:x.optionExplanations,stepOptionExplanations:x.stepOptionExplanations,assertionExplanations:x.assertionExplanations,semantic_status:"REVIEW"});
 }}
 expect(records).toHaveLength(18);expect(beforeDominant).toBe(195);expect(afterDominant).toBe(177);
 console.log("RDG_R15_INVENTORY "+JSON.stringify({beforeDominant,afterDominant,inventory}));
 for(let i=0;i<records.length;i+=3)console.log("RDG_R15_REVISIONS "+JSON.stringify(records.slice(i,i+3)));
});
