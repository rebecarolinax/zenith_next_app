import Image from "next/image";
import IconConfig from "../../assets/Icons/IconeConfig.svg";
import googleIcon from "../../assets/Icons/googleIcon.svg";
import microsoftIcon from "../../assets/Icons/microsoftIcon.svg";
import { Children } from "react";
import DefaultUser from "../../../public/assets/Icons/DefaultUser.svg";
import DeleteIcon from "../../assets/Icons/DeleteIcon.svg"
import EditIcon from "../../assets/Icons/EditIcon.svg";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const ButtonConfiguration = ({ styles, type, onClickBtn }) => {
  return (
    <button
      onClick={onClickBtn}
      type={type}
      className={`bg-mainColors-secundaryGray w-12 h-12 rounded-full ${styles} items-center flex justify-center`}
    >
      <Image src={IconConfig} />
    </button>
  );
};
export const ButtonUser = ({ className, type, onClickBtn, userImg }) => {
  return (
    <button
      onClick={onClickBtn}
      type={type}
      className={`w-14 h-14 ${className} items-center flex justify-center`}
    >
      <Image className="rounded-full" src={userImg} width={55} height={55} />
    </button>
  );
};

export const Button = ({ className, onClick, textbutton, fontWeight, type = "button" }) => {
  return (
    <button
      className={`w-[198px] h-[56px] bg-[#2D60FF] text-[#FFFFFF] ${fontWeight} rounded-[10px] flex items-center justify-center ${className}`}
      onClick={onClick}
      type={type}
    >
      {textbutton}
    </button>
  );
};

export const ButtonForm = ({ classname, onClick, textbutton, fontWeight }) => {
  return (
    <button
      className={`w-[60%] h-[56px] bg-[#2D60FF] text-[#FFFFFF] ${fontWeight} rounded-[10px] flex items-center justify-center ${classname}`}
      onClick={onClick}
    >
      {textbutton}
    </button>
  );
};
export const Button2 = ({ classname, onclick, children }) => {
  return (
    <button
      className={`bg-[#2D60FF] text-[#FFFFFF] font-semibold rounded-[10px] flex items-center justify-center w-full max-w-[418px] ${classname}`}
      onClick={onclick}
    >
      {children}
    </button>
  );
};


export const AuthenticationButton = ({ classname, onclick, isGoogle }) => {
  return (
    <button
      className={`w-[100%] h-[56px] bg-transparent text-[#2D60FF] font-semibold border border-[#2D60FFCC] rounded-[8px] flex items-center justify-center ${classname}`}
      onClick={onclick}
    >
      {/* Exibir o ícone */}
      <Image className="flex" src={isGoogle ? googleIcon : microsoftIcon} />

      {/* Exibir texto somente em telas maiores, aproximando do ícone */}
      <span className="hidden sm:block ml-2">{isGoogle ? "Google" : "Microsoft"}</span>
    </button>
  );
};

export const ButtonDelete = ({ onClick }) => {
  return (
    <button onClick={onClick} className="lg:p-3 sm:p-2 rounded-full bg-mainColors-white shadow-md">
      <Image
        src={DeleteIcon}
        width={16}
        height={16}
      />
    </button>
  )
}
export const ButtonEdit = ({ onClick }) => {
  return (
    <button onClick={onClick} className="lg:p-3 sm:p-2 rounded-full bg-mainColors-white shadow-md">
      <Image
        src={EditIcon}
        width={20}
        height={20}
      />
    </button>
  )
}


export const ButtonProject = ({ classname, onclick, textbutton, fontWeight }) => {
  return (
    <button
      className={`w-[145px] h-[50px] bg-[#2D60FF] text-[#FFFFFF] ${fontWeight} rounded-[10px] flex items-center justify-center ${classname}`}
      onClick={onclick}
    >
      {textbutton}
    </button>
  );
};
