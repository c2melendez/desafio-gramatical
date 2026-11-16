# Fase A — Organización textual (Academia PHUMA Play)

**Fecha:** 16 de noviembre de 2026. **Estado:** núcleo de contenido implementado en código y sujeto a revisión editorial docente.

## Alcance

Se desarrollaron **108 casos nuevos** para el subtema **Comunicación y Español → Redacción → Organización textual**, separados en tres bancos independientes:

| Juego | Habilidad principal | Básico nuevos | Intermedio nuevos | Avanzado nuevos |
|---|---|---:|---:|---:|
| **Cazador de errores** | Leer un texto desorganizado y escoger la mejor reparación editorial entre cuatro propuestas | 7 | 12 | 17 |
| **Continúa el texto** | Elegir la oración que desarrolla un texto conservando pertinencia, continuidad y alcance | 7 | 12 | 17 |
| **Editor experto** | Reordenar tres fragmentos originales para construir una secuencia explicativa o argumentativa | 7 | 12 | 17 |

Se preservaron los **3 casos previos por nivel y juego**. Así, cada juego dispone de **10 básicos, 15 intermedios y 20 avanzados**: 45 registros por juego y **135 en Organización textual**.

Los bancos nuevos se mantienen separados en:
- `src/lib/organization-error-cases.ts`
- `src/lib/organization-choice-cases.ts`
- `src/lib/organization-editor-cases.ts`

Los casos trabajan cronología, claridad de instrucciones, unidad temática, pertinencia de pruebas, organización de comparaciones, estructura argumentativa y límites de las conclusiones. En el modo de selección, la etiqueta de la partida cambia a **«Continúa el texto»** y las alternativas largas se presentan en una sola columna. En el modo de corrección, la interfaz muestra la **revisión recomendada**, no una oración reemplazada mecánicamente.

## Rotación y conservación del progreso

Se mantiene `src/lib/rotation.ts`, con claves por área, tema, subtema, juego y nivel. La selección ofrece primero ejercicios inéditos y evita IDs duplicados dentro de una sesión de hasta diez preguntas. Las respuestas falladas pueden reaparecer más adelante, sin reemplazar el historial previo ni el almacenamiento de Categorías gramaticales y Comprensión lectora.

## Validaciones

`bun run audit:content` verifica los tres núcleos 10/15/20, IDs, alternativas distintas, presencia de clave única, texto y explicación. `src/test/phase-a-content.test.ts` revisa cantidades y separa los bancos. `src/test/organization-games-ui.test.tsx` comprueba mediante interacciones de interfaz los tres juegos en los niveles básico, intermedio y avanzado, incluyendo errores, aciertos y secuencias.

**Límite esencial:** La comprobación automática demuestra consistencia estructural y funcionamiento, no equivalencia con ítems de la PHUMA ni aprobación pedagógica. Las opciones y secuencias siguen marcadas como `reviewStatus: "editorial-draft"`; es indispensable una revisión docente para detectar posibles interpretaciones alternativas, sesgos, lecturas poco naturales y dificultad no calibrada.

## Estado de la Fase A

Con esta ampliación, **Conectores, Corrección y Organización textual** alcanzan el primer núcleo de cantidad en sus tres juegos. Quedan en Redacción **Elisión y adición** y **Generalización e integración** para completar el núcleo de cinco subtemas. La meta posterior sigue siendo **30 básicos, 50 intermedios y 70 avanzados por juego/subtema**, con revisión editorial y rotación sin repetición innecesaria.

El desarrollo de nuevas preguntas no altera la escala lúdica ni convierte los puntos en puntajes oficiales PHUMA.
