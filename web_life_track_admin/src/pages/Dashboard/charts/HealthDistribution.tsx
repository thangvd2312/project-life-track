import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { range: "< 100", count: 45, category: "정상" },
  { range: "100-125", count: 78, category: "정상" },
  { range: "126-140", count: 52, category: "주의" },
  { range: "141-160", count: 28, category: "주의" },
  { range: "161-180", count: 15, category: "위험" },
  { range: "> 180", count: 8, category: "위험" },
];

const HealthDistribution = () => {
  const getBarColor = (category: string) => {
    switch (category) {
      case "정상":
        return "#34C759";
      case "주의":
        return "#FF9500";
      case "위험":
        return "#FF3B30";
      default:
        return "#007AFF";
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-theme-200">
      <h3 className="mb-4 text-xl text-theme-black-100">건강 지표 분포도</h3>
      <p className="mb-4 text-sm text-theme-gray-100">공복 혈당 (mg/dL)</p>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F2F2F7" />
          <XAxis
            dataKey="range"
            tick={{ fontSize: 11, fill: "#8A8A8E" }}
            stroke="#F2F2F7"
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#8A8A8E" }}
            stroke="#F2F2F7"
            label={{
              value: "이용자 수",
              angle: -90,
              position: "insideLeft",
              style: { fontSize: 12, fill: "#8A8A8E" },
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #F2F2F7",
              borderRadius: "8px",
              fontSize: "12px",
            }}
            formatter={(value: any, name: string, props: any) => {
              return [`${value}명`, `${props.payload.category}`];
            }}
          />
          <Bar
            dataKey="count"
            fill="#007AFF"
            radius={[4, 4, 0, 0]}
            shape={(props: any) => {
              const { x, y, width, height, payload } = props;
              const fill = getBarColor(payload.category);
              return (
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  fill={fill}
                  rx={4}
                />
              );
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HealthDistribution;
