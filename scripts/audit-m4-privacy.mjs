/** M4: barrera de privacidad en código propio, compatible con CI sin navegador.
 * No sustituye la captura real de red incluida en el job navegador_m4.
 */
import {readFileSync} from 'node:fs';
const root=readFileSync('src/routes/__root.tsx','utf8');
const styles=readFileSync('src/styles.css','utf8');
const hook=readFileSync('src/lib/lovable-error-reporting.ts','utf8');
const issues=[];
if(/fonts\\.googleapis\\.com|fonts\\.gstatic\\.com/.test(root))issues.push('Enlace a fuente de Google en cabecera');
if(/https?:\\/\\//.test(styles.replace(/\\/\\*[\\s\\S]*?\\*\\//g,'')))issues.push('CSS contiene URL absoluta externa');
if(!hook.includes('!import.meta.env.DEV || typeof window === "undefined"'))issues.push('Hook editor no aislado de producción');
if(root.includes('Go home'))issues.push('Texto de recuperación no traducido');
const report={module:'M4',kind:'FIRST_PARTY_PRIVACY_GUARDS',status:issues.length?'FAIL':'PASS',checks:4,issues,
 limitations:'Revisión del código propio y guardas de producción. No descubre solicitudes de SDK, integraciones ajenas, errores de cabecera ni tráfico del navegador. El job de navegadores complementa la evidencia.'};
console.log(JSON.stringify(report,null,2));
if(issues.length)process.exitCode=1;
