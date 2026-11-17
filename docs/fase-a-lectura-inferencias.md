# Academia PHUMA Play · Fase A: Inferencias

**Actualización de noviembre de 2026.** Subtema **Comprensión lectora → Inferencias**.

## Primer núcleo cuantitativo completado

Se añadieron **108 lecturas originales distintas entre sí**, distribuidas en tres bancos con 36 textos nuevos cada uno: 7 básicos, 12 intermedios y 17 avanzados. Cada juego conserva sus tres ejercicios antiguos por nivel.

| Juego | Qué evalúa | Básico | Intermedio | Avanzado | Total |
|---|---|---:|---:|---:|---:|
| Detective de ideas | Clasificar una afirmación como explícita, inferida o no sustentada | 10 | 15 | 20 | 45 |
| Verdad o inferencia | Elegir la inferencia sustentada frente a un hecho literal y dos distractores contextuales | 10 | 15 | 20 | 45 |
| Reconstruye el texto | Ordenar una observación, los indicios y una conclusión inferencial prudente | 10 | 15 | 20 | 45 |
| **Total por subtema** | | **30** | **45** | **60** | **135** |

Bancos nuevos: `src/lib/inference-detective-cases.ts`, `src/lib/inference-choice-cases.ts` y `src/lib/inference-reconstruct-cases.ts`.

Las 108 lecturas nuevas son textos diferentes, no permutaciones de las mismas preguntas. Los nueve registros antiguos de lectura por subtema provienen de tres pasajes base por nivel reutilizados entre modalidades: por ello, los **135 registros totales de Inferencias no equivalen a 135 pasajes originales independientes**.

## Rotación y evaluación

Se mantiene la selección de hasta diez lecturas por sesión, dando preferencia a preguntas aún no presentadas. Se guarda el estado por área, tema, subtema, juego y dificultad, conservando el historial local previo. En Detective de ideas, un texto solo queda dominado cuando las tres clasificaciones son correctas. Las respuestas incorrectas se conservan para repasos.

## Validación automatizada y limitaciones

- `scripts/audit-content.ts` controla las tres metas 10/15/20, unicidad de IDs y de pasajes, cuatro opciones distintas y claves válidas en selección, tres etiquetas distintas en clasificación y tres piezas en reconstrucción.
- `src/test/inference-phase-a.test.ts` controla distribución 7/12/17, 108 pasajes distintos, no contaminación de otros cinco subtemas, respuestas y rotación.
- `src/test/inference-games-ui.test.tsx` ejercita los tres juegos en los tres niveles, incluyendo clasificación, retroalimentación de errores y secuenciación correcta.
- La validación **no equivale a revisión pedagógica especializada**: los ítems permanecen marcados `reviewStatus: "editorial-draft"`, sin pruebas psicométricas, revisión docente de distractores o certificación de equivalencia con la PHUMA oficial.

## Próximo objetivo

Continuar **Comprensión lectora → Lectura crítica**, creando tres bancos originales independientes de 36 ejercicios nuevos (7 básicos, 12 intermedios y 17 avanzados), sin inflar el contador al reutilizar textos. Después seguir con los otros cuatro subtemas. La meta final por juego y subtema sigue siendo 30/50/70.
