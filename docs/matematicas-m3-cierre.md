# Matemáticas M3 — cierre técnico y corte de área

Fecha de trabajo: 19 de noviembre de 2026, hora de Honduras. **Estado: EN_CURSO hasta completar CI en main, Render Live del mismo SHA y prueba pública.**

## Línea base y alcance

Se parte de `6f0dbbf194107c9da7ab19b31f588b7cf4ad7d71` (Matemáticas M2 6.600 registros). El catálogo contiene 4 temas, 22 subtemas, tres juegos y tres niveles. Hay **66 combinaciones de subtema × juego y 198 celdas**. Cada partida mantiene 10 rondas.

| Fase por combinación | Básico | Intermedio | Avanzado | Suma |
|---|---:|---:|---:|---:|
| Acumulado M2 | 20 | 35 | 45 | 100 |
| Aporte M3 | 10 | 15 | 25 | 50 |
| Acumulado M3 | 30 | 50 | 70 | 150 |

El incremento es **3.300 IDs nuevos**: 660 básicos + 990 intermedios + 1.650 avanzados. La meta acumulada es **9.900 registros técnicos**: 1.980 básicos, 3.300 intermedios, 4.620 avanzados; no compensar déficit entre celdas.

## Contratos e integración

- `src/lib/math-m3.ts` ofrece un banco acumulado y una capa de 3.300 registros; no renombra IDs históricos y rechaza estímulos normalizados duplicados en la incorporación.
- `src/lib/math-m1.ts` amplía exclusivamente los dominios de semillas M3 (más de 500.000) para familias saturadas, sin modificar el banco M1.
- Se corrige el normalizador de ejercicios en `src/lib/math-m2.ts`: las expresiones regulares anteriores no descontaban bien los ordinales `(Ejercicio N)` de los enunciados. El reparador vuelve a seleccionar valores para algunos IDs existentes M2 si detecta colisiones, preservando identificadores y claves recalculadas, pero **no prometiendo contenido inmutable para esos IDs corregidos**.
- `src/lib/coverage.ts`, `scripts/inventory-items.mjs` y `src/routes/matematicas.tsx` representan los 9.900 registros seleccionables. Se preservan el historial, rotación, rutas de Matemáticas, comentarios docentes pendientes y sesión de diez rondas.
- `scripts/audit-math-m3.mjs` comprueba los 198 grupos, cantidades por nivel y modalidad, resultado con oráculo independiente, unicidad de ID, estímulo, alternativas y construcción, referencias gráficas, evidencia cognitiva y rotación; publica artefacto `matematicas-m3-integral` en CI.
- Se vuelven a ejecutar los verificadores M0, M1, M2 y Español; se archivan logs y se exige resultado SUCCESS. La auditoría de módulo M3 se realiza durante su propia corrida, no se sustituye por un chequeo futuro.
- Manifiesto para recuperación: `docs/matematicas-m3-manifiesto-20261119.json`; dependencia obligatoria `matematicas-M2`. PR https://github.com/c2melendez/desafio-gramatical/pull/36.

## Limitaciones de validez y corte de área

**Los 3.300 nuevos ID son modelos técnicos de familias parametrizadas; no se acredita independencia semántica ni calibración psicométrica.** Revisar la diversidad conceptual, pertinencia curricular, claridad y accesibilidad de los ejercicios continúa como trabajo académico **PENDIENTE_AUTORIZADO**. Algunos subtemas curriculares ampliados son práctica complementaria y no reactivos oficiales. Fuentes: guía PRE-U UNAH 2026, página 6, catálogo versionado de PHUMA Play.

El **corte técnico** de Matemáticas requiere verificar 9.900 IDs acumulados, las 198 celdas cuantitativamente completas, interacciones de los tres juegos, regresiones, CI SUCCESS en main, Render Live del mismo SHA y prueba HTTP pública. No adjudicar equivalencia oficial ni perfección psicométrica por pasar esas puertas. Si falla un control obligatorio, dejar EN_CURSO, corregir en la rama y reauditar antes de fusionar. El siguiente módulo del orquestador, tras corte técnico, es `naturales-M1` (o el área elegible señalada por el estado reconciliado).
