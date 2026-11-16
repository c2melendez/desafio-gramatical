# Fase A — Elisión y adición

**Academia PHUMA Play · noviembre de 2026**

## Resultado cuantitativo

Se agregaron tres bancos originales para **Redacción → Elisión y adición**, con **36 casos nuevos por juego** y 108 registros nuevos en total. Se preservan los tres casos iniciales de cada nivel y juego.

| Juego | Mecánica | Básico | Intermedio | Avanzado | Total disponible |
|---|---|---:|---:|---:|---:|
| Cazador de errores | Seleccionar una reformulación que elimina redundancias o recupera información necesaria | 10 | 15 | 20 | 45 |
| Revisión precisa | Elegir una reformulación o información omitida, con cuatro alternativas independientes | 10 | 15 | 20 | 45 |
| Editor experto | Ordenar identificación, comprobación y revisión de contenidos | 10 | 15 | 20 | 45 |

**Los 108 registros nuevos corresponden a 7 básicos, 12 intermedios y 17 avanzados por juego.** Se encuentran en `src/lib/elision-error-cases.ts`, `src/lib/elision-choice-cases.ts` y `src/lib/elision-editor-cases.ts`.

Los casos trabajan elisión de redundancias y referentes repetidos, recuperación de información omitida, precisión metodológica, integridad de síntesis, comparación de indicadores y límites de conclusiones. Los bancos son distintos por juego, no meras permutaciones de una frase. Los resultados se guardan localmente mediante el mismo historial y la rotación independiente por subtema, juego y nivel.

## Controles

La auditoría `bun run audit:content` exige 10/15/20 para cada uno de los tres juegos y comprueba unicidad de alternativas y claves, integridad de los enunciados y longitud mínima de las explicaciones. Los test de `src/test/phase-a-content.test.ts` verifican la composición de los bancos y los de `src/test/elision-games-ui.test.tsx` cubren el uso de los tres juegos en los tres niveles.

**Estado editorial:** los nuevos registros permanecen como `reviewStatus:"editorial-draft"`. Las pruebas estructurales y de interacción no sustituyen la revisión de un docente para detectar distractores también plausibles, ambigüedades de referencia, problemas gramaticales o diferencias reales de dificultad.

## Próxima etapa

Completar **Generalización e integración** con el núcleo de 10/15/20 por juego. Después revisar sistemáticamente los cinco subtemas de Redacción y seguir hacia la meta final de **30/50/70 por juego y subtema**, sin confundir cantidades con validación pedagógica ni puntos lúdicos con resultados oficiales PHUMA.
