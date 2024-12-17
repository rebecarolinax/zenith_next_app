"use client";
import { useState, useEffect, useContext } from "react";
import { ContainerPlatform } from "@/components/Contain";
import { UserContext } from "@/context/AuthContext";
import { api, getProjectsInProgressRoute } from "@/Services/Service";
import { BounceLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LottieAnimation from "@/components/LottieAnimation";
import Carousel from "@/components/Carousel";
import { SmallTitle } from "@/components/Text";
import { OtherProjects } from "@/components/OtherProjects";

export default function Home() {
  const { userData, setUserData } = useContext(UserContext);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false); // Verificação para renderizar no cliente

  useEffect(() => {
    setIsClient(true); // Garantir que o código só execute no cliente
  }, []);

  useEffect(() => {
    if (userData) {
      async function getProjectsInProgress() {
        setLoading(true);
        try {
          const response = await api.get(getProjectsInProgressRoute + `/${userData?.id}`);
          setProjects(response.data);
        } catch (error) {
          toast.error("Erro ao carregar projetos!");
        } finally {
          setLoading(false);
        }
      }
      getProjectsInProgress();
    }
  }, [userData]);

  if (!isClient) return null; // Evitar renderização no servidor

  return (
    <ContainerPlatform style={"!pl-0 "}>
      <div className="flex flex-col justify-end items-center pt-3 ">
        {loading ? (
          <div className="flex flex-col gap-5 justify-center items-center lg:ml-60 lg:mt-8">
            <SmallTitle>Buscando projetos em andamento...</SmallTitle>
            <BounceLoader color="#2D60FF" />
          </div>
        ) : projects.length === 0 ? (
          <div className="justify-center items-center lg:ml-60 lg:mt-8">
            <SmallTitle>Não há projetos em andamento para o seu perfil</SmallTitle>
            <LottieAnimation
              src="https://lottie.host/736e7585-6442-47d5-a931-47787a0be70a/SDfPmJ732F.json"
              style={{ height: 100, width: 100 }}
            />
          </div>
        ) : (
          <div className="w-full h-full flex flex-col">
            <SmallTitle className={"mb-4"}>Projetos em andamento</SmallTitle>
            <Carousel slides={projects} />
          </div>
        )}

        <OtherProjects className="mt-5" data={projects} />
      </div>

      {isClient && <ToastContainer />}
    </ContainerPlatform>
  );
}
