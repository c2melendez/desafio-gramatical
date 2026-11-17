# Reconciliación técnica inicial — M0

Fecha: 17 de noviembre de 2026. Base `main`: `14398e47a8644d694041f62cf800a956e0b5c2bf`. Fuentes: catálogo y función `coverageRows` de esa base. Ejecución reproducible con Node 24 desde el repositorio: `node --import ./scripts/ts-resolve.mjs scripts/inventory-coverage.mjs > inventario.json`. Comprobación: `node scripts/test-inventory.mjs`.

La salida tiene 810 celdas (90 subtemas × tres modalidades × tres niveles) y 2.006 registros técnicos declarados en total. Puede haber estímulos compartidos, duplicados o rutas no verificadas: no equivale a ejercicios independientes aceptados ni a un progreso editorial. Elegibilidad, integración, independencia y revisión humana y automática se conservan como desconocidas, no como cero. El informe completo se regenera por el comando anterior; incluye SHA del árbol ejecutado, marca de cambios y hashes de catálogo y cobertura. El árbol y sus archivos de contenido deben coincidir con la revisión que se quiera inventariar.

| Subtema | Selección B/I/A | Clasificación B/I/A | Construcción B/I/A | Déficit técnico núcleo |
|---|---|---|---|---:|
| Sinónimos y antónimos | 10/15/20 | 10/15/20 | 0/0/0 | 45 |
| Cohesión y coherencia | 10/15/20 | 10/15/20 | 0/0/0 | 45 |
| Morfosintaxis | 10/15/20 | 0/0/0 | 0/0/0 | 90 |

Los 225 registros técnicos presentes son borradores, no están acreditados como independientes; 180 es la diferencia aritmética hasta 405, no el déficit editorial definitivo. No se añadieron ejercicios en esta ejecución.

## Rama previa

Comparación de las colecciones exportadas en `main` y en el PR #1 (`e1b22cddc81e49e3c68d9103cd547abf851d99a1`): 135 preguntas de selección en cada rama; 99 comparten ID y combinación normalizada de pasaje y pregunta. Las 36 restantes en cada rama requieren cotejo editorial, no se suman automáticamente. El PR #1 contiene 18 borradores de clasificación y 18 de construcción, seis de cada modalidad por subtema. No se asume que sean independientes, correctos, compatibles con el modelo actual ni integrables sin adaptación. Reconciliar por contenido, respuestas y contratos, preservando IDs y sin fusionar la rama entera.

## CI y continuidad

El CI del PR #2 en `1c4e82eca9f9bf5bbd272cda9f5870db1a7ddee9` falló porque una prueba seleccionaba una pregunta por su enunciado compartido con otras. Se ajustó para identificar conjuntamente pasaje y pregunta y exigir una sola coincidencia. En local pasaron 167 pruebas, compilación y diez ejecuciones consecutivas de esa prueba. CI del commit posterior debe comprobarse por separado.

M0 continúa abierto: falta revisar el inventario contra rutas reales y por ID, auditoría de duplicados y claves, estado verificable, runner de controles, pruebas de mutación y evidencias exigidas por el prompt. La revisión docente y la calibración psicométrica siguen pendientes. No iniciar M1 como módulo cerrado hasta satisfacer M0. La aplicación publicada permanece en la base; Render de la rama no aplica hasta publicación.
