# Academia PHUMA Play · plan de migración y primer módulo

Esta aplicación amplía **Desafío Gramatical** de forma gradual hacia una plataforma lúdica de preparación PHUMA. El producto cambia su **nombre visible** a Academia PHUMA Play; por compatibilidad, de momento **no** se cambia el repositorio `c2melendez/desafio-gramatical` ni la URL pública `https://desafio-gramatical.onrender.com/`.

## Estructura del menú

- **5 áreas:** Comunicación y Español, Matemáticas, Ciencias Naturales, Ciencias Sociales y Habilidades Blandas.
- **19 temas** y **90 subtemas**, equivalentes al catálogo que hemos venido utilizando en Academia PAA + PHUMA (`academia-paa-phuma/src/catalog.js`).
- **3 juegos propuestos por tema**: una dinámica de reconocimiento o clasificación, una de aplicación o elección, y una de construcción o resolución. Son 57 combinaciones **planificadas**, no 57 juegos implementados.
- **3 dificultades por juego**: Básico (internamente `principiante`, para compatibilidad), Intermedio y Avanzado.

La pantalla inicial contiene cuatro pasos: Área → Tema/Subtema → Juego → Dificultad, más un resumen de la selección y acceso al historial.

## Estado real de la primera etapa

**Únicamente el módulo Comunicación y Español / Gramática y semántica / Categorías gramaticales está habilitado.** Utiliza sin reescribir los tres motores originales:
1. Clasificar palabras (`ClassifyGame`)
2. Quiz de conceptos (`QuizGame`)
3. Construir oraciones (`BuildGame`)

Los otros 89 subtemas muestran los nombres de sus tres juegos en el menú, pero están claramente **en desarrollo** y no ofrecen un enlace activo a una partida sin datos. El menú completo constituye el esqueleto de navegación para la ampliación progresiva.

No se han modificado las claves originales de `localStorage` (incluida `desafio-gramatical:cola:...`), las identidades de modos `clasificar`, `quiz` y `construir`, ni el historial. Las antiguas URL `/jugar?modo=...&nivel=...` siguen abriendo el módulo gramatical inicial. No se cambian puntuaciones históricas ni reglas de racha. Tampoco se confunden puntos de juegos con la puntuación PHUMA /1600, que es una referencia pedagógica del simulador separado.

## Desarrollo incremental previsto

1. **Fase actual** — nueva marca, catálogo y menú; conservar los juegos gramaticales actuales; pruebas de regresión; publicación continua.
2. **Español** — añadir las otras habilidades y subtemas: lectura, semántica, morfosintaxis, redacción y literatura; desarrollar datos específicos y explicaciones para cada uno de los tres juegos.
3. **Matemáticas** — ampliar los tres motores con operaciones, funciones, representación de gráficas, geometría y construcción de procedimientos.
4. **Ciencias Naturales y Sociales** — incluir diagramas, cronologías, mapas, relaciones causa-efecto, clasificación y secuencias de procesos.
5. **Habilidades Blandas** — decisiones contextualizadas, diálogo y organización de soluciones; criterios transparentes y sin afirmaciones de validez predictiva.
6. **Progreso y calidad** — registrar desempeño por combinación `area/tema/subtema/juego/nivel`, historial compatible, auditoría de contenido y pruebas de accesibilidad.

## Pruebas y despliegue

`src/test/phuma-catalog.test.ts` verifica las 5 áreas, 19 temas, 90 subtemas, nombres de 3 juegos por tema y la existencia de los tres juegos originales en cada nivel. La acción `.github/workflows/ci.yml` ejecuta pruebas, ESLint y compilación. Render publica desde `main` con el servicio existente `desafio-gramatical`.

**Importante:** el catálogo y los nombres de juegos son diseño pedagógico de esta aplicación; no representan una distribución oficial de preguntas ni una validación por parte de la UNAH.
