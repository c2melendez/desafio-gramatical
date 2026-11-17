#!/usr/bin/env node
/**
 * Barrera reproducible para secretos incrustados en código cliente y uso
 * de primitivas de ejecución dinámica. No sustituye auditoría de red.
 */
import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
const ROOT=path.resolve(import.meta.dirname,"..");
const IGNORE=new Set(["node_modules","dist",".git",".output","coverage"]);
const EXT=new Set([".js",".jsx",".ts",".tsx",".mjs",".html"]);
function files(dir){
  if(!fs.existsSync(dir))return [];
  return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{
    if(IGNORE.has(e.name))return [];
    const p=path.join(dir,e.name);
    return e.isDirectory()?files(p):EXT.has(path.extname(p))?[p]:[];
  });
}
export function inspect(source,filename){
  const findings=[];
  const rules=[
    ["private-key","-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----"],
    ["credential-assignment","(?:api[_-]?key|secret|password|access[_-]?token|auth[_-]?token)\\s*[:=]\\s*[\"'\\x60][A-Za-z0-9_\\-./+]{24,}[\"'\\x60]"],
    ["dynamic-eval","\\b(?:eval|new\\s+Function)\\s*\\("],
    ["unsafe-html","\\.innerHTML\\s*="],
  ];
  for(const [id,expression] of rules){
    const re=new RegExp(expression,"gi");
    let match;
    while((match=re.exec(source))!==null){
      const line=source.slice(0,match.index).split("\n").length;
      findings.push({file:filename,line,rule:id});
    }
  }
  return findings;
}
function test(){
  assert.deepEqual(inspect("const message = 'hola';","fixture"),[]);
  assert.deepEqual(inspect("const apiKey = 'abcdefghijklmnopqrstuvwx123456';","fixture").map(f=>f.rule),["credential-assignment"]);
  assert.deepEqual(inspect("eval(userInput)","fixture").map(f=>f.rule),["dynamic-eval"]);
  assert.deepEqual(inspect("el.innerHTML = value","fixture").map(f=>f.rule),["unsafe-html"]);
  assert.deepEqual(inspect("-----BEGIN PRIVATE KEY-----","fixture").map(f=>f.rule),["private-key"]);
  console.log("PASS: 5 casos de seguridad, incluidos 4 negativos");
}
if(process.argv.includes("--test"))test();
else{
  const paths=[...files(path.join(ROOT,"src")),...files(path.join(ROOT,"public"))];
  const hits=paths.flatMap(p=>inspect(fs.readFileSync(p,"utf8"),path.relative(ROOT,p)));
  const result={status:hits.length?"FAIL":"PASS",files_scanned:paths.length,findings:hits,
    scope:"Análisis estático: secretos incrustados, eval, Function e innerHTML. No audita tráfico, dependencias ni permisos reales."};
  console.log(JSON.stringify(result,null,2));
  if(hits.length)process.exitCode=1;
}
