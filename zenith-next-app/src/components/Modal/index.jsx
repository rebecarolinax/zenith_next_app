"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CgTrashEmpty } from "react-icons/cg";
import { useContext, useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import {
  api,
  getAllPositions,
  getProjectByUserIdRoute,
} from "@/Services/Service";
import Image from "next/image";
import { InputTypeSelectInterno } from "../InputsSelect";
import { SmallTitle } from "../Text";

import { useRouter } from "next/navigation";
import { ConfirmDeleteModal } from "../ModalDeletProfessionals";
import { UserContext } from "@/context/AuthContext";

export const ModalProfessionalsSchema = () => {
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <ModalProfessionals
        dadosUsuario={{
          permissao: "Administrador",
          nome: "Murilo Souza Almeida",
          email: "murilo@email.com",
        }}
        idUsuario={idUsuario}
      />
    </Dialog>
  );
};

export const ModalProfessionals = ({ dadosUsuario, onClose, idUsuario }) => {
  const { userData } = useContext(UserContext);
  const [tabSelected, setTabSelected] = useState(1);
  const [permissaoUsuario, setPermissaoUsuario] = useState(userData.cargo);
  const [editForm, setEditForm] = useState(false);
  const [addSkill, setAddSkill] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [skillsList, setSkillsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [dataForm, setDataForm] = useState({
    nome: dadosUsuario.nome || "",
    email: dadosUsuario.email || "",
    cargo: "",
    senioridade: dadosUsuario.senioridade || "",
  });

  const [cargo, setCargo] = useState("");
  const [opcoesCargo, setOpcoesCargo] = useState([]);
  const [visiblePhotos, setVisiblePhotos] = useState([]); // Fotos visíveis
  const [remainingCount, setRemainingCount] = useState(0); // Contagem restante
  const [listaProjetos, setListaProjetos] = useState([]);
  const navigate = useRouter();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (dadosUsuario) {
      setDataForm((prevState) => ({
        ...prevState,
        novaFoto: dadosUsuario.foto || prevState.foto,
        nome: dadosUsuario.nome || prevState.nome,
        email: dadosUsuario.email || prevState.email,
        cargo: dadosUsuario.cargo || prevState.cargo,
        senioridade: dadosUsuario.senioridade || prevState.senioridade,
      }));

      if (dadosUsuario.techSkills) {
        setSkillsList(dadosUsuario.techSkills || []);
      }
    }
  }, [dadosUsuario]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        return;
      }
      setSelectedImage(file);
      const objectUrl = URL.createObjectURL(file);
      setProfileImageUrl(objectUrl);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage || !idUsuario) return;

    const formData = new FormData();
    formData.append("ArquivoFoto", selectedImage);

    try {
      const response = await api.put(
        `/Usuario/AtualizarFoto/${idUsuario}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 200 && response.data.newProfileImageUrl) {
        setProfileImageUrl(response.data.newProfileImageUrl);
      } else {
        console.error("Erro ao atualizar foto:", response.data);
      }
    } catch (error) {
      console.error(
        "Erro ao atualizar foto:",
        error.response?.data || error.message
      );
    }
  };
  const AtualizarColaborador = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Ativa o loader

    try {
      const response = await api.put(`/Usuario/AtualizarUsuario/${idUsuario}`, {
        novoNome: dataForm.nome,
        novoEmail: dataForm.email,
        novoCargo: dataForm.cargo,
        novoNivelSenioridade: dataForm.senioridade
          ? stringParaIntSenioridade(dataForm.senioridade)
          : null,
        novasTechSkillsList: skillsList,
      });

      if (response.status === 200) {
        setEditForm(false);
        setAddSkill(false);
        setNewSkill("");
        window.location.href = `/Platform/Professionals`; // Redireciona após a atualização
      } else {
        console.error("Erro ao atualizar usuário:", response.data);
      }
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error.response?.data || error.message);
    } finally {
      setIsLoading(false); // Desativa o loader
    }
  };


  const salvarAlteracoes = async (event) => {
    event.preventDefault();

    if (selectedImage) {
      await handleImageUpload();
    }

    AtualizarColaborador(event);
  };

  const AdicionarSkillNaLista = (novaSkill) => {
    const normalizedSkill = novaSkill.trim().toLowerCase();

    if (!normalizedSkill) {
      return;
    }

    if (
      skillsList.map((skill) => skill.toLowerCase()).includes(normalizedSkill)
    ) {
      return;
    }

    setSkillsList([...skillsList, novaSkill.trim()]);
    setNewSkill("");
  };

  const RemoverSkillDaLista = (skillRemovida) => {
    setSkillsList(skillsList.filter((skill) => skill !== skillRemovida));
  };

  const EditarUsuario = (e) => {
    e.preventDefault();
    setEditForm(true);
  };

  const BuscarTodosCargos = async () => {
    await api
      .get(getAllPositions)
      .then((response) => setOpcoesCargo(response.data))
      .catch((erro) => log(erro));
  };

  const ListarProjeto = async () => {
    try {
      if (!idUsuario) {
        console.warn("ID do usuário não encontrado");
        return;
      }

      console.log("Chamando API para buscar projetos do usuário:", idUsuario);

      const response = await api.get(`${getProjectByUserIdRoute}/${idUsuario}`);
      console.log("Resposta da API:", response.data);

      if (
        response.data &&
        Array.isArray(response.data) &&
        response.data.length > 0
      ) {
        setListaProjetos(response.data);
        console.log("Projetos carregados:", response.data);
      } else {
        console.warn(
          `Nenhum projeto encontrado para o usuário com ID: ${idUsuario}. Verifique a associação no backend.`
        );
        setListaProjetos([]);
      }
    } catch (error) {
      console.error(
        "Erro ao buscar projetos:",
        error.response?.data || error.message
      );
      setListaProjetos([]);
    }
  };

  useEffect(() => {
    if (tabSelected === 2) {
      ListarProjeto();
    }
  }, [tabSelected]);

  useEffect(() => {
    BuscarTodosCargos();
  }, []);

  const stringParaIntSenioridade = (senioridade = "") => {
    switch (senioridade) {
      case "Júnior":
        return 1;

      case "Pleno":
        return 2;

      case "Sênior":
        return 3;

      default:
        return 4;
    }
  };

  return (
    <DialogContent className="h-[95vh] w-[40vw] sm:w-[20vw] lg:w-[40vw] bg-white overflow-auto ">
      <DialogHeader className={"relative"}>
        <nav className="w-full flex flex-row gap-10 text-mainColors-secondaryblue">
          <p
            className={`px-2 cursor-pointer ${tabSelected == 1
              ? `border-mainColors-primaryblue border-b-2 px-2 text-mainColors-primaryblue`
              : ""
              }`}
            onClick={() => setTabSelected(1)}
          >
            Dados gerais
          </p>
          <p
            className={`px-2 cursor-pointer ${tabSelected == 2
              ? `border-mainColors-primaryblue border-b-2 px-2 text-mainColors-primaryblue`
              : ""
              }`}
            onClick={() => setTabSelected(2)}
          >
            Projetos
          </p>
        </nav>
        <div className="w-full h-[1px] bg-mainColors-lightGray"></div>
        <section className="pt-7">
          {tabSelected == 1 ? (
            <form
              onSubmit={AtualizarColaborador}
              className="flex flex-col gap-7"
            >
              {/* UserData Section */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
                <div className="h-[130px] w-[130px] relative ">
                  <Image
                    className="h-full w-full rounded-[50%]"
                    width={130}
                    height={130}
                    src={!profileImageUrl ? dadosUsuario.foto : profileImageUrl}
                    alt="Foto do usuário"
                  />
                  {editForm ? (
                    <div className="flex items-center justify-center h-[30px] w-[30px] rounded-full bg-mainColors-primaryblue absolute bottom-3 right-3">
                      <label for="inputImage" className="cursor-pointer">
                        <MdModeEdit className="h-full w-full" color="#FFFFFF" />
                        <input
                          src={dadosUsuario.foto}
                          onChange={handleImageChange}
                          type="file"
                          className="hidden"
                          name="inputImage"
                          id="inputImage"
                        />
                      </label>
                    </div>
                  ) : null}
                </div>
                <div className="flex flex-col w-full sm:w-[66%] gap-[18px]">
                  <div className="flex flex-col w-full gap-[10px] items-start">
                    <label htmlFor="name" className="">
                      Nome:
                    </label>
                    <input
                      value={dataForm.nome}
                      onChange={(e) =>
                        setDataForm({ ...dataForm, nome: e.target.value })
                      }
                      className="border-[#2D60FF] rounded-[15px] border h-[50px] w-full pl-2"
                      type="text"
                      name="name"
                      placeholder="Nome do Usuário"
                      disabled={!editForm}
                    />
                  </div>
                  <div className="flex flex-col w-full gap-[10px] items-start">
                    <label htmlFor="email">Email:</label>
                    <input
                      value={dataForm.email}
                      onChange={(e) =>
                        setDataForm({ ...dataForm, email: e.target.value })
                      }
                      className="border-[#2D60FF] rounded-[15px] border h-[50px] w-full pl-2 "
                      type="email"
                      name="email"
                      placeholder="Email do usuário"
                      disabled={!editForm}
                    />
                  </div>
                </div>
              </div>

              {/* WorkSkills Section */}
              <div>
                <div className="flex flex-col sm:flex-row gap-[25px] ">
                  <div className="flex flex-col w-full gap-[10px] items-start mt-2">
                    <InputTypeSelectInterno
                      edit={userData.cargo === "Administrador"}
                      labelInput={"Posição profissional:"}
                      getValue={(selectedValue) => {
                        setCargo(selectedValue);
                        setDataForm((prevState) => ({
                          ...prevState,
                          cargo: selectedValue,
                        }));
                      }}
                      options={opcoesCargo.map((cargo) => cargo.cargo)}
                      initialValue={dataForm.cargo}
                    />
                  </div>

                  <div className="flex flex-col w-full gap-[10px] items-start">
                    <label htmlFor="seniority" className="">
                      Senioridade:
                    </label>
                    <select
                      name="seniority"
                      id="seniority"
                      className="border-[#2D60FF] border rounded-[15px] h-[50px] w-full"
                      disabled={!editForm}
                      value={dataForm.senioridade}
                      onChange={(e) => {
                        setDataForm({
                          ...dataForm,
                          senioridade: e.target.value,
                        });
                        console.log(e.target.value);
                      }}
                    >
                      {["Júnior", "Pleno", "Sênior", "Gestor"].map(
                        (senioridade) => (
                          <option key={senioridade} value={senioridade}>
                            {senioridade}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>
              </div>

              {/* TechSkills Section */}
              {dadosUsuario.perfil == "Colaborador" ? (
                <div>
                  <p className="mb-3">Competências técnicas</p>
                  <div className="max-h-32 flex flex-row flex-wrap gap-5 overflow-y-scroll scrollbar-none ">
                    {skillsList.length > 0 ? (
                      skillsList.map((skill, index) => (
                        <span
                          key={index}
                          className="px-5 py-3 border rounded-[15px] border-[#2D60FF] "
                          onClick={
                            editForm ? () => RemoverSkillDaLista(skill) : null
                          }
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p>Nenhuma competência cadastrada.</p>
                    )}
                  </div>
                  <div className="flex w-auto mt-7 relative">
                    {addSkill ? (
                      <div className="flex flex-col w-full">
                        <form className="border-b-2 border-mainColors-primaryblue w-full">
                          <input
                            type="text"
                            placeholder="Report a new TechSkills"
                            className="outline-none border-none bg-transparent w-75%"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                          />
                        </form>
                        <p
                          className="cursor-pointer"
                          onClick={() => {
                            setAddSkill(false);
                            setNewSkill("");
                          }}
                        >
                          Cancelar
                        </p>
                      </div>
                    ) : null}
                    {editForm ? (
                      <p
                        className={`flex self-end text-mainColors-primaryblue cursor-pointer ${addSkill ? "absolute right-1" : ""
                          }`}
                        onClick={
                          !addSkill
                            ? () => setAddSkill(true)
                            : () => AdicionarSkillNaLista(newSkill)
                        }
                      >
                        Adicionar +
                      </p>
                    ) : null}
                  </div>
                </div>
              ) : null}

              {permissaoUsuario === "Administrador" ? (
                <div className="flex flex-row gap-5 self-end absolute bottom-0">
                  {editForm ? (
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl cursor-pointer"
                      onClick={() => setShowModal(true)}
                    >
                      <CgTrashEmpty className="w-6 h-6" color="#E00004" />
                    </div>
                  ) : null}
                  <button
                    type="submit"
                    onClick={(event) => {
                      if (editForm) {
                        AtualizarColaborador(event);
                        handleImageUpload(); // Se necessário, envie a imagem após salvar o formulário
                      } else {
                        EditarUsuario(event);
                      }
                    }}
                    className="h-12 flex items-center justify-center text-lg text-white bg-mainColors-primaryblue px-[70px] rounded-[15px]"
                  >
                    {editForm ? "Salvar" : "Editar"}
                  </button>
                </div>
              ) : null}
            </form>
          ) : (
            <div>
              <h2 className="text-lg mb-4">Projetos do Usuário</h2>
              {listaProjetos.length > 0 ? (
                listaProjetos.map((project) => (
                  <div
                    key={project.id}
                    className="mb-6 p-4 border border-[#2D60FF] rounded-xl shadow-sm"
                  >
                    <h3 className="text-md font-semibold text-[#718EBF]">
                      {project.nome}
                    </h3>
                    <div className="flex items-center gap-3 mt-3">
                      {project.team && project.team.length > 0 ? (
                        project.team.slice(0, 4).map((member, index) => (
                          <div
                            key={index}
                            className="w-12 h-12 rounded-full overflow-hidden relative"
                          >
                            <Image
                              src={member.foto || "/default-avatar.png"}
                              alt={`Foto de ${member.nome}`}
                              layout="fill"
                              objectFit="cover"
                            />
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-600">
                          Nenhum membro na equipe
                        </p>
                      )}
                      {project.team && project.team.length > 4 && (
                        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-white">
                          +{project.team.length - 4}
                        </div>
                      )}

                      <div className="flex justify-end  ml-[40%]">
                        <button
                          className=" h-[40px] w-[150px]  bg-blue-500 text-white py-2 px-4 rounded-[10px] hover:bg-[#1a47b7] transition duration-200 hover:scale-105"
                          onClick={() =>
                            navigate.push(
                              `/Platform/ProjectInformation/${project.id}`
                            )
                          }
                        >
                          Ver projeto
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-600">
                  Nenhum projeto encontrado.
                </p>
              )}
            </div>
          )}
        </section>
      </DialogHeader>
      {showModal && (
        <ConfirmDeleteModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={() => console.log("Usuário deletado!")} // Adicione o callback se necessário
          idUsuario={idUsuario} // Certifique-se de passar o ID do usuário aqui
        />
      )}
    </DialogContent>
  );
};

export const ModalMoreInformations = ({ title, text, children, style }) => {
  return (
    <Dialog>
      <DialogTrigger className={`${style}`}>{children}</DialogTrigger>
      <DialogContent className="bg-[#fbfbfb] max-h-[80vh] w-[80vw] overflow-y-auto scrollbar-none  border-[#2D60FF] border-x-2 border-y-2 text-[#343C6A] rounded-[25px]">
        <DialogHeader className="w-full gap-3">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{text}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export const ModalRiscosPorArea = ({ children, className, areasRisco }) => {
  return (
    <Dialog>
      <DialogTrigger className={`${className}`}>{children}</DialogTrigger>
      <DialogContent className="bg-[#fbfbfb] max-h-[80vh] w-[80vw] overflow-y-auto scrollbar-none  border-[#2D60FF] border-x-2 border-y-2 text-[#343C6A] rounded-[25px]">
        <DialogHeader className="w-full gap-3">
          <DialogTitle>Lista de Riscos Por Áera</DialogTitle>
          <DialogDescription>
            {areasRisco.map((item) => {
              return (
                <div className="pt-5">
                  <h3 className="text-lg">Riscos na Área de {item.nome}:</h3>
                  <ul>{item.riscos.map((risco) => {
                    return (
                      <li className="py-2">
                        <p>{risco.descricao}</p>
                        <p>Tech Skill necessária: {risco.techSkill}</p>
                        <p>Nível do Risco: {risco.nivel === 1 ? "Baixo" : risco.nivel === 2 ? "Médio" : risco.nivel === 3 ? "Alto" : "Crítico"}</p>
                      </li>
                    )
                  })}</ul>
                </div>
              );
            })}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export const ModalRiscosPorNivel = ({ children, className, niveisRisco }) => {
  return (
    <Dialog>
      <DialogTrigger className={`${className}`}>{children}</DialogTrigger>
      <DialogContent className="bg-[#fbfbfb] max-h-[80vh] w-[80vw] overflow-y-auto scrollbar-none  border-[#2D60FF] border-x-2 border-y-2 text-[#343C6A] rounded-[25px]">
        <DialogHeader className="w-full gap-3">
          <DialogTitle>Lista de Riscos Por Áera</DialogTitle>
          <DialogDescription>
            {niveisRisco.map((item) => {
              return item.qtd > 0 ? (
                <div className="pt-5">
                  <h3 className="text-lg">Riscos de Nível {item.nivel}:</h3>
                  <ul>{item.riscos.map((risco) => {
                    return (
                      <li className="py-2">
                        <p>{risco.descricao}</p>
                        <p>Tech Skill necessária: {risco.techSkill}</p>
                        <p>Áreda de impacto do Risco: {risco.area}</p>
                      </li>
                    )
                  })}</ul>
                </div>
              ) : null;
            })}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
