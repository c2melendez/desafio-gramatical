# Ciencias Naturales M3 — cierre técnico y corte de área

**Estado: COMPLETADA TÉCNICAMENTE**, CI en main SUCCESS, Render LIVE del mismo SHA y prueba HTTP publicada PASS. La revisión académica y psicométrica permanece PENDIENTE_AUTORIZADA.

## Línea base, perímetro y cuotas acumuladas

- SHA anterior `9491afa0c938eb69a02dfd583448b82f556b3843`, M2 Naturales con 5.700 IDs y CI/Render verificados.
- Tres temas (Biología, Química, Física), 19 subtemas, 3 juegos (clasificar, selección, construcción), 3 niveles, **57 combinaciones y 171 celdas**, con partida universal de 10 rondas.
- Guía PRE-U UNAH 2026 páginas impresas 7–9, y subtemas complementarios diferenciados (Ecología, Materia, Reacciones y Tabla periódica).
- El objetivo M3 final es **30/50/70 por cada combinación**, sin compensación. Incremento neto 10/15/25 por combinación.

| Nivel | M2 anterior | Nuevo M3 | M3 acumulado |
|---|---:|---:|---:|
| Básico | 1.140 | 570 | 1.710 |
| Intermedio | 1.995 | 855 | 2.850 |
| Avanzado | 2.565 | 1.425 | 3.990 |
| **Total** | **5.700** | **2.850** | **8.550** |

M3 preserva exactamente los registros y claves previas M1/M2; emplea prefijo `science-m3-` para todos los nuevos.

## Entrega y contratos

- `src/lib/science-m3.ts`: casos nuevos originales de observación, comparación de informes y corrección de hipótesis; explicación por estímulo, un concepto verdadero, contraste de distractores, tres modalidades y metadatos cognitivos. Los casos provienen de diez anclajes curados por subtema, no de 2.850 conceptos nuevos.
- `src/lib/coverage.ts`, `scripts/inventory-items.mjs` y `src/routes/naturales.tsx`: la misma fuente acumulativa de 8.550 IDs llega al selector y a la partida. Se conservan historia, progreso, reinicio, retorno contextual y rotación sin repetición durante diez rondas.
- `scripts/audit-science-m3.mjs`: verifica 100 % de las 171 celdas, cuotas por nivel, preservación literal de M1/M2, IDs únicos, propiedades ancladas, selección, tres clasificaciones, construcción de dos pasos, explicaciones, familias, discriminación de estímulos normalizados y rotación de dos partidas de diez.
- `src/test/science-m3-integration.test.ts`: prueba totales, cuota por celda, 171 simulaciones de rotación, respuesta falsa, doble alternativa correcta, fuente sin evidencia, nivel incorrecto e ID duplicado.
- `.github/workflows/ci.yml`: auditoría y artefacto `naturales-m3-corte` obligatorios, sumados a las regresiones de M0, Español, Matemáticas, Naturales M1/M2, build y prueba HTTP pública.
- `docs/m0-contract-lock.json`: se actualiza el hash real del contrato de cobertura sin reescribir historial ni rutas.

## Límites y criterio de aceptación

Los 2.850 registros de M3 son variantes técnicas apoyadas en aproximadamente **190 anclajes conceptuales**. La auditoría estructural de 8.550 ítems no establece que existan 8.550 tareas semánticamente independientes ni valida experimentalmente la dificultad. La revisión docente y científica externa queda pendiente autorizada. No se atribuye certificación oficial PHUMA ni equivalencia psicométrica.

**Cierre técnico**: cobertura de 171 celdas completa, auditoría acumulada PASS, pruebas funcionales y negativas PASS, matriz de mutaciones documentada, suite de regresión sin excepciones, PR fusionado en main, CI SUCCESS, Render LIVE del mismo SHA y prueba HTTP de rutas Naturales. Se documentarán por separado las verificaciones visuales manuales no ejecutadas. Un commit documental posterior deberá pasar sus propios controles antes de declararse definitivo.

Al completar el corte técnico `naturales-CORTE`, el siguiente módulo del orquestador es `sociales-M1` sujeto a la reconciliación de dependencias y estado vigente.

## Corte técnico: evidencia confirmada

- PR #39 fusionado: https://github.com/c2melendez/desafio-gramatical/pull/39, SHA `e9881e48f2378929ed002da4256fcd8874642345`.
- GitHub Actions: https://github.com/c2melendez/desafio-gramatical/actions/runs/44703305238 — **COMPLETED/SUCCESS** para `e9881e48f2378929ed002da4256fcd8874642345`, incluido build, todas las pruebas funcionales, mutaciones negativas, inventario completo, M0/Matemáticas/Español, auditorías M1 y M2 de Naturales, auditoría propia M3 acumulativa y puerta de cierre M0.
- Render: despliegue `dep-dc00b0o473hc73826v4g`, **LIVE** en https://desafio-gramatical.onrender.com/ para el mismo SHA `e9881e48f2378929ed002da4256fcd8874642345`.
- Prueba HTTP publicada de rutas representativas Naturales: **PASS** (HTML de la aplicación; no equivale a inspección visual manual de escritorio/móvil).
- La auditoría M3 ejecutó la matriz de **171 celdas y 8.550 registros técnicos**, y detectó inicialmente 380 falsas alarmas en preguntas básicas M1 por no contemplar evidencia presente en `formula`. Se corrigió únicamente el verificador y se reejecutó con éxito, sin alterar ítems históricos.
- IDs anteriores M1/M2 preservados, más 2.850 nuevos con prefijo `science-m3-`. Quedan 0 déficits **técnicos por nivel**. **No se acredita independencia semántica ni revisión académica/psicométrica**, que permanecen pendientes autorizadas.
- Estado del orquestador: `naturales-M3` y `naturales-CORTE` cerrados técnicamente; siguiente área `sociales`, módulo `sociales-M1`, sujeto a reconciliación de datos actuales.
- Este commit documental nuevo tiene SHA distinto y requiere repetir CI y Render sobre ese SHA para su aceptación final.
