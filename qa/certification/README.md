# Certificación académica y funcional — Academia PHUMA Play

> **Sistema maestro vigente v8.0:** [Prompt ejecutor y política normativa](../../PROMPT_EJECUTOR_REPOSITORIO.md) + [Sistema Maestro completo](../../docs/Sistema_modulos_Academia_PHUMA_Play_v7_6.md). Los PDF originales están en [PDF/](PDF/); consultar el [registro actualizado](../../docs/fuentes_certificacion_paa_phuma_v6.json). Sin cuota de aprobación por corrida; los manifiestos técnicos admiten hasta 450 IDs de un subtema. Se encadenan varios manifiestos independientes con evidencia por criterio e ID. [Transición y reutilización RDG](../../docs/certificacion-masiva-v8_0.md). Los controles descritos abajo son implementación histórica salvo verificación actual.

## Fundamento documental y límites

Fuentes revisadas: `GUIA-PRE-U-UNAH-2026` CEI-TEST (PDF pp. 5–11), `GUIA-PRE-U-UNAH` (PDF pp. 4–11), `Guia_de_estudios_PAA` College Board (PDF pp. 7, 9–11 y sección de Matemáticas), y práctica PAA adjunta. Los PDF proporcionados en conversación se **referencian** pero **no se copian ni integran** al repositorio: se evita duplicar material protegido.

- **PHUMA**: 120 ítems, 170 minutos, cuatro alternativas de selección única. Distribución: Español 30, Matemáticas 30, Naturales 20, Sociales 20 y Habilidades Blandas 20.
- **PAA sin Inglés**: guía College Board describe 140 minutos para Lectura, Redacción y Matemáticas, selección múltiple y algunas respuestas matemáticas producidas por el alumno. **No** se fuerza un total de preguntas universal de una edición distinta.
- La correspondencia implementada es inicialmente **tema del catálogo ↔ área/competencia de la guía**. No debe interpretarse como análisis completo de cada pregunta. El campo `question_count_without_english=null` es intencionado.

## Gates

| Gate | Comprobación automática V1 | No demostrado todavía |
|---|---|---|
| C00 — control de oráculos | Tres casos válidos y tres mutaciones estructurales rechazadas | Corrección de todos los contenidos |
| C01 — alineación | Relación tema/área, 810 celdas y 40.500 posiciones técnicas sin ID global repetido | Pertinencia individual de cada ejercicio |
| C02 — claves | Oráculos independientes de forma/índice para Matemáticas, Naturales, Sociales y Blandas | Equivalencia semántica; oráculos independientes completos de Español |
| C03 — mecánicas | Presencia de suites reales de navegación, reutilización de su ejecución CI | Todos los 810 escenarios/niveles y equipos reales |
| C04 — pedagogía | Diagnóstico de presencia de explicaciones | Dificultad cognitiva, distractores, claridad y aprendizaje medido |
| C05 — simuladores | Dos contratos separados por examen y Inglés excluido | Simulador completo cronometrado, hojas de respuesta e informe por competencias |

Ejecutar de forma reproducible:

```bash
bun install --frozen-lockfile
node --import ./scripts/ts-resolve.mjs qa/certification/run.mjs
```

Salida: `qa/certification/evidence/latest.json`; Actions publica artefacto `academia-exam-certification-v1`, junto a los artefactos de navegadores y auditorías M4.

El informe contiene `technical_status` y `certified_for_exams=false` por separado. **Prohibido** cambiar `certified_for_exams` a verdadero únicamente por CI SUCCESS.

## Hoja de ruta incremental, sin lotes artificiales

