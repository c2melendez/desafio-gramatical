import {LEVELS,type Level,type Mode} from "./grammar";
import {SOCIAL_SUBTOPICS,SOCIAL_MODES} from "./social-m1";

/** Validación de URL aislada de React para ensayar recargas, rutas directas e inputs inválidos. */
export const DEFAULT_SOCIAL_SUBTOPIC="Independencia";
export type SocialSearch={subtema:string;modo:Mode;nivel:Level};
export function validateSocialSearch(search:Record<string,unknown>):SocialSearch{
 return {
  subtema:typeof search.subtema==="string"&&SOCIAL_SUBTOPICS.includes(search.subtema)?search.subtema:DEFAULT_SOCIAL_SUBTOPIC,
  modo:SOCIAL_MODES.includes(search.modo as Mode)?search.modo as Mode:"clasificar",
  nivel:LEVELS.includes(search.nivel as Level)?search.nivel as Level:"principiante"
 };
}
