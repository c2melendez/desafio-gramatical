/**
 * E2E de progresión de rondas: pruebas efectivas del botón Continuar.
 * Ejecuta 4 áreas × 3 mecánicas sobre un navegador real y comprueba
 * que se completa el estímulo, aparece Continuar y cambia Ronda n/10.
 * La prueba se detiene en el primer defecto y archiva estado por escenario.
 */
import {pathToFileURL} from "node:url";
import {resolve} from "node:path";
import {mkdirSync,writeFileSync} from "node:fs";
const root=process.env.M4_PLAYWRIGHT_ROOT??"/tmp/m4-playwright";
const {chromium}=await import(pathToFileURL(resolve(root,"node_modules/playwright/index.mjs")).href);
const base=process.env.M4_BASE_URL??"http://127.0.0.1:4173";
const scenarios=[
 ["matematicas","Operaciones"],
 ["naturales","Célula"],
 ["sociales","Independencia"],
 ["blandas","Pensamiento crítico"]
];
const modes=["quiz","clasificar","construir"];
const results=[],issues=[];
mkdirSync("m4-gameplay-evidence",{recursive:true});
const browser=await chromium.launch({headless:true});
try{
 for(const [area,subtopic] of scenarios){
  for(const mode of modes){
   const context=await browser.newContext({viewport:{width:390,height:844},locale:"es-HN",reducedMotion:"reduce"});
   const page=await context.newPage();
   const route="/"+area+"?subtema="+encodeURIComponent(subtopic)+"&modo="+mode+"&nivel=principiante";
   const record={area,subtopic,mode,rounds_passed:0,checks:[],issues:[]};
   try{
    const response=await page.goto(base+route,{waitUntil:"load",timeout:40000});
    if(response?.status()!==200)throw Error("HTTP "+response?.status());
    const card=page.locator('section[aria-label^="Ejercicio"]').first();
    await card.waitFor({state:"visible",timeout:20000});
    const maxRounds=area==="matematicas"&&mode==="quiz"?10:3;
    for(let round=1;round<=maxRounds;round++){
     const header=page.getByTestId("game-session-header");
     await header.getByText(round+"/10",{exact:true}).waitFor({timeout:5000});
     const decisionCount=mode==="quiz"?1:mode==="clasificar"?3:2;
     for(let n=0;n<decisionCount;n++){
      const options=card.locator("div.grid button:visible");
      if(!(await options.count()))throw Error("No hay opciones en ronda "+round+", paso "+(n+1));
      await options.first().click({timeout:5000});
     }
     const continueButton=card.getByRole("button",{name:round===10?"Ver resultados":"Continuar",exact:true});
     await continueButton.waitFor({state:"visible",timeout:5000});
     await continueButton.click({timeout:5000});
     if(round<10){
      await page.getByTestId("game-session-header").getByText((round+1)+"/10",{exact:true}).waitFor({timeout:5000});
     }else{
      await page.getByRole("heading",{name:/completado/i}).waitFor({timeout:6000});
     }
     record.rounds_passed++;
    }
    record.checks.push("Avance "+maxRounds+" rondas por interacción real");
   }catch(e){
    const message=String(e?.message??e).slice(0,700);
    record.issues.push(message);issues.push(area+"/"+subtopic+"/"+mode+": "+message);
    await page.screenshot({path:"m4-gameplay-evidence/fallo-"+area+"-"+mode+".png",fullPage:true}).catch(()=>{});
   }finally{
    results.push(record);
    await context.close();
   }
  }
 }
}finally{await browser.close();}
const report={module:"M4",kind:"GAME_PROGRESS_BROWSER",status:issues.length?"FAIL":"PASS",
 sha:process.env.GITHUB_SHA??"local",results,issues,
 limitations:"12 combinaciones de cuatro áreas (no Español), niveles básico, Chromium móvil emulado; no acredita todos los niveles ni los 810 escenarios. El resultado de esta suite sí valida clics efectivos en Continuar."};
writeFileSync("m4-gameplay-evidence/report.json",JSON.stringify(report,null,2)+"\n");
console.log(JSON.stringify({status:report.status,scenarios:results.length,rounds:results.reduce((n,r)=>n+r.rounds_passed,0),issues},null,2));
if(issues.length)process.exitCode=1;
