import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CreateCareCardModal } from "@/components/modals/CreateCareCardModal";

// Mock risk data
const mockRisks = [
  {
    id: 1,
    user: {
      id: 1,
      name: "홍길동",
      groups: ["고혈압", "당뇨"],
      care: "주 2회 혈압 관리",
      riskStatus: "2개 확인 필요",
      careStatus: "1개 진행 중",
      inputTypes: ["식단", "약물"],
      outputTypes: ["혈압", "심박수"],
      activeRisks: ["복약 미이행", "혈압 상승 감지"],
      activeCares: ["주 2회 혈압 관리"],
    },
    riskType: "복약 미이행",
    riskStatus: "확인 필요",
  },
  {
    id: 2,
    user: {
      id: 2,
      name: "김영희",
      groups: ["비만"],
      care: "생활습관 개선 프로그램",
      riskStatus: "정상",
      careStatus: "2개 진행 중",
      inputTypes: ["식단", "운동"],
      outputTypes: ["혈당", "심박수"],
      activeRisks: [],
      activeCares: ["생활습관 개선 프로그램", "주간 체중 관리"],
    },
    riskType: "혈압 급상승",
    riskStatus: "조치 완료",
  },
  {
    id: 3,
    user: {
      id: 3,
      name: "이철수",
      groups: ["심혈관", "고혈압"],
      care: "주 2회 혈압 관리",
      riskStatus: "1개 확인 필요",
      careStatus: "진행 중인 케어 없음",
      inputTypes: ["약물"],
      outputTypes: ["혈압"],
      activeRisks: ["데이터 미입력"],
      activeCares: [],
    },
    riskType: "데이터 미입력",
    riskStatus: "확인 필요",
  },
];

const groupColors: { [key: string]: string } = {
  고혈압: "#FF3B30",
  당뇨: "#FF9500",
  비만: "#FFCC00",
  심혈관: "#FF2D55",
};

const statusColors: { [key: string]: string } = {
  "확인 필요": "#FFCC00",
  "조치 완료": "#34C759",
  "이상 없음": "#007AFF",
};

