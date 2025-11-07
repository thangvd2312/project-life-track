import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, Download, AlertTriangle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

interface UserDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  userData?: {
    groups: string[];
    riskStatus: string;
    careStatus: string;
    inputTypes: string[];
    outputTypes: string[];
    activeRisks?: string[];
    activeCares?: string[];
  };
}

// Mock correlation data
const generateCorrelationData = (xMetric: string, yMetric: string) => {
  return Array.from({ length: 20 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));
};

export function UserDetailModal({
  isOpen,
  onClose,
  userName,
  userData,
}: UserDetailModalProps) {
  const [xAxis, setXAxis] = useState("수면 시간");
  const [yAxis, setYAxis] = useState("혈압");
  const correlationData = generateCorrelationData(xAxis, yAxis);

  // Default userData if not provided
  const defaultUserData = {
    groups: ["고혈압", "당뇨"],
    riskStatus: "주의",
    careStatus: "활성",
    inputTypes: ["혈압", "혈당"],
    outputTypes: ["식단", "약물"],
    activeRisks: ["고혈압 위험"],
    activeCares: ["식단 관리"],
  };

  const userInfo = userData || defaultUserData;

  const reports = [
    { name: "2025년 10월 건강 종합 리포트", date: "2025-10-05", id: 1 },
    { name: "심혈관 위험도 분석 리포트", date: "2025-09-28", id: 2 },
    { name: "생활습관 개선 권고안", date: "2025-09-15", id: 3 },
  ];

  const metricOptions = [
    "수면 시간",
    "활동량",
    "혈압",
    "심박수",
    "혈당",
    "체중",
  ];

  const groupColors: { [key: string]: string } = {
    고혈압: "#FF3B30",
    당뇨: "#FF9500",
    비만: "#FFCC00",
    심혈관: "#FF2D55",
  };

  const iconMap: { [key: string]: string } = {
    식단: "🍽️",
    약물: "💊",
    혈압: "🩸",
    심박수: "❤️",
    혈당: "🩸",
    운동: "🏃",
  };

  if (!isOpen) return null;

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={onClose}>
      <DialogPrimitive.Portal>
        {/* Overlay */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50" />

        {/* Content */}
        <DialogPrimitive.Content
          className="fixed top-[50%] left-[50%] z-50 translate-x-[-50%] translate-y-[-50%] w-full max-w-[800px] max-h-[90vh] overflow-y-auto p-0"
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "16px",
            boxShadow: "0 4px 24px rgba(0, 0, 0, 0.15)",
          }}
        >
          <DialogPrimitive.Title className="sr-only">
            {userName}님 상세 리포트
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            사용자의 건강 데이터 및 상세 리포트를 확인합니다
          </DialogPrimitive.Description>

          {/* Close Button - Top Right */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 rounded-full p-1 hover:bg-gray-100 transition-colors"
          >
            <X size={24} style={{ color: "#8A8A8E" }} />
          </button>

          <div className="px-8 py-8 space-y-6">
            {/* Title */}
            <h2 style={{ fontSize: "24px", color: "#1C1C1E" }}>
              {userName}님 상세 리포트
            </h2>
            {/* Summary Section - REVISED v3 */}
            <div
              className="p-6 rounded-xl space-y-5"
              style={{ backgroundColor: "#F8F9FA" }}
            >
              {/* 소속 그룹 */}
              <div>
                <div
                  style={{ fontSize: "13px", color: "#8A8A8E" }}
                  className="mb-3"
                >
                  소속 그룹
                </div>
                <div className="flex flex-wrap gap-2">
                  {userInfo.groups.map((group) => (
                    <span
                      key={group}
                      className="px-3 py-1.5 rounded-full"
                      style={{
                        backgroundColor: groupColors[group] || "#007AFF",
                        color: "#FFFFFF",
                        fontSize: "13px",
                      }}
                    >
                      [{group}]
                    </span>
                  ))}
                </div>
              </div>

              {/* 활성 리스크 */}
              <div>
                <div
                  style={{ fontSize: "13px", color: "#8A8A8E" }}
                  className="mb-3"
                >
                  활성 리스크
                </div>
                <div className="space-y-2">
                  {(
                    userInfo.activeRisks || ["복약 미이행", "혈압 상승 감지"]
                  ).map((risk, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <AlertTriangle size={16} style={{ color: "#FF9500" }} />
                      <span style={{ fontSize: "14px", color: "#1C1C1E" }}>
                        - {risk}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 진행중인 케어 */}
              <div>
                <div
                  style={{ fontSize: "13px", color: "#8A8A8E" }}
                  className="mb-3"
                >
                  진행중인 케어
                </div>
                <div className="space-y-2">
                  {(userInfo.activeCares || ["주 2회 혈압 관리"]).map(
                    (care, idx) => (
                      <div
                        key={idx}
                        style={{ fontSize: "14px", color: "#1C1C1E" }}
                      >
                        - {care}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Correlation Analyzer Section */}
            <div>
              <h3
                style={{ fontSize: "18px", color: "#1C1C1E" }}
                className="mb-4"
              >
                상관관계 분석기
              </h3>

              {/* Axis Controls */}
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <label
                    style={{ fontSize: "12px", color: "#8A8A8E" }}
                    className="block mb-2"
                  >
                    X축
                  </label>
                  <Select value={xAxis} onValueChange={setXAxis}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {metricOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-1">
                  <label
                    style={{ fontSize: "12px", color: "#8A8A8E" }}
                    className="block mb-2"
                  >
                    Y축
                  </label>
                  <Select value={yAxis} onValueChange={setYAxis}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {metricOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Scatter Plot */}
              <div
                className="p-4 rounded-xl"
                style={{ backgroundColor: "#F8F9FA", height: "300px" }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E5EA" />
                    <XAxis
                      type="number"
                      dataKey="x"
                      name={xAxis}
                      stroke="#8A8A8E"
                      style={{ fontSize: "12px" }}
                    />
                    <YAxis
                      type="number"
                      dataKey="y"
                      name={yAxis}
                      stroke="#8A8A8E"
                      style={{ fontSize: "12px" }}
                    />
                    <Tooltip
                      cursor={{ strokeDasharray: "3 3" }}
                      contentStyle={{
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #F2F2F7",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                    />
                    <Scatter
                      data={correlationData}
                      fill="#007AFF"
                      fillOpacity={0.6}
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Detailed Reports List Section */}
            <div>
              <h3
                style={{ fontSize: "18px", color: "#1C1C1E" }}
                className="mb-4"
              >
                상세 보고서 목록
              </h3>

              <div
                className="rounded-xl overflow-hidden"
                style={{ border: "1px solid #F2F2F7" }}
              >
                <table className="w-full">
                  <thead style={{ backgroundColor: "#F8F9FA" }}>
                    <tr>
                      <th
                        className="px-4 py-3 text-left"
                        style={{ fontSize: "12px", color: "#8A8A8E" }}
                      >
                        리포트명
                      </th>
                      <th
                        className="px-4 py-3 text-left"
                        style={{ fontSize: "12px", color: "#8A8A8E" }}
                      >
                        생성일
                      </th>
                      <th
                        className="px-4 py-3 text-center"
                        style={{ fontSize: "12px", color: "#8A8A8E" }}
                      >
                        다운로드
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((report, idx) => (
                      <tr
                        key={report.id}
                        style={{
                          borderTop: idx > 0 ? "1px solid #F2F2F7" : "none",
                          backgroundColor: "#FFFFFF",
                        }}
                      >
                        <td
                          className="px-4 py-3"
                          style={{ fontSize: "14px", color: "#1C1C1E" }}
                        >
                          {report.name}
                        </td>
                        <td
                          className="px-4 py-3"
                          style={{ fontSize: "14px", color: "#8A8A8E" }}
                        >
                          {report.date}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            onClick={() => console.log("Download", report.name)}
                          >
                            <Download size={18} style={{ color: "#007AFF" }} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
