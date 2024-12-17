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



export default async function CadastrarProjeto() {

  const allTechSkills = await BuscarTecnologias();

  const allTypesProject = await BuscarTiposProjeto();

  return (
    <>
      <div className="flex flex-col gap-5 pt-5 pl-5 ml-[18%] h-full lg:h-screen bg-[#F5F6FA]">
        {/* <Header /> */}
        <SmallTitle className="  sm:text-lg max-md:text-xl w-full ">
          Detalhes do projeto
        </SmallTitle>

        <FormAddProject allTechSkills={allTechSkills} allTypesProject={allTypesProject} editMode={false} />
      </div>
    </>
  );
}
