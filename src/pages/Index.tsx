import { useSchengenCalculator } from "@/hooks/useSchengenCalculator";
import HeroSection from "@/components/HeroSection";
import TripInputSection from "@/components/TripInputSection";
import VisualSummary from "@/components/VisualSummary";
import ResultCard from "@/components/ResultCard";
import AppGuide from "@/components/AppGuide";

const Index = () => {
  const {
    trips, plannedEntry, setPlannedEntry,
    addTrip, removeTrip, clearAllTrips,
    dashboard, result, calculate, timelineData,
  } = useSchengenCalculator();

  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <HeroSection />

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.95fr)]">
          <div className="space-y-6">
            <ResultCard
              result={result}
              dashboard={dashboard}
              hasPlannedDate={!!plannedEntry}
            />

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
            <VisualSummary
              dashboard={dashboard}
              timelineData={timelineData}
              result={result}
            />

            <AppGuide />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
