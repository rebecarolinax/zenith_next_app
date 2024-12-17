"use client";
import { useEffect, useState } from "react";
import { TotalProject } from "../TotalProject";

export const KanbanProjects = ({ projectList }) => {
  const [isSelected, setIsSelected] = useState("All"); // Controle da tab selecionada
  const [totalProjects, setTotalProjects] = useState(0);
  const [completedProjects, setCompletedProjects] = useState(0);
  const [projectsInProgress, setProjectsInProgress] = useState(0);

  // Filtra os projetos com base no nível de risco
  const filterProjectsByRisk = (projects, riskLevel) => {
    if (!riskLevel) return projects; // Se nenhum filtro for selecionado, retorna todos os projetos
    return projects.filter(project => project.nivelProjeto === riskLevel);
  };

  // Contabiliza o total, concluídos e em andamento
  const StatusProjectsAll = (filteredProjects) => {
    const hoje = new Date();
    let total = 0;
    let concluidos = 0;
    let emProgresso = 0;

    filteredProjects.forEach((project) => {
      const dataInicial = new Date(project.dataInicio);
      const dataFinal = new Date(project.dataFinal);

      if (dataInicial && dataFinal) total += 1;

      if (dataFinal < hoje) {
        concluidos += 1; // O projeto foi concluído
      } else if (dataInicial <= hoje && dataFinal >= hoje) {
        emProgresso += 1; // O projeto está em andamento
      }
    });

    setTotalProjects(total);
    setCompletedProjects(concluidos);
    setProjectsInProgress(emProgresso);
  };

  useEffect(() => {
    if (projectList != null) {
      // Filtra a lista de projetos de acordo com o risco selecionado
      const filteredProjects = filterProjectsByRisk(
        projectList,
        isSelected === "All"
          ? "" // Se "All" for selecionado, retorna todos os projetos
          : isSelected === 1
            ? "Baixo"
            : isSelected === 2
              ? "Médio"
              : isSelected === 3
                ? "Alto"
                : ""
      );
      StatusProjectsAll(filteredProjects);
    }
  }, [projectList, isSelected]);

  return (
    <main className=" max-xl:w-[80%] pt-8 lg:w-[70%] ">
      <div className=" ml-[210px] w-[78%] lg:ml-0 flex flex-col bg-[#FBFBFB] rounded-[25px] lg:w-[620px] h-[420px] border-transparent items-center shadow-sm">
        <div className="flex flex-row pb-[90px] pt-[65px] w-[90%] justify-between items-center">
          <h1 className="text-[24px] text-[#343C6A] font-semibold">Visão geral</h1>
          <div className="flex flex-row gap-5">
            <p
              className={`${isSelected === "All"
                ? "relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-full after:bg-[#0000ff] after:rounded-full"
                : ""
                } cursor-pointer`}
              onClick={() => setIsSelected("All")}
            >
              Totais
            </p>
            <p
              className={`${isSelected === 1
                ? "relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-full after:bg-[#008000] after:rounded-full"
                : ""
                } cursor-pointer`}
              onClick={() => setIsSelected(1)}
            >
              Baixos
            </p>
            <p
              className={`${isSelected === 2
                ? "relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-full after:bg-[#FFA500] after:rounded-full"
                : ""
                } cursor-pointer`}
              onClick={() => setIsSelected(2)}
            >
              Médios
            </p>
            <p
              className={`${isSelected === 3
                ? "relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-full after:bg-[#ff0000] after:rounded-full"
                : ""
                } cursor-pointer`}
              onClick={() => setIsSelected(3)}
            >
              Altos
            </p>
          </div>
        </div>

        <div className="flex flex-row justify-between gap-5 w-[90%]">
          <TotalProject
            text={"Projetos Totais"}
            projects={totalProjects}
            styles={`
    ${isSelected === "All" ? "bg-[#0000ff] text-[#fbfbfb] border-[#0000ff]" : ""}
    ${isSelected === 1 ? "bg-[#008000] text-[#fbfbfb] border-[#008000]" : ""}
    ${isSelected === 2 ? "bg-[#FFA500] text-[#fbfbfb] border-[#FFA500]" : ""}
    ${isSelected === 3 ? "bg-[#ff0000] text-[#fbfbfb] border-[#ff0000]" : ""}
    transition-all duration-300 hover:scale-110
  `}
          />
          <TotalProject
            text={"Projetos Completos"}
            projects={completedProjects}
            styles={`
    ${isSelected === "All" ? "bg-[#0000ff] text-[#fbfbfb] border-[#0000ff]" : ""}
    ${isSelected === 1 ? "bg-[#008000] text-[#fbfbfb] border-[#008000]" : ""}
    ${isSelected === 2 ? "bg-[#FFA500] text-[#fbfbfb] border-[#FFA500]" : ""}
    ${isSelected === 3 ? "bg-[#ff0000] text-[#fbfbfb] border-[#ff0000]" : ""}
    transition-all duration-300 hover:scale-110
  `}
          />
          <TotalProject
            text={"Projetos em Progresso"}
            projects={projectsInProgress}
            styles={`
    ${isSelected === "All" ? "bg-[#0000ff] text-[#fbfbfb] border-[#0000ff]" : ""}
    ${isSelected === 1 ? "bg-[#008000] text-[#fbfbfb] border-[#008000]" : ""}
    ${isSelected === 2 ? "bg-[#FFA500] text-[#fbfbfb] border-[#FFA500]" : ""}
    ${isSelected === 3 ? "bg-[#ff0000] text-[#fbfbfb] border-[#ff0000]" : ""}
    transition-all duration-300 hover:scale-110  
  `}
          />
        </div>
      </div>
    </main>
  );
};
