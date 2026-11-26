import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import {expect,it} from "vitest";
import {OPERATIONS_ROUTE} from "@/lib/rdg/operations";
import {MATH_LEVELS,MATH_MODES,type MathModel} from "@/lib/math-m1";
import {mathM3HistoricalPool as mathM3Pool} from "@/lib/math-m3";
const load=(path:string)=>JSON.parse(readFileSync(path,"utf8"));
const sha=(value:Buffer|string)=>createHash("sha256").update(value).digest("hex");
const contract=load("qa/certification/rdg/contracts/MAT-ARIT-01-R4-candidate.json");
const historical=load("qa/certification/rdg/contracts/MAT-ARIT-01.json");
const evidence=load("qa/certification/rdg/evidence/MAT-ARIT-01-P2-preflight.json");
const assertDependencies=(expected:Record<string,string>,read:(p:string)=>Buffer)=>{
 for(const [path,hash] of Object.entries(expected))if(sha(read(path))!==hash)throw Error("RDG dependency changed: "+path);
};
it("R05/R06 verifies exact published plan, route, data and source hashes and detects mutations",()=>{
 expect(historical.status).toBe("RDG_READY");expect(historical.revision).toBe("3");
 expect(contract.status).toBe("RDG_EN_CURSO");
 assertDependencies(contract.dependency_hashes,p=>readFileSync(p));
 expect(contract.plan_sha256).toBe(OPERATIONS_ROUTE.planSha256);
 expect(contract.revision).toBe(OPERATIONS_ROUTE.revision);
 expect([...contract.objective_ids]).toEqual([...OPERATIONS_ROUTE.objectives]);
 for(const path of Object.keys(contract.dependency_hashes)){
  expect(()=>assertDependencies(contract.dependency_hashes,p=>p===path?Buffer.concat([readFileSync(p),Buffer.from("\n")]):readFileSync(p))).toThrow("RDG dependency changed: "+path);
 }
});
it("reconciles all 450 archived real preflight records with archived R3 runtime bytes; detects stale item hash",()=>{
 const map=new Map<string,MathModel>();
 for(const level of MATH_LEVELS)for(const mode of MATH_MODES)for(const x of mathM3Pool("Aritmética","Operaciones",level,mode))map.set(x.id,x);
 expect(map.size).toBe(450);expect(evidence.records).toHaveLength(450);
 expect(new Set(evidence.records.map((r:{id:string})=>r.id)).size).toBe(450);
 const check=(r:{id:string;content_sha256:string},item:MathModel)=>{if(item.id!==r.id||sha(JSON.stringify(item))!==r.content_sha256)throw Error("Stale item "+r.id);};
 for(const r of evidence.records){const item=map.get(r.id);expect(item,r.id).toBeDefined();check(r,item!);expect(r.semantic_status).toBe("REVIEW");}
 const r=evidence.records[0],x=map.get(r.id)!;expect(()=>check(r,{...x,expected:"99999"})).toThrow("Stale item");
});
