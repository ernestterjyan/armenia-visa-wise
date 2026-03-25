import { useState } from "react";
import { Trip, formatDateStr, diffDaysInclusive } from "@/hooks/useSchengenCalculator";
import { Trash2 } from "lucide-react";

interface Props {
  trips: Trip[];
  onAddTrip: (entry: string, exit: string) => string | null;
  onRemoveTrip: (index: number) => void;
  onClearAll: () => void;
  plannedEntry: string;
  onPlannedEntryChange: (v: string) => void;
  onCalculate: () => void;
}

const TripInputSection = ({ trips, onAddTrip, onRemoveTrip, onClearAll, plannedEntry, onPlannedEntryChange, onCalculate }: Props) => {
  const [pastEntry, setPastEntry] = useState("");
  const [pastExit, setPastExit] = useState("");
  const [error, setError] = useState("");

  const handleAdd = () => {
    if (!pastEntry || !pastExit) {
      setError("\u053D\u0576\u0564\u0580\u0578\u0582\u0574 \u0565\u0576\u0584 \u056C\u0580\u0561\u0581\u0576\u0565\u056C \u0565\u0580\u056F\u0578\u0582 \u0561\u0574\u057D\u0561\u0569\u056B\u057E\u0568\u0589");
      return;
    }
    const entryDate = new Date(pastEntry + "T00:00:00");
    const exitDate = new Date(pastExit + "T00:00:00");
    if (exitDate < entryDate) {
      setError("\u0535\u056C\u0584\u056B \u0561\u0574\u057D\u0561\u0569\u056B\u057E\u0568 \u0579\u056B \u056F\u0561\u0580\u0578\u0572 \u0574\u0578\u0582\u057F\u0584\u056B\u0581 \u0577\u0578\u0582\u057F \u056C\u056B\u0576\u0565\u056C\u0589");
      return;
    }
    const err = onAddTrip(pastEntry, pastExit);
    if (err) { setError(err); return; }
    setPastEntry("");
    setPastExit("");
    setError("");
  };

  const sortedTrips = trips.slice().sort((a, b) => a.entry.getTime() - b.entry.getTime());
  const fieldClassName = "mt-2 w-full rounded-lg border border-input bg-background px-3 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/15";
  const secondaryButtonClassName = "inline-flex items-center justify-center rounded-lg border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary";
  const primaryButtonClassName = "inline-flex items-center justify-center rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90";

  return (
    <section className="overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)]">
      <div className="border-b border-border px-6 py-5">
        <h2 className="text-lg font-semibold text-foreground">
          {"\u054F\u057E\u0575\u0561\u056C\u0576\u0565\u0580"}
        </h2>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          {"\u054D\u056F\u057D\u0565\u0584 \u057A\u056C\u0561\u0576\u0561\u057E\u0578\u0580\u057E\u0561\u056E \u0574\u0578\u0582\u057F\u0584\u056B \u0585\u0580\u0568 \u0576\u0577\u0565\u056C\u0578\u0582\u0581, \u0570\u0565\u057F\u0578 \u0561\u057E\u0565\u056C\u0561\u0581\u0580\u0565\u0584 \u0562\u0578\u056C\u0578\u0580 \u0576\u0561\u056D\u0578\u0580\u0564 \u0578\u0582\u0572\u0587\u0578\u0580\u0578\u0582\u0569\u0575\u0578\u0582\u0576\u0576\u0565\u0580\u0568\u0589"}
        </p>
      </div>

      <div className="px-6 py-5">
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto_auto] md:items-end">
          <div>
            <label className="text-sm font-medium text-foreground">
              {"\u054A\u056C\u0561\u0576\u0561\u057E\u0578\u0580\u057E\u0561\u056E \u0574\u0578\u0582\u057F\u0584\u056B \u0585\u0580\u0568"}
            </label>
            <input
              type="date"
              value={plannedEntry}
              onChange={(e) => onPlannedEntryChange(e.target.value)}
              className={fieldClassName}
            />
          </div>

          <button
            type="button"
            onClick={() => onPlannedEntryChange(formatDateStr(new Date()))}
            className={secondaryButtonClassName}
          >
            {"\u0531\u0575\u057D\u0585\u0580"}
          </button>

          <button onClick={onCalculate} className={primaryButtonClassName}>
            {"\u0540\u0561\u0577\u057E\u0565\u056C"}
          </button>
        </div>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {"\u0540\u0561\u0577\u057E\u0561\u0580\u056F\u0568 \u0561\u057E\u057F\u0578\u0574\u0561\u057F \u0569\u0561\u0580\u0574\u0561\u0581\u057E\u0578\u0582\u0574 \u0567 \u0561\u0574\u0565\u0576 \u0583\u0578\u0583\u0578\u056D\u0578\u0582\u0569\u0575\u0578\u0582\u0576\u056B\u0581 \u0570\u0565\u057F\u0578\u0589"}
        </p>
      </div>

      <div className="border-t border-border px-6 py-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h3 className="text-base font-semibold text-foreground">
              {"\u0531\u057E\u0565\u056C\u0561\u0581\u0580\u0565\u0584 \u0576\u0561\u056D\u0578\u0580\u0564 \u0578\u0582\u0572\u0587\u0578\u0580\u0578\u0582\u0569\u0575\u0578\u0582\u0576"}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {"\u0544\u0578\u0582\u057F\u0584\u056B \u0587 \u0565\u056C\u0584\u056B \u0585\u0580\u0565\u0580\u0568 \u0576\u0577\u0565\u0584 \u0561\u057C\u0561\u0576\u0571\u056B\u0576 \u0563\u0580\u0561\u0576\u0581\u0578\u0582\u0574\u0578\u057E\u0589"}
            </p>
          </div>
          {trips.length > 0 && (
            <button
              onClick={() => {
                if (confirm("\u054E\u057D\u057F\u0561\u055E\u0570 \u0565\u0584, \u0578\u0580 \u0578\u0582\u0566\u0578\u0582\u0574 \u0565\u0584 \u057B\u0576\u057B\u0565\u056C \u0562\u0578\u056C\u0578\u0580\u0568\u0589")) onClearAll();
              }}
              className="text-sm text-muted-foreground transition-colors hover:text-destructive"
            >
              {"\u054B\u0576\u057B\u0565\u056C \u0562\u0578\u056C\u0578\u0580\u0568"}
            </button>
          )}
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] md:items-end">
          <div>
            <label className="text-sm font-medium text-foreground">{"\u0544\u0578\u0582\u057F\u0584"}</label>
            <input
              type="date"
              value={pastEntry}
              onChange={(e) => setPastEntry(e.target.value)}
              className={fieldClassName}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">{"\u0535\u056C\u0584"}</label>
            <input
              type="date"
              value={pastExit}
              onChange={(e) => setPastExit(e.target.value)}
              className={fieldClassName}
            />
          </div>
          <button onClick={handleAdd} className={primaryButtonClassName}>
            {"\u0531\u057E\u0565\u056C\u0561\u0581\u0576\u0565\u056C"}
          </button>
        </div>

        {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
      </div>

      <div className="border-t border-border px-6 py-5">
        <h3 className="text-base font-semibold text-foreground">
          {"\u0533\u0580\u0561\u0576\u0581\u057E\u0561\u056E \u0578\u0582\u0572\u0587\u0578\u0580\u0578\u0582\u0569\u0575\u0578\u0582\u0576\u0576\u0565\u0580"}
        </h3>

        {sortedTrips.length > 0 ? (
          <div className="mt-4 overflow-hidden rounded-lg border border-border">
            {sortedTrips.map((trip, i) => (
              <div
                key={i}
                className="grid gap-3 border-b border-border bg-background px-4 py-4 last:border-b-0 sm:grid-cols-[minmax(0,1fr)_auto]"
              >
                <div>
                  <div className="text-sm font-medium text-foreground">
                    {formatDateStr(trip.entry)} → {formatDateStr(trip.exit)}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {diffDaysInclusive(trip.entry, trip.exit)} {"\u0585\u0580"}
                  </div>
                </div>
                <button
                  onClick={() => onRemoveTrip(i)}
                  className="inline-flex items-center justify-center rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-destructive/40 hover:text-destructive"
                  aria-label="Ջնջել ուղևորությունը"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-lg border border-dashed border-border bg-background px-4 py-5 text-sm text-muted-foreground">
            {"\u0531\u057C\u0561\u0575\u056A\u0574 \u0578\u0582\u0572\u0587\u0578\u0580\u0578\u0582\u0569\u0575\u0578\u0582\u0576 \u0579\u056F\u0561\u0589"}
          </div>
        )}
      </div>

      <div className="border-t border-border bg-muted/35 px-6 py-4">
        <p className="text-sm leading-6 text-muted-foreground">
          {"\u0533\u0580\u0561\u0576\u0581\u0565\u0584 \u0562\u0578\u056C\u0578\u0580 \u0574\u0578\u0582\u057F\u0584/\u0565\u056C\u0584 \u0566\u0578\u0582\u0575\u0563\u0565\u0580\u0568, \u0576\u0578\u0582\u0575\u0576\u056B\u057D\u056F \u0565\u0569\u0565 \u0574\u056B \u0584\u0561\u0576\u056B \u0561\u0576\u0563\u0561\u0574 \u0565\u0584 \u0574\u0578\u0582\u057F\u0584 \u0563\u0578\u0580\u056E\u0565\u056C \u0576\u0578\u0582\u0575\u0576 \u0561\u0574\u057D\u057E\u0561 \u0568\u0576\u0569\u0561\u0581\u0584\u0578\u0582\u0574\u0589"}
        </p>
      </div>
    </section>
  );
};

export default TripInputSection;
