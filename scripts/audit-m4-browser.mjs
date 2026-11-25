/** M4: navegador real en CI (Chromium + Firefox), sobre servidor local del mismo checkout.
 * No certifica Safari/WebKit, dispositivos físicos, lectores de pantalla ni WCAG integral.
 */
import {mkdirSync,writeFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
import {resolve} from 'node:path';
const root=process.env.M4_PLAYWRIGHT_ROOT??'/tmp/m4-playwright';
const {chromium,firefox}=await import(pathToFileURL(resolve(root,'node_modules/playwright/index.mjs')).href);
const BASE=process.env.M4_BASE_URL??'http://127.0.0.1:4173';
const origin=new URL(BASE).origin;
const results=[],issues=[];
mkdirSync('m4-browser-evidence',{recursive:true});
const targets=[
 ['inicio','/'],
 ['matematicas','/matematicas?subtema=Operaciones&modo=quiz&nivel=principiante'],
 ['naturales','/naturales?subtema=C%C3%A9lula&modo=quiz&nivel=principiante'],
 ['sociales','/sociales?subtema=Independencia&modo=quiz&nivel=principiante'],
 ['blandas','/blandas?subtema=Respeto&modo=quiz&nivel=principiante']
];
for(const [engineName,engine] of [['chromium',chromium],['firefox',firefox]]){
 let browser;
 try{
  browser=await engine.launch({headless:true});
  for(const [profile,viewport] of [['desktop',{width:1365,height:768}],['mobile',{width:390,height:844}]]){
   const context=await browser.newContext({viewport,locale:'es-HN',reducedMotion:'reduce',deviceScaleFactor:1});
   const page=await context.newPage();
   const thirdParty=[],pageErrors=[],httpErrors=[];
   page.on('request',req=>{const url=req.url();if(/^https?:/.test(url)&&new URL(url).origin!==origin)thirdParty.push(url);});
   page.on('pageerror',err=>pageErrors.push(String(err.message).slice(0,200)));
   page.on('response',res=>{if(res.status()>=400&&new URL(res.url()).origin===origin)httpErrors.push({status:res.status(),url:res.url()});});
   const checks=[];
   const check=(condition,label)=>{checks.push({label,pass:Boolean(condition)});if(!condition)issues.push(engineName+'/'+profile+': '+label);};
   for(const [name,route] of targets){
    const resp=await page.goto(BASE+route,{waitUntil:'load',timeout:40000});
    await page.locator('main').first().waitFor({state:'visible',timeout:20000});
    check(resp?.status()===200,name+' responde HTTP 200');
    check((await page.locator('main').first().getAttribute('id'))==='contenido-principal',name+' tiene destino accesible');
    check(!(await page.getByText('No se pudo cargar esta página').isVisible().catch(()=>false)),name+' sin pantalla global de error');
    if(name==='inicio'){
     await page.keyboard.press('Tab');
     check((await page.evaluate(()=>document.activeElement?.getAttribute('href')))==='#contenido-principal','Salto visible en el primer Tab');
     await page.keyboard.press('Enter');
     check((await page.evaluate(()=>document.activeElement?.id))==='contenido-principal','Saltar mueve foco al contenido');
     await page.screenshot({path:'m4-browser-evidence/'+engineName+'-'+profile+'.png',fullPage:true,animations:'disabled'});
    }
   }
   // RDG first vertical slice: verify the actual optional flow on both real engines and viewports.
   const reviewPath='/?area=matematicas&tema=Aritm%C3%A9tica&subtema=Operaciones&modo=construir&nivel=avanzado';
   await page.goto(BASE+reviewPath,{waitUntil:'load'});
   const rdg=page.getByRole('link',{name:/Modo Repaso/});
   await rdg.focus(); await page.keyboard.press('Enter');
   await page.getByRole('heading',{name:'Modo Repaso: Operaciones'}).waitFor({state:'visible'});
   check(await page.getByRole('heading',{name:'Modo Repaso: Operaciones'}).isVisible(),'RDG abre por teclado');
   await page.getByRole('button',{name:'+6',exact:true}).click();
   check(await page.getByText('Posición actual: 2',{exact:true}).isVisible(),'RDG recta interactiva');
   await page.getByRole('button',{name:'−3',exact:true}).click();
   check(await page.getByText('Posición actual: -1',{exact:true}).isVisible(),'RDG signo y posición');
   await page.getByRole('button',{name:'−1',exact:true}).click(); await page.getByRole('button',{name:'Comprobar',exact:true}).click();
   check(await page.getByRole('status').getByText('¡Bien razonado!').isVisible(),'RDG feedback causal');
   await page.getByRole('button',{name:'Transferencia',exact:true}).click();
   check(await page.getByRole('button',{name:/pista/i}).count()===0,'RDG transferencia sin ayuda');
   check(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+2),'RDG sin desborde horizontal');
   await page.screenshot({path:'m4-browser-evidence/rdg-'+engineName+'-'+profile+'.png',fullPage:true,animations:'disabled'});
   await page.reload({waitUntil:'load'}); await page.getByRole('heading',{name:'Modo Repaso: Operaciones'}).waitFor({state:'visible'});
   await page.getByRole('link',{name:/Volver a los juegos/}).first().click(); await page.getByRole('heading',{name:/Elige un juego/}).waitFor({state:'visible'});
   check(await page.getByRole('combobox',{name:'Subtema de estudio'}).inputValue()==='Operaciones','RDG retorno contextual');
   check(new URL(page.url()).searchParams.get('modo')==='construir'&&new URL(page.url()).searchParams.get('nivel')==='avanzado','RDG preserva modo y nivel');
   // La app guarda historial localmente. Se comprueba persistencia sin enviar datos.
   await page.evaluate(()=>localStorage.setItem('m4-probe','local-only'));
   await page.reload({waitUntil:'load'});
   check((await page.evaluate(()=>localStorage.getItem('m4-probe')))==='local-only','localStorage persiste tras recarga');
   await page.evaluate(()=>localStorage.removeItem('m4-probe'));
   check(thirdParty.length===0,'Ninguna petición HTTP(S) de terceros durante cinco rutas');
   check(httpErrors.length===0,'Sin recursos propios HTTP >= 400');
   check(pageErrors.length===0,'Sin excepciones JavaScript no controladas');
   const size=await page.evaluate(()=>({viewport:window.innerWidth,document:document.documentElement.scrollWidth}));
   const overflow=size.document>size.viewport+2;
   results.push({engine:engineName,profile,checks,third_party_requests:[...new Set(thirdParty)].slice(0,20),
    http_errors:httpErrors.slice(0,20),page_errors:pageErrors.slice(0,20),horizontal_overflow_observed:overflow});
   await context.close();
  }
 }catch(err){issues.push(engineName+': '+String(err.message??err).slice(0,600));}
 finally{await browser?.close().catch(()=>{});}
}
const report={module:'M4',kind:'REAL_BROWSER_CI',status:issues.length?'FAIL':'PASS',sha:process.env.GITHUB_SHA??'local',
 engines:['chromium','firefox'],profiles:['desktop','mobile'],origin,results,issues,
 limitations:'Navegadores headless en Linux CI: no equivale a equipos físicos, Safari, lectores de pantalla, WCAG integral, trazas de red en producción ni revisión académica.'};
writeFileSync('m4-browser-evidence/report.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({status:report.status,checks:results.flatMap(r=>r.checks).length,failures:issues,profiles:results.length},null,2));
if(issues.length)process.exitCode=1;
