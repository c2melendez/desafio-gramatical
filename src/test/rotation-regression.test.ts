import { describe, expect, it } from "vitest";
import {
  emptyRotation,
  parseRotation,
  recordRotation,
  rotationKey,
  selectRotation,
} from "@/lib/rotation";

const pool = ["a","b","c","d"].map(id=>({id}));

describe("M0: regresión de rotación y preservación de historial",()=>{
  it("separa el progreso por subtema, modalidad y dificultad",()=>{
    const a=rotationKey("espanol","Gramática","Sinónimos","quiz","intermedio");
    const b=rotationKey("espanol","Gramática","Cohesión","quiz","intermedio");
    const c=rotationKey("espanol","Gramática","Sinónimos","clasificar","intermedio");
    expect(new Set([a,b,c]).size).toBe(3);
  });
  it("recupera una sesión válida y descarta IDs obsoletos y repetidos",()=>{
    const result=parseRotation(JSON.stringify({
      version:1,seen:["a","a","missing"],incorrect:["b","missing"],last:["a","a","missing"]
    }),["a","b"]);
    expect(result).toEqual({version:1,seen:["a"],incorrect:["b"],last:["a"]});
    expect(parseRotation("{invalid",["a"])).toEqual(emptyRotation());
  });
  it("prioriza material no visto y conserva los errores para posteriores sesiones",()=>{
    const state={version:1 as const,seen:["a","b"],incorrect:["b"],last:["a"]};
    const chosen=selectRotation(pool,state,4,()=>0);
    expect(new Set(chosen.map(x=>x.id)).size).toBe(chosen.length);
    expect(chosen.slice(0,2).map(x=>x.id).sort()).toEqual(["c","d"]);
    expect(chosen[2].id).toBe("b");
  });
  it("actualiza errores sin borrar otros elementos y limita historial reciente",()=>{
    let state=emptyRotation();
    state=recordRotation(state,"a",false);
    expect(state.incorrect).toEqual(["a"]);
    state=recordRotation(state,"a",true);
    expect(state.incorrect).toEqual([]);
    for(let i=0;i<20;i++)state=recordRotation(state,`x-${i}`,true);
    expect(state.last).toHaveLength(10);
    expect(state.seen).toContain("a");
  });
  it("rechaza sesiones inválidas o IDs duplicados",()=>{
    expect(()=>selectRotation(pool,emptyRotation(),-1)).toThrow(RangeError);
    expect(()=>selectRotation([{id:"a"},{id:"a"}],emptyRotation(),2)).toThrow(/duplicados/);
    expect(selectRotation(pool,emptyRotation(),100)).toHaveLength(4);
  });
});
