# Transición operativa v8.0 — certificación y Repaso reutilizable
Fecha: 27-11-2026. Autoridad: [Prompt ejecutor v8.0](../PROMPT_EJECUTOR_REPOSITORIO.md). Este documento es un plan operativo autorizado, no evidencia E1 ni certificación nueva.

## Punto de partida inspeccionado
Base de GitHub: `8bf6bc197f20b1e97a1be45cc96193910aee2cb4`. El README y el mapa RDG registran 90 subtemas, 5 áreas y 40.500 posiciones técnicas. `qa/certification/batch-state.json` en esa base registra 98 PASS semánticos del piloto, 450 examinados y política 7.9. PR #108 y #109 proponen expedientes de 27 PASS y escriben ese mismo archivo: no contar propuestas ni duplicarlas. Reconciliar por ID/hash, no sumar PR. PR #107 y otros candidatos permanecen abiertos. Esta actualización documental no altera el cursor, los registros, el código ni Render. Migración de estado en siguiente commit compatible, con política normativa 8.0 vigente al integrar este cambio; rubric revision 7.9 intacta.

## Reutilización obligatoria del Repaso
| Activo observado | Acción preferente | Validación requerida |
|---|---|---|
| `src/components/review/OperationsReview.tsx`: navegación, foco, etapas, progreso de lectura, retorno | Extraer/parametrizar estructura al implementar la próxima ruta real; preservar wrapper de Operaciones | Regresión de navegación, foco, móvil, teclado, retorno contextual |
| `Task`, ayudas, comprobación, feedback causal, reintento | Reusar/adaptar contrato de actividad; separar respuesta visible y evaluación | Prueba de cada opción, error y explicación; independencia del oráculo |
| `Bridge`, `Visual`, `SynthesisDecision` | Reusar revelación y organización; adaptar representación a la competencia, no copiar visuales matemáticos a Español/Historia | Corrección del contenido, alternativa textual y accesibilidad de cada ruta |
| `balanceTransferOptions` | Reutilizar lógica aplicable de rotación/transferencia; no reutilizar estímulos ni claves | No pistas, colisiones con juegos y examen, exactitud y transferencia |
| `src/lib/rdg/operations.ts`, `OPERATIONS_ROUTE`, `ReviewTask`, `supportsReview` | Conservar datos de Operaciones; generalizar registro de rutas y tipos solo al añadir consumidores | Integridad de ruta/plan/fuentes, contrato por subtema, no habilitar rutas incompletas |
| `src/test/rdg-operations*`, contratos y evidencia RDG | Reusar suites comunes y pruebas existentes por dependencia y hash; añadir casos por ruta | CI real, E1 por alcance, invalidación selectiva |

No crear un motor paralelo. El componente actual mezcla estructura y contenido específico: extracción incremental, no refactor global preventivo. Mantener identidad visual, voluntariedad, ausencia de puntaje en Repaso, tres modalidades y niveles y diez rondas de juegos. Registrar REUSE/ADAPT/EXTEND/CREATE y tiempo por ruta. Las pruebas compartidas no sustituyen oráculos, fuentes, transferencia, C09 ni decisiones individuales.

## Orden de trabajo propuesto
1. Reconciliar MAT-ARIT-01 P2 desde HEAD observado; recuperar fichas y cerrar elegibles sin esperar toda la deuda.
2. Consumir el mapa existente `qa/certification/rdg/architecture.json` (no crear otro). Abrir cortes verticales de Idea principal (ESPANOL-01) y Célula (NATURALES-01), ambos bloques sin dependencia declarada en la base inspeccionada; confirmar estado y fuentes antes de elegir. Fracciones (MATEMATICAS-01) depende de MAT-ARIT-01 en ese mapa: distinguir prerrequisito pedagógico disponible de cierre P2 y no omitir dependencia real. Mantener también los frentes Sociales y Blandas dentro de la cola de elegibles.
3. Implementar primera reutilización real junto a una ruta nueva; separar contenido/estructura, probar el piloto y la ruta. P0/P1/P2 siguen por subtema. No registrar RDG_READY hasta verificar la ruta real.
4. Generalizar inventario, oráculos, fichas y caché por criterio desde scripts existentes; ejecutar pruebas de mutación y validación de discrepancias. Indexar evidencia sin duplicar banco ni reconstruir expedientes válidos.
5. Medir baseline y resultados: IDs procesados, PASS nuevos, revisiones, reparaciones, tiempo por ruta e ID, proporción de reutilización, esperas CI/Render y falsos positivos observados. Inicialmente tres subtemas/1.350 IDs procesados y aspiración 450 PASS; cinco/2.250 IDs y 900–1.350 PASS son escenarios de escalamiento, no capacidad acreditada.
6. Consolidar cambios compatibles, proteger archivos comunes con escritor exclusivo, usar CAS y checkpoints por alcance. Cierre de cada subtema conserva C09, A–H, CI SUCCESS y Render LIVE del mismo SHA; docente/empírico independientes.

## Criterios de aceptación de la transición
- Mismo banco e historial; ninguna aprobación por etiqueta, muestra, caché o CI verde; cada ID conserva expediente A–H y B VERIFIED independiente.
- Una ruta adicional utiliza código real compartido y pruebas de regresión, no duplicación cosmética; cada ruta cuenta con su propia pedagogía y fuentes.
- Inventario reproducible y selección congelada por subtema; recuperación de evidencia por criterio/dependencia, pruebas negativas y registro de excepciones.
- Productividad medida contra baseline, sin declarar reducción temporal o cobertura no observadas.
- No se crea otro repositorio, base de datos, servicio ni permiso; ninguna automatización se declara implementada por este documento.
