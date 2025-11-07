import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, Upload, FileText, Plus } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { UserSelectionModal } from "@/components/modals/UserSelectionModal";

interface CreateCareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  prefilledData?: {
    careName?: string;
    users?: string[];
    category?: string;
  } | null;
}

interface User {
  id: number;
  name: string;
  groups: string[];
  riskStatus: string;
}

export function CreateCareCardModal({
  isOpen,
  onClose,
  onSubmit,
  prefilledData,
}: CreateCareCardModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    startDate: "",
    endDate: "",
    description: "",
    guideFile: null as File | null,
  });

  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [isUserSelectionOpen, setIsUserSelectionOpen] = useState(false);

  // Update form when prefilledData changes
  useEffect(() => {
    if (prefilledData && isOpen) {
      setFormData((prev) => ({
        ...prev,
        title: prefilledData.careName || prev.title,
        category: prefilledData.category || prev.category,
      }));

      // If users are provided, create User objects for display
      if (prefilledData.users && prefilledData.users.length > 0) {
        const mockUserObjects = prefilledData.users.map((name, idx) => ({
          id: 1000 + idx, // Temporary ID
          name: name,
          groups: [prefilledData.category || "일반"],
          riskStatus: "확인 필요",
        }));
        setSelectedUsers(mockUserObjects);
      }
    }
  }, [prefilledData, isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, guideFile: file });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      assignedUsers: selectedUsers,
    });
    // Reset form
    setFormData({
      title: "",
      category: "",
      startDate: "",
      endDate: "",
      description: "",
      guideFile: null,
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
            className="fixed top-[50%] left-[50%] z-50 translate-x-[-50%] translate-y-[-50%] w-full max-w-[600px] max-h-[90vh] overflow-y-auto p-0"
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              boxShadow: "0 4px 24px rgba(0, 0, 0, 0.15)",
            }}
          >
            <DialogPrimitive.Title className="sr-only">
              새 케어 카드 생성
            </DialogPrimitive.Title>
            <DialogPrimitive.Description className="sr-only">
              새로운 케어 프로그램을 생성합니다
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
                새 케어 카드 생성
              </h2>
              {/* Title */}
              <div className="space-y-2">
                <Label
                  htmlFor="title"
                  style={{ fontSize: "14px", color: "#1C1C1E" }}
                >
                  제목
                </Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="예: 주 2회 혈압 관리"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="h-11 rounded-lg"
                  style={{
                    borderColor: "#F2F2F7",
                    backgroundColor: "#FFFFFF",
                  }}
                  required
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label
                  htmlFor="category"
                  style={{ fontSize: "14px", color: "#1C1C1E" }}
                >
                  카테고리
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                  required
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="카테고리 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="심혈관">심혈관</SelectItem>
                    <SelectItem value="내분비">내분비</SelectItem>
                    <SelectItem value="생활습관">생활습관</SelectItem>
                    <SelectItem value="정신건강">정신건강</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date Range */}
              <div className="space-y-2">
                <Label style={{ fontSize: "14px", color: "#1C1C1E" }}>
                  기간
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    className="h-11 rounded-lg"
                    style={{
                      borderColor: "#F2F2F7",
                      backgroundColor: "#FFFFFF",
                    }}
                    required
                  />
                  <Input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    className="h-11 rounded-lg"
                    style={{
                      borderColor: "#F2F2F7",
                      backgroundColor: "#FFFFFF",
                    }}
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  style={{ fontSize: "14px", color: "#1C1C1E" }}
                >
                  설명
                </Label>
                <Textarea
                  id="description"
                  placeholder="케어 프로그램에 대한 설명을 입력하세요"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="rounded-lg min-h-[100px]"
                  style={{
                    borderColor: "#F2F2F7",
                    backgroundColor: "#FFFFFF",
                  }}
                />
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <Label style={{ fontSize: "14px", color: "#1C1C1E" }}>
                  가이드 파일
                </Label>
                <div
                  className="relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                  style={{ borderColor: "#F2F2F7" }}
                  onClick={() =>
                    document.getElementById("file-upload")?.click()
                  }
                >
                  <input
                    id="file-upload"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {formData.guideFile ? (
                    <div className="flex items-center justify-center gap-2">
                      <FileText size={20} style={{ color: "#007AFF" }} />
                      <span style={{ fontSize: "14px", color: "#1C1C1E" }}>
                        {formData.guideFile.name}
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload
                        size={24}
                        className="mx-auto"
                        style={{ color: "#8A8A8E" }}
                      />
                      <p style={{ fontSize: "14px", color: "#8A8A8E" }}>
                        PDF 파일을 업로드하거나 드래그하세요
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* User Selection */}
              <div className="space-y-2">
                <Label style={{ fontSize: "14px", color: "#1C1C1E" }}>
                  참여 이용자
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
