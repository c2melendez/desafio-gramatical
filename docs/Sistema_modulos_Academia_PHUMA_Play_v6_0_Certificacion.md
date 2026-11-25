> **ARCHIVO HISTÓRICO — NO EJECUTAR.** Sustituido por [v7.7](Sistema_modulos_Academia_PHUMA_Play_v7_6.md). Se conserva el contenido histórico sin autoridad operativa.

# Academia PHUMA Play — Sistema de ejecución autónoma por módulos + Certificación PAA/PHUMA

**VERSIÓN 6.0 — 23 de noviembre de 2026**  
**Estado:** extensión operativa de la versión 5.4, preservada en el anexo completo de este mismo archivo.  
**Prioridad actual:** CERTIFICAR módulos existentes y mejorar aprendizaje; no reiniciar M0–M3 ni generar ejercicios indiscriminadamente.

> **Mensaje ejecutor (orden de operación).** Actúa como responsable autónomo de la certificación técnica, funcional, curricular y editorial de Academia PHUMA Play, una academia lúdica para preparar PAA y PHUMA, **sin Inglés**. Lee íntegramente este documento y el estado real del repositorio. Trabaja exclusivamente en `c2melendez/desafio-gramatical` y el Render asociado (salvo cambio autorizado expresamente). Recupera el cursor de certificación, valida el cierre de la corrida anterior, ejecuta **450 ejercicios distintos por corrida** con las suites existentes, corrige los fallos demostrados, implementa las puertas funcionales de puntuación y dominio perfecto, genera evidencia por ID y deja commits, CI y Render reconciliados en el mismo SHA. No te limites a redactar propuestas cuando cuentas con permisos y herramientas para ejecutarlas. No confundas auditoría estructural con validación académica independiente. No inventes evidencia. Ejecuta hasta completar la corrida actual y registra siempre el punto de reanudación.

## 0. Precedencia, compatibilidad e instrucciones rápidas

1. **Mandatos prioritarios:** políticas del entorno y autorizaciones del usuario más recientes; este suplemento **v6.0** en materia de certificación, PAA/PHUMA, puntuación y logros; **v5.4** para contratos y orquestación que no hayan sido reemplazados; decisiones técnicas verificadas en el repositorio; referencias históricas solo como antecedentes.
2. El proyecto tiene módulos creados; primero comprueba su estado real, sin asumir que falta implementarlos. **M4** conserva la auditoría global existente. Define **M5-CERT** como fase transversal de certificación, reparaciones e idoneidad de preparación y simulacros. No borrar fases ni reetiquetar módulos completos sin pruebas.
3. **INICIAR**: reconciliar repositorio y recursos, seleccionar la fase de certificación pendiente y ejecutar. **CONTINUAR** o **SIGUIENTE CORRIDA**: recuperar progreso duradero, validar cierre anterior y ejecutar el siguiente bloque no repetido. **ESTADO**: devolver último SHA, CI/Render, cursor, cobertura, riesgos y puerta actual; verificar, no suponer.
4. El usuario ha autorizado históricamente cambios en GitHub/Render para este proyecto: confirma los límites concretos con el registro de autorización disponible. Respeta protección de ramas, derechos de autor y cambios irreversibles. Un programador/automatización es necesario para ejecución periódica: este prompt **no inicia trabajo futuro por sí solo**.
5. Repositorio canónico `https://github.com/c2melendez/desafio-gramatical`; CI `https://github.com/c2melendez/desafio-gramatical/actions`; producción `https://desafio-gramatical.onrender.com/`. `academia-paa-phuma` es **referencia externa**, no el destino de este prompt. Si se renombra más adelante, exigir autorización de migración y pruebas de compatibilidad.

## 1. Misión de producto y criterio de éxito

**Resultado esperado:** estudiante capaz de leer, razonar, resolver, discriminar errores, transferir conocimientos a ítems de PAA/PHUMA y medir su progreso a través de minijuegos comprensibles, como una experiencia inspirada en el **enfoque lúdico de Duolingo**, sin copiar diseños, textos, marcas o elementos protegidos. Los juegos NO son mera memorización de patrones ni un examen de velocidad arbitrario.

- **PHUMA:** Competencias Comunicativas, Matemáticas, Entorno Natural, Entorno Social y Habilidades Blandas, según guía oficial CEI-TEST vigente. Como referencia de la guía suministrada: **120 preguntas; 30/30/20/20/20; cuatro alternativas de respuesta única; 170 minutos**. Verificar versiones posteriores y páginas exactas en fuente oficial antes de modificar el simulador.
- **PAA sin Inglés:** Lectura, Redacción y Matemáticas, incluyendo formato de respuesta matemática producida por el estudiante si aplica a la guía/version utilizada. No extrapolar el formato PHUMA a PAA ni inferir total fijo de preguntas cuando los documentos históricos difieren.
- **Tres niveles:** Básico (`principiante`) = adquisición y andamiaje; **Intermedio = dificultad cognitiva y formatos previstos para el examen de referencia**, no simplemente otra magnitud numérica; Avanzado = transferencia, razonamiento multietapa y distractores conceptuales plausibles. El objetivo intermedio se valida con anclas rubricadas de las guías, sin atribuir calibración psicométrica oficial.
- Todos los niveles explican el razonamiento y permiten retroalimentación incluso tras responder bien. Los errores se convierten en rutas de refuerzo; ningún mecanismo oculta una respuesta correcta ni bloquea el avance arbitrariamente.
- No afirmar asociación o aval oficial de la UNAH/College Board. Tratar los simulacros externos, Studocu y UNX como **complementarios y de calidad heterogénea**, no como temario rector.

## 2. Estado y artefactos que el ejecutor debe inspeccionar en CADA corrida

Antes de escribir, comprobar **en GitHub** la rama `main`, SHA, estado de CI y artefactos, y **en Render** el deploy LIVE y SHA. Comprobar rutas reales y nombres, sin inventarlos:

- `docs/modulos-phuma.json`, documentos M0–M4, `docs/norma-paridad-visual.md` y bloqueos de contratos M0 si existen;
- `qa/certification/README.md`, `exam-contracts.json`, `run.mjs`, `traceability.mjs`, `spanish-oracles.mjs`, `semantic-lineage.mjs`, `original-spanish-review.mjs`, `high-impact-review.mjs`, `audit-450.mjs`, `batch-state.json`;
- `.github/workflows/ci.yml`, `scripts/audit-game-progression.mjs`, controles de navegador y accesibilidad;
- `src/lib/grammar.ts` (puntuación, historial), `src/components/games/GameSessionHeader.tsx`, componentes por juego, rutas `jugar`, `lectura`, `redaccion`, `matematicas`, `naturales`, `sociales`, `blandas`, y ruta de selección inicial;
- `docs/fuentes_certificacion_paa_phuma_v6.json` como inventario legible por máquina de fuentes/versiones/hashes/licencias.

**Snapshot comprobado al redactar:** `batch-state.json` tiene `current_batch=1` (lote 2 abierto); lote 1 cerrado sobre CI `45167021720`, SHA `ad14c4c...`. La corrida 2 se había ejecutado con auditoría específica PASS, pero su cierre integral debe consultarse en vivo, no pre-aprobarse por el texto histórico. **Este snapshot es una referencia de reanudación, nunca un cursor sustituto de GitHub**.

## 3. Fuentes documentales, acceso directo y derechos de autor

**Fuente de verdad curricular:** guía UNAH/CEI-TEST de PHUMA vigente y PAA de College Board en la versión pertinente; el contenido académico no se decide por repositorios de terceros ni por un simulador extraoficial. El manifiesto `docs/fuentes_certificacion_paa_phuma_v6.json` identifica cada documento adjunto por SHA-256, número de páginas, uso, procedencia, enlace verificado si existe y política de derechos. Usar ese manifiesto para encontrar documentos, solicitar acceso directo y registrar cambios.

- **Prioridad A:** portal Admisiones UNAH https://admisiones.unah.edu.hn/pruebas-de-admision/ ; guía https://admisiones.unah.edu.hn/guia-de-estudio-para-la-phuma/ ; documento `https://admisiones.unah.edu.hn/assets/Uploads/GUIA-PRE-U-UNAH-2026.pdf` y su versión histórica `https://admisiones.unah.edu.hn/assets/guia-de-estudio/GUIA-PRE-U-UNAH.pdf` (no tomar guía vieja como vigente sin comprobar).
- **Prioridad B:** guía PAA College Board (edición 2021) hospedada por UNAH: `https://admisiones.unah.edu.hn/assets/Guia-estudio-nueva-2022/Guia-de-estudios-PAA.pdf`; prueba de práctica College Board (2018) hospedada por su titular: `https://latam.collegeboard.org/wp-content/uploads/2020/07/0-PAA-Prueba-Practica.pdf`. Verificar edición/estado del enlace y contrastar con hashes de anexos. Hojas de respuestas y PDFs UNX son terceros; si no hay URL directa legítima, el ejecutor debe usar el archivo entregado por el usuario mediante una conexión autorizada o declararlo **SIN_ACCESO**. No inventar descargas ni asumir que los adjuntos privados están en el repositorio.
- **Prioridad C contextual:** simulador externo `https://pronasa.dashnexpages.net/simulador-phuma/`, `https://www.studocu.com/latam/course/universidad-nacional-autonoma-de-honduras/examen-de-admision/7512626`, UNX y materiales ilustrativos. Navegar términos accesibles con cita de procedencia; una página restringida por cuenta/paywall no habilita el uso de extractores no permitidos. El enlace de inscripción 2025 se usa para contexto del proceso, no para inferir el temario 2026.
- **Derechos:** nunca subir a **repositorio público** PDFs completos de College Board, Studocu, UNX ni copias de guías UNAH sin acreditar permiso/licencia de redistribución; que un PDF sea público no equivale a una licencia de copia. **Sí** subir siempre manifiestos propios, links a archivos hospedados por sus titulares, hashes, rúbricas, mapas de competencias, fichas descriptivas y extractos breves legalmente permitidos. Cuando el usuario aporte autorización expresa para publicar una obra concreta, registrar la licencia/permisos y anexar la copia autorizada con su SHA.
- Versionar referencia curricular con `source_id`, institución/titular, título, año/edición, página/sección, URL, fecha de consulta, SHA (si hay binario) y nivel de autoridad. Si una URL desaparece, buscar URL oficial equivalente, documentar el cambio y señalar el punto no verificable. No confundir un PDF de 42 páginas con el de 77 páginas de 2026: son ediciones diferentes.

## 4. Matriz de idoneidad curricular — auditoría por ítem, no solo por tema

Para cada ejercicio crear/enriquecer ficha versionada (sin sustituir el banco):

`id, content_hash, exam[PAA/PHUMA], area, competencia, subcompetencia, tema, subtema, modalidad, nivel, tipo_cognitivo, stimulus_id, fuente_id, pagina/seccion, evidencia, respuesta_esperada, oraculo_independiente, distractores[], explicacion, dependencias_fuente[], originalidad, revision, riesgos, fecha, modelo/revisor`.

Puertas **C01–C05** de la suite: C01 alineación; C02 respuestas; C03 mecánicas; C04 calidad pedagógica; C05 simuladores. **C00** pruebas negativas de los oráculos. Añadir **C06 puntuación/logros** y **C07 persistencia/accesibilidad** como controles transversales. Adaptar scripts existentes; no duplicar suites sin necesidad.

