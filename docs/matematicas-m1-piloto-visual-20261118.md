# Matemáticas M1 — implementación piloto de visualidad esencial (18-11-2026)

Estado: **candidata a CI y pruebas de producción**, no certificación pedagógica. Implementa el primer bloque de rehabilitación dispuesto por `docs/norma-validez-estimulos-visuales.md`. No se inicia M2.

## Cambios concretos
- `src/lib/math-visual.ts`: contrato discriminado de cinco estímulos semánticos; función-oráculo independiente y consignas orientadas a leer el objeto.
- `src/components/games/MathVisualStimulus.tsx`: renderizadores deterministas SVG (triángulo con ángulos, triángulo rectángulo, barras, recta de intervalo abierto, función lineal), con descripciones accesibles que entregan datos pero nunca la clave explícita. No requieren recursos externos.
- `src/lib/math-m1.ts`: **solo modalidad `quiz`** rediseñada en cinco subtemas; 10 básicos +15 intermedios +20 avanzados por subtema = **225 registros técnicos con visual esencial**, sin incorporar nuevos IDs ni modificar límites del banco.
- `src/components/games/MathExerciseCard.tsx`: coloca el estímulo antes de las respuestas, preservando el encabezado, 10 rondas y retroalimentación; el resultado se sigue emitiendo una vez por ronda.
- `src/routes/matematicas.tsx`: los nombres visibles de los juegos de selección de Funciones e Inecuaciones corresponden a la habilidad.
- `src/test/math-m1-visual-pilot.test.tsx`: contratos de las 225 representaciones, explicación causal, oráculos y mutaciones negativas, accesibilidad de un SVG y cierre de una ronda.

## Matriz aplicada
| Subtema | Mecánica intervenida | Representación | Habilidad |
|---|---|---|---|
| Funciones | quiz | recta con dos pares ordenados | inferir regla lineal y evaluar entrada |
| Inecuaciones | quiz | recta, extremo abierto y marcas | leer extremo e interpretar intervalo |
| Ángulos | quiz | triángulo con dos ángulos marcados | obtener el faltante sin estimar distancias del dibujo |
| Pitágoras | quiz | triángulo rectángulo con dos catetos | interpretar figura y calcular hipotenusa |
| Tablas y gráficas | quiz | barras diarias | extraer datos y totalizar valores |

## Límites explícitos
- **225/2970** registros técnicos han recibido estímulo visual esencial en esta fase: es una cuenta de implementación, **no** de preguntas aprobadas académicamente. Los otros 2745 registros no quedan invalidados automáticamente: pueden evaluar cálculo simbólico útil, pero sus competencias y mecánicas deberán revisarse.
- Los modos `clasificar` y `construir` de estos mismos subtemas continúan textuales y **no** pasan a visuales aptos en la contabilidad. No se proclama cobertura visual completa de los 22 subtemas.
- El triángulo y la recta de función son esquemáticos, no están a escala: no se permite inferir magnitudes midiendo el SVG. La recta de función usa coordenadas rotuladas, no valores derivados de píxeles.
- Hace falta ampliar el conjunto de familias independientes, introducir ángulos con paralelas y transversal, sólidos con cotas y figuras compuestas, mejorar exactitud gráfica de barras e intervalos, capturas reales escritorio/móvil, revisión docente y recalcular aptitud G0–G5 por ID.
- No se alteran IDs, rotación, sesiones, historial ni niveles preexistentes. Las explicaciones redactadas para los ejercicios visuales interpretan explícitamente el diagrama.

## Puerta de aceptación
CI debe aprobar pruebas nuevas y regresiones completas. Para usar este piloto en producción se requiere fusionar su PR, verificar Render Live con el SHA de `main` y probar la navegación y diez rondas en un dispositivo real. **No cerrar M1 pedagógicamente ni iniciar expansión M2 sin completar la rehabilitación restante.**