1. **Bloque funcional**: convertir la incidencia #48 de `Continuar/Siguiente` en una matriz parametrizada por área, juego, nivel, subtema y ronda; demostrar 10/10, transición de estado, reinicio y guardado. Registrar capturas, traza y caso mínimo de cada fallo.
2. **Bloque editorial**: extender oráculos independientes a todas las familias de Español, medir distractores duplicados/ambiguos y detectar etiquetas internas como las señaladas en #49. Cada familia debe tener casos correctos, negativos y mutantes.
3. **Bloque curricular**: persistir `exam→competencia→subtema→item-id→fuente/página→evidencia` y clasificar `PASS | REVIEW | FAIL | NOT_APPLICABLE`. Cualquier evidencia genérica por tópico se marca REVIEW, no PASS individual.
4. **Bloque de simulación**: implementar flujos **PAA** y **PHUMA** separados, cronómetro, guardado/recuperación, selección única y respuestas matemáticas abiertas (PAA), navegación y resultados auditables. Implementar simulador PHUMA 120/170 con distribución oficial. Incluir simulacro PAA solamente cuando la versión y forma de secciones estén fijadas por la referencia correcta.
5. **Certificación**: continuidad por SHA, oráculos independientes, controles de CI y Render, reportes de revisión docente/psicométrica que permanezcan pendientes hasta evidencia real, trazabilidad de cambios y revocación si una prueba falla.

## Adaptaciones desde Axis-Suite y Academia_Play

- **Adoptar**: cobertura y trazabilidad, mutación negativa, ejecución modular por gates, idempotencia, evidencia por SHA, continuidad y registro de excepciones, validación de contratos/JSON.
- **Adaptar al contexto**: carga concurrente del simulador, accesibilidad y privacidad de estudiantes, restauración de progreso y fallos de navegador; las pruebas de base de datos solo aplicarán si el sistema incorpora almacenamiento servidor.
- **No trasladar ciegamente**: downgrade de Alembic, SQL injection, permisos de APIs o rate limits de endpoints no presentes. Una etiqueta PASS de otra suite no acredita este proyecto.

En las revisiones sin oráculo independiente se debe emitir `REVIEW`; no reetiquetar incertidumbre como aprobación. Cerrar M4 solo cuando los contratos académicos y de simulación relevantes estén efectivamente respaldados, separando el cierre técnico de la aprobación docente.

## Segunda fase implementada — C01/C02, oráculos de Español y trazabilidad

- `qa/certification/spanish-oracles.mjs` verifica las estructuras de respuesta que realmente utiliza la UI: clasificación de palabras o elementos, elección entre cuatro opciones, secuencias, corrección y reconstrucción de textos. Incluye nueve casos de mutación negativa con oráculos independientes de los componentes React.
- `qa/certification/traceability.mjs` genera **una fila por cada registro técnico** con ID, área, tema, subtema, modalidad, nivel, aplicabilidad PAA/PHUMA, huella SHA-256 del contenido y procedencia cuando está presente. El archivo `qa/certification/evidence/item-trace.json` es evidencia generada en cada CI, no un segundo banco de ejercicios.
- La clasificación curricular individual se fija expresamente en `REVIEW`: el vínculo por nombre del tema con el examen permite priorizar auditorías, pero no prueba que un ejercicio evalúe correctamente una competencia. Una referencia genérica `sourceLocator` no cambia ese estado.
- `run.mjs` integra los nuevos oráculos de Español en C00/C02 y mantiene separado el indicador `certified_for_exams: false`. La revisión docente del contenido y la equivalencia con preguntas reales continúan pendientes.
- El trabajo de CI conserva `academia-item-trace-spanish-oracles` con informe, trazas y fallos diagnosticables. La revisión de errores detectados debe corregir la pregunta/banco de origen o justificar una excepción documentada; nunca se deben suprimir errores por lotes.

## Tercera fase — claves derivadas y distractores

El script `qa/certification/semantic-lineage.mjs` contrasta, de forma independiente de la UI, las claves de las composiciones M2/M3 de Comprensión lectora y Redacción con las respuestas de sus ejercicios fuente mediante `sourceIds`. Exige que la opción compuesta correcta exista una sola vez. Marca como fallo una clave compuesta distinta de la derivada o distractores textualmente idénticos después de normalizar mayúsculas y espacios.

