# Política operativa de bloques de Academia PHUMA Play

**Vigencia:** 16 de noviembre de 2026. **Aprobación:** autorización explícita del responsable del proyecto.

## Objetivo vinculante de cada corrida de ampliación

1. Trabajar en **tres subtemas pendientes del mismo tema** por corrida, completándolos antes de comenzar otro tema. La meta para tres subtemas que parten de cero es **405 ejercicios nuevos**: 135 por subtema, 45 originales por juego, distribuidos 10/15/20 por nivel.
2. Completar en la misma corrida el núcleo **10/15/20** por juego y subtema; descontar los ejercicios ya existentes y verificables de la cantidad nueva necesaria. Consultar la [hoja de ruta aprobada](hoja-ruta-expansion-phuma.md). No contar varias modalidades de un mismo pasaje como textos independientes.
3. La cifra de ejercicios y el alcance varían si un subtema ya tiene contenido superior al punto de partida, si faltan subtemas en el tema o si una auditoría editorial obliga a rehacer material. Registrar de forma explícita la desviación respecto a 405 y la causa.
4. Cada ejercicio debe tener **ID estable, competencia explícita en la mecánica, respuesta validable, retroalimentación contextual, nivel y borrador editorial**, además de textos/distractores diferentes entre juegos. Validar unicidad real de textos y alternativas, no solo IDs.
5. Integrar los bancos en rutas, rotación, cobertura y UI; no atribuir preguntas de un juego a otro. Mantener historial local y compatibilidad de partidas previas.
6. **Condiciones estrictas para declarar «corrida completada»:** CI GitHub Actions del commit exacto **success**, auditoría de contenido aprobada y despliegue de **ese mismo SHA** confirmado **Live** en Render. Si alguna condición falta, declarar **«parcial / pendiente»**, nunca «completada».
7. Guardar por corrida un informe de antes/después, juegos y subtemas, total nuevo, archivos modificados, pruebas, commit, run CI, deploy y pendientes editoriales. No confundir ejecución técnica con certificación PHUMA.
8. No se presupone que este procedimiento sea automático o recurrente: se ejecuta cuando el responsable solicita una nueva corrida o cuando se configure explícitamente una automatización independiente.

## Bloque histórico: primera corrida ampliada

**Comprensión lectora**: Vocabulario en contexto, Análisis de textos y Lectura comparada. Aportación objetivo: **324 ejercicios nuevos**, 108 originales por subtema; **405 registros totales** entre las tres modalidades tras añadir los 81 registros preexistentes (27 por subtema). Primer núcleo completo: 3 subtemas × 3 juegos × 3 niveles = **27 combinaciones**. La línea base del catálogo antes de esta corrida es **1,250 registros por modalidad, 72/810 combinaciones con núcleo completo**.

### Plan vigente

Tras completar el núcleo de Comprensión lectora y Categorías gramaticales, continuar **Gramática y semántica** hasta agotar sus subtemas y después Literatura y las otras áreas. No saltar un tema con subtemas pendientes para perseguir una cifra.

## Revisión pedagógica

Cada caso nuevo queda en **editorial-draft**. Un CI aprobado no equivale a ítems validados por docentes, neutralidad cultural, ausencia de respuestas alternativas ni dificultad calibrada. La revisión especializada y el pilotaje permanecen como objetivos separados.
