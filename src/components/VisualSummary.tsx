import { formatDateStr, diffDaysInclusive, type Trip } from "@/hooks/useSchengenCalculator";
import type { CalculationResult } from "@/hooks/useSchengenCalculator";
import GaugeChart from "./GaugeChart";

interface TimelineData {
  windowStart: Date;
  windowEnd: Date;
  trips: Trip[];
  totalDays: number;
}

interface Props {
  dashboard: {
    tripCount: number;
    totalRecorded: number;
    usedBefore: number | null;
    remainingBefore: number | null;
    windowStart: Date | null;
    windowEnd: Date | null;
  };
  timelineData: TimelineData | null;
  result: CalculationResult | null;
}

const VisualSummary = ({ dashboard, timelineData, result }: Props) => {
  const usedDays = result
    ? (result.type === "success" ? result.usedOnLastAllowed : Math.min(result.usedBefore, 90))
    : (dashboard.usedBefore !== null ? dashboard.usedBefore : 0);

  const hasData = dashboard.usedBefore !== null || result !== null;

  if (!hasData && !timelineData) return null;

  return (
    <div className="space-y-6">
      {/* Gauge */}
      {hasData && (
        <div className="rounded-3xl bg-card border border-border p-8 md:p-10" style={{ boxShadow: "var(--shadow-card)" }}>
          <GaugeChart
            used={usedDays}
            total={90}
            label={`${usedDays} / 90 ${"\u0585\u0580 \u0585\u0563\u057F\u0561\u0563\u0578\u0580\u056E\u057E\u0561\u056E"}`}
            sublabel={"180-\u0585\u0580\u0575\u0561 \u057A\u0561\u057F\u0578\u0582\u0570\u0561\u0576\u0578\u0582\u0574"}
          />
          <div className="flex justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: "var(--gradient-progress)" }} />
              <span className="text-xs text-muted-foreground">{"\u0555\u0563\u057F\u0561\u0563\u0578\u0580\u056E\u057E\u0561\u056E"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-muted" />
              <span className="text-xs text-muted-foreground">{"\u0544\u0576\u0561\u0581\u0561\u056E"}</span>
            </div>
          </div>
        </div>
      )}

      {/* Timeline */}
      {timelineData && (
        <div className="rounded-3xl bg-card border border-border p-6 md:p-8" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-foreground">{"180-\u0585\u0580\u0575\u0561 \u057A\u0561\u057F\u0578\u0582\u0570\u0561\u0576"}</h3>
            <span className="text-xs text-muted-foreground">
              {formatDateStr(timelineData.windowStart)} → {formatDateStr(timelineData.windowEnd)}
            </span>
          </div>
          <div className="relative rounded-2xl bg-muted/30 overflow-hidden" style={{ height: "80px" }}>
            <div className="absolute left-4 right-4 top-1/2 h-px bg-border -translate-y-1/2" />
            {timelineData.trips.length === 0 ? (
              <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground">
                {"\u0531\u0575\u057D \u057A\u0561\u057F\u0578\u0582\u0570\u0561\u0576\u056B \u0574\u0565\u057B stay \u0579\u056F\u0561"}
              </div>
            ) : (
              timelineData.trips.map((trip, i) => {
                const startOffset = diffDaysInclusive(timelineData.windowStart, trip.entry) - 1;
                const duration = diffDaysInclusive(trip.entry, trip.exit);
                const leftPct = Math.max(2, (startOffset / timelineData.totalDays) * 96 + 2);
                const widthPct = Math.max(1.5, (duration / timelineData.totalDays) * 96);
                return (
                  <div
                    key={i}
                    className="absolute rounded-full h-6 top-1/2 -translate-y-1/2 group cursor-default"
                    style={{
                      left: `${leftPct}%`,
                      width: `${widthPct}%`,
                      background: "var(--gradient-progress)",
                      opacity: 0.85,
                    }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-foreground text-background text-[10px] rounded-lg px-2 py-1 whitespace-nowrap pointer-events-none">
                      {formatDateStr(trip.entry)} → {formatDateStr(trip.exit)} ({duration}{"\u0585\u0580"})
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground mt-2 px-1">
            <span>{formatDateStr(timelineData.windowStart)}</span>
            <span>{formatDateStr(timelineData.windowEnd)}</span>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <p className="text-[11px] text-muted-foreground text-center leading-relaxed px-4">
        {"\u0531\u0575\u057D \u0563\u0578\u0580\u056E\u056B\u0584\u0568 \u0585\u0563\u0576\u0561\u056F\u0561\u0576 \u0567\u0589 \u054E\u0565\u0580\u057B\u0576\u0561\u056F\u0561\u0576 \u0578\u0580\u0578\u0577\u0574\u0561\u0576 \u0570\u0561\u0574\u0561\u0580 \u0564\u056B\u0574\u0565\u0584 \u0570\u0561\u0574\u0561\u057A\u0561\u057F\u0561\u057D\u056D\u0561\u0576 \u056F\u0578\u0576\u057D\u0578\u0582\u056C\u0561\u057F\u0561\u0581\u056B\u0561\u0575\u056B\u0576\u0589"}
      </p>
    </div>
  );
};

export default VisualSummary;
