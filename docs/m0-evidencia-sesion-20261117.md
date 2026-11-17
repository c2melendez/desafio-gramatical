# M0 — evidencia de la ejecución del 17-11-2026

## Destino y base confirmados

- Repositorio canónico: `c2melendez/desafio-gramatical`; rama de producción: `main`.
- Base observada de producción: `838a5ab79900881e4b080fd098be799f69cb81a0`.
- Rama de reconciliación: `trabajo/m0-reconciliacion-20261117`, PR #2.
- El proyecto distinto `academia-paa-phuma` **no** forma parte de esta ejecución.
- Se verificó la guía PHUMA de la Dirección del Sistema de Admisión UNAH: https://admisiones.unah.edu.hn/guia-de-estudio-para-la-phuma/ y el PDF 2026 disponible en https://admisiones.unah.edu.hn/assets/Uploads/GUIA-PRE-U-UNAH-2026.pdf. Los 120 reactivos, cuatro opciones y 170 minutos se sustentan en esa guía; no se consideran deducibles del simulador externo.

## Hechos reproducibles

- `docs/reconciliacion-m0-20261117.md` documenta 90 subtemas; 270 combinaciones y 810 celdas teóricas. El inventario base indicó 2.006 registros técnicos, cifra **no equivalente** a ítems originales, revisados o realmente integrados.
- El bloque abierto prioritario continúa siendo: Sinónimos y antónimos, Cohesión y coherencia, Morfosintaxis. El déficit técnico histórico de 180 no equivale a déficit de ítems aceptados.
- Se reforzó `scripts/validate_modules.py` para exigir integridad del grafo M0–M4 en la CLI y se añadieron casos negativos.
- Se incorporó `scripts/security-client-audit.mjs` con casos positivos y negativos y se conectó a CI. Este análisis estático no demuestra ausencia de tráfico inesperado, fugas de red ni vulnerabilidades de dependencias.
- Se armonizaron comandos de `scripts/qa_m0.py` con Bun, y se conectaron las auditorías de selección y oráculos.

### Registro de commits de esta sesión

1. `dd0c09dcf62828a01861ec85a77da50c53cf0900` — auditor de seguridad cliente.
2. `263c1a610ca8e8701cba4a6ecb9e6a85b6c6062d` — auditor en CI.
3. `d7c7e45a029f1eed1bbff4c356d2a4c48d02630a` — runner Bun y auditorías de selección.

La validación remota del commit `d7c7e45a029f1eed1bbff4c356d2a4c48d02630a` resultó **SUCCESS** en https://github.com/c2melendez/desafio-gramatical/actions/runs/44083049494 (build, pruebas, auditorías y lint). CI aprobado no implica cierre de M0 ni despliegue Render: el PR #2 no se ha fusionado en `main`.

## Controles todavía sin aprobación para el cierre

- [ ] Contratos y estado completos con hashes vigentes y oráculos independientes para todos los juegos.
- [ ] Inventario por ID, ruta y nivel y revisión de calidad, independencia y claves de cada registro.
- [ ] Regresión funcional y preservación de progreso observadas en aplicación publicada.
- [ ] Mutaciones críticas de la lógica integrada, no solo fixtures.
- [ ] Auditoría de privacidad y tráfico en ejecución y dependencias, más allá del análisis estático.
- [ ] Verificación independiente de evidencias completas, con CI y Render Live del **mismo SHA**.

No reclasificar estas condiciones como PASS por haber aprobado las comprobaciones parciales.

## Reanudación

1. Actualizar HEAD de `main` y PR #2, comprobar conflictos con PR #1 y revalidar la matriz de contenido por ID/ruta.
2. Convertir los seis controles pendientes en etapas reproducibles, con evidencias y pruebas negativas, sin falsos PASS.
3. Ejecutar el cierre de M0, publicar y verificar CI/Render del mismo SHA; solamente entonces pasar a M1 en español y completar primero el bloque abierto.

## Tarea posterior de renombrado, no ejecutada

Cuando el usuario determine la identidad definitiva: levantar inventario de URLs, repositorio, `render.yaml`, Actions, dominios, credenciales y referencias internas, historial y almacenamiento local; definir migración con redirecciones y reversión; cambiar nombre y URL de forma coordinada; comprobar CI, Render y preservación de partidas. No cambiar repo ni servicio antes de la definición definitiva.
