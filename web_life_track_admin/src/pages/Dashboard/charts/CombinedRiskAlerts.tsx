import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { URL } from "@/constants/url";
import { cn } from "@/lib/utils";

const alerts = [
  {
    id: 1,
    name: "홍길동",
    risks: ["고혈압", "수면 부족"],
    severity: "high",
  },
  {
    id: 2,
    name: "김영희",
    risks: ["당뇨", "비만"],
    severity: "high",
  },
  {
    id: 3,
    name: "이철수",
    risks: ["고콜레스테롤", "운동 부족"],
    severity: "medium",
  },
];

const CombinedRiskAlerts = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(URL.Risks)}
      className="bg-white rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-shadow shadow-theme-200"
    >
      <h3 className="mb-4 text-xl text-theme-black-100">복합 리스크 경고</h3>
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={cn(
              "p-4 rounded-lg flex items-start gap-3 border",
              alert.severity === "high"
                ? "bg-theme-white-300 border-theme-white-300"
                : "bg-theme-white-400 border-theme-white-400"
            )}
          >
            <AlertTriangle
              size={20}
              className={cn(
                "mt-.5",
                alert.severity === "high"
                  ? "text-theme-red-100"
                  : "text-theme-orange-100"
              )}
            />
            <div className="flex-1">
              <p className="text-sm text-theme-black-100">
                <strong>{alert.name}</strong>
              </p>
              <p className="mt-1 text-sm text-theme-gray-100">
                {alert.risks.join(" + ")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CombinedRiskAlerts;
