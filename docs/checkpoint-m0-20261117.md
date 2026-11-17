# M0: punto de recuperación — 17 de noviembre de 2026

Estado: EN_CURSO. Base `main` 14398e47a8644d694041f62cf800a956e0b5c2bf; rama de trabajo creada desde esa base. No se han añadido ejercicios ni cerrado módulos.

## Hechos observados

- El catálogo `src/lib/phuma-catalog.ts` declara 90 subtemas: español 21, matemáticas 22, naturales 19, sociales 20 y blandas 8. Tres modos por subtema producirían 270 combinaciones y 810 celdas de nivel, pero la elegibilidad real y la independencia no se han establecido. El máximo aritmético 40.500 no es un inventario validado.
- `coverage.ts` ofrece conteos técnicos, no revisión editorial ni prueba de independencia. No se deben usar como aceptados sin examinar las rutas y los ítems.
- Bloque abierto según `docs/bloque-gramatica-progreso.md`: Sinónimos y antónimos, Cohesión y coherencia y Morfosintaxis. El informe refiere 135 de selección y 90 de clasificación y 180 registros faltantes; son borradores. Las cifras por nivel y la independencia aún requieren verificación de código y ejecución. Construcción de los tres y clasificación de Morfosintaxis siguen pendientes según el informe.
- PR #1, `draft/nucleo-405-gramatica`, SHA e1b22cddc81e49e3c68d9103cd547abf851d99a1, diverge de main desde 38e74b9325429928e5092b44accb2376869d24be. No fusionar sin reconciliar: ambas ramas modifican cobertura, selección y rutas.
- Actions de la base: success, https://github.com/c2melendez/desafio-gramatical/actions/runs/44050430338. Render vinculó `main` al repositorio correcto y reportó Live del mismo SHA (dep-dbu1bg3bc2fs73fmdgf0). Esto no valida el árbol de trabajo posterior.
- La guía UNAH 2026 adjunta es la referencia para estructura; https://admisiones.unah.edu.hn/guia-de-estudio-para-la-phuma/ debe comprobarse periódicamente. El simulador externo muestra cifras contradictorias y no fija especificaciones.

## Avance técnico

`docs/modulos-phuma.json` declara M0 y la secuencia inicial de español. Es parcial: no declara aún etapas de las demás áreas ni M4, hasta definir su orden y dependencias. `scripts/validate_modules.py` valida identificadores, referencias, ciclos obligatorios, orden y áreas; no comprueba que el grafo esté completo, los estados, los conteos ni la calidad de ejercicios. `python3 scripts/validate_modules.py` y `python3 -m unittest discover -s scripts -p 'test_validate_modules.py' -v` pasaron en el árbol de trabajo. Las pruebas negativas cubren duplicados, dependencia inexistente, autorreferencia opcional, ciclo, área desconocida, orden y dependencia duplicada.

## Pendiente antes de cerrar M0

1. Conciliar por contenido y por ID el PR con main, sin importar versiones duplicadas. Generar inventario reproducible por área, tema, subtema, juego y nivel, diferenciando bruto, integrado, independiente, revisión automática y humana; marcar desconocidos.
2. Completar fuente única de módulos y dependencias, sin imponer elegibilidad; agregar STATE y verificador independiente de evidencia, inventario, contratos y SHA.
3. Construir runner con PASS/FAIL/SKIP/N/A/NOT_RUN y pruebas negativas de fallo y etapa ausente; ejecutar controles obligatorios, auditoría, regresión y mutaciones aplicables. No interpretar este checkpoint como entrega de M0.
4. Registrar tarea futura de renombrado: inventario de vínculos, integraciones, CI, Render, credenciales, dominio, redirecciones, documentación e historial; plan de migración y reversión, y comprobación de servicio y progreso cuando el nombre y URL definitivos se definan.
5. Continuar bloque abierto tras cerrar M0; no contar registros dudosos como independientes. Mantener revisión docente pendiente y no declarar calibración psicométrica.

CI y Render de esta rama: NO VERIFICADOS. No se ha ejecutado prueba funcional publicada nueva. Reanudar desde la rama de trabajo, comparar su SHA con main y el PR antes de escribir, repetir las pruebas y continuar por el punto 1.
