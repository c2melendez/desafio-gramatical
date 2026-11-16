# Academia PHUMA Play — Módulo de Comprensión lectora

**Etapa 2, 16 de noviembre de 2026.** Implementación pedagógica original e independiente de la UNAH.

## Alcance disponible

Desde la pantalla de inicio, elegir **Comunicación y Español → Comprensión lectora**. Los siguientes **7 subtemas** permiten jugar:

1. Idea principal
2. Inferencias
3. Lectura crítica
4. Vocabulario en contexto
5. Análisis de textos
6. Lectura comparada
7. Lenguaje figurado

Para cada subtema funcionan **3 modalidades** con **3 dificultades**. En cada nivel se utilizan tres textos (tres rondas por sesión). El banco dispone de **9 pasajes originales**, tres por nivel, y **63 configuraciones de pregunta** (7 habilidades × 9 textos), que sirven como base a las tres mecánicas. **Los nueve textos se reutilizan para practicar distintas habilidades**: estas 63 configuraciones NO representan 63 pasajes ni 189 problemas cognitivamente independientes.

| Juego | Mecánica | Qué evalúa |
|---|---|---|
| **Detective de ideas** | Clasificar tres afirmaciones de un pasaje como **dato explícito**, **inferencia razonable** o **afirmación no sustentada**. | Uso de evidencia y diferenciación entre texto literal, deducción y afirmaciones injustificadas. |
| **Verdad o inferencia** | Pregunta de selección única con cuatro opciones, contextualizada por subtema y lectura; explicación al responder. | Idea principal, inferencias, evaluación crítica, vocabulario contextual, análisis de textos, contraste de perspectivas y lenguaje figurado. |
| **Reconstruye el texto** | Ordenar tres fichas para construir una secuencia de razonamiento: datos → contraste → conclusión. | Coherencia lógica, identificación de evidencia y argumentación. |

Los textos usan ámbitos escolares, comunitarios, científicos e históricos. Básico trabaja reconocimiento; intermedio compara datos y fuentes con reservas metodológicas; avanzado exige identificar diferencias iniciales, sesgos, confusores y límites de causalidad. Las categorías son **niveles internos de práctica**, no dificultades oficiales calibradas con PHUMA.

## Navegación y compatibilidad

- El módulo nuevo usa `/lectura?subtema=…&modo=…&nivel=…` con búsqueda validada. Desde Inicio se enlaza automáticamente cuando se elige Comprensión lectora. Los demás temas sin juegos mantienen el indicador **En desarrollo**.
- La ruta anterior `/jugar?modo=…&nivel=…` y los tres juegos existentes de Categorías gramaticales **no se modifican**.
- Las partidas de lectura se guardan mediante la clave previa de historial `desafio-gramatical:historial`, con campos **opcionales** `area`, `topic` y `subtopic`; los registros gramaticales históricos se conservan. La pantalla de historial distingue ambas modalidades.
- Se mantienen puntuación por acierto, rachas, revisión de errores y repetición de partidas. El porcentaje es del número de clasificaciones/respuestas efectuadas. En Detective de ideas se puntúan tres afirmaciones por ronda; en los otros juegos, una respuesta por ronda.
- No se envía progreso al servidor; no hay backend, ni recuperación entre dispositivos. La puntuación lúdica no se convierte en puntos PHUMA /1600.

## Control de calidad

`src/test/reading-games.test.ts` comprueba:
- 7 subtemas × 3 dificultades × 3 lecturas; IDs únicos y ninguna opción de selección múltiple duplicada.
- Etiquetas de clasificación explícito/inferencia/no sustentado, la comprobación del orden y los tres modos de juego.
- La presencia literal, dentro de los pasajes, de las expresiones figuradas y términos de vocabulario por los que se pregunta.

`src/test/app-routing.test.tsx` confirma que existe la nueva ruta y se conserva la ruta de inicio.

## Limitaciones de esta iteración

El banco es **intencionalmente pequeño** y reutiliza nueve pasajes para distintas habilidades; todavía deben añadirse textos independientes por subtema, respuestas incorrectas más plausibles y revisión docente de las interpretaciones. Los reactivos son originales; no se han copiado ejercicios privados o de acceso restringido. No se afirma que estos juegos sean un examen real de admisión o que la dificultad avanzada tenga calibración psicométrica.

## Próxima etapa

Ampliar el corpus de lectura y la cantidad de variantes por subtema; el módulo de **Redacción ya fue implementado** y se documenta en [redaccion-juegos.md](redaccion-juegos.md). La siguiente etapa curricular es Literatura. La expansión a Matemáticas y demás áreas deberá introducir motores especializados para gráficos, operaciones y ordenamiento de procesos, no reutilizar la mecánica textual sin adaptación.
