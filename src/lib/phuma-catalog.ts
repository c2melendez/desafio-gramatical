/**
 * Catálogo de navegación compartido conceptualmente con Academia PAA + PHUMA.
 * La cobertura del menú NO significa que sus juegos estén implementados.
 * Mantener este contrato estable permitirá incorporar cada tema por etapas.
 */
export type AreaId = "espanol" | "matematicas" | "naturales" | "sociales" | "blandas";
export type GameId = "clasificar" | "quiz" | "construir";
export interface Topic { name: string; subtopics: string[] }
export interface LearningArea { id: AreaId; label: string; short: string; icon: string; topics: Topic[] }
export const AREAS: LearningArea[] = [
  {
    "id": "espanol",
    "label": "Comunicación y Español",
    "icon": "📖",
    "short": "Español",
    "topics": [
      {
        "name": "Comprensión lectora",
        "subtopics": [
          "Idea principal",
          "Inferencias",
          "Lectura crítica",
          "Vocabulario en contexto",
          "Análisis de textos",
          "Lectura comparada",
          "Lenguaje figurado"
        ]
      },
      {
        "name": "Gramática y semántica",
        "subtopics": [
          "Categorías gramaticales",
          "Sinónimos y antónimos",
          "Cohesión y coherencia",
          "Morfosintaxis",
          "Homonimia y polisemia",
          "Hiperonimia",
          "Adecuación y referente"
        ]
      },
      {
        "name": "Redacción",
        "subtopics": [
          "Corrección",
          "Conectores",
          "Organización textual",
          "Elisión y adición",
          "Generalización e integración"
        ]
      },
      {
        "name": "Literatura",
        "subtopics": [
          "Figuras retóricas",
          "Géneros literarios"
        ]
      }
    ]
  },
  {
    "id": "matematicas",
    "label": "Matemáticas",
    "icon": "📐",
    "short": "Matemáticas",
    "topics": [
      {
        "name": "Aritmética",
        "subtopics": [
          "Operaciones",
          "Fracciones",
          "Porcentajes",
          "Proporciones",
          "Potencias",
          "MCD y MCM"
        ]
      },
      {
        "name": "Álgebra",
        "subtopics": [
          "Ecuaciones",
          "Sistemas de ecuaciones",
          "Sucesiones",
          "Funciones",
          "Ecuaciones cuadráticas",
          "Inecuaciones",
          "Patrones algebraicos"
        ]
      },
      {
        "name": "Geometría",
        "subtopics": [
          "Áreas y perímetros",
          "Ángulos",
          "Pitágoras",
          "Sólidos: área y volumen",
          "Semejanza"
        ]
      },
      {
        "name": "Estadística y probabilidad",
        "subtopics": [
          "Promedios",
          "Probabilidad",
          "Dispersión de datos",
          "Tablas y gráficas"
        ]
      }
    ]
  },
  {
    "id": "naturales",
    "label": "Ciencias Naturales",
    "icon": "🧬",
    "short": "Naturales",
    "topics": [
      {
        "name": "Biología",
        "subtopics": [
          "Célula",
          "Genética",
          "Ecología",
          "Cuerpo humano",
          "Biomoléculas",
          "División celular",
          "Fotosíntesis",
          "Método científico",
          "Clasificación biológica"
        ]
      },
      {
        "name": "Química",
        "subtopics": [
          "Materia",
          "Reacciones",
          "Tabla periódica",
          "Compuestos inorgánicos",
          "Contaminación y agroquímicos"
        ]
      },
      {
        "name": "Física",
        "subtopics": [
          "Movimiento",
          "Fuerzas y energía",
          "Magnitudes y conversiones",
          "Trabajo mecánico",
          "Fuentes de energía"
        ]
      }
    ]
  },
  {
    "id": "sociales",
    "label": "Ciencias Sociales",
    "icon": "🌎",
    "short": "Sociales",
    "topics": [
      {
        "name": "Historia de Honduras",
        "subtopics": [
          "Independencia",
          "Historia contemporánea",
          "Culturas hondureñas",
          "Enclave bananero",
          "Neoliberalismo"
        ]
      },
      {
        "name": "Historia universal",
        "subtopics": [
          "Civilizaciones",
          "Revoluciones",
          "Conflictos contemporáneos"
        ]
      },
      {
        "name": "Geografía",
        "subtopics": [
          "Geografía humana",
          "Geografía física",
          "Husos horarios",
          "Indicadores sociodemográficos"
        ]
      },
      {
        "name": "Civismo",
        "subtopics": [
          "Constitución y derechos"
        ]
      },
      {
        "name": "Ciencias sociales",
        "subtopics": [
          "Sociología",
          "Filosofía",
          "Antropología",
          "Estratificación social",
          "Instituciones sociales",
          "Sociología política",
          "Origen humano"
        ]
      }
    ]
  },
  {
    "id": "blandas",
    "label": "Habilidades Blandas",
    "icon": "🤝",
    "short": "Habilidades",
    "topics": [
      {
        "name": "Toma de decisiones",
        "subtopics": [
          "Pensamiento crítico",
          "Resolución de problemas"
        ]
      },
      {
        "name": "Convivencia",
        "subtopics": [
          "Colaboración",
          "Comunicación asertiva",
          "Respeto"
        ]
      },
      {
        "name": "Autogestión",
        "subtopics": [
          "Responsabilidad",
          "Regulación emocional",
          "Ética"
        ]
      }
    ]
  }
];
export const GAME_IDS: GameId[] = ["clasificar","quiz","construir"];
export const GAME_ICONS: Record<GameId,string> = {clasificar:"🏷️",quiz:"❓",construir:"🧩"};
export const GAME_FOCUS: Record<GameId,string> = {clasificar:"Reconocer y clasificar",quiz:"Aplicar y elegir",construir:"Construir y resolver"};
export const TOPIC_GAMES: Record<string,[string,string,string]> = {
  "Comprensión lectora": [
    "Detective de ideas",
    "Verdad o inferencia",
    "Reconstruye el texto"
  ],
  "Gramática y semántica": [
    "Clasifica palabras",
    "Elige el significado",
    "Laboratorio de oraciones"
  ],
  "Redacción": [
    "Cazador de errores",
    "Conector correcto",
    "Editor experto"
  ],
  "Literatura": [
    "Identifica la figura",
    "Duelo de géneros",
    "Completa el recurso"
  ],
  "Aritmética": [
    "Ordena los números",
    "Cálculo relámpago",
    "Ruta de operaciones"
  ],
  "Álgebra": [
    "Caza la incógnita",
    "Ecuación correcta",
    "Equilibrio algebraico"
  ],
  "Geometría": [
    "Detective de figuras",
    "Mide y resuelve",
    "Constructor geométrico"
  ],
  "Estadística y probabilidad": [
    "Clasifica los datos",
    "Lee el gráfico",
    "Laboratorio de probabilidades"
  ],
  "Biología": [
    "Clasificador de vida",
    "Desafío biológico",
    "Construye el proceso"
  ],
  "Química": [
    "Familias químicas",
    "Reacción correcta",
    "Laboratorio virtual"
  ],
  "Física": [
    "Fuerza y movimiento",
    "Predice el resultado",
    "Resuelve el fenómeno"
  ],
  "Historia de Honduras": [
    "Línea del tiempo",
    "Detective histórico",
    "Reconstruye la historia"
  ],
  "Historia universal": [
    "Épocas y civilizaciones",
    "Causas y consecuencias",
    "Mapa de acontecimientos"
  ],
  "Geografía": [
    "Explorador geográfico",
    "Reto de mapas",
    "Construye el territorio"
  ],
  "Civismo": [
    "Derecho o deber",
    "Decisión ciudadana",
    "Construye el acuerdo"
  ],
  "Ciencias sociales": [
    "Conceptos sociales",
    "Analiza la sociedad",
    "Conecta las causas"
  ],
  "Toma de decisiones": [
    "Detective de alternativas",
    "Decisión estratégica",
    "Construye la solución"
  ],
  "Convivencia": [
    "Semáforo social",
    "Diálogo inteligente",
    "Construye el acuerdo"
  ],
  "Autogestión": [
    "Detective de emociones",
    "Reto de responsabilidad",
    "Planifica tu meta"
  ]
};
export const FIRST_MODULE = {area:"espanol" as AreaId,topic:"Gramática y semántica",subtopic:"Categorías gramaticales"};
export function availableModule(area:AreaId,topic:string,subtopic:string){
 return area===FIRST_MODULE.area&&topic===FIRST_MODULE.topic&&subtopic===FIRST_MODULE.subtopic;
}
export function gameNames(topic:string):Record<GameId,string>{
 const names=TOPIC_GAMES[topic];
 if(!names)throw new Error("Tema no registrado: "+topic);
 return {clasificar:names[0],quiz:names[1],construir:names[2]};
}
export const CATALOG_COUNTS={
 areas:AREAS.length,
 topics:AREAS.reduce((n,a)=>n+a.topics.length,0),
 subtopics:AREAS.reduce((n,a)=>n+a.topics.reduce((k,t)=>k+t.subtopics.length,0),0)
};
