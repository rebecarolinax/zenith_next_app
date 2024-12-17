"use client";
import { AppSidebar } from "@/components/Aside";
import { Header } from "@/components/Header";
import { UserProvider } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Spinner from "react-spinner";
import { UserContext } from "@/context/AuthContext"; // Importe o contexto

export default function PlatformLayout({ children }) {
  const [loading, setLoading] = useState(true); // Estado de carregamento

  const { userData } = useContext(UserContext); // Acessa o userData do contexto

  useEffect(() => {
    if (userData) {
      setLoading(false); // Termina o carregamento assim que os dados estiverem disponíveis
    }
  }, [userData]); // Quando userData mudar, define o estado de loading para false

  // const pathname = usePathname();

  // Exibe o Spinner enquanto os dados do usuário não estão carregados
  if (loading) {
    return <Spinner />;
  }

  const mapPathnameToName = (pathname) => {

    const nameMap = {
      Dashboard: "Gráficos",
      Defineteam: "Definição de Equipe", 
      Home: "Início",
      RegisterAnalysis: "Registrar Análise",
      Professionals: "Colaboradores",
      ProjectInformation: "Informações do Projeto",
    };
  
    const defaultName = pathname.slice(10).split("/")[0];
    return nameMap[defaultName] || defaultName; 
  };
  
  const pathname = usePathname();
  const namePage = mapPathnameToName(pathname);

  return (
    <UserProvider>
      {userData ? (
        <div className="fixed w-full">
          <Header
            namePage={namePage}
            userImage={userData.foto} // Usando a foto diretamente do userData
          />

          <AppSidebar/>

          <div className="h-[1200px] lg:h-[720px] border-none overflow-y-auto pt-[5%]">{children}</div>
        </div>
      ) : (
        <div className="fixed w-full h-full flex items-center justify-center bg-gray-100">
          <p className="text-red-500 text-lg">
            Erro ao carregar os dados do usuário. Tente novamente mais tarde.
          </p>
        </div>
      )}
    </UserProvider>
  );
}
