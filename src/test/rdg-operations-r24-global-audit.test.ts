import {execFileSync} from "node:child_process";
import {expect,it} from "vitest";
// @ts-expect-error JavaScript module has no declaration.
import {operationInverseR22FromPrompt} from "../../scripts/oracle-operation-inverse-r22.mjs";
it("R22 visible oracle: exact solutions and rejection of malformed, degenerate and noninteger equations",()=>{
 const cases=[
 ["Completa 35 × □ − (35 − 6) × □ = 48. El mismo entero sustituye ambos cuadros. ¿Cuál es?",8],
 ["Completa 80 − [12 − □ × (18 − 3)] = 128. ¿Qué entero sustituye □?",4],
 ["Completa (√81 − 2) × (□ + √25) − 4 = 101. ¿Qué entero sustituye □?",10]
 ] as const;
 for(const [p,k] of cases)expect(operationInverseR22FromPrompt(p)).toEqual({n:k,d:1});
 for(const p of [
 "Completa 35 × □ − (35 − 0) × □ = 48. El mismo entero sustituye ambos cuadros. ¿Cuál es?",
 "Completa 35 × □ − (35 − 6) × □ = 47. El mismo entero sustituye ambos cuadros. ¿Cuál es?",
 "Completa 80 − [12 − □ × (18 − 18)] = 128. ¿Qué entero sustituye □?",
 "Completa (√82 − 2) × (□ + √25) − 4 = 101. ¿Qué entero sustituye □?",
 "Completa (√81 − 9) × (□ + √25) − 4 = 101. ¿Qué entero sustituye □?",
 "Respuesta: 8"
 ])expect(()=>operationInverseR22FromPrompt(p)).toThrow();
});
it("R24 full candidate audit: 9900 IDs and 198 cells with unchanged quotas",()=>{
 const report=JSON.parse(execFileSync(process.execPath,["--import","./scripts/ts-resolve.mjs","scripts/audit-math-m3.mjs","--r24-candidate"],{encoding:"utf8",timeout:90000,maxBuffer:8*1024*1024}));
 expect(report.status).toBe("PASS");expect(report.scope).toBe("R24_CANDIDATE");expect(report.counts.cells).toBe(198);expect(report.counts.unique_ids).toBe(9900);expect(report.issues).toEqual([]);
 console.log("RDG_R24_M3_CANDIDATE "+JSON.stringify({counts:report.counts,status:report.status,scope:report.scope,sha:report.sha}));
},100000);
