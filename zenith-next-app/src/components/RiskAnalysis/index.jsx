"use client";

import React, { useState, useEffect } from "react";
import { BarChart } from "../BarChart";
import { Calendar, Clock } from "lucide-react";
import { SectorChart } from "../SectorChart";
import { DefaultParagraph, SmallTitle, TypeTitleRisk } from "../Text";
import {
  calcularPorcentagemMaisFrequente,
  calcularPorcentagemPorItem,
  gerarCor,
  gerarCorAleatoria,
} from "@/Utils/StringFunctions";

export const RiskAnalysis = ({ data }) => {
  const [chartKey, setChartKey] = useState(0); // Força re-render do gráfico
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const areasDeRisco = data.riscos.map((risco) => risco.areaRisco);
    const porcentagensRisco = calcularPorcentagemPorItem(areasDeRisco);

    // console.log(porcentagensRisco);

    const newChartData = Object.entries(porcentagensRisco).map(
      ([areasDeRisco, count], index) => ({
        areasDeRisco,
        count: parseFloat(count),
        fill: gerarCor(index),
      })
    );

    setChartData(newChartData);
  }, []);

  return (
    <div className="flex flex-col items-start gap-2 w-[450px] mr-0 ml-40">
      <SmallTitle>Análise de riscos</SmallTitle>
      <div className="w-[100%] h-full bg-[#fbfbfb] rounded-[25px] overflow-hidden flex flex-col p-0">
        <div className="flex justify-start items-start h-full">
          <div className="w-full flex justify-start items-center h-full">
            <SectorChart chartData={chartData} key={chartKey} />
            {/* <div className="pb-10">
              <TypeTitleRisk classname={"mb-4"}>Frontend</TypeTitleRisk>
              <DefaultParagraph classname="text-xs w-auto h-auto text-center text-[#718EBF]  ">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
              </DefaultParagraph>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
