# M0: reconciliación por registro del bloque abierto

Fecha: 17 de noviembre de 2026. Base: main `14398e47a8644d694041f62cf800a956e0b5c2bf`, PR #1 `e1b22cddc81e49e3c68d9103cd547abf851d99a1`; ambos árboles estaban limpios. Para reproducir, preparar dos árboles git en esos commits y ejecutar desde esta rama:

`node --import ./scripts/ts-resolve.mjs scripts/reconcile-grammar.mjs /ruta/arbol-main /ruta/arbol-pr1 > reconciliacion.json`

La salida registra por cada ítem rama, ID, subtema, modalidad, nivel, huella SHA-256 del objeto y, en selección, huella normalizada del par estímulo/pregunta. Se conserva en `docs/evidencia/reconciliacion-items-20261117.json`. El estado editorial proviene de los datos; integración, independencia y revisión humana siguen sin verificar. Las huellas registran identidad, no acreditan calidad ni descartan similitud semántica.

- `main`: 225 registros en el bloque: 135 selección y 90 clasificación. PR #1: 171 registros: 135 selección, 18 clasificación y 18 construcción.
- No se encontraron IDs repetidos dentro de ninguna de esas dos colecciones, ni pares exactos normalizados de estímulo y pregunta repetidos dentro de cada banco de selección.
- En selección, 99 IDs coinciden entre ramas y sus objetos son idénticos; los mismos 99 comparten estímulo y pregunta normalizados. Quedan 36 de cada rama sin esa coincidencia exacta: son candidatos a cotejo, no 72 ejercicios independientes demostrados.
- Los 36 borradores de las dos modalidades en PR #1 necesitan revisión de claves, alternativas válidas, adaptación al contrato vigente, relación con otros reactivos y pruebas de integración. No se han promovido ni contado como aceptados.

## Estado de los controles

Se añadió `scripts/qa_m0.py`, que registra etapas y códigos de salida en JSON y devuelve fallo si falta cualquier etapa obligatoria. Ejecutar con una ruta nueva: `python3 scripts/qa_m0.py --output /tmp/qa-m0.json`. En el árbol de trabajo pasó la validación del grafo, sus pruebas negativas, el inventario técnico y las pruebas negativas del runner; el proceso terminó con código 1 porque seis etapas obligatorias siguen en `NOT_RUN`. Los casos negativos demuestran que un fallo y una etapa ausente no producen verde. Es un runner parcial, no prueba que M0 esté terminado.

Pendientes: conciliación semántica y revisión por ítem, validador de estado independiente, congelación de contratos, calidad del banco y mutaciones críticas, controles de seguridad, regresión completa y verificación de publicación del mismo SHA. Revisión docente y calibración de dificultad siguen pendientes. No se añadieron ejercicios en esta ejecución. El siguiente paso es revisar los 36 candidatos de cada rama y los 36 borradores de modalidades, registrando decisión, evidencias y equivalencias antes de integrar contenido.
