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
    <section className="overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)]">
      <div className="border-b border-border px-6 py-5">
        <h2 className="text-lg font-semibold text-foreground">
          {"\u0531\u0574\u0583\u0578\u0583 \u057A\u0561\u057F\u056F\u0565\u0580"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {"\u0555\u0563\u057F\u0561\u0563\u0578\u0580\u056E\u057E\u0561\u056E \u0585\u0580\u0565\u0580\u0568 \u0587 180-\u0585\u0580\u0575\u0561 \u057A\u0561\u057F\u0578\u0582\u0570\u0561\u0576\u0568"}
        </p>
      </div>

      {hasData && (
        <div className="grid gap-6 px-6 py-5 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-center">
          <GaugeChart
            used={usedDays}
            total={90}
            label={`${usedDays} / 90 ${"\u0585\u0580 \u0585\u0563\u057F\u0561\u0563\u0578\u0580\u056E\u057E\u0561\u056E"}`}
            sublabel={"180-\u0585\u0580\u0575\u0561 \u057A\u0561\u057F\u0578\u0582\u0570\u0561\u0576\u0578\u0582\u0574"}
          />

          <dl className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-border bg-background px-4 py-4">
              <dt className="text-sm text-muted-foreground">{"\u0555\u0563\u057F\u0561\u0563\u0578\u0580\u056E\u057E\u0561\u056E"}</dt>
              <dd className="mt-1 text-xl font-semibold text-foreground">{usedDays}</dd>
            </div>
            <div className="rounded-lg border border-border bg-background px-4 py-4">
              <dt className="text-sm text-muted-foreground">{"\u0544\u0576\u0561\u0581\u0561\u056E"}</dt>
              <dd className="mt-1 text-xl font-semibold text-foreground">{Math.max(0, 90 - usedDays)}</dd>
            </div>
            <div className="rounded-lg border border-border bg-background px-4 py-4">
              <dt className="text-sm text-muted-foreground">{"\u0533\u0580\u0561\u0576\u0581\u057E\u0561\u056E \u0578\u0582\u0572\u0587\u0578\u0580\u0578\u0582\u0569\u0575\u0578\u0582\u0576"}</dt>
              <dd className="mt-1 text-xl font-semibold text-foreground">{dashboard.tripCount}</dd>
            </div>
          </dl>
        </div>
      )}

      {timelineData && (
        <div className="border-t border-border px-6 py-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <h3 className="text-base font-semibold text-foreground">
              {"180-\u0585\u0580\u0575\u0561 \u057A\u0561\u057F\u0578\u0582\u0570\u0561\u0576"}
            </h3>
            <span className="text-sm text-muted-foreground">
              {formatDateStr(timelineData.windowStart)} → {formatDateStr(timelineData.windowEnd)}
            </span>
          </div>

          <div className="mt-4 rounded-lg border border-border bg-background px-4 py-5">
            <div className="relative h-14 overflow-hidden rounded-md bg-muted/60">
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
                      className="absolute top-1/2 h-4 -translate-y-1/2 rounded-sm bg-primary/85"
                      style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                      title={`${formatDateStr(trip.entry)} → ${formatDateStr(trip.exit)} (${duration} \u0585\u0580)`}
                    />
                  );
                })
              )}
            </div>

            <div className="mt-3 flex justify-between text-sm text-muted-foreground">
              <span>{formatDateStr(timelineData.windowStart)}</span>
              <span>{formatDateStr(timelineData.windowEnd)}</span>
            </div>
          </div>
        </div>
      )}

      <div className="border-t border-border bg-muted/35 px-6 py-4">
        <p className="text-sm leading-6 text-muted-foreground">
          {"\u0531\u0575\u057D \u0563\u0578\u0580\u056E\u056B\u0584\u0568 \u0585\u0563\u0576\u0561\u056F\u0561\u0576 \u0567\u0589 \u054E\u0565\u0580\u057B\u0576\u0561\u056F\u0561\u0576 \u0578\u0580\u0578\u0577\u0574\u0561\u0576 \u0570\u0561\u0574\u0561\u0580 \u057D\u057F\u0578\u0582\u0563\u0565\u0584 \u0576\u0561\u0587 \u057A\u0561\u0577\u057F\u0578\u0576\u0561\u056F\u0561\u0576 \u0561\u0572\u0562\u0575\u0578\u0582\u0580\u0576\u0565\u0580\u0568\u0589"}
        </p>
      </div>
    </section>
  );
};

export default VisualSummary;
