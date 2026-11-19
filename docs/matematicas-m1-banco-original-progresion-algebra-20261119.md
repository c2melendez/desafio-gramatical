# M1 Matemáticas — Banco original: primera rehabilitación del razonamiento y las mecánicas

Fecha: 2026-11-19. **Cobertura de esta intervención: 2 de 22 subtemas** (Ecuaciones y Sistemas de ecuaciones), 270 registros originales (dos subtemas × tres modos × [10+15+20]). **Sin nuevos IDs**. Ninguna otra celda se declara rehabilitada.

## Problema reproducible
En `src/lib/math-m1.ts`, la función `compute` genera un único cálculo por subtema y la capa `mathModel` lo envuelve en tres modalidades. Antes de esta intervención, `clasificar` ofrecía una afirmación del resultado correcto y dos variantes incorrectas; `construir` elegía un subtotal y luego exactamente la misma respuesta final del Quiz. Asimismo, Básico, Intermedio y Avanzado en Ecuaciones y Sistemas variaban sobre todo parámetros, no la operación cognitiva. La auditoría numérica `scripts/audit-math-m1.mjs` había verificado exactitud, pero esa verificación no demuestra independencia de métodos, dificultad ni validez docente.

## Rediseño ejecutado
- **Ecuaciones**
  - Básico: aislar x en ax+k=b.
  - Intermedio: comprender el cambio de solución cuando b aumenta en 3a y resolver la nueva ecuación; se debe interpretar y transformar el modelo.
  - Avanzado: cambiar simultáneamente el coeficiente a −a y el término independiente a k+2a, manteniendo b; justificar el signo y recalcular x.
- **Sistemas de ecuaciones**
  - Básico: eliminar y por suma en x+y=s, x−y=d.
  - Intermedio: invertir el signo del término derecho de la segunda ecuación y resolver el nuevo sistema (no asumir la misma solución).
  - Avanzado: incrementar en 4 el lado derecho de la primera ecuación y reducir en 2 el de la segunda; transformar ambas ecuaciones antes de eliminar.
- **Clasificar:** evaluar la validez de **tres procedimientos conceptualmente distintos** (resta/suma y signo de coeficiente, o eliminación por suma/resta), no tres cifras finales.
- **Quiz:** resolver la ecuación o sistema correspondiente a la condición indicada, con cuatro resultados candidatos.
- **Construir:** seleccionar primero una cantidad **intermedia causal** (término aislado o 2x), después la solución. Conserva la mecánica de dos decisiones/una ronda.
- `corePedagogy` conserva oráculos aritméticos con `inputs` **del modelo transformado**; el auditor independiente reconstruye x=(b−k)/a o x=(s+d)/2. Ningún resultado nuevo depende de un texto sin comprobación numérica.
- Nuevos metadatos para estas celdas: `cognitiveStage`, `operation`, `requiredEvidence`, `modeOperation`. Los 2.700 registros restantes mantienen la lógica existente, sin atribuirles aprobaciones implícitas.

## Controles objetivos
- Prueba exhaustiva de **270 registros**: IDs, tres niveles cognitivos, oráculos independientes, cuatro respuestas únicas, tres afirmaciones con exactamente una verdadera, pasos intermedios, explicaciones y fórmulas coherentes.
- Pruebas negativas sobre mutaciones del coeficiente y de las dos restricciones del sistema.
- Pruebas reales de la interfaz de Clasificar y Construir.
- Sin cambio al inventario de 2.970 IDs, historial, rotación ni duración de diez rondas.
- La validez curricular se delimita por la guía PRE-U UNAH 2026, pág. impresa 6, y el banco sigue marcado `editorial-draft`. Revisión docente y pruebas manuales móvil/escritorio pendientes.

## Matriz de pendiente
Quedan **20 de 22 subtemas del banco original** sin rehabilitación cognitiva transversal: Operaciones, Fracciones, Porcentajes, Proporciones, Potencias, MCD y MCM, Sucesiones, Funciones, Ecuaciones cuadráticas, Inecuaciones, Patrones algebraicos, Áreas y perímetros, Ángulos, Pitágoras, Sólidos, Semejanza, Promedios, Probabilidad, Dispersión de datos y Tablas y gráficas. El hecho de que algunas celdas tengan SVG esenciales no basta para aprobar su diversidad cognitiva. Avanzar por familias y corregir la mecánica, no multiplicar parámetros o IDs. Antes de cerrar: CI PR SUCCESS + CI main SUCCESS + Render Live mismo SHA. M2 no se habilita por esta entrega.
