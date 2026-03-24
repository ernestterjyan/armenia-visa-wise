import { useSchengenCalculator } from "@/hooks/useSchengenCalculator";
import HeroSection from "@/components/HeroSection";
import TripInputSection from "@/components/TripInputSection";
import VisualSummary from "@/components/VisualSummary";

const Index = () => {
  const {
    trips, plannedEntry, setPlannedEntry,
    addTrip, removeTrip, clearAllTrips,
    dashboard, result, calculate, timelineData,
  } = useSchengenCalculator();

  return (
    <div className="min-h-screen px-4 py-7 max-w-[1120px] mx-auto">
      <HeroSection />
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-5 mt-5 items-start">
        <TripInputSection
          trips={trips}
          onAddTrip={addTrip}
          onRemoveTrip={removeTrip}
          onClearAll={clearAllTrips}
          plannedEntry={plannedEntry}
          onPlannedEntryChange={setPlannedEntry}
          onCalculate={calculate}
        />
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