1. **Competencia demostrable (C01):** exige que el razonamiento que resuelve el ítem coincida con la competencia y tipo de operación mental que exige la guía. `tema coincide` ⇒ `REVIEW`, no PASS individual. Documenta página oficial o evidencia de equivalencia; terceros aportan contexto solamente.
2. **Clave correcta (C02):** obtener por oráculo independiente de la clave guardada. Matemáticas: cálculos exactos, expresiones equivalentes, dominios, rango, intervalos, intersecciones, unidades y tolerancias justificadas; Ciencias: principios científicos, condiciones y causalidad; Español: reglas ortográficas, sintácticas, semánticas, evidencia de línea/párrafo; Sociales: fuente histórica/cívica verificable; Blandas: criterios explícitos de decisión contextual sin respuestas moralizantes. Dos respuestas legítimas o ausencia de prueba = `FAIL/REVIEW` y corrección del dato o redacción.
3. **Distractores (C02/C04):** únicos y pertinentes, sin pistas de longitud, morfología o patrón de clave; engaños conceptuales plausibles pero sin ambigüedad. «cómo/como» y «está/están» pueden ser distractores legítimos. Validación contextual humana/modelo independiente del generador; aplicar mutación de clave, alternativas duplicadas y distractor que se vuelve correcto.
4. **Dificultad (C04):** por **operación cognitiva, número de inferencias, cantidad/heterogeneidad de evidencias y independencia de pistas**, no cambiar solo números o añadir texto. Básico: identificar/aplicar con una relación; Intermedio: inferir, transferir y justificar a complejidad semejante a anclas del examen; Avanzado: varios pasos, contraejemplos, síntesis o transferencia novedosa. Justificar dificultad por ítem y subtema. No confundir nivel lúdico con puntuación del examen.
5. **Feedback:** además de decir correcta/incorrecta, exponer selección del estudiante, respuesta válida, razonamiento sustentado, por qué un distractor principal falla y microconsejo de aprendizaje. Para clasificaciones/construcciones informar cada subdecisión pero contabilizar **una ronda**.
6. **Independencia real:** los ejercicios M2/M3 derivados conservan `sourceIds`, pero replicar la clave del primer estímulo no demuestra competencia nueva. Medir similitud semántica, reutilización de plantillas, pistas accidentales, reducción superficial de dificultad, rotación real y valor pedagógico añadido. Identificar y reparar compuestos con etiquetas internas («CASO B CORREGIDO/RESUELTO») si distraen, sesgan respuesta o revelan claves.
7. **Cobertura texto-latinoamericana:** por cada subtema pertinente de Lectura/Literatura, incorporar textos o pasajes **originales** con rasgos de narrativa, poesía, ensayo, crónica, voz regional y contextos de Honduras y América Latina. Cuando una referencia mencione autor/obra, registrar autor, obra, género, rasgo textual y la destreza (narrador, focalización, metáfora, contexto sociocultural, ironía, temporalidad, argumentación, intertextualidad); crear nuevos pasajes sin reproducir la obra protegida ni imitar demasiado una voz individual contemporánea. Ejemplos de **autores a investigar**, no suponer que los PDFs concretos los mencionan: Juan Ramón Molina, Lucila Gamero de Medina, Froylán Turcios, Ramón Amaya Amador y voces latinoamericanas. Verificar dominio público de cada texto antes de citarlo ampliamente; si no, trabajar con fragmentos autorizados, breves citas permitidas o textos originales sin falsa atribución.
8. **Control de fuentes:** referencia primaria citada para cada decisión factual; si falta, `SIN_EVIDENCIA/REVIEW`. Nunca copiar bancos completos de examen ni sobreajustar preguntas a exámenes pasados; entrenar capacidades transferibles.

### Rúbrica explícita (0–4 por criterio; 4 = óptimo)

A) correspondencia con competencia de examen; B) corrección disciplinar y clave única; C) distractores y decisiones válidas; D) claridad del estímulo/consigna; E) justificación y feedback; F) dificultad cognitiva calibrada por anclas; G) independencia/diversidad; H) adecuación cultural, accesibilidad y enfoque lúdico. Guardar puntaje por criterio, argumento y evidencia, no un promedio vacío. **Criterio B con fallo o ausencia de oráculo independiente bloquea aprobación semántica aunque el promedio sea alto**. Aprobación académica externa nunca se autoasigna. Un 4/4 de un LLM es una **evaluación asistida**, no revisión docente.

## 5. Puntuación universal, criterio de aprobación y logro perfecto — PRIORIDAD P0

**Especificación funcional obligatoria para TODOS los juegos habilitados y tres niveles**. La implementación actual contiene `pointsFor(streak)=10+min(streak,5)*2` en `src/lib/grammar.ts`; la continuidad permite conservar la fórmula de puntos por racha, pero exige **una única implementación compartida** y pruebas entre las siete rutas. No usar puntos de bonificación para decidir dominio.

### 5.1 Contrato de una partida

- Partida válida = **exactamente 10 rondas** con 10 IDs distintos de la combinación `area + topic + subtopic + game + level`. En cada ronda con subrespuestas, consolidar una sola decisión booleana `roundCorrect = todas_las_subrespuestas_correctas_y_sin_ayuda_invalidante` y un solo evento de conteo. No permitir «11/10», dobles clicks con doble puntuación, repetir la misma ronda para cambiar resultado, ni un total inferior a 10 marcado completo.
- Al completar cada ronda exactamente una vez: `attempted += 1`, `correct += roundCorrect ? 1 : 0`, `score += roundCorrect ? pointsFor(streak_previo) : 0`, `streak = roundCorrect ? streak+1 : 0`, `bestStreak = max(...)`. Una partida incorrecta puede continuar hasta resultados; los errores son oportunidades de enseñanza y rotación.
- `accuracy = (correct / 10) * 100` **solo al terminar las 10 rondas**; mostrar `aciertos/10`, porcentaje, puntuación lúdica y racha separadamente. `score` es métrica lúdica, no nota de admisión. **No otorgar aprobación por score alto ni por 9/10; 9/10 = 90% = no superado**.
- `approved100 = finished && total===10 && correct===10 && accuracy===100 && hasNoInvalidatingAssistance`. Si se ofrecen pistas/respuestas reveladas, definir explícitamente si invalidan dominio perfecto; por defecto **sí lo invalidan para insignia** aunque pueden favorecer el aprendizaje. Nunca conceder logro a partida abandonada, parcial o con respuestas rehechas después de ver la solución.
- Resultado final y almacenamiento: persistir intento completo con fecha, selección, hashes del contenido, ruta y versión, respuestas, 10/10, score, racha, accuracy y estado de ayudas. Impedir sumar eventos duplicados en recargas/back/forward y reconectar de forma idempotente.

### 5.2 Insignia y progreso permanente

- Crear componente visual reutilizable de **estrella/medalla** con texto accesible `Dominado al 100 %` y contraste/foco correctos, mostrado en **selección de juego y nivel**, resumen, historial y accesos a rutas; no solo en pantalla final.
- Llave estable: `achievement_key = stable_schema_version + area_id + topic_id + subtopic_id + game_id + level_id`; las cinco dimensiones son obligatorias. No compartir estrella entre niveles, juegos o subtemas. Registrar `firstPerfectAt`, `lastPerfectAt`, `perfectRuns`, `bestCorrect=10`, `bestScore` y versión/contenido asociado. Mantener historial de intentos y mostrar mejor intento, última partida y partidas perfectas sin perder las anteriores.
- Progreso 10/10 **durable** en recarga, cambio de ruta y nueva sesión. Usar el mecanismo actual de persistencia (hoy `saveHistory` local) como punto de integración; versionar esquema, migraciones, defensas ante datos corruptos/duplicados y límites de almacenamiento. Si el proyecto tiene autenticación/sincronización futura, diseñar migración a servidor sin borrar logros locales ni filtrar datos personales.
- Logro perfecto se **conserva al repetir y fallar una partida posterior**, pero solo como mejor logro histórico de esa combinación; la última partida y el mejor récord se distinguen claramente. Si cambian sustancialmente reglas o banco, mantener logro histórico con versión y definir insignia de la versión actual sin borrar logros de forma silenciosa.
- No equiparar estrellitas con aval PAA/PHUMA: etiqueta informa **dominio del juego y nivel en una partida perfecta**, no predice calificación del examen.

### 5.3 Batería de aceptación obligatoria (C06/C07)

1. En TODAS las rutas y modalidades: completar 10 rondas correctas ⇒ `correct=10`, `accuracy=100`, estrella visible e historial persistido; caso incorrecto 1/10 ⇒ `9/10`, sin estrella nueva; 8/10 idem; 10/10 con pistas invalidantes ⇒ sin estrella; 9/10 con puntos de racha elevados ⇒ sin estrella.
2. Clasificar con tres decisiones parciales: dos correctas + una incorrecta ⇒ **una** ronda incorrecta, una actualización de puntaje; construcción: solo toda la secuencia válida cuenta como una ronda. Probar mutantes que suman varias veces por respuestas internas y detectar fallo.
3. Pantalla y navegación: botón «Continuar/Siguiente» habilitado tras finalizar válidamente el ejercicio incluso si fue incorrecto; bloqueo mientras esté incompleto; última ronda finaliza y guarda; reinicio confirmado, cambio de ruta, recarga y agotamiento del banco; ningún doble envío.
4. Probar persistencia entre rutas, nuevo tab/navegador compatible y reanudación; casos localStorage sin permisos y datos ilegibles; logo visible para **solo combinación exacta** y niveles no logrados sin insignia. Probar móvil/escritorio y lectores de pantalla mediante herramientas disponibles; pruebas manuales pendientes no se etiquetan como ejecutadas.
5. Ejecutar matriz parametrizada de **todas** las áreas/temas/subtemas/juegos/niveles habilitados (hoy 810 combinaciones técnicas), priorizando casos reales #48 y regresiones. No sustituir 810 pruebas funcionales por solo 21 escenarios ilustrativos.
6. Congelar en `docs` un contrato de eventos de juego (`round_id`, `attempt_id`, `phase`, `roundCorrect`, `answered_at`, `content_version`) y resultados; aplicarlo en un reducer/helper común, eliminando duplicaciones entre rutas sin romper su UI. Tests unitarios, de propiedades, negativos, de navegador y mutación para la misma función canónica de score/logros.

**Puerta roja:** falta de insignia funcional o diferencias de criterios entre rutas impide declarar C06 aprobado. El reporte debe desglosar `games_tested`, `10_of_10_pass`, `9_of_10_no_badge_pass`, `persistence_pass`, `next_button_pass`, `duplicate_event_pass`, por área y nivel, con `NOT_RUN` donde falte evidencia.

## 6. Política obligatoria de 450 expedientes distintos por corrida

**Objetivo:** certificar 40.500 registros técnicos existentes en **90 corridas de 450**, sin Inglés; requisito cuantitativo de selección, no número de nuevas preguntas generadas. La comprobación estructural global puede examinar los 40.500 **en paralelo** pero NO sustituye la revisión individual sustantiva del lote.

1. Recuperar `qa/certification/batch-state.json`. El campo `current_batch` está en base cero: `0` primer lote, `1` segundo, ... `89` último. Comprobar lista `completed_batches` contra los IDs, hashes, artifacts, GitHub run, estado Render y ausencia de solapamientos. No usar un contador declarado a mano cuando no coincide con evidencia.
2. Seleccionar las **450 posiciones de ese índice** mediante el algoritmo determinista de `qa/certification/audit-450.mjs`: `45 estratos = 5 áreas × 3 juegos × 3 niveles`, intercalados de manera reproducible. Revisar que el orden y hashes no hayan cambiado entre corridas; si el banco cambia, congelar snapshot o calcular un manifiesto de migración para no repetir ni omitir IDs. Guardar universo, algoritmo, SHA base, ID de lote, semilla si corresponde.
3. En **cada uno de los 450**, ejecutar C01, C02, C04 (y C03 según naturaleza del juego) con ficha/rúbrica y evidencias: clave, explicación, distractores, dificultad, patrón de examen y provenance. Una revisión automática que solo valida `answerIndex` **no cuenta como revisión académica de 450**. Los criterios sin comprobación registran `REVIEW/NOT_RUN`, no `PASS`.
4. Para aquellos 450 que carezcan de oráculo independiente o fuente verificable: **no inventar 450 aprobaciones**. Avanzar técnicamente cuando el contrato lo permita, listar déficit editorial con IDs, fuente requerida, prioridad y propuesta de corrección; si la ambigüedad puede afectar una respuesta jugable, cuarentena/bloqueo funcional del ítem hasta corregirla.
5. Corregir automáticamente solo problemas demostrados y cambios reversibles bajo autorización. Repetir oráculos y regresión sobre afectados, fuentes/derivados y componentes compartidos; revisar efectos de JSON, localStorage e IDs. No crear otra corrida solo para aprobar una documentación sin cambios funcionales si es evitable.
6. Guardar `qa/certification/evidence/batch-450.json` u otra evidencia única por corrida (ej. `batch-0002-<sha>.json` en GitHub artifacts), con **450 IDs, huellas y decisiones**, resumen de cobertura, evaluaciones PASS/FAIL/REVIEW, referencias exactas, correcciones y pendientes.
7. **Cierre de corrida:** pasa a `COMPLETADA_TECNICAMENTE` solo cuando gates obligatorios realmente `PASS`, build/test, navegadores y CI global SUCCESS, Render LIVE **del mismo SHA**, artefactos no caducados o copias de evidencia perennes y cursor conciliado; `REVIEW_ACADEMICO` puede permanecer pendiente y debe publicarse. Si falla un gate: `EN_CURSO/BLOQUEADA`, reintentar/corregir, nunca sumar falsos progresos ni reducir el lote a 24/42/62.
8. **Avance:** al cierre del lote N (índice N−1), escribir en estado commit/CI/artifact/Render/evidencia; luego fijar `current_batch=N`. El siguiente run opera el bloque N+1. No adelantar el cursor antes del cierre; tampoco repetir lotes cuando ya tienen cierre verificable. Si límite de sesión impide acabar, persistir checkpoint y método de reanudación; no prometer que correrá solo.
9. Medir métricas distintas: `technical_records_examined`, `individual_structural_checks`, `semantic_oracle_pass`, `pedagogical_review_done`, `academic_expert_approved`, `browser_scenarios_verified`, `curriculum_competencies_covered`, `issues_open/closed`. Prohibido publicar 40.500 «certificados» por un inventario global o 450 «validados pedagógicamente» si solo se revisó su forma.

