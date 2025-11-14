import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProgressBar from "@/components/chart/ProgressBar";
import { Separator } from "@/components/ui/separator";

const value = 0;
const unit = "kg/m²";

const FastingBloodGlucose = () => {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center">
        <h2>Fasting Blood Glucose (FBG)</h2>
        <Badge
          variant="secondary"
          className="bg-amber-100 text-theme-orange-100"
        >
          Pre-obesity
        </Badge>
      </div>
      <Separator className="bg-theme-gray-300" />
      <div className="relative h-12">
        {value > 0 ? (
          <ProgressBar
            value={value}
            txtColor="text-theme-orange-200"
            bgColor="bg-theme-orange-200"
            unit={unit}
            max={50}
          />
        ) : (
          <div>
            <p className="text-sm text-theme-gray-100 font-normal">
              No data recorded
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default FastingBloodGlucose;
