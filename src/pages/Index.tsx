import { useSchengenCalculator } from "@/hooks/useSchengenCalculator";
import HeroSection from "@/components/HeroSection";
import TripInputSection from "@/components/TripInputSection";
import VisualSummary from "@/components/VisualSummary";
import ResultCard from "@/components/ResultCard";

const Index = () => {
  const {
    trips, plannedEntry, setPlannedEntry,
    addTrip, removeTrip, clearAllTrips,
    dashboard, result, calculate, timelineData,
  } = useSchengenCalculator();

  return (
    <div className="min-h-screen px-4 py-6 md:py-10 max-w-2xl mx-auto">
      <HeroSection />

      {/* Main result card - the hero answer */}
      <div className="mt-8">
        <ResultCard
          result={result}
          dashboard={dashboard}
          hasPlannedDate={!!plannedEntry}
        />
      </div>

      {/* Input section */}
      <div className="mt-6">
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

      {/* Visual summary - gauge + timeline */}
      <div className="mt-6">
        <VisualSummary
          dashboard={dashboard}
          timelineData={timelineData}
          result={result}
        />
      </div>
    </div>
  );
};

export default Index;
