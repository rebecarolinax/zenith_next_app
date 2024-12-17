"use client";

import React, { useContext } from "react";
import { Home, LayoutDashboard, UserRound } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "../Button";
import { usePathname, useRouter } from "next/navigation";
import { UserContext } from "@/context/AuthContext"; // Contexto para obter os dados do usuário

export function AppSidebar() {
  const { userData } = useContext(UserContext); // Obtém o cargo do usuário
  const router = useRouter();
  const pathname = usePathname(); // Obtém a rota atual

  if (!userData) {
    return null; // Ou um componente de carregamento caso necessário
  }

  // Define os itens do menu com base no cargo do usuário
  const getMenuItems = () => {
    switch (userData.cargo) {
      case "Administrador":
        return [
          { title: "Dashboard", url: "/Platform/Dashboard", icon: LayoutDashboard },
          { title: "Colaboradores", url: "/Platform/Professionals", icon: UserRound },
        ];
      case "Gerente De Projetos":
        return [
          { title: "Início", url: "/Platform/Home", icon: Home },
          { title: "Gráficos", url: "/Platform/Dashboard", icon: LayoutDashboard },
          { title: "Colaboradores", url: "/Platform/Professionals", icon: UserRound },
        ];
      case "Colaborador":
        return [
          { title: "Home", url: "/Platform/Home", icon: Home },
          { title: "Dashboard", url: "/Platform/Dashboard", icon: LayoutDashboard },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  // Verifique se deve exibir o botão de "Nova Análise"
  const showNewAnalysisButton = userData.cargo === "Gerente De Projetos";

  return (
    <Sidebar className="flex flex-col min-h-[100vh] w-[250px] items-center bg-white shadow-lg">
      <SidebarContent className="flex-grow">
        <SidebarGroup>
          <SidebarGroupContent className="flex items-center !justify-between">
            <SidebarMenu>
              {menuItems.map((item, index) => {
                const isSelected = pathname === item.url;

                return (
                  <SidebarMenuItem key={index} className="mb-4">
                    <SidebarMenuButton className="items-center" asChild>
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          router.push(item.url);
                        }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors cursor-pointer ${isSelected
                          ? "bg-blue-100 text-blue-600 font-semibold"
                          : "text-gray-600"
                          }`}
                      >
                        <div className="relative">
                          {isSelected && (
                            <span className="absolute -left-2 top-0 bottom-0 w-1 bg-blue-600 rounded-r-LG"></span>
                          )}
                          <item.icon
                            className={`h-5 w-5 ${isSelected ? "text-blue-600" : "text-gray-400"
                              }`}
                          />
                        </div>
                        <span>{item.title}</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {showNewAnalysisButton && (
          <div className="flex justify-center mb-5">
            <Button
              onClick={() => router.push("/Platform/RegisterAnalysis/")}
              className={
                "w-[148px] h-[45px] flex items-center justify-center rounded-[10px] bg-blue-600 text-white  hover:bg-[#1a47b7] transition duration-200 hover:scale-105 font-normal text-sm/[14px] !fixed bottom-10"
              }
              textbutton="Nova análise"
              fontWeight={"font-medium"}
            />
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
