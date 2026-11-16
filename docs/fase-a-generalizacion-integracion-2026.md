# Fase A — Generalización e integración

**Academia PHUMA Play | 16 de noviembre de 2026**

## Primer núcleo de los cinco subtemas de Redacción

Se crearon **108 casos nuevos** para **Comunicación y Español → Redacción → Generalización e integración**. Cada juego dispone de un banco propio de 36 casos (7 básicos, 12 intermedios y 17 avanzados nuevos), además de los tres casos previos por nivel, hasta sumar 10/15/20.

| Juego | Tarea | Básico | Intermedio | Avanzado | Total |
|---|---|---:|---:|---:|---:|
| Cazador de errores | Detectar generalizaciones excesivas y escoger una revisión que respete las evidencias | 10 | 15 | 20 | 45 |
| Conclusión sustentada | Seleccionar la conclusión que corresponde a la muestra, el indicador y la evidencia | 10 | 15 | 20 | 45 |
| Editor experto | Ordenar observación, comprobación y síntesis proporcional a los datos | 10 | 15 | 20 | 45 |
| **Total** | | **30** | **45** | **60** | **135** |

Archivos: `src/lib/generalization-error-cases.ts`, `src/lib/generalization-choice-cases.ts` y `src/lib/generalization-editor-cases.ts`.

El contenido incluye muestra frente a población, correlación frente a causalidad, diferencias entre indicadores, sesgo de selección, resultados positivos y negativos, comparación de tasas y escalas, fuentes históricas, efectos medios y heterogeneidad. Son actividades diferenciadas por mecánica y enunciados, no un archivo de preguntas repetidas con distinto orden.

## Funcionamiento

Se conserva la rotación local por área/subtema/juego/nivel, que presenta preguntas inéditas antes de repetir y permite revisar errores en sesiones posteriores. El resultado se integra en el historial preexistente, sin migraciones destructivas. La portada permite consultar la cobertura real del juego.

`bun run audit:content` comprueba claves, alternativas distintas, formatos completos y el cumplimiento 10/15/20 para los **cinco subtemas de Redacción**. `src/test/generalization-games-ui.test.tsx` valida los tres juegos en las tres dificultades, junto con pruebas de bancos y rotación.

## Alcance de la fase

Con este lote, Redacción acumula **675 registros por modalidad** (5 subtemas × 3 juegos × 45 ejercicios). La cifra incluye los **135 casos originalmente compartidos entre las tres mecánicas** y **540 registros nuevos separados por juego**. Por ello, no debe confundirse el total de registros por modalidad con 675 enunciados absolutamente independientes ni con contenidos aprobados por especialistas.

**Los nuevos bancos conservan `reviewStatus:"editorial-draft"`.** Las pruebas automáticas no prueban ausencia de interpretaciones alternativas, nivel psicométrico ni alineación oficial con PHUMA. La revisión docente y el piloto con estudiantes aún están pendientes.

### Siguiente objetivo

La primera meta cuantitativa de Redacción está alcanzada. Se recomienda realizar una revisión pedagógica del contenido de los cinco subtemas, reforzar explicaciones y variedad de distractores y continuar la ampliación de **Comprensión lectora**, mientras la meta final de Redacción sigue siendo **30 básicos, 50 intermedios y 70 avanzados por juego y subtema**.
