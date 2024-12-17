"use client";

import React, { useState, useEffect } from "react";
import { BarChart } from "../BarChart";
import { Calendar, Clock } from "lucide-react";
import { SmallTitle } from "../Text";
import { calcalarDiasTotais, calcularDiasRestantes, formatDate } from "@/Utils/StringFunctions";
import moment from "moment";

export const WhiteCard = ({ data }) => {
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  if (!client) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 ml-72 w-[90%] h-[100%]">
      <div className="w-full h-[100%] bg-[#FBFBFB] rounded-[25px] overflow-hidden flex flex-col p-6">
        <h2 className="text-[#343C6A] font-semibold text-[20px] leading-[24px] ml-4">
          {data.nome}
        </h2>

        <p className="font-normal text-[16px] leading-[19px] text-[#718EBF] ml-4 mt-5">
          {data.descricao}
        </p>

        <div className="flex justify-between h-[250px] mt-10">
          <div className="flex-shrink-0 flex flex-col max-w-[50%] space-y-6 mr-4 mt-6">
            <div className="flex items-center space-x-2">
              <div className="w-[45px] h-[45px] bg-[#16dbcb23] rounded-full flex items-center justify-center">
                <Calendar className="text-[#16DBCC] w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-[#343C6A] font-semibold text-[16px] leading-[25px]">
                  Cronograma
                </h3>
                <p className="text-[#718EBF] font-normal text-[12px] leading-[17px]">
                  {formatDate(data.dataInicio)} - {formatDate(data.dataFinal)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-[45px] h-[45px] bg-[#1814f329] rounded-full flex items-center justify-center">
                <Clock className="text-[#1814F3] w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <p className="text-[#232323] font-semibold text-[16px] leading-[25px]">
                  Dias Restantes
                </p>
                <p className="text-[#718EBF] font-normal text-[12px] leading-[17px]">
                  {calcularDiasRestantes(data.dataInicio, data.dataFinal)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ClockComponent = ({ boxStyle, data }) => {

  return (
    <div className={`flex-shrink-0 flex flex-col max-w-[50%] space-y-6 mr-4  justify-evenly pb-5 ${boxStyle}`}>
      <div className="flex items-center space-x-2">
        <div className="w-[55px] h-[45px] bg-[#16dbcb23] rounded-full flex items-center justify-center">
          <Calendar className="text-[#16DBCC] w-6 h-6" />
        </div>
        <div className="flex flex-col w-40">
          <h3 className="text-[#343C6A] font-semibold text-[16px] leading-[25px]">
            Dias totais
          </h3>
          <p className="text-[#718EBF] font-normal text-[12px] leading-[17px]">
            {calcalarDiasTotais(moment(data.dataInicio).format("DD/MM/YYYY"), moment(data.dataFinal).format("DD/MM/YYYY"))} dias
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="w-[85px] h-[45px] bg-[#1814f329] rounded-full flex items-center justify-center">
          <Clock className="text-[#1814F3] w-6 h-6" />
        </div>
        <div className="flex flex-col w-60">
          <p className="text-[#232323] font-semibold text-[16px] leading-[25px]">
            Dias Restantes
          </p>
          <p className="text-[#718EBF] font-normal text-[12px] leading-[17px]">
            {calcularDiasRestantes(data.dataInicio, data.dataFinal)}
          </p>
        </div>
      </div>
    </div>
  )
}

export const Cronograma = ({ boxStyle, data }) => {
  return (
    <div className={`flex-shrink-0 flex flex-col max-w-[50%] space-y-6 mr-4 ${boxStyle}`}>
      <div className="flex items-center space-x-2">
        {/* <div className="w-[45px] h-[45px] bg-[#16dbcb23] rounded-full flex items-center justify-center">
          <Calendar className="text-[#16DBCC] w-6 h-6" />
        </div> */}
        <div className="flex flex-col border-2 p-2 rounded-xl border-[#DFEAF2] w-[100%]">
          <h3 className="text-[#343C6A] font-semibold text-base leading-[25px]">
            Data de Início
          </h3>
          <p className="text-[#718EBF] font-normal text-sm leading-[17px]">
            {data.dataInicio}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {/* <div className="w-[45px] h-[45px] bg-[#1814f329] rounded-full flex items-center justify-center">
          <Clock className="text-[#1814F3] w-6 h-6" />
        </div> */}
        <div className="flex flex-col border-2 p-2 rounded-xl border-[#DFEAF2]">
          <p className="text-[#343C6A] font-semibold text-base leading-[25px]">
            Data de Finalização
          </p>
          <p className="text-[#718EBF] font-normal text-sm leading-[17px]">
            {data.dataFinal}
          </p>
        </div>
      </div>
    </div>
  )
}
