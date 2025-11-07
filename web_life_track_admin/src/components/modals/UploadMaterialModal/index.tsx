import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, Upload, FileText } from "lucide-react";
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

interface UploadMaterialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function UploadMaterialModal({
  isOpen,
  onClose,
  onSubmit,
}: UploadMaterialModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    file: null as File | null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, file });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form
    setFormData({
      name: "",
      category: "",
      file: null,
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
            자료 업로드
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            새로운 자료를 업로드합니다
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
              자료 업로드
            </h2>

            {/* File Upload */}
            <div className="space-y-2">
              <Label style={{ fontSize: "14px", color: "#1C1C1E" }}>
                파일 선택
              </Label>
              <div
                className="relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                style={{ borderColor: "#F2F2F7" }}
                onClick={() =>
                  document.getElementById("material-upload")?.click()
                }
              >
                <input
                  id="material-upload"
                  type="file"
                  accept=".pdf,.doc,.docx,.hwp,.xls,.xlsx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {formData.file ? (
                  <div className="flex items-center justify-center gap-3">
                    <FileText size={24} style={{ color: "#007AFF" }} />
                    <div className="text-left">
                      <p style={{ fontSize: "14px", color: "#1C1C1E" }}>
                        {formData.file.name}
                      </p>
                      <p style={{ fontSize: "12px", color: "#8A8A8E" }}>
                        {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Upload
                      size={32}
                      className="mx-auto"
                      style={{ color: "#8A8A8E" }}
                    />
                    <div>
                      <p style={{ fontSize: "14px", color: "#1C1C1E" }}>
                        파일을 드래그하거나 클릭하여 선택하세요
                      </p>
                      <p
                        style={{
                          fontSize: "12px",
                          color: "#8A8A8E",
                          marginTop: "8px",
                        }}
                      >
                        지원 형식: Word, PDF, HWP, Excel
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Material Name */}
            <div className="space-y-2">
              <Label
                htmlFor="material-name"
                style={{ fontSize: "14px", color: "#1C1C1E" }}
              >
                자료 이름
              </Label>
              <Input
                id="material-name"
                type="text"
                placeholder="예: 혈압 관리 가이드라인 2025"
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
                  <SelectItem value="일반">일반</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 rounded-lg mt-6"
              style={{
                backgroundColor: "#007AFF",
                color: "#FFFFFF",
              }}
              disabled={!formData.file}
            >
              업로드
            </Button>
          </form>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
