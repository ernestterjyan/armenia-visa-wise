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

const StatCard = ({ label, value, sub }: { label: string; value: string; sub: string }) => (
  <div className="rounded-2xl border border-border p-4" style={{ background: "var(--gradient-card-subtle)" }}>
    <div className="text-xs text-muted-foreground mb-2">{label}</div>
    <div className="text-3xl font-extrabold leading-none mb-2">{value}</div>
    <div className="text-xs text-muted-foreground leading-snug">{sub}</div>
  </div>
);

const VisualSummary = ({ dashboard, timelineData, result }: Props) => {
  const usedDays = result
    ? (result.type === "success" ? result.usedOnLastAllowed : Math.min(result.usedBefore, 90))
    : (dashboard.usedBefore !== null ? dashboard.usedBefore : 0);
  const progressPercent = Math.min(100, (Math.max(0, Math.min(90, usedDays)) / 90) * 100);

  const progressLabel = result
    ? (result.type === "success"
      ? `\u054E\u0565\u0580\u057B\u056B\u0576 \u0569\u0578\u0582\u0575\u056C\u0561\u057F\u0580\u0565\u056C\u056B \u0585\u0580\u057E\u0561 \u0570\u0561\u0577\u057E\u0561\u0580\u056F\u0578\u057E\u055D ${result.usedOnLastAllowed} / 90 \u0585\u0580`
      : `\u0544\u056B\u0576\u0579\u0587 \u0574\u0578\u0582\u057F\u0584\u056B \u0585\u0580\u0568 \u0585\u0563\u057F\u0561\u0563\u0578\u0580\u056E\u057E\u0561\u056E\u055D ${result.usedBefore} / 90 \u0585\u0580`)
    : (dashboard.usedBefore !== null
      ? `\u0544\u056B\u0576\u0579\u0587 \u0574\u0578\u0582\u057F\u0584\u056B \u0585\u0580\u0568 \u0585\u0563\u057F\u0561\u0563\u0578\u0580\u056E\u057E\u0561\u056E\u055D ${dashboard.usedBefore} / 90 \u0585\u0580`
      : "\u0538\u0576\u057F\u0580\u0565\u0584 \u0574\u0578\u0582\u057F\u0584\u056B \u0585\u0580");

  return (
    <div className="rounded-2xl border border-border bg-card p-5 md:p-6" style={{ boxShadow: "var(--shadow-card)" }}>
      <h2 className="text-xl font-bold mb-2">{"\u054F\u0565\u057D\u0578\u0572\u0561\u056F\u0561\u0576 \u0561\u0574\u0583\u0578\u0583\u0578\u0582\u0574"}</h2>
      <p className="text-muted-foreground text-sm mb-4">
        {"\u0531\u0575\u057D \u0570\u0561\u057F\u057E\u0561\u056E\u0568 \u0569\u0561\u0580\u0574\u0561\u0581\u057E\u0578\u0582\u0574 \u0567, \u0565\u0580\u0562 \u0583\u0578\u056D\u0578\u0582\u0574 \u0565\u0584 \u057F\u057E\u0575\u0561\u056C\u0576\u0565\u0580\u0568 \u056F\u0561\u0574 \u0568\u0576\u057F\u0580\u0578\u0582\u0574 \u0565\u0584 \u0574\u0578\u0582\u057F\u0584\u056B \u0585\u0580\u0568\u0589"}
      </p>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <StatCard
          label={"\u0533\u0580\u0561\u0576\u0581\u057E\u0561\u056E \u0578\u0582\u0572\u0587\u0578\u0580\u0578\u0582\u0569\u0575\u0578\u0582\u0576\u0576\u0565\u0580"}
          value={String(dashboard.tripCount)}
          sub={"\u0544\u056B\u0561\u057E\u0578\u0580\u057E\u0561\u056E intervals-\u0576\u0565\u0580\u056B \u0584\u0561\u0576\u0561\u056F\u0568"}
        />
        <StatCard
          label={"\u0538\u0576\u0564\u0570\u0561\u0576\u0578\u0582\u0580 \u0563\u0580\u0561\u0576\u0581\u057E\u0561\u056E \u0585\u0580\u0565\u0580"}
          value={String(dashboard.totalRecorded)}
          sub={"\u0532\u0578\u056C\u0578\u0580 \u0576\u0561\u056D\u0578\u0580\u0564 \u0578\u0582\u0572\u0587\u0578\u0580\u0578\u0582\u0569\u0575\u0578\u0582\u0576\u0576\u0565\u0580\u056B \u0563\u0578\u0582\u0574\u0561\u0580\u0568"}
        />
        <StatCard
          label={"180 \u0585\u0580\u0578\u0582\u0574 \u0561\u0580\u0564\u0565\u0576 \u0585\u0563\u057F\u0561\u0563\u0578\u0580\u056E\u057E\u0561\u056E"}
          value={dashboard.usedBefore !== null ? String(dashboard.usedBefore) : "\u2014"}
          sub={"\u0544\u0578\u0582\u057F\u0584\u056B\u0581 \u0561\u057C\u0561\u057B\u057E\u0561 180-\u0585\u0580\u0575\u0561 \u057A\u0561\u057F\u0578\u0582\u0570\u0561\u0576\u0578\u0582\u0574"}
        />
        <StatCard
          label={"\u054D\u056F\u0566\u0562\u0578\u0582\u0574 \u0574\u0576\u0561\u0581\u0578\u0572 \u0585\u0580\u0565\u0580"}
          value={dashboard.remainingBefore !== null ? String(dashboard.remainingBefore) : "\u2014"}
          sub={"\u0554\u0561\u0576\u056B \u0585\u0580 \u0564\u0565\u057C \u0570\u0561\u057D\u0561\u0576\u0565\u056C\u056B \u0567 \u0576\u0578\u0580 stay-\u056B \u0570\u0561\u0574\u0561\u0580"}
        />
      </div>

      {/* Progress bar */}
      <div className="mt-4 rounded-2xl border border-border p-4" style={{ background: "var(--gradient-card-subtle)" }}>
        <div className="flex items-center justify-between gap-3 mb-2.5">
          <span className="text-sm font-extrabold">{"\u0555\u0563\u057F\u0561\u0563\u0578\u0580\u056E\u057E\u0561\u056E/\u0574\u0576\u0561\u0581\u0561\u056E \u0585\u0580\u0565\u0580"}</span>
          <span className="text-xs text-muted-foreground">{progressLabel}</span>
        </div>
        <div className="h-3.5 w-full rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%`, background: "var(--gradient-progress)" }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>0 {"\u0585\u0580"}</span>
          <span>90 {"\u0585\u0580"}</span>
        </div>
      </div>

      {/* Timeline */}
      {timelineData && (
        <div className="mt-4 rounded-2xl border border-border p-4" style={{ background: "var(--gradient-card-subtle)" }}>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className="text-sm font-extrabold">{"180-\u0585\u0580\u0575\u0561 \u057A\u0561\u057F\u0578\u0582\u0570\u0561\u0576\u056B \u057F\u0565\u057D\u0584"}</span>
            <span className="text-xs text-muted-foreground">
              {formatDateStr(timelineData.windowStart)} → {formatDateStr(timelineData.windowEnd)}
            </span>
          </div>
          <div className="relative h-32 rounded-2xl border border-border bg-muted/40 overflow-hidden">
            <div className="absolute inset-x-0 bottom-11 h-0.5 bg-primary/10" />
            {timelineData.trips.length === 0 ? (
              <div className="absolute left-3 top-4 text-xs text-muted-foreground rounded-full border border-border bg-card/90 px-2 py-1">
                {"\u0531\u0575\u057D \u057A\u0561\u057F\u0578\u0582\u0570\u0561\u0576\u056B \u0574\u0565\u057B \u0576\u0561\u056D\u0578\u0580\u0564 stay \u0579\u056F\u0561"}
              </div>
            ) : (
              timelineData.trips.map((trip, i) => {
                const startOffset = diffDaysInclusive(timelineData.windowStart, trip.entry) - 1;
                const duration = diffDaysInclusive(trip.entry, trip.exit);
                const leftPct = (startOffset / timelineData.totalDays) * 100;
                const widthPct = (duration / timelineData.totalDays) * 100;
                const row = i % 3;
                const top = 14 + row * 28;
                return (
                  <div key={i}>
                    <div
                      className="absolute h-4 rounded-full"
                      style={{ left: `${leftPct}%`, width: `${Math.max(widthPct, 1.5)}%`, top: `${top + 28}px`, background: "var(--gradient-progress)", boxShadow: "0 4px 12px hsla(230, 80%, 50%, 0.18)" }}
                    />
                    <div
                      className="absolute text-[11px] rounded-full border border-border bg-card/90 text-accent-foreground px-2 py-0.5 whitespace-nowrap overflow-hidden text-ellipsis max-w-[calc(100%-8px)]"
                      style={{ left: `${Math.min(leftPct, 75)}%`, top: `${top}px` }}
                    >
                      {formatDateStr(trip.entry)} → {formatDateStr(trip.exit)}
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>{formatDateStr(timelineData.windowStart)}</span>
            <span>{formatDateStr(timelineData.windowEnd)}</span>
          </div>
        </div>
      )}

      {/* Result card */}
      {result && (
        <div className={`mt-4 rounded-2xl border p-4 ${
          result.type === "success"
            ? "bg-success-bg border-success-border text-success-foreground"
            : "bg-error-bg border-error-border text-error-foreground"
        }`}>
          <div className="font-extrabold text-base mb-1.5">
            {result.type === "success"
              ? "\u0540\u0561\u0577\u057E\u0561\u0580\u056F\u0568 \u057A\u0561\u057F\u0580\u0561\u057D\u057F \u0567"
              : "\u0531\u0575\u057D \u0585\u0580\u0568 \u0574\u0578\u0582\u057F\u0584 \u0563\u0578\u0580\u056E\u0565\u056C \u0579\u056B \u057D\u057F\u0561\u0581\u057E\u0578\u0582\u0574"}
          </div>
          {result.type === "success" ? (
            <>
              <p className="text-sm leading-relaxed">
                {"\u0531\u0575\u057D \u0574\u0578\u0582\u057F\u0584\u056B \u0585\u0580\u056B\u0581 \u057D\u056F\u057D\u0561\u056E \u056F\u0561\u0580\u0578\u0572 \u0565\u0584 \u0561\u0576\u0568\u0576\u0564\u0574\u0565\u057B \u0574\u0576\u0561\u056C \u0574\u056B\u0576\u0579\u0587 "}
                <strong>{result.maxDays}</strong> {"\u0585\u0580\u0589"}
              </p>
              <div className="mt-3 space-y-2">
                <div className="rounded-xl bg-card/60 border border-border/30 px-3 py-2.5 text-sm">
                  <strong>{"\u054E\u0565\u0580\u057B\u056B\u0576 \u0569\u0578\u0582\u0575\u056C\u0561\u057F\u0580\u0565\u056C\u056B \u0585\u0580\u0568."}</strong> {result.lastAllowedDate && formatDateStr(result.lastAllowedDate)}
                </div>
                <div className="rounded-xl bg-card/60 border border-border/30 px-3 py-2.5 text-sm">
                  <strong>{"\u0544\u0578\u0582\u057F\u0584\u056B\u0581 \u0561\u057C\u0561\u057B \u0585\u0563\u057F\u0561\u0563\u0578\u0580\u056E\u057E\u0561\u056E \u0585\u0580\u0565\u0580."}</strong> {result.usedBefore} / 90
                </div>
                <div className="rounded-xl bg-card/60 border border-border/30 px-3 py-2.5 text-sm">
                  <strong>{"\u054E\u0565\u0580\u057B\u056B\u0576 \u0569\u0578\u0582\u0575\u056C\u0561\u057F\u0580\u0565\u056C\u056B \u0585\u0580\u057E\u0561 \u0570\u0561\u0577\u057E\u0561\u0580\u056F\u0568."}</strong> {result.usedOnLastAllowed} / 90
                </div>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm leading-relaxed">
                {"\u054E\u0565\u0580\u057B\u056B\u0576 180 \u0585\u0580\u057E\u0561 \u0576\u0565\u0580\u057D\u0578\u0582\u0574 \u0561\u0580\u0564\u0565\u0576 \u0561\u0575\u0576\u0584\u0561\u0576 \u0585\u0580 \u0565\u0584 \u0585\u0563\u057F\u0561\u0563\u0578\u0580\u056E\u0565\u056C, \u0578\u0580 \u0561\u0575\u057D \u0561\u0574\u057D\u0561\u0569\u057E\u056B\u0581 \u0576\u0578\u0580 stay \u057D\u056F\u057D\u0565\u056C \u0570\u0576\u0561\u0580\u0561\u057E\u0578\u0580 \u0579\u0567\u0589"}
              </p>
              <div className="mt-3 rounded-xl bg-card/60 border border-border/30 px-3 py-2.5 text-sm">
                <strong>{"\u0544\u0578\u0582\u057F\u0584\u056B\u0581 \u0561\u057C\u0561\u057B \u0585\u0563\u057F\u0561\u0563\u0578\u0580\u056E\u057E\u0561\u056E \u0585\u0580\u0565\u0580."}</strong> {result.usedBefore} / 90
              </div>
            </>
          )}
        </div>
      )}

      {/* Mini help */}
      <div className="mt-4 rounded-2xl border border-warning-border bg-warning-bg p-4 text-sm text-warning-foreground leading-relaxed">
        <strong>{"\u053B\u0576\u0579\u057A\u0565\u057D \u0570\u0561\u057D\u056F\u0561\u0576\u0561\u056C \u0561\u0575\u057D \u057A\u0561\u057F\u056F\u0565\u0580\u0568."}</strong>{" "}
        {"\u0535\u0569\u0565 progress bar-\u0568 \u0574\u0578\u057F\u0565\u0576\u0578\u0582\u0574 \u0567 90-\u056B\u0576, \u0576\u0577\u0561\u0576\u0561\u056F\u0578\u0582\u0574 \u0567\u055D \u0576\u0561\u056D\u0578\u0580\u0564 180 \u0585\u0580\u057E\u0561 \u0576\u0565\u0580\u057D\u0578\u0582\u0574 \u0561\u0580\u0564\u0565\u0576 \u0577\u0561\u057F \u0585\u0580 \u0565\u0584 \u0585\u0563\u057F\u0561\u0563\u0578\u0580\u056E\u0565\u056C\u0589"}
      </div>

      <div className="mt-4 text-xs text-muted-foreground leading-relaxed">
        {"\u0531\u0575\u057D \u057F\u0561\u0580\u0562\u0565\u0580\u0561\u056F\u0568 \u057A\u0561\u0570\u0578\u0582\u0574 \u0567 \u0578\u0582\u0572\u0587\u0578\u0580\u0578\u0582\u0569\u0575\u0578\u0582\u0576\u0576\u0565\u0580\u0568 \u0571\u0565\u0580 \u0576\u0578\u0582\u0575\u0576 \u0562\u0580\u0561\u0578\u0582\u0566\u0565\u0580\u0578\u0582\u0574, \u0561\u0575\u0576\u057A\u0565\u057D \u0578\u0580 \u0567\u057B\u0568 \u0576\u0578\u0580\u056B\u0581 \u0562\u0561\u0581\u0565\u056C\u056B\u057D \u057F\u057E\u0575\u0561\u056C\u0576\u0565\u0580\u0568 \u056F\u0574\u0576\u0561\u0576\u0589"}
      </div>
    </div>
  );
};

export default VisualSummary;
