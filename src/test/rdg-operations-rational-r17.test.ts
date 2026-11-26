import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import {expect,it} from "vitest";
import {mathM3Pool,mathM3R16Pool} from "@/lib/math-m3";
import {MATH_LEVELS,MATH_MODES} from "@/lib/math-m1";
import {verifyMathM3Record} from "@/lib/math-m3-guards";
const sha=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
const evidence=JSON.parse(readFileSync("qa/certification/rdg/evidence/MAT-ARIT-01-R4-01-OP04-review.json","utf8"));
it("R17 removes constant truth count and complementary root claims, preserves 444 IDs and independently checks six successors",()=>{
 const targets=new Map<string,{previous_sha256:string,claims:{text:string,truth:boolean,reason:string}[]}>(evidence.proposed_repairs.map((x:{id:string,previous_sha256:string,claims:{text:string,truth:boolean,reason:string}[]})=>[x.id,x]));
 let changed=0,preserved=0;const truthCounts=new Set<number>();
 for(const l of MATH_LEVELS)for(const m of MATH_MODES){const before=mathM3R16Pool("Aritmética","Operaciones",l,m),after=mathM3Pool("Aritmética","Operaciones",l,m);
 for(const [i,x] of after.entries()){const old=before[i],row=targets.get(x.id);expect(x.id).toBe(old.id);
 if(!row){expect(sha(x)).toBe(sha(old));preserved++;continue;}
 expect(sha(old)).toBe(row.previous_sha256);expect(sha(x)).not.toBe(sha(old));expect(old.assertions.filter(a=>a.truth)).toHaveLength(1);
 const nums=(x.prompt.match(/\d+/g)??[]).map(Number),advanced=l==="avanzado",p=Math.sqrt(nums[0]),d=Math.sqrt(nums[1]),den=nums.at(-1)!,n=nums[advanced?3:2],k=advanced?nums[2]:1,sub=nums.at(-2)!;
 const expected=[p/d,k*n*den/d,p/d+k*n/d-sub/den];
 const number=(s:string)=>{const [a,b=1]=s.split("/").map(Number);return a/b;};
 for(const a of x.assertions){const index=a.text.startsWith("La raíz")?0:a.text.startsWith("El término central")?1:2;const val=a.text.match(/(-?\d+(?:\/\d+)?)\.$/)?.[1];expect(val).toBeDefined();expect(a.truth).toBe(Math.abs(number(val!)-expected[index])<1e-10);const rec=row.claims.find(c=>c.text===a.text)!;expect(rec.truth).toBe(a.truth);expect(x.assertionExplanations?.[a.text]).toBe(rec.reason);}
 truthCounts.add(x.assertions.filter(a=>a.truth).length);expect(x.prompt).toBe(old.prompt);expect(x.expected).toBe(old.expected);expect(x.options).toEqual(old.options);expect(x.steps).toEqual(old.steps);expect(x.oracle).toEqual(old.oracle);expect(verifyMathM3Record(x,l)).toEqual([]);expect(verifyMathM3Record({...x,assertions:[x.assertions[0],x.assertions[0],x.assertions[2]]},l)).toContain("clasificacion-invalida");changed++;
 console.log("RDG_R17_SUCCESSOR "+JSON.stringify({id:x.id,previous_sha256:sha(old),content_sha256:sha(x),semantic_status:"REVIEW",assertions:x.assertions}));
 }}
 expect(changed).toBe(6);expect(preserved).toBe(444);expect([...truthCounts].sort()).toEqual([1,2]);
});
