# Academia PHUMA Play — Fase A: Comprensión lectora, primera ampliación

**16 de noviembre de 2026**. Se inicia la ampliación de Comprensión lectora, conservando su catálogo de siete subtemas y las mecánicas «Detective de ideas», «Verdad o inferencia» y «Reconstruye el texto».

## Alcance real del primer lote

Se agregaron **36 lecturas originales y completas** (7 básicas, 12 intermedias y 17 avanzadas) para **Idea principal → Verdad o inferencia**. Los textos se identifican por ID y título, tienen un pasaje, cuatro alternativas distintas, una respuesta y una explicación. Se incluyeron **72 distractores específicos del contexto**, sustituyendo alternativas genéricas compartidas, para que el estudiante deba leer el pasaje.

Cada nivel mantiene tres ejercicios anteriores, de forma que el juego de selección dispone de:

| Nivel | Previos | Nuevos | Banco | Primer objetivo | Meta definitiva |
|---|---:|---:|---:|---:|---:|
| Básico | 3 | 7 | **10** | 10 | 30 |
| Intermedio | 3 | 12 | **15** | 15 | 50 |
| Avanzado | 3 | 17 | **20** | 20 | 70 |

**Importante:** los 36 pasajes nuevos solo cuentan en la modalidad de selección. No se presentan como contenido independiente de «Detective de ideas» ni «Reconstruye el texto», que conservan **3 ejercicios por nivel** en Idea principal y en los demás subtemas. Los 63 registros anteriores de Comprensión lectora corresponden a **9 textos base reutilizados** entre siete habilidades; no equivalen a 63 pasajes diferentes. El valor global de cobertura del repositorio cuenta registros por modalidad y todavía no es una estimación de problemas cognitivamente independientes.

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

Completar primero el núcleo **10/15/20 de Idea principal** en «Detective de ideas» y «Reconstruye el texto» mediante **36 nuevos textos con actividades originales en cada juego**, sin reciclar los textos del quiz como si fueran material independiente. Después proceder a «Inferencias» y los cinco subtemas restantes.

La meta definitiva del proyecto continúa en **30 básicos, 50 intermedios y 70 avanzados por juego y subtema**, con revisión editorial antes de considerar aprobado el contenido.
