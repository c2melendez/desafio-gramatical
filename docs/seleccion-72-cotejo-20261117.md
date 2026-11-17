# Cotejo estructural de 72 candidatos de selección

Fuentes: main `14398e47a8644d694041f62cf800a956e0b5c2bf` y PR #1 `e1b22cddc81e49e3c68d9103cd547abf851d99a1`, árboles sin cambios. Se excluyeron los 99 registros cuyo pasaje y pregunta normalizados coinciden entre ramas. Quedan 36 de main y 36 del PR; no se concluye que sean 72 retos independientes.

Los 72 pasan una comprobación estructural: campos presentes, nivel reconocido, cuatro opciones no vacías y distintas al normalizar, y clave dentro de rango. Las claves correctas, la unicidad semántica, la calidad de distractores, la integración y la independencia siguen INCONCLUSAS o NO VERIFICADAS. Los resultados por ID y huella están en `docs/evidencia/seleccion-distinta-20261117.json`. No se promovió contenido.

En las 72 entradas el índice almacenado de la clave es 0. En `GrammarPilot` de main las opciones se barajan en pantalla y la elección se compara con el índice original, por lo que el índice almacenado por sí solo no prueba que la primera opción visual sea siempre correcta. Debe verificarse la aleatorización y la correspondencia de respuestas con pruebas funcionales antes de dar por resuelto ese riesgo en todas las rutas; no se ha comprobado el PR de la misma forma.

Reproducir con `node --import ./scripts/ts-resolve.mjs scripts/audit-selection-branches.mjs /ruta/main /ruta/pr1`; `node scripts/test-selection-audit.mjs` prueba los controles con un ejemplo válido y cinco mutaciones negativas. Estas pruebas no identifican dos opciones semánticamente correctas ni la dificultad real.

Estado: M0 EN_CURSO. Siguiente acción: verificar claves y distractores por cada uno de los 72 registros, comparar desafíos y familias, ejecutar controles de integración y mutación aplicables y resolver las comprobaciones pendientes de M0. Los 180 registros de déficit técnico no cambian por este cotejo.
