import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import {expect,it,vi,afterEach} from "vitest";
import {cleanup,fireEvent,render,screen} from "@testing-library/react";
import {mathM3Pool} from "@/lib/math-m3";
import {MATH_LEVELS} from "@/lib/math-m1";
import {operationR20WrongCause} from "@/lib/math-operations-r20-error-cause";
import {MathExerciseCard} from "@/components/games/MathExerciseCard";
afterEach(cleanup);
const evidence=JSON.parse(readFileSync("qa/certification/rdg/evidence/MAT-ARIT-01-R20-feedback-causes.json","utf8"));
const hash=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
it("R20: 59 exact models, all false claims have concrete possible error causes visible in the UI",()=>{
 const bank=MATH_LEVELS.flatMap(l=>mathM3Pool("Aritmética","Operaciones",l,"clasificar"));
 let falseClaims=0,trueClaims=0;
 for(const f of evidence.records){const x=bank.find(y=>y.id===f.id)!;expect(hash(x)).toBe(f.content_hash);expect(x.prompt).toBe(f.stimulus);
 const report=vi.fn();render(<MathExerciseCard item={x} onResult={report} onNext={vi.fn()} isLast={false}/>);
 for(const a of x.assertions){const d=f.decisions.find((v:{text:string})=>v.text===a.text);expect(d.truth).toBe(a.truth);expect(operationR20WrongCause(x,a.text)??null).toBe(d.possible_error_model);fireEvent.click(screen.getByRole("button",{name:a.truth?"Falso":"Verdadero",exact:true}));}
 expect(report).toHaveBeenCalledWith(false,x.assertions.map(a=>a.truth?"Falso":"Verdadero").join(" · "));
 for(const a of x.assertions){const d=f.decisions.find((v:{text:string})=>v.text===a.text);const fb=screen.getByTestId("learning-feedback");expect(fb).toHaveTextContent(x.assertionExplanations![a.text]);if(!a.truth){expect(fb).toHaveTextContent(d.possible_error_model);falseClaims++;}else trueClaims++;}
 expect(hash(x)).toBe(f.content_hash);cleanup();}
 expect(falseClaims).toBe(evidence.summary.false_claims);expect(trueClaims).toBe(evidence.summary.true_claims);expect(falseClaims+trueClaims).toBe(177);
 console.log("RDG_R20_FEEDBACK_CAUSES "+JSON.stringify({ids:59,falseClaims,trueClaims,hashes_preserved:59}));
},45000);
