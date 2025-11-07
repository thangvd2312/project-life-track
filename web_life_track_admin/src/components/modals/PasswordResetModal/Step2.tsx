import { Button } from "@/components/ui/button";
import { DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Fragment } from "react/jsx-runtime";

interface IStep2Props {
  handleResetPassword: (e: React.FormEvent) => void;
}

const Step2 = (props: IStep2Props) => {
  const { handleResetPassword } = props;
  return (
    <Fragment>
      {/* Instruction Text */}
      <DialogDescription asChild>
        <p className="mb-6 text-sm text-theme-gray-100">
          새로운 비밀번호를 설정해주세요.
        </p>
      </DialogDescription>

      {/* Form */}
      <form onSubmit={handleResetPassword} className="space-y-5">
        {/* Verification Code Field */}
        <div className="space-y-2">
          <Label
            className="text-sm text-theme-black-100"
            htmlFor="verification-code"
          >
            인증 코드
          </Label>
          <Input
            id="verification-code"
            type="text"
            placeholder="인증 코드를 입력하세요"
            className="h-11 rounded-lg border-theme-white-200 bg-white"
          />
        </div>

        {/* New Password Field */}
        <div className="space-y-2">
          <Label
            className="text-sm text-theme-black-100"
            htmlFor="new-password"
          >
            새 비밀번호
          </Label>
          <Input
            id="new-password"
            type="password"
            placeholder="새 비밀번호를 입력하세요"
            className="h-11 rounded-lg border-theme-white-200 bg-white"
          />
        </div>

        {/* Confirm New Password Field */}
        <div className="space-y-2">
          <Label
            className="text-sm text-theme-black-100"
            htmlFor="confirm-password"
          >
            새 비밀번호 확인
          </Label>
          <Input
            id="confirm-password"
            type="password"
            placeholder="새 비밀번호를 다시 입력하세요"
            className="h-11 rounded-lg border-theme-white-200 bg-white"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-12 rounded-lg mt-6 text-[16px]"
        >
          비밀번호 변경 완료
        </Button>
      </form>
    </Fragment>
  );
};

export default Step2;
