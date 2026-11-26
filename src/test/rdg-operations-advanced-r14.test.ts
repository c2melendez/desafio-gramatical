import {createHash} from "node:crypto";
import {it,expect} from "vitest";
import {mathM3Pool,mathM3R13Pool} from "@/lib/math-m3";
import {MATH_LEVELS,MATH_MODES,type MathModel} from "@/lib/math-m1";
import {verifyMathM3Record} from "@/lib/math-m3-guards";
const hash=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
function reduce(n:number,d=1){let g=1;for(let i=1;i<=d;i++)if(n%i===0&&d%i===0)g=i;return d/g===1?String(n/g):n/g+"/"+d/g;}
function visible(x:MathModel){
 const n=(x.prompt.match(/\d+/g)??[]).map(Number);
 switch(x.operation){
 case "completar-igualdad-distributiva":{const [a,b,c,p,q,d]=n;expect(a).toBe(p);expect(b).toBe(q);const t=a*(b-c),k=p*(q+d)-t;return {key:reduce(k),step:reduce(t),wrong:[p*(q+d),a*(c-d),c+d].map(v=>reduce(v)),mid:[a*b-c,a*(b+c),b-c].map(v=>reduce(v))};}
 case "factor-desconocido-tras-cancelar":{const [a,b,c,p,q,d]=n;expect(a).toBe(p);expect(b).toBe(q);const t=a*(b+c)-p*q,k=t/d;return {key:reduce(k),step:reduce(t),wrong:[t,c/d,a].map(v=>reduce(v)),mid:[a*(b+c),c,-t].map(v=>reduce(v))};}
 case "raiz-racional-resta-agrupada":{const [rad,den,c,b,d,v]=n,p=Math.sqrt(rad),q=Math.sqrt(den);expect(q).toBe(b);expect(v).toBe(2*b);expect(Number.isInteger(p)).toBe(true);return {key:reduce(2*p-2*c+d,v),step:reduce(2*c-d,v),wrong:[reduce(-2*p-2*c+d,v),reduce(2*p-2*c-d,v),reduce(2*p-2*c+d,2*v)],mid:[reduce(2*c+d,v),reduce(c-d,3*b),reduce(c,b)]};}
 case "distribuir-sobre-raiz-racional":{const [factor,rad,den,c,v,d,b]=n,p=Math.sqrt(rad),q=Math.sqrt(den);expect(factor).toBe(2);expect(q).toBe(b);expect(v).toBe(2*b);expect(Number.isInteger(p)).toBe(true);return {key:reduce(2*p-c+d,b),step:reduce(2*p-c,v),wrong:[reduce(2*p-c+2*d,v),reduce(2*p+c+d,b),reduce(2*p-c-d,b)],mid:[reduce(2*p+c,v),reduce(p-c,3*b),reduce(p,b)]};}
 default:throw Error("R14 family");
 }
}
it("R14: 36 advanced successors, 414 preserved hashes, 216 distractors, 108 claims, inventory and exact rational oracle",()=>{
 const records=[],prompts=new Set<string>(),inventory=[];let beforeDominant=0,afterDominant=0;
 for(const level of MATH_LEVELS)for(const mode of MATH_MODES){
 const before=mathM3R13Pool("Aritmética","Operaciones",level,mode),now=mathM3Pool("Aritmética","Operaciones",level,mode);
 const dominant=level==="principiante"?"prioridad-de-operaciones":level==="intermedio"?"modificar-parentesis-y-factor":"distributiva-y-cancelacion";
 beforeDominant+=before.filter(x=>x.operation===dominant).length;afterDominant+=now.filter(x=>x.operation===dominant).length;
 inventory.push({level,mode,count:now.length,families:Object.fromEntries([...new Set(now.map(x=>x.operation!))].map(op=>[op,now.filter(x=>x.operation===op).length]))});
 expect(now.map(x=>x.id)).toEqual(before.map(x=>x.id));
 for(const [i,x] of now.entries()){
 if(x.oracle.kind!=="Operaciones-avanzadas"){expect(hash(x)).toBe(hash(before[i]));continue;}
 expect(level).toBe("avanzado");expect(before[i].oracle.kind).toBe("Operaciones");
 const o=visible(x);expect(prompts.has(x.prompt)).toBe(false);prompts.add(x.prompt);
 expect(x.expected).toBe(o.key);expect(reduce(x.oracle.intermediate.n,x.oracle.intermediate.d)).toBe(o.step);expect(verifyMathM3Record(x,level)).toEqual([]);
 expect(x.options.filter((_,j)=>j!==x.answerIndex).sort()).toEqual(o.wrong.sort());
 expect(x.steps[0].choices.filter((_,j)=>j!==x.steps[0].answerIndex).sort()).toEqual(o.mid.sort());
 expect(x.steps[0].choices[x.steps[0].answerIndex]).toBe(o.step);expect(x.steps[1].choices[x.steps[1].answerIndex]).toBe(o.key);
 for(const v of o.wrong)expect(x.optionExplanations?.[v]).toBeTruthy();for(const v of o.mid)expect(x.stepOptionExplanations?.[v]).toBeTruthy();
 for(const a of x.assertions){const v=a.text.match(/(-?\d+(?:\/\d+)?)\.$/)?.[1];expect(a.truth).toBe(v===(a.text.startsWith("El valor correcto del paso")?o.step:o.key));expect(x.assertionExplanations?.[a.text]).toBeTruthy();}
 expect(verifyMathM3Record({...x,expected:"999999"},level)).toContain("clave-distinta-oraculo");
 records.push({id:x.id,previous_sha256:hash(before[i]),content_sha256:hash(x),objective_ids:[x.operation!.includes("racional")?"OP-04":"OP-03"],level,mode,stimulus:x.prompt,expected:x.expected,intermediate:o.step,family:x.operation,steps:x.steps,assertions:x.assertions,explanation:x.explanation,optionExplanations:x.optionExplanations,stepOptionExplanations:x.stepOptionExplanations,assertionExplanations:x.assertionExplanations,semantic_status:"REVIEW"});
 }}
 expect(records).toHaveLength(36);expect(beforeDominant).toBe(231);expect(afterDominant).toBe(195);
 console.log("RDG_R14_INVENTORY "+JSON.stringify({beforeDominant,afterDominant,inventory}));
 for(let i=0;i<records.length;i+=3)console.log("RDG_R14_REVISIONS "+JSON.stringify(records.slice(i,i+3)));
});
