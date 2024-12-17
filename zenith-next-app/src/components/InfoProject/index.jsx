"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useRouter } from "next/navigation";
import { Button, ButtonDelete, ButtonEdit } from "../Button";
import { ContainerCard } from "../Contain";
import { GraphicRisks } from "../Graphic/Index";
import {
  InputInformation,
  InputInformationFull,
  InputInformationMultiples,
  InputProject,
} from "../Input";
import { TeamCardProject } from "../TeamCard";
import { SmallTitle } from "../Text";
import { ClockComponent, Cronograma } from "../WhiteCard";
import { useState } from "react";
import moment from "moment";
import { api, deleteProjetct } from "@/Services/Service";
import { CarouselInfoAnalise } from "../CarouselInfoAnalise";

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
            ? {
                ...item,
                qtd: item.qtd + 1,
                riscos: [...item.riscos, riscos[i]],
              }
            : item
        );
        break;

      case 2:
        arrayNiveisRiscos = arrayNiveisRiscos.map((item) =>
          item.nivel === "Médio"
            ? {
                ...item,
                qtd: item.qtd + 1,
                riscos: [...item.riscos, riscos[i]],
              }
            : item
        );
        break;

      case 3:
        arrayNiveisRiscos = arrayNiveisRiscos.map((item) =>
          item.nivel === "Alto"
            ? {
                ...item,
                qtd: item.qtd + 1,
                riscos: [...item.riscos, riscos[i]],
              }
            : item
        );
        break;

      case 4:
        arrayNiveisRiscos = arrayNiveisRiscos.map((item) =>
          item.nivel === "Crítico"
            ? {
                ...item,
                qtd: item.qtd + 1,
                riscos: [...item.riscos, riscos[i]],
              }
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

export default function InfoProject({ projeto, analise, style }) {
  const navigate = useRouter();
  const [chartData, setChartData] = useState([]);
  const [riscos, setRiscos] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  function mapearRiscosParaChartData(item) {
    const cores = {
      Infraestrutura: "#66b3ff",
      Gerenciamento: "#E00004",
    };

    const response = [];

    item.forEach((risco) => {
      const existente = response.find(
        (item) => item.typeRisk === risco.areaRisco
      );

      if (existente) {
        existente.percentage += risco.nivelRisco;
      } else {
        response.push({
          typeRisk: risco.areaRisco,
          percentage: risco.nivelRisco,
          fill: cores[risco.areaRisco] || "#cccccc",
        });
      }
    });

    return setChartData(response);
  }

  const AtualizarProjeto = async () => {
    navigate.push(`/Platform/RegisterAnalysis/${projeto.id}`);
  };

  const DeletarProjeto = async () => {
    try {
      await api.delete(`${deleteProjetct}/${projeto.id}`);
      navigate.push("/Platform/Home");
    } catch (erro) {
      console.log(erro);
    }
  };

  return (
    <div className={`pb-7 ${style}`}>
      {/* Header */}
      <div className="w-[95%] h-[90%] flex justify-between items-center mt-12 lg:mt-5">
        <SmallTitle>{projeto.nome}</SmallTitle>
        <div className="lg:w-[10.5%] sm:w-[25%] flex justify-between ">
          <ButtonEdit onClick={AtualizarProjeto} />
          <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <DialogTrigger asChild>
              <ButtonDelete />
            </DialogTrigger>
            <DialogContent className="bg-white border border-blue-700 w-[500px]">
              <DialogHeader>
                <DialogTitle>Confirmar Exclusão</DialogTitle>
                <DialogDescription>
                  Tem certeza de que deseja excluir este projeto? Esta ação não
                  pode ser desfeita.
                </DialogDescription>
              </DialogHeader>
              <div className="flex mt-4 justify-center items-center">
                <Button
                  className=" w-[80%] justify-center items-center px-4 py-2 bg-red-500 !text-white rounded hover:bg-red-600"
                  onClick={DeletarProjeto}
                >
                  Excluir
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <ContainerCard style={"95%"}>
        <SmallTitle classname={"pt-2 pl-2"}>Descrição</SmallTitle>
        <div className="w-[100%] flex flex-col lg:flex-row pt-3 mr-20">
          <InputInformation
            nomeProjeto={projeto.nome}
            value={projeto.descricao}
          />

          <div className="flex w-[75%] gap-9 mt-2 ml-2">
            <Cronograma
              data={{
                dataInicio: moment(projeto.dataInicio).format("DD/MM/YYYY"),
                dataFinal: moment(projeto.dataFinal).format("DD/MM/YYYY"),
              }}
            />
            <div className="w-full">
              <ClockComponent
                data={{
                  dataInicio: projeto.dataInicio,
                  dataFinal: projeto.dataFinal,
                }}
              />
            </div>
          </div>
        </div>

        <div className=" py-3 px-3 lg:w-[100%] flex flex-col lg:flex-row justify-between items-center mt-5 gap-8">
          <InputProject value={projeto.tipoProjeto} label={"Tipo do Projeto"} />
          <InputInformationMultiples
            values={projeto.funcionalidades.map((item) => item.descricao)}
            label={"Principais funcionalidades"}
          />
          <InputInformationMultiples
            values={projeto.tecnologias.map((item) => item.nomeTecnologia)}
            label={"Tecnologias usadas"}
          />
        </div>
      </ContainerCard>

      <SmallTitle className="!pt-5">Análise de Riscos</SmallTitle>

      <div className=" w-[95%] flex gap-4 mb-10">
        {analise ? (
          <>
            <ContainerCard style={"500px"} className="flex justify-center !h-[550px]">
              <CarouselInfoAnalise
                analysisPage
                className="h-full w-[85%]"
                analise={analise}
                areasRisco={DefinirAreasRisco(analise.riscos)}
                niveisRisco={CalcularNiveisRisco(analise.riscos)}
                nomeProjeto={projeto.nome}
              />
            </ContainerCard>

            <div className="w-[650px] flex flex-col h-[10%] mb-10">
              <ContainerCard>
                <InputInformationFull
                  seeMoreStyle={"w-full flex justify-end"}
                  nomeProjeto={projeto.nome}
                  label={"Análise geral"}
                  value={analise.descricao}
                />
              </ContainerCard>

              <TeamCardProject
                onclick={() =>
                  navigate.push(`/Platform/Defineteam/${projeto.id}`)
                }
                team={projeto.equipe}
              />
            </div>
          </>
        ) : (
          <p>O projeto não possui análise</p>
        )}
      </div>
    </div>
  );
}
