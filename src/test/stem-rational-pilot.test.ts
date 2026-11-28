import { describe, expect, it } from "vitest";
import { createHash } from "node:crypto";
import { mathM3Pool } from "../lib/math-m3";
import fixture from "../../qa/stem/arithmetic-pilot.json";

const bank=mathM3Pool("Aritmética","Operaciones","intermedio","clasificar");
describe("STEM pilot: frozen PHUMA stimulus and native bank",()=>{
  it.each(fixture.cases)("$id", (c)=>{
    const item=bank.find(x=>x.id===c.id);
    expect(item).toBeDefined();
    expect(item?.prompt).toBe(c.stimulus);
    expect(item?.expected).toBe(c.expected);
    expect(createHash("sha256").update(JSON.stringify(item)).digest("hex")).toBe(c.content_hash);
  });
});
