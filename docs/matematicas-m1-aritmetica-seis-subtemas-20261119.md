# Matemáticas M1 — Rehabilitación cognitiva de seis subtemas de Aritmética
Fecha: 2026-11-19. Estado: intervención técnica con puerta CI / Render.

## Alcance y diagnóstico
Se rehabilitan seis subtemas del banco original: **Operaciones, Fracciones, Porcentajes, Proporciones, Potencias y MCD y MCM**, en tres modalidades y tres niveles. Son 6 × 3 × (10 + 15 + 20) = **810 registros existentes**, con IDs y conteos conservados. Los ejercicios anteriores compartían esencialmente la misma operación en todos los niveles y cambiaban cifras; Clasificar juzgaba variantes del resultado y Construir elegía el subtotal más la misma clave. Esta actualización modifica operaciones y procedimientos, no añade registros.

| Subtema | Básico (1) | Intermedio (2) | Avanzado (3) |
|---|---|---|---|
| Operaciones | Prioridad de paréntesis | Ajustar un sumando y un factor | Usar distributiva para cancelar términos |
| Fracciones | Sumar y simplificar | Invertir una suma para recuperar un sumando | Combinar multiplicación de fracción y sustracción |
| Porcentajes | Calcular porcentaje de un total | Determinar saldo después de descuento | Aplicar dos descuentos sucesivos sobre bases distintas |
| Proporciones | Precio unitario y regla de tres | Resolver la cantidad cobrada con bonificación de unidad | Duplicar unidades y descontar 10% del precio unitario |
| Potencias | Evaluar b^e | Usar producto de potencias de igual base | Combinar potencia de potencia y cociente |
| MCD y MCM | Calcular MCD o MCM | Deducir el complementario mediante MCD×MCM=a×b | Escalar ambos números y reevaluar el invariante solicitado |

## Modalidades y evidencia
- **Clasificar**: tres afirmaciones sobre un procedimiento/propiedad, exactamente una válida, dos errores conceptual o causalmente incompatibles. No confundir con simplemente marcar tres opciones numéricas del Quiz.
- **Quiz**: calcular el resultado del escenario, con cuatro alternativas diferenciadas.
- **Construir**: primero elegir un valor necesario (suma agrupada, denominador común, descuento parcial, precio unitario, potencia parcial o MCD) y luego el resultado.
- Metadatos: `cognitiveStage`, `operation`, `requiredEvidence`, `modeOperation`.
- `src/lib/math-m1-core-arithmetic.ts`: oráculos con racionales normalizados y entradas equivalentes al problema transformado. Se mantienen las reglas del auditor independiente: `(a+b)c`, `a/b+c/d`, `base*p/100`, `costo/cantidad*pedido`, `b^e`, y MCD/MCM.
- `src/test/math-m1-core-arithmetic.test.tsx`: 810 registros, claves recalculadas independientemente, invariantes de niveles, unicidad de opciones y afirmaciones, pruebas de transformación, y recorridos reales de Clasificar y Construir.
- El banco original sigue teniendo **2.970 registros**, sin modificaciones a los identificadores. El resultado acumulado, si esta entrega pasa CI y es fusionada, será **1.620 registros intervenidos en 12 de 22 subtemas**, con **1.350 registros de 10 subtemas** todavía pendientes.
- El contenido permanece en `editorial-draft`. La progresión formal de dificultad no implica validación empírica, equivalencia con reactivos oficiales, ni aprobación docente.

## Criterios de salida
La rama no se fusionará hasta pasar la batería integral de GitHub, incluidos oráculos globales y M0. Después de fusionar, comprobar CI SUCCESS del SHA exacto en `main` y despliegue Render Live del mismo SHA. La inspección docente, accesibilidad manual y móvil permanecen pendientes para certificación de calidad académica. La siguiente área a priorizar por contexto de resultados es Geometría/Estadística del banco original y, por separado, Sucesiones.
