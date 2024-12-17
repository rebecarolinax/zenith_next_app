import moment from "moment";

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() começa de 0, então somamos 1
    const year = date.getFullYear();
    return `${day}/${month}`;
};

export const calcularDiasRestantes = (dataInicio, dataFinal) => {
    // Convertendo as strings para objetos Date
    const date1 = moment();
    const date2 = moment(dataFinal);

    // Calculando a diferença em milissegundos
    console.log(date1)
    console.log(date2)
    const timeDifference = date2.diff(date1);
    console.log(timeDifference)

    if(moment.duration(timeDifference).asDays() > calcalarDiasTotais(moment(dataInicio).format("DD/MM/YYYY"), moment(dataFinal).format("DD/MM/YYYY"))){
        return calcalarDiasTotais(moment(dataInicio).format("DD/MM/YYYY"), moment(dataFinal).format("DD/MM/YYYY")) +" dias" 
    } 

    return timeDifference < 0 ? "projeto concluído" : Math.floor(moment.duration(timeDifference).asDays()) + " dias";
};

export const calcalarDiasTotais = (dataInicio, dataFim) => {
    try {
        const inicio = moment(dataInicio, "DD/MM/YYYY");
        const fim = moment(dataFim, "DD/MM/YYYY");

        const diferenca = fim.diff(inicio);
        const quantidadeDias = Math.floor(moment.duration(diferenca).asDays());

        return quantidadeDias < 0 ? "projeto concluído" : quantidadeDias;
    } catch (error) {
        return `Erro: ${error.message}`;
    }
};


export const calcularPorcentagemPorItem = (lista) => {
    if (!lista || lista.length === 0) return {};

    // Contar a frequência de cada string
    const frequencias = lista.reduce((contagem, item) => {
        contagem[item] = (contagem[item] || 0) + 1;
        return contagem;
    }, {});

    // Calcular a porcentagem para cada string
    const total = lista.length;
    const porcentagens = Object.entries(frequencias).reduce((resultado, [item, frequencia]) => {
        resultado[item] = ((frequencia / total) * 100).toFixed(2);
        return resultado;
    }, {});

    return porcentagens;
}

export const gerarCor = (index) => {
    const letras = "0123456789ABCDEF";

    const cores = [
        "#4CAF50", // Verde suave
        "#2196F3", // Azul médio
        "#FF5722", // Laranja vibrante
        "#E91E63", // Rosa intenso
        "#9C27B0", // Roxo
        "#FFC107", // Amarelo dourado
        "#00BCD4", // Azul-ciano
        "#607D8B", // Cinza-azulado
        "#FF9800", // Laranja quente
        "#8BC34A"  // Verde limão
    ];

    let cor = "#";
    for (let i = 0; i < 6; i++) {
        cor += letras[Math.floor(Math.random() * 16)];
    }

    if (index > 9) {
        return cor;
    } else {
        return cores[index]
    }
};