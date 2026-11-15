export function NextButton({ onClick, isLast }: { onClick: () => void; isLast: boolean }) {
  return (
    <button onClick={onClick} className="tile w-full bg-secondary text-secondary-foreground text-lg" autoFocus>
      {isLast ? "Ver resultados →" : "Siguiente →"}
    </button>
  );
}