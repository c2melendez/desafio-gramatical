import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import {expect,it,vi,afterEach} from "vitest";
import {cleanup,fireEvent,render,screen} from "@testing-library/react";
import {MathExerciseCard,operationChoiceOrder} from "@/components/games/MathExerciseCard";
import {mathM3Pool} from "@/lib/math-m3";
import {MATH_LEVELS,MATH_MODES,type MathModel} from "@/lib/math-m1";
import {OPERATIONS_ROUTE} from "@/lib/rdg/operations";
afterEach(cleanup);
const hash=(x:unknown)=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
const load=(p:string)=>JSON.parse(readFileSync(p,"utf8"));
const prior=load("qa/certification/rdg/evidence/MAT-ARIT-01-R15-successors.json");
const bank=MATH_LEVELS.flatMap(l=>MATH_MODES.flatMap(m=>mathM3Pool("Aritmética","Operaciones",l,m)));
const candidates=bank.filter(x=>x.oracle.kind==="Operaciones-decision");
const norm=(s:string)=>s.normalize("NFKC").toLowerCase().replace(/\s+/g,"").replace(/[−–]/g,"-");
const tasks=[...OPERATIONS_ROUTE.lessons,...OPERATIONS_ROUTE.transfer];
const rat=(n:number,d=1)=>{const gcd=(a:number,b:number):number=>b?gcd(b,a%b):Math.abs(a)||1;const g=gcd(n,d);return d/g===1?String(n/g):n/g+"/"+d/g;};
const add=(n:number,k:number)=>Array.from({length:k},()=>n).reduce((s,v)=>s+v,0);
function independent(x:MathModel){
 if(x.operation==="comparar-ofertas-con-cargos-fijos"){
  const m=x.prompt.match(/^Para comprar (\d+) cuadernos, la tienda A cobra L (\d+) por cuaderno más L (\d+) por el pedido; la B cobra L (\d+) por cuaderno más L (\d+) por el pedido\. ¿Cuál es el costo de B menos el costo de A, en lempiras\?$/);if(!m)throw Error("stimulus");
  const [n,p,f,v,h]=m.slice(1).map(Number),a=add(p,n)+f,b=add(v,n)+h;
  return {answer:String(b-a),step:String(a),aux:String(h-f),wrong:[b,add(v-p,n),a-b].map(String),mid:[add(p,n),add(p,n+f),n+p+f].map(String),signature:"cost|"+[n,p,f,v,h].join("|")};
 }
 const m=x.prompt.match(/^Calcula \(√\((\d+)\/(\d+)\) − (\d+)\/(\d+)\) ÷ (\d+)\. Expresa una fracción simplificada\.$/);if(!m)throw Error("stimulus");
 const [rad,den,c,v,d]=m.slice(1).map(Number);
 const root=(z:number)=>{let i=0;while(i*i<z)i++;if(i*i!==z)throw Error("root");return i;};
 const a=root(rad),b=root(den);if(d<=0||b<=0||v<=0)throw Error("domain");
 const n=a*v-c*b,k=b*v;
 return {answer:rat(n,k*d),step:rat(n,k),aux:rat(a,b),wrong:[rat(n,k),rat(n*d,k),rat(-a*v-c*b,k*d)],mid:[rat(a*v+c*b,k),rat(-a*v-c*b,k),rat(a-c,b+v)],signature:"root|"+rat(a,b)+"|"+rat(c,v)+"|"+d};
}
function validate(x:MathModel){
 const o=independent(x);if(x.expected!==o.answer||x.options[x.answerIndex]!==o.answer||x.steps[0].choices[x.steps[0].answerIndex]!==o.step||x.steps[1].choices[x.steps[1].answerIndex]!==o.answer)throw Error("wrong key");
 if(new Set(x.options).size!==4||new Set(x.steps[0].choices).size!==4||JSON.stringify(x.options.filter((_,i)=>i!==x.answerIndex).sort())!==JSON.stringify(o.wrong.sort())||JSON.stringify(x.steps[0].choices.filter((_,i)=>i!==x.steps[0].answerIndex).sort())!==JSON.stringify(o.mid.sort()))throw Error("wrong alternatives");
 for(const v of o.wrong)if(!x.optionExplanations?.[v])throw Error("missing option cause");
 for(const v of o.mid)if(!x.stepOptionExplanations?.[v])throw Error("missing step cause");
 for(const a of x.assertions){const v=a.text.match(/(-?\d+(?:\/\d+)?)\.$/)?.[1];const target=a.text.startsWith("El resultado solicitado")?o.answer:a.text.startsWith("El valor correcto del paso")?o.step:o.aux;if(a.truth!==(v===target))throw Error("wrong assertion");}
 return o;
}
it("R15 current 18 IDs: independent exact arithmetic, hashes and individual alternative evidence",()=>{
 expect(bank).toHaveLength(450);expect(candidates).toHaveLength(18);const signatures=new Set<string>();
 for(const x of candidates){const f=prior.records.find((y:{id:string})=>y.id===x.id);expect(f.content_sha256).toBe(hash(x));const o=validate(x);expect(signatures.has(o.signature)).toBe(false);signatures.add(o.signature);
  const matches=bank.filter(y=>y.id!==x.id&&norm(y.prompt)===norm(x.prompt));const rdgMatches=tasks.filter(y=>norm(y.prompt)===norm(x.prompt));
  expect(matches).toEqual([]);expect(rdgMatches).toEqual([]);
  expect(()=>validate({...x,expected:"999999"})).toThrow("wrong key");
  expect(()=>validate({...x,options:x.options.map(()=>x.expected)})).toThrow("wrong alternatives");
  expect(()=>validate({...x,optionExplanations:{}})).toThrow("missing option cause");
  expect(()=>validate({...x,stepOptionExplanations:{}})).toThrow("missing step cause");
  console.log("RDG_R15_V79_RUNTIME "+JSON.stringify({id:x.id,hash:hash(x),mode:x.mode,level:x.level,prompt:x.prompt,operation:x.operation,oracle:o,options:x.options,answerIndex:x.answerIndex,steps:x.steps,assertions:x.assertions,optionExplanations:x.optionExplanations,stepOptionExplanations:x.stepOptionExplanations,assertionExplanations:x.assertionExplanations,exact_collisions:0,semantic_status:"REVIEW"}));
 }
});
function card(x:MathModel){return render(<MathExerciseCard item={x} onResult={vi.fn()} onNext={vi.fn()} isLast={false}/>);}
it("R15: all wrong selections and construction alternatives render the exact chosen cause",()=>{
 let count=0;
 for(const x of candidates.filter(x=>x.mode==="quiz"||x.mode==="construir")){
  if(x.mode==="quiz"){for(const value of x.options.filter((_,i)=>i!==x.answerIndex)){card(x);fireEvent.click(screen.getByRole("button",{name:value,exact:true}));expect(screen.getByTestId("learning-feedback")).toHaveTextContent(x.optionExplanations![value]);cleanup();count++;}}
  else for(let i=0;i<2;i++)for(const value of x.steps[i].choices.filter((_,j)=>j!==x.steps[i].answerIndex)){card(x);for(let j=0;j<2;j++){const s=x.steps[j];fireEvent.click(screen.getByRole("button",{name:j===i?value:s.choices[s.answerIndex],exact:true}));}
   expect(screen.getByTestId("learning-feedback")).toHaveTextContent((i===0?x.stepOptionExplanations:x.optionExplanations)![value]);expect(screen.getByTestId("learning-feedback")).toHaveTextContent("El valor correcto de este paso es "+x.steps[i].choices[x.steps[i].answerIndex]);cleanup();count++;}
 }
 expect(count).toBe(54);console.log("RDG_R15_V79_UI "+JSON.stringify({choice_cases:count}));
});
it("All explicit operation assertion-feedback families render the mistaken claim, including R15",()=>{
 const families=new Map<string,MathModel>();
 for(const x of bank.filter(x=>x.mode==="clasificar"&&x.assertionExplanations&&x.assertions.every(a=>x.assertionExplanations?.[a.text])))families.set(x.oracle.kind,x);
 expect(families.has("Operaciones-decision")).toBe(true);
 let count=0;
 for(const x of families.values()){card(x);for(const a of x.assertions)fireEvent.click(screen.getByRole("button",{name:a.truth?"Falso":"Verdadero",exact:true}));for(const a of x.assertions){expect(screen.getByTestId("learning-feedback")).toHaveTextContent(a.text);expect(screen.getByTestId("learning-feedback")).toHaveTextContent(x.assertionExplanations![a.text]);count++;}cleanup();}
 console.log("RDG_OPERATION_UI_FAMILIES "+JSON.stringify({kinds:[...families.keys()],assertion_errors:count}));
});

