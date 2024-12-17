"use client";
import React, { useEffect, useState } from "react";
import IconUser from "../../assets/Icons/userDefaultImage.jpg";
import { MdClass, MdModeEdit } from "react-icons/md";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const Input = ({
  label,
  value,
  onChange,
  placeholder,
  classname,
  style,
  type,
}) => {
  return (
    <div className={`${classname}`}>
      {label && (
        <label className="block text-sm font-medium text-[#232323] text-[16px] mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-[418px] h-[50px] bg-white border border-[#2D60FF] rounded-[15px] p-2 focus:outline-none focus:focus-visible focus:blue-400 placeholder-gray-500 text-[#232323] text-[15px] ${style}`}
      />
    </div>
  );
};
export const Input2 = ({
  label,
  value,
  onChange,
  placeholder,
  classname,
  style,
  type,
}) => {
  return (
    <div className={`mb-4 ${classname}`}>
      {label && (
        <label className="block text-sm font-medium text-[#232323] text-[16px] mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`h-[50px] bg-white border border-[#2D60FF] rounded-[15px] p-2 focus:outline-none focus:focus-visible focus:blue-400 placeholder-gray-500 text-[#232323] text-[15px] ${style}`}
      />
    </div>
  );
};

export const BlueInput = ({
  label,
  value,
  onChange,
  placeholder,
  classname,
  type,
  children, // Permite a passagem de ícones
}) => {
  return (
    <div className={`mb-4 w-[500px] lg:w-[515px] ${classname}`}>
      {label && (
        <label className="block font-medium text-[#202224] opacity-[60%] text-[15px] mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="h-[55px] w-full bg-white border-2 border-[#2D60FF] rounded-[12px] p-2 focus:outline-none focus:ring-2 focus:ring-[#2D60FF] focus:bg-[#F5F7FA] hover:bg-[#F5F7FA] transition-all duration-300 placeholder-gray-500 text-[#848484] text-[16px] font-medium"
        />

        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {children}
        </div>
      </div>
    </div>
  );
};
;


export const Textarea = ({
  label,
  value,
  onChange,
  placeholder,
  classname,
}) => {
  return (
    <div className={`mb-4 ${classname}`}>
      {label && (
        <label className="block text-sm font-medium text-[#232323] text-[16px] mb-2">
          {label}
        </label>
      )}
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-[400px] lg:w-[540px] lg:ml-6 mb-0  lg:h-[405px] bg-white border border-[#2D60FF] rounded-[15px] p-2 focus:outline-none placeholder-gray-500 text-[#718EBF] text-[15px] resize-none"
      />
    </div>
  );
};

// import DefaultImage from "../../assets/Icons/IconUser.svg"

import Image from "next/image";
import { ModalMoreInformations } from "../Modal";

export const ImgInput = ({ style, selectedImage, setSelectedImage }) => {
  // Salva a src da imagem pelo input de imagem
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        return;
      }
      setSelectedImage(file);
      console.log(file);
    }
  };

  return (
    <div className="h-[150px] w-[150px] relative rounded-full border-4 border-[#2D60FF]">
      <Image
        fill
        className={`object-cover rounded-full`}
        src={selectedImage ? URL.createObjectURL(selectedImage) : IconUser}
        alt="Prévia da imagem"
      />
      <div className="flex  items-center justify-center h-[40px] w-[40px] rounded-full bg-mainColors-primaryblue absolute top-[110px] left-[105px] hover:bg-[#1a47b7] transition duration-200 hover:scale-105">
        <label
          htmlFor="img-input"
          className="relative flex items-center justify-center cursor-pointer"
        >
          <MdModeEdit className="h-full w-full" color="#FFFFFF" />
          <input
            id="img-input"
            className={`hidden absolute w-[293px] h-44 object-scale-down z-20`}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            alt="Imagens inseridas na nova postagem"
          />
        </label>
      </div>
    </div>
  );
};

export const InputProject = ({
  label,
  value,
  onChange,
  placeholder,
  classname,
  style,
  type,
}) => {
  return (
    // <div className={`${classname}`}>
    // {label && (
    <div className="w-full lg:w-[30%] h-[50%]">
      <label className="text-xl font-bold text-[#343C6A] mb-2">{label}</label>

      <p
        className={`w-[100%] h-[185px] border border-[#DFEAF2] rounded-3xl p-5 text-[#718EBF] text-base text-justify mt-3 ${style} `}
      >
        {value
          ? value.length > 210
            ? `${value.slice(0, 210)}...`
            : value
          : "Descrição não disponível"}
      </p>
    </div>
  );
};

export const InputInformation = ({
  label = "",
  value = "",
  onChange,
  placeholder,
  classname,
  style = "",
  type,
  nomeProjeto
}) => {
  return (
    <div className="h-full w-full">
      <label className="block text-xl font-bold text-[#343C6A] mb-2">
        {label}
      </label>

      <p
        className={`w-[100%] h-[40%] mr-10 border border-[#DFEAF2] rounded-3xl p-5 text-[#718EBF] text-base text-justify  ${style} `}
      >
        {value
          ? value.length > 455
            ? `${value.slice(0, 455)}...`
            : value
          : "Descrição não disponível"}
      </p>
      {value.length > 445 ?
        <ModalMoreInformations text={value} title={label + " Sobre o projeto " + nomeProjeto + "..."}>
          <p className='text-[#343C6A] w-[450px]  lg:w-[600px] text-end mb-2'>Ver mais...</p>
        </ModalMoreInformations>
        : null}
    </div>
    // </div>
  );
};

export const InputInformationFull = ({
  label,
  value,
  nomeProjeto,
  onChange,
  placeholder,
  classname,
  style,
  seeMoreStyle,
  type,
}) => {
  return (
    // <div className={`${classname}`}>
    // {label && (
    <div>
      <label className="block text-xl font-bold text-[#343C6A] mb-2">
        {label}
      </label>

      <p
        className={`w-[590px] h-[403px] border border-[#DFEAF2] rounded-3xl p-5 text-[#718EBF] text-base text-justify  ${style} `}
      >
        {value
          ? value.length > 950
            ? `${value.slice(0, 950)}...`
            : value
          : "Descrição não disponível"}
      </p>
      {value.length > 1062 ?
        <ModalMoreInformations style={seeMoreStyle} text={value} title={label + " do projeto " + nomeProjeto}>
          <p >ver mais</p>
        </ModalMoreInformations>
        : null}
    </div>
    // </div>
  );
};

export const InputInformationMultiples = ({ label, values, style }) => {
  return (
    <div className="w-full lg:w-[30%] h-[50%]">
      <label className="block text-xl font-bold text-[#343C6A] mb-2">
        {label}
      </label>
      <ul
        className={`w-[100%] max-h-[185px] overflow-y-auto border border-[#DFEAF2] rounded-3xl p-5 ${style}`}
      >
        {values.map((item) => (
          <li className="text-[#718EBF] text-base">{item}</li>
        ))}
      </ul>
    </div>
  );
};
