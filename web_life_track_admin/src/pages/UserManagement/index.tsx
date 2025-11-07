import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Download,
  ChevronUp,
  ChevronDown,
  AlertTriangle,
  Plus,
  Trash2,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { UserDetailModal } from "@/components/modals/UserDetailModal";
import { CreateCareCardModal } from "@/components/modals/CreateCareCardModal";

// Mock user data
const mockUsers = [
  {
    id: 1,
    name: "홍길동",
    groups: ["고혈압", "당뇨"],
    riskStatus: "2개 확인 필요",
    careStatus: "1개 진행 중",
    inputTypes: ["식단", "약물"],
    outputTypes: ["혈압", "심박수"],
    lastActive: "2025-10-08",
  },
  {
    id: 2,
    name: "김영희",
    groups: ["비만"],
    riskStatus: "정상",
    careStatus: "2개 진행 중",
    inputTypes: ["식단", "운동"],
    outputTypes: ["혈당", "심박수"],
    lastActive: "2025-10-09",
  },
  {
    id: 3,
    name: "이철수",
    groups: ["심혈관", "고혈압"],
    riskStatus: "1개 확인 필요",
    careStatus: "진행 중인 케어 없음",
    inputTypes: ["약물"],
    outputTypes: ["혈압"],
    lastActive: "2025-10-07",
  },
  {
    id: 4,
    name: "박민수",
    groups: ["당뇨"],
    riskStatus: "3개 확인 필요",
    careStatus: "3개 진행 중",
    inputTypes: ["식단", "약물", "운동"],
    outputTypes: ["혈당", "혈압", "심박수"],
    lastActive: "2025-10-09",
  },
  {
    id: 5,
    name: "정수진",
    groups: ["고혈압"],
    riskStatus: "정상",
    careStatus: "1개 진행 중",
    inputTypes: ["식단"],
    outputTypes: ["혈압"],
    lastActive: "2025-10-06",
  },
  {
    id: 6,
    name: "최동욱",
    groups: ["비만", "당뇨"],
    riskStatus: "2개 확인 필요",
    careStatus: "2개 진행 중",
    inputTypes: ["식단", "운동"],
    outputTypes: ["혈당", "심박수"],
    lastActive: "2025-10-08",
  },
];

// Mock care cards data
const initialCareCards = [
  {
    id: 1,
    title: "주 2회 혈압 관리",
    category: "심혈관",
    startDate: "2025-10-01",
    endDate: "2025-11-01",
    isExpiring: false,
  },
  {
    id: 2,
    title: "당뇨 식단 집중 케어",
    category: "내분비",
    startDate: "2025-09-15",
    endDate: "2025-10-15",
    isExpiring: true,
  },
  {
    id: 3,
    title: "생활습관 개선 프로그램",
    category: "생활습관",
    startDate: "2025-10-05",
    endDate: "2025-12-05",
    isExpiring: false,
  },
  {
    id: 4,
    title: "스트레스 관리 케어",
    category: "정신건강",
    startDate: "2025-09-20",
    endDate: "2025-10-20",
    isExpiring: true,
  },
];

