// main.js

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("irpfForm");
    const limparButton = document.getElementById("limpar");
    const resultadoIRPFElement = document.getElementById("resultadoIRPF");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const valorRendimentosTributaveis = document.getElementById("rendimentosTributaveis").value;
        const resultadoIRPF = calcularIRPF(valorRendimentosTributaveis);
        resultadoIRPFElement.textContent = `R$ ${resultadoIRPF}`;
    });

    limparButton.addEventListener("click", function () {
        document.getElementById("rendimentosTributaveis").value = "";
        resultadoIRPFElement.textContent = "Informe o Novo rendimento: R$ 0.00";
    });

    function formatarValorDecimal(valor) {
        return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function calcularIRPF(valorRendimentosTributaveis) {
        // Substitua vírgulas por pontos para garantir que o valor seja interpretado corretamente
        const valorRendimentos = parseFloat(valorRendimentosTributaveis.replace(',', '.'));

        if (isNaN(valorRendimentos)) {
            return "Valor inválido";
        }

        const limiteDeducao = 16754.34; // Limite de dedução
        const baseCalculo = valorRendimentos - (valorRendimentos * 0.20); // Desconto de 20%
        const baseCalculoLimite = Math.min(baseCalculo, limiteDeducao);
        const aliquota = 0.075; // Alíquota do IRPF em 2023
        const impostoDevido = baseCalculoLimite * aliquota;

        return formatarValorDecimal(impostoDevido);
    }
});
