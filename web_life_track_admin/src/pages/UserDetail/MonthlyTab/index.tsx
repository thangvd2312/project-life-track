import BiomarkersAnalysis from "@/pages/UserDetail/BiomarkersAnalysis";
import DietaryAnalysis from "@/pages/UserDetail/DietaryAnalysis";
import BiomarkerTrends from "@/pages/UserDetail/MonthlyTab/BiomarkerTrends";

const MonthlyTab = () => {
  return (
    <div className="space-y-6">
      <BiomarkerTrends />
      <BiomarkersAnalysis />
      <DietaryAnalysis />
    </div>
  );
};

export default MonthlyTab;
