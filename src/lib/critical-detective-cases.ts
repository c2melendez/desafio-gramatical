import type {Level} from "./grammar";
import type {EvidenceTag} from "./reading";
export type CriticalDetectiveCase={id:string;level:Level;subtopic:"Lectura crítica";title:string;passage:string;claims:{text:string;tag:EvidenceTag;explanation:string}[];reviewStatus:"editorial-draft"};
/** Clasificación crítica de hechos, interpretaciones razonables y afirmaciones sin sustento. */
export const CRITICAL_DETECTIVE_CASES:CriticalDetectiveCase[]=[
  {
    "id": "reading-critical-detective-v1-principiante-0",
    "level": "principiante",
    "subtopic": "Lectura crítica",
    "title": "Cartel de reciclaje",
    "passage": "El cartel escolar afirma que separar papel es importante para reducir residuos. No ofrece cifras sobre cuánto papel se recoge ni explica cómo se calculó el efecto. El equipo propone medir los resultados antes de anunciar un ahorro exacto.",
    "claims": [
      {
        "text": "El cartel recomienda separar papel.",
        "tag": "explicit",
        "explanation": "El texto menciona expresamente que el cartel recomienda separar papel."
      },
      {
        "text": "La recomendación podría orientar hábitos de reciclaje.",
        "tag": "inference",
        "explanation": "Se trata de una interpretación plausible apoyada en los datos, no de un resultado comprobado."
      },
      {
        "text": "Se demostró una reducción exacta del cincuenta por ciento.",
        "tag": "unsupported",
        "explanation": "El pasaje no ofrece información suficiente para sostener esa conclusión categórica."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-detective-v1-principiante-1",
    "level": "principiante",
    "subtopic": "Lectura crítica",
    "title": "La reseña del cuento",
    "passage": "Una estudiante escribió que un cuento era el mejor del año porque le gustó el final. La maestra pidió distinguir esa opinión personal de pruebas sobre las cualidades del libro y citar pasajes para justificar la valoración.",
    "claims": [
      {
        "text": "Citar fragmentos podría fortalecer la reseña.",
        "tag": "inference",
        "explanation": "Se trata de una interpretación plausible apoyada en los datos, no de un resultado comprobado."
      },
      {
        "text": "Todos los lectores coinciden en que es el mejor cuento.",
        "tag": "unsupported",
        "explanation": "El pasaje no ofrece información suficiente para sostener esa conclusión categórica."
      },
      {
        "text": "La estudiante valoró positivamente el final.",
        "tag": "explicit",
        "explanation": "El texto menciona expresamente que la estudiante valoró positivamente el final."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-detective-v1-principiante-2",
    "level": "principiante",
    "subtopic": "Lectura crítica",
    "title": "Anuncio del jugo",
    "passage": "Un anuncio dice que un jugo es el favorito de toda la ciudad. La tienda solo entrevistó a diez clientes habituales y no publicó las respuestas completas. El encargado reconoce que esa consulta es demasiado pequeña para hablar por todos.",
    "claims": [
      {
        "text": "El jugo es el favorito comprobado de toda la ciudad.",
        "tag": "unsupported",
        "explanation": "El pasaje no ofrece información suficiente para sostener esa conclusión categórica."
      },
      {
        "text": "Se consultó a diez clientes habituales.",
        "tag": "explicit",
        "explanation": "El texto menciona expresamente que se consultó a diez clientes habituales."
      },
      {
        "text": "La selección podría favorecer a personas que ya compran el producto.",
        "tag": "inference",
        "explanation": "Se trata de una interpretación plausible apoyada en los datos, no de un resultado comprobado."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-detective-v1-principiante-3",
    "level": "principiante",
    "subtopic": "Lectura crítica",
    "title": "La noticia del huerto",
    "passage": "Una nota afirma que el huerto escolar solucionó el hambre de todos los alumnos. El texto únicamente explica que veinte estudiantes cosecharon verduras durante una semana. La directora pidió corregir el titular para que no excediera esos datos.",
    "claims": [
      {
        "text": "Veinte alumnos cosecharon verduras.",
        "tag": "explicit",
        "explanation": "El texto menciona expresamente que veinte alumnos cosecharon verduras."
      },
      {
        "text": "El titular debería limitarse al alcance de la cosecha descrita.",
        "tag": "inference",
        "explanation": "Se trata de una interpretación plausible apoyada en los datos, no de un resultado comprobado."
      },
      {
        "text": "La producción alimentó a todos durante un año.",
        "tag": "unsupported",
        "explanation": "El pasaje no ofrece información suficiente para sostener esa conclusión categórica."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-detective-v1-principiante-4",
    "level": "principiante",
    "subtopic": "Lectura crítica",
    "title": "Dos fotografías",
    "passage": "Una publicación muestra una foto de una plaza vacía a primera hora y concluye que nadie visita el lugar. Un vecino comparte otra imagen tomada durante la tarde y pide observar horarios diversos antes de generalizar.",
    "claims": [
      {
        "text": "El horario podría explicar parte de la ausencia de personas.",
        "tag": "inference",
        "explanation": "Se trata de una interpretación plausible apoyada en los datos, no de un resultado comprobado."
      },
      {
        "text": "La plaza no recibe visitantes en ningún momento.",
        "tag": "unsupported",
        "explanation": "El pasaje no ofrece información suficiente para sostener esa conclusión categórica."
      },
      {
        "text": "La primera fotografía fue tomada temprano.",
        "tag": "explicit",
        "explanation": "El texto menciona expresamente que la primera fotografía fue tomada temprano."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-detective-v1-principiante-5",
    "level": "principiante",
    "subtopic": "Lectura crítica",
    "title": "La entrevista radial",
    "passage": "Una locutora entrevistó a dos personas que criticaban una obra pública y afirmó que todo el barrio rechazaba el proyecto. La emisora no realizó una consulta amplia y recibió comentarios de oyentes con opiniones distintas.",
    "claims": [
      {
        "text": "Todas las familias rechazaron la obra.",
        "tag": "unsupported",
        "explanation": "El pasaje no ofrece información suficiente para sostener esa conclusión categórica."
      },
      {
        "text": "La locutora entrevistó a dos personas críticas.",
        "tag": "explicit",
        "explanation": "El texto menciona expresamente que la locutora entrevistó a dos personas críticas."
      },
      {
        "text": "Puede haber desacuerdos dentro del barrio.",
        "tag": "inference",
        "explanation": "Se trata de una interpretación plausible apoyada en los datos, no de un resultado comprobado."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-detective-v1-principiante-6",
    "level": "principiante",
    "subtopic": "Lectura crítica",
    "title": "El folleto del museo",
    "passage": "Un folleto asegura que cada familia de la región seguía las mismas tradiciones. Su ejemplo procede de un solo testimonio recogido en un pueblo. El museo añadió una nota aclarando que existen costumbres distintas entre comunidades.",
    "claims": [
      {
        "text": "El ejemplo proviene de un testimonio.",
        "tag": "explicit",
        "explanation": "El texto menciona expresamente que el ejemplo proviene de un testimonio."
      },
      {
        "text": "Otras comunidades podrían haber practicado tradiciones diferentes.",
        "tag": "inference",
        "explanation": "Se trata de una interpretación plausible apoyada en los datos, no de un resultado comprobado."
      },
      {
        "text": "Todas las familias compartían una costumbre idéntica.",
        "tag": "unsupported",
        "explanation": "El pasaje no ofrece información suficiente para sostener esa conclusión categórica."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-detective-v1-intermedio-7",
    "level": "intermedio",
    "subtopic": "Lectura crítica",
    "title": "Encuesta de satisfacción",
    "passage": "Una empresa presenta un 92 % de satisfacción en una gráfica sin indicar cuántas personas respondieron. Al revisar el documento, la comisión encuentra que solo se consultó a veinticinco clientes seleccionados por el personal.",
    "claims": [
      {
        "text": "La selección del personal podría sesgar el resultado.",
        "tag": "inference",
        "explanation": "Se trata de una interpretación plausible apoyada en los datos, no de un resultado comprobado."
      },
      {
        "text": "El 92 % representa necesariamente a toda la población.",
        "tag": "unsupported",
        "explanation": "El pasaje no ofrece información suficiente para sostener esa conclusión categórica."
      },
      {
        "text": "Se encuestó a veinticinco clientes.",
        "tag": "explicit",
        "explanation": "El texto menciona expresamente que se encuestó a veinticinco clientes."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-detective-v1-intermedio-8",
    "level": "intermedio",
    "subtopic": "Lectura crítica",
    "title": "Gráfico sin eje",
    "passage": "Un periódico muestra un gráfico sobre empleo cuyo eje vertical empieza en noventa, no en cero. La nota destaca una diferencia muy grande aunque los valores son cercanos. Un lector propone revisar la escala antes de interpretar el tamaño visual de la variación.",
    "claims": [
      {
        "text": "Los valores del gráfico fueron falsificados sin duda.",
        "tag": "unsupported",
        "explanation": "El pasaje no ofrece información suficiente para sostener esa conclusión categórica."
      },
      {
        "text": "El eje comienza en noventa.",
        "tag": "explicit",
        "explanation": "El texto menciona expresamente que el eje comienza en noventa."
      },
      {
        "text": "La escala podría exagerar visualmente la diferencia.",
        "tag": "inference",
        "explanation": "Se trata de una interpretación plausible apoyada en los datos, no de un resultado comprobado."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-detective-v1-intermedio-9",
    "level": "intermedio",
    "subtopic": "Lectura crítica",
    "title": "Autoría de la carta",
    "passage": "Un ensayo atribuye una carta histórica a un funcionario, pero el documento publicado no tiene firma y la fecha es incierta. La autora reconoce que necesita corroborar su procedencia antes de citarla como declaración oficial.",
    "claims": [
      {
        "text": "La carta publicada no tiene firma.",
        "tag": "explicit",
        "explanation": "El texto menciona expresamente que la carta publicada no tiene firma."
      },
      {
        "text": "La atribución podría requerir otras fuentes documentales.",
        "tag": "inference",
        "explanation": "Se trata de una interpretación plausible apoyada en los datos, no de un resultado comprobado."
      },
      {
        "text": "El funcionario escribió sin duda la carta.",
        "tag": "unsupported",
        "explanation": "El pasaje no ofrece información suficiente para sostener esa conclusión categórica."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-detective-v1-intermedio-10",
    "level": "intermedio",
    "subtopic": "Lectura crítica",
    "title": "Publicidad de un curso",
    "passage": "Una academia anuncia que sus alumnos mejoran siempre porque tres testimonios elogian sus clases. No presenta evaluaciones anteriores y posteriores, ni informa qué ocurrió con quienes abandonaron.",
    "claims": [
      {
        "text": "La publicidad no permite medir el efecto real del curso.",
        "tag": "inference",
        "explanation": "Se trata de una interpretación plausible apoyada en los datos, no de un resultado comprobado."
      },
      {
        "text": "Todas las personas matriculadas mejoraron.",
        "tag": "unsupported",
        "explanation": "El pasaje no ofrece información suficiente para sostener esa conclusión categórica."
      },
      {
        "text": "El anuncio cita tres testimonios.",
        "tag": "explicit",
        "explanation": "El texto menciona expresamente que el anuncio cita tres testimonios."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-detective-v1-intermedio-11",
    "level": "intermedio",
    "subtopic": "Lectura crítica",
    "title": "Un informe de lluvia",
    "passage": "Una nota compara los días lluviosos de una semana con el promedio anual y afirma que el clima ha cambiado definitivamente. El meteorólogo explica que una tendencia climática necesita registros de períodos comparables y prolongados.",
    "claims": [
      {
        "text": "El clima cambió definitivamente por esa semana.",
        "tag": "unsupported",
        "explanation": "El pasaje no ofrece información suficiente para sostener esa conclusión categórica."
      },
      {
        "text": "Se observó lluvia durante una semana.",
        "tag": "explicit",
        "explanation": "El texto menciona expresamente que se observó lluvia durante una semana."
      },
      {
        "text": "El período estudiado podría ser insuficiente para hablar de tendencia climática.",
        "tag": "inference",
        "explanation": "Se trata de una interpretación plausible apoyada en los datos, no de un resultado comprobado."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-detective-v1-intermedio-12",
    "level": "intermedio",
    "subtopic": "Lectura crítica",
    "title": "Encuesta voluntaria",
    "passage": "Un portal solicita opiniones sobre el transporte mediante una encuesta de acceso abierto. Miles de usuarios participan, pero nadie conoce las características de las personas que no respondieron. El editor añade una advertencia sobre autoselección.",
    "claims": [
      {
        "text": "La encuesta era de acceso abierto.",
        "tag": "explicit",
        "explanation": "El texto menciona expresamente que la encuesta era de acceso abierto."
      },
      {
        "text": "Las personas más interesadas podrían participar con mayor frecuencia.",
        "tag": "inference",
        "explanation": "Se trata de una interpretación plausible apoyada en los datos, no de un resultado comprobado."
      },
      {
        "text": "La cantidad de respuestas garantiza representatividad.",
        "tag": "unsupported",
        "explanation": "El pasaje no ofrece información suficiente para sostener esa conclusión categórica."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-detective-v1-intermedio-13",
    "level": "intermedio",
    "subtopic": "Lectura crítica",
    "title": "Fuentes contradictorias",
    "passage": "Dos periódicos describen la asistencia a una manifestación con cifras distintas. Ninguno explica cómo contó a las personas. La investigadora propone revisar fotografías, metodología y otras fuentes antes de elegir una cantidad.",
    "claims": [
      {
        "text": "Los métodos de conteo podrían explicar la discrepancia.",
        "tag": "inference",
        "explanation": "Se trata de una interpretación plausible apoyada en los datos, no de un resultado comprobado."
      },
      {
        "text": "Una de las cifras es automáticamente falsa.",
        "tag": "unsupported",
        "explanation": "El pasaje no ofrece información suficiente para sostener esa conclusión categórica."
      },
      {
        "text": "Los periódicos publicaron cifras diferentes.",
        "tag": "explicit",
        "explanation": "El texto menciona expresamente que los periódicos publicaron cifras diferentes."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-detective-v1-intermedio-14",
    "level": "intermedio",
    "subtopic": "Lectura crítica",
    "title": "El ensayo escolar",
    "passage": "Un estudiante argumenta que la biblioteca debe ampliar su horario porque a él le resulta conveniente. Su compañera propone sumar registros de visitas, peticiones de estudiantes y costos antes de recomendar cambios institucionales.",
    "claims": [
      {
        "text": "La opinión personal demuestra la necesidad de ampliar el horario.",
        "tag": "unsupported",
        "explanation": "El pasaje no ofrece información suficiente para sostener esa conclusión categórica."
      },
      {
        "text": "El estudiante habló de su conveniencia.",
        "tag": "explicit",
        "explanation": "El texto menciona expresamente que el estudiante habló de su conveniencia."
      },
      {
        "text": "Datos de uso y costos podrían hacer más sólido el argumento.",
        "tag": "inference",
        "explanation": "Se trata de una interpretación plausible apoyada en los datos, no de un resultado comprobado."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-detective-v1-intermedio-15",
    "level": "intermedio",
    "subtopic": "Lectura crítica",
    "title": "Patrocinio en la reseña",
    "passage": "Un creador publica una reseña favorable sobre una computadora y luego aclara que recibió el equipo gratis de su fabricante. La reseña incluye pruebas de uso, pero la docente pide tener en cuenta ese vínculo al evaluar la independencia de su opinión.",
    "claims": [
      {
        "text": "El fabricante proporcionó el equipo sin costo.",
        "tag": "explicit",
        "explanation": "El texto menciona expresamente que el fabricante proporcionó el equipo sin costo."
      },
      {
        "text": "El patrocinio podría influir en la valoración del creador.",
        "tag": "inference",
        "explanation": "Se trata de una interpretación plausible apoyada en los datos, no de un resultado comprobado."
      },
      {
        "text": "Cada dato de la reseña es falso por haber patrocinio.",
        "tag": "unsupported",
        "explanation": "El pasaje no ofrece información suficiente para sostener esa conclusión categórica."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-detective-v1-intermedio-16",
    "level": "intermedio",
    "subtopic": "Lectura crítica",
    "title": "Promedios engañosos",
    "passage": "Una escuela publica una mejora media en una prueba, aunque dos grupos obtuvieron peores resultados. El informe inicial destaca solo el promedio y no incorpora la distribución. La directora pide mostrar ambas dimensiones.",
    "claims": [
      {
        "text": "La media podría ocultar diferencias entre grupos.",
        "tag": "inference",
        "explanation": "Se trata de una interpretación plausible apoyada en los datos, no de un resultado comprobado."
      },
      {
        "text": "Todos los estudiantes mejoraron en igual medida.",
        "tag": "unsupported",
        "explanation": "El pasaje no ofrece información suficiente para sostener esa conclusión categórica."
      },
      {
        "text": "Dos grupos empeoraron.",
        "tag": "explicit",
        "explanation": "El texto menciona expresamente que dos grupos empeoraron."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-detective-v1-intermedio-17",
    "level": "intermedio",
    "subtopic": "Lectura crítica",
    "title": "Estudio de plantas",
    "passage": "Un artículo afirma que una lámpara produce más crecimiento vegetal, pero las macetas iluminadas también recibieron más agua. El grupo propone repetir el ensayo controlando el riego antes de atribuir una causa exclusiva.",
    "claims": [
      {
        "text": "La lámpara es la única causa probada.",
        "tag": "unsupported",
        "explanation": "El pasaje no ofrece información suficiente para sostener esa conclusión categórica."
      },
      {
        "text": "Las macetas recibían cantidades de agua diferentes.",
        "tag": "explicit",
        "explanation": "El texto menciona expresamente que las macetas recibían cantidades de agua diferentes."
      },
      {
        "text": "El riego podría explicar parte de la diferencia.",
        "tag": "inference",
        "explanation": "Se trata de una interpretación plausible apoyada en los datos, no de un resultado comprobado."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-detective-v1-intermedio-18",
    "level": "intermedio",
    "subtopic": "Lectura crítica",
    "title": "Testimonio tardío",
    "passage": "Una investigación cita un relato oral grabado cincuenta años después de un acontecimiento. El testigo ofrece detalles útiles, aunque algunos no coinciden con documentos contemporáneos. Los autores conservan ambas versiones y explican sus límites.",
    "claims": [
      {
        "text": "El testimonio fue grabado décadas después.",
        "tag": "explicit",
        "explanation": "El texto menciona expresamente que el testimonio fue grabado décadas después."
      },
      {
        "text": "Los recuerdos podrían contener imprecisiones de fecha.",
        "tag": "inference",
        "explanation": "Se trata de una interpretación plausible apoyada en los datos, no de un resultado comprobado."
      },
      {
        "text": "El testimonio carece de valor histórico por ser tardío.",
        "tag": "unsupported",
        "explanation": "El pasaje no ofrece información suficiente para sostener esa conclusión categórica."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-detective-v1-avanzado-19",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Metaanálisis heterogéneo",
    "passage": "Una síntesis reúne estudios que llaman participación a hechos distintos: asistencia a un taller, inscripción y actividad diaria. La investigadora advierte que promediar tasas sin armonizar definiciones puede producir un indicador poco interpretable.",
    "claims": [
      {
        "text": "La heterogeneidad podría invalidar el promedio combinado.",
        "tag": "inference",
        "explanation": "Se trata de una interpretación plausible apoyada en los datos, no de un resultado comprobado."
      },
      {
        "text": "Un promedio resuelve automáticamente toda diferencia conceptual.",
        "tag": "unsupported",
        "explanation": "El pasaje no ofrece información suficiente para sostener esa conclusión categórica."
      },
      {
        "text": "Los estudios usan definiciones distintas de participación.",
        "tag": "explicit",
        "explanation": "El texto menciona expresamente que los estudios usan definiciones distintas de participación."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-detective-v1-avanzado-20",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Selección de resultados",
    "passage": "Una revisión recoge solo ensayos con resultados positivos y excluye otros sin explicar por qué. Al examinar el protocolo original, un lector descubre que no existía ese criterio de exclusión. El editor solicita transparentar el proceso.",
    "claims": [
      {
        "text": "La revisión demuestra consenso absoluto.",
        "tag": "unsupported",
        "explanation": "El pasaje no ofrece información suficiente para sostener esa conclusión categórica."
      },
      {
        "text": "Se omitieron ensayos con resultados negativos.",
        "tag": "explicit",
        "explanation": "El texto menciona expresamente que se omitieron ensayos con resultados negativos."
      },
      {
        "text": "La selección podría sesgar la conclusión general.",
        "tag": "inference",
        "explanation": "Se trata de una interpretación plausible apoyada en los datos, no de un resultado comprobado."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-detective-v1-avanzado-21",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Correlación y causalidad",
    "passage": "Un informe encuentra correlación entre horas de estudio y calificaciones, pero no examina apoyo familiar o conocimientos previos. Su título asegura que cada hora adicional causa una mejora exacta. El evaluador rechaza esa afirmación causal.",
    "claims": [
      {
        "text": "El informe encuentra una correlación.",
        "tag": "explicit",
        "explanation": "El texto menciona expresamente que el informe encuentra una correlación."
      },
      {
        "text": "Otras variables podrían contribuir a la asociación.",
        "tag": "inference",
        "explanation": "Se trata de una interpretación plausible apoyada en los datos, no de un resultado comprobado."
      },
      {
        "text": "La correlación demuestra causalidad exacta y exclusiva.",
        "tag": "unsupported",
        "explanation": "El pasaje no ofrece información suficiente para sostener esa conclusión categórica."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-detective-v1-avanzado-22",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Cambio de denominador",
    "passage": "Una región informa una caída de la tasa de abandono después de redefinir quién cuenta como matriculado. El reporte no advierte el cambio y compara años como si las cifras fueran idénticas. Un auditor pide reconstruir los denominadores.",
    "claims": [
      {
        "text": "La nueva definición podría explicar parte de la caída aparente.",
        "tag": "inference",
        "explanation": "Se trata de una interpretación plausible apoyada en los datos, no de un resultado comprobado."
      },
      {
        "text": "La caída demuestra que no hubo abandono.",
        "tag": "unsupported",
        "explanation": "El pasaje no ofrece información suficiente para sostener esa conclusión categórica."
      },
      {
        "text": "Se redefinió la matrícula.",
        "tag": "explicit",
        "explanation": "El texto menciona expresamente que se redefinió la matrícula."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-detective-v1-avanzado-23",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Experimento sin control",
    "passage": "Un programa informa mejores resultados tras ofrecer tutorías, pero simultáneamente modificó exámenes y horarios. No existe grupo de comparación ni análisis de tendencias previas. El informe técnico limita sus conclusiones a una asociación observada.",
    "claims": [
      {
        "text": "Las tutorías produjeron con certeza todo el efecto.",
        "tag": "unsupported",
        "explanation": "El pasaje no ofrece información suficiente para sostener esa conclusión categórica."
      },
      {
        "text": "Exámenes y horarios también cambiaron.",
        "tag": "explicit",
        "explanation": "El texto menciona expresamente que exámenes y horarios también cambiaron."
      },
      {
        "text": "Las otras modificaciones podrían explicar parte de la mejora.",
        "tag": "inference",
        "explanation": "Se trata de una interpretación plausible apoyada en los datos, no de un resultado comprobado."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-detective-v1-avanzado-24",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Conflicto de intereses",
    "passage": "Un estudio financiado por un fabricante encuentra beneficios de su propio producto y ofrece datos metodológicos detallados. La revisora propone examinar métodos y reproducibilidad, en lugar de descartarlo automáticamente o aceptarlo por prestigio.",
    "claims": [
      {
        "text": "La empresa financió el estudio.",
        "tag": "explicit",
        "explanation": "El texto menciona expresamente que la empresa financió el estudio."
      },
      {
        "text": "El financiamiento justifica una revisión cuidadosa del método.",
        "tag": "inference",
        "explanation": "Se trata de una interpretación plausible apoyada en los datos, no de un resultado comprobado."
      },
      {
        "text": "Todo hallazgo financiado es necesariamente falso.",
        "tag": "unsupported",
        "explanation": "El pasaje no ofrece información suficiente para sostener esa conclusión categórica."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-detective-v1-avanzado-25",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Cita secundaria",
    "passage": "Un ensayo presenta palabras entre comillas como si procedieran de un acta del siglo XIX, pero su autor solo leyó una síntesis posterior. La directora pide consultar el acta o indicar expresamente que la cita es indirecta.",
    "claims": [
      {
        "text": "La atribución literal podría ser inexacta.",
        "tag": "inference",
        "explanation": "Se trata de una interpretación plausible apoyada en los datos, no de un resultado comprobado."
      },
      {
        "text": "El acta contiene exactamente esas palabras sin verificación.",
        "tag": "unsupported",
        "explanation": "El pasaje no ofrece información suficiente para sostener esa conclusión categórica."
      },
      {
        "text": "La fuente consultada era secundaria.",
        "tag": "explicit",
        "explanation": "El texto menciona expresamente que la fuente consultada era secundaria."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-detective-v1-avanzado-26",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Mortalidad y edad",
    "passage": "Una nota compara mortalidad bruta entre dos regiones, aunque una tiene una población mucho más envejecida. El investigador solicita tasas ajustadas y advierte que un dato bruto no basta para ordenar los servicios sanitarios.",
    "claims": [
      {
        "text": "La región con tasa más alta tiene necesariamente peor atención.",
        "tag": "unsupported",
        "explanation": "El pasaje no ofrece información suficiente para sostener esa conclusión categórica."
      },
      {
        "text": "Las regiones difieren en composición por edad.",
        "tag": "explicit",
        "explanation": "El texto menciona expresamente que las regiones difieren en composición por edad."
      },
      {
        "text": "Parte de la diferencia podría depender de esa composición.",
        "tag": "inference",
        "explanation": "Se trata de una interpretación plausible apoyada en los datos, no de un resultado comprobado."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-detective-v1-avanzado-27",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Modelo predictivo",
    "passage": "Un titular anuncia que una proyección económica demuestra cuánto crecerá una ciudad en diez años. El estudio real presenta tres escenarios con supuestos distintos. El editor corrige el titular para comunicar incertidumbre.",
    "claims": [
      {
        "text": "El estudio utiliza tres escenarios.",
        "tag": "explicit",
        "explanation": "El texto menciona expresamente que el estudio utiliza tres escenarios."
      },
      {
        "text": "Un cambio de supuestos podría alterar las estimaciones.",
        "tag": "inference",
        "explanation": "Se trata de una interpretación plausible apoyada en los datos, no de un resultado comprobado."
      },
      {
        "text": "El crecimiento futuro está medido con certeza absoluta.",
        "tag": "unsupported",
        "explanation": "El pasaje no ofrece información suficiente para sostener esa conclusión categórica."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-detective-v1-avanzado-28",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Estudio con abandono",
    "passage": "Un ensayo de formación inicia con 500 voluntarios y pierde a 150 antes de la medición final. El resumen comunica mejoras solo entre quienes permanecen. La revisión pide examinar si los ausentes tenían condiciones iniciales distintas.",
    "claims": [
      {
        "text": "La deserción podría sesgar el resultado publicado.",
        "tag": "inference",
        "explanation": "Se trata de una interpretación plausible apoyada en los datos, no de un resultado comprobado."
      },
      {
        "text": "Los ausentes mejoraron necesariamente de igual manera.",
        "tag": "unsupported",
        "explanation": "El pasaje no ofrece información suficiente para sostener esa conclusión categórica."
      },
      {
        "text": "No completaron la prueba final 150 participantes.",
        "tag": "explicit",
        "explanation": "El texto menciona expresamente que no completaron la prueba final 150 participantes."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-detective-v1-avanzado-29",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Datos extremos",
    "passage": "Una investigación elimina valores elevados de contaminación antes de calcular la media sin documentar las exclusiones. Los revisores piden mostrar el efecto de calcular también con todos los registros disponibles.",
    "claims": [
      {
        "text": "Eliminar extremos siempre mejora la precisión.",
        "tag": "unsupported",
        "explanation": "El pasaje no ofrece información suficiente para sostener esa conclusión categórica."
      },
      {
        "text": "Se retiraron valores elevados.",
        "tag": "explicit",
        "explanation": "El texto menciona expresamente que se retiraron valores elevados."
      },
      {
        "text": "La exclusión podría cambiar la media reportada.",
        "tag": "inference",
        "explanation": "Se trata de una interpretación plausible apoyada en los datos, no de un resultado comprobado."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-detective-v1-avanzado-30",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Serie de sensores",
    "passage": "Un municipio registra más alertas después de cambiar a sensores más sensibles. Una columna afirma que cada alerta prueba un aumento equivalente de emisiones. Los técnicos piden mediciones paralelas antes de decidir.",
    "claims": [
      {
        "text": "Los sensores nuevos son más sensibles.",
        "tag": "explicit",
        "explanation": "El texto menciona expresamente que los sensores nuevos son más sensibles."
      },
      {
        "text": "La mejora de detección podría explicar parte del aumento.",
        "tag": "inference",
        "explanation": "Se trata de una interpretación plausible apoyada en los datos, no de un resultado comprobado."
      },
      {
        "text": "Cada alerta prueba más emisiones reales.",
        "tag": "unsupported",
        "explanation": "El pasaje no ofrece información suficiente para sostener esa conclusión categórica."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-detective-v1-avanzado-31",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Unidades incompatibles",
    "passage": "Una síntesis suma resultados medidos en personas y hogares como si fueran una misma unidad estadística. El investigador advierte que las cantidades describen universos distintos y no pueden agregarse sin transformación justificada.",
    "claims": [
      {
        "text": "La suma podría crear una cifra sin significado claro.",
        "tag": "inference",
        "explanation": "Se trata de una interpretación plausible apoyada en los datos, no de un resultado comprobado."
      },
      {
        "text": "Toda cantidad numérica puede sumarse directamente.",
        "tag": "unsupported",
        "explanation": "El pasaje no ofrece información suficiente para sostener esa conclusión categórica."
      },
      {
        "text": "Un estudio mide personas y otro hogares.",
        "tag": "explicit",
        "explanation": "El texto menciona expresamente que un estudio mide personas y otro hogares."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-detective-v1-avanzado-32",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Comparación internacional",
    "passage": "Dos países registran tasas escolares calculadas con grupos de edad distintos. Un informe propone evaluar qué población incluye cada tasa antes de compararlas. La nota original omitía ese detalle metodológico.",
    "claims": [
      {
        "text": "La tasa mayor refleja necesariamente mejor aprendizaje.",
        "tag": "unsupported",
        "explanation": "El pasaje no ofrece información suficiente para sostener esa conclusión categórica."
      },
      {
        "text": "Las tasas incluyen edades distintas.",
        "tag": "explicit",
        "explanation": "El texto menciona expresamente que las tasas incluyen edades distintas."
      },
      {
        "text": "La comparación directa podría inducir errores.",
        "tag": "inference",
        "explanation": "Se trata de una interpretación plausible apoyada en los datos, no de un resultado comprobado."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-detective-v1-avanzado-33",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Efecto de promedio",
    "passage": "Una intervención muestra beneficio promedio, pero algunos participantes empeoran. El anuncio publicitario utiliza la frase todos mejoran. El evaluador pide presentar la distribución y retirar el cuantificador universal.",
    "claims": [
      {
        "text": "Algunos participantes empeoraron.",
        "tag": "explicit",
        "explanation": "El texto menciona expresamente que algunos participantes empeoraron."
      },
      {
        "text": "La media podría ocultar resultados individuales adversos.",
        "tag": "inference",
        "explanation": "Se trata de una interpretación plausible apoyada en los datos, no de un resultado comprobado."
      },
      {
        "text": "Cada participante obtuvo exactamente el mismo beneficio.",
        "tag": "unsupported",
        "explanation": "El pasaje no ofrece información suficiente para sostener esa conclusión categórica."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-detective-v1-avanzado-34",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Testimonio sin contexto",
    "passage": "Una crónica cita un testimonio de protesta sin informar cuándo se grabó ni quién lo obtuvo. El historiador considera que puede aportar pistas, pero solicita datos de procedencia antes de tratarlo como registro verificable.",
    "claims": [
      {
        "text": "La procedencia podría modificar la interpretación histórica.",
        "tag": "inference",
        "explanation": "Se trata de una interpretación plausible apoyada en los datos, no de un resultado comprobado."
      },
      {
        "text": "Todo testimonio sin fecha es necesariamente falso.",
        "tag": "unsupported",
        "explanation": "El pasaje no ofrece información suficiente para sostener esa conclusión categórica."
      },
      {
        "text": "Faltan datos sobre la obtención del testimonio.",
        "tag": "explicit",
        "explanation": "El texto menciona expresamente que faltan datos sobre la obtención del testimonio."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-detective-v1-avanzado-35",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Costos ignorados",
    "passage": "Una propuesta de transporte calcula beneficios de reducir tiempos de viaje pero no contempla los costos de mantenimiento. La comisión solicita incorporar recursos necesarios antes de afirmar que la intervención es la mejor opción.",
    "claims": [
      {
        "text": "Un beneficio de tiempo vuelve innecesario evaluar costos.",
        "tag": "unsupported",
        "explanation": "El pasaje no ofrece información suficiente para sostener esa conclusión categórica."
      },
      {
        "text": "La propuesta omite mantenimiento.",
        "tag": "explicit",
        "explanation": "El texto menciona expresamente que la propuesta omite mantenimiento."
      },
      {
        "text": "Los costos omitidos podrían alterar la comparación de alternativas.",
        "tag": "inference",
        "explanation": "Se trata de una interpretación plausible apoyada en los datos, no de un resultado comprobado."
      }
    ],
    "reviewStatus": "editorial-draft"
  }
];