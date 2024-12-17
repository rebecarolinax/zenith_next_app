
import { api } from "@/Services/Service";
import { ContainerPlatform } from "@/components/Contain";
import InfoProject from "@/components/InfoProject";

const ListProject = async (projectId) => {
  try {
    const response = await api.get(
      `/Projeto/BuscarPeloId/${projectId}`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao listar o projeto:", error);
    return null
  }
};

const AnaliseProject = async (projectId) => {
  try {
    const response = await api.get(
      `/AnaliseProjeto/BuscarPeloIdProjeto/${projectId}`
    );

    return response.data;
  } catch (error) {
    console.error("Erro ao listar a analise:", error);
    return null
  }
};

export default async function ProjectInformation({ params }) {
  const projeto = await ListProject(params.projectId);
  const analise = await AnaliseProject(params.projectId);

  return (
    <ContainerPlatform style={"!pl-[280px] lg:pl-[300px]"}>
      <InfoProject projeto={projeto} analise={analise} />
    </ContainerPlatform>
  );
}
