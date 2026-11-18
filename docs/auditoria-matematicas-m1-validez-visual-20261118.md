# Auditoría pre-M2 — pertinencia y visualidad de Matemáticas M1
Fecha: 2026-11-18 | Estado: **DIAGNÓSTICO / BRECHA PEDAGÓGICA ABIERTA**, no aprobación académica ni cambio del banco.

## Evidencia consultada
- **PHUMA/UNAH**, `GUIA-PRE-U-UNAH-2026.pdf`, pág. impresa 6: categorías Aritmética, Álgebra, Geometría, Estadística y probabilidad. Ejemplos impresos 17–26: MCD contextual, modelación con triángulo, ecuaciones, paralelas y transversal con marcas de ángulos, esfera de diámetro señalado, gráfico de fajas. Práctica impresa 53–60: gráfico de barras de turistas, triángulos dibujados, figuras compuestas, tablas y cilindros con medidas. Los casos visuales **no son meras decoraciones**.
- **PAA/College Board** y **UNX** añaden plano cartesiano, gráficos de funciones, conjuntos, inecuaciones y figuras 3D como referencias *complementarias*, no como prueba de idéntica ponderación PHUMA.
- Código de M1: `src/lib/math-m1.ts` declara `MathModel.prompt:string`, `expected`, `options:string[]`, `assertions`, `steps`, `formula` y `oracle`; **no** tiene estímulo gráfico estructurado. `src/components/games/MathExerciseCard.tsx` representa `prompt` en `<h2>`, respuestas en botones y feedback textual; **no** representa figuras, rectas, tablas ni gráficos. `src/routes/matematicas.tsx` reutiliza estas tres modalidades y 10 rondas. `docs/matematicas-m1-cierre.md` reconoce 2.970 registros técnicos, 1.659 textos distintos, sin certificar independencia psicométrica.

## Diagnóstico por subtema y rediseño prioritario
La columna «visual» es una **necesidad de diseño candidata** a confirmar con la destreza del reactivo, no una afirmación de frecuencia real en PHUMA. No se elimina el cálculo simbólico correcto.

| Tema | Subtemas del catálogo M1 | Validez del modo actual | Representación o juego a añadir/ajustar |
|---|---|---|---|
| Aritmética | Operaciones, Potencias, MCD y MCM | Parcial: cálculo y variantes, poca diversidad de contexto | problemas de aplicación, representación simbólica/numérica y selección de estrategia |
| Aritmética | Fracciones, Porcentajes, Proporciones | Parcial; subrepresenta lectura de razones y partes | fracciones de área, barras proporcionales, tablas; `Interpretar proporción` |
| Álgebra | Ecuaciones, Sistemas de ecuaciones, Ecuaciones cuadráticas | Parcial; predominio del valor numérico | escoger modelo de contexto, representar soluciones y verificar restricciones |
| Álgebra | Sucesiones, Patrones algebraicos | Parcial | patrones figurales, tablas de valores, `Inferir regla` |
| Álgebra | Funciones | **Insuficiente** si se busca interpretación de representaciones | plano cartesiano, gráfica-tabla-expresión, variación y pendiente; `Interpretar función` (catalogada como complementaria si la guía oficial no establece el mismo alcance) |
| Álgebra | Inecuaciones | **Insuficiente** | recta numérica con extremo abierto/cerrado, intervalos, elección de solución; `Representar intervalo` |
| Geometría | Áreas y perímetros, Ángulos, Pitágoras, Sólidos: área y volumen, Semejanza | **Insuficiente para razonamiento visual** | triángulos/ángulos/paralelas, figuras compuestas, sólidos acotados, `Analizar figura` y `Resolver desde diagrama` |
| Estadística y probabilidad | Promedios, Dispersión de datos | Parcial | conjuntos de datos, tablas y comparación de variabilidad |
| Estadística y probabilidad | Probabilidad | Parcial | diagramas de casos, urnas, espacios muestrales; con o sin figura según destreza |
| Estadística y probabilidad | Tablas y gráficas | **Insuficiente** | tablas, barras y líneas con escalas, series y unidades; `Leer gráfica` y `Comparar datos` |

**Hallazgo transversal de modalidades:** `clasificar` pide tres decisiones V/F sobre proposiciones de una misma solución; `construir` pide dos elecciones de pasos numéricos; `quiz` elige entre cuatro resultados. Ninguna, como actualmente está implementada, solicita necesariamente leer una representación visual; pueden mantenerse para habilidades concretas, pero no cubrir por sí solas todas las formas de evaluar razonamiento visual. El número fijo de tres juegos por subtema **no** es una restricción curricular.

## Riesgos y contabilidad separada
| Medida | Valor/estado |
|---|---|
| Inventario técnico M1 | 2.970 IDs en 198 celdas (22 subtemas × 3 modos × 3 niveles) |
| Formatos de entrada estructurados en `MathModel` | Solo texto y opciones; **0 tipos visuales estructurados** |
| Estímulos gráficos auténticos en el componente actual | **0 renderizadores de gráficos/diagramas** |
| Preguntas pedagógicamente independientes certificadas | Desconocido / no acreditado |
| Reactivos que requieren comprensión gráfica y han sido certificados | Desconocido; no atribuir cero absoluto a habilidades que podrían resolverse textualmente |
| Estado M1 | Técnico terminado; pertinencia curricular/visual **pendiente de mejora y validación** |

## Primer corte de trabajo exigido antes de ampliar M2
1. Definir matriz completa `competencia × subtema × nivel × representación × mecánica`, con evidencia de fuente por celda; no fijar porcentajes arbitrarios de visualidad.
2. Introducir contrato tipado de estímulos semánticos, renderizador SVG universal para geometría (paralelas/transversales, ángulos, triángulos y sólidos), estadística (barras/tablas) y álgebra (recta de intervalos, plano cartesiano/función).
3. Rediseñar **ejercicios originales** que requieran leer la imagen; probar aciertos y distractores con oráculos matemáticos independientes. En geometría nunca depender de medidas estimadas de la apariencia.
4. Seleccionar por competencia la mecánica más apropiada, con decisiones `mantener/rediseñar/sustituir/retirar`. Probar diez rondas aptas, rotación, registro e interfaz accesible.
5. Exigir puertas G0–G5 de `docs/norma-validez-estimulos-visuales.md`: pruebas de renderizado, accesibilidad, estados móviles, mutaciones del gráfico, CI success y Render live del SHA final. Mantener la revisión docente pendiente separada.
6. Recalcular la cobertura según ejercicios *aptos*. No ampliar a 20/35/45 (M2) las celdas con fallo del constructo o formato esencial hasta rehabilitarlas, documentando explícitamente el déficit.

**Decisión de auditoría:** No continuar por inercia a la generación masiva M2. Procede una **rehabilitación pedagógica y visual M1** previa o coordinada con M2; el objetivo es que los juegos midan habilidades de razonamiento y no acumulación de variantes de la misma operación.
