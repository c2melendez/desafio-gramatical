# Matemáticas M1 — evaluación del enfoque lúdico y laboratorio gráfico de funciones
Fecha: 2026-11-18 · Estado: intervención de código candidata a CI + Render; **revisión docente pendiente**.

## Correspondencia de fuentes y alcance
La guía *GUIA-PRE-U-UNAH-2026.pdf*, pág. impresa 6, enumera explícitamente en Álgebra ecuaciones cuadráticas, inecuaciones lineales y patrones algebraicos. En Estadística/probabilidad enumera interpretación de tablas, gráficas y figuras. **Dominio, rango, intervalos de crecimiento y decrecimiento, intersecciones y el análisis completo de funciones NO están enumerados de forma independiente en ese listado.** Son habilidades complementarias de alfabetización gráfica, recomendadas para ampliar la transferencia del aprendizaje, **sin afirmar frecuencia, ponderación ni equivalencia oficial PHUMA**. Ejemplos gráficos de la misma guía muestran la necesidad de interpretar figuras y datos; guías PAA pueden orientar formatos, pero no transfieren una especificación oficial.

## Auditoría del enfoque anterior
- Las tres mecánicas heredadas de Desafío Gramatical (`clasificar`, `quiz`, `construir`) permiten cálculos y corrección de respuestas, pero no garantizan evaluación sistemática de dominio, rango, intervalos, intersecciones ni transferencia entre gráfica y función. Los 1.080 registros visualizados de M1 fase 2 tampoco equivalen a cobertura conceptual independiente por tipo de pregunta.
- La función lineal del piloto anterior presenta dos puntos etiquetados y solicita calcular un valor; **no equivale a interpretar todas las propiedades de una gráfica cartesiana**. Este laboratorio incorpora tramos, escala, extremos y puntos de corte reales, sin modificar los IDs ni el generador M1 histórico.
- El esquema de tres juegos **se abre a un cuarto juego especializado**, sin imponer nombres ni modalidades generales de Español a Matemáticas. Se respetan navegación, acceso contextual, diez rondas, puntaje, accesibilidad, rotación y registro de historial.

## Intervención funcional (separada de los tres juegos)
**Ruta:** `/laboratorio-funciones?nivel=intermedio` y acceso desde Área Matemáticas → Álgebra → Funciones → «Abrir laboratorio de funciones».

**Gráficos:** `src/components/games/FunctionGraph.tsx` representa funciones lineales por tramos sobre ejes cartesianos **a escala**, con cuadrícula, marcas y vértices extremos cerrados; los puntos son datos del modelo `src/lib/function-graph-lab.ts`, no un dibujo aproximado desconectado de su clave. Los tres niveles usan variaciones parametrizadas, y cada ronda tiene cuatro alternativas y explicación específica.

**Seis habilidades:** dominio con extremos incluidos; rango mínimo/máximo; crecimiento; decrecimiento; intersección con el eje vertical; intersección con el eje horizontal. La clave de dominio/rango proviene de `xs/ys`, la monotonía de comparar pendientes por tramo y los cortes de evaluar `x=0` / `y=0`. Los casos de intersección horizontal se generan deliberadamente con una sola raíz exacta; no se usan aproximaciones pixeladas.

**Inventario:** 72 preguntas originales paramétricas por nivel × 3 niveles = **216 registros técnicos** de la mecánica nueva, 12 por habilidad y nivel. Se conserva un máximo de 10 rondas sin ID repetido por partida, cubriendo las seis destrezas con rotación. No se incorporan estos IDs en las 2.970 combinaciones heredadas ni se considera cerrada la cuota curricular 30/50/70.

**Accesibilidad:** SVG con `role=img` y descripción equivalente de datos (sin dictar explícitamente la solución), marcas de ejes, redimensionado, botones accesibles y retroalimentación textual tras la respuesta.

## Criterios G0–G5 y próximos ajustes
- G0: PHUMA oficial distingue competencia de material complementario; PAA y simuladores de terceros no fijan el examen PHUMA.
- G1: si el estímulo no está presente, no se dispone de las coordenadas ni de los extremos; una pregunta no se resuelve con una plantilla textual de fórmula.
- G2/G3: 216 claves revisadas por oráculo y opciones únicas, pruebas negativas de mutación de puntos, monotonía, dominio, rango e intersecciones; gráfico con coordenadas a escala.
- G4: acceso como juego propio, diez rondas, feedback, historial, retorno, niveles y navegación contra pantalla de error.
- G5: CI, Render Live y pruebas de navegador real/móvil pendientes por verificar. La revisión académica humana sigue separada.
- **Persisten brechas** en formatos gráficos de parábolas, funciones por tramos con discontinuidades, extremos abiertos, dominio no acotado, intersecciones múltiples, transformaciones, gráficas estadístico-probabilísticas y geometría con paralelas/transversales o figuras compuestas; exigir oráculos y diseños específicos por habilidad antes de atribuirles cobertura. No afirmar “todas las alternativas posibles” ni competencia psicométrica acreditada.

## Decisiones de producto
1. **Mantener** clasificación solo cuando las afirmaciones demandan una decisión de contenido no trivial.
2. **Rediseñar** construcción si únicamente pide repetir dos operaciones del mismo cálculo.
3. **Sustituir/agregar** mecánicas para lectura de gráficas, modelación y manipulación de figuras, sin convertir todo en opción múltiple con cambio de etiqueta.
4. **No ampliar M2 en masa** hasta contar con revisión pedagógica del constructo, diversidad de familias y adecuación de estímulos.
5. En futuros módulos, seleccionar primero habilidad, tipo de estímulo y regla de evaluación; escoger el juego después, conforme a `docs/norma-validez-estimulos-visuales.md`.

Los resultados del laboratorio no representan puntuaciones oficiales PHUMA.
