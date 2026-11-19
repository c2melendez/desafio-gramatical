# Auditoría M1 — progresión cognitiva verificable y plan de rehabilitación
Fecha: 2026-11-19. Estado: **parcialmente implementada, sin acreditación docente**.

## Hallazgo principal
Del examen del código de los juegos se desprende que las distintas dificultades se obtienen mayoritariamente modificando semillas o magnitudes. La presencia de tres etiquetas (Básico, Intermedio, Avanzado) **no demuestra** operaciones cognitivas diferentes. No deben usarse 30/50/70 como sustituto de una matriz de competencias cognitivas.

| Familia auditada | Mecanismo de dificultad anterior | Evidencia de progresión conceptual | Decisión |
|---|---|---|---|
| Matemáticas original `math-m1.ts` (22 subtemas, tres modos) | `difficulty` cambia coeficientes, constantes y otras cifras | Insuficiente, salvo variaciones de operaciones y casos entre semillas; modos muy similares | **Rediseñar** por competencias |
| Funciones I `function-graph-lab.ts` (6 destrezas) | Desplaza o selecciona puntos, mantiene la misma consigna por habilidad | No acreditada | Mantener trazos y oráculos; **reescribir** secuencias cognitivas |
| Funciones II `function-graph-advanced.ts` (8 destrezas) | Mismo tipo de pregunta, cambia parábola o salto | No acreditada | Rediseñar avanzada para combinar propiedades |
| Geometría `geometry-visual-lab.ts` (4 destrezas) | Cambian ángulos y medidas, mismo cálculo | No acreditada | Pasar de identificación de relación a justificar y conectar varias relaciones |
| Estadística I `statistics-visual-lab.ts` (6 destrezas) | Cambian valores de barras, líneas, frecuencias y colores | No acreditada | Progresión: lectura, inferencia, decisión contextual |
| Estadística II `statistics-visual-advanced.ts` (4 destrezas) | Antes solo cambian valores | **Intervención implementada y verificada por pruebas automatizadas** | Progresión 1–2–3, sin cambiar IDs |

## Nueva especificación de dificultad
- **Básico / etapa 1**: identificar datos, concepto y representación; una operación coherente y directa, sin distractores puramente arbitrarios.
- **Intermedio / etapa 2**: interpretar múltiples elementos, elegir las operaciones apropiadas, conectar resultados y explicar al menos una comparación.
- **Avanzado / etapa 3**: transformar el escenario, analizar consecuencias, manejar condiciones/cambio de referente o combinar dos o más inferencias; un número más grande no equivale a mayor dificultad.
- Cada ejercicio debe guardar `cognitiveStage`, `operation`, `requiredEvidence`, `visualRequirement`, `source`, `reviewStatus` (cuando corresponda). No se otorga aprobación automática por esa etiqueta; también hay que comprobar distractores y diversidad semántica.

## Aplicación funcional: Estadística II
En las cuatro destrezas se conservan 72 IDs por nivel, total 216, y cambian las preguntas, las soluciones y las explicaciones:

| Destreza | Básico | Intermedio | Avanzado |
|---|---|---|---|
| Cuartiles | IQR del grupo A | Diferencia de IQR de dos grupos | Porcentaje de incremento relativo del IQR A frente a B |
| Comparar dispersión | Elegir grupo con mayor IQR | Diferencia absoluta de IQR | Recalcular la comparación después de duplicar todos los valores de B |
| Sectores | Porcentaje del sector Lectura sobre total | Porcentaje conjunto de Lectura y Arte | Porcentaje condicionado a excluir Deportes |
| Tablas cruzadas | Porcentaje del grupo A en Lectura | Porcentaje de B en Deportes | Diferencia entre dos porcentajes condicionados, en puntos porcentuales |

**Oráculos:** `src/lib/math-cognitive-progression.ts` calcula de forma determinista respuestas para cada nivel. Las pruebas exigen que cambie la operación y consigna por nivel y verifican distractores únicos, clave, evidencia y explicaciones para los 216 casos. La revisión matemática automatizada no certifica dificultad empírica ni validez psicométrica.

## Bloqueos y siguientes objetivos
1. Repetir rehabilitación del constructo en Matemáticas original, Funciones I/II, Geometría y Estadística I: **todos abiertos**, sin declarar conformidad por una prueba de conteo.
2. Auditar niveles con docentes y muestras reales: tiempo, claridad, discriminación y lectura de la gráfica; no atribuir propiedades psicométricas por impresión.
3. Generar informes automáticos por `habilidad × operación × nivel`; **CI debe impedir regresiones** a la misma operación para los casos rehabilitados.
4. Mantener 10 rondas, historial, fuente por ejercicio y accesibilidad; una revisión de M1 no debe aumentar artificialmente el inventario ni romper los IDs.
5. Integrar solamente con CI aprobado y comprobar Render Live del mismo SHA. La revisión docente queda pendiente, separada del avance técnico.

**Conclusión:** esta entrega **inicia y aplica** una progresión cognitiva real sobre Estadística II, pero NO certifica globalmente M1 ni habilita M2 por sí sola.
