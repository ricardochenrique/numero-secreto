const { JSDOM } = require('jsdom');

// Configuração do JSDOM
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;

// Código a ser testado
let jogo = {
  listaDeNumerosSorteados: [],
  numeroLimite: 100,
  numeroSecreto: this.gerarNumeroAleatorio(),
  tentativas: 1,
  exibirMensagemInicial: function() {
    this.exibirTextoNaTela("h1", "Jogo do número secreto");
    this.exibirTextoNaTela("p", "Escolha um número entre 1 e 100");
  },
  verificarChute: function() {
    let chute = document.querySelector("input").value;

    if (chute == this.numeroSecreto) {
      this.exibirTextoNaTela("h1", "Acertou!");
      let palavraTentativa = this.tentativas > 1 ? "tentativas" : "tentativa";
      let mensagemTentativas = `Você descobriu o número secreto com ${this.tentativas} ${palavraTentativa}!`;
      this.exibirTextoNaTela("p", mensagemTentativas);
      document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
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
    chute = document.querySelector("input");
    chute.value = "5";
  },
  reiniciarJogo: function() {
    this.numeroSecreto = this.gerarNumeroAleatorio();
    this.limparCampo();
    this.tentativas = 1;
    this.exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
  },
  exibirTextoNaTela: function(selector, texto) {
    let elemento = document.querySelector(selector);
    if (!elemento) {
      throw new Error(`Seletor não encontrado: ${selector}`);
    }
    elemento.innerHTML = texto;
  }
}

jogo.exibirMensagemInicial();