export default function RiskManagementPage() {
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [risks, setRisks] = useState(mockRisks);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isUserDetailOpen, setIsUserDetailOpen] = useState(false);
  const [isCreateCareOpen, setIsCreateCareOpen] = useState(false);
  const [prefilledCareData, setPrefilledCareData] = useState<any>(null);

  const handleUserNameClick = (user: any) => {
    setSelectedUser(user);
    setIsUserDetailOpen(true);
  };

  const handleStatusChange = (riskId: number, newStatus: string) => {
    setRisks(
      risks.map((risk) =>
        risk.id === riskId ? { ...risk, riskStatus: newStatus } : risk
      )
    );
  };

  const handleRequestCare = (risk: any) => {
    setPrefilledCareData({
      careName: `${risk.riskType} 케어`,
      users: [risk.user.name],
      category: risk.user.groups[0] || "",
    });
    setIsCreateCareOpen(true);
  };

  const handleCreateCare = (careData: any) => {
    console.log("Creating care:", careData);
    setIsCreateCareOpen(false);
    setPrefilledCareData(null);
  };

  return (
    <div className="p-8">
      {/* Page Title */}
      <h1
        className="mb-6"
        style={{
          fontSize: "28px",
          color: "#1C1C1E",
        }}
      >
        리스크 관리
      </h1>

      {/* Filter Bar */}
      <div className="flex gap-4 mb-6">
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[200px] h-10">
            <SelectValue placeholder="리스크 유형" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            <SelectItem value="medication">복약 미이행</SelectItem>
            <SelectItem value="blood-pressure">혈압 급상승</SelectItem>
            <SelectItem value="no-data">데이터 미입력</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[200px] h-10">
            <SelectValue placeholder="리스크 상태" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            <SelectItem value="pending">확인 필요</SelectItem>
            <SelectItem value="completed">조치 완료</SelectItem>
            <SelectItem value="normal">이상 없음</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Unified Risk List Table */}
      <div
        className="bg-white rounded-xl overflow-hidden"
        style={{
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
        }}
      >
        <table className="w-full">
          <thead style={{ backgroundColor: "#F8F9FA" }}>
            <tr>
              <th
                className="px-6 py-4 text-left"
                style={{
                  fontSize: "12px",
                  color: "#8A8A8E",
                  width: "40%",
                }}
              >
                이용자 정보
              </th>
              <th
                className="px-6 py-4 text-left"
                style={{
                  fontSize: "12px",
                  color: "#8A8A8E",
                  width: "20%",
                }}
              >
                리스크 유형
              </th>
              <th
                className="px-6 py-4 text-left"
                style={{
                  fontSize: "12px",
                  color: "#8A8A8E",
                  width: "20%",
                }}
              >
                리스크 상태
              </th>
              <th
                className="px-6 py-4 text-center"
                style={{
                  fontSize: "12px",
                  color: "#8A8A8E",
                  width: "20%",
                }}
              >
                케어 액션 요청
              </th>
            </tr>
          </thead>
          <tbody>
            {risks.map((risk, idx) => (
              <tr
                key={risk.id}
                style={{
                  borderTop: idx > 0 ? "1px solid #F2F2F7" : "none",
                }}
              >
                {/* Column 1: User Info */}
                <td className="px-6 py-4">
                  <div className="space-y-2">
                    {/* Line 1: User Name */}
                    <button
                      onClick={() => handleUserNameClick(risk.user)}
                      className="hover:underline text-left"
                      style={{
                        fontSize: "16px",
                        color: "#1C1C1E",
                        fontWeight: "600",
                      }}
                    >
                      {risk.user.name}
                    </button>

                    {/* Line 2: Groups */}
                    <div className="flex items-center gap-2">
                      <span
                        style={{
                          fontSize: "13px",
                          color: "#8A8A8E",
                        }}
                      >
                        그룹:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {risk.user.groups.map((group) => (
                          <span
                            key={group}
                            className="px-2 py-0.5 rounded-full"
                            style={{
                              backgroundColor: groupColors[group] || "#007AFF",
                              color: "#FFFFFF",
                              fontSize: "11px",
                            }}
                          >
                            [{group}]
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Line 3: Care */}
                    <div className="flex items-center gap-2">
                      <span
                        style={{
                          fontSize: "13px",
                          color: "#8A8A8E",
                        }}
                      >
                        케어:
                      </span>
                      <span
                        className="px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: "#F8F9FA",
                          color: "#1C1C1E",
                          fontSize: "12px",
                        }}
                      >
                        [{risk.user.care}]
                      </span>
                    </div>
                  </div>
                </td>

                {/* Column 2: Risk Type */}
                <td
                  className="px-6 py-4"
                  style={{
                    fontSize: "14px",
                    color: "#1C1C1E",
                  }}
                >
                  {risk.riskType}
                </td>

                {/* Column 3: Risk Status Dropdown */}
                <td className="px-6 py-4">
                  <Select
                    value={risk.riskStatus}
                    onValueChange={(value) =>
                      handleStatusChange(risk.id, value)
                    }
                  >
                    <SelectTrigger
                      className="w-[140px] h-8 border-none"
                      style={{
                        backgroundColor:
                          statusColors[risk.riskStatus] || "#007AFF",
                        color: "#FFFFFF",
                        fontSize: "12px",
                      }}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="확인 필요">확인 필요</SelectItem>
                      <SelectItem value="조치 완료">조치 완료</SelectItem>
                      <SelectItem value="이상 없음">이상 없음</SelectItem>
                    </SelectContent>
                  </Select>
                </td>

                {/* Column 4: Request Care Button */}
                <td className="px-6 py-4 text-center">
                  <Button
                    onClick={() => handleRequestCare(risk)}
                    className="h-9 px-6 rounded-lg"
                    style={{
                      backgroundColor: "#007AFF",
                      color: "#FFFFFF",
                    }}
                  >
                    요청
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CreateCareCardModal
        isOpen={isCreateCareOpen}
        onClose={() => {
          setIsCreateCareOpen(false);
          setPrefilledCareData(null);
        }}
        onSubmit={handleCreateCare}
        prefilledData={prefilledCareData}
      />
    </div>
  );
}
