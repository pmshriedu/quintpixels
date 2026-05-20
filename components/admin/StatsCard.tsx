interface StatsCardProps {
  label: string;
  value: number | string;
  sub?: string;
  accent?: boolean;
}

export function StatsCard({ label, value, sub, accent }: StatsCardProps) {
  return (
    <div className="bg-white/3 border border-white/5 rounded-sm p-4 hover:bg-white/5 transition-colors">
      <div className="font-pixel text-[7px] tracking-[0.3em] text-white/30 uppercase mb-2">
        {label}
      </div>
      <div
        className={`font-pixel text-[28px] leading-none ${accent ? "text-white" : "text-white/80"}`}
      >
        {value}
      </div>
      {sub && (
        <div className="font-mono text-[9px] text-white/25 mt-1 uppercase tracking-wider">
          {sub}
        </div>
      )}
    </div>
  );
}
