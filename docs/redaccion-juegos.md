# Academia PHUMA Play — Módulo Redacción

**Fase 3 del proyecto. Actualización del 16 de noviembre de 2026.**

## Alcance entregado

Se incorpora **Comunicación y Español → Redacción**, con cinco subtemas: **Corrección, Conectores, Organización textual, Elisión y adición, Generalización e integración**. En cada subtema se ofrecen los tres juegos de la propuesta, a nivel **Básico, Intermedio y Avanzado**.

| Modalidad | Juego | Actividad que practica |
|---|---|---|
| Reconocer (`clasificar`) | **Cazador de errores** | Leer un enunciado problemático, detectar el tipo principal de fallo y revisar una explicación específica (concordancia, ambigüedad, redundancia, cohesión, argumentación, etc.). |
| Aplicar (`quiz`) | **Conector correcto** | Completar un enunciado con el conector lógico apropiado; las otras alternativas pertenecen a tipos lógicos diferentes para reducir respuestas equivalentes. |
| Construir (`construir`) | **Editor experto** | Ordenar tres fragmentos para formar un párrafo coherente, con corrección, explicación y opción de deshacer. El orden de fichas varía por reactivo. |

**Datos:** el banco `src/lib/writing.ts` tiene 45 escenarios originales (5 subtemas × 3 niveles × 3 casos), reutilizados por las tres mecánicas para comprobar habilidades distintas. Esto no equivale a 135 escenarios narrativos independientes, ni a preguntas extraídas de exámenes reales.

**Dificultad:** el nivel inicial se orienta a nociones claras de concordancia, secuencia y redundancia; el intermedio aplica conectores, relaciones textuales y errores de generalización; el avanzado añade precisión argumentativa, validez de inferencias, sesgos y comparación de fuentes. Esta clasificación es **pedagógica, no psicométrica**.

## Integración y compatibilidad

- La pantalla principal marca como disponibles los cinco subtemas del nuevo módulo y conserva el estado «en desarrollo» del resto del catálogo.
- Ruta propia validada `/redaccion?subtema=…&modo=…&nivel=…`.
- La ruta original `/jugar` conserva los tres juegos de **Categorías gramaticales**; `/lectura` mantiene los de **Comprensión lectora**.
- Los resultados de Redacción se guardan en el historial existente mediante campos académicos **opcionales** (área, tema, subtema). No se migran ni borran notas previas. Los tres juegos mantienen puntuación por rachas y revisión de respuestas incorrectas.
- El almacenamiento sigue siendo local en el dispositivo y no transmite datos personales ni inventa un puntaje oficial de admisión sobre 1,600.

## Validación

Se añadieron pruebas del catálogo, de los 45 registros únicos, de las 4 alternativas distintas y con clave única por enunciado, del orden de los fragmentos y de la nueva ruta generada de TanStack Router. El workflow compila y genera rutas **antes** de ejecutar los tests, evitando que un árbol de rutas obsoleto produzca fallos falsos.

## Limitaciones y control editorial posterior

El uso de tres casos por subtema y nivel es todavía una cantidad inicial: deben agregarse variantes realmente distintas, ejemplos con criterios inequívocos y retroalimentación personalizada por cada distractor. **Editor experto** trabaja ordenamiento lógico de tres oraciones, no edición libre de textos; no debe presentarse como prueba de producción escrita integral. En conectores, la separación por relaciones lógicas reduce ambigüedades, pero debe seguir auditándose el contexto gramatical de cada frase. El banco es contenido educativo original, no material oficial ni validado por la UNAH.

## Siguiente módulo

Se recomienda desarrollar **Literatura** mediante **Identifica la figura**, **Duelo de géneros** y **Completa el recurso**, en ambos subtemas *Figuras retóricas* y *Géneros literarios*. Posteriormente, fortalecer el corpus de Español antes de pasar a Matemáticas.
