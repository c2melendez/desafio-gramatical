import type { Level, BuildQ } from "./grammar";
export const EXTRA_BUILD: Record<Level, BuildQ[]> = {
  "principiante": [
    {
      "id": "extra-b-principiante-1",
      "pattern": [
        "determinante",
        "sustantivo",
        "verbo"
      ],
      "hint": "Un animal hace ruido",
      "tiles": [
        {
          "w": "El",
          "c": "determinante"
        },
        {
          "w": "perro",
          "c": "sustantivo"
        },
        {
          "w": "ladra",
          "c": "verbo"
        },
        {
          "w": "ayer",
          "c": "adverbio"
        },
        {
          "w": "azul",
          "c": "adjetivo"
        }
      ],
      "solutions": [
        "El perro ladra"
      ],
      "exp": "La oración propuesta respeta el patrón gramatical y mantiene la concordancia."
    },
    {
      "id": "extra-b-principiante-2",
      "pattern": [
        "determinante",
        "sustantivo",
        "verbo"
      ],
      "hint": "Un astro ilumina",
      "tiles": [
        {
          "w": "La",
          "c": "determinante"
        },
        {
          "w": "luna",
          "c": "sustantivo"
        },
        {
          "w": "brilla",
          "c": "verbo"
        },
        {
          "w": "ayer",
          "c": "adverbio"
        },
        {
          "w": "azul",
          "c": "adjetivo"
        }
      ],
      "solutions": [
        "La luna brilla"
      ],
      "exp": "La oración propuesta respeta el patrón gramatical y mantiene la concordancia."
    },
    {
      "id": "extra-b-principiante-3",
      "pattern": [
        "pronombre",
        "verbo",
        "adverbio"
      ],
      "hint": "Una persona se mueve",
      "tiles": [
        {
          "w": "Ella",
          "c": "pronombre"
        },
        {
          "w": "corre",
          "c": "verbo"
        },
        {
          "w": "rápido",
          "c": "adverbio"
        },
        {
          "w": "ayer",
          "c": "adverbio"
        },
        {
          "w": "azul",
          "c": "adjetivo"
        }
      ],
      "solutions": [
        "Ella corre rápido"
      ],
      "exp": "La oración propuesta respeta el patrón gramatical y mantiene la concordancia."
    },
    {
      "id": "extra-b-principiante-4",
      "pattern": [
        "sustantivo",
        "verbo",
        "adverbio"
      ],
      "hint": "Un viaje futuro",
      "tiles": [
        {
          "w": "Carlos",
          "c": "sustantivo"
        },
        {
          "w": "viaja",
          "c": "verbo"
        },
        {
          "w": "mañana",
          "c": "adverbio"
        },
        {
          "w": "ayer",
          "c": "adverbio"
        },
        {
          "w": "azul",
          "c": "adjetivo"
        }
      ],
      "solutions": [
        "Carlos viaja mañana"
      ],
      "exp": "La oración propuesta respeta el patrón gramatical y mantiene la concordancia."
    },
    {
      "id": "extra-b-principiante-5",
      "pattern": [
        "determinante",
        "sustantivo",
        "verbo"
      ],
      "hint": "Una persona está contenta",
      "tiles": [
        {
          "w": "Mi",
          "c": "determinante"
        },
        {
          "w": "amiga",
          "c": "sustantivo"
        },
        {
          "w": "sonríe",
          "c": "verbo"
        },
        {
          "w": "ayer",
          "c": "adverbio"
        },
        {
          "w": "azul",
          "c": "adjetivo"
        }
      ],
      "solutions": [
        "Mi amiga sonríe"
      ],
      "exp": "La oración propuesta respeta el patrón gramatical y mantiene la concordancia."
    }
  ],
  "intermedio": [
    {
      "id": "extra-b-intermedio-1",
      "pattern": [
        "adverbio",
        "pronombre",
        "verbo"
      ],
      "hint": "Una actividad pasada",
      "tiles": [
        {
          "w": "Ayer",
          "c": "adverbio"
        },
        {
          "w": "nosotros",
          "c": "pronombre"
        },
        {
          "w": "estudiamos",
          "c": "verbo"
        },
        {
          "w": "ayer",
          "c": "adverbio"
        },
        {
          "w": "azul",
          "c": "adjetivo"
        }
      ],
      "solutions": [
        "Ayer nosotros estudiamos"
      ],
      "exp": "La oración propuesta respeta el patrón gramatical y mantiene la concordancia."
    },
    {
      "id": "extra-b-intermedio-2",
      "pattern": [
        "determinante",
        "sustantivo",
        "verbo",
        "adjetivo"
      ],
      "hint": "Una opinión sobre la clase",
      "tiles": [
        {
          "w": "La",
          "c": "determinante"
        },
        {
          "w": "clase",
          "c": "sustantivo"
        },
        {
          "w": "parece",
          "c": "verbo"
        },
        {
          "w": "interesante",
          "c": "adjetivo"
        },
        {
          "w": "ayer",
          "c": "adverbio"
        },
        {
          "w": "azul",
          "c": "adjetivo"
        }
      ],
      "solutions": [
        "La clase parece interesante"
      ],
      "exp": "La oración propuesta respeta el patrón gramatical y mantiene la concordancia."
    },
    {
      "id": "extra-b-intermedio-3",
      "pattern": [
        "pronombre",
        "verbo",
        "conjuncion",
        "pronombre",
        "verbo"
      ],
      "hint": "Dos actividades coordinadas",
      "tiles": [
        {
          "w": "Yo",
          "c": "pronombre"
        },
        {
          "w": "leo",
          "c": "verbo"
        },
        {
          "w": "y",
          "c": "conjuncion"
        },
        {
          "w": "tú",
          "c": "pronombre"
        },
        {
          "w": "escribes",
          "c": "verbo"
        },
        {
          "w": "ayer",
          "c": "adverbio"
        },
        {
          "w": "azul",
          "c": "adjetivo"
        }
      ],
      "solutions": [
        "Yo leo y tú escribes"
      ],
      "exp": "La oración propuesta respeta el patrón gramatical y mantiene la concordancia."
    },
    {
      "id": "extra-b-intermedio-4",
      "pattern": [
        "determinante",
        "sustantivo",
        "verbo",
        "adverbio"
      ],
      "hint": "Un retraso",
      "tiles": [
        {
          "w": "El",
          "c": "determinante"
        },
        {
          "w": "tren",
          "c": "sustantivo"
        },
        {
          "w": "llegó",
          "c": "verbo"
        },
        {
          "w": "tarde",
          "c": "adverbio"
        },
        {
          "w": "ayer",
          "c": "adverbio"
        },
        {
          "w": "azul",
          "c": "adjetivo"
        }
      ],
      "solutions": [
        "El tren llegó tarde"
      ],
      "exp": "La oración propuesta respeta el patrón gramatical y mantiene la concordancia."
    },
    {
      "id": "extra-b-intermedio-5",
      "pattern": [
        "pronombre",
        "verbo",
        "preposicion",
        "sustantivo"
      ],
      "hint": "Viajar acompañado",
      "tiles": [
        {
          "w": "Ellos",
          "c": "pronombre"
        },
        {
          "w": "viajan",
          "c": "verbo"
        },
        {
          "w": "con",
          "c": "preposicion"
        },
        {
          "w": "Ana",
          "c": "sustantivo"
        },
        {
          "w": "ayer",
          "c": "adverbio"
        },
        {
          "w": "azul",
          "c": "adjetivo"
        }
      ],
      "solutions": [
        "Ellos viajan con Ana"
      ],
      "exp": "La oración propuesta respeta el patrón gramatical y mantiene la concordancia."
    }
  ],
  "avanzado": [
    {
      "id": "extra-b-avanzado-1",
      "pattern": [
        "conjuncion",
        "verbo",
        "pronombre",
        "verbo"
      ],
      "hint": "Una concesión",
      "tiles": [
        {
          "w": "Aunque",
          "c": "conjuncion"
        },
        {
          "w": "llueva",
          "c": "verbo"
        },
        {
          "w": "nosotros",
          "c": "pronombre"
        },
        {
          "w": "iremos",
          "c": "verbo"
        },
        {
          "w": "ayer",
          "c": "adverbio"
        },
        {
          "w": "azul",
          "c": "adjetivo"
        }
      ],
      "solutions": [
        "Aunque llueva nosotros iremos"
      ],
      "exp": "La oración propuesta respeta el patrón gramatical y mantiene la concordancia."
    },
    {
      "id": "extra-b-avanzado-2",
      "pattern": [
        "conjuncion",
        "verbo",
        "verbo",
        "adjetivo"
      ],
      "hint": "Una subordinada como sujeto",
      "tiles": [
        {
          "w": "Que",
          "c": "conjuncion"
        },
        {
          "w": "participes",
          "c": "verbo"
        },
        {
          "w": "resulta",
          "c": "verbo"
        },
        {
          "w": "importante",
          "c": "adjetivo"
        },
        {
          "w": "ayer",
          "c": "adverbio"
        },
        {
          "w": "azul",
          "c": "adjetivo"
        }
      ],
      "solutions": [
        "Que participes resulta importante"
      ],
      "exp": "La oración propuesta respeta el patrón gramatical y mantiene la concordancia."
    },
    {
      "id": "extra-b-avanzado-3",
      "pattern": [
        "determinante",
        "sustantivo",
        "pronombre",
        "verbo",
        "verbo"
      ],
      "hint": "Una oración relativa",
      "tiles": [
        {
          "w": "El",
          "c": "determinante"
        },
        {
          "w": "libro",
          "c": "sustantivo"
        },
        {
          "w": "que",
          "c": "pronombre"
        },
        {
          "w": "leí",
          "c": "verbo"
        },
        {
          "w": "emociona",
          "c": "verbo"
        },
        {
          "w": "ayer",
          "c": "adverbio"
        },
        {
          "w": "azul",
          "c": "adjetivo"
        }
      ],
      "solutions": [
        "El libro que leí emociona"
      ],
      "exp": "La oración propuesta respeta el patrón gramatical y mantiene la concordancia."
    },
    {
      "id": "extra-b-avanzado-4",
      "pattern": [
        "conjuncion",
        "pronombre",
        "verbo",
        "pronombre",
        "verbo"
      ],
      "hint": "Una condición",
      "tiles": [
        {
          "w": "Si",
          "c": "conjuncion"
        },
        {
          "w": "tú",
          "c": "pronombre"
        },
        {
          "w": "vienes",
          "c": "verbo"
        },
        {
          "w": "yo",
          "c": "pronombre"
        },
        {
          "w": "voy",
          "c": "verbo"
        },
        {
          "w": "ayer",
          "c": "adverbio"
        },
        {
          "w": "azul",
          "c": "adjetivo"
        }
      ],
      "solutions": [
        "Si tú vienes yo voy"
      ],
      "exp": "La oración propuesta respeta el patrón gramatical y mantiene la concordancia."
    },
    {
      "id": "extra-b-avanzado-5",
      "pattern": [
        "verbo",
        "sustantivo",
        "verbo",
        "adjetivo"
      ],
      "hint": "Un infinitivo como sujeto",
      "tiles": [
        {
          "w": "Leer",
          "c": "verbo"
        },
        {
          "w": "poesía",
          "c": "sustantivo"
        },
        {
          "w": "resulta",
          "c": "verbo"
        },
        {
          "w": "agradable",
          "c": "adjetivo"
        },
        {
          "w": "ayer",
          "c": "adverbio"
        },
        {
          "w": "azul",
          "c": "adjetivo"
        }
      ],
      "solutions": [
        "Leer poesía resulta agradable"
      ],
      "exp": "La oración propuesta respeta el patrón gramatical y mantiene la concordancia."
    }
  ]
};
