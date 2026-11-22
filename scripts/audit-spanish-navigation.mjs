/** Regresión E2E: avance real de juegos de Español (legado, Lectura, Redacción). */
import {pathToFileURL} from "node:url";
import {resolve} from "node:path";
import {mkdirSync,writeFileSync} from "node:fs";
const root=process.env.M4_PLAYWRIGHT_ROOT??"/tmp/m4-playwright";
const {chromium}=await import(pathToFileURL(resolve(root,"node_modules/playwright/index.mjs")).href);
const base=process.env.M4_BASE_URL??"http://127.0.0.1:4173";
const cases=[
 {name:"gramatica-quiz",route:"/jugar?modo=quiz&nivel=principiante",rounds:2},
 {name:"gramatica-clasificar",route:"/jugar?modo=clasificar&nivel=principiante",rounds:10},
 {name:"gramatica-construir",route:"/jugar?modo=construir&nivel=principiante",rounds:2},
 ...["quiz","clasificar","construir"].map(mode=>({name:"lectura-"+mode,route:"/lectura?subtema=Idea%20principal&modo="+mode+"&nivel=principiante",rounds:2})),
 ...["quiz","clasificar","construir"].map(mode=>({name:"redaccion-"+mode,route:"/redaccion?subtema=Conectores&modo="+mode+"&nivel=principiante",rounds:2}))
];
const results=[],issues=[];mkdirSync("m4-spanish-evidence",{recursive:true});
const browser=await chromium.launch({headless:true});
try{
 for(const test of cases){
  const ctx=await browser.newContext({viewport:{width:390,height:844},locale:"es-HN",reducedMotion:"reduce"});
  const page=await ctx.newPage();
  let completed=0;
  try{
   const res=await page.goto(base+test.route,{waitUntil:"load",timeout:40000});
   if(res?.status()!==200)throw Error("HTTP "+res?.status());
   for(let round=1;round<=test.rounds;round++){
    await page.getByTestId("game-session-header").getByText(round+"/10",{exact:true}).waitFor({timeout:10000});
    if(test.name==="gramatica-clasificar"){
     const count=await page.locator('[aria-label="Palabras de la oración"] button').count();
     if(!count)throw Error("Ninguna palabra clasificable");
     for(let i=0;i<count;i++)await page.locator('p:has-text("Clasificando:") + div.grid button').first().click();
     await page.getByRole("button",{name:"Comprobar",exact:true}).click();
    }else if(test.name==="gramatica-construir"){
     const count=await page.locator('ol[aria-label="Patrón gramatical"] li').count();
     for(let i=0;i<count;i++)await page.getByText("Banco de fichas").locator("..").locator("button:not([disabled])").first().click();
     await page.getByRole("button",{name:"Comprobar",exact:true}).click();
    }else if(test.name==="gramatica-quiz"){
     await page.locator("main div.grid.gap-3 button").first().click();
    }else if(test.name==="lectura-clasificar"){
     for(let i=1;i<=3;i++)await page.getByRole("group",{name:"Clasificación de afirmación "+i}).getByRole("button").first().click();
     await page.getByRole("button",{name:"Comprobar las tres afirmaciones",exact:true}).click();
    }else if(test.name==="lectura-construir"){
     for(let i=0;i<3;i++)await page.getByText("Fichas disponibles",{exact:true}).locator("xpath=following-sibling::div[1]").locator("button:not([disabled])").first().click();
     await page.getByRole("button",{name:"Comprobar secuencia",exact:true}).click();
    }else if(test.name==="lectura-quiz"){
     await page.locator("main div.grid.gap-3 button").first().click();
    }else if(test.name==="redaccion-construir"){
     for(let i=0;i<3;i++)await page.getByText("Fragmentos disponibles",{exact:true}).locator("xpath=following-sibling::div[1]").locator("button:not([disabled])").first().click();
     await page.getByRole("button",{name:"Revisar párrafo",exact:true}).click();
    }else if(test.name==="redaccion-quiz"){
     await page.locator('section[aria-label="Conector correcto"] div.grid button:not([disabled])').first().click();
    }else if(test.name==="redaccion-clasificar"){
     await page.locator('section[aria-label^="Cazador de errores"] div.grid button:not([disabled])').first().click();
    }
    const next=page.getByRole("button",{name:/^(Continuar|Siguiente|Ver resultados)/}).last();
    await next.waitFor({state:"visible",timeout:8000});
    await next.click();
    if(round<10)await page.getByTestId("game-session-header").getByText((round+1)+"/10",{exact:true}).waitFor({timeout:8000});
    completed++;
   }
  }catch(e){
   const msg=String(e?.message??e).slice(0,650);issues.push(test.name+": "+msg);
   await page.screenshot({path:"m4-spanish-evidence/fallo-"+test.name+".png",fullPage:true}).catch(()=>{});
  }finally{results.push({name:test.name,expected:test.rounds,completed});await ctx.close();}
 }
}finally{await browser.close();}
const report={module:"M4",kind:"SPANISH_GAME_PROGRESSION",status:issues.length?"FAIL":"PASS",sha:process.env.GITHUB_SHA??"local",results,issues,
 limitations:"Español: nueve escenarios de tres rutas, nivel básico, Chromium móvil emulado; no acredita cada uno de los 21 subtemas ni niveles adicionales."};
writeFileSync("m4-spanish-evidence/report.json",JSON.stringify(report,null,2)+"\n");
console.log(JSON.stringify({status:report.status,scenarios:results.length,rounds:results.reduce((n,r)=>n+r.completed,0),issues},null,2));
if(issues.length)process.exitCode=1;
