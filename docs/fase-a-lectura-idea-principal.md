# Academia PHUMA Play — Fase A: Comprensión lectora, primera ampliación

**16 de noviembre de 2026**. Se inicia la ampliación de Comprensión lectora, conservando su catálogo de siete subtemas y las mecánicas «Detective de ideas», «Verdad o inferencia» y «Reconstruye el texto».

## Alcance real del primer lote

Se agregaron **108 lecturas originales y completas** distribuidas en tres bancos separados (36 por juego: 7 básicas, 12 intermedias y 17 avanzadas). Los tres juegos de **Idea principal** alcanzan ahora la primera meta cuantitativa de 10/15/20 por nivel. El primer lote fue **Verdad o inferencia**, y esta ampliación añadió **72 textos originales** para **Detective de ideas** y **Reconstruye el texto**. Los textos se identifican por ID y título, tienen un pasaje, cuatro alternativas distintas, una respuesta y una explicación. Se incluyeron **72 distractores específicos del contexto**, sustituyendo alternativas genéricas compartidas, para que el estudiante deba leer el pasaje.

Cada nivel mantiene tres ejercicios anteriores, de forma que el juego de selección dispone de:

| Nivel | Previos | Nuevos | Banco | Primer objetivo | Meta definitiva |
|---|---:|---:|---:|---:|---:|
| Básico | 3 | 7 | **10** | 10 | 30 |
| Intermedio | 3 | 12 | **15** | 15 | 50 |
| Avanzado | 3 | 17 | **20** | 20 | 70 |

**Importante:** cada uno de los tres juegos cuenta exclusivamente sus propias 36 lecturas nuevas; los otros **seis subtemas** conservan sus tres registros anteriores por nivel y juego. Los bancos de «Detective de ideas» y «Reconstruye el texto» son **pasajes distintos de los 36 textos originales de selección**. Los 63 registros anteriores de Comprensión lectora corresponden a **9 textos base reutilizados** entre siete habilidades; no equivalen a 63 pasajes diferentes. El valor global de cobertura del repositorio cuenta registros por modalidad y todavía no es una estimación de problemas cognitivamente independientes.

## Rotación y seguimiento

La selección de Comprensión lectora incorpora el módulo `src/lib/rotation.ts` ya utilizado por Redacción:
- Clave separada por área, tema, subtema, juego y nivel.
- Primero lecturas inéditas; después repaso de errores; sin repetir el mismo ID en una sesión.
- Selección de hasta diez registros según el banco.
- Estado `seen`, `incorrect` y `last` en el almacenamiento local del navegador, sin cuentas ni envío al servidor.
- Historial anterior y URLs existentes conservados.

La modalidad de clasificación registra varias respuestas por pasaje y mantiene la mecánica original de tres clasificaciones; la ampliación del banco de lecturas se realiza por juego para no contar estas respuestas como textos nuevos.

## Validaciones

`bun run audit:content` comprueba el núcleo 10/15/20 para la modalidad de selección, IDs, extensión de pasajes, estructura, clave única y explicaciones. Las pruebas `src/test/reading-phase-a.test.ts` verifican la separación de los bancos y la rotación; `src/test/main-idea-game-ui.test.tsx` verifica la interacción con respuestas correctas e incorrectas en los tres niveles. Se mantiene la batería de regresión de los otros seis subtemas y de Redacción.

**Estado editorial:** `reviewStatus: "editorial-draft"`. La auditoría no sustituye una revisión humana que examine posibles ideas principales alternativas, distractores, pertinencia cultural, progresión real de dificultad y calidad de retroalimentación. No se presenta como una prueba oficial de la UNAH.

## Siguiente objetivo de lectura

El núcleo **10/15/20 de Idea principal está completo en sus tres juegos**, con 135 registros por modalidad, incluidos 108 pasajes nuevos diferentes. El siguiente subtema a ampliar es **Inferencias**, inicialmente con actividades diferenciadas y nuevos textos de clasificación, selección y reconstrucción.

La meta definitiva del proyecto continúa en **30 básicos, 50 intermedios y 70 avanzados por juego y subtema**, con revisión editorial antes de considerar aprobado el contenido.


## Ampliación de los otros dos juegos

- **Detective de ideas:** `src/lib/main-idea-detective-cases.ts` contiene 36 lecturas nuevas, cada una con tres afirmaciones únicas para etiquetar como dato explícito, inferencia razonable o contenido no sustentado. El registro de dominio exige que las tres respuestas sean correctas.
- **Reconstruye el texto:** `src/lib/main-idea-reconstruct-cases.ts` incluye 36 lecturas nuevas, cada una con tres pasos para ordenar la identificación del problema, el contraste de condiciones y una síntesis justificada.
- `src/test/main-idea-new-games-ui.test.tsx` verifica respuestas correctas en ambos juegos y en los tres niveles.
- `scripts/audit-content.ts` comprueba que los **108 textos nuevos sean distintos** entre los tres juegos y que los nueve bancos alcancen 10/15/20 por nivel.

Estos contenidos permanecen en estado de **borrador editorial**, sin validación docente ni calibración oficial PHUMA.
