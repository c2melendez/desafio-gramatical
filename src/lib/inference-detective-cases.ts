import type {Level} from "./grammar";
import type {EvidenceTag} from "./reading";
export type InferenceDetectiveCase={id:string;level:Level;subtopic:"Inferencias";title:string;passage:string;claims:{text:string;tag:EvidenceTag;explanation:string}[];reviewStatus:"editorial-draft"};
/** 36 textos para distinguir dato literal, inferencia y afirmación injustificada. */
export const INFERENCE_DETECTIVE_CASES:InferenceDetectiveCase[]=[
  {
    "id": "reading-inference-detective-v1-principiante-0",
    "level": "principiante",
    "subtopic": "Inferencias",
    "title": "Los paraguas del aula",
    "passage": "En una escuela de montaña, el comité encontró ocho paraguas olvidados después de una semana lluviosa. Colocó una caja de objetos perdidos y anunció que conservará los artículos durante treinta días. Todavía no se sabe cuántos serán reclamados.",
    "claims": [
      {
        "text": "La caja conservará artículos durante treinta días.",
        "tag": "explicit",
        "explanation": "Se expresa directamente en el pasaje: La caja conservará artículos durante treinta días."
      },
      {
        "text": "Algunos alumnos podrían recuperar paraguas gracias al aviso.",
        "tag": "inference",
        "explanation": "La posibilidad está respaldada por indicios del relato, pero el texto no la confirma como un hecho."
      },
      {
        "text": "Los ocho paraguas ya fueron devueltos a sus dueños.",
        "tag": "unsupported",
        "explanation": "El texto no proporciona datos suficientes para sostener esa conclusión absoluta."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-detective-v1-principiante-1",
    "level": "principiante",
    "subtopic": "Inferencias",
    "title": "Cine en la plaza",
    "passage": "El centro cultural proyectó una película al aire libre el sábado y prestó veinte sillas a personas mayores. Al finalizar, varios vecinos pidieron otra función. Los organizadores dijeron que evaluarán el presupuesto antes de anunciar una nueva fecha.",
    "claims": [
      {
        "text": "El centro cultural prestó veinte sillas.",
        "tag": "explicit",
        "explanation": "Se expresa directamente en el pasaje: El centro cultural prestó veinte sillas."
      },
      {
        "text": "Podría organizarse otra función si hay recursos.",
        "tag": "inference",
        "explanation": "La posibilidad está respaldada por indicios del relato, pero el texto no la confirma como un hecho."
      },
      {
        "text": "Habrá funciones gratuitas todos los sábados del año.",
        "tag": "unsupported",
        "explanation": "El texto no proporciona datos suficientes para sostener esa conclusión absoluta."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-detective-v1-principiante-2",
    "level": "principiante",
    "subtopic": "Inferencias",
    "title": "Panadería del barrio",
    "passage": "Una panadería comenzó a vender pan integral los martes y jueves. El dueño observó que algunos clientes lo compraban, pero no había contado cuántos preferían esa variedad. Decidió registrar las ventas antes de ampliar la producción.",
    "claims": [
      {
        "text": "El pan integral se vende dos días a la semana.",
        "tag": "explicit",
        "explanation": "Se expresa directamente en el pasaje: El pan integral se vende dos días a la semana."
      },
      {
        "text": "La panadería podría aumentar la producción si observa suficiente demanda.",
        "tag": "inference",
        "explanation": "La posibilidad está respaldada por indicios del relato, pero el texto no la confirma como un hecho."
      },
      {
        "text": "La mayoría de los vecinos prefiere el pan integral.",
        "tag": "unsupported",
        "explanation": "El texto no proporciona datos suficientes para sostener esa conclusión absoluta."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-detective-v1-principiante-3",
    "level": "principiante",
    "subtopic": "Inferencias",
    "title": "Señales en el sendero",
    "passage": "Un grupo juvenil vio señales dañadas en el camino de una reserva natural. Fotografió cinco puntos y entregó un mapa a los guardaparques. Estos agradecieron la información y anunciaron una inspección, sin prometer que todas las señales se cambiarían pronto.",
    "claims": [
      {
        "text": "Se fotografiaron cinco puntos del sendero.",
        "tag": "explicit",
        "explanation": "Se expresa directamente en el pasaje: Se fotografiaron cinco puntos del sendero."
      },
      {
        "text": "La inspección podría ayudar a priorizar reparaciones.",
        "tag": "inference",
        "explanation": "La posibilidad está respaldada por indicios del relato, pero el texto no la confirma como un hecho."
      },
      {
        "text": "Todas las señales fueron reemplazadas el mismo día.",
        "tag": "unsupported",
        "explanation": "El texto no proporciona datos suficientes para sostener esa conclusión absoluta."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-detective-v1-principiante-4",
    "level": "principiante",
    "subtopic": "Inferencias",
    "title": "La caja de semillas",
    "passage": "Una asociación repartió semillas de hortalizas a doce familias y explicó cómo guardarlas antes de sembrar. En la reunión nadie informó aún los resultados de las cosechas. Los organizadores planean visitar los huertos el próximo mes.",
    "claims": [
      {
        "text": "Doce familias recibieron semillas.",
        "tag": "explicit",
        "explanation": "Se expresa directamente en el pasaje: Doce familias recibieron semillas."
      },
      {
        "text": "Una visita posterior podría aportar datos sobre la germinación.",
        "tag": "inference",
        "explanation": "La posibilidad está respaldada por indicios del relato, pero el texto no la confirma como un hecho."
      },
      {
        "text": "Las doce familias obtuvieron cosechas idénticas.",
        "tag": "unsupported",
        "explanation": "El texto no proporciona datos suficientes para sostener esa conclusión absoluta."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-detective-v1-principiante-5",
    "level": "principiante",
    "subtopic": "Inferencias",
    "title": "Visita al observatorio",
    "passage": "El observatorio local abrió una jornada para estudiantes y mostró imágenes de la Luna. La nubosidad impidió usar un telescopio exterior, así que el personal explicó su funcionamiento con una maqueta. Se propuso repetir la observación cuando el cielo esté despejado.",
    "claims": [
      {
        "text": "La nubosidad impidió usar el telescopio exterior.",
        "tag": "explicit",
        "explanation": "Se expresa directamente en el pasaje: La nubosidad impidió usar el telescopio exterior."
      },
      {
        "text": "Una nueva jornada con cielo despejado podría permitir observar el cielo.",
        "tag": "inference",
        "explanation": "La posibilidad está respaldada por indicios del relato, pero el texto no la confirma como un hecho."
      },
      {
        "text": "Todos los asistentes observaron Saturno directamente.",
        "tag": "unsupported",
        "explanation": "El texto no proporciona datos suficientes para sostener esa conclusión absoluta."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-detective-v1-principiante-6",
    "level": "principiante",
    "subtopic": "Inferencias",
    "title": "El puente de madera",
    "passage": "Después de una tormenta, los vecinos detectaron una tabla suelta en el puente de acceso al parque. Señalizaron el peligro y avisaron a la municipalidad. Los técnicos todavía no habían evaluado el estado del resto de la estructura.",
    "claims": [
      {
        "text": "Los vecinos avisaron de una tabla suelta.",
        "tag": "explicit",
        "explanation": "Se expresa directamente en el pasaje: Los vecinos avisaron de una tabla suelta."
      },
      {
        "text": "La señalización podría evitar que alguien pise la zona dañada.",
        "tag": "inference",
        "explanation": "La posibilidad está respaldada por indicios del relato, pero el texto no la confirma como un hecho."
      },
      {
        "text": "La municipalidad certificó que todo el puente es seguro.",
        "tag": "unsupported",
        "explanation": "El texto no proporciona datos suficientes para sostener esa conclusión absoluta."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-detective-v1-intermedio-7",
    "level": "intermedio",
    "subtopic": "Inferencias",
    "title": "Bibliotecas y horarios",
    "passage": "Un distrito amplió los horarios de dos bibliotecas y registró más visitas en un trimestre. También empezó a contar grupos escolares que antes no incluía en las estadísticas. El informe pidió comparar registros equivalentes antes de atribuir el aumento a los horarios.",
    "claims": [
      {
        "text": "El distrito cambió su forma de contar grupos escolares.",
        "tag": "explicit",
        "explanation": "Se expresa directamente en el pasaje: El distrito cambió su forma de contar grupos escolares."
      },
      {
        "text": "Parte del incremento registrado podría reflejar la nueva medición.",
        "tag": "inference",
        "explanation": "La posibilidad está respaldada por indicios del relato, pero el texto no la confirma como un hecho."
      },
      {
        "text": "La ampliación de horarios explica necesariamente todas las visitas adicionales.",
        "tag": "unsupported",
        "explanation": "El texto no proporciona datos suficientes para sostener esa conclusión absoluta."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-detective-v1-intermedio-8",
    "level": "intermedio",
    "subtopic": "Inferencias",
    "title": "Feria de ciencia regional",
    "passage": "Tres institutos participaron en una feria regional. El informe anotó 120 visitas al pabellón de química y 90 al de biología, pero no registró cuántas personas pasaron por ambos. Los organizadores evitaron publicar una cifra de visitantes únicos.",
    "claims": [
      {
        "text": "Química registró 120 visitas.",
        "tag": "explicit",
        "explanation": "Se expresa directamente en el pasaje: Química registró 120 visitas."
      },
      {
        "text": "Algunas personas podrían figurar en ambos recuentos.",
        "tag": "inference",
        "explanation": "La posibilidad está respaldada por indicios del relato, pero el texto no la confirma como un hecho."
      },
      {
        "text": "La feria tuvo exactamente 210 visitantes distintos.",
        "tag": "unsupported",
        "explanation": "El texto no proporciona datos suficientes para sostener esa conclusión absoluta."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-detective-v1-intermedio-9",
    "level": "intermedio",
    "subtopic": "Inferencias",
    "title": "Dos cultivos de maíz",
    "passage": "Agricultores compararon la cosecha de dos parcelas y observaron más kilos en una de ellas. Esa parcela también tenía mayor superficie y recibió riego adicional. El equipo propuso medir producción por área antes de atribuir el resultado a una sola técnica.",
    "claims": [
      {
        "text": "Una parcela tenía más superficie.",
        "tag": "explicit",
        "explanation": "Se expresa directamente en el pasaje: Una parcela tenía más superficie."
      },
      {
        "text": "El mayor total podría deberse en parte al tamaño del terreno.",
        "tag": "inference",
        "explanation": "La posibilidad está respaldada por indicios del relato, pero el texto no la confirma como un hecho."
      },
      {
        "text": "La técnica de cultivo fue probada como causa exclusiva.",
        "tag": "unsupported",
        "explanation": "El texto no proporciona datos suficientes para sostener esa conclusión absoluta."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-detective-v1-intermedio-10",
    "level": "intermedio",
    "subtopic": "Inferencias",
    "title": "Encuesta del transporte",
    "passage": "Una asociación difundió por internet un formulario sobre rutas urbanas y obtuvo 250 respuestas voluntarias. El reporte admitió que no conocía la opinión de quienes carecían de conexión y preparó entrevistas en paradas de autobús.",
    "claims": [
      {
        "text": "La encuesta recibió 250 respuestas voluntarias.",
        "tag": "explicit",
        "explanation": "Se expresa directamente en el pasaje: La encuesta recibió 250 respuestas voluntarias."
      },
      {
        "text": "Las entrevistas en paradas podrían incorporar usuarios no representados.",
        "tag": "inference",
        "explanation": "La posibilidad está respaldada por indicios del relato, pero el texto no la confirma como un hecho."
      },
      {
        "text": "Los resultados representan a todos los habitantes sin sesgo.",
        "tag": "unsupported",
        "explanation": "El texto no proporciona datos suficientes para sostener esa conclusión absoluta."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-detective-v1-intermedio-11",
    "level": "intermedio",
    "subtopic": "Inferencias",
    "title": "El archivo de fotografías",
    "passage": "Dos fotografías antiguas mostraban la misma calle, pero una parecía más estrecha. El historiador observó que se habían tomado con lentes distintos y decidió contrastar planos antes de concluir que la vía había cambiado de tamaño.",
    "claims": [
      {
        "text": "Las fotografías fueron tomadas con lentes diferentes.",
        "tag": "explicit",
        "explanation": "Se expresa directamente en el pasaje: Las fotografías fueron tomadas con lentes diferentes."
      },
      {
        "text": "La perspectiva podría explicar parte de la diferencia visual.",
        "tag": "inference",
        "explanation": "La posibilidad está respaldada por indicios del relato, pero el texto no la confirma como un hecho."
      },
      {
        "text": "La calle fue ensanchada exactamente tres metros entre las fotografías.",
        "tag": "unsupported",
        "explanation": "El texto no proporciona datos suficientes para sostener esa conclusión absoluta."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-detective-v1-intermedio-12",
    "level": "intermedio",
    "subtopic": "Inferencias",
    "title": "Campaña de bicicletas",
    "passage": "Una alcaldía habilitó un carril para bicicletas y luego aumentó el número de viajes registrados. También había abierto una estación de alquiler en el mismo período. Los técnicos recomendaron estudiar ambas medidas por separado.",
    "claims": [
      {
        "text": "Se abrió una estación de alquiler.",
        "tag": "explicit",
        "explanation": "Se expresa directamente en el pasaje: Se abrió una estación de alquiler."
      },
      {
        "text": "El aumento de viajes podría relacionarse con las dos medidas.",
        "tag": "inference",
        "explanation": "La posibilidad está respaldada por indicios del relato, pero el texto no la confirma como un hecho."
      },
      {
        "text": "El carril causó por sí solo todos los viajes adicionales.",
        "tag": "unsupported",
        "explanation": "El texto no proporciona datos suficientes para sostener esa conclusión absoluta."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-detective-v1-intermedio-13",
    "level": "intermedio",
    "subtopic": "Inferencias",
    "title": "El comedor municipal",
    "passage": "Un comedor informó una caída del gasto mensual en alimentos. Durante el mes también atendió menos días por un cierre temporal. La administración propuso calcular gasto por comida servida para conocer si realmente compró con mayor eficiencia.",
    "claims": [
      {
        "text": "El comedor tuvo menos días de atención.",
        "tag": "explicit",
        "explanation": "Se expresa directamente en el pasaje: El comedor tuvo menos días de atención."
      },
      {
        "text": "La reducción de gasto podría no implicar una mejora de eficiencia.",
        "tag": "inference",
        "explanation": "La posibilidad está respaldada por indicios del relato, pero el texto no la confirma como un hecho."
      },
      {
        "text": "Cada comida costó menos porque bajó el total mensual.",
        "tag": "unsupported",
        "explanation": "El texto no proporciona datos suficientes para sostener esa conclusión absoluta."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-detective-v1-intermedio-14",
    "level": "intermedio",
    "subtopic": "Inferencias",
    "title": "Voces de una fiesta",
    "passage": "Un museo reunió entrevistas sobre una antigua fiesta del pueblo. Varias personas coincidían en el lugar de celebración, pero diferían en el año. El catálogo conservará las versiones mientras se contrastan documentos municipales.",
    "claims": [
      {
        "text": "Las entrevistas discrepan sobre el año de la fiesta.",
        "tag": "explicit",
        "explanation": "Se expresa directamente en el pasaje: Las entrevistas discrepan sobre el año de la fiesta."
      },
      {
        "text": "Los documentos municipales podrían ayudar a precisar la fecha.",
        "tag": "inference",
        "explanation": "La posibilidad está respaldada por indicios del relato, pero el texto no la confirma como un hecho."
      },
      {
        "text": "Se demostró que una de las personas mintió deliberadamente.",
        "tag": "unsupported",
        "explanation": "El texto no proporciona datos suficientes para sostener esa conclusión absoluta."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-detective-v1-intermedio-15",
    "level": "intermedio",
    "subtopic": "Inferencias",
    "title": "Dos notas de lectura",
    "passage": "Una clase comparó dos reseñas del mismo cuento. Una enfatizó las decisiones de la protagonista y la otra analizó el lenguaje figurado. La docente explicó que ambos enfoques podían ser pertinentes si se respaldaban con pasajes del texto.",
    "claims": [
      {
        "text": "Las reseñas usaron enfoques diferentes.",
        "tag": "explicit",
        "explanation": "Se expresa directamente en el pasaje: Las reseñas usaron enfoques diferentes."
      },
      {
        "text": "Una lectura podría complementar a la otra al analizar dimensiones distintas.",
        "tag": "inference",
        "explanation": "La posibilidad está respaldada por indicios del relato, pero el texto no la confirma como un hecho."
      },
      {
        "text": "Solo una reseña puede ser válida porque son diferentes.",
        "tag": "unsupported",
        "explanation": "El texto no proporciona datos suficientes para sostener esa conclusión absoluta."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-detective-v1-intermedio-16",
    "level": "intermedio",
    "subtopic": "Inferencias",
    "title": "La medición del aire",
    "passage": "Un laboratorio instaló sensores de partículas más sensibles y registró más alertas. Sus especialistas propusieron mantener algunos aparatos anteriores para comparar resultados. No afirmaron que todas las nuevas alertas correspondieran a contaminación adicional.",
    "claims": [
      {
        "text": "Los nuevos sensores eran más sensibles.",
        "tag": "explicit",
        "explanation": "Se expresa directamente en el pasaje: Los nuevos sensores eran más sensibles."
      },
      {
        "text": "Una parte del aumento podría provenir de una mejor detección.",
        "tag": "inference",
        "explanation": "La posibilidad está respaldada por indicios del relato, pero el texto no la confirma como un hecho."
      },
      {
        "text": "Cada alerta nueva demuestra una emisión industrial adicional.",
        "tag": "unsupported",
        "explanation": "El texto no proporciona datos suficientes para sostener esa conclusión absoluta."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-detective-v1-intermedio-17",
    "level": "intermedio",
    "subtopic": "Inferencias",
    "title": "Un torneo escolar",
    "passage": "Dos colegios reportaron resultados de competencias deportivas, pero uno contaba partidos jugados y otro jugadores inscritos. Los coordinadores señalaron que ambos números describen variables diferentes y decidieron no combinarlos en una sola tasa.",
    "claims": [
      {
        "text": "Los colegios registraban variables distintas.",
        "tag": "explicit",
        "explanation": "Se expresa directamente en el pasaje: Los colegios registraban variables distintas."
      },
      {
        "text": "Un indicador común podría facilitar comparaciones futuras.",
        "tag": "inference",
        "explanation": "La posibilidad está respaldada por indicios del relato, pero el texto no la confirma como un hecho."
      },
      {
        "text": "Los partidos jugados equivalen siempre al número de participantes.",
        "tag": "unsupported",
        "explanation": "El texto no proporciona datos suficientes para sostener esa conclusión absoluta."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-detective-v1-intermedio-18",
    "level": "intermedio",
    "subtopic": "Inferencias",
    "title": "Ruta a la clínica",
    "passage": "Una ruta de autobús tardaba menos tiempo en movimiento, pero tenía esperas más largas en sus paradas. Los vecinos pidieron medir puerta a puerta antes de recomendar la ruta más rápida para las citas médicas.",
    "claims": [
      {
        "text": "La ruta tenía esperas más largas.",
        "tag": "explicit",
        "explanation": "Se expresa directamente en el pasaje: La ruta tenía esperas más largas."
      },
      {
        "text": "El trayecto más corto podría no producir el menor tiempo total.",
        "tag": "inference",
        "explanation": "La posibilidad está respaldada por indicios del relato, pero el texto no la confirma como un hecho."
      },
      {
        "text": "La ruta con menos minutos en movimiento siempre es la más rápida.",
        "tag": "unsupported",
        "explanation": "El texto no proporciona datos suficientes para sostener esa conclusión absoluta."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-detective-v1-avanzado-19",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Ensayo sin asignación",
    "passage": "Una investigación comparó voluntarios que asistieron a tutorías con estudiantes que no participaron. Los primeros tenían notas más altas desde el inicio. El equipo presentó cambios observados, pero evitó afirmar un efecto causal sin considerar esas diferencias iniciales.",
    "claims": [
      {
        "text": "Los participantes tenían notas iniciales más altas.",
        "tag": "explicit",
        "explanation": "Se expresa directamente en el pasaje: Los participantes tenían notas iniciales más altas."
      },
      {
        "text": "Las diferencias de partida podrían explicar parte de la brecha final.",
        "tag": "inference",
        "explanation": "La posibilidad está respaldada por indicios del relato, pero el texto no la confirma como un hecho."
      },
      {
        "text": "La tutoría causó toda la diferencia observada al finalizar.",
        "tag": "unsupported",
        "explanation": "El texto no proporciona datos suficientes para sostener esa conclusión absoluta."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-detective-v1-avanzado-20",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Tasas de dos hospitales",
    "passage": "Dos hospitales informaron tasas de reingreso, pero uno incluía visitas a urgencias y otro solo hospitalizaciones. Los investigadores declararon que las tasas no eran equivalentes hasta armonizar qué se consideraba reingreso.",
    "claims": [
      {
        "text": "Los hospitales tenían definiciones distintas de reingreso.",
        "tag": "explicit",
        "explanation": "Se expresa directamente en el pasaje: Los hospitales tenían definiciones distintas de reingreso."
      },
      {
        "text": "Una definición común podría cambiar la comparación entre hospitales.",
        "tag": "inference",
        "explanation": "La posibilidad está respaldada por indicios del relato, pero el texto no la confirma como un hecho."
      },
      {
        "text": "La tasa mayor prueba necesariamente peor calidad asistencial.",
        "tag": "unsupported",
        "explanation": "El texto no proporciona datos suficientes para sostener esa conclusión absoluta."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-detective-v1-avanzado-21",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Encuesta autoseleccionada",
    "passage": "Un portal obtuvo miles de respuestas sobre el consumo de noticias mediante un enlace abierto. La autora explicó que muchas respuestas no constituyen por sí solas una muestra aleatoria y que el sesgo de autoselección debía evaluarse.",
    "claims": [
      {
        "text": "La encuesta utilizó un enlace abierto.",
        "tag": "explicit",
        "explanation": "Se expresa directamente en el pasaje: La encuesta utilizó un enlace abierto."
      },
      {
        "text": "El perfil de quienes contestaron podría diferir del público general.",
        "tag": "inference",
        "explanation": "La posibilidad está respaldada por indicios del relato, pero el texto no la confirma como un hecho."
      },
      {
        "text": "El número de respuestas garantiza representatividad nacional.",
        "tag": "unsupported",
        "explanation": "El texto no proporciona datos suficientes para sostener esa conclusión absoluta."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-detective-v1-avanzado-22",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Riesgo y edad",
    "passage": "Una región registró más diagnósticos de una enfermedad que otra. Los analistas descubrieron proporciones de personas mayores muy diferentes y calcularon tasas ajustadas antes de extraer conclusiones comparativas.",
    "claims": [
      {
        "text": "Las regiones tenían estructuras de edad distintas.",
        "tag": "explicit",
        "explanation": "Se expresa directamente en el pasaje: Las regiones tenían estructuras de edad distintas."
      },
      {
        "text": "El ajuste podría alterar las diferencias aparentes de riesgo.",
        "tag": "inference",
        "explanation": "La posibilidad está respaldada por indicios del relato, pero el texto no la confirma como un hecho."
      },
      {
        "text": "Las tasas sin ajuste prueban una causa genética exclusiva.",
        "tag": "unsupported",
        "explanation": "El texto no proporciona datos suficientes para sostener esa conclusión absoluta."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-detective-v1-avanzado-23",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Revisión de literatura",
    "passage": "Una revisión reunió estudios que informaban beneficios de un método y otros que no encontraban mejoras. Los autores examinaron diseños y tamaños de muestra antes de informar que existían resultados heterogéneos.",
    "claims": [
      {
        "text": "Se encontraron investigaciones con resultados distintos.",
        "tag": "explicit",
        "explanation": "Se expresa directamente en el pasaje: Se encontraron investigaciones con resultados distintos."
      },
      {
        "text": "Las diferencias metodológicas podrían explicar parte de la heterogeneidad.",
        "tag": "inference",
        "explanation": "La posibilidad está respaldada por indicios del relato, pero el texto no la confirma como un hecho."
      },
      {
        "text": "Todos los estudios demuestran exactamente el mismo resultado.",
        "tag": "unsupported",
        "explanation": "El texto no proporciona datos suficientes para sostener esa conclusión absoluta."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-detective-v1-avanzado-24",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Serie de temperaturas",
    "passage": "Un instituto cambió el modelo de termómetro a mitad de una serie histórica. Los técnicos observaron variaciones y midieron ambos instrumentos en paralelo para distinguir un cambio ambiental de una posible diferencia de calibración.",
    "claims": [
      {
        "text": "Se utilizaron dos modelos de termómetro.",
        "tag": "explicit",
        "explanation": "Se expresa directamente en el pasaje: Se utilizaron dos modelos de termómetro."
      },
      {
        "text": "La calibración podría influir en la discontinuidad de la serie.",
        "tag": "inference",
        "explanation": "La posibilidad está respaldada por indicios del relato, pero el texto no la confirma como un hecho."
      },
      {
        "text": "La diferencia de medidas demuestra un calentamiento exclusivo.",
        "tag": "unsupported",
        "explanation": "El texto no proporciona datos suficientes para sostener esa conclusión absoluta."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-detective-v1-avanzado-25",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Deserción de seguimiento",
    "passage": "Un estudio inició con 300 participantes y terminó con 230. Los autores compararon las condiciones iniciales de quienes permanecieron y de quienes abandonaron antes de extrapolar el promedio final.",
    "claims": [
      {
        "text": "Setenta participantes dejaron el seguimiento.",
        "tag": "explicit",
        "explanation": "Se expresa directamente en el pasaje: Setenta participantes dejaron el seguimiento."
      },
      {
        "text": "El abandono podría modificar la representatividad del grupo final.",
        "tag": "inference",
        "explanation": "La posibilidad está respaldada por indicios del relato, pero el texto no la confirma como un hecho."
      },
      {
        "text": "Los ausentes habrían tenido los mismos resultados exactos.",
        "tag": "unsupported",
        "explanation": "El texto no proporciona datos suficientes para sostener esa conclusión absoluta."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-detective-v1-avanzado-26",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Una carta sin firma",
    "passage": "Un archivo encontró una carta sin firma junto con actas oficiales de una época de conflictos. El equipo comparó el vocabulario, las fechas y los hechos mencionados para estudiar su procedencia sin descartarla automáticamente.",
    "claims": [
      {
        "text": "La carta carecía de firma.",
        "tag": "explicit",
        "explanation": "Se expresa directamente en el pasaje: La carta carecía de firma."
      },
      {
        "text": "Las actas podrían ayudar a contextualizar la carta.",
        "tag": "inference",
        "explanation": "La posibilidad está respaldada por indicios del relato, pero el texto no la confirma como un hecho."
      },
      {
        "text": "El anonimato prueba que la carta es falsa en todas sus partes.",
        "tag": "unsupported",
        "explanation": "El texto no proporciona datos suficientes para sostener esa conclusión absoluta."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-detective-v1-avanzado-27",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Promedio de becas",
    "passage": "Un programa de becas reportó mejora en asistencia media, pero el beneficio fue desigual entre zonas rurales y urbanas. El equipo publicó resultados por zona y recomendó estudiar barreras de transporte antes de extender la medida.",
    "claims": [
      {
        "text": "Hubo diferencias entre zonas rurales y urbanas.",
        "tag": "explicit",
        "explanation": "Se expresa directamente en el pasaje: Hubo diferencias entre zonas rurales y urbanas."
      },
      {
        "text": "Las barreras de transporte podrían contribuir a los resultados desiguales.",
        "tag": "inference",
        "explanation": "La posibilidad está respaldada por indicios del relato, pero el texto no la confirma como un hecho."
      },
      {
        "text": "La mejora media demuestra que cada comunidad mejoró igual.",
        "tag": "unsupported",
        "explanation": "El texto no proporciona datos suficientes para sostener esa conclusión absoluta."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-detective-v1-avanzado-28",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Gasto y tarifas",
    "passage": "Un municipio informó menos gasto eléctrico después de renovar edificios. En el período también bajaron las tarifas y algunos centros cerraron temporalmente. El informe propuso comparar consumo físico por día operativo.",
    "claims": [
      {
        "text": "Las tarifas disminuyeron durante el período.",
        "tag": "explicit",
        "explanation": "Se expresa directamente en el pasaje: Las tarifas disminuyeron durante el período."
      },
      {
        "text": "Parte del ahorro monetario podría provenir de tarifas y cierres.",
        "tag": "inference",
        "explanation": "La posibilidad está respaldada por indicios del relato, pero el texto no la confirma como un hecho."
      },
      {
        "text": "Toda reducción de gasto demuestra igual ahorro de energía.",
        "tag": "unsupported",
        "explanation": "El texto no proporciona datos suficientes para sostener esa conclusión absoluta."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-detective-v1-avanzado-29",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Cuestionarios divergentes",
    "passage": "Dos encuestas sobre lectura ofrecieron cifras diferentes. Una preguntaba por libros recreativos y otra incluía materiales obligatorios. El equipo pidió comparar preguntas equivalentes antes de afirmar que los hábitos habían cambiado.",
    "claims": [
      {
        "text": "Las encuestas usaron definiciones diferentes de lectura.",
        "tag": "explicit",
        "explanation": "Se expresa directamente en el pasaje: Las encuestas usaron definiciones diferentes de lectura."
      },
      {
        "text": "La redacción de las preguntas podría influir en los resultados.",
        "tag": "inference",
        "explanation": "La posibilidad está respaldada por indicios del relato, pero el texto no la confirma como un hecho."
      },
      {
        "text": "La diferencia prueba necesariamente que una encuesta fue falsificada.",
        "tag": "unsupported",
        "explanation": "El texto no proporciona datos suficientes para sostener esa conclusión absoluta."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-detective-v1-avanzado-30",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Previsión de cosecha",
    "passage": "Un centro agrícola elaboró pronósticos de cosecha según escenarios de lluvias y precios. Explicó que las cifras futuras dependen de supuestos y no equivalen a cantidades ya recolectadas.",
    "claims": [
      {
        "text": "Los pronósticos dependían de escenarios.",
        "tag": "explicit",
        "explanation": "Se expresa directamente en el pasaje: Los pronósticos dependían de escenarios."
      },
      {
        "text": "Cambios en los supuestos podrían modificar las proyecciones.",
        "tag": "inference",
        "explanation": "La posibilidad está respaldada por indicios del relato, pero el texto no la confirma como un hecho."
      },
      {
        "text": "Los cultivos futuros ya se recogieron y pesaron.",
        "tag": "unsupported",
        "explanation": "El texto no proporciona datos suficientes para sostener esa conclusión absoluta."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-detective-v1-avanzado-31",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Conclusiones por subgrupo",
    "passage": "Una evaluación de talleres halló una mejora media positiva, aunque varios grupos pequeños empeoraron. La síntesis presentó tanto el promedio como las variaciones por grupo y evitó afirmar beneficios uniformes.",
    "claims": [
      {
        "text": "Algunos grupos registraron empeoramientos.",
        "tag": "explicit",
        "explanation": "Se expresa directamente en el pasaje: Algunos grupos registraron empeoramientos."
      },
      {
        "text": "El promedio podría ocultar resultados desfavorables particulares.",
        "tag": "inference",
        "explanation": "La posibilidad está respaldada por indicios del relato, pero el texto no la confirma como un hecho."
      },
      {
        "text": "Todas las personas mejoraron exactamente lo mismo.",
        "tag": "unsupported",
        "explanation": "El texto no proporciona datos suficientes para sostener esa conclusión absoluta."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-detective-v1-avanzado-32",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Muestras de agua",
    "passage": "Un grupo tomó muestras de agua en cinco puntos de un río, siempre durante la mañana. El informe reconoció que no había estudiado variaciones nocturnas ni otras estaciones y limitó su conclusión a las condiciones observadas.",
    "claims": [
      {
        "text": "Las muestras se recogieron por la mañana.",
        "tag": "explicit",
        "explanation": "Se expresa directamente en el pasaje: Las muestras se recogieron por la mañana."
      },
      {
        "text": "Las mediciones nocturnas podrían mostrar patrones diferentes.",
        "tag": "inference",
        "explanation": "La posibilidad está respaldada por indicios del relato, pero el texto no la confirma como un hecho."
      },
      {
        "text": "Las cinco muestras describen toda la cuenca en cualquier época.",
        "tag": "unsupported",
        "explanation": "El texto no proporciona datos suficientes para sostener esa conclusión absoluta."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-detective-v1-avanzado-33",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Evaluación de costos",
    "passage": "Una institución estudió los beneficios de un nuevo programa y registró gastos de personal, transporte y materiales. Antes de recomendar su ampliación, advirtió que algunos efectos seguían sin medirse.",
    "claims": [
      {
        "text": "El informe registró tres tipos de gastos.",
        "tag": "explicit",
        "explanation": "Se expresa directamente en el pasaje: El informe registró tres tipos de gastos."
      },
      {
        "text": "La falta de ciertas mediciones podría justificar una expansión gradual.",
        "tag": "inference",
        "explanation": "La posibilidad está respaldada por indicios del relato, pero el texto no la confirma como un hecho."
      },
      {
        "text": "Todos los efectos y costos quedaron demostrados definitivamente.",
        "tag": "unsupported",
        "explanation": "El texto no proporciona datos suficientes para sostener esa conclusión absoluta."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-detective-v1-avanzado-34",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Tres testimonios",
    "passage": "Un historiador comparó una entrevista tardía, una carta contemporánea y un resumen anónimo sobre una huelga. Reconoció aportes y límites de cada fuente y buscó documentos independientes para verificar discrepancias.",
    "claims": [
      {
        "text": "Se analizaron tres tipos de fuentes.",
        "tag": "explicit",
        "explanation": "Se expresa directamente en el pasaje: Se analizaron tres tipos de fuentes."
      },
      {
        "text": "El contraste externo podría aclarar diferencias entre relatos.",
        "tag": "inference",
        "explanation": "La posibilidad está respaldada por indicios del relato, pero el texto no la confirma como un hecho."
      },
      {
        "text": "La fuente más antigua es siempre verdadera sin revisión.",
        "tag": "unsupported",
        "explanation": "El texto no proporciona datos suficientes para sostener esa conclusión absoluta."
      }
    ],
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-inference-detective-v1-avanzado-35",
    "level": "avanzado",
    "subtopic": "Inferencias",
    "title": "Revisión de rutas escolares",
    "passage": "Un equipo comparó retrasos en rutas escolares de varios barrios y observó tiempos mayores cerca de obras viales. También registró cambios de horarios y lluvia durante parte de la semana. La comisión pidió analizar períodos comparables antes de atribuir todos los retrasos a las obras.",
    "claims": [
      {
        "text": "Se observaron tiempos mayores cerca de obras viales.",
        "tag": "explicit",
        "explanation": "El informe menciona expresamente esa observación territorial."
      },
      {
        "text": "Las obras pudieron contribuir a algunos retrasos, junto con otras condiciones.",
        "tag": "inference",
        "explanation": "La cercanía de las obras permite esa hipótesis, sin probar una única causa."
      },
      {
        "text": "Las obras explicaron por sí solas todos los retrasos de cada barrio.",
        "tag": "unsupported",
        "explanation": "El informe también señala lluvia y cambios de horario; no demuestra causalidad exclusiva."
      }
    ],
    "reviewStatus": "editorial-draft"
  }
];