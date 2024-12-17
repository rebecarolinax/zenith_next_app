"use client";
import React, { useEffect, useState } from "react";
// import { produce } from "immer";
import {
  ContainerCard,
  ContainerCardDrag,
  ContainerPlatform,
} from "@/components/Contain";
import { SmallTitle } from "@/components/Text";
import { ListDeveloper } from "@/components/List";
import { GraphicRisks } from "@/components/Graphic/Index";
import {
  api,
  createNewTeamProject,
  deleteTeamProject,
  getAllColaborators,
  getTeamProject,
  updateTeamProject,
} from "@/Services/Service";
// import { Bounce, ToastContainer, toast } from "react-toastify";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { calcularPorcentagemPorItem, gerarCor } from "@/Utils/StringFunctions";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ModalMoreInformations, ModalRiscosPorArea, ModalRiscosPorNivel } from "../Modal";
import { CarouselInfoAnalise } from "../CarouselInfoAnalise";

const GerarChartData = (skillList) => {
  const porcentagensSkill = calcularPorcentagemPorItem(skillList);

  // console.log(porcentagensRisco);

  const newChartData = Object.entries(porcentagensSkill).map(
    ([riskSkills, count], index) => ({
      riskSkills,
      count: Math.floor(parseFloat(count)),
      fill: gerarCor(index),
    })
  );

  return newChartData;
};

const CalcularNiveisRisco = (riscos) => {
  let arrayNiveisRiscos = [
    {
      nivel: "Baixo",
      qtd: 0,
      riscos: [],
    },
    {
      nivel: "Médio",
      qtd: 0,
      riscos: [],
    },
    {
      nivel: "Alto",
      qtd: 0,
      riscos: [],
    },
    {
      nivel: "Crítico",
      qtd: 0,
      riscos: [],
    },
  ];

  for (let i = 0; i < riscos.length; i++) {
    switch (riscos[i].nivel) {
      case 1:
        arrayNiveisRiscos = arrayNiveisRiscos.map((item) =>
          item.nivel === "Baixo"
            ? { ...item, qtd: item.qtd + 1, riscos: [...item.riscos, riscos[i]] }
            : item
        );
        break;

      case 2:
        arrayNiveisRiscos = arrayNiveisRiscos.map((item) =>
          item.nivel === "Médio"
            ? { ...item, qtd: item.qtd + 1, riscos: [...item.riscos, riscos[i]] }
            : item
        );
        break;

      case 3:
        arrayNiveisRiscos = arrayNiveisRiscos.map((item) =>
          item.nivel === "Alto"
            ? { ...item, qtd: item.qtd + 1, riscos: [...item.riscos, riscos[i]] }
            : item
        );
        break;

      case 4:
        arrayNiveisRiscos = arrayNiveisRiscos.map((item) =>
          item.nivel === "Crítico"
            ? { ...item, qtd: item.qtd + 1, riscos: [...item.riscos, riscos[i]] }
            : item
        );
        break;

      default:
        break;
    }
  }

  return arrayNiveisRiscos;
};

const DefinirAreasRisco = (riscos) => {
  let listaAreasRisco = [];

  listaAreasRisco.push({
    nome: riscos[0].area,
    qtd: 1,
    riscos: [riscos[0]],
  });

  for (let i = 0; i < riscos.length; i++) {
    let areaExiste = false;
    for (let j = 0; j < listaAreasRisco.length; j++) {
      if (riscos[i].area === listaAreasRisco[j].nome) {
        areaExiste = true;
      }
    }
    if (!areaExiste) {
      listaAreasRisco.push({
        nome: riscos[i].area,
        qtd: 1,
        riscos: [riscos[i]],
      });
    } else {
      listaAreasRisco = listaAreasRisco.map((item) =>
        item.nome === riscos[i].area
          ? { ...item, qtd: item.qtd + 1, riscos: [...item.riscos, riscos[i]] }
          : item
      );
    }
  }

  return listaAreasRisco;
};

const FiltrarListaDesenvolvedores = (
  todosDesenvolvedores,
  equipeDesenvolvedores
) => {
  let desenvolvedoresSemEquipe = [];
  console.log("todos os desenvolvedores", todosDesenvolvedores);
  console.log("equipe desenvolvedores", equipeDesenvolvedores);

  for (let i = 0; i < todosDesenvolvedores.length; i++) {
    let existe = false;
    for (let j = 0; j < equipeDesenvolvedores.length; j++) {
      if (
        equipeDesenvolvedores[j].idUsuario == todosDesenvolvedores[i].idUsuario
      ) {
        existe = true;
      }
    }
    if (!existe) {
      desenvolvedoresSemEquipe.push(todosDesenvolvedores[i]);
    }
  }

  console.log("desenvolvedores sem equipe", desenvolvedoresSemEquipe);

  return desenvolvedoresSemEquipe;
};

