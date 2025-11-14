import BiomarkersAnalysis from "@/pages/UserDetail/BiomarkersAnalysis";
import DietaryAnalysis from "@/pages/UserDetail/DietaryAnalysis";

const DailyTab = () => {
  return (
    <div className="space-y-6">
      <BiomarkersAnalysis />
      <DietaryAnalysis />
    </div>
  );
};

export default DailyTab;
