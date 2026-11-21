# Habilidades Blandas M1 — entrega técnica del núcleo

**Estado: COMPLETADA TÉCNICAMENTE; PR fusionado, CI SUCCESS y Render LIVE sobre el mismo SHA de integración.**
La revisión académica, independencia semántica, calibración y revisión visual manual están pendientes y no se consideran aprobadas.

## Alcance y cifras

- Repositorio: `c2melendez/desafio-gramatical`; base canónica `8a0636aafe7112163011e024c2f09ac96eb5295b` después del CORTE técnico de Sociales.
- Catálogo: 3 temas (Toma de decisiones, Convivencia, Autogestión), 8 subtemas y tres juegos (clasificar, quiz, construir) × 3 niveles = **72 celdas**.
- Objetivos por subtema × juego: 10 básicos, 15 intermedios, 20 avanzados = 45 registros. En 24 combinaciones: **240 básicos + 360 intermedios + 480 avanzados = 1.080 registros técnicos**.
- 40 anclajes de conducta y criterio (5/subtema), cuatro variantes contextualizadas, tres mecánicas de respuesta con claves verificadas. **NO** son 1080 tareas independientes, únicas desde un punto de vista semántico ni reactivos oficialmente calibrados.
- **Procedencia:** la guía PRE-U UNAH 2026 revisada (Ciencias Sociales en pág. impresa 10) **no enumera Habilidades Blandas como área de examen**. Este núcleo es **práctica complementaria del catálogo de la plataforma**, no contenido oficial PHUMA. No se atribuyen preguntas, formatos ni puntajes oficiales a estos casos.

## Implementación

- `src/lib/soft-m1.ts`: modelo de 40 anclajes, banco reproducible de 1080 IDs estables, evidencia, justificación y distractores.
- `src/routes/blandas.tsx`: selección de subtema, modo y nivel, rondas de diez, control de historial, puntuación, racha, retroalimentación, reinicio, resultados y regreso contextual.
- `src/lib/phuma-catalog.ts`, `src/lib/coverage.ts`, `src/routes/index.tsx`: habilitación de las 72 celdas del área en selector e inventario.
- `src/lib/study-context.ts`: objetivos pedagógicos observables de los ocho subtemas, sin promesas de evaluación clínica ni oficial.
- Pruebas en `src/test/soft-m1-integration.test.ts` y `src/test/soft-m1-navigation.test.tsx`; auditoría `scripts/audit-soft-m1.mjs` con 72 celdas, 1080 ítems, oráculos, 576 mutantes de datos (8 tipos ×72 celdas) y dos sesiones de diez rondas.
- Pruebas globales M0, regresión Español/Matemáticas/Naturales/Sociales, inventario 37.980 registros técnicos (frente a 36.900 previos), verificaciones de contratos bloqueados y CI obligatorio.
- Se mantienen las diez rondas por sesión, los estilos y el esquema de respuesta compartido. La rotación reusa ítems cuando se agotan los inéditos del nivel básico; no se afirma que dos sesiones de diez sean enteramente distintas con un banco de diez.

## Criterios de aceptación

- [x] CI de PR completo SUCCESS sin fallos bloqueantes.
- [x] PR integrado a rama principal.
- [x] CI principal SUCCESS para el SHA integrado y Render LIVE del mismo SHA.
- [ ] Reconciliación documental final con CI/Render del SHA de documentación.
- [ ] Revisión académica/manual por especialistas (pendiente autorizada, separada del cierre técnico).
- [ ] Inspección manual visual en dispositivos y accesibilidad asistiva (no ejecutada).
- [ ] Independencia conceptual y calibración de dificultad (no certificadas).

## Siguiente objetivo

Tras M1 técnico: **Habilidades Blandas M2**, ampliación acumulativa a 20/35/45 por subtema × juego, conservando los 1080 IDs M1, seguida de auditorías, integración, CI y despliegue.

## Evidencia de publicación — 20 de noviembre de 2026 (hora de Honduras)

- Pull request #44, fusionado: https://github.com/c2melendez/desafio-gramatical/pull/44.
- Commit técnico integrado: `958b84b5297f61ba769fd012e3d1f34403139659`.
- CI PR **SUCCESS**: https://github.com/c2melendez/desafio-gramatical/actions/runs/44870424885.
- CI `main` **SUCCESS**: https://github.com/c2melendez/desafio-gramatical/actions/runs/44870701910, mismo SHA `958b84b5297f61ba769fd012e3d1f34403139659`.
- Render **LIVE**: `dep-dc0ilr3tqb8s73dhdl4g`, mismo SHA `958b84b5297f61ba769fd012e3d1f34403139659`, URL https://desafio-gramatical.onrender.com/.
- Auditoría de 72 celdas: 1080 registros técnicos con 240 básicos, 360 intermedios y 480 avanzados; 576/576 mutantes negativos detectados. Las regresiones de Español, Matemáticas, Naturales, Sociales y M0 permanecieron aprobadas.
- Corrección efectuada durante CI: auditor de rotación repara falsa exigencia de cero repeticiones **entre** dos sesiones cuando el nivel tiene solo 10 o 15 ítems. Sigue prohibiendo duplicados **dentro** de una sesión de 10 rondas.
- Revisión académica y visual manual pendientes, autorizadas; no equivalen a defectos técnicos críticos ni a certificación docente.
- **Siguiente módulo:** Habilidades Blandas M2 con objetivos acumulados 20/35/45. Esta documentación se confirma con un commit nuevo, por lo que deben verificarse de nuevo CI y Render sobre su SHA.
