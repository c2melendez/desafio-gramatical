import type { ClassificationActivity } from './grammar-activities';
import type { Level } from './grammar';

// Relaciones léxicas evaluadas en el contexto expresado; borradores editoriales.
type Entry = [string, string, 'Sinónimos' | 'Antónimos', string];
const basic: Entry[] = [
 ['El camino es ancho; también puede describirse como amplio.','ancho / amplio','Sinónimos','Ambos términos indican gran anchura.'],
 ['La mochila está llena; la otra no contiene nada y está vacía.','llena / vacía','Antónimos','En este contexto, estar lleno se opone a no contener nada.'],
 ['El atleta corre rápido, es decir, velozmente.','rápido / velozmente','Sinónimos','Ambas expresiones indican que corre con velocidad.'],
 ['La puerta estaba abierta antes de quedar cerrada.','abierta / cerrada','Antónimos','Para una puerta, abierta y cerrada expresan estados opuestos.'],
 ['El niño estaba alegre y se sentía contento.','alegre / contento','Sinónimos','Ambas palabras expresan alegría en la situación.'],
 ['La cuerda larga se cambió por una corta.','larga / corta','Antónimos','Los adjetivos contrastan por la longitud.'],
 ['El examen fue fácil, sencillo de resolver.','fácil / sencillo','Sinónimos','Los dos adjetivos indican poca dificultad.'],
 ['La habitación estaba oscura; al encender la lámpara quedó iluminada.','oscura / iluminada','Antónimos','Los términos se oponen respecto de la presencia de luz.'],
 ['El perro comenzó a ladrar; después empezó a correr.','comenzó / empezó','Sinónimos','Los dos verbos expresan el inicio de una acción.'],
 ['El recipiente pesado fue reemplazado por otro liviano.','pesado / liviano','Antónimos','Se contrastan por su peso.'],
];
const intermediate: Entry[] = [
 ['La lluvia intensa fue descrita como una precipitación fuerte.','intensa / fuerte','Sinónimos','Ambas califican la lluvia por su gran intensidad.'],
 ['El funcionario aprobó la propuesta, mientras otro la rechazó.','aprobó / rechazó','Antónimos','Aceptar una propuesta contrasta con rechazarla.'],
 ['El sendero estrecho se vuelve angosto entre las rocas.','estrecho / angosto','Sinónimos','En ambos casos se describe la poca anchura del sendero.'],
 ['El terreno fértil produce cosechas; el terreno estéril no permite cultivarlas.','fértil / estéril','Antónimos','En el contexto agrícola contrastan por su capacidad de producir.'],
 ['El aviso solicita conservar el agua; pide ahorrarla.','conservar / ahorrar','Sinónimos','Aquí ambos verbos se refieren a evitar el gasto innecesario de agua.'],
 ['El trayecto de ida fue ascendente y el regreso descendente.','ascendente / descendente','Antónimos','Subir y bajar expresan direcciones opuestas.'],
 ['La guía contiene instrucciones precisas, claras y exactas.','precisas / exactas','Sinónimos','Ambas expresan exactitud en las instrucciones.'],
 ['La investigadora verificó la cifra y confirmó que era correcta.','verificó / confirmó','Sinónimos','En este caso ambos verbos aluden a comprobar la corrección de la cifra.'],
 ['La comisión amplió el plazo; antes había reducido el tiempo disponible.','amplió / redujo','Antónimos','Aumentar el plazo se opone a disminuirlo.'],
 ['El material es resistente y soporta bien el uso; no es frágil.','resistente / frágil','Antónimos','Se oponen por su facilidad para dañarse o romperse.'],
 ['La alumna resumió el informe y presentó una versión abreviada.','resumió / abrevió','Sinónimos','En este contexto ambos verbos describen hacer más breve el informe.'],
 ['El depósito inicial era superficial; el nuevo pozo es profundo.','superficial / profundo','Antónimos','Se contraponen por la profundidad.'],
 ['La medida temporal se mantuvo solo durante una semana; no fue permanente.','temporal / permanente','Antónimos','Los términos contrastan por la duración prevista.'],
 ['El comité eligió una alternativa viable, que podía realizarse.','viable / realizable','Sinónimos','Ambas palabras indican que la alternativa puede llevarse a cabo.'],
 ['El público permaneció en silencio; después produjo un ruido ensordecedor.','silencio / ruido','Antónimos','En el pasaje se contraponen la ausencia y la presencia intensa de sonido.'],
];
const advanced: Entry[] = [
 ['La respuesta fue ambigua: admitía varias interpretaciones; la versión revisada es unívoca.','ambigua / unívoca','Antónimos','Una expresión ambigua admite varias interpretaciones; una unívoca tiene una sola.'],
 ['La directora pospuso la reunión; la trasladó a una fecha posterior.','pospuso / aplazó','Sinónimos','Ambos verbos significan diferir la reunión.'],
 ['El informe matizó la conclusión al introducir una precisión que limitó su alcance.','matizó / precisó','Sinónimos','En este contexto matizar consiste en introducir una precisión.'],
 ['Una hipótesis provisional puede cambiar; una conclusión definitiva se considera cerrada.','provisional / definitiva','Antónimos','Se contraponen por su carácter temporal o final.'],
 ['La crítica fue fundamentada: presentó razones y evidencia.','fundamentada / justificada','Sinónimos','Ambas indican que la crítica cuenta con razones que la sostienen.'],
 ['El diagnóstico es incierto; todavía no se puede considerar seguro.','incierto / seguro','Antónimos','Aquí se oponen la duda y la certeza sobre el diagnóstico.'],
 ['La administración optó por un gasto austero, limitado a lo indispensable.','austero / sobrio','Sinónimos','Ambos describen moderación en el gasto.'],
 ['La exposición fue concisa; una explicación prolija habría ocupado mucho más tiempo.','concisa / prolija','Antónimos','Aquí se contraponen la brevedad y la extensión excesiva de la exposición.'],
 ['El equipo corroboró el resultado mediante una segunda medición que lo confirmó.','corroboró / confirmó','Sinónimos','Ambos indican que la nueva medición dio apoyo al resultado.'],
 ['La declaración explícita nombra el problema; la alusión implícita solo lo sugiere.','explícita / implícita','Antónimos','Una afirmación expresa directamente lo que la otra deja sugerido.'],
 ['La barrera mitigó la inundación: atenuó sus efectos sin eliminarlos.','mitigó / atenuó','Sinónimos','Ambos verbos indican reducción de la intensidad del efecto.'],
 ['El testigo fue imparcial; no favoreció a ninguna de las partes.','imparcial / sesgado','Antónimos','La imparcialidad se opone a favorecer una posición mediante sesgo.'],
 ['La afirmación es plausible porque parece razonable, aunque no esté probada.','plausible / verosímil','Sinónimos','En el contexto ambas expresan apariencia de razonabilidad, no demostración.'],
 ['La ley hizo obligatoria una medida que antes había sido voluntaria.','obligatoria / voluntaria','Antónimos','El cumplimiento exigido contrasta con la elección libre planteada.'],
 ['La autora refutó la hipótesis al presentar pruebas que la contradicen.','refutó / rebatió','Sinónimos','Ambos verbos expresan oposición mediante argumentos o pruebas.'],
 ['La información pertinente ayuda a responder la pregunta; la irrelevante no contribuye a ella.','pertinente / irrelevante','Antónimos','Los términos se oponen por su relación útil con la pregunta.'],
 ['El consejo propuso una solución factible, posible con los recursos disponibles.','factible / realizable','Sinónimos','Ambas indican posibilidad de llevar a cabo la solución.'],
 ['La decisión fue arbitraria, sin razones expuestas, en lugar de razonada.','arbitraria / razonada','Antónimos','En el pasaje se contrastan la falta de razones y la decisión fundamentada.'],
 ['La noticia generó incertidumbre; la comunidad afrontó dudas sobre el resultado.','incertidumbre / duda','Sinónimos','Ambas expresan falta de certeza acerca del resultado.'],
 ['El argumento sólido resiste las objeciones; el endeble carece de apoyo suficiente.','sólido / endeble','Antónimos','En este contexto se oponen por la fuerza del respaldo argumental.'],
];
function make(level: Level, entries: Entry[]): ClassificationActivity[] {
 return entries.map(([context,pair,label,explanation],i)=>({
  id:`syn-class-${level}-${i+1}`,subtopic:'Sinónimos y antónimos',level,kind:'classification',reviewStatus:'editorial-draft',
  prompt:`Lee el contexto y clasifica la relación entre las expresiones destacadas: ${context}`,
  labels:['Sinónimos','Antónimos'],items:[{id:'relacion',text:pair,label,explanation}],
  explanation,
 }));
}
export const SYNONYM_CLASSIFICATION = [...make('principiante',basic),...make('intermedio',intermediate),...make('avanzado',advanced)];
