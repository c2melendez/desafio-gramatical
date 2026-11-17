import type {Level} from "./grammar";
import type {EvidenceTag} from "./reading";
export type MainIdeaDetectiveCase={id:string;level:Level;subtopic:"Idea principal";title:string;passage:string;claims:{text:string;tag:EvidenceTag;explanation:string}[];reviewStatus:"editorial-draft"};
/** 36 pasajes originales exclusivos del juego de clasificación. */
export const MAIN_IDEA_DETECTIVE_CASES:MainIdeaDetectiveCase[]=[
  {
    "id": "reading-main-detective-v1-principiante-0",
    "level": "principiante",
    "subtopic": "Idea principal",
    "title": "Biblioteca móvil",
    "passage": "Una biblioteca móvil llevó libros a cuatro comunidades rurales y anotó los préstamos de cada visita. La responsable dijo que evaluará nuevas rutas, pero todavía no anunció ninguna fecha para el siguiente recorrido.",
    "claims": [
      {
        "text": "El vehículo visitó cuatro comunidades.",
        "tag": "explicit",
        "explanation": "El pasaje declara expresamente este dato sobre biblioteca móvil."
      },
      {
        "text": "La evaluación podría conducir a nuevas rutas.",
        "tag": "inference",
        "explanation": "La conclusión es plausible a partir de los indicios, aunque no figura como hecho confirmado en el texto."
      },
      {
        "text": "Ya hay diez visitas adicionales confirmadas.",
        "tag": "unsupported",
        "explanation": "La lectura no aporta evidencia que justifique esa afirmación categórica."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-detective-v1-principiante-1",
    "level": "principiante",
    "subtopic": "Idea principal",
    "title": "Puente peatonal",
    "passage": "Vecinos registraron grietas en un puente y entregaron fotografías a la alcaldía. Los técnicos anunciaron que inspeccionarán la estructura. Aún no se ha decidido si conviene repararla o sustituirla.",
    "claims": [
      {
        "text": "La inspección podría aclarar qué reparación necesita el puente.",
        "tag": "inference",
        "explanation": "La conclusión es plausible a partir de los indicios, aunque no figura como hecho confirmado en el texto."
      },
      {
        "text": "La sustitución del puente está aprobada.",
        "tag": "unsupported",
        "explanation": "La lectura no aporta evidencia que justifique esa afirmación categórica."
      },
      {
        "text": "Los técnicos anunciaron una inspección.",
        "tag": "explicit",
        "explanation": "El pasaje declara expresamente este dato sobre puente peatonal."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-detective-v1-principiante-2",
    "level": "principiante",
    "subtopic": "Idea principal",
    "title": "Cuadernos donados",
    "passage": "Una asociación recibió sesenta cuadernos y repartió cuarenta entre alumnos de un colegio. Guardó los restantes para estudiantes que se incorporarían después. No anunció compras adicionales.",
    "claims": [
      {
        "text": "Todos los alumnos recibieron cuadernos nuevos.",
        "tag": "unsupported",
        "explanation": "La lectura no aporta evidencia que justifique esa afirmación categórica."
      },
      {
        "text": "Se repartieron cuarenta cuadernos.",
        "tag": "explicit",
        "explanation": "El pasaje declara expresamente este dato sobre cuadernos donados."
      },
      {
        "text": "Podría realizarse otra entrega con los cuadernos reservados.",
        "tag": "inference",
        "explanation": "La conclusión es plausible a partir de los indicios, aunque no figura como hecho confirmado en el texto."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-detective-v1-principiante-3",
    "level": "principiante",
    "subtopic": "Idea principal",
    "title": "Turnos de cancha",
    "passage": "Dos cursos acordaron entrenar en turnos separados para compartir la cancha escolar. La directora pidió observar el funcionamiento del plan durante un mes antes de aprobar un horario permanente.",
    "claims": [
      {
        "text": "Los cursos acordaron compartir la cancha por turnos.",
        "tag": "explicit",
        "explanation": "El pasaje declara expresamente este dato sobre turnos de cancha."
      },
      {
        "text": "El acuerdo podría reducir problemas de uso de la cancha.",
        "tag": "inference",
        "explanation": "La conclusión es plausible a partir de los indicios, aunque no figura como hecho confirmado en el texto."
      },
      {
        "text": "El horario ya es obligatorio para todo el año.",
        "tag": "unsupported",
        "explanation": "La lectura no aporta evidencia que justifique esa afirmación categórica."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-detective-v1-principiante-4",
    "level": "principiante",
    "subtopic": "Idea principal",
    "title": "Memorias del barrio",
    "passage": "Un grupo pintó un mural con relatos recogidos de vecinos mayores y jóvenes. Algunas personas hablaron de mercados antiguos y otras de fiestas. Los artistas aclararon que el mural reúne testimonios, no toda la historia local.",
    "claims": [
      {
        "text": "El mural podría animar a más vecinos a compartir recuerdos.",
        "tag": "inference",
        "explanation": "La conclusión es plausible a partir de los indicios, aunque no figura como hecho confirmado en el texto."
      },
      {
        "text": "El mural documenta toda la historia de la ciudad.",
        "tag": "unsupported",
        "explanation": "La lectura no aporta evidencia que justifique esa afirmación categórica."
      },
      {
        "text": "El mural incorpora relatos de vecinos.",
        "tag": "explicit",
        "explanation": "El pasaje declara expresamente este dato sobre memorias del barrio."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-detective-v1-principiante-5",
    "level": "principiante",
    "subtopic": "Idea principal",
    "title": "Fruta en la escuela",
    "passage": "El comedor añadió fruta al menú de los martes y jueves. Las encargadas observaron que algunos estudiantes la elegían y decidieron contar las preferencias antes de extender el cambio a otras jornadas.",
    "claims": [
      {
        "text": "Todos los estudiantes prefieren siempre la fruta.",
        "tag": "unsupported",
        "explanation": "La lectura no aporta evidencia que justifique esa afirmación categórica."
      },
      {
        "text": "La fruta se ofreció dos días de la semana.",
        "tag": "explicit",
        "explanation": "El pasaje declara expresamente este dato sobre fruta en la escuela."
      },
      {
        "text": "El registro podría orientar cambios futuros del menú.",
        "tag": "inference",
        "explanation": "La conclusión es plausible a partir de los indicios, aunque no figura como hecho confirmado en el texto."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-detective-v1-principiante-6",
    "level": "principiante",
    "subtopic": "Idea principal",
    "title": "Reciclaje en feria",
    "passage": "Una feria colocó cajas para papel y plástico, y voluntarios explicaron cómo utilizarlas. Al finalizar se recogieron los materiales, aunque no se pesaron los residuos recuperados.",
    "claims": [
      {
        "text": "Se instalaron cajas para papel y plástico.",
        "tag": "explicit",
        "explanation": "El pasaje declara expresamente este dato sobre reciclaje en feria."
      },
      {
        "text": "Las instrucciones podrían haber facilitado separar materiales.",
        "tag": "inference",
        "explanation": "La conclusión es plausible a partir de los indicios, aunque no figura como hecho confirmado en el texto."
      },
      {
        "text": "Se recuperaron exactamente dos toneladas.",
        "tag": "unsupported",
        "explanation": "La lectura no aporta evidencia que justifique esa afirmación categórica."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-detective-v1-intermedio-7",
    "level": "intermedio",
    "subtopic": "Idea principal",
    "title": "Consultas médicas",
    "passage": "Un centro de salud recibió más pacientes tras abrir una ventanilla rápida y ampliar el horario. La dirección explicó que los dos cambios ocurrieron simultáneamente y que no era posible atribuir el aumento exclusivamente a la ventanilla.",
    "claims": [
      {
        "text": "Ambos cambios podrían haber influido en las consultas.",
        "tag": "inference",
        "explanation": "La conclusión es plausible a partir de los indicios, aunque no figura como hecho confirmado en el texto."
      },
      {
        "text": "Solo la ventanilla causó el aumento.",
        "tag": "unsupported",
        "explanation": "La lectura no aporta evidencia que justifique esa afirmación categórica."
      },
      {
        "text": "Se amplió el horario de atención.",
        "tag": "explicit",
        "explanation": "El pasaje declara expresamente este dato sobre consultas médicas."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-detective-v1-intermedio-8",
    "level": "intermedio",
    "subtopic": "Idea principal",
    "title": "Transporte por internet",
    "passage": "Una organización encuestó a usuarios de autobús por internet y recibió doscientas respuestas. El informe reconoció que personas sin acceso digital quedaron fuera y propuso entrevistas presenciales.",
    "claims": [
      {
        "text": "La muestra representa sin sesgo a toda la población.",
        "tag": "unsupported",
        "explanation": "La lectura no aporta evidencia que justifique esa afirmación categórica."
      },
      {
        "text": "Se recibieron doscientas respuestas.",
        "tag": "explicit",
        "explanation": "El pasaje declara expresamente este dato sobre transporte por internet."
      },
      {
        "text": "Las entrevistas podrían incluir perspectivas ausentes.",
        "tag": "inference",
        "explanation": "La conclusión es plausible a partir de los indicios, aunque no figura como hecho confirmado en el texto."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-detective-v1-intermedio-9",
    "level": "intermedio",
    "subtopic": "Idea principal",
    "title": "Préstamos municipales",
    "passage": "Dos municipios compararon libros prestados, pero uno tenía el doble de habitantes del otro. La comisión decidió calcular préstamos por persona antes de concluir qué biblioteca se utilizaba con mayor intensidad.",
    "claims": [
      {
        "text": "Un municipio tenía el doble de habitantes.",
        "tag": "explicit",
        "explanation": "El pasaje declara expresamente este dato sobre préstamos municipales."
      },
      {
        "text": "Los totales podrían resultar engañosos sin ajustar población.",
        "tag": "inference",
        "explanation": "La conclusión es plausible a partir de los indicios, aunque no figura como hecho confirmado en el texto."
      },
      {
        "text": "El más poblado presta más libros por persona.",
        "tag": "unsupported",
        "explanation": "La lectura no aporta evidencia que justifique esa afirmación categórica."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-detective-v1-intermedio-10",
    "level": "intermedio",
    "subtopic": "Idea principal",
    "title": "Macetas distintas",
    "passage": "Un taller observó plantas cultivadas en macetas de tamaño diferente. Los participantes reconocieron que los recipientes podían afectar el crecimiento y decidieron repetir el ensayo con tamaños equivalentes.",
    "claims": [
      {
        "text": "La repetición podría controlar una fuente de variación.",
        "tag": "inference",
        "explanation": "La conclusión es plausible a partir de los indicios, aunque no figura como hecho confirmado en el texto."
      },
      {
        "text": "El ensayo inicial demostró una sola causa.",
        "tag": "unsupported",
        "explanation": "La lectura no aporta evidencia que justifique esa afirmación categórica."
      },
      {
        "text": "Las macetas tenían tamaños distintos.",
        "tag": "explicit",
        "explanation": "El pasaje declara expresamente este dato sobre macetas distintas."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-detective-v1-intermedio-11",
    "level": "intermedio",
    "subtopic": "Idea principal",
    "title": "Fecha contradictoria",
    "passage": "Un periódico escolar recibió dos fechas distintas para la misma actividad. Antes de imprimirlas, consultó el calendario oficial y a sus organizadores. Publicó una nota explicando la corrección realizada.",
    "claims": [
      {
        "text": "Ambas fuentes iniciales eran inventadas.",
        "tag": "unsupported",
        "explanation": "La lectura no aporta evidencia que justifique esa afirmación categórica."
      },
      {
        "text": "La redacción consultó el calendario oficial.",
        "tag": "explicit",
        "explanation": "El pasaje declara expresamente este dato sobre fecha contradictoria."
      },
      {
        "text": "La revisión buscaba evitar un error de fecha.",
        "tag": "inference",
        "explanation": "La conclusión es plausible a partir de los indicios, aunque no figura como hecho confirmado en el texto."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-detective-v1-intermedio-12",
    "level": "intermedio",
    "subtopic": "Idea principal",
    "title": "Factura de agua",
    "passage": "Una fábrica informó que su gasto de agua había disminuido, aunque trabajó menos días que el mes anterior. El equipo propuso comparar consumo por jornada operativa antes de atribuir el ahorro a nuevas instalaciones.",
    "claims": [
      {
        "text": "La fábrica trabajó menos días.",
        "tag": "explicit",
        "explanation": "El pasaje declara expresamente este dato sobre factura de agua."
      },
      {
        "text": "Los días de cierre pudieron contribuir al menor gasto.",
        "tag": "inference",
        "explanation": "La conclusión es plausible a partir de los indicios, aunque no figura como hecho confirmado en el texto."
      },
      {
        "text": "Solo los nuevos equipos causaron el ahorro.",
        "tag": "unsupported",
        "explanation": "La lectura no aporta evidencia que justifique esa afirmación categórica."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-detective-v1-intermedio-13",
    "level": "intermedio",
    "subtopic": "Idea principal",
    "title": "Mapa de refugios",
    "passage": "Una organización actualizó un mapa de refugios después de encontrar direcciones desactualizadas. La versión revisada indicaba su fecha de publicación y advertía que algunas ubicaciones podrían volver a cambiar.",
    "claims": [
      {
        "text": "La revisión podría evitar visitas a lugares equivocados.",
        "tag": "inference",
        "explanation": "La conclusión es plausible a partir de los indicios, aunque no figura como hecho confirmado en el texto."
      },
      {
        "text": "Las direcciones nunca cambiarán de nuevo.",
        "tag": "unsupported",
        "explanation": "La lectura no aporta evidencia que justifique esa afirmación categórica."
      },
      {
        "text": "El mapa muestra una fecha de actualización.",
        "tag": "explicit",
        "explanation": "El pasaje declara expresamente este dato sobre mapa de refugios."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-detective-v1-intermedio-14",
    "level": "intermedio",
    "subtopic": "Idea principal",
    "title": "Archivo oral",
    "passage": "Un archivo reunió recuerdos de testigos sobre un mismo acontecimiento. Algunas narraciones discrepaban en el orden de los hechos. Los investigadores conservaron las versiones mientras buscaban documentos para contrastarlas.",
    "claims": [
      {
        "text": "Se comprobó que un testigo mintió.",
        "tag": "unsupported",
        "explanation": "La lectura no aporta evidencia que justifique esa afirmación categórica."
      },
      {
        "text": "Los testimonios discrepaban en el orden.",
        "tag": "explicit",
        "explanation": "El pasaje declara expresamente este dato sobre archivo oral."
      },
      {
        "text": "Documentos externos podrían ayudar a aclarar diferencias.",
        "tag": "inference",
        "explanation": "La conclusión es plausible a partir de los indicios, aunque no figura como hecho confirmado en el texto."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-detective-v1-intermedio-15",
    "level": "intermedio",
    "subtopic": "Idea principal",
    "title": "Espera de autobús",
    "passage": "Dos rutas tenían viajes de veinte y treinta minutos, pero la primera exigía esperas más largas. Los vecinos propusieron registrar también el tiempo para abordar antes de elegir la opción más rápida.",
    "claims": [
      {
        "text": "Una ruta tenía un trayecto de veinte minutos.",
        "tag": "explicit",
        "explanation": "El pasaje declara expresamente este dato sobre espera de autobús."
      },
      {
        "text": "El trayecto más corto podría no implicar menor tiempo total.",
        "tag": "inference",
        "explanation": "La conclusión es plausible a partir de los indicios, aunque no figura como hecho confirmado en el texto."
      },
      {
        "text": "La primera ruta siempre es la más rápida.",
        "tag": "unsupported",
        "explanation": "La lectura no aporta evidencia que justifique esa afirmación categórica."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-detective-v1-intermedio-16",
    "level": "intermedio",
    "subtopic": "Idea principal",
    "title": "Clubes voluntarios",
    "passage": "Dos colegios ofrecieron cursos de apoyo voluntarios. Los participantes obtuvieron notas finales superiores, pero ya tenían diferencias iniciales. La evaluación recomendó examinar los cambios antes de inferir efectos de los cursos.",
    "claims": [
      {
        "text": "Las diferencias iniciales podrían afectar la comparación.",
        "tag": "inference",
        "explanation": "La conclusión es plausible a partir de los indicios, aunque no figura como hecho confirmado en el texto."
      },
      {
        "text": "Los cursos causaron toda mejora observada.",
        "tag": "unsupported",
        "explanation": "La lectura no aporta evidencia que justifique esa afirmación categórica."
      },
      {
        "text": "Los cursos eran voluntarios.",
        "tag": "explicit",
        "explanation": "El pasaje declara expresamente este dato sobre clubes voluntarios."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-detective-v1-intermedio-17",
    "level": "intermedio",
    "subtopic": "Idea principal",
    "title": "Calidad del río",
    "passage": "Una asociación midió agua en seis puntos del río y observó cambios después de lluvias. Compartió los registros con un laboratorio y evitó señalar una sola fuente de sedimentos sin análisis adicionales.",
    "claims": [
      {
        "text": "Se identificó una fábrica culpable.",
        "tag": "unsupported",
        "explanation": "La lectura no aporta evidencia que justifique esa afirmación categórica."
      },
      {
        "text": "Se midieron seis puntos.",
        "tag": "explicit",
        "explanation": "El pasaje declara expresamente este dato sobre calidad del río."
      },
      {
        "text": "Las lluvias podrían relacionarse con algunas variaciones.",
        "tag": "inference",
        "explanation": "La conclusión es plausible a partir de los indicios, aunque no figura como hecho confirmado en el texto."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-detective-v1-intermedio-18",
    "level": "intermedio",
    "subtopic": "Idea principal",
    "title": "Rendimiento de huertos",
    "passage": "Tres comunidades compararon sus cosechas. Una obtuvo más kilos, pero cultivó una superficie mayor. Los organizadores recomendaron evaluar rendimiento por metro cuadrado antes de elegir la técnica más productiva.",
    "claims": [
      {
        "text": "Una comunidad cultivó más superficie.",
        "tag": "explicit",
        "explanation": "El pasaje declara expresamente este dato sobre rendimiento de huertos."
      },
      {
        "text": "El tamaño del terreno pudo influir en los kilos totales.",
        "tag": "inference",
        "explanation": "La conclusión es plausible a partir de los indicios, aunque no figura como hecho confirmado en el texto."
      },
      {
        "text": "La cosecha mayor significa mejor rendimiento por área.",
        "tag": "unsupported",
        "explanation": "La lectura no aporta evidencia que justifique esa afirmación categórica."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-detective-v1-avanzado-19",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Deserción de participantes",
    "passage": "Una investigación siguió a doscientas personas durante un año, pero cincuenta abandonaron las evaluaciones. Los autores compararon características iniciales de quienes siguieron y quienes no para evaluar un posible sesgo.",
    "claims": [
      {
        "text": "Los ausentes habrían mejorado exactamente igual.",
        "tag": "unsupported",
        "explanation": "La lectura no aporta evidencia que justifique esa afirmación categórica."
      },
      {
        "text": "Cincuenta personas abandonaron el seguimiento.",
        "tag": "explicit",
        "explanation": "El pasaje declara expresamente este dato sobre deserción de participantes."
      },
      {
        "text": "El abandono podría alterar la composición final.",
        "tag": "inference",
        "explanation": "La conclusión es plausible a partir de los indicios, aunque no figura como hecho confirmado en el texto."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-detective-v1-avanzado-20",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Becas y calendario",
    "passage": "Una ciudad amplió becas y modificó el calendario escolar durante el mismo período. La asistencia creció, pero el equipo investigador afirmó que no podía separar ambos efectos sin comparar grupos equivalentes.",
    "claims": [
      {
        "text": "Becas y calendario cambiaron simultáneamente.",
        "tag": "explicit",
        "explanation": "El pasaje declara expresamente este dato sobre becas y calendario."
      },
      {
        "text": "Ambas medidas podrían influir en la asistencia.",
        "tag": "inference",
        "explanation": "La conclusión es plausible a partir de los indicios, aunque no figura como hecho confirmado en el texto."
      },
      {
        "text": "Las becas fueron la causa única.",
        "tag": "unsupported",
        "explanation": "La lectura no aporta evidencia que justifique esa afirmación categórica."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-detective-v1-avanzado-21",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Dos escalas",
    "passage": "Una revisión reunió investigaciones con dos instrumentos distintos para medir ansiedad. Antes de integrar cifras, analizó qué dimensiones capturaba cada escala y presentó por separado las que no eran comparables.",
    "claims": [
      {
        "text": "Las diferencias conceptuales podrían impedir una puntuación común.",
        "tag": "inference",
        "explanation": "La conclusión es plausible a partir de los indicios, aunque no figura como hecho confirmado en el texto."
      },
      {
        "text": "Ambas escalas miden lo mismo por usar números.",
        "tag": "unsupported",
        "explanation": "La lectura no aporta evidencia que justifique esa afirmación categórica."
      },
      {
        "text": "Se compararon dos instrumentos.",
        "tag": "explicit",
        "explanation": "El pasaje declara expresamente este dato sobre dos escalas."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-detective-v1-avanzado-22",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Sensores urbanos",
    "passage": "Una municipalidad instaló sensores más sensibles y después registró más alertas ambientales. Los técnicos propusieron mediciones paralelas con equipos viejos para separar cambios reales de mayor capacidad de detección.",
    "claims": [
      {
        "text": "Toda alerta implica igual aumento real.",
        "tag": "unsupported",
        "explanation": "La lectura no aporta evidencia que justifique esa afirmación categórica."
      },
      {
        "text": "Se instalaron sensores más sensibles.",
        "tag": "explicit",
        "explanation": "El pasaje declara expresamente este dato sobre sensores urbanos."
      },
      {
        "text": "Parte del aumento podría deberse al equipo nuevo.",
        "tag": "inference",
        "explanation": "La conclusión es plausible a partir de los indicios, aunque no figura como hecho confirmado en el texto."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-detective-v1-avanzado-23",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Tasas por edad",
    "passage": "Dos regiones tenían estructuras de edad diferentes y mostraron distintas tasas de enfermedad. Los analistas calcularon tasas ajustadas antes de comparar y señalaron que todavía faltaban factores por estudiar.",
    "claims": [
      {
        "text": "Las estructuras de edad eran diferentes.",
        "tag": "explicit",
        "explanation": "El pasaje declara expresamente este dato sobre tasas por edad."
      },
      {
        "text": "El ajuste podría cambiar la comparación aparente.",
        "tag": "inference",
        "explanation": "La conclusión es plausible a partir de los indicios, aunque no figura como hecho confirmado en el texto."
      },
      {
        "text": "El ajuste elimina todo posible factor externo.",
        "tag": "unsupported",
        "explanation": "La lectura no aporta evidencia que justifique esa afirmación categórica."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-detective-v1-avanzado-24",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Datos extremos",
    "passage": "Un grupo excluyó observaciones extremas antes de calcular un promedio. Los revisores pidieron declarar cuántos registros se habían omitido y comparar el valor con el cálculo sobre todos los datos.",
    "claims": [
      {
        "text": "La exclusión pudo modificar la estimación.",
        "tag": "inference",
        "explanation": "La conclusión es plausible a partir de los indicios, aunque no figura como hecho confirmado en el texto."
      },
      {
        "text": "Eliminar extremos siempre mejora la representación.",
        "tag": "unsupported",
        "explanation": "La lectura no aporta evidencia que justifique esa afirmación categórica."
      },
      {
        "text": "Se solicitó calcular con la muestra completa.",
        "tag": "explicit",
        "explanation": "El pasaje declara expresamente este dato sobre datos extremos."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-detective-v1-avanzado-25",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Ahorro energético",
    "passage": "Un reporte atribuyó ahorros monetarios a edificios modernizados, aunque también cambiaron tarifas y días de uso. La versión revisada separó precios, consumo físico y tiempo de funcionamiento.",
    "claims": [
      {
        "text": "La modernización explica todo el ahorro.",
        "tag": "unsupported",
        "explanation": "La lectura no aporta evidencia que justifique esa afirmación categórica."
      },
      {
        "text": "Las tarifas cambiaron.",
        "tag": "explicit",
        "explanation": "El pasaje declara expresamente este dato sobre ahorro energético."
      },
      {
        "text": "El gasto puede bajar sin una reducción proporcional de consumo.",
        "tag": "inference",
        "explanation": "La conclusión es plausible a partir de los indicios, aunque no figura como hecho confirmado en el texto."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-detective-v1-avanzado-26",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Decreto y entrevista",
    "passage": "Un historiador comparó una carta contemporánea a un conflicto y una entrevista realizada cuarenta años después. Describió el contexto de ambas y contrastó sus afirmaciones en archivos independientes.",
    "claims": [
      {
        "text": "La entrevista fue cuarenta años posterior.",
        "tag": "explicit",
        "explanation": "El pasaje declara expresamente este dato sobre decreto y entrevista."
      },
      {
        "text": "Las dos fuentes podrían aportar datos diferentes.",
        "tag": "inference",
        "explanation": "La conclusión es plausible a partir de los indicios, aunque no figura como hecho confirmado en el texto."
      },
      {
        "text": "La carta es verdadera solo por su antigüedad.",
        "tag": "unsupported",
        "explanation": "La lectura no aporta evidencia que justifique esa afirmación categórica."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-detective-v1-avanzado-27",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Resultados por escuela",
    "passage": "Un programa educativo produjo una mejora media, pero algunas escuelas no avanzaron. Los responsables informaron resultados por establecimiento y evitaron describir un beneficio universal.",
    "claims": [
      {
        "text": "El contexto escolar podría explicar parte de las diferencias.",
        "tag": "inference",
        "explanation": "La conclusión es plausible a partir de los indicios, aunque no figura como hecho confirmado en el texto."
      },
      {
        "text": "Todas las escuelas progresaron igual.",
        "tag": "unsupported",
        "explanation": "La lectura no aporta evidencia que justifique esa afirmación categórica."
      },
      {
        "text": "Algunas escuelas no mejoraron.",
        "tag": "explicit",
        "explanation": "El pasaje declara expresamente este dato sobre resultados por escuela."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-detective-v1-avanzado-28",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Indicadores digitales",
    "passage": "Una investigación comparó hogares conectados con personas que usan internet diariamente. Sus autores explicaron que los indicadores tienen unidades y denominadores distintos, por lo que no podían sumarse directamente.",
    "claims": [
      {
        "text": "Ambos indicadores comparten denominador.",
        "tag": "unsupported",
        "explanation": "La lectura no aporta evidencia que justifique esa afirmación categórica."
      },
      {
        "text": "Se midieron hogares y personas.",
        "tag": "explicit",
        "explanation": "El pasaje declara expresamente este dato sobre indicadores digitales."
      },
      {
        "text": "Una suma simple podría distorsionar el resultado.",
        "tag": "inference",
        "explanation": "La conclusión es plausible a partir de los indicios, aunque no figura como hecho confirmado en el texto."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-detective-v1-avanzado-29",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Encuestas de lectura",
    "passage": "Una encuesta preguntó por libros leídos por placer y otra incluyó tareas escolares obligatorias. Los investigadores señalaron que la diferencia de preguntas limitaba cualquier comparación de porcentajes.",
    "claims": [
      {
        "text": "Una encuesta incluyó lecturas obligatorias.",
        "tag": "explicit",
        "explanation": "El pasaje declara expresamente este dato sobre encuestas de lectura."
      },
      {
        "text": "La redacción podría explicar parte de la divergencia.",
        "tag": "inference",
        "explanation": "La conclusión es plausible a partir de los indicios, aunque no figura como hecho confirmado en el texto."
      },
      {
        "text": "Ambas preguntas miden exactamente lo mismo.",
        "tag": "unsupported",
        "explanation": "La lectura no aporta evidencia que justifique esa afirmación categórica."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-detective-v1-avanzado-30",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Escenarios climáticos",
    "passage": "Un estudio proyectó lluvia bajo tres escenarios de emisiones. Los autores distinguieron datos históricos de cifras futuras condicionadas y explicaron que los supuestos pueden cambiar las estimaciones.",
    "claims": [
      {
        "text": "Modificar supuestos podría alterar las proyecciones.",
        "tag": "inference",
        "explanation": "La conclusión es plausible a partir de los indicios, aunque no figura como hecho confirmado en el texto."
      },
      {
        "text": "Se registró la lluvia futura directamente.",
        "tag": "unsupported",
        "explanation": "La lectura no aporta evidencia que justifique esa afirmación categórica."
      },
      {
        "text": "Se plantearon tres escenarios.",
        "tag": "explicit",
        "explanation": "El pasaje declara expresamente este dato sobre escenarios climáticos."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-detective-v1-avanzado-31",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Fuentes anónimas",
    "passage": "Un archivo recibió un documento firmado y un resumen sin autor. Los investigadores contrastaron ambos con registros independientes y explicaron que la autoría es relevante para interpretar el contexto.",
    "claims": [
      {
        "text": "El documento anónimo es falso por definición.",
        "tag": "unsupported",
        "explanation": "La lectura no aporta evidencia que justifique esa afirmación categórica."
      },
      {
        "text": "Uno de los documentos no tenía autor.",
        "tag": "explicit",
        "explanation": "El pasaje declara expresamente este dato sobre fuentes anónimas."
      },
      {
        "text": "La falta de autoría podría dificultar evaluar su contexto.",
        "tag": "inference",
        "explanation": "La conclusión es plausible a partir de los indicios, aunque no figura como hecho confirmado en el texto."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-detective-v1-avanzado-32",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Variaciones personales",
    "passage": "Una evaluación observó una mejora media y diferencias fuertes entre participantes. Los autores añadieron resultados individuales y por subgrupo para no presentar el promedio como un cambio uniforme.",
    "claims": [
      {
        "text": "Se mostraron resultados por subgrupo.",
        "tag": "explicit",
        "explanation": "El pasaje declara expresamente este dato sobre variaciones personales."
      },
      {
        "text": "Los resultados individuales podrían diferir de la media.",
        "tag": "inference",
        "explanation": "La conclusión es plausible a partir de los indicios, aunque no figura como hecho confirmado en el texto."
      },
      {
        "text": "Todos mejoraron exactamente lo mismo.",
        "tag": "unsupported",
        "explanation": "La lectura no aporta evidencia que justifique esa afirmación categórica."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-detective-v1-avanzado-33",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Entrevistas y registros",
    "passage": "Un estudio sobre transporte reunió entrevistas y conteos de pasajeros. Sus autores explicaron que los relatos aportan experiencias, pero no constituyen automáticamente una muestra probabilística.",
    "claims": [
      {
        "text": "Ambos tipos de datos podrían complementarse.",
        "tag": "inference",
        "explanation": "La conclusión es plausible a partir de los indicios, aunque no figura como hecho confirmado en el texto."
      },
      {
        "text": "Las entrevistas miden sin sesgo a toda la ciudad.",
        "tag": "unsupported",
        "explanation": "La lectura no aporta evidencia que justifique esa afirmación categórica."
      },
      {
        "text": "Se utilizaron entrevistas y conteos.",
        "tag": "explicit",
        "explanation": "El pasaje declara expresamente este dato sobre entrevistas y registros."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-detective-v1-avanzado-34",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Costo por alumno",
    "passage": "Un centro redujo el gasto educativo mientras disminuía la matrícula y cambiaba de proveedor. El análisis decidió calcular gasto por estudiante antes de concluir que existía una mejora de eficiencia.",
    "claims": [
      {
        "text": "La reducción demuestra eficiencia por sí sola.",
        "tag": "unsupported",
        "explanation": "La lectura no aporta evidencia que justifique esa afirmación categórica."
      },
      {
        "text": "La matrícula disminuyó.",
        "tag": "explicit",
        "explanation": "El pasaje declara expresamente este dato sobre costo por alumno."
      },
      {
        "text": "El gasto total podría bajar sin mejorar el gasto unitario.",
        "tag": "inference",
        "explanation": "La conclusión es plausible a partir de los indicios, aunque no figura como hecho confirmado en el texto."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-detective-v1-avanzado-35",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Avisos de inundación",
    "passage": "Una ciudad recibió más avisos tras abrir una línea de reportes y atravesar semanas lluviosas. Los técnicos buscaron comprobar incidentes reales antes de identificar tendencias y causas.",
    "claims": [
      {
        "text": "Los avisos aumentaron tras abrir la línea.",
        "tag": "explicit",
        "explanation": "El pasaje declara expresamente este dato sobre avisos de inundación."
      },
      {
        "text": "Las alertas podrían reflejar más sucesos o mejor detección.",
        "tag": "inference",
        "explanation": "La conclusión es plausible a partir de los indicios, aunque no figura como hecho confirmado en el texto."
      },
      {
        "text": "Cada alerta fue causada por una sola construcción.",
        "tag": "unsupported",
        "explanation": "La lectura no aporta evidencia que justifique esa afirmación categórica."
      }
    ],
    "reviewStatus": "editorial-draft"
  }
];