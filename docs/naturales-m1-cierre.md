# Ciencias Naturales M1 — cierre técnico del núcleo

**Estado del módulo:** COMPLETADA TÉCNICAMENTE. Revisión académica autorizada pendiente.

## Alcance, línea base y procedencia

- Repositorio: `c2melendez/desafio-gramatical`; SHA de partida `923762ff71d4c9a5e1f86751c0b2c1f3ad91baea`.
- Fuente de estructura: guía PRE-U UNAH 2026, **páginas impresas 7–9 (páginas 8–10 del PDF)**, sección de Ciencias Naturales. La guía incluye biología, química y física. La ontología de la aplicación utiliza **19 subtemas** del catálogo (9 Biología, 5 Química, 5 Física), de los cuales Ecología, Materia, Reacciones y Tabla periódica se identifican como **práctica complementaria** por no figurar con ese rótulo específico en las páginas citadas.
- Unidad de conteo: área × tema × subtema × juego × nivel, tres juegos (clasificación, selección, construcción), tres dificultades. 19 × 3 = **57 combinaciones** y 171 celdas.
- No hay registros previos de Ciencias Naturales en el inventario del SHA base. **M1 exige 10 básicos, 15 intermedios y 20 avanzados por cada combinación**, por tanto 570 + 855 + 1.140 = **2.565 registros técnicos** nuevos.
- Se curaron **190 anclajes de concepto, función y situación** (diez por subtema), usados por familias de práctica. Los 2.565 registros **no equivalen a 2.565 ejercicios conceptual o psicométricamente independientes**. La independencia, revisión científica externa y certificación docente quedan PENDIENTES, incluso cuando las pruebas estructurales pasan.

## Nuevos archivos y contratos

- `src/lib/science-m1.ts`: banco por conceptos, hechos y casos originales con IDs estables, origen localizado, clave, distractores, tres afirmaciones de clasificación, dos pasos de construcción, retroalimentación específica, nivel cognitivo y familia.
- `src/lib/science-m1-verifier.ts`: validador estructural autónomo respecto a las tres mecánicas, respuesta, fuente, huellas normalizadas y datos de rotación.
- `src/components/games/ScienceExerciseCard.tsx`: las tres mecánicas se completan como **una ronda**; explica aciertos y errores mediante el componente universal `LearningFeedback`.
- `src/routes/naturales.tsx`: utiliza `GameSessionHeader` y `ROUNDS_PER_GAME=10`, devuelve selección previa, permite reiniciar con confirmación, mantiene racha, historial y rotación por tema/subtema/juego/nivel.
- `scripts/audit-science-m1.mjs` y `src/test/science-m1-integration.test.tsx`: auditoría automatizada de 171 celdas, inventario, unicidad, clasificación, construcción, respuestas, cuotas, progreso, rotación, historia, fuente y mutaciones negativas.
- Contratos editados: `src/lib/coverage.ts`, `src/lib/phuma-catalog.ts`, `src/lib/study-context.ts`, `src/routes/index.tsx`, `scripts/inventory-items.mjs`, regresiones de inventario, `docs/m0-contract-lock.json`, CI y catálogo `docs/modulos-phuma.json`.

## Riesgos y evidencia

**Nivel básico** practica reconocimiento; **intermedio** aplica la relación a una situación, **avanzado** compara hipótesis alternativas. El diseño no certifica por sí solo el grado real de dificultad. Quedan pendientes auditoría docente de plausibilidad científica, duplicación semántica y visual de escritorio/móvil; una fuente de contenido en la guía no implica que el texto de cada ejercicio sea oficial. Se distinguen conteos técnicos, revisión humana y equivalencia con PHUMA.

El manifiesto `docs/naturales-m1-manifiesto-20261120.json` conserva las cuotas y metadatos para reanudar sin duplicar IDs. Los verificadores automáticos y su matriz se archivarán en el artefacto CI `naturales-m1-integral`. La suite completa de M0, Español y Matemáticas no se modifica para eludir requisitos; se ejecuta sobre el SHA integrado.

## Puerta de publicación

No declarar COMPLETADA hasta comprobar **CI SUCCESS y Render LIVE para exactamente el mismo SHA**, auditoría del propio módulo sin fallos y prueba HTTP de ruta pública `/naturales` con nivel representativo. Si un commit documental cambia SHA, repetir los controles sobre ese último SHA.

Próximo módulo, **solo después del cierre técnico de este núcleo**: `naturales-M2`, objetivo acumulado 20/35/45 por combinación (déficit adicional nominal 10/20/25 por combinación, **3.135 nuevos registros técnicos**). El corte completo del área corresponde a M3, no a este núcleo.

## Evidencias verificadas de la publicación M1

- PR #37 fusionado: https://github.com/c2melendez/desafio-gramatical/pull/37. SHA de fusión `f69139376e77d298648f84159e90dcfef25509b8`.
- GitHub Actions en `main`: https://github.com/c2melendez/desafio-gramatical/actions/runs/44690951231 — **completed / success** para `7f21467e8df8c7f12a95a44133de013e43309ab4`. Se ejecutaron las pruebas del nuevo banco, mutaciones negativas, regresiones del inventario, M0 y áreas previas, auditoría de 171 celdas de Naturales y el smoke HTTP. No se omitieron controles obligatorios del pipeline.
- Render: despliegue `dep-dbvuskkipgvc738opl8g` **LIVE** con el mismo SHA `7f21467e8df8c7f12a95a44133de013e43309ab4`, servicio `srv-dbt0rilg1s2s738eku8g`, https://desafio-gramatical.onrender.com/.
- La CI publicó `naturales-m1-integral` con la matriz de todas las celdas; verificó **2.565 IDs únicos y 171 celdas**, diez rondas, selección/clasificación/construcción, claves y explicaciones. Una prueba de navegación adicional comprobó selector, sesión, retroalimentación, reinicio y regreso contextual.
- La prueba HTTP publicada comprendió tres rutas Naturales de los tres niveles y modalidades. Garantiza respuesta HTML, no una inspección visual manual.

| Tema | Subtemas | Combinaciones subtema×juego | Básicos añadidos | Intermedios añadidos | Avanzados añadidos | Total M1 |
|---|---:|---:|---:|---:|---:|---:|
| Biología | 9 | 27 | 270 | 405 | 540 | 1.215 |
| Química | 5 | 15 | 150 | 225 | 300 | 675 |
| Física | 5 | 15 | 150 | 225 | 300 | 675 |
| **Total** | **19** | **57** | **570** | **855** | **1.140** | **2.565** |

**Decisión del corte M1:** módulo integrado y terminado a nivel técnico-operativo; 190 familias de concepto por subtema sustentan 2.565 registros técnicos, no 2.565 preguntas conceptualmente independientes. Revisión docente, fiabilidad científica externa, calibración psicométrica, contrastes gráficos/escritorio/móvil manuales **pendientes/no certificadas**. El commit documental propio debe superar CI/Render también.

**Próxima fase:** Naturales M2, meta acumulada 20/35/45 por combinación; déficit nominal adicional **3.135 registros técnicos** (570 básicos, 1.140 intermedios y 1.425 avanzados). No abrir Sociales hasta terminar M2 y M3 y corte de Naturales.
