import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "1월", actual: 72, predicted: null },
  { month: "2월", actual: 75, predicted: null },
  { month: "3월", actual: 78, predicted: null },
  { month: "4월", actual: 74, predicted: null },
  { month: "5월", actual: 76, predicted: null },
  { month: "6월", actual: 80, predicted: 80 },
  { month: "7월", actual: null, predicted: 82 },
  { month: "8월", actual: null, predicted: 85 },
  { month: "9월", actual: null, predicted: 83 },
  { month: "10월", actual: null, predicted: 87 },
];

const HealthTrendPrediction = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-theme-200">
      <h3 className="mb-4 text-xl text-theme-black-100">건강 트렌드 예측</h3>
      <p className="mb-4 text-sm text-theme-gray-100">평균 건강 점수 추이</p>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F2F2F7" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#8A8A8E" }}
            stroke="#F2F2F7"
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#8A8A8E" }}
            stroke="#F2F2F7"
            domain={[65, 90]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #F2F2F7",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: "12px" }}
            formatter={(value) => {
              const labels: Record<string, string> = {
                actual: "Actual",
                predicted: "Predicted",
              };
              return labels[value] || value;
            }}
          />
          <Line
            type="monotone"
            dataKey="actual"
            stroke="#007AFF"
            strokeWidth={2.5}
            dot={{ r: 4 }}
            connectNulls={false}
          />
          <Line
            type="monotone"
            dataKey="predicted"
            stroke="#007AFF"
            strokeWidth={2.5}
            strokeDasharray="5 5"
            dot={{ r: 4 }}
            connectNulls={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HealthTrendPrediction;
