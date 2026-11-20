# Ciencias Naturales M2 — ampliación integral

**Estado: EN_CURSO** hasta aprobar auditorías, CI en main, Render Live del mismo SHA y prueba HTTP pública. Revisión científica y docente **PENDIENTE_AUTORIZADA**.

## Origen, alcance y matriz congelada

- SHA base `4953387adc09fda400827e35dd6f3e72b9692cc2`, M1 Naturales cerrado técnicamente con 2.565 registros.
- Temario del catálogo: Biología (9 subtemas), Química (5), Física (5); **19 subtemas, 57 combinaciones subtema × juego, 171 celdas**.
- Tres modalidades, tres niveles, diez rondas por partida. La guía PRE-U UNAH 2026 pp. impresas 7–9 ofrece contenidos de Biología, Química y Física; Ecología, Materia, Reacciones y Tabla periódica son práctica complementaria en este catálogo.
- El nuevo banco `src/lib/science-m2.ts` combina los 2.565 registros M1 **sin modificación de sus campos ni IDs** con una capa propia prefijada `science-m2-`.

| Nivel | M1 previo | Incremento M2 | Total acumulado M2 |
|---|---:|---:|---:|
| Básico | 570 | 570 | 1.140 |
| Intermedio | 855 | 1.140 | 1.995 |
| Avanzado | 1.140 | 1.425 | 2.565 |
| **Total** | **2.565** | **3.135** | **5.700** |

En cada subtema × juego se exige **20/35/45**. No se compensa un nivel deficitario con ejercicios de otro.

## Implementación y validación dentro de M2

- `src/lib/science-m2.ts`: nuevos escenarios originales de observación, comparación y refutación de una explicación cercana. Se emplean los diez hechos y propiedades curadas por subtema, con modelos de clasificación (tres afirmaciones), selección (cuatro alternativas) y construcción (dos decisiones). La clave sigue referida a la observación principal, con contraste explícito de error.
- `src/routes/naturales.tsx` selecciona el banco M2 acumulado sin alterar `GameSessionHeader`, `ROUNDS_PER_GAME=10`, historial, persistencia, reinicio y regreso contextual.
- `src/lib/coverage.ts` publica el nuevo alcance; `scripts/inventory-items.mjs` verifica que los 5.700 sean efectivamente seleccionables. Se actualizan las regresiones globales del inventario (25.050 registros de toda la aplicación; 810 celdas).
- `scripts/audit-science-m2.mjs` audita los 5.700 registros, las 171 celdas, las claves y distractores, duplicados de ID/estímulo normalizado, la procedencia y el mantenimiento íntegro de M1; simula dos rondas de diez ejercicios sin repetir.
- `src/test/science-m2-integration.test.tsx` añade pruebas de todas las cuotas, respuestas y retroalimentación por modalidad, rotación, y mutaciones negativas para clave falsa, distractores repetidos, nivel errado e ID duplicado.
- CI conserva la matriz completa en el artefacto `naturales-m2-integral` y repite M0, Matemáticas, Español y Naturales M1 sin debilitar las puertas heredadas.

## Límites del resultado

Los **3.135 nuevos registros son modelos técnicos de práctica** derivados de 190 anclajes conceptuales; **no son 3.135 problemas conceptualmente independientes demostrados**. Las propiedades científicas proceden de fuentes curriculares curadas en M1, sin verificación académica externa por reactivo ni calibración psicométrica. Las diferencias de niveles reflejan operaciones diseñadas, no dificultad empíricamente certificada. Los casos que requieran revisión mantienen `reviewStatus=editorial-draft` y la leyenda visible de contenido no oficial. Revisión docente pendiente autorizada.

## Condiciones de cierre y siguiente módulo

Un éxito del PR no basta: el módulo M2 requiere CI **SUCCESS** del commit fusionado y Render **LIVE** del mismo SHA, más prueba HTTP pública. La inspección visual manual se declara no ejecutada si no existe evidencia y no se sustituye por un smoke de HTML. Todo informe posterior que cambie SHA exige verificarlo de nuevo.

Siguiente fase, una vez cerrado M2: **Naturales M3**, objetivo acumulado 30/50/70 y aumento nominal de **2.850 registros técnicos** (570 básicos, 855 intermedios y 1.425 avanzados), con corte integral de área tras completar los 8.550 registros acumulados.
