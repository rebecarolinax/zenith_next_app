import {
  api,
  getAllUsers,
  getAnalysisByProject,
  getTeamProject,
  getUsersByTechSkills,
} from "@/Services/Service";
import TeamAnalysis from "@/components/DefinTeamArea";

const ListarDevelopers = async (skillsList) => {
  try {
    const response = await api.get(getUsersByTechSkills, skillsList);
    return response.data;
  } catch (erro) {
    console.log(erro);
    return [];
  }
};

const BuscarAnaliseDoProjeto = async (idProjeto) => {
  try {
    const response = await api.get(`${getAnalysisByProject}/${idProjeto}`);
    return response.data;
  } catch (erro) {
    console.log(erro);
    return null;
  }
};

const BuscarEquipeProjeto = async (idProjeto) => {
  try {
    const response = await api.get(getTeamProject + `/${idProjeto}`);
    return response.data;
  } catch (erro) {
    console.log(erro);
    return null;
  }
};

const FiltrarSkillsRiscos = (arrayRiscos) => {
  return arrayRiscos.map((risco) => risco.techSkill);
};

const BuscarNomeProjeto = async (projectId) => {
  try {
    const response = await api.get(`/Projeto/BuscarPeloId/${projectId}`);
    return response.data.nome;
  } catch (error) {
    console.error("Erro ao listar o projeto:", error);
    return null;
  }
};

export default async function ({ params }) {
  const equipeProjeto = await BuscarEquipeProjeto(params.projectId);
  const analise = await BuscarAnaliseDoProjeto(params.projectId);
  const skillsList = FiltrarSkillsRiscos(analise.riscos);
  const developers = await ListarDevelopers(skillsList);
  const nomeProjeto = await BuscarNomeProjeto(params.projectId);

  return (
    <div>
      <TeamAnalysis
        idProjeto={params.projectId}
        developersList={developers}
        equipeObject={equipeProjeto}
        analise={analise}
        risksSkillsList={skillsList}
        nomeProjeto={nomeProjeto}
      />
    </div>
  );
}
