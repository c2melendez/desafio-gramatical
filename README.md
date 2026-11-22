# Academia PHUMA Play

Plataforma independiente para practicar mediante juegos las competencias que se estudian para PHUMA, manteniendo el diseño y el historial de **Desafío Gramatical**.

- **Aplicación:** https://desafio-gramatical.onrender.com/
- **Repositorio:** https://github.com/c2melendez/desafio-gramatical
- **Catálogo:** 5 áreas, 19 temas, 90 subtemas
- **Juegos disponibles:** cinco áreas (Español, Matemáticas, Ciencias Naturales, Ciencias Sociales y Habilidades Blandas), 90 subtemas, tres modalidades y tres niveles; 810 combinaciones de juego/nivel. El inventario técnico M3/CORTE registra 40.500 posiciones; no implica independencia cognitiva ni revisión docente aprobada.
- **M4 en ejecución:** auditoría transversal ejecutable `scripts/audit-m4-global.mjs`, obligatoria en CI; accesibilidad manual, rendimiento real y certificación editorial permanecen sujetos a evidencia diferenciada.
- **Historial:** se conservan registros locales de partidas antiguas; puntos de juego distintos de cualquier puntaje PHUMA oficial.

## Política de corridas ampliadas

Se adopta una meta aproximada de **tres subtemas pendientes por corrida: 405 ejercicios nuevos si parten de cero**, para completar 10/15/20 en cada juego. La prioridad es **terminar los subtemas del tema actual antes de cambiar de tema**. Una corrida solo se declara completa después de **GitHub Actions success y despliegue Render Live en el mismo commit**, con auditoría aprobada. Si quedan menos de tres subtemas en el tema, se informa un bloque menor, sin trasladar trabajo de otra área para simular la cuota. Véanse [política operativa](docs/politica-corridas-bloques.md), [hoja de ruta por subtema](docs/hoja-ruta-expansion-phuma.md) e [informe del primer bloque](docs/corrida-bloque-lectura-324.md).

> **Política vigente de ejecución (17-11-2026):** las antiguas metas de 324 y 405 registros por corrida describen entregas históricas. El nuevo sistema modular prioriza terminar el bloque abierto, después finalizar **una sola área** en Núcleo 10/15/20, Ampliación 20/35/45 y Completo 30/50/70 por combinación elegible. Los paquetes orientativos de 450 y 900 no sustituyen el cierre ni la auditoría. M0 sigue EN_CURSO hasta que su runner tenga todas las etapas obligatorias PASS y CI/Render correspondan al mismo SHA. [Evidencia de esta ejecución](docs/m0-evidencia-sesion-20261117.md).

## Fase A — ampliación verificable

La meta por cada **juego y subtema** es **30 ejercicios básicos, 50 intermedios y 70 avanzados**. La primera etapa se mide en **10/15/20**.

**Los cinco subtemas de Redacción alcanzaron la primera meta cuantitativa de 10/15/20 por juego y nivel.** Son **675 registros por modalidad**, con **540 casos nuevos diferenciados por juego** y **135 registros de situaciones anteriores compartidas entre mecánicas**. La cantidad no significa revisión editorial aprobada ni haber alcanzado aún los 30/50/70 definitivos. Véanse [Generalización e integración](docs/fase-a-generalizacion-integracion-2026.md) y los informes de los demás subtemas.

**Comprensión lectora — Idea principal:** los **tres juegos** han alcanzado el primer núcleo de 10/15/20 por nivel, con **108 lecturas originales nuevas** (36 por juego, diferentes entre sí) y 27 registros anteriores compartidos entre modalidades; total: **135 registros por modalidad**. **Inferencias** también alcanzó 10/15/20 en sus tres juegos, con otros 108 pasajes originales diferentes y 135 registros por modalidad. **Lectura crítica** también alcanza 10/15/20 en los tres juegos con 108 pasajes originales adicionales y 135 registros por modalidad. **Vocabulario en contexto, Análisis de textos y Lectura comparada** alcanzan ahora también 10/15/20 por juego y nivel, gracias a la corrida de **324 registros nuevos** (108 por subtema). **Lenguaje figurado** alcanzó igualmente 10/15/20 con otros **108 ejercicios nuevos**, completando el núcleo cuantitativo de los **siete subtemas de Comprensión lectora** (945 registros por modalidad; 756 pasajes nuevos, 189 configuraciones heredadas que reutilizan situaciones). La rotación conserva las lecturas vistas y los errores por juego y nivel. [Informe de Idea principal](docs/fase-a-lectura-idea-principal.md) · [Informe de Inferencias](docs/fase-a-lectura-inferencias.md) · [Informe de Lectura crítica](docs/fase-a-lectura-critica.md) · [Cierre de Lenguaje figurado](docs/corrida-cierre-lenguaje-figurado.md).

La portada indica la cobertura cuantitativa para la combinación de subtema, juego y nivel elegida. No confunde escenarios compartidos con ejercicios cognitivos independientes ni presenta la cantidad como certificación pedagógica.

## Desarrollo y pruebas

```bash
bun install --frozen-lockfile
bun run build
bun run test
bun run audit:content
```

El CI realiza compilación, pruebas, auditoría de cobertura y ESLint antes de que se considere correcto un cambio. `bun run audit:content` examina las 810 combinaciones de contenido (90 subtemas × 3 juegos × 3 niveles), las metas 30/50/70 y el núcleo actual.

## Documentación

- [Plan de expansión del proyecto](docs/academia-phuma-play-plan.md)
- [Juegos de comprensión lectora](docs/comprension-lectora-juegos.md)
- [Fase A: primera ampliación independiente de Idea principal](docs/fase-a-lectura-idea-principal.md)
- [Juegos de Redacción](docs/redaccion-juegos.md)
- [Fase A: núcleo, rotación, validación y próximos lotes](docs/fase-a-nucleo-rotacion.md)
- [Fase A: Organización textual, juegos y auditoría](docs/fase-a-organizacion-textual-2026.md)
- [Fase A: Elisión y adición, juegos y auditoría](docs/fase-a-elision-adicion-2026.md)
- [Fase A: Generalización e integración y cierre cuantitativo de Redacción](docs/fase-a-generalizacion-integracion-2026.md)

**Aviso:** contenido original no oficial, sin afiliación ni aval de la UNAH. Las dificultades son pedagógicas, no calibradas estadísticamente.
