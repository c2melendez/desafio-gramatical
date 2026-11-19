# M1 Estadística: diversidad visual y dispersión (19-11-2026)

## Pertinencia curricular
La guía `GUIA-PRE-U-UNAH-2026.pdf`, pág. impresa 6, menciona **medidas de dispersión de datos** e **interpretar tablas, gráficas y figuras**. El laboratorio II refuerza esas competencias con una mecánica adicional, sin atribuir proporciones de reactivos ni afirmar equivalencia oficial. Las tablas cruzadas son ampliación complementaria.

## Componentes implementados
- `/laboratorio-estadistica-ii`: independiente del laboratorio anterior; mantiene diez rondas, tres niveles, rotación, puntaje e historial.
- Diagramas de puntos de dos distribuciones (ocho observaciones por grupo) para calcular rango intercuartílico usando medianas de las mitades y comparar dispersión.
- Gráfico de sectores con áreas proporcionales a datos, etiquetas y conteos, para inferir porcentajes.
- Tabla cruzada HTML con encabezados por fila y columna para calcular porcentaje condicionado por columna, distinguiéndolo de porcentaje general.
- Generador `statistics-visual-advanced.ts`: 216 IDs originales (72 por nivel, 18 por competencia), opciones únicas y oráculos independientes; tests para modelos negativos, ángulos proporcionales, cuartiles y porcentajes condicionados.
- Se preservan las 216 actividades originales de Estadística I y los identificadores de los otros bancos, y se enlaza el nuevo laboratorio desde el selector.

## Contratos y límites
- 216 registros **parametrizados**, no 216 situaciones psicométricas independientes. Ningún reactivo oficial reproducido.
- El nivel aumenta variación numérica, pero **no se ha acreditado progresión cognitiva real**; la inspección docente deberá comprobar mayor exigencia de interpretación y diversidad de errores plausibles.
- No queda cubierta la dispersión integral (varianza, desviación estándar, coeficiente de variación) ni comparaciones contextualizadas con escalas diferentes.
- Los datos en el gráfico son esenciales; si se eliminan, no se obtiene la clave desde el enunciado.
- La normalización visual transversal exige semántica accesible, unidades correctas, escalas causales, al menos cuatro distractores únicos y prueba negativa de oráculo. Se mantienen pruebas de regresión y contratos de M0.
- Antes del cierre técnico: PR CI SUCCESS, CI de main SUCCESS y Render Live del mismo SHA. La inspección manual móvil y la revisión académica humana continúan pendientes y no deben bloquear implementación de otros módulos, pero sí el certificado de validez curricular.
