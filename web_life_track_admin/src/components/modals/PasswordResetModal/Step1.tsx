import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface IStep1Props {
  handleSendEmail: (e: React.FormEvent) => void;
}

const Step1 = (props: IStep1Props) => {
  const { handleSendEmail } = props;
  return (
    <Fragment>
      <DialogDescription asChild>
        <p className="mb-6 text-sm text-theme-gray-100">
          가입하신 이메일 주소를 입력해주세요.
        </p>
      </DialogDescription>

      <form onSubmit={handleSendEmail} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="reset-email text-sm text-theme-black-100">
            이메일 주소
          </Label>
          <Input
            id="reset-email"
            type="email"
            placeholder="example@company.com"
            className="h-11 rounded-lg border-theme-white-200 bg-white"
          />
        </div>

        <Button
          type="submit"
          className="w-full h-12 rounded-lg mt-6 text-[16px]"
        >
          인증 메일 발송
        </Button>
      </form>
    </Fragment>
  );
};

export default Step1;
