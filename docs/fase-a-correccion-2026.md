# Academia PHUMA Play — Fase A: núcleo de Corrección

**16 de noviembre de 2026.** Desarrollo incremental de contenido original para el subtema **Comunicación y Español → Redacción → Corrección**.

## Resultado técnico

Se incorporaron tres bancos originales, independientes entre sí, con **36 casos nuevos por juego**:

| Juego | Mecánica | Nuevos básicos | Nuevos intermedios | Nuevos avanzados | Total nuevo |
|---|---|---:|---:|---:|---:|
| Cazador de errores | Detectar y sustituir un fragmento incorrecto | 7 | 12 | 17 | 36 |
| Conector correcto / Corrección precisa | Completar una oración con la forma adecuada | 7 | 12 | 17 | 36 |
| Editor experto | Ordenar tres etapas de revisión textual | 7 | 12 | 17 | 36 |
| **Total** | | **21** | **36** | **51** | **108** |

Los bancos anteriores conservan **3 casos por nivel y juego**. Sumados a los 36 de cada mecánica, existen ahora **10 básicos, 15 intermedios y 20 avanzados por juego**. El núcleo de cantidad está completo para los tres juegos de Corrección y los tres de Conectores. No se han creado aún los 30/50/70 del objetivo definitivo.

### Actividades

- **Cazador de errores:** 36 enunciados con fragmentos señalados para corregir: acentuación, morfosintaxis, concordancia, precisión, referencias, puntuación y generalización. La aplicación presenta cuatro sustituciones posibles y la frase corregida.
- **Corrección precisa:** 36 enunciados independientes, cada uno con un espacio en blanco, cuatro opciones y fundamento de la forma correcta. Se reutiliza el motor de selección del juego llamado **Conector correcto** en el menú; la interfaz adapta su título dentro de la partida, evitando confundir la tarea con el uso de conectores.
- **Editor experto:** 36 secuencias originales de tres etapas de revisión de un texto: detección, comprobación y corrección. Las frases están ordenadas por una progresión narrativa o argumentativa verificable.

Esta división no significa que todas las actividades se hayan validado mediante pruebas con estudiantes. La clasificación de niveles es pedagógica y **no una dificultad psicométrica oficial**.

## Pruebas y auditoría

- `src/test/phase-a-content.test.ts` comprueba que el banco de Corrección contenga 108 reactivos nuevos, 36 por modalidad, con **7/12/17 nuevos por nivel**, IDs no duplicados, cuatro opciones diferentes y claves estructurales únicas.
- `src/test/correction-games-ui.test.tsx` comprueba la selección correcta, la retroalimentación de errores y el ordenamiento de secuencias en los tres niveles.
- `scripts/audit-content.ts` comprueba las metas 10/15/20 para **Corrección y Conectores** y el total de cobertura de la aplicación.
- La auditoría editorial identificó problemas en reemplazos de algunas frases inicialmente creadas y se corrigieron antes de consolidar la fase. **Las pruebas automáticas no detectan toda la ambigüedad gramatical o pedagógica.**

## Compatibilidad

El sistema de rotación `phuma-play:rotation:v1:` mantiene un historial independiente para cada subtema, juego y nivel, sin sobreescribir claves antiguas. La ruta `/redaccion`, el historial de juegos, los módulos de comprensión lectora y categorías gramaticales siguen operativos. No se requieren cuentas ni transferencia de datos a un servidor.

## Metas y límites

Alcanzar 45 registros por cada juego en el subtema **Corrección** equivale al núcleo **de cantidad** de 135 registros. El banco completo de Redacción consta de cinco subtemas, por lo que los otros tres subtemas de Redacción —**Organización textual, Elisión y adición, Generalización e integración**— aún deben ampliar sus tres juegos por nivel.

Antes de declarar un lote **validado pedagógicamente**, deberá pasar revisión docente de ortografía vigente, interpretación contextual, distractores plausibles, posibles respuestas múltiples, accesibilidad y pertinencia al currículo PHUMA. Los bancos nuevos llevan `reviewStatus:"editorial-draft"` y no deben presentarse como preguntas oficiales de la UNAH.

## Próximo objetivo

Desarrollar **Organización textual** con tres juegos y el núcleo de 10/15/20, sin reciclar las mismas situaciones como si fueran tres bancos de contenido independiente. Conservar las auditorías y las pruebas de la fase actual.
