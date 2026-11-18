# Matemáticas M1 — núcleo técnico de Academia PHUMA Play

Fecha de trabajo: 17 de noviembre de 2026. Documento de aceptación **candidata**, pendiente CI de `main` y Render Live del **mismo SHA** para el cierre definitivo.

## Origen, alcance e inventario

- Referencia curricular: `GUIA-PRE-U-UNAH-2026.pdf`, página 6 (Competencias matemáticas): Aritmética, Álgebra, Geometría y Estadística/probabilidad; contenidos expresamente enumerados: operaciones con números reales, proporcionalidad y porcentaje, MCD/MCM, ecuaciones cuadráticas, inecuaciones lineales, patrones algebraicos, ángulos, triángulos/perímetro/área, Pitágoras, sólidos, dispersión e interpretación de tablas/gráficas. Los otros subtemas del catálogo están señalados como **práctica complementaria**, no como apartado oficial inequívoco.
- Inventario basal de Matemáticas: **0** registros técnicos; incorporación: **2.970** registros del núcleo. Cuatro temas y 22 subtemas × 3 juegos × 3 niveles = **198 celdas**, con **10 básicos + 15 intermedios + 20 avanzados por juego y subtema**.
- Desglose por tema: Aritmética, 810; Álgebra, 945; Geometría, 675; Estadística y probabilidad, 540. Total: **2.970**, de los cuales 990 pertenecen a cada modalidad (clasificar, quiz, construir).
- **66 combinaciones** de juego y subtema. Cada partida selecciona **10 IDs únicos** con prioridad de ejercicios no vistos; las tres respuestas internas del clasificador y las dos decisiones de construcción son **una única ronda**.
- El código genera registros de 22 modelos matemáticos parametrizados con claves y procedencias estables. **2.970 registros técnicos no significan 2.970 problemas conceptualmente independientes**. El informe de CI distingue 1.659 textos de enunciado distintos a nivel global, debido a familias y variantes compartidas. La equivalencia curricular y psicométrica queda pendiente.

## Aplicación, interfaz y regresiones

- Ruta jugable: `/matematicas?subtema=Operaciones&modo=quiz&nivel=principiante`, y opciones equivalentes para los 22 subtemas, tres juegos y tres niveles; menú desbloqueado únicamente en Matemáticas además de las materias históricas.
- Paridad: encabezado universal `GameSessionHeader` con **Salir contextual, Reiniciar, Ronda/Puntaje/Racha y barra**, botonería y tokens del Desafío Gramatical original; `MathExerciseCard` ofrece clasificación de tres afirmaciones, elección de cuatro resultados y construcción de dos cálculos consecutivos; `LearningFeedback` explica regla y operación con el signo y unidades pertinentes.
- Diez rondas por partida, corrección única por ronda, historial e IDs de rotación separados por área, tema, subtema, juego y nivel, sin borrar ni migrar destructivamente el historial de Español.
- Descripciones educativas de los 22 subtemas en la franja aqua del menú y etiquetas curriculares diferenciadas.
- Verificación por celda: cuatro respuestas diferentes, clave alcanzable, tres juicios de clasificación, dos elecciones constructivas, oráculo numérico independiente para cada modelo, racionales exactos, 10 selecciones sin duplicados, rotación inédita y revisión de explicación y fórmula efectivamente visibles. Los 2.970 registros tienen IDs únicos; 0 rechazos técnicos.
- Pruebas funcionales y de regresión de Español, inventario M0 e historial, y construcción de rutas se ejecutan en GitHub Actions. La prueba automática de componentes no sustituye la inspección visual píxel a píxel ni pruebas reales con todo tipo de dispositivos.

## Evidencias y aceptación

- PR de trabajo: https://github.com/c2melendez/desafio-gramatical/pull/13
- CI de validación antes de este documento: https://github.com/c2melendez/desafio-gramatical/actions/runs/44247179634, conclusión `success` en la revisión candidata `cf02b4dabd4c56aa0a2599c3b5a4dc94463c4e07`.
- Artefacto: `matematicas-m1-integral` ID `14401973764`; `PASS`, 198 celdas, 2.970 IDs técnicos, 0 fallos de oráculo, 0 errores de respuestas ni duplicados dentro de celda.
- **Puerta final obligatoria:** volver a ejecutar CI del commit final de `main`, comprobar despliegue Render Live con su SHA y prueba HTTP pública antes de cambiar `matematicas-M1` a `COMPLETADA`.

## Límites y continuidad

La revisión docente permanece **PENDIENTE**, autorizada expresamente por el usuario. No se emite acreditación de independencia semántica, nivel de dificultad ni calibración psicométrica. No se presentan preguntas como oficiales ni se estima puntuación PHUMA a partir del juego.

Siguiente etapa tras cerrar la publicación: **Matemáticas M2**, expansión acumulada 20/35/45 por juego y subtema, preservando todos los IDs y usando la misma política de paridad y auditoría por ejercicio.

## Registro de publicación e integración del núcleo

- PR #13 fusionado en `main`: commit `b1fbe5faa00391010f2df8372a2e54765913dea1`.
- CI oficial del commit fusionado: [Actions #44247740638](https://github.com/c2melendez/desafio-gramatical/actions/runs/44247740638), **SUCCESS**.
- Render del mismo commit: despliegue `dep-dbujs7m0tbcc73d197kg` **Live** en https://desafio-gramatical.onrender.com/.
- El commit que incluye este registro documental deberá superar nuevamente CI y Render Live en su propio SHA antes del cierre de evidencia final. El estado de revisión académica sigue expresamente pendiente.
- **Siguiente módulo:** `matematicas-M2` (acumulado 20/35/45), sin alterar el núcleo ni sus IDs.


## Addenda de pertinencia curricular (18-11-2026; pre-M2)

Tras contrastar M1 con ejemplos oficiales PHUMA de paralelas/ángulos, esfera y gráficos, la aceptación técnica de 2.970 registros **no implica cumplimiento suficiente del constructo visual**. `MathModel` y `MathExerciseCard` carecen de entradas y renderizador de estímulos gráficos; las modalidades actuales pueden usarse para cálculo simbólico, pero no cubren necesariamente interpretación de figuras y gráficos. Se abre una **rehabilitación pedagógica/visual de M1** y se suspende la ampliación masiva de celdas con brecha hasta aplicar la norma `docs/norma-validez-estimulos-visuales.md` y la auditoría `docs/auditoria-matematicas-m1-validez-visual-20261118.md`. CI/Render históricos certifican funcionamiento, no equivalencia con PHUMA. La revisión docente sigue pendiente. Se preservan banco e historial actuales.
