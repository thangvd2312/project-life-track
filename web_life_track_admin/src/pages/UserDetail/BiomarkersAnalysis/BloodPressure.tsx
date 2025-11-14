import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
  Cell,
} from "recharts";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const bloodPressureData = [
  { systolic: 128, diastolic: 82, status: "Pre-hypertension" },
];

const bpZones = [
  { x1: 0, x2: 90, y1: 0, y2: 200, color: "#BFDBFE", label: "Blue" },
  { x1: 90, x2: 120, y1: 0, y2: 80, color: "#ebfdf2", label: "Green" },
  { x1: 120, x2: 130, y1: 0, y2: 80, color: "#fff7dc", label: "Yellow_1" },
  { x1: 130, x2: 140, y1: 0, y2: 80, color: "#ffedcb", label: "Yellow_2" },
  { x1: 90, x2: 140, y1: 80, y2: 90, color: "#e9c581", label: "Yellow_2" },
  { x1: 90, x2: 140, y1: 90, y2: 100, color: "#fae3e5", label: "Pink_1" },
  { x1: 140, x2: 160, y1: 0, y2: 100, color: "#f1d3d6", label: "Pink_2" },
  { x1: 160, x2: 200, y1: 0, y2: 100, color: "#f9cdc9", label: "Pink_3" },
  { x1: 90, x2: 160, y1: 100, y2: 200, color: "#f9cdc9", label: "Pink_4" },
  { x1: 160, x2: 200, y1: 100, y2: 200, color: "#f7beb8", label: "Pink_5" },
];

const BloodPressure = () => {
  return (
    <Card className="p-6">
      <h2>Blood Pressure</h2>
      <Separator className="bg-theme-gray-300" />
      <div className="space-y-6">
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 60, left: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

            {bpZones.map((zone, i) => (
              <ReferenceArea
                key={i}
                x1={zone.x1}
                x2={zone.x2}
                y1={zone.y1}
                y2={zone.y2}
                fill={zone.color}
                fillOpacity={1}
                stroke="none"
              />
            ))}

            <XAxis
              type="number"
              dataKey="systolic"
              domain={[0, 200]}
              label={{
                value: "Systolic (mmHg)",
                position: "insideBottom",
                offset: -10,
              }}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              type="number"
              dataKey="diastolic"
              domain={[0, 200]}
              label={{
                value: "Diastolic (mmHg)",
                angle: -90,
                position: "insideLeft",
              }}
              tick={{ fontSize: 12 }}
            />

            <Scatter data={bloodPressureData} fill="#1E40AF">
              {bloodPressureData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="#1E40AF" r={8} />
              ))}
            </Scatter>

            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload[0]) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-2 border rounded shadow-sm text-sm">
                      <p className="font-semibold">{data.status}</p>
                      <p>
                        ({data.systolic}, {data.diastolic})
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
          </ScatterChart>
        </ResponsiveContainer>

        <div className="flex justify-center gap-12 text-sm font-medium">
          <div className="text-center">
            <span className="text-[11px] block">Systolic</span>
            <span className="text-lg font-bold">
              128 <span className="font-thin text-sm">mmHg</span>
            </span>
          </div>
          <div className="text-center">
            <span className="block text-[11px] ">Diastolic</span>
            <span className="text-lg font-bold">
              82 <span className="font-thin text-sm">mmHg</span>
            </span>
          </div>
          <div className="text-center flex flex-col justify-between">
            <span className="block text-[11px] ">Status</span>
            <span className="text-md text-blue-600">Pre-hypertension</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BloodPressure;
