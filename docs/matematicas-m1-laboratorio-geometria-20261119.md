# Matemáticas M1 — Laboratorio geométrico: figuras y relaciones (2026-11-19)

**Alcance:** tercera familia de juegos especializados de rehabilitación M1; contenidos originales, revisión docente pendiente. No constituye M2.

## Fuente inspeccionada
Guía `GUIA-PRE-U-UNAH-2026.pdf`, pág. impresa 6: geometría comprende ángulos, triángulos (perímetro y área), Pitágoras, sólidos (área y volumen). Ejemplo de pág. impresa 23: rectas paralelas atravesadas por una transversal, con incógnitas angulares que obligan a interpretar la figura; pág. 24: esfera y volumen. La actividad aquí creada **no reproduce** los números, la disposición ni las opciones del ejemplo oficial. Las figuras compuestas amplían la interpretación de perímetros y áreas sin reclamar aparición exacta en PHUMA.

## Implementación
- Nueva ruta `/laboratorio-geometria?nivel=intermedio`, desde la sección Geometría del selector.
- **Cuatro competencias:** (1) correspondientes; (2) suplementarios; (3) área de polígono en L por sustracción; (4) perímetro del contorno en L. Se trabaja con referencias geométricas, no mediante lectura de un texto que entregue la clave.
- Renderización SVG semántica, dibujada a partir de parámetros del mismo objeto que utiliza el oráculo: marcas de paralelismo, indicación de ángulo, cotas externas y recorte interior. Los diagramas son esquemáticos y **no a escala**; nunca se evalúa aproximar grados por apariencia.
- 72 ítems técnicos por nivel × tres niveles = **216 ítems** de IDs `math-geom-v1`, 18 por destreza y nivel. Ocho a diez rondas se distribuyen en la sesión: **10 rondas** con las cuatro destrezas presentes al menos dos veces.
- Los distractores reflejan errores concretos (confusión entre correspondiente/suplementario, área total sin sustraer recorte, unidades de área/perímetro). Cuatro alternativas distintas y solución de una sola clave.
- Preserva `GameSessionHeader`, 10 rondas, puntuación, accesibilidad básica, rotación e historial. No altera IDs ni valores de los bancos M1 ni de los laboratorios de funciones.

## Validaciones solicitadas
- Pruebas de **216** claves y unidades coherentes por tarea.
- Mutación de ángulo y medidas para demostrar dependencia causal de la figura; la mutación del recorte solo modifica el área, no el perímetro (propiedad matemática intencional).
- SVG accesible con texto alternativo, prueba de navegación enrutada y contrato M0 actualizado.
- CI del PR y de `main` aprobado, y Render Live del mismo SHA.
- Inspección visual real escritorio/móvil y revisión académica humana pendientes.

## Límite pedagógico
Esta iteración refuerza *interpretación de diagramas*, pero no certifica independencia psicométrica ni cubre geometría con transformaciones, ángulos de polígonos complejos, sólidos variados, figuras de regiones curvas o interpretación de escenarios reales. La propia guía orienta contenidos, no impone un tipo único de juego. La auditoría transversal G0–G5 permanece obligatoria.
