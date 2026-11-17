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


## Reconciliación nueva de rutas (CI 44085721809)

El inventario `scripts/inventory-coverage.mjs` (versión 2) compara `coverageRows()` con las condiciones de habilitación del menú para **las 810 celdas**. La salida se preservó como artefacto `m0-inventario` del run [44085721809](https://github.com/c2melendez/desafio-gramatical/actions/runs/44085721809), con resultado **success**, SHA de PR `9a22c355dfa5fb08e3cb0a01c6d7069f5530860c` y auditoría estática diferenciada de validación funcional.

- Catálogo: 90 subtemas; Español 21, Matemáticas 22, Ciencias Naturales 19, Ciencias Sociales 20 y Habilidades Blandas 8.
- Capacidad nominal: 270 combinaciones × 150 = 40.500 **solo como objetivo condicional**, no como ejercicios disponibles.
- Celdas teóricas 810; con ruta habilitada en menú 132. Otras 678 todavía no presentan ruta habilitada. Un menú habilitado no certifica que una sesión haya sido probada.
- Registros técnicos declarados: 2.006 en Español; 0 en las otras cuatro áreas. La suma de registros con ruta de menú declarada también es 2.006. No se han convertido a ítems independientes aceptados.
- Déficit técnico hacia núcleo en todas las celdas: 10.170 frente a 12.150 celdas-nivel objetivo; se suman por celda y **no** se confunden con las necesidades del siguiente bloque de tres subtemas.
- Bloque abierto de tres subtemas, selección: 10/15/20 por subtema; clasificación: Sinónimos y Cohesión 10/15/20, Morfosintaxis 0/0/0; construcción: 0/0/0 para los tres subtemas. Déficit técnico del núcleo del bloque: **180** (B 40, I 60, A 80), sujeto a auditoría editorial y comprobación de independencia.
- Los registros del PR #1 se mantienen separados: no se suman sin verificar coincidencia de IDs, equivalencia y rutas.

**Decisión M0:** esta reconciliación de alcance es N1, corroborada por CI y artefacto completo. Los 6 controles integrales de calidad, mutaciones en producción y privacidad dinámica siguen sin evidencias suficientes; el estado M0 no se convierte en COMPLETADA por el simple resultado SUCCESS del CI. La revisión docente y la calibración psicométrica siguen pendientes. El despliegue Render debe verificarse para el mismo SHA después de integrar la rama.
