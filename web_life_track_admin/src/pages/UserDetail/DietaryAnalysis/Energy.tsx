import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const intake = 4049;
const eer = 2726;
const difference = ((intake - eer) / eer) * 100;

const data = [
  { name: "intake", value: intake, color: "#3B82F6" },
  { name: "excess", value: intake - eer, color: "#EF4444" },
];

const Energy = () => {
  return (
    <Card className="p-6">
      <h2>Energy (Kcal)</h2>
      <Separator className="bg-theme-gray-300" />
      <div className="flex flex-col items-center space-y-6">
        <div className="relative w-full max-w-xs" style={{ height: "240px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                startAngle={90}
                endAngle={-270}
                paddingAngle={0}
              >
                <Cell fill="#3B82F6" />
                <Cell fill="#EF4444" />
              </Pie>

              <foreignObject x="0" y="0" width="100%" height="100%">
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="text-4xl font-bold text-foreground">4049</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Kcal intake
                  </div>
                </div>
              </foreignObject>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Estimated Energy Requirement (EER):{" "}
            <span className="font-semibold">{eer} Kcal</span>
          </p>
          <Badge variant="destructive" className="bg-red-100 text-red-700">
            Attention Required ({difference.toFixed(1)}% difference)
          </Badge>
        </div>
      </div>
    </Card>
  );
};

export default Energy;
