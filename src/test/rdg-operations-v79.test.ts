import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import {expect,it} from "vitest";
import {MATH_LEVELS,MATH_MODES,type MathModel} from "@/lib/math-m1";
import {mathM3Pool} from "@/lib/math-m3";
import {selectOperationsRotation,OPERATIONS_FAMILY_CAP} from "@/lib/operations-rotation";
import {selectRotation,emptyRotation,type RotationState} from "@/lib/rotation";
import {OPERATIONS_ROUTE} from "@/lib/rdg/operations";
const load=(path:string)=>JSON.parse(readFileSync(path,"utf8"));
const distribution=load("qa/certification/rdg/evidence/MAT-ARIT-01-v79-distribucion.json"),pilot=load("qa/certification/rdg/evidence/MAT-ARIT-01-v79-piloto-OP04.json");
const sha=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
const rng=(seed:number)=>()=>((seed=Math.imul(seed,1664525)+1013904223|0)>>>0)/4294967296;
function counts(items:MathModel[]){const out:Record<string,number>={};for(const x of items)out[x.operation!]=(out[x.operation!]??0)+1;return out;}
function validate(items:MathModel[]){if(items.length!==10||new Set(items.map(x=>x.id)).size!==10||Object.values(counts(items)).some(n=>n>3))throw Error("distribution invalid");}
it("v7.9: actual nine cells, 450 IDs, balanced 10 rounds and within-family rotation priority",()=>{
 let tested=0,legacyViolations=0;const summaries=[];
 expect(OPERATIONS_FAMILY_CAP).toBe(3);
 for(const level of MATH_LEVELS)for(const mode of MATH_MODES){
 const pool=mathM3Pool("Aritmética","Operaciones",level,mode);
 const cell=distribution.cells[level+"/"+mode];expect(pool.length).toBe(cell.pool);expect(counts(pool)).toEqual(cell.families);
 for(let seed=1;seed<=256;seed++)for(const state of [emptyRotation(),{version:1 as const,seen:pool.filter((_,i)=>i%3!==0).map(x=>x.id),incorrect:pool.filter((_,i)=>i%7===0).map(x=>x.id),last:pool.slice(0,10).map(x=>x.id)}]){
 const ranked=selectRotation(pool,state,pool.length,rng(seed)),chosen=selectOperationsRotation(pool,state,10,rng(seed));validate(chosen);const selected=new Set(chosen.map(x=>x.id));
 for(const item of chosen)expect(ranked.slice(0,ranked.indexOf(item)).filter(x=>x.operation===item.operation).every(x=>selected.has(x.id))).toBe(true);
 if(Object.values(counts(ranked.slice(0,10))).some(n=>n>3)){legacyViolations++;expect(()=>validate(ranked.slice(0,10))).toThrow("distribution invalid");}
 tested++;
 }
 const dominant=Object.entries(counts(pool)).sort((a,b)=>b[1]-a[1])[0][0];const forced=pool.filter(x=>x.operation===dominant).slice(0,10);expect(()=>validate(forced)).toThrow("distribution invalid");
 expect(()=>selectOperationsRotation(pool.map(x=>({...x,operation:dominant})),emptyRotation(),10,rng(1))).toThrow("Capacidad insuficiente");
 summaries.push({level,mode,pool:pool.length,families:Object.keys(cell.families).length});
 }
 expect(tested).toBe(4608);expect(legacyViolations).toBeGreaterThan(0);
 console.log("RDG_V79_DISTRIBUTION "+JSON.stringify({tested,legacyViolations,cap:3,summaries}));
});
const norm=(s:string)=>s.normalize("NFKC").replace(/\s+/g,"").replace(/[−–]/g,"-").replace(/×/g,"*").replace(/÷/g,"/").toLowerCase();
const gcd=(a:number,b:number):number=>b?gcd(b,a%b):Math.abs(a)||1;
const fmt=(n:number,d:number)=>{const g=gcd(n,d);return d/g===1?String(n/g):n/g+"/"+d/g;};
function oracle(prompt:string){const a=prompt.match(/^Calcula √\((\d+)\/(\d+)\) \+ (?:(\d+) × \((\d+)\/(\d+)\)|(\d+)\/(\d+)) − (\d+)\/(\d+)\.$/);if(!a)throw Error("stimulus");
 const p=Math.sqrt(+a[1]),d=Math.sqrt(+a[2]),k=a[3]?+a[3]:1,n=+(a[4]??a[6]),nd=+(a[5]??a[7]),m=+a[8],den=+a[9];
 if(!Number.isInteger(p)||!Number.isInteger(d)||nd!==d||den%d!==0)throw Error("domain");
 const rn=p*den/d,prod=k*n*den/d,total=rn+prod-m;return {answer:fmt(total,den),root:fmt(p,d),wrong:[fmt(-rn+prod-m,den),k===1?fmt(total,3*den):fmt(rn+n*den/d-m,den),fmt(rn+prod,den)]};
}
function verify(x:MathModel){const o=oracle(x.prompt);if(x.expected!==o.answer||x.options[x.answerIndex]!==o.answer||new Set(x.options).size!==4||JSON.stringify(x.options.filter(y=>y!==o.answer).sort())!==JSON.stringify(o.wrong.sort()))throw Error("oracle mismatch");return o;}
it("v7.9: eighteen OP04 candidate IDs match current hashes, visible independent oracle and no exact prompt collisions",()=>{
 const bank=MATH_LEVELS.flatMap(l=>MATH_MODES.flatMap(m=>mathM3Pool("Aritmética","Operaciones",l,m)));
 const tasks=[...OPERATIONS_ROUTE.lessons,...OPERATIONS_ROUTE.transfer];
 expect(bank).toHaveLength(450);expect(pilot.records).toHaveLength(18);let mutants=0;
 for(const f of pilot.records){const x=bank.find(y=>y.id===f.id)!;expect(sha(x)).toBe(f.content_hash);expect(x.prompt).toBe(f.stimulus);expect(x.operation).toBe(f.family_id);
 const o=verify(x);expect(o.answer).toBe(f.respuesta_esperada);expect(o.root).toBe(f.oraculo_independiente.root);
 expect(bank.filter(y=>norm(y.prompt)===norm(x.prompt)).map(y=>y.id)).toEqual([x.id]);expect(tasks.filter(y=>norm(y.prompt)===norm(x.prompt))).toEqual([]);
 const wrong=x.options.find(y=>y!==x.expected)!;expect(()=>verify({...x,expected:wrong})).toThrow("oracle mismatch");mutants++;
 expect(()=>verify({...x,options:[x.expected,x.expected,...x.options.filter(y=>y!==x.expected).slice(0,2)]})).toThrow("oracle mismatch");mutants++;
 if(x.mode==="construir")expect(x.steps[0].choices[x.steps[0].answerIndex]).toBe(o.root);
 if(x.mode==="clasificar")expect(x.assertions).toEqual(f.assertions);
 expect(f.semantic_status).toBe("REVIEW");expect(f.rubric.G.score).toBe(2);
 }
 expect(mutants).toBe(36);console.log("RDG_V79_OP04 "+JSON.stringify({ids:18,mutants,exact_prompt_collisions:0,semantic_pass:0}));
});
