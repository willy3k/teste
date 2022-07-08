const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);
/**pegando os intes do models.js */
modelsJson.map((item, index) => {
  let modelsItem = document
    .querySelector(".conteudo .conteudo-inter")
    .cloneNode(true);
  document.querySelector(".conteudo").append(modelsItem);
});

/**mostra na tela */

/**convertendo de moeda para float */
function moedaParaFloat(valor) {
  /**tirando o sifrao R$ */
  let textLimpo = valor.replace("R$", "");
  /**trocando a virgula por ponto */
  textLimpo = textLimpo.replace(",", ".");
  /**e aqui convert para p float , na tela ela n vai fazer diferença mais interno ela ja mudou*/
  return parseFloat(textLimpo);
}

function floatParaMoeda(valor) {
  let valorFormatado = (valor < 1 ? "0" : "") + Math.floor(valor * 100);
  valorFormatado = "R$" + valorFormatado;
  return (
    valorFormatado.substr(0, valorFormatado.length - 2) +
    "," +
    valorFormatado.substr(-2)
  );
}


function retornaTotal() {
  let valorTotal = document.querySelector("#total");
  return moedaParaFloat(valorTotal.innerHTML);
}


function escreveTotal(valor) {
  let valorTotal = document.querySelector("#total");
  valorTotal.innerHTML = floatParaMoeda(valor);
}



function calcularTotalProdutos() {
  let todosProdutos = document.querySelectorAll(".preço-atual");
  let todasQuantidade = document.querySelectorAll(".quantidade");
  let totalProdutos = 0;

  for (let posiçao = 0; posiçao < todosProdutos.length; posiçao++) {
    let umPreço = moedaParaFloat(todosProdutos[posiçao].innerHTML);
    let umaQuantidade = moedaParaFloat(todasQuantidade[posiçao].value);
    let subtotal = umPreço * umaQuantidade;
    totalProdutos += subtotal;
  }

  return totalProdutos;
}


function quantidadeMudou() {
  escreveTotal(calcularTotalProdutos());
}




function aoCarregarPagina() {
  let camposQuantidade = document.querySelectorAll(".quantidade");
  for (let i = 0; i < camposQuantidade.length; i++) {
    camposQuantidade[i].onchange = function () {
      quantidadeMudou();
    };
  }
  
}
/**funçao frete gartis*/

window.onload = (function () {
    aoCarregarPagina();
    quantidadeMudou();
});