# Auditoría de claridad y competencia — Comunicación y Español

Fecha de corte: 17-11-2026. Alcance: 4 temas, 21 subtemas, tres juegos y tres dificultades, **189 celdas y 9.450 registros técnicos únicos**. Examen automatizado de cada ID; **no** revisión docente individual acreditada.

## Resultado

**PASS_WITH_EDITORIAL_REVIEW**: 0 defectos estructurales bloqueantes tras reparación; **147 banderas de revisión** que no deben interpretarse como 147 preguntas necesariamente erróneas. Reglas y hallazgos por ID registrados en el artefacto `claridad-competencia-espanol` de GitHub Actions (run 44238650454, artifact 14398173348). El resultado no equivale a un visto bueno curricular, de ambigüedad semántica o psicometría.

| Control | Resultado |
| --- | ---: |
| Registros examinados | 9.450 |
| IDs únicos | 9.450 |
| Defectos bloqueantes estructurales | 0 |
| Textos por encima del umbral de carga (2.200 caracteres) | 0 |
| Señales de orden explícito en redacción | 118 |
| Opciones casi iguales si se ignora puntuación | 22 |
| Explicaciones M2 de gramática relativamente breves | 7 |
| Posibles confusiones de jerarquía de fuentes | 0 |

## Correcciones realizadas

- Reducción de las lecturas M3 de seis textos anidados a **tres textos directos A/B/C**; conservar IDs y trazabilidad de las claves.
- Eliminación de pistas ordinales insertadas por generadores de construcción M2/M3, manteniendo las operaciones de análisis, contraste y conclusión.
- Cambio de asignaciones fijas de evidencia en clasificadores M2/M3: la fuente y la posición ya no revelan automáticamente «explícito», «inferencia» o «no sustentado».
- Corrección de un distractor original del subtema Corrección en nivel intermedio, cuya única diferencia visible con la clave era la mayúscula posterior a una coma; validado en sus derivados M2/M3.
- Explicaciones de secuencia M2 de Redacción enlazadas a la evidencia específica de cada caso, en lugar de textos genéricos.
- Pruebas automáticas de variantes, orden, fuentes, claves e inventario. La misma auditoría se ejecuta obligatoriamente en CI y conserva JSON completo.

## Triaje pendiente que no se debe ocultar

- **118 advertencias de orden:** algunas frases naturales incluyen marcadores temporales que pueden ser pistas legítimas o trivializar la respuesta. Cada caso requiere comprobar si esos marcadores son parte del material lingüístico evaluado antes de retirarlos. No aplicar supresiones masivas que cambien sentido o generen soluciones múltiples.
- **22 advertencias de similitud:** en Corrección y otras tareas las alternativas pueden diferir únicamente por signos de puntuación de forma intencional; confirmar que el enunciado pide precisamente identificar esa regla y que exista una sola respuesta defendible.
- **7 justificaciones breves:** están contextualizadas, pero necesitan comprobar si explican suficiente el matiz de la categoría gramatical según el nivel.

La auditoría no puede determinar por sí sola si dos distractores son semánticamente equivalentes, si la dificultad corresponde a un nivel o si la competencia se mide con validez docente. Estos criterios permanecen como revisión académica pendiente, conforme a la autorización del usuario. Los controles CI y Render certifican funcionamiento técnico, no calidad psicométrica.

**Política transversal permanente:** `docs/norma-paridad-visual.md` v1.2 y `Sistema_modulos_Academia_PHUMA_Play.md` v5.3 en Library. Para todo módulo futuro auditar el 100 % de IDs, registrar `BLOCKER`, `REVIEW` y `DOCENTE`, corregir los defectos objetivos y conservar evidencias de los pendientes. Ningún `PASS_WITH_EDITORIAL_REVIEW` se denominará «validez académica certificada».
