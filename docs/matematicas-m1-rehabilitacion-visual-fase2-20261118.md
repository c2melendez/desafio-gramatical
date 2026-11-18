# Matemáticas M1 — rehabilitación visual y de mecánicas, fase 2
Fecha: 2026-11-18 · Base: PR #17 y norma `docs/norma-validez-estimulos-visuales.md`

## Implementación
- **8 subtemas × 3 mecánicas × (10+15+20)** = **1.080 ejercicios técnicos existentes** dotados de representación estructurada esencial. Incluye los 225 ejercicios de selección del piloto previo; incremento neto de 855 identificadores visualizados.
- Nuevas visualizaciones SVG semánticas: rectángulo acotado (área/perímetro), prisma rectangular acotado (volumen/superficie), triángulos semejantes con correspondencias marcadas. Se mantienen las cinco del piloto: funciones, intervalos, triángulo angular, triángulo rectángulo y gráfico de barras.
- Se ajustan `clasificar` y `construir`, además de `quiz`, para utilizar las medidas del estímulo en sus afirmaciones y decisiones. En intervalos, clasificación verifica **exclusión/inclusión y dirección** y construcción pregunta **extremo y desigualdad**, no dos veces el mismo resultado. En área de rectángulo, el primer paso identifica una dimensión real en lugar de una suma irrelevante.
- El valor numérico del oráculo se compara con la respuesta calculada a partir de los datos visuales, sin usar dimensiones de píxeles. Los estímulos ofrecen descripción accesible sin divulgar la clave solicitada. Los diagramas son esquemáticos, no a escala.
- Prueba nueva `src/test/math-m1-visual-mechanics.test.tsx`: 1.080 comparaciones estímulo/oráculo, ocho pruebas negativas de alteración de datos, unión de las tres mecánicas y prueba positiva de clasificación y construcción con una única ronda.
- Conservados los 2.970 IDs, niveles y 10 rondas, puntuación, rotación, almacenamiento e historial.

## Matriz funcional
| Tema y subtema | Visual | Modos |
|---|---|---|
| Álgebra / Funciones | recta de función lineal con pares etiquetados | clasificar, quiz, construir |
| Álgebra / Inecuaciones | recta numérica y extremo abierto | clasificar, quiz, construir |
| Geometría / Ángulos | triángulo acotado con ángulos | clasificar, quiz, construir |
| Geometría / Pitágoras | triángulo rectángulo acotado | clasificar, quiz, construir |
| Geometría / Áreas y perímetros | rectángulo acotado | clasificar, quiz, construir |
| Geometría / Sólidos: área y volumen | prisma rectangular en proyección | clasificar, quiz, construir |
| Geometría / Semejanza | dos triángulos semejantes | clasificar, quiz, construir |
| Estadística / Tablas y gráficas | gráfico de barras | clasificar, quiz, construir |

## Límites y continuación
Los 1.080 son **registros técnicos con componente visual**, no 1.080 ejercicios conceptual ni psicométricamente independientes, ni certificación docente. Los otros **1.890** siguen sin estímulo estructurado: algunos correctamente simbólicos, otros requieren nuevas mecánicas o figuras. Falta implementar paralelas y transversal, figuras compuestas y gráficos de mayor diversidad; inspección en navegador móvil y escritorio; auditoría G0–G5 por ID; y revisión académica humana.

La cuota 30/50/70 y el paso a M2 **no se desbloquean** automáticamente por un CI aprobado. No reproducir preguntas oficiales. Fuente principal de competencias: Guía PRE-U UNAH 2026, contenidos matemáticos pág. 6 y ejemplos del área; PAA es material complementario, no equivalente.

## Puerta de publicación
Fusionar solo si CI aprueba; verificar Render Live sobre SHA final de `main`, pruebas de retroalimentación y navegación, y después reportar pendientes concretos.
