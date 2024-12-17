"use client";

import React, { useEffect, useState } from "react";
import { api, getAllPositions, getAllTechSkills, updateUserImage } from "@/Services/Service";
import { ImgInput, Input } from "../Input";
import IconUser from "../../assets/Icons/IconUser.svg";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  InputSelect,
  InputTypeSelectExterno,
  InputTypeSelectInterno,
} from "../InputsSelect";
import { ButtonForm } from "../Button";
import { ComboboxDemo } from "../Combobox";

export const FormAddUser = () => {
  const [imagemUsuario, setImagemUsuario] = useState(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cargo, setCargo] = useState("");
  const [habilidades, setHabilidades] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nivelSenioridade, setNivelSenioridade] = useState(0);
  const [habilidadesSelecionadas, setHabilidadesSelecionadas] = useState([]);

  const [opcoesCargo, setOpcoesCargo] = useState([]);

  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const errors = {};

    if (!nome.trim()) errors.nome = "O campo 'Nome' é obrigatório.";
    if (!email.trim()) errors.email = "O campo 'Email' é obrigatório.";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      errors.email = "Por favor, insira um e-mail válido.";
    }

    if (!senha.trim()) errors.senha = "O campo 'Senha' é obrigatório.";
    else if (senha.length < 6) {
      errors.senha = "A senha deve ter pelo menos 6 caracteres.";
    }

    if (!cargo.trim()) errors.cargo = "Selecione um cargo profissional.";
    if (nivelSenioridade <= 0) {
      errors.nivelSenioridade = "Selecione o nível de senioridade.";
    }
    if (habilidadesSelecionadas.length === 0) {
      errors.habilidadesSelecionadas = "Selecione pelo menos uma Tech Skill.";
    }
    if (!imagemUsuario) errors.imagemUsuario = "Adicione uma imagem para o usuário.";

    return errors;
  };

  const HandleCadastro = async (event) => {
    event.preventDefault();

    const validationErrors = validateFields();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;


    setIsLoading(true);

    try {
      const data = {
        nome,
        email,
        senha,
        nivelSenioridade,
        cargoUsuario: cargo,
        techSkillsList: habilidadesSelecionadas.map(item => item.label),
      };

      console.log("Dados enviados:", data);

      // Requisição usando Axios
      const response = await api.post("/Usuario", data); // Enviar diretamente o objeto `data`

      console.log("Resposta do servidor:", response.data);

      CadastrarFotoUsuario(response.data);
      setNome("");
      setEmail("");
      setSenha("");
      setCargo("");
      setHabilidades([]);
      setImagemUsuario(null);
    } catch (error) {
      console.error("Erro ao cadastrar:", error);

      // Tratamento do erro
      if (error.response) {
        console.error("Erro no servidor:", error.response.data);
      } else {
      }
    } finally {
      setIsLoading(false);
      window.location.href = `/Platform/Professionals`;
    }
  };

  const CadastrarFotoUsuario = async (idUsuario) => {
    if (!imagemUsuario) {
      return;
    }

    // Verifica se `imagemUsuario` é do tipo File ou Blob
    if (!(imagemUsuario instanceof File || imagemUsuario instanceof Blob)) {
      console.error("O arquivo selecionado não é válido:", imagemUsuario);
      return;
    }

    const formData = new FormData();
    formData.append("ArquivoFoto", imagemUsuario);

    try {
      const endpoint = `${updateUserImage}${idUsuario}`;
      console.log("URL gerada:", endpoint);

      const response = await api.put(endpoint, formData);
      console.log("Imagem do usuário cadastrada com sucesso:", response.data);
    } catch (error) {
      console.error("Erro ao cadastrar imagem:", error.response?.data || error);
    }
  };

  const BuscarTodasTechSkills = async () => {
    await api
      .get(getAllTechSkills)
      .then((response) => setHabilidades(response.data))
      .catch();
  };

  const BuscarTodosCargos = async () => {
    await api
      .get(getAllPositions)
      .then((response) => setOpcoesCargo(response.data))
      .catch((erro) => log(erro));
  };

  useEffect(() => {
    BuscarTodasTechSkills();
    BuscarTodosCargos();
  }, []);




  useEffect(() => {
    console.log(habilidades);
    console.log(habilidades.map((item) => item.skill));
  }, [habilidades]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="w-[190px] h-[45px] bg-[#2D60FF] text-[#FFFFFF] rounded-[10px] flex items-center justify-center backdrop-filter-none fixed right-9 top-24 mt-1 hover:bg-[#1a47b7] transition duration-200 hover:scale-105">
          Adicionar membro
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-mainColors-white w-[560px] overflow-auto">
        <SheetHeader className="mt-40 flex items-center lg:mt-0">
          <ImgInput selectedImage={imagemUsuario} setSelectedImage={setImagemUsuario} />
        </SheetHeader>
        <form
          onSubmit={HandleCadastro}
          className="flex flex-col gap-4 py-4 items-center"
        >
          <div className="lg:items-center gap-4 justify-center">
            <Input
              classname={`mb-2 ${errors.nome ? "border-red-500" : ""}`}
              type="text"
              label="Nome"
              placeholder="Insira seu nome..."
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            {errors.nome && <p className="text-red-500 text-sm">{errors.nome}</p>}
          </div>
          <div className="items-center gap-4">
            <Input
              classname={`mb-2 ${errors.nome ? "border-red-500" : ""}`}
              type="email"
              label="Email"
              placeholder="Insira seu email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="items-center gap-4">
            <Input
              classname={`mb-2 ${errors.nome ? "border-red-500" : ""}`}
              type="password"
              label="Senha"
              placeholder="Insira sua senha..."
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            {errors.senha && <p className="text-red-500 text-sm">{errors.senha}</p>}
          </div>

          <div className=" w-[82%] lg:w-[85%] items-center justify-between gap-4 flex ">
            <InputTypeSelectInterno
              classname={`mb-2 ${errors.senha ? "border-red-500" : ""}`}
              labelInput={"Posição profissional"}
              getValue={setCargo}
              options={opcoesCargo.map((cargo) => cargo.cargo)}
            />
            {errors.cargo && <p className="text-red-500 text-sm">{errors.cargo}</p>}


            <InputSelect
              value={nivelSenioridade}
              setValue={setNivelSenioridade}
              style="!w-[100%]"
              formStyle={"!w-[30%]"}
            />
          </div>
          <InputTypeSelectExterno
            allValues={habilidades.map((item) => {
              return { value: item.skill.toLowerCase(), label: item.skill };
            })}
            setSelectedItems={setHabilidadesSelecionadas}
            selectedItems={habilidadesSelecionadas}
            labelInput={"Competências técnicas"}
            classname={`mb-2 ${errors.senha ? "border-red-500" : ""}`}
          />

          {errors.habilidades && <p className="text-red-500 text-sm">{errors.habilidades}</p>}

          <ButtonForm
            classname="w-[60%] mt-2 hover:bg-[#1a47b7] transition duration-200 hover:scale-105"
            textbutton={isLoading ? "Enviando..." : "Adicionar novo membro"}
            disabled={isLoading}
            onClick={HandleCadastro}

          />
        </form>
      </SheetContent>
    </Sheet>
  );
};
