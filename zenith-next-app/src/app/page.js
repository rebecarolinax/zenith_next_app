"use client";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Garantir que estamos no lado do cliente
  }, []);

  if (!isClient) {
    return null; // Retorna null até que o componente seja renderizado no cliente
  }

  return (
    <div className="h-screen bg-[#fbfbfb] w-screen flex flex-row items-center justify-center overflow-hidden">
      <BannerLogin />
      <UserProvider>
        <LoginForm />
      </UserProvider>
    </div>
  );
}
