import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultLogo from "@/assets/svgs/logo.svg";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AccountCreationModal } from "@/components/modals/AccountCreationModal";
import { PasswordResetModal } from "@/components/modals/PasswordResetModal";

const LoginPage = () => {
  const navigate = useNavigate();

  const [isOpenAccountCreationModal, setIsOpenAccountCreationModal] =
    useState(false);

  const [isOpenPasswordResetModal, setIsOpenPasswordResetModal] =
    useState(false);

  function handleLogin(e: React.FormEvent) {
    // TODO: login
    e.preventDefault();
    navigate("/dashboard");
  }

  return (
    <Fragment>
      <div className="min-h-screen flex items-center justify-center bg-theme-white-100">
        <div className="w-full max-w-[400px] p-12 rounded-2xl bg-white shadow-theme-100">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="relative">
              <DefaultLogo />
            </div>
            <span className="text-3xl tracking-tight text-primary">
              HealthLab
            </span>
          </div>

          <h1 className="text-center mb-8 text-2xl text-theme-black-100">
            관리자 로그인
          </h1>
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label className="text-sm text-theme-black-100" htmlFor="email">
                이메일 주소
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="example@company.com"
                className="h-11 rounded-lg border-theme-white-200 bg-white"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm text-theme-black-100"
              >
                비밀번호
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                className="h-11 rounded-lg border-theme-white-200 bg-white"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-lg mt-6 text-[16px]"
            >
              로그인
            </Button>
          </form>

          <div className="mt-6 text-center">
            <a
              href="#"
              className="hover:opacity-70 transition-opacity text-sm text-theme-gray-100"
              onClick={(e) => {
                e.preventDefault();
                setIsOpenAccountCreationModal(true);
              }}
            >
              계정 생성
            </a>
            <span className="mx-3 text-theme-gray-100">|</span>
            <a
              href="#"
              className="hover:opacity-70 transition-opacity text-sm text-theme-gray-100"
              onClick={(e) => {
                e.preventDefault();
                setIsOpenPasswordResetModal(true);
              }}
            >
              비밀번호 재설정
            </a>
          </div>
        </div>
      </div>

      <AccountCreationModal
        isOpen={isOpenAccountCreationModal}
        onClose={() => setIsOpenAccountCreationModal(false)}
      />

      <PasswordResetModal
        isOpen={isOpenPasswordResetModal}
        onClose={() => setIsOpenPasswordResetModal(false)}
      />
    </Fragment>
  );
};

export default LoginPage;