## 7. Suite de pruebas integral de certificación y responsabilidades

- **C00 / resistencia de pruebas:** seeds fijos, mutantes positivos/negativos (clave falsa, distractores iguales, dos claves válidas, ronda doble, puntuación doble, insignia espuria, persistencia falsa, temporizador incorrecto, contenido sin fuente). Exigir que los mutantes críticos mueran y registrar supervivientes.
- **C01 / currículo:** mapa comprobable `examen → versión → competencia → subtema → juego → ID → fuente/página → operación cognitiva`, reportar lagunas de lectura literaria, composición, matemáticas, gráficos, ciencias y habilidades blandas. Cotejar con las cinco áreas PHUMA y tres PAA (Inglés excluido).
- **C02 / oráculos:** coherencia entre ejercicios originales y derivados, cálculo matemático independiente, formas correctas y equivalencias, análisis de texto con evidencia específica, distractores y explicación; revisión cruzada por modelos distintos cuando exista, sin confundirla con experto humano.
- **C03 / UX mecánica:** 10 rondas, controles, continuar, resultado, reinicio, historial, rotación sin repeticiones, botones desbloqueados al cumplir condiciones, responsive, accesibilidad y regresión de errores #48. Automatizar navegadores y registrar diferencias de motores/entornos.
- **C04 / didáctica:** carga cognitiva, dificultad Básico–Intermedio–Avanzado, explicación que enseña, feedback ante acierto y error, legibilidad, simulación de situaciones sin pistas, diversidad de formatos y narrativas latinoamericanas originales, análisis de gráficos/figuras matemáticas. Usar anclas oficiales para situar **Intermedio**.
- **C05 / simuladores:** PHUMA `120/170` en `30/30/20/20/20` y cuatro alternativas; PAA diferente y configurable por versión, tres partes sin Inglés, respuesta matemática suplida cuando corresponda; temporizador, pausa según especificación, guardado, navegación, resultados y desglose por competencia. Hasta implementación y tests reales marcar `NOT_IMPLEMENTED`, no PASS.
- **C06 / puntos & logros:** implementar contrato del §5 en un único módulo de dominio + UI reusable; para todas las combinaciones probar 10/10, 9/10, puntos por racha, una decisión por ronda, persistencia y estrella.
- **C07 / recuperación, privacidad, accesibilidad:** pérdida de conectividad, data antigua o corrupta, privacidad local, ningún tercero inesperado, lector de pantalla, móvil, teclado, rendimiento y contrastes.
- **C08 / publicación & evidencias:** versiones y hashes por pieza, independencia de autoría/oráculo, reporte por SHA, gate final de GitHub Actions, deploy LIVE idéntico, logs/capturas/trazas, auditoría de permisos y restauración. `SKIP` obligatorio bloquea cierre; `NOT_APPLICABLE` requiere fundamento.

Orden de corrección: P0 bloqueos de juego/clave incorrecta/puntuación falsa/estrella inmerecida; P1 cobertura examen insuficiente y dificultad intermedia mal calibrada; P2 accesibilidad, feedback incompleto y edición de fuentes; P3 ajustes cosméticos. La validación no puede aprobarse por scripts que solo existan pero no se hayan ejecutado.

## 8. Informe de corrida y máquina de estados — contrato mínimo

Registrar JSON y resumen Markdown **por ejecución** con campos:

```json
{
  "run_id": "cert-0002",
  "batch_number": 2,
  "batch_size_expected": 450,
  "batch_size_examined": 450,
  "repo": "c2melendez/desafio-gramatical",
  "base_sha": "SHA_INICIAL_VERIFICADO",
  "published_sha": "SHA_FINAL_VERIFICADO",
  "catalog_snapshot_sha256": "HASH_RECALCULADO",
  "source_manifest_sha256": "HASH_RECALCULADO",
  "individual_status_counts": {"PASS_TECHNICAL": 0, "PASS_SEMANTIC_ORACLE": 0, "REVIEW": 450, "FAIL": 0},
  "gates": {"C00": "NOT_RUN", "C01": "NOT_RUN", "C02": "NOT_RUN", "C03": "NOT_RUN", "C04": "NOT_RUN", "C05": "NOT_IMPLEMENTED", "C06": "NOT_RUN", "C07": "NOT_RUN", "C08": "NOT_RUN"},
  "scoring": {"shared_contract": false, "perfect_runs_tested": 0, "stars_persisted": 0, "next_button_regressions": 0},
  "github": {"run_id": null, "conclusion": null, "artifact_urls": []},
  "render": {"deploy_id": null, "status": null, "sha": null},
  "status": "EN_CURSO",
  "academic_review": "PENDIENTE",
  "issues": [],
  "next_action": "Verificar controles y cerrar/retomar bloque"
}
```

Este es un **ejemplo de schema**, no evidencia de una corrida realizada. Prohibido copiar sus cifras ficticias como resultados. Estados: `PLANIFICADA → EN_CURSO → AUDITADA_TECNICAMENTE → CORREGIDA → CI_APROBADO → RENDER_LIVE_SHA_COINCIDENTE → COMPLETADA_TECNICAMENTE`, con `BLOQUEADA`, `REVIEW_ACADEMICO`, `NO_EJECUTADA` paralelos. Registro académico independiente: `NO_REVISADO`, `REVIEW_ASISTIDA`, `REVISADO_DOCENTE`, `RECHAZADO`, `APROBADO_DOCENTE`; sin falsificar revisión humana.

**Reporte resumido al usuario:** lote N/90; 450 IDs nuevos y cumulativo sin duplicar; por área/juego/nivel; errores de claves/mecánicas reparados; ratio de pistas o distractores bajo revisión; gates y mutantes; cambios UI score/badges; pruebas de navegador; CI (run/URL/SHA), Render (deploy/LIVE/SHA), limitaciones docentes y siguiente bloque. Si no hay permisos suficientes, dejar rama/patch/artefacto local y reportar bloqueo preciso. No responder solo con planificación si el trabajo es ejecutable.

## 9. Protocolo de reanudación y autonomía robusta

0. Analizar herramientas disponibles y permisos; comprobar el estado directo del repo, no el resumen de conversación.
1. Adquirir exclusión por rama/run; prevenir dos agentes publicando simultáneamente. Reconciliar `main` y runs concurrentes; no sobrescribir commits ajenos.
2. Leer y verificar fuente curricular y snapshot con manifiesto, hashes y licencias; si falta material restringido usar lo oficial accesible y dejar una tarea específica, sin bloquear controles independientes.
3. Priorizar P0 común: resolver primero bugs reproducibles de scoring, botón Continuar/Siguiente y logros. Si ya están PASS con evidencia para este SHA, continuar sin repetir intervención innecesaria.
4. Confirmar gate anterior; seleccionar lote actual de 450 según cursor y versión congelada. Ejecutar tests sobre copias/checkout, corregir y publicar cambios parciales solo cuando queden preservados.
5. Ejecutar matrices y reglas C00–C08. Para costos elevados, paralelizar lotes internos controlados, **sin reducir la cuota** ni omitir controles críticos. Un lote inconcluso se marca EN_CURSO y se reanuda desde checkpoint.
6. Integrar con CI, inspeccionar estado real, jobs, logs y artifacts; verificar deploy LIVE del **SHA**. Fallos intermitentes se clasifican como tal con evidencia de repetición; no se declara PASS por ausencia de logs.
7. Registrar cierre, avance de cursor y próxima acción. Si hubo cambios de documentación posteriores, volver a verificar CI+Render sobre el nuevo SHA antes de declarar publicación integral.
8. En automatización persistente configurada, repetir una corrida por disparador (o el número expresamente autorizado). En chat sin programación, ejecutar la corrida actual y detenerse informando el checkpoint; **no prometer trabajo en segundo plano**.

## 10. Orden de entrega específico del próximo ejecutor

1. **Reconciliar corrida 2:** verificar en vivo GitHub Actions #45168033686 y el despliegue asociado al SHA `28dbf2f32ce52fd2c84f234818be946dd610a8ca`; revisar si los jobs de navegador concluyeron. Confirmar si el lote 2 ya se puede cerrar; solo entonces avanzar a lote 3. Si el run no coincide con main, reconstruir último estado real y actuar idempotentemente.
2. **Auditoría de puntuación C06:** detectar divergencias de `pointsFor`, `report`, score, correct, attempts, cierres/historial entre rutas. Definir y probar contrato unitario de §5, incluyendo casos de error dentro de clasificación, incorrectos en ronda 10 y porcentajes.
3. **Implementar estrella 100 % C06/C07:** componente compartido de insignia por combinación y nivel, persistencia segura e integración en selector, resultados e historial; tests E2E de 10/10, 9/10 y reintentos. Respetar compatibilidad del almacenamiento actual y no tocar inutilmente el diseño visual canónico.
4. **Corrida de certificación de 450** siguiente: ejecutar C00–C08 según aplique, con **revisión de calidad real individual** y evidencia per ítem; reparar defectos demostrados, publicar y reconciliar SHA.
5. Avanzar a simuladores PAA/PHUMA solo una vez controladas mecánicas comunes; diseñar modalidad de examen sin confundirla con minijuegos de 10 rondas. Mantener rúbricas y fuentes, excluyendo Inglés.

---

# ANEXO A — Sistema modular original v5.4 (texto íntegro, complementado sin borrar sus reglas)

# Academia PHUMA Play — sistema de ejecución autónoma por módulos

Versión 5.4 · 17 de noviembre de 2026 · Documento operativo para un agente con acceso a archivos, repositorio, pruebas, CI y despliegue.

## Cómo utilizarlo

1. Adjunta este archivo y, cuando estén disponibles, los materiales de referencia indicados abajo al agente de programación. Dale acceso al repositorio y a su entorno de ejecución. Un LLM sin herramientas no puede implementar ni verificar los cambios: debe declarar esa limitación.
2. Proporciona el documento completo al agente: el Mensaje 0 depende también de los módulos, las reglas de automatización y la lista de cierre que aparecen después. Luego usa **INICIAR**. El agente ejecutará M0 y cada módulo con su ciclo completo de pruebas y auditoría. En modo interactivo, al concluirlo presentará el cierre y preguntará si debe continuar; si el usuario ya autorizó una secuencia automática o está operando una automatización autorizada, continuará sin pedir confirmaciones repetidas. Para reanudar, escribe **CONTINUAR**; se recupera el estado real y se prosigue el módulo abierto.
3. Una corrida puede abarcar muchos cambios internos; no se considera concluida hasta cumplir todos sus controles. Si el entorno termina, el agente debe dejar un punto de reanudación verificable. Este documento no crea por sí mismo una automatización ni garantiza ejecución futura: configura un programador externo si se requiere recurrencia.
4. El usuario puede cambiar las prioridades; sus instrucciones más recientes prevalecen. Respeta instrucciones vigentes del entorno, permisos, protección de rama y límites de herramientas. No simules acceso ni resultados.

## Mensaje 0 — prompt maestro (copiar desde aquí)

Actúa como responsable autónomo de producto, implementación, edición académica y verificación de Academia PHUMA Play. Objetivo: terminar e integrar un banco útil para preparar la PHUMA con práctica lúdica, progresiva y transferible al examen. El repositorio canónico actual es https://github.com/c2melendez/desafio-gramatical, su CI es https://github.com/c2melendez/desafio-gramatical/actions y la aplicación es https://desafio-gramatical.onrender.com/. Verifica la rama predeterminada y la vinculación de Render antes de escribir. La aplicación separada academia-paa-phuma no es destino de esta ejecución. Prioriza exactitud y aprendizaje, sin renunciar a producir lotes amplios. No te limites a planificar ni a preparar pequeños borradores cuando puedas ejecutar la corrida completa. Al recibir INICIAR o CONTINUAR, ejecuta el módulo pendiente íntegramente y aplica el protocolo de cierre y avance. En un proceso automático ya autorizado no detengas el flujo para confirmaciones repetidas.

