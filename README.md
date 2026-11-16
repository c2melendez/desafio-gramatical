# Academia PHUMA Play

Plataforma independiente para practicar mediante juegos las competencias que se estudian para PHUMA, manteniendo el diseño y el historial de **Desafío Gramatical**.

- **Aplicación:** https://desafio-gramatical.onrender.com/
- **Repositorio:** https://github.com/c2melendez/desafio-gramatical
- **Catálogo:** 5 áreas, 19 temas, 90 subtemas
- **Juegos disponibles:** Categorías gramaticales (3 juegos), Comprensión lectora (7 subtemas × 3 juegos), Redacción (5 subtemas × 3 juegos), todos con 3 niveles. El resto del catálogo está planificado y se marca «En desarrollo».
- **Historial:** se conservan registros locales de partidas antiguas; puntos de juego distintos de cualquier puntaje PHUMA oficial.

## Fase A — ampliación verificable

La meta por cada **juego y subtema** es **30 ejercicios básicos, 50 intermedios y 70 avanzados**. La primera etapa se mide en **10/15/20**.

El primer núcleo ya se alcanzó **únicamente en Redacción → Conectores → Conector correcto**, con 10/15/20 ejercicios por nivel (9 anteriores + 36 nuevos), que se seleccionan por una rotación por usuario/navegador que prioriza ejercicios inéditos y recupera errores con posterioridad. El resto de los juegos conservan su contenido previo, que será ampliado por etapas.

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
- [Juegos de Redacción](docs/redaccion-juegos.md)
- [Fase A: núcleo, rotación, validación y próximos lotes](docs/fase-a-nucleo-rotacion.md)

**Aviso:** contenido original no oficial, sin afiliación ni aval de la UNAH. Las dificultades son pedagógicas, no calibradas estadísticamente.
