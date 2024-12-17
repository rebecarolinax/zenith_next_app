import { BannerLogin } from "@/components/BannerLoginPage/Index";
import { RecoverPasswordForm } from "@/components/RecoverPasswordForm";

export default function LoginPage() {
  return (
    <div className="h-screen w-full flex flex-row items-center justify-center overflow-hidden  bg-[#fbfbfb]">
      <BannerLogin />
      <RecoverPasswordForm />
    </div>
  );
}
