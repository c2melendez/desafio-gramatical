// Candidates only. Do not expose in public navigation before RDG_READY.
import type {ReviewRoute} from "@/components/review/SharedReview";
export const IDEA_REVIEW:ReviewRoute={
  "context": "Español · Comprensión lectora",
  "title": "Idea principal",
  "intro": "Distingue tema, detalles y síntesis fiel.",
  "summary": [
    {
      "label": "Tema",
      "text": "Asunto del que se habla."
    },
    {
      "label": "Idea principal",
      "text": "Proposición que integra lo que el texto sostiene."
    },
    {
      "label": "Detalles",
      "text": "Datos, ejemplos y precisiones que apoyan la idea."
    }
  ],
  "lessons": [
    {
      "id": "IP-A1",
      "objectiveIds": [
        "IP-01"
      ],
      "title": "Tema y propósito",
      "prompt": "El vivero escolar guarda semillas de especies locales. Las etiqueta y conserva en envases secos para sembrarlas durante el siguiente curso. ¿Qué idea engloba ambas acciones?",
      "options": [
        "Conserva semillas locales para la próxima siembra.",
        "Usa envases secos.",
        "El vivero escolar.",
        "Vende semillas locales."
      ],
      "answer": "Conserva semillas locales para la próxima siembra.",
      "explanation": "Etiquetar y mantener secas las semillas facilita conservarlas hasta la siguiente siembra.",
      "errors": {
        "Usa envases secos.": "Es un medio, no el propósito global.",
        "El vivero escolar.": "Nombra el tema, no lo que se sostiene.",
        "Vende semillas locales.": "No se menciona ninguna venta."
      },
      "bridge": [
        {
          "label": "Tema",
          "text": "Semillas del vivero."
        },
        {
          "label": "Acciones",
          "text": "Etiquetar y guardar."
        },
        {
          "label": "Propósito",
          "text": "Identifica para qué se realizan ambas acciones."
        }
      ],
      "hint": "Relaciona las evidencias y la condición que pregunta el enunciado."
    },
    {
      "id": "IP-A2",
      "objectiveIds": [
        "IP-02"
      ],
      "title": "Une los indicios",
      "prompt": "El mercado redujo el uso de bolsas desechables. Los clientes empezaron a llevar recipientes y los puestos ofrecen bolsas reutilizables. ¿Qué conclusión común se sostiene?",
      "options": [
        "Ya no se usa ninguna bolsa.",
        "Clientes y puestos contribuyen a reducir las bolsas desechables.",
        "Solo los clientes cambiaron sus hábitos.",
        "El mercado dejó de vender alimentos."
      ],
      "answer": "Clientes y puestos contribuyen a reducir las bolsas desechables.",
      "explanation": "Las dos acciones tienen una finalidad común; la conclusión debe incluirlas sin exagerar.",
      "errors": {
        "Ya no se usa ninguna bolsa.": "Reducir no significa eliminar.",
        "Solo los clientes cambiaron sus hábitos.": "También cambiaron los puestos.",
        "El mercado dejó de vender alimentos.": "No hay evidencia de ello."
      },
      "bridge": [
        {
          "label": "Clientes",
          "text": "Llevan recipientes."
        },
        {
          "label": "Puestos",
          "text": "Ofrecen bolsas reutilizables."
        },
        {
          "label": "Relación",
          "text": "Busca el efecto compartido."
        }
      ],
      "hint": "Relaciona las evidencias y la condición que pregunta el enunciado."
    },
    {
      "id": "IP-A3",
      "objectiveIds": [
        "IP-03"
      ],
      "title": "El título fiel",
      "prompt": "Una biblioteca abre más horas los sábados para estudiantes que trabajan entre semana; durante el resto de días conserva su horario. ¿Qué título representa el cambio sin exagerar?",
      "options": [
        "Biblioteca abierta toda la semana por más horas.",
        "Todos los estudiantes trabajan.",
        "Horario sabatino ampliado para facilitar el acceso.",
        "Cierre de bibliotecas entre semana."
      ],
      "answer": "Horario sabatino ampliado para facilitar el acceso.",
      "explanation": "Una síntesis fiel conserva el cambio, su finalidad y su alcance temporal.",
      "errors": {
        "Biblioteca abierta toda la semana por más horas.": "El resto de días no cambia.",
        "Todos los estudiantes trabajan.": "El texto solo describe un grupo.",
        "Cierre de bibliotecas entre semana.": "Conservar horario no significa cerrar."
      },
      "bridge": [
        {
          "label": "Cambio",
          "text": "Más horas los sábados."
        },
        {
          "label": "Límite",
          "text": "Resto de días sin cambios."
        }
      ],
      "hint": "Relaciona las evidencias y la condición que pregunta el enunciado."
    }
  ],
  "transfer": [
    {
      "id": "IP-T1",
      "objectiveIds": [
        "IP-01"
      ],
      "title": "El huerto",
      "prompt": "Un grupo recoge agua de lluvia para regar un huerto. Usa depósitos cerrados y riega al amanecer. ¿Qué idea central sintetiza el párrafo?",
      "options": [
        "Aprovecha agua de lluvia para regar el huerto.",
        "Riega al amanecer.",
        "Usa depósitos cerrados.",
        "El huerto no necesita agua."
      ],
      "answer": "Aprovecha agua de lluvia para regar el huerto.",
      "explanation": "El propósito de recoger agua explica las acciones descritas.",
      "errors": {
        "Riega al amanecer.": "Es un detalle de horario.",
        "Usa depósitos cerrados.": "Es un medio de almacenamiento.",
        "El huerto no necesita agua.": "Contradice el propósito del riego."
      }
    },
    {
      "id": "IP-T2",
      "objectiveIds": [
        "IP-02"
      ],
      "title": "Precios comparables",
      "prompt": "En una feria algunos puestos muestran precios por unidad y otros por peso. Una guía propone convertirlos a la misma unidad antes de elegir. ¿Qué recomendación integra el texto?",
      "options": [
        "Comparar precios utilizando una unidad común.",
        "Comprar siempre por peso.",
        "Elegir el número más pequeño.",
        "Evitar todos los puestos."
      ],
      "answer": "Comparar precios utilizando una unidad común.",
      "explanation": "Una unidad común permite comparar precios de forma pertinente.",
      "errors": {
        "Comprar siempre por peso.": "No hay evidencia de que siempre convenga.",
        "Elegir el número más pequeño.": "Los números pueden corresponder a unidades distintas.",
        "Evitar todos los puestos.": "La guía propone comparar, no evitar."
      }
    },
    {
      "id": "IP-T3",
      "objectiveIds": [
        "IP-03"
      ],
      "title": "Título de un taller",
      "prompt": "Un taller enseña a conservar fotografías familiares; aconseja mantenerlas secas y ordenarlas por fecha. ¿Cuál es el título más fiel?",
      "options": [
        "Cómo conservar y organizar fotografías familiares.",
        "Comprar cámaras nuevas.",
        "Digitalizar todas las fotografías.",
        "Ordenar fotografías por fecha."
      ],
      "answer": "Cómo conservar y organizar fotografías familiares.",
      "explanation": "La síntesis conserva ambos propósitos sin añadir hechos.",
      "errors": {
        "Comprar cámaras nuevas.": "No se menciona comprar cámaras.",
        "Digitalizar todas las fotografías.": "No se menciona digitalización.",
        "Ordenar fotografías por fecha.": "Omite la conservación."
      }
    }
  ]
};
export const CELL_REVIEW:ReviewRoute={
  "context": "Ciencias Naturales · Biología",
  "title": "Célula",
  "intro": "Relaciona organización, estructuras y funciones.",
  "summary": [
    {
      "label": "Organización",
      "text": "En modelos celulares típicos hay membrana, citoplasma, material genético y ribosomas."
    },
    {
      "label": "Tipos",
      "text": "La envoltura nuclear diferencia la organización eucariota de la procariota."
    },
    {
      "label": "Función",
      "text": "Ribosomas: síntesis proteica; mitocondrias: respiración aerobia y síntesis de ATP; Golgi: modificación y distribución."
    },
    {
      "label": "Modelos vegetales",
      "text": "Pared de celulosa y cloroplastos en células fotosintéticas típicas; no todas las células vegetales tienen cloroplastos."
    }
  ],
  "lessons": [
    {
      "id": "CE-A1",
      "objectiveIds": [
        "CE-01"
      ],
      "title": "Célula y virus",
      "prompt": "Una partícula acelular necesita entrar en una célula para multiplicarse. ¿Por qué no se clasifica como célula?",
      "options": [
        "Carece de organización celular y depende del hospedero para replicarse.",
        "Porque contiene material genético.",
        "Porque es pequeña.",
        "Porque posee ribosomas propios."
      ],
      "answer": "Carece de organización celular y depende del hospedero para replicarse.",
      "explanation": "Los virus son acelulares y dependen de maquinaria celular para reproducirse.",
      "errors": {
        "Porque contiene material genético.": "También las células tienen material genético.",
        "Porque es pequeña.": "El tamaño no define por sí solo una célula.",
        "Porque posee ribosomas propios.": "No se describe esa estructura y no es característica de los virus."
      },
      "bridge": [
        {
          "label": "Célula",
          "text": "Unidad de organización de los seres vivos."
        },
        {
          "label": "Virus",
          "text": "Entidad acelular dependiente de un hospedero."
        }
      ],
      "hint": "Relaciona las evidencias y la condición que pregunta el enunciado."
    },
    {
      "id": "CE-A2",
      "objectiveIds": [
        "CE-02"
      ],
      "title": "Dos modelos",
      "prompt": "A tiene ribosomas, membrana y ADN en región no delimitada; B tiene núcleo y organelos membranosos. ¿Cómo clasificas los modelos típicos?",
      "options": [
        "A eucariota; B procariota.",
        "A procariota; B eucariota.",
        "Ambas procariotas.",
        "Ambas eucariotas."
      ],
      "answer": "A procariota; B eucariota.",
      "explanation": "La presencia de un núcleo delimitado por membrana distingue la organización eucariota.",
      "errors": {
        "A eucariota; B procariota.": "Invierte el criterio de la envoltura nuclear.",
        "Ambas procariotas.": "B posee núcleo.",
        "Ambas eucariotas.": "A carece de núcleo delimitado."
      },
      "bridge": [
        {
          "label": "Modelo A",
          "text": "ADN en región sin envoltura nuclear."
        },
        {
          "label": "Modelo B",
          "text": "ADN en núcleo delimitado."
        },
        {
          "label": "Comparación",
          "text": "Ambos tienen ADN; compara dónde está organizado."
        }
      ],
      "hint": "Relaciona las evidencias y la condición que pregunta el enunciado."
    },
    {
      "id": "CE-A3",
      "objectiveIds": [
        "CE-03"
      ],
      "title": "Estructura y función",
      "prompt": "En una célula se inhibe específicamente la actividad de sus ribosomas. ¿Qué proceso directo disminuye?",
      "options": [
        "Replicación de ADN.",
        "Transporte vesicular.",
        "Síntesis de proteínas.",
        "Producción mitocondrial de ATP."
      ],
      "answer": "Síntesis de proteínas.",
      "explanation": "Los ribosomas traducen información del ARN mensajero para formar proteínas.",
      "errors": {
        "Replicación de ADN.": "No es la función directa del ribosoma.",
        "Transporte vesicular.": "Es otra función celular.",
        "Producción mitocondrial de ATP.": "No es la función directa del ribosoma."
      },
      "bridge": [
        {
          "label": "Información",
          "text": "ARN mensajero."
        },
        {
          "label": "Estructura",
          "text": "Ribosoma."
        },
        {
          "label": "Proceso",
          "text": "Relaciona traducción y producto."
        }
      ],
      "hint": "Relaciona las evidencias y la condición que pregunta el enunciado."
    },
    {
      "id": "CE-A4",
      "objectiveIds": [
        "CE-04"
      ],
      "title": "Animal y vegetal",
      "prompt": "Un modelo de célula de hoja presenta pared de celulosa, cloroplastos y núcleo. Otro modelo tiene núcleo y mitocondrias sin pared. ¿Cuál rasgo distingue el primero?",
      "options": [
        "Núcleo.",
        "Mitocondrias exclusivas de animales.",
        "Ausencia de membrana plasmática.",
        "Pared de celulosa y cloroplastos."
      ],
      "answer": "Pared de celulosa y cloroplastos.",
      "explanation": "La pared de celulosa y los cloroplastos distinguen el modelo fotosintético vegetal típico.",
      "errors": {
        "Núcleo.": "Ambos tienen núcleo.",
        "Mitocondrias exclusivas de animales.": "Las células vegetales también pueden tener mitocondrias.",
        "Ausencia de membrana plasmática.": "Las células vegetales también tienen membrana."
      },
      "bridge": [
        {
          "label": "Compartido",
          "text": "Núcleo y mitocondrias en modelos típicos."
        },
        {
          "label": "Diferencia",
          "text": "Pared de celulosa y cloroplastos en el modelo de hoja."
        }
      ],
      "hint": "Relaciona las evidencias y la condición que pregunta el enunciado."
    }
  ],
  "transfer": [
    {
      "id": "CE-T1",
      "objectiveIds": [
        "CE-01"
      ],
      "title": "Dependencia del hospedero",
      "prompt": "Se observa una estructura acelular con material genético que solo se replica en un hospedero. ¿Qué impide considerarla célula?",
      "options": [
        "Ausencia de organización celular y dependencia de hospedero.",
        "Presencia de ADN o ARN.",
        "Tamaño pequeño.",
        "Capacidad de cambiar con el tiempo."
      ],
      "answer": "Ausencia de organización celular y dependencia de hospedero.",
      "explanation": "Una entidad acelular no adquiere organización celular por poseer material genético.",
      "errors": {
        "Presencia de ADN o ARN.": "El material genético no basta para definir célula.",
        "Tamaño pequeño.": "Hay células pequeñas.",
        "Capacidad de cambiar con el tiempo.": "No es el criterio de organización celular."
      }
    },
    {
      "id": "CE-T2",
      "objectiveIds": [
        "CE-02"
      ],
      "title": "Organización del ADN",
      "prompt": "Un microorganismo presenta membrana, citoplasma, ADN y ribosomas, pero no envoltura nuclear. ¿Qué organización celular describe?",
      "options": [
        "Procariota.",
        "Eucariota vegetal.",
        "Eucariota animal.",
        "Virus acelular."
      ],
      "answer": "Procariota.",
      "explanation": "La ausencia de envoltura nuclear en ese modelo indica organización procariota.",
      "errors": {
        "Eucariota vegetal.": "El modelo típico vegetal tiene núcleo.",
        "Eucariota animal.": "El modelo típico animal tiene núcleo.",
        "Virus acelular.": "El modelo presenta organización celular y ribosomas."
      }
    },
    {
      "id": "CE-T3",
      "objectiveIds": [
        "CE-03"
      ],
      "title": "Actividad mitocondrial",
      "prompt": "Una célula aerobia disminuye específicamente la actividad mitocondrial mientras mantiene oxígeno y sustratos disponibles. ¿Qué función directa se afecta?",
      "options": [
        "Producción de ATP por respiración aerobia mitocondrial.",
        "Síntesis de proteínas por ribosomas libres.",
        "Conservación de la pared de celulosa.",
        "Duplicación nuclear del ADN."
      ],
      "answer": "Producción de ATP por respiración aerobia mitocondrial.",
      "explanation": "La respiración mitocondrial contribuye a la producción de ATP; no implica que desaparezca todo ATP.",
      "errors": {
        "Síntesis de proteínas por ribosomas libres.": "No es el efecto directo especificado.",
        "Conservación de la pared de celulosa.": "No es la función mitocondrial indicada.",
        "Duplicación nuclear del ADN.": "No es la función energética directa."
      }
    },
    {
      "id": "CE-T4",
      "objectiveIds": [
        "CE-04"
      ],
      "title": "Rasgos de tejido vegetal",
      "prompt": "Dos modelos eucariotas poseen núcleo y mitocondrias. Solo uno presenta pared de celulosa y cloroplastos. ¿Cuál representa tejido fotosintético vegetal típico?",
      "options": [
        "El modelo con pared de celulosa y cloroplastos.",
        "El modelo sin pared.",
        "Los dos por tener núcleo.",
        "Ninguno por tener mitocondrias."
      ],
      "answer": "El modelo con pared de celulosa y cloroplastos.",
      "explanation": "Los rasgos diagnósticos aquí son la pared de celulosa y los cloroplastos.",
      "errors": {
        "El modelo sin pared.": "No presenta los rasgos indicados del tejido fotosintético típico.",
        "Los dos por tener núcleo.": "El núcleo es compartido.",
        "Ninguno por tener mitocondrias.": "Las células vegetales también poseen mitocondrias."
      }
    }
  ]
};
