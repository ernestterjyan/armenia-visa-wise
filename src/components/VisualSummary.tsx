import { formatDateStr, diffDaysInclusive, type Trip } from "@/hooks/useSchengenCalculator";
import type { CalculationResult } from "@/hooks/useSchengenCalculator";

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
  const occupancyCells = Array.from({ length: 90 }, (_, index) => index < usedDays);
  const monthMarkers = timelineData
    ? (() => {
        const markers: { label: string; leftPct: number }[] = [];
        const current = new Date(timelineData.windowStart.getFullYear(), timelineData.windowStart.getMonth(), 1);

        while (current <= timelineData.windowEnd) {
          const offset = Math.max(0, diffDaysInclusive(timelineData.windowStart, current) - 1);
          markers.push({
            label: `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, "0")}`,
            leftPct: Math.min(100, (offset / timelineData.totalDays) * 100),
          });
          current.setMonth(current.getMonth() + 1, 1);
        }

        return markers;
      })()
    : [];

  if (!hasData && !timelineData) return null;

  return (
    <section className="overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)]">
      <div className="border-b border-border px-6 py-5">
        <h2 className="text-lg font-semibold text-foreground">
          {"\u0531\u0574\u0583\u0578\u0583 \u0578\u0582 \u057A\u0561\u057F\u0578\u0582\u0570\u0561\u0576"}
        </h2>
        <p className="mt-1 text-sm leading-7 text-muted-foreground">
          {"\u0555\u0563\u057F\u0561\u0563\u0578\u0580\u056E\u057E\u0561\u056E \u0584\u0578\u057F\u0561\u0576 \u0587 180-\u0585\u0580\u0575\u0561 \u057A\u0561\u057F\u0578\u0582\u0570\u0561\u0576\u0568 \u0574\u0565\u056F \u0570\u0561\u0575\u0561\u0581\u0584\u0578\u057E\u0589"}
        </p>
      </div>

      {hasData && (
        <div className="grid gap-6 border-b border-border px-6 py-5 lg:grid-cols-[minmax(0,1fr)_240px]">
          <div>
            <div className="grid grid-cols-9 gap-1">
              {occupancyCells.map((filled, index) => (
                <div
                  key={index}
                  className={`h-6 rounded-sm border ${
                    filled
                      ? "border-primary/40 bg-primary/85"
                      : "border-border bg-secondary"
                  }`}
                />
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
              <span>{"\u0555\u0563\u057F\u0561\u0563\u0578\u0580\u056E\u057E\u0561\u056E"}</span>
              <span className="font-mono text-foreground">{usedDays} / 90</span>
            </div>
          </div>

          <dl className="grid gap-3">
            <div className="rounded-lg border border-border bg-secondary px-4 py-4">
              <dt className="text-sm text-muted-foreground">{"\u0544\u0576\u0561\u0581\u0561\u056E"}</dt>
              <dd className="mt-1 font-mono text-xl font-semibold text-foreground">{Math.max(0, 90 - usedDays)}</dd>
            </div>
            <div className="rounded-lg border border-border bg-secondary px-4 py-4">
              <dt className="text-sm text-muted-foreground">{"\u0533\u0580\u0561\u0576\u0581\u057E\u0561\u056E \u0578\u0582\u0572\u0587\u0578\u0580\u0578\u0582\u0569\u0575\u0578\u0582\u0576"}</dt>
              <dd className="mt-1 font-mono text-xl font-semibold text-foreground">{dashboard.tripCount}</dd>
            </div>
          </dl>
        </div>
      )}

      {timelineData && (
        <div className="px-6 py-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <h3 className="text-base font-semibold text-foreground">
              {"180-\u0585\u0580\u0575\u0561 \u057A\u0561\u057F\u0578\u0582\u0570\u0561\u0576"}
            </h3>
            <span className="text-sm text-muted-foreground">
              {formatDateStr(timelineData.windowStart)} → {formatDateStr(timelineData.windowEnd)}
            </span>
          </div>

          <div className="mt-4 rounded-lg border border-border bg-background px-4 py-5">
            <div className="relative h-20 overflow-hidden rounded-md bg-secondary">
              {monthMarkers.map((marker) => (
                <div
                  key={marker.label}
                  className="absolute top-0 h-full border-l border-border/70"
                  style={{ left: `${marker.leftPct}%` }}
                />
              ))}
              <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border" />
              {timelineData.trips.length === 0 ? (
                <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
                  {"\u0531\u0575\u057D \u057A\u0561\u057F\u0578\u0582\u0570\u0561\u0576\u056B \u0574\u0565\u057B \u0563\u0580\u0561\u0576\u0581\u057E\u0561\u056E \u0574\u0576\u0561\u056C\u0578\u0582 \u0585\u0580 \u0579\u056F\u0561\u0589"}
                </div>
              ) : (
                timelineData.trips.map((trip, i) => {
                  const startOffset = diffDaysInclusive(timelineData.windowStart, trip.entry) - 1;
                  const duration = diffDaysInclusive(trip.entry, trip.exit);
                  const leftPct = Math.max(0, (startOffset / timelineData.totalDays) * 100);
                  const widthPct = Math.max(1, (duration / timelineData.totalDays) * 100);

                  return (
                    <div
                      key={i}
                      className="absolute top-1/2 h-5 -translate-y-1/2 rounded-sm bg-primary/85"
                      style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                      title={`${formatDateStr(trip.entry)} → ${formatDateStr(trip.exit)} (${duration} \u0585\u0580)`}
                    />
                  );
                })
              )}
            </div>

            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
              {monthMarkers.map((marker) => (
                <span key={marker.label}>{marker.label}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default VisualSummary;
