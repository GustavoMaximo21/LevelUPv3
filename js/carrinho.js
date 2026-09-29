const container = document.getElementById("carrinho");

fetch("../assets/data/produtos.json")
    .then(resposta => resposta.json())
    .then(produtos => {

        const carrinho =
            JSON.parse(localStorage.getItem("carrinho")) || [];

        if (carrinho.length === 0) {
            container.innerHTML = "<h2>Seu carrinho está vazio 🥺.</h2>";
            return;
        }

        carrinho.forEach(item => {

            const produto = produtos.find(
                produto => produto.slug === item.slug
            );

            if (!produto) return;

            container.innerHTML += `
                <div class="produtocarrinho">

                    <img 
                        src="../${produto.imagem}" 
                        alt="${produto.nome}"
                    >

                    <div class="detalhescarrinho2">
                        <h2>${produto.nome}</h2>

                        <p>${produto.plataforma}</p>

                        <p>
                            R$ ${produto.preco.toFixed(2)}
                        </p>

                        <p>
                            Quantidade: ${item.quantidade}
                        </p>
                        <button class="remover" data-slug="${item.slug}">Remover 🗑️</button>




                    </div>

                </div>
            `;
        });
    })
    .catch(erro => {
        console.error("Erro ao carregar carrinho:", erro);
        container.innerHTML =
            "<p>Erro ao carregar o carrinho.</p>";
    });

const removerproduto = document.getElementById("remover")

container.addEventListener("click", function(event) {

    if (!event.target.classList.contains("remover")) {
        return;
    }

    const slug = event.target.dataset.slug;

    let carrinho =
        JSON.parse(localStorage.getItem("carrinho")) || [];

    carrinho = carrinho.filter(item => item.slug !== slug);

    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );

    location.reload();
});





const totalContainer = document.getElementById("total");

fetch("../assets/data/produtos.json")
    .then(resposta => resposta.json())
    .then(produtos => {

        const carrinho =
            JSON.parse(localStorage.getItem("carrinho")) || [];

        const total = carrinho.reduce((soma, item) => {
            const produto = produtos.find(
                produto => produto.slug === item.slug
            );
            return soma + (produto ? produto.preco * item.quantidade : 0);
        }, 0);

        totalContainer.innerHTML = `
            <div class="subtotal">
                <h1>Subtotal: R$ ${total.toFixed(2)}</h1>
                <button onclick="alert('Compra Confirmada!!')" class="b1">Confirmar Compra 🛒</button>
            </div>
        `;
    })
    .catch(erro => {
        console.error("Erro ao calcular total:", erro);
        totalContainer.innerHTML =
            "<p>Erro ao calcular o total.</p>";
    });


