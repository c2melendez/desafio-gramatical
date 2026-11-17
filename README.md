# Academia PHUMA Play

Plataforma independiente para practicar mediante juegos las competencias que se estudian para PHUMA, manteniendo el diseño y el historial de **Desafío Gramatical**.

- **Aplicación:** https://desafio-gramatical.onrender.com/
- **Repositorio:** https://github.com/c2melendez/desafio-gramatical
- **Catálogo:** 5 áreas, 19 temas, 90 subtemas
- **Juegos disponibles:** Categorías gramaticales (3 juegos), Comprensión lectora (7 subtemas × 3 juegos), Redacción (5 subtemas × 3 juegos), todos con 3 niveles. El resto del catálogo está planificado y se marca «En desarrollo».
- **Historial:** se conservan registros locales de partidas antiguas; puntos de juego distintos de cualquier puntaje PHUMA oficial.

## Fase A — ampliación verificable

La meta por cada **juego y subtema** es **30 ejercicios básicos, 50 intermedios y 70 avanzados**. La primera etapa se mide en **10/15/20**.

**Los cinco subtemas de Redacción alcanzaron la primera meta cuantitativa de 10/15/20 por juego y nivel.** Son **675 registros por modalidad**, con **540 casos nuevos diferenciados por juego** y **135 registros de situaciones anteriores compartidas entre mecánicas**. La cantidad no significa revisión editorial aprobada ni haber alcanzado aún los 30/50/70 definitivos. Véanse [Generalización e integración](docs/fase-a-generalizacion-integracion-2026.md) y los informes de los demás subtemas.

**Comprensión lectora — Idea principal:** los **tres juegos** han alcanzado el primer núcleo de 10/15/20 por nivel, con **108 lecturas originales nuevas** (36 por juego, diferentes entre sí) y 27 registros anteriores compartidos entre modalidades; total: **135 registros por modalidad**. Los otros seis subtemas de lectura mantienen sus bancos iniciales. La rotación conserva las lecturas vistas y los errores por juego y nivel. [Informe de la ampliación](docs/fase-a-lectura-idea-principal.md).

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
