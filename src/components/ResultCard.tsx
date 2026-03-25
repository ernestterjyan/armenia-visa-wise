import { CheckCircle, XCircle, Calendar } from "lucide-react";
import { formatDateStr } from "@/hooks/useSchengenCalculator";
import type { CalculationResult } from "@/hooks/useSchengenCalculator";

interface Props {
  result: CalculationResult | null;
  dashboard: {
    usedBefore: number | null;
    remainingBefore: number | null;
    windowStart: Date | null;
    windowEnd: Date | null;
  };
  hasPlannedDate: boolean;
}

const ResultCard = ({ result, dashboard, hasPlannedDate }: Props) => {
  const windowLabel = dashboard.windowStart && dashboard.windowEnd
    ? `${formatDateStr(dashboard.windowStart)} - ${formatDateStr(dashboard.windowEnd)}`
    : "—";

  if (!hasPlannedDate) {
    return (
      <section className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)] md:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-muted">
            <Calendar size={18} className="text-muted-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              {"\u0538\u0576\u057F\u0580\u0565\u0584 \u057A\u056C\u0561\u0576\u0561\u057E\u0578\u0580\u057E\u0561\u056E \u0574\u0578\u0582\u057F\u0584\u056B \u0585\u0580\u0568"}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              {"\u0540\u0561\u0577\u057E\u0561\u0580\u056F\u0568 \u056F\u0581\u0578\u0582\u0581\u0561\u0564\u0580\u0578\u0576\u0584 \u0570\u0561\u0575\u057F\u0576\u057E\u0565\u056C\u0578\u0582 \u0567, \u0565\u0580\u0562 \u0576\u0577\u0565\u0584 \u0574\u0578\u0582\u057F\u0584\u056B \u0585\u0580\u0568 \u0587 \u0561\u0576\u0581\u0575\u0561\u056C \u0578\u0582\u0572\u0587\u0578\u0580\u0578\u0582\u0569\u0575\u0578\u0582\u0576\u0576\u0565\u0580\u0568\u0589"}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!result) {
    return (
      <section className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)] md:p-8">
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_220px] md:items-end">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              {"\u0540\u0561\u0577\u057E\u0561\u0580\u056F\u0568 \u057A\u0561\u057F\u0580\u0561\u057D\u057F \u0567"}
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {"\u054F\u057E\u0575\u0561\u056C \u0585\u0580\u057E\u0561\u056F\u0561\u0576 \u057A\u0561\u057F\u0578\u0582\u0570\u0561\u0576\u056B \u0574\u0565\u057B \u0561\u057C\u0561\u0575\u056A\u0574 \u0564\u0565\u0580 \u0574\u0576\u0561\u0581\u0561\u056E \u0567 "}
              <span className="font-semibold text-foreground">
                {dashboard.remainingBefore ?? "—"}
              </span>
              {" \u0585\u0580\u0589"}
            </p>
          </div>
          <div className="rounded-lg border border-border bg-background px-4 py-4">
            <p className="text-sm text-muted-foreground">{"180-\u0585\u0580\u0575\u0561 \u057A\u0561\u057F\u0578\u0582\u0570\u0561\u0576"}</p>
            <p className="mt-1 text-sm font-medium text-foreground">{windowLabel}</p>
          </div>
        </div>
      </section>
    );
  }

  const isSuccess = result.type === "success";
  const toneClasses = isSuccess
    ? "border-success-border bg-success-bg"
    : "border-error-border bg-error-bg";
  const toneTextClass = isSuccess ? "text-success-foreground" : "text-error-foreground";
  const toneIconClass = isSuccess ? "text-success" : "text-destructive";
  const statusLabel = isSuccess
    ? "\u053F\u0561\u0580\u0578\u0572 \u0565\u0584 \u0574\u0578\u0582\u057F\u0584 \u0563\u0578\u0580\u056E\u0565\u056C"
    : "\u0531\u0575\u057D \u0585\u0580\u0568 \u0574\u0578\u0582\u057F\u0584 \u0563\u0578\u0580\u056E\u0565\u056C \u0570\u0576\u0561\u0580\u0561\u057E\u0578\u0580 \u0579\u0567";
  const detailText = isSuccess
    ? "\u0540\u0561\u0577\u057E\u0561\u0580\u056F\u0568 \u0581\u0578\u0582\u0575\u0581 \u0567 \u057F\u0561\u056C\u056B\u057D, \u0569\u0565 \u0561\u057C\u0561\u0576\u0581 \u056F\u0561\u0576\u0578\u0576\u0568 \u056D\u0561\u056D\u057F\u0565\u056C\u0578\u0582 \u0584\u0561\u0576\u056B \u0585\u0580 \u0565\u0584 \u056F\u0561\u0580\u0578\u0572 \u0574\u0576\u0561\u056C\u0589"
    : "\u054E\u0565\u0580\u057B\u056B\u0576 180 \u0585\u0580\u057E\u0561 \u0574\u0565\u057B 90 \u0585\u0580\u0568 \u0561\u0580\u0564\u0565\u0576 \u056C\u0580\u0561\u0581\u057E\u0561\u056E \u0565\u0576, \u0587 \u0574\u0578\u0582\u057F\u0584\u0568 \u0576\u0578\u0580\u056B\u0581 \u0569\u0578\u0582\u0575\u056C\u0561\u057F\u0580\u0565\u056C\u056B \u0579\u0567\u0589";

  return (
    <section className={`rounded-xl border p-6 shadow-[var(--shadow-card)] md:p-8 ${toneClasses}`}>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          <div className={`flex items-center gap-2 text-sm font-medium ${toneTextClass}`}>
            {isSuccess ? (
              <CheckCircle size={18} className={toneIconClass} />
            ) : (
              <XCircle size={18} className={toneIconClass} />
            )}
            <span>{statusLabel}</span>
          </div>

          <div className="mt-5 flex items-end gap-3">
            <span className="text-6xl font-semibold leading-none tracking-[-0.06em] text-foreground md:text-7xl">
              {isSuccess ? result.maxDays : 0}
            </span>
            <span className="pb-2 text-base text-muted-foreground">
              {"\u0585\u0580"}
            </span>
          </div>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            {detailText}
          </p>
        </div>

        <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <div className="rounded-lg border border-border bg-card/70 p-4">
            <dt className="text-sm text-muted-foreground">{"\u0555\u0563\u057F\u0561\u0563\u0578\u0580\u056E\u057E\u0561\u056E \u0585\u0580\u0565\u0580"}</dt>
            <dd className="mt-1 text-lg font-semibold text-foreground">
              {result.usedBefore} / 90
            </dd>
          </div>
          <div className="rounded-lg border border-border bg-card/70 p-4">
            <dt className="text-sm text-muted-foreground">{"\u0544\u0576\u0561\u0581\u0561\u056E \u0585\u0580 \u0574\u0578\u0582\u057F\u0584\u056B\u0581 \u0561\u057C\u0561\u057B"}</dt>
            <dd className="mt-1 text-lg font-semibold text-foreground">
              {dashboard.remainingBefore ?? "—"}
            </dd>
          </div>
          <div className="rounded-lg border border-border bg-card/70 p-4">
            <dt className="text-sm text-muted-foreground">{"180-\u0585\u0580\u0575\u0561 \u057A\u0561\u057F\u0578\u0582\u0570\u0561\u0576"}</dt>
            <dd className="mt-1 text-sm font-medium text-foreground">{windowLabel}</dd>
          </div>
          <div className="rounded-lg border border-border bg-card/70 p-4">
            <dt className="text-sm text-muted-foreground">
              {isSuccess ? "\u054E\u0565\u0580\u057B\u056B\u0576 \u0569\u0578\u0582\u0575\u056C\u0561\u057F\u0580\u0565\u056C\u056B \u0585\u0580" : "\u054E\u056B\u0573\u0561\u056F"}
            </dt>
            <dd className="mt-1 text-sm font-medium text-foreground">
              {isSuccess && result.lastAllowedDate ? formatDateStr(result.lastAllowedDate) : "\u054D\u0561\u0570\u0574\u0561\u0576\u0561\u0583\u0561\u056F\u057E\u0561\u056E"}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
};

export default ResultCard;
