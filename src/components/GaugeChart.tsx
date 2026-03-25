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

  const strokeColor =
    percentage >= 0.9
      ? "hsl(var(--destructive))"
      : percentage >= 0.7
        ? "hsl(var(--warning))"
        : "hsl(var(--primary))";

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
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
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={dashOffset}
            transform={`rotate(${rotation} ${size / 2} ${size / 2})`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-semibold text-foreground leading-none tracking-[-0.05em]">{remaining}</span>
          <span className="mt-1 text-sm text-muted-foreground">{"\u0574\u0576\u0561\u0581\u0565\u056C \u0567"}</span>
        </div>
      </div>
      <div className="mt-3 text-center">
        <div className="text-sm font-medium text-foreground">{label}</div>
        <div className="mt-1 text-sm text-muted-foreground">{sublabel}</div>
      </div>
    </div>
  );
};

export default GaugeChart;
