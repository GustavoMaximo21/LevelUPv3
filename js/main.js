const listaProdutos = document.getElementById("lista-produtos");
const tema = document.getElementById("trocaTema");
const aumenta = document.getElementById("aumenta");
const diminui = document.getElementById("diminui");
const lerpg = document.getElementById("lerpg");
const formPesquisa = document.getElementById("form-pesquisa");
const campoPesquisa = document.getElementById("campo-pesquisa");

let produtos = [];

async function buscarProdutos() {
    const resposta = await fetch("../assets/data/produtos.json");
    produtos = await resposta.json();

    const plataforma = document.body.dataset.plataforma;

    if (plataforma === "todos") {
        mostrarProdutos(produtos);
    } else {
        const produtosFiltrados = produtos.filter(produto =>
            produto.marca === plataforma
        );

        mostrarProdutos(produtosFiltrados);
    }
}

function mostrarProdutos(lista) {
    listaProdutos.innerHTML = "";

    lista.forEach(produto => {

        const card = document.createElement("div");

        // Responsividade:
        // celular: 1 coluna
        // tablet: 2 colunas
        // desktop: 3 ou 4 colunas
        card.classList.add("col-12", "col-sm-8", "col-md-6", "col-lg-2");

        card.innerHTML = `
            <div class="card h-100 mb-4">
                <div class="card-body d-flex flex-column">

                    <h4>
                        <strong>${produto.nome.substring(0, 50)}</strong>
                    </h4>

                    <img 
                        class="w-100 img-fluid" 
                        src="${produto.imagem}" 
                        alt="Imagem do produto ${produto.nome}"
                    >

                    <p class="fw-bold mt-2">
                        ${produto.plataforma}
                    </p>

                    <p class="fs-3 fw-bold">
                        R$ ${produto.preco.toFixed(2)}
                    </p>

                    <button 
                        class="btn-detalhes ${produto.botao} mt-auto"
                        tabindex="0"
                    >
                        Ver Detalhes
                    </button>

                </div>
            </div>
        `;

        const botaoDetalhes = card.querySelector(".btn-detalhes");

        botaoDetalhes.addEventListener("click", () => {
            window.location.href = `pages/detalhe.html?produto=${produto.slug}`;
        });

        listaProdutos.appendChild(card);
    });
}





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





document.addEventListener("DOMContentLoaded", () => {
    buscarProdutos();
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



