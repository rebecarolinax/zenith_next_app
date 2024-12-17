"use client"

import Image from "next/image";
import Logo from "../../../src/assets/Icons/Logo.svg";
import DefaultUser from "../../assets/Icons/DefaultUser.svg";
import { TitleHeader } from "../Text";
import { ButtonConfiguration, ButtonUser } from "../Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useContext } from "react";
import { UserContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { LogOutIcon } from "lucide-react";


export const Header = ({ namePage, userImage }) => {
  const { setUserData } = useContext(UserContext);
  const navigate = useRouter();

  const UserLogout = () => {
    localStorage.removeItem("usuario");
    setUserData({});
    navigate.replace("/");
  }

  return (
    <header className="w-screen flex h-[80px] justify-between px-10 items-center bg-[#FBFBFB] shadow-sm mb-2 fixed top-0 z-50">
      <div className="flex flex-row gap-[90px] items-center h-full">
        <Image src={Logo} width={145} height={35} alt="Logo" />
        <TitleHeader classname={"text-2xl !mt-[0px]"}>{namePage}</TitleHeader>
      </div>
      <div className="flex gap-6 items-center text-center">
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <ButtonConfiguration />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-red-600 shadow-md rounded-[30px] mt-2 border border-red-600 p-1 w-16 animate-fade-in items-center text-center hover:bg-red-600 text-white transition duration-200 hover:scale-105">
            <DropdownMenuItem
              onClick={UserLogout}
              className="cursor-pointer px-3 py-2 text-white rounded-md text-center flex items-center space-x-2">
              <LogOutIcon className="h-5 w-5 ml-[6px] text-white" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ButtonUser userImg={userImage} />
      </div>
    </header>
  );
};
