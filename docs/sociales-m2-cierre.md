# Ciencias Sociales M2 — ampliación acumulativa integral

**Estado: COMPLETADA TÉCNICAMENTE**, CI SUCCESS en main y Render LIVE del mismo SHA; revisión académica pendiente. Revisión académica e independencia conceptual pendientes por autorización.

## Base y cuotas
- Base M1: 2700 IDs técnicos, 20 subtemas × 3 juegos × 3 niveles = 180 celdas; 100 hechos originales curados (5 por subtema).
- Cuotas acumuladas por combinación subtema × juego: **20 Básico / 35 Intermedio / 45 Avanzado**, sin compensaciones.
- Nuevos M2: 600 Básicos, 1200 Intermedios, 1500 Avanzados = **3300**. Preexistentes M1: 600/900/1200 = **2700**. Acumulado M2: 1200/2100/2700 = **6000**.
- Nuevos IDs prefijados `social-m2-`; M1 preservado literalmente. Se conservan tres modos con tareas de clasificación triple, selección de cuatro opciones y construcción de dos decisiones, con 10 rondas sin repetición.
- La fuente de orientación es la guía PHUMA PRE-U UNAH 2026, página impresa 10, para competencias de entorno social; los subtemas ampliados del catálogo se identifican como práctica complementaria, no como enumeración oficial literal.

## Diseño y limitaciones
- `src/lib/social-m2.ts`: nuevos escenarios de observación, comparación A/B, revisión de generalizaciones, análisis de procesos y descarte de interpretaciones, con contraste de distractores y respuesta ligada a hecho base.
- Hay aproximadamente 100 anclajes base; por tanto, 6000 registros no equivalen a 6000 conceptos independientes. La variación por contexto y modalidad es técnica; independencia semántica, progresión cognitiva empírica y equivalencia de dificultad permanecen **NO CERTIFICADAS**.
- La explicación expone evidencia del caso, concepto asociado, propiedad correcta y por qué el contraste no aplica. El diseño preserva el estado `editorial-draft` y la etiqueta no oficial.
- Se conservan el historial, barra de progreso, cabecera común, ruta `/sociales`, retorno contextual y reinicio.

## Puertas y evidencia
- `scripts/audit-social-m2.mjs`: auditoría acumulada de los 6000 IDs, 180 celdas, quotas, M1 inalterado, claves, tres modalidades, evidencia y distractores, rotación de dos partidas de diez, y 900 mutaciones negativas.
- `src/test/social-m2-integration.test.ts`: regresiones e invariantes positivos y negativos.
- CI contiene auditoría obligatoria, matriz exportada `sociales-m2-integral`, tests, lint, build, M0 y regresiones previas. Render Live y CI deben compartir exactamente el SHA integrado.
- Inspección visual de móvil y escritorio sin navegador de pruebas: **NO EJECUTADA**; revisión docente autorizada como pendiente, no equivale a bloqueo de publicación técnica.
- Una vez verificadas la fusión y la publicación, siguiente módulo: `sociales-M3`, objetivo 30/50/70 por combinación.

## Evidencia de publicación — 20 noviembre 2026

- PR #41 fusionado: https://github.com/c2melendez/desafio-gramatical/pull/41, SHA `28d4dc775d7688e641164ac3e2c4f95035292ce1`.
- CI de PR **SUCCESS**: https://github.com/c2melendez/desafio-gramatical/actions/runs/44767293491.
- CI de main **SUCCESS**: https://github.com/c2melendez/desafio-gramatical/actions/runs/44767759487, mismo SHA `28d4dc775d7688e641164ac3e2c4f95035292ce1`.
- Render **LIVE**: `dep-dc06pq8ae00c73b0m070`, mismo SHA y URL https://desafio-gramatical.onrender.com/.
- Auditoría y regresión técnica M2 aprobadas para 6000 registros acumulados, 180 celdas y 900 mutantes negativos; M1 preservado. Las comprobaciones automatizadas y HTML no equivalen a inspección visual manual ni aval académico.
- Siguiente módulo operativo: **sociales-M3**, meta acumulada 30/50/70 por combinación, manteniendo la revisión académica de M1/M2 pendiente.
- El commit documental que registra esta evidencia tendrá nuevo SHA: requiere pasar de nuevo CI y Render del propio SHA para validar esta versión definitiva.
