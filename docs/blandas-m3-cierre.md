# Habilidades Blandas M3 — cierre de ampliación a 30/50/70

**Estado de esta rama: EN_CURSO.** No declarar `COMPLETADA` hasta verificar GitHub Actions SUCCESS, integración `main` y Render LIVE del mismo SHA.

## Alcance, origen y conteos

- Repositorio `c2melendez/desafio-gramatical`, base SHA `202ab1b73b155c7fd55bef86058b208e079684d3`.
- Catálogo de referencia congelado: Git blob SHA1 `059cc139787d59d6342f4a5bd3a9214fc8b338ac`. El alcance son **3 temas, 8 subtemas, 3 mecánicas, 3 niveles = 72 celdas**.
- Objetivos por subtema × juego: **30 Básico, 50 Intermedio y 70 Avanzado**, suma **3.600 registros técnicos**.
- M1: 1.080 registros con IDs y contenido inalterados. M2: 1.320 adicionales inalterados. M3: **1.200 nuevos** (240 básicos, 360 intermedios, 600 avanzados).
- Acumulado: 720 básicos, 1.200 intermedios, 1.680 avanzados = 3.600 en Blandas.
- Inventario previsto transversal: **40.500 registros técnicos** = Español 9.450, Matemáticas 9.900, Naturales 8.550, Sociales 9.000 y Blandas 3.600. No equiparar registros con preguntas semánticamente independientes.
- Los nuevos registros derivan de **40 anclajes conductuales** (cinco por subtema) y de operaciones contextualizadas; el banco es **práctica complementaria** del catálogo, **no una sección oficial PHUMA listada en la guía PRE-U 2026 consultada**. No atribuirles calibración o origen oficial.

## Integración acumulativa y auditoría

- `src/lib/soft-m3.ts`: nuevas entidades `blandas-m3-*`, oráculo de conducta, distractores relacionados, fuente complementaria, explicación situada y tres mecánicas. Capa aditiva sin cambiar modelos M1/M2.
- `src/routes/blandas.tsx`: adopta `softM3Pool` conservando 10 rondas, reinicio, resultados, progreso persistente, puntuación, retroalimentación y selección contextual.
- `src/lib/coverage.ts`, `scripts/inventory-items.mjs`: cuotas 30/50/70 en las 72 celdas, 3.600 en Blandas y 40.500 globales.
- `src/test/soft-m3-integration.test.ts`: cotejo inmutable M1/M2 (2.400), unicidad, 1.200 nuevos, fuente complementaria, oráculo, sesión 10/10 y rotación sin repetición por ronda.
- `scripts/audit-soft-m3.mjs`: revisión estructural del 100 % del banco M3 acumulado, hashes SHA256 por ID, cotejo de 72 celdas, familias, déficits y **720 mutaciones negativas** basadas en diez clases, conservando registros M1/M2.
- `scripts/audit-soft-m1.mjs`, `scripts/audit-soft-m2.mjs` y pruebas históricas: conservan el control sobre sus núcleos originales, cotejando cobertura actual M3 sin declarar que M1/M2 cambiaron.
- `.github/workflows/ci.yml` archiva `blandas-m3-integral`, además de auditorías previas y M0. `docs/m0-contract-lock.json` versiona el cambio de cobertura y ruta.

## Limitaciones y puertas

- La auditoría estructural N1 ejecutada en CI no sustituye una lectura docente independiente, ni comprueba necesariamente neutralidad, ausencia de pistas semánticas o equivalencia psicométrica.
- Revisión académica y cognitiva: **PENDIENTE_AUTORIZADA**. Inspección visual manual escritorio/móvil, teclado, lectores asistivos: **NO_EJECUTADA**.
- Se deben comprobar resultados verdaderos CI de PR, CI de `main`, Render LIVE del mismo SHA; si esta documentación se modifica posteriormente, se repiten verificaciones para ese SHA.
- El siguiente objetivo es **Habilidades Blandas CORTE de área**, seguido de la reconciliación global M4 de 40.500 posiciones técnicas. Las revisiones docentes podrán continuar pendientes sin declararse aprobadas.

## Publicación

**PENDIENTE**: registrar PR, SHA, auditoría, CI y Render verificados. No marcar el módulo completo hasta aprobar todos los controles técnicos.
