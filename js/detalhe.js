const detalheProduto = document.getElementById("detalhe-produto");
const tema = document.getElementById("trocaTema");
const aumenta = document.getElementById("aumenta");
const diminui = document.getElementById("diminui");
const lerpg = document.getElementById("lerpg");
const formPesquisa = document.getElementById("form-pesquisa");
const campoPesquisa = document.getElementById("campo-pesquisa");



function pegarSlug() {
    const params = new URLSearchParams(window.location.search);
    return params.get("produto");
}

async function buscarProdutos() {
    try {
        const resposta = await fetch("../assets/data/produtos.json");
        const produtos = await resposta.json();
        const slug = pegarSlug();
        const produto = produtos.find(p => p.slug === slug);
        if (!produto) {
            detalheProduto.innerHTML = "<p>Produto não encontrado</p>";
            return;
        }
        mostrarDetalhes(produto);
    } catch (erro) {
        console.error("Erro ao carregar produtos:", erro);
        detalheProduto.innerHTML = "<p>Erro ao carregar produto</p>";
    }
}

function mostrarDetalhes(produto) {
    detalheProduto.innerHTML = `
                        <img class="fundo" src="${produto.fundo}" alt="${produto.nome}">
                        <a class="${produto.botao}" href="javascript:history.back()" tabindex="0">Voltar</a>
                        <div class="detalhes-card">
                            <img src="../${produto.imagem}" alt="Imagem do produto ${produto.nome}">
                            <div class="descrição">
                                <h1>${produto.nome}</h1>
                                <p><strong>Descrição:</strong> ${produto.descricao}</p>
                                <p><strong> ${produto.keywords}</strong></p>
                                <h3>R$ ${produto.preco.toFixed(2)}</h3>

                                <button onclick="adicionarCarrinho('${produto.slug}')" class="${produto.botao}" tabindex="0">Adicionar ao Carrinho 🛒</button>

                                <div class="trailer">
                                    <h3>Trailer: ${produto.nome}</h3>
                                    <iframe width="640" height="360"
                                        src="https://www.youtube.com/embed/${produto.video}"
                                        frameborder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen>
                                    </iframe>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="avaliacao">

    <h2>Avalie este produto</h2>
    
    <label for="nome">Seu nome:</label>
    <br>
    <input type="text" id="nome" 

    placeholder="Digite seu nome"
    >
    
    <br><br>
    
    <label for="nota">Nota:</label>
    <br>
    
    <select id="nota">
    <option value="5">⭐⭐⭐⭐⭐</option>
        <option value="4">⭐⭐⭐⭐</option>
        <option value="3">⭐⭐⭐</option>
        <option value="2">⭐⭐</option>
        <option value="1">⭐</option>
        </select>

    <br><br>

    <label for="comentario">Comentário:</label>
    
    <br>
    
    <textarea 
    id="comentario" 
    placeholder="Digite seu comentário"
    ></textarea>
    
    <br><br>
    
    <button id="avaliacao" class="${produto.botao}">
    Enviar avaliação
    </button>
    
    <br><br>
    <h2>Avaliações</h2>
    <div id="resultado-avaliacao"></div>

</div>
    `;



const botaoAvaliacao = document.getElementById("avaliacao");

botaoAvaliacao.addEventListener("click", function() {

    const nome = document.getElementById("nome").value;
    const nota = document.getElementById("nota").value;
    const comentario = document.getElementById("comentario").value;

    document.getElementById("resultado-avaliacao").innerHTML = `

        <hr>

        <h3>${nome}</h3>

        <p>Nota: ${"⭐".repeat(Number(nota))}</p>

        <p>${comentario}</p>

    `;

});




    
    document.title = `${produto.nome} | LevelUp`;
    const metaDescription = document.querySelector("meta[name='description']");
    if (metaDescription) {
        metaDescription.setAttribute("content", produto.descricao);
    }
}

document.addEventListener("DOMContentLoaded", buscarProdutos);



function trocaTema() {
    const body = document.body;
    const temaAtual = body.getAttribute("data-bs-theme");
    if (temaAtual === "dark") {
        body.setAttribute("data-bs-theme", "light");
    } else {
        body.setAttribute("data-bs-theme", "dark");
    }
}

tema.addEventListener("click",trocaTema);
tema.addEventListener("Keydown",function (event){
    if(event.key ==="Enter"){
        trocaTema();
    }
});



function aumentarTexto() {
 document.body.style.fontSize = "20px";
}
function diminuirTexto() {
 document.body.style.fontSize = "14px";
}

aumenta.addEventListener("click",aumentarTexto);
aumenta.addEventListener("Keydown",function (event){
    if(event.key ==="Enter"){
       aumentarTexto();
    }
});

diminui.addEventListener("click",diminuirTexto);
diminui.addEventListener("Keydown",function (event){
    if(event.key ==="Enter"){
        diminuirTexto();
    }
});



function lerPagina() {
 const texto = document.body.innerText;
 const fala = new SpeechSynthesisUtterance(texto);
 fala.lang = "pt-BR";
 speechSynthesis.speak(fala);
}

lerpg.addEventListener("click",lerPagina);
lerpg.addEventListener("Keydown",function (event){
    if(event.key ==="Enter"){
        lerPagina();
    }
});


function pesquisarProdutos() {
    const texto = campoPesquisa.value.toLowerCase().trim();
    const produtosFiltrados = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(texto) ||
        produto.descricao.toLowerCase().includes(texto)
    );
    mostrarProdutos(produtosFiltrados);
}

formPesquisa.addEventListener("submit", function(event) {
    event.preventDefault();
    pesquisarProdutos();
});



window.addEventListener("load", function () {
  const loader = this.document.getElementById("loader");
  if (loader) {
    loader.style.transition = "opacity 0.3s ease";
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }
});

async function adicionarCarrinho(slug) {

    try {
        const resposta = await fetch("../assets/data/produtos.json");
        const produtos = await resposta.json();

        const produto = produtos.find(item => item.slug === slug);

        if (!produto) {
            console.log("Produto não encontrado:", slug);
            return;
        }

        let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

        const itemExistente = carrinho.find(item => item.slug === slug);

        if (itemExistente) {
            itemExistente.quantidade++;
        } else {
            carrinho.push({
                slug: produto.slug,
                quantidade: 1
            });
        }

        localStorage.setItem("carrinho", JSON.stringify(carrinho));

        alert(`${produto.nome} foi adicionado ao carrinho!`);

    } catch (erro) {
        console.error("Erro ao adicionar ao carrinho:", erro);
    }
}
