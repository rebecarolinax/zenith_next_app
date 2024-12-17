"use client";
import { BannerLogin } from "@/components/BannerLoginPage/Index";
import { AuthenticationButton, Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { LoginForm } from "@/components/LoginForm/Index";
import { Modal } from "@/components/Modal/Index";
import { Graphic, GraphicRiskLevel } from "@/components/Graphic/Index";
import { KanbanProjects, TotalProjects } from "@/components/KanbanProjects";
// import { Button } from "@/components/Button";
import { OtherProjects } from "@/components/OtherProjects";
import { RiskAnalysis } from "@/components/RiskAnalysis";
import { TeamCard } from "@/components/TeamCard";
import { WhiteCard } from "@/components/WhiteCard";
import { useContext, useEffect, useState } from "react";
import { Container, ContainerPlatform } from "@/components/Contain";
import { ModalProfessionalsSchema } from "@/components/Modal";
import {
  api,
  getAllProjectsRoute,
  getProjectByUserIdRoute,
  getProjectsInProgressRoute,
} from "@/Services/Service";
import { UserContext } from "@/context/AuthContext";
import Carousel from "@/components/Carousel";
import { SmallTitle } from "@/components/Text";
import LottieAnimation from "@/components/LottieAnimation";
import { BounceLoader } from "react-spinners";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const { userData, setUserData } = useContext(UserContext);
  // const idUsuario = '239891e2-e545-4a1d-8648-6a6997dd08d2'
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  // const slidesData = [
  //   {
  //     title: "Projeto 1",
  //     description: "Descrição do projeto 1",
  //     image: "/img1.jpg",
  //   },
  //   {
  //     title: "Projeto 2",
  //     description: "Descrição do projeto 2",
  //     image: "/img2.jpg",
  //   },
  //   {
  //     title: "Projeto 3",
  //     description: "Descrição do projeto 3",
  //     image: "/img3.jpg",
  //   },
  // ];

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

  async function getProjectsInProgress() {
    setLoading(true);

    await api
      .get(
        getProjectsInProgressRoute +
        `/${userData?.cargo != "Administrador" ? userData?.id : ""}`
      )
      .then(async (response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.log(error);
        notifyError();
      })

    setLoading(false)
  }

  useEffect(() => {
    if (userData) {
      getProjectsInProgress();
    }
  }, [userData]);

  useEffect(() => {
    const usuario = localStorage.getItem("usuario");

    if (usuario) {
      setUserData(JSON.parse(usuario));
      // console.log(usuario);
    }
  }, []);

  return (
    <ContainerPlatform style={"!pl-0 "}>
      {/* <div className="flex items-end justify-end p-8">
        <Button className="font-semibold w-[12%] h-[45px] mt-24">New Analysis</Button>
        <ModalProfessionalsSchema />
      </div> */}

      {/* <p>{userData?.nome ?? "asdfsdaf"}</p> */}

      <div className="flex flex-col justify-end items-center pt-3 ">
        {loading ? (
          <div className="flex flex-col gap-5 justify-center items-center lg:ml-60 lg:mt-8">
            <SmallTitle className="">
              Buscando projetos em andamento...
            </SmallTitle>
            <BounceLoader color="#2D60FF" />
          </div>
        ) : projects.length <= 0 ? (
          // <p className="text-[#343C6A] font-semibold text-[25px]">
          //   There are no projects in progress...
          // </p>
          <div className="justify-center items-center lg:ml-60 lg:mt-8">
            <SmallTitle className="">
              Não há projetos em andamento para o seu perfil
            </SmallTitle>
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
      <ToastContainer />
    </ContainerPlatform>
  );
}