it("R15: presentation independently permutes all choices, preserves original scoring and selected-error identity",()=>{
 const rng=(seed:number)=>()=>((seed=Math.imul(seed,1664525)+1013904223|0)>>>0)/4294967296;
 const permutations=new Set<string>();for(let seed=1;seed<=256;seed++){const order=operationChoiceOrder(4,rng(seed));expect([...order].sort()).toEqual([0,1,2,3]);permutations.add(order.join(""));}
 expect(permutations.size).toBe(24);
 let correct=0,errors=0;
 for(const x of candidates.filter(y=>y.mode==="quiz"||y.mode==="construir")){
  const before=hash(x);const options=x.mode==="quiz"?[x.options]:x.steps.map(s=>s.choices);const keys=x.mode==="quiz"?[x.answerIndex]:x.steps.map(s=>s.answerIndex);
  const orderSignatures=new Set<string>();
  for(const random of [0,0.999999]){
   const spy=vi.spyOn(Math,"random").mockReturnValue(random);const report=vi.fn();
   try{render(<MathExerciseCard item={x} onResult={report} onNext={vi.fn()} isLast={false}/>);}finally{spy.mockRestore();}
   const signatures:string[]=[];for(let i=0;i<options.length;i++){const displayed=screen.getAllByRole("button").map(b=>b.textContent!);expect([...displayed].sort()).toEqual([...options[i]].sort());signatures.push(displayed.join("|"));fireEvent.click(screen.getByRole("button",{name:options[i][keys[i]],exact:true}));}
   expect(report).toHaveBeenCalledWith(true,options.map((o,i)=>o[keys[i]]).join(" → "));orderSignatures.add(signatures.join(";"));cleanup();correct++;
  }
  expect(orderSignatures.size).toBe(2);
  const report=vi.fn();render(<MathExerciseCard item={x} onResult={report} onNext={vi.fn()} isLast={false}/>);
  const wrong=options[0].find((_,i)=>i!==keys[0])!;
  for(let i=0;i<options.length;i++)fireEvent.click(screen.getByRole("button",{name:i===0?wrong:options[i][keys[i]],exact:true}));
  expect(report).toHaveBeenCalledWith(false,[wrong,...options.slice(1).map((o,i)=>o[keys[i+1]])].join(" → "));expect(screen.getByTestId("learning-feedback")).toHaveTextContent((x.mode==="quiz"?x.optionExplanations:x.stepOptionExplanations)![wrong]);cleanup();errors++;expect(hash(x)).toBe(before);
 }
 expect(correct).toBe(24);expect(errors).toBe(12);console.log("RDG_R15_POSITION "+JSON.stringify({permutations:permutations.size,correct,errors,models_unchanged:12}));
});
