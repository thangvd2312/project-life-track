import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const macroData = [
  {
    name: "Carbohydrate",
    value: 54.5,
    status: "Insufficient",
    range: "55% ~ 65%",
    color: "#3B82F6", // xanh dương
  },
  {
    name: "Protein",
    value: 9.4,
    status: "Appropriate",
    range: "7% ~ 20%",
    color: "#10B981", // xanh lá
  },
  {
    name: "Fat",
    value: 37.4,
    status: "Excessive",
    range: "15% ~ 30%",
    color: "#EF4444", // đỏ
  },
  {
    name: "Saturated Fat",
    value: 19.9,
    status: "Excessive",
    range: "≤ 7%",
    color: "#EF4444",
  },
  {
    name: "Trans Fat",
    value: 0.0,
    status: "Appropriate",
    range: "≤ 1%",
    color: "#10B981",
  },
  {
    name: "Total Sugar",
    value: 18.9,
    status: "Appropriate",
    range: "≤ 20%",
    color: "#10B981",
  },
  {
    name: "Cholesterol",
    value: 19.4,
    unit: "mg",
    status: "Appropriate",
    range: "≤ 300mg",
    color: "#10B981",
  },
];

const AMDR = () => {
  return (
    <Card className="p-6">
      <h2>AMDR (Acceptable Macronutrient Distribution Range)</h2>
      <Separator className="bg-theme-gray-300" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {macroData.map((item, index) => {
          const data = [
            { name: "value", value: item.value },
            { name: "empty", value: 100 - item.value },
          ];
          return (
            <div key={index} className="flex flex-col items-center space-y-2">
              {/* Donut Chart */}
              <div className="w-32 h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={60}
                      startAngle={90}
                      endAngle={-270}
                      paddingAngle={0}
                    >
                      <Cell fill={item.color} />
                      <Cell fill="#E5E7EB" />
                    </Pie>
                    <text
                      x="50%"
                      y="50%"
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="text-2xl font-bold fill-foreground"
                    >
                      {item.value.toFixed(1)}%
                    </text>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Label + Status */}
              <div className="text-center space-y-1">
                <h4 className="font-semibold text-sm">{item.name}</h4>
                <p
                  className={`text-xs font-medium ${
                    item.status === "Insufficient"
                      ? "text-blue-600"
                      : item.status === "Appropriate"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {item.status}
                </p>
                <p className="text-xs text-muted-foreground">({item.range})</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default AMDR;
