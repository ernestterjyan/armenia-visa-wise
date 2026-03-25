import { useSchengenCalculator } from "@/hooks/useSchengenCalculator";
import HeroSection from "@/components/HeroSection";
import TripInputSection from "@/components/TripInputSection";
import VisualSummary from "@/components/VisualSummary";
import ResultCard from "@/components/ResultCard";
import AppGuide from "@/components/AppGuide";
import PlanningInsights from "@/components/PlanningInsights";

const Index = () => {
  const {
    trips, plannedEntry, setPlannedEntry,
    addTrip, removeTrip, clearAllTrips,
    dashboard, result, calculate, timelineData,
    comparisonOptions, availabilityOptions,
  } = useSchengenCalculator();

  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <HeroSection
          dashboard={dashboard}
          plannedEntry={plannedEntry}
        />

        <div className="mt-6">
          <ResultCard
            result={result}
            dashboard={dashboard}
            hasPlannedDate={!!plannedEntry}
          />
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)]">
          <div className="space-y-6">
            <TripInputSection
              trips={trips}
              onAddTrip={addTrip}
              onRemoveTrip={removeTrip}
              onClearAll={clearAllTrips}
              plannedEntry={plannedEntry}
              onPlannedEntryChange={setPlannedEntry}
              onCalculate={calculate}
            />
          </div>

          <div className="space-y-6">
            <PlanningInsights
              comparisonOptions={comparisonOptions}
              availabilityOptions={availabilityOptions}
              onSelectDate={setPlannedEntry}
            />
          </div>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
          <VisualSummary
            dashboard={dashboard}
            timelineData={timelineData}
            result={result}
          />

          <div className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <div className="border-b border-border pb-4">
              <p className="text-base font-semibold text-foreground">
                {"\u0552\u0565\u0580 \u057F\u057E\u0575\u0561\u056C\u0576\u0565\u0580\u0568"}
              </p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {"\u054F\u057E\u0575\u0561\u056C\u0576\u0565\u0580\u0568 \u057A\u0561\u0570\u057E\u0578\u0582\u0574 \u0565\u0576 \u0574\u056B\u0561\u0575\u0576 \u0561\u0575\u057D \u0562\u0580\u0561\u0578\u0582\u0566\u0565\u0580\u0578\u0582\u0574\u0589"}
              </p>
            </div>
            <div className="pt-4">
              <AppGuide />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
