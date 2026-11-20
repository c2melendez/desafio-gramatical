# Ciencias Sociales M2 — ampliación acumulativa integral

**Estado: EN_CURSO**, candidato de integración; requiere CI SUCCESS en main y Render LIVE del mismo SHA. Revisión académica e independencia conceptual pendientes por autorización.

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
