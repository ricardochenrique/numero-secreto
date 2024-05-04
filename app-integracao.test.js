const { JSDOM } = require('jsdom');

// Configuração do JSDOM
const dom = new JSDOM('<!DOCTYPE html><html><body><input></body></html>');
global.document = dom.window.document;
global.window = dom.window;

// Código a ser testado
let jogo = {
  listaDeNumerosSorteados: [], // Lista para armazenar números sorteados
  numeroLimite: 100, // Limite de números para sortear
  numeroSecreto: this.gerarNumeroAleatorio(), // Número secreto que o jogador deve adivinhar
  tentativas: 1, // Contador de tentativas do jogador
  exibirMensagemInicial: function() {
    // Exibe a mensagem inicial do jogo
    this.exibirTextoNaTela("h1", "Jogo do número secreto");
    this.exibirTextoNaTela("p", "Escolha um número entre 1 e 100");
  },
  verificarChute: function() {
    // Verifica se o chute do jogador é igual ao número secreto
    let chute = document.querySelector("input").value;

    if (chute == this.numeroSecreto) {
      // Se o jogador acertar o número secreto
      this.exibirTextoNaTela("h1", "Acertou!");
      let palavraTentativa = this.tentativas > 1 ? "tentativas" : "tentativa";
      let mensagemTentativas = `Você descobriu o número secreto com ${this.tentativas} ${palavraTentativa}!`;
      this.exibirTextoNaTela("p", mensagemTentativas);
      document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
      // Se o jogador errar o número secreto
      if (chute > this.numeroSecreto) {
        this.exibirTextoNaTela("p", "O número secreto é menor");
      } else {
        this.exibirTextoNaTela("p", "O número secreto é maior");
      }
      this.tentativas++;
      this.limparCampo();
    }
  },
  gerarNumeroAleatorio: function() {
    // Gera um número aleatório e verifica se ele já foi sorteado
    let numeroEscolhido = parseInt(Math.random() * this.numeroLimite + 1);
    let quantidadeDeElementosNaLista = this.listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == this.numeroLimite) {
      this.listaDeNumerosSorteados = [];
    }
    if (this.listaDeNumerosSorteados.includes(numeroEscolhido)) {
      return this.gerarNumeroAleatorio();
    } else {
      this.listaDeNumerosSorteados.push(numeroEscolhido);
      console.log(this.listaDeNumerosSorteados);
      return numeroEscolhido;
    }
  },
  limparCampo: function() {
    // Limpa o campo de entrada
    let chute = document.querySelector("input");
    chute.value = "";
  },
  reiniciarJogo: function() {
    // Reinicia o jogo
    this.numeroSecreto = this.gerarNumeroAleatorio();
    this.limparCampo();
    this.tentativas = 1;
    this.exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
  },
  exibirTextoNaTela: function(selector, texto) {
    // Exibe um texto na tela
    let elemento = document.querySelector(selector);
    if (!elemento) {
      console.error(`Seletor não encontrado: ${selector}`);
    } else {
      elemento.innerHTML = texto;
    }
  }
}

jogo.exibirMensagemInicial(); // Inicia o jogo