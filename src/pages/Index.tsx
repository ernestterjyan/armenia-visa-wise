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
    <div className="min-h-screen px-4 py-4 md:py-8 max-w-xl mx-auto">
      <HeroSection />

      {/* THE answer — always visible, always dominant */}
      <div className="mt-5">
        <ResultCard
          result={result}
          dashboard={dashboard}
          hasPlannedDate={!!plannedEntry}
        />
      </div>

      {/* Input */}
      <div className="mt-5">
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

      {/* Visual: gauge + timeline */}
      <div className="mt-5">
        <VisualSummary
          dashboard={dashboard}
          timelineData={timelineData}
          result={result}
        />
      </div>

      <div className="mt-5 pb-6">
        <AppGuide />
      </div>
    </div>
  );
};

export default Index;
