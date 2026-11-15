import type { Level, QuizQ } from "./grammar";
// Preguntas adicionales revisadas para secundaria; opciones con respuesta variable.
export const EXTRA_QUIZ: Record<Level, QuizQ[]> = {
  "principiante": [
    {
      "id": "extra-principiante-1",
      "q": "En «El sol brilla», ¿qué clase de palabra es «sol»?",
      "options": [
        "Verbo",
        "Sustantivo",
        "Adverbio",
        "Preposición"
      ],
      "answer": 1,
      "exp": "Nombra un astro: es sustantivo."
    },
    {
      "id": "extra-principiante-2",
      "q": "En «La casa azul», ¿qué clase de palabra es «azul»?",
      "options": [
        "Sustantivo",
        "Adjetivo",
        "Verbo",
        "Conjunción"
      ],
      "answer": 1,
      "exp": "Describe una cualidad de «casa»."
    },
    {
      "id": "extra-principiante-3",
      "q": "En «Corremos cada día», ¿qué es «corremos»?",
      "options": [
        "Pronombre",
        "Verbo",
        "Artículo",
        "Adverbio"
      ],
      "answer": 1,
      "exp": "Es una forma conjugada de «correr»."
    },
    {
      "id": "extra-principiante-4",
      "q": "En «Pedro llegó ayer», ¿qué es «ayer»?",
      "options": [
        "Adjetivo",
        "Adverbio",
        "Determinante",
        "Sustantivo"
      ],
      "answer": 1,
      "exp": "Expresa tiempo y modifica al verbo."
    },
    {
      "id": "extra-principiante-5",
      "q": "En «Ana y Luis estudian», ¿qué es «y»?",
      "options": [
        "Preposición",
        "Conjunción",
        "Pronombre",
        "Interjección"
      ],
      "answer": 1,
      "exp": "Coordina dos nombres."
    },
    {
      "id": "extra-principiante-6",
      "q": "En «Vamos hacia casa», ¿qué es «hacia»?",
      "options": [
        "Adverbio",
        "Preposición",
        "Verbo",
        "Artículo"
      ],
      "answer": 1,
      "exp": "Introduce un complemento de dirección."
    },
    {
      "id": "extra-principiante-7",
      "q": "En «¡Uf, qué calor!», ¿qué es «uf»?",
      "options": [
        "Adjetivo",
        "Interjección",
        "Verbo",
        "Pronombre"
      ],
      "answer": 1,
      "exp": "Expresa una reacción espontánea."
    },
    {
      "id": "extra-principiante-8",
      "q": "En «Mi cuaderno», ¿qué es «mi»?",
      "options": [
        "Pronombre",
        "Determinante",
        "Verbo",
        "Preposición"
      ],
      "answer": 1,
      "exp": "Es un posesivo que acompaña al nombre."
    },
    {
      "id": "extra-principiante-9",
      "q": "En «Nosotros aprendemos», ¿qué es «nosotros»?",
      "options": [
        "Determinante",
        "Pronombre",
        "Sustantivo",
        "Adverbio"
      ],
      "answer": 1,
      "exp": "Es pronombre personal de primera persona plural."
    },
    {
      "id": "extra-principiante-10",
      "q": "En «Un árbol crece», ¿qué es «un»?",
      "options": [
        "Adverbio",
        "Determinante",
        "Verbo",
        "Conjunción"
      ],
      "answer": 1,
      "exp": "Es un artículo indefinido."
    },
    {
      "id": "extra-principiante-11",
      "q": "¿Cuál de estas palabras es un verbo en infinitivo?",
      "options": [
        "Aprendiz",
        "Aprender",
        "Aprendido",
        "Aprendizaje"
      ],
      "answer": 1,
      "exp": "«Aprender» es la forma no personal del verbo."
    },
    {
      "id": "extra-principiante-12",
      "q": "¿Qué palabra indica lugar?",
      "options": [
        "Azul",
        "Aquí",
        "Casa",
        "Aunque"
      ],
      "answer": 1,
      "exp": "«Aquí» es un adverbio de lugar."
    }
  ],
  "intermedio": [
    {
      "id": "extra-intermedio-1",
      "q": "En «Estos libros», ¿qué es «estos»?",
      "options": [
        "Pronombre personal",
        "Determinante demostrativo",
        "Adverbio",
        "Conjunción"
      ],
      "answer": 1,
      "exp": "Acompaña al sustantivo «libros»."
    },
    {
      "id": "extra-intermedio-2",
      "q": "En «Estos son míos», ¿qué es «estos»?",
      "options": [
        "Artículo",
        "Pronombre demostrativo",
        "Preposición",
        "Adverbio"
      ],
      "answer": 1,
      "exp": "No acompaña a un sustantivo: lo sustituye."
    },
    {
      "id": "extra-intermedio-3",
      "q": "En «Llegaremos mañana», ¿qué tiempo verbal expresa «llegaremos»?",
      "options": [
        "Pretérito",
        "Futuro",
        "Presente",
        "Imperativo"
      ],
      "answer": 1,
      "exp": "Indica una acción posterior al momento de hablar."
    },
    {
      "id": "extra-intermedio-4",
      "q": "En «Si llueve, me quedo», ¿qué es «si»?",
      "options": [
        "Adverbio de afirmación",
        "Conjunción condicional",
        "Artículo",
        "Pronombre"
      ],
      "answer": 1,
      "exp": "Introduce una condición."
    },
    {
      "id": "extra-intermedio-5",
      "q": "En «Quizá venga», ¿qué clase de palabra es «quizá»?",
      "options": [
        "Sustantivo",
        "Adverbio de duda",
        "Determinante",
        "Verbo"
      ],
      "answer": 1,
      "exp": "Expresa posibilidad o incertidumbre."
    },
    {
      "id": "extra-intermedio-6",
      "q": "En «Nadie respondió», ¿qué es «nadie»?",
      "options": [
        "Determinante",
        "Pronombre indefinido",
        "Adjetivo",
        "Preposición"
      ],
      "answer": 1,
      "exp": "Se refiere de modo indefinido a personas."
    },
    {
      "id": "extra-intermedio-7",
      "q": "En «Tres amigas llegaron», ¿qué es «tres»?",
      "options": [
        "Adverbio de modo",
        "Determinante numeral",
        "Pronombre personal",
        "Conjunción"
      ],
      "answer": 1,
      "exp": "Cuantifica al sustantivo «amigas»."
    },
    {
      "id": "extra-intermedio-8",
      "q": "En «Habló suavemente», ¿qué es «suavemente»?",
      "options": [
        "Adjetivo",
        "Adverbio de modo",
        "Sustantivo",
        "Preposición"
      ],
      "answer": 1,
      "exp": "Modifica al verbo e indica cómo habló."
    },
    {
      "id": "extra-intermedio-9",
      "q": "En «Aunque estaba cansada, siguió», ¿qué es «aunque»?",
      "options": [
        "Preposición",
        "Conjunción concesiva",
        "Artículo",
        "Interjección"
      ],
      "answer": 1,
      "exp": "Introduce una dificultad que no impide la acción."
    },
    {
      "id": "extra-intermedio-10",
      "q": "En «No fui porque enfermó», ¿qué es «porque»?",
      "options": [
        "Pronombre relativo",
        "Conjunción causal",
        "Adverbio de lugar",
        "Determinante"
      ],
      "answer": 1,
      "exp": "Introduce la causa."
    },
    {
      "id": "extra-intermedio-11",
      "q": "En «El examen fue difícil», ¿qué es «difícil»?",
      "options": [
        "Verbo",
        "Adjetivo",
        "Pronombre",
        "Preposición"
      ],
      "answer": 1,
      "exp": "Es atributo del sujeto y conserva su categoría de adjetivo."
    },
    {
      "id": "extra-intermedio-12",
      "q": "En «Compré pan del horno», ¿qué es «del»?",
      "options": [
        "Pronombre personal",
        "Contracción de de + el",
        "Conjunción",
        "Adverbio"
      ],
      "answer": 1,
      "exp": "Fusiona preposición y artículo."
    }
  ],
  "avanzado": [
    {
      "id": "extra-avanzado-1",
      "q": "En «El que llegó primero ganó», ¿qué función tiene «que»?",
      "options": [
        "Conjunción causal",
        "Pronombre relativo",
        "Preposición",
        "Interjección"
      ],
      "answer": 1,
      "exp": "El relativo introduce una subordinada y tiene función en ella."
    },
    {
      "id": "extra-avanzado-2",
      "q": "En «Espero que regreses», ¿qué es «que»?",
      "options": [
        "Pronombre interrogativo",
        "Conjunción completiva",
        "Adjetivo",
        "Artículo"
      ],
      "answer": 1,
      "exp": "Introduce una subordinada sustantiva sin antecedente."
    },
    {
      "id": "extra-avanzado-3",
      "q": "En «¡Qué sorpresa!», ¿qué es «qué»?",
      "options": [
        "Conjunción",
        "Determinante exclamativo",
        "Preposición",
        "Verbo"
      ],
      "answer": 1,
      "exp": "Cuantifica o pondera al sustantivo «sorpresa»."
    },
    {
      "id": "extra-avanzado-4",
      "q": "En «¿Qué necesitas?», ¿qué es «qué»?",
      "options": [
        "Determinante demostrativo",
        "Pronombre interrogativo",
        "Conjunción",
        "Adverbio"
      ],
      "answer": 1,
      "exp": "Sustituye aquello por lo que se pregunta."
    },
    {
      "id": "extra-avanzado-5",
      "q": "En «No sé cómo ocurrió», ¿qué es «cómo»?",
      "options": [
        "Conjunción copulativa",
        "Adverbio interrogativo",
        "Sustantivo",
        "Artículo"
      ],
      "answer": 1,
      "exp": "Introduce una interrogativa indirecta de modo."
    },
    {
      "id": "extra-avanzado-6",
      "q": "En «Corre tan rápido como yo», ¿qué introduce «como»?",
      "options": [
        "Posesión",
        "Comparación",
        "Negación",
        "Vocativo"
      ],
      "answer": 1,
      "exp": "«Como» enlaza el segundo término de una comparación."
    },
    {
      "id": "extra-avanzado-7",
      "q": "En «Se venden entradas», ¿qué construcción aparece?",
      "options": [
        "Imperativo",
        "Pasiva refleja",
        "Vocativo",
        "Interjección"
      ],
      "answer": 1,
      "exp": "El verbo concuerda con el sujeto paciente «entradas»."
    },
    {
      "id": "extra-avanzado-8",
      "q": "En «Se vive bien aquí», ¿qué construcción aparece?",
      "options": [
        "Pasiva refleja",
        "Impersonal con se",
        "Copulativa",
        "Interrogativa"
      ],
      "answer": 1,
      "exp": "No hay sujeto léxico; el verbo aparece en singular."
    },
    {
      "id": "extra-avanzado-9",
      "q": "En «Lo importante es participar», ¿qué es «lo»?",
      "options": [
        "Pronombre personal átono",
        "Artículo neutro",
        "Preposición",
        "Conjunción"
      ],
      "answer": 1,
      "exp": "El artículo neutro sustantiva al adjetivo «importante»."
    },
    {
      "id": "extra-avanzado-10",
      "q": "En «Llegó antes de que amaneciera», «antes de que» es…",
      "options": [
        "Artículo compuesto",
        "Locución conjuntiva temporal",
        "Pronombre relativo",
        "Verbo auxiliar"
      ],
      "answer": 1,
      "exp": "Introduce una subordinada temporal."
    },
    {
      "id": "extra-avanzado-11",
      "q": "En «A pesar de la lluvia, salimos», «a pesar de» es…",
      "options": [
        "Conjunción copulativa",
        "Locución prepositiva",
        "Adverbio simple",
        "Sustantivo propio"
      ],
      "answer": 1,
      "exp": "La secuencia introduce un complemento nominal."
    },
    {
      "id": "extra-avanzado-12",
      "q": "En «Quien estudia aprende», «quien» es…",
      "options": [
        "Determinante posesivo",
        "Pronombre relativo",
        "Adverbio de lugar",
        "Conjunción causal"
      ],
      "answer": 1,
      "exp": "Introduce una relativa libre y desempeña función dentro de ella."
    }
  ]
};
