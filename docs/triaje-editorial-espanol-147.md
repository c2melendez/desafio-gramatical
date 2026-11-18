# Triaje editorial de 147 observaciones — Comunicación y Español

**Fecha:** 17 de noviembre de 2026. **Alcance:** 4 temas, 21 subtemas, 189 celdas y 9.450 registros técnicos (tres juegos y tres dificultades). **Estado:** PASS técnico y editorial heurístico; **revisión docente pendiente**. Auditoría reproducible: `scripts/audit-clarity-competency.mjs`, run de PR `44241643131`, artefacto `claridad-competencia-espanol` ID `14399537609`. **SHA de evidencia:** consultar JSON del artefacto; no se debe trasladar ese resultado automáticamente a otro SHA sin repetir CI.

## Desglose de decisiones

| Hallazgo inicial | Número de señales | Abordaje verificable | Señales actuales |
| --- | ---: | --- | ---: |
| Pistas ordinales en Redacción (construcción) | 118 | Eliminación de marcadores que revelaban posición, sin cambiar IDs ni claves; revisión de los fragmentos breves hasta conservar la validez del estímulo | 0 |
| Opciones muy parecidas de Corrección | 22 | Se mantienen porque evalúan grafía, espacio, tilde o puntuación; se documentan reglas, respuesta y familia de origen en `scripts/editorial-decisions.mjs` y el informe por ID registra 22 decisiones expresas | 0 sin justificar |
| Explicaciones breves de categorías gramaticales | 7 | Se amplió la explicación M2 para justificar las funciones de A y B y por qué una combinación parcialmente acertada es incorrecta | 0 |
| **Total** | **147** | **Triaje realizado con evidencia por ID** | **0 alertas del auditor** |

## Verificación automatizada del resultado

El informe generado por CI contiene `status=PASS`, `review_flags=0`, `blockers=0`, `reviewed_orthography_decisions=22`, `records_audited=9450` y `distinct_ids=9450`. La prueba `src/test/editorial-triage-147.test.ts` recorre los niveles y subtemas de Redacción y evita la reintroducción de conectores ordinales de respuesta, preservando las explicaciones M2 y la corrección de los fragmentos.

Se han modificado 224 enunciados de los cinco bancos de edición de Redacción para retirar pistas directas, más los marcadores correspondientes de las semillas generales. Algunas frases fueron ampliadas con datos de su propio contexto para respetar los mínimos editoriales; no se cambió el número de posiciones ni el identificador de ningún ejercicio.

Los seis patrones base de distractores ortográficos intencionales, y sus permutaciones derivadas M2/M3, están justificados por la regla concreta evaluada: «encima» como adverbio, cuatro usos de «por qué/porque/porqué/por que», el sustantivo «el porqué», la puntuación de una subordinada concesiva y la grafía «encima» en una frase locativa.

## Limitaciones y regla futura

- **PASS no significa certificación académica.** El auditor de reglas formales no puede demostrar por sí solo que todas las 9.450 preguntas son inequívocas, adecuadas para PHUMA, independientes o calibradas psicométricamente. Se conserva `reviewStatus=editorial-draft` y la revisión docente diferida.
- No se deben eliminar automáticamente distractores que evalúan un contraste ortográfico real; debe existir explicación reproducible por familia, contexto y clave.
- El contrato editorial es transversal: `docs/norma-paridad-visual.md` 1.3 y `Sistema_modulos_Academia_PHUMA_Play.md` 5.4 (Library); todas las nuevas áreas deben aplicar el mismo triaje de forma contextualizada.
- La liberación formal de esta corrida exige CI de `main` y Render Live en el mismo SHA, sin romper las diez rondas por juego ni las regresiones M0–M3.

**Próximo objetivo de producto:** iniciar `matematicas-M1` conforme al sistema modular, con la revisión docente de Español como tarea editorial separada, sin presentarla como completa.
