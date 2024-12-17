"use client";

import { api } from "@/Services/Service";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/AuthContext";
import { GraphicRiskLevel } from "@/components/Graphic/Index";
import { KanbanProjects } from "@/components/KanbanProjects";
import { OtherProjects } from "@/components/OtherProjects";
import { GraphicProjectTypeByPeriod } from "@/components/PeriodChart";
import { BounceLoader } from "react-spinners";  // Loader importado

export default function DashboardPage() {
  const { userData } = useContext(UserContext);

  const [chartData, setChartData] = useState([
    { typeRisk: "Low", count: 0, fill: "#4D8BFF" },
    { typeRisk: "Medium", count: 0, fill: "#FD9A30" },
    { typeRisk: "High", count: 0, fill: "#E53E3E" },
  ]);
  const [projectsList, setProjectsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Controla o estado de carregamento
  const [chartKey, setChartKey] = useState(0); // Força re-render do gráfico

  // Função para listar os projetos do usuário
  const ListProjectsByUser = async () => {
    try {
      console.log("Iniciando o carregamento..."); // Log para verificar
      setIsLoading(true); // Inicia o carregamento

      // Seleciona a URL com base no cargo do usuário
      const url =
        userData.cargo === "Administrador"
          ? `/Projeto/ListarTodos`
          : userData.cargo === "Gerente De Projetos"
            ? `/Projeto/ListarProjetosPeloUsuario/${userData.id}`
            : userData.cargo === "Colaborador"
              ? `/Projeto/ListarPeloColaborador/${userData.colaborador}`
              : null;

      if (!url) {
        console.warn("Cargo não reconhecido:", userData.cargo);
        return;
      }

      const response = await api.get(url);
      console.log("Resposta da API:", response.data); // Log para verificar resposta da API
      setProjectsList(response.data || []);
    } catch (error) {
      console.error("Erro na requisição:", error.response?.data || error.request || error.message);
    } finally {
      console.log("Finalizando carregamento..."); // Log para verificar que o carregamento terminou
      setIsLoading(false); // Finaliza o carregamento
    }
  };

  // Executa a função de listagem de projetos quando o userData muda
  useEffect(() => {
    console.log("Verificando userData:", userData); // Log para verificar userData
    if (userData?.id) {
      ListProjectsByUser();
    }
  }, [userData?.id]); // Garante que a função seja chamada quando o userData mudar

  // Cálculo dos dados do gráfico com base nos projetos
  useEffect(() => {
    console.log("isLoading mudou:", isLoading); // Log para verificar quando isLoading muda
    if (!isLoading && projectsList.length > 0) {
      const calculateRiskData = () => {
        const riskCounts = { Low: 0, Medium: 0, High: 0 };

        // Contagem dos projetos por nível de risco
        projectsList.forEach((project) => {
          if (project.nivelProjeto === "Baixo") riskCounts.Low += 1;
          if (project.nivelProjeto === "Médio") riskCounts.Medium += 1;
          if (project.nivelProjeto === "Alto") riskCounts.High += 1;
        });

        setChartData([
          { typeRisk: "Low", count: riskCounts.Low, fill: "#008000" },
          { typeRisk: "Medium", count: riskCounts.Medium, fill: "#FD9A30" },
          { typeRisk: "High", count: riskCounts.High, fill: "#ff0000" },
        ]);
        setChartKey((prevKey) => prevKey + 1);  // Força re-render do gráfico
      };

      calculateRiskData();
    }
  }, [isLoading, projectsList]); // Calcula os dados do gráfico quando a lista de projetos muda

  return (
    <div className="h-screen mt-16 overflow-scroll lg:h-[850px] overflow-x-hidden scrollbar-custom w-full">
      <div className="flex flex-col ml-[21%] gap-4 max-xl:ml-0 max-0xl:pt-4 h-[950px] lg:h-[500px]">
        {/* Exibe o loader enquanto os gráficos estão sendo carregados */}
        {isLoading ? (
          <div className="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50">
            <BounceLoader color="#2D60FF" size={60} />
          </div>
        ) : (
          <>
            <GraphicProjectTypeByPeriod userData={userData} />
            <div className="flex flex-row min-h-screen max-xl:flex-col max-xl:items-center lg:max-xl:justify-center mt-14">
              {/* Usando a chave "key" para forçar a reinicialização do gráfico */}
              <GraphicRiskLevel key={chartKey} chartData={chartData} />
              <KanbanProjects projectList={projectsList} />
            </div>
          </>
        )}
      </div>

      <div className="flex ml-[200px] lg:ml-[65px] flex-col max-xl:justify-center max-xl:items-center mt-[500px]">
        <OtherProjects />
      </div>
    </div>
  );
}