Las opciones que solo difieren por puntuación se conservan en estado **REVIEW**, pues pueden evaluar ortografía o uso de signos; la suite no debe decidir su equivalencia académica sin lectura contextual. Los `sourceIds` no resolubles también se registran como **REVIEW** para no inventar un linaje correcto.

El oráculo de linaje **no prueba** que la clave original sea semánticamente correcta. Para obtener evidencia independiente de corrección factual serán necesarios reactivos con reglas lingüísticas formalizadas o validaciones por docentes que no dependan de la misma clave original. El resultado se archiva como `academia-spanish-semantic-lineage` y debe corresponder al mismo SHA que CI y Render antes de emitir conclusiones.

## Cuarta fase — anclajes originales de Español y priorización editorial

- `qa/certification/spanish-anchor-rules.json` conserva **42 controles originales** de Categorías gramaticales, Sinónimos y antónimos, Cohesión y coherencia y Morfosintaxis distribuidos entre los tres niveles. Cada entrada contiene ID, fragmento del enunciado, **texto** de respuesta esperado (no solo índice) y una justificación lingüística redactada separadamente. Estas decisiones forman un conjunto de referencia técnico argumentado; **no equivalen a aprobación docente externa**.
- `qa/certification/original-spanish-review.mjs` exige encontrar cada anclaje en el catálogo y que la clave del banco coincida con la opción justificable. Ejecuta dos mutaciones por anclaje (cambiar la clave y duplicar el distractor), con umbral de **20 anclajes y al menos 5 por nivel**: un resultado vacío no puede pasar.
- En el mismo recorrido de Español identifica alternativas textualmente iguales normalizadas, grafías distintas por tildes/puntuación y respuestas muy parecidas. Registra los sospechosos en `qa/certification/evidence/distractor-review-queue.json` y los ordena según severidad y **número de ejercicios dependientes por `sourceIds`**. Esa cola es revisión, no fallo semántico automático.
- El artefacto de CI `academia-spanish-original-rules-editorial` contiene ambos informes. Si falla un anclaje, corregir el banco con fundamento y ejecutar mutaciones y regresión; nunca rebajar el umbral para obtener PASS.
- **Cobertura académica sin acreditar:** la revisión individual restante en Español, interpretación contextual de distractores y revisión externa de la fuente lingüística. No convertir estos 42 casos en una afirmación de certificación de 9.450 registros.

### Conciliación de distractores con decisiones editoriales existentes

La cola `distractor-review-queue.json` conserva los hallazgos detectados en las 9.450 posiciones de Español. Las opciones muy similares pueden ser legítimas cuando se evalúan morfología, concordancia, acentuación o puntuación. Los casos que coincidan exactamente con `scripts/editorial-decisions.mjs` recibirán la prioridad `DOCUMENTED_RULE_REVIEW` y la justificación ya archivada; **no** se eliminan de la cola ni se marcan como aprobados académicamente. El resto se ordena por severidad y dependencia entre ejercicios. Una similitud ortográfica no prueba que existan dos claves correctas.

## Quinta fase — 62 distractores de mayor impacto

Se revisó la procedencia de las 62 alertas `HIGH_EDITORIAL_REVIEW` de `distractor-review-queue.json`: **32 reactivos originales** y **30 actividades compuestas M2**. Los originales pertenecen a Morfosintaxis (9) y Corrección de Redacción (23), y las composiciones reutilizan al menos dos casos fuente mediante `sourceIds`.

