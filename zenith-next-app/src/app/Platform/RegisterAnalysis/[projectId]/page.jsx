import { SmallTitle } from "@/components/Text";
import {
  api,
  getAllProjectsTypes,
  getAllTechSkills,
} from "@/Services/Service";
import FormAddProject from "@/components/FormAddProject";
import moment from "moment";

const BuscarTiposProjeto = async () => {
  try {
    const response = await api.get(getAllProjectsTypes);
    const responseArray = response.data.map((item) => item.tipo);
    return responseArray;
  } catch (erro) {
    console.log(erro);
    return [];
  }
};

const BuscarTecnologias = async () => {
  try {
    const response = await api.get(getAllTechSkills);
    console.log(response.data.map((item) => item.skill));
    const responseArray = response.data.map((item) => item.skill);
    return responseArray;
  } catch (erro) {
    console.log(erro);
    return [];
  }
};

const BuscarDadosProjeto = async (idProjeto) => {
  try {
    const response = await api.get(
      `/Projeto/BuscarPeloId/${idProjeto}`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao listar o projeto:", error);
    return null
  }
}

export default async function AtualizarProjeto({ params }) {
  const editMode = params ? true : false

  console.log(params.projectId);
  let projeto = null;

  if (params) {
    projeto = await BuscarDadosProjeto(params.projectId)
    console.log(new Date());
    console.log(new Date(projeto.dataInicio));
  }

  const allTechSkills = await BuscarTecnologias();

  const allTypesProject = await BuscarTiposProjeto();

  return (
    <>
      <div className="flex flex-col gap-5 pt-5 pl-5 ml-[18%] h-screen bg-[#F5F6FA]">
        {/* <Header /> */}
        <SmallTitle className="  sm:text-lg max-md:text-xl w-full ">
          Detalhes do projeto
        </SmallTitle>

        <FormAddProject allTechSkills={allTechSkills} allTypesProject={allTypesProject} editMode={editMode} project={projeto} />
      </div>
    </>
  );
}