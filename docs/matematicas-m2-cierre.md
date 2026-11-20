# Matemáticas M2 — Ampliación acumulada 20/35/45

Fecha de corrida: 19 de noviembre de 2026 (Honduras). Estado actual del documento: **EN CURSO hasta aprobación del SHA integrado en CI y Render**.

## Alcance congelado

Repositorio canónico: `c2melendez/desafio-gramatical`. Línea base: `5e1b7463162488bd49a150cc05ba09e9b67b08b8`. Cuatro temas, 22 subtemas, tres juegos y tres niveles: **198 celdas; 66 combinaciones subtema × juego**.

| Etapa por juego y subtema | Básico | Intermedio | Avanzado | Total |
|---|---:|---:|---:|---:|
| M1 anterior | 10 | 15 | 20 | 45 |
| Incremento M2 | 10 | 20 | 25 | 55 |
| M2 acumulado | 20 | 35 | 45 | 100 |

Totales nominales auditables: 2.970 existentes, 3.630 IDs nuevos y 6.600 registros técnicos acumulados. La meta real no se rebaja ni se compensa entre niveles.

## Integración y contratos

- `src/lib/math-m1.ts` conserva la función de núcleo y todos sus IDs previos; el parámetro opcional de semilla solo introduce contextos nuevos con espacio numérico ampliado para familias saturadas.
- `src/lib/math-m2.ts` agrega exclusivamente IDs con prefijo `math-m2-` y rechaza colisiones de estímulos normalizados/diagramas durante la generación. El juego invoca el banco acumulado, preserva la rotación de 10 rondas y el historial por área/subtema/juego/nivel.
- `src/lib/coverage.ts` y `scripts/inventory-items.mjs` reflejan el banco total cargable. El contrato M0 se versiona en `docs/m0-contract-lock.json` y sus pruebas se ajustan a la ampliación, sin cambiar el catálogo.
- `scripts/audit-math-m2.mjs` exige estructura, cuotas, clave comprobada con oráculo numérico independiente, alternativas y clasificación, construcción de dos pasos, feedback específico, procedencia, IDs únicos y 10 rondas sin repetición; conserva una matriz por celda en el artefacto `matematicas-m2-integral`.
- `src/test/math-m2-integration.test.ts` valida cuotas acumuladas, preservación del núcleo, unicidad y rotación.
- La batería CI conserva las auditorías previas M0/M1 y de Español junto a las de Matemáticas M1; se exige que no haya etapas obligatorias omitidas ni fallos.

## Límites pedagógicos explícitos

Los 3.630 nuevos IDs pertenecen a familias de ejercicios parametrizadas. **No se declara que sean 3.630 problemas conceptualmente independientes** ni que reproduzcan psicometría oficial PHUMA. La revisión humana queda **PENDIENTE_AUTORIZADA**; este aplazamiento no elimina las puertas técnicas. La auditoría automática no sustituye la valoración de claridad, pertinencia y diversidad de operaciones por docentes ni la inspección real visual/móvil.

La fuente curricular es la guía PRE-U UNAH 2026, página 6, con subtemas no explícitos marcados como práctica complementaria. No se copian reactivos oficiales.

## Evidencia y punto de reanudación

Manifiesto reproducible: `docs/matematicas-m2-manifiesto-20261119.json`. PR de integración: https://github.com/c2melendez/desafio-gramatical/pull/35.

El módulo se acepta técnicamente cuando **la matriz M2 informa 198 celdas y 6.600 registros, `bun run test` y el resto del workflow pasan, `main` recibe el PR, CI resulta SUCCESS y Render LIVE del mismo SHA**. Mientras eso no se documente con IDs verificables, continuar en EN_CURSO.

Próximo módulo al cerrar M2: Matemáticas M3 (30/50/70 acumulados), con déficit nominal adicional de 50 por combinación (10 básicos, 15 intermedios y 25 avanzados).
