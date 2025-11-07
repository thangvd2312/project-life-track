import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const colorOptions = [
  { value: "#FF3B30", label: "빨강" },
  { value: "#FF9500", label: "주황" },
  { value: "#FFCC00", label: "노랑" },
  { value: "#34C759", label: "초록" },
  { value: "#007AFF", label: "파랑" },
  { value: "#5856D6", label: "보라" },
  { value: "#FF2D55", label: "핑크" },
  { value: "#8A8A8E", label: "회색" },
];

export function CreateGroupModal({ isOpen, onClose }: CreateGroupModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    color: "#FF3B30",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating group:", formData);
    // Reset form
    setFormData({
      name: "",
      color: "#FF3B30",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
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
            새 그룹 추가
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            새로운 이용자 그룹을 생성합니다
          </DialogPrimitive.Description>

          {/* Close Button - Top Right */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 rounded-full p-1 hover:bg-gray-100 transition-colors"
          >
            <X size={24} style={{ color: "#8A8A8E" }} />
          </button>

          <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5">
            <h2 className="mb-2" style={{ fontSize: "24px", color: "#1C1C1E" }}>
              새 그룹 추가
            </h2>

            {/* Group Name */}
            <div className="space-y-2">
              <Label
                htmlFor="group-name"
                style={{ fontSize: "14px", color: "#1C1C1E" }}
              >
                그룹명
              </Label>
              <Input
                id="group-name"
                type="text"
                placeholder="예: 고혈압"
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

            {/* Color Selection */}
            <div className="space-y-2">
              <Label style={{ fontSize: "14px", color: "#1C1C1E" }}>
                그룹 색상
              </Label>
              <div className="grid grid-cols-8 gap-3">
                {colorOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, color: option.value })
                    }
                    className="relative w-10 h-10 rounded-full transition-transform hover:scale-110"
                    style={{
                      backgroundColor: option.value,
                      border:
                        formData.color === option.value
                          ? "3px solid #1C1C1E"
                          : "2px solid #F2F2F7",
                    }}
                    title={option.label}
                  >
                    {formData.color === option.value && (
                      <div className="absolute inset-0 rounded-full flex items-center justify-center">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: "#FFFFFF" }}
                        />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div
              className="p-4 rounded-xl"
              style={{
                backgroundColor: "#F8F9FA",
                border: "1px solid #F2F2F7",
              }}
            >
              <p
                style={{
                  fontSize: "12px",
                  color: "#8A8A8E",
                  marginBottom: "8px",
                }}
              >
                미리보기
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: formData.color }}
                />
                <span style={{ fontSize: "14px", color: "#1C1C1E" }}>
                  {formData.name || "그룹명"}
                </span>
              </div>
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
  );
}
