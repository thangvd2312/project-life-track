import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import BloodPressure from "@/pages/UserDetail/BiomarkersAnalysis/BloodPressure";
import FastingBloodGlucose from "@/pages/UserDetail/BiomarkersAnalysis/FastingBloodGlucose";
import PostprandialBloodGlucose from "@/pages/UserDetail/BiomarkersAnalysis/PostprandialBloodGlucose";
import BodyMassIndex from "@/pages/UserDetail/BiomarkersAnalysis/BodyMassIndex";
import HeartRate from "@/pages/UserDetail/BiomarkersAnalysis/HeartRate";
import SleepDuration from "@/pages/UserDetail/BiomarkersAnalysis/SleepDuration";

const BiomarkersAnalysis = () => {
  return (
    <Card className="p-6 border-none">
      <h2 className="text-xl">Biomarkers Analysis</h2>
      <Separator className="bg-theme-gray-300" />

      {/* Not common TODO: later */}
      <BloodPressure />
      <FastingBloodGlucose />
      <PostprandialBloodGlucose />
      <BodyMassIndex />
      <HeartRate />
      <SleepDuration />
    </Card>
  );
};

export default BiomarkersAnalysis;
