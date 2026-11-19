# M1 Matemáticas — Progresión cognitiva real en Geometría

Fecha: 2026-11-19 · Alcance: 216 IDs preexistentes de cuatro competencias; no se agregan registros.

## Problema y corrección
El laboratorio geométrico anterior empleaba las mismas cuatro preguntas en Básico, Intermedio y Avanzado, con diferencias de números solamente. Eso no cumple la exigencia de progresión cognitiva. Esta intervención cambia operaciones, enunciados, oráculos, explicación y distractores en cada nivel, manteniendo SVG originales como estímulo fuente.

| Competencia | Básico (1) | Intermedio (2) | Avanzado (3) |
|---|---|---|---|
| Correspondientes | Obtener el ángulo correspondiente | Bisecar el correspondiente | Relacionar correspondiente, su suplementario, bisectriz y diferencia absoluta |
| Suplementarios | Obtener el suplemento | Bisecar el suplementario | Comparar una mitad del suplemento con el correspondiente |
| Área en L | Área exterior menos recorte | Escalar en ambas dimensiones (factor 4 sobre área) | Cambiar dos dimensiones exteriores y las del recorte; recalcular región resultante |
| Perímetro en L | Sumar contorno | Modificar ancho exterior y reevaluar perímetro | Cambiar ancho, alto y recorte, reconociendo la invariancia del perímetro ante recortes de esquina |

### Condiciones matemáticas
Los diagramas son **esquemáticos, no a escala**; se emplean las medidas explícitas. Los planteamientos de transformación señalan que el dibujo representa el **objeto inicial** y describen la modificación hipotética en el enunciado. En los niveles superiores, el símbolo de incógnita del gráfico se sustituye por una referencia angular y se aclara que las bisectrices descritas no están dibujadas. El perímetro de un rectángulo con esquina ortogonal recortada en forma de L es 2(W+H), independiente del tamaño del recorte, en tanto se mantenga la misma topología de figura.

### Controles y evidencia
- `src/lib/geometry-cognitive-challenges.ts`: oráculos originales de complejidad 2 y 3, sin cambiar el cálculo de Básico.
- `geometry-visual-lab.ts`: conserva los 216 IDs `math-geom-v1`; añade `cognitiveStage`, `operation`, `requiredEvidence`, consignas y explicaciones por nivel.
- `geometry-cognitive-progression.test.ts`: seis pruebas de cambios causales, 216 claves, cuatro opciones únicas, progresión de operaciones y de consignas por competencia.
- Se preservan diez rondas, historial, rotación y entrada desde Matemáticas → Geometría; no se modifican los juegos tradicionales ni el banco original de 2.970 registros.
- La guía PRE-U UNAH 2026 identifica ángulos y perímetros/áreas como contenidos geométricos y utiliza figuras; estos problemas son **originales**, no copias ni equivalencias psicométricas.
- Revisión docente, observación real en dispositivos y validación de dificultad empírica siguen pendientes. No se declara certificación pedagógica de M1.

### Siguiente bloque
Aplicar progresión conceptual a Estadística I (seis destrezas), y después abordar el banco matemático original por familias de competencias para garantizar modalidades con significado, no solo cuotas de ejercicios. La validación de entrega exige CI SUCCESS del PR y `main`, más Render Live del mismo commit.
