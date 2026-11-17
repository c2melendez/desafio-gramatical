# Familias y órdenes del bloque de gramática

Fuente: PR #1 en `e1b22cddc81e49e3c68d9103cd547abf851d99a1`; referencia curricular: guía PHUMA 2026, p. 5. Los 36 borradores de modalidades se agrupan en 18 pares en `docs/evidencia/familias-permutaciones-20261117.json`, con IDs, huellas y una comparación específica por pareja. Los pares muestran patrones de razonamiento semejantes: por ejemplo, `cl-ms-i1` e `i2` piden las mismas funciones sintácticas en oraciones diferentes. Los dos de sinonimia de construcción por nivel, en cambio, pueden alternar sinónimo y antónimo; eso exige analizar la diferencia concreta, no resolverla por similitud superficial.

La independencia de los 18 pares sigue INCONCLUSA. La similitud de formato no basta para afirmar duplicación conceptual, y cambiar nombres no basta para demostrar independencia. No se cuentan como unidades independientes aceptadas mientras no se resuelvan esas decisiones y su integración.

Para cada una de las 18 construcciones se enumeraron los seis órdenes posibles: 108 casos. Se ejecutaron contra `gradeGrammarConstruction` del PR #1: acepta `[0,1,2]` y rechaza las otras cinco secuencias en cada caso. Esto describe el comportamiento de ese código, no establece que los órdenes rechazados sean semánticamente inválidos. Las 90 alternativas rechazadas permanecen INCONCLUSAS y requieren análisis por ejercicio y, si corresponde, soluciones equivalentes explícitas en el contrato vigente. El orden original está propuesto, no certificado.

Comandos: `node scripts/check-family-evidence.mjs` comprueba estructura y huellas con la revisión editorial. Con el árbol del PR1 disponible, `node --import ./scripts/ts-resolve.mjs scripts/check-family-evidence.mjs /ruta/arbol-pr1` contrasta además las 108 salidas reales del calificador. No modifica bancos ni progreso.

## Control del grafo

El validador previo detectaba dependencias inexistentes, pero podía aceptar un M2 que omitiera M1 por completo. Se reforzó para exigir el antecesor por etapa y área, un único M0, etapas únicas por área, cortes para M4 y restricciones también en relaciones opcionales. Las pruebas negativas abarcan la omisión, dependencia opcional hacia una etapa posterior, etapa sin área, duplicado, M4 sin corte y catálogo vacío; también se ejecutaron las pruebas del verificador de estado.

Estado: M0 EN_CURSO. No se han integrado ejercicios. Persisten revisión de independencia y equivalencia, contratos, auditoría de contenido, mutaciones críticas y verificación de cierre. Déficit técnico del núcleo: 180 registros, no validado editorialmente. Siguiente acción: analizar por contenido los 72 candidatos distintos de selección y resolver, con decisiones fundamentadas y registro por ID, las familias y órdenes inconclusos; completar los controles de M0 antes de integrar.
