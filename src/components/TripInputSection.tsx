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
      setError("\u053D\u0576\u0564\u0580\u0578\u0582\u0574 \u0565\u0576\u0584 \u056C\u0580\u0561\u0581\u0576\u0565\u056C \u0565\u0580\u056F\u0578\u0582 \u0561\u0574\u057D\u0561\u0569\u056B\u057E\u0576 \u0567\u056C\u0589");
      return;
    }
    const entryDate = new Date(pastEntry + "T00:00:00");
    const exitDate = new Date(pastExit + "T00:00:00");
    if (exitDate < entryDate) {
      setError("\u0535\u056C\u0584\u056B \u0561\u0574\u057D\u0561\u0569\u056B\u057E\u0568 \u0579\u056B \u056F\u0561\u0580\u0578\u0572 \u0574\u0578\u0582\u057F\u0584\u056B \u0561\u0574\u057D\u0561\u0569\u057E\u056B\u0581 \u0577\u0578\u0582\u057F \u056C\u056B\u0576\u0565\u056C\u0589");
      return;
    }
    const err = onAddTrip(pastEntry, pastExit);
    if (err) { setError(err); return; }
    setPastEntry("");
    setPastExit("");
    setError("");
  };

  const handleClear = () => {
    if (!trips.length) return;
    if (confirm("\u054E\u057D\u057F\u0561\u055E\u0570 \u0565\u0584, \u0578\u0580 \u0578\u0582\u0566\u0578\u0582\u0574 \u0565\u0584 \u057B\u0576\u057B\u0565\u056C \u0562\u0578\u056C\u0578\u0580 \u0578\u0582\u0572\u0587\u0578\u0580\u0578\u0582\u0569\u0575\u0578\u0582\u0576\u0576\u0565\u0580\u0568\u0589")) {
      onClearAll();
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-5 md:p-6" style={{ boxShadow: "var(--shadow-card)" }}>
      <h2 className="text-xl font-bold mb-2">{"\u0544\u0578\u0582\u057F\u0584\u0561\u0575\u056B\u0576 \u057F\u057E\u0575\u0561\u056C\u0576\u0565\u0580"}</h2>
      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
        {"\u0531\u057E\u0565\u056C\u0561\u0581\u0580\u0565\u0584 \u0574\u056B\u0561\u0575\u0576 \u0561\u0575\u0576 \u0585\u0580\u0565\u0580\u0568, \u0578\u0580\u0578\u0576\u0584 \u0561\u0576\u0581\u056F\u0561\u0581\u0580\u0565\u056C \u0565\u0584 \u0570\u0565\u0576\u0581 "}
        <strong>{"\u0547\u0565\u0576\u0563\u0565\u0576\u0575\u0561\u0576 \u0563\u0578\u057F\u0578\u0582\u0574"}</strong>{"\u0589"}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="pastEntry" className="text-sm font-bold">{"\u0546\u0561\u056D\u0578\u0580\u0564 \u0574\u0578\u0582\u057F\u0584"}</label>
          <input type="date" id="pastEntry" value={pastEntry} onChange={(e) => setPastEntry(e.target.value)}
            className="w-full rounded-xl border border-input bg-card px-3.5 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/10 transition-all" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="pastExit" className="text-sm font-bold">{"\u0546\u0561\u056D\u0578\u0580\u0564 \u0565\u056C\u0584"}</label>
          <input type="date" id="pastExit" value={pastExit} onChange={(e) => setPastExit(e.target.value)}
            className="w-full rounded-xl border border-input bg-card px-3.5 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/10 transition-all" />
        </div>
      </div>

      {error && <p className="text-destructive text-sm mt-2">{error}</p>}

      <div className="flex flex-wrap gap-2.5 mt-4">
        <button onClick={handleAdd}
          className="rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 active:scale-[0.98] transition-all">
          {"\u0531\u057E\u0565\u056C\u0561\u0581\u0576\u0565\u056C \u0578\u0582\u0572\u0587\u0578\u0580\u0578\u0582\u0569\u0575\u0578\u0582\u0576"}
        </button>
        <button onClick={handleClear}
          className="rounded-xl bg-destructive px-4 py-2.5 text-sm font-bold text-destructive-foreground hover:bg-destructive/90 active:scale-[0.98] transition-all">
          {"\u054B\u0576\u057B\u0565\u056C \u0562\u0578\u056C\u0578\u0580\u0568"}
        </button>
      </div>

      {/* Trip list */}
      <div className="mt-4 flex flex-col gap-2.5">
        {trips.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-5 text-center text-muted-foreground text-sm">
            {"\u0534\u0565\u057C \u0578\u0582\u0572\u0587\u0578\u0580\u0578\u0582\u0569\u0575\u0578\u0582\u0576\u0576\u0565\u0580 \u0579\u056F\u0561\u0576\u0589"}
          </div>
        ) : (
          trips.slice().sort((a, b) => a.entry.getTime() - b.entry.getTime()).map((trip, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-border p-4" style={{ background: "var(--gradient-card-subtle)" }}>
              <div className="min-w-0 flex-1">
                <div className="font-bold text-sm">{formatDateStr(trip.entry)} → {formatDateStr(trip.exit)}</div>
                <div className="text-muted-foreground text-sm mt-1">{"\u054F\u0587\u0578\u0572\u0578\u0582\u0569\u0575\u0578\u0582\u0576\u055D"} {diffDaysInclusive(trip.entry, trip.exit)} {"\u0585\u0580"}</div>
                <span className="inline-block mt-2 rounded-full bg-accent text-accent-foreground px-2.5 py-1 text-xs font-bold">
                  {"\u0544\u056B\u0561\u057E\u0578\u0580\u057E\u0561\u056E interval"}
                </span>
              </div>
              <button onClick={() => onRemoveTrip(i)}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-destructive px-3 py-2 text-sm font-bold text-destructive-foreground hover:bg-destructive/90 transition-all sm:w-auto w-full">
                <Trash2 size={14} />
                {"\u054B\u0576\u057B\u0565\u056C"}
              </button>
            </div>
          ))
        )}
      </div>

      {/* Planned entry */}
      <h2 className="text-xl font-bold mt-6 mb-2">{"\u054A\u056C\u0561\u0576\u0561\u057E\u0578\u0580\u057E\u0561\u056E \u0574\u0578\u0582\u057F\u0584"}</h2>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="plannedEntry" className="text-sm font-bold">{"\u0538\u0576\u057F\u0580\u0565\u0584 \u0574\u0578\u0582\u057F\u0584\u056B \u0585\u0580\u0568"}</label>
        <input type="date" id="plannedEntry" value={plannedEntry} onChange={(e) => onPlannedEntryChange(e.target.value)}
          className="w-full rounded-xl border border-input bg-card px-3.5 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/10 transition-all" />
      </div>

      <div className="mt-4">
        <button onClick={onCalculate}
          className="w-full sm:w-auto rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90 active:scale-[0.98] transition-all">
          {"\u0540\u0561\u0577\u057E\u0565\u056C \u0570\u0576\u0561\u0580\u0561\u057E\u0578\u0580 \u0585\u0580\u0565\u0580\u0568"}
        </button>
      </div>

      <div className="mt-4 rounded-2xl border border-accent bg-accent/50 p-4 text-sm text-accent-foreground leading-relaxed">
        <strong>{"\u0546\u0577\u0578\u0582\u0574."}</strong> {"\u0531\u0575\u057D \u0563\u0578\u0580\u056E\u056B\u0584\u0568 \u0570\u0561\u0577\u057E\u0561\u0580\u056F\u0561\u0575\u056B\u0576 \u0585\u0563\u0576\u0578\u0582\u0569\u0575\u0578\u0582\u0576 \u0567\u0589 \u053F\u0561\u0580\u0587\u0578\u0580 \u0578\u0580\u0578\u0577\u0578\u0582\u0574\u0576\u0565\u0580\u056B \u0564\u0565\u057A\u0584\u0578\u0582\u0574 \u057E\u0565\u0580\u057B\u0576\u0561\u056F\u0561\u0576 \u057D\u057F\u0578\u0582\u0563\u0578\u0582\u0574\u0568 \u056C\u0561\u057E \u0567 \u0561\u0576\u0565\u056C \u0576\u0561\u0587 \u057A\u0561\u0577\u057F\u0578\u0576\u0561\u056F\u0561\u0576 \u0561\u0572\u0562\u0575\u0578\u0582\u0580\u0578\u057E\u0589"}
      </div>
    </div>
  );
};

export default TripInputSection;
