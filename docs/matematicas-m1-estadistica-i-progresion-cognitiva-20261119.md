# Matemáticas M1 — rehabilitación cognitiva de Estadística I

Fecha: 2026-11-19. Estado: implementación técnica en revisión CI; revisión docente y comprobación visual manual pendientes.

## Defecto encontrado
Las seis habilidades del Laboratorio de Estadística I mantenían la misma pregunta y operación en todos los niveles; solo se modificaban conteos y valores. Eso no acredita dificultad creciente ni diversidad cognitiva. La guía PRE-U UNAH 2026 incorpora interpretación de tablas/gráficas y dispersión; probabilidad elemental es práctica **complementaria**, no exigencia oficial afirmada.

## Intervención sobre los 216 registros existentes

| Competencia | Básico | Intermedio | Avanzado |
|---|---|---|---|
| Barras | Comparar jueves y lunes | Comparar dos diferencias entre pares de barras | Modificar dos valores y calcular balance entre dos grupos de días con signo |
| Líneas | Cambio febrero→marzo | Interpretar variación neta enero→abril | Alterar febrero y abril, recalcular variación firmada |
| Moda | Identificar frecuencia máxima | Comparar frecuencia modal con frecuencia del tercer valor | Calcular mínimo de nuevos datos para que el tercer valor sea moda única |
| Rango | Máximo menos mínimo | Recalcular tras excluir el valor mínimo | Filtrar los dos extremos, transformar el mayor restante y recalcular |
| Mediana | Localizar observación central | Incorporar una observación extrema y reevaluar mediana | Suprimir todas las observaciones modales, añadir dos máximas y reevaluar |
| Probabilidad | Fracción de fichas rojas | Suceso complementario (no roja) | Probabilidad condicionada de segunda roja tras extracción sin reemplazo |

Los niveles superiores cambian el enunciado, la operación evaluada, la solución y los distractores. Los niveles Básicos conservan los oráculos anteriores. Los cambios se aplican a los mismos datos que se muestran en los diagramas originales: ninguno de los enunciados oculta otra muestra externa.

## Contratos y límites
- Se conservan los 216 IDs `math-stats-v1` (72 por nivel, 12 por destreza/nivel), diez rondas, rotación, historial y accesibilidad de SVG/tablas.
- `src/lib/statistics-i-cognitive-challenges.ts`: oráculos nuevos de niveles 2 y 3 y alternativas comprobadas por equivalencia racional cuando corresponda.
- `src/lib/statistics-visual-lab.ts`: metadatos `cognitiveStage`, `operation`, `requiredEvidence`, tareas dependientes del nivel.
- Pruebas de 216 casos, regresión de distractores, pruebas negativas modificando datos, seis triples de operaciones, fracciones simplificadas y correcta referencia de unidades.
- Todavía no se ha validado dificultad **empírica** ni discriminación psicométrica. Las transformaciones avanzadas son hipotéticas y se declaran explícitamente, sin confundir el gráfico original con los datos transformados.

## Siguiente prioridad
El banco general `math-m1.ts` (2.970 registros, 22 subtemas × tres modos × tres niveles) sigue pendiente de una rehabilitación transversal de validez de modos y progresión cognitiva por familia. Una futura corrida no debe limitarse a añadir etiquetas o reemplazar números; habrá que determinar si `clasificar`, `quiz` y `construir` evalúan habilidades distintas, rediseñarlas cuando corresponda, y exigir un oráculo independiente. Mantener la revisión docente abierta y no afirmar certificado académico.

Cierre técnico condicionado a CI del PR SUCCESS, CI final de main SUCCESS y Render Live del mismo SHA.
