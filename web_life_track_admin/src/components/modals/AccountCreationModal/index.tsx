import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AccountCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccountCreationModal({
  isOpen,
  onClose,
}: AccountCreationModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 gap-0 max-w-[450px] rounded-2xl border-0 bg-white shadow-theme-100">
        <div className="p-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <DialogTitle asChild>
              <h2 className="text-2xl text-theme-black-100">계정 생성</h2>
            </DialogTitle>
          </div>
          <DialogDescription className="sr-only">
            새로운 관리자 계정을 생성합니다
          </DialogDescription>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label className="text-sm text-theme-black-100" htmlFor="name">
                이름
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="이름을 입력하세요"
                className="h-11 rounded-lg border-theme-white-200 bg-white"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="signup-email"
                className="text-sm text-theme-black-100"
              >
                이메일 주소
              </Label>
              <Input
                id="signup-email"
                type="email"
                placeholder="example@company.com"
                className="h-11 rounded-lg border-theme-white-200 bg-white"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="signup-password"
                className="text-sm text-theme-black-100"
              >
                비밀번호
              </Label>
              <Input
                id="signup-password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                className="h-11 rounded-lg border-theme-white-200 bg-white"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-lg mt-6 text-[16px]"
            >
              계정 생성하기
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