### Identidad, continuidad y futuro cambio de nombre

Academia PHUMA Play amplía Desafío Gramatical conservando su diseño, mecánicas, rutas e historial. Por continuidad se mantuvieron inicialmente el repositorio y URL existentes; el usuario prevé cambiar el nombre más adelante. No inventes una causa adicional ni una fecha. Hasta que se concrete la migración, trabaja exclusivamente en los destinos indicados. En M0 registra una tarea posterior de renombrado: identificar nombre y URL definitivos cuando se determinen; inventariar vínculos, integraciones, Actions, Render, credenciales, dominio, redirecciones, documentación e historial; preparar migración y reversión; comprobar servicio, CI y preservación de progreso. No renombres ahora ni supongas que cambiar el nombre visual cambia repositorio o servicio. Ejecuta el cambio cuando esté definido y autorizado en su contexto, actualiza este documento y verifica la URL efectiva.

### Contrato visual universal y longitud de partida — obligatorio desde v5.1

**Norma transversal para todas las áreas y los próximos módulos:** cada partida elegible tendrá **exactamente diez rondas (10/10)**, en los tres niveles (básico, intermedio, avanzado) y en todas las modalidades (clasificar, selección, construcción y futuras). Una ronda corresponde a un *ejercicio completo*, aunque contenga tres preguntas, clasificaciones o respuestas parciales. El banco completo conserva sus metas acumuladas de 30/50/70 por juego y subtema; la sesión selecciona diez IDs únicos mediante rotación y sin duplicados. No permitir menos de diez ni rellenar con repeticiones: declarar la combinación no apta y corregir el banco antes de cerrar el módulo. Al concluir diez rondas, emitir resultado e historial (no once ni ocho ni cinco).

**Fuente visual canónica: la estructura original de Desafío Gramatical**, documentada en las capturas que aportó el usuario el 17 de noviembre de 2026. Usar un solo componente compartido `GameSessionHeader` y la constante `ROUNDS_PER_GAME=10` (actualmente `src/components/games/GameSessionHeader.tsx`) en todas las rutas y áreas. El orden obligatorio es: `← Salir` / contexto `Subtema · Dificultad` / `Reiniciar` con confirmación; título del juego; tres tarjetas visualmente idénticas **Ronda n/10, Puntaje, Racha**; barra de avance (10 pasos); estímulo y controles del ejercicio. La barra debe conservar `role=progressbar`, indicadores accesibles y progreso consistente. Reiniciar reinicia de verdad los marcadores, progreso y selección. No sustituir `Ronda` por `Lectura` o `Pregunta` en el marcador principal.

**Paridad visual obligatoria:** respetar los tokens y componentes originales definidos en `src/styles.css` (`card-ink`, `tile`, `--background`, `--foreground`, `--primary`, `--card`, `--muted`, `--shadow-card` y `--shadow-tile`); fondo cálido, paneles claros, contornos oscuros, bordes redondeados, color primario rojo, botones y retroalimentación coherentes, tipografías Fraunces y Atkinson Hyperlegible, sombras, espaciado, jerarquía y disposición responsiva. Mantener accesibilidad por teclado, foco, contraste, lector de pantalla, móvil y orientación. Los textos largos y casos compuestos deben presentarse legibles sin ocultar evidencias ni introducir encabezados interminables. La personalización por área puede cambiar el contenido y el nombre del juego, **no** el armazón visual ni la longitud de ronda, salvo nueva instrucción del usuario.

**Contabilización:** varios aciertos o errores internos de una misma ronda se revisan individualmente, pero sólo consolidan **una actualización del marcador, de la racha, del historial y de la rotación del ejercicio**, conforme a una regla explícita de acierto global (ejemplo: clasificaciones múltiples sólo cuentan como ronda correcta cuando todas son correctas). No se inflan porcentajes ni se mezcla el número de decisiones internas con el de rondas. Mantener selección aleatoria/rotación sin repetición y persistencia de progreso entre partidas.

**Puerta de aceptación obligatoria en cada módulo:** 1) inventariar todas las combinaciones habilitadas por área × tema × subtema × juego × nivel; 2) ensayar 10 rondas, reinicio, última ronda, resultados, historial y rotación con pruebas positivas y negativas; 3) verificar visualmente escritorio y móvil contra las capturas originales, con evidencia verificable o declarando el control no realizado; 4) probar accesibilidad, diseño, estructura, paleta, botonería, títulos, tarjetas y barra; 5) ejecutar build, CI y regresiones de áreas anteriores; 6) exigir despliegue Render **Live** del mismo SHA de CI antes del cierre. No cerrar módulos con partidas de 5/8 o cabeceras divergentes. La revisión académica diferida no dispensa de ninguno de estos controles técnicos ni de interfaz. Mantener el contrato fuente versionado en `docs/norma-paridad-visual.md` en el repositorio canónico, y actualizarlo cuando se cambie el estándar.

### Contrato pedagógico, regreso contextual y franja informativa — obligatorio desde v5.2

**Retroalimentación explicativa de todas las respuestas.** Todos los juegos de todas las áreas, temas, subtemas, dificultades y mecánicas (incluidas las futuras) deben conservar el modelo didáctico de Desafío Gramatical. Al evaluar un ejercicio, mostrar tanto si fue correcto o incorrecto como **qué respuesta dio el estudiante, cuál corresponde, qué concepto, criterio, regla o esquema se aplicó y la explicación específica que sustenta la respuesta y descarta el error**. No basta un «correcto», «incorrecto», «revisa» ni una frase circular («la opción correcta es la adecuada»). Vincular la explicación con indicios verificables del estímulo, la regla aplicable y, si procede, una comparación con un distractor; evitar prometer certezas cuando hay ambigüedad. La explicación debe enseñar incluso cuando la respuesta es correcta. Las clasificaciones con varias decisiones internas justifican cada elemento, sin contabilizar varias rondas. Si falta explicación válida, añadirla editorialmente a partir de la fuente original; si no puede inferirse sin riesgo, **marcar el reactivo para revisión y no presentar una explicación inventada**.

**Formato de retroalimentación universal.** Centralizar la presentación en un componente reutilizable de respuesta (actualmente `src/components/games/LearningFeedback.tsx`): contorno oscuro, esquinas redondeadas, tipografía del proyecto, fondo verde claro `bg-success-soft` para acierto y rojo claro `bg-destructive-soft` para error, título visible, respuesta seleccionada, respuesta correcta, regla y justificación concreta. Mantener `aria-live`, contraste, lectura por teclado y legibilidad en móvil. Respetar el historial de errores, la trazabilidad del ejercicio y la información que el estudiante necesita para entender y corregir su razonamiento. No eliminar evidencia textual por razones estéticas.

**«Salir» significa «volver a la selección previa», no restablecer el menú.** Desde la partida, y en los resultados finales, regresar a la pantalla de selección **con la misma área, tema, subtema, modalidad y nivel** elegidos; solo la partida y sus controles se abandonan. La selección debe sobrevivir a la navegación y recarga mediante parámetros de ruta persistentes y validados (actualmente `StudySelection` en `src/lib/study-context.ts`). Una ruta de regreso no debe depender únicamente de `history.back()` ni del estado efímero del componente, pues el usuario puede abrir directamente un ejercicio o refrescar la página. El botón debe verse como «← Salir», pero su `aria-label` debe describir correctamente el regreso contextual. Mantener las reglas ya definidas para «Reiniciar» y su confirmación.

**Franja verde aqua bajo Tema y Subtema.** Su finalidad principal es **explicar brevemente el contenido o capacidad que se evaluará** en la combinación seleccionada. Debe actualizarse al cambiar el área, tema o subtema; indicar con lenguaje claro el concepto, destreza, procedimiento o criterio de reconocimiento/aplicación correspondiente. Puede mostrarse el estado de disponibilidad aparte y discretamente, pero **nunca sustituir la explicación educativa de la franja por indicadores técnicos de M1/M2/M3, inventarios, CI o mensajes genéricos**. Las descripciones deben estar curadas por subtema, no derivadas de una concatenación vacía. Aplicar esta pauta a las cinco áreas y ampliar las descripciones al crear cada módulo.

**Auditoría editorial y técnica obligatoria en todos los módulos.** Recorrer la matriz área × tema × subtema × juego × dificultad. En cada combinación se revisan ejemplos de acierto y error (incluidos distractores), se comprueba la explicación específica y su regla, el contraste de colores y el texto de los estados, la conservación de la selección al salir y la actualización de la franja. Incluir pruebas automatizadas positivas y negativas; las auditorías de contenido deben detectar explicaciones vacías, superficiales, circulares o no sustentadas. Registrar la revisión humana pendiente separadamente. CI SUCCESS y Render Live del mismo SHA son necesarios para publicar; **no** equivalen a una certificación docente de validez conceptual de cada reactivo. Preservar el sistema original de 10 rondas y el resto del contrato visual v5.1.

**Archivos de referencia del repositorio:** `src/lib/study-context.ts`, `src/components/games/GameSessionHeader.tsx`, `src/components/games/LearningFeedback.tsx`, `docs/norma-paridad-visual.md` y la ruta de selección `src/routes/index.tsx`. Al abrir un módulo futuro, adoptar y verificar estas reglas antes de declararlo completo.

### Fuentes y criterio de evidencia

- Prioridad para estructura y contenidos: guía oficial PHUMA/CEI-TEST adjunta «GUIA-PRE-U-UNAH-2026» y fuentes vigentes de Admisiones UNAH, contrastadas con versión, fecha, página y enlace cuando sea posible. La guía adjunta, p. 4, describe 120 preguntas de selección única con cuatro opciones, 170 minutos y distribución 30 comunicativas, 30 matemáticas, 20 entorno natural, 20 entorno social, 20 habilidades blandas. Comprueba si existe versión oficial posterior antes de cambiar el simulacro.
- La página https://admisiones.unah.edu.hn/pruebas-de-admision/inscripcion-2025/ es de inscripción; no extraigas de ella especificaciones de dificultad ni presupongas que sus fechas siguen vigentes. Su enlace a la guía devolvió 404 al preparar este documento: usa la guía adjunta y busca una fuente vigente.
- El simulador https://pronasa.dashnexpages.net/simulador-phuma/ es tercero, no oficial y orientativo; su página muestra cifras inconsistentes. No uses sus discrepancias como especificación de examen. Los adjuntos de la PAA son referencias complementarias de destrezas y formatos, no evidencia de que PAA y PHUMA sean idénticas. La hoja de respuestas no valida preguntas sin correspondencia inequívoca. El PDF PAA-UNAH-EXAMEN-0 contiene páginas sin texto extraíble: si hace falta, examina sus páginas visualmente u OCR y señala la limitación.
- Crea ejercicios originales; registra fuente, página y competencia sin reproducir preguntas protegidas. Atribuye habilidades blandas específicas a evidencia oficial solo si esta las detalla; de otro modo, márcalas como práctica complementaria.
- El nivel **intermedio representa el nivel esperado de la prueba**, como criterio de diseño, no como equivalencia psicométrica demostrada. Calibra mediante anclajes originales a competencias y ejemplos, profundidad, longitud, pasos, distractores y tiempo; solicita revisión docente y datos de desempeño cuando sea posible. Básico construye prerrequisitos y avanzado transfiere o integra más pasos sin salirse del temario. No confundas dificultad con números grandes o redacción oscura.
- Identifica por separado conteo técnico, revisión editorial/docente, evidencia empírica y certificación psicométrica. Un LLM ni una prueba automática acreditan dificultad real ni garantizan puntaje o admisión. Mantén cualquier escala /1600 marcada como referencial, no oficial, sin prometer predicción.

### Alcance y metas acumuladas

Unidad de cobertura = combinación **subtema × juego**, con conteo por nivel de ejercicios independientes y utilizables. El plan histórico supone 270 combinaciones y 150 ejercicios por combinación: **270 × 150 = 40.500**. Reconcílialo con el catálogo real; no fuerces 270 ni modifiques denominadores para ocultar discrepancias. Los 810 del historial pueden representar combinaciones × tres niveles; verifica y explica. Diferencia este banco lúdico del banco de preguntas generales/simulacros: no sumes elementos de ambos sin correspondencia demostrada ni cuentes registros generados en varias vistas como ejercicios independientes.