const UserManagementPage = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [selectedUser, setSelectedUser] = useState<
    (typeof mockUsers)[0] | null
  >(null);
  const [isUserDetailOpen, setIsUserDetailOpen] = useState(false);
  const [isCreateCareOpen, setIsCreateCareOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [riskFilter, setRiskFilter] = useState("all");
  const [activityFilter, setActivityFilter] = useState("all");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [careCards, setCareCards] = useState(initialCareCards);
  const [isBulkDeleteMode, setIsBulkDeleteMode] = useState(false);
  const [selectedCareCards, setSelectedCareCards] = useState<number[]>([]);

  const handleUserRowClick = (user: (typeof mockUsers)[0]) => {
    setSelectedUser(user);
    setIsUserDetailOpen(true);
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleCareCardClick = (cardId: number) => {
    if (isBulkDeleteMode) {
      setSelectedCareCards((prev) =>
        prev.includes(cardId)
          ? prev.filter((id) => id !== cardId)
          : [...prev, cardId]
      );
    } else {
      // TODO:
      // onNavigate?.("care-detail", { fromTab: "care" });
    }
  };

  const handleDeleteClick = () => {
    if (isBulkDeleteMode) {
      // Perform delete
      setCareCards((prev) =>
        prev.filter((card) => !selectedCareCards.includes(card.id))
      );
      setSelectedCareCards([]);
      setIsBulkDeleteMode(false);
    } else {
      // Enter bulk delete mode
      setIsBulkDeleteMode(true);
      setSelectedCareCards([]);
    }
  };

  const handleCancelBulkDelete = () => {
    setIsBulkDeleteMode(false);
    setSelectedCareCards([]);
  };

  const handleCreateCare = (data: any) => {
    const newCard = {
      id: careCards.length + 1,
      title: data.title,
      category: data.category,
      startDate: data.startDate,
      endDate: data.endDate,
      isExpiring: false,
    };
    setCareCards([...careCards, newCard]);
  };

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

  const SortIcon = ({ column }: { column: string }) => {
    if (sortColumn !== column) {
      return (
        <span className="inline-flex flex-col ml-1 opacity-30">
          <ChevronUp size={12} className="-mb-1" />
          <ChevronDown size={12} />
        </span>
      );
    }
    return sortDirection === "asc" ? (
      <ChevronUp size={14} className="inline ml-1" />
    ) : (
      <ChevronDown size={14} className="inline ml-1" />
    );
  };

  // 렌더링할 JSX 코드
  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl text-theme-black-100">이용자 관리</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 h-12 rounded-lg p-1 bg-theme-white-100 border border-theme-white-200">
          <TabsTrigger
            value="users"
            className="h-10 px-6 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm text-sm"
          >
            이용자 목록
          </TabsTrigger>
          <TabsTrigger
            value="care"
            className="h-10 px-6 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm text-sm"
          >
            케어
          </TabsTrigger>
        </TabsList>

        {/* User List Tab */}
        <TabsContent value="users" className="space-y-4">
          {/* Filter Bar */}
          <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-theme-200">
            <Input
              placeholder="이름, 그룹으로 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-xs h-10 rounded-lg border border-theme-white-200 bg-white"
            />
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="w-[180px] h-10">
                <SelectValue placeholder="리스크 등급" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="high">고위험</SelectItem>
                <SelectItem value="medium">주의</SelectItem>
                <SelectItem value="normal">정상</SelectItem>
              </SelectContent>
            </Select>
            <Select value={activityFilter} onValueChange={setActivityFilter}>
              <SelectTrigger className="w-[180px] h-10">
                <SelectValue placeholder="최근 활동 여부" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="active">활동 중</SelectItem>
                <SelectItem value="inactive">비활동</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              className="ml-auto h-10 rounded-lg text-primary border border-primary"
            >
              <Download size={16} className="mr-2" /> CSV로 내보내기
            </Button>
          </div>

          {/* User Table */}
          <div className="bg-white rounded-xl overflow-hidden shadow-theme-200">
            <table className="w-full">
              <thead style={{ backgroundColor: "#F8F9FA" }}>
                <tr>
                  <th
                    className="px-4 py-3 text-left cursor-pointer hover:bg-gray-100 text-xs text-theme-gray-100"
                    onClick={() => handleSort("name")}
                  >
                    이용자명 <SortIcon column="name" />
                  </th>
                  <th className="px-4 py-3 text-left text-xs text-theme-gray-100">
                    소속 그룹
                  </th>
                  <th
                    className="text-xs text-theme-gray-100 px-4 py-3 text-left cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("risk")}
                  >
                    리스크 상태 <SortIcon column="risk" />
                  </th>
                  <th
                    className="text-xs text-theme-gray-100 px-4 py-3 text-left cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("care")}
                  >
                    케어 상태 <SortIcon column="care" />
                  </th>
                  <th className="text-xs text-theme-gray-100 px-4 py-3 text-left">
                    데이터 인풋
                  </th>
                  <th className="text-xs text-theme-gray-100 px-4 py-3 text-left">
                    활성 바이오마커
                  </th>
                  <th
                    className="text-xs text-theme-gray-100 px-4 py-3 text-left cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("activity")}
                  >
                    최근 활동일 <SortIcon column="activity" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockUsers.map((user, idx) => (
                  <tr
                    key={user.id}
                    onClick={() => handleUserRowClick(user)}
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                    style={{
                      borderTop: idx > 0 ? "1px solid #F2F2F7" : "none",
                    }}
                  >
                    <td
                      className="px-4 py-3"
                      style={{
                        fontSize: "14px",
                        color: "#1C1C1E",
                      }}
                    >
                      {user.name}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {user.groups.map((group) => (
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
                    </td>
                    <td
                      className="px-4 py-3"
                      style={{
                        fontSize: "14px",
                        color: "#1C1C1E",
                      }}
                    >
                      {user.riskStatus}
                    </td>
                    <td
                      className="px-4 py-3"
                      style={{
                        fontSize: "14px",
                        color: "#1C1C1E",
                      }}
                    >
                      {user.careStatus}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        {user.inputTypes.map((type, idx) => (
                          <span key={idx} style={{ fontSize: "16px" }}>
                            {iconMap[type] || type}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        {user.outputTypes.map((type, idx) => (
                          <span key={idx} style={{ fontSize: "16px" }}>
                            {iconMap[type] || type}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td
                      className="px-4 py-3"
                      style={{
                        fontSize: "14px",
                        color: "#8A8A8E",
                      }}
                    >
                      {user.lastActive}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Care Tab */}
        <TabsContent value="care">
          <div className="flex gap-6">
            <div className="flex-1">
              {isBulkDeleteMode && (
                <div
                  className="mb-4 p-4 bg-yellow-50 rounded-xl flex items-center justify-between"
                  style={{ border: "1px solid #FFCC00" }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      color: "#1C1C1E",
                    }}
                  >
                    {selectedCareCards.length}개 선택됨
                  </span>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleCancelBulkDelete}
                      className="h-9 rounded-lg"
                      style={{
                        backgroundColor: "#F2F2F7",
                        color: "#1C1C1E",
                      }}
                    >
                      취소
                    </Button>
                    <Button
                      onClick={handleDeleteClick}
                      className="h-9 rounded-lg"
                      style={{
                        backgroundColor: "#FF3B30",
                        color: "#FFFFFF",
                      }}
                      disabled={selectedCareCards.length === 0}
                    >
                      <Trash2 size={16} className="mr-2" /> 삭제
                    </Button>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                {careCards.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => handleCareCardClick(card.id)}
                    className="p-6 bg-white rounded-xl cursor-pointer hover:shadow-md transition-shadow relative"
                    style={{
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                      border: selectedCareCards.includes(card.id)
                        ? "2px solid #007AFF"
                        : "1px solid #F2F2F7",
                    }}
                  >
                    {isBulkDeleteMode && (
                      <div className="absolute top-4 right-4">
                        <Checkbox
                          checked={selectedCareCards.includes(card.id)}
                          onCheckedChange={() => handleCareCardClick(card.id)}
                        />
                      </div>
                    )}
                    {card.isExpiring && !isBulkDeleteMode && (
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle size={16} style={{ color: "#FF9500" }} />
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#FF9500",
                          }}
                        >
                          만료 임박
                        </span>
                      </div>
                    )}
                    <h3
                      className="mb-3"
                      style={{
                        fontSize: "16px",
                        color: "#1C1C1E",
                      }}
                    >
                      {card.title}
                    </h3>
                    <div className="space-y-1">
                      <p
                        style={{
                          fontSize: "13px",
                          color: "#8A8A8E",
                        }}
                      >
                        항목: {card.category}
                      </p>
                      <p
                        style={{
                          fontSize: "13px",
                          color: "#8A8A8E",
                        }}
                      >
                        기간: {card.startDate} ~ {card.endDate}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-64 space-y-3">
              <Button
                onClick={() => setIsCreateCareOpen(true)}
                className="w-full h-12 rounded-xl"
                style={{
                  backgroundColor: "#007AFF",
                  color: "#FFFFFF",
                }}
                disabled={isBulkDeleteMode}
              >
                <Plus size={18} className="mr-2" /> 생성
              </Button>
              <Button
                onClick={handleDeleteClick}
                variant="outline"
                className="w-full h-12 rounded-xl"
                style={{
                  borderColor: isBulkDeleteMode ? "#007AFF" : "#FF3B30",
                  color: isBulkDeleteMode ? "#007AFF" : "#FF3B30",
                  backgroundColor: isBulkDeleteMode ? "#E3F2FD" : "#FFFFFF",
                }}
              >
                <Trash2 size={18} className="mr-2" />{" "}
                {isBulkDeleteMode ? "삭제 완료" : "삭제"}
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      {selectedUser && (
        <UserDetailModal
          isOpen={isUserDetailOpen}
          onClose={() => setIsUserDetailOpen(false)}
          userName={selectedUser.name}
          userData={selectedUser}
        />
      )}
      <CreateCareCardModal
        isOpen={isCreateCareOpen}
        onClose={() => setIsCreateCareOpen(false)}
        onSubmit={handleCreateCare}
      />
    </div>
  );
};

export default UserManagementPage;
