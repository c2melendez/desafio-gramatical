# Matemáticas M1 — Laboratorio de Gráficas II (ampliación de modelos)
Fecha: 2026-11-19 · Estado: candidato a pruebas CI y despliegue Render. Revisión académica pendiente.

## Propósito pedagógico
No replicar mecánicas de Desafío Gramatical por inercia: seleccionar primero la competencia gráfica y luego el tipo de ejercicio. La guía PRE-U UNAH 2026, pág. impresa 6, incluye ecuaciones cuadráticas, inecuaciones y patrones algebraicos, e interpretación de tablas y figuras; **no enumera expresamente** cada modalidad de dominio, rango, monotonía, límites laterales o continuidad. Por eso se etiquetan como **práctica complementaria**, nunca como exigencia o ponderación oficial.

## Nuevo juego
- Ruta independiente: `/laboratorio-funciones-ii?nivel=intermedio`.
- Enlace en Matemáticas → Álgebra → Funciones, junto al laboratorio original.
- Ocho destrezas distribuidas en 10 rondas: vértice, rango de parábola, dos raíces/intersecciones, crecimiento de parábola, valor en discontinuidad, límite izquierdo, continuidad y rango con extremo abierto.
- Nuevas familias: `quadratic` (parábola sobre dominio finito cerrado con vértice exacto y dos raíces), `jump` (dos segmentos lineales: círculo izquierdo abierto, derecho cerrado en x=0; distingue continuidad de salto).
- Inventario: **96 IDs técnicos por nivel** × 3 niveles = **288 registros nuevos**, 12 por destreza y nivel. Se cuentan **separadamente** de las 216 tareas anteriores y de los 2970 IDs M1 históricos; no equivalen a 288 problemas psicométricamente independientes.
- SVG cartesiano a escala, descripción accesible del estímulo, ejes, marcas, círculos de apertura/cierre y cotas. No se incluyen preguntas sobre dominios infinitos ni curvas racionales (futuras fases).
- Oráculos funcionales `extendedOracle` y opciones con unicidad explícita; prueba de los 288 registros, mutaciones de parámetro, intervalos semicerrados, continuidad y navegación real de route. La respuesta no se deduce de una fórmula textual del enunciado.
- Sesión de diez rondas y seis/ ocho destrezas: se cubren **las ocho** por sesión, más dos adicionales mediante rotación. Preserva historial, puntajes y acceso de vuelta. Los nuevos IDs usan el prefijo `math-graph-v2` y un subtema propio en el historial.

## G0–G5 y pendientes
M1 no obtiene certificación académica con CI: comprobar validez visual humana, dispositivo móvil y escritorio, contraste de los trazos, profundidad de distractores y variedad de familias. Pendiente representar intervalos no acotados, puntos aislados, asíntotas y transformación de funciones; en otras áreas de M1 permanecen figuras compuestas, paralelas/transversales y diversidad estadística. No avanzar a M2 masivo hasta completar la matriz de pertinencia curricular y los controles docentes pendientes o dejar esos controles claramente abiertos.

La ampliación no modifica las preguntas históricas, registros del primer laboratorio, juegos gramaticales, historial, ni rutas de otras áreas.