export default function TeamAnalysis({
  idProjeto,
  developersList,
  equipeObject,
  analise,
  risksSkillsList,
  nomeProjeto,
}) {
  const navigate = useRouter();
  const [developers, setDevelopers] = useState(
    equipeObject !== null
      ? FiltrarListaDesenvolvedores(developersList, equipeObject.colaboradores)
      : developersList
  );
  const [equipe, setEquipe] = useState(equipeObject);
  const [chartData, setChartData] = useState(GerarChartData(risksSkillsList));
  const [loading, setLoading] = useState(true);
  const [niveisRisco, setNiveisRisco] = useState(
    CalcularNiveisRisco(analise.riscos)
  );
  const [areasRisco, setAreasRisco] = useState(
    DefinirAreasRisco(analise.riscos)
  );

  const listDevelopers = async () => {
    try {
      const response = await api.get(getAllColaborators);
      setDevelopers(
        equipe !== null
          ? FiltrarListaDesenvolvedores(response.data, equipe.colaboradores)
          : response.data
      );
      console.log("api", response.data);
    } catch (error) {
      console.log("Erro", error);
    }
  };

  const BuscarEquipeProjeto = async (idProjeto) => {
    try {
      const response = await api.get(getTeamProject + `/${idProjeto}`);
      setEquipe(response.data);
      setTeam(response.data.colaboradores);
    } catch (erro) {
      console.log(erro);
    }
  };

  const [team, setTeam] = useState(
    equipeObject !== null ? equipeObject.colaboradores : []
  );

  const moveCard = (item, from, to) => {
    console.log(`Movendo de: ${from} para: ${to}`, item);

    if (from === "developers" && to === "team") {
      // setTeam((prev) =>
      // produce(prev, (draft) => {
      // draft.push(item)
      // })
      // );
      setDevelopers((prev) =>
        prev.filter((itm, _) => itm.idUsuario != item.idUsuario)
      );

      setTeam((prev) => [...prev, item]);
    } /*else if (from === 'team' && to === 'developers') {
      setTeam((prev) =>
        produce(prev, (draft) => {
          const index = draft.findIndex((member) => member.idUsuario === item.idUsuario);
          if (index !== -1) draft.splice(index, 1);
        })
      );

      setDevelopers((prev) =>
        produce(prev, (draft) => {
          draft.push(item);
        })
      );
    }*/
  };

  const notify = (metodo) =>
    toast.success(`Equipe ${metodo} com sucesso!`, {
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

  const notifyError = () =>
    toast.error("Erro ao definir equipe!", {
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

  const addTeam = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      const idDevelopers =
        team.length > 0 ? team.map((item) => item.idColaborador) : null;

      if (equipe === null) {
        await api.post(`${createNewTeamProject}/${idProjeto}`, idDevelopers);
        notify("cadastrada");
      } else if (idDevelopers === null) {
        await api.delete(`${deleteTeamProject}/${idProjeto}`);
        notify("Deletada");
      } else {
        await api.put(`${updateTeamProject}/${equipe.id}`, idDevelopers);
        notify("atualizada");
      }

      navigate.push(`/Platform/ProjectInformation/${idProjeto}`);
      window.location.href = `/Platform/ProjectInformation/${idProjeto}`;

      setTeam([]);
    } catch (error) {
      notifyError();
      console.log("Erro", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (developers.length == 0) {
      listDevelopers();
    }
    BuscarEquipeProjeto(idProjeto);
    setNiveisRisco(CalcularNiveisRisco(analise.riscos));
    setAreasRisco(DefinirAreasRisco(analise.riscos));
  }, []);

  useEffect(() => {
    console.log(equipe);

    console.log(developers);
  }, [developers]);

  return (
    <ContainerPlatform
      style={"flex justify-around pl-[250px] overflow-y-none mt-12"}
    >
      {/* <Card/> */}
      <div className="w-[400px] flex flex-col">
        <SmallTitle className={"mb-5 ml-6"}>Desenvolvedores</SmallTitle>

        <ListDeveloper
          team={team}
          moveCard={moveCard}
          developers={developers}
          onCardDrop={(item) => moveCard({ ...item, origin: "developers" })}
        />
      </div>

      {/* Caixa com gráfico */}
      <div className="w-[60%] h-[50%]">
        <SmallTitle>Análise de Riscos do Projeto</SmallTitle>
        <ContainerCard className="flex justify-center">
          <CarouselInfoAnalise className="w-[85%] h-full" analise={analise} nomeProjeto={nomeProjeto} areasRisco={areasRisco} niveisRisco={niveisRisco}/>
        </ContainerCard>

        <SmallTitle className={"mt-5"}>Definir Equipe</SmallTitle>
        <ContainerCardDrag
          onClick={addTeam}
          setDevelopers={setDevelopers}
          setTeam={setTeam}
          moveCard={moveCard}
          team={team}
          onCardDrop={(item) => moveCard({ ...item, origin: "team" })}
          textButton={
            equipeObject === null
              ? "Cadastra"
              : team.length === 0
              ? "Deleta"
              : "Atualiza"
          }
        />
      </div>

      <ToastContainer />
    </ContainerPlatform>
  );
}