- `qa/certification/high-impact-anchor-rules.json`: registra para cada uno de los 32 originales el ID, respuesta textual esperada, pista contextual y explicación lingüística (concordancia, antecedente, tiempo verbal, subordinación, acentuación). Los casos M2 no se presentan como preguntas independientes.
- `qa/certification/high-impact-review.mjs`: verifica las claves de esos originales sin leer el índice almacenado como fuente de verdad; muta la clave y duplica la respuesta para exigir detección. Para los restantes 30 exige fuentes M2 resolubles, clave idéntica a la primera fuente y respuesta única. Si la fuente A dispone de un oráculo argumentado, se comprueba su concordancia; si no, se marca `SOURCE_KEY_CONSISTENT_SEMANTIC_REVIEW`.
- `qa/certification/evidence/high-impact-review.json` es evidencia **por caso**, con dependencias y límites, y se archiva como `academia-spanish-62-high-impact-review`. Si una pregunta deja de estar entre las 62 alertas por una corrección legítima, se sigue examinando cualquier regla original de la tabla de anclajes.
- **No se confunden riesgos de apariencia similar con fallos comprobados**: una serie de alternativas como «está / están / estamos / estoy» o «cómo / como» puede evaluar precisamente concordancia o acentuación. Corregir sin examinar el contexto falsearía la evaluación.
- La prueba de consistencia de composiciones hereda la calidad de su origen. **La aprobación docente de semántica, transferencia PAA/PHUMA y calibración psicométrica siguen pendientes**. Un PASS técnico no autoriza cambiar esos estados.

## Política histórica — lotes técnicos de 450 (cursor legado preservado)

El auditor legado procesa lotes nominales de 450 registros técnicos; no define la cuota de certificación semántica v7.6. El universo vigente es 40.500 registros y la cobertura programada requiere **90 lotes**, sin Inglés. Esta política sustituye la revisión ordinaria anterior de grupos de 24, 42 o 62 registros. La suite técnica integral de inventario y regresión sigue ejecutándose en paralelo.

### Criterios de selección y avance

- `qa/certification/batch-state.json` es el cursor versionado; `current_batch=0` representa el primer lote. Solo se incrementa a `1`, `2`, etc. después de obtener **CI SUCCESS y Render LIVE del mismo SHA** y conservar la evidencia del lote anterior. La herramienta nunca avanza el cursor silenciosamente ni marca lotes futuros como completos.
- `qa/certification/audit-450.mjs` construye un orden estable de las 40.500 posiciones, intercalando **45 estratos de área × modalidad × nivel**, de forma equilibrada mientras tengan elementos; selecciona la franja [`450 × current_batch`, `450 × (current_batch+1)`). La secuencia evita inspeccionar reiteradamente siempre los primeros ejercicios y cubre el catálogo completo tras 90 pasadas. **El lote 1 es 0–449**.
- Cada ítem queda registrado con ID, huella de contenido, área, tema, subtema, juego, nivel, estado técnico, banderas editoriales, referencias de fuente y estado de revisión académica. No se confunden `PASS` estructural con independencia semántica, corrección factual, dificultad o equivalencia a los exámenes.
- La corrida **falla** si el lote no tiene 450 IDs únicos, si se rompe el inventario o si la clave/estructura no es utilizable. Una posible ambigüedad, similitud ortográfica o explicación deficiente se registra como `REVIEW` para corregir con criterio, sin etiquetarla falsamente como error o PASS.
- El artefacto `academia-certification-batch-450` en GitHub Actions contiene `qa/certification/evidence/batch-450.json`, los 450 expedientes y un resumen con desglose por área, modalidad, nivel y banderas de revisión.

### Cierre de un lote

Un lote solo queda **técnicamente entregado** cuando su auditoría y la regresión global CI son SUCCESS, Render está LIVE con ese SHA, existe evidencia archivada y el siguiente cursor se actualiza en una nueva corrida. La aprobación **académica** necesita evidencia adicional por ejercicio y puede quedar en `REVIEW` sin detener el cierre técnico, pero debe distinguirse en todos los informes.

La cobertura total de 90 lotes no sustituye calibración psicométrica, revisión por especialistas ni los simulacros reales PAA/PHUMA separados.


## v7.8.1: controles de ejecución
`python3 -m unittest discover -s qa/certification -p 'test_guard_avance_phuma_v7_6.py'` comprueba el guard local. `python3 qa/certification/verify_sources.py` comprueba los bytes de los PDF, no su interpretación ni derechos. El control de CI no autentica por sí solo evidencia semántica/docente. El cursor legado se conserva sin promover REVIEW a PASS; seleccionar lotes adaptativos por IDs y hashes bajo v7.6.

