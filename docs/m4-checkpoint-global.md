# M4 — checkpoint de cierre técnico transversal

**Estado: EN_CURSO.** La revisión académica y psicométrica permanece pendiente por autorización; los controles visuales manuales y de accesibilidad asistiva **no están certificados**.

## Reconciliación inicial (SHA `e65974444edb740cf0fce3ae4b3e6e7cb94f86a6`)

- Prerrequisitos: cinco áreas con estado CORTE COMPLETADA en `docs/modulos-phuma.json`.
- GitHub Actions `44983241824`: `completed / success`, mismo SHA.
- Render `dep-dc16ie7mocus73an149g`: `live`, mismo SHA.
- La auditoría obligatoria `scripts/audit-m4-global.mjs` inspecciona las 810 combinaciones, los 40.500 IDs, cuotas por nivel, colisiones entre áreas y dependencias. El resultado individual se conserva en el artefacto `m4-global-technical-baseline`.
- Distribución técnica esperada: Español 9.450, Matemáticas 9.900, Naturales 8.550, Sociales 9.000 y Habilidades Blandas 3.600.
- **40.500 son registros técnicos, no 40.500 problemas semánticamente independientes.**

## Segunda pasada — nuevo control de rendimiento transversal

- `scripts/audit-m4-performance.mjs`: recorre todos los pools de las 810 celdas, verifica ID único y cuota, y registra tiempo de construcción, memoria RSS/heap, 12 celdas más lentas, runtime y huella SHA256 de IDs.
- `.github/workflows/ci.yml`: ejecuta este control y archiva `m4-global-node-performance`; se conserva también la auditoría global y las regresiones existentes de build, pruebas, ESLint, privacidad, secretos y smoke HTTP.
- Las medidas del runner Node son observaciones concretas, **no** certificación de latencia en dispositivos ni de rendimiento bajo carga concurrente.

## Puertas pendientes antes de afirmar M4 COMPLETADA

- [ ] GitHub Actions SUCCESS y Render LIVE sobre el SHA final de esta segunda pasada.
- [ ] Inspección real de navegación por teclado y lector de pantalla, foco, contraste y adaptación móvil.
- [ ] Ensayo de compatibilidad y rendimiento en navegadores y dispositivos reales.
- [ ] Revisión de privacidad en tiempo de ejecución y tráfico de terceros, fuera del escaneo estático.
- [ ] Evaluación de independencia conceptual y revisión docente (pendiente autorizada, fuera de la aceptación técnica).
- [ ] Síntesis de riesgos y evidencia final del cierre global.

No se contabilizan los controles pendientes como PASS ni se cambia el módulo a COMPLETADA antes de contar con evidencia.

## Tercera pasada — privacidad local y compatibilidad PWA (22 de noviembre de 2026)

- La corrida previa `ee015be37d4ce695179f7f81adc40721a48b2f41` cerró CI `44997551248` como **SUCCESS** y Render `dep-dc19e1e417fc73bag1s0` como **LIVE** para el mismo SHA. Se archivaron `m4-global-technical-baseline`, `m4-global-node-performance` y `m4-accessibility-contracts`.
- El manifiesto PWA referenciaba `/icon-192.png` y `/icon-512.png`, y la cabecera HTML `/favicon.png`; ninguno de esos PNG estaba versionado ni generado explícitamente durante el build. Se añadió `scripts/generate-pwa-icons.mjs`, generador reproducible basado en zlib/PNG sin dependencias de terceros, y `bun run build` ahora los produce antes de Vite.
- `scripts/audit-m4-runtime.mjs` ejercita mediante almacenamiento simulado las escrituras, restauración, borrado, truncamiento de historial a 100 registros, recuperación ante datos malformados, excepciones por almacenamiento bloqueado, claves de rotación aisladas por área y sesiones de diez preguntas. Valida estructura del manifiesto y cabeceras PNG reales después del build. Estos son **contratos de ejecución Node y adaptadores simulados**, no una prueba en navegador real.
- `.github/workflows/ci.yml` incorpora el control obligatorio y el artefacto `m4-runtime-storage-pwa`. El resultado de CI y Render del SHA final de esta pasada **está pendiente de reconciliación** y no debe suponerse PASS sin consultarlo.
- Los escáneres de privacidad y seguridad existentes siguen en CI. No se han observado ni registrado solicitudes de red con navegador instrumentado en esta ejecución; el CSS carga fuentes de Google y el entorno de previsualización puede usar telemetría de Lovable. Se requiere análisis independiente antes de declarar privacidad en tiempo de ejecución verificada.
- **PENDIENTES:** pruebas efectivas con Chrome/Firefox/Safari, instalación PWA en dispositivo real, lector de pantalla, contraste/foco/zoom, inspección de solicitudes de terceros y revisión académica separada. No se declara M4 COMPLETADA por estas incorporaciones.

## Cuarta pasada — control de navegadores, red y privacidad de producción

**Evidencia técnica verificada sobre SHA `51e8d887ad567971ea40928609972b7853706cf9`:**

- Se retiraron enlaces y conexiones automáticas a `fonts.googleapis.com` y `fonts.gstatic.com`; las tipografías se resuelven con alternativas del sistema para no depender de terceros. Esta decisión modifica la representación tipográfica y no equivale a certificación visual.
- El hook de telemetría del editor queda limitado a modo desarrollo mediante `!import.meta.env.DEV` en `src/lib/lovable-error-reporting.ts`. El reporte de errores local de la aplicación sigue disponible.
- `scripts/audit-m4-privacy.mjs` bloquea en CI reintroducir fuentes remotas, importaciones CSS HTTP o el hook de telemetría sin guarda de producción.
- `scripts/audit-m4-browser.mjs` ejecuta navegación real en Chromium y Firefox sobre la compilación Cloudflare/Nitro servida localmente con Wrangler: escritorio 1365×768 y móvil emulado 390×844, cinco rutas por perfil, salto de teclado, persistencia local, errores JS/HTTP y observación de solicitudes HTTP(S) externas.
- Job `navegador_m4` en GitHub Actions `45000733641`: **SUCCESS**, con **84 verificaciones PASS, 0 fallos y 4 perfiles**; artefacto `m4-real-browser-privacy-accessibility` (ID `14745458584`) con cuatro capturas y reporte JSON. No se observaron solicitudes HTTP(S) a terceros en esas cinco rutas bajo los perfiles probados.
- Render `dep-dc1a21e0tbcc73ag0dhg`: **LIVE** para ese mismo SHA. La conciliación definitiva del trabajo principal y del SHA documental posterior se verifica por separado.

**Limitaciones que siguen pendientes:** Safari/WebKit y dispositivos físicos, lector de pantalla y contraste/foco/zoom exhaustivos, red en despliegue de producción instrumentada (la prueba cubrió servidor local del mismo build), análisis completo de privacidad de dependencias/servicios y revisión académica/psicométrica autorizada como pendiente. La auditoría de navegador no reemplaza esas pruebas ni habilita certificar el módulo global como COMPLETADA.
