/** M4: barrera de privacidad en código propio, compatible con CI sin navegador.
 * No sustituye la captura real de red incluida en el job navegador_m4.
 */
import {readFileSync} from 'node:fs';
const root=readFileSync('src/routes/__root.tsx','utf8');
const styles=readFileSync('src/styles.css','utf8');
const hook=readFileSync('src/lib/lovable-error-reporting.ts','utf8');
const issues=[];
if(root.includes('fonts.googleapis.com')||root.includes('fonts.gstatic.com'))issues.push('Fuente externa en cabecera');
if(styles.split('\n').some(line=>line.trimStart().startsWith('@import')&&line.includes('http')))issues.push('Importación CSS remota');
if(!hook.includes('!import.meta.env.DEV || typeof window === "undefined"'))issues.push('Hook editor no aislado de producción');
if(root.includes('Go home'))issues.push('Texto de recuperación no traducido');
const report={module:'M4',kind:'FIRST_PARTY_PRIVACY_GUARDS',status:issues.length?'FAIL':'PASS',checks:4,issues,
 limitations:'Revisión del código propio y guardas de producción. No descubre solicitudes de SDK, integraciones ajenas, errores de cabecera ni tráfico del navegador. El job de navegadores complementa la evidencia.'};
console.log(JSON.stringify(report,null,2));
if(issues.length)process.exitCode=1;
