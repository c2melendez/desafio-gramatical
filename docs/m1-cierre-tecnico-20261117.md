# Academia PHUMA Play · M1 Español · cierre A/B técnico-operativo (17-11-2026)

## Bloque A — Verificación técnica ejecutada
- Área y módulo: `espanol-M1`. Meta: 21 subtemas × 3 juegos, niveles 10/15/20 = **2.835** posiciones mínimas en 189 celdas.
- Línea base principal: `2c2f6e8170089a45ba76b905fb76e6e50c4f6ccd`, 2.006 registros técnicos. Aportes de PR #6: **855** ejercicios técnicos (180+405+270); total **2.861**, excedente 26 sobre el núcleo; **0 déficit por celda**, **0 fallos** de estructura/identidad en 189 celdas.
- 2.861 IDs globales únicos: se eliminaron colisiones anteriores de Lectura (IDs por juego) y Redacción (IDs por juego) con migraciones conservadoras de historial y rotación, probadas en CI.
- `scripts/audit-m1-source-consistency.mjs`: **855/855** consistentes con estímulos fuente (artefacto `m1-oraculos-855`).
- `scripts/audit-m1-quiz-oracles.mjs`: 225 claves contrastadas con el banco fuente y **675 mutantes negativos detectados** (tres por selección: clave errónea, respuesta duplicada, opción ausente).
- `scripts/audit-m1-technical-acceptance.mjs`: 189 celdas, 2.861 registros verificados técnicamente, cero déficit, cero errores y 2.861 IDs globales distintos.
- `scripts/audit-m1-families.mjs`: 675 registros nuevos distribuidos en **240 familias**: 210 triples, 15 dobles y 15 unitarias; las familias compartidas no se confunden con registros independientes certificados.
- `scripts/audit-m1-operations.mjs`: diferenciación de tareas entre selección, clasificación y construcción con PASS de operaciones. Verifica requerimientos de respuesta distintos; no es prueba psicométrica de independencia.
- CI de rama: [44114182135](https://github.com/c2melendez/desafio-gramatical/actions/runs/44114182135) **SUCCESS**. Integración por [PR #6](https://github.com/c2melendez/desafio-gramatical/pull/6), commit `5da596b1e5f1214b5b717e6b79326ecd0a97cdcd`. CI de main: [44114466703](https://github.com/c2melendez/desafio-gramatical/actions/runs/44114466703) **SUCCESS**.
- Render: servicio `srv-dbt0rilg1s2s738eku8g`, deploy `dep-dbu74hrbc2fs73fvdrt0` **LIVE** del mismo SHA `5da596b1e5f1214b5b717e6b79326ecd0a97cdcd`. URL: https://desafio-gramatical.onrender.com/.
- Prueba funcional publicada: salud del servicio verificada por Render Live; el comando de smoke HTTP de cinco rutas se incorpora al CI del siguiente SHA. **No declarar esas cinco rutas verificadas hasta ver SUCCESS del CI**.
- Puerta M0 conserva regresión y verificador independiente; no se modificaron herramientas generadas por Lovable ni se expusieron secretos.

## Bloque B — Estado, decisiones, riesgos y continuidad
- **Estado M1: COMPLETADA técnicamente** bajo autorización explícita de diferir revisión académica. No es validación de contenido por docentes ni calibración/equivalencia oficial PHUMA.
- **PENDIENTE**: revisión académica humana, independencia conceptual plena por criterio pedagógico, calibración empírica y validación psicométrica. Los 2.861 son conteos **técnicos** con oráculos automáticos; no son 2.861 certificaciones de independencia cognitiva.
- Los ejercicios están rotulados en la UI como práctica original con revisión docente pendiente; no se presentan como preguntas oficiales.
- Decisiones: **DETERMINADO** catálogo 21 subtemas/63 combinaciones y cuota M1; **DEDUCIBLE** diferenciación operativa verificable entre juegos; **AMBIGUO/PENDIENTE** equivalencia conceptual completa y niveles reales de dificultad.
- Cierre al SHA de integración `5da596b1e5f1214b5b717e6b79326ecd0a97cdcd`; cualquier commit posterior de documentación necesita nuevo CI y Render Live del **mismo nuevo SHA**. La referencia histórica al deploy de integración no prueba por sí sola un despliegue posterior.
- **M2 Español EN_CURSO**. Meta acumulada 20/35/45 = 6.300 registros distribuidos por celda. Déficit real calculado por `max(0,meta−disponibles)`: **614 básico, 1.253 intermedio, 1.573 avanzado**, total **3.440**. El excedente de una unidad de una celda no compensa otras. Ver `docs/estado-m2.json`.
- Continuación idempotente: usar `src/lib/coverage.ts`, `scripts/inventory-items.mjs`, `scripts/audit-m1-technical-acceptance.mjs` y el grafo `docs/modulos-phuma.json`; evitar duplicados por ID y familia. Completar M2 antes de pasar a M3; mantener los mismos controles sin convertir revisión académica pendiente en falso PASS.

### Archivo de evidencia reproducible
- CI: https://github.com/c2melendez/desafio-gramatical/actions
- Despliegues: https://dashboard.render.com/web/srv-dbt0rilg1s2s738eku8g
- Artefactos `m1-aceptacion-tecnica-189`, `m1-oraculos-855`, `m1-oraculos-225`, `m1-operaciones-cognitivas`, `m1-familias-240`, `m0-auditoria`.
- Criterio de validación: salida real de GitHub Actions, SHA exacto en Render, respuesta HTTP de rutas publicada en CI de main; ningún `SKIP` se convierte en PASS.
