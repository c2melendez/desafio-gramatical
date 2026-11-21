# Habilidades Blandas M2 — Ampliación acumulativa técnica

**Estado: COMPLETADA TÉCNICAMENTE.** CI de PR y main SUCCESS; Render LIVE del mismo SHA de integración. Revisión académica pendiente.

## Alcance y procedencia

- Repositorio `c2melendez/desafio-gramatical`; base M1 cerrada: `78ed4eddc02a078f1718a81af1cdd64ae8ffd4a9`.
- 3 temas, 8 subtemas, 3 juegos y 3 dificultades = **72 celdas**.
- Objetivo de M2 por subtema y juego: **20 básico, 35 intermedio, 45 avanzado**; 24 combinaciones × 100 = **2400 registros técnicos acumulados**.
- Desde M1: 1080 registros preexistentes con IDs, respuestas y explicaciones inalterados + 1320 nuevos (240 básicos, 480 intermedios, 600 avanzados).
- Totales acumulados: **480 básicos, 840 intermedios, 1080 avanzados**, 2400. Inventario global proyectado: **39300** registros técnicos de todas las áreas.
- Los 40 anclajes y casos originales son **práctica complementaria** de la plataforma; la guía PRE-U PHUMA 2026 examinada **no enumera Habilidades Blandas como área oficial**. No son reactivos oficiales y no se acreditan 2400 ejercicios semánticamente independientes.

## Integración

- `src/lib/soft-m2.ts`: nuevos registros `blandas-m2-*`, aditivos e idempotentes, cinco operaciones de evidencia/contraste/atribución, textos contextualizados por nivel. M1 conservado en `softPool`.
- `src/routes/blandas.tsx`: usa `softM2Pool` sin cambiar contrato de **exactamente diez rondas**, puntuación, retroalimentación, controles de selección, persistencia e historial; el contexto conserva los subtemas y niveles.
- `src/lib/coverage.ts`, `scripts/inventory-items.mjs`, `docs/m0-contract-lock.json`: cobertura y registro acumulado de M2.
- `src/test/soft-m2-integration.test.ts`: preservación exacta M1, independencia de IDs, matriz 72 celdas, oráculos, distractores, clasificación, construcción y sesiones sin repetición; regresiones M1 adecuadas al banco activo de M2.
- `scripts/audit-soft-m2.mjs`: matriz por tema/subtema/juego/nivel, contraste de huellas de estímulo, claves y explicaciones, inventario global, rotación 10/10 y **720 mutaciones negativas** con oráculo estructural curado.
- `.github/workflows/ci.yml`: agrega auditor obligatorio y archivo `blandas-m2-integral`; mantiene M0, Español, Matemáticas, Naturales, Sociales y Blandas M1.

## Interpretación y riesgos

- Los conteos reflejan **registros por modalidad** y reutilizan conceptos y fuentes, no independencia cognitiva de 2400 actividades. La auditoría estructural no sustituye la revisión humana del significado, claridad, neutralidad o validez de las opciones.
- Niveles básico, intermedio y avanzado son orientativos para práctica complementaria, no equivalencia psicométrica PHUMA.
- **Revisión académica: PENDIENTE AUTORIZADA.** Inspección visual manual en móvil y escritorio: **NO EJECUTADA**; accesibilidad real con dispositivos: **NO CERTIFICADA**.
- Se conservan las invariantes del M0 y contratos de las cuatro áreas previamente completadas.

## Puerta de publicación

- [x] Suite de tests, build, inventario y auditorías CI del PR: SUCCESS.
- [x] PR fusionado en `main`.
- [x] CI `main` SUCCESS y Render LIVE del mismo SHA integrado.
- [ ] Informe de cierre y manifiesto con evidencia real, seguidos de CI/Render para el SHA documental si hay nuevo commit.
- [ ] Revisión docente y visual manual pendientes, no se declaran verificadas.

**Siguiente objetivo:** Habilidades Blandas M3, cuota acumulativa por juego y subtema **30/50/70**, preservando los 2400 registros de M1/M2.

## Publicación verificada — 21 de noviembre de 2026

- PR #45 fusionado en `main`: https://github.com/c2melendez/desafio-gramatical/pull/45; SHA `2612d414a3164fe0291028ef09e92e861b14cd5e`.
- CI de PR **SUCCESS**: https://github.com/c2melendez/desafio-gramatical/actions/runs/44955114766.
- CI principal **SUCCESS**: https://github.com/c2melendez/desafio-gramatical/actions/runs/44955329544, mismo SHA `2612d414a3164fe0291028ef09e92e861b14cd5e`.
- Render **LIVE**: despliegue `dep-dc11dhnb9u1s73fqmkm0`, mismo SHA `2612d414a3164fe0291028ef09e92e861b14cd5e`, https://desafio-gramatical.onrender.com/.
- Auditoría integral M2 aceptada en CI: 72/72 celdas; **2400 IDs**; M1 1080 intactos; **1320 agregados**; 720/720 mutaciones negativas detectadas; inventario global 39300.
- Los 2400 registros no son 2400 capacidades cognitivas independientemente redactadas; se reutilizan 40 anclajes conductuales. Control editorial humano, adecuación psicométrica y prueba visual manual siguen sin certificación.
- El estado del módulo se marca **COMPLETADA únicamente a nivel técnico**. La revisión académica diferida no bloquea la continuidad autorizada.
- **Siguiente módulo:** Habilidades Blandas M3, objetivos 30/50/70 por juego y subtema, conservando todos los registros previos.
- Esta documentación produce un nuevo SHA; debe verificarse CI y Render del nuevo commit antes del cierre definitivo.
