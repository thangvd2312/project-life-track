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
import { cn } from "@/lib/utils";
import type { IOptionCustomLineChart } from "@/common/types";

interface ICustomLineChart {
  data: any;
  title: string;
  options: IOptionCustomLineChart;
}

const CustomLineChart = (props: ICustomLineChart) => {
  const { data, options, title } = props;
  const { labels, yAxis } = options;

  return (
    <div className="space-y-3">
      <h2 className="font-semibold text-theme-gray-100">{title}</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ left: -20, right: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#c7ccd6" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          {yAxis.map((y, index) => {
            const { min: minY, max: maxY } = y;
            return (
              <YAxis
                domain={[minY, maxY]}
                yAxisId={y.unit}
                tick={{ fontSize: 12 }}
                orientation={index === 0 ? "left" : "right"}
              />
            );
          })}

          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white p-3 border rounded-lg shadow-sm text-xs">
                    <p className="font-semibold">{label}</p>
                    {labels.map((label) => {
                      return (
                        <p key={label.text} style={{ color: label.color }}>
                          {label.text}: <strong>{payload[0].value}</strong>
                        </p>
                      );
                    })}
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="line"
            formatter={(value) => {
              return <span className={cn("text-xs")}>{value}</span>;
            }}
          />
          {labels.map((label) => {
            return (
              <Line
                key={label.text}
                type="monotone"
                dataKey={label.dataKey}
                stroke={label.color}
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 4 }}
                yAxisId={label.unit}
                name={label.text}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
