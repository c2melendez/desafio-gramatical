export function PerfectBadge({visible=true}:{visible?:boolean}){
 if(!visible)return null;
 return <span className="inline-flex items-center gap-1 rounded-lg border border-current px-2 py-1 text-xs font-bold"><span aria-hidden="true">⭐</span> Dominado al 100 %</span>;
}
