/** Estímulos originales y deterministas; no confundir coordenadas dibujadas con un oráculo. */
export type MathVisual =
 | {kind:"triangle-angles";alpha:number;beta:number}
 | {kind:"right-triangle";legA:number;legB:number}
 | {kind:"bar-chart";monday:number;tuesday:number;wednesday:number}
 | {kind:"linear-function";slope:number;intercept:number;targetX:number}
 | {kind:"number-line";boundary:number;open:true;direction:"right"};

export function visualAnswer(v:MathVisual):number {
 switch(v.kind){
 case "triangle-angles":return 180-v.alpha-v.beta;
 case "right-triangle":return Math.sqrt(v.legA*v.legA+v.legB*v.legB);
 case "bar-chart":return v.monday+v.tuesday+v.wednesday;
 case "linear-function":return v.slope*v.targetX+v.intercept;
 case "number-line":return v.boundary;
 }
}
export function visualPrompt(v:MathVisual):string {
 switch(v.kind){
 case "triangle-angles":return `En el triángulo dibujado, el ángulo A mide ${v.alpha}°. Usa la figura para calcular el ángulo C.`;
 case "right-triangle":return `En el triángulo rectángulo dibujado, el cateto horizontal mide ${v.legA} cm. Calcula la hipotenusa usando la medida del otro cateto que aparece en la figura.`;
 case "bar-chart":return `El lunes se prestaron ${v.monday} libros. Consulta el gráfico para hallar el total prestado durante los tres días.`;
 case "linear-function":return `Usa la recta del gráfico para determinar f(${v.targetX}). Los dos puntos señalados permiten obtener la regla lineal.`;
 case "number-line":return `Lee la recta numérica: ¿qué número corresponde al extremo abierto del intervalo sombreado hacia la derecha?`;
 }
}
export function visualDescription(v:MathVisual):string {
 switch(v.kind){
 case "triangle-angles":return `Triángulo con A en el vértice inferior izquierdo, B en el inferior derecho y C arriba. A mide ${v.alpha} grados y B mide ${v.beta} grados; C es desconocido. Dibujo no a escala.`;
 case "right-triangle":return `Triángulo rectángulo con cateto horizontal de ${v.legA} cm, cateto vertical de ${v.legB} cm e hipotenusa desconocida. Dibujo no a escala.`;
 case "bar-chart":return `Gráfico de barras de préstamos en libros: lunes ${v.monday}, martes ${v.tuesday}, miércoles ${v.wednesday}. Eje vertical en número de libros.`;
 case "linear-function":return `Plano con recta que pasa por (0,${v.intercept}) y (1,${v.intercept+v.slope}); se busca el valor para x=${v.targetX}. Coordenadas indicadas en etiquetas, dibujo esquemático.`;
 case "number-line":return `Recta con marcas consecutivas ${v.boundary-2}, ${v.boundary-1}, un círculo abierto sin etiqueta en la marca central, ${v.boundary+1}, ${v.boundary+2}; sombreado hacia los números mayores.`;
 }
}
