import Image from "next/image";
import { SmallTitle } from "../Text";
import { Button, ButtonProject } from "../Button";
import { useEffect } from "react";

export const TeamCard = ({ className, data }) => {
  const teamPhotos = data && data.colaboradores.map((e) => e.foto);
  const visiblePhotos = teamPhotos?.slice(0, 4);
  const remainingCount = teamPhotos?.length > 4 ? teamPhotos.length - 4 : 0;

  return (
    <div className="flex flex-col gap-1 justify-start ml-[160px]">
      <SmallTitle className={"mt-1"}>Time</SmallTitle>
      <div className="w-[452px] h-[75px] bg-[#fbfbfb] rounded-[25px] overflow-hidden flex justify-center items-center p-0 mb-2">
        <div className=" w-[380px] h-[65px] bg-[#F5F7FA] rounded-[25px] flex items-center justify-center space-x-4">
          {visiblePhotos ?
            visiblePhotos.map((foto, index) => (
              <div
                key={index}
                className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 relative"
              >
                <Image
                  src={foto}
                  alt={`Foto ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                />
              </div>
            )) : <p className="font-medium text-[#343C6A]">Equipe não definida.</p>}
          {remainingCount > 0 && (
            <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 relative bg-[#718EBF] flex items-center justify-center text-[#FFFFFF] font-bold">
              +{remainingCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const TeamCardProject = ({ className, onclick, team }) => {
  const teamPhotos = [Woman, Woman, Woman, Woman, Woman];


  return (
    <div className="flex flex-col items-center gap-1 justify-between mt-5">
      {/* <SmallTitle className={"mt-1"}>Team</SmallTitle> */}
      <div className="w-[70%] h-[90px] bg-[#FDFDFD] rounded-[25px] overflow-hidden flex justify-center items-center p-0 mb-2 shadow-md">
        {team ? <div className=" w-[340px] h-[65px]  rounded-[25px] flex space-x-4">
          {team.colaboradores.map((colaborador, index) => (
            <div
              key={colaborador.idColaborador}
              className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 relative"
            >
              <Image
                src={colaborador.foto}
                alt={`Foto ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div> :
          <p className='text-[#E00004]'>Equipe ainda não foi definida</p>
        }
      </div>
      <div className="flex self-end">
        <ButtonProject onclick={onclick} className="h-[35px] text-[14px]" textbutton={`${team ? "Editar" : "Definir"} equipe`} />
      </div>
    </div>
  );
};