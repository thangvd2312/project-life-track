import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Energy from "@/pages/UserDetail/DietaryAnalysis/Energy";
import AMDR from "@/pages/UserDetail/DietaryAnalysis/AMDR";

const DietaryAnalysis = () => {
  return (
    <Card className="p-6 border-none">
      <h2 className="text-xl">Dietary Analysis</h2>
      <Separator className="bg-theme-gray-300" />
      <Energy />
      <AMDR />
    </Card>
  );
};

export default DietaryAnalysis;
