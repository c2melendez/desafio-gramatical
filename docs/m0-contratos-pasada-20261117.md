# M0: contratos, catálogo y comprobaciones ejecutadas

Base `main`: `14398e47a8644d694041f62cf800a956e0b5c2bf`; borrador de contenido PR #1: `e1b22cddc81e49e3c68d9103cd547abf851d99a1`. Fuente curricular: guía oficial PHUMA 2026 adjunta, p. 5. Estado: **EN_CURSO**.

## Catálogo y contratos

El catálogo incluye M0, las cuatro etapas de cada una de las cinco áreas y M4. Cada M1 fuera de español depende de M0 y del corte de español; el orden entre las demás áreas permanece por decidir. M4 depende de todos los cortes. Se corrigió el validador para aceptar la transición de un corte de un área al M1 de otra, sin permitir dependencias internas fuera de orden. Este catálogo no certifica que todos los subtemas y juegos sean elegibles.

`scripts/content-contracts.mjs` implementa verificaciones separadas para estructura, respuesta con oráculo externo, integración con observación explícita y agregación. Sin oráculo u observación, el resultado es INCONCLUSO. No se admite comparar una clave consigo misma como prueba de corrección. Los controles de construcción y alineación siguen pendientes de implementación; el índice de IDs del informe siguiente se limita al bloque, no a todo el banco.

Con `node --import ./scripts/ts-resolve.mjs scripts/audit-grammar-contracts.mjs /ruta/main`, la comprobación de estructura de los 225 registros técnicos de selección y clasificación del bloque no rechazó ninguno; los 225 permanecieron INCONCLUSOS al faltar oráculos y observaciones de integración. El registro reproducible está en `docs/evidencia/contratos-gramatica-20261117.json`.

Para los 72 candidatos de selección sin coincidencia exacta entre ramas, se registraron respuestas textuales propuestas por revisión automática en `docs/evidencia/oraculos-seleccion-72-20261117.json`. `node --import ./scripts/ts-resolve.mjs scripts/check-selection-oracles.mjs /ruta/main /ruta/pr1` contrastó cada propuesta y huella con su registro: las 72 coinciden con la clave almacenada. Esto es una revisión de modelo, no demuestra que los distractores sean todos incorrectos ni acredita independencia, nivel real, validación docente o psicométrica. Los 72 siguen sin aceptar para el conteo editorial.

## Suite y límites

El runner ahora ejecuta realmente validación del grafo, inventario, pruebas negativas, trazabilidad, familias, cuarentena, compilación, pruebas existentes, lint y auditoría existente. Se corrigió su orden para compilar antes de las pruebas de rutas generadas. En la ejecución local, 14 etapas concretas pasaron. Ocho mutaciones definidas sobre fixtures se detectaron de ocho ejecutadas: ID duplicado, opción duplicada, clave fuera de rango, nivel inválido, clave falsa frente a oráculo, dos respuestas posibles, ruta ausente y nivel de integración incorrecto. Esas ocho no sustituyen las mutaciones críticas de todo el módulo.

El resultado general sigue FAIL de forma deliberada porque quedan seis etapas obligatorias NOT_RUN: estado y contratos completos; inventario y calidad por ítem globales; regresión funcional completa; mutaciones críticas completas; seguridad y privacidad; y verificador independiente de estado completo. Las pruebas parciales aprobadas no justifican marcar esas etapas PASS. La revisión docente sigue pendiente y visible. Reejecutar `python3 scripts/qa_m0.py --output /tmp/qa-m0.json` con ruta que no exista; devuelve 1 si falta una etapa.

No se han incorporado ejercicios ni declarado completo el núcleo. Siguiente acción: ampliar las verificaciones a todo el banco y a construcción, resolver unicidad y equivalencias, rutas y conservación de progreso, seguridad y mutaciones críticas; guardar evidencia verificable y volver a ejecutar la suite. No iniciar M1 como cerrado sin completar M0.
