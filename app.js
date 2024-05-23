let listaDeNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
  console.log(`Tentando selecionar o elemento com o seletor: ${tag}`);
  let campo = document.querySelector(tag);
  if (campo) {
    console.log(`Elemento encontrado: ${campo.outerHTML}`);
    campo.innerHTML = texto;
    console.log(`Texto definido no elemento: ${campo.outerHTML}`);
  } else {
    console.error(`Seletor não encontrado: ${tag}`);
  }
}


function exibirMensagemInicial() {
  exibirTextoNaTela("h1", "Jogo do número secreto");
  exibirTextoNaTela("p", "Escolha um número entre 1 e 10");
}

exibirMensagemInicial();

function verificarChute() {
  let chute = document.querySelector("input").value;

  if (chute == numeroSecreto) {
    exibirTextoNaTela("h1", "Acertou!");
    let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
    let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
    exibirTextoNaTela("p", mensagemTentativas);
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    if (chute > numeroSecreto) {
      exibirTextoNaTela("p", "O número secreto é menor");
    } else {
      exibirTextoNaTela("p", "O número secreto é maior");
    }
    tentativas++;
    limparCampo();
  }
}

function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
  let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

  if (quantidadeDeElementosNaLista == numeroLimite) {
    listaDeNumerosSorteados = [];
  }
  if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
  } else {
    listaDeNumerosSorteados.push(numeroEscolhido);
    console.log(listaDeNumerosSorteados);
    return numeroEscolhido;
  }
}

function limparCampo() {
  let chute = document.querySelector("input");
  if (chute) {  // Verifica se chute não é null
      chute.value = "";
  } else {
      console.error('Elemento input não encontrado.');
  }
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  tentativas = 1;
  exibirMensagemInicial();
  document.getElementById("reiniciar").setAttribute("disabled", true);
}

module.exports = {
  exibirTextoNaTela,
  exibirMensagemInicial,
  verificarChute,
  gerarNumeroAleatorio,
  limparCampo,
  reiniciarJogo,
  listaDeNumerosSorteados,
  numeroLimite,
  numeroSecreto,
  tentativas
};

if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    exibirMensagemInicial();
  });
}