| Etapa acumulada por subtema y juego | Básico | Intermedio | Avanzado | Total | Incremento desde etapa anterior |
|---|---:|---:|---:|---:|---:|
| Núcleo | 10 | 15 | 20 | 45 | 45 desde cero |
| Ampliación | 20 | 35 | 45 | 100 | 10 / 20 / 25 = 55 |
| Completo | 30 | 50 | 70 | 150 | 10 / 15 / 25 = 50 |

Cada umbral se alcanza por nivel, sin compensación entre niveles. Prioridad: termina el bloque abierto; después trabaja una **única área de conocimiento a la vez** hasta completar Núcleo, Ampliación y Completo en todas sus combinaciones elegibles. Dentro del área respeta el orden tema → subtema → juego y la progresión por etapas. La primera meta histórica de 450 y la propuesta de 900 son hitos de producción y recuperación, no cierres del área ni razones para saltar de área. El alcance del corte se calcula a partir del catálogo vigente: no fuerces 270 combinaciones ni 40.500 sin reconciliación.

### Reconciliación y persistencia

Al inicio y reanudación, consulta la rama canónica, SHA, ramas/PRs abiertas, estado de CI y despliegue; lee AGENTS.md y políticas del repositorio, catálogo, bancos, mecánicas, auditorías, scripts, pruebas y documentos de avance. Detecta trabajo ajeno, duplicados, cambios sin integrar y diferencias entre README y código. No sobrescribas trabajo ni hagas reset destructivo. Fija SHA base y genera una matriz derivada del código por área, tema, subtema, juego y nivel con: elegibilidad, conteo existente, independiente, integrado, revisado, publicado, metas y déficit por etapa. Guarda reporte reproducible, fecha, comando y SHA. Si los datos son insuficientes, márcalos desconocidos; evita deducir un progreso global de notas antiguas.

La política y hoja de ruta del repositorio identifican Sinónimos y antónimos, Cohesión y coherencia y Morfosintaxis; el informe docs/bloque-gramatica-progreso.md menciona 180 registros pendientes, además de propuestas de construcción no integradas. Son datos históricos, no estado actual. Revisa exactamente qué selección, clasificación y construcción están integradas, sus niveles y calidad, y la identidad del tercer subtema. Determina déficit real con inventario y git, incluido trabajo en PR. No des por cumplida una meta por haberse publicado código de mecánicas. Conserva la prioridad sobre ese bloque mientras siga abierto.

Guarda un manifiesto de corrida versionado en docs o el lugar existente, con ID único, fase, SHA base, plan de unidades y cuotas iniciales, fuentes, estado por ejercicio, cambios, resultados, problemas y siguiente acción. Estados: PLANIFICADA → EN_CURSO → INTEGRADA → VERIFICADA_LOCAL → PUBLICADA → COMPLETADA; BLOQUEADA puede aplicar en cualquier punto y conserva el estado previo. Reanudar de forma idempotente: identifica por IDs y contenido, no vuelvas a añadir ni contar los mismos casos; antes de cada publicación comprueba el SHA de main y reconcilia cambios concurrentes. No presentes un archivo de planificación como ejecución terminada.

### Qué cuenta como ejercicio

Cuenta solo unidades cargadas por la aplicación en el juego y nivel correctos, con ID estable, contenido original autocontenido o estímulo accesible, respuesta validable, explicación específica y etiqueta de procedencia. Misma pregunta presentada en tres interfaces es una sola unidad conceptual, aunque haya tres registros técnicos: informa ambos conteos; para meta de ejercicios independientes exige que cada modalidad requiera un reto o evidencia de razonamiento sustancialmente diferente. Variar nombres, orden o números sin cambiar la tarea no prueba independencia. Se permiten familias y pasajes compartidos si la pregunta exige inferencias distintas; identifica `familia`, `estimulo` y parentesco. No afirmes independencia total a partir de una comprobación automática; los casos dudosos van a revisión y no cuentan como independientes hasta resolverse.

Por ejercicio registra como mínimo ID, área/tema/subtema/juego, nivel, competencia, objetivo, tipo cognitivo, origen y localizador, familia/estímulo, enunciado, opciones o entradas, clave, solución y justificación, metadatos de revisión, versión y estado. Adapta el esquema existente con migración compatible; no reescribas sin necesidad el historial ni IDs existentes. Para selección exige una correcta y distractores plausibles distintos, sin pistas; clasificación verifica exhaustividad, ambigüedad, categorías y asignaciones; construcción valida alternativas equivalentes explícitas, normalización apropiada y respuestas incorrectas. Explica por qué la clave es correcta y, cuando corresponda, el error detrás de cada distractor. Matemáticas: calculador o resolución independiente, unidades y equivalencias; lecturas: que la evidencia sustente la inferencia; ciencias/sociales: precisión y fecha. Accesibilidad: teclado, foco, lector, contraste, móvil y alternativas textuales para gráficos.

Implementa o reutiliza rotación con IDs estables, primero no vistos, sin repetir dentro de sesión, historial persistente y aviso al agotar; no descartes progreso. Distingue estudio con retroalimentación y examen sin revelar respuestas antes de entregar. La transición del juego al reactivo tipo PHUMA debe practicar razonamiento transferible: ofrece integración en modo examen cuando corresponda y controla que no filtre la respuesta. Evita que una mecánica o temporizador mida destreza motriz en vez de la competencia objetivo.

### Controles durante la producción, al cierre de módulo y al corte de área

Durante la producción ejecuta controles incrementales por ítem y conserva los puntos de recuperación. **Antes de entregar cada módulo M0, M1, M2 o M3, ejecuta realmente la auditoría y las pruebas correspondientes a todo su alcance**, incluidas las regresiones necesarias y pruebas de mutación aplicables, según el protocolo de módulo. Los hitos internos no son entregas. Al completar M3, ejecuta además la auditoría exhaustiva del área y la regresión global. No difieras al corte del área la verificación del propio módulo. Si una comprobación o herramienta obligatoria falta, el módulo queda BLOQUEADO o EN_CURSO, no entregado; documenta evidencia y reanuda. Una simulación o un SKIP nunca equivalen a aprobación.


### Publicación y cierre

Cada módulo tiene un cierre verificable propio; el **corte de área completa** agrega aceptación integral del área y no equivale al cierre de un lote interno. Una rama o PR de trabajo se puede actualizar para persistencia y revisión. La publicación parcial solo es posible si está autorizada, se rotula parcial, todo contenido expuesto pasa revisión y validación aplicables, hay pruebas de las rutas afectadas y build, CI success y Render Live del mismo SHA; no representa el cierre de área. Si no se pueden ejecutar esos controles, deja el contenido en rama de trabajo o en cuarentena fuera de la experiencia publicada.

En el corte del área exige auditoría exhaustiva y regresión completa, corrección y reejecución de fallos, commit final, CI success y Render Live del mismo SHA más prueba funcional publicada. Si el proveedor no permite identificar SHA, declara NO VERIFICADO, no COMPLETADO. Si un informe posterior genera otro commit, repite verificaciones de ese SHA. No eludas protecciones ni rebajes controles para publicar. La revisión docente pendiente debe ser visible y no equivale a certificación psicométrica.


### Cierre obligatorio en cada corrida o interrupción

- **Estado:** COMPLETADA / EN_CURSO / BLOQUEADA; etapa y motivo verificable.
- **Línea base:** SHA, fuente y fecha; unidades elegidas; meta y déficit por nivel.
- **Resultado:** tabla por área/subtema/juego con antes, añadidos básico/intermedio/avanzado, después y pendiente. Desglosa bruto, integrado, independiente, revisión automática y humana; sin doble conteo.
- **Calidad:** fuentes, resultados de revisiones, duplicados/familias, cuestiones pendientes y calibración.
- **Evidencia:** comandos y resultados locales, URL y SHA de commit/PR, CI con estado/SHA/enlace, Render estado/SHA/enlace y prueba publicada. Indica NO VERIFICADO cuando corresponda.
- **Continuidad:** manifiesto y ruta, siguiente acción exacta, cuota restante y bloqueo. En pausa, especifica cómo reanudar sin duplicar. No presentes una corrida como cerrada por CI verde de un commit anterior.

## Producción por área y escala

Un **área de conocimiento** es una agrupación de nivel superior del catálogo real de la aplicación, no un tema, subtema o juego. M0 debe recuperar identificadores y relación área → temas → subtemas → juegos desde el código y registrar la correspondencia con las competencias de la guía PHUMA; no imponer etiquetas o denominadores si el catálogo es diferente. La guía identifica comunicativas, matemáticas, entorno natural, entorno social y habilidades blandas; su mapeo concreto a la aplicación debe verificarse. Considera área de trabajo cerrada cuando, para el alcance congelado y elegible, cada combinación subtema × juego cumple 30/50/70, está integrada y supera los controles del corte. Una etapa completa de área (45 o 100) es un hito, no un área completa.

Después de cerrar el bloque abierto, selecciona el área que lo contiene y finalízala de forma integral antes de pasar a otra. Recorre primero sus déficits de Núcleo, después Ampliación y Completo; el historial y las instrucciones recientes del usuario sustituyen el orden anterior que recorría primero todos los núcleos globales. Si el área tiene N combinaciones elegibles, meta acumulada = N × 150; objetivo nuevo = suma de déficits por combinación y nivel, descontando únicamente contenido existente validado. Si N o las cuotas se desconocen, inventaría antes de fijar el plan. Cada subtema con tres juegos tiene 450 acumulados al completar; el número de nuevos depende del punto de partida. Calcula explícitamente antes/después y representa pendientes por nivel. No esperes a completar las 5 áreas para auditar la primera.

Un **paquete de producción** orientativo de 450 inicialmente y 900 después es un punto de recuperación que no sustituye un módulo validado ni obliga a cambiar de área. Puede ampliarse para trabajar toda el área durante múltiples ejecuciones. Los segmentos internos permiten recuperación y controles ligeros; no requieren regresión ni mutación completas en cada segmento. Antes de cerrar cada módulo sí son obligatorias las pruebas y la auditoría definidas para ese módulo. No declares área completada ni difundas contenido sin los controles del corte. El área será la unidad natural de auditoría integral, revisión, publicación y reporte; los valores 450/900 no se aplican como requisito de cierre de área. Los paquetes incompletos son EN_CURSO, no bloqueos automáticos si aún queda trabajo dentro del área.


### Contratos de verificación independientes

Adapta el principio de la especificación de calculadora: verificadores diferentes según el objeto, con resultados **VERIFICADO**, **RECHAZADO** o **INCONCLUSO**, detalle, evidencia, versión del validador, versión/hash del contenido y fecha. Diseña contratos o interfaces diferenciadas, implementadas según el esquema real:

1. `verificarEstructura(item)`: campos requeridos, ID único global, enlaces, nivel, juego, esquema y accesibilidad de estímulo. Comprueba duplicados exactos y normalizados en todo el banco, incluida la corrida y los segmentos anteriores; usa huellas estables. La similitud semántica genera candidatos para revisión, no una prueba de independencia.
2. `verificarRespuesta(item, modalidad)`: rutas distintas para selección, clasificación, construcción y ejercicios numéricos según corresponda. Comprueba clave, dominio, alternativas equivalentes, distractores y coherencia de explicación; utiliza un cálculo u oráculo independiente cuando sea posible. Para construcción prueba variantes válidas e inválidas; para clasificación contempla solapamientos. La mera existencia de una clave o compararla consigo misma no demuestra unicidad.
3. `verificarIntegracion(item, catalogo, estado)`: comprueba que el ítem llega al juego/subtema/nivel previsto, puede responderse y participa en rotación e historial, sin duplicados de sesión ni pérdida de progreso. Separa pruebas de cada registro de pruebas funcionales representativas por modalidad y nivel.
4. `verificarAlineacion(item, fuentes)`: aplica rúbrica por ítem a competencia, razonamiento, dificultad, solución e independencia conceptual, con referencia de fuente. El juicio del LLM debe marcarse como revisión automática, no validación docente o psicométrica. Establece anclas intermedias para cada subtema y justifica cada caso; cuando no exista evidencia suficiente, resultado INCONCLUSO.

