"use client";
import {
  InputTypeSelectExterno,
  InputTypeSelectInterno,
} from "@/components/InputsSelect";

import { useContext, useState } from "react";
import { Button } from "@/components/Button";
import { Calendar } from "@/components/ui/calendar";
import { Input, Textarea } from "@/components/Input";
import { SmallTitle, SubTitle } from "@/components/Text";

import { UserContext } from "@/context/AuthContext";
import { addNewProject, api, updateProject } from "@/Services/Service";
import moment from "moment";
import { useRouter } from "next/navigation";
import { DotLoader } from "react-spinners";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FormAddProject({
  allTechSkills,
  allTypesProject,
  editMode = false,
  project = null,
}) {
  const { userData } = useContext(UserContext);
  const navigate = useRouter();

  const [loadingCadastro, setLoadingCadastro] = useState(false);

  const [novaAnaliseData, setNovaAnaliseData] = useState({
    nome: editMode ? project.nome : "",
    descricao: editMode ? project.descricao : "",
    tipoProjeto: editMode ? project.tipoProjeto : "",
    dataInicio: editMode ? new Date(project.dataInicio) : new Date(),
    dataFinal: editMode ? new Date(project.dataFinal) : new Date(),
  });

  const [funcionalidadesSelecionadas, setFuncionalidadesSelecionadas] =
    useState(
      editMode
        ? project.funcionalidades !== null
          ? project.funcionalidades.map((item) => {
            return {
              value: item.descricao.toLowerCase(),
              label: item.descricao,
            };
          })
          : []
        : []
    );

  const [tecnologiasSelecionadas, setTecnologiasSelecionadas] = useState(
    editMode
      ? project.tecnologias !== null
        ? project.tecnologias.map((item) => {
          return {
            value: item.nomeTecnologia.toLowerCase(),
            label: item.nomeTecnologia,
          };
        })
        : []
      : []
  );

  const notify = (metodo) =>
    toast.success(`Projeto ${metodo} com sucesso!`, {
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

  const notifyError = (metodo) =>
    toast.error(`Erro ao ${metodo} projeto!`, {
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

  const CadastrarProjeto = async () => {
    setLoadingCadastro(true);

    const data = {
      ...novaAnaliseData,
      funcionalidades: funcionalidadesSelecionadas.map((item) => item.label),
      tecnologias: tecnologiasSelecionadas.map((item) => item.label),
    };

    await api
      .post(`${addNewProject}/${userData.id}`, data)
      .then((response) => {
        console.log(response.data);
        notify("cadastrado");
        navigate.push(`/Platform/ProjectInformation/${response.data}`);
      })
      .catch((erro) => {
        console.log(erro);
        notifyError("cadastrar");
        setLoadingCadastro(false);
      });
  };

  const AtualizarProjeto = async () => {
    setLoadingCadastro(true);

    const data = {
      ...novaAnaliseData,
      funcionalidades: funcionalidadesSelecionadas.map((item) => item.label),
      tecnologias: tecnologiasSelecionadas.map((item) => item.label),
    };

    await api
      .put(`${updateProject}/${project.id}`, data)
      .then((response) => {
        console.log(response.data);
        notify("atualizado");
        navigate.push(`/Platform/ProjectInformation/${project.id}`);
      })
      .catch((erro) => {
        console.log(erro);
        notifyError("atualzar");
        setLoadingCadastro(false);
      });
  };

  return (
    <div>
      {!loadingCadastro ? (
        <div className="bg-[#FBFBFB] rounded p-4 sm:p-6 md:p-8 w-[95%] h-[98%] ml-20 lg:ml-0 mt-4 lg:mt-0">
          <div className="grid lg:grid-flow-row lg:grid-cols-2 gap-2 md:grid-flow-col md:grid-rows-2 lg:grid-rows-1">
            {/* Inputs e Calendários */}
            <div className="grid col-span-1 md:col-span-2 lg:col-span-1">
              <Input
                value={novaAnaliseData.nome}
                onChange={(event) =>
                  setNovaAnaliseData({
                    ...novaAnaliseData,
                    nome: event.target.value,
                  })
                }
                label={"Nome do projeto"}
                placeholder={"Insira o nome do projeto..."}
                className="text-sm md:text-base"
                style={"w-[400px] lg:w-[540px]"}
              />

              <div className="flex flex-col lg:grid grid-cols-2 gap-6 ">
                <div>
                  <SmallTitle className="text-sm">Data inicial</SmallTitle>
                  <Calendar
                    mode="single"
                    selected={novaAnaliseData.dataInicio}
                    onSelect={(value) =>
                      setNovaAnaliseData({
                        ...novaAnaliseData,
                        dataInicio: value,
                      })
                    }
                    className="rounded-[16px] w-[280px] border border-[#2D60FF] mt-2"
                  />
                </div>
                <div>
                  <SmallTitle className="text-sm">Data final</SmallTitle>
                  <Calendar
                    mode="single"
                    selected={novaAnaliseData.dataFinal}
                    onSelect={(value) =>
                      setNovaAnaliseData({
                        ...novaAnaliseData,
                        dataFinal: value,
                      })
                    }
                    className="rounded-[16px] w-[270px] border border-[#2D60FF] mt-2 "
                  />
                </div>
              </div>
            </div>

            <div className="grid col-span-1 md:col-span-2 lg:col-span-1 ">
              {/* Textarea */}
              <Textarea
                value={novaAnaliseData.descricao}
                onChange={(event) =>
                  setNovaAnaliseData({
                    ...novaAnaliseData,
                    descricao: event.target.value,
                  })
                }
                label={"Descrição detalhada do projeto"}
                placeholder={"Insira a descrição do projeto..."}
                className="mt-4 text-sm md:text-base"
              />
            </div>
          </div>

          {/* Project Scope */}
          <div className=" flex mt-2 flex-col gap-5">
            <SubTitle className="text-base sm:text-lg">Escopo do projeto</SubTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ml-2 lg:flex gap-4">
              <InputTypeSelectInterno
                labelStyle={
                  funcionalidadesSelecionadas.length +
                    tecnologiasSelecionadas.length !==
                    0
                    ? `mb-20`
                    : ""
                }
                labelInput={"Tipo"}
                getValue={(value) =>
                  setNovaAnaliseData({ ...novaAnaliseData, tipoProjeto: value })
                }
                options={allTypesProject !== null ? allTypesProject : []}
                initialValue={project ? project.tipoProjeto : "Selecione o tipo..."}
                styleLabel={
                  funcionalidadesSelecionadas.length > 0 ||
                    tecnologiasSelecionadas.length > 0
                    ? "mb-20"
                    : ""
                }
              />
              <InputTypeSelectExterno
                className="!w-full !m-0"
                labelStyle={
                  funcionalidadesSelecionadas.length === 0 &&
                    tecnologiasSelecionadas.length > 0
                    ? "mb-20"
                    : ""
                }
                labelInput={"Funcionalidades"}
                allValues={[]}
                selectedItems={funcionalidadesSelecionadas}
                setSelectedItems={setFuncionalidadesSelecionadas}
              />
              <InputTypeSelectExterno
                className="!w-full !mr-12"
                labelStyle={
                  tecnologiasSelecionadas.length === 0 &&
                    funcionalidadesSelecionadas.length > 0
                    ? "mb-20"
                    : ""
                }
                labelInput={"Tecnologias usadas"}
                allValues={
                  allTechSkills !== null
                    ? allTechSkills.map((item) => {
                      return { value: item.toLowerCase(), label: item };
                    })
                    : []
                }
                selectedItems={tecnologiasSelecionadas}
                setSelectedItems={setTecnologiasSelecionadas}
              />
            </div>
          </div>

          {/* Botão */}
          <div className="flex justify-end mt-8 rounded-md">
            <Button
              onClick={
                editMode ? () => AtualizarProjeto() : () => CadastrarProjeto()
              }
              textbutton={"Análise do projeto"}
              className="w-40 sm:w-48 h-10 flex items-center justify-center bg-blue-600 text-white  text-sm md:text-base hover:bg-[#1a47b7] transition duration-200 hover:scale-105"
            />
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center gap-5 pr-10 pb-40">
          <DotLoader color="#2D60FF" />
          <p>{editMode ? "Atualizando" : "Cadastrando"} Projeto</p>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
