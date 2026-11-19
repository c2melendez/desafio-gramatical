# M1 — Rehabilitación cognitiva del Laboratorio de Funciones I

Fecha: 2026-11-19. Nuevo objetivo de auditoría de progresión de dificultad.

## Problema comprobado
El laboratorio original de seis destrezas presentaba la misma pregunta por destreza a través de Básico/Intermedio/Avanzado; cambiaban coordenadas, pero no el tipo de razonamiento. Ese patrón no satisface el criterio de diversidad cognitiva. El curso de Matemáticas original y el Laboratorio de Funciones II aún requieren la misma intervención; esta fase **no** certifica todo M1.

## Cambios funcionales para los 216 registros existentes
- **Básico** (72 IDs): lectura directa de dominio, rango, intervalos crecientes/decrecientes y cruces con ejes a partir de gráfica por tramos.
- **Intermedio** (72 IDs): inferir las mismas seis propiedades después de una traslación horizontal o vertical: f(x−2), f(x)+3. Implica reconocer y transformar el sistema de referencia.
- **Avanzado** (72 IDs): componer cambios de escala del argumento, desplazamientos, reflexiones verticales, escalas verticales y evaluación compuesta: f(2x−2), 3−2f(x), −f(2x−2), 2f(x−1)+3. Se distinguen efectos horizontales y verticales y se verifican las propiedades en el dominio transformado.
- La forma visible de la gráfica **es f**, y el enunciado pregunta por la función transformada **g**; la consigna explicita esta relación. No se dibuja g fingiendo que es f.
- Se preservan todos los IDs, niveles, banco de 72 por nivel, rotación, historial y diez rondas.
- Metadatos por ejercicio: `cognitiveStage`, `operation`, `requiredEvidence`. Explicación y tres distractores distintos generados desde el mismo modelo; prueba de correspondencia exacta con el oráculo de transformación.
- Pruebas que exigen operaciones/consignas diferentes entre niveles por las seis destrezas, 216 claves, casos de transformación y evidencia. No acreditan por sí solas dificultad psicométrica.

## Pendientes y límites
- Otros cinco conjuntos señalados en `docs/auditoria-m1-progresion-cognitiva-20261119.md` siguen abiertos, especialmente Funciones II, Geometría, Estadística I y el banco original de 2.970 registros.
- Una gráfica por tramos de dos segmentos no cubre todas las funciones que podrían aparecer en la prueba. Diversificar dominios, continuidad, ecuaciones, contextos, propiedades de cuadráticas y estadística.
- El temario PRE-U UNAH 2026, página 6, no lista expresamente estas seis habilidades como destrezas independientes; se mantienen como práctica complementaria.
- Antes de cierre técnico: CI del PR y CI de `main` SUCCESS, Render Live mismo SHA. Revisión docente y prueba manual móvil pendientes, por separado.
