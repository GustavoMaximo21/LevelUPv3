// Aguarda o carregamento completo do DOM antes de executar o script
document.addEventListener('DOMContentLoaded', function () {

    // Seleciona o formulário pelo ID "Cadastro"
    const form = document.getElementById('Cadastro');

    // Verifica se o título da página contém "cadastro" ou se o texto da página inclui "Cadastre-se"
    if (document.title.toLowerCase().includes("cadastro") || document.body.innerText.includes("Cadastre-se")) {

        // Adiciona um ouvinte para o evento de envio do formulário
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Impede o envio padrão do formulário

            // Captura e limpa os valores dos campos de email e senha
            const nome = document.getElementById('nome1').value.trim();
            const email = document.getElementById('email1').value.trim();
            const senha = document.getElementById('senha1').value.trim();

            if (nome.length === 0) {
                alert("O campo nome não pode estar vazio");
                return; // Interrompe a execução se o nome estiver vazio
            }


            // Validação do campo de email: deve conter "@" e ".com"
            if (!email.includes("@") || !email.includes(".com")) {
                alert("Digite um e-mail válido");
                return; // Interrompe a execução se o email for inválido
            }

            // Validação do campo de senha: mínimo de 8 caracteres
            if (senha.length < 8) {
                alert("A senha deve ter pelo menos 8 caracteres");
                return; // Interrompe a execução se a senha for curta
            }

            // Cria um objeto com os dados capturados
            const dados = {
                nome,
                email,
                senha
            };

            // Salva os dados no armazenamento local do navegador (localStorage)
            localStorage.setItem('usuarioCadastro', JSON.stringify(dados));

            // Exibe mensagem de sucesso
            alert("Cadastro efetuado com sucesso!");

            // Redireciona o usuário para a página de login
            window.location.href = '../login/LoginLoja.html';
        });
    }
});
