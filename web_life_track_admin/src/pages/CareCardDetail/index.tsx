import { useState } from "react";
import { ArrowLeft, Download, FileText, Edit, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserSelectionModal } from "@/components/modals/UserSelectionModal";
import { useLocation, useNavigate } from "react-router-dom";
import { URL } from "@/constants/url";

interface User {
  id: number;
  name: string;
  groups: string[];
  riskStatus: string;
}

export default function CareCardDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isEditMode, setIsEditMode] = useState(false);
  const [isUserSelectionOpen, setIsUserSelectionOpen] = useState(false);

  const [cardData, setCardData] = useState({
    title: "주 2회 혈압 관리",
    category: "심혈관",
    startDate: "2025-10-01",
    endDate: "2025-12-31",
    description:
      "고혈압 환자를 위한 맞춤형 혈압 관리 프로그램입니다. 주 2회 정기적인 혈압 측정과 생활습관 개선 가이드를 제공합니다.",
    guideFile: "혈압 관리 가이드.pdf",
  });

  const [assignedUsers, setAssignedUsers] = useState<User[]>([
    {
      id: 1,
      name: "홍길동",
      groups: ["고혈압", "당뇨"],
      riskStatus: "복약 미이행, 혈압 상승 감지",
    },
    { id: 2, name: "김영희", groups: ["비만"], riskStatus: "이상 없음" },
  ]);

  const handleSaveEdit = () => {
    setIsEditMode(false);
    // Save logic would go here
  };

  const handleAddUsers = (users: User[]) => {
    // Merge new users with existing ones, avoiding duplicates
    const existingIds = assignedUsers.map((u) => u.id);
    const newUsers = users.filter((u) => !existingIds.includes(u.id));
    setAssignedUsers([...assignedUsers, ...newUsers]);
  };

  const handleRemoveUser = (userId: number) => {
    setAssignedUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  const handleDownloadGuide = () => {
    console.log("Downloading file:", cardData.guideFile);
    // Simulate file download
  };

  const groupColors: { [key: string]: string } = {
    고혈압: "#FF3B30",
    당뇨: "#FF9500",
    비만: "#FFCC00",
    심혈관: "#FF2D55",
  };

  const handleBackClick = () => {
    const navigateFrom = location.state?.navigateFrom;
    if (navigateFrom === URL.Users) {
      navigate(URL.Users, { state: { initialTab: "care" } });
    } else {
      navigate(-1);
    }
  };

  console.log("location", location.state);

  return (
    <div className="p-8">
      {/* Content Header */}
      <div className="mb-8 flex items-center justify-between">
        {/* Left: Back Button */}
        <button
          onClick={handleBackClick}
          className="flex items-center gap-2 hover:opacity-70 transition-opacity"
          style={{ color: "#007AFF" }}
        >
          <ArrowLeft size={20} />
          <span style={{ fontSize: "14px" }}>뒤로 가기</span>
        </button>

        {/* Center: Title */}
        <h1 style={{ fontSize: "28px", color: "#1C1C1E" }}>{cardData.title}</h1>

        {/* Right: Edit/Save Button */}
        {isEditMode ? (
          <div className="flex gap-2">
            <Button
              onClick={() => setIsEditMode(false)}
              className="h-10 rounded-lg"
              style={{
                backgroundColor: "#F2F2F7",
                color: "#1C1C1E",
              }}
            >
              취소
            </Button>
            <Button
              onClick={handleSaveEdit}
              className="h-10 rounded-lg"
              style={{
                backgroundColor: "#007AFF",
                color: "#FFFFFF",
              }}
            >
              저장
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => setIsEditMode(true)}
            className="h-10 rounded-lg"
            style={{
              backgroundColor: "#007AFF",
              color: "#FFFFFF",
            }}
          >
            <Edit size={16} className="mr-2" />
            수정
          </Button>
        )}
      </div>

      <div className="max-w-4xl space-y-8">
        {/* Section 1: Card Information */}
        <div
          className="p-6 rounded-xl"
          style={{
            backgroundColor: "#FFFFFF",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
          }}
        >
          <h2 className="mb-6" style={{ fontSize: "20px", color: "#1C1C1E" }}>
            카드 정보
          </h2>

          <div className="space-y-5">
            {/* Category */}
            <div>
              <Label style={{ fontSize: "12px", color: "#8A8A8E" }}>
                카테고리
              </Label>
              {isEditMode ? (
                <Input
                  value={cardData.category}
                  onChange={(e) =>
                    setCardData({ ...cardData, category: e.target.value })
                  }
                  className="mt-2 h-11 rounded-lg"
                  style={{
                    borderColor: "#F2F2F7",
                    backgroundColor: "#FFFFFF",
                  }}
                />
              ) : (
                <p
                  className="mt-2"
                  style={{ fontSize: "14px", color: "#1C1C1E" }}
                >
                  {cardData.category}
                </p>
              )}
            </div>

            {/* Period */}
            <div>
              <Label style={{ fontSize: "12px", color: "#8A8A8E" }}>기간</Label>
              {isEditMode ? (
                <div className="mt-2 flex gap-3 items-center">
                  <Input
                    type="date"
                    value={cardData.startDate}
                    onChange={(e) =>
                      setCardData({ ...cardData, startDate: e.target.value })
                    }
                    className="h-11 rounded-lg"
                    style={{
                      borderColor: "#F2F2F7",
                      backgroundColor: "#FFFFFF",
                    }}
                  />
                  <span style={{ color: "#8A8A8E" }}>~</span>
                  <Input
                    type="date"
                    value={cardData.endDate}
                    onChange={(e) =>
                      setCardData({ ...cardData, endDate: e.target.value })
                    }
                    className="h-11 rounded-lg"
                    style={{
                      borderColor: "#F2F2F7",
                      backgroundColor: "#FFFFFF",
                    }}
                  />
                </div>
              ) : (
                <p
                  className="mt-2"
                  style={{ fontSize: "14px", color: "#1C1C1E" }}
                >
                  {cardData.startDate} ~ {cardData.endDate}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <Label style={{ fontSize: "12px", color: "#8A8A8E" }}>설명</Label>
              {isEditMode ? (
                <Textarea
                  value={cardData.description}
                  onChange={(e) =>
                    setCardData({ ...cardData, description: e.target.value })
                  }
                  className="mt-2 rounded-lg min-h-[100px]"
                  style={{
                    borderColor: "#F2F2F7",
                    backgroundColor: "#FFFFFF",
                  }}
                />
              ) : (
                <p
                  className="mt-2"
                  style={{
                    fontSize: "14px",
                    color: "#1C1C1E",
                    lineHeight: "1.6",
                  }}
                >
                  {cardData.description}
                </p>
              )}
            </div>

            {/* Guide File */}
            <div>
              <Label style={{ fontSize: "12px", color: "#8A8A8E" }}>
                가이드 파일
              </Label>
              <div
                className="mt-2 flex items-center gap-3 p-4 rounded-lg"
                style={{ backgroundColor: "#F8F9FA" }}
              >
                <FileText size={20} style={{ color: "#007AFF" }} />
                <span style={{ fontSize: "14px", color: "#1C1C1E", flex: 1 }}>
                  {cardData.guideFile}
                </span>
                <button
                  onClick={handleDownloadGuide}
                  className="flex items-center gap-1 hover:opacity-70 transition-opacity"
                  style={{ color: "#007AFF", fontSize: "14px" }}
                >
                  <Download size={16} />
                  다운로드
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Assigned Users - REVISED with Table */}
        <div
          className="p-6 rounded-xl"
          style={{
            backgroundColor: "#FFFFFF",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 style={{ fontSize: "20px", color: "#1C1C1E" }}>참여 이용자</h2>
            <Button
              onClick={() => setIsUserSelectionOpen(true)}
              className="h-10 rounded-lg"
              style={{
                backgroundColor: "#007AFF",
                color: "#FFFFFF",
              }}
            >
              <Plus size={16} className="mr-2" />
              대상자 추가
            </Button>
          </div>

          {/* User Table */}
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: "1px solid #F2F2F7" }}
          >
            <table className="w-full">
              <thead style={{ backgroundColor: "#F8F9FA" }}>
                <tr>
                  <th
                    className="px-6 py-4 text-left"
                    style={{
                      fontSize: "12px",
                      color: "#8A8A8E",
                      width: "30%",
                    }}
                  >
                    이용자명
                  </th>
                  <th
                    className="px-6 py-4 text-left"
                    style={{
                      fontSize: "12px",
                      color: "#8A8A8E",
                      width: "70%",
                    }}
                  >
                    현재 리스크 상태
                  </th>
                </tr>
              </thead>
              <tbody>
                {assignedUsers.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="px-6 py-8 text-center">
                      <p style={{ fontSize: "14px", color: "#8A8A8E" }}>
                        참여 중인 이용자가 없습니다.
                      </p>
                    </td>
                  </tr>
                ) : (
                  assignedUsers.map((user, idx) => (
                    <tr
                      key={user.id}
                      style={{
                        borderTop: idx > 0 ? "1px solid #F2F2F7" : "none",
                      }}
                    >
                      <td
                        className="px-6 py-4"
                        style={{
                          fontSize: "14px",
                          color: "#1C1C1E",
                        }}
                      >
                        {user.name}
                      </td>
                      <td
                        className="px-6 py-4"
                        style={{
                          fontSize: "14px",
                          color: "#1C1C1E",
                        }}
                      >
                        {user.riskStatus}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* User Selection Modal */}
      <UserSelectionModal
        isOpen={isUserSelectionOpen}
        onClose={() => setIsUserSelectionOpen(false)}
        onConfirm={handleAddUsers}
        alreadySelectedIds={assignedUsers.map((u) => u.id)}
      />
    </div>
  );
}
