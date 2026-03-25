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
  // Empty state — no planned date yet
  if (!hasPlannedDate) {
    return (
      <div className="rounded-3xl bg-card border border-border p-10 md:p-14 text-center" style={{ boxShadow: "var(--shadow-card)" }}>
        <Calendar size={32} className="text-muted-foreground/40 mx-auto mb-4" />
        <h2 className="text-lg font-bold text-foreground mb-1">{"\u0538\u0576\u057F\u0580\u0565\u0584 \u0576\u0561\u056D\u0561\u057F\u0565\u057D\u057E\u0561\u056E \u0574\u0578\u0582\u057F\u0584\u056B \u0585\u0580\u0568"}</h2>
        <p className="text-muted-foreground text-sm max-w-xs mx-auto leading-relaxed">
          {"\u0546\u0577\u0565\u0584 \u0565\u0580\u0562 \u0565\u0584 \u0576\u0561\u056D\u0561\u057F\u0565\u057D\u0578\u0582\u0574 \u0574\u0578\u0582\u057F\u0584 \u0563\u0578\u0580\u056E\u0565\u056C \u0587 \u057F\u0565\u057D\u0565\u0584 \u0569\u0565 \u0584\u0561\u0576\u056B \u0585\u0580 \u056F\u0561\u0580\u0578\u0572 \u0565\u0584 \u0574\u0576\u0561\u056C\u0589"}
        </p>
      </div>
    );
  }

  // Has planned date but hasn't calculated yet
  if (!result) {
    return (
      <div className="rounded-3xl bg-card border border-border p-10 md:p-14 text-center" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="text-5xl font-extrabold text-foreground mb-1">
          {dashboard.remainingBefore !== null ? dashboard.remainingBefore : "—"}
        </div>
        <div className="text-sm text-muted-foreground mb-5">{"\u0574\u0576\u0561\u0581\u0561\u056E \u0585\u0580 90-\u056B\u0581"}</div>
        <p className="text-muted-foreground text-xs max-w-xs mx-auto">
          {"\u054D\u0565\u0572\u0574\u0565\u0584 \u00AB\u0540\u0561\u0577\u057E\u0565\u056C\u00BB \u0573\u0565\u057F\u0561\u0563\u056B\u0580\u0568\u055D \u057F\u0565\u057D\u0576\u0565\u056C\u0578\u0582 \u0569\u0565 \u0584\u0561\u0576\u056B \u0585\u0580 \u056F\u0561\u0580\u0578\u0572 \u0565\u0584 \u0574\u0576\u0561\u056C\u0589"}
        </p>
      </div>
    );
  }

  const isSuccess = result.type === "success";

  return (
    <div
      className={`rounded-3xl border p-8 md:p-12 text-center ${
        isSuccess ? "bg-success-bg border-success-border" : "bg-error-bg border-error-border"
      }`}
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      {/* Status icon + label */}
      <div className="flex justify-center mb-4">
        {isSuccess
          ? <CheckCircle size={36} className="text-success" />
          : <XCircle size={36} className="text-destructive" />
        }
      </div>

      <h2 className={`text-xl font-extrabold mb-1 ${isSuccess ? "text-success-foreground" : "text-error-foreground"}`}>
        {isSuccess ? "\u053F\u0561\u0580\u0578\u0572 \u0565\u0584 \u0574\u0578\u0582\u057F\u0584 \u0563\u0578\u0580\u056E\u0565\u056C" : "\u0531\u0575\u057D \u0585\u0580\u0568 \u0574\u0578\u0582\u057F\u0584 \u0563\u0578\u0580\u056E\u0565\u056C \u0570\u0576\u0561\u0580\u0561\u057E\u0578\u0580 \u0579\u0567"}
      </h2>

      {isSuccess ? (
        <>
          {/* Big number */}
          <div className="text-6xl md:text-7xl font-extrabold text-foreground mt-5 mb-1 leading-none">
            {result.maxDays}
          </div>
          <div className="text-sm text-muted-foreground mb-6">{"\u0570\u0576\u0561\u0580\u0561\u057E\u0578\u0580 \u0585\u0580"}</div>

          {/* Supporting detail */}
          <div className="inline-flex items-center gap-2 rounded-2xl bg-card/80 border border-border/50 px-5 py-3">
            <span className="text-xs text-muted-foreground">{"\u054E\u0565\u0580\u057B\u056B\u0576 \u0585\u0580\u0568\u055D"}</span>
            <span className="text-sm font-bold text-foreground">
              {result.lastAllowedDate && formatDateStr(result.lastAllowedDate)}
            </span>
          </div>
        </>
      ) : (
        <p className={`text-sm mt-2 ${isSuccess ? "text-success-foreground/80" : "text-error-foreground/80"}`}>
          {"\u054E\u0565\u0580\u057B\u056B\u0576 180 \u0585\u0580\u057E\u0561 \u0574\u0565\u057B \u0561\u0580\u0564\u0565\u0576 \u0585\u0563\u057F\u0561\u0563\u0578\u0580\u056E\u0565\u056C \u0565\u0584 90 \u0585\u0580\u0568\u0589"}
        </p>
      )}
    </div>
  );
};

export default ResultCard;
