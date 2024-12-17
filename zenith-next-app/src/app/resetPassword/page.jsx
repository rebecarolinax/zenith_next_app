import { BannerLogin } from "@/components/BannerLoginPage/Index";
import { ResetPasswordForm } from "@/components/ResetPasswordForm";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="h-screen w-full flex flex-row items-center justify-center overflow-hidden">
      <BannerLogin />
      <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
