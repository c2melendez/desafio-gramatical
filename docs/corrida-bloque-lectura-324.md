# Corrida PHUMA Play — bloque de tres subtemas de Comprensión lectora

**Política:** [tres subtemas por corrida](politica-corridas-bloques.md). **Fecha:** 16 de noviembre de 2026.
**Estado:** la finalización solo se confirma cuando GitHub Actions es `success` y Render indica `Live` para el mismo commit; los detalles verificables se consignan en el informe de ejecución de GitHub/Render.

## Qué cambió

Ampliados conjuntamente **Vocabulario en contexto**, **Análisis de textos** y **Lectura comparada**. Tres bancos por subtema y mecánicas:

| Subtema | Detective de ideas | Verdad o inferencia | Reconstruye el texto | Nuevos | Total con legados |
|---|---:|---:|---:|---:|---:|
| Vocabulario en contexto | 36 | 36 | 36 | 108 | 135 |
| Análisis de textos | 36 | 36 | 36 | 108 | 135 |
| Lectura comparada | 36 | 36 | 36 | 108 | 135 |
| **Total** | **108** | **108** | **108** | **324** | **405** |

Cada banco nuevo contiene **7 básicos, 12 intermedios y 17 avanzados**. Se conservan tres ejercicios previos por nivel y juego, resultando 10/15/20 por juego y subtema. La cobertura global esperada pasa de **1,250 a 1,574 registros por modalidad**, y de **72 a 99/810** combinaciones con primer núcleo completo, sujetas a auditoría.

## Criterios de diseño

- **Vocabulario:** 36 palabras y nociones; tres contextos escritos para cada término (situación inicial, aplicación en otra oración y tercera escena). Los modos clasifican evidencia, seleccionan una acepción y ordenan la deducción de significado. Se **reutiliza deliberadamente la misma noción léxica** entre juegos para transferir conocimientos; no se reutiliza el mismo párrafo.
- **Análisis de textos:** 36 objetivos discursivos (narrar, explicar, argumentar, sintetizar, contrastar, evaluar fuentes y metodologías, etc.). Cada objetivo utiliza tres situaciones de lectura distintas, una por juego. Se reutiliza la competencia o estructura discursiva, **no el pasaje completo**.
- **Lectura comparada:** 36 pares temáticos de documentos. Cada juego ofrece un encuadre de lectura distinto del par de fuentes: identificar datos e inferencias, seleccionar coincidencia/diferencia o reconstruir una síntesis comparativa. **Hay paralelismo entre fuentes y objetivos de las modalidades**; los textos de actividad son distintos, pero sus ideas base se comparten para practicar transferencia. Esta limitación debe considerarse durante la revisión docente.
- Cada ejercicio tiene ID estable, clave evaluable, explicación contextual y `reviewStatus: "editorial-draft"`; la selección mantiene rotación por subtema/modo/nivel y los resultados se conservan en el historial local.

## Código y verificaciones

- `src/lib/reading-vocabulary-block.ts`, `src/lib/reading-analysis-block.ts`, `src/lib/reading-comparison-block.ts`.
- `src/lib/reading.ts`, `src/components/games/ReadingGames.tsx`, `src/routes/lectura.tsx`.
- `scripts/audit-content.ts` comprueba nueve bancos, objetivos por nivel, claves, formatos, longitud mínima y unicidad de pasajes y IDs.
- `src/test/reading-block-324.test.ts` verifica conteos, cobertura, claves y la conservación de Lenguaje figurado sin ampliar.

## Revisión editorial y limitaciones

Los 324 registros están **en estado de borrador editorial**. Las tres modalidades de cada concepto tienen textos diferentes pero usan una temática compartida; la prueba automática de unicidad literal no demuestra independencia cognitiva absoluta. Los distractores y la clasificación de las inferencias requieren validación humana. Las pruebas técnicas tampoco acreditan equivalencia con el examen oficial PHUMA. Deben revisarse el nivel real, ambigüedades, progresión y variedad antes de declarar calibración.

## Próximos pasos

Completar **Lenguaje figurado** (último subtema pendiente de Comprensión lectora). La política autoriza un bloque menor cuando se agotan los subtemas de un tema, sin saltar al siguiente para inflar artificialmente la cuota de 324. Después continuar con Gramática y semántica y sus subtemas pendientes.
