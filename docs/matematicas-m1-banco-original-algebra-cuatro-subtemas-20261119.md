# Matemáticas M1 — Segunda corrida de rehabilitación cognitiva del banco original
Fecha: 2026-11-19. Alcance: **4 de 22 subtemas** (Ecuaciones cuadráticas, Inecuaciones, Funciones y Patrones algebraicos) × 3 juegos × 3 niveles = **540 registros existentes**. No se crean nuevos IDs.

## Justificación y límites
El banco original `src/lib/math-m1.ts` generaba el mismo problema por habilidad, variando principalmente semillas y cifras. La auditoría aritmética existente prueba exactitud, pero no garantiza una progresión de habilidades. Esta corrida modifica operaciones, justificaciones, pruebas y consignas por nivel. Las funciones transformadas se describen como práctica complementaria; no se atribuye frecuencia de reactivos oficial.

## Matriz de progresión
| Subtema | Básico (1) | Intermedio (2) | Avanzado (3) |
|---|---|---|---|
| Ecuaciones cuadráticas | Factorizar y seleccionar la mayor raíz | Trasladar ambas raíces 2 unidades mediante f(x−2) | Componer escala horizontal y traslación con g(x)=f((x−1)/2), reconstituir raíces |
| Inecuaciones | Resolver ax+k>b con a positivo | Aumentar b en 2a y determinar frontera nueva | Negar coeficiente, aumentar constante en 2a e invertir correctamente el sentido de desigualdad |
| Funciones | Evaluar f(x) desde gráfica de recta | Evaluar g(x)=f(x+2) a partir de la recta **original** | Componer g(x)=2f(x+1)−f(x−1) con los valores del gráfico original |
| Patrones algebraicos | Evaluar a_n | Avanzar dos índices, evaluar a_(n+2) | Combinar a_(n+2)+a_(n−1) y justificar expresión equivalente |

## Los tres modos
- **Clasificar:** decidir si tres procedimientos o proposiciones matemáticas son válidos; al menos dos errores conceptuales plausibles. Evita la antigua estructura «resultado n / n+1 / n−1» en estas cuatro habilidades.
- **Quiz:** hallar una única solución numérica a la condición transformada, con alternativas distintas.
- **Construir:** resolver una decisión intermedia causal antes de dar la solución final; para las inecuaciones visuales, leer primero el **extremo original** y después seleccionar la solución transformada, incluido el signo < en Avanzado.

## Representación gráfica y oráculos
- El estímulo de Funciones muestra f **original**, mientras el enunciado solicita g; `MathVisual.operation` distingue evaluación directa, traslación y composición. La respuesta se computa directamente desde datos gráficos originales, no se rotula una curva transformada como original.
- La recta numérica de Inecuaciones representa la solución **original** (circular abierto hacia la derecha), mientras la operación solicitada puede producir x< en Avanzado. El valor del punto central permanece sin etiqueta: se necesita interpretar su ubicación. La segunda etapa selecciona la desigualdad correcta; no atribuye el sentido transformado al dibujo inicial.
- El auditor `scripts/audit-math-m1.mjs` sigue reconstruyendo de modo independiente: raíz mayor por discriminante, frontera (b−k)/a, valor lineal mx+b y término cn+k. Los `oracle.inputs` describen la transformación solicitada sin perder exactitud.
- `src/test/math-m1-core-algebra-next.test.tsx` verifica los **540 casos**, IDs, oráculos, alternativas, separación conceptual de los tres niveles, interacción real Clasificar/Construir y mutaciones gráficas. Las pruebas de 1.080 estímulos visuales y las auditorías globales continúan en CI.

## Estado acumulado
La intervención precedente rehabilitó Ecuaciones y Sistemas (270 IDs). Tras fusionar esta corrida, el banco original tendría **810 de 2.970** registros bajo progresión cognitiva diferenciada, distribuidos en seis subtemas de 22. Los **2.160 registros restantes** de dieciséis subtemas continúan pendientes. Los cinco laboratorios gráficos especializados (1.152 registros) tienen controles propios, pero no se confunden con el banco principal.

## Puertas de salida y revisión
Fusionar solo tras CI del PR SUCCESS. Confirmar CI de main SUCCESS y Render Live **con el mismo SHA**. Revisión humana académica, accesibilidad y pruebas visuales manuales continúan pendientes; la instrumentación técnica no equivale a certificación psicométrica ni habilita M2 automáticamente.
