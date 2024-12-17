import React, { useState, useEffect, useContext, useMemo } from "react";
import { SmallTitle } from "../Text";
import {
  api,
  getFutureProjectsRoute,
  getPastProjectsRoute,
  getProjectsNotInProgressRoute,
} from "@/Services/Service";
import { UserContext } from "@/context/AuthContext";
import Image from "next/image";
import { SelectValue } from "@radix-ui/react-select";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "../ui/select";
import { useRouter } from "next/navigation";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const SelectBlue2 = ({
  filterProjects,
  setFilterProjects,
  className,
}) => {
  return (
    <Select
      value={filterProjects}
      onValueChange={(value) => setFilterProjects(value)}
    >
      <SelectTrigger
        className={`w-[30%] border border-blue-700 rounded-[8px] ${className}`}
      >
        <SelectValue placeholder="Todos" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="All">Todos</SelectItem>
          <SelectItem value="Past">Passados</SelectItem>
          <SelectItem value="Future">Futuros</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export const OtherProjects = ({ className }) => {
  const [filterProjects, setFilterProjects] = useState("All");
  const [projects, setProjects] = useState([]);
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useRouter();

  // Função para filtrar projetos por data
  const filteredProjects = useMemo(() => {
    const today = new Date();
    if (filterProjects === "All") {
      return projects;
    } else if (filterProjects === "Past") {
      return projects.filter((project) => new Date(project.dataFinal) < today);
    } else if (filterProjects === "Future") {
      return projects.filter((project) => new Date(project.dataFinal) > today);
    }
    return [];
  }, [filterProjects, projects]);

  const notifyError = () =>
    toast.error("Erro ao carregar projetos!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

  async function getProjects() {
    try {
      const response = await api.get(
        filterProjects === "All"
          ? getProjectsNotInProgressRoute +
          `/${userData?.cargo !== "Administrador" ? userData?.id : ""}`
          : filterProjects === "Past"
            ? getPastProjectsRoute +
            `/${userData?.cargo !== "Administrador" ? userData?.id : ""}`
            : getFutureProjectsRoute +
            `/${userData?.cargo !== "Administrador" ? userData?.id : ""}`
      );
      setProjects(response.data.reverse());
    } catch (error) {
      console.log(error);
      notifyError();
    }
  }

  useEffect(() => {
    const usuario = localStorage.getItem("usuario");

    if (usuario) {
      setUserData(JSON.parse(usuario));
    }
  }, []);

  useEffect(() => {
    if (userData) {
      getProjects();
    }
  }, [userData, filterProjects]);

  useEffect(() => {
    console.log("oi é o drak", projects[0]?.tecnologias);
  }, [projects]);

  return (
    <main className={`w-[90%] flex flex-col items-center px-4 mr-0 ml-28 mt-14 ${className}`}>
      <div className="w-full max-w-screen-lg">
        <h2 className="text-2xl font-semibold mb-4 text-[#343C6A]">
          Outros projetos
        </h2>

        <SelectBlue2
          filterProjects={filterProjects}
          setFilterProjects={setFilterProjects}
        />

        {/* Grid para exibir projetos */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-[188px] gap-y-6 lg:gap-y-9">
          {filteredProjects.map((project, index) => {
            const teamPhotos = project.equipe?.colaboradores?.map(
              (colaborador) => colaborador.foto
            );
            const visiblePhotos = teamPhotos?.slice(0, 2);
            const remainingCount =
              teamPhotos?.length > 2 ? teamPhotos.length - 2 : 0;

            return (
              <div className=" w-[450px] lg:w-[550px]">
                <div
                  key={index}
                  className="bg-white rounded-[25px] p-6 w-[100%] shadow-sm"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {project.nome}
                    </h3>
                  </div>

                  <div className="mb-4">
                    <div className="flex gap-32">
                      <SmallTitle className="text-sm font-medium mb-2">
                        Equipe
                      </SmallTitle>
                    </div>

                    {/* Exibição das fotos dos colaboradores */}
                    <div className="w-[70%] h-[75px] bg-[#fbfbfb] rounded-[25px] overflow-hidden flex justify-center items-center p-0 mb-2">
                      <div className="w-[340px] h-[65px] bg-[#F5F7FA] rounded-[25px] flex items-center justify-center space-x-3">
                        {project.equipe ? (
                          <div className="flex items-center space-x-3">
                            {visiblePhotos &&
                              visiblePhotos.map((foto, index) => (
                                <div
                                  key={index}
                                  className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 relative"
                                >
                                  <Image
                                    src={foto}
                                    alt={`Foto ${index + 1}`}
                                    layout="fill"
                                    objectFit="cover"
                                    quality={100}
                                  />
                                </div>
                              ))}

                            {remainingCount > 0 && (
                              <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 relative bg-[#718EBF] flex items-center justify-center text-[#FFFFFF] font-bold">
                                +{remainingCount}
                              </div>
                            )}
                          </div>
                        ) : (
                          <p>Equipe não definida</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      className="bg-blue-500 text-white py-2 px-4 rounded-[10px] hover:bg-[#1a47b7] transition duration-200 hover:scale-105"
                      onClick={() =>
                        navigate.push(
                          `/Platform/ProjectInformation/${project.id}`
                        )
                      }
                    >
                      Ver mais
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ToastContainer />
    </main>
  );
};
