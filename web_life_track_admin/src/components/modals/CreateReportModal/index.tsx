import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { UserSelectionModal } from "@/components/modals/UserSelectionModal";

interface CreateReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

interface User {
  id: number;
  name: string;
  groups: string[];
  riskStatus: string;
}

export function CreateReportModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateReportModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    topic: "",
  });

  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [isUserSelectionOpen, setIsUserSelectionOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      targets: selectedUsers,
    });
    // Reset form
    setFormData({
      name: "",
      topic: "",
    });
    setSelectedUsers([]);
    onClose();
  };

  const handleUserSelection = (users: User[]) => {
    setSelectedUsers(users);
  };

  const groupColors: { [key: string]: string } = {
    고혈압: "#FF3B30",
    당뇨: "#FF9500",
    비만: "#FFCC00",
    심혈관: "#FF2D55",
  };

  if (!isOpen)
    return (
      <UserSelectionModal
        isOpen={isUserSelectionOpen}
        onClose={() => setIsUserSelectionOpen(false)}
        onConfirm={handleUserSelection}
        alreadySelectedIds={selectedUsers.map((u) => u.id)}
      />
    );

  return (
    <>
      <DialogPrimitive.Root open={isOpen} onOpenChange={onClose}>
        <DialogPrimitive.Portal>
          {/* Overlay */}
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50" />

          {/* Content */}
          <DialogPrimitive.Content
            className="fixed top-[50%] left-[50%] z-50 translate-x-[-50%] translate-y-[-50%] w-full max-w-[500px] p-0"
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              boxShadow: "0 4px 24px rgba(0, 0, 0, 0.15)",
            }}
          >
            <DialogPrimitive.Title className="sr-only">
              새 리포트 생성
            </DialogPrimitive.Title>
            <DialogPrimitive.Description className="sr-only">
              새로운 리포트를 생성합니다
            </DialogPrimitive.Description>

            {/* Close Button - Top Right */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 rounded-full p-1 hover:bg-gray-100 transition-colors"
            >
              <X size={24} style={{ color: "#8A8A8E" }} />
            </button>

            <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5">
              <h2
                className="mb-2"
                style={{ fontSize: "24px", color: "#1C1C1E" }}
              >
                새 리포트 생성
              </h2>

              {/* Report Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  style={{ fontSize: "14px", color: "#1C1C1E" }}
                >
                  리포트명
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="예: 주간 건강 데이터 분석"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="h-11 rounded-lg"
                  style={{
                    borderColor: "#F2F2F7",
                    backgroundColor: "#FFFFFF",
                  }}
                  required
                />
              </div>

              {/* Topic */}
              <div className="space-y-2">
                <Label
                  htmlFor="topic"
                  style={{ fontSize: "14px", color: "#1C1C1E" }}
                >
                  항목
                </Label>
                <Select
                  value={formData.topic}
                  onValueChange={(value) =>
                    setFormData({ ...formData, topic: value })
                  }
                  required
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="항목 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="종합 건강">종합 건강</SelectItem>
                    <SelectItem value="심혈관">심혈관</SelectItem>
                    <SelectItem value="내분비">내분비</SelectItem>
                    <SelectItem value="생활습관">생활습관</SelectItem>
                    <SelectItem value="데이터 품질">데이터 품질</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* User Selection */}
              <div className="space-y-2">
                <Label style={{ fontSize: "14px", color: "#1C1C1E" }}>
                  대상
                </Label>
                <Button
                  type="button"
                  onClick={() => setIsUserSelectionOpen(true)}
                  className="w-full h-11 rounded-lg"
                  style={{
                    backgroundColor: "#F8F9FA",
                    color: "#007AFF",
                    border: "1px solid #F2F2F7",
                  }}
                >
                  <Plus size={16} className="mr-2" />
                  이용자 선택
                </Button>

                {/* Selected Users List */}
                {selectedUsers.length > 0 && (
                  <div
                    className="mt-3 p-4 rounded-lg space-y-2"
                    style={{ backgroundColor: "#F8F9FA" }}
                  >
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#8A8A8E",
                        marginBottom: "8px",
                      }}
                    >
                      {selectedUsers.length}명 선택됨
                    </p>
                    {selectedUsers.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center gap-2 p-2 rounded-lg"
                        style={{ backgroundColor: "#FFFFFF" }}
                      >
                        <span style={{ fontSize: "13px", color: "#1C1C1E" }}>
                          {user.name}
                        </span>
                        <div className="flex gap-1">
                          {user.groups.map((group) => (
                            <span
                              key={group}
                              className="px-1.5 py-0.5 rounded-full"
                              style={{
                                backgroundColor:
                                  groupColors[group] || "#007AFF",
                                color: "#FFFFFF",
                                fontSize: "9px",
                              }}
                            >
                              [{group}]
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 rounded-lg mt-6"
                style={{
                  backgroundColor: "#007AFF",
                  color: "#FFFFFF",
                }}
              >
                생성하기
              </Button>
            </form>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>

      {/* User Selection Modal */}
      <UserSelectionModal
        isOpen={isUserSelectionOpen}
        onClose={() => setIsUserSelectionOpen(false)}
        onConfirm={handleUserSelection}
        alreadySelectedIds={selectedUsers.map((u) => u.id)}
      />
    </>
  );
}
