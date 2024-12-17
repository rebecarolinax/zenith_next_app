"use client";

import { Bar, BarChart as RechartsBarChart, CartesianGrid, XAxis } from "recharts";
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
    { week: "Monday", All: 305, Progress: 200 },
    { week: "Tuesday", All: 237, Progress: 120 },
    { week: "Wednesday", All: 73, Progress: 190 },
    { week: "Thursday", All: 209, Progress: 130 },
    { week: "Friday", All: 214, Progress: 140 },
];

const chartConfig = {
    All: {
        label: "All",
        color: "#1814F3",
    },
    Progress: {
        label: "Progress",
        color: "#16DBCC",
    },
};

export const BarChart = () => {
    return (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-[100%]">
            <RechartsBarChart data={chartData} width={500} height={300}>
                <XAxis
                    dataKey="week"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="All" fill={chartConfig.All.color} radius={4} />
                <Bar dataKey="Progress" fill={chartConfig.Progress.color} radius={4} />
            </RechartsBarChart>
        </ChartContainer>
    );
};
