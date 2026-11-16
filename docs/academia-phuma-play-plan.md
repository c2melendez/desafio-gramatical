# Academia PHUMA Play · plan de migración y primer módulo

Esta aplicación amplía **Desafío Gramatical** de forma gradual hacia una plataforma lúdica de preparación PHUMA. El producto cambia su **nombre visible** a Academia PHUMA Play; por compatibilidad, de momento **no** se cambia el repositorio `c2melendez/desafio-gramatical` ni la URL pública `https://desafio-gramatical.onrender.com/`.

## Estructura del menú

- **5 áreas:** Comunicación y Español, Matemáticas, Ciencias Naturales, Ciencias Sociales y Habilidades Blandas.
- **19 temas** y **90 subtemas**, equivalentes al catálogo que hemos venido utilizando en Academia PAA + PHUMA (`academia-paa-phuma/src/catalog.js`).
- **3 juegos propuestos por tema**: una dinámica de reconocimiento o clasificación, una de aplicación o elección, y una de construcción o resolución. Son 57 combinaciones **planificadas**, no 57 juegos implementados.
- **3 dificultades por juego**: Básico (internamente `principiante`, para compatibilidad), Intermedio y Avanzado.

La pantalla inicial contiene cuatro pasos: Área → Tema/Subtema → Juego → Dificultad, más un resumen de la selección y acceso al historial.

## Estado funcional actualizado — 16 de noviembre de 2026

**Tres temas habilitados**, con **13 subtemas jugables** en el menú:

- **Gramática y semántica → Categorías gramaticales**: Clasificar palabras, Quiz de conceptos, Construir oraciones. Tres niveles; historial original intacto.
- **Comprensión lectora → 7 subtemas**: Detective de ideas, Verdad o inferencia y Reconstruye el texto. Nueve pasajes y 63 configuraciones de preguntas.
- **Redacción → 5 subtemas**: Cazador de errores, Conector correcto y Editor experto. Cuarenta y cinco escenarios que se trabajan con tres mecánicas y tres niveles.

Quedan **77 subtemas** planificados que no ofrecen partidas hasta implementar y validar su contenido. El menú diferencia explícitamente módulos disponibles de módulos en desarrollo.

Los modos internos `clasificar`, `quiz` y `construir`, los registros previos del historial y las rutas antiguas `/jugar` y `/lectura` permanecen vigentes. Se incorporó `/redaccion`, sin cambiar el nombre del repositorio ni la URL de Render.

## Desarrollo incremental previsto

1. **Fase completada** — nueva marca, catálogo y menú, juegos gramaticales preservados y pruebas de regresión.
2. **Español (en curso)** — lectura y redacción ya cuentan con juegos; ampliar sus bancos, desarrollar literatura y demás subtemas de semántica y morfosintaxis.
3. **Matemáticas** — ampliar los tres motores con operaciones, funciones, representación de gráficas, geometría y construcción de procedimientos.
4. **Ciencias Naturales y Sociales** — incluir diagramas, cronologías, mapas, relaciones causa-efecto, clasificación y secuencias de procesos.
5. **Habilidades Blandas** — decisiones contextualizadas, diálogo y organización de soluciones; criterios transparentes y sin afirmaciones de validez predictiva.
6. **Progreso y calidad** — registrar desempeño por combinación `area/tema/subtema/juego/nivel`, historial compatible, auditoría de contenido y pruebas de accesibilidad.

## Pruebas y despliegue

`src/test/phuma-catalog.test.ts` verifica las 5 áreas, 19 temas, 90 subtemas, nombres de 3 juegos por tema y la existencia de los tres juegos originales en cada nivel. La acción `.github/workflows/ci.yml` ejecuta pruebas, ESLint y compilación. Render publica desde `main` con el servicio existente `desafio-gramatical`.

**Importante:** el catálogo y los nombres de juegos son diseño pedagógico de esta aplicación; no representan una distribución oficial de preguntas ni una validación por parte de la UNAH.