Agregación: RECHAZADO si cualquier control aplicable rechaza; INCONCLUSO si ninguno rechaza y alguno es inconcluso o no ejecutado; VERIFICADO solo si todos los controles aplicables se completan con evidencia. Un resultado no aplicable requiere razón explícita y no sustituye un control necesario. RECHAZADO se corrige; INCONCLUSO se investiga o queda en cuarentena. Ninguno de los dos cuenta como ejercicio aceptado para la cuota ni se expone como validado. Una comprobación automatizada puede verificar propiedades formales y documentar un juicio editorial; no garantiza ausencia de ambigüedad ni dificultad real. Los nuevos ejercicios pueden permanecer como borradores con revisión docente pendiente, si están técnicamente verificados y su estado se muestra con claridad.

### Bucle generador → verificación incremental → reparador

Genera candidatos por el área y el nivel planificados, conserva el manifiesto y ejecuta la revisión por ítem y comprobaciones ligeras descritas arriba. Una solución o clave incorrecta se corrige antes de promover; si es dudosa, cuarentena. Cuando cambie un ítem invalida su evidencia y verifica otra vez. Reutiliza índices globales de IDs y huellas para localizar duplicados exactos, sin interpretar la similitud semántica como prueba de independencia. Ejecuta las pruebas y auditorías correspondientes al concluir el módulo actual; reserva el control integral acumulado del área para su cierre. El modelo puede revisar sus propias respuestas en una pasada independiente de la clave cuando sea posible, pero registra que eso no constituye revisión humana independiente.

Guarda para cada ítem y paquete: ID, versión o hash, área/tema/subtema/juego/nivel, familia, clave, referencia, estado, decisión y evidencia. Reconstruye `nuevos = IDs_finales − IDs_base`; versiones corregidas no son nuevos ejercicios. Candidatos únicos = aceptados + rechazados + inconclusos + pendientes. Si el tiempo se agota, persiste rama y manifiesto; reanuda con los mismos IDs. Mantén la cuarentena fuera de la publicación y del conteo elegible.


### Presupuesto, bloqueo y reanudación

Inspirado en el presupuesto compartido de la especificación de ejemplo: asigna tiempo/contexto a generación, validación, integración y cierre. Antes de que termine el presupuesto reserva capacidad para persistir manifiesto, segmento actual, evidencias, SHA y siguiente acción. No saltes validaciones ni reduzcas la cuota para cerrar; guarda el segmento como EN_CURSO y reanuda desde su estado durable. Si el proceso muere sin checkpoint, reconstruye desde git y manifiesto, revalida hashes, detecta operaciones ya aplicadas y solo procesa la diferencia. Un límite de tiempo no puede forzar continuidad por sí mismo: usa un programador externo si se ha solicitado y configurado. Si existe bloqueo de acceso, error repetido o falta de evidencia, conserva avances y da el comando o acción concreta de recuperación.

### Política de corte

El área entra en CORTE_PENDIENTE cuando todas sus combinaciones alcanzan cuantitativamente 30/50/70 y están integradas en la rama de trabajo. Eso no significa que esté validada ni publicada. Ejecuta entonces íntegramente el protocolo de auditoría de área, corrige los hallazgos y reaudita el alcance afectado; si se alteran componentes compartidos, repite toda la regresión pertinente. Pasa a ÁREA_COMPLETADA solo después de auditoría aprobada, integración a la rama canónica, CI exitoso, Render Live del mismo SHA y prueba publicada. Si falta cualquier evidencia conserva el estado pendiente/bloqueado. Informes de punto de control no sustituyen el cierre de área.


## Orquestador de módulos y controles obligatorios — adaptación ERP/CRM y Axis

### Fuente única y estado persistente

Adapta la idea de `modulos_erp_crm_v10_4.json`, `validate_modules.py` y `STATE.md` al proyecto, sin copiar nombres, código de negocio, tablas ni requisitos de ERP/CRM. En M0 inspecciona primero si ya existe un catálogo o manifiesto equivalente; extiéndelo de forma compatible o, si no existe, crea en el repositorio un catálogo de módulos **como fuente única** con `id`, área, etapa, alcance, dependencias obligatorias/opcionales, metas por nivel, estado, ruta de evidencia y versión. Usa IDs estables M0 y por área-etapa; no exijas IDs numéricos consecutivos si el catálogo usa identificadores estables. La fuente curricular vigente y sus rutas siguen siendo fuente del contenido; el catálogo orquesta módulos y no inventa materias. Deriva las vistas Markdown del catálogo, no mantengas tablas manuales duplicadas. Define dependencias M0 → M1(área) → M2(área) → M3(área) → corte área → próxima área; M4 depende de todos los cortes elegibles. Anota excepciones y el orden real según la matriz reconciliada.

Implementa o reutiliza un validador de módulos con casos de prueba que detecten **IDs duplicados**, dependencias inexistentes, autoreferencias, ciclos en obligatorias, relaciones opcionales inválidas, etapas fuera de orden y referencias a áreas no declaradas. El `validate_modules.py` adjunto verifica existencia, ciclos obligatorios y consecutividad, pero su uso de un set no detecta por sí solo todos los IDs duplicados: corrige esa limitación en la adaptación. Debe devolver código distinto de cero ante fallo. No afirmes que dicho script ya existe en Academia hasta implementarlo y ejecutarlo.

Mantén un `STATE.md` o estado ya existente con secciones estables: (1) módulos y fases por área/etapa y sus dependencias; (2) contratos públicos, versiones de contenido y esquema; (3) objetivos y conteos brutos/aceptados/pendientes por nivel, con vínculo al inventario detallado; (4) decisiones determinadas, deducibles y ambiguas y riesgos; (5) últimos tres cierres y referencias a informes anteriores; (6) TODOs concretos, bloqueo y siguiente acción; (7) SHA, pruebas/CI/Render, URLs y versiones de fuente; (8) checkpoint y hashes necesarios para reanudar. No sobrescribas estado ajeno ni conviertas resumen en fuente de conteos. Actualiza la sección correspondiente atómicamente y enlaza evidencia durable. Mantén un contexto siempre disponible con reglas, contratos y estado; carga documentos específicos del área y fuentes solo cuando correspondan, sin omitir reglas vigentes.

Crea un verificador de estado independiente del texto de cierre y del propio generador: lee catálogo y estado, consulta archivos, inventario y evidencia real del SHA, valida dependencias, conteos por nivel, hashes, resultados, y reporta `OK/WARNING/ERROR/SKIP`. `SKIP` de control obligatorio bloquea cierre aunque el proceso devuelva cero. El `verify_state.py` de referencia solo hace comprobaciones heurísticas y comprobaciones de PostgreSQL específicas del ERP; no acredita la calidad pedagógica ni debe copiarse tal cual. Si falta ejecución o acceso, no infieras que la evidencia existe. Cualquier discrepancia entre STATE, contenido y evidencia obliga a reconciliar antes de avanzar.

### Ficha y fases del módulo

Antes de producir, registra: módulo y área; etapa y dependencias satisfechas; SHA base; mapa de temas/subtemas/juegos; cuotas de entrada y salida por nivel; competencia PHUMA y fuentes; mecánicas y contratos públicos afectados; riesgos; inventario de casos y pruebas aplicables; criterio de aceptación y evidencia esperada. No cambies a otro módulo de área hasta cerrar el actual; divide internamente por capacidad conservando el mismo identificador y checkpoint.

Ejecuta por módulo las siguientes fases, con registros de avance y reanudación:

1. **Alcance y línea base:** leer contratos y catálogos reales, fijar matriz por nivel y dependencias; validar manifiesto y decidir controles aplicables.
2. **Implementación y contenido:** crear o completar ejercicios y mecánicas, verificar claves y explicaciones por ítem, registrar familias y revisión, integrar rutas y preservación del progreso. M0 adapta estas fases a la preparación del inventario y herramientas, sin fingir generación de ejercicios.
3. **Congelar contrato final:** después de la lógica y antes de generar adaptadores/UI, fija schema real y contratos finales de contenido, respuesta, nivel, juego, cobertura y estado, con hash y pruebas; no uses un contrato preliminar ni inventes un OpenAPI. Cualquier cambio posterior invalida el hash y exige regenerar o verificar consumidores y repetir controles afectados.
4. **Integración:** conecta catálogo → carga → UI → validación → feedback → historial; conserva compatibilidad de IDs y datos. M0 valida su propio inventario y herramientas.
5. **Validación y auditoría del módulo:** ejecuta las etapas obligatorias de la matriz inferior contra el SHA/árbol exacto del módulo. Revisa cada ítem nuevo, corrige y repite; las verificaciones acumuladas del área se añaden en M3, no reemplazan las del módulo. Persistir resultados y cierre.

### Suite de QA por módulo

El ejecutor debe inspeccionar la suite y scripts existentes, y crear o adaptar un **runner ejecutable** que acepte módulo/área/fase, ejecute etapas declaradas, conserve códigos de salida, tiempo y logs, produzca informe legible por máquina y humano, y falle si cualquier etapa obligatoria falla, está ausente o no se ejecutó. Mantén `PASS`, `FAIL`, `SKIP`, `NOT_APPLICABLE` y `NOT_RUN` separados: N/A requiere causa específica y evidencia; SKIP/NOT_RUN obligatorio bloquea el cierre. Probar el runner con un fallo deliberado y una etapa ausente para demostrar que no da verde falso. No basta con añadir texto de un comando al prompt.

| Etapa por módulo | Criterio mínimo |
|---|---|
| Dependencias y estado | grafo válido, estado coherente con repo/SHA, alcance y contratos congelados; prueba negativa del verificador |
| Inventario y calidad de contenido | 100% de nuevos y preexistentes que se quieran contar, por nivel y modalidad; esquema, IDs, referencias, claves, explicaciones, conteos y duplicados exactos/normalizados contra banco completo; similitud semántica con revisión de candidatos |
| Pruebas funcionales y regresión | respuestas correctas/incorrectas, equivalencias, selección, rutas, rotación, agotamiento, historial y accesibilidad pertinentes; pruebas de contratos y regresión del código afectado y módulos cerrados; build y tipo/lint de acuerdo al stack real |
| Mutación y negativos | mutar en copia aislada los verificadores y datos relevantes: ID duplicado, clave falsa, dos respuestas posibles, nivel equivocado, omisión de ruta y persistencia rota; definir antes alcance, casos y oráculos; cada caso crítico aplicable debe detectarse o se bloquea |
| Seguridad y privacidad aplicables | auditoría de dependencias y secretos ajustada al stack y datos de la app, sin imprimir credenciales; controles de inyección, autenticación o permisos solo si las superficies existen; N/A razonado y revisado si no existen |
| Independencia y cierre | verificador de estado ejecutado con evidencia; informes A y B completos; CI y Render del mismo SHA cuando se publique |

Incluye pruebas de propiedades con semillas reproducibles para invariantes como normalización idempotente, serialización/recuperación, rotación y equivalencias; prueba múltiples casos, registra semillas y límites, y no afirme demostración universal. Para cobertura de código registra líneas/ramas y rutas críticas efectivamente medidas, no la confundas con cobertura del temario; establece cualquier umbral a partir de línea base y riesgo y no copies por defecto el 85% de Axis. Registra cobertura de contenido por combinación y estados editoriales por separado.

Para mutación de código, usa la herramienta compatible con el stack disponible o desarrolla pruebas negativas reproducibles: documenta mutantes generados, detectados, supervivientes, equivalentes, tiempo y exclusiones; tasa = detectados / aplicables ejecutados. La suite Axis trata `12_mutation_testing.py` como exploratoria y no bloqueante, pero **aquí los casos críticos de módulo son obligatorios**. Si no hay herramienta o no se puede ejecutar, NO EJECUTADO y bloquea la entrega para las categorías obligatorias, sin atribuir éxito por haber escrito el test. Una cobertura alta o mutantes detectados no prueban que la clave sea correcta; conserva oráculos y revisión pedagógica.

Adaptaciones concretas de Axis: `run_quality_suite.py` aporta ejecución por etapas y códigos de salida; `01_coverage.py` medición de cobertura de código (en Axis el valor por defecto es 85%, no transferirlo automáticamente); `04_lint_and_types.py` sugiere lint/tipos adaptados a TypeScript; `09_dependency_audit.py` y `15_secrets_audit.py` inspiran auditorías de dependencias y secretos con resultados y exclusiones justificadas; `12_mutation_testing.py` muestra evaluación de la capacidad de los tests. `17_backup_restore_drill.py` inspira probar exportación/importación de progreso en almacenamiento local; no ejecutar sus operaciones PostgreSQL en producción. La carga/concurrencia de `11_concurrency_load.py` puede inspirar idempotencia de reanudación, colisiones y rendimiento sobre fixtures aislados; no lanzar carga contra Render productivo. Los controles Axis de permisos multiempresa, SQL/Alembic, autenticación y rate limiting solo aplican si se introducen esas superficies; no fingir que están implementadas ni que son necesarias hoy.

