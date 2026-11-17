import {Link} from "@tanstack/react-router";
export const ROUNDS_PER_GAME=10 as const;

/** Contrato visual universal de Desafío Gramatical, reutilizable por toda área. */
export function GameSessionHeader({context,title,round,total=ROUNDS_PER_GAME,score,streak,onRestart}:{
 context:string;title:string;round:number;total?:number;score:number;streak:number;onRestart:()=>void;
}){
 const restart=()=>{
  if(typeof window==="undefined"||window.confirm("¿Reiniciar la partida?"))onRestart();
 };
 return <header className="space-y-5" data-testid="game-session-header">
  <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-sm sm:text-base">
   <Link to="/" className="justify-self-start font-bold underline" aria-label="Salir al menú">← Salir</Link>
   <p className="text-center font-bold">{context}</p>
   <button type="button" onClick={restart} className="justify-self-end font-bold underline">Reiniciar</button>
  </div>
  <h1 className="text-2xl font-black">{title}</h1>
  <div className="grid grid-cols-3 gap-2 text-center" aria-live="polite" aria-label="Marcador de partida">
   <div className="card-ink p-2"><span className="block text-xs">Ronda</span><strong className="text-xl tabular-nums">{round}/{total}</strong></div>
   <div className="card-ink p-2"><span className="block text-xs">Puntaje</span><strong className="text-xl text-primary tabular-nums">{score}</strong></div>
   <div className="card-ink p-2"><span className="block text-xs">Racha</span><strong className="text-xl tabular-nums">🔥{streak}</strong></div>
  </div>
  <div className="h-3 overflow-hidden rounded-full border-2 border-foreground bg-muted" role="progressbar"
   aria-label="Barra de avance" aria-valuemin={0} aria-valuemax={total} aria-valuenow={Math.min(round,total)}>
   <div className="h-full bg-primary transition-all" style={{width:`${Math.min(100,100*round/total)}%`}}/>
  </div>
 </header>;
}
