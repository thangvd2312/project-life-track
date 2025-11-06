import { useNavigate } from "react-router-dom";
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
import { URL } from "@/constants/url";

const data = [
  { time: "00:00", user1: 120, user2: 135, user3: 128 },
  { time: "04:00", user1: 125, user2: 138, user3: 132 },
  { time: "08:00", user1: 145, user2: 155, user3: 148 },
  { time: "12:00", user1: 138, user2: 148, user3: 142 },
  { time: "16:00", user1: 142, user2: 152, user3: 145 },
  { time: "20:00", user1: 135, user2: 145, user3: 138 },
  { time: "24:00", user1: 130, user2: 140, user3: 135 },
];

function HighRiskMonitoring() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(URL.Users)}
      className="bg-white rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-shadow shadow-theme-200"
    >
      <h3 className="mb-4 text-[18px] text-theme-black-100 ">
        고위험군 라이브 모니터링
      </h3>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F2F2F7" />
          <XAxis
            dataKey="time"
            tick={{ fontSize: 12, fill: "#8A8A8E" }}
            stroke="#F2F2F7"
          />
          <YAxis tick={{ fontSize: 12, fill: "#8A8A8E" }} stroke="#F2F2F7" />
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
                user1: "환자 A",
                user2: "환자 B",
                user3: "환자 C",
              };
              return labels[value] || value;
            }}
          />
          <Line
            type="monotone"
            dataKey="user1"
            stroke="#FF3B30"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
          <Line
            type="monotone"
            dataKey="user2"
            stroke="#FF9500"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
          <Line
            type="monotone"
            dataKey="user3"
            stroke="#FFCC00"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default HighRiskMonitoring;
