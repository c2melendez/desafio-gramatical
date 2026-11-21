# Ciencias Sociales — corte integral del área
**Estado de esta rama: CORTE_PENDIENTE.** Solo se declara `AREA_COMPLETADA` con CI SUCCESS en `main` y Render LIVE del mismo commit.

## Identidad y alcance congelado
- Repositorio: `c2melendez/desafio-gramatical`; SHA de partida: `db347499687a68b4ec405cdf34ad88d15588a915`.
- Catálogo social congelado: SHA1 Git blob `63d6f6a6c285d11e511ac22c7c01e19683a909f4`; 5 temas, 20 subtemas, 3 mecánicas, 3 niveles = **180 celdas**.
- Fuente de orientación: `GUIA-PRE-U-UNAH-2026(9).pdf`, página PDF 11 / impresa 10, lista Historia de Honduras, Historia universal, Geografía, Educación cívica, Sociología, Filosofía y Antropología. Los 5 subtemas ampliados de la práctica se clasifican como complementarios y no se presentan como títulos exactos de la guía.
- Objetivo: 30/50/70 por combinación subtema × juego. Totales técnicos: básico 1.800, intermedio 3.000, avanzado 4.200, **9.000**. Todos son **registros técnicos**, no 9.000 conceptos independientes.
- El área mantiene aproximadamente 100 anclajes conceptuales, con rotación entre tres juegos; la independencia conceptual y dificultad psicométrica permanecen **NO_VERIFICADAS**.

## Auditoría integral reproducible
- Comando de CI: `node --import ./scripts/ts-resolve.mjs scripts/audit-social-cut.mjs > sociales-corte-integral.json`.
- Matriz de 180 celdas, sus déficits, 9.000 huellas SHA256 individuales, catálogo congelado, familias, registro de procedencia y hash agregado del corpus.
- 100 % de ítems sometidos a verificación estructural de hechos, modalidad, 4 opciones, respuesta, construcción, clasificación, explicación y trazabilidad; cotejo M1/M2/M3 e IDs compartidos con otras áreas.
- 1.800 mutaciones artificiales en 10 categorías: ID nulo, respuesta falsa, fuente falsificada, opción duplicada, clasificación errónea, construcción no alcanzable, explicación ausente, dificultad errónea, etapa cognitiva falsa y revisión ficticia.
- Ejecución de 2 sesiones de 10 rondas por celda con historial serializado y restaurado. Se verifica el catálogo, los retornos contextuales y la disponibilidad de menú.
- Tests de navegador simulado: selección y URL sin parámetros, ruta inválida, final de 10 rondas, historial, reinicio confirmado/cancelado, explicación y regreso contextual.
- CI global y regresión: Español, Matemáticas, Naturales, Sociales M1–M3, contratos M0, build, lint y pruebas HTTP publicadas de muestras de rutas.
- La prueba HTTP solo prueba HTML; las pruebas de UI con jsdom no sustituyen un recorrido visual real en móvil o escritorio.

## Reparaciones objetivas de este corte
- `src/routes/sociales.tsx` dejó de caer en **«Célula»** (de Naturales) al recibir una URL sin `subtema`; usa `src/lib/social-route.ts` con validación de parámetros y `Independencia` por defecto.
- Corrigió el indicador de carga que todavía nombraba Ciencias Naturales.
- `src/lib/study-context.ts`: descripciones de competencia específicas para los 20 subtemas de Sociales, en lugar de plantillas genéricas.
- `docs/m0-contract-lock.json`: hashes renovados y contratos de búsqueda y pantalla de Sociales incorporados.

## Evaluación de riesgos y decisión
- `DETERMINADO`: catálogo, cifras técnicas, herramientas, código y pruebas automatizadas, siempre que CI pase el SHA registrado.
- `DEDUCIBLE`: la conservación de los 9.000 IDs y la trazabilidad estructural proporcionan un banco funcional de práctica técnica; no prueban dificultad empírica.
- `AMBIGUO / PENDIENTE_DOCENTE`: validez histórica individual, distractores conceptualmente equivalentes, independencia cognitiva y calibración. Mantener pendientes por autorización del usuario.
- `NO_EJECUTADO`: auditoría visual manual de móvil/escritorio y mediciones reales de accesibilidad con lector de pantalla. Requieren controles adicionales; documentadas, no declaradas aprobadas.
- Siguiente módulo tras cierre técnico: **Habilidades Blandas M1**, con 10/15/20 por juego y subtema, revisión de la guía antes de atribuir competencias oficiales.

## Publicación
Pendiente de integrar el PR y registrar la evidencia verificable: SHA de `main`, run de CI, artefacto `sociales-corte-integral` y deploy Render del mismo commit. Si después se genera un commit documental, repetir CI y Render para ese commit.
