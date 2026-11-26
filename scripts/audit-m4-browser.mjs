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
   const touchProfile=engineName==='chromium'&&profile==='mobile';
   const context=await browser.newContext({viewport,locale:'es-HN',reducedMotion:'reduce',deviceScaleFactor:1,hasTouch:touchProfile});
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
   if(touchProfile){
    await page.evaluate(()=>{document.documentElement.dataset.rdgTouch='0';document.addEventListener('touchstart',()=>{document.documentElement.dataset.rdgTouch='1';},{once:true});});
    await page.getByRole('button',{name:'+6',exact:true}).tap();
    check(await page.evaluate(()=>document.documentElement.dataset.rdgTouch==='1'),'RDG evento táctil real en navegador emulado');
   }else await page.getByRole('button',{name:'+6',exact:true}).click();
   check(await page.getByText('Posición actual: 2',{exact:true}).isVisible(),'RDG recta interactiva');
   if(touchProfile)await page.getByRole('button',{name:'−3',exact:true}).tap();else await page.getByRole('button',{name:'−3',exact:true}).click();
   check(await page.getByText('Posición actual: -1',{exact:true}).isVisible(),'RDG signo y posición');
   await page.getByRole('button',{name:'−1',exact:true}).click(); await page.getByRole('button',{name:'Comprobar',exact:true}).click();
   check(await page.getByRole('status').getByText('¡Bien razonado!').isVisible(),'RDG feedback causal');
   await page.getByRole('button',{name:'Siguiente',exact:true}).click();
   await page.getByRole('button',{name:'3 × 2',exact:true}).first().click();
   check(await page.getByText('Bien: este nodo debe resolverse primero.',{exact:true}).isVisible(),'RDG árbol de dependencias');
   await page.getByRole('button',{name:'Procedimientos',exact:true}).click();
   await page.getByRole('button',{name:'Subir 42 ÷ 7',exact:true}).click();
   await page.getByRole('button',{name:'Subir 6 × 3',exact:true}).click();
   check(await page.getByText('Secuencia válida: ya puedes terminar el cálculo.',{exact:true}).isVisible(),'RDG secuencia correcta');
   await page.getByRole('button',{name:'Siguiente',exact:true}).click();
   await page.getByRole('button',{name:'−3',exact:true}).click();
   await page.getByRole('button',{name:'+2',exact:true}).click();
   check(await page.getByText('(28 + 29) × 13',{exact:true}).isVisible(),'RDG modifica operandos');
   await page.getByRole('button',{name:'Siguiente',exact:true}).click();
   await page.getByRole('button',{name:'Ver las dos ramas',exact:true}).click();
   await page.getByRole('button',{name:'7 × 12',exact:true}).click();
   await page.getByRole('button',{name:'−7 × 12',exact:true}).click();
   check(await page.getByText('Correcto: los productos opuestos se cancelan.',{exact:true}).isVisible(),'RDG distributividad');
   await page.getByRole('button',{name:'Siguiente',exact:true}).click();
   await page.getByRole('button',{name:'3/7',exact:true}).click();
   check(await page.getByRole('img',{name:/Cuadrado de siete por siete/}).isVisible(),'RDG área y raíz');
   check(await page.getByText('Correcto: (3/7)² = 9/49.',{exact:true}).isVisible(),'RDG raíz principal');
   await page.getByRole('button',{name:'5/7 − 6/7',exact:true}).click();
   check(await page.getByText('Correcto: conserva las unidades de séptimo.',{exact:true}).isVisible(),'RDG unidad fraccionaria');
   await page.setViewportSize({width:360,height:800});
   check(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+2),'RDG 360px sin desborde');
   await page.setViewportSize(viewport);
   // R4: each added bridge must be operable on real browsers, not merely data.
   for(const [title,answer] of [['Deshacer cambios antes de repartir','12'],['Completar una igualdad','42'],['Dividir una diferencia racional','1/8'],['Comparar costos completos','10'],['Restar un número negativo','9'],['Producto negativo y suma','−16'],['Restar un grupo negativo','23'],['Factor común en dos grupos','75'],['Cancelar productos cruzados','3'],['Hallar el factor faltante','16'],['Comparar antes y después','−32'],['Reconstruir con entradas y salidas','85'],['Calcular el resto y repartirlo','10'],['Dos raíces y dos agrupaciones','33']]){
    await page.getByRole('button',{name:'Siguiente',exact:true}).click();
    check(await page.getByRole('heading',{name:title,exact:true}).isVisible(),'RDG R4 '+title);
    const bridge=page.getByRole('region',{name:'Organizador de razonamiento'});
    await bridge.getByRole('button',{name:'Revelar siguiente paso'}).click();
    await bridge.getByRole('button',{name:'Revelar siguiente paso'}).click();
    check(await bridge.getByText('3 de 3 pasos visibles',{exact:true}).isVisible(),'RDG R4 pasos '+title);
    await page.getByRole('group',{name:'Respuestas'}).getByRole('button',{name:answer,exact:true}).click();
    await page.getByRole('button',{name:'Comprobar',exact:true}).click();
    check(await page.getByRole('status').getByText('¡Bien razonado!').isVisible(),'RDG R4 feedback '+title);
   }
   await page.setViewportSize({width:360,height:800});
   check(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+2),'RDG R4 360px sin desborde');
   await page.setViewportSize(viewport);
   await page.getByRole('button',{name:'Síntesis',exact:true}).click();
   for(const title of ['Divisor agrupado','Saldo con dos compras','Cajas restantes y cambio por caja','Dos flujos independientes','Raíz, producto y resta','Diferencia con factor común','Raíz racional y diferencia agrupada','Factor y raíz racional','Productos distintos','Raíz, producto y cociente agrupado','Raíz y productos racionales']){
    const summary=page.locator('summary').filter({hasText:title+': ver ejemplo resuelto'});
    check(await summary.count()===1,'RDG síntesis '+title);
    await summary.click();
    check(await summary.locator('..').locator('p').isVisible(),'RDG síntesis desplegable '+title);
   }
   await page.getByRole('button',{name:'Transferencia',exact:true}).click();
   check(await page.getByRole('button',{name:/pista/i}).count()===0,'RDG transferencia sin ayuda');
   for(let i=0;i<9;i++)await page.getByRole('button',{name:'Siguiente',exact:true}).click();
   check(await page.getByRole('heading',{name:'Diferencia entre temperaturas',exact:true}).isVisible(),'RDG transferencia signos');
   check(await page.getByRole('region',{name:'Organizador de razonamiento'}).count()===0,'RDG transferencia signos sin organizador');
   await page.getByRole('button',{name:'Siguiente',exact:true}).click();
   await page.getByRole('button',{name:'Siguiente',exact:true}).click();
   check(await page.getByRole('heading',{name:'Cargo con reintegros',exact:true}).isVisible(),'RDG transferencia resta anidada');
   check(await page.getByRole('button',{name:/pista/i}).count()===0,'RDG resta anidada sin ayuda');
   for(const title of ['Agrupar cuatro productos','Dos productos cruzados','Equilibrar el producto','Divisor agrupado','Cero como dividendo','Diferencia con factor común','Resta de una diferencia racional','Factor exterior y raíz racional','Diferencia entre estados','Estado anterior del almacén','Retirar y repartir','Dos grupos con raíces','Presupuesto después de dos compras','Cambios en cajas y contenido','Diferencia de productos independientes','Jerarquía con divisor y raíz','Raíz y fracciones con producto']){
    await page.getByRole('button',{name:'Siguiente',exact:true}).click();
    check(await page.getByRole('heading',{name:title,exact:true}).isVisible(),'RDG transferencia '+title);
    check(await page.getByRole('region',{name:'Organizador de razonamiento'}).count()===0,'RDG transferencia sin organizador '+title);
   }
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
