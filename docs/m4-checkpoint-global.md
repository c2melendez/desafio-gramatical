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
