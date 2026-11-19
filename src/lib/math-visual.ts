/** Estímulos originales y deterministas; no confundir coordenadas dibujadas con un oráculo. */
export type MathVisual =
 | {kind:"triangle-angles";alpha:number;beta:number}
 | {kind:"right-triangle";legA:number;legB:number}
 | {kind:"bar-chart";monday:number;tuesday:number;wednesday:number}
 | {kind:"linear-function";slope:number;intercept:number;targetX:number;operation?:"direct"|"shift"|"compose"}
 | {kind:"number-line";boundary:number;open:true;direction:"right"|"left";operation?:"direct"|"shift"|"reflect"}
 | {kind:"rectangle";length:number;width:number;measure:"area"|"perimeter"}
 | {kind:"prism";length:number;width:number;height:number;measure:"volume"|"surface"}
 | {kind:"similar-triangles";small:number;large:number;other:number};

export function visualAnswer(v:MathVisual):number {
 switch(v.kind){
 case "triangle-angles":return 180-v.alpha-v.beta;
 case "right-triangle":return Math.sqrt(v.legA*v.legA+v.legB*v.legB);
 case "bar-chart":return v.monday+v.tuesday+v.wednesday;
 case "linear-function":return v.slope*v.targetX+v.intercept+(v.operation==="shift"?2*v.slope:v.operation==="compose"?3*v.slope:0);
 case "number-line":return v.operation==="shift"?v.boundary+2:v.operation==="reflect"?2-v.boundary:v.boundary;
 case "rectangle":return v.measure==="area"?v.length*v.width:2*(v.length+v.width);
 case "prism":return v.measure==="volume"?v.length*v.width*v.height:2*(v.length*v.width+v.length*v.height+v.width*v.height);
 case "similar-triangles":return v.large*v.other/v.small;
 }
}
export function visualPrompt(v:MathVisual):string {
 switch(v.kind){
 case "triangle-angles":return `En el triángulo dibujado, el ángulo A mide ${v.alpha}°. Usa la figura para calcular el ángulo C.`;
 case "right-triangle":return `En el triángulo rectángulo dibujado, el cateto horizontal mide ${v.legA} cm. Calcula la hipotenusa usando la medida del otro cateto que aparece en la figura.`;
 case "bar-chart":return `El lunes se prestaron ${v.monday} libros. Consulta el gráfico para hallar el total prestado durante los tres días.`;
 case "linear-function":return v.operation==="shift"?`Usa la recta dibujada de f para determinar g(${v.targetX})=f(${v.targetX}+2). Los dos puntos señalados permiten obtener la regla original.`:v.operation==="compose"?`Usa la recta dibujada de f para determinar g(${v.targetX})=2f(${v.targetX}+1)−f(${v.targetX}−1). Determina primero la regla a partir de sus puntos.`:`Usa la recta del gráfico para determinar f(${v.targetX}). Los dos puntos señalados permiten obtener la regla lineal.`;
 case "number-line":return v.operation==="shift"?`La recta muestra la solución de una inecuación original con coeficiente positivo. Si aumenta su lado derecho en el doble del coeficiente, ¿cuál será el NUEVO límite, sin cambiar el signo >? Interpreta primero el extremo abierto original.`:v.operation==="reflect"?`La recta muestra la solución original de ax+k>b con a positivo. Si el coeficiente pasa a −a y el término constante aumenta en 2a, conservando b, la solución transformada será x < ___. ¿Cuál es ese límite? Usa el extremo original del gráfico.`:`Lee la recta numérica: ¿qué número corresponde al extremo abierto del intervalo sombreado hacia la ${v.direction==="left"?"izquierda":"derecha"}?`;
 case "rectangle":return `En la figura rectangular, calcula el ${v.measure==="area"?"área en cm²":"perímetro en cm"} usando las cotas indicadas.`;
 case "prism":return `Interpreta el prisma rectangular de la figura y calcula su ${v.measure==="volume"?"volumen en cm³":"área superficial total en cm²"}.`;
 case "similar-triangles":return `Los triángulos son semejantes. Usando las correspondencias dibujadas, ¿cuánto mide el lado marcado con ? en centímetros?`;
 }
}
export function visualDescription(v:MathVisual):string {
 switch(v.kind){
 case "triangle-angles":return `Triángulo con A en el vértice inferior izquierdo, B en el inferior derecho y C arriba. A mide ${v.alpha} grados y B mide ${v.beta} grados; C es desconocido. Dibujo no a escala.`;
 case "right-triangle":return `Triángulo rectángulo con cateto horizontal de ${v.legA} cm, cateto vertical de ${v.legB} cm e hipotenusa desconocida. Dibujo no a escala.`;
 case "bar-chart":return `Gráfico de barras de préstamos en libros: lunes ${v.monday}, martes ${v.tuesday}, miércoles ${v.wednesday}. Eje vertical en número de libros.`;
 case "linear-function":return `Plano con recta que pasa por (0,${v.intercept}) y (1,${v.intercept+v.slope}); se busca el valor para x=${v.targetX}. Coordenadas indicadas en etiquetas, dibujo esquemático.`;
 case "number-line":return `Recta con marcas consecutivas ${v.boundary-2}, ${v.boundary-1}, un círculo abierto sin etiqueta en la marca central, ${v.boundary+1}, ${v.boundary+2}; sombreado hacia los números ${v.direction==="left"?"menores":"mayores"}.`;
 case "rectangle":return `Rectángulo con base rotulada ${v.length} cm y altura rotulada ${v.width} cm; se solicita ${v.measure==="area"?"área":"perímetro"}. No está a escala.`;
 case "prism":return `Prisma rectangular con tres dimensiones rotuladas: largo ${v.length} cm, ancho ${v.width} cm, alto ${v.height} cm; se solicita ${v.measure==="volume"?"volumen":"área superficial total"}. No está a escala.`;
 case "similar-triangles":return `Dos triángulos semejantes con lados correspondientes pequeños ${v.small} cm y grandes ${v.large} cm. El otro lado del pequeño mide ${v.other} cm, mientras que el correspondiente del grande está indicado con ?. No está a escala.`;
 }
}
