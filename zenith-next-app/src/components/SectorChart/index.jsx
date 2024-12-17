"use client";

import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart, Sector } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// const chartData = [
//   { browser: "Frontend", visitors: 275, fill: "var(--color-chrome)" },
//   { browser: "Backend", visitors: 200, fill: "var(--color-safari)" },
//   { browser: "Database", visitors: 187, fill: "var(--color-firefox)" },
//   { browser: "Other", visitors: 90, fill: "var(--color-other)" },
// ];

// const chartConfig = {
//   visitors: {
//     label: "Visitors",
//   },
//   chrome: {
//     label: "Frontend",
//     color: "hsl(var(--chart-1))",
//   },
//   safari: {
//     label: "Backend",
//     color: "hsl(var(--chart-2))",
//   },
//   firefox: {
//     label: "Database",
//     color: "hsl(var(--chart-3))",
//   },
//   other: {
//     label: "Other",
//     color: "hsl(var(--chart-5))",
//   },
// };

export const SectorChart = ({ chartData }) => {
  return (
    <Card className="flex flex-col flex-1 items-center justify-center border-none h-full">
      <CardContent className="flex h-full">
        <ChartContainer
          config={chartData}
          className="aspect-square h-[200px] flex items-start mr-10"
        >
          <PieChart className="">
            <ChartTooltip
              className="bg-black border-none rounded-[25px] text-white w-[180px]"
              cursor={true}
              content={<ChartTooltipContent hideLabel />}
            />

            <Pie
              data={chartData}
              dataKey="count"
              nameKey="areasDeRisco"
              innerRadius={30}
              strokeWidth={5}
              // activeIndex={0}
              activeShape={({ outerRadius = 0, ...props }) => (
                <Sector {...props} outerRadius={outerRadius + 10} />
              )}
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="areasDeRisco" />}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
