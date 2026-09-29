// Aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener("DOMContentLoaded", function () {

    // Seleciona o formulário de login
    const form = document.getElementById("formLogin");

    // Recupera os dados de cadastro salvos no localStorage
    const dadosSalvos = JSON.parse(localStorage.getItem('usuarioCadastro'));

    // Adiciona um evento ao enviar o formulário
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Captura os valores digitados nos campos de login
        const emailLogin = document.getElementById('emailLogin').value;
        const senhaLogin = document.getElementById('senhaLogin').value;

        // Verifica se os dados digitados coincidem com os salvos
        if (emailLogin === dadosSalvos.email && senhaLogin === dadosSalvos.senha) {
            alert("Login realizado com sucesso!");
            window.location.href = "../index.html"; // Redireciona para outra página
        } else {
            alert("Email ou senha incorretos."); // Exibe mensagem de erro
        }
    });
});
