# Avance parcial: gramática y semántica

## Alcance

El siguiente grupo de la hoja de ruta comprende Sinónimos y antónimos, Cohesión y coherencia y Morfosintaxis. Los tres parten de cero en la cobertura jugable. La meta actual es completar en este bloque el núcleo de 405 ejercicios: 135 por subtema, repartidos en tres juegos con 10/15/20 por dificultad y juego. Había 45 ejercicios jugables al aprobarse la nueva meta, por lo que faltaban 360.

## Avance en curso

Se prepararon 99 preguntas originales de selección única, treinta y tres por subtema: 10 básicas, 11 intermedias y 12 avanzadas, en `src/lib/grammar-next-draft.ts`, `src/lib/grammar-extra-block.ts` `src/lib/grammar-extra-405.ts` y `src/lib/grammar-extra-nucleo.ts`. Cada una tiene contexto, cuatro alternativas, clave, explicación e identificador estable. Todas son borradores editoriales. En intermedio se prioriza la aplicación en contexto como aproximación editorial a PHUMA; no está calibrada estadísticamente.

**Estos 99 borradores están disponibles en la modalidad de selección única**, con 10/11/12 por subtema y nivel, retroalimentación, rotación y registro de resultados. Se cuentan únicamente en esa modalidad. Clasificación y construcción permanecen en desarrollo. Los 99 siguen sujetos a revisión docente; no representan 99 ejercicios por cada juego. Pendiente: elaborar el resto de contenido original de las tres mecánicas, verificar opciones y posibles respuestas alternativas, completar las otras dos mecánicas y ampliar sus bancos, revisar las interacciones y ampliar las pruebas de contenido.

El grupo permanece abierto. Aunque el commit que contiene este borrador apruebe CI y Render llegue a Live, eso no completa la corrida de 405 ejercicios. Se deberá verificar auditoría, CI y despliegue Live del mismo commit una vez que el bloque completo esté integrado.

## Ampliación parcial de selección única

Se agregan 36 preguntas originales (4 intermedias y 8 avanzadas por subtema) en `grammar-completion-quiz.ts`. Los tres subtemas alcanzan 10/15/20 en selección única: 135 en total, incluidos los 99 existentes. Las preguntas son borradores editoriales pendientes de revisión docente y no equivalen a una calibración PHUMA. Faltan 270 ejercicios originales: 45 de clasificación y 45 de construcción en cada uno de los tres subtemas, además de integrar ambas mecánicas. El bloque sigue abierto; esta ampliación no constituye la corrida de 450 desde cero.

## Preparación de modalidades pendientes

Se añadieron componentes reutilizables de clasificación y construcción y validadores de datos y respuestas, con casos de prueba. No están conectados al menú ni incluyen bancos de producción: **siguen pendientes los 270 ejercicios** y la integración, auditoría editorial y prueba de las partidas. Los ejemplos de prueba no cuentan como contenido.

## Clasificación de sinónimos y antónimos

Se agregaron 45 actividades de clasificación de relaciones léxicas contextualizadas, con 10 básicas, 15 intermedias y 20 avanzadas. Están conectadas al menú, a la rotación por nivel y al historial. Cada actividad plantea una relación entre expresiones y explica la clasificación; permanecen en borrador editorial y requieren revisión docente. Tras esta aportación faltan **225 ejercicios** para el bloque: 45 de construcción en Sinónimos y antónimos y 90 en cada uno de Cohesión y coherencia y Morfosintaxis. Este avance parcial no completa el bloque ni inicia la corrida de 450.

## Clasificación de cohesión y coherencia

Se añaden 45 actividades que clasifican relaciones de causa, consecuencia, contraste y adición en contextos distintos (10/15/20). Están conectadas al menú, rotación e historial. Se trata de borradores editoriales: necesitan revisión docente de independencia conceptual y calibración de dificultad. Su cobertura se registra separadamente del juego de selección. Tras esta aportación hay 180 registros pendientes del primer núcleo del bloque: construcción en Sinónimos y antónimos y Cohesión y coherencia (45 cada uno), y clasificación y construcción en Morfosintaxis (90). No se considera cerrado el bloque ni se inicia la corrida de 450.
