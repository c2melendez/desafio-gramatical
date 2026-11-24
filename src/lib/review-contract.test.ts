import {describe,it,expect} from "vitest";
import {validateReview,type ReviewUnit,type InventoryExercise} from "./review-contract";
// Synthetic fixtures only: not research or academic evidence.
const inventory:InventoryExercise[]=[{id:"b",depth:"principiante"},{id:"i",depth:"intermedio"},{id:"a",depth:"avanzado"}];
const fixture=():ReviewUnit=>({
 area:"fixture",topic:"fixture",subtopic:"fixture",version:"1",
 research:{sources:["discipline","didactic","didactic"].map((kind,i)=>({id:"s"+i,url:"https://example.invalid/"+i,title:"Fixture "+i,kind:kind as "discipline"|"didactic",finding:"Synthetic finding",limitations:"Not academic evidence"})),alternatives:[{method:"map",rationale:"Fixture A"},{method:"table",rationale:"Fixture B"}],chosenMethod:"map"},
 objectives:inventory.map(e=>({id:"o"+e.id,statement:"Fixture objective "+e.id,depth:e.depth,assessable:true})),
 blocks:[
 {id:"map",kind:"concept-map",title:"Fixture map",objectiveIds:["ob","oi","oa"],sourceIds:["s0","s1"],content:"Synthetic content",visual:{nodes:[{id:"n1",label:"A"},{id:"n2",label:"B"}],edges:[{from:"n1",to:"n2",label:"relates"}]}},
 ...(["worked-example","counterexample","common-error"] as const).map(kind=>({id:kind,kind,title:kind,objectiveIds:["ob"],sourceIds:["s0"],content:"Synthetic example"}))
 ],
 links:inventory.map(e=>({exerciseId:e.id,objectiveIds:["o"+e.id]}))
});
type Mutation=[string,(u:ReviewUnit,i:InventoryExercise[])=>void,string];
const mutations:Mutation[]=[
 ["no disciplinary source",u=>{u.research.sources=u.research.sources.slice(1);},"R01 falta fuente disciplinar"],
 ["duplicate didactic URL",u=>{u.research.sources[2].url=u.research.sources[1].url;},"R01 faltan dos"],
 ["missing source limitation",u=>{u.research.sources[0].limitations="";},"R01 fuente incompleta"],
 ["no alternative",u=>{u.research.alternatives.pop();},"R01 elección"],
 ["missing linked source",u=>{u.blocks[0].sourceIds=["missing"];},"R01 fuente no enlazada"],
 ["missing visual",u=>{delete u.blocks[0].visual;},"R02 falta organizador"],
 ["dangling visual edge",u=>{u.blocks[0].visual!.edges[0].to="missing";},"R02 diagrama inválido"],
 ["missing worked example",u=>{u.blocks.splice(1,1);},"R02 falta worked-example"],
 ["missing counterexample",u=>{u.blocks.splice(2,1);},"R02 falta counterexample"],
 ["missing common error",u=>{u.blocks.pop();},"R02 falta common-error"],
 ["empty inventory",(_,i)=>{i.splice(0);},"R04 inventario vacío"],
 ["duplicate exercise",(_,i)=>{i.push({...i[0]});},"R04 inventario: IDs"],
 ["orphan exercise",u=>{u.links.pop();},"R04 ejercicio huérfano"],
 ["foreign exercise",u=>{u.links[0].exerciseId="foreign";},"R04 ejercicio ajeno"],
 ["empty objective mapping",u=>{u.links[0].objectiveIds=[];},"R04 ejercicio sin objetivos"],
 ["unassessed objective",u=>{u.objectives.push({...u.objectives[0],id:"extra"});u.blocks[0].objectiveIds.push("extra");},"R04 objetivo sin evaluación"],
 ["untaught objective",u=>{u.blocks[0].objectiveIds=["ob","oi"];},"R04 objetivo no enseñado"],
 ["incompatible depth",u=>{u.links[0].objectiveIds=["oa"];},"R04 profundidad incompatible"],
 ["insufficient depth",u=>{u.links[2].objectiveIds=["ob"];},"R04 falta objetivo de profundidad equivalente"],
 ["unjustified exemption",u=>{u.objectives[0].assessable=false;},"R04 excepción sin justificar"],
 ["duplicate mapping",u=>{u.links.push({...u.links[0]});},"R04 enlaces: IDs"],
 ["blank identity",u=>{u.version="";},"R05 identidad incompleta"]
];
describe("C09 structural validator",()=>{
 it("accepts a complete synthetic fixture",()=>expect(validateReview(fixture(),structuredClone(inventory))).toEqual([]));
 it.each(mutations)("rejects mutation %s",(_,mutate,expected)=>{
  const u=fixture(),i=structuredClone(inventory);mutate(u,i);
  expect(validateReview(u,i).some(e=>e.includes(expected))).toBe(true);
 });
 it("permits a justified, taught non-assessable prerequisite without a game link",()=>{
  const u=fixture();u.objectives.push({id:"context",statement:"Fixture prerequisite",depth:"principiante",assessable:false,exceptionReason:"Context only"});u.blocks[0].objectiveIds.push("context");
  expect(validateReview(u,inventory)).toEqual([]);
 });
});
