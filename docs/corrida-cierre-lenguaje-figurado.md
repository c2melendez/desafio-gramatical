# Corrida de cierre — Comprensión lectora · Lenguaje figurado

**Fecha de implementación:** noviembre de 2026.

## Política del bloque

Se aplica [la política de tres subtemas por ejecución](politica-corridas-bloques.md). El tema actual, **Comprensión lectora**, tenía un único subtema pendiente de ampliar, por lo que esta corrida contiene **108 ejercicios nuevos en vez de 324**. No se arrastra artificialmente contenido de Gramática y semántica para simular el cumplimiento de la cuota. El siguiente tema se abordará cuando este bloque quede publicado y comprobado.

## Distribución exacta

| Juego | Nuevos básicos | Nuevos intermedios | Nuevos avanzados | Nuevos totales | Registros con banco anterior |
|---|---:|---:|---:|---:|---:|
| Detective de ideas | 7 | 12 | 17 | 36 | 45 |
| Verdad o inferencia | 7 | 12 | 17 | 36 | 45 |
| Reconstruye el texto | 7 | 12 | 17 | 36 | 45 |
| **Total** | **21** | **36** | **51** | **108** | **135** |

- **Banco:** `src/lib/reading-figurative-block.ts`.
- **Cobertura esperada:** de **1,574 a 1,682 registros por modalidad**; de **99 a 108/810** casillas con núcleo de la primera etapa.
- **Cierre cuantitativo del tema:** los **7 subtemas × 3 juegos × 3 niveles** de Comprensión lectora alcanzan 10 básicos, 15 intermedios y 20 avanzados por juego; **945 registros en el tema**.
- La meta final permanece en **30 básicos, 50 intermedios y 70 avanzados por juego y subtema**, es decir, 3,150 registros en Comprensión lectora.

## Diseño pedagógico

Se escribieron 36 objetivos figurativos con tres contextos diferentes cada uno: comparación, personificación, metáfora, hipérbole, ironía, metonimia, sinécdoque, oxímoron, sinestesia, anáfora, alegoría, paradoja, hipérbaton, asíndeton, polisíndeton, símbolos y recursos más complejos. Los tres juegos trabajan destrezas distintas:

- **Detective de ideas:** distinguir la mención textual de la imagen, una interpretación inferida y una afirmación literal no sustentada.
- **Verdad o inferencia:** elegir un significado figurado pertinente entre cuatro opciones, evitando leer la figura como un hecho físico.
- **Reconstruye el texto:** ordenar la referencia textual, identificación del recurso y conclusión interpretativa.

Cada ejercicio nuevo posee un ID, una referencia a su nivel, una explicación contextual y el estado `reviewStatus:"editorial-draft"`. Las tres modalidades comparten la figura objetivo para trabajar transferencia conceptual, pero sus pasajes son distintos; por eso **108 pasajes nuevos distintos no equivalen a 108 recursos literarios diferentes**. También se conservan los 27 registros anteriores, que comparten algunos contextos entre modalidades.

## Integración técnica y validaciones

- `src/lib/reading.ts`: bancos y rotación separada por subtema, juego y nivel.
- `src/components/games/ReadingGames.tsx`, `src/routes/lectura.tsx`: experiencia de los tres juegos, puntuación e historial.
- `scripts/audit-content.ts`: 108 pasajes únicos, 36 por juego, 7/12/17 por nivel y claves válidas.
- `src/test/figurative-reading-phase-a.test.ts`, `src/test/figurative-reading-ui.test.tsx`: cantidad, estructura, cobertura, rotación y experiencia interactiva.
- La condición final de la política sigue siendo **GitHub Actions success + Render Live para el mismo SHA**; sin ambas, la ejecución queda pendiente.

## Estado editorial y objetivo siguiente

La corrección automática de respuestas no sustituye la evaluación docente sobre posibles interpretaciones alternativas, exactitud de etiquetas retóricas y dificultad efectiva. Todos los ejercicios nuevos permanecen en borrador editorial; no representan preguntas oficiales PHUMA.

**Siguiente tema para ampliar:** Gramática y semántica. Priorizar sus subtemas pendientes según el catálogo, sin cambiar de tema hasta completar el núcleo de los siete.
