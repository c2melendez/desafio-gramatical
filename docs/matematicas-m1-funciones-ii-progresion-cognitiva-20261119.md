# M1 — Progresión cognitiva de Funciones II (2026-11-19)

## Resultado de auditoría
El Laboratorio de Funciones II contenía 288 registros de ocho destrezas con preguntas del mismo tipo a los tres niveles. Los cambios de valores y de semilla no justificaban el salto de dificultad. Esta intervención diferencia operaciones cognitivas, conserva IDs y no introduce ejercicios ficticios para incrementar un contador.

| Destreza | Básico: propiedad de f | Intermedio: transformación o inferencia | Avanzado: composición / cambio de condiciones |
|---|---|---|---|
| Vértice | Leer vértice | Vértice de f(x−2) | Vértice de 3−f(x−2) |
| Rango de parábola | Rango cerrado | Rango de f(x)+2 | Rango de 3−2f(x) |
| Dos raíces | Cruces de f con eje X | Raíces de f(x−2) | Raíces de −3f(2x−2) |
| Crecimiento | Tramo creciente | Crecimiento de f(x−2) | Crecimiento de −f(2x−2) |
| Valor en discontinuidad | f(0) con punto lleno | f(0)+2 | 3−2f(0) |
| Límite izquierdo | Límite de f al acercarse a 0− | Límite de f+2 | Límite de 3−2f |
| Continuidad | Identificar salto/continuidad | Elegir c para unir ramas mediante f(x)+c | Elegir c tras duplicar solo la rama izquierda |
| Rango de salto | Identificar rango con extremos abiertos | Amplitud del conjunto de valores (sup−ínf) | Amplitud luego de desplazar la rama derecha cuatro unidades |

## Criterios y contrato
- `function-advanced-cognitive-challenges.ts`: oráculos parametrizados de 8 competencias y 2 nuevas etapas (Intermedio y Avanzado). Los 96 reactivos Básicos conservan clave y consigna previas.
- `function-graph-advanced.ts`: `cognitiveStage`, `operation`, `requiredEvidence`, nuevas consignas, explicaciones y opciones ligadas a la representación fuente. Los 288 IDs `math-graph-v2` permanecen estables; permanecen 10 rondas, rotación, historial y accesibilidad SVG.
- `function-advanced-cognitive-progression.test.ts`: exige tres operaciones y tres consignas diferentes por destreza, oráculos de 288 preguntas, alternativas sin duplicados y ejemplos independientes de transformaciones.
- Los modelos de parábola están restringidos a dominio cerrado finito; los modelos de salto a dos rectas con extremos específicos. En la pregunta sobre amplitud se usa supremo−ínfimo porque los extremos abiertos pueden no alcanzarse. La transformación avanzada g se define **en el enunciado** y no se confunde con la gráfica de f.
- Se mantiene la distinción: el temario oficial PHUMA 2026 no enumera estas ocho operaciones como destrezas independientes; son práctica complementaria. No se supone independencia psicométrica ni se acredita dificultad empírica automáticamente.

## Pendientes de M1
Continúan abiertos Geometría, Estadística I y el banco original de Matemáticas en la auditoría cognitiva. Tampoco se cubren funciones de dominio ilimitado, asíntotas ni todas las discontinuidades. La revisión docente e inspección manual en móvil y escritorio siguen pendientes. El cierre técnico requiere CI PR SUCCESS, CI main SUCCESS y Render Live del mismo SHA.
