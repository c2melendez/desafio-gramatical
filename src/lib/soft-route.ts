import {LEVELS,type Level,type Mode} from "./grammar";
import {SOFT_MODES,SOFT_SUBTOPICS} from "./soft-m1";

/** Normalización de URL de práctica complementaria.
 * Nunca redirigir a un área diferente al recibir parámetros inválidos. */
export const DEFAULT_SOFT_SUBTOPIC="Pensamiento crítico";
export function validateSoftSearch(s:Record<string,unknown>):{subtema:string;modo:Mode;nivel:Level}{
 return {
  subtema:typeof s.subtema==="string"&&SOFT_SUBTOPICS.includes(s.subtema)?s.subtema:DEFAULT_SOFT_SUBTOPIC,
  modo:SOFT_MODES.includes(s.modo as Mode)?s.modo as Mode:"clasificar",
  nivel:LEVELS.includes(s.nivel as Level)?s.nivel as Level:"principiante"
 };
}
