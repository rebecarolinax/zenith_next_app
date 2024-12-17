import { useEffect, useState } from "react";
import { CollaboratorCard } from "../CollaboratorCard";
import { ModalProfessionals } from "@/components/Modal";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { useDrop } from "react-dnd";
import { Card } from "../Contain";

export const List = ({ prop }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCollaborator, setSelectedCollaborator] = useState(null);
  const [updatedData, setUpdatedData] = useState(prop);

  const handleImageUpdate = (idUsuario, newImageUrl) => {
    setUpdatedData((prevData) =>
      prevData.map((item) =>
        item.idUsuario === idUsuario ? { ...item, foto: newImageUrl } : item
      )
    );
  };

  return (
    <div className=" w-[100%] h-screen lg:w-auto flex flex-wrap lg:h-[655px] gap-[30px] items-start mt-7 pl-5 overflow-y-scroll scrollbar-custom-blue lg:ml-64 ml-28 pb-60 lg:pb-40">
      {prop.map((item, index) => (
        <ul className="" key={index}>
          <Dialog>
            <DialogTrigger>
              <CollaboratorCard
                ImgColaborador={item.foto || ""}
                NomeColaborador={
                  item.nome
                    ? item.nome.length > 25
                      ? `${item.nome.slice(0, 25)}...`
                      : item.nome
                    : "Nome não disponível"
                }
                TipoColaborador={
                  item.cargo
                    ? item.cargo.length > 25
                      ? `${item.cargo.slice(0, 25)}...`
                      : item.cargo
                    : "Cargo não especificado"
                }
                EmailColaborador={
                  item.email
                    ? item.email.length > 25
                      ? `${item.email.slice(0, 25)}...`
                      : item.email
                    : "E-mail não disponível"
                }
              />
            </DialogTrigger>
            <ModalProfessionals
              dadosUsuario={item}
              idUsuario={item.idUsuario}
            />
          </Dialog>
        </ul>
      ))}

      {/* Modal */}
      {showModal && selectedCollaborator && (null
        // <ModalProfessionals
        //   idUsuario={id}
        //   dadosUsuario={selectedCollaborator}
        //   onClose={closeModal}
        //   onImageUpdate={handleImageUpdate}
        // />
      )}
    </div>
  );
};

export const ListDeveloper = ({ index: listIndex, developers, moveCard, team, user }) => {
  // const [developers, setDevelopers] = useState([]);

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: 'CARD',
    drop: (item) => {
      moveCard(item, item.from, 'developers'); // Passa `from` e `to`
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  useEffect(() => {
    console.log("listaaaaa", developers)
  }, [developers])

  return (
    <div
      ref={dropRef}
      className={`gap-3 flex flex-col w-[400px] h-[1000px] items-center overflow-y-scroll scrollbar-custom-blue ${isOver ? 'bg-gray-100' : ''}`}
    >
      <ul className="gap-5 flex flex-col">
        {developers.map((developer, index) => (
          <Card team={team} user={developer} key={developer.idUsuario} index={index} listIndex='developers' />
        ))}
      </ul>
    </div>
  );
};
