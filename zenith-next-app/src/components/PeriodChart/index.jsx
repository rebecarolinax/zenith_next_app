"use client";

import { api } from "@/Services/Service";
import { useEffect, useState } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "../ui/chart";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { IoIosArrowDown } from "react-icons/io";
import { SmallTitle } from "../Text";

export const GraphicProjectTypeByPeriod = ({ userData }) => {
    const [projectsList, setProjectsList] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [chartConfig, setChartConfig] = useState({});
    const [timeRange, setTimeRange] = useState("180d"); // Período de 6 meses
    const [chartKey, setChartKey] = useState(0);
    const [isFirstRender, setIsFirstRender] = useState(true);

    // Função para buscar projetos da API
    const fetchProjects = async () => {
        try {
            const url =
                userData.cargo === "Administrador"
                    ? `/Projeto/ListarTodos`
                    : userData.cargo === "Gerente De Projetos"
                        ? `/Projeto/ListarProjetosPeloUsuario/${userData.id}`
                        : userData.cargo === "Colaborador"
                            ? `/Projeto/ListarPeloColaborador/${userData.colaborador}`
                            : null;

            if (!url) throw new Error("Cargo não reconhecido.");

            const response = await api.get(url);
            setProjectsList(response.data || []);
        } catch (error) {
            console.error("Erro ao buscar projetos:", error.message);
        }
    };

    // Gerar o intervalo de meses (180d ou 90d)
    const getStartAndEndDates = (timeRange) => {
        const today = new Date();
        const startDate = new Date(today);
        startDate.setDate(1); // Primeiro dia do mês atual

        const daysToSubtract = timeRange === "90d" ? 90 : 180;
        startDate.setDate(startDate.getDate() - daysToSubtract);

        return { startDate, endDate: today };
    };

    const { startDate, endDate } = getStartAndEndDates(timeRange);

    // Gerar intervalo de meses
    const generateMonthsInRange = (startDate, endDate) => {
        const months = [];
        const currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            months.push({ mes: currentDate.getMonth() + 1, ano: currentDate.getFullYear() });
            currentDate.setMonth(currentDate.getMonth() + 1);
        }

        return months;
    };

    const monthsInRange = generateMonthsInRange(startDate, endDate);

    // Agrupar projetos por tipo e mês
    const groupedData = projectsList.reduce((acc, project) => {
        const date = new Date(project.dataInicio);
        const monthYear = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`;
        const type = project.tipoProjeto.toLowerCase();

        if (!acc[monthYear]) acc[monthYear] = {};
        if (!acc[monthYear][type]) acc[monthYear][type] = 0;

        acc[monthYear][type] += 1;
        return acc;
    }, {});

    // Completar dados ausentes para cada tipo de projeto
    const chartDataPrepared = monthsInRange.map(({ mes, ano }) => {
        const monthYear = `${ano}-${mes.toString().padStart(2, "0")}`;
        const entry = { date: new Date(ano, mes - 1).toLocaleDateString("pt-BR", { month: "short", year: "numeric" }) };

        // Preencher com zero caso o tipo não exista para aquele mês
        Object.keys(groupedData[monthYear] || {}).forEach((type) => {
            entry[type] = groupedData[monthYear][type];
        });

        // Garantir que todos os tipos estejam presentes, mesmo que com valor 0
        const allTypes = [
            "realidade aumentada", "machine learning", "internet das coisas",
            "desenvolvimento web", "inteligência artificial", "desenvolvimento de software",
        ]; // ou os tipos de projeto reais
        allTypes.forEach((type) => {
            if (!(type in entry)) {
                entry[type] = 0; // Se o tipo não existir para o mês, define como 0
            }
        });

        return entry;
    });

    console.log("Dados agrupados e preparados para o gráfico:", chartDataPrepared);

    // Gerar cores únicas para cada tipo de projeto
    const generateChartConfig = () => {
        const config = {};
        const types = [...new Set(projectsList.map((project) => project.tipoProjeto))];
        types.forEach((type, index) => {
            config[type.toLowerCase()] = {
                label: type,
                color: `hsl(${index * 1000}, 70%, 50%)`, // Gera cores diferentes para os tipos de projetos
            };
        });
        setChartConfig(config);
    };

    useEffect(() => {
        fetchProjects();
    }, [userData]);

    useEffect(() => {
        if (projectsList.length > 0) {
            generateChartConfig();
            setChartData(chartDataPrepared); // Atualiza os dados processados para o gráfico
        }
    }, [projectsList, timeRange]); // Atualiza apenas quando os dados ou o intervalo de tempo mudarem

    useEffect(() => {
        // Atualiza o chartKey apenas quando os dados do gráfico forem atualizados
        if (chartData.length > 0) {
            setChartKey((prevKey) => prevKey + 1);
        }
    }, [chartData]);

    console.log("Select component rendered:", projectsList.length);
    return (
        <>
            <div className="w-[100%]">
                <SmallTitle className="pl-3 font-semibold ml-[270px] text-[24px] lg:ml-0">Distribuição de Tipos de Projetos</SmallTitle>
            </div>

            <Card className="flex flex-col bg-[#FbFbFb] rounded-[25px] w-[65%] lg:w-[96%] lg:h-[420px] border-transparent ml-[270px] lg:ml-0 ">
                <CardHeader className="flex items-center gap-2 space-y-0 py-5 sm:flex-row relative">
                    <div className="grid flex-1 gap-1 text-center sm:text-left ">
                        <CardDescription className="text-sm lg:text-normal">
                            Uma análise dos projetos categorizados por tipo e período.
                        </CardDescription>
                    </div>
                    <div className="relative">
                        <Select value={timeRange} onValueChange={setTimeRange} >
                            <SelectTrigger
                                className="w-32 lg:w-56 h-8  bg-blue-800 border border-blue-700 rounded-[25px] px-3 py-0 text-white shadow-sm  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition flex  "
                                aria-label="Select a value"
                            >
                                <div className='mt-1 p-[2px] pl-[13px] flex lg:text-sm text-center'>
                                    <SelectValue placeholder="Select a period">
                                        Selecione um período
                                    </SelectValue>
                                    <div className='ml-2 mt-1'>
                                        <IoIosArrowDown />
                                    </div>
                                </div>
                            </SelectTrigger>
                            <SelectContent
                                side="bottom"
                                align="center"
                                className="z-1000 bg-white border w-32 shadow-lg rounded-xl mt-2 lg:w-56 opacity-100"
                            >
                                <SelectItem
                                    value="180d"
                                    className="cursor-pointer px-4 py-2 rounded-xl text-sm text-gray-700 lg:text-base transition"
                                >
                                    Últimos 180 dias
                                </SelectItem>
                                <SelectItem
                                    value="90d"
                                    className="cursor-pointer px-4 py-2 rounded-xl text-sm text-gray-700 lg:text-base transition"
                                >
                                    Últimos 90 dias
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>
                <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                    <ChartContainer
                        config={chartConfig}
                        className="aspect-auto h-[250px] w-full"
                    >
                        <AreaChart data={chartDataPrepared} key={chartKey}>
                            <defs>
                                {Object.keys(chartConfig).map((key) => {
                                    // Adicionando um log para verificar os gradientes gerados
                                    console.log(`Gradiente criado para o tipo: ${key} com cor: ${chartConfig[key].color}`);

                                    return (
                                        <linearGradient id={`fill-${key}`} x1="0" y1="0" x2="0" y2="1" key={key}>
                                            <stop offset="5%" stopColor={chartConfig[key].color} stopOpacity={0.8} />
                                            <stop offset="95%" stopColor={chartConfig[key].color} stopOpacity={0.1} />
                                        </linearGradient>
                                    );
                                })}
                            </defs>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                minTickGap={32}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={({ payload, label }) => {
                                    if (payload && payload.length) {
                                        return (
                                            <div className="bg-white text-black shadow-md p-2 rounded text-sm border border-blue-800 opacity-80">
                                                <strong>{label}</strong>
                                                {payload.map((entry, index) => (
                                                    <div key={`tooltip-${index}`}>
                                                        <span className="font-bold text-blue-900">{entry.name}: </span>
                                                        {entry.value} projetos
                                                    </div>
                                                ))}
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            {Object.keys(chartConfig).map((key) => {
                                // Adicionando um log para verificar se o key é o correto para o fill

                                return (
                                    <Area
                                        key={key}
                                        dataKey={key}
                                        type="basis"
                                        fill="url(#fill-fixed)"  // Para testar com um gradiente fixo
                                        stroke={chartConfig[key].color}
                                    />
                                );
                            })}
                            <ChartLegend className="hidden lg:flex" content={<ChartLegendContent />} />
                        </AreaChart>

                    </ChartContainer>
                </CardContent>
            </Card>
        </>
    );
};
