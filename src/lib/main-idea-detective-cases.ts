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
        "explanation": "El texto indica cuatro comunidades rurales visitadas por la biblioteca móvil."
      },
      {
        "text": "La evaluación podría conducir a nuevas rutas.",
        "tag": "inference",
        "explanation": "La evaluación de rutas ofrece una base para considerar posibles recorridos nuevos, sin confirmar su realización."
      },
      {
        "text": "Ya hay diez visitas adicionales confirmadas.",
        "tag": "unsupported",
        "explanation": "No se ha anunciado siquiera la fecha siguiente; tampoco se indica una cantidad de visitas futuras."
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
        "text": "La inspección puede aportar criterios para decidir entre reparar y sustituir el puente.",
        "tag": "inference",
        "explanation": "Examinar las grietas permite orientar una decisión sobre el estado del puente; el resultado aún se desconoce."
      },
      {
        "text": "La sustitución del puente está aprobada.",
        "tag": "unsupported",
        "explanation": "La decisión entre reparación y sustitución sigue pendiente."
      },
      {
        "text": "Los técnicos anunciaron una inspección.",
        "tag": "explicit",
        "explanation": "El anuncio de inspección aparece directamente en el pasaje."
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
        "explanation": "No se informa el número total de alumnos ni que todos hayan recibido material."
      },
      {
        "text": "Se repartieron cuarenta cuadernos.",
        "tag": "explicit",
        "explanation": "El texto cuantifica la entrega en cuarenta cuadernos."
      },
      {
        "text": "Podría realizarse otra entrega con los cuadernos reservados.",
        "tag": "inference",
        "explanation": "La reserva para quienes ingresen después permite prever otra entrega, sin afirmar que ya ocurrió."
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
        "explanation": "Se acordaron turnos separados para compartir la cancha."
      },
      {
        "text": "El acuerdo podría reducir problemas de uso de la cancha.",
        "tag": "inference",
        "explanation": "Separar horarios puede disminuir coincidencias y conflictos de uso; todavía no se ha evaluado el plan."
      },
      {
        "text": "El horario ya es obligatorio para todo el año.",
        "tag": "unsupported",
        "explanation": "La directora solicitó un mes de observación antes de aprobar un horario permanente."
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
        "text": "El mural ofrece una oportunidad para incorporar otros recuerdos de la comunidad.",
        "tag": "inference",
        "explanation": "Al exhibir memorias de la comunidad se crea una oportunidad para nuevas aportaciones, aunque no se han registrado."
      },
      {
        "text": "El mural documenta toda la historia de la ciudad.",
        "tag": "unsupported",
        "explanation": "Los artistas limitan expresamente el alcance del mural a testimonios, no a toda la historia local."
      },
      {
        "text": "El mural incorpora relatos de vecinos.",
        "tag": "explicit",
        "explanation": "El mural incorpora relatos de vecinos de distintas edades."
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
        "explanation": "Solo se observó que algunos estudiantes elegían fruta; no se conocen las preferencias de todos."
      },
      {
        "text": "La fruta se ofreció dos días de la semana.",
        "tag": "explicit",
        "explanation": "Martes y jueves son los dos días mencionados."
      },
      {
        "text": "El registro podría orientar cambios futuros del menú.",
        "tag": "inference",
        "explanation": "Contar preferencias antes de extender el menú permite fundamentar decisiones futuras."
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
        "explanation": "El pasaje menciona cajas para papel y plástico."
      },
      {
        "text": "Las instrucciones podrían haber facilitado separar materiales.",
        "tag": "inference",
        "explanation": "Explicar el uso de las cajas puede ayudar a distinguir los materiales, pero no se midió el efecto."
      },
      {
        "text": "Se recuperaron exactamente dos toneladas.",
        "tag": "unsupported",
        "explanation": "Los residuos no se pesaron; no existe una medición que respalde dos toneladas."
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
        "explanation": "La coincidencia de ambos cambios permite plantearlos como factores posibles, sin demostrar su contribución individual."
      },
      {
        "text": "Solo la ventanilla causó el aumento.",
        "tag": "unsupported",
        "explanation": "La dirección advierte expresamente que no puede atribuir el aumento exclusivamente a la ventanilla."
      },
      {
        "text": "Se amplió el horario de atención.",
        "tag": "explicit",
        "explanation": "La ampliación del horario es uno de los dos cambios declarados."
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
        "explanation": "La exclusión de personas sin internet impide afirmar representatividad sin sesgo."
      },
      {
        "text": "Se recibieron doscientas respuestas.",
        "tag": "explicit",
        "explanation": "Se informa una cantidad de doscientas respuestas."
      },
      {
        "text": "Las entrevistas podrían incluir perspectivas ausentes.",
        "tag": "inference",
        "explanation": "Las entrevistas presenciales ofrecen una vía para incorporar a personas excluidas por el acceso digital."
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
        "explanation": "El texto especifica que un municipio tiene el doble de habitantes."
      },
      {
        "text": "Los totales podrían resultar engañosos sin ajustar población.",
        "tag": "inference",
        "explanation": "Comparar totales con denominadores diferentes puede alterar la interpretación de intensidad de uso."
      },
      {
        "text": "El más poblado presta más libros por persona.",
        "tag": "unsupported",
        "explanation": "No se proporcionan tasas por persona que permitan decidir cuál es mayor."
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
        "text": "Usar recipientes equivalentes reduce una diferencia del diseño inicial.",
        "tag": "inference",
        "explanation": "Igualar el tamaño de las macetas reduce una diferencia del diseño experimental, sin garantizar el control de otras variables."
      },
      {
        "text": "El ensayo inicial demostró una sola causa.",
        "tag": "unsupported",
        "explanation": "El ensayo inicial tenía tamaños distintos y no permite demostrar una causa única."
      },
      {
        "text": "Las macetas tenían tamaños distintos.",
        "tag": "explicit",
        "explanation": "Los recipientes tenían tamaños diferentes, según el texto."
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
        "explanation": "Una discrepancia de fechas no demuestra que ambas fuentes hayan sido inventadas."
      },
      {
        "text": "La redacción consultó el calendario oficial.",
        "tag": "explicit",
        "explanation": "El calendario oficial fue consultado antes de publicar."
      },
      {
        "text": "La revisión buscaba evitar un error de fecha.",
        "tag": "inference",
        "explanation": "Consultar el calendario ante fechas incompatibles permite inferir un propósito de verificación."
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
        "explanation": "El texto afirma que se trabajaron menos días que el mes anterior."
      },
      {
        "text": "Los días de cierre pudieron contribuir al menor gasto.",
        "tag": "inference",
        "explanation": "Una menor actividad puede reducir el consumo total; por eso se propone calcularlo por jornada."
      },
      {
        "text": "Solo los nuevos equipos causaron el ahorro.",
        "tag": "unsupported",
        "explanation": "No se ha separado el efecto de las instalaciones del cambio en días de trabajo."
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
        "explanation": "Corregir direcciones desactualizadas puede evitar desplazamientos erróneos; no se afirma haber medido ese efecto."
      },
      {
        "text": "Las direcciones nunca cambiarán de nuevo.",
        "tag": "unsupported",
        "explanation": "El mapa advierte que las ubicaciones pueden cambiar nuevamente."
      },
      {
        "text": "La versión revisada indica su fecha de publicación.",
        "tag": "explicit",
        "explanation": "La versión revisada indicaba su fecha de publicación."
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
        "explanation": "Una discrepancia entre recuerdos no equivale a una mentira demostrada."
      },
      {
        "text": "Los testimonios discrepaban en el orden.",
        "tag": "explicit",
        "explanation": "Las narraciones diferían en el orden de los acontecimientos."
      },
      {
        "text": "Documentos externos podrían ayudar a aclarar diferencias.",
        "tag": "inference",
        "explanation": "Buscar documentos independientes permite contrastar las versiones y quizá aclarar las diferencias."
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
        "explanation": "El texto da duraciones de veinte y treinta minutos."
      },
      {
        "text": "El trayecto más corto podría no implicar menor tiempo total.",
        "tag": "inference",
        "explanation": "El tiempo total incluye las esperas; un recorrido más corto puede terminar siendo más lento."
      },
      {
        "text": "La primera ruta siempre es la más rápida.",
        "tag": "unsupported",
        "explanation": "No se conocen las duraciones completas de las esperas, por lo que no puede garantizarse la ruta más rápida."
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
        "explanation": "Las diferencias anteriores a los cursos pueden influir en las notas finales y dificultan atribuirles el resultado."
      },
      {
        "text": "Los cursos causaron toda mejora observada.",
        "tag": "unsupported",
        "explanation": "La evaluación pide examinar los cambios; no demuestra que el curso causara toda la mejora."
      },
      {
        "text": "Los cursos eran voluntarios.",
        "tag": "explicit",
        "explanation": "Los cursos de apoyo se describen como voluntarios."
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
        "explanation": "El texto indica que se evitó señalar una fuente única de sedimentos; no identifica una fábrica culpable."
      },
      {
        "text": "Se midieron seis puntos.",
        "tag": "explicit",
        "explanation": "Se indica que se midió agua en seis puntos del río."
      },
      {
        "text": "Las lluvias podrían relacionarse con algunas variaciones.",
        "tag": "inference",
        "explanation": "Los cambios observados después de lluvias permiten plantear una relación temporal, no una causa demostrada."
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
        "explanation": "Se informa que una comunidad cultivó una superficie mayor."
      },
      {
        "text": "El tamaño del terreno pudo influir en los kilos totales.",
        "tag": "inference",
        "explanation": "Más superficie puede producir más kilos incluso con igual rendimiento por unidad de área."
      },
      {
        "text": "La cosecha mayor significa mejor rendimiento por área.",
        "tag": "unsupported",
        "explanation": "Sin dividir la cosecha por la superficie no se puede establecer cuál tiene mejor rendimiento."
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
        "explanation": "No hay resultados finales de los ausentes que permitan afirmar una mejora idéntica."
      },
      {
        "text": "Cincuenta personas abandonaron el seguimiento.",
        "tag": "explicit",
        "explanation": "Cincuenta de las doscientas personas abandonaron las evaluaciones."
      },
      {
        "text": "El abandono podría alterar la composición final.",
        "tag": "inference",
        "explanation": "Si quienes abandonaron difieren de quienes permanecieron, la composición final puede cambiar; comparar sus características permite estudiar ese riesgo."
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
        "explanation": "Las becas y el calendario se modificaron durante el mismo período."
      },
      {
        "text": "Ambas medidas podrían influir en la asistencia.",
        "tag": "inference",
        "explanation": "Como ambas medidas precedieron al aumento, es razonable considerarlas posibles factores; su contribución individual no está identificada."
      },
      {
        "text": "Las becas fueron la causa única.",
        "tag": "unsupported",
        "explanation": "El equipo afirma que faltan grupos comparables para separar los efectos."
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
        "explanation": "Si las escalas capturan constructos distintos, sumar o promediar sus cifras puede carecer de significado común."
      },
      {
        "text": "Ambas escalas miden lo mismo por usar números.",
        "tag": "unsupported",
        "explanation": "Utilizar números no demuestra que las dimensiones medidas sean equivalentes."
      },
      {
        "text": "Se compararon dos instrumentos.",
        "tag": "explicit",
        "explanation": "La revisión analizó dos instrumentos diferentes de medición."
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
        "text": "El aumento de alertas mide directamente el aumento de episodios reales.",
        "tag": "unsupported",
        "explanation": "Los técnicos todavía requieren mediciones paralelas para separar detección de incidencia."
      },
      {
        "text": "Se instalaron sensores más sensibles.",
        "tag": "explicit",
        "explanation": "Se instalaron sensores descritos como más sensibles."
      },
      {
        "text": "Parte del aumento podría deberse al equipo nuevo.",
        "tag": "inference",
        "explanation": "Una sensibilidad mayor permite detectar sucesos antes inadvertidos, de modo que más alertas no implican necesariamente más contaminación real."
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
        "explanation": "Las regiones tenían estructuras de edad diferentes."
      },
      {
        "text": "El ajuste podría cambiar la comparación aparente.",
        "tag": "inference",
        "explanation": "Si el riesgo de enfermedad varía según la edad, ajustar la composición demográfica puede modificar la comparación de tasas."
      },
      {
        "text": "Las tasas ajustadas permiten descartar los factores que todavía no se estudiaron.",
        "tag": "unsupported",
        "explanation": "El informe reconoce factores pendientes; ajustar por edad no controla automáticamente todos ellos."
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
        "explanation": "Cambiar los valores incluidos en una media puede alterar su resultado; el contraste solicitado permite cuantificarlo."
      },
      {
        "text": "Eliminar extremos siempre mejora la representación.",
        "tag": "unsupported",
        "explanation": "No existe una regla universal según la cual eliminar extremos mejore la estimación."
      },
      {
        "text": "Se solicitó calcular con la muestra completa.",
        "tag": "explicit",
        "explanation": "Se pidió comparar el promedio con el cálculo que conserva todos los registros."
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
        "text": "Los cambios de tarifa y de días de uso no influyeron en el ahorro observado.",
        "tag": "unsupported",
        "explanation": "También cambiaron las tarifas y los días de uso; no se ha aislado el efecto de la modernización."
      },
      {
        "text": "Las tarifas cambiaron.",
        "tag": "explicit",
        "explanation": "El pasaje señala cambios en las tarifas."
      },
      {
        "text": "El gasto puede bajar sin una reducción proporcional de consumo.",
        "tag": "inference",
        "explanation": "El gasto resulta del precio y del consumo; una reducción de tarifas puede bajar el costo sin igual reducción física."
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
        "explanation": "La entrevista se realizó cuarenta años después del conflicto."
      },
      {
        "text": "Las dos fuentes podrían aportar datos diferentes.",
        "tag": "inference",
        "explanation": "La proximidad temporal de la carta y el carácter retrospectivo de la entrevista permiten esperar aportaciones diferentes, que deben contrastarse."
      },
      {
        "text": "La cercanía temporal de la carta basta para resolver discrepancias con la entrevista.",
        "tag": "unsupported",
        "explanation": "La antigüedad no garantiza veracidad: el historiador examinó contexto y archivos independientes."
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
        "explanation": "La variación entre establecimientos permite plantear diferencias de contexto como hipótesis, pero no identifica una causa concreta."
      },
      {
        "text": "La mejora media permite afirmar que cada establecimiento obtuvo un beneficio.",
        "tag": "unsupported",
        "explanation": "La existencia de escuelas sin avance contradice una mejora uniforme."
      },
      {
        "text": "Algunas escuelas no mejoraron.",
        "tag": "explicit",
        "explanation": "Se indica expresamente que algunas escuelas no avanzaron."
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
        "text": "Los hogares conectados y las personas usuarias pueden agregarse como una sola cantidad de usuarios.",
        "tag": "unsupported",
        "explanation": "El texto declara que los denominadores son distintos."
      },
      {
        "text": "Se midieron hogares y personas.",
        "tag": "explicit",
        "explanation": "El estudio distingue hogares conectados de personas usuarias."
      },
      {
        "text": "Una suma simple podría distorsionar el resultado.",
        "tag": "inference",
        "explanation": "Sumar cantidades con unidades y denominadores diferentes puede producir una medida sin interpretación válida."
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
        "explanation": "Una encuesta incluye tareas escolares obligatorias."
      },
      {
        "text": "La redacción podría explicar parte de la divergencia.",
        "tag": "inference",
        "explanation": "Preguntar por conductas diferentes puede producir respuestas y porcentajes diferentes, aun sin cambios reales en hábitos."
      },
      {
        "text": "La diferencia de porcentajes refleja una diferencia real en hábitos, independientemente de las preguntas.",
        "tag": "unsupported",
        "explanation": "Las preguntas distinguen lectura por placer y tareas obligatorias; no miden exactamente la misma conducta."
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
        "text": "Dos escenarios con supuestos de emisiones distintos pueden producir estimaciones de lluvia diferentes.",
        "tag": "inference",
        "explanation": "Las cifras dependen de los supuestos; aplicar esta relación a dos escenarios distintos permite inferir que sus estimaciones pueden diferir, sin afirmar que necesariamente lo harán."
      },
      {
        "text": "Se registró la lluvia futura directamente.",
        "tag": "unsupported",
        "explanation": "Las cifras proyectadas no son observaciones directas de lluvia futura."
      },
      {
        "text": "Se plantearon tres escenarios.",
        "tag": "explicit",
        "explanation": "El estudio contempla tres escenarios de emisiones."
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
        "text": "La ausencia de firma basta para descartar el contenido del resumen.",
        "tag": "unsupported",
        "explanation": "La falta de firma limita el contexto, pero no demuestra falsedad."
      },
      {
        "text": "Uno de los documentos no tenía autor.",
        "tag": "explicit",
        "explanation": "Se recibió un resumen sin autor identificado."
      },
      {
        "text": "La falta de autoría podría dificultar evaluar su contexto.",
        "tag": "inference",
        "explanation": "La ausencia de autor dificulta reconstruir intereses y circunstancias, aunque no impide necesariamente corroborar el contenido."
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
        "explanation": "Se añadieron resultados por subgrupo."
      },
      {
        "text": "Un participante puede presentar un cambio inferior al promedio sin contradecir la mejora media.",
        "tag": "inference",
        "explanation": "La dispersión informada implica que la media no representa necesariamente el cambio individual; se pueden buscar casos por encima o debajo del promedio."
      },
      {
        "text": "La mejora media describe con precisión el cambio de cada participante.",
        "tag": "unsupported",
        "explanation": "Las diferencias fuertes entre participantes contradicen una mejora exactamente igual."
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
        "explanation": "Los relatos describen experiencias y los conteos cuantifican pasajeros; sus aportes diferentes permiten una interpretación complementaria."
      },
      {
        "text": "Los relatos recogidos permiten estimar la frecuencia de experiencias en toda la ciudad.",
        "tag": "unsupported",
        "explanation": "El texto advierte que las entrevistas no son automáticamente una muestra probabilística."
      },
      {
        "text": "Se utilizaron entrevistas y conteos.",
        "tag": "explicit",
        "explanation": "El estudio combinó entrevistas y conteos de pasajeros."
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
        "text": "El menor gasto total permite concluir que mejoró la eficiencia por estudiante.",
        "tag": "unsupported",
        "explanation": "Sin calcular gasto unitario ni examinar el cambio de proveedor no se demuestra eficiencia."
      },
      {
        "text": "La matrícula disminuyó.",
        "tag": "explicit",
        "explanation": "La matrícula disminuyó durante el período."
      },
      {
        "text": "El gasto total podría bajar sin mejorar el gasto unitario.",
        "tag": "inference",
        "explanation": "Si se atiende a menos estudiantes, puede caer el gasto total aunque el gasto por estudiante no disminuya."
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
        "explanation": "Los avisos aumentaron después de abrir la línea de reportes."
      },
      {
        "text": "Las alertas podrían reflejar más sucesos o mejor detección.",
        "tag": "inference",
        "explanation": "La nueva vía de reporte y las lluvias permiten plantear cambios de detección y de incidencia como explicaciones posibles."
      },
      {
        "text": "El aumento de reportes cuantifica directamente el aumento de incidentes reales.",
        "tag": "unsupported",
        "explanation": "Todavía se deben comprobar los incidentes reales. Una variación de reportes puede reflejar tanto detección como incidencia, de modo que no cuantifica directamente los sucesos."
      }
    ],
    "reviewStatus": "editorial-draft"
  }
];
