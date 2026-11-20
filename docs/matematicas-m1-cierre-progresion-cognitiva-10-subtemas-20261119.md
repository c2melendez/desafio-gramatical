# M1 — Rehabilitación cognitiva integral de Geometría, Estadística y Sucesiones
Fecha de implementación: 2026-11-19. Estado: pendiente de controles CI, integración y Render.

## Alcance exacto
Interviene **10 subtemas** del banco matemático M1 original: Áreas y perímetros, Ángulos, Pitágoras, Sólidos: área y volumen, Semejanza, Promedios, Probabilidad, Dispersión de datos, Tablas y gráficas y Sucesiones. Son **1,350 registros identificados previamente**, equivalentes a 10 subtemas × 3 modos × (10 Básicos + 15 Intermedios + 20 Avanzados), preservando exactamente los IDs y el sistema de rotación. No se añaden ejercicios solo para aumentar una cifra.

## Matriz de exigencias cognitivas
| Subtema | Básico — identificación / aplicación | Intermedio — inferencia o transformación | Avanzado — composición de inferencias |
|---|---|---|---|
| Áreas y perímetros | Área o contorno de un rectángulo | Cambio del largo y reevaluación | Cambios de largo y ancho, reevaluación con unidades correctas |
| Ángulos | Hallar ángulo faltante usando 180° | Cambiar A y compensar C | Cambiar A y B; reestablecer total angular |
| Pitágoras | Hipotenusa a partir de dos catetos | Aplicar semejanza por escala 2 y Pitágoras | Calcular hipotenusa nueva y PERÍMETRO del triángulo escalado |
| Sólidos: área y volumen | Volumen o área superficial | Cambiar altura, distinguiendo ambas fórmulas | Alterar largo y ancho y recalcular todas las caras o volumen |
| Semejanza | Inferir lado homólogo por factor | Cambiar un lado manteniendo razón | Alterar base y lado pequeño; reevaluar factor y homólogo |
| Promedios | Media aritmética | Recalcular después de cambiar un dato | Componer tres cambios de diferente signo |
| Probabilidad | Favorables/total | Introducir fichas desfavorables y recalcular | Retirar una favorable y añadir tres desfavorables |
| Dispersión de datos | Rango original | Excluir dato menor | Excluir mínimo y cambiar máximo |
| Tablas y gráficas | Total de barras | Balance con signo de dos días frente a otro | Alterar tres barras y recomputar balance |
| Sucesiones | Cuarto término | Quinto término con cuatro saltos | Comparar términos no consecutivos a7−a3 |

### Representaciones gráficas y semántica
Se **conservan las seis figuras originales** utilizadas por este bloque: triángulo de ángulos, triángulo rectángulo, rectángulo, prisma, triángulos semejantes y barras de libros. Cada SVG muestra el problema inicial; los niveles superiores incluyen **cambios hipotéticos en el enunciado**. No se modifica en secreto el significado del diagrama para igualar el resultado. Los oráculos visuales aplican la etapa cognitiva correspondiente al estímulo original, y las pruebas fallan si modificar un dato visual no modifica el valor correcto.

Los nuevos problemas de perímetro de triángulo rectángulo escalado, diferencia firmada de barras y comparación de términos de sucesiones introducen nuevos *kinds* para evitar reutilizar indebidamente un oráculo de otra operación. Sus fórmulas independientes están en `scripts/audit-math-m1.mjs`.

### Mecánicas y validaciones
- **Clasificar:** comprobar enunciados sobre reglas o transformaciones y errores de procedimiento, en lugar de simplemente juzgar la misma cifra que Quiz.
- **Quiz:** obtener la respuesta del escenario indicado, no solo la lectura directa del gráfico.
- **Construir:** resolver primero un dato causal (suma, medida, altura, factor, total o diferencia) y después la solución.
- Todas las celdas conservan 10/15/20 identificadores por nivel, con diez rondas por partida, rotación e historial.
- `src/lib/math-m1-core-remaining.ts` implementa oráculos, `cognitiveStage`, `operation` y `requiredEvidence` en los diez subtemas.
- `src/test/math-m1-core-remaining.test.tsx` comprueba 1,350 registros con oráculos independientes, pistas visuales y mutaciones, diferentes operaciones y consignas, distractores distintos y prueba de interacción de dos mecánicas.
- La auditoría global de 2,970 registros, sus 810 celdas, 1,080 estímulos SVG y la validación de M0 continúan siendo puertas obligatorias.

## Estado acumulado sujeto a CI y despliegue
Los bloques anteriores rehabilitaron 1,620 registros correspondientes a 12 subtemas del banco original. Esta corrida aborda los **1,350 restantes** (10 subtemas) para alcanzar **22 de 22 subtemas y 2,970 registros** con progresión cognitiva técnica diferenciada. Esta cifra no significa independencia empírica de todos los reactivos ni acreditación docente, y se conservarán las reservas editoriales `editorial-draft`.

## Limitaciones abiertas
- Las pruebas deterministas no demuestran automáticamente dificultad empírica, capacidad discriminativa ni equivalencia con reactivos de PAA/PHUMA.
- Geometría trabaja con dibujos esquemáticos y un conjunto finito de construcciones; falta evaluación docente de autenticidad, formulación y carga cognitiva de cada pregunta.
- Las mecánicas son diferentes por propósito, pero siguen compartiendo parte del mismo escenario matemático en cada ID. Falta estudio pedagógico de independencia modal.
- Inspección manual en dispositivos, accesibilidad y valoración editorial continúan pendientes y no bloquean la publicación técnica bajo los controles autorizados.

## Criterios de salida
No fusionar el PR sin GitHub CI SUCCESS y oráculos independientes de 2,970 registros. Después confirmar GitHub CI de `main` y Render **Live** del mismo SHA exacto; no declarar éxito por una simple solicitud de despliegue.
