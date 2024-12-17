import { BannerLogin } from "@/components/BannerLoginPage/Index";
import { LoginForm } from "@/components/LoginForm/Index";
import { UserProvider } from "@/context/AuthContext";

export default function LoginPage() {
  return (
    <div className="h-screen bg-[#fbfbfb] w-screen flex flex-row items-center justify-center overflow-hidden">
      <BannerLogin />
      <UserProvider>
        <LoginForm />
      </UserProvider>
    </div>
  );
}