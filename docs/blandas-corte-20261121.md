# Corte técnico integral — Habilidades Blandas

**Estado: COMPLETADA TÉCNICAMENTE.** PR #47 fusionado, CI de PR y main SUCCESS; Render LIVE del mismo SHA de integración. Revisión académica y visual manual pendientes.

## Congelación de alcance

- Repositorio: `c2melendez/desafio-gramatical`; SHA base `2a47febb7192cd9a1ca47b771625f714e8cef3d3` (M3 cerrado y desplegado).
- 3 temas (Toma de decisiones, Convivencia, Autogestión); 8 subtemas, 3 mecánicas y 3 niveles = **72 celdas**.
- Cuotas por juego × subtema: 30 Básico, 50 Intermedio, 70 Avanzado.
- **3600 registros técnicos** = 720 básicos, 1200 intermedios y 1680 avanzados. Historial M1/M2 preservado (2400 registros); M3 añadido (1200).
- 40 anclajes de conductas contextualizadas, variedad de operaciones por registro, pero *sin certificar independencia conceptual*. Las variantes entre modalidades pueden compartir estímulos.
- Inventario transversal: **40.500 posiciones técnicas** en cinco áreas; no equivale a 40.500 preguntas cognitivamente independientes.
- Habilidades Blandas es contenido **complementario del catálogo**, no área de examen enumerada en la guía PRE-U PHUMA 2026 consultada. Ninguna pregunta se presenta como oficial ni calibrada.

## Auditoría y reparaciones

- `scripts/audit-soft-cut.mjs`: evalúa el 100 % de las 72 celdas y los 3600 registros con validación por oráculo, claves, distractores, clasificación, construcción, consistencia del contexto, rastreo de familias, hash SHA256 individual y agregado.
- Audita todos los IDs contra el inventario global, sin confundir los escenarios derivados con problemas independientes; registra familias, concentraciones, y 40 anclajes curriculares complementarios.
- Ensaya 720 mutantes de datos (10 clases × 72 celdas); son modificaciones aisladas de fixtures, no mutaciones del código del validador. Informa sobrevivientes de forma explícita.
- Comprueba la preservación exacta de todos los elementos M1/M2, las cuotas 30/50/70 y que el selector y la ruta funcional acepten el área.
- `src/lib/soft-route.ts`: valida búsqueda de URL de forma explícita, con defecto válido `Pensamiento crítico`, y rechaza los parámetros de otros dominios. `src/routes/blandas.tsx`: adopta el validador sin alterar el funcionamiento ni los generadores del juego.
- `src/test/soft-cut-integration.test.ts`: comprobación de las 72 combinaciones, 3600 IDs, competencias, regreso contextual y rotación/historial de 10 rondas.
- `src/test/soft-cut-navigation.test.tsx`: tests en router real de fallback, resultado de 10 rondas, retorno al menú y reinicio.
- `.github/workflows/ci.yml`: incorpora la auditoría obligatoria y archiva `blandas-corte-integral`, incluido el manifiesto individual completo; mantiene los controles M0, Español, Matemáticas, Naturales, Sociales y Blandas M1/M2/M3.
- `docs/m0-contract-lock.json` y `docs/modulos-phuma.json`: contratos hash y estado de corte.

## Criterios y límites de aceptación

- [x] Auditoría completa y 720/720 mutantes detectados, sin bloqueos estructurales.
- [x] Pruebas, integración, compilación, inventario, contratos protegidos y regresiones globales de CI — SUCCESS.
- [x] PR integrado a `main`.
- [x] CI `main` SUCCESS y Render LIVE del mismo commit integrado.
- [ ] Documentación definitiva con evidencia y nuevo CI/Render si el SHA cambia.
- [ ] Revisión académica por especialistas (PENDIENTE AUTORIZADA; no representa certificación).
- [ ] Inspección visual real en móvil y escritorio, lectores de pantalla, teclado y contraste (NO EJECUTADA).
- [ ] Evaluación psicométrica e independencia conceptual de escenarios (NO CERTIFICADA).

**Siguiente módulo después del corte técnico:** M4 — reconciliación transversal del catálogo completo de 40.500 posiciones técnicas, accesibilidad, privacidad, rendimiento y cierre global, conservando por separado la revisión docente.

## Evidencia de publicación — 21 de noviembre de 2026 (Honduras)

- PR #47 fusionado: https://github.com/c2melendez/desafio-gramatical/pull/47; commit `887042b3cf57a4fad544ee5390b8e8875de09964`.
- CI del PR: SUCCESS, https://github.com/c2melendez/desafio-gramatical/actions/runs/44981005076, SHA `e2303f0cc8f97234e172c31ce22178d511297066`.
- CI principal: SUCCESS, https://github.com/c2melendez/desafio-gramatical/actions/runs/44981285181, SHA `887042b3cf57a4fad544ee5390b8e8875de09964`.
- Render: LIVE, despliegue `dep-dc165n7b9u1s73fv0ji0`, mismo SHA `887042b3cf57a4fad544ee5390b8e8875de09964`, https://desafio-gramatical.onrender.com/.
- Archivo verificable `blandas-corte-integral`: ID 14738126500, SHA256 del ZIP `39f022c5159e35435baf31385ad716c62fd133269659852ee4554e0593e696e8`; matriz de 72 celdas, 3600 hashes individuales y 720 mutantes ejecutados.
- La primera corrida del PR falló por variable `modo` en prueba; la segunda por la misma referencia en el auditor. Ambos defectos de fixture se corrigieron; la tercera corrida completa (44981005076) fue SUCCESS y se comprobó nuevamente el SHA integrado.
- Las cifras representan posiciones técnicas, no ejercicios semánticamente independientes ni calificación PHUMA; la revisión docente y visual sigue PENDIENTE AUTORIZADA.
- **Siguiente objetivo: M4 — cierre integral del proyecto**. El SHA documental requiere nueva CI y Render LIVE para confirmar esta publicación.
