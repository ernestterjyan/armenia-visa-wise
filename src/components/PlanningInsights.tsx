import { ArrowRight, CalendarClock } from "lucide-react";
import { formatDateStr, type AvailabilityOption, type ComparisonOption } from "@/hooks/useSchengenCalculator";

interface Props {
  comparisonOptions: ComparisonOption[];
  availabilityOptions: AvailabilityOption[];
  onSelectDate: (value: string) => void;
}

const PlanningInsights = ({ comparisonOptions, availabilityOptions, onSelectDate }: Props) => {
  const hasData = comparisonOptions.length > 0 || availabilityOptions.length > 0;

  if (!hasData) {
    return null;
  }

  return (
    <section className="overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)]">
      <div className="border-b border-border px-6 py-5">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarClock size={16} className="text-primary" />
          <span>{"\u054A\u056C\u0561\u0576\u0561\u057E\u0578\u0580\u0574\u0561\u0576 \u0585\u0563\u0576\u0561\u056F"}</span>
        </div>
        <h2 className="mt-2 text-lg font-semibold text-foreground">
          {"\u0548\u0582\u0582\u0580 \u0570\u0565\u057F\u0578 \u0574\u0578\u0582\u057F\u0584 \u0561\u057E\u0565\u056C\u056B \u0577\u0561\u0570\u0561\u057E\u0565\u057F \u0567"}
        </h2>
      </div>

      <div className="border-b border-border px-6 py-5">
        <h3 className="text-base font-semibold text-foreground">
          {"\u0540\u0561\u057B\u0578\u0580\u0564 \u0569\u0578\u0582\u0575\u056C\u0561\u057F\u0580\u0565\u056C\u056B \u0574\u0578\u0582\u057F\u0584"}
        </h3>
        <div className="mt-4 space-y-3">
          {availabilityOptions.map((option) => (
            <div key={option.minimumStay} className="rounded-lg border border-border bg-secondary px-4 py-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {option.minimumStay} {"\u0585\u0580 \u0574\u0576\u0561\u056C\u0578\u0582 \u0570\u0561\u0574\u0561\u0580"}
                  </p>
                  <p className="mt-1 font-mono text-base font-semibold text-foreground">
                    {option.date ? formatDateStr(option.date) : "\u0549\u056F\u0561"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    {option.waitDays === 0
                      ? "\u053F\u0561\u0580\u0578\u0572 \u0565\u0584 \u0570\u056B\u0574\u0561"
                      : option.waitDays !== null
                        ? `${option.waitDays} \u0585\u0580 \u0570\u0565\u057F\u0578`
                        : "\u0549\u056B \u0570\u0561\u0575\u057F\u0576\u0561\u0562\u0565\u0580\u057E\u0565\u056C"}
                  </p>
                  {option.date && (
                    <button
                      type="button"
                      onClick={() => onSelectDate(formatDateStr(option.date!))}
                      className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                    >
                      <span>{"\u0555\u0563\u057F\u057E\u0565\u056C"}</span>
                      <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 py-5">
        <h3 className="text-base font-semibold text-foreground">
          {"\u0544\u0578\u0582\u057F\u0584\u056B \u0570\u0561\u0574\u0565\u0574\u0561\u057F\u0578\u0582\u0574"}
        </h3>
        <div className="mt-4 overflow-hidden rounded-lg border border-border">
          {comparisonOptions.map((option) => (
            <div
              key={option.label}
              className="grid gap-3 border-b border-border bg-background px-4 py-4 last:border-b-0 sm:grid-cols-[minmax(0,1fr)_120px_100px_auto]"
            >
              <div>
                <p className="text-sm font-medium text-foreground">{option.label}</p>
                <p className="mt-1 font-mono text-sm text-muted-foreground">{formatDateStr(option.date)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{"\u0544\u0561\u0584\u057D"}</p>
                <p className="mt-1 font-mono text-base font-semibold text-foreground">
                  {option.result.maxDays} {"\u0585\u0580"}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{"\u054E\u056B\u0573\u0561\u056F"}</p>
                <p className={`mt-1 text-sm font-medium ${option.result.type === "success" ? "text-accent" : "text-destructive"}`}>
                  {option.result.type === "success" ? "\u053F\u0561\u0580\u0578\u0572 \u0567" : "\u0549\u056B \u0569\u0578\u0582\u0575\u056C\u0561\u057F\u0580\u057E\u0578\u0582\u0574"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onSelectDate(formatDateStr(option.date))}
                className="inline-flex items-center justify-center rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                {"\u0538\u0576\u057F\u0580\u0565\u056C"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlanningInsights;
