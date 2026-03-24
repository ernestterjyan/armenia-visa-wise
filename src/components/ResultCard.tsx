import { CheckCircle, XCircle, Calendar, Clock } from "lucide-react";
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
  if (!hasPlannedDate) {
    return (
      <div className="rounded-3xl bg-card border border-border p-8 md:p-10 text-center" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-5">
          <Calendar size={28} className="text-muted-foreground" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-2">{" Delays\u0538\u0576\u057F\u0580\u0565\u0584 \u0576\u0561\u056D\u0561\u057F\u0565\u057D\u057E\u0561\u056E \u0574\u0578\u0582\u057F\u0584\u056B \u0585\u0580\u0568"}</h2>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto">
          {"Delays\u0531\u057E\u0565\u056C\u0561\u0581\u0580\u0565\u0584 \u0576\u0561\u056D\u0578\u0580\u0564 \u0578\u0582\u0572\u0587\u0578\u0580\u0578\u0582\u0569\u0575\u0578\u0582\u0576\u0576\u0565\u0580\u0568 \u0587 \u0568\u0576\u057F\u0580\u0565\u0584 \u0574\u0578\u0582\u057F\u0584\u056B \u0585\u0580\u0568\u055D \u0561\u0580\u0564\u0575\u0578\u0582\u0576\u0584\u0568 \u057F\u0565\u057D\u0576\u0565\u056C\u0578\u0582 \u0570\u0561\u0574\u0561\u0580\u0589"}
        </p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="rounded-3xl bg-card border border-border p-8 md:p-10 text-center" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="w-16 h-16 rounded-2xl bg-primary/8 flex items-center justify-center mx-auto mb-5">
          <Clock size={28} className="text-primary" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-2">{"Delays\u054D\u0565\u0572\u0574\u0565\u0584 \u0570\u0561\u0577\u057E\u0565\u056C\u0568"}</h2>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto">
          {"Delays\u054D\u0565\u0572\u0574\u0565\u0584 «\u0540\u0561\u0577\u057E\u0565\u056C» \u056F\u0578\u0573\u0561\u056F\u0568\u055D \u057F\u0565\u057D\u0576\u0565\u056C\u0578\u0582 \u0569\u0565 \u0584\u0561\u0576\u056B \u0585\u0580 \u056F\u0561\u0580\u0578\u0572 \u0565\u0584 \u0574\u0576\u0561\u056C\u0589"}
        </p>
        {dashboard.usedBefore !== null && (
          <div className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-muted/60 px-5 py-3">
            <span className="text-sm text-muted-foreground">{"Delays\u0531\u0580\u0564\u0565\u0576 \u0585\u0563\u057F\u0561\u0563\u0578\u0580\u056E\u057E\u0561\u056E\u055D"}</span>
            <span className="text-lg font-bold text-foreground">{dashboard.usedBefore} / 90</span>
          </div>
        )}
      </div>
    );
  }

  const isSuccess = result.type === "success";

  return (
    <div
      className={`rounded-3xl border p-8 md:p-10 ${
        isSuccess
          ? "bg-success-bg border-success-border"
          : "bg-error-bg border-error-border"
      }`}
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="flex items-start gap-4 mb-6">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
          isSuccess ? "bg-success/10" : "bg-destructive/10"
        }`}>
          {isSuccess
            ? <CheckCircle size={28} className="text-success" />
            : <XCircle size={28} className="text-destructive" />
          }
        </div>
        <div>
          <h2 className={`text-xl font-bold ${isSuccess ? "text-success-foreground" : "text-error-foreground"}`}>
            {isSuccess ? "Delays\u053F\u0561\u0580\u0578\u0572 \u0565\u0584 \u0574\u0578\u0582\u057F\u0584 \u0563\u0578\u0580\u056E\u0565\u056C" : "Delays\u0531\u0575\u057D \u0585\u0580\u0568 \u0574\u0578\u0582\u057F\u0584 \u0563\u0578\u0580\u056E\u0565\u056C \u0570\u0576\u0561\u0580\u0561\u057E\u0578\u0580 \u0579\u0567"}
          </h2>
          <p className={`text-sm mt-1 ${isSuccess ? "text-success-foreground/80" : "text-error-foreground/80"}`}>
            {isSuccess
              ? `${"Delays\u053F\u0561\u0580\u0578\u0572 \u0565\u0584 \u0574\u0576\u0561\u056C \u0561\u057C\u0561\u057E\u0565\u056C\u0561\u0563\u0578\u0582\u0575\u0576\u0568 "}${result.maxDays}${" \u0585\u0580\u0589"}`
              : "Delays\u054E\u0565\u0580\u057B\u056B\u0576 180 \u0585\u0580\u057E\u0561 \u0574\u0565\u057B \u0561\u0580\u0564\u0565\u0576 \u0585\u0563\u057F\u0561\u0563\u0578\u0580\u056E\u0565\u056C \u0565\u0584 \u0561\u057F\u0561\u0574\u0561\u0576 \u0585\u0580\u0565\u0580 \u0576\u0578\u0580 stay-\u056B \u0570\u0561\u0574\u0561\u0580\u0589"
            }
          </p>
        </div>
      </div>

      {isSuccess ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-2xl bg-card/70 border border-border/40 p-4 text-center">
            <div className="text-2xl font-extrabold text-foreground">{result.maxDays}</div>
            <div className="text-xs text-muted-foreground mt-1">{"Delays\u0540\u0576\u0561\u0580\u0561\u057E\u0578\u0580 \u0585\u0580\u0565\u0580"}</div>
          </div>
          <div className="rounded-2xl bg-card/70 border border-border/40 p-4 text-center">
            <div className="text-2xl font-extrabold text-foreground">
              {result.lastAllowedDate && formatDateStr(result.lastAllowedDate)}
            </div>
            <div className="text-xs text-muted-foreground mt-1">{"Delays\u054E\u0565\u0580\u057B\u056B\u0576 \u0585\u0580\u0568"}</div>
          </div>
          <div className="rounded-2xl bg-card/70 border border-border/40 p-4 text-center">
            <div className="text-2xl font-extrabold text-foreground">{result.usedOnLastAllowed}/90</div>
            <div className="text-xs text-muted-foreground mt-1">{"Delays\u0555\u0563\u057F\u0561\u0563\u0578\u0580\u056E\u057E\u0561\u056E"}</div>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl bg-card/70 border border-border/40 p-4 text-center">
          <div className="text-2xl font-extrabold text-foreground">{result.usedBefore}/90</div>
          <div className="text-xs text-muted-foreground mt-1">{"Delays\u0531\u0580\u0564\u0565\u0576 \u0585\u0563\u057F\u0561\u0563\u0578\u0580\u056E\u057E\u0561\u056E \u0585\u0580\u0565\u0580"}</div>
        </div>
      )}
    </div>
  );
};

export default ResultCard;
