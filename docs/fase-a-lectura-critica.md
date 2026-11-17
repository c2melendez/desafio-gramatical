# Academia PHUMA Play — Fase A: Lectura crítica

**Estado:** primer núcleo cuantitativo implementado; revisión editorial especializada pendiente.

## Cobertura alcanzada

Se incorporaron **108 pasajes originales nuevos**, separados por modalidad en tres bancos de 36 casos, con 7 básicos, 12 intermedios y 17 avanzados. Los tres casos preexistentes de cada nivel por juego se conservan.

| Juego | Objetivo pedagógico | Básico | Intermedio | Avanzado | Total |
|---|---|---:|---:|---:|---:|
| Detective de ideas | Distinguir información explícita, inferencia plausible y afirmación sin sustento | 10 | 15 | 20 | 45 |
| Verdad o inferencia | Identificar la evaluación crítica respaldada por datos, distinguiéndola de detalle y exageraciones | 10 | 15 | 20 | 45 |
| Reconstruye el texto | Ordenar afirmación, contraste de evidencias y juicio crítico | 10 | 15 | 20 | 45 |
| **Total por modalidad** | | **30** | **45** | **60** | **135** |

Los tres bancos son:
- `src/lib/critical-detective-cases.ts`
- `src/lib/critical-choice-cases.ts`
- `src/lib/critical-reconstruct-cases.ts`

Los contenidos examinan confiabilidad de fuentes, generalizaciones injustificadas, sesgo de selección, escala de gráficos, causalidad frente a asociación, contradicciones entre documentos, metodologías incompatibles, conflictos de interés, incertidumbre y falta de contexto. Los pasajes nuevos están separados entre juegos; no se trasladaron los mismos 36 textos entre modalidades para inflar la cifra.

**Matiz cuantitativo:** los 135 registros totales del subtema incluyen 108 pasajes nuevos independientes y 27 configuraciones anteriores asociadas a un banco inicial compartido por modalidad. La cifra de registros no equivale a 135 textos únicos nuevos.

## Rotación y respuestas

La función `readingPool` agrega el banco correcto según subtema, nivel y juego. La selección `readingItems` utiliza el mecanismo existente para priorizar inéditos hasta un máximo de diez preguntas por sesión. El progreso local sigue diferenciado por subtema, modo y nivel, sin modificar el historial anterior. En la clasificación, las tres etiquetas de un mismo pasaje deben acertarse para registrar el ejercicio como dominado.

`scripts/audit-content.ts` comprueba objetivos 10/15/20, unicidad de IDs y pasajes, longitud mínima de textos, claves de selección y estructura de razonamientos. `src/test/critical-reading-phase-a.test.ts` verifica cobertura, consistencia y rotación; `src/test/critical-reading-games-ui.test.tsx` ejercita los tres juegos en los tres niveles.

## Advertencias editoriales

Todos los casos nuevos están etiquetados `reviewStatus: "editorial-draft"`. La validación técnica no demuestra que las alternativas sean inequívocas para toda persona, que el nivel de dificultad sea equivalente a la PHUMA oficial o que la progresión esté calibrada psicométricamente. Requieren lectura docente, corrección de distractores cuando corresponda y pruebas piloto.

## Siguiente objetivo

Continuar con **Comprensión lectora → Vocabulario en contexto**. Después quedarán Análisis de textos, Lectura comparada y Lenguaje figurado para cerrar el primer núcleo de los siete subtemas de lectura. La meta final permanece en **30 básicos, 50 intermedios y 70 avanzados por juego y subtema**.
