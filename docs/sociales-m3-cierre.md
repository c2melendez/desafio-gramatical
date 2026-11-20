# Ciencias Sociales M3 — corte técnico acumulado

**Estado: COMPLETADA TÉCNICAMENTE.** GitHub Actions SUCCESS en main y Render LIVE del mismo SHA. Revisión académica pendiente autorizada. La revisión docente, histórica, editorial y psicométrica queda **PENDIENTE AUTORIZADA**.

## Alcance entregado

- Repositorio canónico: `c2melendez/desafio-gramatical`. Base M2 certificada: `1eef5b22fd921c3e8e538964a23284db15b0a726`.
- 20 subtemas de Ciencias Sociales, 3 modalidades y 3 niveles: **180 celdas**.
- Meta completa **30 básicos / 50 intermedios / 70 avanzados** por subtema y juego; 60 combinaciones × 150 = **9000 registros técnicos**.
- Registros M1/M2 conservados: 6000; nuevos en M3: 3000 (600 básicos, 900 intermedios, 1500 avanzados). Acumulados: 1800 básicos, 3000 intermedios, 4200 avanzados.
- Fuente temática: `GUIA-PRE-U-UNAH-2026.pdf`, página impresa 10, entorno social. Subtemas ampliados del catálogo etiquetados como práctica complementaria; no se adjudica autoría oficial a las preguntas.

## Implementación y verificadores

- `src/lib/social-m3.ts`: nueva capa `social-m3-*` aditiva, con situaciones contrastivas, evaluación de explicaciones y rechazo de atribuciones sin evidencia. Conserva las propiedades de los anclajes y explicaciones fundadas en la observación.
- `/sociales` usa el acumulado M3, comparte cabecera y retroalimentación, sesiones de exactamente diez rondas, retorno contextual, reinicio e historial.
- `scripts/audit-social-m3.mjs`: audita 180 celdas, claves, oráculos, explicaciones, procedencia, IDs, preservación literal M1/M2, rotación de dos sesiones de 10 rondas y 900 mutaciones negativas de errores críticos.
- `src/test/social-m3-integration.test.ts`: regresión de 9000 IDs, 30/50/70 por celda, conservación histórica, rotación y errores negativos.
- La CI guarda artefacto `sociales-m3-corte`. Se preservan pruebas de M0, Español, Matemáticas y Naturales y auditorías Sociales M1/M2.

## Evidencia y límites

- **No hay certificación de independencia semántica**: los 9000 registros proceden de aproximadamente 100 anclajes conceptuales y escenarios técnicos. La variación de estímulos o mecánica no demuestra 9000 desafíos cognitivos independientes.
- El nivel intermedio es orientativo al examen PHUMA, no calibración empírica.
- La revisión humana del contenido y la inspección visual manual de móvil/escritorio quedan pendientes; ni CI ni comprobaciones HTTP la sustituyen.
- La ausencia de revisión académica no impide cierre técnico de este módulo bajo autorización, pero cualquier hallazgo de CI o despliegue sí impide declararlo publicado.

## Puerta de publicación y continuidad

Completar tras verificar PR fusionado, CI SUCCESS de `main` y Render LIVE del mismo commit. Siguiente objetivo: `sociales-CORTE` para reconciliar el área antes de iniciar Habilidades Blandas M1.

## Reconciliación de publicación — 20 de noviembre de 2026

- PR #42 fusionado a main: https://github.com/c2melendez/desafio-gramatical/pull/42, commit `1f665d0e609594c6fd7adebced722a84e6bbebb8`.
- CI del PR: **SUCCESS**, https://github.com/c2melendez/desafio-gramatical/actions/runs/44772723594.
- CI de main: **SUCCESS**, https://github.com/c2melendez/desafio-gramatical/actions/runs/44773146018, SHA `1f665d0e609594c6fd7adebced722a84e6bbebb8`.
- Render: **LIVE**, despliegue `dep-dc078l6q1p3s73ddhbp0`, SHA `1f665d0e609594c6fd7adebced722a84e6bbebb8`, https://desafio-gramatical.onrender.com/.
- Auditoría acumulada: 9000 IDs técnicos, 180 celdas, 3000 nuevos M3 y 6000 M1/M2 preservados; 900 mutaciones negativas verificadas en CI.
- La guía oficial se usa como referencia curricular, no se reproducen preguntas oficiales; auditorías automáticas no certifican 9000 ejercicios independientes.
- **Siguiente fase:** `sociales-CORTE` para conciliación de área; después `blandas-M1` según dependencias. Revisión académica y visual manual continúan pendientes.
- El commit de esta documentación es distinto del commit de integración. Volver a verificar CI y Render de su SHA antes de darlo como definitivo.
