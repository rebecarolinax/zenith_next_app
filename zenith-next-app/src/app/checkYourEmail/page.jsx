import { BannerLogin } from "@/components/BannerLoginPage/Index";
import { CheckYourEmailForm } from "@/components/CheckYourEmail";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="h-screen w-full flex flex-row items-center justify-center overflow-hidden bg-[#fbfbfb]">
      <BannerLogin />
      {/* Envolvendo o CheckYourEmailForm em Suspense */}
      <Suspense fallback={<div>Loading...</div>}>
        <CheckYourEmailForm />
      </Suspense>
    </div>
  );
}
