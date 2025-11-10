import { generatePath, useNavigate } from "react-router-dom";
import { TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { URL } from "@/constants/url";
import type { CareCard } from "@/constants/mock";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface IUserCareTabProps {
  careCards: CareCard[];
  setCareCards: React.Dispatch<React.SetStateAction<CareCard[]>>;
  setIsCreateCareOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserCareTab = (props: IUserCareTabProps) => {
  const { careCards, setCareCards, setIsCreateCareOpen } = props;

  const navigate = useNavigate();
  const [isBulkDeleteMode, setIsBulkDeleteMode] = useState(false);
  const [selectedCareCards, setSelectedCareCards] = useState<number[]>([]);

  const handleCareCardClick = (cardId: number) => {
    if (isBulkDeleteMode) {
      setSelectedCareCards((prev) =>
        prev.includes(cardId)
          ? prev.filter((id) => id !== cardId)
          : [...prev, cardId]
      );
    } else {
      const path = generatePath(URL.CareCardDetail, { id: cardId });
      navigate(path, { state: { navigateFrom: URL.Users } });
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

  return (
    <TabsContent value="care">
      <div className="flex gap-6">
        <div className="flex-1">
          {isBulkDeleteMode && (
            <div className="mb-4 p-4 bg-yellow-50 rounded-xl flex items-center justify-between border border-theme-orange-200">
              <span className="text-sm text-theme-black-100">
                {selectedCareCards.length}개 선택됨
              </span>
              <div className="flex gap-2">
                <Button
                  onClick={handleCancelBulkDelete}
                  className="h-9 rounded-lg bg-theme-white-200 text-theme-black-100"
                >
                  취소
                </Button>
                <Button
                  onClick={handleDeleteClick}
                  className="h-9 rounded-lg bg-theme-red-100 text-white"
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
                className={cn(
                  "p-6 bg-white rounded-xl cursor-pointer hover:shadow-md transition-shadow relative shadow-theme-200",
                  selectedCareCards.includes(card.id)
                    ? "border-2 border-primary"
                    : "border border-theme-white-200"
                )}
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
  );
};

export default UserCareTab;
