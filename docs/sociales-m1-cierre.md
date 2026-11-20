# Ciencias Sociales M1 — núcleo de práctica y puerta técnica
**Estado: COMPLETADA TÉCNICAMENTE.** CI SUCCESS en main y Render LIVE del mismo SHA de integración. Revisión académica PENDIENTE_AUTORIZADA.
Revisión académica, histórica, geográfica y psicométrica: **PENDIENTE AUTORIZADA**.

## Matriz de entrega
- Repositorio: `c2melendez/desafio-gramatical`, rama propuesta `feat/sociales-m1-integral-20261120`.
- 5 bloques, 20 subtemas del catálogo (algunos son ampliaciones complementarias), 3 mecánicas, 3 niveles = **180 celdas**.
- Por cada combinación subtema × juego: Básico 10, Intermedio 15, Avanzado 20. Totales: Básico 600, Intermedio 900, Avanzado 1200, **2700 técnicos**.
- **100 anclajes factuales** curados (5 por subtema), usados para generar escenarios rotados, distractores, comparaciones y dos pasos. **No representan 2700 conceptos independientes**.
- Fuente de orientación: `GUIA-PRE-U-UNAH-2026.pdf` página impresa 10, con Historia de Honduras, Historia universal, Geografía, Educación cívica, Sociología, Filosofía y Antropología. Geografía humana, geografía física, Historia contemporánea, estratificación social y origen humano están tratados como **clasificación/ampliación de catálogo**, no como títulos oficiales literales.
- Cada reactivo lleva familia, escenario, propiedad, clave, explicación de error, procedencia y etiqueta de borrador editorial.
- Ruta pública `/sociales`, selección contextual, historial, controles de 10 rondas y retroalimentación de las tres mecánicas reaprovechando componentes probados.

## Verificación y mutaciones
- `scripts/audit-social-m1.mjs`: 100 % de las 180 celdas e IDs, claves, enunciados, distractores, etiquetas, paso doble, operaciones cognitivas y simulación de dos partidas.
- `src/test/social-m1-integration.test.ts`: cobertura, unicidad, rotación, mutantes por clave, evidencia, distractor, respuesta en construcción, modalidad y catálogo inválido.
- GitHub Actions ejecuta auditoría, conserva artefacto `sociales-m1-integral` y añade prueba HTTP sobre tres rutas.
- Validación humana visual de escritorio/móvil no sustituida por pruebas HTML: pendiente de evidencia.
- La clasificación de niveles expresa intención de diseño; intermedio es práctica orientativa al examen, no dificultad validada psicométricamente.

## Cortes de aceptación
- Cierre técnico solamente al comprobar PR fusionado, suite completa SUCCESS y Render LIVE para **el mismo SHA**; toda documentación posterior necesita verificación de su propio SHA.
- Hallazgos críticos se corrigen y revalidan; ausencia de evidencia deja el módulo EN_PRODUCCION.
- Siguiente módulo tras cierre técnico: `sociales-M2`, acumulado 20/35/45 por nivel y juego.

## Publicación técnica verificada — 20 de noviembre de 2026

- PR #40: https://github.com/c2melendez/desafio-gramatical/pull/40, **fusionado en main**.
- SHA integrado `6a73210cb727c1bbccf8bd8769a3af2d443a4fa3`.
- CI de PR **SUCCESS**: https://github.com/c2melendez/desafio-gramatical/actions/runs/44760810716.
- CI en main **SUCCESS**, SHA idéntico al fusionado: https://github.com/c2melendez/desafio-gramatical/actions/runs/44761376495.
- Render **LIVE**, despliegue `dep-dc067u59el5s73et0nm0`, SHA `6a73210cb727c1bbccf8bd8769a3af2d443a4fa3` y URL https://desafio-gramatical.onrender.com/.
- Build, 345 pruebas automatizadas, inventario y grafo, bloqueo M0, regresiones anteriores, 180 celdas de Sociales y 900 mutaciones negativas aprobaron. El smoke HTTP publicado comprueba respuesta HTML de rutas representativas; no certifica revisión visual manual.
- 2700 registros técnicos M1 distribuidos como 600/900/1200 por nivel; 100 anclajes conceptuales, **sin independencia semántica demostrada**.
- La revisión docente y académica sigue expresamente pendiente, permitiendo iniciar `sociales-M2`.
- Este commit de documentación tendrá un SHA nuevo. Para su cierre final verificar de nuevo CI/Render de ese propio SHA.
