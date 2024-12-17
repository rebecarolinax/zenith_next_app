import axios from "axios";

const apiUrlAzure = 'https://zenithwebapp-g3h6e4duhkaeatau.canadacentral-01.azurewebsites.net/api' //url da api do zenith na nuvem da azure

export const api = axios.create({
    baseURL: apiUrlAzure,
}) //método do axios criando uma constante "api" que poderemos fazer todas as nossas requisições na api

//rotas da api
export const loginRoute = '/Login/Login'
export const sendEmailRoute = '/RecuperarSenha/EnviarEmail'
export const sendVerifyCodeRoute = '/RecuperarSenha/ValidarCodigoRecuperacao'
export const updateUserPasswordRoute = 'RecuperarSenha/AtualizarSenhaUsuario'
export const getProjectByUserIdRoute = '/Projeto/ListarProjetosPeloUsuario'
export const getProjectsInProgressRoute = '/Projeto/ListarProjetosEmAndamento'
export const getAllProjectsRoute = '/Projeto/ListarTodos'
export const getProjectsNotInProgressRoute = 'Projeto/ListarProjetosQueNaoEstaoEmAndamento'
export const getPastProjectsRoute = 'Projeto/ListarProjetosConcluidos'
export const getFutureProjectsRoute = 'Projeto/ListarProjetosFuturos'
export const getAllTechSkills = '/TechSkill/ListarTodas';
export const getAllPositions = "/CargoUsuario/ListarTodos";
export const updateUserImage = "/Usuario/AtualizarFoto/";
export const addNewProject = "/Projeto/CadastrarProjeto";
export const getAllProjectsTypes = "/TiposProjeto/ListarTodos";
export const getProjectsInProgress = '/Projeto/ListarProjetosEmAndamento'
export const getAllUsers = "/Usuario/ListarTodosOsUsuarios";
export const getTeamProject = "/Equipe/PorProjeto";
export const createNewTeamProject = "/Equipe/CadastrarEquipe";
export const updateTeamProject = "/Equipe/AtualizarEquipe";
export const getUsersByTechSkills = "/Usuario/ListarPorTechSkills";
export const getAnalysisByProject = "/AnaliseProjeto/BuscarPeloIdProjeto";
export const getAllColaborators = "/Usuario/ListarTodosColaboradores";
export const deleteTeamProject = "/Equipe/DeletarEquipePorProjeto";

export const ItemType = {
    CARD: "CARD",
  };
export const deleteProjetct = "/Projeto/DeletarProjeto";
export const updateProject = "/Projeto/AtualizarProjeto";
