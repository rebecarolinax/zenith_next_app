"use client";
import Image from "next/image";
import { useDrag, useDrop } from "react-dnd";
import { SmallTitle, Text } from "../Text";
import { useState } from "react";
import { ItemType } from "@/Services/Service";
import { IoClose } from "react-icons/io5";
import Spinner from "react-spinner";
import { produce } from "immer";
import { Button } from "../Button";
import { DotLoader } from "react-spinners";

export const Container = ({ children }) => {
  return <div className="w-full h-full flex-grow">{children}</div>;
};

export const ContainerPlatform = ({ children, style }) => {
  return <div className={`w-full h-full pl-[360px] ${style}`}>{children}</div>;
};

export const ContainerCard = ({ children, style, ref, className }) => {
  return (
    <div
      ref={ref}
      className={`mt-5 p-8 w-[${style}] bg-[#FDFDFD] rounded-3xl shadow-md ${className}`}
    >
      {children}
    </div>
  );
};

export const TechCard = ({ prop }) => {
  return (
    <div className=" flex items-center justify-center w-[90px] h-[30px] bg-[#FFFFFF] rounded-2xl border border-[#DFEAF2] shadow-sm">
      <p className=" text-xs text-center font-normal text-[#718EBF]">{prop}...</p>
    </div>
  );
};

// export const Card = ({ user, origin }) => {

//   const [{ isDragging }, dragRef] = useDrag(() => ({
//     type: 'CARD',
//     item: { ...user, from: 'developers' }, // Adicione `from`
//     collect: (monitor) => ({
//         isDragging: monitor.isDragging(),
//     }),
// }));

//   return (
//     <div
//       ref={dragRef}
//       style={{
//         opacity: isDragging ? 0.5 : 1,
//         cursor: 'move',
//       }}
//       className=" w-[350px] h-[140px] p-2 bg-[#FDFDFD] rounded-2xl shadow-md flex flex-col items-center"
//     >
//       <div className="flex items-center gap-4 mr-24 mt-2">
//         <Image
//           className="rounded-full w-[70px] h-[70px]"
//           src={user.foto}
//         />

//         <div className="flex-col">
//           <SmallTitle>{user.nome}</SmallTitle>
//           <Text>{user.senioridade}</Text>
//         </div>
//       </div>

//       <div className="mt-4 flex gap-5">
//         {/* Lista das techSkills */}
//         {user.techSkills.slice(0, 3).map((skill, index) => (
//           <TechCard key={index} prop={skill} />
//         ))}

//       </div>

//     </div>
//   );
// }

// export const ContainerCardDrag = ({ team, onCardDrop }) => {

//   const [{ isOver }, dropRef] = useDrop(() => ({
//     accept: ItemType.CARD,
//     drop: (item) => onCardDrop(item),
//     collect: (monitor) => ({
//       isOver: monitor.isOver(),
//     }),
//   }));

//   return (
//     <div
//       ref={dropRef}
//       style={{
//         backgroundColor: isOver ? "#f0f0f0" : "#fff",
//         border: "1px dashed #ccc",
//       }}
//       className={`mt-5 p-8 bg-[#FDFDFD] h-[300px] rounded-3xl shadow-md`}
//     >
//       <ul className="flex flex-wrap">
//         {team.map((card) => (
//           <div
//             key={card.id}
//             className="flex flex-col w-[120px] items-center gap-4 mt-2">
//             <Image
//               className="rounded-full w-[70px] h-[70px]"
//               src={card.foto}
//             />

//             {/* <div> */}
//             <SmallTitle classname={"text-center"}>{card.nome}</SmallTitle>
//             {/* <Text>{user.senioridade}</Text> */}
//             {/* </div> */}
//           </div>

//         ))}
//       </ul>
//     </div>
//   );
// };

export const Card = ({ user, index, listIndex }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "CARD",
    item: { ...user, from: "developers" }, // Adiciona `from`
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={dragRef}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        // display: isHidden ? 'hidden' : 'block'
      }}
      className={` w-[350px] h-[140px] p-2 bg-[#FDFDFD] rounded-2xl shadow-md flex flex-col items-center`}
    >
      <div className="flex items-center gap-4 mr-24 mt-2 rounded-full">
        <div className="w-[60px] h-[60px]">
          <Image
            className="ml-3 rounded-full w-[60px] h-[60px]"
            width={60}
            height={60}
            src={user.foto}
            objectFit="cover"
          />
        </div>
        <div className="flex-col">
          <SmallTitle className={"w-[180px] ml-2 text-lg"}>{user.nome.split(" ").slice(0, 2).join(" ")}</SmallTitle>
          <Text className="ml-2">{user.senioridade}</Text>
        </div>
      </div>

      <div className="mt-4 flex gap-5">
        {user.techSkills ? (
          user.techSkills
            .slice(0, 3)
            .map((skill, index) => <TechCard key={index} prop={skill.slice(0, 10)} />)
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export const ContainerCardDrag = ({
  moveCard,
  team,
  setTeam,
  setDevelopers,
  onClick,
  textButton,
  loading,
}) => {
  // const [team, setTeam] = useState([]);

  const removeFromTeam = (item) => {
    // setTeam((prev) =>
    //   produce(prev, (draft) => {
    //     var dev = prev.find((itm, _) => itm.idUsuario === item.idUsuario);

    //     prev.filter((x, _) => x.idUsuario !== item.idUsuario);

    // setDevelopers((pv) => [...pv, dev])
    // const index = draft.findIndex((user) => user.idUsuario === item.idUsuario);
    // if (index !== -1) draft.splice(index, 1);
    //   })
    // );

    setTeam((prev) => prev.filter((x, _) => x.idUsuario != item.idUsuario));

    setDevelopers((prev) => [...prev, item]);

    // setDevelopers((prev) =>
    //     produce(prev, (draft) => {
    //         draft.push(item);
    //     })
    // );
  };

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: "CARD",
    drop: (item) => {
      moveCard(item, item.from, "team");
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <>
      <div
        ref={dropRef}
        style={{
          backgroundColor: isOver ? "#f0f0f0" : "#fff",
          border: "1px dashed #ccc",
        }}
        className={`mt-3 p-8 bg-[#FDFDFD] h-[400px] rounded-3xl shadow-md mb-6`}
      >
        {loading ? (
          <div className="w-full h-full flex justify-center items-center gap-5 pr-10 pb-40">
            <DotLoader color="#2D60FF" />
            <p>{textButton}ndo Equipe</p>
          </div>
        ) : team.length > 0 ? (
          <ul className="flex flex-wrap justify-center gap-3">
            {team.map((card, index) => (
              <div
                key={index}
                className="flex flex-col w-[120px] h-[140px] justify-center border border-[#00000010] items-center  mt-2 shadow-md bg-white rounded-xl"
              >
                <IoClose
                  className="relative left-11 top-0 cursor-pointer"
                  onClick={() => removeFromTeam(card)}
                />

                <div className="w-[60px] h-[60px] mb-3">
                  <Image
                    className="rounded-full w-[60px] h-[60px]"
                    width={60}
                    height={60}
                    src={card.foto}
                    objectFit="cover"
                  />
                </div>


                <div className="flex-col">
                  <SmallTitle className={"text-center text-sm"}>
                    {card.nome.split(" ").slice(0, 2).join(" ")}
                  </SmallTitle>
                </div>
              </div>
            ))}
          </ul>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <p>Defina uma equipe para este projeto.</p>
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <Button
          onClick={onClick}
          classname={"mb-6"}
          textbutton={textButton + "r Equipe"}
        />
      </div>
    </>
  );
};
