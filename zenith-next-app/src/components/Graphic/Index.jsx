"use client";

import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  ChartTooltip,
  ChartTooltipContent,
  ChartContainer,
  ChartLegend,
  ChartLegendContent, // Assegurando que o ChartContainer esteja importado
} from "@/components/ui/chart";
import { SmallTitle } from "../Text";
import Spinner from "react-spinner";
const chartConfig = {
  Low: { label: "Baixo", color: "hsl(var(--chart-1))" },
  Medium: { label: "Médio", color: "hsl(var(--chart-2))" },
  High: { label: "Alto", color: "hsl(var(--chart-3))" },
};

export function GraphicRiskLevel({ chartData }) {
  return (
    <main className="ml-[270px]  lg:w-[55%] flex flex-col gap-2 max-xl:gap-4 lg:ml-0">
      <SmallTitle className={"pl-3 font-semibold text-[24px]"}>Níveis de risco</SmallTitle>
      <Card className="flex flex-col bg-[#FbFbFb] rounded-[25px] lg:w-[484px] h-[420px] border-transparent max-xl:w-[100%]">
        <CardContent className=" w-[500px] flex pb-0 lg:w-[484px]">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square h-[435px]"
          >
            <PieChart width={400} height={400}>
              <ChartTooltip
                className="bg-black border-none rounded-[25px] text-white"
                cursor={true}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="typeRisk"
                stroke="#ffffff"
                strokeWidth={3}
                fill="#8884d8"
              />

              <ChartLegend
                content={<ChartLegendContent nameKey="typeRisk" />}
                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center py-8"
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </main>
  );
}

export function GraphicRisks({ chartData, description }) {
  return (
    <main className="flex flex-col gap-2">
      {/* <SmallTitle className={"pl-3 font-semibold text-[24px]"}>Risk Levels</SmallTitle> */}
      <Card className="flex flex-col w-[100%] h-[330px] border-none shadow-none items-center">
        <CardContent className="flex p-0 gap-5 items-center">
          <ChartContainer
            config={chartData}
            className=" flex flex-col mx-auto aspect-square w-[430px] h-[300px] items-center justify-center  rounded-[25px]"
          >
            <PieChart>
              <ChartTooltip
                className="bg-[#f0f0f0] border-none w-[180px]"
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="riskSkills"
                stroke="0"
              />
              <ChartLegend
                content={<ChartLegendContent nameKey="riskSkills" />}
                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center py-8"
              />
            </PieChart>
          </ChartContainer>
          {/* <div className="flex flex-col">
            <NameCard style={"text-lg"}>Riscos selecionados</NameCard>
            <p className="text-[#718EBF] text-base text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum pariatur velit voluptatibus animi a sunt consectetur!</p>
          </div> */}
        </CardContent>
      </Card>
      <div className="w-[100%]">
        <div className="text-[#718EBF] text-base text-justify">{description ? description.map((riscos, index) => (
          <p key={index}>
            {riscos.descricaoRisco}
          </p>
        )) : null}</div>
      </div>
    </main>
  );
}
