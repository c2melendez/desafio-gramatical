# Fase A de Academia PHUMA Play — Núcleo de contenido y rotación

**16 de noviembre de 2026 · Alcance implementado:** infraestructura de cobertura, auditoría automática y primer lote de **Redacción → Conectores → Conector correcto**. No se afirma que todos los módulos de Fase A estén completos.

## Meta de contenidos

La meta por **cada juego y subtema** es:
- Básico (`principiante`): **30** ejercicios independientes; primera etapa **10**.
- Intermedio: **50** ejercicios independientes; primera etapa **15**.
- Avanzado: **70** ejercicios independientes; primera etapa **20**.

El catálogo tiene 90 subtemas × 3 juegos × 3 niveles = **810 combinaciones**, con meta nominal de **40,500 registros**. No equivale a 40,500 problemas cognitivamente independientes mientras existan bancos y contextos compartidos: esta distinción debe constar en los informes.

## Primer lote aplicado y alcance real

Se agregaron **36 enunciados originales** al banco `src/lib/connector-cases.ts` con clasificación de relación lógica, clave única y explicación individual.

| Nivel | Enunciados previos para este juego | Nuevos enunciados | Disponibles | Núcleo | Meta final |
|---|---:|---:|---:|---:|---:|
| Básico | 3 | 7 | **10** | 10 | 30 |
| Intermedio | 3 | 12 | **15** | 15 | 50 |
| Avanzado | 3 | 17 | **20** | 20 | 70 |
| **Total** | **9** | **36** | **45** | **45** | **150** |

El primer núcleo de **Conector correcto** está completo en cantidad, pero todavía requiere validación humana de la interpretación y plausibilidad de distractores; no está completada su meta final.

Los otros dos juegos de Conectores, así como los demás subtemas de Redacción, conservan su banco original de tres situaciones por nivel. Los nuevos enunciados **no** se reciclan como ejercicios independientes para «Cazador de errores» ni «Editor experto». El primer objetivo de Redacción, completo para los 5 subtemas × 3 juegos, sigue siendo **675 registros**; esta iteración cumple **45** de esa meta para un juego/subtema.

## Selección inteligente, sin recopilar datos personales

Se incorpora `src/lib/rotation.ts`, que conserva la selección por clave:
`phuma-play:rotation:v1:area:tema:subtema:juego:nivel`.

- Selecciona primero ejercicios no respondidos, luego ejercicios fallados en sesiones anteriores, y finalmente respuestas ya dominadas.
- Evita repetir el mismo ID dentro de una sesión; prioriza lo que no apareció recientemente.
- Lleva `seen`, `incorrect` y `last` por combinación sin almacenar correo, nombre ni respuesta elegida.
- Se actualiza al responder y se mantiene al salir y regresar, con sesiones de hasta 10 ejercicios.
- El almacenamiento es `localStorage` y permanece separado de la clave de historial existente; los resultados previos no se migran ni se eliminan.
- Cuando se agota el banco disponible, la repetición es inevitable; por ello la interfaz informa cuántos ejercicios existen frente a las metas.

La rotación se aplica **ya en los juegos de Redacción**, incluso cuando el banco todavía tiene menos de diez preguntas. El antiguo módulo de Categorías gramaticales conserva su sistema de colas e historial propio y Comprensión lectora mantiene su selección existente. Estos módulos no pierden sus datos.

## Cobertura y validación automática

`src/lib/coverage.ts` calcula cobertura por área, tema, subtema, juego y nivel, mostrando una barra de progreso en el menú principal. Este indicador es **cuantitativo**: contar un enunciado no significa que haya sido aprobado por un docente.

`bun run audit:content` genera una matriz de las 810 combinaciones y valida los objetivos 10/15/20 para Conectores, la unicidad de IDs, el número de alternativas, la presencia de una clave única y la existencia de explicaciones. Este comando se ejecuta como paso obligatorio de CI después de compilación y tests.

`src/test/phase-a-content.test.ts` evalúa cobertura, separación de colas por juego, selección de inéditos, priorización posterior de fallos y comportamiento ante datos dañados. `src/test/writing-games.test.ts` valida que las sesiones de diez rondas no repitan IDs.

**Próximas acciones de Fase A:** completar el núcleo 10/15/20 de los juegos «Cazador de errores» y «Editor experto» en Conectores, después los otros cuatro subtemas de Redacción, y avanzar con Comprensión lectora y Gramática. Cada ampliación requiere casos realmente distintos y no simples cambios cosméticos. Los casos nuevos están sujetos a revisión editorial adicional; las pruebas automáticas por sí solas no demuestran equivalencia con la PHUMA oficial.
