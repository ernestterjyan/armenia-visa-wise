interface Props {
  used: number;
  total: number;
  label: string;
  sublabel: string;
}

const GaugeChart = ({ used, total, label, sublabel }: Props) => {
  const clamped = Math.max(0, Math.min(total, used));
  const percentage = total > 0 ? clamped / total : 0;
  const remaining = total - clamped;

  const size = 200;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const arcLength = circumference * 0.75;
  const dashOffset = arcLength * (1 - percentage);
  const rotation = 135;

  const getColor = () => {
    if (percentage >= 0.9) return "hsl(var(--destructive))";
    if (percentage >= 0.7) return "hsl(var(--warning))";
    return "url(#gaugeGradient)";
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--primary-glow))" />
            </linearGradient>
          </defs>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className="gauge-track"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            transform={`rotate(${rotation} ${size / 2} ${size / 2})`}
            strokeLinecap="round"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className="gauge-fill"
            stroke={getColor()}
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={dashOffset}
            transform={`rotate(${rotation} ${size / 2} ${size / 2})`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-extrabold text-foreground leading-none">{remaining}</span>
          <span className="text-sm text-muted-foreground mt-1">{"\u0574\u0576\u0561\u0581\u0565\u056C \u0567"}</span>
        </div>
      </div>
      <div className="text-center mt-2">
        <div className="text-sm font-semibold text-foreground">{label}</div>
        <div className="text-xs text-muted-foreground mt-0.5">{sublabel}</div>
      </div>
    </div>
  );
};

export default GaugeChart;