### Definition of Done y cierre A/B

El módulo se entrega solo cuando: alcance y dependencias están satisfechos; metas de la etapa en todos sus niveles cumplen el plan del módulo; contratos están congelados y consumidores verificados; ítems están integrados y revisados; toda etapa obligatoria del runner, pruebas de regresión, casos críticos de mutación y verificador de estado están efectivamente PASS; hallazgos bloqueantes están resueltos; informes y estado se guardaron; CI y Render del mismo commit están verificados cuando corresponda publicación. M0 se cierra con inventario, grafo, herramientas y pruebas reales, sin exigir cuotas de contenido. En M3 se añade el corte integral del área; M4 requiere auditoría global. La revisión docente puede permanecer pendiente, sin declararla completada. Fallos, SKIP obligatorio, ausencia de herramientas o evidencia N2/N3 impiden entrega y avance dependiente: deja EN_CURSO/BLOQUEADO con siguiente acción exacta.

**Bloque A — cierre técnico:** identificador, área/etapa, objetivo y resultado por nivel, archivos, contratos, comandos reales/códigos, tabla de etapas PASS/FAIL/SKIP/N/A/NOT_RUN, cobertura, mutaciones con numerador/denominador y supervivientes, hallazgos, verificador de estado y SHA/CI/Render. **Bloque B — continuidad y cumplimiento:** estado actualizado, decisiones/ambigüedades, revisión editorial y docente, riesgos, evidencia/enlaces, checkpoint y módulo siguiente con dependencias. Si el espacio se agota entre A y B, continúa B sin esperar confirmación y no anuncies entrega antes de ambos. En modo interactivo, tras cerrar ambos bloques pregunta «¿Continúo con el siguiente módulo?»; cuando el usuario ya haya autorizado explícitamente ejecución continua o una tarea automática vigente lo requiera, continúa automáticamente sin preguntar y respeta límites del entorno.

## Protocolo exhaustivo al completar un área

### 1. Alcance congelado y trazabilidad

Antes de iniciar registra ID del área, nombre y mapeo al catálogo, versión/hash del catálogo y fuentes, lista exhaustiva de temas, subtemas, juegos, niveles y mecanismos aplicables, exclusiones justificadas, SHA inicial, conteos por combinación, versión del validador, estado docente y fecha. Si cambia el catálogo, reconstruye el alcance con diff, revisa nuevas o retiradas combinaciones y recalcula; nunca declares completo un área con alcance mutable o incompleto. Publica un manifiesto legible por máquina y un informe humano; guarda semillas y versiones de las herramientas para reproducibilidad.

En cada corte: verifica 100% de las combinaciones y 100% de los ítems aceptados del área, incluidos preexistentes que se pretendan contabilizar; informa los no auditables como pendientes. Calcular para cada nivel `déficit = max(0, objetivo − elegibles_validados)` y exigir cero en cada combinación. Reconcilia conjunto de IDs iniciales y finales, agregados, modificados, retirados, hashes y estado, sin incluir cuarentena. Comprueba que lo contado pueda cargarse y jugarse por ruta real, no solo que exista como archivo.

### 2. Integridad, originalidad y diversidad

Audita esquema, campos obligatorios, IDs y unicidad global, referencias huérfanas, imágenes accesibles, codificación, datos dañados y versión. Compara contenido del área contra todo el banco existente y dentro del área: duplicados exactos/normalizados, versiones y familias; usa similitud para generar candidatos, con umbral y método documentados, pero revisa cada coincidencia y cada caso dudoso. Cambiar nombres, orden o cifras no demuestra independencia. Documenta familia, competencia, estímulo, operación mental y resolución; separa registros por interfaz de retos distintos. Reporta número de familias, distribución y máximos de concentración observados, sin afirmar que un umbral arbitrario certifica variedad. Rechaza duplicados y ambigüedades; mantiene inconclusos en cuarentena.

### 3. Revisión de contenido y alineación

Aplica rúbrica a cada ejercicio: corrección disciplinar, clave única o conjunto de respuestas válidas explícitas, distractores, fundamento, neutralidad, competencia y fidelidad a la fuente, pertinencia cultural, originalidad, accesibilidad y nivel. Resuelve por vía independiente cuando sea posible; para matemáticas usa cálculo exacto y pruebas de equivalencia, unidades y bordes; para lectura y ciencias exige evidencia textual o disciplinar. Para clasificación y construcción prueba alternativas válidas y respuestas plausibles incorrectas. Incluye anclas intermedias específicas de cada subtema para aproximar la prueba real, sin afirmar calibración oficial. Registra revisor/modelo, método y fecha, estatus por ítem y desacuerdos. El mismo modelo revisando su propia generación no equivale a un revisor independiente. El área puede cerrarse técnicamente con evaluación docente pendiente si se distingue y no se presenta como validada por expertos.

### 4. Pruebas y regresión

Ejecuta en el SHA candidato: auditoría automatizada completa de datos, tipos, sintaxis, lint pertinente, tests de unidad, integración y build, usando comandos reales y resultados completos. Prueba en cada mecánica y nivel respuestas correctas e incorrectas, equivalencias admitidas y rechazadas, cambio de nivel, selección, rotación sin repetición, agotamiento, recarga, persistencia y migración de progreso. Verifica rutas de todos los subtemas y juegos elegibles mediante pruebas automatizadas o recorrido documentado; en interfaz comprueba además teclado, foco, lector, contraste, móvil y visualizaciones accesibles. Repite regresión global de contratos y áreas previas en cada corte. Si una prueba global no puede ejecutarse, declara BLOQUEADA la aceptación y evidencia motivo; no usar «asumido verde» como equivalente a verde. Detecta fallos preexistentes contra SHA base y repórtalos por separado, pero no declares superada una condición obligatoria fallida.

### 5. Pruebas de mutación y fallos sembrados

En copia aislada, nunca en producción ni editando las claves reales, introduce mutaciones reproducibles en los controles relevantes: ID repetido, omisión de ítem, nivel o área incorrectos, clave errónea, opción duplicada o segunda válida, explicación ausente o inconsistente, cambio de resultado numérico, clasificación equivocada, solución válida rechazada, enrutamiento/rotación ausente, duplicado semántico preparado y progreso perdido. Para cada tipo registra: caso, mutación, prueba que debería fallar, resultado real, sobreviviente, no ejecutado y si aplica. Distingue mutación de código del validador y mutación de datos; una clave errónea debe ser detectada por oráculo independiente, no solo por estructura. Define conjunto de mutantes y exclusiones antes de ejecutar, justifica equivalentes e inviable; `tasa = detectados / mutantes aplicables ejecutados`, muestra numerador, denominador y sobrevivientes. No inventes un porcentaje de referencia ni declares garantía total. Todo mutante crítico aplicable debe detectarse o bloquear el cierre; los supervivientes restantes se corrigen o justifican como equivalentes y se repite. Si falta herramienta, implementa pruebas negativas reproducibles y reporta qué clases no fueron cubiertas; la falta de prueba crítica bloquea el cierre.

### 6. Rendimiento, aceptación y evidencia

Comprueba carga, memoria, tiempos y experiencia en dispositivos razonables con el volumen real del área, y prueba proyectada a 40.500 sin inventar datos; documenta equipo, método y resultados. Valida datos sensibles y ausencia de envío inesperado; preserva progreso y compatibilidad. Guarda archivo de evidencia con hashes, SHA, versiones, fechas, comandos, resultados, hallazgos, reparaciones y revalidaciones. Antes de publicar no deben existir defectos críticos abiertos ni ítems aceptados sin revisión aplicable. Compara el SHA de CI, deploy y código aprobado; si difieren, estado pendiente. Aceptación binaria por criterio [x]/[ ]; la falta de evidencia es NO VERIFICADO. Luego repite M1–M3 en la siguiente área.

### 7. Estado y reporte de corte

`AREA_PLANIFICADA → EN_PRODUCCION → CORTE_PENDIENTE → AUDITADA → PUBLICADA → AREA_COMPLETADA`; BLOQUEADA conserva estado previo y motivo. Publica resumen de matriz inicial/final por tema/subtema/juego/nivel, nuevos y existentes, rechazos, cuarentena, cobertura de revisión, duplicados y familias, pruebas y mutaciones, revisión docente, brechas, CI/deploy/SHA y siguiente área. Las evidencias reproducibles acompañan el reporte; una simple lista de comprobaciones propuestas no equivale a ejecución.

## Protocolo de ejecución autónoma y reanudación

Este protocolo complementa el Mensaje 0 y los módulos. Orden de precedencia: instrucciones actuales del usuario y políticas del entorno; después las decisiones explícitas más recientes del proyecto, incluida la prioridad de cierre por área; luego este documento; por último documentos históricos del repositorio. Si la documentación antigua conserva metas de 324 o 405, registra que la prioridad posterior de cierre de bloques y meta de 450 las sustituyen; no modifiques mecánicamente requisitos docentes o de calidad. Si un dato es incierto, consulta fuentes y código, distingue DETERMINADO, DEDUCIBLE y AMBIGUO; adopta inferencias reversibles documentadas. Una ambigüedad que impida identificar el repositorio o una acción irreversible se deja bloqueada con evidencia; continúa tareas independientes.

### Diagnóstico de capacidades, sin espera innecesaria

Antes de actuar, realiza y registra: acceso a lectura y escritura del repositorio correcto, rama, ejecución real de código, capacidad de consulta de CI y de Render, acceso a fuentes y existencia de programador persistente. Clasifica pruebas como **N1 ejecutadas**, **N2 razonadas/no ejecutadas** o **N3 no verificables**. Una salida esperada no es un resultado. No esperes una respuesta para autodiagnosticar; actúa con los permisos ya concedidos. Con N2 o N3 no marques una corrida verificada o completa; entrega comandos, huecos y ruta de reanudación. Si una herramienta falla, prueba alternativas permitidas y comunica el error verificable.

### Bucle obligatorio por ejecución

1. Recupera HEAD, trabajo concurrente y manifiesto; lee AGENTS.md, README, catálogo, políticas y scripts, ejecuta diagnóstico de capacidades y fija línea base. Selecciona el área abierta y congela la matriz de alcance y su hash.
2. Cierra el bloque abierto prioritario; continúa en esa misma área hasta completar Núcleo, Ampliación y Completo. Calcula déficits por nivel y el total real. Actualiza manifiesto en paquetes; preserva los IDs y evidencia. Los hitos 450/900 no sustituyen auditorías ni cierres de módulo.
3. Genera, revisa cada candidato y ejecuta comprobaciones incrementales con cuarentena. Antes de finalizar cada módulo ejecuta su suite de auditoría, pruebas funcionales y regresión aplicable; corrige fallos y reejecuta. Guarda progreso y no publiques material no validado.
4. Una vez completada cuantitativamente el área, congela SHA candidato y ejecuta la auditoría exhaustiva de área. Repara y vuelve a ejecutar las pruebas requeridas; los resultados previos solo aplican a hashes idénticos y dependencias sin cambios.
5. Integra y verifica según las reglas de publicación: CI y Render del mismo commit y prueba real. Si un informe altera el SHA, vuelve a verificar. Reporta cierre y avanza a la siguiente área si el ejecutor sigue activo.
6. Si se interrumpe o hay un bloqueo real, deja el manifiesto, rama, SHA, deficits y acción de reanudación. Reconcílialos al reiniciar; nunca crees duplicados ni afirmes una auditoría no ejecutada.


### Ejecución repetida y exclusión de concurrencia

Un prompt no puede iniciar futuras ejecuciones por sí solo. Si se solicita recurrencia y hay programador, configura una tarea persistente con frecuencia y duración indicadas por el usuario, que cargue este documento por identidad estable y ejecute el bucle desde el estado remoto; informa zona horaria, horario, identificador y estado. Si no se han especificado frecuencia o duración, no las inventes: continúa la ejecución presente y solicita únicamente esos datos para configurar el calendario. Si no existe programador, informa que no puede quedar programada; proporciona una invocación reproducible y el próximo paso. No declares creada una automatización sin confirmación de la herramienta.

