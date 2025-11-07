import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";

interface EditRuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  rule: {
    id: number;
    title: string;
    description: string;
    category: string;
  } | null;
}

export function EditRuleModal({ isOpen, onClose, rule }: EditRuleModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    threshold: "",
    severity: "주의",
  });

  useEffect(() => {
    if (rule) {
      setFormData({
        title: rule.title,
        description: rule.description,
        category: rule.category,
        threshold: "140",
        severity: "주의",
      });
    }
  }, [rule]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updating rule:", formData);
    onClose();
  };

  if (!isOpen || !rule) return null;

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={onClose}>
      <DialogPrimitive.Portal>
        {/* Overlay */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50" />

        {/* Content */}
        <DialogPrimitive.Content
          className="fixed top-[50%] left-[50%] z-50 translate-x-[-50%] translate-y-[-50%] w-full max-w-[600px] p-0"
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "16px",
            boxShadow: "0 4px 24px rgba(0, 0, 0, 0.15)",
          }}
        >
          <DialogPrimitive.Title className="sr-only">
            리스크 규칙 수정
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            리스크 판단 규칙을 수정합니다
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
              리스크 규칙 수정
            </h2>

            {/* Rule Title */}
            <div className="space-y-2">
              <Label
                htmlFor="rule-title"
                style={{ fontSize: "14px", color: "#1C1C1E" }}
              >
                규칙 이름
              </Label>
              <Input
                id="rule-title"
                type="text"
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
                  <SelectItem value="혈압">혈압</SelectItem>
                  <SelectItem value="혈당">혈당</SelectItem>
                  <SelectItem value="체중">체중</SelectItem>
                  <SelectItem value="심박수">심박수</SelectItem>
                  <SelectItem value="체온">체온</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Threshold Value */}
            <div className="space-y-2">
              <Label
                htmlFor="threshold"
                style={{ fontSize: "14px", color: "#1C1C1E" }}
              >
                임계값
              </Label>
              <div className="flex gap-3">
                <Input
                  id="threshold"
                  type="number"
                  value={formData.threshold}
                  onChange={(e) =>
                    setFormData({ ...formData, threshold: e.target.value })
                  }
                  className="flex-1 h-11 rounded-lg"
                  style={{
                    borderColor: "#F2F2F7",
                    backgroundColor: "#FFFFFF",
                  }}
                  placeholder="예: 140"
                  required
                />
                <div
                  className="px-4 h-11 rounded-lg flex items-center"
                  style={{
                    backgroundColor: "#F8F9FA",
                    border: "1px solid #F2F2F7",
                    fontSize: "14px",
                    color: "#8A8A8E",
                  }}
                >
                  {formData.category === "혈압"
                    ? "mmHg"
                    : formData.category === "혈당"
                    ? "mg/dL"
                    : formData.category === "체중"
                    ? "kg"
                    : formData.category === "심박수"
                    ? "bpm"
                    : formData.category === "체온"
                    ? "°C"
                    : "단위"}
                </div>
              </div>
            </div>

            {/* Severity Level */}
            <div className="space-y-2">
              <Label
                htmlFor="severity"
                style={{ fontSize: "14px", color: "#1C1C1E" }}
              >
                리스크 수준
              </Label>
              <Select
                value={formData.severity}
                onValueChange={(value) =>
                  setFormData({ ...formData, severity: value })
                }
                required
              >
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="리스크 수준 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="주의">주의</SelectItem>
                  <SelectItem value="위험">위험</SelectItem>
                  <SelectItem value="긴급">긴급</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label
                htmlFor="description"
                style={{ fontSize: "14px", color: "#1C1C1E" }}
              >
                규칙 설명
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="min-h-[100px] rounded-lg"
                style={{
                  borderColor: "#F2F2F7",
                  backgroundColor: "#FFFFFF",
                }}
                placeholder="이 규칙이 언제 적용되는지 설명해주세요..."
                required
              />
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
                규칙 미리보기
              </p>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: "14px", color: "#1C1C1E" }}>
                    {formData.title || "규칙 이름"}
                  </span>
                  <span
                    className="px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: "#E5E5EA",
                      color: "#8A8A8E",
                      fontSize: "11px",
                    }}
                  >
                    {formData.category || "카테고리"}
                  </span>
                </div>
                <p style={{ fontSize: "13px", color: "#8A8A8E" }}>
                  {formData.description || "규칙 설명"}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                onClick={onClose}
                className="flex-1 h-11 rounded-lg"
                style={{
                  backgroundColor: "#F2F2F7",
                  color: "#1C1C1E",
                }}
              >
                취소
              </Button>
              <Button
                type="submit"
                className="flex-1 h-11 rounded-lg"
                style={{
                  backgroundColor: "#007AFF",
                  color: "#FFFFFF",
                }}
              >
                저장
              </Button>
            </div>
          </form>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
