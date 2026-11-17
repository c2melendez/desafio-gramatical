# Revisión automática editorial de 36 borradores

Fuente revisada: `draft/nucleo-405-gramatica`, commit `e1b22cddc81e49e3c68d9103cd547abf851d99a1`. Referencia curricular: guía oficial PHUMA 2026 adjunta, página 5 (competencias comunicativas, relaciones semánticas, morfosintaxis y operaciones textuales). El archivo `docs/evidencia/revision-editorial-36-20261117.json` contiene una observación por ID, hash del contenido y estado; es una revisión automática editorial, no una certificación docente, psicométrica ni una medición empírica de dificultad.

Se contrastaron las claves y explicaciones de los 18 ejercicios de clasificación y el orden propuesto de las 18 construcciones. Resultado: 31 condicionales y cinco que requieren cambio o resolución curricular. Ninguno se cuenta como aceptado mientras falten la revisión de independencia, las alternativas equivalentes y la integración.

| ID | Hallazgo | Acción pendiente |
|---|---|---|
| `cl-sa-p2` | La explicación llama partes de la casa a techo y jardín; el jardín no necesariamente es una parte de la casa. | Corregir la explicación sin alterar la relación léxica. |
| `cl-cc-a1`, `cl-cc-a2` | Distinguir con claridad información expresada de inferencia cuando se reformula una cifra o mayoría; ambos trabajan comprensión de información y su adscripción a cohesión requiere análisis. | Precisar las categorías y decidir ubicación curricular. |
| `co-sa-p2` | Definir «lleno» como contener mucho no expresa necesariamente que la capacidad esté ocupada. | Precisar definición y contraste con «vacío». |
| `co-ms-i2` | El contexto usa presente y la secuencia propuesta cambia al pretérito. | Homogeneizar el tiempo o justificar el cambio. |

Las observaciones de los 31 condicionales registran por qué la clave u orden propuesto resulta plausible y advierten pistas, similitudes o necesidad de evaluar alternativas. No demuestran que esas respuestas sean únicas. Las actividades de construcción del PR anterior aceptan un único orden, por lo que sus alternativas siguen pendientes de examen individual. Los 18 pares de familias candidatas requieren comparación sustancial antes de contabilizar ambas variantes.

Se prepararon cinco propuestas en `docs/evidencia/propuestas-cuarentena-20261117.json`. Conservan el ID y las huellas de la versión original y propuesta, y corrigen las explicaciones, categorías o tiempos señalados. Permanecen fuera del juego; las dos categorías de cohesión requieren además una decisión curricular. Pueden regenerarse con `node --import ./scripts/ts-resolve.mjs scripts/propose-grammar-fixes.mjs /ruta/al/arbol-pr1` y comprobarse con `node scripts/test-quarantine.mjs`.

La trazabilidad de los 36 IDs y hashes se verifica con `python3 scripts/validate_editorial_review.py`; `python3 -m unittest discover -s scripts -p 'test_editorial_review.py'` prueba cambios de hash, duplicados, omisiones y contabilización indebida. Estos controles no validan por sí mismos el contenido lingüístico.

**Estado:** M0 EN_CURSO. Candidatos promovidos o añadidos: 0. Déficit técnico del núcleo: 180 registros, sujeto a auditoría de contenido existente. Próxima acción: revisar las cinco propuestas y resolver la clasificación curricular, las 18 familias y las alternativas válidas de construcción, y contrastar los 72 candidatos distintos de selección entre las ramas.
