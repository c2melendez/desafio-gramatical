# Norma transversal v5.5 — validez del constructo y estímulos visuales
Fecha: 2026-11-18. Estado: **obligatoria para diseñar y auditar módulos nuevos**. Implementación técnica del motor de estímulos: **pendiente**. Complementa `docs/norma-paridad-visual.md` y el sistema maestro `Sistema_modulos_Academia_PHUMA_Play.md` (Biblioteca, v5.5).

## Principio rector
La capacidad que se pretende medir prevalece sobre el número de ejercicios y sobre los juegos iniciales `clasificar / quiz / construir`. Si el juego no fuerza la interpretación, modelación o cálculo correcto, se sustituye o rediseña; una mecánica no puede aprobarse solo porque genera 10 rondas. La cuota 30/50/70 corresponde a ejercicios **aptos**, no a registros técnicos. Preservar interfaz, estilo, 10 rondas, historial, accesibilidad y los identificadores históricos.

## Fuentes y prioridad
- Primaria: CEI-TEST/UNAH, *GUIA-PRE-U-UNAH-2026.pdf*, pág. impresa 6 (competencias), ejemplos impresos 17–26 (en particular figuras de paralelas, sólido esférico, gráfico de fajas) y práctica impresa 53–60 (barras, triángulos, figuras, sólidos y tablas). Página institucional: https://admisiones.unah.edu.hn/guia-de-estudio-para-la-phuma/ .
- Complementarias no equivalentes: PAA/College Board, temario UNX, simulador Pronasa y otros proyectos de práctica. PHUMA oficial: 120 preguntas, 30 de Matemáticas, cuatro opciones, una única respuesta; **no** trasladar respuestas producidas de PAA como obligación de PHUMA.
- Cada ejercicio original debe documentar: fuente, edición, página, habilidad, subtema, modalidad, tipo de estímulo, datos, oráculo, distractores, respuesta y justificación. No reproducir sin permiso los reactivos del material protegido.

## Contrato de representación
Tipos: `texto-contextual`, `expresion`, `tabla`, `barras`, `lineas`, `plano-cartesiano`, `funcion`, `recta-intervalos`, `geometria-2d`, `solido-3d`, `conjuntos`, `figura-compuesta`. Por ejercicio registrar `visualRequirement: essential | supporting | none`; no inventar proporciones fijas, pero un estímulo **esencial** ausente es `NO_APTO`.

Render determinista desde un objeto `visual` con ejes, escala, unidades, puntos, extremos, relaciones, cotas y leyendas; SVG semántico o tecnología con la misma fidelidad, alternativa textual accesible que **no revele la clave**. Las marcas abiertas/cerradas, paralelismo, diámetro/radio, alineación y escalas son parte de la verdad del ejercicio. Evitar imágenes decorativas y gráficos que se puedan ignorar sin perder información.

Aplicar contraste, diseño móvil, foco/teclado, zoom, SSR, navegadores, tamaño táctil y pruebas de imagen en móvil/escritorio. Para geometría no a escala, indicarlo; no evaluar medición de píxeles sobre dibujos esquemáticos.

## Elegir mecánicas por competencia
- Aritmética: operación correcta, lectura de tablas de razones/proporciones y problemas reales; clasificar solo si exige argumentar un criterio aritmético, no juzgar tres reformulaciones de la misma solución.
- Álgebra: plantear modelos, interpretar función (cuando pertinente), asociar tabla-gráfico-expresión, representar desigualdades en recta y elegir solución; juegos candidatos `Elegir el modelo`, `Representar intervalo`, `Interpretar función`.
- Geometría: `Analizar figura`, `Razonar con ángulos`, `Medir y resolver` en diagramas con medidas reales de origen de datos; no sustituir el dibujo por una descripción que regale la relación espacial.
- Estadística/probabilidad: `Leer gráfica`, `Comparar distribuciones`, `Interpretar tabla`, probabilidades ligadas a espacio muestral.
- Se permite sustituir, renombrar, eliminar y fusionar juegos; documentar `mantener|rediseñar|sustituir|retirar`, motivo y alternativa sin romper IDs/historial.

## Puerta G0–G5
- **G0** FUENTE: competencia, edición y formato trazables; PHUMA separada de PAA.
- **G1** CONSTRUCTO: resolver requiere capacidad pretendida; no pistas ordinales, de posición ni de formato.
- **G2** VISUAL: si el recurso es esencial, está presente, correcto, legible y es necesario para responder; el oráculo valida sus datos.
- **G3** RESPUESTAS: única clave, tres distractores plausibles, oráculo independiente, explicaciones causales de errores; mutantes negativos.
- **G4** EXPERIENCIA: 10 rondas aptas, dificultad genuina, móvil, accesibilidad, retorno, estado e historial.
- **G5** EVIDENCIA: matriz competencia × modalidad × formato × nivel, auditoría por ID, captura de cada tipo de diagrama y pruebas de visual/SSR, CI SUCCESS, Render Live mismo SHA. Revisión docente pendiente se declara separada.
Una falla G0–G4 vuelve el ejercicio `NO_APTO`. Registro técnico y ejercicio apto no son equivalentes; no exigir sustitución arbitraria si una habilidad es simbólica y no necesita gráficos.

## Puerta especial M1 → M2
El M1 de Matemáticas está **completado técnicamente** (2.970 registros, 22 subtemas, 198 celdas); su **adecuación pedagógica/visual requiere reconstrucción y evaluación**. Antes de ampliar esas celdas en M2: 1) caracterizar las habilidades; 2) diseñar esquemas de datos/renderer; 3) implementar prototipos auténticos en geometría, estadísticas y desigualdades/funciones; 4) pasar G0–G5; 5) rediseñar o sustituir juegos fallidos; 6) recalcular solo ejercicios aptos y documentar déficits. No adelantar porcentajes de cobertura psicométrica inexistentes ni declarar certificación docente.

**Transversal:** las próximas áreas deberán derivar los medios de estímulo de su competencia específica: tablas/gráficos de lectura en Español, diagramas experimentales en Ciencias Naturales, mapas y cronologías en Sociales, y escenarios razonados en Habilidades Blandas. No todas las materias necesitan objetos visuales, pero la revisión explícita del formato sí es obligatoria.
