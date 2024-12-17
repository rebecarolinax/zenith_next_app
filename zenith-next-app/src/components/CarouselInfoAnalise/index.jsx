import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  ModalMoreInformations,
  ModalRiscosPorArea,
  ModalRiscosPorNivel,
} from "../Modal";
import { gerarCor } from "@/Utils/StringFunctions";

export const CarouselInfoAnalise = ({
  analise,
  nomeProjeto,
  niveisRisco,
  areasRisco,
  className,
  analysisPage = false,
}) => {
  return (
    <Carousel className={className}>
      <CarouselContent>
        {/* Card de equipe ideal */}
        <CarouselItem>
          <div className="flex flex-col gap-5 h-full w-full">
            <h3 className="w-full flex justify-center text-lg font-medium">
              Composição Sugerida para o {nomeProjeto}
            </h3>
            <p className="text-justify">
              Tendo em vista o escopo do projeto {nomeProjeto} e a
              disponibilidade de colaboradores para formar equipe para este
              projeto, estima-se que a seguinte composição de equipe seja ideal
              para o desenvolvimento do projeto em questão. Sugerimos que siga a
              indicação de composição ideal ao definir uma equipe para este
              projeto a fim de evitar maiores riscos ou complexidade do projeto.
            </p>
            <ul className="flex w-full justify-between">
              <li className="text-[#FF5722] text-center">
                Gestores: {analise.composicaoEquipeIdeal[0] * 100}%
              </li>
              <li className="text-[#ffa007] text-center">
                Seniores: {analise.composicaoEquipeIdeal[1] * 100}%
              </li>
              <li className="text-[#2196F3] text-center">
                Plenos: {analise.composicaoEquipeIdeal[2] * 100}%
              </li>
              <li className="text-[#4CAF50] text-center">
                Juniors: {analise.composicaoEquipeIdeal[3] * 100}%
              </li>
            </ul>

            {!analysisPage ? (
              <ModalMoreInformations
                style={"w-full flex justify-end"}
                text={analise.descricao}
                title={"Análise do projeto " + nomeProjeto}
              >
                <p className="cursor-pointer hover:border-b-2 hover:border-b-mainColors-primaryblue flex self-end px-3 py-1">
                  Ver análise completa
                </p>
              </ModalMoreInformations>
            ) : null}
          </div>
        </CarouselItem>

        {/* Card de níveis dos riscos */}
        <CarouselItem>
          <div className="flex flex-col h-full w-full gap-5">
            <h3 className="w-full flex justify-center text-lg font-medium">
              Informações sobre Níveis dos Riscos
            </h3>

            <p className="text-justify">
              Tomando como base a lista de riscos existentes para este projeto,
              junto da probabilidade deste risco ocorrer de fato e do impacto
              que o mesmo pode causar durante o desenvolvimento do projeto, cada
              risco presente na lista foi classificado com um nível de impacto
              podendo ser eles: impacto baixo, médio, alto ou crítico. Para o{" "}
              {nomeProjeto} foram identificados ao todo:
            </p>

            {niveisRisco.length > 0 ? (
              <ul className="flex w-full justify-between gap-5">
                {niveisRisco.map((item, index) => {
                  const cor =
                    index === 0
                      ? "#4CAF50"
                      : index === 1
                      ? "#2196F3"
                      : index === 2
                      ? "#ffa007"
                      : "#FF5722";

                  return item.qtd > 0 ? (
                    <li className="text-center">
                      <span className={`text-[${cor}]`}>{item.qtd}</span> Riscos
                      de nível{" "}
                      <span className={`text-[${cor}]`}>{item.nivel}</span>
                    </li>
                  ) : null;
                })}
              </ul>
            ) : null}

            <ModalRiscosPorNivel
              niveisRisco={niveisRisco}
              className={"w-full flex justify-end"}
            >
              <p className="cursor-pointer hover:border-b-2 hover:border-b-mainColors-primaryblue flex self-end px-3 py-1">
                Ver lista completa
              </p>
            </ModalRiscosPorNivel>
          </div>
        </CarouselItem>

        {/* Card de Área do risco */}
        <CarouselItem>
          <div className="flex flex-col h-full w-full gap-5">
            <h3 className="w-full flex justify-center text-lg font-medium">
              Informações sobre Áreas dos Riscos
            </h3>

            <p className="text-justify">
              Com relação ao escopo de desenvolvimento do projeto, os riscos
              análisados foram classificados de acordo com a área em que tal
              risco afeta. Seja ela nos paramtros técnicos, funcionais ou de
              ambiente do projeto, separadas de acordo com subáras específicas
              para o risco em si. Para o {nomeProjeto} foram identificados ao
              todo:
            </p>

            {areasRisco.length > 0 ? (
              <>
                <ul className={`flex w-full flex-wrap gap-5 h-[${analysisPage ? "120" : "70"}px] overflow-y-auto justify-center`}>
                  {areasRisco.map((item, index) => {
                    const cor = gerarCor(index);

                    return (
                      <li className="text-center">
                        <span className={`text-[${cor}]`}>{item.qtd}</span>{" "}
                        Riscos de{" "}
                        <span className={`text-[${cor}]`}>{item.nome}</span>
                      </li>
                    );
                  })}
                </ul>
                <ModalRiscosPorArea
                  areasRisco={areasRisco}
                  className={"w-full flex justify-end"}
                >
                  <p className="cursor-pointer hover:border-b-2 hover:border-b-mainColors-primaryblue flex self-end px-3 py-1">
                    Ver lista completa
                  </p>
                </ModalRiscosPorArea>
              </>
            ) : null}
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
