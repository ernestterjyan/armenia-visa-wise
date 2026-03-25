import { useState } from "react";
import { Trip, formatDateStr, diffDaysInclusive } from "@/hooks/useSchengenCalculator";
import { Plus, Trash2, Plane, Info } from "lucide-react";

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
  const [showForm, setShowForm] = useState(false);

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
    setShowForm(false);
  };

  const sortedTrips = trips.slice().sort((a, b) => a.entry.getTime() - b.entry.getTime());

  return (
    <div className="space-y-6">
      {/* Planned entry date */}
      <div className="rounded-3xl bg-card border border-border p-6 md:p-8" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center">
            <Plane size={18} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">{"\u054A\u056C\u0561\u0576\u0561\u057E\u0578\u0580\u057E\u0561\u056E \u0574\u0578\u0582\u057F\u0584\u056B \u0585\u0580\u0568"}</h2>
            <p className="text-xs text-muted-foreground">{"\u0535\u0580\u0562 \u0565\u0584 \u0576\u0561\u056D\u0561\u057F\u0565\u057D\u0578\u0582\u0574 \u0574\u0578\u0582\u057F\u0584 \u0563\u0578\u0580\u056E\u0565\u056C"}</p>
          </div>
        </div>
        <input
          type="date"
          value={plannedEntry}
          onChange={(e) => onPlannedEntryChange(e.target.value)}
          className="w-full rounded-2xl border border-input bg-background px-4 py-3.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/10 transition-all"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
          <button
            onClick={onCalculate}
            className="rounded-2xl px-5 py-3.5 text-sm font-bold text-primary-foreground transition-all active:scale-[0.98]"
            style={{ background: "var(--gradient-hero)", boxShadow: "var(--shadow-soft)" }}
          >
            {"\u054E\u0565\u0580\u0561\u0570\u0561\u0577\u057E\u0561\u0580\u056F\u0565\u056C"}
          </button>
          <button
            type="button"
            onClick={() => onPlannedEntryChange(formatDateStr(new Date()))}
            className="rounded-2xl border border-border px-5 py-3.5 text-sm font-semibold text-foreground hover:bg-muted transition-all"
          >
            {"\u0534\u0576\u0565\u056C \u0561\u0575\u057D\u0585\u0580\u057E\u0561 \u0585\u0580\u0568"}
          </button>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {"\u0540\u0561\u0577\u057E\u0561\u0580\u056F\u0568 \u0569\u0561\u0580\u0574\u0561\u0581\u057E\u0578\u0582\u0574 \u0567 \u0561\u057E\u057F\u0578\u0574\u0561\u057F \u0581\u0561\u0576\u056F\u0561\u0581\u0561\u056E \u0583\u0578\u0583\u0578\u056D\u0578\u0582\u0569\u0575\u0578\u0582\u0576\u056B\u0581 \u0570\u0565\u057F\u0578\u0589"}
        </p>
      </div>

      {/* Past trips */}
      <div className="rounded-3xl bg-card border border-border p-6 md:p-8" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">{"\u0546\u0561\u056D\u0578\u0580\u0564 \u0578\u0582\u0572\u0587\u0578\u0580\u0578\u0582\u0569\u0575\u0578\u0582\u0576\u0576\u0565\u0580"}</h2>
          {trips.length > 0 && (
            <button
              onClick={() => {
                if (confirm("\u054E\u057D\u057F\u0561\u055E\u0570 \u0565\u0584, \u0578\u0580 \u0578\u0582\u0566\u0578\u0582\u0574 \u0565\u0584 \u057B\u0576\u057B\u0565\u056C \u0562\u0578\u056C\u0578\u0580\u0568\u0589")) onClearAll();
              }}
              className="text-xs text-muted-foreground hover:text-destructive transition-colors"
            >
              {"\u054B\u0576\u057B\u0565\u056C \u0562\u0578\u056C\u0578\u0580\u0568"}
            </button>
          )}
        </div>

        {sortedTrips.length > 0 && (
          <div className="space-y-2 mb-4">
            {sortedTrips.map((trip, i) => (
              <div key={i} className="flex items-center justify-between gap-3 rounded-2xl bg-muted/40 px-4 py-3 group">
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-foreground">
                    {formatDateStr(trip.entry)} → {formatDateStr(trip.exit)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {diffDaysInclusive(trip.entry, trip.exit)} {"\u0585\u0580"}
                  </div>
                </div>
                <button
                  onClick={() => onRemoveTrip(i)}
                  className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 p-2 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/8 transition-all"
                  aria-label="Ջնջել ուղևորությունը"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        )}
        {sortedTrips.length === 0 && (
          <div className="rounded-2xl bg-muted/20 border border-dashed border-border p-4 mb-4 text-center text-xs text-muted-foreground">
            {"\u0531\u057C\u0561\u0575\u056A\u0574 \u0578\u0582\u0572\u0587\u0578\u0580\u0578\u0582\u0569\u0575\u0578\u0582\u0576 \u0579\u056F\u0561\u0589 \u0531\u057E\u0565\u056C\u0561\u0581\u0580\u0565\u0584 \u0561\u057C\u0561\u057B\u056B\u0576 \u0563\u0580\u0561\u0576\u0581\u0578\u0582\u0574\u0568\u0589"}
          </div>
        )}

        {showForm ? (
          <div className="rounded-2xl border border-border bg-muted/20 p-4">
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">{"\u0544\u0578\u0582\u057F\u0584"}</label>
                <input type="date" value={pastEntry} onChange={(e) => setPastEntry(e.target.value)}
                  className="w-full rounded-xl border border-input bg-card px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/10 transition-all" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">{"\u0535\u056C\u0584"}</label>
                <input type="date" value={pastExit} onChange={(e) => setPastExit(e.target.value)}
                  className="w-full rounded-xl border border-input bg-card px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/10 transition-all" />
              </div>
            </div>
            {error && <p className="text-destructive text-xs mb-3">{error}</p>}
            <div className="flex gap-2">
              <button onClick={handleAdd}
                className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all">
                {"\u0531\u057E\u0565\u056C\u0561\u0581\u0576\u0565\u056C"}
              </button>
              <button onClick={() => { setShowForm(false); setError(""); }}
                className="rounded-xl px-4 py-2.5 text-sm text-muted-foreground hover:bg-muted transition-all">
                {"\u0549\u0565\u0572\u0561\u0580\u056F\u0565\u056C"}
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowForm(true)}
            className="w-full flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border hover:border-primary/30 py-3.5 text-sm text-muted-foreground hover:text-primary transition-all"
          >
            <Plus size={16} />
            {"\u0531\u057E\u0565\u056C\u0561\u0581\u0576\u0565\u056C \u0578\u0582\u0572\u0587\u0578\u0580\u0578\u0582\u0569\u0575\u0578\u0582\u0576"}
          </button>
        )}

        <div className="mt-4 rounded-2xl bg-muted/30 border border-border p-3.5">
          <div className="flex items-start gap-2">
            <Info size={15} className="text-primary mt-0.5 shrink-0" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              {"\u0533\u0580\u0561\u0576\u0581\u0565\u0584 \u0562\u0578\u056C\u0578\u0580 \u0574\u0578\u0582\u057F\u0584/\u0565\u056C\u0584 \u0566\u0578\u0582\u0575\u0563\u0565\u0580\u0568\u055D \u0576\u0578\u0582\u0575\u0576\u056B\u057D\u056F \u0565\u0569\u0565 \u0574\u056B \u0584\u0561\u0576\u056B \u0561\u0576\u0563\u0561\u0574 \u0574\u0578\u0582\u057F\u0584 \u0565\u0584 \u0563\u0578\u0580\u056E\u0565\u056C \u0576\u0578\u0582\u0575\u0576 \u0561\u0574\u057D\u057E\u0561 \u0568\u0576\u0569\u0561\u0581\u0584\u0578\u0582\u0574\u0589"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripInputSection;