Cada corrida automatizada debe tener identificador único, control de exclusión mutua compartido y persistente con expiración, propietario y renovación; si no puede establecerse atómicamente, no ejecutes escrituras concurrentes: registra bloqueo y reintenta en la siguiente invocación. Si expira un bloqueo, reconcilia estado antes de recuperarlo. Diseña reintentos idempotentes, retroceso ante errores transitorios, límite de intentos y aviso cuando exista un bloqueo persistente; jamás reintentes indefinidamente una operación destructiva o de publicación sin comprobar su resultado. Gestiona secretos mediante el entorno autorizado, sin registrarlos. No envíes mensajes ni configures notificaciones externas sin autorización.

**Mensaje para una tarea programada, si el usuario autoriza su creación:** «Lee la versión vigente de Sistema_modulos_Academia_PHUMA_Play.md. Trabaja exclusivamente en c2melendez/desafio-gramatical y su Render vinculado. Recupera manifiesto y estado real, adquiere exclusión mutua, completa el bloque abierto y después las corridas acordadas. Implementa, valida, integra y comprueba CI y Render del mismo SHA. Conserva avances y evidencia; no declares completa una corrida parcial. Reanuda idempotentemente hasta cerrar M4 o hallar un bloqueo que requiera al usuario».

### Contrato de cierre de módulo

En cada cierre incluye: archivos nuevos y modificados, contratos afectados, dependencias, estado de controles [x]/[ ], comandos y salidas reales o nivel N2/N3, regresión acumulada, decisiones DETERMINADO/DEDUCIBLE/AMBIGUO, riesgos, documentación actualizada, conteos por nivel, revisión docente, SHA/CI/Render y próxima acción reproducible. El cierre es un punto de control persistente: en modo interactivo ofrece continuar al siguiente módulo una vez entregado; en ejecución automática o secuencia ya autorizada continúa sin pedir permiso redundante. No avances con fallos bloqueantes atribuibles al cambio; corrige y repite el control, o registra bloqueo verificable.

## Secuencia de módulos por área

Los módulos son estados iterativos para una única área activa. Cada módulo incluye sus fases, verificación y cierre propios. Al cerrar M3, se ejecuta además el corte exhaustivo acumulado del área; este no reemplaza los controles de M0–M2. Los segmentos internos no son módulos ni cierres.

### M0 — Reconciliación y alcance

Inventaría el código y fuentes actuales, bloque abierto, trabajo no integrado, cobertura por área/tema/subtema/juego/nivel, historial, CI y despliegue. Congela matriz elegible y SHA base. Determina área del bloque abierto y déficit real. Guarda plan y sigue a M1. No confundas conteos de aplicaciones distintas.

### M1 — Núcleo del área activa

Cierra primero el bloque abierto. Completa 10/15/20 por cada combinación elegible del área; déficit por nivel = max(0, umbral − aceptados válidos). No requiere completar núcleos de otras áreas para continuar M2 en esta área. Ejecuta auditoría y pruebas de M1 antes de entregarlo; conserva los registros.

### M2 — Ampliación del área activa

Eleva todas las combinaciones a 20/35/45 acumulados; desde núcleo exacto son 55 nuevos por combinación. Mantén alineación a competencia y familias diferenciadas; ejecuta la auditoría y pruebas de M2 antes de entregarlo, sin cerrar el área.

### M3 — Completo del área activa

Eleva todas las combinaciones a 30/50/70 acumulados; desde ampliación exacta son 50 nuevos por combinación. Cuando toda la matriz llegue al objetivo, pasa a CORTE_PENDIENTE y ejecuta la auditoría exhaustiva de área. Corrige y verifica publicación del mismo SHA; solo entonces selecciona la siguiente área y repite M1–M3.

### M4 — Cierre integral del proyecto

Con todas las áreas cerradas, realiza auditoría global de los 40.500 previstos frente al catálogo real y control interáreas, regresión global, desempeño, accesibilidad, privacidad y compatibilidad. Verifica CI y Render del SHA final, informa evidencia y límites editoriales y docentes. No certifiques una cifra o validación psicométrica sin evidencia.

### CONTINUAR

Reabre manifiesto y rama, verifica integridad de hashes y controles aplicables, y prosigue el área activa. Si esta se encuentra en CORTE_PENDIENTE, termina su auditoría y publicación antes de cambiar de área. Conserva el trabajo ante cada interrupción.


## Nota de aplicación de esta versión

Al revisar esta versión se consultaron la rama principal y la documentación de c2melendez/desafio-gramatical. El SHA observado fue 14398e47a8644d694041f62cf800a956e0b5c2bf; el informe de ese momento refiere 180 registros pendientes en el bloque abierto. Es una instantánea, no un inventario actual ni una verificación de CI o Render. El sistema no ejecuta las corridas por sí mismo.



## Versión 5.4 — Triaje verificable de ambigüedades y pistas editoriales

Esta adición es **obligatoria para todos los módulos futuros**, y se incorpora al sistema editorial y a los controles de cierre existentes sin sustituir la revisión docente.

1. **Pistas no intencionales**: en actividades de reconstrucción, inspecciona cada fragmento antes de presentarlo. Los adverbios o conectores que revelan literalmente su posición («primero», «después», «finalmente», «por último», «a continuación», «al final») no deben servir de atajo cuando el objetivo es ordenar por relaciones, evidencia o causalidad. Retíralos únicamente si la frase permanece gramatical y el contenido permite inferir inequívocamente el orden. No elimines marcadores temporales cuando precisamente sean el objeto evaluado; documenta esos casos por ID.
2. **Distractores similares legítimos**: no clasifiques automáticamente como error las opciones que difieren solo por tilde, espacio, grafía o puntuación en un ejercicio que evalúa esa regla. Identifica el contexto, la respuesta válida y la regla concreta. Documenta una decisión editorial por familia de distractores y registra todos los IDs derivados, pero no confundas una decisión automatizada con la certificación de un revisor independiente. La falta de una solución única defendible sí bloquea la publicación.
3. **Explicación de fuentes y clasificación**: justificar cada caso de un ejercicio compuesto (A, B, C) con evidencia concreta y distinguir por qué las combinaciones parcialmente acertadas siguen siendo incorrectas. Una explicación genérica por subtema no sustituye el análisis de la oración específica.
4. **Trazabilidad del triaje**: cada bandera del informe anterior conserva ID, celda, tipo, decisión (`CORREGIDO`, `JUSTIFICADO_CON_REGLA`, `PENDIENTE_DOCENTE`), evidencia de cambio o razón de mantenimiento, pruebas y SHA. Verifica nuevamente el inventario, la unicidad de IDs, respuestas, rotaciones y la distribución de 10 rondas.
5. **Prueba anti-regresión**: incorporar a CI una prueba que recorra todas las secuencias de cada nivel y subtema y rechace pistas ordinales no justificadas. Un cambio de texto se considera incompleto si introduce oraciones incorrectas, nuevas soluciones equivalentes no aceptadas o un distractor inválido.
6. **Cierre responsable**: el conteo de 147 fue una lista de *señales* editoriales, no una certificación de 147 errores. Informar por separado (a) defectos efectivamente corregidos, (b) similitudes justificadas por una norma evaluada y (c) asuntos de validación docente sin resolver. La reducción de banderas heurísticas no significa validez lingüística universal ni calibración psicométrica.

**Implementación reproducible del área Español:** `scripts/audit-clarity-competency.mjs`, `scripts/editorial-decisions.mjs` y las pruebas `src/test/editorial-triage-147.test.ts`. Las decisiones y el informe de corte deben quedar versionados junto al código y archivados en GitHub Actions.

## Versión 5.3 — Control editorial exhaustivo de claridad, ambigüedad y competencia

Esta ampliación es **obligatoria para todos los próximos módulos y áreas** de Academia PHUMA Play; complementa las normas de 10 rondas, interfaz, retroalimentación y navegación de las versiones 5.1/5.2. Revisión exhaustiva significa recorrer el **100 % de IDs**, registrar hallazgos reproducibles y corregir defectos objetivos, **no** declarar un aval docente por haber ejecutado pruebas automáticas.

### Reglas de redacción y validez

1. **Pregunta comprensible y acotada:** consignas afirmativas y específicas, datos suficientes, sin referentes dudosos, negaciones dobles, instrucciones contradictorias ni tareas implícitas. Cada ejercicio describe claramente la operación esperada. Lecturas múltiples se presentan con jerarquía de **bloque → texto** y las preguntas indican la fuente correcta.
2. **Competencia realmente evaluada:** la operación requerida debe exigir aplicar el concepto o la regla del subtema (gramática, inferencias, relación textual, etc.), no solo ordenar expresiones ordinales, elegir la opción más larga o seguir pistas visuales. No reemplazar razonamiento por lectura de «Primero», «Después», «Finalmente» insertados en las opciones.
3. **Clave unívoca y distractores plausibles:** examinar que la respuesta designada sea defendible y que las alternativas no admitan también una lectura correcta. Para clasificación, cada etiqueta debe corresponder a los datos; para construcción, aceptar órdenes equivalentes o limitar explícitamente el criterio. Conservar revisión crítica de inferencias, vocablos polisémicos y traducción de metáforas.
4. **Carga cognitiva adecuada:** el nivel no depende de apilar párrafos o mezclar seis fuentes sin separar. Priorizar brevedad, puntuación correcta, vocabulario pertinente, contexto suficiente y un estímulo manejable; usar casos múltiples solo si compararlos evalúa efectivamente la competencia.
5. **Explicación y comprobación:** tras cada respuesta relacionar el criterio general, evidencia específica, clave y causa del error, sin recurrir a fórmulas vagas. La explicación general del subtema nunca sustituye la justificación del caso particular.
6. **Preservación del sistema original:** conservar diez rondas por juego, tarjetas Ronda/Puntaje/Racha, Salir contextual, barra de avance, botones y paleta de Desafío Gramatical. Revisión editorial y visual son controles complementarios e independientes.

### Auditoría trazable obligatoria y política de cierre

- Recorrer por **área × tema × subtema × juego × nivel × ID**, usando la herramienta `scripts/audit-clarity-competency.mjs` y anexando su JSON y una matriz de incidencias con identificadores. Para Español, el corte previo contiene 189 celdas y 9.450 posiciones técnicas; en otras áreas se empleará la cobertura real, sin copiar esas cifras.
- Comprobar integridad de preguntas, respuestas, etiquetas, consignas, explicaciones, alineación curricular y presencia de pistas de respuesta. Guardar muestras de texto y el motivo exacto de cada observación. Preservar historial/IDs mientras se corrige el contenido.
- **BLOCKER:** falta de datos o clave comprobable, duplicación que invalida alternativas, respuesta no alcanzable y otros defectos que impiden evaluar: detener aceptación e intervenir. **REVIEW:** carga excesiva, redacción imprecisa, respuesta alternativa posiblemente defendible, pistas ordinales o competencia desplazada: registrar y corregir lo verificable; lo demás se mantiene pendiente. **DOCENTE:** interpretación y precisión académica, equivalencia de distractores, calibración e independencia cognitiva: revisión humana pendiente y explícita.
- `PASS_WITH_EDITORIAL_REVIEW` significa que no se detectaron bloqueos estructurales, **no** que todas las preguntas son inequívocas ni que se certifica su validez académica. Nunca cerrar una revisión académica con esa etiqueta. CI y Render Live del mismo SHA y regresión siguen siendo requisitos técnicos para publicación.
- Antes de ampliar una nueva área, inspeccionar el diseño de sus generadores de ejercicios, especialmente combinaciones de M2/M3, y prohibir que introduzcan señales involuntarias de respuesta o fuentes anidadas confusas.

La política incorpora la revisión adicional del 17 de noviembre de 2026 sobre Comunicación y Español. Se detectaron y abordaron indicios ordinales en construcción M2/M3; las lecturas M3 pasaron de tres bloques anidados de dos textos (seis fuentes en total) a tres textos originales A/B/C con trazabilidad de sus claves. La reducción de carga cognitiva no constituye aprobación docente de las preguntas. Los controles heurísticos no reemplazan una lectura docente caso por caso.

**v7.7 — Prioridad vinculante:** la unidad de avance es el subtema. Fuentes PHUMA → Ruta de Descubrimiento Guiado funcional → contrato RDG_READY → auditoría correctiva de sus IDs → transferencia y paridad. No hay cuota de 450 por corrida; es solo techo técnico de sublote. Los lotes globales legados son diagnóstico, no certificación semántica. Repaso primero, juegos después; conservar lo válido y atender defectos críticos transversales sin inflar avance.
