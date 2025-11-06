import { Activity, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Step1 from "@/components/modals/PasswordResetModal/Step1";
import Step2 from "@/components/modals/PasswordResetModal/Step2";

interface PasswordResetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PasswordResetModal({
  isOpen,
  onClose,
}: PasswordResetModalProps) {
  const [step, setStep] = useState<1 | 2>(1);

  const handleClose = () => {
    onClose();
    setStep(1);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    handleClose(); // Close modal after password reset
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="p-0 gap-0 max-w-[450px] rounded-2xl border-0 bg-white shadow-theme-100">
        <div className="p-12">
          <div className="flex items-center justify-between mb-8">
            <DialogTitle asChild>
              <h2 className="text-2xl text-theme-black-100">비밀번호 재설정</h2>
            </DialogTitle>
          </div>
          <Activity mode={step === 1 ? "visible" : "hidden"}>
            <Step1 handleSendEmail={handleSendEmail} />
          </Activity>
          <Activity mode={step === 2 ? "visible" : "hidden"}>
            <Step2 handleResetPassword={handleResetPassword} />
          </Activity>
        </div>
      </DialogContent>
    </Dialog>
  );
}