### Selección adaptativa ejecutable
`PHUMA_FROZEN_BATCH=/ruta/lote.json node --import ./scripts/ts-resolve.mjs qa/certification/audit-450.mjs` acepta un manifiesto RDG_READY del subtema activo, con IDs y objetivos vinculados (hasta 450 por sublote técnico). Rechaza hashes obsoletos e IDs inexistentes. Sin variable conserva el recorrido histórico de CI; no modifica el cursor ni aprueba semántica.

**v7.8.1 — Conservación del producto:** certificar el banco existente aplicando §0.1; auditorías compartidas por alcance y hash, revisión individual por ID y corrección inmediata. No reiniciar módulos ni regenerar bancos válidos. El Modo Repaso se conserva o completa según brechas verificadas.

### Verificación de intervención mínima (v7.8.1)
G-ACTION comprueba que cambios bajo `src/` estén asociados a `interventions[]` con `scope`, `action`, `affected_paths`, `justification`, `finding_ref` y `evidence_ref` referidos a artefactos registrados. `SUSTITUIR`/`CREAR` exigen `why_minimal_insufficient`. Es un control estructural local; no demuestra por sí solo la necesidad pedagógica ni sustituye el oráculo/revisión independiente. Conservar el código válido no exige modificarlo. Se mantienen los criterios y evidencias históricos compatibles.

**v7.8.1 — Prioridad vinculante:** unidad pedagógica = subtema; unidad operativa = bloque coherente. P0 PLANIFICAR (G-DISEÑO) → P1 IMPLEMENTAR RDG (G-REPASO) → P2 CERTIFICAR juegos e IDs asociados (G-CERTIFICACIÓN). Encadenar fases en el menor número posible de corridas, reutilizar fuentes/planes vigentes y motor común. No hay cuota de 450 por corrida. Solo P0 con artefacto ejecutable nuevo y validación real cuenta como DISEÑO, nunca producto ni certificación. Consultar `qa/certification/rdg/README.md`.

### Contrato ejecutable v7.8.1
El manifiesto congelado requiere `subtopic_scope:{area,topic,subtopic}`, `rdg_contract:{status:'RDG_READY',subtopic_scope,route_path,route_sha256,objective_ids,evidence_ref}`, `items:[{id,content_sha256,objective_ids}]`. El auditor comprueba coincidencia del subtema y objetivos, hash de ruta en HEAD y del contenido de cada ID. El guard exige fase `CERTIFICACION_ASOCIADA_EN_CURSO`, contrato y vínculo por ID para PASS_SEMANTIC. Estos son controles estructurales; la evidencia de fuente, validez disciplinar, pruebas C09 y aprobación independiente siguen siendo obligatorias. El recorrido por offset sin manifiesto es diagnóstico técnico legado, no autoriza avanzar el cursor pedagógico. No existen rutas READY por el mero hecho de activar esta política.

**v7.8.1 — Investigación y calibración complementaria obligatoria en P0:** aplicar §4.1. Además de los PDF originales, buscar exhaustiva y proporcionalmente guías, apuntes, ejercicios resueltos, cuestionarios, simulacros y videos (Studocu, sitios institucionales y otros recursos legítimos). Contrastar con anclas oficiales; registrar consultas, acceso, linaje, hallazgos, decisiones y perfil cualitativo por nivel. Reutilizar evidencia vigente; no copiar preguntas ni convertir fuentes secundarias en autoridad PHUMA. P1/P2 consumen la calibración congelada. 

## Política v7.9
La familia pedagógica comparte evidencia verificable, no aprobación. Mantener decisión individual A–H >=3, B VERIFIED, originalidad/variación útil G y dificultad F calibrada. Aspiración inicial 150 PASS nuevos/corrida, no cuota ni garantía. REVIEW heredado se reevalúa con evidencia, no se convierte por etiqueta; el auditor legado sigue siendo diagnóstico técnico. Ver §§3–8 del ejecutor para criterios, mutaciones, invalidación y piloto.
