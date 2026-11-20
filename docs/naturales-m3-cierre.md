# Ciencias Naturales M3 — cierre técnico y corte de área

**Estado de trabajo: EN_CURSO**, pendiente de CI en main, Render Live con idéntico SHA y comprobación pública. La revisión académica y psicométrica permanece PENDIENTE_AUTORIZADA.

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
