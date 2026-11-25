import type {MathModel} from "./math-m1";
type Patch=Pick<MathModel,"options"|"answerIndex"|"steps"|"optionExplanations"> & {constructionExplanations:Record<string,string>[]};
const patches:Record<string,Patch>={
  "math-m1-aritmetica-operaciones-construir-avanzado-0": {
    "options": [
      "56",
      "-32",
      "0",
      "32"
    ],
    "answerIndex": 3,
    "steps": [
      {
        "label": "Tras distribuir y cancelar el primer producto, ¿qué sumando queda multiplicado por el factor común?",
        "choices": [
          "-16",
          "0",
          "16",
          "28"
        ],
        "answerIndex": 2
      },
      {
        "label": "Resultado final",
        "choices": [
          "56",
          "-32",
          "0",
          "32"
        ],
        "answerIndex": 3
      }
    ],
    "optionExplanations": {
      "0": "Cancelar también el producto restante. El cálculo equivocado 0 da 0.",
      "56": "Omitir la resta del primer producto. El cálculo equivocado (12+16)×2 da 56.",
      "-32": "Invertir el signo del término restante. El cálculo equivocado −16×2 da -32."
    },
    "constructionExplanations": [
      {
        "0": "Cancelar ambos sumandos elimina un término que no tiene opuesto. El cálculo equivocado 0 da 0.",
        "28": "Conservar ambos sumandos ignora que el primer producto se cancela. El cálculo equivocado 12+16 da 28.",
        "-16": "Cambiar de signo el sumando que no se cancela altera el valor. El cálculo equivocado −16 da -16."
      },
      {
        "0": "Cancelar también el producto restante. El cálculo equivocado 0 da 0.",
        "56": "Omitir la resta del primer producto. El cálculo equivocado (12+16)×2 da 56.",
        "-32": "Invertir el signo del término restante. El cálculo equivocado −16×2 da -32."
      }
    ]
  },
  "math-m1-aritmetica-operaciones-construir-avanzado-1": {
    "options": [
      "-133",
      "0",
      "133",
      "224"
    ],
    "answerIndex": 2,
    "steps": [
      {
        "label": "Tras distribuir y cancelar el primer producto, ¿qué sumando queda multiplicado por el factor común?",
        "choices": [
          "0",
          "19",
          "32",
          "-19"
        ],
        "answerIndex": 1
      },
      {
        "label": "Resultado final",
        "choices": [
          "-133",
          "0",
          "133",
          "224"
        ],
        "answerIndex": 2
      }
    ],
    "optionExplanations": {
      "0": "Cancelar también el producto restante. El cálculo equivocado 0 da 0.",
      "224": "Omitir la resta del primer producto. El cálculo equivocado (13+19)×7 da 224.",
      "-133": "Invertir el signo del término restante. El cálculo equivocado −19×7 da -133."
    },
    "constructionExplanations": [
      {
        "0": "Cancelar ambos sumandos elimina un término que no tiene opuesto. El cálculo equivocado 0 da 0.",
        "32": "Conservar ambos sumandos ignora que el primer producto se cancela. El cálculo equivocado 13+19 da 32.",
        "-19": "Cambiar de signo el sumando que no se cancela altera el valor. El cálculo equivocado −19 da -19."
      },
      {
        "0": "Cancelar también el producto restante. El cálculo equivocado 0 da 0.",
        "224": "Omitir la resta del primer producto. El cálculo equivocado (13+19)×7 da 224.",
        "-133": "Invertir el signo del término restante. El cálculo equivocado −19×7 da -133."
      }
    ]
  },
  "math-m1-aritmetica-operaciones-construir-avanzado-10": {
    "options": [
      "0",
      "21",
      "87",
      "-21"
    ],
    "answerIndex": 1,
    "steps": [
      {
        "label": "Tras distribuir y cancelar el primer producto, ¿qué sumando queda multiplicado por el factor común?",
        "choices": [
          "7",
          "29",
          "-7",
          "0"
        ],
        "answerIndex": 0
      },
      {
        "label": "Resultado final",
        "choices": [
          "0",
          "21",
          "87",
          "-21"
        ],
        "answerIndex": 1
      }
    ],
    "optionExplanations": {
      "0": "Cancelar también el producto restante. El cálculo equivocado 0 da 0.",
      "87": "Omitir la resta del primer producto. El cálculo equivocado (22+7)×3 da 87.",
      "-21": "Invertir el signo del término restante. El cálculo equivocado −7×3 da -21."
    },
    "constructionExplanations": [
      {
        "0": "Cancelar ambos sumandos elimina un término que no tiene opuesto. El cálculo equivocado 0 da 0.",
        "29": "Conservar ambos sumandos ignora que el primer producto se cancela. El cálculo equivocado 22+7 da 29.",
        "-7": "Cambiar de signo el sumando que no se cancela altera el valor. El cálculo equivocado −7 da -7."
      },
      {
        "0": "Cancelar también el producto restante. El cálculo equivocado 0 da 0.",
        "87": "Omitir la resta del primer producto. El cálculo equivocado (22+7)×3 da 87.",
        "-21": "Invertir el signo del término restante. El cálculo equivocado −7×3 da -21."
      }
    ]
  },
  "math-m1-aritmetica-operaciones-construir-avanzado-11": {
    "options": [
      "80",
      "264",
      "-80",
      "0"
    ],
    "answerIndex": 0,
    "steps": [
      {
        "label": "Tras distribuir y cancelar el primer producto, ¿qué sumando queda multiplicado por el factor común?",
        "choices": [
          "33",
          "-10",
          "0",
          "10"
        ],
        "answerIndex": 3
      },
      {
        "label": "Resultado final",
        "choices": [
          "80",
          "264",
          "-80",
          "0"
        ],
        "answerIndex": 0
      }
    ],
    "optionExplanations": {
      "0": "Cancelar también el producto restante. El cálculo equivocado 0 da 0.",
      "264": "Omitir la resta del primer producto. El cálculo equivocado (23+10)×8 da 264.",
      "-80": "Invertir el signo del término restante. El cálculo equivocado −10×8 da -80."
    },
    "constructionExplanations": [
      {
        "0": "Cancelar ambos sumandos elimina un término que no tiene opuesto. El cálculo equivocado 0 da 0.",
        "33": "Conservar ambos sumandos ignora que el primer producto se cancela. El cálculo equivocado 23+10 da 33.",
        "-10": "Cambiar de signo el sumando que no se cancela altera el valor. El cálculo equivocado −10 da -10."
      },
      {
        "0": "Cancelar también el producto restante. El cálculo equivocado 0 da 0.",
        "264": "Omitir la resta del primer producto. El cálculo equivocado (23+10)×8 da 264.",
        "-80": "Invertir el signo del término restante. El cálculo equivocado −10×8 da -80."
      }
    ]
  },
  "math-m1-aritmetica-operaciones-construir-avanzado-12": {
    "options": [
      "222",
      "-78",
      "0",
      "78"
    ],
    "answerIndex": 3,
    "steps": [
      {
        "label": "Tras distribuir y cancelar el primer producto, ¿qué sumando queda multiplicado por el factor común?",
        "choices": [
          "-13",
          "0",
          "13",
          "37"
        ],
        "answerIndex": 2
      },
      {
        "label": "Resultado final",
        "choices": [
          "222",
          "-78",
          "0",
          "78"
        ],
        "answerIndex": 3
      }
    ],
    "optionExplanations": {
      "0": "Cancelar también el producto restante. El cálculo equivocado 0 da 0.",
      "222": "Omitir la resta del primer producto. El cálculo equivocado (24+13)×6 da 222.",
      "-78": "Invertir el signo del término restante. El cálculo equivocado −13×6 da -78."
    },
    "constructionExplanations": [
      {
        "0": "Cancelar ambos sumandos elimina un término que no tiene opuesto. El cálculo equivocado 0 da 0.",
        "37": "Conservar ambos sumandos ignora que el primer producto se cancela. El cálculo equivocado 24+13 da 37.",
        "-13": "Cambiar de signo el sumando que no se cancela altera el valor. El cálculo equivocado −13 da -13."
      },
      {
        "0": "Cancelar también el producto restante. El cálculo equivocado 0 da 0.",
        "222": "Omitir la resta del primer producto. El cálculo equivocado (24+13)×6 da 222.",
        "-78": "Invertir el signo del término restante. El cálculo equivocado −13×6 da -78."
      }
    ]
  },
  "math-m1-aritmetica-operaciones-construir-avanzado-13": {
    "options": [
      "-64",
      "0",
      "64",
      "96"
    ],
    "answerIndex": 2,
    "steps": [
      {
        "label": "Tras distribuir y cancelar el primer producto, ¿qué sumando queda multiplicado por el factor común?",
        "choices": [
          "0",
          "16",
          "24",
          "-16"
        ],
        "answerIndex": 1
      },
      {
        "label": "Resultado final",
        "choices": [
          "-64",
          "0",
          "64",
          "96"
        ],
        "answerIndex": 2
      }
    ],
    "optionExplanations": {
      "0": "Cancelar también el producto restante. El cálculo equivocado 0 da 0.",
      "96": "Omitir la resta del primer producto. El cálculo equivocado (8+16)×4 da 96.",
      "-64": "Invertir el signo del término restante. El cálculo equivocado −16×4 da -64."
    },
    "constructionExplanations": [
      {
        "0": "Cancelar ambos sumandos elimina un término que no tiene opuesto. El cálculo equivocado 0 da 0.",
        "24": "Conservar ambos sumandos ignora que el primer producto se cancela. El cálculo equivocado 8+16 da 24.",
        "-16": "Cambiar de signo el sumando que no se cancela altera el valor. El cálculo equivocado −16 da -16."
      },
      {
        "0": "Cancelar también el producto restante. El cálculo equivocado 0 da 0.",
        "96": "Omitir la resta del primer producto. El cálculo equivocado (8+16)×4 da 96.",
        "-64": "Invertir el signo del término restante. El cálculo equivocado −16×4 da -64."
      }
    ]
  },
  "math-m1-aritmetica-operaciones-construir-avanzado-14": {
    "options": [
      "0",
      "38",
      "56",
      "-38"
    ],
    "answerIndex": 1,
    "steps": [
      {
        "label": "Tras distribuir y cancelar el primer producto, ¿qué sumando queda multiplicado por el factor común?",
        "choices": [
          "19",
          "28",
          "-19",
          "0"
        ],
        "answerIndex": 0
      },
      {
        "label": "Resultado final",
        "choices": [
          "0",
          "38",
          "56",
          "-38"
        ],
        "answerIndex": 1
      }
    ],
    "optionExplanations": {
      "0": "Cancelar también el producto restante. El cálculo equivocado 0 da 0.",
      "56": "Omitir la resta del primer producto. El cálculo equivocado (9+19)×2 da 56.",
      "-38": "Invertir el signo del término restante. El cálculo equivocado −19×2 da -38."
    },
    "constructionExplanations": [
      {
        "0": "Cancelar ambos sumandos elimina un término que no tiene opuesto. El cálculo equivocado 0 da 0.",
        "28": "Conservar ambos sumandos ignora que el primer producto se cancela. El cálculo equivocado 9+19 da 28.",
        "-19": "Cambiar de signo el sumando que no se cancela altera el valor. El cálculo equivocado −19 da -19."
      },
      {
        "0": "Cancelar también el producto restante. El cálculo equivocado 0 da 0.",
        "56": "Omitir la resta del primer producto. El cálculo equivocado (9+19)×2 da 56.",
        "-38": "Invertir el signo del término restante. El cálculo equivocado −19×2 da -38."
      }
    ]
  },
  "math-m1-aritmetica-operaciones-construir-avanzado-15": {
    "options": [
      "63",
      "133",
      "-63",
      "0"
    ],
    "answerIndex": 0,
    "steps": [
      {
        "label": "Tras distribuir y cancelar el primer producto, ¿qué sumando queda multiplicado por el factor común?",
        "choices": [
          "19",
          "-9",
          "0",
          "9"
        ],
        "answerIndex": 3
      },
      {
        "label": "Resultado final",
        "choices": [
          "63",
          "133",
          "-63",
          "0"
        ],
        "answerIndex": 0
      }
    ],
    "optionExplanations": {
      "0": "Cancelar también el producto restante. El cálculo equivocado 0 da 0.",
      "133": "Omitir la resta del primer producto. El cálculo equivocado (10+9)×7 da 133.",
      "-63": "Invertir el signo del término restante. El cálculo equivocado −9×7 da -63."
    },
    "constructionExplanations": [
      {
        "0": "Cancelar ambos sumandos elimina un término que no tiene opuesto. El cálculo equivocado 0 da 0.",
        "19": "Conservar ambos sumandos ignora que el primer producto se cancela. El cálculo equivocado 10+9 da 19.",
        "-9": "Cambiar de signo el sumando que no se cancela altera el valor. El cálculo equivocado −9 da -9."
      },
      {
        "0": "Cancelar también el producto restante. El cálculo equivocado 0 da 0.",
        "133": "Omitir la resta del primer producto. El cálculo equivocado (10+9)×7 da 133.",
        "-63": "Invertir el signo del término restante. El cálculo equivocado −9×7 da -63."
      }
    ]
  },
  "math-m1-aritmetica-operaciones-construir-avanzado-16": {
    "options": [
      "115",
      "-60",
      "0",
      "60"
    ],
    "answerIndex": 3,
    "steps": [
      {
        "label": "Tras distribuir y cancelar el primer producto, ¿qué sumando queda multiplicado por el factor común?",
        "choices": [
          "-12",
          "0",
          "12",
          "23"
        ],
        "answerIndex": 2
      },
      {
        "label": "Resultado final",
        "choices": [
          "115",
          "-60",
          "0",
          "60"
        ],
        "answerIndex": 3
      }
    ],
    "optionExplanations": {
      "0": "Cancelar también el producto restante. El cálculo equivocado 0 da 0.",
      "115": "Omitir la resta del primer producto. El cálculo equivocado (11+12)×5 da 115.",
      "-60": "Invertir el signo del término restante. El cálculo equivocado −12×5 da -60."
    },
    "constructionExplanations": [
      {
        "0": "Cancelar ambos sumandos elimina un término que no tiene opuesto. El cálculo equivocado 0 da 0.",
        "23": "Conservar ambos sumandos ignora que el primer producto se cancela. El cálculo equivocado 11+12 da 23.",
        "-12": "Cambiar de signo el sumando que no se cancela altera el valor. El cálculo equivocado −12 da -12."
      },
      {
        "0": "Cancelar también el producto restante. El cálculo equivocado 0 da 0.",
        "115": "Omitir la resta del primer producto. El cálculo equivocado (11+12)×5 da 115.",
        "-60": "Invertir el signo del término restante. El cálculo equivocado −12×5 da -60."
      }
    ]
  },
  "math-m1-aritmetica-operaciones-construir-avanzado-17": {
    "options": [
      "-45",
      "0",
      "45",
      "81"
    ],
    "answerIndex": 2,
    "steps": [
      {
        "label": "Tras distribuir y cancelar el primer producto, ¿qué sumando queda multiplicado por el factor común?",
        "choices": [
          "0",
          "15",
          "27",
          "-15"
        ],
        "answerIndex": 1
      },
      {
        "label": "Resultado final",
        "choices": [
          "-45",
          "0",
          "45",
          "81"
        ],
        "answerIndex": 2
      }
    ],
    "optionExplanations": {
      "0": "Cancelar también el producto restante. El cálculo equivocado 0 da 0.",
      "81": "Omitir la resta del primer producto. El cálculo equivocado (12+15)×3 da 81.",
      "-45": "Invertir el signo del término restante. El cálculo equivocado −15×3 da -45."
    },
    "constructionExplanations": [
      {
        "0": "Cancelar ambos sumandos elimina un término que no tiene opuesto. El cálculo equivocado 0 da 0.",
        "27": "Conservar ambos sumandos ignora que el primer producto se cancela. El cálculo equivocado 12+15 da 27.",
        "-15": "Cambiar de signo el sumando que no se cancela altera el valor. El cálculo equivocado −15 da -15."
      },
      {
        "0": "Cancelar también el producto restante. El cálculo equivocado 0 da 0.",
        "81": "Omitir la resta del primer producto. El cálculo equivocado (12+15)×3 da 81.",
        "-45": "Invertir el signo del término restante. El cálculo equivocado −15×3 da -45."
      }
    ]
  },
  "math-m1-aritmetica-operaciones-construir-avanzado-18": {
    "options": [
      "0",
      "144",
      "248",
      "-144"
    ],
    "answerIndex": 1,
    "steps": [
      {
        "label": "Tras distribuir y cancelar el primer producto, ¿qué sumando queda multiplicado por el factor común?",
        "choices": [
          "18",
          "31",
          "-18",
          "0"
        ],
        "answerIndex": 0
      },
      {
        "label": "Resultado final",
        "choices": [
          "0",
          "144",
          "248",
          "-144"
        ],
        "answerIndex": 1
      }
    ],
    "optionExplanations": {
      "0": "Cancelar también el producto restante. El cálculo equivocado 0 da 0.",
      "248": "Omitir la resta del primer producto. El cálculo equivocado (13+18)×8 da 248.",
      "-144": "Invertir el signo del término restante. El cálculo equivocado −18×8 da -144."
    },
    "constructionExplanations": [
      {
        "0": "Cancelar ambos sumandos elimina un término que no tiene opuesto. El cálculo equivocado 0 da 0.",
        "31": "Conservar ambos sumandos ignora que el primer producto se cancela. El cálculo equivocado 13+18 da 31.",
        "-18": "Cambiar de signo el sumando que no se cancela altera el valor. El cálculo equivocado −18 da -18."
      },
      {
        "0": "Cancelar también el producto restante. El cálculo equivocado 0 da 0.",
        "248": "Omitir la resta del primer producto. El cálculo equivocado (13+18)×8 da 248.",
        "-144": "Invertir el signo del término restante. El cálculo equivocado −18×8 da -144."
      }
    ]
  },
  "math-m1-aritmetica-operaciones-construir-avanzado-19": {
    "options": [
      "48",
      "132",
      "-48",
      "0"
    ],
    "answerIndex": 0,
    "steps": [
      {
        "label": "Tras distribuir y cancelar el primer producto, ¿qué sumando queda multiplicado por el factor común?",
        "choices": [
          "22",
          "-8",
          "0",
          "8"
        ],
        "answerIndex": 3
      },
      {
        "label": "Resultado final",
        "choices": [
          "48",
          "132",
          "-48",
          "0"
        ],
        "answerIndex": 0
      }
    ],
    "optionExplanations": {
      "0": "Cancelar también el producto restante. El cálculo equivocado 0 da 0.",
      "132": "Omitir la resta del primer producto. El cálculo equivocado (14+8)×6 da 132.",
      "-48": "Invertir el signo del término restante. El cálculo equivocado −8×6 da -48."
    },
    "constructionExplanations": [
      {
        "0": "Cancelar ambos sumandos elimina un término que no tiene opuesto. El cálculo equivocado 0 da 0.",
        "22": "Conservar ambos sumandos ignora que el primer producto se cancela. El cálculo equivocado 14+8 da 22.",
        "-8": "Cambiar de signo el sumando que no se cancela altera el valor. El cálculo equivocado −8 da -8."
      },
      {
        "0": "Cancelar también el producto restante. El cálculo equivocado 0 da 0.",
        "132": "Omitir la resta del primer producto. El cálculo equivocado (14+8)×6 da 132.",
        "-48": "Invertir el signo del término restante. El cálculo equivocado −8×6 da -48."
      }
    ]
  },
  "math-m1-aritmetica-operaciones-construir-avanzado-2": {
    "options": [
      "0",
      "45",
      "115",
      "-45"
    ],
    "answerIndex": 1,
    "steps": [
      {
        "label": "Tras distribuir y cancelar el primer producto, ¿qué sumando queda multiplicado por el factor común?",
        "choices": [
          "9",
          "23",
          "-9",
          "0"
        ],
        "answerIndex": 0
      },
      {
        "label": "Resultado final",
        "choices": [
          "0",
          "45",
          "115",
          "-45"
        ],
        "answerIndex": 1
      }
    ],
    "optionExplanations": {
      "0": "Cancelar también el producto restante. El cálculo equivocado 0 da 0.",
      "115": "Omitir la resta del primer producto. El cálculo equivocado (14+9)×5 da 115.",
      "-45": "Invertir el signo del término restante. El cálculo equivocado −9×5 da -45."
    },
    "constructionExplanations": [
      {
        "0": "Cancelar ambos sumandos elimina un término que no tiene opuesto. El cálculo equivocado 0 da 0.",
        "23": "Conservar ambos sumandos ignora que el primer producto se cancela. El cálculo equivocado 14+9 da 23.",
        "-9": "Cambiar de signo el sumando que no se cancela altera el valor. El cálculo equivocado −9 da -9."
      },
      {
        "0": "Cancelar también el producto restante. El cálculo equivocado 0 da 0.",
        "115": "Omitir la resta del primer producto. El cálculo equivocado (14+9)×5 da 115.",
        "-45": "Invertir el signo del término restante. El cálculo equivocado −9×5 da -45."
      }
    ]
  },
  "math-m1-aritmetica-operaciones-construir-avanzado-3": {
    "options": [
      "36",
      "81",
      "-36",
      "0"
    ],
    "answerIndex": 0,
    "steps": [
      {
        "label": "Tras distribuir y cancelar el primer producto, ¿qué sumando queda multiplicado por el factor común?",
        "choices": [
          "27",
          "-12",
          "0",
          "12"
        ],
        "answerIndex": 3
      },
      {
        "label": "Resultado final",
        "choices": [
          "36",
          "81",
          "-36",
          "0"
        ],
        "answerIndex": 0
      }
    ],
    "optionExplanations": {
      "0": "Cancelar también el producto restante. El cálculo equivocado 0 da 0.",
      "81": "Omitir la resta del primer producto. El cálculo equivocado (15+12)×3 da 81.",
      "-36": "Invertir el signo del término restante. El cálculo equivocado −12×3 da -36."
    },
    "constructionExplanations": [
      {
        "0": "Cancelar ambos sumandos elimina un término que no tiene opuesto. El cálculo equivocado 0 da 0.",
        "27": "Conservar ambos sumandos ignora que el primer producto se cancela. El cálculo equivocado 15+12 da 27.",
        "-12": "Cambiar de signo el sumando que no se cancela altera el valor. El cálculo equivocado −12 da -12."
      },
      {
        "0": "Cancelar también el producto restante. El cálculo equivocado 0 da 0.",
        "81": "Omitir la resta del primer producto. El cálculo equivocado (15+12)×3 da 81.",
        "-36": "Invertir el signo del término restante. El cálculo equivocado −12×3 da -36."
      }
    ]
  },
  "math-m1-aritmetica-operaciones-construir-avanzado-4": {
    "options": [
      "248",
      "-120",
      "0",
      "120"
    ],
    "answerIndex": 3,
    "steps": [
      {
        "label": "Tras distribuir y cancelar el primer producto, ¿qué sumando queda multiplicado por el factor común?",
        "choices": [
          "-15",
          "0",
          "15",
          "31"
        ],
        "answerIndex": 2
      },
      {
        "label": "Resultado final",
        "choices": [
          "248",
          "-120",
          "0",
          "120"
        ],
        "answerIndex": 3
      }
    ],
    "optionExplanations": {
      "0": "Cancelar también el producto restante. El cálculo equivocado 0 da 0.",
      "248": "Omitir la resta del primer producto. El cálculo equivocado (16+15)×8 da 248.",
      "-120": "Invertir el signo del término restante. El cálculo equivocado −15×8 da -120."
    },
    "constructionExplanations": [
      {
        "0": "Cancelar ambos sumandos elimina un término que no tiene opuesto. El cálculo equivocado 0 da 0.",
        "31": "Conservar ambos sumandos ignora que el primer producto se cancela. El cálculo equivocado 16+15 da 31.",
        "-15": "Cambiar de signo el sumando que no se cancela altera el valor. El cálculo equivocado −15 da -15."
      },
      {
        "0": "Cancelar también el producto restante. El cálculo equivocado 0 da 0.",
        "248": "Omitir la resta del primer producto. El cálculo equivocado (16+15)×8 da 248.",
        "-120": "Invertir el signo del término restante. El cálculo equivocado −15×8 da -120."
      }
    ]
  },
  "math-m1-aritmetica-operaciones-construir-avanzado-5": {
    "options": [
      "-108",
      "0",
      "108",
      "210"
    ],
    "answerIndex": 2,
    "steps": [
      {
        "label": "Tras distribuir y cancelar el primer producto, ¿qué sumando queda multiplicado por el factor común?",
        "choices": [
          "0",
          "18",
          "35",
          "-18"
        ],
        "answerIndex": 1
      },
      {
        "label": "Resultado final",
        "choices": [
          "-108",
          "0",
          "108",
          "210"
        ],
        "answerIndex": 2
      }
    ],
    "optionExplanations": {
      "0": "Cancelar también el producto restante. El cálculo equivocado 0 da 0.",
      "210": "Omitir la resta del primer producto. El cálculo equivocado (17+18)×6 da 210.",
      "-108": "Invertir el signo del término restante. El cálculo equivocado −18×6 da -108."
    },
    "constructionExplanations": [
      {
        "0": "Cancelar ambos sumandos elimina un término que no tiene opuesto. El cálculo equivocado 0 da 0.",
        "35": "Conservar ambos sumandos ignora que el primer producto se cancela. El cálculo equivocado 17+18 da 35.",
        "-18": "Cambiar de signo el sumando que no se cancela altera el valor. El cálculo equivocado −18 da -18."
      },
      {
        "0": "Cancelar también el producto restante. El cálculo equivocado 0 da 0.",
        "210": "Omitir la resta del primer producto. El cálculo equivocado (17+18)×6 da 210.",
        "-108": "Invertir el signo del término restante. El cálculo equivocado −18×6 da -108."
      }
    ]
  },
  "math-m1-aritmetica-operaciones-construir-avanzado-6": {
    "options": [
      "0",
      "32",
      "104",
      "-32"
    ],
    "answerIndex": 1,
    "steps": [
      {
        "label": "Tras distribuir y cancelar el primer producto, ¿qué sumando queda multiplicado por el factor común?",
        "choices": [
          "8",
          "26",
          "-8",
          "0"
        ],
        "answerIndex": 0
      },
      {
        "label": "Resultado final",
        "choices": [
          "0",
          "32",
          "104",
          "-32"
        ],
        "answerIndex": 1
      }
    ],
    "optionExplanations": {
      "0": "Cancelar también el producto restante. El cálculo equivocado 0 da 0.",
      "104": "Omitir la resta del primer producto. El cálculo equivocado (18+8)×4 da 104.",
      "-32": "Invertir el signo del término restante. El cálculo equivocado −8×4 da -32."
    },
    "constructionExplanations": [
      {
        "0": "Cancelar ambos sumandos elimina un término que no tiene opuesto. El cálculo equivocado 0 da 0.",
        "26": "Conservar ambos sumandos ignora que el primer producto se cancela. El cálculo equivocado 18+8 da 26.",
        "-8": "Cambiar de signo el sumando que no se cancela altera el valor. El cálculo equivocado −8 da -8."
      },
      {
        "0": "Cancelar también el producto restante. El cálculo equivocado 0 da 0.",
        "104": "Omitir la resta del primer producto. El cálculo equivocado (18+8)×4 da 104.",
        "-32": "Invertir el signo del término restante. El cálculo equivocado −8×4 da -32."
      }
    ]
  },
  "math-m1-aritmetica-operaciones-construir-avanzado-7": {
    "options": [
      "22",
      "60",
      "-22",
      "0"
    ],
    "answerIndex": 0,
    "steps": [
      {
        "label": "Tras distribuir y cancelar el primer producto, ¿qué sumando queda multiplicado por el factor común?",
        "choices": [
          "30",
          "-11",
          "0",
          "11"
        ],
        "answerIndex": 3
      },
      {
        "label": "Resultado final",
        "choices": [
          "22",
          "60",
          "-22",
          "0"
        ],
        "answerIndex": 0
      }
    ],
    "optionExplanations": {
      "0": "Cancelar también el producto restante. El cálculo equivocado 0 da 0.",
      "60": "Omitir la resta del primer producto. El cálculo equivocado (19+11)×2 da 60.",
      "-22": "Invertir el signo del término restante. El cálculo equivocado −11×2 da -22."
    },
    "constructionExplanations": [
      {
        "0": "Cancelar ambos sumandos elimina un término que no tiene opuesto. El cálculo equivocado 0 da 0.",
        "30": "Conservar ambos sumandos ignora que el primer producto se cancela. El cálculo equivocado 19+11 da 30.",
        "-11": "Cambiar de signo el sumando que no se cancela altera el valor. El cálculo equivocado −11 da -11."
      },
      {
        "0": "Cancelar también el producto restante. El cálculo equivocado 0 da 0.",
        "60": "Omitir la resta del primer producto. El cálculo equivocado (19+11)×2 da 60.",
        "-22": "Invertir el signo del término restante. El cálculo equivocado −11×2 da -22."
      }
    ]
  },
  "math-m1-aritmetica-operaciones-construir-avanzado-8": {
    "options": [
      "238",
      "-98",
      "0",
      "98"
    ],
    "answerIndex": 3,
    "steps": [
      {
        "label": "Tras distribuir y cancelar el primer producto, ¿qué sumando queda multiplicado por el factor común?",
        "choices": [
          "-14",
          "0",
          "14",
          "34"
        ],
        "answerIndex": 2
      },
      {
        "label": "Resultado final",
        "choices": [
          "238",
          "-98",
          "0",
          "98"
        ],
        "answerIndex": 3
      }
    ],
    "optionExplanations": {
      "0": "Cancelar también el producto restante. El cálculo equivocado 0 da 0.",
      "238": "Omitir la resta del primer producto. El cálculo equivocado (20+14)×7 da 238.",
      "-98": "Invertir el signo del término restante. El cálculo equivocado −14×7 da -98."
    },
    "constructionExplanations": [
      {
        "0": "Cancelar ambos sumandos elimina un término que no tiene opuesto. El cálculo equivocado 0 da 0.",
        "34": "Conservar ambos sumandos ignora que el primer producto se cancela. El cálculo equivocado 20+14 da 34.",
        "-14": "Cambiar de signo el sumando que no se cancela altera el valor. El cálculo equivocado −14 da -14."
      },
      {
        "0": "Cancelar también el producto restante. El cálculo equivocado 0 da 0.",
        "238": "Omitir la resta del primer producto. El cálculo equivocado (20+14)×7 da 238.",
        "-98": "Invertir el signo del término restante. El cálculo equivocado −14×7 da -98."
      }
    ]
  },
  "math-m1-aritmetica-operaciones-construir-avanzado-9": {
    "options": [
      "-85",
      "0",
      "85",
      "190"
    ],
    "answerIndex": 2,
    "steps": [
      {
        "label": "Tras distribuir y cancelar el primer producto, ¿qué sumando queda multiplicado por el factor común?",
        "choices": [
          "0",
          "17",
          "38",
          "-17"
        ],
        "answerIndex": 1
      },
      {
        "label": "Resultado final",
        "choices": [
          "-85",
          "0",
          "85",
          "190"
        ],
        "answerIndex": 2
      }
    ],
    "optionExplanations": {
      "0": "Cancelar también el producto restante. El cálculo equivocado 0 da 0.",
      "190": "Omitir la resta del primer producto. El cálculo equivocado (21+17)×5 da 190.",
      "-85": "Invertir el signo del término restante. El cálculo equivocado −17×5 da -85."
    },
    "constructionExplanations": [
      {
        "0": "Cancelar ambos sumandos elimina un término que no tiene opuesto. El cálculo equivocado 0 da 0.",
        "38": "Conservar ambos sumandos ignora que el primer producto se cancela. El cálculo equivocado 21+17 da 38.",
        "-17": "Cambiar de signo el sumando que no se cancela altera el valor. El cálculo equivocado −17 da -17."
      },
      {
        "0": "Cancelar también el producto restante. El cálculo equivocado 0 da 0.",
        "190": "Omitir la resta del primer producto. El cálculo equivocado (21+17)×5 da 190.",
        "-85": "Invertir el signo del término restante. El cálculo equivocado −17×5 da -85."
      }
    ]
  },
  "math-m1-aritmetica-operaciones-construir-intermedio-0": {
    "options": [
      "140",
      "93",
      "105",
      "99"
    ],
    "answerIndex": 2,
    "steps": [
      {
        "label": "Calcula la suma que queda dentro del paréntesis",
        "choices": [
          "34",
          "35",
          "33",
          "31"
        ],
        "answerIndex": 1
      },
      {
        "label": "Resultado final",
        "choices": [
          "140",
          "93",
          "105",
          "99"
        ],
        "answerIndex": 2
      }
    ],
    "optionExplanations": {
      "93": "Disminuir el segundo sumando en vez de aumentarlo. El cálculo equivocado (18+15−2)×3 da 93.",
      "99": "Omitir el aumento del segundo sumando. El cálculo equivocado (18+15)×3 da 99.",
      "140": "Omitir la disminución del factor. El cálculo equivocado (18+17)×4 da 140."
    },
    "constructionExplanations": [
      {
        "31": "Restar 2 en vez de sumar 2. El cálculo equivocado 18+15−2 da 31.",
        "33": "Omitir el aumento del segundo sumando. El cálculo equivocado 18+15 da 33.",
        "34": "Aplicar indebidamente la disminución del factor también al paréntesis. El cálculo equivocado 18+15+2−1 da 34."
      },
      {
        "93": "Disminuir el segundo sumando en vez de aumentarlo. El cálculo equivocado (18+15−2)×3 da 93.",
        "99": "Omitir el aumento del segundo sumando. El cálculo equivocado (18+15)×3 da 99.",
        "140": "Omitir la disminución del factor. El cálculo equivocado (18+17)×4 da 140."
      }
    ]
  },
  "math-m1-aritmetica-operaciones-construir-intermedio-1": {
    "options": [
      "22",
      "26",
      "24",
      "52"
    ],
    "answerIndex": 1,
    "steps": [
      {
        "label": "Calcula la suma que queda dentro del paréntesis",
        "choices": [
          "26",
          "24",
          "22",
          "25"
        ],
        "answerIndex": 0
      },
      {
        "label": "Resultado final",
        "choices": [
          "22",
          "26",
          "24",
          "52"
        ],
        "answerIndex": 1
      }
    ],
    "optionExplanations": {
      "22": "Disminuir el segundo sumando en vez de aumentarlo. El cálculo equivocado (19+5−2)×1 da 22.",
      "24": "Omitir el aumento del segundo sumando. El cálculo equivocado (19+5)×1 da 24.",
      "52": "Omitir la disminución del factor. El cálculo equivocado (19+7)×2 da 52."
    },
    "constructionExplanations": [
      {
        "22": "Restar 2 en vez de sumar 2. El cálculo equivocado 19+5−2 da 22.",
        "24": "Omitir el aumento del segundo sumando. El cálculo equivocado 19+5 da 24.",
        "25": "Aplicar indebidamente la disminución del factor también al paréntesis. El cálculo equivocado 19+5+2−1 da 25."
      },
      {
        "22": "Disminuir el segundo sumando en vez de aumentarlo. El cálculo equivocado (19+5−2)×1 da 22.",
        "24": "Omitir el aumento del segundo sumando. El cálculo equivocado (19+5)×1 da 24.",
        "52": "Omitir la disminución del factor. El cálculo equivocado (19+7)×2 da 52."
      }
    ]
  },
  "math-m1-aritmetica-operaciones-construir-intermedio-10": {
    "options": [
      "76",
      "68",
      "95",
      "60"
    ],
    "answerIndex": 0,
    "steps": [
      {
        "label": "Calcula la suma que queda dentro del paréntesis",
        "choices": [
          "17",
          "15",
          "18",
          "19"
        ],
        "answerIndex": 3
      },
      {
        "label": "Resultado final",
        "choices": [
          "76",
          "68",
          "95",
          "60"
        ],
        "answerIndex": 0
      }
    ],
    "optionExplanations": {
      "60": "Disminuir el segundo sumando en vez de aumentarlo. El cálculo equivocado (11+6−2)×4 da 60.",
      "68": "Omitir el aumento del segundo sumando. El cálculo equivocado (11+6)×4 da 68.",
      "95": "Omitir la disminución del factor. El cálculo equivocado (11+8)×5 da 95."
    },
    "constructionExplanations": [
      {
        "15": "Restar 2 en vez de sumar 2. El cálculo equivocado 11+6−2 da 15.",
        "17": "Omitir el aumento del segundo sumando. El cálculo equivocado 11+6 da 17.",
        "18": "Aplicar indebidamente la disminución del factor también al paréntesis. El cálculo equivocado 11+6+2−1 da 18."
      },
      {
        "60": "Disminuir el segundo sumando en vez de aumentarlo. El cálculo equivocado (11+6−2)×4 da 60.",
        "68": "Omitir el aumento del segundo sumando. El cálculo equivocado (11+6)×4 da 68.",
        "95": "Omitir la disminución del factor. El cálculo equivocado (11+8)×5 da 95."
      }
    ]
  },
  "math-m1-aritmetica-operaciones-construir-intermedio-11": {
    "options": [
      "42",
      "69",
      "38",
      "46"
    ],
    "answerIndex": 3,
    "steps": [
      {
        "label": "Calcula la suma que queda dentro del paréntesis",
        "choices": [
          "19",
          "22",
          "23",
          "21"
        ],
        "answerIndex": 2
      },
      {
        "label": "Resultado final",
        "choices": [
          "42",
          "69",
          "38",
          "46"
        ],
        "answerIndex": 3
      }
    ],
    "optionExplanations": {
      "38": "Disminuir el segundo sumando en vez de aumentarlo. El cálculo equivocado (12+9−2)×2 da 38.",
      "42": "Omitir el aumento del segundo sumando. El cálculo equivocado (12+9)×2 da 42.",
      "69": "Omitir la disminución del factor. El cálculo equivocado (12+11)×3 da 69."
    },
    "constructionExplanations": [
      {
        "19": "Restar 2 en vez de sumar 2. El cálculo equivocado 12+9−2 da 19.",
        "21": "Omitir el aumento del segundo sumando. El cálculo equivocado 12+9 da 21.",
        "22": "Aplicar indebidamente la disminución del factor también al paréntesis. El cálculo equivocado 12+9+2−1 da 22."
      },
      {
        "38": "Disminuir el segundo sumando en vez de aumentarlo. El cálculo equivocado (12+9−2)×2 da 38.",
        "42": "Omitir el aumento del segundo sumando. El cálculo equivocado (12+9)×2 da 42.",
        "69": "Omitir la disminución del factor. El cálculo equivocado (12+11)×3 da 69."
      }
    ]
  },
  "math-m1-aritmetica-operaciones-construir-intermedio-12": {
    "options": [
      "216",
      "161",
      "189",
      "175"
    ],
    "answerIndex": 2,
    "steps": [
      {
        "label": "Calcula la suma que queda dentro del paréntesis",
        "choices": [
          "26",
          "27",
          "25",
          "23"
        ],
        "answerIndex": 1
      },
      {
        "label": "Resultado final",
        "choices": [
          "216",
          "161",
          "189",
          "175"
        ],
        "answerIndex": 2
      }
    ],
    "optionExplanations": {
      "161": "Disminuir el segundo sumando en vez de aumentarlo. El cálculo equivocado (13+12−2)×7 da 161.",
      "175": "Omitir el aumento del segundo sumando. El cálculo equivocado (13+12)×7 da 175.",
      "216": "Omitir la disminución del factor. El cálculo equivocado (13+14)×8 da 216."
    },
    "constructionExplanations": [
      {
        "23": "Restar 2 en vez de sumar 2. El cálculo equivocado 13+12−2 da 23.",
        "25": "Omitir el aumento del segundo sumando. El cálculo equivocado 13+12 da 25.",
        "26": "Aplicar indebidamente la disminución del factor también al paréntesis. El cálculo equivocado 13+12+2−1 da 26."
      },
      {
        "161": "Disminuir el segundo sumando en vez de aumentarlo. El cálculo equivocado (13+12−2)×7 da 161.",
        "175": "Omitir el aumento del segundo sumando. El cálculo equivocado (13+12)×7 da 175.",
        "216": "Omitir la disminución del factor. El cálculo equivocado (13+14)×8 da 216."
      }
    ]
  },
  "math-m1-aritmetica-operaciones-construir-intermedio-13": {
    "options": [
      "135",
      "155",
      "145",
      "186"
    ],
    "answerIndex": 1,
    "steps": [
      {
        "label": "Calcula la suma que queda dentro del paréntesis",
        "choices": [
          "31",
          "29",
          "27",
          "30"
        ],
        "answerIndex": 0
      },
      {
        "label": "Resultado final",
        "choices": [
          "135",
          "155",
          "145",
          "186"
        ],
        "answerIndex": 1
      }
    ],
    "optionExplanations": {
      "135": "Disminuir el segundo sumando en vez de aumentarlo. El cálculo equivocado (14+15−2)×5 da 135.",
      "145": "Omitir el aumento del segundo sumando. El cálculo equivocado (14+15)×5 da 145.",
      "186": "Omitir la disminución del factor. El cálculo equivocado (14+17)×6 da 186."
    },
    "constructionExplanations": [
      {
        "27": "Restar 2 en vez de sumar 2. El cálculo equivocado 14+15−2 da 27.",
        "29": "Omitir el aumento del segundo sumando. El cálculo equivocado 14+15 da 29.",
        "30": "Aplicar indebidamente la disminución del factor también al paréntesis. El cálculo equivocado 14+15+2−1 da 30."
      },
      {
        "135": "Disminuir el segundo sumando en vez de aumentarlo. El cálculo equivocado (14+15−2)×5 da 135.",
        "145": "Omitir el aumento del segundo sumando. El cálculo equivocado (14+15)×5 da 145.",
        "186": "Omitir la disminución del factor. El cálculo equivocado (14+17)×6 da 186."
      }
    ]
  },
  "math-m1-aritmetica-operaciones-construir-intermedio-14": {
    "options": [
      "66",
      "60",
      "88",
      "54"
    ],
    "answerIndex": 0,
    "steps": [
      {
        "label": "Calcula la suma que queda dentro del paréntesis",
        "choices": [
          "20",
          "18",
          "21",
          "22"
        ],
        "answerIndex": 3
      },
      {
        "label": "Resultado final",
        "choices": [
          "66",
          "60",
          "88",
          "54"
        ],
        "answerIndex": 0
      }
    ],
    "optionExplanations": {
      "54": "Disminuir el segundo sumando en vez de aumentarlo. El cálculo equivocado (15+5−2)×3 da 54.",
      "60": "Omitir el aumento del segundo sumando. El cálculo equivocado (15+5)×3 da 60.",
      "88": "Omitir la disminución del factor. El cálculo equivocado (15+7)×4 da 88."
    },
    "constructionExplanations": [
      {
        "18": "Restar 2 en vez de sumar 2. El cálculo equivocado 15+5−2 da 18.",
        "20": "Omitir el aumento del segundo sumando. El cálculo equivocado 15+5 da 20.",
        "21": "Aplicar indebidamente la disminución del factor también al paréntesis. El cálculo equivocado 15+5+2−1 da 21."
      },
      {
        "54": "Disminuir el segundo sumando en vez de aumentarlo. El cálculo equivocado (15+5−2)×3 da 54.",
        "60": "Omitir el aumento del segundo sumando. El cálculo equivocado (15+5)×3 da 60.",
        "88": "Omitir la disminución del factor. El cálculo equivocado (15+7)×4 da 88."
      }
    ]
  },
  "math-m1-aritmetica-operaciones-construir-intermedio-2": {
    "options": [
      "180",
      "168",
      "210",
      "156"
    ],
    "answerIndex": 0,
    "steps": [
      {
        "label": "Calcula la suma que queda dentro del paréntesis",
        "choices": [
          "28",
          "26",
          "29",
          "30"
        ],
        "answerIndex": 3
      },
      {
        "label": "Resultado final",
        "choices": [
          "180",
          "168",
          "210",
          "156"
        ],
        "answerIndex": 0
      }
    ],
    "optionExplanations": {
      "156": "Disminuir el segundo sumando en vez de aumentarlo. El cálculo equivocado (20+8−2)×6 da 156.",
      "168": "Omitir el aumento del segundo sumando. El cálculo equivocado (20+8)×6 da 168.",
      "210": "Omitir la disminución del factor. El cálculo equivocado (20+10)×7 da 210."
    },
    "constructionExplanations": [
      {
        "26": "Restar 2 en vez de sumar 2. El cálculo equivocado 20+8−2 da 26.",
        "28": "Omitir el aumento del segundo sumando. El cálculo equivocado 20+8 da 28.",
        "29": "Aplicar indebidamente la disminución del factor también al paréntesis. El cálculo equivocado 20+8+2−1 da 29."
      },
      {
        "156": "Disminuir el segundo sumando en vez de aumentarlo. El cálculo equivocado (20+8−2)×6 da 156.",
        "168": "Omitir el aumento del segundo sumando. El cálculo equivocado (20+8)×6 da 168.",
        "210": "Omitir la disminución del factor. El cálculo equivocado (20+10)×7 da 210."
      }
    ]
  },
  "math-m1-aritmetica-operaciones-construir-intermedio-3": {
    "options": [
      "128",
      "170",
      "120",
      "136"
    ],
    "answerIndex": 3,
    "steps": [
      {
        "label": "Calcula la suma que queda dentro del paréntesis",
        "choices": [
          "30",
          "33",
          "34",
          "32"
        ],
        "answerIndex": 2
      },
      {
        "label": "Resultado final",
        "choices": [
          "128",
          "170",
          "120",
          "136"
        ],
        "answerIndex": 3
      }
    ],
    "optionExplanations": {
      "120": "Disminuir el segundo sumando en vez de aumentarlo. El cálculo equivocado (21+11−2)×4 da 120.",
      "128": "Omitir el aumento del segundo sumando. El cálculo equivocado (21+11)×4 da 128.",
      "170": "Omitir la disminución del factor. El cálculo equivocado (21+13)×5 da 170."
    },
    "constructionExplanations": [
      {
        "30": "Restar 2 en vez de sumar 2. El cálculo equivocado 21+11−2 da 30.",
        "32": "Omitir el aumento del segundo sumando. El cálculo equivocado 21+11 da 32.",
        "33": "Aplicar indebidamente la disminución del factor también al paréntesis. El cálculo equivocado 21+11+2−1 da 33."
      },
      {
        "120": "Disminuir el segundo sumando en vez de aumentarlo. El cálculo equivocado (21+11−2)×4 da 120.",
        "128": "Omitir el aumento del segundo sumando. El cálculo equivocado (21+11)×4 da 128.",
        "170": "Omitir la disminución del factor. El cálculo equivocado (21+13)×5 da 170."
      }
    ]
  },
  "math-m1-aritmetica-operaciones-construir-intermedio-4": {
    "options": [
      "114",
      "68",
      "76",
      "72"
    ],
    "answerIndex": 2,
    "steps": [
      {
        "label": "Calcula la suma que queda dentro del paréntesis",
        "choices": [
          "37",
          "38",
          "36",
          "34"
        ],
        "answerIndex": 1
      },
      {
        "label": "Resultado final",
        "choices": [
          "114",
          "68",
          "76",
          "72"
        ],
        "answerIndex": 2
      }
    ],
    "optionExplanations": {
      "68": "Disminuir el segundo sumando en vez de aumentarlo. El cálculo equivocado (22+14−2)×2 da 68.",
      "72": "Omitir el aumento del segundo sumando. El cálculo equivocado (22+14)×2 da 72.",
      "114": "Omitir la disminución del factor. El cálculo equivocado (22+16)×3 da 114."
    },
    "constructionExplanations": [
      {
        "34": "Restar 2 en vez de sumar 2. El cálculo equivocado 22+14−2 da 34.",
        "36": "Omitir el aumento del segundo sumando. El cálculo equivocado 22+14 da 36.",
        "37": "Aplicar indebidamente la disminución del factor también al paréntesis. El cálculo equivocado 22+14+2−1 da 37."
      },
      {
        "68": "Disminuir el segundo sumando en vez de aumentarlo. El cálculo equivocado (22+14−2)×2 da 68.",
        "72": "Omitir el aumento del segundo sumando. El cálculo equivocado (22+14)×2 da 72.",
        "114": "Omitir la disminución del factor. El cálculo equivocado (22+16)×3 da 114."
      }
    ]
  },
  "math-m1-aritmetica-operaciones-construir-intermedio-5": {
    "options": [
      "147",
      "175",
      "161",
      "200"
    ],
    "answerIndex": 1,
    "steps": [
      {
        "label": "Calcula la suma que queda dentro del paréntesis",
        "choices": [
          "25",
          "23",
          "21",
          "24"
        ],
        "answerIndex": 0
      },
      {
        "label": "Resultado final",
        "choices": [
          "147",
          "175",
          "161",
          "200"
        ],
        "answerIndex": 1
      }
    ],
    "optionExplanations": {
      "147": "Disminuir el segundo sumando en vez de aumentarlo. El cálculo equivocado (6+17−2)×7 da 147.",
      "161": "Omitir el aumento del segundo sumando. El cálculo equivocado (6+17)×7 da 161.",
      "200": "Omitir la disminución del factor. El cálculo equivocado (6+19)×8 da 200."
    },
    "constructionExplanations": [
      {
        "21": "Restar 2 en vez de sumar 2. El cálculo equivocado 6+17−2 da 21.",
        "23": "Omitir el aumento del segundo sumando. El cálculo equivocado 6+17 da 23.",
        "24": "Aplicar indebidamente la disminución del factor también al paréntesis. El cálculo equivocado 6+17+2−1 da 24."
      },
      {
        "147": "Disminuir el segundo sumando en vez de aumentarlo. El cálculo equivocado (6+17−2)×7 da 147.",
        "161": "Omitir el aumento del segundo sumando. El cálculo equivocado (6+17)×7 da 161.",
        "200": "Omitir la disminución del factor. El cálculo equivocado (6+19)×8 da 200."
      }
    ]
  },
  "math-m1-aritmetica-operaciones-construir-intermedio-6": {
    "options": [
      "80",
      "70",
      "96",
      "60"
    ],
    "answerIndex": 0,
    "steps": [
      {
        "label": "Calcula la suma que queda dentro del paréntesis",
        "choices": [
          "14",
          "12",
          "15",
          "16"
        ],
        "answerIndex": 3
      },
      {
        "label": "Resultado final",
        "choices": [
          "80",
          "70",
          "96",
          "60"
        ],
        "answerIndex": 0
      }
    ],
    "optionExplanations": {
      "60": "Disminuir el segundo sumando en vez de aumentarlo. El cálculo equivocado (7+7−2)×5 da 60.",
      "70": "Omitir el aumento del segundo sumando. El cálculo equivocado (7+7)×5 da 70.",
      "96": "Omitir la disminución del factor. El cálculo equivocado (7+9)×6 da 96."
    },
    "constructionExplanations": [
      {
        "12": "Restar 2 en vez de sumar 2. El cálculo equivocado 7+7−2 da 12.",
        "14": "Omitir el aumento del segundo sumando. El cálculo equivocado 7+7 da 14.",
        "15": "Aplicar indebidamente la disminución del factor también al paréntesis. El cálculo equivocado 7+7+2−1 da 15."
      },
      {
        "60": "Disminuir el segundo sumando en vez de aumentarlo. El cálculo equivocado (7+7−2)×5 da 60.",
        "70": "Omitir el aumento del segundo sumando. El cálculo equivocado (7+7)×5 da 70.",
        "96": "Omitir la disminución del factor. El cálculo equivocado (7+9)×6 da 96."
      }
    ]
  },
  "math-m1-aritmetica-operaciones-construir-intermedio-7": {
    "options": [
      "54",
      "80",
      "48",
      "60"
    ],
    "answerIndex": 3,
    "steps": [
      {
        "label": "Calcula la suma que queda dentro del paréntesis",
        "choices": [
          "16",
          "19",
          "20",
          "18"
        ],
        "answerIndex": 2
      },
      {
        "label": "Resultado final",
        "choices": [
          "54",
          "80",
          "48",
          "60"
        ],
        "answerIndex": 3
      }
    ],
    "optionExplanations": {
      "48": "Disminuir el segundo sumando en vez de aumentarlo. El cálculo equivocado (8+10−2)×3 da 48.",
      "54": "Omitir el aumento del segundo sumando. El cálculo equivocado (8+10)×3 da 54.",
      "80": "Omitir la disminución del factor. El cálculo equivocado (8+12)×4 da 80."
    },
    "constructionExplanations": [
      {
        "16": "Restar 2 en vez de sumar 2. El cálculo equivocado 8+10−2 da 16.",
        "18": "Omitir el aumento del segundo sumando. El cálculo equivocado 8+10 da 18.",
        "19": "Aplicar indebidamente la disminución del factor también al paréntesis. El cálculo equivocado 8+10+2−1 da 19."
      },
      {
        "48": "Disminuir el segundo sumando en vez de aumentarlo. El cálculo equivocado (8+10−2)×3 da 48.",
        "54": "Omitir el aumento del segundo sumando. El cálculo equivocado (8+10)×3 da 54.",
        "80": "Omitir la disminución del factor. El cálculo equivocado (8+12)×4 da 80."
      }
    ]
  },
  "math-m1-aritmetica-operaciones-construir-intermedio-8": {
    "options": [
      "48",
      "20",
      "24",
      "22"
    ],
    "answerIndex": 2,
    "steps": [
      {
        "label": "Calcula la suma que queda dentro del paréntesis",
        "choices": [
          "23",
          "24",
          "22",
          "20"
        ],
        "answerIndex": 1
      },
      {
        "label": "Resultado final",
        "choices": [
          "48",
          "20",
          "24",
          "22"
        ],
        "answerIndex": 2
      }
    ],
    "optionExplanations": {
      "20": "Disminuir el segundo sumando en vez de aumentarlo. El cálculo equivocado (9+13−2)×1 da 20.",
      "22": "Omitir el aumento del segundo sumando. El cálculo equivocado (9+13)×1 da 22.",
      "48": "Omitir la disminución del factor. El cálculo equivocado (9+15)×2 da 48."
    },
    "constructionExplanations": [
      {
        "20": "Restar 2 en vez de sumar 2. El cálculo equivocado 9+13−2 da 20.",
        "22": "Omitir el aumento del segundo sumando. El cálculo equivocado 9+13 da 22.",
        "23": "Aplicar indebidamente la disminución del factor también al paréntesis. El cálculo equivocado 9+13+2−1 da 23."
      },
      {
        "20": "Disminuir el segundo sumando en vez de aumentarlo. El cálculo equivocado (9+13−2)×1 da 20.",
        "22": "Omitir el aumento del segundo sumando. El cálculo equivocado (9+13)×1 da 22.",
        "48": "Omitir la disminución del factor. El cálculo equivocado (9+15)×2 da 48."
      }
    ]
  },
  "math-m1-aritmetica-operaciones-construir-intermedio-9": {
    "options": [
      "144",
      "168",
      "156",
      "196"
    ],
    "answerIndex": 1,
    "steps": [
      {
        "label": "Calcula la suma que queda dentro del paréntesis",
        "choices": [
          "28",
          "26",
          "24",
          "27"
        ],
        "answerIndex": 0
      },
      {
        "label": "Resultado final",
        "choices": [
          "144",
          "168",
          "156",
          "196"
        ],
        "answerIndex": 1
      }
    ],
    "optionExplanations": {
      "144": "Disminuir el segundo sumando en vez de aumentarlo. El cálculo equivocado (10+16−2)×6 da 144.",
      "156": "Omitir el aumento del segundo sumando. El cálculo equivocado (10+16)×6 da 156.",
      "196": "Omitir la disminución del factor. El cálculo equivocado (10+18)×7 da 196."
    },
    "constructionExplanations": [
      {
        "24": "Restar 2 en vez de sumar 2. El cálculo equivocado 10+16−2 da 24.",
        "26": "Omitir el aumento del segundo sumando. El cálculo equivocado 10+16 da 26.",
        "27": "Aplicar indebidamente la disminución del factor también al paréntesis. El cálculo equivocado 10+16+2−1 da 27."
      },
      {
        "144": "Disminuir el segundo sumando en vez de aumentarlo. El cálculo equivocado (10+16−2)×6 da 144.",
        "156": "Omitir el aumento del segundo sumando. El cálculo equivocado (10+16)×6 da 156.",
        "196": "Omitir la disminución del factor. El cálculo equivocado (10+18)×7 da 196."
      }
    ]
  },
  "math-m1-aritmetica-operaciones-construir-principiante-0": {
    "options": [
      "27",
      "126",
      "91",
      "56"
    ],
    "answerIndex": 1,
    "steps": [
      {
        "label": "Calcula la suma que queda dentro del paréntesis",
        "choices": [
          "21",
          "7",
          "14",
          "91"
        ],
        "answerIndex": 0
      },
      {
        "label": "Resultado final",
        "choices": [
          "27",
          "126",
          "91",
          "56"
        ],
        "answerIndex": 1
      }
    ],
    "optionExplanations": {
      "27": "Sumar el factor en lugar de multiplicar. El cálculo equivocado 7+14+6 da 27.",
      "56": "Multiplicar únicamente el primer sumando. El cálculo equivocado 7×6+14 da 56.",
      "91": "Ignorar los paréntesis y multiplicar solo el segundo sumando. El cálculo equivocado 7+14×6 da 91."
    },
    "constructionExplanations": [
      {
        "7": "Omitir el segundo sumando. El cálculo equivocado 7 da 7.",
        "14": "Omitir el primer sumando. El cálculo equivocado 14 da 14.",
        "91": "Multiplicar antes de resolver la agrupación. El cálculo equivocado 7+14×6 da 91."
      },
      {
        "27": "Sumar el factor en lugar de multiplicar. El cálculo equivocado 7+14+6 da 27.",
        "56": "Multiplicar únicamente el primer sumando. El cálculo equivocado 7×6+14 da 56.",
        "91": "Ignorar los paréntesis y multiplicar solo el segundo sumando. El cálculo equivocado 7+14×6 da 91."
      }
    ]
  },
  "math-m1-aritmetica-operaciones-construir-principiante-1": {
    "options": [
      "48",
      "24",
      "36",
      "16"
    ],
    "answerIndex": 0,
    "steps": [
      {
        "label": "Calcula la suma que queda dentro del paréntesis",
        "choices": [
          "8",
          "4",
          "24",
          "12"
        ],
        "answerIndex": 3
      },
      {
        "label": "Resultado final",
        "choices": [
          "48",
          "24",
          "36",
          "16"
        ],
        "answerIndex": 0
      }
    ],
    "optionExplanations": {
      "16": "Sumar el factor en lugar de multiplicar. El cálculo equivocado 8+4+4 da 16.",
      "24": "Ignorar los paréntesis y multiplicar solo el segundo sumando. El cálculo equivocado 8+4×4 da 24.",
      "36": "Multiplicar únicamente el primer sumando. El cálculo equivocado 8×4+4 da 36."
    },
    "constructionExplanations": [
      {
        "4": "Omitir el primer sumando. El cálculo equivocado 4 da 4.",
        "8": "Omitir el segundo sumando. El cálculo equivocado 8 da 8.",
        "24": "Multiplicar antes de resolver la agrupación. El cálculo equivocado 8+4×4 da 24."
      },
      {
        "16": "Sumar el factor en lugar de multiplicar. El cálculo equivocado 8+4+4 da 16.",
        "24": "Ignorar los paréntesis y multiplicar solo el segundo sumando. El cálculo equivocado 8+4×4 da 24.",
        "36": "Multiplicar únicamente el primer sumando. El cálculo equivocado 8×4+4 da 36."
      }
    ]
  }
};
export function repairConstructionChoices(item:MathModel):MathModel{
 const patch=patches[item.id];
 if(!patch)return item;
 if(item.subtopic!=="Operaciones"||item.mode!=="construir"||item.oracle.kind!=="Operaciones")throw Error("P2 construction scope mismatch");
 return {...item,...patch};
}
