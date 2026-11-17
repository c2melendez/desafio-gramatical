# Revisión inicial de 36 borradores del PR #1

Fuente: `e1b22cddc81e49e3c68d9103cd547abf851d99a1`, `src/lib/grammar-games-draft.ts`. Se registran ID, hash, nivel, modalidad y resultados por ejercicio en `docs/evidencia/revision-borradores-20261117.json`. Reproducir con `node --import ./scripts/ts-resolve.mjs scripts/review-draft-grammar.mjs /ruta/al/arbol-pr1`.

Los 18 ejercicios de clasificación y los 18 de construcción superan la comprobación de campos, claves dentro del rango y ausencia de elementos repetidos. Eso no verifica que la clave sea correcta ni que sea la única respuesta válida. Las respuestas, integración e independencia están marcadas INCONCLUSO o NO VERIFICADA, y ninguno se añade al conteo aceptado.

Los 36 forman 18 pares candidatos a familia por subtema, modalidad y nivel. La revisión del texto muestra patrones compartidos: por ejemplo, `cl-ms-i1` y `cl-ms-i2` piden clasificar sujeto, objeto directo y destinatario en oraciones de entrega; `cl-ms-a1` y `cl-ms-a2` repiten la identificación de funciones en una principal y una relativa. Debe evaluarse si cada par aporta un reto sustancialmente distinto, no limitarse al cambio de nombres.

Los ejercicios `cl-cc-a1` y `cl-cc-a2` piden distinguir información expresa, inferencia y afirmación no sustentada. Su adscripción a cohesión y coherencia requiere revisión curricular. Los 18 de construcción en el PR #1 almacenan una sola secuencia correcta; el calificador de esa rama acepta únicamente el orden de los índices. Antes de integración hay que revisar si existen secuencias equivalentes y adaptar las soluciones al contrato vigente, además de comprobar que la actividad mide la competencia prevista.

## Verificación del estado

`docs/estado-m0.json` conserva referencias a los tres blobs de las dos ramas y las evidencias del corte. `python3 scripts/verify_state.py --closure` compara los hashes Git, el estado del catálogo y la presencia de los archivos. Sus pruebas negativas cubren hash alterado, objeto inaccesible, evidencia ausente, cierre falso y omisión de controles pendientes. Es una verificación **parcial**: la presencia de archivos no valida sus contenidos ni sustituye revisión editorial, CI, Render, calidad o mutaciones. Devuelve código 1 con `--closure` mientras los controles obligatorios carezcan de evidencia.

En la ejecución local los tres hashes y cuatro rutas coincidieron; seis controles permanecen SKIP y el cierre devolvió 1, como se espera. No se añadieron ejercicios en esta ejecución. Siguiente acción: revisar por ID las claves y las familias de esos 36 borradores, resolver los 72 candidatos de selección y ampliar el verificador y las pruebas de mutación antes de cerrar M0.
