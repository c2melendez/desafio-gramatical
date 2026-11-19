# M1 Matemáticas — Laboratorio de Estadística y Probabilidad visual

Fecha: 2026-11-19 · Fase de rehabilitación curricular M1, sin abrir M2.

## Fuente primaria y delimitación de competencia
La guía oficial `GUIA-PRE-U-UNAH-2026.pdf`, pág. impresa 6, identifica **medidas de dispersión de datos** e **interpretar tablas, gráficas y figuras** entre las competencias de Estadística y probabilidad. Por ello se prioriza leer la representación para realizar comparaciones, medidas y decisiones. La extracción equiprobable de fichas queda expresamente etiquetada como **complemento formativo**, sin atribuir frecuencia de aparición oficial. No se copian imágenes ni reactivos oficiales.

## Desarrollo realizado
- Ruta independiente `/laboratorio-estadistica?nivel=intermedio`, visible desde el tema Estadística y probabilidad.
- Estímulos originales: gráficos de barras de 4 días; gráficos de líneas en 4 meses; tablas de valores y frecuencias; espacio muestral visual de fichas rojas y azules.
- Seis habilidades: diferencia de barras, cambio entre dos puntos de una línea, moda, rango de los datos, mediana de frecuencias, probabilidad equiprobable. El rango se calcula a partir de valores observados y no se confunde con rango de la función del laboratorio algebraico.
- `src/lib/statistics-visual-lab.ts` define datos, oráculos separados, distractores y explicación por respuesta. **216 registros técnicos originales** (72/nivel, 12/habilidad/nivel), sin alterar IDs de los bancos matemáticos anteriores.
- Seis competencias representadas por sesión de diez rondas (cuatro habilidades con dos repeticiones), puntuación, rotación e historial guardados.
- `src/components/games/StatisticsVisual.tsx` representa SVG con escala y texto alternativo, una tabla real con encabezados accesibles y figuras de espacio muestral.
- Pruebas: unicidad de cuatro alternativas, comparación entre clave y oráculo en los 216 casos, detectar fracciones equivalentes en distractores probabilísticos, mutaciones negativas, representación de los cuatro formatos, navegación/10 rondas.

## Límites pedagógicos visibles
- Los 216 registros son ejemplos parametrizados **no demostrados psicométricamente independientes**.
- Solo un subconjunto del tema estadístico está cubierto: falta comparar dos distribuciones, dispersión absoluta y relativa, diagramas de sectores, gráficos agrupados, tablas cruzadas y elección de métodos. Las tablas y gráficos deben servir al constructo, no añadir decoración.
- Los ejercicios de probabilidad con fichas se consideran complementarios y no sustituyen las competencias explícitas de la guía.
- La revisión docente y la inspección manual real en dispositivos móviles/escritorio siguen pendientes. La implementación no acredita M1 completo ni autoriza la producción masiva M2 sin puertas G0–G5.

## Contrato de entrega
Solo fusionar cuando CI del PR apruebe, verificar CI de `main` y Render Live del mismo SHA. Mantener historial, las diez rondas y las auditorías existentes; no alterar las rutinas de Español ni los módulos anteriores.
