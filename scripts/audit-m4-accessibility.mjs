/** Auditoría M4 de contratos accesibles: verificación estática acotada.
 * No equivale a WCAG completo ni sustituye pruebas con lectores de pantalla.
 */
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(p,'utf8');
const files=['src/routes/index.tsx','src/routes/matematicas.tsx','src/routes/naturales.tsx','src/routes/sociales.tsx','src/routes/blandas.tsx'];
const root=read('src/routes/__root.tsx');
const header=read('src/components/games/GameSessionHeader.tsx');
const feedback=read('src/components/games/LearningFeedback.tsx');
const issues=[];
if(!root.includes('<html lang="es">'))issues.push('Idioma español ausente en HTML');
if(!root.includes('href="#contenido-principal"')||!root.includes('Saltar al contenido principal'))issues.push('No existe enlace accesible de salto');
for(const path of files){
 const s=read(path),m=[...s.matchAll(/<main\b[^>]*>/g)].map(x=>x[0]);
 if(!m.length||m.some(x=>!x.includes('id="contenido-principal"')||!x.includes('tabIndex={-1}')))issues.push('Destino del salto incompleto: '+path);
 if(/<div\b[^>]*onClick=/.test(s))issues.push('Contenedor clicable sin semántica nativa: '+path);
}
if(!header.includes('role="progressbar"')||!header.includes('aria-valuenow')||!header.includes('aria-label="Barra de avance"'))issues.push('Barra sin información accesible');
if(!header.includes('aria-live="polite"'))issues.push('Marcador sin anuncio de cambios');
if(!feedback.includes('aria-live="polite"')||!feedback.includes('aria-label="Explicación del resultado"'))issues.push('Retroalimentación sin anuncio');
const summary={module:'M4',check:'A11Y_STATIC_CONTRACTS',status:issues.length?'FAIL':'PASS',routes:files.length,checks:'idioma, enlace de salto, cinco destinos de teclado, controles semánticos básicos, barra y retroalimentación',issues,
 limitations:'Comprobación estática de contratos definidos: no prueba contraste real, orden de foco, teclado en navegador, lectores de pantalla, zoom ni WCAG integral.'};
console.log(JSON.stringify(summary,null,2));
if(issues.length)process.exitCode=1;
