import {describe,it,expect} from "vitest";
import {mathM3Pool} from "@/lib/math-m3";
import {verifyMathM3Cell,verifyMathM3Record} from "@/lib/math-m3-guards";
describe("Matemáticas M3 — mutaciones negativas de validadores",()=>{
 const level="avanzado" as const;
 const base=()=>mathM3Pool("Geometría","Pitágoras",level,"quiz")[0];
 it("rechaza ID duplicado, nivel cruzado y clave incorrecta",()=>{
  const item=base();
  expect(verifyMathM3Record(item,level)).toEqual([]);
  expect(verifyMathM3Cell([item,item],level)).toContain("id-duplicado");
  expect(verifyMathM3Record({...item,level:"principiante"},level)).toContain("nivel-incorrecto");
  expect(verifyMathM3Record({...item,expected:"999999"},level)).toContain("clave-distinta-oraculo");
 });
 it("rechaza dos distractores equivalentes y pérdida de solución",()=>{
  const item=base();
  expect(verifyMathM3Record({...item,options:[item.expected,item.expected,"2","3"]},level))
   .toContain("seleccion-invalida");
  expect(verifyMathM3Record({...item,steps:[{...item.steps[0],choices:["1","1","2","3"]},item.steps[1]]},level))
   .toContain("construccion-invalida");
  expect(verifyMathM3Record({...item,assertions:item.assertions.map(x=>({...x,truth:true}))},level))
   .toContain("clasificacion-invalida");
 });
 it("rechaza un estímulo esencial ausente y evidencia cognitiva degradada",()=>{
  const item=base();
  expect(verifyMathM3Record({...item,visual:undefined},level)).toContain("integracion-visual-invalida");
  expect(verifyMathM3Record({...item,cognitiveStage:1},level)).toContain("evidencia-cognitiva-invalida");
 });
});
