# Fase A de Academia PHUMA Play — Núcleo de contenido y rotación

**16 de noviembre de 2026 · Alcance implementado:** infraestructura de cobertura, auditoría automática y primer lote de **Redacción → Conectores en sus tres juegos**. No se afirma que todos los módulos de Fase A estén completos.

## Meta de contenidos

La meta por **cada juego y subtema** es:
- Básico (`principiante`): **30** ejercicios independientes; primera etapa **10**.
- Intermedio: **50** ejercicios independientes; primera etapa **15**.
- Avanzado: **70** ejercicios independientes; primera etapa **20**.

El catálogo tiene 90 subtemas × 3 juegos × 3 niveles = **810 combinaciones**, con meta nominal de **40,500 registros**. No equivale a 40,500 problemas cognitivamente independientes mientras existan bancos y contextos compartidos: esta distinción debe constar en los informes.

## Primer lote aplicado y alcance real

El subtema **Redacción → Conectores** tiene un núcleo diferenciado en sus tres juegos, con **36 nuevos casos para cada mecánica** (108 nuevos registros originales, además de los 27 registros utilizados previamente entre los tres juegos). Cada banco tiene 7 ejercicios nuevos básicos, 12 intermedios y 17 avanzados.

| Juego | Modalidad | Básico | Intermedio | Avanzado | Total |
|---|---|---:|---:|---:|---:|
| Cazador de errores | Detectar y reemplazar un conector equivocado | 10 | 15 | 20 | **45** |
| Conector correcto | Elegir un conector que complete una relación lógica | 10 | 15 | 20 | **45** |
| Editor experto | Ordenar tres fragmentos de un razonamiento o párrafo | 10 | 15 | 20 | **45** |
| **Suma** | | **30** | **45** | **60** | **135** |

- `src/lib/connector-error-cases.ts`: nuevos enunciados con un enlace incorrecto señalado y una corrección explicada; **no** son duplicados de los casos de elegir un conector para un hueco.
- `src/lib/connector-cases.ts`: situaciones con un espacio en blanco y cuatro conectores posibles.
- `src/lib/connector-editor-cases.ts`: secuencias originales, con tres fragmentos completos por caso que deben organizarse para comunicar una progresión lógica.

En **cantidad**, las nueve combinaciones de juego/nivel del subtema Conectores alcanzan el primer núcleo de 10/15/20, aunque ninguna alcanza todavía el objetivo final de 30/50/70. Los 108 nuevos casos requieren además una **revisión docente de ambigüedades, corrección contextual y plausibilidad de distractores**. El motor del juego Cazador de errores distingue una modalidad de corrección de conectores de la clasificación de errores general anterior. El editor organiza fichas en lugar de aceptar redacción libre.

El primer objetivo de **todo Redacción** comprende 5 subtemas × 3 juegos × 45 casos = **675 registros**. De ellos, **135 corresponden ahora al núcleo de Conectores**; faltan los otros subtemas y revisión especializada.

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

`bun run audit:content` genera una matriz de las 810 combinaciones y valida los objetivos 10/15/20 **en los tres juegos** de Conectores, Corrección, Organización textual y Elisión y adición, la unicidad de IDs, las cuatro alternativas y clave única en juegos de selección, la corrección visible y la calidad estructural de las secuencias de Editor experto. Este comando se ejecuta como paso obligatorio de CI después de compilación y tests.

`src/test/phase-a-content.test.ts` evalúa cobertura, separación de colas por juego, selección de inéditos, priorización posterior de fallos y comportamiento ante datos dañados. `src/test/writing-games.test.ts` valida que las sesiones de diez rondas no repitan IDs.

**Próximas acciones de Fase A:** revisar pedagógicamente los bancos y ampliar Comprensión lectora; el primer núcleo cuantitativo de los cinco subtemas de Redacción ya está completo, y después avanzar con Comprensión lectora y Gramática. Consulta [el informe de Organización textual](fase-a-organizacion-textual-2026.md) y [el de Elisión y adición](fase-a-elision-adicion-2026.md). Cada ampliación requiere casos realmente distintos y no simples cambios cosméticos. Los casos nuevos están sujetos a revisión editorial adicional; las pruebas automáticas por sí solas no demuestran equivalencia con la PHUMA oficial.


## Cierre de la primera etapa cuantitativa de Redacción

Los cinco subtemas alcanzan 10/15/20 por juego y nivel, con 675 registros por modalidad en Redacción. Se agregaron 108 casos en Generalización e integración. Consulte [el informe de cierre](fase-a-generalizacion-integracion-2026.md). Ningún banco se declara validado por docentes ni calibrado con estudiantes.
